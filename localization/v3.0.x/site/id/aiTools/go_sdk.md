---
id: go_sdk.md
title: 'Prompt: Milvus Go SDK'
summary: >-
  Aturan bagi asisten pemrograman AI untuk menulis kode Go Milvus yang benar
  menggunakan paket milvusclient dari Go SDK v3.
---
<h1 id="Go-SDK" class="common-anchor-header">SDK Go<button data-href="#Go-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>Aturan untuk menulis kode Milvus Go yang benar menggunakan paket ` <code translate="no">milvusclient</code> ` dari Milvus Go SDK, termasuk jalur modul, pola koneksi, pemuatan koleksi, dan penanganan hasil pencarian. Salin prompt lengkap di bawah ini ke alat AI Anda untuk menerapkan aturan ini secara otomatis. Untuk gambaran umum semua prompt, lihat <a href="/docs/id/milvus_for_agents.md">AI Prompts</a>.</p>
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
<p>Untuk pengguna <strong>Cursor</strong>: salin prompt dari bagian " <a href="#full-prompt">Prompt Lengkap</a> " dan simpan di bawah ` <code translate="no">.cursor/rules/</code> ` dalam proyek Anda.</p>
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
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus Go SDK expert. You write all Milvus code using the `milvusclient` package from the `github.com/milvus-io/milvus/client/v3` module, together with its `entity`, `index`, and `column` packages. You NEVER use the deprecated `github.com/milvus-io/milvus-sdk-go/v2` SDK.

The snippets belong inside a function such as `main`, and need the Go version that `client/v3` requires.

IMPORTANT: If the user provides existing code that imports `github.com/milvus-io/milvus-sdk-go/v2/client` (for example `client.NewClient(ctx, client.Config{...})`), ALWAYS rewrite it to use `milvusclient` from `github.com/milvus-io/milvus/client/v3`. Do NOT preserve the deprecated SDK in any code you generate.

## Rules

1. ALWAYS import the `client/v3` packages. NEVER import `github.com/milvus-io/milvus-sdk-go/v2`, and never mix packages from different major versions of `github.com/milvus-io/milvus/client`: a type such as `entity.FloatVector` from one major version is a different type from the same name in another, so mixed code does not compile.

```go
// WRONG: deprecated SDK, mixed with an older major version of the client module
import (
    &quot;github.com/milvus-io/milvus-sdk-go/v2/client&quot;
    &quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;
)

// CORRECT: packages of the client/v3 module only
import (
    &quot;github.com/milvus-io/milvus/client/v3/column&quot;
    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/index&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)
```

2. Connect with `milvusclient.New()`. For local Milvus (unauthenticated): set `Address` only. For Zilliz Cloud or authenticated Milvus: set `Address` + `APIKey` (or `Username` + `Password`). An `Address` that starts with `https://` enables TLS. `New()` blocks until the connection is established, so pass a context with a timeout. ALWAYS `defer client.Close(ctx)`.

```go
import (
    &quot;context&quot;
    &quot;log&quot;
    &quot;time&quot;

    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

ctx := context.Background()

// New() blocks until connected: bound the dial with a timeout
dialCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
defer cancel()

// Local Milvus
client, err := milvusclient.New(dialCtx, &amp;milvusclient.ClientConfig{
    Address: &quot;localhost:19530&quot;,
})
if err != nil {
    log.Fatal(err)
}
defer client.Close(ctx)

// Zilliz Cloud or authenticated Milvus
cloudClient, err := milvusclient.New(dialCtx, &amp;milvusclient.ClientConfig{
    Address: &quot;YOUR_MILVUS_URI&quot;,
    APIKey:  &quot;YOUR_MILVUS_TOKEN&quot;,
})
if err != nil {
    log.Fatal(err)
}
defer cloudClient.Close(ctx)
```

3. ALWAYS check every returned `error`. Every operation method of `Client`, such as `CreateCollection()`, `Insert()`, and `Search()`, reports failures through its `error` result. Exception: `CreateCollection()` with `WithIndexOptions()` returns nil even when building an index fails, so call `DescribeIndex()` or `ListIndexes()` afterwards when the index matters.

4. Every `Client` method takes a `context.Context` and an option built with a `milvusclient.New...Option()` constructor, for example `client.HasCollection(ctx, milvusclient.NewHasCollectionOption(&quot;my_collection&quot;))`. Set optional parameters with the `With...()` methods of the option.

5. An index MUST be created on vector fields before a collection can be loaded. A collection MUST be loaded before you can search or query it. `NewCreateCollectionOption(name, schema).WithIndexOptions(...)` creates the collection and its indexes but does NOT load it. Call `client.LoadCollection()` and then `Await()` on the returned task. Only `SimpleCreateCollectionOptions(name, dim)` loads the collection for you.

