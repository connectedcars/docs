package io.connectedcars.authentication;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.PrivateKey;
import java.time.Instant;
import java.util.UUID;

public class ServiceAccount {
    private final String kid;
    private final PrivateKey privateKey;
    private final String aud;
    private final String iss;

    public ServiceAccount(String serviceAccountData) throws GeneralSecurityException, IOException {
        boolean inHeader = false;
        String iss = null;
        String aud = null;
        String kid = null;

        for (String line : serviceAccountData.split("\r?\n")) {
            if (inHeader) {
                if (line.startsWith("----- END CONNECTEDCARS INFO -----")) {
                    break;
                }
                String[] keyValue = line.split(":\\s+");
                if(keyValue.length > 1) {
                    String key = keyValue[0].trim();
                    String value = keyValue[1].trim();

                    switch (key) {
                        case "iss":
                            iss = value;
                            break;
                        case "aud":
                            aud = value;
                            break;
                        case "kid":
                            kid = value;
                            break;
                    }
                }
            } else if (line.startsWith("----- BEGIN CONNECTEDCARS INFO -----")) {
                inHeader = true;
            }
        }

        if(aud == null) {
            throw new IllegalArgumentException("Did not find aud parameter");
        }

        if(kid == null) {
            throw new IllegalArgumentException("Did not find kid parameter");
        }

        if(iss == null) {
            throw new IllegalArgumentException("Did not find iss parameter");
        }

        this.kid = kid;
        this.aud = aud;
        this.iss = iss;
        this.privateKey = CryptoUtils.loadPemPrivateKey(serviceAccountData);
    }


    public ServiceAccount(String kid, String pemPrivateKeyString, String iss, String aud) throws GeneralSecurityException, IOException {
        this(kid, CryptoUtils.loadPemPrivateKey(pemPrivateKeyString), iss, aud);
    }

    public ServiceAccount(String kid, PrivateKey privateKey, String iss, String aud) {
        this.kid = kid;
        this.privateKey = privateKey;
        this.aud = aud;
        this.iss = iss;
    }

    public String getToken() {

        JwtHeader jwtHeader = new JwtHeader();
        jwtHeader.setAlgorithm(Algorithm.RS256);
        jwtHeader.setKeyId(this.kid);

        long unixTime = Instant.now().getEpochSecond();
        UUID uuid = UUID.randomUUID();

        JwtBody jwtBody = new JwtBody();
        jwtBody.setId(uuid.toString());
        jwtBody.setAudience(this.aud);
        jwtBody.setIssuer(this.iss);
        jwtBody.setIssuedAt(unixTime);
        jwtBody.setNotBefore(unixTime);
        jwtBody.setExpires(unixTime + 3600);

        try {
            return JwtUtils.encode(this.privateKey, jwtHeader, jwtBody);
        } catch (Exception ex) {
            throw new RuntimeException("Unknown error", ex);
        }
    }
}
