package io.connectedcars.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CCAccessToken {
    @JsonProperty("token")
    private String token;
    @JsonProperty("level")
    private String level;
    @JsonProperty("expires")
    private long expires;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public long getExpires() {
        return expires;
    }

    public void setExpires(long expires) {
        this.expires = expires;
    }
}
