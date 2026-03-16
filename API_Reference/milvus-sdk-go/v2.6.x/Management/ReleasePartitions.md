# ReleasePartitions()

This operation releases specific partitions from memory.

```go
func (c *Client) ReleasePartitions(ctx context.Context, option ReleasePartitionsOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewReleasePartitionsOption(collectionName, partitionNames)

err := client.ReleasePartitions(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

      The name of the target collection.

- **partitionNames** (*...string*)

      The name(s) of the partition(s).

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

err = cli.ReleasePartitions(ctx, milvusclient.NewReleasePartitionsOptions("quick_setup", "partitionA"))
if err != nil {
	// handle error
}
```