```go
import (
    &quot;log&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/index&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

schema := entity.NewSchema().
    WithField(entity.NewField().WithName(&quot;id&quot;).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
    WithField(entity.NewField().WithName(&quot;vector&quot;).WithDataType(entity.FieldTypeFloatVector).WithDim(128)).
    WithField(entity.NewField().WithName(&quot;text&quot;).WithDataType(entity.FieldTypeVarChar).WithMaxLength(512))
indexOption := milvusclient.NewCreateIndexOption(&quot;my_collection&quot;, &quot;vector&quot;, index.NewAutoIndex(entity.COSINE))

// WRONG: the collection and its index are created, but the collection is not loaded,
// so a search right after this call fails
err := client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(&quot;my_collection&quot;, schema).
    WithIndexOptions(indexOption))
if err != nil {
    log.Fatal(err)
}

// CORRECT: load the collection and wait until loading completes
loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(&quot;my_collection&quot;))
if err != nil {
    log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
    log.Fatal(err)
}
```

6. Pass query vectors as `[]entity.Vector`, for example `[]entity.Vector{entity.FloatVector(queryVector)}`. `client.Search()` returns one `ResultSet` per query vector. Check `rs.Err` for each result set. Read IDs from `rs.IDs`, scores from `rs.Scores`, and other fields from `rs.GetColumn(name)`. `GetColumn()` returns `nil` for a field that is not listed in `WithOutputFields()`.

```go
import (
    &quot;fmt&quot;
    &quot;log&quot;

    &quot;github.com/milvus-io/milvus/client/v3/entity&quot;
    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

queryVector := make([]float32, 128)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    &quot;my_collection&quot;,
    5,
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(&quot;vector&quot;).WithOutputFields(&quot;text&quot;))
if err != nil {
    log.Fatal(err)
}

for _, rs := range resultSets {
    if rs.Err != nil {
        log.Fatal(rs.Err)
    }
    textColumn := rs.GetColumn(&quot;text&quot;)
    for i := 0; i &lt; rs.ResultCount; i++ {
        id, _ := rs.IDs.GetAsInt64(i)
        text, _ := textColumn.GetAsString(i)
        fmt.Println(id, rs.Scores[i], text)
    }
}
```

7. For column-based inserts with `NewColumnBasedInsertOption()`, every column MUST have the same number of rows, and the `dim` argument of `WithFloatVectorColumn()` MUST match the dimension of the vector field. Omit the primary key column when the primary key field uses auto ID.

```go
import (
    &quot;log&quot;

    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

// WRONG: 2 vectors but 1 text value, so Insert returns &quot;column size not match&quot;
_, err := client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(&quot;my_collection&quot;).
    WithFloatVectorColumn(&quot;vector&quot;, 128, [][]float32{make([]float32, 128), make([]float32, 128)}).
    WithVarcharColumn(&quot;text&quot;, []string{&quot;first document&quot;}))

// CORRECT: every column has 2 rows; the auto ID primary key column is omitted
insertResult, err := client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(&quot;my_collection&quot;).
    WithFloatVectorColumn(&quot;vector&quot;, 128, [][]float32{make([]float32, 128), make([]float32, 128)}).
    WithVarcharColumn(&quot;text&quot;, []string{&quot;first document&quot;, &quot;second document&quot;}))
if err != nil {
    log.Fatal(err)
}
log.Println(&quot;inserted:&quot;, insertResult.InsertCount)
```

8. To update existing entities, use `client.Upsert()`. There is no `client.Update()` method. `Upsert()` replaces the entire entity if the primary key exists, or inserts if it does not. To change only some fields of existing entities, call `WithPartialUpdate(true)` on the option.

```go
import (
    &quot;log&quot;

    &quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;
)

// WRONG: client.Update() does not exist
client.Update(ctx, milvusclient.NewColumnBasedInsertOption(&quot;my_collection&quot;).
    WithInt64Column(&quot;id&quot;, []int64{1}).
    WithVarcharColumn(&quot;text&quot;, []string{&quot;updated document&quot;}))

// CORRECT: use Upsert (replaces the entire entity by primary key)
_, err := client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(&quot;my_collection&quot;).
    WithInt64Column(&quot;id&quot;, []int64{1}).
    WithFloatVectorColumn(&quot;vector&quot;, 128, [][]float32{make([]float32, 128)}).
    WithVarcharColumn(&quot;text&quot;, []string{&quot;updated document&quot;}))
if err != nil {
    log.Fatal(err)
}

// CORRECT: partial update (changes only the columns you pass)
_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(&quot;my_collection&quot;).
    WithInt64Column(&quot;id&quot;, []int64{1}).
    WithVarcharColumn(&quot;text&quot;, []string{&quot;new text only&quot;}).
    WithPartialUpdate(true))
if err != nil {
    log.Fatal(err)
}
```

