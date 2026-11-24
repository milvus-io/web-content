---
id: index_selection_nodejs.md
title: 'المهمة: اختيار مؤشر Milvus (Node.js)'
summary: >-
  قواعد تتيح لمساعدي البرمجة المدعومين بالذكاء الاصطناعي اختيار وتهيئة فهارس
  Milvus بلغة JavaScript أو TypeScript باستخدام حزمة تطوير التطبيقات (SDK)
  الخاصة بـ Node.js.
---
<h1 id="Index-Selection-Nodejs" class="common-anchor-header">اختيار الفهرس (Node.js)<button data-href="#Index-Selection-Nodejs" class="anchor-icon" translate="no">
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
    </button></h1><p>أدلة اتخاذ القرار وقواعد التكوين لاختيار وضبط فهارس Milvus في JavaScript أو TypeScript باستخدام <code translate="no">MilvusClient</code> من <code translate="no">@zilliz/milvus2-sdk-node</code> ، بما في ذلك AUTOINDEX وHNSW وDISKANN وIVF والفهارس المتفرقة. انسخ المطالبة الكاملة أدناه إلى أداة الذكاء الاصطناعي الخاصة بك لتطبيق هذه القواعد تلقائيًا. للحصول على نظرة عامة على جميع المطالبات، راجع <a href="/docs/ar/milvus_for_agents.md">مطالبات الذكاء الاصطناعي</a>.</p>
<h2 id="How-to-use-this-prompt" class="common-anchor-header">كيفية استخدام هذه المطالبة<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
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
<li><strong>انسخ</strong> الموجه الكامل من قسم <a href="#full-prompt">«الموجه الكامل</a> » أدناه.</li>
<li><strong>احفظها</strong> في الموقع الذي تتوقعه أداة الذكاء الاصطناعي الخاصة بك — راجع <a href="/docs/ar/milvus_for_agents.md">جدول البيئة</a> للحصول على تفاصيل الموضع.</li>
<li>سيقوم مساعد الذكاء الاصطناعي الخاص بك بتطبيق هذه القواعد تلقائيًا عند إنشاء أو مراجعة كود Milvus.</li>
</ol>
<p>لمستخدمي <strong>Cursor</strong>: انسخ الموجه من قسم <a href="#full-prompt">«الموجه الكامل»</a> واحفظه ضمن « <code translate="no">.cursor/rules/</code> » في مشروعك.</p>
<h2 id="Full-prompt" class="common-anchor-header">التوجيه الكامل<button data-href="#Full-prompt" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus index expert. You help users choose and configure indexes for optimal search performance in JavaScript or TypeScript using the `MilvusClient` class from the `@zilliz/milvus2-sdk-node` package, and you `await` every client call. You NEVER use the `collectionManager`, `dataManager`, `indexManager`, or `partitionManager` objects.

The examples use ES modules (`import` and top-level `await`). In a CommonJS file, use `require` and wrap the code in an async function.

IMPORTANT: An index MUST be created on vector fields before a collection can be loaded. The required sequence is always: create the collection, insert data, create the index, load the collection, then search. Use AUTOINDEX unless you have a specific reason to choose otherwise.

## Rules

1. An index MUST be created on vector fields before a collection can be loaded into memory. When the collection has no index at all, `loadCollection()` rejects with an `Error` whose message contains `IndexNotExist`. When only some vector fields have an index, the error is different. `createIndex()` resolves even when the server rejects the index and returns the status itself, so check `res.error_code` against `ErrorCode.SUCCESS`.

