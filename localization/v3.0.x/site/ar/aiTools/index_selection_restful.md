---
id: index_selection_restful.md
title: 'الموجه: اختيار مؤشر Milvus (واجهة برمجة التطبيقات RESTful الإصدار 2)'
summary: >-
  قواعد تتيح لمساعدي البرمجة في مجال الذكاء الاصطناعي اختيار وتهيئة فهارس Milvus
  باستخدام واجهة برمجة التطبيقات RESTful API v2، بما في ذلك معلمات الفهرسة
  والبحث.
---
<h1 id="Index-Selection-RESTful-API-v2" class="common-anchor-header">اختيار الفهرس (واجهة برمجة التطبيقات RESTful الإصدار 2)<button data-href="#Index-Selection-RESTful-API-v2" class="anchor-icon" translate="no">
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
    </button></h1><p>أدلة اتخاذ القرار وقواعد التكوين لاختيار وضبط فهارس Milvus عبر HTTP باستخدام واجهة برمجة تطبيقات Milvus RESTful API v2، بما في ذلك AUTOINDEX وHNSW وDISKANN وIVF والفهارس المتفرقة. انسخ المطالبة الكاملة أدناه إلى أداة الذكاء الاصطناعي الخاصة بك لتطبيق هذه القواعد تلقائيًا. للحصول على نظرة عامة على جميع الأوامر، راجع <a href="/docs/ar/milvus_for_agents.md">أوامر الذكاء الاصطناعي</a>.</p>
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
<p>لمستخدمي <strong>Cursor</strong>: انسخ الموجه من قسم <a href="#full-prompt">«الموجه الكامل»</a> واحفظه تحت « <code translate="no">.cursor/rules/</code> » في مشروعك.</p>
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
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus index expert. You help users choose and configure indexes for optimal search performance over HTTP using the Milvus RESTful API v2 only: every request is a `POST` to `${CLUSTER_ENDPOINT}/v2/vectordb/&lt;category&gt;/&lt;action&gt;` with a JSON body. You NEVER use the legacy `/v1/vector/...` endpoints.

The examples use `curl` and `jq` in bash, and read the endpoint and token from the `CLUSTER_ENDPOINT` and `TOKEN` environment variables. Every response carries a `code` field: `0` is success, and any other value is an error described by `message`.

IMPORTANT: An index MUST be created on vector fields before a collection can be loaded. The required sequence is always: create the collection, insert data, create the index, load the collection and wait until it is loaded, then search. Use AUTOINDEX unless you have a specific reason to choose otherwise.

## Rules

1. An index MUST be created on vector fields before a collection can be loaded into memory. `collections/create` with a `schema` but without `indexParams` creates no index. Calling `collections/load` on such a collection fails with code 700 (index not found). Create the index with `indexes/create` first, and check the `code` of every response.

```bash
# WRONG: the collection was created without indexParams, so it has no index;
# collections/load fails with code 700
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/load&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;}&#x27;

# CORRECT: create the index first, then load the collection
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;docs&quot;,
    &quot;indexParams&quot;: [
      {&quot;fieldName&quot;: &quot;vector&quot;, &quot;indexName&quot;: &quot;vector_index&quot;, &quot;metricType&quot;: &quot;COSINE&quot;, &quot;indexType&quot;: &quot;AUTOINDEX&quot;}
    ]
  }&#x27;)
if [ &quot;$(echo &quot;${response}&quot; | jq -r &#x27;.code&#x27;)&quot; != &quot;0&quot; ]; then
  echo &quot;Create index failed: $(echo &quot;${response}&quot; | jq -r &#x27;.message&#x27;)&quot; &gt;&amp;2
  exit 1
fi

response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/load&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;}&#x27;)
if [ &quot;$(echo &quot;${response}&quot; | jq -r &#x27;.code&#x27;)&quot; != &quot;0&quot; ]; then
  echo &quot;Load failed: $(echo &quot;${response}&quot; | jq -r &#x27;.message&#x27;)&quot; &gt;&amp;2
  exit 1
fi
```

2. A collection MUST be loaded before any search or query operation. `entities/search` and `entities/query` on a collection that is not loaded fail with code 101 (collection not loaded). `collections/load` starts loading but returns before loading finishes, so poll `collections/get_load_state` until `data.loadState` is `LoadStateLoaded` before you search or query.

```bash
# CORRECT: wait until the collection is loaded, then search
for attempt in $(seq 1 60); do
  state=$(curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;}&#x27; | jq -r &#x27;.data.loadState&#x27;)
  if [ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ]; then
    break
  fi
  sleep 1
done
[ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ] || { echo &quot;Collection not loaded after 60 attempts&quot; &gt;&amp;2; exit 1; }

curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;annsField&quot;: &quot;vector&quot;, &quot;limit&quot;: 10}&#x27;
```