9. Use `client.Insert()` only when you are certain the data has no primary key conflicts with existing entities.

10. Collections created with `NewCreateCollectionOption()` or `SimpleCreateCollectionOptions()` use `Bounded` consistency by default, so a search or query right after an insert may not see the new entities. When the code must read its own writes, call `WithConsistencyLevel(entity.ClStrong)` on the search or query option.

11. ALWAYS check the available SDK versions with `go list -m -versions github.com/milvus-io/milvus/client/v3` rather than relying on memorized version numbers.

## PyMilvus to Go SDK mapping

If you translate Python code that uses `MilvusClient` from `pymilvus`, rewrite it using this mapping:

| PyMilvus | Go SDK equivalent |
|---|---|
| `MilvusClient(uri=&quot;http://host:port&quot;)` | `milvusclient.New(ctx, &amp;milvusclient.ClientConfig{Address: &quot;host:port&quot;})` |
| `MilvusClient(uri=..., token=...)` | `milvusclient.New(ctx, &amp;milvusclient.ClientConfig{Address: ..., APIKey: ...})` |
| `DataType.INT64`, `DataType.VARCHAR`, `DataType.FLOAT_VECTOR` | `entity.FieldTypeInt64`, `entity.FieldTypeVarChar`, `entity.FieldTypeFloatVector` |
| `schema.add_field(&quot;id&quot;, DataType.INT64, is_primary=True, auto_id=True)` | `entity.NewField().WithName(&quot;id&quot;).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)` |
| `client.create_collection(collection_name=&quot;name&quot;, schema=schema, index_params=index_params)` | `client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(&quot;name&quot;, schema).WithIndexOptions(...))`, then `LoadCollection()` |
| `client.create_index(collection_name=&quot;name&quot;, index_params=index_params)` | `client.CreateIndex(ctx, milvusclient.NewCreateIndexOption(&quot;name&quot;, &quot;vector&quot;, index.NewAutoIndex(entity.COSINE)))`, then `Await(ctx)` on the returned task |
| `client.load_collection(&quot;name&quot;)` | `client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(&quot;name&quot;))`, then `Await(ctx)` |
| `client.release_collection(&quot;name&quot;)` | `client.ReleaseCollection(ctx, milvusclient.NewReleaseCollectionOption(&quot;name&quot;))` |
| `client.list_collections()` | `client.ListCollections(ctx, milvusclient.NewListCollectionOption())` |
| `client.has_collection(&quot;name&quot;)` | `client.HasCollection(ctx, milvusclient.NewHasCollectionOption(&quot;name&quot;))` |
| `client.drop_collection(&quot;name&quot;)` | `client.DropCollection(ctx, milvusclient.NewDropCollectionOption(&quot;name&quot;))` |
| `client.insert(collection_name=&quot;name&quot;, data=rows)` | `client.Insert(ctx, milvusclient.NewRowBasedInsertOption(&quot;name&quot;, rows...))`, or `NewColumnBasedInsertOption(&quot;name&quot;).With...Column(...)` for column data |
| `client.upsert(collection_name=&quot;name&quot;, data=rows)` | `client.Upsert(ctx, milvusclient.NewRowBasedInsertOption(&quot;name&quot;, rows...))`, or `NewColumnBasedInsertOption(&quot;name&quot;).With...Column(...)` for column data |
| `client.delete(collection_name=&quot;name&quot;, filter=expr)` | `client.Delete(ctx, milvusclient.NewDeleteOption(&quot;name&quot;).WithExpr(expr))` |
| `client.query(collection_name=&quot;name&quot;, filter=expr, output_fields=[...])` | `client.Query(ctx, milvusclient.NewQueryOption(&quot;name&quot;).WithFilter(expr).WithOutputFields(...))` |
| `client.search(collection_name=&quot;name&quot;, data=[vector], limit=5, output_fields=[...])` | `client.Search(ctx, milvusclient.NewSearchOption(&quot;name&quot;, 5, []entity.Vector{entity.FloatVector(vector)}).WithOutputFields(...))` |
| `hit[&quot;distance&quot;]`, `hit[&quot;entity&quot;][&quot;text&quot;]` | `rs.Scores[i]`, `rs.GetColumn(&quot;text&quot;).GetAsString(i)` |

## Complete example: basic workflow

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

// Connect to Milvus; New() blocks until connected, so bound the dial with a timeout
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

const collectionName = &quot;my_collection&quot;
const dimension = 768

