# Reranker

Interface for rerankers used by `HybridSearch()` to combine and rank the results of multiple ANN sub-requests. Use `NewRRFReranker()` or `NewWeightedReranker()` to create instances.

```go
type Reranker interface {
    GetParams() []*commonpb.KeyValuePair
}
```

**METHODS:**

- `GetParams() []*commonpb.KeyValuePair`

    Returns the rerank strategy and parameters as key-value pairs.

## Constructors

- `NewRRFReranker()`

    Creates a Reciprocal Rank Fusion (RRF) reranker. The default `k` is 60.

- `NewWeightedReranker(weights []float64)`

    Creates a weighted reranker with one weight per ANN sub-request.

## RRFReranker methods

- `WithK(k float64)`

    Sets the RRF `k` smoothing factor.

- `WithWeights(weights []float64)`

    Sets optional reciprocal-rank coefficients in ANN request order. The server requires a non-empty slice, one value in [0, 1] per ANN request; nil and empty slices are serialized so the server can reject them.

## Example

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "127.0.0.1:19530",
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}
defer cli.Close(ctx)

denseVectors := []entity.Vector{entity.FloatVector([]float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835})}
sparse, err := entity.NewSliceSparseEmbedding([]uint32{1, 2}, []float32{0.5, 0.3})
if err != nil {
	log.Fatal("failed to construct sparse embedding: ", err.Error())
}

denseReq := milvusclient.NewAnnRequest("dense_vector", 10, denseVectors...)
sparseReq := milvusclient.NewAnnRequest("sparse_vector", 10, []entity.Vector{sparse}...)

resultSets, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
	"quick_setup",
	10,
	denseReq, sparseReq,
).WithReranker(milvusclient.NewRRFReranker()))
if err != nil {
	log.Fatal("failed to perform hybrid search: ", err.Error())
}
_ = resultSets
```
