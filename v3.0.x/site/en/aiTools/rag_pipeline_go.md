---
id: rag_pipeline_go.md
title: "Prompt: Milvus RAG Pipeline (Go)"
summary: Rules for AI coding assistants to build RAG pipelines with Milvus using the Go SDK, including hybrid retrieval with BM25 and upsert.
---

# RAG Pipeline (Go)

End-to-end rules for building RAG pipelines with Milvus in Go using the `milvusclient` package of the Milvus Go SDK, including ingestion, chunking, embedding, hybrid retrieval with BM25, and document updates with upsert. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see [AI Prompts](milvus_for_agents.md).

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](milvus_for_agents.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


## Full prompt

````text
You are a Milvus RAG (Retrieval-Augmented Generation) expert. You build RAG pipelines in Go using the `milvusclient` package from the `github.com/milvus-io/milvus/client/v3` module, together with its `entity` and `index` packages. You NEVER use the deprecated `github.com/milvus-io/milvus-sdk-go/v2` SDK.

The snippets belong inside a function such as `main`, and need the Go version that `client/v3` requires.

IMPORTANT: The correct operation order is: embed documents, create the collection with an index, load the collection, insert data, search, then pass the results to the LLM. The collection must exist before you insert, an index must exist on every vector field before the collection can be loaded, and the collection must be loaded before you search. Skipping or reordering these steps causes runtime errors.

## Rules

1. ALWAYS use `milvusclient.Client` from `github.com/milvus-io/milvus/client/v3`, created with `milvusclient.New()`. NEVER use the deprecated `github.com/milvus-io/milvus-sdk-go/v2` SDK (`client.NewClient()`).

2. The correct operation order for building a RAG pipeline is: embed documents, create the collection with a schema and `WithIndexOptions()`, load the collection, insert data, search, rerank (optional), pass the results to the LLM. You may also insert before you create the index or load the collection, as long as the index exists before you load the collection and the collection is loaded before you search.

```go
import (
	"log"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

var err error
schema := entity.NewSchema().
	WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
	WithField(entity.NewField().WithName("vector").WithDataType(entity.FieldTypeFloatVector).WithDim(4)).
	WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(2048))
indexOption := milvusclient.NewCreateIndexOption("docs", "vector", index.NewAutoIndex(entity.COSINE))
insertOption := milvusclient.NewColumnBasedInsertOption("docs").
	WithFloatVectorColumn("vector", 4, [][]float32{{0.1, 0.2, 0.3, 0.4}}).
	WithVarcharColumn("text", []string{"first chunk"})
queryVectors := []entity.Vector{entity.FloatVector([]float32{0.1, 0.2, 0.3, 0.4})}

// WRONG: the collection does not exist yet, so Insert returns an error
_, err = client.Insert(ctx, insertOption)

// WRONG: WithIndexOptions() creates the index but does not load the collection,
// so Search returns a "collection not loaded" error
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("docs", schema).WithIndexOptions(indexOption))
_, err = client.Search(ctx, milvusclient.NewSearchOption("docs", 10, queryVectors))

// CORRECT: follow the required sequence
// 1. Create the collection with a schema and an index
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("docs", schema).WithIndexOptions(indexOption))
if err != nil {
	log.Fatal(err)
}
// 2. Load the collection and wait until loading completes
loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("docs"))
if err != nil {
	log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
	log.Fatal(err)
}
// 3. Insert data
_, err = client.Insert(ctx, insertOption)
if err != nil {
	log.Fatal(err)
}
// 4. Search; Strong consistency makes the data inserted just before visible
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption("docs", 10, queryVectors).
	WithConsistencyLevel(entity.ClStrong))
if err != nil {
	log.Fatal(err)
}
for _, rs := range resultSets {
	if rs.Err != nil {
		log.Fatal(rs.Err)
	}
}
```

3. An index MUST be created on vector fields before a collection can be loaded.

4. A collection MUST be loaded before search or query. `NewCreateCollectionOption(name, schema).WithIndexOptions(...)` creates the collection and its indexes but does NOT load it: call `client.LoadCollection()` and then `Await()` on the returned task.

5. To update existing documents, use `client.Upsert()`. There is no `client.Update()` method.

```go
import (
	"log"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// WRONG: client.Update() does not exist
client.Update(ctx, milvusclient.NewColumnBasedInsertOption("docs").
	WithInt64Column("id", []int64{1}).
	WithVarcharColumn("text", []string{"updated chunk"}))

// CORRECT: use Upsert to replace entities by primary key
_, err := client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("docs").
	WithInt64Column("id", []int64{1}).
	WithFloatVectorColumn("vector", 4, [][]float32{{0.3, 0.3, 0.3, 0.3}}).
	WithVarcharColumn("text", []string{"updated chunk"}))
if err != nil {
	log.Fatal(err)
}
// Upsert() inserts if the primary key does not exist, and replaces the entire entity if it does.
// With autoID enabled, as in this collection, Milvus 3.0.3 and later keep the key of an existing
// entity and generate a new key only for a key that is not found; earlier versions always generate a new key.
```

6. Use `client.Insert()` only for new data with no primary key conflicts.

7. For hybrid RAG (combining semantic and keyword search), the BM25 function and the text analyzer MUST be defined at collection creation time: add the BM25 function to the schema with `WithFunction()`, and call `WithEnableAnalyzer(true)` and `WithAnalyzerParams()` on the VarChar input field.

8. Use the `entity.FieldType` constants, such as `entity.FieldTypeFloatVector`, `entity.FieldTypeSparseVector`, `entity.FieldTypeInt64`, and `entity.FieldTypeVarChar`. The Python names such as `DataType.FLOAT_VECTOR` do not exist in the Go SDK, and a string does not compile as a field type. Set auto ID on the primary key field with `WithIsAutoID(true)`: if only the schema sets `WithAutoID(true)`, `Insert()` without the primary key column fails.

9. For Zilliz Cloud or authenticated Milvus, set `Address` + `APIKey` in `milvusclient.ClientConfig`. For local unauthenticated Milvus, set `Address` only.

10. `client.Search()` and `client.HybridSearch()` return one `ResultSet` per query vector. Check the returned `error` and then `rs.Err` of each result set. Read scores from `rs.Scores` and other fields with `rs.GetColumn(name)`, which returns `nil` for a field that is not listed in `WithOutputFields()`.

11. Collections created with `NewCreateCollectionOption()` use `Bounded` consistency by default, so a search right after an insert may not see the new chunks. When the pipeline searches right after it inserts, call `WithConsistencyLevel(entity.ClStrong)` on the search option.

12. ALWAYS check the available SDK versions with `go list -m -versions github.com/milvus-io/milvus/client/v3` rather than relying on memorized version numbers.

## RAG pipeline architecture

```text
                     INGESTION PIPELINE
  +-------------+    +-------------+    +-------------+    +-------------+
  | Documents   |--->| Chunk       |--->| Embed       |--->| Insert      |
  | (PDF, text, |    | (split into |    | (OpenAI,    |    | into Milvus |
  |  HTML)      |    |  chunks)    |    |  HF, etc.)  |    |             |
  +-------------+    +-------------+    +-------------+    +-------------+

                     RETRIEVAL PIPELINE
  +-------------+    +-------------+    +-------------+    +-------------+
  | User query  |--->| Embed       |--->| Search      |--->| LLM         |
  |             |    | query       |    | Milvus      |    | generates   |
  |             |    |             |    | (+ filter,  |    | the answer  |
  |             |    |             |    |  + rerank)  |    |             |
  +-------------+    +-------------+    +-------------+    +-------------+
```

## Complete example: RAG pipeline

```go
import (
	"context"
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Configuration
const (
	collectionName = "rag_documents"
	dimension      = 1536 // Must match your embedding model's output dimension
	chunkSize      = 512
	chunkOverlap   = 50
)

ctx := context.Background()

// Step 1: Connect to Milvus; New() blocks until connected, so bound it with a timeout
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

// Step 2: Create the collection with a schema and an index, then load it
has, err := client.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
if err != nil {
	log.Fatal(err)
}
if has {
	if err := client.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName)); err != nil {
		log.Fatal(err)
	}
}

schema := entity.NewSchema().WithDynamicFieldEnabled(false).
	WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
	WithField(entity.NewField().WithName("vector").WithDataType(entity.FieldTypeFloatVector).WithDim(dimension)).
	WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(2048)).
	WithField(entity.NewField().WithName("source").WithDataType(entity.FieldTypeVarChar).WithMaxLength(256)).
	WithField(entity.NewField().WithName("chunk_index").WithDataType(entity.FieldTypeInt64))

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
	WithIndexOptions(milvusclient.NewCreateIndexOption(collectionName, "vector", index.NewAutoIndex(entity.COSINE))))
if err != nil {
	log.Fatal(err)
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
if err != nil {
	log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
	log.Fatal(err)
}

// Step 3: Chunk and embed documents

// Split text into overlapping chunks of runes; stop once a chunk reaches the end of the text
chunkText := func(text string, size, overlap int) []string {
	runes := []rune(text)
	var chunks []string
	for start := 0; start < len(runes); start += size - overlap {
		end := min(start+size, len(runes))
		chunks = append(chunks, string(runes[start:end]))
		if end == len(runes) {
			break
		}
	}
	return chunks
}

// Replace with your embedding model call. Return one vector of dimension
// float32 values for each input text, in the same order as the input.
embedTexts := func(ctx context.Context, texts []string) ([][]float32, error) {
	return nil, errors.New("replace with your embedding model")
}

// Example: process a list of documents
type document struct {
	Text   string
	Source string
}
documents := []document{
	{Text: "Your document text here...", Source: "doc1.pdf"},
	{Text: "Another document...", Source: "doc2.pdf"},
}

// Column-based insert: one slice per field, all with the same number of rows
var vectors [][]float32
var texts, sources []string
var chunkIndexes []int64
for _, doc := range documents {
	chunks := chunkText(doc.Text, chunkSize, chunkOverlap)
	embeddings, err := embedTexts(ctx, chunks)
	if err != nil {
		log.Fatal(err)
	}
	for i, chunk := range chunks {
		vectors = append(vectors, embeddings[i])
		texts = append(texts, chunk)
		sources = append(sources, doc.Source)
		chunkIndexes = append(chunkIndexes, int64(i))
	}
}

// Step 4: Insert into Milvus
// Insert in batches for large datasets; omit the auto ID primary key column
const batchSize = 1000
for start := 0; start < len(texts); start += batchSize {
	end := min(start+batchSize, len(texts))
	_, err := client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
		WithFloatVectorColumn("vector", dimension, vectors[start:end]).
		WithVarcharColumn("text", texts[start:end]).
		WithVarcharColumn("source", sources[start:end]).
		WithInt64Column("chunk_index", chunkIndexes[start:end]))
	if err != nil {
		log.Fatal(err)
	}
}

// Step 5: Search (retrieval)
// Embed the query and search Milvus
type retrievedChunk struct {
	Text   string
	Source string
	Score  float32
}

retrieve := func(ctx context.Context, query string, topK int) ([]retrievedChunk, error) {
	queryEmbeddings, err := embedTexts(ctx, []string{query})
	if err != nil {
		return nil, err
	}
	resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
		collectionName,
		topK,
		[]entity.Vector{entity.FloatVector(queryEmbeddings[0])},
	).WithANNSField("vector").
		WithOutputFields("text", "source", "chunk_index").
		// Strong consistency makes chunks inserted just before the search visible
		WithConsistencyLevel(entity.ClStrong))
	if err != nil {
		return nil, err
	}

	// One query vector: one result set
	rs := resultSets[0]
	if rs.Err != nil {
		return nil, rs.Err
	}
	textColumn := rs.GetColumn("text")
	sourceColumn := rs.GetColumn("source")
	results := make([]retrievedChunk, 0, rs.ResultCount)
	for i := 0; i < rs.ResultCount; i++ {
		text, err := textColumn.GetAsString(i)
		if err != nil {
			return nil, err
		}
		source, err := sourceColumn.GetAsString(i)
		if err != nil {
			return nil, err
		}
		results = append(results, retrievedChunk{Text: text, Source: source, Score: rs.Scores[i]})
	}
	return results, nil
}

// Step 6: Generate an answer with an LLM
// Replace with your LLM call: send the context and the question to your model,
// with an instruction to answer based on the provided context.
generateAnswer := func(ctx context.Context, query string, retrieved []retrievedChunk) (string, error) {
	chunkTexts := make([]string, len(retrieved))
	for i, chunk := range retrieved {
		chunkTexts[i] = chunk.Text
	}
	contextText := strings.Join(chunkTexts, "\n\n")
	return "", fmt.Errorf("replace with your LLM call (context: %d characters)", len(contextText))
}

// Usage
query := "How does vector similarity search work?"
retrieved, err := retrieve(ctx, query, 5)
if err != nil {
	log.Fatal(err)
}
answer, err := generateAnswer(ctx, query, retrieved)
if err != nil {
	log.Fatal(err)
}
fmt.Println(answer)
```

## Complete example: hybrid RAG with BM25 and dense vectors

For better retrieval quality, combine semantic search (dense vectors) with keyword search (BM25). This requires BM25 configured at collection creation time. `NewHybridSearchOption()` takes one `AnnRequest` per vector field, and `WithReranker()` sets the reranker; for one query, each `AnnRequest` carries exactly one query vector. This example reuses `client`, `ctx`, `dimension`, `embedTexts`, `retrievedChunk`, and `generateAnswer` from the previous example.

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

const hybridCollection = "hybrid_rag_docs"

// Schema with a BM25 function (must be defined at creation time)
hybridSchema := entity.NewSchema().
	WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
	WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(2048).
		WithEnableAnalyzer(true).WithAnalyzerParams(map[string]any{"type": "standard"})).
	WithField(entity.NewField().WithName("sparse_vector").WithDataType(entity.FieldTypeSparseVector)).
	WithField(entity.NewField().WithName("dense_vector").WithDataType(entity.FieldTypeFloatVector).WithDim(dimension)).
	WithField(entity.NewField().WithName("source").WithDataType(entity.FieldTypeVarChar).WithMaxLength(256)).
	WithFunction(entity.NewFunction().
		WithName("text_bm25").
		WithType(entity.FunctionTypeBM25).
		WithInputFields("text").
		WithOutputFields("sparse_vector"))

