package io.connectedcars.authentication;

public enum Algorithm {
    RS256("SHA256withRSA"),
    RS384("SHA384withRSA"),
    RS512("SHA512withRSA"),
    ED25519("SHA512withEd25519");

    private final String value;

    Algorithm(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
