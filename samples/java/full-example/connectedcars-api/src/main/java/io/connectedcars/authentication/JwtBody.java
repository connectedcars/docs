package io.connectedcars.authentication;
import com.fasterxml.jackson.annotation.JsonProperty;

public class JwtBody {
    @JsonProperty("jti")
    private String id;
    @JsonProperty("iat")
    private long issuedAt;
    @JsonProperty("iss")
    private String issuer;
    @JsonProperty("aud")
    private String audience;
    @JsonProperty("exp")
    private long expires = -1;
    @JsonProperty("nbf")
    private long notBefore = -1;
    @JsonProperty("sub")
    private String subject;


    /**
     * @return the audience
     */
    public String getAudience() {
        return audience;
    }

    /**
     * @param audience the audience to set
     */
    public void setAudience(String audience) {
        this.audience = audience;
    }

    /**
     * @return the expires
     */
    public long getExpires() {
        return expires;
    }

    /**
     * @param expires the expires to set
     */
    public void setExpires(long expires) {
        this.expires = expires;
    }

    /**
     * @return the notBefore
     */
    public long getNotBefore() {
        return notBefore;
    }

    /**
     * @param notBefore the notBefore to set
     */
    public void setNotBefore(long notBefore) {
        this.notBefore = notBefore;
    }

    /**
     * @return the issuer
     */
    public String getIssuer() {
        return issuer;
    }

    /**
     * @param issuer the issuer to set
     */
    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    /**
     * @return the issuedAt
     */
    public long getIssuedAt() {
        return issuedAt;
    }

    /**
     * @param issuedAt the Issued At to set
     */
    public void setIssuedAt(long issuedAt) {
        this.issuedAt = issuedAt;
    }

    /**
     * @return the subject
     */
    public String getSubject() {
        return subject;
    }

    /**
     * @param subject the subject to set
     */
    public void setSubject(String subject) {
        this.subject = subject;
    }

    /**
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }
}
