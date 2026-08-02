# QueryIterator()

This operation creates a query iterator that retrieves matching entities from a collection in batches. Use this for large result sets that should not be loaded into memory all at once.

```go
func (c *Client) QueryIterator(ctx context.Context, option QueryIteratorOption, callOptions ...grpc.CallOption) (QueryIterator, error)
```

## Request Syntax

```go
client.QueryIterator(ctx, milvusclient.NewQueryIteratorOption(collectionName).
    WithBatchSize(batchSize).
    WithPartitions(partitionNames...).
    WithFilter(expr).
    WithOutputFields(fieldNames...).
    WithConsistencyLevel(consistencyLevel).
    WithIteratorLimit(limit),
)
```

**OPTION METHODS:**

- `NewQueryIteratorOption(collectionName string)` -

    **[REQUIRED]**

    Creates a new query iterator option for the specified collection.

- `WithBatchSize(batchSize int)` -

    The number of entities to return per iteration batch. Default: `1000`.

- `WithPartitions(partitionNames ...string)` -

    The partitions to query. If not specified, all partitions are queried.

- `WithFilter(expr string)` -

    A boolean expression to filter entities. Only entities matching the expression are returned.

- `WithOutputFields(fieldNames ...string)` -

    The fields to include in the returned entities. If not specified, only the primary key field is returned.

- `WithConsistencyLevel(consistencyLevel entity.ConsistencyLevel)` -

    The consistency level for the query. Default: `Bounded`.

- `WithIteratorLimit(limit int64)` -

    The maximum total number of entities to iterate over. A negative value means unlimited. Default: `Unlimited` (-1).

**RETURNS:**

*QueryIterator, error*

The QueryIterator interface provides paginated access to query results. Call `Next()` repeatedly until `io.EOF` is returned.

**EXCEPTIONS:**

- **error** - The specified collection does not exist, invalid parameters, or the server is unreachable.

## Example

```go
import (
    "context"
    "fmt"
    "io"

    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx := context.Background()

iter, err := client.QueryIterator(ctx,
    milvusclient.NewQueryIteratorOption("my_collection").
        WithBatchSize(500).
        WithFilter("age > 18").
        WithOutputFields("name", "age"),
)
if err != nil {
    log.Fatal(err)
}

for {
    rs, err := iter.Next(ctx)
    if err == io.EOF {
        break
    }
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Got %d results\n", rs.Len())
}
```

## QueryIterator

The QueryIterator interface returned by the `QueryIterator()` method. It has a single method:

- `Next(ctx context.Context)` -

    Returns the next batch of query results as a `ResultSet`. When all results have been consumed, returns `io.EOF` as the error.