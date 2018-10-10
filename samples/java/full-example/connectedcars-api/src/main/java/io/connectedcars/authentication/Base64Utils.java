package io.connectedcars.authentication;

import java.util.Base64;

public class Base64Utils {
    private static Base64.Encoder base64URLSafeEncoder = Base64.getUrlEncoder().withoutPadding();

    public static byte[] base64EncodeUrlSafe(byte[] bytes) {
        return base64URLSafeEncoder.encode(bytes);
    }
}
