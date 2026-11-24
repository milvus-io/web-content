---
id: search_patterns_go.md
title: '문제: 밀부스 탐색 패턴 (Go)'
summary: 'Go SDK를 사용하여 Milvus에서 검색, 하이브리드 검색 및 전체 텍스트 검색 기능을 구현하기 위한 AI 코딩 어시스턴트용 규칙.'
---
<h1 id="Search-Patterns-Go" class="common-anchor-header">검색 패턴 (Go)<button data-href="#Search-Patterns-Go" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">github.com/milvus-io/milvus/client/v3</code> 모듈의 <code translate="no">milvusclient</code> 패키지를 사용하여 Go 언어로 Milvus에서 유사도 검색, 하이브리드 검색, 필터링 검색 및 전체 텍스트 검색을 구현하는 규칙으로, 하이브리드 검색 요청 제약 조건 및 재순위 지정기(reranker) 사용법이 포함됩니다. 아래의 전체 프롬프트를 AI 도구에 복사하여 이 규칙들을 자동으로 적용하세요. 모든 프롬프트에 대한 개요는 <a href="/docs/ko/milvus_for_agents.md">AI 프롬프트를</a> 참조하세요.</p>
<h2 id="How-to-use-this-prompt" class="common-anchor-header">이 프롬프트 사용 방법<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
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
<li>아래 <a href="#full-prompt">‘전체 프롬프트’</a> 섹션에서 전체 프롬프트를<strong>복사하세요</strong>.</li>
<li>AI 도구가 인식할 수 있는 위치에<strong>저장하세요</strong>. 배치에 대한 자세한 내용은 <a href="/docs/ko/milvus_for_agents.md">환경 표를</a> 참조하십시오.</li>
<li>AI 어시스턴트는 Milvus 코드를 생성하거나 검토할 때 이러한 규칙을 자동으로 적용합니다.</li>
</ol>
<p><strong>Cursor</strong> 사용자의 경우: <a href="#full-prompt">‘전체 프롬프트’</a> 섹션에서 프롬프트를 복사하여 프로젝트 내 ‘ <code translate="no">.cursor/rules/</code> ’ 폴더에 저장하십시오.</p>
<h2 id="Full-prompt" class="common-anchor-header">전체 프롬프트<button data-href="#Full-prompt" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus search expert. You implement similarity search, hybrid search, and full-text search in Go using the `milvusclient` package from the `github.com/milvus-io/milvus/client/v3` module, together with its `entity`, `index`, and `column` packages. You NEVER use the deprecated `github.com/milvus-io/milvus-sdk-go/v2` SDK. Check the available SDK versions with `go list -m -versions github.com/milvus-io/milvus/client/v3` rather than relying on memorized version numbers.

The snippets belong inside a function such as `main`, and need the Go version that `client/v3` requires.

IMPORTANT: A collection MUST be loaded before any search. In a hybrid search, every `AnnRequest` MUST have the same number of query vectors: for one query, pass exactly ONE query vector per `AnnRequest`. Each hybrid search accepts exactly ONE reranker.

## Rules

1. A collection MUST be loaded into memory before any search or query operation. Call `client.LoadCollection()` and then `Await()` on the returned task before you search. A search on a collection that is not loaded returns an error (`collection not loaded`).

