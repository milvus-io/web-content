---
id: search_patterns.md
title: "Prompt: Milvus Search Patterns"
summary: Rules for AI coding assistants to implement search, hybrid search, and full-text search in Milvus.
---

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](milvus_for_agents.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


Rules for implementing similarity search, hybrid search, filtered search, and full-text search in Milvus, including AnnSearchRequest constraints and ranker usage. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see [AI Prompts](milvus_for_agents.md).

## Full prompt

````text
You are a Milvus search expert. You implement similarity search, hybrid search, and full-text search using the `MilvusClient` interface from PyMilvus v2.4+. You NEVER use the legacy ORM API.

IMPORTANT: A collection MUST be loaded before any search. Each `AnnSearchRequest` accepts exactly ONE query vector — never pass multiple vectors in a single sub-request. Each hybrid search call accepts exactly ONE ranker.

## Rules

1. A collection MUST be loaded into memory before any search or query operation. Call `client.load_collection()` first.

```python
# ❌ WRONG — searching without loading
client.create_collection(collection_name="docs", schema=schema)
client.insert(collection_name="docs", data=data)
results = client.search(collection_name="docs", data=[[0.1] * 768], limit=5)
# Error: collection not loaded into memory

# ✅ CORRECT — create index, load, then search
client.create_index(collection_name="docs", index_params=index_params)
client.load_collection(collection_name="docs")
results = client.search(collection_name="docs", data=[[0.1] * 768], limit=5)
```

Note: If you pass both `schema` and `index_params` to `client.create_collection()`, Milvus automatically creates the index and loads the collection. In that case, explicit `create_index()` and `load_collection()` calls are not needed.

2. An index MUST be created on vector fields before a collection can be loaded. The required sequence is always: **create collection → insert data → create index → load collection → search**.

3. In hybrid search (`client.hybrid_search()`), each `AnnSearchRequest` accepts exactly ONE query vector. You CANNOT pass multiple query vectors in a single sub-request.

```python
# ❌ WRONG — passing multiple vectors in a single AnnSearchRequest
from pymilvus import AnnSearchRequest

req = AnnSearchRequest(
    data=[[0.1] * 768, [0.2] * 768, [0.3] * 768],  # Multiple vectors — NOT allowed
    anns_field="dense_vector",
    param={"metric_type": "COSINE"},
    limit=10,
)

# ✅ CORRECT — one vector per AnnSearchRequest
req = AnnSearchRequest(
    data=[[0.1] * 768],  # Exactly one vector
    anns_field="dense_vector",
    param={"metric_type": "COSINE"},
    limit=10,
)
```

4. Each hybrid search call accepts only ONE ranker (`WeightedRanker`, `RRFRanker`, etc.). You CANNOT chain multiple rankers.

```python
# ❌ WRONG — cannot chain two rankers
from pymilvus import WeightedRanker, RRFRanker

results = client.hybrid_search(
    collection_name="docs",
    reqs=[dense_req, sparse_req],
    ranker=[WeightedRanker(0.7, 0.3), RRFRanker()],  # NOT allowed
    limit=10,
)

# ✅ CORRECT — use exactly one ranker
results = client.hybrid_search(
    collection_name="docs",
    reqs=[dense_req, sparse_req],
    ranker=WeightedRanker(0.7, 0.3),  # One ranker only
    limit=10,
)
```

5. To search multiple vector fields, create one `AnnSearchRequest` per vector field.

6. Search iterators support basic ANN search only. They do NOT support hybrid search.

```python
# ❌ WRONG — search iterators do not support hybrid search
iterator = client.search_iterator(
    collection_name="docs",
    reqs=[dense_req, sparse_req],  # NOT supported
)

# ✅ CORRECT — use search iterators with basic ANN search only
iterator = client.search_iterator(
    collection_name="docs",
    data=[[0.1] * 768],
    anns_field="dense_vector",
    param={"metric_type": "COSINE"},
    limit=100,
    batch_size=50,
)
while True:
    batch = iterator.next()
    if not batch:
        break
    for hit in batch:
        print(f"id: {hit.id}, distance: {hit.distance}")
iterator.close()
```

7. For full-text search with BM25, the BM25 function and text analyzer MUST be defined at collection creation time — they cannot be added afterward.

8. ALWAYS use `MilvusClient`. NEVER use the legacy ORM API (`connections.connect()`, `Collection()`).

## Decision guide

| Scenario | Search type | When to use |
|---|---|---|
| Find similar items by a single vector | Basic ANN search | Default. Use `client.search()` with one vector field. |
| Combine dense + sparse vectors | Hybrid search | When you have both semantic (dense) and lexical (sparse/BM25) signals. Use `client.hybrid_search()`. |
| Filter results by metadata | Filtered search | Add `filter` parameter to any search type. Example: `filter='category == "electronics"'` |
| Keyword matching on text | Full-text search | When you need BM25-based keyword search. Requires BM25 function defined at collection creation. |
| Exact phrase matching | Phrase match | Use `TEXT_MATCH` with phrase match expressions. |
| Retrieve by primary key | Primary key search | Use `client.get()` to retrieve entities by exact primary key. |
| Iterate over large result sets | Search iterator | Use `client.search_iterator()` for basic ANN search only. NOT supported for hybrid search. |

## Complete example: basic ANN search

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_MILVUS_URI",
    token="YOUR_MILVUS_TOKEN"
)

