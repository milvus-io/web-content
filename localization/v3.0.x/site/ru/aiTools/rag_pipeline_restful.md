---
id: rag_pipeline_restful.md
title: 'Подсказка: Конвейер Milvus RAG (RESTful API v2)'
summary: >-
  Правила для помощников по программированию в области искусственного интеллекта
  по созданию конвейеров RAG с использованием RESTful API v2 от Milvus, включая
  гибридный поиск с помощью BM25 и операцию upsert.
---
<h1 id="RAG-Pipeline-RESTful-API-v2" class="common-anchor-header">Конвейер RAG (RESTful API v2)<button data-href="#RAG-Pipeline-RESTful-API-v2" class="anchor-icon" translate="no">
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
    </button></h1><p>Комплексные правила построения конвейеров RAG с использованием RESTful API v2 от Milvus, включая загрузку данных, фрагментацию, встраивание, гибридный поиск с использованием BM25 и обновление документов с помощью upsert. Скопируйте полный текст подсказки, приведенный ниже, в свой инструмент искусственного интеллекта, чтобы автоматически применить эти правила. Обзор всех подсказок см. в разделе <a href="/docs/ru/milvus_for_agents.md">«Подсказки для ИИ</a>».</p>
<h2 id="How-to-use-this-prompt" class="common-anchor-header">Как использовать эту команду<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
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
<li><strong>Скопируйте</strong> полную команду из раздела <a href="#full-prompt">«Полная команда»</a> ниже.</li>
<li><strong>Сохраните</strong> его в том месте, которое предполагает ваш инструмент ИИ — подробности о размещении см. в <a href="/docs/ru/milvus_for_agents.md">таблице среды</a>.</li>
<li>Ваш ИИ-помощник будет автоматически применять эти правила при генерации или проверке кода Milvus.</li>
</ol>
<p>Для пользователей <strong>Cursor</strong>: скопируйте подсказку из раздела <a href="#full-prompt">«Полная подсказка»</a> и сохраните её в папке « <code translate="no">.cursor/rules/</code> » в вашем проекте.</p>
<h2 id="Full-prompt" class="common-anchor-header">Полный промпт<button data-href="#Full-prompt" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus RAG (Retrieval-Augmented Generation) expert. You build RAG pipelines that call Milvus over HTTP with the RESTful API v2 only: every request is a `POST` to `${CLUSTER_ENDPOINT}/v2/vectordb/&lt;category&gt;/&lt;action&gt;` with a JSON body. You NEVER use the legacy `/v1/vector/...` endpoints.

The examples are bash scripts that send requests with `curl` and build and read JSON with `jq`. In another language, send the same requests with its HTTP client.

IMPORTANT: The correct operation order is: embed documents, create the collection with an index, wait until it is loaded, insert data, search, then pass the results to the LLM. The collection must exist before you insert, an index must exist on every vector field before the collection can be loaded, and the collection must be loaded before you search. Skipping or reordering these steps causes errors, which most endpoints report in the `code` field of a response with HTTP status 200.

## Rules

1. ALWAYS send `POST` requests with a JSON body to `/v2/vectordb/...` endpoints. NEVER use the legacy `/v1/vector/...` endpoints: they take different request fields.

2. The correct operation order for building a RAG pipeline is: embed documents, create the collection with a `schema` and `indexParams` (`collections/create`), wait until `collections/get_load_state` reports `LoadStateLoaded`, insert data (`entities/insert`), search (`entities/search`), rerank (optional), pass the results to the LLM. You may also insert before you create the index, as long as the index exists before you load the collection and the collection is loaded before you search.

