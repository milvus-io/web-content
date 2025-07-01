# New()

This method creates a Milvus client that connects to a specific Milvus deployment.

```go
func New(ctx context.Context, config *ClientConfig) (*Client, error)
```

## Request Parameters

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
     <td><p>Client configurations. </p><p>For details, refer to the <a href="./v2-Client-New#clientconfig">ClientConfig</a> section.</p></td>
     <td><p><code>ClientConfig</code></p></td>
   </tr>
</table>

### ClientConfig

This struct type defines all possible client configuration items as follows:

```go
type ClientConfig struct {
    Address  string // Remote address, "localhost:19530".
    Username string // Username for auth.
    Password string // Password for auth.
    DBName   string // DBName for this client.
    EnableTLSAuth bool   // Enable TLS Auth for transport security.
    APIKey        string // API key
    RetryRateLimit *RetryRateLimitOption // option for retry on rate limit inteceptor
}
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>Address</code></p></td>
     <td><p>Specifies the address of your Milvus deployment.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>Username</code></p></td>
     <td><p>Specifies a valid username for authentication.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>Password</code></p></td>
     <td><p>Specifies the password of the above user.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>DBName</code></p></td>
     <td><p>Specifies the database to access.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>EnableTLSAuth</code></p></td>
     <td><p>Specifies whether to connect with TLS authentication enabled.</p></td>
     <td><p><code>bool</code></p></td>
   </tr>
   <tr>
     <td><p><code>RetryRateLimit</code></p></td>
     <td><p>Specifies the retry rate limit in case the connection fails.</p><p>For details, refer to the <a href="./v2-Client-New#retryratelimitoption">RetryRateLimitOption</a> section.</p></td>
     <td><p><code>*RetryRateLimitOption</code></p></td>
   </tr>
</table>

### RetryRateLimitOption

This struct type defines the retry options for the connection.

```go
type RetryRateLimitOption struct {
    MaxRetry   uint
    MaxBackoff time.Duration
}
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>MaxRetry</code></p></td>
     <td><p>Specifies the maximum number of times the client should retry the connection.</p></td>
     <td><p><code>uint</code></p></td>
   </tr>
   <tr>
     <td><p><code>MaxBackoff</code></p></td>
     <td><p>Specifies the maximum back-off duration for the connection.</p></td>
     <td><p><code>time.Duration</code></p></td>
   </tr>
</table>

## Return

A `Client` object.

## Example

```go
import (
   "context"
   "github.com/milvus-io/milvus/v2/milvusclient"
)

mclient, err := client.NewClient(context.Background(), client.ClientConfig{
   Address: "http://localhost:19530",
})
```