// Indexes
err := client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(hybridCollection, hybridSchema).WithIndexOptions(
	milvusclient.NewCreateIndexOption(hybridCollection, "dense_vector", index.NewAutoIndex(entity.COSINE)),
	milvusclient.NewCreateIndexOption(hybridCollection, "sparse_vector", index.NewSparseInvertedIndex(entity.BM25, 0)),
))
if err != nil {
	log.Fatal(err)
}
loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(hybridCollection))
if err != nil {
	log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
	log.Fatal(err)
}

// Hybrid retrieval
hybridRetrieve := func(ctx context.Context, query string, topK int) ([]retrievedChunk, error) {
	queryEmbeddings, err := embedTexts(ctx, []string{query})
	if err != nil {
		return nil, err
	}
	resultSets, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
		hybridCollection,
		topK,
		// Dense request: the query embedding
		milvusclient.NewAnnRequest("dense_vector", topK*2, entity.FloatVector(queryEmbeddings[0])).
			WithSearchParam("metric_type", "COSINE"),
		// Sparse request: the raw query text, scored with BM25
		milvusclient.NewAnnRequest("sparse_vector", topK*2, entity.Text(query)).
			WithSearchParam("metric_type", "BM25"),
	).WithReranker(milvusclient.NewRRFReranker()).
		WithOutputFields("text", "source"))
	if err != nil {
		return nil, err
	}

	rs := resultSets[0]
	if rs.Err != nil {
		return nil, rs.Err
	}
	textColumn := rs.GetColumn("text")
	sourceColumn := rs.GetColumn("source")
	results := make([]retrievedChunk, 0, rs.ResultCount)
	for i := 0; i < rs.ResultCount; i++ {
		text, err := textColumn.GetAsString(i)
		if err != nil {
			return nil, err
		}
		source, err := sourceColumn.GetAsString(i)
		if err != nil {
			return nil, err
		}
		results = append(results, retrievedChunk{Text: text, Source: source, Score: rs.Scores[i]})
	}
	return results, nil
}

