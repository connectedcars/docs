package io.connectedcars.sample;

import io.connectedcars.api.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;

public class Config {

    private static ConnectedCarsApi CCApi;

    public static ConnectedCarsApi getCCApi() throws IOException, GeneralSecurityException {
        if (CCApi == null) {
            System.out.println();
            // Read the config however you like. Here we get it from a file in the root of the project
            Path pathToServiceFile = Paths.get(System.getenv("SERVICE_ACCOUNT_KEY_FILE"));

            String fileContents = String.join("\n", Files.readAllLines(pathToServiceFile));

            String endpoint = System.getenv("CC_API_ENDPOINT");
            String authEndpoint = System.getenv("CC_AUTH_API_ENDPOINT");
            CCApi = new ConnectedCarsApi(fileContents, endpoint, authEndpoint);
        }
        return CCApi;
    }
}
