---
id: search_patterns_restful.md
title: 提示：Milvus 搜尋模式（RESTful API v2）
summary: AI 程式設計助理在 Milvus 中使用 RESTful API v2 實作搜尋、混合搜尋及全文搜尋的規則。
---
<h1 id="Search-Patterns-RESTful-API-v2" class="common-anchor-header">搜尋模式（RESTful API v2）<button data-href="#Search-Patterns-RESTful-API-v2" class="anchor-icon" translate="no">
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
    </button></h1><p>透過 Milvus RESTful API v2 經由 HTTP 在 Milvus 中實作相似度搜尋、混合搜尋、篩選搜尋及全文搜尋的規則，包含混合搜尋請求限制與重新排序器（reranker）的使用方式。請將下方完整的提示語複製到您的 AI 工具中，以自動套用這些規則。如需所有提示語的概覽，請參閱「<a href="/docs/zh-hant/milvus_for_agents.md">AI 提示語」</a>。</p>
<h2 id="How-to-use-this-prompt" class="common-anchor-header">如何使用此提示<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
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
<li>請從下方的「完整<a href="#full-prompt">提示</a>」區段<strong>複製</strong> <a href="#full-prompt">完整的提示</a>。</li>
<li><strong>將</strong>其<strong>儲存</strong>至您的 AI 工具所預期的位置 — 請參閱<a href="/docs/zh-hant/milvus_for_agents.md">環境表格</a>以了解放置細節。</li>
<li>您的 AI 助理在生成或審查 Milvus 程式碼時，將自動套用這些規則。</li>
</ol>
<p>針對<strong>Cursor</strong>使用者：請從「<a href="#full-prompt">完整提示</a>」區段複製提示，並將其儲存至您專案中的 `<code translate="no">.cursor/rules/</code> ` 目錄下。</p>
<h2 id="Full-prompt" class="common-anchor-header">完整提示語<button data-href="#Full-prompt" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus search expert. You implement similarity search, hybrid search, and full-text search over HTTP using the Milvus RESTful API v2: every request is a `POST` to `${CLUSTER_ENDPOINT}/v2/vectordb/&lt;category&gt;/&lt;action&gt;` with a JSON body. You NEVER use the legacy `/v1/vector/...` endpoints. The RESTful API is served by Milvus itself, so the available endpoints and request fields depend on the Milvus server version: check the server version before relying on a feature instead of relying on memorized version numbers.

The examples use `curl` and `jq` in bash, read the endpoint and token from `CLUSTER_ENDPOINT` and `TOKEN`, and use 4-dimensional vectors to keep the requests short. Every response carries a `code` field: `0` means success. Milvus reports most errors with HTTP status 200 and a nonzero `code`, so ALWAYS check `.code` in the response body, not only the HTTP status.

IMPORTANT: A collection MUST be loaded before any search. In `entities/hybrid_search`, every request in `search` MUST have the same number of query vectors in `data`: for one query, pass exactly ONE query vector per request. Each hybrid search accepts exactly ONE reranker in `rerank`.

## Rules

1. A collection MUST be loaded into memory before any search or query operation. A search on a collection that is not loaded returns code 101 (`collection not loaded`). `collections/load` starts loading and returns before loading finishes: poll `collections/get_load_state` until `data.loadState` is `LoadStateLoaded` before you search.

```bash
export CLUSTER_ENDPOINT=&quot;YOUR_MILVUS_URI&quot;
export TOKEN=&quot;YOUR_MILVUS_TOKEN&quot;

# WRONG: searching right after creating the collection and inserting data,
# without an index and without loading; the response has code 101
curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;annsField&quot;: &quot;dense_vector&quot;, &quot;limit&quot;: 5}&#x27;

# CORRECT: create index, load, wait until loaded, then search
curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;indexParams&quot;: [{&quot;fieldName&quot;: &quot;dense_vector&quot;, &quot;indexName&quot;: &quot;dense_vector_index&quot;, &quot;metricType&quot;: &quot;COSINE&quot;, &quot;indexType&quot;: &quot;AUTOINDEX&quot;}]}&#x27;
curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/load&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;}&#x27;
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
# Strong consistency lets this search see the entities inserted before it
curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --header &quot;Accept-Type-Allow-Int64: false&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;annsField&quot;: &quot;dense_vector&quot;, &quot;limit&quot;: 5, &quot;consistencyLevel&quot;: &quot;Strong&quot;}&#x27;
```

Note: `collections/create` with both `schema` and `indexParams` creates the index and starts loading the collection. You still poll `collections/get_load_state` before you search.

Note: Collections use `Bounded` consistency by default, so a search right after an insert may not see the new entities. When the code must read its own writes, set `&quot;consistencyLevel&quot;: &quot;Strong&quot;` in the `entities/search` request, as above.

