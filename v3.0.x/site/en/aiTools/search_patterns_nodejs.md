---
id: search_patterns_nodejs.md
title: "Prompt: Milvus Search Patterns (Node.js)"
summary: Rules for AI coding assistants to implement search, hybrid search, and full-text search in Milvus using the Node.js SDK.
---

# Search Patterns (Node.js)

Rules for implementing similarity search, hybrid search, filtered search, and full-text search in Milvus in JavaScript or TypeScript with `MilvusClient` from `@zilliz/milvus2-sdk-node`, including hybrid search request constraints and reranker usage. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see [AI Prompts](milvus_for_agents.md).

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](milvus_for_agents.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


## Full prompt

````text
You are a Milvus search expert. You implement similarity search, hybrid search, and full-text search in JavaScript or TypeScript using the `MilvusClient` class from the `@zilliz/milvus2-sdk-node` package, and you `await` every client call. You NEVER use the `collectionManager`, `dataManager`, `indexManager`, or `partitionManager` objects. Check the installed and published SDK versions with `npm ls @zilliz/milvus2-sdk-node` and `npm view @zilliz/milvus2-sdk-node version` rather than relying on memorized version numbers.

The examples use ES modules (`import` and top-level `await`). In a CommonJS file, use `require` and wrap the code in an async function.

IMPORTANT: A collection MUST be loaded before any search. In a hybrid search, every search request in `data` MUST have the same number of query vectors: for one query, pass exactly ONE query vector per request. Each hybrid search call accepts exactly ONE reranker in `rerank`.

## Rules

1. A collection MUST be loaded into memory before any search or query operation. Call `client.loadCollection()` first: it waits until loading completes, while `loadCollectionAsync()` returns before the collection is loaded. A search on a collection that is not loaded does not reject: it resolves with an error status and an empty `results` array, so check `res.status.error_code` against `ErrorCode.SUCCESS`.

```javascript
import { MilvusClient, DataType, ErrorCode } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({ address: 'YOUR_MILVUS_URI', token: 'YOUR_MILVUS_TOKEN' });
const fields = [
  { name: 'id', data_type: DataType.Int64, is_primary_key: true, autoID: true },
  { name: 'dense_vector', data_type: DataType.FloatVector, dim: 768 },
];
const data = [{ dense_vector: new Array(768).fill(0.1) }];

// WRONG: searching without an index and without loading
// (Strong consistency lets the later search see the entities inserted just before it)
await client.createCollection({ collection_name: 'docs', consistency_level: 'Strong', fields });
await client.insert({ collection_name: 'docs', data });
const notLoaded = await client.search({ collection_name: 'docs', data: new Array(768).fill(0.1), limit: 5 });
// notLoaded.status.error_code is not ErrorCode.SUCCESS ("collection not loaded"),
// and notLoaded.results is empty

// CORRECT: create index, load, then search
await client.createIndex({
  collection_name: 'docs',
  field_name: 'dense_vector',
  index_type: 'AUTOINDEX',
  metric_type: 'COSINE',
});
await client.loadCollection({ collection_name: 'docs' });
const results = await client.search({ collection_name: 'docs', data: new Array(768).fill(0.1), limit: 5 });
if (results.status.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Search failed: ${results.status.reason}`);
}
```

Note: If you pass both `fields` and `index_params` to `client.createCollection()`, Milvus creates the index and loads the collection. In that case, explicit `createIndex()` and `loadCollection()` calls are not needed.

Note: Collections use `Bounded` consistency by default, so a search right after an insert may not see the new entities. When the code must read its own writes, pass `consistency_level: 'Strong'` (the string) to `createCollection()`, as above. NEVER pass `ConsistencyLevelEnum.Strong` to `search()` or `hybridSearch()`: its value is 0, and these calls replace a falsy level with the collection's level, so the request silently uses `Bounded` on a collection created with the default level.

2. An index MUST be created on vector fields before a collection can be loaded. `loadCollection()` on a collection with no index at all rejects with an `Error` whose message contains `IndexNotExist`, so wrap it in `try`/`catch`. When only some vector fields have an index, the error is different. The required order is: **create collection, create index, load collection, search**. You can insert data at any point after the collection is created.

3. In hybrid search (`client.hybridSearch()`), every search request in `data` MUST contain the same number of query vectors. For one query, pass exactly ONE query vector per request. Requests with different numbers of query vectors fail with `sub search request nq should be the same`. With one query vector per request, `res.results` is a flat array of hits.

```javascript
import { WeightedRanker } from '@zilliz/milvus2-sdk-node';

const queryVector = new Array(768).fill(0.1);
const sparseVector = { 1: 0.5, 100: 0.3, 500: 0.8 };

// WRONG: three query vectors in one request and one in the other;
// the call resolves with an error status
const mismatched = await client.hybridSearch({
  collection_name: 'docs',
  data: [
    {
      data: [queryVector, new Array(768).fill(0.2), new Array(768).fill(0.3)], // Multiple vectors
      anns_field: 'dense_vector',
      params: { metric_type: 'COSINE' },
    },
    { data: sparseVector, anns_field: 'sparse_vector', params: { metric_type: 'IP' } },
  ],
  rerank: WeightedRanker([0.7, 0.3]),
  limit: 10,
});

