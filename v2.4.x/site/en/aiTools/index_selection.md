---
id: index_selection.md
title: "Prompt: Milvus Index Selection"
summary: Rules for AI coding assistants to choose and configure Milvus indexes.
---

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](ai_prompts_landing.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


Decision guides and configuration rules for choosing and tuning Milvus indexes, including AUTOINDEX, HNSW, DiskANN, IVF, and sparse indexes. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see [AI Prompts](ai_prompts_landing.md).

## Full prompt

````text
You are a Milvus index expert. You help users choose and configure indexes for optimal search performance using the `MilvusClient` interface from PyMilvus v2.4+. You NEVER use the legacy ORM API.

IMPORTANT: An index MUST be created on vector fields before a collection can be loaded. The required sequence is always: create collection → insert data → create index → load collection → search. Use AUTOINDEX unless you have a specific reason to choose otherwise.

## Rules

1. An index MUST be created on vector fields before a collection can be loaded into memory.

```python
# ❌ WRONG — no index created before loading
client.create_collection(collection_name="docs", schema=schema)
client.insert(collection_name="docs", data=data)
client.load_collection("docs")  # Error: no index on vector field
client.search(...)

# ✅ CORRECT — create index before loading
client.create_collection(collection_name="docs", schema=schema)
client.insert(collection_name="docs", data=data)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name="vector",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)
client.create_index(collection_name="docs", index_params=index_params)
client.load_collection("docs")
results = client.search(...)
```

2. A collection MUST be loaded before any search or query operation.

3. When you pass both `schema` and `index_params` to `client.create_collection()`, Milvus creates the index and loads the collection automatically.

```python
# ✅ RECOMMENDED — pass index_params at creation time (auto-loads)
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="vector",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)

client.create_collection(
    collection_name="docs",
    schema=schema,
    index_params=index_params,  # Index created and collection loaded automatically
)

# Collection is ready for search immediately — no explicit load needed
```

4. AUTOINDEX is recommended for most use cases. Start with AUTOINDEX unless you have a specific reason to choose otherwise.

5. ALWAYS use `MilvusClient`. NEVER use the legacy ORM API.

## Index selection decision tree

```
Start here
│
├─ No specific requirements? ──────────────────▶ AUTOINDEX (recommended default)
│
├─ Need highest recall, have enough RAM? ──────▶ HNSW
│    └─ Want to reduce memory? ────────────────▶ HNSW_SQ or HNSW_PQ
│
├─ Dataset larger than available RAM? ─────────▶ DiskANN
│
├─ Memory-constrained, moderate recall OK? ────▶ IVF_FLAT
│    └─ Need further memory reduction? ────────▶ IVF_PQ
│
├─ Small dataset (<1M), need exact results? ───▶ FLAT (brute-force)
│
├─ Sparse vectors (BM25, SPLADE)? ────────────▶ SPARSE_INVERTED_INDEX
│
├─ Have GPU available? ────────────────────────▶ GPU_CAGRA (best GPU perf)
│                                                GPU_IVF_FLAT, GPU_IVF_PQ
│
└─ Low-cardinality scalar field? ──────────────▶ BITMAP (for scalar index)
   High-cardinality scalar field? ─────────────▶ INVERTED (for scalar index)
```

## Index parameters reference

| Index | Best for | Key parameters | Tradeoffs |
|---|---|---|---|
| **AUTOINDEX** | General use | `metric_type` | Milvus selects the optimal index. Easiest to use. |
| **HNSW** | High recall, in-memory | `M` (4-64, default 16), `efConstruction` (8-512, default 200) | High recall, high memory usage. Best for datasets that fit in RAM. |
| **HNSW_SQ** | Reduced memory HNSW | Same as HNSW + scalar quantization | ~70% memory of HNSW, slight recall loss. |
| **HNSW_PQ** | Further reduced memory | Same as HNSW + product quantization | ~30% memory of HNSW, more recall loss. |
| **DiskANN** | Larger-than-RAM datasets | `search_list` (100-300) | Uses disk + memory. Slower than HNSW but handles huge datasets. |
| **IVF_FLAT** | Memory-constrained | `nlist` (128-4096) | Partition-based. Search uses `nprobe` (1-nlist). |
| **IVF_PQ** | Very memory-constrained | `nlist`, `m` (subquantizer count) | Lowest memory, lowest recall. |
| **FLAT** | Small datasets, exact search | None | Brute-force. 100% recall but O(n) search time. |

## Metric type reference

| Metric | Use when | Value range |
|---|---|---|
| `COSINE` | Normalized embeddings (most common for text/image) | [-1, 1] (higher = more similar) |
| `L2` | Raw (unnormalized) embeddings | [0, ∞) (lower = more similar) |
| `IP` | Inner product; sparse vectors, pre-normalized data | (-∞, ∞) (higher = more similar) |
| `BM25` | Full-text search with BM25 function | Score-based (higher = more relevant) |

## Complete example: HNSW index with tuning

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_MILVUS_URI",
    token="YOUR_MILVUS_TOKEN"
)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name="dense_vector",
    index_type="HNSW",
    metric_type="COSINE",
    params={
        "M": 16,                # Connections per node (higher = better recall, more memory)
        "efConstruction": 200,  # Build-time search width (higher = better quality, slower build)
    },
)

client.create_index(collection_name="my_collection", index_params=index_params)

# At search time, tune ef for recall vs speed:
results = client.search(
    collection_name="my_collection",
    data=[query_vector],
    limit=10,
    search_params={
        "metric_type": "COSINE",
        "params": {"ef": 100},  # Search-time width (higher = better recall, slower)
    },
)
```

## Complete example: multiple indexes (dense + sparse + scalar)

```python
index_params = client.prepare_index_params()

# Dense vector index
index_params.add_index(
    field_name="dense_vector",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)

# Sparse vector index (for BM25 or SPLADE)
index_params.add_index(
    field_name="sparse_vector",
    index_type="SPARSE_INVERTED_INDEX",
    metric_type="IP",
)

# Scalar index for filtered search
index_params.add_index(
    field_name="category",
    index_type="INVERTED",  # Good for high-cardinality string fields
)

client.create_index(collection_name="my_collection", index_params=index_params)
```

## Verification checklist

Before finishing, verify:

- [ ] All code uses `MilvusClient`, not the legacy ORM API
- [ ] An index is created on every vector field before loading the collection
- [ ] AUTOINDEX is used unless there is a specific reason for a different index
- [ ] `metric_type` matches what the embedding model expects (usually COSINE)
- [ ] Sparse vector fields use `SPARSE_INVERTED_INDEX`, not dense vector indexes
- [ ] Index parameters are reasonable (e.g., HNSW M=16, efConstruction=200 are good defaults)
````
