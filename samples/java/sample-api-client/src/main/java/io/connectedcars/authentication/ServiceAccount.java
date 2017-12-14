package io.connectedcars.authentication;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.PrivateKey;
import java.time.Instant;
import java.util.UUID;

public class ServiceAccount {
    private final String keyId;
    private final PrivateKey privateKey;
    private final String accountName;
    private final String defaultSubject;

    public ServiceAccount(String serviceAccountKey) throws GeneralSecurityException, IOException {
        boolean inHeader = false;
        String type = null;
        String accountName = null;
        String defaultSubject = null;
        String keyId = null;

        for (String line : serviceAccountKey.split("\r?\n")) {
            if (inHeader) {
                if (line.startsWith("-----END CONNECTED CARS HEADER-----")) {
                    break;
                }
                String[] keyValue = line.split(":\\s*");
                if(keyValue.length > 1) {
                    String key = keyValue[0].trim();
                    String value = keyValue[1].trim();

                    if(key.equals("Type")) {
                        type = value;

                    } else if(key.equals("AccountName")) {
                        accountName = value;

                    } else if(key.equals("DefaultSubject")) {
                        defaultSubject = value;

                    } else if(key.equals("KeyId")) {
                        keyId = value;
                    }
                }

            } else if (line.startsWith("-----BEGIN CONNECTED CARS HEADER-----")) {
                inHeader = true;
            }
        }

        if(type == null) {
            throw new IllegalArgumentException("Did not find Type parameter");
        }

        if(keyId == null) {
            throw new IllegalArgumentException("Did not find KeyId parameter");
        }

        if(accountName == null) {
            throw new IllegalArgumentException("Did not find AccountName parameter");
        }

        this.keyId = keyId;
        this.accountName = accountName;
        this.defaultSubject = defaultSubject;
        this.privateKey = CryptoUtils.loadPemPrivateKey(serviceAccountKey);
    }


    public ServiceAccount(String keyId, String pemPrivateKeyString, String accountName, String defaultSubject) throws GeneralSecurityException, IOException {
        this(keyId, CryptoUtils.loadPemPrivateKey(pemPrivateKeyString), accountName, defaultSubject);
    }

    public ServiceAccount(String keyId, PrivateKey privateKey, String accountName, String defaultSubject) {
        this.keyId = keyId;
        this.privateKey = privateKey;
        this.accountName = accountName;
        this.defaultSubject = defaultSubject;
    }

    public String getToken(String audience) {
        return getToken(audience, this.defaultSubject,600);
    }

    public String getToken(String audience, String subject) {
        return getToken(audience, subject,600);
    }

    public String getToken(String audience, String subject, int expires) {
        if(subject == null) {
            throw new IllegalArgumentException("Subject can not be null");
        }

        JwtHeader jwtHeader = new JwtHeader();
        jwtHeader.setAlgorithm(Algorithm.RS256);
        jwtHeader.setKeyId(this.keyId);

        long unixTime = Instant.now().getEpochSecond();
        UUID uuid = UUID.randomUUID();

        JwtBody jwtBody = new JwtBody();
        jwtBody.setId(uuid.toString());
        jwtBody.setAudience(audience);
        jwtBody.setIssuer("https://" + accountName);
        jwtBody.setSubject(subject);
        jwtBody.setIssuedAt(unixTime);
        jwtBody.setNotBefore(unixTime);
        jwtBody.setExpires(unixTime + expires);

        try {
            return JwtUtils.encode(this.privateKey, jwtHeader, jwtBody);
        } catch (Exception ex) {
            throw new RuntimeException("Unknown error", ex);
        }
    }
}
