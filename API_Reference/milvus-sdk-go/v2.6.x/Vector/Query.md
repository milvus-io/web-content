# Query()

This operation retrieves entities that match a boolean filter expression.

```go
func (c *Client) Query(ctx context.Context, option QueryOption, callOptions ...grpc.CallOption) (ResultSet, error)
```

## Request Syntax

```go
option := milvusclient.NewQueryOption(collectionName).
    WithFilter(expr).
    WithTemplateParam(key, val).
    WithOffset(offset).
    WithLimit(limit).
    WithOutputFields(fieldNames).
    WithConsistencyLevel(consistencyLevel).
    WithPartitions(partitionNames).
    WithIDs(ids)

result, err := client.Query(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

**OPTION METHODS:**

- `WithFilter(expr string)`

    Applies a boolean filter expression to narrow results.

- `WithTemplateParam(key string, val any)`

    Sets a template parameter for expression evaluation.

- `WithOffset(offset int)`

    Sets the number of results to skip before returning matches.

- `WithLimit(limit int)`

    Sets the maximum number of results to return.

- `WithOutputFields(fieldNames ...string)`

    Specifies which fields to include in the returned results.

- `WithConsistencyLevel(consistencyLevel [entity.ConsistencyLevel](../Collection/ConsistencyLevel.md))`

    Sets the consistency level for the operation (Strong, Bounded, Session, or Eventually).

- `WithPartitions(partitionNames ...string)`

    Limits the operation to the specified partitions.

- `WithIDs(ids column.Column)`

    Sets the i ds for the operation.

**RETURN TYPE:**

*[ResultSet](ResultSet.md), error*

**RETURNS:**

The search or query results containing matched entities with scores and fields. Returns an error if the operation fails.

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

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}

defer cli.Close(ctx)

rs, err := cli.Query(ctx, milvusclient.NewQueryOption("quick_setup").
	WithFilter("emb_type == 3").
	WithOutputFields("id", "emb_type"))
if err != nil {
	// handle error
}

fmt.Println(rs.GetColumn("id"))
```
