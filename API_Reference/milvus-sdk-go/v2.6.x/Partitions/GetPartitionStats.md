# GetPartitionStats()

This operation returns statistics about a partition, such as row count.

```go
func (c *Client) GetPartitionStats(ctx context.Context, opt GetPartitionStatsOption, callOptions ...grpc.CallOption) (map[string]string, error)
```

**RETURN TYPE:**

*map[string]string, error*

**RETURNS:**

A map of statistics key-value pairs. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

stats, err := cli.GetPartitionStats(ctx, milvusclient.NewGetPartitionStatsOption("quick_setup", "partitionA"))
if err != nil {
	// handle error
}
fmt.Println(stats)
```
