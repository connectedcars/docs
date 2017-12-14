package io.connectedcars.authentication;

import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.security.GeneralSecurityException;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class ServiceAccountTest {

    private static String pemEncodedPrivateKey =
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        "MIICWwIBAAKBgQDdlatRjRjogo3WojgGHFHYLugdUWAY9iR3fy4arWNA1KoS8kVw\n" +
        "33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQsHUfQrSDv+MuSUMAe8jzKE4qW\n" +
        "+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5Do2kQ+X5xK9cipRgEKwIDAQAB\n" +
        "AoGAD+onAtVye4ic7VR7V50DF9bOnwRwNXrARcDhq9LWNRrRGElESYYTQ6EbatXS\n" +
        "3MCyjjX2eMhu/aF5YhXBwkppwxg+EOmXeh+MzL7Zh284OuPbkglAaGhV9bb6/5Cp\n" +
        "uGb1esyPbYW+Ty2PC0GSZfIXkXs76jXAu9TOBvD0ybc2YlkCQQDywg2R/7t3Q2OE\n" +
        "2+yo382CLJdrlSLVROWKwb4tb2PjhY4XAwV8d1vy0RenxTB+K5Mu57uVSTHtrMK0\n" +
        "GAtFr833AkEA6avx20OHo61Yela/4k5kQDtjEf1N0LfI+BcWZtxsS3jDM3i1Hp0K\n" +
        "Su5rsCPb8acJo5RO26gGVrfAsDcIXKC+bQJAZZ2XIpsitLyPpuiMOvBbzPavd4gY\n" +
        "6Z8KWrfYzJoI/Q9FuBo6rKwl4BFoToD7WIUS+hpkagwWiz+6zLoX1dbOZwJACmH5\n" +
        "fSSjAkLRi54PKJ8TFUeOP15h9sQzydI8zJU+upvDEKZsZc/UhT/SySDOxQ4G/523\n" +
        "Y0sz/OZtSWcol/UMgQJALesy++GdvoIDLfJX5GBQpuFgFenRiRDabxrE9MNUZ2aP\n" +
        "FaFp+DyAe+b4nDwuJaW2LURbr8AEZga7oQj0uYxcYw==\n" +
        "-----END RSA PRIVATE KEY-----\n" +
        "-----BEGIN CONNECTED CARS HEADER-----\n" +
        "Type: service_account\n" +
        "AccountName: service.mycompany.serviceaccount.connectedcars.io\n" +
        "DefaultSubject: default@service.mycompany.serviceaccount.connectedcars.io\n" +
        "KeyId: 334201c552e192224ee43a92052d8d17dd606566\n" +
        "-----END CONNECTED CARS HEADER-----\n";

    @Test
    void getToken() throws GeneralSecurityException, IOException {
        ServiceAccount serviceAccount = new ServiceAccount(pemEncodedPrivateKey);
        String token = serviceAccount.getToken("api.connectedcars.dk");
        assertNotNull(token);
    }
}