```bash
# WRONG: the collection does not exist yet, so the insert fails with code 100
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;data&quot;: [{&quot;vector&quot;: [0.1, 0.2, 0.3, 0.4], &quot;text&quot;: &quot;first chunk&quot;}]}&#x27;

# WRONG: without indexParams the collection has no index and is not loaded,
# so the search fails with code 101 (collection not loaded)
curl --request POST \
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
        {&quot;fieldName&quot;: &quot;text&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: 2048}}
      ]
    }
  }&#x27;
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;limit&quot;: 10}&#x27;

# CORRECT: follow the required sequence
# 1. Create the collection with a schema and indexParams (this starts loading it)
curl --request POST \
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
        {&quot;fieldName&quot;: &quot;text&quot;, &quot;dataType&quot;: &quot;VarChar&quot;, &quot;elementTypeParams&quot;: {&quot;max_length&quot;: 2048}}
      ]
    },
    &quot;indexParams&quot;: [
      {&quot;fieldName&quot;: &quot;vector&quot;, &quot;indexName&quot;: &quot;vector_index&quot;, &quot;metricType&quot;: &quot;COSINE&quot;, &quot;indexType&quot;: &quot;AUTOINDEX&quot;}
    ]
  }&#x27;
# 2. Wait until the collection is loaded
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
# 3. Insert data
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;data&quot;: [{&quot;vector&quot;: [0.1, 0.2, 0.3, 0.4], &quot;text&quot;: &quot;first chunk&quot;}]}&#x27;
# 4. Search; Strong consistency makes the data inserted just before visible
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]], &quot;limit&quot;: 10, &quot;consistencyLevel&quot;: &quot;Strong&quot;}&#x27;
```

3. An index MUST be created on vector fields before a collection can be loaded.

4. A collection MUST be loaded before search or query. `collections/create` with a `schema` but without `indexParams` creates no index and does not load the collection: create the index with `indexes/create`, then call `collections/load`. `collections/create` with `indexParams`, and `collections/load`, start loading but return before loading finishes, so poll `collections/get_load_state` until `data.loadState` is `LoadStateLoaded`.

5. To update existing documents, use `entities/upsert`. There is no `entities/update` endpoint.

```bash
# WRONG: entities/update does not exist
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/update&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;data&quot;: [{&quot;id&quot;: 1, &quot;vector&quot;: [0.3, 0.3, 0.3, 0.3], &quot;text&quot;: &quot;updated chunk&quot;}]}&#x27;

# CORRECT: use upsert to replace entities by primary key
curl --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;docs&quot;, &quot;data&quot;: [{&quot;id&quot;: 1, &quot;vector&quot;: [0.3, 0.3, 0.3, 0.3], &quot;text&quot;: &quot;updated chunk&quot;}]}&#x27;
# entities/upsert inserts if the primary key does not exist, and replaces the entire entity if it does.
# With autoID enabled, as in this collection, Milvus 3.0.3 and later keep the key of an existing
# entity and generate a new key only for a key that is not found; earlier versions always generate a new key.
```

6. Use `entities/insert` only for new data with no primary key conflicts.

7. For hybrid RAG (combining semantic and keyword search), the BM25 function and the text analyzer MUST be defined at collection creation time: pass the BM25 function in `functions` inside `schema`, and set `enable_analyzer` and `analyzer_params` in `elementTypeParams` of the VarChar input field.

8. `dataType` values are case-sensitive Milvus type names such as `&quot;FloatVector&quot;`, `&quot;SparseFloatVector&quot;`, `&quot;Int64&quot;`, and `&quot;VarChar&quot;`. Python-style names such as `&quot;FLOAT_VECTOR&quot;` and `&quot;INT64&quot;` are rejected. Put `dim` and `max_length` inside `elementTypeParams`, and set `autoID` inside `schema`, not on the primary key field.

9. For Zilliz Cloud or authenticated Milvus, set `CLUSTER_ENDPOINT` to the server URI and send the header `Authorization: Bearer ${TOKEN}`. For local unauthenticated Milvus, set `CLUSTER_ENDPOINT` only. ALWAYS send `Content-Type: application/json`.

10. ALWAYS check the `code` field of every response: `0` means success, and most failures still return HTTP status 200 with a nonzero `code` and a `message`. Search hits are not nested like PyMilvus results: the response `data` is one flat list of hits for all query vectors, split by `topks`. Each hit has `distance` (not `score`), the primary key field, and the fields in `outputFields`. There is no `entity` object. Send the `Accept-Type-Allow-Int64` header explicitly: with `false`, Int64 values such as primary keys come back as JSON strings.

11. Collections created with `collections/create` use `Bounded` consistency by default, so a search right after an insert may not see the new chunks. When the pipeline searches right after it inserts, set `&quot;consistencyLevel&quot;: &quot;Strong&quot;` in the `entities/search` request.

12. The RESTful API is served by Milvus itself, so the available endpoints and request fields depend on the Milvus server version. ALWAYS check the version of the Milvus server you call rather than relying on memorized version numbers.

## RAG pipeline architecture

