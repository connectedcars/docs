package io.connectedcars.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.time.Instant;
import java.nio.file.*;
import java.util.stream.Collectors;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.connectedcars.authentication.*;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;


public class ConnectedCarsApi {
    private String endpoint;
    private String authEndpoint;

    private static ConnectedCarsApi instance = null;
    private ServiceAccount serviceAccount;
    private CCAccessToken CCAccessToken;
    private ObjectMapper mapper = new ObjectMapper();
    private HttpClient httpclient = HttpClients.createDefault();

    public ConnectedCarsApi(String ccServiceAccountKeyData, String endpoint, String authEndpoint) throws GeneralSecurityException, IOException {
        this.serviceAccount = new ServiceAccount(ccServiceAccountKeyData);
        this.endpoint = endpoint;
        this.authEndpoint = authEndpoint;
    }

    private CCAccessToken getToken() throws IOException {

        HttpPost httppost = new HttpPost(authEndpoint);

        // Wrap the token in a class for JSON
        TokenWrapper serviceAccountToken = new TokenWrapper();
        serviceAccountToken.token = this.serviceAccount.getToken();

        httppost.addHeader("content-type", "application/json");
        httppost.setEntity(new StringEntity(mapper.writeValueAsString(serviceAccountToken)));

        //Execute and get the response.
        HttpResponse response = httpclient.execute(httppost);
        if (response.getStatusLine().getStatusCode() != 200) {
            throw new RuntimeException(response.getStatusLine().getStatusCode() + " " + response.getStatusLine().getReasonPhrase());
        }

        HttpEntity entity = response.getEntity();

        if (entity != null) {
            try (InputStream inStream = entity.getContent()) {
                String result = new BufferedReader(new InputStreamReader(inStream))
                        .lines().collect(Collectors.joining("\n"));
                return mapper.readValue(result, CCAccessToken.class);
            }
        }
        return null; // TODO should probably be an error
    }

    public String getAccessToken() throws IOException {
        long unixTime = Instant.now().getEpochSecond();
        if (this.CCAccessToken == null || this.CCAccessToken.getExpires() < unixTime + 5 * 60 * 1000) {
            this.CCAccessToken = this.getToken();
        }
        return this.CCAccessToken.getToken();
    }

    private void clearToken() {
        this.CCAccessToken = null;
    }

    public String call(String graphQLInput) throws RuntimeException, IOException {
        String accessToken = this.getAccessToken();

        HttpPost httppost = new HttpPost(endpoint);

        // Wrap the query in a class for JSON
        QueryWrapper query = new QueryWrapper();
        query.query = graphQLInput;

        httppost.addHeader("content-type", "application/json");
        httppost.addHeader("Authorization","Bearer " + accessToken);
        httppost.setEntity(new StringEntity(mapper.writeValueAsString(query)));

        //Execute and get the response.
        HttpResponse response = httpclient.execute(httppost);
        if (response.getStatusLine().getStatusCode() == 401) {
            // Retry once with new token in case of 401
            this.clearToken();
            String newAccessToken = this.getAccessToken();

            HttpPost post = new HttpPost(endpoint);

            post.addHeader("content-type", "application/json");
            post.addHeader("Authorization","Bearer " + newAccessToken);
            post.setEntity(new StringEntity(mapper.writeValueAsString(query)));

            //Execute and get the response.
            HttpResponse secondResponse = httpclient.execute(post);
            if (secondResponse.getStatusLine().getStatusCode() != 200) {
                throw new RuntimeException(secondResponse.getStatusLine().getStatusCode() + " " + secondResponse.getStatusLine().getReasonPhrase());
            }
            HttpEntity secondEntity = secondResponse.getEntity();
            if (secondEntity != null) {
                try (InputStream inStream = secondEntity.getContent()) {
                    String result = new BufferedReader(new InputStreamReader(inStream))
                            .lines().collect(Collectors.joining("\n"));
                    return result;
                }
            }
            throw new RuntimeException("Unknown error");
        }
        HttpEntity entity = response.getEntity();

        if (entity != null) {
            try (InputStream inStream = entity.getContent()) {
                String result = new BufferedReader(new InputStreamReader(inStream))
                        .lines().collect(Collectors.joining("\n"));
                return result;
            }
        }
        throw new RuntimeException(response.getStatusLine().getStatusCode() + " " + response.getStatusLine().getReasonPhrase());
    }

    private static class TokenWrapper {
        public String token;
    }

    private static class QueryWrapper {
        public String query;
    }
}



