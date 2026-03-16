# DropPartition()

This operation drops a partition and all its data permanently.

```go
func (c *Client) DropPartition(ctx context.Context, opt DropPartitionOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewDropPartitionOption(collectionName, partitionName)

err := client.DropPartition(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

The name of the target collection.

- **partitionName** (*string*)

The name of the partition to drop.

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

err = cli.DropPartition(ctx, milvusclient.NewDropPartitionOption("quick_setup", "partitionA"))
if err != nil {
	// handle error
}
```
