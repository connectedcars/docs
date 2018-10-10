package io.connectedcars.authentication;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.*;

public class JwtUtils {

    public static String encode(PrivateKey privateKey, JwtHeader jwtHeader, JwtBody jwtBody) throws JsonProcessingException, InvalidKeyException, SignatureException, NoSuchAlgorithmException, JWTException {
        // Convert header and body to Base64URL encoded JSON bytes
        ObjectMapper mapper = new ObjectMapper();
        byte[] headerBytes = Base64Utils.base64EncodeUrlSafe(mapper.writeValueAsBytes(jwtHeader));
        byte[] bodyBytes = Base64Utils.base64EncodeUrlSafe(mapper.writeValueAsBytes(jwtBody));

        // Get Base64URL encoded signature bytes for header_body_bytes
        byte[] signatureBytes;
        switch (jwtHeader.getAlgorithm()) {
            case RS256:
            case RS384:
            case RS512: {
                Signature signature = Signature.getInstance(jwtHeader.getAlgorithm().getValue());
                signature.initSign(privateKey);
                signature.update(headerBytes);
                signature.update((byte)46); // .
                signature.update(bodyBytes);
                signatureBytes = Base64Utils.base64EncodeUrlSafe(signature.sign());
                break;
            }
            default: {
                throw new JWTException("Unsupported signing method");
            }
        }

        // Create final token
        ByteBuffer tokenBuffer = ByteBuffer.allocate(headerBytes.length + 1 + bodyBytes.length + 1 + signatureBytes.length);
        tokenBuffer.put(headerBytes);
        tokenBuffer.put((byte)46); // .
        tokenBuffer.put(bodyBytes);
        tokenBuffer.put((byte)46); // .
        tokenBuffer.put(signatureBytes);
        return new String(tokenBuffer.array(), StandardCharsets.UTF_8);
    }
}
