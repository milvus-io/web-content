# Close()

This method closes the currently connected Milvus deployment.

```go
func (c *Client) Close(ctx context.Context) error
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
</table>

## Return

Null

## Example

```go
import (
   "context"
   "github.com/milvus-io/milvus/client/v2/milvusclient"
)

mclient, err := client.NewClient(context.Background(), client.ClientConfig{
   Address: "http://localhost:19530",
})

mclient.close()
```

