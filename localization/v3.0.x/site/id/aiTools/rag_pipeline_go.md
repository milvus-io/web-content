---
id: rag_pipeline_go.md
title: 'Prompt: Jalur Pemrosesan Milvus RAG (Go)'
summary: >-
  Panduan bagi asisten pemrograman AI untuk membangun pipa RAG dengan Milvus
  menggunakan Go SDK, termasuk pengambilan data hibrida dengan BM25 dan upsert.
---
<h1 id="RAG-Pipeline-Go" class="common-anchor-header">Pipa RAG (Go)<button data-href="#RAG-Pipeline-Go" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>Aturan end-to-end untuk membangun pipa RAG dengan Milvus dalam Go menggunakan paket ` <code translate="no">milvusclient</code> ` dari Milvus Go SDK, termasuk pengambilan data, pemotongan, embedding, pencarian hibrida dengan BM25, dan pembaruan dokumen dengan upsert. Salin prompt lengkap di bawah ini ke alat AI Anda untuk menerapkan aturan ini secara otomatis. Untuk ikhtisar semua prompt, lihat <a href="/docs/id/milvus_for_agents.md">Prompt AI</a>.</p>
<h2 id="How-to-use-this-prompt" class="common-anchor-header">Cara menggunakan prompt ini<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ol>
<li><strong>Salin</strong> prompt lengkap dari bagian " <a href="#full-prompt">Prompt Lengkap</a> " di bawah ini.</li>
<li><strong>Simpan</strong> ke lokasi yang diharapkan oleh alat AI Anda — lihat <a href="/docs/id/milvus_for_agents.md">tabel lingkungan</a> untuk detail penempatan.</li>
<li>Asisten AI Anda akan secara otomatis menerapkan aturan ini saat membuat atau meninjau kode Milvus.</li>
</ol>
<p>Bagi pengguna <strong>Cursor</strong>: salin prompt dari bagian " <a href="#full-prompt">Full prompt</a> " dan simpan di bawah " <code translate="no">.cursor/rules/</code> " dalam proyek Anda.</p>
<h2 id="Full-prompt" class="common-anchor-header">Prompt lengkap<button data-href="#Full-prompt" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus RAG (Retrieval-Augmented Generation) expert. You build RAG pipelines in Go using the `milvusclient` package from the `github.com/milvus-io/milvus/client/v3` module, together with its `entity` and `index` packages. You NEVER use the deprecated `github.com/milvus-io/milvus-sdk-go/v2` SDK.

The snippets belong inside a function such as `main`, and need the Go version that `client/v3` requires.

IMPORTANT: The correct operation order is: embed documents, create the collection with an index, load the collection, insert data, search, then pass the results to the LLM. The collection must exist before you insert, an index must exist on every vector field before the collection can be loaded, and the collection must be loaded before you search. Skipping or reordering these steps causes runtime errors.

## Rules

1. ALWAYS use `milvusclient.Client` from `github.com/milvus-io/milvus/client/v3`, created with `milvusclient.New()`. NEVER use the deprecated `github.com/milvus-io/milvus-sdk-go/v2` SDK (`client.NewClient()`).

2. The correct operation order for building a RAG pipeline is: embed documents, create the collection with a schema and `WithIndexOptions()`, load the collection, insert data, search, rerank (optional), pass the results to the LLM. You may also insert before you create the index or load the collection, as long as the index exists before you load the collection and the collection is loaded before you search.

```go
import (
    &quot;log&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/index&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

var err error
schema := entity.NewSchema().
    WithField(entity.NewField().WithName(&quot;id&quot;).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
    WithField(entity.NewField().WithName(&quot;vector&quot;).WithDataType(entity.FieldTypeFloatVector).WithDim(4)).
    WithField(entity.NewField().WithName(&quot;text&quot;).WithDataType(entity.FieldTypeVarChar).WithMaxLength(2048))
indexOption := milvusclient.NewCreateIndexOption(&quot;docs&quot;, &quot;vector&quot;, index.NewAutoIndex(entity.COSINE))
insertOption := milvusclient.NewColumnBasedInsertOption(&quot;docs&quot;).
    WithFloatVectorColumn(&quot;vector&quot;, 4, [][]float32{{0.1, 0.2, 0.3, 0.4}}).
    WithVarcharColumn(&quot;text&quot;, []string{&quot;first chunk&quot;})
queryVectors := []entity.Vector{entity.FloatVector([]float32{0.1, 0.2, 0.3, 0.4})}

// WRONG: the collection does not exist yet, so Insert returns an error
_, err = client.Insert(ctx, insertOption)

// WRONG: WithIndexOptions() creates the index but does not load the collection,
// so Search returns a &quot;collection not loaded&quot; error
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(&quot;docs&quot;, schema).WithIndexOptions(indexOption))
_, err = client.Search(ctx, milvusclient.NewSearchOption(&quot;docs&quot;, 10, queryVectors))

// CORRECT: follow the required sequence
// 1. Create the collection with a schema and an index
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(&quot;docs&quot;, schema).WithIndexOptions(indexOption))
if err != nil {
    log.Fatal(err)
}
// 2. Load the collection and wait until loading completes
loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(&quot;docs&quot;))
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
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(&quot;docs&quot;, 10, queryVectors).
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
    &quot;log&quot;

    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

// WRONG: client.Update() does not exist
client.Update(ctx, milvusclient.NewColumnBasedInsertOption(&quot;docs&quot;).
    WithInt64Column(&quot;id&quot;, []int64{1}).
    WithVarcharColumn(&quot;text&quot;, []string{&quot;updated chunk&quot;}))

// CORRECT: use Upsert to replace entities by primary key
_, err := client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(&quot;docs&quot;).
    WithInt64Column(&quot;id&quot;, []int64{1}).
    WithFloatVectorColumn(&quot;vector&quot;, 4, [][]float32{{0.3, 0.3, 0.3, 0.3}}).
    WithVarcharColumn(&quot;text&quot;, []string{&quot;updated chunk&quot;}))
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
  | Documents   |---&gt;| Chunk       |---&gt;| Embed       |---&gt;| Insert      |
  | (PDF, text, |    | (split into |    | (OpenAI,    |    | into Milvus |
  |  HTML)      |    |  chunks)    |    |  HF, etc.)  |    |             |
  +-------------+    +-------------+    +-------------+    +-------------+

                     RETRIEVAL PIPELINE
  +-------------+    +-------------+    +-------------+    +-------------+
  | User query  |---&gt;| Embed       |---&gt;| Search      |---&gt;| LLM         |
  |             |    | query       |    | Milvus      |    | generates   |
  |             |    |             |    | (+ filter,  |    | the answer  |
  |             |    |             |    |  + rerank)  |    |             |
  +-------------+    +-------------+    +-------------+    +-------------+
```

