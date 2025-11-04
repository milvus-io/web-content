# DropPartition()

This method creates a partition in a collection.

```go
func (c *Client) DropPartition(ctx context.Context, opt DropPartitionOption, callOptions ...grpc.CallOption) error
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
     <td><p><a href="./v2-Partition-DropPartition#droppartitionoption"><code>DropAliasOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DropPartitionOption

This is an interface type. The `dropPartitionOption` struct type implements this interface type. 

You can use the `NewDropPartitionOption()` function to get the concrete implementation.

### NewDropPartitionOption

The signature of this method is as follows:

```go
func NewDropPartitionOption(collectionName string, partitionName string) *dropPartitionOpt
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
     <td><p><code>partitionName</code></p></td>
     <td><p>Name of the partition to drop.</p></td>
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

err = cli.DropPartition(ctx, milvusclient.NewDropPartitionOption("quick_setup", "partitionA"))
if err != nil {
    // handle error
}
```