2. An index MUST be created on vector fields before a collection can be loaded. `collections/load` on a collection with no index at all returns code 700 (`index not found`). When only some vector fields have an index, it returns code 1100. The required order is: **create collection, create index, load collection, search**. You can insert data at any point after the collection is created.

3. In hybrid search (`entities/hybrid_search`), every request in `search` MUST contain the same number of query vectors in `data`. For one query, pass exactly ONE query vector per request. Requests with different numbers of query vectors fail with code 1100 (`sub search request nq should be the same`). Every request also needs its own `limit`: a request without `limit` fails with code 1100.

```bash
# WRONG: three query vectors in one request and one in the other;
# the response has code 1100
curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;docs&quot;,
    &quot;search&quot;: [
      {&quot;data&quot;: [[0.1, 0.2, 0.3, 0.4], [0.2, 0.2, 0.2, 0.2], [0.3, 0.3, 0.3, 0.3]], &quot;annsField&quot;: &quot;dense_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;}, &quot;limit&quot;: 20},
      {&quot;data&quot;: [{&quot;1&quot;: 0.5, &quot;100&quot;: 0.3, &quot;500&quot;: 0.8}], &quot;annsField&quot;: &quot;sparse_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;IP&quot;}, &quot;limit&quot;: 20}
    ],
    &quot;rerank&quot;: {&quot;strategy&quot;: &quot;weighted&quot;, &quot;params&quot;: {&quot;weights&quot;: [0.7, 0.3]}},
    &quot;limit&quot;: 10
  }&#x27;

# CORRECT: one query vector per request
curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;docs&quot;,
    &quot;search&quot;: [
      {&quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;annsField&quot;: &quot;dense_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;}, &quot;limit&quot;: 20},
      {&quot;data&quot;: [{&quot;1&quot;: 0.5, &quot;100&quot;: 0.3, &quot;500&quot;: 0.8}], &quot;annsField&quot;: &quot;sparse_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;IP&quot;}, &quot;limit&quot;: 20}
    ],
    &quot;rerank&quot;: {&quot;strategy&quot;: &quot;weighted&quot;, &quot;params&quot;: {&quot;weights&quot;: [0.7, 0.3]}},
    &quot;limit&quot;: 10
  }&#x27;
```

Note: Inside `searchParams` of `entities/search`, and inside `params` of each hybrid search request, use the server parameter names, such as `metric_type`. A camelCase `metricType` there, or a `metricType` key next to `params`, is ignored without an error, so a wrong metric type goes unnoticed.

4. Each hybrid search accepts only ONE reranker: a single object in `rerank`, such as `{&quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: {&quot;k&quot;: 60}}` or `{&quot;strategy&quot;: &quot;weighted&quot;, &quot;params&quot;: {&quot;weights&quot;: [0.7, 0.3]}}`. You CANNOT chain multiple rerankers: an array in `rerank` fails with code 1801. Always set `rerank`: a hybrid search without it fails with code 1100.

```bash
# WRONG: cannot chain two rerankers; the response has code 1801
curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;docs&quot;,
    &quot;search&quot;: [
      {&quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;annsField&quot;: &quot;dense_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;}, &quot;limit&quot;: 20},
      {&quot;data&quot;: [{&quot;1&quot;: 0.5, &quot;100&quot;: 0.3, &quot;500&quot;: 0.8}], &quot;annsField&quot;: &quot;sparse_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;IP&quot;}, &quot;limit&quot;: 20}
    ],
    &quot;rerank&quot;: [
      {&quot;strategy&quot;: &quot;weighted&quot;, &quot;params&quot;: {&quot;weights&quot;: [0.7, 0.3]}},
      {&quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: {&quot;k&quot;: 60}}
    ],
    &quot;limit&quot;: 10
  }&#x27;

# CORRECT: use exactly one reranker
curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;docs&quot;,
    &quot;search&quot;: [
      {&quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;annsField&quot;: &quot;dense_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;}, &quot;limit&quot;: 20},
      {&quot;data&quot;: [{&quot;1&quot;: 0.5, &quot;100&quot;: 0.3, &quot;500&quot;: 0.8}], &quot;annsField&quot;: &quot;sparse_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;IP&quot;}, &quot;limit&quot;: 20}
    ],
    &quot;rerank&quot;: {&quot;strategy&quot;: &quot;weighted&quot;, &quot;params&quot;: {&quot;weights&quot;: [0.7, 0.3]}},
    &quot;limit&quot;: 10
  }&#x27;
```

5. To search multiple vector fields, put one request per vector field in the `search` array of `entities/hybrid_search`.