```text
                     INGESTION PIPELINE
  +-------------+    +-------------+    +-------------+    +-------------+
  | Documents   |---&gt;| Chunk       |---&gt;| Embed       |---&gt;| Insert      |
  | (PDF, text, |    | (split into |    | (OpenAI,    |    | into Milvus |
  |  HTML)      |    |  chunks)    |    |  HF, etc.)  |    |             |
  +-------------+    +-------------+    +-------------+    +-------------+

                     RETRIEVAL PIPELINE
  +-------------+    +-------------+    +-------------+    +-------------+
  | User query  |---&gt;| Embed       |---&gt;| Search      |---&gt;| LLM         |
  |             |    | query       |    | Milvus      |    | generates   |
  |             |    |             |    | (+ filter,  |    | the answer  |
  |             |    |             |    |  + rerank)  |    |             |
  +-------------+    +-------------+    +-------------+    +-------------+
```

## Complete example: RAG pipeline

```bash
# Step 1: Point at Milvus
export CLUSTER_ENDPOINT=&quot;YOUR_MILVUS_URI&quot;
export TOKEN=&quot;YOUR_MILVUS_TOKEN&quot;

# Configuration (every request body names the collection &quot;rag_documents&quot;)
DIMENSION=1536 # Must match your embedding model&#x27;s output dimension
CHUNK_SIZE=512
CHUNK_OVERLAP=50

# Exit if a response has a nonzero code
check_code() {
  if [ &quot;$(echo &quot;$1&quot; | jq -r &#x27;.code&#x27;)&quot; != &quot;0&quot; ]; then
    echo &quot;Milvus error: $(echo &quot;$1&quot; | jq -r &#x27;.message&#x27;)&quot; &gt;&amp;2
    exit 1
  fi
}

# Step 2: Create the collection with a schema and an index, then wait until it is loaded
response=$(curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/has&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;collectionName&quot;: &quot;rag_documents&quot;}&#x27;)
check_code &quot;${response}&quot;
if [ &quot;$(echo &quot;${response}&quot; | jq -r &#x27;.data.has&#x27;)&quot; = &quot;true&quot; ]; then
  response=$(curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/drop&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    -d &#x27;{&quot;collectionName&quot;: &quot;rag_documents&quot;}&#x27;)
  check_code &quot;${response}&quot;
fi

response=$(jq -n --argjson dim &quot;${DIMENSION}&quot; &#x27;{
    collectionName: &quot;rag_documents&quot;,
    schema: {
      autoID: true,
      enableDynamicField: false,
      fields: [
        {fieldName: &quot;id&quot;, dataType: &quot;Int64&quot;, isPrimary: true},
        {fieldName: &quot;vector&quot;, dataType: &quot;FloatVector&quot;, elementTypeParams: {dim: $dim}},
        {fieldName: &quot;text&quot;, dataType: &quot;VarChar&quot;, elementTypeParams: {max_length: 2048}},
        {fieldName: &quot;source&quot;, dataType: &quot;VarChar&quot;, elementTypeParams: {max_length: 256}},
        {fieldName: &quot;chunk_index&quot;, dataType: &quot;Int64&quot;}
      ]
    },
    indexParams: [
      {fieldName: &quot;vector&quot;, indexName: &quot;vector_index&quot;, metricType: &quot;COSINE&quot;, indexType: &quot;AUTOINDEX&quot;}
    ]
  }&#x27; | curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --data-binary @-)
check_code &quot;${response}&quot;

for attempt in $(seq 1 60); do
  response=$(curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    -d &#x27;{&quot;collectionName&quot;: &quot;rag_documents&quot;}&#x27;)
  check_code &quot;${response}&quot;
  state=$(echo &quot;${response}&quot; | jq -r &#x27;.data.loadState&#x27;)
  if [ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ]; then
    break
  fi
  sleep 1
done
[ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ] || { echo &quot;Collection not loaded after 60 attempts&quot; &gt;&amp;2; exit 1; }

# Step 3: Chunk and embed documents

# Split the JSON string on stdin into a JSON array of overlapping chunks;
# stop once a chunk reaches the end of the text (jq counts code points)
chunk_text() {
  jq -c --argjson size &quot;${CHUNK_SIZE}&quot; --argjson overlap &quot;${CHUNK_OVERLAP}&quot; &#x27;
    . as $text
    | [range(0; $text | length; $size - $overlap)
       | select(. == 0 or . + $overlap &lt; ($text | length))
       | $text[.:. + $size]]&#x27;
}

# Replace with your embedding model call. Read a JSON array of strings on stdin,
# and print a JSON array with one vector of DIMENSION numbers for each string,
# in the same order as the input.
embed_texts() {
  echo &quot;Replace with your embedding model&quot; &gt;&amp;2
  return 1
}

# Example: process a list of documents
documents=&#x27;[
  {&quot;text&quot;: &quot;Your document text here...&quot;, &quot;source&quot;: &quot;doc1.pdf&quot;},
  {&quot;text&quot;: &quot;Another document...&quot;, &quot;source&quot;: &quot;doc2.pdf&quot;}
]&#x27;

# Write one row per chunk to a file, one JSON object per line
CHUNKS_FILE=$(mktemp)
trap &#x27;rm -f &quot;${CHUNKS_FILE}&quot;&#x27; EXIT
while IFS= read -r doc; do
  doc_source=$(echo &quot;${doc}&quot; | jq -r &#x27;.source&#x27;)
  chunks=$(echo &quot;${doc}&quot; | jq &#x27;.text&#x27; | chunk_text)
  embeddings=$(echo &quot;${chunks}&quot; | embed_texts) || exit 1
  printf &#x27;%s\n%s\n&#x27; &quot;${chunks}&quot; &quot;${embeddings}&quot; | jq -c -s --arg source &quot;${doc_source}&quot; &#x27;
    .[0] as $chunks | .[1] as $embeddings
    | range(0; $chunks | length) as $i
    | {vector: $embeddings[$i], text: $chunks[$i], source: $source, chunk_index: $i}&#x27; &gt;&gt; &quot;${CHUNKS_FILE}&quot;
done &lt; &lt;(echo &quot;${documents}&quot; | jq -c &#x27;.[]&#x27;)

# Step 4: Insert into Milvus
# Insert in batches for large datasets
BATCH_SIZE=1000
total=$(wc -l &lt; &quot;${CHUNKS_FILE}&quot;)
for ((start = 0; start &lt; total; start += BATCH_SIZE)); do
  response=$(jq -c -s --argjson start &quot;${start}&quot; --argjson size &quot;${BATCH_SIZE}&quot; \
    &#x27;{collectionName: &quot;rag_documents&quot;, data: .[$start:$start + $size]}&#x27; &quot;${CHUNKS_FILE}&quot; | curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    --header &quot;Accept-Type-Allow-Int64: false&quot; \
    --data-binary @-)
  check_code &quot;${response}&quot;
done

# Step 5: Search (retrieval)
# Embed the query and search Milvus; print the hits as a JSON array
retrieve() {
  local query=&quot;$1&quot; top_k=&quot;${2:-5}&quot; query_embedding response
  query_embedding=$(jq -n --arg query &quot;${query}&quot; &#x27;[$query]&#x27; | embed_texts) || return 1
  response=$(echo &quot;${query_embedding}&quot; | jq -c --argjson topK &quot;${top_k}&quot; &#x27;{
      collectionName: &quot;rag_documents&quot;,
      data: [.[0]],
      annsField: &quot;vector&quot;,
      limit: $topK,
      outputFields: [&quot;text&quot;, &quot;source&quot;, &quot;chunk_index&quot;],
      searchParams: {metric_type: &quot;COSINE&quot;},
      consistencyLevel: &quot;Strong&quot;
    }&#x27; | curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/search&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    --header &quot;Accept-Type-Allow-Int64: false&quot; \
    --data-binary @-)
  check_code &quot;${response}&quot;
  # One query vector: data is a flat list of hits with distance and the output fields
  echo &quot;${response}&quot; | jq -c &#x27;[.data[] | {text, source, distance}]&#x27;
}

# Step 6: Generate an answer with an LLM
# Replace with your LLM call: send the context and the question to your model,
# with an instruction to answer based on the provided context.
generate_answer() {
  local query=&quot;$1&quot; retrieved_chunks=&quot;$2&quot; context
  context=$(echo &quot;${retrieved_chunks}&quot; | jq -r &#x27;[.[].text] | join(&quot;\n\n&quot;)&#x27;)
  echo &quot;Replace with your LLM call&quot; &gt;&amp;2
  return 1
}

# Usage
query=&quot;How does vector similarity search work?&quot;
retrieved=$(retrieve &quot;${query}&quot; 5) || exit 1
answer=$(generate_answer &quot;${query}&quot; &quot;${retrieved}&quot;) || exit 1
echo &quot;${answer}&quot;
```

