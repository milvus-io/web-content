# ListPartitions()

This method lists all existing partitions in a specific collection.

```go
func (c *Client) ListPartitions(ctx context.Context, opt ListPartitionsOption, callOptions ...grpc.CallOption) (partitionNames []string, err error)
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
     <td><p><code>ListPartitionsOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## ListPartitionsOption

This is an interface type. The `listPartitionsOpt` struct type implements this interface type. 

You can use the `NewListPartitionOption()` function to get the concrete implementation.

### NewListPartitionOption

The signature of this method is as follows:

```go
func NewListPartitionOption(collectionName string) *listPartitionsOpt
```

## Return

`[]string`

## Example

```go
import (
        "context"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

partitionNames, err := cli.ListPartitions(ctx, milvusclient.NewListPartitionOption("quick_setup"))
if err != nil {
    // handle error
}

fmt.Println(partitionNames)
```

