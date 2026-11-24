---
id: agents_overview_go.md
title: AGENTS.md für Milvus (Go)
summary: >-
  Regeln und Muster für KI-Programmieragenten, die mithilfe des Go-SDK Code für
  die Milvus-Vektordatenbank generieren, überprüfen oder debuggen.
---
<h1 id="AGENTSmd-Go" class="common-anchor-header">AGENTS.md (Go)<button data-href="#AGENTSmd-Go" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ist eine Open-Source-Vektordatenbank für Ähnlichkeitssuche, hybride Suche und RAG. In Go interagieren Sie mit ihr über das Paket „ <code translate="no">milvusclient</code> “ des Moduls „ <code translate="no">github.com/milvus-io/milvus/client/v3</code> “. Kopieren Sie den vollständigen Befehl unten in Ihr KI-Tool, um diese Regeln automatisch anzuwenden. Detaillierte aufgabenspezifische Befehle finden Sie unter <a href="/docs/de/milvus_for_agents.md">„KI-Befehle</a>“.</p>
<h2 id="How-to-use-this-prompt" class="common-anchor-header">So verwenden Sie diesen Befehl<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
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
<li><strong>Kopieren Sie</strong> den vollständigen Befehl aus dem Abschnitt <a href="#full-prompt">„Vollständiger Befehl</a> “ weiter unten.</li>
<li><strong>Speichern Sie</strong> ihn an dem Ort, den Ihr KI-Tool erwartet – Details zur Platzierung finden Sie in der <a href="/docs/de/milvus_for_agents.md">Umgebungstabelle</a>.</li>
<li>Ihr KI-Assistent wendet diese Regeln automatisch an, wenn er Milvus-Code generiert oder überprüft.</li>
</ol>
<p>Für <strong>Cursor</strong> -Nutzer: Kopieren Sie die Eingabeaufforderung aus dem Abschnitt <a href="#full-prompt">„Vollständige Eingabeaufforderung</a> “ und speichern Sie sie in Ihrem Projekt unter „ <code translate="no">.cursor/rules/</code> “.</p>
<h2 id="Full-prompt" class="common-anchor-header">Vollständige Eingabeaufforderung<button data-href="#Full-prompt" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text"># AGENTS.md for Milvus (Go)

Milvus is an open-source vector database for similarity search, hybrid search, and RAG. You interact with it from Go through the `milvusclient` package of the `github.com/milvus-io/milvus/client/v3` module, together with its `entity` and `index` packages.

Use these rules whenever you generate, review, or debug Go code that connects to Milvus or Zilliz Cloud. The snippets belong inside a function such as `main`. Check the installed module version with `go list -m github.com/milvus-io/milvus/client/v3` and the available versions with `go list -m -versions github.com/milvus-io/milvus/client/v3` instead of relying on memorized version numbers.

## Client &amp; connection

1. **CRITICAL: Always use the `client/v3` packages.** Never import the deprecated `github.com/milvus-io/milvus-sdk-go/v2` SDK. If the user provides code that imports it (for example `client.NewClient(ctx, client.Config{...})`), rewrite it to `milvusclient` from `github.com/milvus-io/milvus/client/v3`.

2. **Connection patterns.** Milvus without authentication: `Address` only. Zilliz Cloud or Milvus with authentication: `Address` + `APIKey`. `milvusclient.New()` blocks until the connection is established, so pass a context with a timeout, and `defer client.Close(ctx)`.

```go
import (
    &quot;context&quot;
    &quot;log&quot;
    &quot;time&quot;

    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

ctx := context.Background()
dialCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
defer cancel()

// Milvus without authentication
client, err := milvusclient.New(dialCtx, &amp;milvusclient.ClientConfig{
    Address: &quot;YOUR_MILVUS_URI&quot;,
})
if err != nil {
    log.Fatal(err)
}
defer client.Close(ctx)

// Zilliz Cloud or Milvus with authentication
authClient, err := milvusclient.New(dialCtx, &amp;milvusclient.ClientConfig{
    Address: &quot;YOUR_MILVUS_URI&quot;,
    APIKey:  &quot;YOUR_MILVUS_TOKEN&quot;,
})
if err != nil {
    log.Fatal(err)
}
defer authClient.Close(ctx)
```

## Schema &amp; data

3. **CRITICAL: Use the `entity.FieldType` constants.** Write `WithDataType(entity.FieldTypeFloatVector)`. `WithDataType()` takes an `entity.FieldType`, so a string such as `&quot;FLOAT_VECTOR&quot;` does not compile.

4. **CRITICAL: Schema changes are limited.** On Milvus 2.5.x and earlier, the schema is immutable: drop and recreate the collection to change it. On Milvus 2.6 and later, `client.AddCollectionField()` with `milvusclient.NewAddCollectionFieldOption()` adds a field, and the field must call `WithNullable(true)`; a field with only a default value is rejected. On Milvus 3.0 and later, `client.DropCollectionField()` with `milvusclient.NewDropCollectionFieldOption()` drops a field, except the primary key, the partition key, the clustering key, the last vector field, the dynamic field, system fields, fields that a function reads or generates, and the field that the collection&#x27;s `ttl_field` property names. `client.AlterCollectionFieldProperty()` changes field properties such as `max_length`. You cannot change the data type of an existing field: create a new collection and migrate the data.

5. **Primary keys: `entity.FieldTypeInt64` or `entity.FieldTypeVarChar` only.** Composite primary keys are not supported. Primary keys must be unique across the entire collection, including across partitions.

