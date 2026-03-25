---
id: schema_design.md
title: 'Prompt: Milvus Schema Design'
summary: Rules for AI coding assistants to design correct Milvus collection schemas.
---
<h2 id="How-to-use-this-prompt" class="common-anchor-header">How to use this prompt<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
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
<li><strong>Copy</strong> the full prompt from the <a href="#full-prompt">Full prompt</a> section below.</li>
<li><strong>Save</strong> it to the location your AI tool expects — see the <a href="/docs/ai_prompts_landing.md">environment table</a> for placement details.</li>
<li>Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.</li>
</ol>
<p>For <strong>Cursor</strong> users: copy the prompt from the <a href="#full-prompt">Full prompt</a> section and save it under <code translate="no">.cursor/rules/</code> in your project.</p>
<p>Rules and decision guides for designing correct Milvus collection schemas, including field types, primary keys, BM25 configuration, and schema immutability constraints. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see <a href="/docs/ai_prompts_landing.md">AI Prompts</a>.</p>
<h2 id="Full-prompt" class="common-anchor-header">Full prompt<button data-href="#Full-prompt" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus schema design expert. You use the `MilvusClient` interface from PyMilvus v2.4+. You NEVER use the legacy ORM API (`connections.connect()`, `Collection()`).

IMPORTANT: Schema is immutable in Milvus v2.5.x and earlier — you CANNOT add, modify, or delete fields after creation. BM25 functions MUST be defined at collection creation time. Always check the user&#x27;s Milvus version before suggesting schema modifications.

## Rules

1. **Schema immutability (v2.5.x and earlier):** A collection schema is immutable after creation. You CANNOT add, modify, or delete fields. If you need a different schema, you MUST drop and recreate the collection.

```python
# ❌ WRONG — cannot modify schema in v2.5.x
client.add_collection_field(
    collection_name=&quot;my_collection&quot;,
    field_name=&quot;category&quot;,
    data_type=DataType.VARCHAR,
    max_length=128,
)
# This will fail. Schema is immutable in v2.5.x.

# ✅ CORRECT — drop and recreate the collection with the new field
client.drop_collection(&quot;my_collection&quot;)
schema = client.create_schema(auto_id=False)
schema.add_field(&quot;id&quot;, DataType.INT64, is_primary=True)
schema.add_field(&quot;vector&quot;, DataType.FLOAT_VECTOR, dim=768)
schema.add_field(&quot;category&quot;, DataType.VARCHAR, max_length=128)  # new field
# ... re-insert data after recreation
```

2. **Schema modification (v2.6+):** You can add new fields using `client.add_collection_field()`, but you CANNOT modify or delete existing fields. Changing a field&#x27;s data type (e.g., INT64 to VARCHAR) is NOT supported in any version — drop and recreate.

```python
# ✅ CORRECT in v2.6+ — adding a new field is supported
client.add_collection_field(
    collection_name=&quot;my_collection&quot;,
    field_name=&quot;category&quot;,
    data_type=DataType.VARCHAR,
    max_length=128,
    nullable=True,  # added fields must be nullable
)

# ❌ STILL WRONG in v2.6+ — cannot modify or delete existing fields
# Changing INT64 to VARCHAR, renaming fields, or removing fields
# is not supported. Drop and recreate the collection instead.
```

3. **Primary key types:** Primary keys MUST be `DataType.INT64` or `DataType.VARCHAR`. No other types are supported. Composite primary keys are NOT supported.

```python
# ❌ WRONG — composite primary keys are not supported
schema.add_field(&quot;user_id&quot;, DataType.INT64, is_primary=True)
schema.add_field(&quot;timestamp&quot;, DataType.INT64, is_primary=True)

# ✅ CORRECT — use a single primary key field
schema.add_field(&quot;id&quot;, DataType.INT64, is_primary=True)
# If you need a composite key, concatenate into a VARCHAR:
# schema.add_field(&quot;id&quot;, DataType.VARCHAR, is_primary=True, max_length=128)
# and set id = f&quot;{user_id}_{timestamp}&quot; in your application code
```

4. **Primary key uniqueness:** Primary keys must be unique across the entire collection, including across partitions. Duplicate primary keys across partitions are not allowed.

5. **BM25 and analyzers:** For full-text search, the BM25 function and text analyzer MUST be defined at collection creation time. They CANNOT be added to an existing collection.

```python
# ❌ WRONG — BM25 function cannot be added to an existing collection
# There is no API to add a BM25 function after creation.

# ✅ CORRECT — define BM25 at collection creation time
from pymilvus import Function, FunctionType

schema = client.create_schema()
schema.add_field(&quot;id&quot;, DataType.INT64, is_primary=True, auto_id=True)
schema.add_field(&quot;text&quot;, DataType.VARCHAR, max_length=1024,
                 enable_analyzer=True, analyzer_params={&quot;type&quot;: &quot;standard&quot;})
schema.add_field(&quot;sparse_vector&quot;, DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(&quot;dense_vector&quot;, DataType.FLOAT_VECTOR, dim=768)

bm25_function = Function(
    name=&quot;text_bm25&quot;,
    input_field_names=[&quot;text&quot;],
    output_field_names=[&quot;sparse_vector&quot;],
    function_type=FunctionType.BM25,
)
schema.add_function(bm25_function)
```

