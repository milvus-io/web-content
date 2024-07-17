# NewClient()

This method creates a Milvus client that connects to a specific Milvus deployment.

```go
func NewClient(ctx context.Context, config Config) (Client, error)
```

## Request Parameter

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ctx</code></p></td>
     <td><p>Context for the current call to work.</p></td>
     <td><p><code>context.Context</code></p></td>
   </tr>
   <tr>
     <td><p><code>config</code></p></td>
     <td><p>Client configurations.</p></td>
     <td><p><code>client.Config</code></p></td>
   </tr>
</table>

### client.Config

This struct type defines all possible client configuration items as follows:

```go
type Config struct {
    Address       string // Remote address, "localhost:19530".
    Username      string // Username for auth.
    Password      string // Password for auth.
    DBName        string // DBName for this client.
    Identifier    string // Identifier for this connection
    EnableTLSAuth bool   // Enable TLS Auth for transport security.
    APIKey        string // API key (For Zilliz Cloud clusters only)
    ServerVersion string // ServerVersion

    DialOptions []grpc.DialOption // Dial options for GRPC.

    RetryRateLimit *RetryRateLimitOption // option for retry on rate limit interceptor

    DisableConn bool
    // contains filtered or unexported fields
}
```

### client.RetryRateLimit

This struct type defines the retry options for the connection.

```go
type RetryRateLimitOption struct {
    MaxRetry   uint
    MaxBackoff time.Duration
}
```

## Return

A `client.Client`.

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- The call to this API fails.

## Example

```go
import (
   "context"

   "github.com/milvus-io/milvus-sdk-go/v2/client"
)

mc, err := client.NewClient(context.Background(), client.Config{
   Address: "host:port",
})
if err != nil {
   // handle error
}
mc.HasCollection(context.Background(), "YOUR_COLLECTION_NAME")
```