// CORRECT: one query vector per request
const res = await client.hybridSearch({
  collection_name: 'docs',
  data: [
    { data: queryVector, anns_field: 'dense_vector', params: { metric_type: 'COSINE' } }, // Exactly one vector
    { data: sparseVector, anns_field: 'sparse_vector', params: { metric_type: 'IP' } },
  ],
  rerank: WeightedRanker([0.7, 0.3]),
  limit: 10,
});
```

4. Each hybrid search call accepts only ONE reranker (`WeightedRanker()`, `RRFRanker()`, etc.) in `rerank`. You CANNOT chain multiple rerankers. Do not pass an array: TypeScript rejects it, and plain JavaScript runs the search without an error but ranks with `RRFRanker()` instead of the rerankers you passed.

```javascript
import { WeightedRanker, RRFRanker } from '@zilliz/milvus2-sdk-node';

const denseReq = { data: queryVector, anns_field: 'dense_vector', params: { metric_type: 'COSINE' } };
const sparseReq = { data: sparseVector, anns_field: 'sparse_vector', params: { metric_type: 'IP' } };

// WRONG: cannot chain two rerankers; the array is silently replaced by RRFRanker()
const chained = await client.hybridSearch({
  collection_name: 'docs',
  data: [denseReq, sparseReq],
  rerank: [WeightedRanker([0.7, 0.3]), RRFRanker()], // NOT allowed
  limit: 10,
});

// CORRECT: use exactly one reranker
const reranked = await client.hybridSearch({
  collection_name: 'docs',
  data: [denseReq, sparseReq],
  rerank: WeightedRanker([0.7, 0.3]), // One reranker only
  limit: 10,
});
```

5. To search multiple vector fields, put one search request per vector field in the `data` array of `hybridSearch()`.

6. Search iterators support basic ANN search only. They do NOT support hybrid search. `client.searchIterator()` does not reject hybrid search requests: the iterator ends without returning any batch.

```javascript
// WRONG: search iterators do not support hybrid search
const hybridIterator = await client.searchIterator({
  collection_name: 'docs',
  data: [denseReq, sparseReq], // NOT supported
  batchSize: 50,
});

// CORRECT: use search iterators with basic ANN search only
const iterator = await client.searchIterator({
  collection_name: 'docs',
  data: new Array(768).fill(0.1),
  anns_field: 'dense_vector',
  params: { metric_type: 'COSINE' },
  limit: 100,
  batchSize: 50,
  output_fields: ['id'],
});
for await (const batch of iterator) {
  for (const hit of batch) {
    console.log(`id: ${hit.id}, score: ${hit.score}`);
  }
}
```

7. For full-text search with BM25, define the BM25 function and the analyzer-enabled VarChar input field when you create the collection: pass the function in `functions`, set `enable_analyzer: true` on the input field, and index the `SparseFloatVector` output field with metric type `BM25`. Do not plan to add BM25 later: `addFunctionField()` returns an error status unless the server runs Milvus 3.0 or later with Storage V3 (`common.storage.useLoonFFI`, disabled by default), schema version compaction, and storage version compaction enabled.

8. ALWAYS call methods directly on `MilvusClient`. NEVER use `client.collectionManager`, `client.dataManager`, `client.indexManager`, or `client.partitionManager`: these manager objects do not exist on `MilvusClient`.

## Decision guide

| Scenario | Search type | When to use |
|---|---|---|
| Find similar items by a single vector | Basic ANN search | Default. Use `client.search()` with one vector field in `anns_field`. |
| Combine dense + sparse vectors | Hybrid search | When you have both semantic (dense) and lexical (sparse/BM25) signals. Use `client.hybridSearch()`. |
| Filter results by metadata | Filtered search | Add `filter` to any search type. Example: `filter: 'category == "electronics"'` |
| Keyword matching on text | Full-text search | When you need BM25-based keyword search. Requires a BM25 function defined at collection creation. Pass the query text as `data`. |
| Exact phrase matching | Phrase match | Use a `PHRASE_MATCH(text, "your phrase")` filter expression. `TEXT_MATCH` matches documents that contain any of the terms, not the phrase. Requires a VarChar field created with `enable_analyzer` and `enable_match`. |
| Retrieve by primary key | Primary key search | Use `client.get()` with `ids` to retrieve entities by exact primary key. |
| Iterate over large result sets | Search iterator | Use `client.searchIterator()` for basic ANN search only. NOT supported for hybrid search. |

## Complete example: basic ANN search

```javascript
import { MilvusClient, ErrorCode } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'YOUR_MILVUS_URI',
  token: 'YOUR_MILVUS_TOKEN',
});

// Ensure collection is loaded
await client.loadCollection({ collection_name: 'my_collection' });

