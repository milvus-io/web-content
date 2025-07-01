# TransferReplica()

This method updates the configuration of a resource group.

```go
func (c *Client) TransferReplica(ctx context.Context, opt TransferReplicaOption, callOptions ...grpc.CallOption) error
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
     <td><p><code>TransferReplicaOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## TransferReplicaOption

This is an interface type. The `transferReplicaOption` struct type implements this interface type. 

You can use the `NewTransferReplicaOption()` function to get the concrete implementation.

### NewTransferReplicaOption

The signature of this method is as follows:

```go
func NewTransferReplicaOption(collectionName, sourceGroup, targetGroup string, replicaNum int64) *transferReplicaOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collectionName</code></p></td>
     <td><p>Name of the collection whose replicas will be transferred.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>sourceGroup</code></p></td>
     <td><p>Name of the source resource group of this operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>targetGroup</code></p></td>
     <td><p>Name of the target resource group of this operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>replicaNum</code></p></td>
     <td><p>Number of replicas to transfer.</p></td>
     <td><p><code>int64</code></p></td>
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

err = cli.TransferReplica(ctx, milvusclient.NewTransferReplicaOption("quick_setup", "rg_1", "rg_2", 1))
if err != nil {
    // handle error
}
```

