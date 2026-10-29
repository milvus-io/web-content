# GetPersistentSegmentInfo()

This operation returns information about persistent data segments in a collection.

```go
func (c *Client) GetPersistentSegmentInfo(ctx context.Context, option GetPersistentSegmentInfoOption) ([]*entity.Segment, error)
```

**RETURN TYPE:**

*[]*entity.Segment, error*

**RETURNS:**

A list of persistent segment details. Returns an error if the operation fails.

```go
type Segment struct {
    ID           int64
    CollectionID int64
    ParititionID int64
    NumRows      int64
    State        commonpb.SegmentState
}
```

**PARAMETERS:**

- **ID** (*int64*) -
The unique identifier of the segment.

- **CollectionID** (*int64*) -
The identifier of the collection the segment belongs to.

- **ParititionID** (*int64*) -
The identifier of the partition the segment belongs to.

- **NumRows** (*int64*) -
The number of rows in the segment.

- **State** (*commonpb.SegmentState*) -
The current segment state.

**METHODS:**

- `Flushed() bool`

    Returns true when the segment is in the flushed state.

**ERROR HANDLING:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"
	"log"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "localhost:19530",
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}
defer cli.Close(ctx)

segments, err := cli.GetPersistentSegmentInfo(ctx, milvusclient.NewGetPersistentSegmentInfoOption("quick_setup"))
if err != nil {
	// handle error
}
fmt.Println(segments)
```
