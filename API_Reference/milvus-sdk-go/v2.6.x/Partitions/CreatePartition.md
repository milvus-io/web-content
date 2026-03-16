# CreatePartition()

This operation creates a new partition in a collection for organizing data.

```go
func (c *Client) CreatePartition(ctx context.Context, opt CreatePartitionOption, callOptions ...grpc.CallOption) error
```

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success, or an error describing what went wrong.

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

err = cli.CreatePartition(ctx, milvusclient.NewCreatePartitionOption("quick_setup", "partitionA"))
if err != nil {
	// handle error
}

partitionNames, err := cli.ListPartitions(ctx, milvusclient.NewListPartitionOption("quick_setup"))
if err != nil {
	// handle error
}

fmt.Println(partitionNames)
```
