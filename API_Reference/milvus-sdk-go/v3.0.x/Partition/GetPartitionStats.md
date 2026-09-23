# GetPartitionStats()

This operation returns statistics for a specified partition, such as its row count.

```go
func (c *Client) GetPartitionStats(ctx context.Context, opt GetPartitionStatsOption, callOptions ...grpc.CallOption) (map[string]string, error)
```

## Request Syntax

```go
option := milvusclient.NewGetPartitionStatsOption(collectionName, partitionName)

result, err := client.GetPartitionStats(ctx, option)
```

**PARAMETERS:**

- **option** (*GetPartitionStatsOption*)

    The options for getting the partition statistics. Use `NewGetPartitionStatsOption` to construct.

**BUILDER METHODS:**

- `NewGetPartitionStatsOption(collectionName string, partitionName string)`

    Creates options to get partition statistics. `collectionName` specifies the collection, and `partitionName` specifies the partition.

**RETURN TYPE:**

*map[string]string, error*

**RETURNS:**

A map of partition statistics key-value pairs. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

result, err := cli.GetPartitionStats(ctx, milvusclient.NewGetPartitionStatsOption("books", "chunk_1"))
if err != nil {
	// handle error
}
fmt.Println(result)
```