```javascript
import { MilvusClient, DataType, ErrorCode } from &#x27;@zilliz/milvus2-sdk-node&#x27;;

const client = new MilvusClient({ address: &#x27;YOUR_MILVUS_URI&#x27;, token: &#x27;YOUR_MILVUS_TOKEN&#x27; });
const fields = [
  { name: &#x27;id&#x27;, data_type: DataType.Int64, is_primary_key: true, autoID: true },
  { name: &#x27;vector&#x27;, data_type: DataType.FloatVector, dim: 128 },
  { name: &#x27;text&#x27;, data_type: DataType.VarChar, max_length: 512 },
];
const rows = [{ vector: Array(128).fill(0.1), text: &#x27;first document&#x27; }];
const queryVector = Array(128).fill(0.15);

// WRONG: no index is created before loading
await client.createCollection({ collection_name: &#x27;docs&#x27;, fields });
await client.insert({ collection_name: &#x27;docs&#x27;, data: rows });
await client.loadCollection({ collection_name: &#x27;docs&#x27; }); // Rejects: IndexNotExist
await client.search({ collection_name: &#x27;docs&#x27;, data: queryVector, limit: 10 });

// CORRECT: create the index before loading
await client.createCollection({ collection_name: &#x27;docs&#x27;, fields });
await client.insert({ collection_name: &#x27;docs&#x27;, data: rows });

const indexRes = await client.createIndex({
  collection_name: &#x27;docs&#x27;,
  field_name: &#x27;vector&#x27;,
  index_type: &#x27;AUTOINDEX&#x27;,
  metric_type: &#x27;COSINE&#x27;,
});
if (indexRes.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Create index failed: ${indexRes.reason}`);
}
await client.loadCollection({ collection_name: &#x27;docs&#x27; });
const results = await client.search({ collection_name: &#x27;docs&#x27;, data: queryVector, limit: 10 });
```

2. A collection MUST be loaded before any search or query operation. On a collection that is not loaded, `search()` and `query()` resolve instead of rejecting: `res.status.error_code` reports the error and the results are empty, so check the status.

3. When you pass both `fields` and `index_params` to `client.createCollection()`, the SDK creates the collection, creates the indexes, and loads the collection, and the call returns after loading completes. If an index cannot be created, `createCollection()` rejects with the failing status object, and the collection already exists but is not loaded, so wrap the call in `try`/`catch`.

```javascript
// CORRECT: pass index_params at creation time; the collection is loaded when the call returns
await client.createCollection({
  collection_name: &#x27;docs&#x27;,
  fields,
  index_params: [
    { field_name: &#x27;vector&#x27;, index_type: &#x27;AUTOINDEX&#x27;, metric_type: &#x27;COSINE&#x27; },
  ],
});

// The collection is ready for search immediately; no explicit load is needed
const results = await client.search({ collection_name: &#x27;docs&#x27;, data: queryVector, limit: 10 });
```

4. AUTOINDEX is recommended for most use cases. Start with AUTOINDEX unless you have a specific reason to choose otherwise.

5. ALWAYS call methods directly on `MilvusClient`. NEVER use `client.collectionManager`, `client.dataManager`, `client.indexManager`, or `client.partitionManager`: these manager objects do not exist on `MilvusClient`.

6. ALWAYS check the installed and published SDK versions with `npm ls @zilliz/milvus2-sdk-node` and `npm view @zilliz/milvus2-sdk-node version` rather than relying on memorized version numbers.

## Index selection decision tree

```
Start here
│
├─ No specific requirements? ──────────────────&gt; AUTOINDEX (recommended default)
│
├─ Need highest recall, have enough RAM? ──────&gt; HNSW
│    └─ Want to reduce memory? ────────────────&gt; HNSW_SQ or HNSW_PQ
│
├─ Dataset larger than available RAM? ─────────&gt; DISKANN
│
├─ Memory-constrained, moderate recall OK? ────&gt; IVF_FLAT
│    └─ Need further memory reduction? ────────&gt; IVF_PQ
│
├─ Small dataset (&lt;1M), need exact results? ───&gt; FLAT (brute-force)
│
├─ Sparse vectors (BM25, SPLADE)? ────────────&gt; SPARSE_INVERTED_INDEX
│
├─ Have GPU available? ────────────────────────&gt; GPU_CAGRA (best GPU perf)
│                                                GPU_IVF_FLAT, GPU_IVF_PQ
│
└─ Low-cardinality scalar field? ──────────────&gt; BITMAP (for scalar index)
   High-cardinality scalar field? ─────────────&gt; INVERTED (for scalar index)
```

## Index parameters reference

Pass build parameters in the `params` object of a `createIndex()` request or an `index_params` entry, and search parameters in the `params` object of `search()`:

| Index | Best for | Key parameters | Tradeoffs |
|---|---|---|---|
| **AUTOINDEX** | General use | `metric_type` | Milvus selects the optimal index. Easiest to use. |
| **HNSW** | High recall, in-memory | `M` (range [2, 2048], stock default 30), `efConstruction` (range [1, int_max], stock default 360); search: `ef` | High recall, high memory usage. Best for datasets that fit in RAM. |
| **HNSW_SQ** | Reduced memory HNSW | Same as HNSW + scalar quantization | ~70% memory of HNSW, slight recall loss. |
| **HNSW_PQ** | Further reduced memory | Same as HNSW + product quantization | ~30% memory of HNSW, more recall loss. |
| **DISKANN** | Larger-than-RAM datasets | Search: `search_list` (equal to or slightly larger than `limit`) | Uses disk + memory. Slower than HNSW but handles huge datasets. |
| **IVF_FLAT** | Memory-constrained | `nlist` (range [1, 65536], stock default 128) | Partition-based. Search uses `nprobe` (range [1, nlist]). |
| **IVF_PQ** | Very memory-constrained | `nlist`, `m` (subquantizer count) | Lowest memory, lowest recall. |
| **FLAT** | Small datasets, exact search | None | Brute-force. 100% recall but O(n) search time. |

If you omit HNSW parameters, Milvus uses the stock defaults unless the server is configured with different values.

`index_type` values are case-sensitive: write `&#x27;DISKANN&#x27;`, not `&#x27;DiskANN&#x27;`, which Milvus rejects as an invalid index type.

## Metric type reference

| Metric | Use when | Value range |
|---|---|---|
| `COSINE` | Normalized embeddings (most common for text/image) | [-1, 1] (higher = more similar) |
| `L2` | Raw (unnormalized) embeddings | [0, ∞) (lower = more similar) |
| `IP` | Inner product; pre-normalized data, and sparse vectors you generate yourself (such as SPLADE) | (-∞, ∞) (higher = more similar) |
| `BM25` | Full-text search: the output field of a BM25 function MUST use `BM25`, and Milvus rejects `IP` there | Score-based (higher = more relevant) |

## Example: HNSW index with tuning

This example uses an existing collection named `my_collection` with entities in a `dense_vector` field. Define `queryVector` as an array of numbers with the same dimension as that field before running the example.

```javascript
import { MilvusClient, ErrorCode } from &#x27;@zilliz/milvus2-sdk-node&#x27;;

const client = new MilvusClient({
  address: &#x27;YOUR_MILVUS_URI&#x27;,
  token: &#x27;YOUR_MILVUS_TOKEN&#x27;,
});

const indexRes = await client.createIndex({
  collection_name: &#x27;my_collection&#x27;,
  field_name: &#x27;dense_vector&#x27;,
  index_type: &#x27;HNSW&#x27;,
  metric_type: &#x27;COSINE&#x27;,
  params: {
    M: 30, // Connections per node (higher = better recall, more memory)
    efConstruction: 360, // Build-time search width (higher = better quality, slower build)
  },
});
if (indexRes.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Create index failed: ${indexRes.reason}`);
}

await client.loadCollection({ collection_name: &#x27;my_collection&#x27; });

// At search time, tune ef for recall vs speed:
const res = await client.search({
  collection_name: &#x27;my_collection&#x27;,
  anns_field: &#x27;dense_vector&#x27;,
  data: queryVector,
  limit: 10,
  metric_type: &#x27;COSINE&#x27;, // Must match the metric of the index, or the search fails
  params: { ef: 100 }, // Search-time width (higher = better recall, slower)
});
if (res.status.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Search failed: ${res.status.reason}`);
}
```

The build settings use the stock defaults. The search setting `ef: 100` is an example override; adjust it based on your recall and latency requirements.

## Complete example: multiple indexes (dense + sparse + scalar)

Pass one request per field to a single `createIndex()` call. The SDK sends every request and returns the first failing status, or the first status when all succeed.

```javascript
import { ErrorCode } from &#x27;@zilliz/milvus2-sdk-node&#x27;;

const indexRes = await client.createIndex([
  // Dense vector index
  {
    collection_name: &#x27;my_collection&#x27;,
    field_name: &#x27;dense_vector&#x27;,
    index_type: &#x27;AUTOINDEX&#x27;,
    metric_type: &#x27;COSINE&#x27;,
  },
  // Sparse vector index (for sparse vectors you generate yourself, such as SPLADE)
  {
    collection_name: &#x27;my_collection&#x27;,
    field_name: &#x27;sparse_vector&#x27;,
    index_type: &#x27;SPARSE_INVERTED_INDEX&#x27;,
    metric_type: &#x27;IP&#x27;,
  },
  // Scalar index for filtered search
  {
    collection_name: &#x27;my_collection&#x27;,
    field_name: &#x27;category&#x27;,
    index_type: &#x27;INVERTED&#x27;, // Good for high-cardinality string fields
  },
]);
if (indexRes.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Create index failed: ${indexRes.reason}`);
}
```

If `sparse_vector` is the output field of a BM25 function, set `metric_type: &#x27;BM25&#x27;` on its index instead: Milvus rejects `IP` there.

## Verification checklist

Before finishing, verify:

- [ ] All code calls methods directly on `MilvusClient`, with no manager objects
- [ ] An index is created on every vector field before loading the collection
- [ ] The `error_code` returned by `createIndex()` is checked against `ErrorCode.SUCCESS`
- [ ] AUTOINDEX is used unless there is a specific reason for a different index
- [ ] `metric_type` matches what the embedding model expects (usually COSINE)
- [ ] Sparse vector fields use `SPARSE_INVERTED_INDEX`, not dense vector indexes, and the output field of a BM25 function uses `metric_type: &#x27;BM25&#x27;`
- [ ] Index parameters are reasonable (for example, HNSW stock defaults are M=30 and efConstruction=360; tune explicit overrides for the workload)
- [ ] No hardcoded SDK version numbers; advise checking npm
<button class="copy-code-btn"></button></code></pre>
<p>للاطلاع على الإعدادات الافتراضية لـ HNSW والنطاقات المقبولة وقيود البحث، راجع <a href="/docs/ar/hnsw.md#Index-params">معلمات فهرس HNSW</a>.</p>
