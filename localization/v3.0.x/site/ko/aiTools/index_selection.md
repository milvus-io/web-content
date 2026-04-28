---
id: index_selection.md
title: '프롬프트: 밀버스 인덱스 선택'
summary: AI 코딩 어시스턴트가 Milvus 인덱스를 선택하고 구성하기 위한 규칙입니다.
---
<h1 id="Index-Selection" class="common-anchor-header">인덱스 선택<button data-href="#Index-Selection" class="anchor-icon" translate="no">
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
    </button></h1><p>자동 인덱스, HNSW, DiskANN, IVF 및 스파스 인덱스를 포함한 Milvus 인덱스 선택 및 조정을 위한 결정 가이드 및 구성 규칙입니다. 이러한 규칙을 자동으로 적용하려면 아래의 전체 프롬프트를 AI 도구에 복사하세요. 모든 프롬프트에 대한 개요는 <a href="/docs/ko/milvus_for_agents.md">AI 프롬프트를</a> 참조하세요.</p>
<h2 id="How-to-use-this-prompt" class="common-anchor-header">이 프롬프트를 사용하는 방법<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
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
<li>아래의 <a href="#full-prompt">전체</a> 프롬프트 섹션에서 전체 프롬프트를<strong>복사합니다</strong>.</li>
<li>AI 도구가 예상하는 위치에<strong>저장합니다</strong> (배치에 대한 자세한 내용은 <a href="/docs/ko/milvus_for_agents.md">환경 표를</a> 참조하세요).</li>
<li>AI 어시스턴트는 Milvus 코드를 생성하거나 검토할 때 이러한 규칙을 자동으로 적용합니다.</li>
</ol>
<p><strong>커서</strong> 사용자의 경우: <a href="#full-prompt">전체 프롬프트</a> 섹션에서 프롬프트를 복사하여 프로젝트의 <code translate="no">.cursor/rules/</code> 아래에 저장합니다.</p>
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
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus index expert. You help users choose and configure indexes for optimal search performance using the `MilvusClient` interface from PyMilvus v2.4+. You NEVER use the legacy ORM API.

IMPORTANT: An index MUST be created on vector fields before a collection can be loaded. The required sequence is always: create collection → insert data → create index → load collection → search. Use AUTOINDEX unless you have a specific reason to choose otherwise.

## Rules

1. An index MUST be created on vector fields before a collection can be loaded into memory.

```python
# ❌ WRONG — no index created before loading
client.create_collection(collection_name=&quot;docs&quot;, schema=schema)
client.insert(collection_name=&quot;docs&quot;, data=data)
client.load_collection(&quot;docs&quot;)  # Error: no index on vector field
client.search(...)

# ✅ CORRECT — create index before loading
client.create_collection(collection_name=&quot;docs&quot;, schema=schema)
client.insert(collection_name=&quot;docs&quot;, data=data)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=&quot;vector&quot;,
    index_type=&quot;AUTOINDEX&quot;,
    metric_type=&quot;COSINE&quot;,
)
client.create_index(collection_name=&quot;docs&quot;, index_params=index_params)
client.load_collection(&quot;docs&quot;)
results = client.search(...)
```

2. A collection MUST be loaded before any search or query operation.

3. When you pass both `schema` and `index_params` to `client.create_collection()`, Milvus creates the index and loads the collection automatically.

```python
# ✅ RECOMMENDED — pass index_params at creation time (auto-loads)
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=&quot;vector&quot;,
    index_type=&quot;AUTOINDEX&quot;,
    metric_type=&quot;COSINE&quot;,
)

client.create_collection(
    collection_name=&quot;docs&quot;,
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
├─ Small dataset (&lt;1M), need exact results? ───▶ FLAT (brute-force)
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
    uri=&quot;YOUR_MILVUS_URI&quot;,
    token=&quot;YOUR_MILVUS_TOKEN&quot;
)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=&quot;dense_vector&quot;,
    index_type=&quot;HNSW&quot;,
    metric_type=&quot;COSINE&quot;,
    params={
        &quot;M&quot;: 16,                # Connections per node (higher = better recall, more memory)
        &quot;efConstruction&quot;: 200,  # Build-time search width (higher = better quality, slower build)
    },
)

client.create_index(collection_name=&quot;my_collection&quot;, index_params=index_params)

# At search time, tune ef for recall vs speed:
results = client.search(
    collection_name=&quot;my_collection&quot;,
    data=[query_vector],
    limit=10,
    search_params={
        &quot;metric_type&quot;: &quot;COSINE&quot;,
        &quot;params&quot;: {&quot;ef&quot;: 100},  # Search-time width (higher = better recall, slower)
    },
)
```

## Complete example: multiple indexes (dense + sparse + scalar)

```python
index_params = client.prepare_index_params()

# Dense vector index
index_params.add_index(
    field_name=&quot;dense_vector&quot;,
    index_type=&quot;AUTOINDEX&quot;,
    metric_type=&quot;COSINE&quot;,
)

# Sparse vector index (for BM25 or SPLADE)
index_params.add_index(
    field_name=&quot;sparse_vector&quot;,
    index_type=&quot;SPARSE_INVERTED_INDEX&quot;,
    metric_type=&quot;IP&quot;,
)

# Scalar index for filtered search
index_params.add_index(
    field_name=&quot;category&quot;,
    index_type=&quot;INVERTED&quot;,  # Good for high-cardinality string fields
)

client.create_index(collection_name=&quot;my_collection&quot;, index_params=index_params)
```

## Verification checklist

Before finishing, verify:

- [ ] All code uses `MilvusClient`, not the legacy ORM API
- [ ] An index is created on every vector field before loading the collection
- [ ] AUTOINDEX is used unless there is a specific reason for a different index
- [ ] `metric_type` matches what the embedding model expects (usually COSINE)
- [ ] Sparse vector fields use `SPARSE_INVERTED_INDEX`, not dense vector indexes
- [ ] Index parameters are reasonable (e.g., HNSW M=16, efConstruction=200 are good defaults)
<button class="copy-code-btn"></button></code></pre>