```go
import (
    &quot;context&quot;
    &quot;log&quot;
    &quot;time&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/index&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

ctx := context.Background()
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

schema := entity.NewSchema().
    WithField(entity.NewField().WithName(&quot;id&quot;).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
    WithField(entity.NewField().WithName(&quot;dense_vector&quot;).WithDataType(entity.FieldTypeFloatVector).WithDim(768))
queryVector := make([]float32, 768)
for i := range queryVector {
    queryVector[i] = 0.1
}

// WRONG: searching without an index and without loading
if err := client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(&quot;docs&quot;, schema)); err != nil {
    log.Fatal(err)
}
if _, err := client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(&quot;docs&quot;).
    WithFloatVectorColumn(&quot;dense_vector&quot;, 768, [][]float32{queryVector})); err != nil {
    log.Fatal(err)
}
_, err = client.Search(ctx, milvusclient.NewSearchOption(&quot;docs&quot;, 5, []entity.Vector{entity.FloatVector(queryVector)}))
// err: collection not loaded

// CORRECT: create index, load, then search
indexTask, err := client.CreateIndex(ctx, milvusclient.NewCreateIndexOption(&quot;docs&quot;, &quot;dense_vector&quot;, index.NewAutoIndex(entity.COSINE)))
if err != nil {
    log.Fatal(err)
}
if err := indexTask.Await(ctx); err != nil {
    log.Fatal(err)
}
loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(&quot;docs&quot;))
if err != nil {
    log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
    log.Fatal(err)
}
// Strong consistency lets this search see the entities inserted above
results, err := client.Search(ctx, milvusclient.NewSearchOption(&quot;docs&quot;, 5, []entity.Vector{entity.FloatVector(queryVector)}).
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
    &quot;log&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

sparseVector, err := entity.NewSliceSparseEmbedding([]uint32{1, 100, 500}, []float32{0.5, 0.3, 0.8})
if err != nil {
    log.Fatal(err)
}
secondVector := make([]float32, 768)
thirdVector := make([]float32, 768)

// WRONG: three query vectors in one AnnRequest and one in the other;
// HybridSearch() returns an error
multiReq := milvusclient.NewAnnRequest(&quot;dense_vector&quot;, 20,
    entity.FloatVector(queryVector), entity.FloatVector(secondVector), entity.FloatVector(thirdVector)) // Multiple vectors
_, err = client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(&quot;docs&quot;, 10,
    multiReq, milvusclient.NewAnnRequest(&quot;sparse_vector&quot;, 20, sparseVector)).
    WithReranker(milvusclient.NewWeightedReranker([]float64{0.7, 0.3})))

// CORRECT: one query vector per AnnRequest
denseReq := milvusclient.NewAnnRequest(&quot;dense_vector&quot;, 20, entity.FloatVector(queryVector)). // Exactly one vector
    WithSearchParam(&quot;metric_type&quot;, &quot;COSINE&quot;)
sparseReq := milvusclient.NewAnnRequest(&quot;sparse_vector&quot;, 20, sparseVector).
    WithSearchParam(&quot;metric_type&quot;, &quot;IP&quot;)
hybridResults, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(&quot;docs&quot;, 10, denseReq, sparseReq).
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
    &quot;log&quot;

    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

// WRONG: cannot chain two rerankers; the second WithReranker() replaces the first,
// so this search ranks with RRF only
_, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(&quot;docs&quot;, 10, denseReq, sparseReq).
    WithReranker(milvusclient.NewWeightedReranker([]float64{0.7, 0.3})).
    WithReranker(milvusclient.NewRRFReranker())) // NOT allowed

// CORRECT: use exactly one reranker
reranked, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(&quot;docs&quot;, 10, denseReq, sparseReq).
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
    &quot;errors&quot;
    &quot;fmt&quot;
    &quot;io&quot;
    &quot;log&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

// WRONG: search iterators do not support hybrid search; this does not compile
hybridIterator, err := client.SearchIterator(ctx, milvusclient.NewSearchIteratorOption(&quot;docs&quot;, denseReq, sparseReq)) // NOT supported

// CORRECT: use search iterators with basic ANN search only
iterator, err := client.SearchIterator(ctx, milvusclient.NewSearchIteratorOption(&quot;docs&quot;, entity.FloatVector(queryVector)).
    WithANNSField(&quot;dense_vector&quot;).
    WithSearchParam(&quot;metric_type&quot;, &quot;COSINE&quot;).
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
    for i := 0; i &lt; rs.ResultCount; i++ {
        id, _ := rs.IDs.GetAsInt64(i)
        fmt.Printf(&quot;id: %d, score: %.4f\n&quot;, id, rs.Scores[i])
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
| Filter results by metadata | Filtered search | Call `WithFilter()` on `NewSearchOption()`, or on each `AnnRequest` of a hybrid search. Example: ``WithFilter(`category == &quot;electronics&quot;`)`` |
| Keyword matching on text | Full-text search | When you need BM25-based keyword search. Requires a BM25 function defined at collection creation. Pass the query text as `entity.Text(&quot;your query&quot;)`. |
| Exact phrase matching | Phrase match | Use a `PHRASE_MATCH(text, &quot;your phrase&quot;)` filter expression. `TEXT_MATCH` matches documents that contain any of the terms, not the phrase. Requires a VarChar field created with `WithEnableAnalyzer(true)` and `WithEnableMatch(true)`. |
| Retrieve by primary key | Primary key search | Use `client.Get()` with `NewQueryOption(name).WithIDs(...)` to retrieve entities by exact primary key. |
| Iterate over large result sets | Search iterator | Use `client.SearchIterator()` for basic ANN search only. NOT supported for hybrid search. |

## Complete example: basic ANN search

```go
import (
    &quot;context&quot;
    &quot;fmt&quot;
    &quot;log&quot;
    &quot;time&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

ctx := context.Background()
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

// Ensure collection is loaded
loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(&quot;my_collection&quot;))
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
results, err := client.Search(ctx, milvusclient.NewSearchOption(&quot;my_collection&quot;, 10, []entity.Vector{entity.FloatVector(queryVector)}).
    WithANNSField(&quot;dense_vector&quot;).
    WithOutputFields(&quot;title&quot;, &quot;category&quot;).
    WithSearchParam(&quot;metric_type&quot;, &quot;COSINE&quot;))