6. **Use `Upsert()` to update entities.** There is no `Update()` method on `Client`. By default, `Upsert()` replaces the entire entity if the primary key exists, or inserts a new one. It takes the same `milvusclient.NewColumnBasedInsertOption()` as `Insert()`. With an autoID primary key, still pass the primary key: Milvus 3.0.3 and later keep the key of an existing entity and generate a new key only for rows whose key is not found, which requires the collection to be loaded; earlier versions give every upserted entity a new key generated by the server. To change only some fields of existing entities, call `WithPartialUpdate(true)` on that option. Use `Insert()` only when you are certain there are no primary key conflicts.

7. **Define BM25 at collection creation time.** Add the function with `WithFunction(entity.NewFunction().WithType(entity.FunctionTypeBM25)...)` to the schema that you pass to `CreateCollection()`, with an `entity.FieldTypeVarChar` input field that calls `WithEnableAnalyzer(true)` and an `entity.FieldTypeSparseVector` output field. Adding a BM25 function field to an existing collection with `client.AddFunctionField()` needs Milvus 3.0 or later with Storage V3 (`common.storage.useLoonFFI`, disabled by default), schema version compaction, and storage version compaction enabled; otherwise the server rejects the request.

## Index &amp; loading

8. **CRITICAL: Index before load, load before search.** A vector field must have an index before the collection can be loaded. A collection must be loaded before any search or query. `NewCreateCollectionOption(name, schema).WithIndexOptions(...)` creates the collection and its indexes but does NOT load it: call `client.LoadCollection()` and then `Await()` on the returned task before you search.

9. **Start with `AUTOINDEX`.** Use `index.NewAutoIndex(metricType)` unless you have specific requirements. Choose HNSW (`index.NewHNSWIndex()`) for high recall, DiskANN (`index.NewDiskANNIndex()`) for larger-than-RAM datasets, IVF_FLAT (`index.NewIvfFlatIndex()`) for memory-constrained scenarios.

## Search

10. **CRITICAL: Every `NewAnnRequest()` in a hybrid search must carry the same number of query vectors.** For one query, pass exactly one vector to each `milvusclient.NewAnnRequest(annField, limit, vector)`. The server rejects requests with different numbers of vectors (&quot;sub search request nq should be the same&quot;), and `HybridSearch()` returns the error. `HybridSearch()` returns one `ResultSet` per query vector.

11. **One ranker per `HybridSearch()` call.** Pass exactly one reranker to `WithReranker()`, such as `milvusclient.NewRRFReranker()` or `milvusclient.NewWeightedReranker([]float64{0.7, 0.3})`. A second `WithReranker()` call replaces the first instead of chaining them. Pick one.

## Quick start

```go
import (
    &quot;context&quot;
    &quot;fmt&quot;
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

// 1. Define schema
schema := entity.NewSchema().
    WithField(entity.NewField().WithName(&quot;id&quot;).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
    WithField(entity.NewField().WithName(&quot;vector&quot;).WithDataType(entity.FieldTypeFloatVector).WithDim(768)).
    WithField(entity.NewField().WithName(&quot;text&quot;).WithDataType(entity.FieldTypeVarChar).WithMaxLength(512))

// 2. Define index
indexOption := milvusclient.NewCreateIndexOption(&quot;docs&quot;, &quot;vector&quot;, index.NewAutoIndex(entity.COSINE))

// 3. Create collection (creates the index), then load it and wait
if err := client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(&quot;docs&quot;, schema).WithIndexOptions(indexOption)); err != nil {
    log.Fatal(err)
}
loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(&quot;docs&quot;))
if err != nil {
    log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
    log.Fatal(err)
}

// 4. Insert (column-based; the auto ID primary key column is omitted)
vectors := [][]float32{make([]float32, 768), make([]float32, 768)}
for j := 0; j &lt; 768; j++ {
    vectors[0][j] = 0.1
    vectors[1][j] = 0.2
}
if _, err := client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(&quot;docs&quot;).
    WithFloatVectorColumn(&quot;vector&quot;, 768, vectors).
    WithVarcharColumn(&quot;text&quot;, []string{&quot;first doc&quot;, &quot;second doc&quot;})); err != nil {
    log.Fatal(err)
}

// 5. Search with Strong consistency so that the new entities are visible
queryVector := make([]float32, 768)
for j := range queryVector {
    queryVector[j] = 0.15
}
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(&quot;docs&quot;, 5,
    []entity.Vector{entity.FloatVector(queryVector)}).
    WithOutputFields(&quot;text&quot;).WithConsistencyLevel(entity.ClStrong))
if err != nil {
    log.Fatal(err)
}
for _, rs := range resultSets {
    if rs.Err != nil {
        log.Fatal(rs.Err)
    }
    for i := 0; i &lt; rs.ResultCount; i++ {
        id, _ := rs.IDs.GetAsInt64(i)
        text, _ := rs.GetColumn(&quot;text&quot;).GetAsString(i)
        fmt.Println(id, rs.Scores[i], text)
    }
}
```

## Common mistakes

| Mistake | Fix |
|---|---|
| Importing `github.com/milvus-io/milvus-sdk-go/v2` | Rewrite with `milvusclient` from `github.com/milvus-io/milvus/client/v3` |
| Calling `client.Search()` before loading | After `CreateCollection()` with `WithIndexOptions()`, call `LoadCollection()` and `Await()` the returned task |
| Different numbers of vectors across `NewAnnRequest()` calls | Pass the same number of vectors to every `NewAnnRequest()`; one vector each for one query |
| Looking for an `Update()` method | Use `client.Upsert()` |
| Adding BM25 after the collection exists | Define the BM25 function with `WithFunction()` and `WithEnableAnalyzer(true)` in the schema passed to `CreateCollection()` |
| String field types (`&quot;FLOAT_VECTOR&quot;`) | Use `entity.FieldType` constants such as `entity.FieldTypeFloatVector` |
<button class="copy-code-btn"></button></code></pre>
