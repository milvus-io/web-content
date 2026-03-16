# Delete()

This operation deletes entities from a collection by primary key values or filter expression.

```go
func (c *Client) Delete(ctx context.Context, option DeleteOption, callOptions ...grpc.CallOption) (DeleteResult, error)
```

## Request Syntax

```go
option := milvusclient.NewDeleteOption(collectionName).
    WithExpr(expr).
    WithInt64IDs(fieldName, ids).
    WithStringIDs(fieldName, ids).
    WithPartition(partitionName)

result, err := client.Delete(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

      The name of the target collection.

**OPTION METHODS:**

- `WithExpr(expr string)`

      Sets the expr for the operation.

- `WithInt64IDs(fieldName string, ids []int64)`

      Sets the int64 i ds for the operation.

- `WithStringIDs(fieldName string, ids []string)`

      Sets the string i ds for the operation.

- `WithPartition(partitionName string)`

      Sets the partition for the operation.

**RETURN TYPE:**

*[DeleteResult](DeleteResult.md), error*

**RETURNS:**

The delete result. Returns an error if the operation fails.

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
	// handle error
}

defer cli.Close(ctx)

res, err := cli.Delete(ctx, milvusclient.NewDeleteOption("quick_setup").
	WithInt64IDs("id", []int64{1, 2, 3}))
if err != nil {
	// handle error
}

fmt.Println(res.DeleteCount)
```
