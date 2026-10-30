# DescribeIndex()

This operation returns detailed information about an index, including its type and parameters.

```go
func (c *Client) DescribeIndex(ctx context.Context, opt DescribeIndexOption, callOptions ...grpc.CallOption) (IndexDescription, error)
```

## Request Syntax

```go
option := milvusclient.NewDescribeIndexOption(collectionName, indexName)

result, err := client.DescribeIndex(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

- **indexName** (*string*)

    The name of the index.

**RETURN TYPE:**

*IndexDescription, error*

**RETURNS:**

The index details including type, metric, and parameters. Returns an error if the operation fails.

```go
type IndexDescription struct {
    index.Index
    State index.IndexState
    PendingIndexRows int64
    TotalRows int64
    IndexedRows int64
}
```

**PARAMETERS:**

- **index.Index** *(embedded)*

    Inherits methods from index.Index. See [Index](Index/Index.md).

- **State** (*index.IndexState*)

    The current state.

- **PendingIndexRows** (*int64*)

    The number of rows pending indexing.

- **TotalRows** (*int64*)

    The total number of rows.

- **IndexedRows** (*int64*)

    The number of indexed rows.

**ERROR HANDLING:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle err
}

indexInfo, err := cli.DescribeIndex(ctx, milvusclient.NewDescribeIndexOption("my_collection", "my_index"))
if err != nil {
	// handle err
}
fmt.Println(indexInfo)
```