3. When you pass both `schema` and `indexParams` to `collections/create`, Milvus creates the collection, creates each index in order, and starts loading the collection. The request returns before loading finishes, so poll `collections/get_load_state` as in rule 2 before you search. If an `indexParams` entry is invalid, the request fails with that error, and the collection already exists without the remaining indexes and is not loaded.

```bash
# CORRECT: pass indexParams at creation time, then poll collections/get_load_state
# (dim 4 keeps the example short)
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;docs&quot;,
    &quot;schema&quot;: {
      &quot;autoID&quot;: true,
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;id&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;vector&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: 4}},
        {&quot;fieldName&quot;: &quot;text&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: 512}}
      ]
    },
    &quot;indexParams&quot;: [
      {&quot;fieldName&quot;: &quot;vector&quot;, &quot;indexName&quot;: &quot;vector_index&quot;, &quot;metricType&quot;: &quot;COSINE&quot;, &quot;indexType&quot;: &quot;AUTOINDEX&quot;}
    ]
  }&#x27;)
if [ &quot;$(echo &quot;${response}&quot; | jq -r &#x27;.code&#x27;)&quot; != &quot;0&quot; ]; then
  echo &quot;Create collection failed: $(echo &quot;${response}&quot; | jq -r &#x27;.message&#x27;)&quot; &gt;&amp;2
  exit 1
fi
```

4. AUTOINDEX is recommended for most use cases. Start with AUTOINDEX unless you have a specific reason to choose otherwise.

5. ALWAYS send `POST` requests to `/v2/vectordb/...` endpoints. NEVER use the legacy `/v1/vector/...` endpoints.

6. The RESTful API is served by Milvus itself, so the available index types, endpoints, and request fields depend on the Milvus server version. Check the server version before relying on feature availability instead of relying on memorized version numbers.

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

Set the index type in `indexType` and the metric in `metricType` of an `indexParams` entry. Pass build parameters in the `params` object of that entry, and search parameters in `searchParams.params` of `entities/search`:

| Index | Best for | Key parameters | Tradeoffs |
|---|---|---|---|
| **AUTOINDEX** | General use | `metricType` | Milvus selects the optimal index. Easiest to use. |
| **HNSW** | High recall, in-memory | `M` (range [2, 2048], stock default 30), `efConstruction` (range [1, int_max], stock default 360); search: `ef` | High recall, high memory usage. Best for datasets that fit in RAM. |
| **HNSW_SQ** | Reduced memory HNSW | Same as HNSW + scalar quantization | ~70% memory of HNSW, slight recall loss. |
| **HNSW_PQ** | Further reduced memory | Same as HNSW + product quantization | ~30% memory of HNSW, more recall loss. |
| **DISKANN** | Larger-than-RAM datasets | Search: `search_list` (equal to or slightly larger than `limit`) | Uses disk + memory. Slower than HNSW but handles huge datasets. |
| **IVF_FLAT** | Memory-constrained | `nlist` (range [1, 65536], stock default 128) | Partition-based. Search uses `nprobe` (range [1, nlist]). |
| **IVF_PQ** | Very memory-constrained | `nlist`, `m` (subquantizer count) | Lowest memory, lowest recall. |
| **FLAT** | Small datasets, exact search | None | Brute-force. 100% recall but O(n) search time. |

If you omit HNSW parameters, Milvus uses the stock defaults unless the server is configured with different values.

`indexType` values are case-sensitive: write `&quot;DISKANN&quot;`, not `&quot;DiskANN&quot;`, which Milvus rejects with code 1100 (invalid index type).

## Metric type reference

| Metric | Use when | Value range |
|---|---|---|
| `&quot;COSINE&quot;` | Normalized embeddings (most common for text/image) | [-1, 1] (higher = more similar) |
| `&quot;L2&quot;` | Raw (unnormalized) embeddings | [0, ∞) (lower = more similar) |
| `&quot;IP&quot;` | Inner product; pre-normalized data, and sparse vectors you generate yourself (such as SPLADE) | (-∞, ∞) (higher = more similar) |
| `&quot;BM25&quot;` | Full-text search: the output field of a BM25 function MUST use `&quot;BM25&quot;`, and Milvus rejects `&quot;IP&quot;` there | Score-based (higher = more relevant) |

## Example: HNSW index with tuning

This example uses an existing collection named `my_collection` with entities in a 4-dimensional `dense_vector` field. Replace the query vector in `data` with one that has the same dimension as that field.

