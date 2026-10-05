# Generate an asymmetric key pair

Prefer using ed25519 otherwise RSA with a key size of 4096 bits. This can be done as follows, replacing `<private-key-filename>` with a suitable name for your private key.

> [!IMPORTANT]  
> If using ed25519 make sure to upgrade `@connectedcars/jwtutils` to at least version X.X.X.

### Ed25519

```bash
# The key's password is encrypted with aes256
openssl genpkey -algorithm ed25519 -out <private-key-filename>.pem -aes256
```

Prefer an **encrypted** private key but if you need to create an unencrypted key, do the following (you will be prompted for your passphrase):

```bash
openssl pkey -in <private-key-filename>.pem -out <unencrypted-private-key-filename>.pem
```

Then generate the public key from the encrypted or unencrypted private key:

```bash
openssl pkey -in <private-key-filename>.pem -outform PEM -pubout -out <public-key-filename>.pem
```

### RSA

```bash
# The key's password is encrypted with aes256
openssl genrsa -aes256 -out <private-key-filename>.pem 4096
```

Prefer an **encrypted** private key but if you need to create an unencrypted key, do the following (you will be prompted for your passphrase):

```bash
openssl rsa -in <private-key-filename>.pem -out <unencrypted-private-key-filename>.pem
```

Then generate public key from the unencrypted private key:

```bash
openssl rsa -in <private-key-filename>.pem -outform PEM -pubout -out <public-key-filename>.pem
```