## Complete example: hybrid RAG with BM25 and dense vectors

For better retrieval quality, combine semantic search (dense vectors) with keyword search (BM25). This requires BM25 configured at collection creation time. `entities/hybrid_search` takes one sub-request per vector field in `search` and exactly one reranker in `rerank`; for one query, each sub-request carries exactly one query vector. This example reuses `check_code` and `embed_texts` from the previous example.

```bash
export CLUSTER_ENDPOINT=&quot;YOUR_MILVUS_URI&quot;
export TOKEN=&quot;YOUR_MILVUS_TOKEN&quot;

DIMENSION=1536

# Fields, BM25 function, and indexes (BM25 must be defined at creation time)
response=$(jq -n --argjson dim &quot;${DIMENSION}&quot; &#x27;{
    collectionName: &quot;hybrid_rag_docs&quot;,
    schema: {
      autoID: true,
      fields: [
        {fieldName: &quot;id&quot;, dataType: &quot;Int64&quot;, isPrimary: true},
        {fieldName: &quot;text&quot;, dataType: &quot;VarChar&quot;, elementTypeParams: {
          max_length: 2048, enable_analyzer: true, analyzer_params: {type: &quot;standard&quot;}}},
        {fieldName: &quot;sparse_vector&quot;, dataType: &quot;SparseFloatVector&quot;},
        {fieldName: &quot;dense_vector&quot;, dataType: &quot;FloatVector&quot;, elementTypeParams: {dim: $dim}},
        {fieldName: &quot;source&quot;, dataType: &quot;VarChar&quot;, elementTypeParams: {max_length: 256}}
      ],
      functions: [
        {name: &quot;text_bm25&quot;, type: &quot;BM25&quot;, inputFieldNames: [&quot;text&quot;], outputFieldNames: [&quot;sparse_vector&quot;], params: {}}
      ]
    },
    indexParams: [
      {fieldName: &quot;dense_vector&quot;, indexName: &quot;dense_index&quot;, metricType: &quot;COSINE&quot;, indexType: &quot;AUTOINDEX&quot;},
      {fieldName: &quot;sparse_vector&quot;, indexName: &quot;sparse_index&quot;, metricType: &quot;BM25&quot;, indexType: &quot;SPARSE_INVERTED_INDEX&quot;}
    ]
  }&#x27; | curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --data-binary @-)
check_code &quot;${response}&quot;

for attempt in $(seq 1 60); do
  response=$(curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    -d &#x27;{&quot;collectionName&quot;: &quot;hybrid_rag_docs&quot;}&#x27;)
  check_code &quot;${response}&quot;
  state=$(echo &quot;${response}&quot; | jq -r &#x27;.data.loadState&#x27;)
  if [ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ]; then
    break
  fi
  sleep 1
done
[ &quot;${state}&quot; = &quot;LoadStateLoaded&quot; ] || { echo &quot;Collection not loaded after 60 attempts&quot; &gt;&amp;2; exit 1; }

# Hybrid retrieval; print the reranked hits as a JSON array
hybrid_retrieve() {
  local query=&quot;$1&quot; top_k=&quot;${2:-5}&quot; query_embedding response
  query_embedding=$(jq -n --arg query &quot;${query}&quot; &#x27;[$query]&#x27; | embed_texts) || return 1
  response=$(echo &quot;${query_embedding}&quot; | jq -c --arg query &quot;${query}&quot; --argjson topK &quot;${top_k}&quot; &#x27;{
      collectionName: &quot;hybrid_rag_docs&quot;,
      search: [
        {data: [.[0]], annsField: &quot;dense_vector&quot;, params: {metric_type: &quot;COSINE&quot;}, limit: ($topK * 2)},
        {data: [$query], annsField: &quot;sparse_vector&quot;, params: {metric_type: &quot;BM25&quot;}, limit: ($topK * 2)}
      ],
      rerank: {strategy: &quot;rrf&quot;, params: {k: 60}},
      limit: $topK,
      outputFields: [&quot;text&quot;, &quot;source&quot;]
    }&#x27; | curl -s --request POST \
    --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search&quot; \
    --header &quot;Authorization: Bearer ${TOKEN}&quot; \
    --header &quot;Content-Type: application/json&quot; \
    --header &quot;Accept-Type-Allow-Int64: false&quot; \
    --data-binary @-)
  check_code &quot;${response}&quot;
  echo &quot;${response}&quot; | jq -c &#x27;[.data[] | {text, source, distance}]&#x27;
}
```

