# Search()

This operation performs an approximate nearest neighbor (ANN) search on a specified collection. You can use `NewSearchOption` for vector-based search or `NewSearchByIDsOption` to search by primary key IDs.

```go
func (c *Client) Search(ctx context.Context, option SearchOption, callOptions ...grpc.CallOption) ([]ResultSet, error)
```

## Request Syntax

**Vector search:**

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

resultSets, err := cli.Search(ctx, option)
```

**Search by primary key IDs:**

```go
option := milvusclient.NewSearchByIDsOption(collectionName, limit, ids).
    WithPartitions(partitionNames).
    WithFilter(expr).
    WithOutputFields(fieldNames)

resultSets, err := cli.Search(ctx, option)
```

**PARAMETERS:**

- **option** (*SearchOption*) -

    The search options. Use `NewSearchOption` for vector search or `NewSearchByIDsOption` for PK-based search.

**BUILDER METHODS:**

- `NewSearchOption(collectionName string, limit int, vectors []entity.Vector)`
This creates a search option for vector-based ANN search.

- `NewSearchByIDsOption(collectionName string, limit int, ids column.Column)`
This creates a search option to find entities by their primary key IDs.

- `WithPartitions(partitionNames ...string)`
This restricts the search to the specified partition names.

- `WithFilter(expr string)`
This applies a boolean expression filter to the search results.

- `WithTemplateParam(key string, val any)`
This sets a template parameter for expression evaluation.

- `WithOffset(offset int)`
This sets the number of results to skip before returning matches.

- `WithOutputFields(fieldNames ...string)`
This specifies which fields to return in the result sets.

- `WithConsistencyLevel(consistencyLevel entity.ConsistencyLevel)`
This sets the consistency level for the search.

- `WithANNSField(annsField string)`
This specifies the vector field to search on when a collection has multiple vector fields.

- `WithGroupByField(groupByField string)`
This groups search results by the specified field.

- `WithGroupSize(groupSize int)`
This sets the number of results to return per group when grouping is enabled.

- `WithStrictGroupSize(strictGroupSize bool)`
This enforces strict group size limits.

- `WithIgnoreGrowing(ignoreGrowing bool)`
This ignores growing segments during the search.

- `WithAnnParam(ap index.AnnParam)`
This sets the approximate nearest neighbor search parameters (e.g., nprobe, ef).

- `WithSearchParam(key, value string)`
This sets a custom search parameter key-value pair.

- `WithFunctionReranker(fr *entity.Function)`
This applies a function-based reranker to the search results.

**RETURN TYPE:**

*[]ResultSet, error*

**RETURNS:**

The search or query results containing matched entities with scores and fields. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check err != nil for failure details.

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
