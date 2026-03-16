# Search()

This operation performs an approximate nearest neighbor (ANN) search on vector fields.

```go
func (c *Client) Search(ctx context.Context, option SearchOption, callOptions ...grpc.CallOption) ([]ResultSet, error)
```

## Request Syntax

```go
option := milvusclient.NewSearchOption(collectionName, limit, vectors).
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
    WithFunctionReranker(fr)

result, err := client.Search(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

- **limit** (*int*)

    The maximum number of results to return.

- **vectors** (*[]entity.Vector*)

    The query vectors for the search.

**OPTION METHODS:**

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

- `WithAnnParam(ap index.AnnParam)`

    Sets the approximate nearest neighbor search parameters (e.g., nprobe, ef).

- `WithSearchParam(key, value string)`

    Sets a custom search parameter key-value pair.

- `WithFunctionReranker(fr *[entity.Function](../Collection/Function.md))`

    Applies a function-based reranker to the search results.

**RETURN TYPE:**

*[][ResultSet](ResultSet.md), error*

**RETURNS:**

The search or query results containing matched entities with scores and fields. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"
token := "root:Milvus"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
	APIKey:  token,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}

defer cli.Close(ctx)

queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
	"quick_setup", // collectionName
	3,             // limit
	[]entity.Vector{entity.FloatVector(queryVector)},
))
if err != nil {
	log.Fatal("failed to perform basic ANN search collection: ", err.Error())
}

for _, resultSet := range resultSets {
	log.Println("IDs: ", resultSet.IDs)
	log.Println("Scores: ", resultSet.Scores)
}
```
