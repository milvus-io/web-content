# ClientConfig

This operation provides the configuration for establishing a connection to a Milvus or Zilliz Cloud server. Pass a pointer to this struct when calling `New()` to create a client.

```go
type ClientConfig struct {
    Address        string
    Username       string
    Password       string
    DBName         string
    EnableTLSAuth  bool
    APIKey         string
    DialOptions    []grpc.DialOption
    RetryRateLimit *RetryRateLimitOption
    DisableConn    bool
    ServerVersion  string
}
```

**PARAMETERS:**

- **Address** (*string*) -

    **[REQUIRED]**

    The address of the Milvus server in host:port format (e.g., `"localhost:19530"`) or as an HTTPS URL (e.g., `"https://your-endpoint.zillizcloud.com"`).

- **Username** (*string*) -

    The username for password-based authentication.

- **Password** (*string*) -

    The password for password-based authentication.

- **DBName** (*string*) -

    The name of the database to connect to. Uses the default database if not set.

- **EnableTLSAuth** (*bool*) -

    Whether to enable TLS for the connection. Automatically set to `true` when the Address uses the `https` scheme.

- **APIKey** (*string*) -

    An API key or a colon-separated username and password for token-based authentication, used for Zilliz Cloud connections.

- **DialOptions** (*[]grpc.DialOption*) -

    Additional gRPC dial options to customize the connection. Merged with the default options if provided.

- **RetryRateLimit** (*&ast;RetryRateLimitOption*) -

    Configuration for automatic retry on rate-limit errors. `RetryRateLimitOption` has two fields: `MaxRetry uint` (maximum retry attempts, default 75) and `MaxBackoff time.Duration` (maximum backoff duration, default 3s). Uses sensible defaults if nil.

- **DisableConn** (*bool*) -

    If `true`, skips establishing the gRPC connection during initialization. Useful for testing or deferred connections.

- **ServerVersion** (*string*) -

    The version string of the connected server. Populated automatically after connection.

## Example

```go
ctx, cancel := context.WithCancel(context.Background())
defer cancel()

// Connect with username/password
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address:  "localhost:19530",
    Username: "root",
    Password: "Milvus",
    DBName:   "default",
})
if err != nil {
    log.Fatal("failed to create client:", err)
}
defer client.Close(ctx)

// Connect to Zilliz Cloud with API key
cloudClient, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "https://your-endpoint.api.gcp-us-west1.zillizcloud.com:443",
    APIKey:  "your-api-key",
})
if err != nil {
    log.Fatal("failed to create cloud client:", err)
}
defer cloudClient.Close(ctx)
```
