# CompactionState

Enumerates the possible states of a compaction operation.

```go
type CompactionState commonpb.CompactionState
```

**Constants:**

- **CompactionStateRunning** = CompactionState(commonpb.CompactionState_Executing)

    The compaction operation is currently executing.

- **CompactionStateCompleted** = CompactionState(commonpb.CompactionState_Completed)

    The compaction operation has completed.

## Example

Demonstrates CompactionState usage.

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

state, err := cli.GetCompactionState(ctx, milvusclient.NewGetCompactionStateOption(123))
if err != nil {
	// handle error
}
fmt.Println(state)

if state == entity.CompactionStateCompleted {
	// compaction finished
}
```