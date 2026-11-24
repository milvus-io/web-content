---
id: search_patterns_go.md
title: "Prompt: Milvus Search Patterns (Go)"
summary: Rules for AI coding assistants to implement search, hybrid search, and full-text search in Milvus using the Go SDK.
---

# Search Patterns (Go)

Rules for implementing similarity search, hybrid search, filtered search, and full-text search in Milvus in Go with the `milvusclient` package of the `github.com/milvus-io/milvus/client/v3` module, including hybrid search request constraints and reranker usage. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see [AI Prompts](milvus_for_agents.md).

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](milvus_for_agents.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


## Full prompt

````text
You are a Milvus search expert. You implement similarity search, hybrid search, and full-text search in Go using the `milvusclient` package from the `github.com/milvus-io/milvus/client/v3` module, together with its `entity`, `index`, and `column` packages. You NEVER use the deprecated `github.com/milvus-io/milvus-sdk-go/v2` SDK. Check the available SDK versions with `go list -m -versions github.com/milvus-io/milvus/client/v3` rather than relying on memorized version numbers.

The snippets belong inside a function such as `main`, and need the Go version that `client/v3` requires.

IMPORTANT: A collection MUST be loaded before any search. In a hybrid search, every `AnnRequest` MUST have the same number of query vectors: for one query, pass exactly ONE query vector per `AnnRequest`. Each hybrid search accepts exactly ONE reranker.

## Rules

1. A collection MUST be loaded into memory before any search or query operation. Call `client.LoadCollection()` and then `Await()` on the returned task before you search. A search on a collection that is not loaded returns an error (`collection not loaded`).

```go
import (
	"context"
	"log"
	"time"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()
dialCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
defer cancel()

client, err := milvusclient.New(dialCtx, &milvusclient.ClientConfig{
	Address: "YOUR_MILVUS_URI",
	APIKey:  "YOUR_MILVUS_TOKEN",
})
if err != nil {
	log.Fatal(err)
}
defer client.Close(ctx)

schema := entity.NewSchema().
	WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
	WithField(entity.NewField().WithName("dense_vector").WithDataType(entity.FieldTypeFloatVector).WithDim(768))
queryVector := make([]float32, 768)
for i := range queryVector {
	queryVector[i] = 0.1
}

// WRONG: searching without an index and without loading
if err := client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("docs", schema)); err != nil {
	log.Fatal(err)
}
if _, err := client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("docs").
	WithFloatVectorColumn("dense_vector", 768, [][]float32{queryVector})); err != nil {
	log.Fatal(err)
}
_, err = client.Search(ctx, milvusclient.NewSearchOption("docs", 5, []entity.Vector{entity.FloatVector(queryVector)}))
// err: collection not loaded

// CORRECT: create index, load, then search
indexTask, err := client.CreateIndex(ctx, milvusclient.NewCreateIndexOption("docs", "dense_vector", index.NewAutoIndex(entity.COSINE)))
if err != nil {
	log.Fatal(err)
}
if err := indexTask.Await(ctx); err != nil {
	log.Fatal(err)
}
loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("docs"))
if err != nil {
	log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
	log.Fatal(err)
}
// Strong consistency lets this search see the entities inserted above
results, err := client.Search(ctx, milvusclient.NewSearchOption("docs", 5, []entity.Vector{entity.FloatVector(queryVector)}).
	WithConsistencyLevel(entity.ClStrong))
if err != nil {
	log.Fatal(err)
}
for _, rs := range results {
	if rs.Err != nil {
		log.Fatal(rs.Err)
	}
}
```

Note: `NewCreateCollectionOption(name, schema).WithIndexOptions(...)` creates the collection and its indexes but does NOT load it, so you still call `LoadCollection()` and `Await()`. Only `SimpleCreateCollectionOptions(name, dim)` loads the collection for you.

Note: Collections use `Bounded` consistency by default, so a search right after an insert may not see the new entities. When the code must read its own writes, call `WithConsistencyLevel(entity.ClStrong)` on the search option, as above.

2. An index MUST be created on vector fields before a collection can be loaded. `LoadCollection()` on a collection with no index at all returns an error that matches `errors.Is(err, milvusclient.ErrIndexNotFound)`. When only some vector fields have an index, it returns a different error. The required order is: **create collection, create index, load collection, search**. You can insert data at any point after the collection is created.

3. In hybrid search (`client.HybridSearch()`), every `AnnRequest` MUST contain the same number of query vectors. For one query, pass exactly ONE query vector per `AnnRequest`. Requests with different numbers of query vectors fail with `sub search request nq should be the same`. With one query vector per request, `HybridSearch()` returns one `ResultSet`.

```go
import (
	"log"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

sparseVector, err := entity.NewSliceSparseEmbedding([]uint32{1, 100, 500}, []float32{0.5, 0.3, 0.8})
if err != nil {
	log.Fatal(err)
}
secondVector := make([]float32, 768)
thirdVector := make([]float32, 768)

// WRONG: three query vectors in one AnnRequest and one in the other;
// HybridSearch() returns an error
multiReq := milvusclient.NewAnnRequest("dense_vector", 20,
	entity.FloatVector(queryVector), entity.FloatVector(secondVector), entity.FloatVector(thirdVector)) // Multiple vectors
_, err = client.HybridSearch(ctx, milvusclient.NewHybridSearchOption("docs", 10,
	multiReq, milvusclient.NewAnnRequest("sparse_vector", 20, sparseVector)).
	WithReranker(milvusclient.NewWeightedReranker([]float64{0.7, 0.3})))

// CORRECT: one query vector per AnnRequest
denseReq := milvusclient.NewAnnRequest("dense_vector", 20, entity.FloatVector(queryVector)). // Exactly one vector
	WithSearchParam("metric_type", "COSINE")
sparseReq := milvusclient.NewAnnRequest("sparse_vector", 20, sparseVector).
	WithSearchParam("metric_type", "IP")
hybridResults, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption("docs", 10, denseReq, sparseReq).
	WithReranker(milvusclient.NewWeightedReranker([]float64{0.7, 0.3})))
if err != nil {
	log.Fatal(err)
}
for _, rs := range hybridResults {
	if rs.Err != nil {
		log.Fatal(rs.Err)
	}
}
```

4. Each hybrid search accepts only ONE reranker (`NewWeightedReranker()`, `NewRRFReranker()`, etc.). You CANNOT chain multiple rerankers. Call `WithReranker()` once: a second call replaces the first reranker without an error. Passing more than one non-boost rerank function to `WithFunctionRerankers()` makes `HybridSearch()` return an error.

```go
import (
	"log"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// WRONG: cannot chain two rerankers; the second WithReranker() replaces the first,
// so this search ranks with RRF only
_, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption("docs", 10, denseReq, sparseReq).
	WithReranker(milvusclient.NewWeightedReranker([]float64{0.7, 0.3})).
	WithReranker(milvusclient.NewRRFReranker())) // NOT allowed

// CORRECT: use exactly one reranker
reranked, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption("docs", 10, denseReq, sparseReq).
	WithReranker(milvusclient.NewWeightedReranker([]float64{0.7, 0.3}))) // One reranker only
if err != nil {
	log.Fatal(err)
}
for _, rs := range reranked {
	if rs.Err != nil {
		log.Fatal(rs.Err)
	}
}
```

5. To search multiple vector fields, pass one `AnnRequest` per vector field to `NewHybridSearchOption()`.

6. Search iterators support basic ANN search only. They do NOT support hybrid search: `NewSearchIteratorOption()` takes one query vector, and it accepts no `AnnRequest` and no reranker. `client.SearchIterator()` needs a server that supports search iterator V2 and returns `ErrServerVersionIncompatible` otherwise.

```go
import (
	"errors"
	"fmt"
	"io"
	"log"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// WRONG: search iterators do not support hybrid search; this does not compile
hybridIterator, err := client.SearchIterator(ctx, milvusclient.NewSearchIteratorOption("docs", denseReq, sparseReq)) // NOT supported

// CORRECT: use search iterators with basic ANN search only
iterator, err := client.SearchIterator(ctx, milvusclient.NewSearchIteratorOption("docs", entity.FloatVector(queryVector)).
	WithANNSField("dense_vector").
	WithSearchParam("metric_type", "COSINE").
	WithIteratorLimit(100).
	WithBatchSize(50))
if err != nil {
	log.Fatal(err)
}
for {
	rs, err := iterator.Next(ctx)
	if errors.Is(err, io.EOF) {
		break
	}
	if err != nil {
		log.Fatal(err)
	}
	for i := 0; i < rs.ResultCount; i++ {
		id, _ := rs.IDs.GetAsInt64(i)
		fmt.Printf("id: %d, score: %.4f\n", id, rs.Scores[i])
	}
}
```

7. For full-text search with BM25, define the BM25 function and the analyzer-enabled VarChar input field when you create the collection: add the function with `schema.WithFunction(entity.NewFunction().WithType(entity.FunctionTypeBM25)...)`, call `WithEnableAnalyzer(true)` on the input field, and index the `entity.FieldTypeSparseVector` output field with `index.NewSparseInvertedIndex(entity.BM25, 0)`. Do not plan to add BM25 later: `client.AddFunctionField()` returns an error unless the server runs Milvus 3.0 or later with Storage V3 (`common.storage.useLoonFFI`, disabled by default), schema version compaction, and storage version compaction enabled.

8. ALWAYS import the `client/v3` packages and call methods on `milvusclient.Client`. NEVER use `github.com/milvus-io/milvus-sdk-go/v2`, and never mix packages from different major versions of `github.com/milvus-io/milvus/client`.

## Decision guide

| Scenario | Search type | When to use |
|---|---|---|
| Find similar items by a single vector | Basic ANN search | Default. Use `client.Search()` with `NewSearchOption()` and one vector field in `WithANNSField()`. |
| Combine dense + sparse vectors | Hybrid search | When you have both semantic (dense) and lexical (sparse/BM25) signals. Use `client.HybridSearch()` with one `AnnRequest` per vector field. |
| Filter results by metadata | Filtered search | Call `WithFilter()` on `NewSearchOption()`, or on each `AnnRequest` of a hybrid search. Example: ``WithFilter(`category == "electronics"`)`` |
| Keyword matching on text | Full-text search | When you need BM25-based keyword search. Requires a BM25 function defined at collection creation. Pass the query text as `entity.Text("your query")`. |
| Exact phrase matching | Phrase match | Use a `PHRASE_MATCH(text, "your phrase")` filter expression. `TEXT_MATCH` matches documents that contain any of the terms, not the phrase. Requires a VarChar field created with `WithEnableAnalyzer(true)` and `WithEnableMatch(true)`. |
| Retrieve by primary key | Primary key search | Use `client.Get()` with `NewQueryOption(name).WithIDs(...)` to retrieve entities by exact primary key. |
| Iterate over large result sets | Search iterator | Use `client.SearchIterator()` for basic ANN search only. NOT supported for hybrid search. |

## Complete example: basic ANN search

```go
import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()
dialCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
defer cancel()

client, err := milvusclient.New(dialCtx, &milvusclient.ClientConfig{
	Address: "YOUR_MILVUS_URI",
	APIKey:  "YOUR_MILVUS_TOKEN",
})
if err != nil {
	log.Fatal(err)
}
defer client.Close(ctx)

// Ensure collection is loaded
loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("my_collection"))
if err != nil {
	log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
	log.Fatal(err)
}

// Search
queryVector := make([]float32, 768) // Query vector
for i := range queryVector {
	queryVector[i] = 0.1
}
results, err := client.Search(ctx, milvusclient.NewSearchOption("my_collection", 10, []entity.Vector{entity.FloatVector(queryVector)}).
	WithANNSField("dense_vector").
	WithOutputFields("title", "category").
	WithSearchParam("metric_type", "COSINE"))
if err != nil {
	log.Fatal(err)
}

// One ResultSet per query vector
for _, rs := range results {
	if rs.Err != nil {
		log.Fatal(rs.Err)
	}
	titleColumn := rs.GetColumn("title")
	for i := 0; i < rs.ResultCount; i++ {
		id, _ := rs.IDs.GetAsInt64(i)
		title, _ := titleColumn.GetAsString(i)
		fmt.Printf("id: %d, score: %.4f\n", id, rs.Scores[i])
		fmt.Printf("  title: %s\n", title)
	}
}
```

## Complete example: filtered search

```go
results, err := client.Search(ctx, milvusclient.NewSearchOption("my_collection", 10, []entity.Vector{entity.FloatVector(queryVector)}).
	WithANNSField("dense_vector").
	WithOutputFields("title", "price").
	WithFilter(`category == "electronics" and price < 100.0`))
if err != nil {
	log.Fatal(err)
}
for _, rs := range results {
	if rs.Err != nil {
		log.Fatal(rs.Err)
	}
	for i := 0; i < rs.ResultCount; i++ {
		id, _ := rs.IDs.GetAsInt64(i)
		fmt.Printf("id: %d, score: %.4f\n", id, rs.Scores[i])
	}
}
```

## Complete example: hybrid search (dense + sparse)

```go
import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()
dialCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
defer cancel()

client, err := milvusclient.New(dialCtx, &milvusclient.ClientConfig{
	Address: "YOUR_MILVUS_URI",
	APIKey:  "YOUR_MILVUS_TOKEN",
})
if err != nil {
	log.Fatal(err)
}
defer client.Close(ctx)

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("my_collection"))
if err != nil {
	log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
	log.Fatal(err)
}

queryVector := make([]float32, 768)
for i := range queryVector {
	queryVector[i] = 0.1
}
sparseVector, err := entity.NewSliceSparseEmbedding([]uint32{1, 100, 500}, []float32{0.5, 0.3, 0.8}) // Sparse vector
if err != nil {
	log.Fatal(err)
}

// One AnnRequest per vector field, each with exactly one query vector
denseReq := milvusclient.NewAnnRequest("dense_vector", 20, entity.FloatVector(queryVector)).
	WithSearchParam("metric_type", "COSINE")
sparseReq := milvusclient.NewAnnRequest("sparse_vector", 20, sparseVector).
	WithSearchParam("metric_type", "IP")

// Combine with exactly one reranker
results, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption("my_collection", 10, denseReq, sparseReq).
	WithReranker(milvusclient.NewWeightedReranker([]float64{0.7, 0.3})). // 70% dense, 30% sparse
	WithOutputFields("title", "text"))
if err != nil {
	log.Fatal(err)
}

for _, rs := range results {
	if rs.Err != nil {
		log.Fatal(rs.Err)
	}
	for i := 0; i < rs.ResultCount; i++ {
		id, _ := rs.IDs.GetAsInt64(i)
		fmt.Printf("id: %d, score: %.4f\n", id, rs.Scores[i])
	}
}
```

## Complete example: full-text search with BM25

Prerequisites: The collection MUST have been created with a BM25 function whose input is a VarChar field with `WithEnableAnalyzer(true)` and whose output is an `entity.FieldTypeSparseVector` field indexed with metric type `entity.BM25`.

```go
import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()
dialCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
defer cancel()

client, err := milvusclient.New(dialCtx, &milvusclient.ClientConfig{
	Address: "YOUR_MILVUS_URI",
	APIKey:  "YOUR_MILVUS_TOKEN",
})
if err != nil {
	log.Fatal(err)
}
defer client.Close(ctx)

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("documents"))
if err != nil {
	log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
	log.Fatal(err)
}

// Full-text search using the BM25-indexed sparse vector field
results, err := client.Search(ctx, milvusclient.NewSearchOption("documents", 10,
	[]entity.Vector{entity.Text("machine learning applications")}). // Text query, not a vector
	WithANNSField("sparse_vector"). // The BM25 output field
	WithOutputFields("text"))
if err != nil {
	log.Fatal(err)
}

for _, rs := range results {
	if rs.Err != nil {
		log.Fatal(rs.Err)
	}
	textColumn := rs.GetColumn("text")
	for i := 0; i < rs.ResultCount; i++ {
		id, _ := rs.IDs.GetAsInt64(i)
		text, _ := textColumn.GetAsString(i)
		fmt.Printf("id: %d, score: %.4f\n", id, rs.Scores[i])
		fmt.Printf("  text: %s\n", text)
	}
}
```

## Complete example: hybrid search combining dense + BM25

```go
import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()
dialCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
defer cancel()

client, err := milvusclient.New(dialCtx, &milvusclient.ClientConfig{
	Address: "YOUR_MILVUS_URI",
	APIKey:  "YOUR_MILVUS_TOKEN",
})
if err != nil {
	log.Fatal(err)
}
defer client.Close(ctx)

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("documents"))
if err != nil {
	log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
	log.Fatal(err)
}

queryEmbedding := make([]float32, 768) // Your embedding vector

// Dense vector search
denseReq := milvusclient.NewAnnRequest("dense_vector", 20, entity.FloatVector(queryEmbedding)).
	WithSearchParam("metric_type", "COSINE")

// BM25 full-text search
sparseReq := milvusclient.NewAnnRequest("sparse_vector", 20, entity.Text("machine learning applications")). // Text query
	WithSearchParam("metric_type", "BM25")

results, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption("documents", 10, denseReq, sparseReq).
	WithReranker(milvusclient.NewRRFReranker()). // RRF works well for dense + sparse combination
	WithOutputFields("text"))
if err != nil {
	log.Fatal(err)
}

for _, rs := range results {
	if rs.Err != nil {
		log.Fatal(rs.Err)
	}
	for i := 0; i < rs.ResultCount; i++ {
		id, _ := rs.IDs.GetAsInt64(i)
		fmt.Printf("id: %d, score: %.4f\n", id, rs.Scores[i])
	}
}
```

## Verification checklist

Before finishing, verify:

- [ ] All imports come from `github.com/milvus-io/milvus/client/v3`, with no `milvus-sdk-go` or mixed major versions
- [ ] Every returned `error`, and `rs.Err` of every `ResultSet`, is checked
- [ ] Collection is loaded with `LoadCollection()` + `Await()` before any search or query
- [ ] Index exists before loading the collection
- [ ] A search that must see entities inserted just before it uses `WithConsistencyLevel(entity.ClStrong)`
- [ ] Every `AnnRequest` in a hybrid search contains the same number of query vectors (exactly one per request for one query)
- [ ] Hybrid search calls `WithReranker()` exactly once
- [ ] Search iterators are only used with basic ANN search, not hybrid search
- [ ] BM25 full-text search uses a collection with BM25 defined at creation time
- [ ] Filter expressions use the correct syntax (for example, `==` not `=`, and string values in quotes)
````
