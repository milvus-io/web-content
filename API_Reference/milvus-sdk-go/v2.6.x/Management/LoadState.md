# LoadState

Represents the load state of a collection or partition, including progress percentage.

```go
type LoadState struct {
    State LoadStateCode
    Progress int64
}
```

**PARAMETERS:**

- **State** (*LoadStateCode*)

    The current load state of the collection or partitions.

    **Constants:**

    - **LoadStateLoading**

        The collection or partitions are being loaded.

    - **LoadStateLoaded**

        The collection or partitions have been fully loaded.

    - **LoadStateUnloading**

        The collection or partitions are being released.

    - **LoadStateNotLoad**

        The collection or partitions are not loaded.

- **Progress** (*int64*)

    The progress percentage.

## Example

Demonstrates LoadState usage.

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "127.0.0.1:19530",
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

loadState, err := cli.GetLoadState(ctx, milvusclient.NewGetLoadStateOption("quick_setup"))
if err != nil {
	// handle error
}
fmt.Println(loadState.State, loadState.Progress)

if loadState.State == entity.LoadStateLoaded {
	// collection is ready for search
}
```