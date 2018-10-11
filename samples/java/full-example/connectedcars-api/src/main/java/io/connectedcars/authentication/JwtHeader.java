package io.connectedcars.authentication;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JwtHeader {
    @JsonProperty("alg")
    private Algorithm algorithm;
    @JsonProperty("typ")
    private final String type = "JWT";
    @JsonProperty("kid")
    private String keyId;

    /**
     * @return the algorithm
     */
    public Algorithm getAlgorithm() {
        return algorithm;
    }

    /**
     * @param algorithm the algorithm to set
     */
    public void setAlgorithm(Algorithm algorithm) {
        this.algorithm = algorithm;
    }

    /**
     * @return key id
     */
    public String getKeyId() {
        return keyId;
    }

    /**
     * @param keyId for used for signing this token
     */
    public void setKeyId(String keyId) {
        this.keyId = keyId;
    }
}