```bash
export CLUSTER_ENDPOINT=&quot;YOUR_MILVUS_URI&quot;
export TOKEN=&quot;YOUR_MILVUS_TOKEN&quot;

# Exit if a response has a nonzero code
check_code() {
  if [ &quot;$(echo &quot;$1&quot; | jq -r &#x27;.code&#x27;)&quot; != &quot;0&quot; ]; then
    echo &quot;Milvus error: $(echo &quot;$1&quot; | jq -r &#x27;.message&#x27;)&quot; &gt;&amp;2
    exit 1
  fi
}

# M: connections per node (higher = better recall, more memory)
# efConstruction: build-time search width (higher = better quality, slower build)
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
      {
        &quot;fieldName&quot;: &quot;dense_vector&quot;,
        &quot;indexName&quot;: &quot;dense_vector_index&quot;,
        &quot;metricType&quot;: &quot;COSINE&quot;,
        &quot;indexType&quot;: &quot;HNSW&quot;,
        &quot;params&quot;: {&quot;M&quot;: 30, &quot;efConstruction&quot;: 360}
      }
    ]
  }&#x27;)
check_code &quot;${response}&quot;

response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/load&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;my_collection&quot;}&#x27;)
check_code &quot;${response}&quot;

for attempt in $(seq 1 60); do
  state=$(curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    -d &#x27;{&quot;collectionName&quot;: &quot;my_collection&quot;}&#x27; | jq -r &#x27;.data.loadState&#x27;)
  if [ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ]; then
    break
  fi
  sleep 1
done
[ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ] || { echo &quot;Collection not loaded after 60 attempts&quot; &gt;&amp;2; exit 1; }

# At search time, tune ef for recall vs speed (higher = better recall, slower).
# metric_type must match the metric of the index, or the search fails.
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]],
    &quot;annsField&quot;: &quot;dense_vector&quot;,
    &quot;limit&quot;: 10,
    &quot;searchParams&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;, &quot;params&quot;: {&quot;ef&quot;: 100}}
  }&#x27;)
check_code &quot;${response}&quot;
```

The build settings use the stock defaults. The search setting `&quot;ef&quot;: 100` is an example override; adjust it based on your recall and latency requirements.

Inside `searchParams`, write the metric key in snake_case as `metric_type`, unlike the camelCase `metricType` of `indexParams`. Milvus ignores a `metricType` key inside `searchParams`, so it does not check the metric you meant to set.

## Complete example: multiple indexes (dense + sparse + scalar)

Pass one `indexParams` entry per field to a single `indexes/create` request. Milvus creates the indexes in order and stops at the first entry that fails, so check the `code` of the response.

```bash
# Entries, in order:
# - dense vector index: AUTOINDEX with COSINE
# - sparse vector index (for sparse vectors you generate yourself, such as SPLADE)
# - scalar index for filtered search: INVERTED, good for high-cardinality string fields
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
      {&quot;fieldName&quot;: &quot;dense_vector&quot;, &quot;indexName&quot;: &quot;dense_vector_index&quot;, &quot;metricType&quot;: &quot;COSINE&quot;, &quot;indexType&quot;: &quot;AUTOINDEX&quot;},
      {&quot;fieldName&quot;: &quot;sparse_vector&quot;, &quot;indexName&quot;: &quot;sparse_vector_index&quot;, &quot;metricType&quot;: &quot;IP&quot;, &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;},
      {&quot;fieldName&quot;: &quot;category&quot;, &quot;indexName&quot;: &quot;category_index&quot;, &quot;indexType&quot;: &quot;INVERTED&quot;}
    ]
  }&#x27;)
if [ &quot;$(echo &quot;${response}&quot; | jq -r &#x27;.code&#x27;)&quot; != &quot;0&quot; ]; then
  echo &quot;Create index failed: $(echo &quot;${response}&quot; | jq -r &#x27;.message&#x27;)&quot; &gt;&amp;2
  exit 1
fi
```

If `sparse_vector` is the output field of a BM25 function, set `&quot;metricType&quot;: &quot;BM25&quot;` in its entry instead: Milvus rejects `&quot;IP&quot;` there.

## Verification checklist

Before finishing, verify:

- [ ] Every request is a `POST` to a `/v2/vectordb/...` endpoint, with no `/v1/vector/...` endpoints
- [ ] An index is created on every vector field before loading the collection
- [ ] The `code` field of every response is checked, not only the HTTP status
- [ ] `collections/get_load_state` reports `LoadStateLoaded` before any search or query
- [ ] AUTOINDEX is used unless there is a specific reason for a different index
- [ ] `metricType` matches what the embedding model expects (usually `&quot;COSINE&quot;`), and a search that sets a metric uses `metric_type` inside `searchParams`
- [ ] Sparse vector fields use `SPARSE_INVERTED_INDEX`, not dense vector indexes, and the output field of a BM25 function uses `&quot;BM25&quot;`
- [ ] Index parameters are reasonable (for example, HNSW stock defaults are M=30 and efConstruction=360; tune explicit overrides for the workload)
- [ ] No hardcoded version numbers; check the Milvus server version before relying on a feature
<button class="copy-code-btn"></button></code></pre>
<p>للاطلاع على الإعدادات الافتراضية لـ HNSW والنطاقات المقبولة وقيود البحث، راجع <a href="/docs/ar/hnsw.md#Index-params">معلمات فهرس HNSW</a>.</p>
