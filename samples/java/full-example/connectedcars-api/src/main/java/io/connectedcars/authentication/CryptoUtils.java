package io.connectedcars.authentication;

import java.io.IOException;
import java.math.BigInteger;
import java.security.GeneralSecurityException;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.RSAPrivateCrtKeySpec;
import java.util.Base64;

public class CryptoUtils {
    private final static Base64.Decoder base64Decoder = Base64.getDecoder();

    public static PrivateKey loadPemPrivateKey(String pemString) throws GeneralSecurityException, IOException {
        boolean pkcs1Key = false;
        boolean pkcs8Key = false;
        StringBuilder builder = new StringBuilder();
        for (String line : pemString.split("\r?\n")) {
            if (pkcs1Key || pkcs8Key) {
                if (line.startsWith("-----END RSA PRIVATE KEY-----") || line.startsWith("-----END PRIVATE KEY-----")) {
                    break;
                }
                builder.append(line);

            } else if (line.startsWith("-----BEGIN RSA PRIVATE KEY-----")) {
                pkcs1Key = true;

            } else if (line.startsWith("-----BEGIN PRIVATE KEY-----")) {
                pkcs8Key = true;
            }
        }

        if(builder.length() == 0) {
            throw new IllegalArgumentException("Did not find expected private key format");
        }

        byte[] encoded = base64Decoder.decode(builder.toString());

        if (pkcs1Key) {
            DerParser parser = new DerParser(encoded);

            Asn1Object sequence = parser.read();
            if (sequence.getType() != DerParser.SEQUENCE) {
                throw new IllegalArgumentException("Invalid DER: not a sequence");
            }

            // Parse inside the sequence
            parser = sequence.getParser();

            parser.read(); // Skip version
            BigInteger modulus = parser.read().getInteger();
            BigInteger publicExp = parser.read().getInteger();
            BigInteger privateExp = parser.read().getInteger();
            BigInteger prime1 = parser.read().getInteger();
            BigInteger prime2 = parser.read().getInteger();
            BigInteger exp1 = parser.read().getInteger();
            BigInteger exp2 = parser.read().getInteger();
            BigInteger crtCoef = parser.read().getInteger();

            RSAPrivateCrtKeySpec keySpec = new RSAPrivateCrtKeySpec(
                    modulus, publicExp, privateExp, prime1, prime2,
                    exp1, exp2, crtCoef);

            KeyFactory factory = KeyFactory.getInstance("RSA");
            return factory.generatePrivate(keySpec);

        } else if (pkcs8Key) {

            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encoded);
            KeyFactory kf = KeyFactory.getInstance("RSA");
            return kf.generatePrivate(keySpec);
        } else {
            throw new GeneralSecurityException("Did not find support key format");
        }
    }
}
