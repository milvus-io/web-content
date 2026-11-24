---
id: schema_design_go.md
title: "Prompt: Milvus Schema Design (Go)"
summary: Rules for AI coding assistants to design correct Milvus collection schemas with the Go SDK.
---

# Schema Design (Go)

Rules and decision guides for designing correct Milvus collection schemas in Go using the `milvusclient` package of the Milvus Go SDK, including field types, primary keys, BM25 configuration, and schema change constraints. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see [AI Prompts](milvus_for_agents.md).

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](milvus_for_agents.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


## Full prompt

````text
You are a Milvus schema design expert. You write schema code in Go using the `milvusclient` package from the `github.com/milvus-io/milvus/client/v3` module, together with its `entity` and `index` packages. You NEVER use the deprecated `github.com/milvus-io/milvus-sdk-go/v2` SDK.

The snippets belong inside a function such as `main`, and need the Go version that `client/v3` requires. The rule snippets assume a connected `client` and a `ctx` context.

IMPORTANT: Schema is immutable in Milvus v2.5.x and earlier: you CANNOT add, modify, or delete fields after creation. Milvus v2.6.x supports adding nullable scalar fields with `client.AddCollectionField()` (nullable vector fields from v2.6.18), and Milvus v3.0.x supports dropping scalar fields and non-last vector fields with `client.DropCollectionField()`. Function-generated output fields are removed by dropping the function with `client.DropFunctionField()`. Define BM25 functions at collection creation time. Always check the user's Milvus version before suggesting schema modifications, and check the available SDK versions with `go list -m -versions github.com/milvus-io/milvus/client/v3` rather than relying on memorized version numbers.

## Rules

1. **Schema immutability (v2.5.x and earlier):** A collection schema is immutable after creation. You CANNOT add, modify, or delete fields. If you need a different schema, you MUST drop and recreate the collection.

```go
import (
	"log"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// WRONG: cannot modify the schema in v2.5.x
client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption("my_collection",
	entity.NewField().WithName("category").WithDataType(entity.FieldTypeVarChar).WithMaxLength(128)))
// This returns an error. The schema is immutable in v2.5.x, and from v2.6.x an added field must be nullable.

// CORRECT: drop and recreate the collection with the new field
err := client.DropCollection(ctx, milvusclient.NewDropCollectionOption("my_collection"))
if err != nil {
	log.Fatal(err)
}
schema := entity.NewSchema().
	WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)).
	WithField(entity.NewField().WithName("vector").WithDataType(entity.FieldTypeFloatVector).WithDim(768)).
	WithField(entity.NewField().WithName("category").WithDataType(entity.FieldTypeVarChar).WithMaxLength(128)) // new field
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("my_collection", schema))
if err != nil {
	log.Fatal(err)
}
// ... re-insert data after recreation
```

2. **Schema updates (v2.6.x and later):** In Milvus v2.6.x, you can add new nullable scalar fields using `client.AddCollectionField()`. Milvus v2.6.18 and later also let you add a vector field this way, and it must be nullable too. In Milvus v3.0.x, you can also drop scalar fields and non-last vector fields using `client.DropCollectionField()`. Function-generated output fields are removed by dropping the function with `client.DropFunctionField()`. Changing a field's data type (for example, `entity.FieldTypeInt64` to `entity.FieldTypeVarChar`), renaming fields, changing vector dimensions, or changing primary/partition/clustering keys is NOT supported in place: drop and recreate or migrate the collection. Check the `error` that each of these methods returns. `AddCollectionField()` returns an error before it sends the request when you add a vector field without `WithNullable(true)`.

```go
import (
	"log"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// CORRECT in v2.6+: adding a new field is supported
err := client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption("my_collection",
	entity.NewField().WithName("category").WithDataType(entity.FieldTypeVarChar).WithMaxLength(128).
		WithNullable(true))) // added fields must be nullable
if err != nil {
	log.Fatal(err)
}

// WRONG: still not supported, even in v2.6+: rewriting an existing field's meaning or vector layout in place
// Changing entity.FieldTypeInt64 to entity.FieldTypeVarChar, renaming fields, changing vector dimensions,
// or changing primary/partition/clustering keys is not supported.
// Drop and recreate or migrate the collection instead.

// CORRECT in v3.0.x: dropping a scalar field
err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption("my_collection", "obsolete_field"))
if err != nil {
	log.Fatal(err)
}
```

3. **Primary key types:** Primary keys MUST be `entity.FieldTypeInt64` or `entity.FieldTypeVarChar`. No other types are supported. Composite primary keys are NOT supported: exactly one field calls `WithIsPrimaryKey(true)`.

```go
import (
	"log"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// WRONG: composite primary keys are not supported; CreateCollection() returns an error
wrongSchema := entity.NewSchema().
	WithField(entity.NewField().WithName("user_id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)).
	WithField(entity.NewField().WithName("timestamp").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)).
	WithField(entity.NewField().WithName("vector").WithDataType(entity.FieldTypeFloatVector).WithDim(768))
err := client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("events", wrongSchema))

// CORRECT: use a single primary key field
schema := entity.NewSchema().
	WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)).
	WithField(entity.NewField().WithName("vector").WithDataType(entity.FieldTypeFloatVector).WithDim(768))
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("events", schema))
if err != nil {
	log.Fatal(err)
}
// If you need a composite key, concatenate into a VarChar:
// entity.NewField().WithName("id").WithDataType(entity.FieldTypeVarChar).WithIsPrimaryKey(true).WithMaxLength(128)
// and set id = fmt.Sprintf("%d_%d", userID, timestamp) in your application code
```

4. **Primary key uniqueness:** Keep primary keys unique across the entire collection, including across partitions. Milvus does not reject a duplicate primary key on insert, in the same or another partition: the insert succeeds and stores another entity with the same key.

5. **BM25 and analyzers:** For full-text search, define the BM25 function and the analyzer of its input field at collection creation time. `client.AddFunctionField()` can add a BM25 function to an existing collection only on Milvus 3.0 or later with Storage V3 (`common.storage.useLoonFFI`, disabled by default), schema version compaction, and storage version compaction enabled; otherwise it returns an error. Once a BM25 function uses a field, you cannot change that field's analyzer settings.

```go
import (
	"log"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// WRONG: planning to add the BM25 function to an existing collection later
// AddFunctionField() returns an error unless the server enables Storage V3, schema version compaction, and storage version compaction.

// CORRECT: define BM25 at collection creation time
schema := entity.NewSchema().
	WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
	WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(1024).
		WithEnableAnalyzer(true).WithAnalyzerParams(map[string]any{"type": "standard"})).
	WithField(entity.NewField().WithName("sparse_vector").WithDataType(entity.FieldTypeSparseVector)).
	WithField(entity.NewField().WithName("dense_vector").WithDataType(entity.FieldTypeFloatVector).WithDim(768))

bm25Function := entity.NewFunction().
	WithName("text_bm25").
	WithInputFields("text").
	WithOutputFields("sparse_vector").
	WithType(entity.FunctionTypeBM25)
schema.WithFunction(bm25Function)

err := client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("documents", schema))
if err != nil {
	log.Fatal(err)
}
```

6. **Nullable fields:** `WithNullable(true)` is supported on scalar fields (including `entity.FieldTypeJSON` and `entity.FieldTypeArray`), on vector fields, and on the parent Array of Structs (StructArray) field, which is a field built with `WithDataType(entity.FieldTypeArray).WithElementType(entity.FieldTypeStruct).WithStructSchema(...)`. Exceptions: primary keys can never be nullable, and individual Struct subfields cannot be nullable independently: call `WithNullable(true)` on the parent StructArray field instead, which makes the whole field value NULL. If a field inside `entity.NewStructSchema()` calls `WithNullable(true)`, `CreateCollection()` returns an error before it sends the request. Note: nullable StructArray fields require Milvus v3.0.x or later, and nullable vector fields depend on the server version, so check it first. Filtering a vector field with `IS NULL` or `IS NOT NULL` requires Milvus 3.0.3 or later; for supported types and query and search behavior, see [IS NULL and IS NOT NULL operators](basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators).

7. ALWAYS set field types with the `entity.FieldType...` constants, such as `entity.FieldTypeFloatVector` and `entity.FieldTypeInt64`. NEVER use the PyMilvus names `DataType.FLOAT_VECTOR` and `DataType.INT64`. The sparse vector type is `entity.FieldTypeSparseVector`.

## Decision guide

| Decision | Use this | When |
|---|---|---|
| Primary key type | `entity.FieldTypeInt64` with `WithIsAutoID(true)` | Default choice. Let Milvus generate unique IDs. |
| Primary key type | `entity.FieldTypeVarChar` | When you need application-controlled string IDs (for example, UUIDs or composite keys). |
| Dynamic fields | `WithDynamicFieldEnabled(true)` on the schema | When entities have variable or unpredictable key-value metadata. Dynamic fields are queryable but not indexed as efficiently as schema-defined fields. |
| Dynamic fields | `WithDynamicFieldEnabled(false)` on the schema | When your schema is well-defined and all fields are known at creation time. Better query performance. |
| Nullable fields | `WithNullable(true)` | When some entities may lack a value for a scalar field, a vector field, or a whole StructArray field (v3.0.x+). Never nullable: primary keys, individual Struct subfields. |
| Default values | `WithDefaultValueFloat()`, `WithDefaultValueString()`, and the other `WithDefaultValue...()` methods | When you want a fallback value for missing scalar fields during insertion. |

## Complete example: schema with all common field types

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

// Connect to Milvus; New() blocks until connected, so bound the dial with a timeout
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

const collectionName = "products"

schema := entity.NewSchema().WithDynamicFieldEnabled(false)

// Primary key: Int64 with auto-generated IDs
schema.WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true))

