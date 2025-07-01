# ListResourceGroups()

This method lists the names of all available resource groups.

```go
func (c *Client) ListResourceGroups(ctx context.Context, opt ListResourceGroupsOption, callOptions ...grpc.CallOption) ([]string, error)
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
     <td><p><code>opt</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><code>ListResourceGroupsOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## ListResourceGroupsOption

This is an interface type. The `listResourceGroupsOption` struct type implements this interface type. 

You can use the `NewListResourceGroupsOption()` function to get the concrete implementation.

### NewDescribeResourceGroupOption

The signature of this method is as follows:

```go
func NewListResourceGroupsOption() *listResourceGroupsOption
```

## Return

`[]string`

## Example

```go
import (
        "context"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

rgNames, err := cli.ListResourceGroups(ctx, milvusclient.NewListResourceGroupsOption())
if err != nil {
    // handle error
}
fmt.Println(rgNames)
```