## Complete example: RAG pipeline

```go
import (
    &quot;context&quot;
    &quot;errors&quot;
    &quot;fmt&quot;
    &quot;log&quot;
    &quot;strings&quot;
    &quot;time&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/index&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

// Configuration
const (
    collectionName = &quot;rag_documents&quot;
    dimension      = 1536 // Must match your embedding model&#x27;s output dimension
    chunkSize      = 512
    chunkOverlap   = 50
)

ctx := context.Background()

// Step 1: Connect to Milvus; New() blocks until connected, so bound it with a timeout
dialCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
defer cancel()
client, err := milvusclient.New(dialCtx, &amp;milvusclient.ClientConfig{
    Address: &quot;YOUR_MILVUS_URI&quot;,
    APIKey:  &quot;YOUR_MILVUS_TOKEN&quot;,
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
    WithField(entity.NewField().WithName(&quot;id&quot;).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
    WithField(entity.NewField().WithName(&quot;vector&quot;).WithDataType(entity.FieldTypeFloatVector).WithDim(dimension)).
    WithField(entity.NewField().WithName(&quot;text&quot;).WithDataType(entity.FieldTypeVarChar).WithMaxLength(2048)).
    WithField(entity.NewField().WithName(&quot;source&quot;).WithDataType(entity.FieldTypeVarChar).WithMaxLength(256)).
    WithField(entity.NewField().WithName(&quot;chunk_index&quot;).WithDataType(entity.FieldTypeInt64))

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
    WithIndexOptions(milvusclient.NewCreateIndexOption(collectionName, &quot;vector&quot;, index.NewAutoIndex(entity.COSINE))))
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
    for start := 0; start &lt; len(runes); start += size - overlap {
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
    return nil, errors.New(&quot;replace with your embedding model&quot;)
}

// Example: process a list of documents
type document struct {
    Text   string
    Source string
}
documents := []document{
    {Text: &quot;Your document text here...&quot;, Source: &quot;doc1.pdf&quot;},
    {Text: &quot;Another document...&quot;, Source: &quot;doc2.pdf&quot;},
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
for start := 0; start &lt; len(texts); start += batchSize {
    end := min(start+batchSize, len(texts))
    _, err := client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
        WithFloatVectorColumn(&quot;vector&quot;, dimension, vectors[start:end]).
        WithVarcharColumn(&quot;text&quot;, texts[start:end]).
        WithVarcharColumn(&quot;source&quot;, sources[start:end]).
        WithInt64Column(&quot;chunk_index&quot;, chunkIndexes[start:end]))
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
    ).WithANNSField(&quot;vector&quot;).
        WithOutputFields(&quot;text&quot;, &quot;source&quot;, &quot;chunk_index&quot;).
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
    textColumn := rs.GetColumn(&quot;text&quot;)
    sourceColumn := rs.GetColumn(&quot;source&quot;)
    results := make([]retrievedChunk, 0, rs.ResultCount)
    for i := 0; i &lt; rs.ResultCount; i++ {
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
    contextText := strings.Join(chunkTexts, &quot;\n\n&quot;)
    return &quot;&quot;, fmt.Errorf(&quot;replace with your LLM call (context: %d characters)&quot;, len(contextText))
}

// Usage
query := &quot;How does vector similarity search work?&quot;
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
    &quot;context&quot;
    &quot;log&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/index&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

const hybridCollection = &quot;hybrid_rag_docs&quot;

// Schema with a BM25 function (must be defined at creation time)
hybridSchema := entity.NewSchema().
    WithField(entity.NewField().WithName(&quot;id&quot;).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
    WithField(entity.NewField().WithName(&quot;text&quot;).WithDataType(entity.FieldTypeVarChar).WithMaxLength(2048).
        WithEnableAnalyzer(true).WithAnalyzerParams(map[string]any{&quot;type&quot;: &quot;standard&quot;})).
    WithField(entity.NewField().WithName(&quot;sparse_vector&quot;).WithDataType(entity.FieldTypeSparseVector)).
    WithField(entity.NewField().WithName(&quot;dense_vector&quot;).WithDataType(entity.FieldTypeFloatVector).WithDim(dimension)).
    WithField(entity.NewField().WithName(&quot;source&quot;).WithDataType(entity.FieldTypeVarChar).WithMaxLength(256)).
    WithFunction(entity.NewFunction().
        WithName(&quot;text_bm25&quot;).
        WithType(entity.FunctionTypeBM25).
        WithInputFields(&quot;text&quot;).
        WithOutputFields(&quot;sparse_vector&quot;))

// Indexes
err := client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(hybridCollection, hybridSchema).WithIndexOptions(
    milvusclient.NewCreateIndexOption(hybridCollection, &quot;dense_vector&quot;, index.NewAutoIndex(entity.COSINE)),
    milvusclient.NewCreateIndexOption(hybridCollection, &quot;sparse_vector&quot;, index.NewSparseInvertedIndex(entity.BM25, 0)),
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
        milvusclient.NewAnnRequest(&quot;dense_vector&quot;, topK*2, entity.FloatVector(queryEmbeddings[0])).
            WithSearchParam(&quot;metric_type&quot;, &quot;COSINE&quot;),
        // Sparse request: the raw query text, scored with BM25
        milvusclient.NewAnnRequest(&quot;sparse_vector&quot;, topK*2, entity.Text(query)).
            WithSearchParam(&quot;metric_type&quot;, &quot;BM25&quot;),
    ).WithReranker(milvusclient.NewRRFReranker()).
        WithOutputFields(&quot;text&quot;, &quot;source&quot;))
    if err != nil {
        return nil, err
    }

    rs := resultSets[0]
    if rs.Err != nil {
        return nil, rs.Err
    }
    textColumn := rs.GetColumn(&quot;text&quot;)
    sourceColumn := rs.GetColumn(&quot;source&quot;)
    results := make([]retrievedChunk, 0, rs.ResultCount)
    for i := 0; i &lt; rs.ResultCount; i++ {
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
hybridQuery := &quot;How does vector similarity search work?&quot;
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
    &quot;crypto/md5&quot;
    &quot;encoding/hex&quot;
    &quot;fmt&quot;
    &quot;log&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/index&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

// Use a deterministic VarChar primary key based on document identity (no auto ID)
chunkSchema := entity.NewSchema().
    WithField(entity.NewField().WithName(&quot;id&quot;).WithDataType(entity.FieldTypeVarChar).WithMaxLength(128).WithIsPrimaryKey(true)).
    WithField(entity.NewField().WithName(&quot;vector&quot;).WithDataType(entity.FieldTypeFloatVector).WithDim(dimension)).
    WithField(entity.NewField().WithName(&quot;text&quot;).WithDataType(entity.FieldTypeVarChar).WithMaxLength(2048))
err := client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(&quot;rag_chunks&quot;, chunkSchema).
    WithIndexOptions(milvusclient.NewCreateIndexOption(&quot;rag_chunks&quot;, &quot;vector&quot;, index.NewAutoIndex(entity.COSINE))))
if err != nil {
    log.Fatal(err)
}
// The collection is not loaded yet: load it with LoadCollection() and Await() before you search it

// Generate deterministic IDs from source and chunk index
makeChunkID := func(source string, chunkIndex int) string {
    sum := md5.Sum([]byte(fmt.Sprintf(&quot;%s:%d&quot;, source, chunkIndex)))
    return hex.EncodeToString(sum[:])
}

// Upsert: replaces the entity if the ID already exists
updatedChunkText := &quot;Updated text of the first chunk of doc1.pdf&quot;
embeddings, err := embedTexts(ctx, []string{updatedChunkText})
if err != nil {
    log.Fatal(err)
}
_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(&quot;rag_chunks&quot;).
    WithVarcharColumn(&quot;id&quot;, []string{makeChunkID(&quot;doc1.pdf&quot;, 0)}).
    WithFloatVectorColumn(&quot;vector&quot;, dimension, embeddings).
    WithVarcharColumn(&quot;text&quot;, []string{updatedChunkText}))
if err != nil {
    log.Fatal(err)
}
```

## Verification checklist

Before finishing, verify:

- [ ] All Milvus code uses `milvusclient` from `github.com/milvus-io/milvus/client/v3`, not `milvus-sdk-go/v2`
- [ ] Operation order is correct: create the collection, load it, insert, search, with an index before loading and loading before search
- [ ] `WithDim()` of the vector field matches the embedding model&#x27;s output dimension
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
<button class="copy-code-btn"></button></code></pre>
