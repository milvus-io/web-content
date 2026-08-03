# Flush()

This operation flushes all inserted data to persistent storage, ensuring data durability.

```go
func (c *Client) Flush(ctx context.Context, option FlushOption, callOptions ...grpc.CallOption) (*FlushTask, error)
```

## Request Syntax

```go
option := milvusclient.NewFlushOption(collName)

result, err := client.Flush(ctx, option)
```

**PARAMETERS:**

- **collName** (*string*)

    The coll name.

**RETURN TYPE:**

**[FlushTask](FlushTask.md), error*

**RETURNS:**

A FlushTask that can be used to wait for the flush to complete. Returns an error if the operation fails.

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

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle err
}

collectionName := \`customized_setup_1\`

task, err := cli.Flush(ctx, milvusclient.NewFlushOption(collectionName))
if err != nil {
	// handle err
}

err = task.Await(ctx)
if err != nil {
	// handle err
}
```