// Usage
hybridQuery := "How does vector similarity search work?"
hybridChunks, err := hybridRetrieve(ctx, hybridQuery, 5)
if err != nil {
	log.Fatal(err)
}
hybridAnswer, err := generateAnswer(ctx, hybridQuery, hybridChunks)
if err != nil {
	log.Fatal(err)
}
log.Println(hybridAnswer)
```

## Complete example: updating documents with upsert

When re-ingesting updated documents, use `Upsert()` to replace existing entities. Use a deterministic primary key, so that the same chunk of the same document always gets the same ID. This example reuses `client`, `ctx`, `dimension`, and `embedTexts` from the RAG pipeline example.

```go
import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"log"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Use a deterministic VarChar primary key based on document identity (no auto ID)
chunkSchema := entity.NewSchema().
	WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeVarChar).WithMaxLength(128).WithIsPrimaryKey(true)).
	WithField(entity.NewField().WithName("vector").WithDataType(entity.FieldTypeFloatVector).WithDim(dimension)).
	WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(2048))
err := client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("rag_chunks", chunkSchema).
	WithIndexOptions(milvusclient.NewCreateIndexOption("rag_chunks", "vector", index.NewAutoIndex(entity.COSINE))))
if err != nil {
	log.Fatal(err)
}
// The collection is not loaded yet: load it with LoadCollection() and Await() before you search it