6. The RESTful API has no search iterator: there is no `entities/search_iterator` endpoint. Search iterators are an SDK feature, and they support basic ANN search only, NOT hybrid search. To page through basic ANN search results over HTTP, send `entities/search` with `offset` and `limit`. The server rejects a request whose `offset` plus `limit` exceeds its maximum top K with code 1100. For larger result sets, use the search iterator of an SDK.

```bash
# WRONG: this endpoint does not exist
curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search_iterator&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;annsField&quot;: &quot;dense_vector&quot;, &quot;limit&quot;: 50}&#x27;

# CORRECT: page through basic ANN search results with offset and limit
# (this request returns the second page of 50 hits)
curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --header &quot;Accept-Type-Allow-Int64: false&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;annsField&quot;: &quot;dense_vector&quot;, &quot;limit&quot;: 50, &quot;offset&quot;: 50}&#x27;
```

7. For full-text search with BM25, define the BM25 function and the analyzer-enabled VarChar input field when you create the collection: in the `schema` of `collections/create`, add `&quot;enable_analyzer&quot;: true` to the `elementTypeParams` of the input field, add a `SparseFloatVector` output field, and add `{&quot;name&quot;: &quot;text_bm25&quot;, &quot;type&quot;: &quot;BM25&quot;, &quot;inputFieldNames&quot;: [&quot;text&quot;], &quot;outputFieldNames&quot;: [&quot;sparse_vector&quot;]}` to `functions`. Index the output field with `&quot;metricType&quot;: &quot;BM25&quot;` and `&quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;`. Do not plan to add BM25 later: `collections/add_function_field` fails with code 1100 unless the server runs Milvus 3.0 or later with Storage V3 (`common.storage.useLoonFFI`, disabled by default), schema version compaction, and storage version compaction enabled.

8. ALWAYS send `POST` requests to `/v2/vectordb/...` endpoints. NEVER use the legacy `/v1/vector/...` endpoints: they take different request fields, and a Milvus server can turn them off.

## Decision guide

| Scenario | Search type | When to use |
|---|---|---|
| Find similar items by a single vector | Basic ANN search | Default. Use `entities/search` with one vector field in `annsField`. |
| Combine dense + sparse vectors | Hybrid search | When you have both semantic (dense) and lexical (sparse/BM25) signals. Use `entities/hybrid_search`. |
| Filter results by metadata | Filtered search | Add `filter` to `entities/search`, or to each request in `search` for `entities/hybrid_search`. Example: `&quot;filter&quot;: &quot;category == \&quot;electronics\&quot;&quot;` |
| Keyword matching on text | Full-text search | When you need BM25-based keyword search. Requires a BM25 function defined at collection creation. Pass the query text as a string inside the `data` array: `&quot;data&quot;: [&quot;your query&quot;]`. |
| Exact phrase matching | Phrase match | Use a `PHRASE_MATCH(text, &quot;your phrase&quot;)` filter expression. `TEXT_MATCH` matches documents that contain any of the terms, not the phrase. Requires a VarChar field created with `&quot;enable_analyzer&quot;: true` and `&quot;enable_match&quot;: true` in `elementTypeParams`. |
| Retrieve by primary key | Primary key search | Use `entities/get` with `id` to retrieve entities by exact primary key. |
| Iterate over large result sets | Paged search | No search iterator in the RESTful API. Use `offset` and `limit` on `entities/search` for basic ANN search, or an SDK search iterator. |

## Complete example: basic ANN search

```bash
export CLUSTER_ENDPOINT=&quot;YOUR_MILVUS_URI&quot;
export TOKEN=&quot;YOUR_MILVUS_TOKEN&quot;

# Exit if a response has a nonzero code
# (the later examples reuse CLUSTER_ENDPOINT, TOKEN, and check_code)
check_code() {
  if [ &quot;$(echo &quot;$1&quot; | jq -r &#x27;.code&#x27;)&quot; != &quot;0&quot; ]; then
    echo &quot;Milvus error: $(echo &quot;$1&quot; | jq -r &#x27;.message&#x27;)&quot; &gt;&amp;2
    exit 1
  fi
}

# Ensure collection is loaded
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/load&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;my_collection&quot;}&#x27;)
check_code &quot;${response}&quot;
for attempt in $(seq 1 60); do
  response=$(curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    -d &#x27;{&quot;collectionName&quot;: &quot;my_collection&quot;}&#x27;)
  check_code &quot;${response}&quot;
  state=$(echo &quot;${response}&quot; | jq -r &#x27;.data.loadState&#x27;)
  if [ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ]; then
    break
  fi
  sleep 1
done
[ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ] || { echo &quot;Collection not loaded after 60 attempts&quot; &gt;&amp;2; exit 1; }

# Search; Int64 IDs come back as strings so that jq keeps their precision
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --header &quot;Accept-Type-Allow-Int64: false&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]],
    &quot;annsField&quot;: &quot;dense_vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;title&quot;, &quot;category&quot;],
    &quot;searchParams&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;}
  }&#x27;)
check_code &quot;${response}&quot;

# Hits for all query vectors are in one flat data list, split by topks;
# every hit includes the primary key under its field name (replace id with yours)
echo &quot;${response}&quot; | jq -r &#x27;.data[] | &quot;id: \(.id), distance: \(.distance), title: \(.title)&quot;&#x27;
```

