# Compact()

This operation triggers compaction to merge small data segments into larger ones for better performance.

```go
func (c *Client) Compact(ctx context.Context, option CompactOption, callOptions ...grpc.CallOption) (int64, error)
```

## Request Syntax

```go
option := milvusclient.NewCompactOption(collectionName)

result, err := client.Compact(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

**RETURN TYPE:**

*int64, error*

**RETURNS:**

The numeric result value. Returns an error if the operation fails.

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

collectionName := \`customized_setup_1\`

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle err
}

compactID, err := cli.Compact(ctx, milvusclient.NewCompactOption(collectionName))
if err != nil {
	// handle err
}
fmt.Println(compactID)
```
