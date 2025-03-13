# ReleasePartitions()

This method releases the specified collection.

```go
func (c *Client) ReleasePartitions(ctx context.Context, option ReleasePartitionsOption, callOptions ...grpc.CallOption) error
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
     <td><p><code>ReleaseCollectionOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## ReleaseCollectionOption

This is an interface type. The `releasePartitionsOption` struct type implements this interface type. 

You can use the `NewReleasePartitionsOption()` function to get the concrete implementation.

### NewReleaseCollectionOption()

The signature of this method is as follows:

```go
func NewReleasePartitionsOptions(collectionName string, partitionNames ...string) *releasePartitionsOption
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
     <td><p><code>partitionNames</code></p></td>
     <td><p>Names of the target partitions.</p></td>
     <td><p><code>...string</code></p></td>
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

err = cli.ReleasePartitions(ctx, milvusclient.NewReleasePartitionsOption("custom_quick_setup", "default", "partitionA"))
if err != nil {
        // handle error
}
```
