# BulkImportConfig

Configures transport behavior for BulkImport REST API calls. Client certificates for mutual TLS are not supported.

```cpp
BulkImportConfig config;
```

**METHODS:**

- `int64_t Timeout() const` / `BulkImportConfig& WithTimeout(int64_t timeout)`

    Returns or sets the request timeout in seconds. Zero keeps the HTTP client default.

- `bool VerifyServerCert() const` / `BulkImportConfig& WithVerifyServerCert(bool verify)`

    Returns or sets whether HTTPS server certificates are verified. The default is `true`.

- `const std::string& CaCertPath() const` / `BulkImportConfig& WithCaCertPath(const std::string& ca_cert_path)`

    Returns or sets the CA certificate bundle path used to verify the server.
