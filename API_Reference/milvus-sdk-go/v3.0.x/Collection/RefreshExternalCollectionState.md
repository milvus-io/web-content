# RefreshExternalCollectionState

Enumerates the possible states of a refresh external collection job.

```go
type RefreshExternalCollectionState milvuspb.RefreshExternalCollectionState
```

**Constants:**

- **RefreshStatePending** = RefreshExternalCollectionState(RefreshExternalCollectionState_RefreshPending)

    The refresh job is pending.

- **RefreshStateInProgress** = RefreshExternalCollectionState(RefreshExternalCollectionState_RefreshInProgress)

    The refresh job is in progress.

- **RefreshStateCompleted** = RefreshExternalCollectionState(RefreshExternalCollectionState_RefreshCompleted)

    The refresh job has completed.

- **RefreshStateFailed** = RefreshExternalCollectionState(RefreshExternalCollectionState_RefreshFailed)

    The refresh job has failed.

**METHODS:**

- `String() string`

    Returns the string representation of the state.

## Example

Demonstrates RefreshExternalCollectionState usage.

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
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

info, err := cli.GetRefreshExternalCollectionProgress(ctx, milvusclient.NewGetRefreshExternalCollectionProgressOption(123))
if err != nil {
	// handle error
}

switch info.State {
case entity.RefreshStatePending, entity.RefreshStateInProgress:
	fmt.Println("refresh in progress")
case entity.RefreshStateCompleted:
	fmt.Println("refresh completed")
case entity.RefreshStateFailed:
	fmt.Println("refresh failed:", info.Reason)
}
```
