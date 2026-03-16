# QueryIterator()

This operation creates an iterator for paginating through large query result sets.

```go
func (c *Client) QueryIterator(ctx context.Context, option QueryIteratorOption, callOptions ...grpc.CallOption) (QueryIterator, error)
```

## Request Syntax

```go
option := milvusclient.NewQueryIteratorOption(collectionName).
    WithBatchSize(batchSize).
    WithPartitions(partitionNames).
    WithFilter(expr).
    WithOutputFields(fieldNames).
    WithConsistencyLevel(consistencyLevel).
    WithIteratorLimit(limit)

result, err := client.QueryIterator(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

**OPTION METHODS:**

- `WithBatchSize(batchSize int)`

    Sets the number of entities to fetch per iteration batch.

- `WithPartitions(partitionNames ...string)`

    Limits the operation to the specified partitions.

- `WithFilter(expr string)`

    Applies a boolean filter expression to narrow results.

- `WithOutputFields(fieldNames ...string)`

    Specifies which fields to include in the returned results.

- `WithConsistencyLevel(consistencyLevel [entity.ConsistencyLevel](../Collection/ConsistencyLevel.md))`

    Sets the consistency level for the operation (Strong, Bounded, Session, or Eventually).

- `WithIteratorLimit(limit int64)`

    WithIteratorLimit sets the limit of entries to iterate if limit < 0, then it will be set to Unlimited

**RETURN TYPE:**

*[QueryIterator](QueryIterator.md), error*

**RETURNS:**

A QueryIterator for paginating through query results. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"
	"io"

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

iter, err := cli.QueryIterator(ctx, milvusclient.NewQueryIteratorOption("quick_setup").
	WithFilter("color like "red%"").
	WithOutputFields("id", "color"))
if err != nil {
	// handle error
}

for {
	resultSet, err := iter.Next(ctx)
	if err == io.EOF {
		break
	}
	if err != nil {
		// handle error
	}
	for i := 0; i < resultSet.Len(); i++ {
		fmt.Println(resultSet.IDs)
	}
}
```
