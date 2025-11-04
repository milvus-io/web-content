# ListIndexes()

This method lists all indexes created within the specified collection.

```go
func (c *Client) ListIndexes(ctx context.Context, opt ListIndexOption, callOptions ...grpc.CallOption) ([]string, error)
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
     <td><p><a href="./v2-Management-ListIndexes#listindexoption"><code>ListIndexOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## ListIndexOption

This is an interface type. The `listIndexOption` struct type implements this interface type. 

You can use the `NewListIndexOption()` function to get the concrete implementation.

### NewListIndexOption()

The signature of this method is as follows:

```go
func NewListIndexOption(collectionName string) *listIndexOption
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
</table>

## Return

`[]string`

## Example

```plaintext
indexes, err := cli.ListIndexes(ctx, milvusclient.NewListIndexOption("my_collection").WithFieldName("my_vector"))
if err != nil {
    // handle err
}
fmt.Println(indexes)
```
