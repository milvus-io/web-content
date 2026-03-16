# GetPersistentSegmentInfo()

This operation returns information about persistent data segments in a collection.

```go
func (c *Client) GetPersistentSegmentInfo(ctx context.Context, option GetPersistentSegmentInfoOption) ([]*entity.Segment, error)
```

**RETURN TYPE:**

*[]*[entity.Segment](Segment.md), error*

**RETURNS:**

A list of persistent segment details. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

      Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"
	"log"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
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