## Complete example: updating documents with upsert

When re-ingesting updated documents, use `entities/upsert` to replace existing entities. Use a deterministic primary key, so that the same chunk of the same document always gets the same ID. This example reuses `CLUSTER_ENDPOINT`, `TOKEN`, `DIMENSION`, `check_code`, and `embed_texts` from the RAG pipeline example.

```bash
# Use a deterministic VarChar primary key based on document identity (no autoID)
response=$(jq -n --argjson dim &quot;${DIMENSION}&quot; &#x27;{
    collectionName: &quot;rag_chunks&quot;,
    schema: {
      autoID: false,
      fields: [
        {fieldName: &quot;id&quot;, dataType: &quot;VarChar&quot;, isPrimary: true, elementTypeParams: {max_length: 128}},
        {fieldName: &quot;vector&quot;, dataType: &quot;FloatVector&quot;, elementTypeParams: {dim: $dim}},
        {fieldName: &quot;text&quot;, dataType: &quot;VarChar&quot;, elementTypeParams: {max_length: 2048}}
      ]
    },
    indexParams: [
      {fieldName: &quot;vector&quot;, indexName: &quot;vector_index&quot;, metricType: &quot;COSINE&quot;, indexType: &quot;AUTOINDEX&quot;}
    ]
  }&#x27; | curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/collections/create&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --data-binary @-)
check_code &quot;${response}&quot;

# Generate deterministic IDs from source and chunk index
make_chunk_id() {
  printf &#x27;%s:%s&#x27; &quot;$1&quot; &quot;$2&quot; | md5sum | awk &#x27;{print $1}&#x27;
}

# Upsert: replaces the entity if the ID already exists
updated_chunk_text=&quot;Updated text of the first chunk of doc1.pdf&quot;
embedding=$(jq -n --arg text &quot;${updated_chunk_text}&quot; &#x27;[$text]&#x27; | embed_texts) || exit 1
response=$(echo &quot;${embedding}&quot; | jq -c --arg id &quot;$(make_chunk_id doc1.pdf 0)&quot; --arg text &quot;${updated_chunk_text}&quot; &#x27;{
    collectionName: &quot;rag_chunks&quot;,
    data: [{id: $id, vector: .[0], text: $text}]
  }&#x27; | curl -s --request POST \
  --url &quot;${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert&quot; \
  --header &quot;Authorization: Bearer ${TOKEN}&quot; \
  --header &quot;Content-Type: application/json&quot; \
  --data-binary @-)
check_code &quot;${response}&quot;
```

