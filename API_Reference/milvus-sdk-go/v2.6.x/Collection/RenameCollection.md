# RenameCollection()

This method renames the specified collection.

```go
func (c *Client) RenameCollection(ctx context.Context, option RenameCollectionOption, callOptions ...grpc.CallOption) error
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
     <td><p><code>option</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><code>RenameCollectionOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## RenameCollectionOption

This is an interface type. The `renameCollectionOption` struct type implements this interface type. 

You can use the `NewRenameCollectionOption()` function to get the concrete implementation.

### NewRenameCollectionOption

The signature of this method is as follows:

```go
func NewRenameCollectionOption(oldName, newName string) *renameCollectionOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>oldName</code></p></td>
     <td><p>Original name of the collection to rename.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>newName</code></p></td>
     <td><p>New name of the collection after this operation.</p></td>
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

err = cli.RenameCollection(ctx, milvusclient.NewRenameCollectionOption("my_collection", "my_new_collection"))
if err != nil {
        // handle error
}
```