## Complete example: filtered search

```bash
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --header &quot;Accept-Type-Allow-Int64: false&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]],
    &quot;annsField&quot;: &quot;dense_vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;title&quot;, &quot;price&quot;],
    &quot;filter&quot;: &quot;category == \&quot;electronics\&quot; and price &lt; 100.0&quot;
  }&#x27;)
check_code &quot;${response}&quot;
```

## Complete example: hybrid search (dense + sparse)

```bash
# One request per vector field, each with exactly one query vector and its own limit;
# combine with exactly one reranker (70% dense, 30% sparse)
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --header &quot;Accept-Type-Allow-Int64: false&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;search&quot;: [
      {&quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;annsField&quot;: &quot;dense_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;}, &quot;limit&quot;: 20},
      {&quot;data&quot;: [{&quot;1&quot;: 0.5, &quot;100&quot;: 0.3, &quot;500&quot;: 0.8}], &quot;annsField&quot;: &quot;sparse_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;IP&quot;}, &quot;limit&quot;: 20}
    ],
    &quot;rerank&quot;: {&quot;strategy&quot;: &quot;weighted&quot;, &quot;params&quot;: {&quot;weights&quot;: [0.7, 0.3]}},
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;title&quot;, &quot;text&quot;]
  }&#x27;)
check_code &quot;${response}&quot;
# Replace id with the name of your primary key field
echo &quot;${response}&quot; | jq -r &#x27;.data[] | &quot;id: \(.id), distance: \(.distance), title: \(.title)&quot;&#x27;
```

## Complete example: full-text search with BM25

Prerequisites: The collection MUST have been created with a BM25 function whose input is a VarChar field with `&quot;enable_analyzer&quot;: true` and whose output is a `SparseFloatVector` field indexed with metric type `BM25`.

```bash
# Full-text search using the BM25-indexed sparse vector field;
# the query text is a string inside the data array, not a bare string
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --header &quot;Accept-Type-Allow-Int64: false&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;documents&quot;,
    &quot;data&quot;: [&quot;machine learning applications&quot;],
    &quot;annsField&quot;: &quot;sparse_vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;text&quot;]
  }&#x27;)
check_code &quot;${response}&quot;
# Replace id with the name of your primary key field
echo &quot;${response}&quot; | jq -r &#x27;.data[] | &quot;id: \(.id), score: \(.distance), text: \(.text)&quot;&#x27;
```

## Complete example: hybrid search combining dense + BM25

```bash
# Dense vector search plus BM25 full-text search, combined with RRF
# (RRF works well for dense + sparse combination)
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --header &quot;Accept-Type-Allow-Int64: false&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;documents&quot;,
    &quot;search&quot;: [
      {&quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;annsField&quot;: &quot;dense_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;COSINE&quot;}, &quot;limit&quot;: 20},
      {&quot;data&quot;: [&quot;machine learning applications&quot;], &quot;annsField&quot;: &quot;sparse_vector&quot;, &quot;params&quot;: {&quot;metric_type&quot;: &quot;BM25&quot;}, &quot;limit&quot;: 20}
    ],
    &quot;rerank&quot;: {&quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: {&quot;k&quot;: 60}},
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;text&quot;]
  }&#x27;)
check_code &quot;${response}&quot;
```

## Verification checklist

Before finishing, verify:

- [ ] Every request is a `POST` to a `/v2/vectordb/...` endpoint, and every response is checked with `.code`, not the HTTP status
- [ ] Collection is loaded, and `collections/get_load_state` reports `LoadStateLoaded`, before any search or query
- [ ] Index exists before loading the collection
- [ ] A search that must see entities inserted just before it sets `&quot;consistencyLevel&quot;: &quot;Strong&quot;`
- [ ] Every request in a hybrid search contains the same number of query vectors (exactly one per request for one query) and its own `limit`
- [ ] Hybrid search sets exactly one reranker object in `rerank`, not an array
- [ ] `metric_type` inside `searchParams` and `params` is spelled in snake_case
- [ ] No request calls a search iterator endpoint; large result sets are paged with `offset` and `limit`, or read with an SDK search iterator
- [ ] BM25 full-text search uses a collection with BM25 defined at creation time
- [ ] Filter expressions use the correct syntax (for example, `==` not `=`, and string values in quotes)
<button class="copy-code-btn"></button></code></pre>
