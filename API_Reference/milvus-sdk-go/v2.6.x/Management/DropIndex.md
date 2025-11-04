# DropIndex()

This method drops the specified index.

```go
func (c *Client) DropIndex(ctx context.Context, opt DropIndexOption, callOptions ...grpc.CallOption) error
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
     <td><p><a href="./v2-Management-DropIndex#dropindexoption"><code>DropIndexOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DropIndexOption

This is an interface type. The `dropIndexOption` struct type implements this interface type. 

You can use the `NewDropIndexOption()` function to get the concrete implementation.

### NewDropIndexOption()

The signature of this method is as follows:

```go
func NewDropIndexOption(collectionName string, indexName string) *dropIndexOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collectionName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>indexName</code></p></td>
     <td><p>Name of the target index.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

Null

## Example

```plaintext
err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption("my_collection", "my_index"))
if err != nil {
    // handle err
}
```
