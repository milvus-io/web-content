# SearchIterator()

This operation creates an iterator for paginating through large search result sets.

```go
func (c *Client) SearchIterator(ctx context.Context, option SearchIteratorOption, callOptions ...grpc.CallOption) (SearchIterator, error)
```

## Request Syntax

```go
option := milvusclient.NewSearchIteratorOption(collectionName, vector).
    WithBatchSize(batchSize).
    WithPartitions(partitionNames).
    WithFilter(expr).
    WithTemplateParam(key, val).
    WithOffset(offset).
    WithOutputFields(fieldNames).
    WithConsistencyLevel(consistencyLevel).
    WithANNSField(annsField).
    WithGroupByField(groupByField).
    WithGroupSize(groupSize).
    WithStrictGroupSize(strictGroupSize).
    WithIgnoreGrowing(ignoreGrowing).
    WithAnnParam(ap).
    WithSearchParam(key, value).
    WithIteratorLimit(limit)

result, err := client.SearchIterator(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

- **vector** (*entity.Vector*)

    The query vectors for similarity search.

**OPTION METHODS:**

- `WithBatchSize(batchSize int)`

    Sets the number of entities to fetch per iteration batch.

- `WithPartitions(partitionNames ...string)`

    Limits the operation to the specified partitions.

- `WithFilter(expr string)`

    Applies a boolean filter expression to narrow results.

- `WithTemplateParam(key string, val any)`

    Sets a template parameter for expression evaluation.

- `WithOffset(offset int)`

    Sets the number of results to skip before returning matches.

- `WithOutputFields(fieldNames ...string)`

    Specifies which fields to include in the returned results.

- `WithConsistencyLevel(consistencyLevel [entity.ConsistencyLevel](../Collection/ConsistencyLevel.md))`

    Sets the consistency level for the operation (Strong, Bounded, Session, or Eventually).

- `WithANNSField(annsField string)`

    Specifies which vector field to search against.

- `WithGroupByField(groupByField string)`

    Groups search results by a scalar field value.

- `WithGroupSize(groupSize int)`

    Sets the number of results to return per group.

- `WithStrictGroupSize(strictGroupSize bool)`

    Enforces exact group size for each group in results.

- `WithIgnoreGrowing(ignoreGrowing bool)`

    Skips searching in growing segments for faster but potentially incomplete results.

- `WithAnnParam(ap [index.AnnParam](AnnParam/AnnParam.md))`

    Sets the approximate nearest neighbor search parameters (e.g., nprobe, ef).

- `WithSearchParam(key, value string)`

    Sets a custom search parameter key-value pair.

- `WithIteratorLimit(limit int64)`

    WithIteratorLimit sets the limit of entries to iterate if limit < 0, then it will be set to Unlimited

**RETURN TYPE:**

*[SearchIterator](SearchIterator.md), error*

**RETURNS:**

A SearchIterator for paginating through search results. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"
	"io"

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

queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

iter, err := cli.SearchIterator(ctx, milvusclient.NewSearchIteratorOption(
	"quick_setup",
	entity.FloatVector(queryVector),
).WithOutputFields("id", "color"))
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
		fmt.Println(resultSet.IDs, resultSet.Scores)
	}
}
```
