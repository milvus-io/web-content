# HasCollection()

This method checks whether the specified collection exists.

```go
func (c *Client) HasCollection(ctx context.Context, option HasCollectionOption, callOptions ...grpc.CallOption) (has bool, err error)
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
     <td><p><a href="./v2-Collection-HasCollection#hascollectionoption"><code>HasCollectionOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## HasCollectionOption

This is an interface type. The `hasCollectionOption` struct type implements this interface type. 

You can use the `NewHasCollectionOption()` function to get the concrete implementation.

### NewHasCollectionOption

The signature of this method is as follows:

```go
func NewHasCollectionOption(name string) HasCollectionOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the collection to check.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

`bool`

## Example

```go
import (
        "context"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

has, err = cli.HasCollection(ctx, milvusclient.NewHasCollectionOption("customized_setup_2"))
if err != nil {
       // handle err
}

fmt.println(has)
```

