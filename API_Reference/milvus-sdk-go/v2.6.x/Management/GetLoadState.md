# GetLoadState()

This operation returns the current load state and progress of a collection or partitions.

```go
func (c *Client) GetLoadState(ctx context.Context, option GetLoadStateOption, callOptions ...grpc.CallOption) (entity.LoadState, error)
```

## Request Syntax

```go
option := milvusclient.NewGetLoadStateOption(collectionName, partitionNames)

result, err := client.GetLoadState(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

- **partitionNames** (*...string*)

    The name(s) of the partition(s).

**RETURN TYPE:**

*[entity.LoadState](LoadState.md), error*

**RETURNS:**

The current load state of the collection or partitions. Returns an error if the operation fails.

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

collectionName := `customized_setup_1`

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle err
}

loadState, err := cli.GetLoadState(ctx, milvusclient.NewGetLoadStateOption(collectionName))
if err != nil {
	// handle err
}
fmt.Println(loadState)
```