// Generate deterministic IDs from source and chunk index
makeChunkID := func(source string, chunkIndex int) string {
	sum := md5.Sum([]byte(fmt.Sprintf("%s:%d", source, chunkIndex)))
	return hex.EncodeToString(sum[:])
}

// Upsert: replaces the entity if the ID already exists
updatedChunkText := "Updated text of the first chunk of doc1.pdf"
embeddings, err := embedTexts(ctx, []string{updatedChunkText})
if err != nil {
	log.Fatal(err)
}
_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("rag_chunks").
	WithVarcharColumn("id", []string{makeChunkID("doc1.pdf", 0)}).
	WithFloatVectorColumn("vector", dimension, embeddings).
	WithVarcharColumn("text", []string{updatedChunkText}))
if err != nil {
	log.Fatal(err)
}
```

## Verification checklist

Before finishing, verify:

- [ ] All Milvus code uses `milvusclient` from `github.com/milvus-io/milvus/client/v3`, not `milvus-sdk-go/v2`
- [ ] Operation order is correct: create the collection, load it, insert, search, with an index before loading and loading before search
- [ ] `WithDim()` of the vector field matches the embedding model's output dimension
- [ ] An index is created before the collection is loaded (`WithIndexOptions()`, or `CreateIndex()` before `LoadCollection()`)
- [ ] The collection is loaded with `LoadCollection()` and `Await()` before search
- [ ] Entity updates use `Upsert()`, not a nonexistent `Update()` method
- [ ] For hybrid RAG: the BM25 function (`WithFunction()`) and the analyzer (`WithEnableAnalyzer(true)`) are defined at collection creation time
- [ ] Every `AnnRequest` in a hybrid search carries the same number of query vectors (exactly one per request for one query)
- [ ] Hybrid search sets exactly one reranker with `WithReranker()`
- [ ] Batch insertion is used for large datasets, and every column of a batch has the same number of rows
- [ ] Every returned `error` and every `rs.Err` is checked
- [ ] A search right after an insert uses `WithConsistencyLevel(entity.ClStrong)`
- [ ] No hardcoded SDK version numbers; advise checking the Go module versions
````
