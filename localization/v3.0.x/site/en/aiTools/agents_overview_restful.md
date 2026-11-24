---
id: agents_overview_restful.md
title: AGENTS.md for Milvus (RESTful API v2)
summary: >-
  Rules and patterns for AI coding agents that generate, review, or debug code
  that calls the Milvus vector database RESTful API v2.
---
<h1 id="AGENTSmd-RESTful-API-v2" class="common-anchor-header">AGENTS.md (RESTful API v2)<button data-href="#AGENTSmd-RESTful-API-v2" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus is an open-source vector database for similarity search, hybrid search, and RAG. Over HTTP, you interact with it through the Milvus RESTful API v2. Copy the full prompt below into your AI tool to apply these rules automatically. For detailed task-specific prompts, see <a href="/docs/milvus_for_agents.md">AI Prompts</a>.</p>
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
<li><strong>Save</strong> it to the location your AI tool expects — see the <a href="/docs/milvus_for_agents.md">environment table</a> for placement details.</li>
<li>Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.</li>
</ol>
<p>For <strong>Cursor</strong> users: copy the prompt from the <a href="#full-prompt">Full prompt</a> section and save it under <code translate="no">.cursor/rules/</code> in your project.</p>
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
    </button></h2><pre><code translate="no" class="language-text"># AGENTS.md for Milvus (RESTful API v2)

Milvus is an open-source vector database for similarity search, hybrid search, and RAG. You interact with it over HTTP through the Milvus RESTful API v2: every request is a `POST` to `${CLUSTER_ENDPOINT}/v2/vectordb/&lt;category&gt;/&lt;action&gt;` with a JSON body.

Use these rules whenever you generate, review, or debug code that calls the Milvus RESTful API on Milvus or Zilliz Cloud. The examples use `curl` and `jq` in bash. The available endpoints and request fields depend on the Milvus server version, so check the user&#x27;s server version against the version thresholds in these rules before relying on a feature.

## Client &amp; connection

1. **CRITICAL: Always use the `/v2/vectordb/...` endpoints.** Never use the legacy `/v1/vector/...` endpoints: they take different request fields, and a server can turn them off with the `proxy.http.enableV1` setting. If the user provides code that calls `/v1/vector/...`, rewrite it to the matching `/v2/vectordb/...` endpoint and its request fields.

2. **Connection patterns.** Milvus without authentication: the endpoint only, with `TOKEN` left empty or the `Authorization` header omitted. Zilliz Cloud or Milvus with authentication: the endpoint + the header `Authorization: Bearer ${TOKEN}`. Every response carries a `code` field, and failed requests can still return HTTP status 200, so treat any `code` other than `0` as an error.

```bash
# Milvus without authentication
export CLUSTER_ENDPOINT=&quot;YOUR_MILVUS_URI&quot;
export TOKEN=&quot;&quot;

# Zilliz Cloud or Milvus with authentication
export CLUSTER_ENDPOINT=&quot;YOUR_MILVUS_URI&quot;
export TOKEN=&quot;YOUR_MILVUS_TOKEN&quot;

curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/list&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{}&#x27;
```

## Schema &amp; data

3. **CRITICAL: Use the exact, case-sensitive `dataType` names.** Write `&quot;dataType&quot;: &quot;FloatVector&quot;`, not `&quot;FLOAT_VECTOR&quot;`. The server rejects `&quot;FLOAT_VECTOR&quot;` and `&quot;INT64&quot;` as invalid data types.

4. **CRITICAL: Schema changes are limited.** On Milvus 2.5.x and earlier, the schema is immutable: drop and recreate the collection to change it. On Milvus 2.6 and later, `/v2/vectordb/collections/fields/add` adds a field, and the field must set `&quot;nullable&quot;: true`; a field with only a `defaultValue` is rejected. On Milvus 3.0 and later, `/v2/vectordb/collections/fields/drop` drops a field, except the primary key, the partition key, the clustering key, the last vector field, the dynamic field, system fields, fields that a function reads or generates, and the field that the collection&#x27;s `ttl_field` property names. `/v2/vectordb/collections/fields/alter_properties` changes field properties such as `max_length`. You cannot change the data type of an existing field: create a new collection and migrate the data.

5. **Primary keys: `&quot;Int64&quot;` or `&quot;VarChar&quot;` only.** Composite primary keys are not supported. Primary keys must be unique across the entire collection, including across partitions.

6. **Use `/v2/vectordb/entities/upsert` to update entities.** There is no `/v2/vectordb/entities/update` endpoint. By default, upsert replaces the entire entity if the primary key exists, or inserts a new one. When the primary key field sets `autoID`, still pass the primary key: Milvus 3.0.3 and later keep the key of an existing entity and generate a new key only for rows whose key is not found, which requires the collection to be loaded; earlier versions give every upserted entity a new key generated by the server. To change only some fields of existing entities, set `&quot;partialUpdate&quot;: true` in the request body. Use `/v2/vectordb/entities/insert` only when you are certain there are no primary key conflicts.

