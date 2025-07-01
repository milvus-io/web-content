# CreateResourceGroup()

This method creates a resource group.

```go
func (c *Client) CreateResourceGroup(ctx context.Context, opt CreateResourceGroupOption, callOptions ...grpc.CallOption) error
```

<div class="admonition note">

<p><b>notes</b></p>

<p>A Milvus instance begins with a default resource group that includes all available query nodes.</p>
<p>To optimize resource utilization, you can create additional resource groups, reassign specific query nodes from the default group, and load collections into these newly configured groups.</p>
<p>This approach ensures that collections are allocated dedicated query nodes, enabling efficient and isolated search services.</p>
<p>For details about resource groups, refer to <a href="https://milvus.io/docs/resource_group.md#Manage-Resource-Groups">Manage Resource Group</a>.</p>

</div>

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
     <td><p><code>CreateResourceGroupOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## CreateResourceGroupOption

This is an interface type. The `createResourceGroupOption` struct type implements this interface type. 

You can use the `NewCreateResourceGroupOption()` function to get the concrete implementation.

### NewCreateResourceGroupOption

The signature of this method is as follows:

```go
func NewCreateResourceGroupOption(name string) *createResourceGroupOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the target resource group.</p></td>
     <td><p><code>string</code></p></td>
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

err = cli.CreateResourceGroup(ctx, milvusclient.NewCreateResourceGroupOption("my_rg"))
if err != nil {
    // handle error
}
```

