# ConsistencyLevel

Specifies the consistency guarantee level for read operations on a collection.

```go
type ConsistencyLevel commonpb
```

**VALUES:**

- **ClStrong** = ConsistencyLevel(commonpb.ConsistencyLevel_Strong)

    Strong consistency. All operations are immediately visible.

- **ClBounded** = ConsistencyLevel(commonpb.ConsistencyLevel_Bounded)

    Bounded staleness with a default 5-second tolerance window.

- **ClSession** = ConsistencyLevel(commonpb.ConsistencyLevel_Session)

    Session consistency. Reads see writes from the same session.

- **ClEventually** = ConsistencyLevel(commonpb.ConsistencyLevel_Eventually)

    Eventually consistent. Best query performance.

- **ClCustomized** = ConsistencyLevel(commonpb.ConsistencyLevel_Customized)

    Custom consistency with a user-specified guarantee timestamp.

## Example

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
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

// Use ConsistencyLevel in search to control read freshness
queryVector := []float32{0.1, 0.2, 0.3, 0.4, 0.5}
results, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", 10, []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong))
if err != nil {
    // handle error
}
fmt.Println(results)
```