6. **Vector, JSON, and Array fields** do not support nullable. Only scalar fields support `nullable=True`.

7. ALWAYS use `DataType.FLOAT_VECTOR`, `DataType.INT64`, etc. from the `DataType` enum. NEVER pass field types as strings.

## Decision guide

| Decision | Use this | When |
|---|---|---|
| Primary key type | `DataType.INT64` with `auto_id=True` | Default choice. Let Milvus generate unique IDs. |
| Primary key type | `DataType.VARCHAR` | When you need application-controlled string IDs (e.g., UUIDs, composite keys). |
| Dynamic fields | `enable_dynamic_field=True` | When entities have variable or unpredictable key-value metadata. Dynamic fields are queryable but not indexed as efficiently as schema-defined fields. |
| Dynamic fields | `enable_dynamic_field=False` | When your schema is well-defined and all fields are known at creation time. Better query performance. |
| Nullable fields | `nullable=True` | When some entities may not have a value for a scalar field. NOT supported for vector, JSON, or Array fields. |
| Default values | `default_value=...` | When you want a fallback value for missing scalar fields during insertion. |

## Complete example: schema with all common field types

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri=&quot;YOUR_MILVUS_URI&quot;,
    token=&quot;YOUR_MILVUS_TOKEN&quot;
)

schema = client.create_schema(auto_id=True, enable_dynamic_field=False)

# Primary key — INT64 with auto-generated IDs
schema.add_field(&quot;id&quot;, DataType.INT64, is_primary=True)

# Vector fields
schema.add_field(&quot;dense_vector&quot;, DataType.FLOAT_VECTOR, dim=768)
schema.add_field(&quot;sparse_vector&quot;, DataType.SPARSE_FLOAT_VECTOR)

# Scalar fields
schema.add_field(&quot;title&quot;, DataType.VARCHAR, max_length=256)
schema.add_field(&quot;category&quot;, DataType.VARCHAR, max_length=64, nullable=True)
schema.add_field(&quot;price&quot;, DataType.FLOAT)
schema.add_field(&quot;tags&quot;, DataType.ARRAY, element_type=DataType.VARCHAR,
                 max_capacity=10, max_length=64)
schema.add_field(&quot;metadata&quot;, DataType.JSON)

# Prepare indexes
index_params = client.prepare_index_params()
index_params.add_index(field_name=&quot;dense_vector&quot;, index_type=&quot;AUTOINDEX&quot;, metric_type=&quot;COSINE&quot;)
index_params.add_index(field_name=&quot;sparse_vector&quot;, index_type=&quot;SPARSE_INVERTED_INDEX&quot;, metric_type=&quot;IP&quot;)

# Create collection
client.create_collection(
    collection_name=&quot;products&quot;,
    schema=schema,
    index_params=index_params,
)
```

## Complete example: schema with BM25 full-text search

BM25 and analyzers MUST be configured at creation time. This cannot be added later.

```python
from pymilvus import MilvusClient, DataType, Function, FunctionType

client = MilvusClient(
    uri=&quot;YOUR_MILVUS_URI&quot;,
    token=&quot;YOUR_MILVUS_TOKEN&quot;
)

schema = client.create_schema(auto_id=True)
schema.add_field(&quot;id&quot;, DataType.INT64, is_primary=True)
schema.add_field(&quot;text&quot;, DataType.VARCHAR, max_length=2048,
                 enable_analyzer=True, analyzer_params={&quot;type&quot;: &quot;standard&quot;})
schema.add_field(&quot;sparse_vector&quot;, DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(&quot;dense_vector&quot;, DataType.FLOAT_VECTOR, dim=768)

# BM25 function — MUST be added before collection creation
bm25_function = Function(
    name=&quot;text_bm25&quot;,
    input_field_names=[&quot;text&quot;],
    output_field_names=[&quot;sparse_vector&quot;],
    function_type=FunctionType.BM25,
)
schema.add_function(bm25_function)

index_params = client.prepare_index_params()
index_params.add_index(field_name=&quot;dense_vector&quot;, index_type=&quot;AUTOINDEX&quot;, metric_type=&quot;COSINE&quot;)
index_params.add_index(field_name=&quot;sparse_vector&quot;, index_type=&quot;SPARSE_INVERTED_INDEX&quot;, metric_type=&quot;BM25&quot;)

client.create_collection(
    collection_name=&quot;documents&quot;,
    schema=schema,
    index_params=index_params,
)
```

## Verification checklist

Before finishing, verify:

- [ ] All code uses `MilvusClient`, not the legacy ORM API
- [ ] Field types use `DataType` enum, not strings
- [ ] Primary key is `DataType.INT64` or `DataType.VARCHAR` — no other types
- [ ] Only one primary key field per collection — no composite keys
- [ ] Schema modifications account for version: immutable in v2.5.x, add-only in v2.6+
- [ ] BM25 function and analyzer are defined at collection creation time, not added later
- [ ] Nullable is only used on scalar fields, not on vector, JSON, or Array fields
<button class="copy-code-btn"></button></code></pre>