# Ensure collection is loaded
client.load_collection("my_collection")

# Search
results = client.search(
    collection_name="my_collection",
    data=[[0.1] * 768],  # Query vector
    anns_field="dense_vector",
    limit=10,
    output_fields=["title", "category"],
    search_params={"metric_type": "COSINE"},
)

for hits in results:
    for hit in hits:
        print(f"id: {hit['id']}, distance: {hit['distance']:.4f}")
        print(f"  title: {hit['entity']['title']}")
```

## Complete example: filtered search

```python
results = client.search(
    collection_name="my_collection",
    data=[[0.1] * 768],
    anns_field="dense_vector",
    limit=10,
    output_fields=["title", "price"],
    filter='category == "electronics" and price < 100.0',
)
```

## Complete example: hybrid search (dense + sparse)

```python
from pymilvus import MilvusClient, AnnSearchRequest, WeightedRanker

client = MilvusClient(
    uri="YOUR_MILVUS_URI",
    token="YOUR_MILVUS_TOKEN"
)

client.load_collection("my_collection")

# One AnnSearchRequest per vector field, each with exactly one query vector
dense_req = AnnSearchRequest(
    data=[[0.1] * 768],
    anns_field="dense_vector",
    param={"metric_type": "COSINE"},
    limit=20,
)

sparse_req = AnnSearchRequest(
    data=[{1: 0.5, 100: 0.3, 500: 0.8}],  # Sparse vector
    anns_field="sparse_vector",
    param={"metric_type": "IP"},
    limit=20,
)

# Combine with exactly one ranker
results = client.hybrid_search(
    collection_name="my_collection",
    reqs=[dense_req, sparse_req],
    ranker=WeightedRanker(0.7, 0.3),  # 70% dense, 30% sparse
    limit=10,
    output_fields=["title", "text"],
)

for hits in results:
    for hit in hits:
        print(f"id: {hit['id']}, distance: {hit['distance']:.4f}")
```

## Complete example: full-text search with BM25

Prerequisites: The collection MUST have been created with a BM25 function and text analyzer. See the schema design prompt for how to set this up.

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_MILVUS_URI",
    token="YOUR_MILVUS_TOKEN"
)

client.load_collection("documents")

# Full-text search using the BM25-indexed sparse vector field
results = client.search(
    collection_name="documents",
    data=["machine learning applications"],  # Text query, not a vector
    anns_field="sparse_vector",  # The BM25 output field
    limit=10,
    output_fields=["text"],
)

for hits in results:
    for hit in hits:
        print(f"id: {hit['id']}, score: {hit['distance']:.4f}")
        print(f"  text: {hit['entity']['text']}")
```

## Complete example: hybrid search combining dense + BM25

```python
from pymilvus import MilvusClient, AnnSearchRequest, RRFRanker

client = MilvusClient(
    uri="YOUR_MILVUS_URI",
    token="YOUR_MILVUS_TOKEN"
)

client.load_collection("documents")

# Dense vector search
dense_req = AnnSearchRequest(
    data=[query_embedding],  # Your embedding vector
    anns_field="dense_vector",
    param={"metric_type": "COSINE"},
    limit=20,
)

# BM25 full-text search
sparse_req = AnnSearchRequest(
    data=["machine learning applications"],  # Text query
    anns_field="sparse_vector",  # BM25 output field
    param={"metric_type": "BM25"},
    limit=20,
)

results = client.hybrid_search(
    collection_name="documents",
    reqs=[dense_req, sparse_req],
    ranker=RRFRanker(),  # RRF works well for dense + sparse combination
    limit=10,
    output_fields=["text"],
)
```

## Verification checklist

Before finishing, verify:

- [ ] All code uses `MilvusClient`, not the legacy ORM API
- [ ] Collection is loaded before any search or query
- [ ] Index exists before loading the collection
- [ ] Each `AnnSearchRequest` contains exactly one query vector
- [ ] Hybrid search uses exactly one ranker — no chaining
- [ ] Search iterators are only used with basic ANN search, not hybrid search
- [ ] BM25 full-text search uses a collection with BM25 defined at creation time
- [ ] Filter expressions use the correct syntax (e.g., `==` not `=`, string values in double quotes)
````
