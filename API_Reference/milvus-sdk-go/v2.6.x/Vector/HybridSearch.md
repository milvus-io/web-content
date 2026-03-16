# HybridSearch()

This operation performs a multi-vector search across multiple vector fields and merges results using a reranking strategy.

```go
func (c *Client) HybridSearch(ctx context.Context, option HybridSearchOption, callOptions ...grpc.CallOption) ([]ResultSet, error)
```

## Request Syntax

```go
option := milvusclient.NewHybridSearchOption(collectionName, limit, annRequests).
    WithConsistencyLevel(cl).
    WithPartitons(partitions).
    WithPartitions(partitions).
    WithOutputFields(outputFields).
    WithReranker(reranker).
    WithFunctionRerankers(functionReranker).
    WithOffset(offset)

result, err := client.HybridSearch(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

      The name of the target collection.

- **limit** (*int*)

      The maximum number of results to return.

- **annRequests** (*...*AnnRequest*)

      The ann requests.

**OPTION METHODS:**

- `WithConsistencyLevel(cl [entity.ConsistencyLevel](../Collection/ConsistencyLevel.md))`

      Sets the consistency level for the operation (Strong, Bounded, Session, or Eventually).

- `WithPartitons(partitions ...string)`

      Deprecated: typo, use WithPartitions instead

- `WithPartitions(partitions ...string)`

      Limits the operation to the specified partitions.

- `WithOutputFields(outputFields ...string)`

      Specifies which fields to include in the returned results.

- `WithReranker(reranker Reranker)`

      Sets the reranker for the operation.

- `WithFunctionRerankers(functionReranker *[entity.Function](../Collection/Function.md))`

      Sets the function rerankers for the operation.

- `WithOffset(offset int)`

      Sets the number of results to skip before returning matches.

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
sparseVector, _ := entity.NewSliceSparseEmbedding([]uint32{1, 21, 100}, []float32{0.1, 0.2, 0.3})

resultSets, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
	"quick_setup",
	3,
	milvusclient.NewAnnRequest("dense_vector", 10, entity.FloatVector(queryVector)),
	milvusclient.NewAnnRequest("sparse_vector", 10, sparseVector),
).WithReranker(milvusclient.NewRRFReranker()))
if err != nil {
	log.Fatal("failed to perform basic ANN search collection: ", err.Error())
}

for _, resultSet := range resultSets {
	log.Println("IDs: ", resultSet.IDs)
	log.Println("Scores: ", resultSet.Scores)
}
```