## Verification checklist

Before finishing, verify:

- [ ] Every request is a `POST` with a JSON body to a `/v2/vectordb/...` endpoint, with no `/v1/vector/...` endpoints
- [ ] Operation order is correct: create the collection, insert, search, with an index before loading and loading before search
- [ ] `dim` in `elementTypeParams` of the vector field matches the embedding model&#x27;s output dimension
- [ ] An index is created before the collection is loaded (`indexParams` in `collections/create`, or `indexes/create` before `collections/load`)
- [ ] `collections/get_load_state` reports `LoadStateLoaded` before search
- [ ] Entity updates use `entities/upsert`, not a nonexistent `entities/update` endpoint
- [ ] For hybrid RAG: the BM25 function (`functions` in `schema`) and the analyzer (`enable_analyzer` in `elementTypeParams`) are defined at collection creation time
- [ ] Every entry of `search` in a hybrid search carries the same number of query vectors (exactly one per entry for one query)
- [ ] Hybrid search passes exactly one reranker in `rerank`
- [ ] Batch insertion is used for large datasets
- [ ] A pipeline that searches right after inserting sets `&quot;consistencyLevel&quot;: &quot;Strong&quot;` in the search request
- [ ] The `code` field of every response is checked, and search hits are read from the flat `data` list with `distance`
- [ ] No hardcoded Milvus version numbers; check the version of the server you call
<button class="copy-code-btn"></button></code></pre>
