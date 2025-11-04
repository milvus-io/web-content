# GetPartitionStats()

This method collects the statistics on the specified partition.

```go
func (c *Client) GetPartitionStats(ctx context.Context, opt GetPartitionStatsOption, callOptions ...grpc.CallOption) (map[string]string, error)
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
     <td><p><a href="./v2-Partition-GetPartitionStats#getpartitionstatsoption"><code>GetPartitionStatsOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## GetPartitionStatsOption

This is an interface type. The `getPartitionStatsOption` struct type implements this interface type. 

You can use the `NewGetPartitionStatsOption()` function to get the concrete implementation.

### NewGetCollectionStatsOption

The signature of this method is as follows:

```go
func NewGetPartitionStatsOption(collectionName string, partitionName string) *getPartitionStatsOpt
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
     <td><p>Name of the target partition.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

`map[string]string`

## Example

```go
import (
        "context"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

stats, err := cli.GetPartitionStats(ctx, milvusclient.NewGetPartitionStatsOption("quick_setup", "partitionA"))
if err != nil {
    // handle err
}
fmt.Println(stats)
```

