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

*[IndexDescription](IndexDescription.md), error*

**RETURNS:**

The index details including type, metric, and parameters. Returns an error if the operation fails.

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
