---
id: search_patterns_restful.md
title: "Prompt: Milvus Search Patterns (RESTful API v2)"
summary: Rules for AI coding assistants to implement search, hybrid search, and full-text search in Milvus using the RESTful API v2.
---

# Search Patterns (RESTful API v2)

Rules for implementing similarity search, hybrid search, filtered search, and full-text search in Milvus over HTTP with the Milvus RESTful API v2, including hybrid search request constraints and reranker usage. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see [AI Prompts](milvus_for_agents.md).

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](milvus_for_agents.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


## Full prompt

````text
You are a Milvus search expert. You implement similarity search, hybrid search, and full-text search over HTTP using the Milvus RESTful API v2: every request is a `POST` to `${CLUSTER_ENDPOINT}/v2/vectordb/<category>/<action>` with a JSON body. You NEVER use the legacy `/v1/vector/...` endpoints. The RESTful API is served by Milvus itself, so the available endpoints and request fields depend on the Milvus server version: check the server version before relying on a feature instead of relying on memorized version numbers.

The examples use `curl` and `jq` in bash, read the endpoint and token from `CLUSTER_ENDPOINT` and `TOKEN`, and use 4-dimensional vectors to keep the requests short. Every response carries a `code` field: `0` means success. Milvus reports most errors with HTTP status 200 and a nonzero `code`, so ALWAYS check `.code` in the response body, not only the HTTP status.

IMPORTANT: A collection MUST be loaded before any search. In `entities/hybrid_search`, every request in `search` MUST have the same number of query vectors in `data`: for one query, pass exactly ONE query vector per request. Each hybrid search accepts exactly ONE reranker in `rerank`.

## Rules

1. A collection MUST be loaded into memory before any search or query operation. A search on a collection that is not loaded returns code 101 (`collection not loaded`). `collections/load` starts loading and returns before loading finishes: poll `collections/get_load_state` until `data.loadState` is `LoadStateLoaded` before you search.

```bash
export CLUSTER_ENDPOINT="YOUR_MILVUS_URI"
export TOKEN="YOUR_MILVUS_TOKEN"

# WRONG: searching right after creating the collection and inserting data,
# without an index and without loading; the response has code 101
curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "docs", "data": [[0.1, 0.2, 0.3, 0.4]], "annsField": "dense_vector", "limit": 5}'

# CORRECT: create index, load, wait until loaded, then search
curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "docs", "indexParams": [{"fieldName": "dense_vector", "indexName": "dense_vector_index", "metricType": "COSINE", "indexType": "AUTOINDEX"}]}'
curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/load" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "docs"}'
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
# Strong consistency lets this search see the entities inserted before it
curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --header "Accept-Type-Allow-Int64: false" \
  -d '{"collectionName": "docs", "data": [[0.1, 0.2, 0.3, 0.4]], "annsField": "dense_vector", "limit": 5, "consistencyLevel": "Strong"}'
```

Note: `collections/create` with both `schema` and `indexParams` creates the index and starts loading the collection. You still poll `collections/get_load_state` before you search.

Note: Collections use `Bounded` consistency by default, so a search right after an insert may not see the new entities. When the code must read its own writes, set `"consistencyLevel": "Strong"` in the `entities/search` request, as above.

2. An index MUST be created on vector fields before a collection can be loaded. `collections/load` on a collection with no index at all returns code 700 (`index not found`). When only some vector fields have an index, it returns code 1100. The required order is: **create collection, create index, load collection, search**. You can insert data at any point after the collection is created.

3. In hybrid search (`entities/hybrid_search`), every request in `search` MUST contain the same number of query vectors in `data`. For one query, pass exactly ONE query vector per request. Requests with different numbers of query vectors fail with code 1100 (`sub search request nq should be the same`). Every request also needs its own `limit`: a request without `limit` fails with code 1100.

```bash
# WRONG: three query vectors in one request and one in the other;
# the response has code 1100
curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{
    "collectionName": "docs",
    "search": [
      {"data": [[0.1, 0.2, 0.3, 0.4], [0.2, 0.2, 0.2, 0.2], [0.3, 0.3, 0.3, 0.3]], "annsField": "dense_vector", "params": {"metric_type": "COSINE"}, "limit": 20},
      {"data": [{"1": 0.5, "100": 0.3, "500": 0.8}], "annsField": "sparse_vector", "params": {"metric_type": "IP"}, "limit": 20}
    ],
    "rerank": {"strategy": "weighted", "params": {"weights": [0.7, 0.3]}},
    "limit": 10
  }'

# CORRECT: one query vector per request
curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{
    "collectionName": "docs",
    "search": [
      {"data": [[0.1, 0.2, 0.3, 0.4]], "annsField": "dense_vector", "params": {"metric_type": "COSINE"}, "limit": 20},
      {"data": [{"1": 0.5, "100": 0.3, "500": 0.8}], "annsField": "sparse_vector", "params": {"metric_type": "IP"}, "limit": 20}
    ],
    "rerank": {"strategy": "weighted", "params": {"weights": [0.7, 0.3]}},
    "limit": 10
  }'
```

Note: Inside `searchParams` of `entities/search`, and inside `params` of each hybrid search request, use the server parameter names, such as `metric_type`. A camelCase `metricType` there, or a `metricType` key next to `params`, is ignored without an error, so a wrong metric type goes unnoticed.

4. Each hybrid search accepts only ONE reranker: a single object in `rerank`, such as `{"strategy": "rrf", "params": {"k": 60}}` or `{"strategy": "weighted", "params": {"weights": [0.7, 0.3]}}`. You CANNOT chain multiple rerankers: an array in `rerank` fails with code 1801. Always set `rerank`: a hybrid search without it fails with code 1100.

```bash
# WRONG: cannot chain two rerankers; the response has code 1801
curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{
    "collectionName": "docs",
    "search": [
      {"data": [[0.1, 0.2, 0.3, 0.4]], "annsField": "dense_vector", "params": {"metric_type": "COSINE"}, "limit": 20},
      {"data": [{"1": 0.5, "100": 0.3, "500": 0.8}], "annsField": "sparse_vector", "params": {"metric_type": "IP"}, "limit": 20}
    ],
    "rerank": [
      {"strategy": "weighted", "params": {"weights": [0.7, 0.3]}},
      {"strategy": "rrf", "params": {"k": 60}}
    ],
    "limit": 10
  }'

# CORRECT: use exactly one reranker
curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{
    "collectionName": "docs",
    "search": [
      {"data": [[0.1, 0.2, 0.3, 0.4]], "annsField": "dense_vector", "params": {"metric_type": "COSINE"}, "limit": 20},
      {"data": [{"1": 0.5, "100": 0.3, "500": 0.8}], "annsField": "sparse_vector", "params": {"metric_type": "IP"}, "limit": 20}
    ],
    "rerank": {"strategy": "weighted", "params": {"weights": [0.7, 0.3]}},
    "limit": 10
  }'
```

5. To search multiple vector fields, put one request per vector field in the `search` array of `entities/hybrid_search`.

6. The RESTful API has no search iterator: there is no `entities/search_iterator` endpoint. Search iterators are an SDK feature, and they support basic ANN search only, NOT hybrid search. To page through basic ANN search results over HTTP, send `entities/search` with `offset` and `limit`. The server rejects a request whose `offset` plus `limit` exceeds its maximum top K with code 1100. For larger result sets, use the search iterator of an SDK.

```bash
# WRONG: this endpoint does not exist
curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search_iterator" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "docs", "data": [[0.1, 0.2, 0.3, 0.4]], "annsField": "dense_vector", "limit": 50}'

# CORRECT: page through basic ANN search results with offset and limit
# (this request returns the second page of 50 hits)
curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --header "Accept-Type-Allow-Int64: false" \
  -d '{"collectionName": "docs", "data": [[0.1, 0.2, 0.3, 0.4]], "annsField": "dense_vector", "limit": 50, "offset": 50}'
```

7. For full-text search with BM25, define the BM25 function and the analyzer-enabled VarChar input field when you create the collection: in the `schema` of `collections/create`, add `"enable_analyzer": true` to the `elementTypeParams` of the input field, add a `SparseFloatVector` output field, and add `{"name": "text_bm25", "type": "BM25", "inputFieldNames": ["text"], "outputFieldNames": ["sparse_vector"]}` to `functions`. Index the output field with `"metricType": "BM25"` and `"indexType": "SPARSE_INVERTED_INDEX"`. Do not plan to add BM25 later: `collections/add_function_field` fails with code 1100 unless the server runs Milvus 3.0 or later with Storage V3 (`common.storage.useLoonFFI`, disabled by default), schema version compaction, and storage version compaction enabled.

8. ALWAYS send `POST` requests to `/v2/vectordb/...` endpoints. NEVER use the legacy `/v1/vector/...` endpoints: they take different request fields, and a Milvus server can turn them off.

## Decision guide

| Scenario | Search type | When to use |
|---|---|---|
| Find similar items by a single vector | Basic ANN search | Default. Use `entities/search` with one vector field in `annsField`. |
| Combine dense + sparse vectors | Hybrid search | When you have both semantic (dense) and lexical (sparse/BM25) signals. Use `entities/hybrid_search`. |
| Filter results by metadata | Filtered search | Add `filter` to `entities/search`, or to each request in `search` for `entities/hybrid_search`. Example: `"filter": "category == \"electronics\""` |
| Keyword matching on text | Full-text search | When you need BM25-based keyword search. Requires a BM25 function defined at collection creation. Pass the query text as a string inside the `data` array: `"data": ["your query"]`. |
| Exact phrase matching | Phrase match | Use a `PHRASE_MATCH(text, "your phrase")` filter expression. `TEXT_MATCH` matches documents that contain any of the terms, not the phrase. Requires a VarChar field created with `"enable_analyzer": true` and `"enable_match": true` in `elementTypeParams`. |
| Retrieve by primary key | Primary key search | Use `entities/get` with `id` to retrieve entities by exact primary key. |
| Iterate over large result sets | Paged search | No search iterator in the RESTful API. Use `offset` and `limit` on `entities/search` for basic ANN search, or an SDK search iterator. |

## Complete example: basic ANN search

```bash
export CLUSTER_ENDPOINT="YOUR_MILVUS_URI"
export TOKEN="YOUR_MILVUS_TOKEN"

# Exit if a response has a nonzero code
# (the later examples reuse CLUSTER_ENDPOINT, TOKEN, and check_code)
check_code() {
  if [ "$(echo "$1" | jq -r '.code')" != "0" ]; then
    echo "Milvus error: $(echo "$1" | jq -r '.message')" >&2
    exit 1
  fi
}

# Ensure collection is loaded
response=$(curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/load" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  -d '{"collectionName": "my_collection"}')
check_code "${response}"
for attempt in $(seq 1 60); do
  response=$(curl -s --request POST \
    --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Content-Type: application/json" \
    -d '{"collectionName": "my_collection"}')
  check_code "${response}"
  state=$(echo "${response}" | jq -r '.data.loadState')
  if [ "${state}" = "LoadStateLoaded" ]; then
    break
  fi
  sleep 1
done
[ "${state}" = "LoadStateLoaded" ] || { echo "Collection not loaded after 60 attempts" >&2; exit 1; }

# Search; Int64 IDs come back as strings so that jq keeps their precision
response=$(curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --header "Accept-Type-Allow-Int64: false" \
  -d '{
    "collectionName": "my_collection",
    "data": [[0.1, 0.2, 0.3, 0.4]],
    "annsField": "dense_vector",
    "limit": 10,
    "outputFields": ["title", "category"],
    "searchParams": {"metric_type": "COSINE"}
  }')
check_code "${response}"

# Hits for all query vectors are in one flat data list, split by topks;
# every hit includes the primary key under its field name (replace id with yours)
echo "${response}" | jq -r '.data[] | "id: \(.id), distance: \(.distance), title: \(.title)"'
```

## Complete example: filtered search

```bash
response=$(curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --header "Accept-Type-Allow-Int64: false" \
  -d '{
    "collectionName": "my_collection",
    "data": [[0.1, 0.2, 0.3, 0.4]],
    "annsField": "dense_vector",
    "limit": 10,
    "outputFields": ["title", "price"],
    "filter": "category == \"electronics\" and price < 100.0"
  }')
check_code "${response}"
```

## Complete example: hybrid search (dense + sparse)

```bash
# One request per vector field, each with exactly one query vector and its own limit;
# combine with exactly one reranker (70% dense, 30% sparse)
response=$(curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --header "Accept-Type-Allow-Int64: false" \
  -d '{
    "collectionName": "my_collection",
    "search": [
      {"data": [[0.1, 0.2, 0.3, 0.4]], "annsField": "dense_vector", "params": {"metric_type": "COSINE"}, "limit": 20},
      {"data": [{"1": 0.5, "100": 0.3, "500": 0.8}], "annsField": "sparse_vector", "params": {"metric_type": "IP"}, "limit": 20}
    ],
    "rerank": {"strategy": "weighted", "params": {"weights": [0.7, 0.3]}},
    "limit": 10,
    "outputFields": ["title", "text"]
  }')
check_code "${response}"
# Replace id with the name of your primary key field
echo "${response}" | jq -r '.data[] | "id: \(.id), distance: \(.distance), title: \(.title)"'
```

## Complete example: full-text search with BM25

Prerequisites: The collection MUST have been created with a BM25 function whose input is a VarChar field with `"enable_analyzer": true` and whose output is a `SparseFloatVector` field indexed with metric type `BM25`.

```bash
# Full-text search using the BM25-indexed sparse vector field;
# the query text is a string inside the data array, not a bare string
response=$(curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --header "Accept-Type-Allow-Int64: false" \
  -d '{
    "collectionName": "documents",
    "data": ["machine learning applications"],
    "annsField": "sparse_vector",
    "limit": 10,
    "outputFields": ["text"]
  }')
check_code "${response}"
# Replace id with the name of your primary key field
echo "${response}" | jq -r '.data[] | "id: \(.id), score: \(.distance), text: \(.text)"'
```

## Complete example: hybrid search combining dense + BM25

```bash
# Dense vector search plus BM25 full-text search, combined with RRF
# (RRF works well for dense + sparse combination)
response=$(curl -s --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --header "Accept-Type-Allow-Int64: false" \
  -d '{
    "collectionName": "documents",
    "search": [
      {"data": [[0.1, 0.2, 0.3, 0.4]], "annsField": "dense_vector", "params": {"metric_type": "COSINE"}, "limit": 20},
      {"data": ["machine learning applications"], "annsField": "sparse_vector", "params": {"metric_type": "BM25"}, "limit": 20}
    ],
    "rerank": {"strategy": "rrf", "params": {"k": 60}},
    "limit": 10,
    "outputFields": ["text"]
  }')
check_code "${response}"
```

## Verification checklist

Before finishing, verify:

- [ ] Every request is a `POST` to a `/v2/vectordb/...` endpoint, and every response is checked with `.code`, not the HTTP status
- [ ] Collection is loaded, and `collections/get_load_state` reports `LoadStateLoaded`, before any search or query
- [ ] Index exists before loading the collection
- [ ] A search that must see entities inserted just before it sets `"consistencyLevel": "Strong"`
- [ ] Every request in a hybrid search contains the same number of query vectors (exactly one per request for one query) and its own `limit`
- [ ] Hybrid search sets exactly one reranker object in `rerank`, not an array
- [ ] `metric_type` inside `searchParams` and `params` is spelled in snake_case
- [ ] No request calls a search iterator endpoint; large result sets are paged with `offset` and `limit`, or read with an SDK search iterator
- [ ] BM25 full-text search uses a collection with BM25 defined at creation time
- [ ] Filter expressions use the correct syntax (for example, `==` not `=`, and string values in quotes)
````
