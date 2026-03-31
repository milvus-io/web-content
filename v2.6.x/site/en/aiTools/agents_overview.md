---
id: agents_overview.md
title: "AGENTS.md for Milvus"
summary: Rules and patterns for AI coding agents that generate, review, or debug Milvus vector database code using PyMilvus.
---

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](milvus_for_agents.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


# AGENTS.md — Milvus

Milvus is an open-source vector database for similarity search, hybrid search, and RAG. You interact with it through the PyMilvus SDK's `MilvusClient` interface. Copy the full prompt below into your AI tool to apply these rules automatically. For detailed task-specific prompts, see [AI Prompts](milvus_for_agents.md).

## Full prompt

[Open in Cursor](cursor://anysphere.cursor-deeplink/prompt?text=%23%20AGENTS.md%20%E2%80%94%20Milvus%0A%0AMilvus%20is%20an%20open-source%20vector%20database%20for%20similarity%20search%2C%20hybrid%20search%2C%20and%20RAG.%20You%20interact%20with%20it%20through%20the%20PyMilvus%20SDK%27s%20%60MilvusClient%60%20interface.%0A%0AUse%20these%20rules%20whenever%20you%20generate%2C%20review%2C%20or%20debug%20code%20that%20connects%20to%20Milvus%20or%20Zilliz%20Cloud.%0A%0A%23%23%20Client%20%26%20connection%0A%0A1.%20CRITICAL%20%E2%80%94%20Always%20use%20%60MilvusClient%60.%20Never%20use%20the%20legacy%20ORM%20API.%0A2.%20Local%3A%20%60MilvusClient%28uri%3D%22http%3A%2F%2Flocalhost%3A19530%22%29%60.%20Zilliz%20Cloud%3A%20add%20%60token%3D%22...%22%60.%0A%0A%23%23%20Schema%20%26%20data%0A%0A3.%20CRITICAL%20%E2%80%94%20Use%20%60DataType%60%20enum%2C%20not%20strings.%0A4.%20CRITICAL%20%E2%80%94%20Schema%20is%20immutable%20in%20v2.5.x.%20Drop%20and%20recreate%20to%20change.%20v2.6%2B%20allows%20adding%20nullable%20fields.%0A5.%20Primary%20keys%3A%20INT64%20or%20VARCHAR%20only.%20No%20composite%20keys.%0A6.%20Use%20%60upsert%28%29%60%20to%20update.%20There%20is%20no%20%60update%28%29%60%20method.%0A7.%20BM25%20must%20be%20defined%20at%20collection%20creation%20time.%0A%0A%23%23%20Index%20%26%20loading%0A%0A8.%20CRITICAL%20%E2%80%94%20Index%20before%20load%2C%20load%20before%20search.%20Pass%20schema%20%2B%20index_params%20to%20create_collection%28%29%20to%20auto-handle.%0A9.%20Start%20with%20AUTOINDEX.%0A%0A%23%23%20Search%0A%0A10.%20CRITICAL%20%E2%80%94%20One%20vector%20per%20AnnSearchRequest.%0A11.%20One%20ranker%20per%20hybrid_search%28%29%20call.)

````text
# AGENTS.md — Milvus

Milvus is an open-source vector database for similarity search, hybrid search, and RAG. You interact with it through the PyMilvus SDK's `MilvusClient` interface.

Use these rules whenever you generate, review, or debug code that connects to Milvus or Zilliz Cloud.

## Client & connection

1. **CRITICAL — Always use `MilvusClient`.** Never use the legacy ORM API (`connections.connect()`, `Collection()`, `utility.list_collections()`). The ORM API is deprecated and will be removed. If the user provides ORM code, rewrite it to `MilvusClient`.

2. **Connection patterns.** Local unauthenticated: `uri` only. Zilliz Cloud or authenticated Milvus: `uri` + `token`.

```python
# Local Milvus
client = MilvusClient(uri="http://localhost:19530")

# Zilliz Cloud / authenticated Milvus
client = MilvusClient(uri="YOUR_MILVUS_URI", token="YOUR_MILVUS_TOKEN")
```

## Schema & data

3. **CRITICAL — Use `DataType` enum, not strings.** Write `DataType.FLOAT_VECTOR`, not `"FLOAT_VECTOR"`.

4. **CRITICAL — Schema is immutable in v2.5.x and earlier.** You cannot add, modify, or delete fields after creation — drop and recreate the collection. In v2.6+, you can add new nullable fields with `add_collection_field()` but still cannot modify or delete existing fields.

5. **Primary keys: `INT64` or `VARCHAR` only.** Composite primary keys are not supported. Primary keys must be unique across the entire collection, including across partitions.

6. **Use `upsert()` to update entities.** There is no `client.update()` method. `upsert()` replaces the entire entity if the primary key exists, or inserts a new one. Use `insert()` only when you are certain there are no primary key conflicts.

7. **BM25 must be defined at collection creation time.** The BM25 function and text analyzer cannot be added to an existing collection.

## Index & loading

8. **CRITICAL — Index before load, load before search.** A vector field must have an index before the collection can be loaded. A collection must be loaded before any search or query. Shortcut: pass both `schema` and `index_params` to `create_collection()` and Milvus handles index creation and loading automatically.

9. **Start with `AUTOINDEX`.** Use `index_type="AUTOINDEX"` unless you have specific requirements. Choose HNSW for high recall, DiskANN for larger-than-RAM datasets, IVF_FLAT for memory-constrained scenarios.

## Search

10. **CRITICAL — One vector per `AnnSearchRequest`.** Each sub-request in a hybrid search accepts exactly one query vector. Do not pass a list of multiple vectors.

11. **One ranker per `hybrid_search()` call.** You cannot chain `WeightedRanker` and `RRFRanker` together. Pick one.

## Quick start

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="http://localhost:19530")

# 1. Define schema
schema = client.create_schema(auto_id=True)
schema.add_field("id", DataType.INT64, is_primary=True)
schema.add_field("vector", DataType.FLOAT_VECTOR, dim=768)
schema.add_field("text", DataType.VARCHAR, max_length=512)

# 2. Define index
index_params = client.prepare_index_params()
index_params.add_index(field_name="vector", index_type="AUTOINDEX", metric_type="COSINE")

# 3. Create collection (auto-indexes and auto-loads)
client.create_collection(collection_name="docs", schema=schema, index_params=index_params)

# 4. Insert
client.insert(collection_name="docs", data=[
    {"vector": [0.1] * 768, "text": "first doc"},
    {"vector": [0.2] * 768, "text": "second doc"},
])

# 5. Search
results = client.search(
    collection_name="docs",
    data=[[0.15] * 768],
    limit=5,
    output_fields=["text"],
)
```

## Common mistakes

| Mistake | Fix |
|---|---|
| Using `connections.connect()` / `Collection()` | Rewrite with `MilvusClient` |
| Calling `client.search()` before loading | Pass `index_params` to `create_collection()`, or call `create_index()` then `load_collection()` first |
| Multiple vectors in one `AnnSearchRequest` | One vector per sub-request; create multiple `AnnSearchRequest` objects |
| Calling `client.update()` | Use `client.upsert()` |
| Adding BM25 after collection exists | Define BM25 function and analyzer at `create_collection()` time |
| String field types (`"FLOAT_VECTOR"`) | Use `DataType.FLOAT_VECTOR` from the enum |
````
