---
id: schema_design_nodejs.md
title: "Prompt: Milvus Schema Design (Node.js)"
summary: Rules for AI coding assistants to design correct Milvus collection schemas with the Node.js SDK.
---

# Schema Design (Node.js)

Rules and decision guides for designing correct Milvus collection schemas in JavaScript or TypeScript using `MilvusClient` from `@zilliz/milvus2-sdk-node`, including field types, primary keys, BM25 configuration, and schema change constraints. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see [AI Prompts](milvus_for_agents.md).

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](milvus_for_agents.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


## Full prompt

````text
You are a Milvus schema design expert. You write schema code in JavaScript or TypeScript using the `MilvusClient` class from the `@zilliz/milvus2-sdk-node` package, and you `await` every client call. You NEVER use the `collectionManager`, `dataManager`, `indexManager`, or `partitionManager` objects: they do not exist on `MilvusClient`.

The examples use ES modules (`import` and top-level `await`). In a CommonJS file, use `require` and wrap the code in an async function. The rule snippets assume a connected `client`.

IMPORTANT: Schema is immutable in Milvus v2.5.x and earlier: you CANNOT add, modify, or delete fields after creation. Milvus v2.6.x supports adding nullable scalar fields with `addCollectionField()` (nullable vector fields from v2.6.18), and Milvus v3.0.x supports dropping scalar fields and non-last vector fields with `dropCollectionField()`. Function-generated output fields are removed by dropping the function with `dropFunctionField()`. Define BM25 functions at collection creation time. Always check the user's Milvus version before suggesting schema modifications, and check the installed and published SDK versions with `npm ls @zilliz/milvus2-sdk-node` and `npm view @zilliz/milvus2-sdk-node version` rather than relying on memorized version numbers.

## Rules

1. **Schema immutability (v2.5.x and earlier):** A collection schema is immutable after creation. You CANNOT add, modify, or delete fields. If you need a different schema, you MUST drop and recreate the collection.

```javascript
import { DataType } from '@zilliz/milvus2-sdk-node';

// WRONG: cannot modify the schema in v2.5.x
await client.addCollectionField({
  collection_name: 'my_collection',
  field: { name: 'category', data_type: DataType.VarChar, max_length: 128 },
});
// This fails. The schema is immutable in v2.5.x, and from v2.6.x an added field must set nullable: true.

// CORRECT: drop and recreate the collection with the new field
await client.dropCollection({ collection_name: 'my_collection' });
await client.createCollection({
  collection_name: 'my_collection',
  fields: [
    { name: 'id', data_type: DataType.Int64, is_primary_key: true, autoID: false },
    { name: 'vector', data_type: DataType.FloatVector, dim: 768 },
    { name: 'category', data_type: DataType.VarChar, max_length: 128 }, // new field
  ],
});
// ... re-insert data after recreation
```

2. **Schema updates (v2.6.x and later):** In Milvus v2.6.x, you can add new nullable scalar fields using `client.addCollectionField()`. Milvus v2.6.18 and later also let you add a vector field this way, and it must be nullable too. In Milvus v3.0.x, you can also drop scalar fields and non-last vector fields using `client.dropCollectionField()`. Function-generated output fields are removed by dropping the function with `client.dropFunctionField()`. Changing a field's data type (for example, `DataType.Int64` to `DataType.VarChar`), renaming fields, changing vector dimensions, or changing primary/partition/clustering keys is NOT supported in place: drop and recreate or migrate the collection. These methods resolve with the status object itself, so check `res.error_code` against `ErrorCode.SUCCESS`. `addCollectionField()` throws an `Error` before it sends the request when you add a vector field without `nullable: true`.

```javascript
import { DataType, ErrorCode } from '@zilliz/milvus2-sdk-node';

// CORRECT in v2.6+: adding a new field is supported
const addRes = await client.addCollectionField({
  collection_name: 'my_collection',
  field: {
    name: 'category',
    data_type: DataType.VarChar,
    max_length: 128,
    nullable: true, // added fields must be nullable
  },
});
if (addRes.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`addCollectionField failed: ${addRes.reason}`);
}

// WRONG: still not supported, even in v2.6+: rewriting an existing field's meaning or vector layout in place
// Changing DataType.Int64 to DataType.VarChar, renaming fields, changing vector dimensions,
// or changing primary/partition/clustering keys is not supported.
// Drop and recreate or migrate the collection instead.

// CORRECT in v3.0.x: dropping a scalar field
const dropRes = await client.dropCollectionField({
  collection_name: 'my_collection',
  field_name: 'obsolete_field',
});
if (dropRes.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`dropCollectionField failed: ${dropRes.reason}`);
}
```

3. **Primary key types:** Primary keys MUST be `DataType.Int64` or `DataType.VarChar`. No other types are supported. Composite primary keys are NOT supported: exactly one field has `is_primary_key: true`.

```javascript
import { DataType } from '@zilliz/milvus2-sdk-node';

// WRONG: composite primary keys are not supported
const wrongFields = [
  { name: 'user_id', data_type: DataType.Int64, is_primary_key: true },
  { name: 'timestamp', data_type: DataType.Int64, is_primary_key: true },
];

// CORRECT: use a single primary key field
const fields = [
  { name: 'id', data_type: DataType.Int64, is_primary_key: true },
];
// If you need a composite key, concatenate into a VarChar:
// { name: 'id', data_type: DataType.VarChar, is_primary_key: true, max_length: 128 }
// and set id = `${userId}_${timestamp}` in your application code
```

4. **Primary key uniqueness:** Keep primary keys unique across the entire collection, including across partitions. Milvus does not reject a duplicate primary key on insert, in the same or another partition: the insert succeeds and stores another entity with the same key.

5. **BM25 and analyzers:** For full-text search, define the BM25 function and the analyzer of its input field at collection creation time. `client.addFunctionField()` can add a BM25 function to an existing collection only on Milvus 3.0 or later with Storage V3 (`common.storage.useLoonFFI`, disabled by default), schema version compaction, and storage version compaction enabled; otherwise the server rejects it. Once a BM25 function uses a field, you cannot change that field's analyzer settings.

```javascript
// WRONG: planning to add the BM25 function to an existing collection later
// addFunctionField() is rejected unless the server enables Storage V3, schema version compaction, and storage version compaction.

// CORRECT: define BM25 at collection creation time
import { DataType, FunctionType } from '@zilliz/milvus2-sdk-node';

await client.createCollection({
  collection_name: 'documents',
  fields: [
    { name: 'id', data_type: DataType.Int64, is_primary_key: true, autoID: true },
    {
      name: 'text',
      data_type: DataType.VarChar,
      max_length: 1024,
      enable_analyzer: true,
      analyzer_params: { type: 'standard' },
    },
    { name: 'sparse_vector', data_type: DataType.SparseFloatVector },
    { name: 'dense_vector', data_type: DataType.FloatVector, dim: 768 },
  ],
  functions: [
    {
      name: 'text_bm25',
      type: FunctionType.BM25,
      input_field_names: ['text'],
      output_field_names: ['sparse_vector'],
      params: {},
    },
  ],
});
```

6. **Nullable fields:** `nullable: true` is supported on scalar fields (including `DataType.JSON` and `DataType.Array`), on vector fields, and on the parent Array of Structs (StructArray) field, which is a field with `data_type: DataType.Array` and `element_type: DataType.Struct`. Exceptions: primary keys can never be nullable, and individual Struct subfields cannot be nullable independently: set `nullable: true` on the parent StructArray field instead, which makes the whole field value NULL. The Node.js SDK copies the parent's `nullable` value onto every subfield, so `nullable: true` on a subfield alone is silently dropped. Note: nullable StructArray fields require Milvus v3.0.x or later, and nullable vector fields depend on the server version, so check it first. Filtering a vector field with `IS NULL` or `IS NOT NULL` requires Milvus 3.0.3 or later; for supported types and query and search behavior, see [IS NULL and IS NOT NULL operators](basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators).

7. ALWAYS use the PascalCase members of the `DataType` enum, such as `DataType.FloatVector` and `DataType.Int64`. NEVER pass `'FLOAT_VECTOR'`-style strings, and NEVER use the PyMilvus names `DataType.FLOAT_VECTOR` and `DataType.INT64`, which do not exist in the Node.js SDK.

## Decision guide

| Decision | Use this | When |
|---|---|---|
| Primary key type | `DataType.Int64` with `autoID: true` | Default choice. Let Milvus generate unique IDs. |
| Primary key type | `DataType.VarChar` | When you need application-controlled string IDs (for example, UUIDs or composite keys). |
| Dynamic fields | `enable_dynamic_field: true` | When entities have variable or unpredictable key-value metadata. Dynamic fields are queryable but not indexed as efficiently as schema-defined fields. |
| Dynamic fields | `enable_dynamic_field: false` | When your schema is well-defined and all fields are known at creation time. Better query performance. |
| Nullable fields | `nullable: true` | When some entities may lack a value for a scalar field, a vector field, or a whole StructArray field (v3.0.x+). Never nullable: primary keys, individual Struct subfields. |
| Default values | `default_value: ...` | When you want a fallback value for missing scalar fields during insertion. |

## Complete example: schema with all common field types

```javascript
import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'YOUR_MILVUS_URI',
  token: 'YOUR_MILVUS_TOKEN',
});

// createCollection() with index_params creates the indexes and loads the collection
await client.createCollection({
  collection_name: 'products',
  enable_dynamic_field: false,
  fields: [
    // Primary key: Int64 with auto-generated IDs
    { name: 'id', data_type: DataType.Int64, is_primary_key: true, autoID: true },

    // Vector fields
    { name: 'dense_vector', data_type: DataType.FloatVector, dim: 768 },
    { name: 'sparse_vector', data_type: DataType.SparseFloatVector },

    // Scalar fields
    { name: 'title', data_type: DataType.VarChar, max_length: 256 },
    { name: 'category', data_type: DataType.VarChar, max_length: 64, nullable: true },
    { name: 'price', data_type: DataType.Float },
    {
      name: 'tags',
      data_type: DataType.Array,
      element_type: DataType.VarChar,
      max_capacity: 10,
      max_length: 64,
    },
    { name: 'metadata', data_type: DataType.JSON },
  ],
  index_params: [
    { field_name: 'dense_vector', index_type: 'AUTOINDEX', metric_type: 'COSINE' },
    { field_name: 'sparse_vector', index_type: 'SPARSE_INVERTED_INDEX', metric_type: 'IP' },
  ],
});

await client.closeConnection();
```

## Complete example: schema with BM25 full-text search

Configure the BM25 function and the analyzer of its input field at creation time. Adding a BM25 function later requires Milvus 3.0 or later with Storage V3, schema version compaction, and storage version compaction enabled on the server, and the analyzer of a BM25 input field cannot be changed afterwards.

```javascript
import { MilvusClient, DataType, FunctionType } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'YOUR_MILVUS_URI',
  token: 'YOUR_MILVUS_TOKEN',
});

await client.createCollection({
  collection_name: 'documents',
  fields: [
    { name: 'id', data_type: DataType.Int64, is_primary_key: true, autoID: true },
    {
      name: 'text',
      data_type: DataType.VarChar,
      max_length: 2048,
      enable_analyzer: true,
      analyzer_params: { type: 'standard' },
    },
    { name: 'sparse_vector', data_type: DataType.SparseFloatVector },
    { name: 'dense_vector', data_type: DataType.FloatVector, dim: 768 },
  ],
  // BM25 function: define it when you create the collection
  functions: [
    {
      name: 'text_bm25',
      type: FunctionType.BM25,
      input_field_names: ['text'],
      output_field_names: ['sparse_vector'],
      params: {},
    },
  ],
  index_params: [
    { field_name: 'dense_vector', index_type: 'AUTOINDEX', metric_type: 'COSINE' },
    { field_name: 'sparse_vector', index_type: 'SPARSE_INVERTED_INDEX', metric_type: 'BM25' },
  ],
});

await client.closeConnection();
```

## Verification checklist

Before finishing, verify:

- [ ] All code calls methods directly on `MilvusClient`, not on manager objects
- [ ] Field types use PascalCase `DataType` enum members, not strings or PyMilvus names
- [ ] Primary key is `DataType.Int64` or `DataType.VarChar`, no other types
- [ ] Only one field has `is_primary_key: true`, no composite keys
- [ ] Schema modifications account for version: immutable in v2.5.x, add nullable scalar fields in v2.6.x (nullable vector fields from v2.6.18), drop scalar fields and non-last vector fields in v3.0.x
- [ ] Responses from `addCollectionField()`, `dropCollectionField()`, and `dropFunctionField()` are checked with `res.error_code`
- [ ] BM25 function and analyzer are defined at collection creation time, not added later
- [ ] `nullable: true` is used only on scalar fields, vector fields, or parent StructArray fields (v3.0.x+), never on primary keys or individual Struct subfields
- [ ] No hardcoded SDK version numbers; advise checking npm
````
