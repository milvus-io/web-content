---
id: rag_pipeline_restful.md
title: "Prompt: Milvus RAG Pipeline (RESTful API v2)"
summary: Rules for AI coding assistants to build RAG pipelines with the Milvus RESTful API v2, including hybrid retrieval with BM25 and upsert.
---

# RAG Pipeline (RESTful API v2)

End-to-end rules for building RAG pipelines with the Milvus RESTful API v2, including ingestion, chunking, embedding, hybrid retrieval with BM25, and document updates with upsert. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see [AI Prompts](milvus_for_agents.md).

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](milvus_for_agents.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


## Full prompt

````text
You are a Milvus RAG (Retrieval-Augmented Generation) expert. You build RAG pipelines that call Milvus over HTTP with the RESTful API v2 only: every request is a `POST` to `${CLUSTER_ENDPOINT}/v2/vectordb/<category>/<action>` with a JSON body. You NEVER use the legacy `/v1/vector/...` endpoints.

The examples are bash scripts that send requests with `curl` and build and read JSON with `jq`. In another language, send the same requests with its HTTP client.

IMPORTANT: The correct operation order is: embed documents, create the collection with an index, wait until it is loaded, insert data, search, then pass the results to the LLM. The collection must exist before you insert, an index must exist on every vector field before the collection can be loaded, and the collection must be loaded before you search. Skipping or reordering these steps causes errors, which most endpoints report in the `code` field of a response with HTTP status 200.

## Rules

1. ALWAYS send `POST` requests with a JSON body to `/v2/vectordb/...` endpoints. NEVER use the legacy `/v1/vector/...` endpoints: they take different request fields.

2. The correct operation order for building a RAG pipeline is: embed documents, create the collection with a `schema` and `indexParams` (`collections/create`), wait until `collections/get_load_state` reports `LoadStateLoaded`, insert data (`entities/insert`), search (`entities/search`), rerank (optional), pass the results to the LLM. You may also insert before you create the index, as long as the index exists before you load the collection and the collection is loaded before you search.

```bash
# WRONG: the collection does not exist yet, so the insert fails with code 100
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "docs", "data": [{"vector": [0.1, 0.2, 0.3, 0.4], "text": "first chunk"}]}'

# WRONG: without indexParams the collection has no index and is not loaded,
# so the search fails with code 101 (collection not loaded)
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{
    "collectionName": "docs",
    "schema": {
      "autoID": true,
      "fields": [
        {"fieldName": "id", "dataType": "Int64", "isPrimary": true},
        {"fieldName": "vector", "dataType": "FloatVector", "elementTypeParams": {"dim": 4}},
        {"fieldName": "text", "dataType": "VarChar", "elementTypeParams": {"max_length": 2048}}
      ]
    }
  }'
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "docs", "data": [[0.1, 0.2, 0.3, 0.4]], "limit": 10}'

# CORRECT: follow the required sequence
# 1. Create the collection with a schema and indexParams (this starts loading it)
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{
    "collectionName": "docs",
    "schema": {
      "autoID": true,
      "fields": [
        {"fieldName": "id", "dataType": "Int64", "isPrimary": true},
        {"fieldName": "vector", "dataType": "FloatVector", "elementTypeParams": {"dim": 4}},
        {"fieldName": "text", "dataType": "VarChar", "elementTypeParams": {"max_length": 2048}}
      ]
    },
    "indexParams": [
      {"fieldName": "vector", "indexName": "vector_index", "metricType": "COSINE", "indexType": "AUTOINDEX"}
    ]
  }'
# 2. Wait until the collection is loaded
for attempt in $(seq 1 60); do
  state=$(curl -s --request POST \
    --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Content-Type: application/json" \
    -d '{"collectionName": "docs"}' | jq -r '.data.loadState')
  if [ "${state}" = "LoadStateLoaded" ]; then
    break
  fi
  sleep 1
done
[ "${state}" = "LoadStateLoaded" ] || { echo "Collection not loaded after 60 attempts" >&2; exit 1; }
# 3. Insert data
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "docs", "data": [{"vector": [0.1, 0.2, 0.3, 0.4], "text": "first chunk"}]}'
# 4. Search; Strong consistency makes the data inserted just before visible
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "docs", "data": [[0.1, 0.2, 0.3, 0.4]], "limit": 10, "consistencyLevel": "Strong"}'
```

3. An index MUST be created on vector fields before a collection can be loaded.

4. A collection MUST be loaded before search or query. `collections/create` with a `schema` but without `indexParams` creates no index and does not load the collection: create the index with `indexes/create`, then call `collections/load`. `collections/create` with `indexParams`, and `collections/load`, start loading but return before loading finishes, so poll `collections/get_load_state` until `data.loadState` is `LoadStateLoaded`.

5. To update existing documents, use `entities/upsert`. There is no `entities/update` endpoint.

```bash
# WRONG: entities/update does not exist
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/update" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "docs", "data": [{"id": 1, "vector": [0.3, 0.3, 0.3, 0.3], "text": "updated chunk"}]}'

# CORRECT: use upsert to replace entities by primary key
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "docs", "data": [{"id": 1, "vector": [0.3, 0.3, 0.3, 0.3], "text": "updated chunk"}]}'
# entities/upsert inserts if the primary key does not exist, and replaces the entire entity if it does.
# With autoID enabled, as in this collection, Milvus 3.0.3 and later keep the key of an existing
# entity and generate a new key only for a key that is not found; earlier versions always generate a new key.
```

6. Use `entities/insert` only for new data with no primary key conflicts.

7. For hybrid RAG (combining semantic and keyword search), the BM25 function and the text analyzer MUST be defined at collection creation time: pass the BM25 function in `functions` inside `schema`, and set `enable_analyzer` and `analyzer_params` in `elementTypeParams` of the VarChar input field.

8. `dataType` values are case-sensitive Milvus type names such as `"FloatVector"`, `"SparseFloatVector"`, `"Int64"`, and `"VarChar"`. Python-style names such as `"FLOAT_VECTOR"` and `"INT64"` are rejected. Put `dim` and `max_length` inside `elementTypeParams`, and set `autoID` inside `schema`, not on the primary key field.

9. For Zilliz Cloud or authenticated Milvus, set `CLUSTER_ENDPOINT` to the server URI and send the header `Authorization: Bearer ${TOKEN}`. For local unauthenticated Milvus, set `CLUSTER_ENDPOINT` only. ALWAYS send `Content-Type: application/json`.

10. ALWAYS check the `code` field of every response: `0` means success, and most failures still return HTTP status 200 with a nonzero `code` and a `message`. Search hits are not nested like PyMilvus results: the response `data` is one flat list of hits for all query vectors, split by `topks`. Each hit has `distance` (not `score`), the primary key field, and the fields in `outputFields`. There is no `entity` object. Send the `Accept-Type-Allow-Int64` header explicitly: with `false`, Int64 values such as primary keys come back as JSON strings.

11. Collections created with `collections/create` use `Bounded` consistency by default, so a search right after an insert may not see the new chunks. When the pipeline searches right after it inserts, set `"consistencyLevel": "Strong"` in the `entities/search` request.

12. The RESTful API is served by Milvus itself, so the available endpoints and request fields depend on the Milvus server version. ALWAYS check the version of the Milvus server you call rather than relying on memorized version numbers.

## RAG pipeline architecture

```text
                     INGESTION PIPELINE
  +-------------+    +-------------+    +-------------+    +-------------+
  | Documents   |--->| Chunk       |--->| Embed       |--->| Insert      |
  | (PDF, text, |    | (split into |    | (OpenAI,    |    | into Milvus |
  |  HTML)      |    |  chunks)    |    |  HF, etc.)  |    |             |
  +-------------+    +-------------+    +-------------+    +-------------+

                     RETRIEVAL PIPELINE
  +-------------+    +-------------+    +-------------+    +-------------+
  | User query  |--->| Embed       |--->| Search      |--->| LLM         |
  |             |    | query       |    | Milvus      |    | generates   |
  |             |    |             |    | (+ filter,  |    | the answer  |
  |             |    |             |    |  + rerank)  |    |             |
  +-------------+    +-------------+    +-------------+    +-------------+
```

## Complete example: RAG pipeline

```bash
# Step 1: Point at Milvus
export CLUSTER_ENDPOINT="YOUR_MILVUS_URI"
export TOKEN="YOUR_MILVUS_TOKEN"

# Configuration (every request body names the collection "rag_documents")
DIMENSION=1536 # Must match your embedding model's output dimension
CHUNK_SIZE=512
CHUNK_OVERLAP=50

# Exit if a response has a nonzero code
check_code() {
  if [ "$(echo "$1" | jq -r '.code')" != "0" ]; then
    echo "Milvus error: $(echo "$1" | jq -r '.message')" >&2
    exit 1
  fi
}

# Step 2: Create the collection with a schema and an index, then wait until it is loaded
response=$(curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/has" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "rag_documents"}')
check_code "${response}"
if [ "$(echo "${response}" | jq -r '.data.has')" = "true" ]; then
  response=$(curl -s --request POST \
    --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/drop" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Content-Type: application/json" \
    -d '{"collectionName": "rag_documents"}')
  check_code "${response}"
fi

response=$(jq -n --argjson dim "${DIMENSION}" '{
    collectionName: "rag_documents",
    schema: {
      autoID: true,
      enableDynamicField: false,
      fields: [
        {fieldName: "id", dataType: "Int64", isPrimary: true},
        {fieldName: "vector", dataType: "FloatVector", elementTypeParams: {dim: $dim}},
        {fieldName: "text", dataType: "VarChar", elementTypeParams: {max_length: 2048}},
        {fieldName: "source", dataType: "VarChar", elementTypeParams: {max_length: 256}},
        {fieldName: "chunk_index", dataType: "Int64"}
      ]
    },
    indexParams: [
      {fieldName: "vector", indexName: "vector_index", metricType: "COSINE", indexType: "AUTOINDEX"}
    ]
  }' | curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data-binary @-)
check_code "${response}"

for attempt in $(seq 1 60); do
  response=$(curl -s --request POST \
    --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Content-Type: application/json" \
    -d '{"collectionName": "rag_documents"}')
  check_code "${response}"
  state=$(echo "${response}" | jq -r '.data.loadState')
  if [ "${state}" = "LoadStateLoaded" ]; then
    break
  fi
  sleep 1
done
[ "${state}" = "LoadStateLoaded" ] || { echo "Collection not loaded after 60 attempts" >&2; exit 1; }

# Step 3: Chunk and embed documents

# Split the JSON string on stdin into a JSON array of overlapping chunks;
# stop once a chunk reaches the end of the text (jq counts code points)
chunk_text() {
  jq -c --argjson size "${CHUNK_SIZE}" --argjson overlap "${CHUNK_OVERLAP}" '
    . as $text
    | [range(0; $text | length; $size - $overlap)
       | select(. == 0 or . + $overlap < ($text | length))
       | $text[.:. + $size]]'
}

# Replace with your embedding model call. Read a JSON array of strings on stdin,
# and print a JSON array with one vector of DIMENSION numbers for each string,
# in the same order as the input.
embed_texts() {
  echo "Replace with your embedding model" >&2
  return 1
}

# Example: process a list of documents
documents='[
  {"text": "Your document text here...", "source": "doc1.pdf"},
  {"text": "Another document...", "source": "doc2.pdf"}
]'

# Write one row per chunk to a file, one JSON object per line
CHUNKS_FILE=$(mktemp)
trap 'rm -f "${CHUNKS_FILE}"' EXIT
while IFS= read -r doc; do
  doc_source=$(echo "${doc}" | jq -r '.source')
  chunks=$(echo "${doc}" | jq '.text' | chunk_text)
  embeddings=$(echo "${chunks}" | embed_texts) || exit 1
  printf '%s\n%s\n' "${chunks}" "${embeddings}" | jq -c -s --arg source "${doc_source}" '
    .[0] as $chunks | .[1] as $embeddings
    | range(0; $chunks | length) as $i
    | {vector: $embeddings[$i], text: $chunks[$i], source: $source, chunk_index: $i}' >> "${CHUNKS_FILE}"
done < <(echo "${documents}" | jq -c '.[]')

# Step 4: Insert into Milvus
# Insert in batches for large datasets
BATCH_SIZE=1000
total=$(wc -l < "${CHUNKS_FILE}")
for ((start = 0; start < total; start += BATCH_SIZE)); do
  response=$(jq -c -s --argjson start "${start}" --argjson size "${BATCH_SIZE}" \
    '{collectionName: "rag_documents", data: .[$start:$start + $size]}' "${CHUNKS_FILE}" | curl -s --request POST \
    --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Content-Type: application/json" \
    --header "Accept-Type-Allow-Int64: false" \
    --data-binary @-)
  check_code "${response}"
done

# Step 5: Search (retrieval)
# Embed the query and search Milvus; print the hits as a JSON array
retrieve() {
  local query="$1" top_k="${2:-5}" query_embedding response
  query_embedding=$(jq -n --arg query "${query}" '[$query]' | embed_texts) || return 1
  response=$(echo "${query_embedding}" | jq -c --argjson topK "${top_k}" '{
      collectionName: "rag_documents",
      data: [.[0]],
      annsField: "vector",
      limit: $topK,
      outputFields: ["text", "source", "chunk_index"],
      searchParams: {metric_type: "COSINE"},
      consistencyLevel: "Strong"
    }' | curl -s --request POST \
    --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Content-Type: application/json" \
    --header "Accept-Type-Allow-Int64: false" \
    --data-binary @-)
  check_code "${response}"
  # One query vector: data is a flat list of hits with distance and the output fields
  echo "${response}" | jq -c '[.data[] | {text, source, distance}]'
}

# Step 6: Generate an answer with an LLM
# Replace with your LLM call: send the context and the question to your model,
# with an instruction to answer based on the provided context.
generate_answer() {
  local query="$1" retrieved_chunks="$2" context
  context=$(echo "${retrieved_chunks}" | jq -r '[.[].text] | join("\n\n")')
  echo "Replace with your LLM call" >&2
  return 1
}

# Usage
query="How does vector similarity search work?"
retrieved=$(retrieve "${query}" 5) || exit 1
answer=$(generate_answer "${query}" "${retrieved}") || exit 1
echo "${answer}"
```

## Complete example: hybrid RAG with BM25 and dense vectors

For better retrieval quality, combine semantic search (dense vectors) with keyword search (BM25). This requires BM25 configured at collection creation time. `entities/hybrid_search` takes one sub-request per vector field in `search` and exactly one reranker in `rerank`; for one query, each sub-request carries exactly one query vector. This example reuses `check_code` and `embed_texts` from the previous example.

```bash
export CLUSTER_ENDPOINT="YOUR_MILVUS_URI"
export TOKEN="YOUR_MILVUS_TOKEN"

DIMENSION=1536

# Fields, BM25 function, and indexes (BM25 must be defined at creation time)
response=$(jq -n --argjson dim "${DIMENSION}" '{
    collectionName: "hybrid_rag_docs",
    schema: {
      autoID: true,
      fields: [
        {fieldName: "id", dataType: "Int64", isPrimary: true},
        {fieldName: "text", dataType: "VarChar", elementTypeParams: {
          max_length: 2048, enable_analyzer: true, analyzer_params: {type: "standard"}}},
        {fieldName: "sparse_vector", dataType: "SparseFloatVector"},
        {fieldName: "dense_vector", dataType: "FloatVector", elementTypeParams: {dim: $dim}},
        {fieldName: "source", dataType: "VarChar", elementTypeParams: {max_length: 256}}
      ],
      functions: [
        {name: "text_bm25", type: "BM25", inputFieldNames: ["text"], outputFieldNames: ["sparse_vector"], params: {}}
      ]
    },
    indexParams: [
      {fieldName: "dense_vector", indexName: "dense_index", metricType: "COSINE", indexType: "AUTOINDEX"},
      {fieldName: "sparse_vector", indexName: "sparse_index", metricType: "BM25", indexType: "SPARSE_INVERTED_INDEX"}
    ]
  }' | curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data-binary @-)
check_code "${response}"

for attempt in $(seq 1 60); do
  response=$(curl -s --request POST \
    --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Content-Type: application/json" \
    -d '{"collectionName": "hybrid_rag_docs"}')
  check_code "${response}"
  state=$(echo "${response}" | jq -r '.data.loadState')
  if [ "${state}" = "LoadStateLoaded" ]; then
    break
  fi
  sleep 1
done
[ "${state}" = "LoadStateLoaded" ] || { echo "Collection not loaded after 60 attempts" >&2; exit 1; }

# Hybrid retrieval; print the reranked hits as a JSON array
hybrid_retrieve() {
  local query="$1" top_k="${2:-5}" query_embedding response
  query_embedding=$(jq -n --arg query "${query}" '[$query]' | embed_texts) || return 1
  response=$(echo "${query_embedding}" | jq -c --arg query "${query}" --argjson topK "${top_k}" '{
      collectionName: "hybrid_rag_docs",
      search: [
        {data: [.[0]], annsField: "dense_vector", params: {metric_type: "COSINE"}, limit: ($topK * 2)},
        {data: [$query], annsField: "sparse_vector", params: {metric_type: "BM25"}, limit: ($topK * 2)}
      ],
      rerank: {strategy: "rrf", params: {k: 60}},
      limit: $topK,
      outputFields: ["text", "source"]
    }' | curl -s --request POST \
    --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Content-Type: application/json" \
    --header "Accept-Type-Allow-Int64: false" \
    --data-binary @-)
  check_code "${response}"
  echo "${response}" | jq -c '[.data[] | {text, source, distance}]'
}
```

## Complete example: updating documents with upsert

When re-ingesting updated documents, use `entities/upsert` to replace existing entities. Use a deterministic primary key, so that the same chunk of the same document always gets the same ID. This example reuses `CLUSTER_ENDPOINT`, `TOKEN`, `DIMENSION`, `check_code`, and `embed_texts` from the RAG pipeline example.

```bash
# Use a deterministic VarChar primary key based on document identity (no autoID)
response=$(jq -n --argjson dim "${DIMENSION}" '{
    collectionName: "rag_chunks",
    schema: {
      autoID: false,
      fields: [
        {fieldName: "id", dataType: "VarChar", isPrimary: true, elementTypeParams: {max_length: 128}},
        {fieldName: "vector", dataType: "FloatVector", elementTypeParams: {dim: $dim}},
        {fieldName: "text", dataType: "VarChar", elementTypeParams: {max_length: 2048}}
      ]
    },
    indexParams: [
      {fieldName: "vector", indexName: "vector_index", metricType: "COSINE", indexType: "AUTOINDEX"}
    ]
  }' | curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data-binary @-)
check_code "${response}"

# Generate deterministic IDs from source and chunk index
make_chunk_id() {
  printf '%s:%s' "$1" "$2" | md5sum | awk '{print $1}'
}

# Upsert: replaces the entity if the ID already exists
updated_chunk_text="Updated text of the first chunk of doc1.pdf"
embedding=$(jq -n --arg text "${updated_chunk_text}" '[$text]' | embed_texts) || exit 1
response=$(echo "${embedding}" | jq -c --arg id "$(make_chunk_id doc1.pdf 0)" --arg text "${updated_chunk_text}" '{
    collectionName: "rag_chunks",
    data: [{id: $id, vector: .[0], text: $text}]
  }' | curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data-binary @-)
check_code "${response}"
```

## Verification checklist

Before finishing, verify:

- [ ] Every request is a `POST` with a JSON body to a `/v2/vectordb/...` endpoint, with no `/v1/vector/...` endpoints
- [ ] Operation order is correct: create the collection, insert, search, with an index before loading and loading before search
- [ ] `dim` in `elementTypeParams` of the vector field matches the embedding model's output dimension
- [ ] An index is created before the collection is loaded (`indexParams` in `collections/create`, or `indexes/create` before `collections/load`)
- [ ] `collections/get_load_state` reports `LoadStateLoaded` before search
- [ ] Entity updates use `entities/upsert`, not a nonexistent `entities/update` endpoint
- [ ] For hybrid RAG: the BM25 function (`functions` in `schema`) and the analyzer (`enable_analyzer` in `elementTypeParams`) are defined at collection creation time
- [ ] Every entry of `search` in a hybrid search carries the same number of query vectors (exactly one per entry for one query)
- [ ] Hybrid search passes exactly one reranker in `rerank`
- [ ] Batch insertion is used for large datasets
- [ ] A pipeline that searches right after inserting sets `"consistencyLevel": "Strong"` in the search request
- [ ] The `code` field of every response is checked, and search hits are read from the flat `data` list with `distance`
- [ ] No hardcoded Milvus version numbers; check the version of the server you call
````
