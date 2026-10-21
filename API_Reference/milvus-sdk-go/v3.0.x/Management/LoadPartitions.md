# LoadPartitions()

This operation loads specific partitions of a collection into memory.

```go
func (c *Client) LoadPartitions(ctx context.Context, option LoadPartitionsOption, callOptions ...grpc.CallOption) (LoadTask, error)
```

## Request Syntax

```go
option := milvusclient.NewLoadPartitionsOption(collectionName, partitionsNames).
    WithReplica(num).
    WithResourceGroup(resourceGroups).
    WithLoadFields(loadFields).
    WithSkipLoadDynamicField(skipFlag).
    WithRefresh(isRefresh)

result, err := client.LoadPartitions(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

- **partitionsNames** (*...string*)

    The partitions names.

**BUILDER METHODS:**

- `WithReplica(num int)`

    Sets the replica for the operation.

- `WithResourceGroup(resourceGroups ...string)`

    Sets the resource group for the operation.

- `WithLoadFields(loadFields ...string)`

    Specifies which fields to load into memory.

- `WithSkipLoadDynamicField(skipFlag bool)`

    Sets the skip load dynamic field for the operation.

- `WithRefresh(isRefresh bool)`

    Enables refresh mode to reload newly inserted data.

**RETURN TYPE:**

*LoadTask, error*

**RETURNS:**

An async task returned by LoadCollection/LoadPartitions. Call Await() to block until loading completes.

```go
type LoadTask struct {
}
```

**METHODS:**

- `Await(ctx context.Context) error`

    Blocks until the async operation completes or the context is cancelled. Returns an error if the operation fails.

**ERROR HANDLING:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
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

task, err := cli.LoadPartitions(ctx, milvusclient.NewLoadPartitionsOption("quick_setup", "partitionA"))

// sync wait collection to be loaded
err = task.Await(ctx)
if err != nil {
	// handle error
}
```
