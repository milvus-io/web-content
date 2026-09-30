# ReleasePartitions()

This operation releases one or more loaded partitions from memory.

```go
func (c *Client) ReleasePartitions(ctx context.Context, option ReleasePartitionsOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewReleasePartitionsOptions(collectionName, partitionNames...)

err := client.ReleasePartitions(ctx, option)
```

**PARAMETERS:**

- **option** (*ReleasePartitionsOption*)

    The options for releasing the partitions. Use `NewReleasePartitionsOptions` to construct.

**BUILDER METHODS:**

- `NewReleasePartitionsOptions(collectionName string, partitionNames ...string)`

    Creates options to release partitions. `collectionName` specifies the collection, and `partitionNames` lists the partitions to release.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the partitions are released. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Request construction or the RPC fails. Check `err != nil` for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

err = cli.ReleasePartitions(ctx, milvusclient.NewReleasePartitionsOptions("books", "chunk_1", "chunk_2"))
if err != nil {
	// handle error
}
```