7. **Define BM25 at collection creation time.** Pass the BM25 function in `schema.functions` of `/v2/vectordb/collections/create`, with a `&quot;VarChar&quot;` input field that sets `&quot;enable_analyzer&quot;: true` in `elementTypeParams` and a `&quot;SparseFloatVector&quot;` output field. Adding a BM25 function field to an existing collection with `/v2/vectordb/collections/add_function_field` needs Milvus 3.0 or later with Storage V3 (`common.storage.useLoonFFI`, disabled by default), schema version compaction, and storage version compaction enabled; otherwise the server rejects the request.

## Index &amp; loading

8. **CRITICAL: Index before load, load before search.** A vector field must have an index before the collection can be loaded. A collection must be loaded before any search or query. Shortcut: pass both `schema` and `indexParams` to `/v2/vectordb/collections/create`, and Milvus creates the index and loads the collection. Loading can finish after the create call returns, so poll `/v2/vectordb/collections/get_load_state` until `loadState` is `LoadStateLoaded` before you search. Otherwise call `/v2/vectordb/indexes/create` and then `/v2/vectordb/collections/load`.

9. **Start with `AUTOINDEX`.** Use `&quot;indexType&quot;: &quot;AUTOINDEX&quot;` in `indexParams` unless you have specific requirements. Choose HNSW for high recall, DiskANN for larger-than-RAM datasets, IVF_FLAT for memory-constrained scenarios.

## Search

10. **CRITICAL: Every entry of `search` in `/v2/vectordb/entities/hybrid_search` must carry the same number of query vectors.** For one query, put exactly one vector in the `data` of each entry, for example `&quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]]`. The server rejects entries with different numbers of vectors (&quot;sub search request nq should be the same&quot;). With more than one vector per entry, the response `data` lists the hits of all query vectors in order, and `topks` gives the number of hits per query vector.

11. **One ranker per `hybrid_search` request.** Send exactly one `rerank` object, such as `{&quot;strategy&quot;: &quot;rrf&quot;, &quot;params&quot;: {&quot;k&quot;: 60}}` or `{&quot;strategy&quot;: &quot;weighted&quot;, &quot;params&quot;: {&quot;weights&quot;: [0.7, 0.3]}}`. You cannot chain rankers: a `functionScore` with two rerank functions is rejected, and when a request sets both `rerank` and `functionScore`, the server applies `functionScore` and ignores `rerank`. Pick one.

## Quick start

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

# 1. Define schema, 2. define index, 3. create collection (Milvus creates the index and loads the collection)
# (dim 4 keeps the example short; use the dimension of your embedding model)
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
check_code &quot;${response}&quot;

# Wait until the collection is loaded
for attempt in $(seq 1 60); do
  response=$(curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;}&#x27;)
  check_code &quot;${response}&quot;
  state=$(echo &quot;${response}&quot; | jq -r &#x27;.data.loadState&#x27;)
  if [ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ]; then
    break
  fi
  sleep 1
done
[ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ] || { echo &quot;Collection not loaded after 60 attempts&quot; &gt;&amp;2; exit 1; }

# 4. Insert (the auto ID primary key is omitted)
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;docs&quot;,
    &quot;data&quot;: [
      {&quot;vector&quot;: [0.1, 0.1, 0.1, 0.1], &quot;text&quot;: &quot;first doc&quot;},
      {&quot;vector&quot;: [0.2, 0.2, 0.2, 0.2], &quot;text&quot;: &quot;second doc&quot;}
    ]
  }&#x27;)
check_code &quot;${response}&quot;

# 5. Search with Strong consistency so that the new entities are visible;
# Int64 IDs come back as strings so that jq keeps their precision
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --header &quot;Accept-Type-Allow-Int64: false&quot; \
  -d &#x27;{
    &quot;collectionName&quot;: &quot;docs&quot;,
    &quot;data&quot;: [[0.15, 0.15, 0.15, 0.15]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 5,
    &quot;outputFields&quot;: [&quot;text&quot;],
    &quot;consistencyLevel&quot;: &quot;Strong&quot;
  }&#x27;)
check_code &quot;${response}&quot;
echo &quot;${response}&quot; | jq -r &#x27;.data[] | &quot;id: \(.id), distance: \(.distance), text: \(.text)&quot;&#x27;
```

## Common mistakes

| Mistake | Fix |
|---|---|
| Calling `/v1/vector/...` endpoints | Rewrite with the matching `/v2/vectordb/...` endpoint |
| Searching before the collection is loaded | Pass `indexParams` to `collections/create` and poll `collections/get_load_state`, or call `indexes/create` then `collections/load` first |
| Different numbers of vectors across the `search` entries of `hybrid_search` | Give every entry the same number of vectors in `data`; one vector each for one query |
| Calling `/v2/vectordb/entities/update` | Use `/v2/vectordb/entities/upsert` |
| Adding BM25 after the collection exists | Define the BM25 function in `schema.functions` and `enable_analyzer` at `collections/create` time |
| Upper-case data types (`&quot;FLOAT_VECTOR&quot;`) | Use the case-sensitive names, such as `&quot;FloatVector&quot;` |
| Treating HTTP status 200 as success | Check that the response `code` is `0` |
<button class="copy-code-btn"></button></code></pre>