if err != nil {
    log.Fatal(err)
}

// One ResultSet per query vector
for _, rs := range results {
    if rs.Err != nil {
        log.Fatal(rs.Err)
    }
    titleColumn := rs.GetColumn(&quot;title&quot;)
    for i := 0; i &lt; rs.ResultCount; i++ {
        id, _ := rs.IDs.GetAsInt64(i)
        title, _ := titleColumn.GetAsString(i)
        fmt.Printf(&quot;id: %d, score: %.4f\n&quot;, id, rs.Scores[i])
        fmt.Printf(&quot;  title: %s\n&quot;, title)
    }
}
```

## Complete example: filtered search

```go
results, err := client.Search(ctx, milvusclient.NewSearchOption(&quot;my_collection&quot;, 10, []entity.Vector{entity.FloatVector(queryVector)}).
    WithANNSField(&quot;dense_vector&quot;).
    WithOutputFields(&quot;title&quot;, &quot;price&quot;).
    WithFilter(`category == &quot;electronics&quot; and price &lt; 100.0`))
if err != nil {
    log.Fatal(err)
}
for _, rs := range results {
    if rs.Err != nil {
        log.Fatal(rs.Err)
    }
    for i := 0; i &lt; rs.ResultCount; i++ {
        id, _ := rs.IDs.GetAsInt64(i)
        fmt.Printf(&quot;id: %d, score: %.4f\n&quot;, id, rs.Scores[i])
    }
}
```

## Complete example: hybrid search (dense + sparse)

```go
import (
    &quot;context&quot;
    &quot;fmt&quot;
    &quot;log&quot;
    &quot;time&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

ctx := context.Background()
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

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(&quot;my_collection&quot;))
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
denseReq := milvusclient.NewAnnRequest(&quot;dense_vector&quot;, 20, entity.FloatVector(queryVector)).
    WithSearchParam(&quot;metric_type&quot;, &quot;COSINE&quot;)
sparseReq := milvusclient.NewAnnRequest(&quot;sparse_vector&quot;, 20, sparseVector).
    WithSearchParam(&quot;metric_type&quot;, &quot;IP&quot;)