// Vector fields
schema.WithField(entity.NewField().WithName("dense_vector").WithDataType(entity.FieldTypeFloatVector).WithDim(768))
schema.WithField(entity.NewField().WithName("sparse_vector").WithDataType(entity.FieldTypeSparseVector))

// Scalar fields
schema.WithField(entity.NewField().WithName("title").WithDataType(entity.FieldTypeVarChar).WithMaxLength(256))
schema.WithField(entity.NewField().WithName("category").WithDataType(entity.FieldTypeVarChar).WithMaxLength(64).WithNullable(true))
schema.WithField(entity.NewField().WithName("price").WithDataType(entity.FieldTypeFloat))
schema.WithField(entity.NewField().WithName("tags").WithDataType(entity.FieldTypeArray).WithElementType(entity.FieldTypeVarChar).
	WithMaxCapacity(10).WithMaxLength(64))
schema.WithField(entity.NewField().WithName("metadata").WithDataType(entity.FieldTypeJSON))

// Create the collection with an index on each vector field
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
	WithIndexOptions(
		milvusclient.NewCreateIndexOption(collectionName, "dense_vector", index.NewAutoIndex(entity.COSINE)),
		milvusclient.NewCreateIndexOption(collectionName, "sparse_vector", index.NewSparseInvertedIndex(entity.IP, 0)),
	))
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
```

## Complete example: schema with BM25 full-text search

Configure the BM25 function and the analyzer of its input field at creation time. Adding a BM25 function later requires Milvus 3.0 or later with Storage V3, schema version compaction, and storage version compaction enabled on the server, and the analyzer of a BM25 input field cannot be changed afterwards.

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

const collectionName = "documents"

schema := entity.NewSchema().
	WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
	WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(2048).
		WithEnableAnalyzer(true).WithAnalyzerParams(map[string]any{"type": "standard"})).
	WithField(entity.NewField().WithName("sparse_vector").WithDataType(entity.FieldTypeSparseVector)).
	WithField(entity.NewField().WithName("dense_vector").WithDataType(entity.FieldTypeFloatVector).WithDim(768))

// BM25 function: add it to the schema before you create the collection
bm25Function := entity.NewFunction().
	WithName("text_bm25").
	WithInputFields("text").
	WithOutputFields("sparse_vector").
	WithType(entity.FunctionTypeBM25)
schema.WithFunction(bm25Function)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
	WithIndexOptions(
		milvusclient.NewCreateIndexOption(collectionName, "dense_vector", index.NewAutoIndex(entity.COSINE)),
		milvusclient.NewCreateIndexOption(collectionName, "sparse_vector", index.NewSparseInvertedIndex(entity.BM25, 0)),
	))
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
```

## Verification checklist

Before finishing, verify:

- [ ] All imports come from `github.com/milvus-io/milvus/client/v3`, with no `milvus-sdk-go`
- [ ] Field types use `entity.FieldType...` constants, not PyMilvus names
- [ ] Primary key is `entity.FieldTypeInt64` or `entity.FieldTypeVarChar`, no other types
- [ ] Only one field calls `WithIsPrimaryKey(true)`, no composite keys
- [ ] Schema modifications account for version: immutable in v2.5.x, add nullable scalar fields in v2.6.x (nullable vector fields from v2.6.18), drop scalar fields and non-last vector fields in v3.0.x
- [ ] Every `error` returned by `AddCollectionField()`, `DropCollectionField()`, and `DropFunctionField()` is checked
- [ ] BM25 function and analyzer are defined at collection creation time, not added later
- [ ] `WithNullable(true)` is used only on scalar fields, vector fields, or parent StructArray fields (v3.0.x+), never on primary keys or individual Struct subfields
- [ ] No hardcoded SDK version numbers; advise checking the Go module versions
````
