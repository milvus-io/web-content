# LoadCollection()

This operation loads a collection into memory for search and query operations.

```go
func (c *Client) LoadCollection(ctx context.Context, option LoadCollectionOption, callOptions ...grpc.CallOption) (LoadTask, error)
```

## Request Syntax

```go
option := milvusclient.NewLoadCollectionOption(collectionName).
    WithReplica(num).
    WithResourceGroup(resourceGroups).
    WithLoadFields(loadFields).
    WithSkipLoadDynamicField(skipFlag).
    WithRefresh(isRefresh)

result, err := client.LoadCollection(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

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
    // contains unexported task state
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
	"log"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}

defer cli.Close(ctx)

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("customized_setup_1"))
if err != nil {
	// handle error
}

// sync wait collection to be loaded
err = loadTask.Await(ctx)
if err != nil {
	// handle error
}
```