// Search
const res = await client.search({
  collection_name: 'my_collection',
  data: new Array(768).fill(0.1), // Query vector
  anns_field: 'dense_vector',
  limit: 10,
  output_fields: ['id', 'title', 'category'], // List the primary key to read hit.id
  metric_type: 'COSINE',
});
if (res.status.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Search failed: ${res.status.reason}`);
}

// One query vector: res.results is a flat array of hits
for (const hit of res.results) {
  console.log(`id: ${hit.id}, score: ${hit.score.toFixed(4)}`);
  console.log(`  title: ${hit.title}`);
}
```

## Complete example: filtered search

```javascript
const res = await client.search({
  collection_name: 'my_collection',
  data: new Array(768).fill(0.1),
  anns_field: 'dense_vector',
  limit: 10,
  output_fields: ['title', 'price'],
  filter: 'category == "electronics" and price < 100.0',
});
```

## Complete example: hybrid search (dense + sparse)

```javascript
import { MilvusClient, ErrorCode, WeightedRanker } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'YOUR_MILVUS_URI',
  token: 'YOUR_MILVUS_TOKEN',
});

await client.loadCollection({ collection_name: 'my_collection' });

// One search request per vector field, each with exactly one query vector;
// limit in a request sets how many candidates that request returns
const denseReq = {
  data: new Array(768).fill(0.1),
  anns_field: 'dense_vector',
  params: { metric_type: 'COSINE' },
  limit: 20,
};

const sparseReq = {
  data: { 1: 0.5, 100: 0.3, 500: 0.8 }, // Sparse vector
  anns_field: 'sparse_vector',
  params: { metric_type: 'IP' },
  limit: 20,
};

// Combine with exactly one reranker
const res = await client.hybridSearch({
  collection_name: 'my_collection',
  data: [denseReq, sparseReq],
  rerank: WeightedRanker([0.7, 0.3]), // 70% dense, 30% sparse
  limit: 10,
  output_fields: ['id', 'title', 'text'],
});
if (res.status.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Hybrid search failed: ${res.status.reason}`);
}

for (const hit of res.results) {
  console.log(`id: ${hit.id}, score: ${hit.score.toFixed(4)}`);
}
```

## Complete example: full-text search with BM25

Prerequisites: The collection MUST have been created with a BM25 function whose input is a VarChar field with `enable_analyzer: true` and whose output is a `SparseFloatVector` field indexed with metric type `BM25`.

```javascript
import { MilvusClient, ErrorCode } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'YOUR_MILVUS_URI',
  token: 'YOUR_MILVUS_TOKEN',
});

await client.loadCollection({ collection_name: 'documents' });

// Full-text search using the BM25-indexed sparse vector field
const res = await client.search({
  collection_name: 'documents',
  data: 'machine learning applications', // Text query, not a vector
  anns_field: 'sparse_vector', // The BM25 output field
  limit: 10,
  output_fields: ['id', 'text'],
});
if (res.status.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Full-text search failed: ${res.status.reason}`);
}

for (const hit of res.results) {
  console.log(`id: ${hit.id}, score: ${hit.score.toFixed(4)}`);
  console.log(`  text: ${hit.text}`);
}
```

## Complete example: hybrid search combining dense + BM25

```javascript
import { MilvusClient, RRFRanker } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'YOUR_MILVUS_URI',
  token: 'YOUR_MILVUS_TOKEN',
});

await client.loadCollection({ collection_name: 'documents' });

const queryEmbedding = new Array(768).fill(0.1); // Your embedding vector

// Dense vector search
const denseReq = {
  data: queryEmbedding,
  anns_field: 'dense_vector',
  params: { metric_type: 'COSINE' },
  limit: 20,
};

// BM25 full-text search
const sparseReq = {
  data: 'machine learning applications', // Text query
  anns_field: 'sparse_vector', // BM25 output field
  params: { metric_type: 'BM25' },
  limit: 20,
};

const res = await client.hybridSearch({
  collection_name: 'documents',
  data: [denseReq, sparseReq],
  rerank: RRFRanker(), // RRF works well for dense + sparse combination
  limit: 10,
  output_fields: ['text'],
});
```

## Verification checklist

Before finishing, verify:

- [ ] All code calls methods directly on `MilvusClient`, not on manager objects, and every call is awaited
- [ ] Collection is loaded before any search or query
- [ ] Index exists before loading the collection
- [ ] Code that searches right after an insert creates the collection with `consistency_level: 'Strong'`, and no `search()` or `hybridSearch()` call passes `ConsistencyLevelEnum.Strong`
- [ ] Every search checks `res.status.error_code` against `ErrorCode.SUCCESS` before reading `res.results`
- [ ] Every request in a hybrid search contains the same number of query vectors (exactly one per request for one query)
- [ ] Hybrid search passes exactly one reranker in `rerank`, not an array
- [ ] Search iterators are only used with basic ANN search, not hybrid search
- [ ] BM25 full-text search uses a collection with BM25 defined at creation time
- [ ] Filter expressions use the correct syntax (for example, `==` not `=`, and string values in quotes)
````