// Drop the collection if it already exists
has, err := client.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
if err != nil {
    log.Fatal(err)
}
if has {
    if err := client.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName)); err != nil {
        log.Fatal(err)
    }
}

// Define schema
schema := entity.NewSchema().
    WithField(entity.NewField().WithName(&quot;id&quot;).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
    WithField(entity.NewField().WithName(&quot;vector&quot;).WithDataType(entity.FieldTypeFloatVector).WithDim(dimension)).
    WithField(entity.NewField().WithName(&quot;text&quot;).WithDataType(entity.FieldTypeVarChar).WithMaxLength(512))

// Create the collection with an index on the vector field
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
    WithIndexOptions(milvusclient.NewCreateIndexOption(collectionName, &quot;vector&quot;, index.NewAutoIndex(entity.COSINE))))
if err != nil {
    log.Fatal(err)
}

// NewCreateCollectionOption does not load the collection: load it and wait
loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
if err != nil {
    log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
    log.Fatal(err)
}

// Insert data (column-based; the auto ID primary key column is omitted)
vectors := make([][]float32, 2)
for i := range vectors {
    vectors[i] = make([]float32, dimension)
    for j := range vectors[i] {
        vectors[i][j] = 0.1 * float32(i+1)
    }
}
insertResult, err := client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
    WithFloatVectorColumn(&quot;vector&quot;, dimension, vectors).
    WithVarcharColumn(&quot;text&quot;, []string{&quot;first document&quot;, &quot;second document&quot;}))
if err != nil {
    log.Fatal(err)
}
fmt.Println(&quot;inserted:&quot;, insertResult.InsertCount)

// Search with Strong consistency so that the new entities are visible
queryVector := make([]float32, dimension)
for i := range queryVector {
    queryVector[i] = 0.15
}
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collectionName,
    5,
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(&quot;vector&quot;).WithOutputFields(&quot;text&quot;).WithConsistencyLevel(entity.ClStrong))
if err != nil {
    log.Fatal(err)
}

for _, rs := range resultSets {
    if rs.Err != nil {
        log.Fatal(rs.Err)
    }
    textColumn := rs.GetColumn(&quot;text&quot;)
    for i := 0; i &lt; rs.ResultCount; i++ {
        id, _ := rs.IDs.GetAsInt64(i)
        text, _ := textColumn.GetAsString(i)
        fmt.Printf(&quot;id: %d, score: %.4f, text: %s\n&quot;, id, rs.Scores[i], text)
    }
}
```

## Complete example: error handling

```go
import (
    &quot;context&quot;
    &quot;errors&quot;
    &quot;fmt&quot;
    &quot;log&quot;
    &quot;time&quot;

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
if err == nil {
    err = loadTask.Await(ctx)
}
switch {
case err == nil:
case errors.Is(err, milvusclient.ErrCollectionNotFound):
    fmt.Println(&quot;Collection does not exist. Create it first.&quot;)
case errors.Is(err, milvusclient.ErrIndexNotFound):
    fmt.Println(&quot;Index not created. Create an index before loading.&quot;)
default:
    log.Fatal(err)
}
```

## SDK feature notes

- **Go SDK:** `Client` provides `SearchIterator()` and `QueryIterator()` for reading large result sets in batches. `SearchIterator()` needs a server that supports search iterator V2 and returns `ErrServerVersionIncompatible` otherwise.
- **Go SDK:** `SimpleCreateCollectionOptions(name, dim)` creates a quick-setup collection with an auto ID `id` primary key, a `vector` field, a dynamic field, and an index with default parameters on `vector`, and loads it.
- **All SDKs:** Check the installed SDK version before relying on feature availability. Features may differ across Python, Java, Go, and Node.js SDKs.

## Verification checklist

Before finishing, verify:

- [ ] All imports come from `github.com/milvus-io/milvus/client/v3`, with no `milvus-sdk-go` or mixed major versions
- [ ] Connection uses `Address` (+ `APIKey` if authenticated), a dial timeout, and `defer client.Close(ctx)`
- [ ] Every returned `error` is checked
- [ ] An index is created before loading the collection
- [ ] The collection is loaded with `LoadCollection()` + `Await()` before any search or query
- [ ] Query vectors are passed as `[]entity.Vector`, and each `ResultSet.Err` is checked
- [ ] Every field read with `GetColumn()` is listed in `WithOutputFields()`
- [ ] Column-based inserts have columns of equal length and the correct vector `dim`
- [ ] Entity updates use `Upsert()`, not a nonexistent `Update()` method
- [ ] No hardcoded SDK version numbers; advise checking the Go module versions
<button class="copy-code-btn"></button></code></pre>
