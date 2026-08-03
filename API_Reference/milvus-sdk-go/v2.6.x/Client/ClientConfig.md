# ClientConfig

Configures a Milvus client connection, including authentication, TLS, retry, database, and gRPC authority settings.

```go
type ClientConfig struct {
    Address string
    Username string
    Password string
    DBName string
    EnableTLSAuth bool
    APIKey string
    DialOptions []grpc.DialOption
    RetryRateLimit *RetryRateLimitOption
    DisableConn bool
    ServerVersion string
}
```

**METHODS:**

- `WithTLSConfig(tlsConfig *tls.Config) *ClientConfig`

    This sets a custom TLS configuration and enables TLS authentication.

- `WithGrpcAuthority(authority string) *ClientConfig`

    This sets the gRPC `:authority` header for proxy-based routing while preserving the default gRPC dial options.

**RETURN TYPE:**

*ClientConfig*

**RETURNS:**

Configuration for creating a Milvus client, including address, authentication, TLS, database, and gRPC options.

- **Address** (*string*) -

    Remote address, "localhost:19530".

- **Username** (*string*) -

    Username for auth.

- **Password** (*string*) -

    Password for auth.

- **DBName** (*string*) -

    DBName for this client.

- **EnableTLSAuth** (*bool*) -

    Enable TLS Auth for transport security.

- **APIKey** (*string*) -

    API key.

- **DialOptions** (*[]grpc.DialOption*) -

    Dial options for GRPC.

- **RetryRateLimit** (**RetryRateLimitOption*) -

    option for retry on rate limit inteceptor.

- **DisableConn** (*bool*) -

    This prevents the client from establishing the gRPC connection when set to true.

- **ServerVersion** (*string*) -

    ServerVersion.

## Example

Demonstrates ClientConfig usage.

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

config := (&milvusclient.ClientConfig{
	Address: "127.0.0.1:19530",
}).WithGrpcAuthority("milvus.example.com")

cli, err := milvusclient.New(ctx, config)
if err != nil {
	// handle error
}
defer cli.Close(ctx)
```