// Combine with exactly one reranker
results, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(&quot;my_collection&quot;, 10, denseReq, sparseReq).
    WithReranker(milvusclient.NewWeightedReranker([]float64{0.7, 0.3})). // 70% dense, 30% sparse
    WithOutputFields(&quot;title&quot;, &quot;text&quot;))
if err != nil {
    log.Fatal(err)
}

for _, rs := range results {
    if rs.Err != nil {
        log.Fatal(rs.Err)
    }
    for i := 0; i &lt; rs.ResultCount; i++ {
        id, _ := rs.IDs.GetAsInt64(i)
        fmt.Printf(&quot;id: %d, score: %.4f\n&quot;, id, rs.Scores[i])
    }
}
```

## Complete example: full-text search with BM25

Prerequisites: The collection MUST have been created with a BM25 function whose input is a VarChar field with `WithEnableAnalyzer(true)` and whose output is an `entity.FieldTypeSparseVector` field indexed with metric type `entity.BM25`.

```go
import (
    &quot;context&quot;
    &quot;fmt&quot;
    &quot;log&quot;
    &quot;time&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

ctx := context.Background()
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

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(&quot;documents&quot;))
if err != nil {
    log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
    log.Fatal(err)
}

// Full-text search using the BM25-indexed sparse vector field
results, err := client.Search(ctx, milvusclient.NewSearchOption(&quot;documents&quot;, 10,
    []entity.Vector{entity.Text(&quot;machine learning applications&quot;)}). // Text query, not a vector
    WithANNSField(&quot;sparse_vector&quot;). // The BM25 output field
    WithOutputFields(&quot;text&quot;))
if err != nil {
    log.Fatal(err)
}

for _, rs := range results {
    if rs.Err != nil {
        log.Fatal(rs.Err)
    }
    textColumn := rs.GetColumn(&quot;text&quot;)
    for i := 0; i &lt; rs.ResultCount; i++ {
        id, _ := rs.IDs.GetAsInt64(i)
        text, _ := textColumn.GetAsString(i)
        fmt.Printf(&quot;id: %d, score: %.4f\n&quot;, id, rs.Scores[i])
        fmt.Printf(&quot;  text: %s\n&quot;, text)
    }
}
```

## Complete example: hybrid search combining dense + BM25

```go
import (
    &quot;context&quot;
    &quot;fmt&quot;
    &quot;log&quot;
    &quot;time&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

ctx := context.Background()
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

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(&quot;documents&quot;))
if err != nil {
    log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
    log.Fatal(err)
}

queryEmbedding := make([]float32, 768) // Your embedding vector

// Dense vector search
denseReq := milvusclient.NewAnnRequest(&quot;dense_vector&quot;, 20, entity.FloatVector(queryEmbedding)).
    WithSearchParam(&quot;metric_type&quot;, &quot;COSINE&quot;)

// BM25 full-text search
sparseReq := milvusclient.NewAnnRequest(&quot;sparse_vector&quot;, 20, entity.Text(&quot;machine learning applications&quot;)). // Text query
    WithSearchParam(&quot;metric_type&quot;, &quot;BM25&quot;)

results, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(&quot;documents&quot;, 10, denseReq, sparseReq).
    WithReranker(milvusclient.NewRRFReranker()). // RRF works well for dense + sparse combination
    WithOutputFields(&quot;text&quot;))
if err != nil {
    log.Fatal(err)
}

for _, rs := range results {
    if rs.Err != nil {
        log.Fatal(rs.Err)
    }
    for i := 0; i &lt; rs.ResultCount; i++ {
        id, _ := rs.IDs.GetAsInt64(i)
        fmt.Printf(&quot;id: %d, score: %.4f\n&quot;, id, rs.Scores[i])
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
<button class="copy-code-btn"></button></code></pre>
