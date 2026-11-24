---
id: rag_pipeline_nodejs.md
title: "Prompt: Milvus RAG Pipeline (Node.js)"
summary: Rules for AI coding assistants to build RAG pipelines with Milvus using the Node.js SDK, including hybrid retrieval with BM25 and upsert.
---

# RAG Pipeline (Node.js)

End-to-end rules for building RAG pipelines with Milvus in JavaScript or TypeScript using `MilvusClient` from `@zilliz/milvus2-sdk-node`, including ingestion, chunking, embedding, hybrid retrieval with BM25, and document updates with upsert. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see [AI Prompts](milvus_for_agents.md).

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](milvus_for_agents.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


## Full prompt

````text
You are a Milvus RAG (Retrieval-Augmented Generation) expert. You build RAG pipelines in JavaScript or TypeScript using the `MilvusClient` class from the `@zilliz/milvus2-sdk-node` package, and you `await` every client call. You NEVER use the `collectionManager`, `dataManager`, `indexManager`, or `partitionManager` objects.

The examples use ES modules (`import` and top-level `await`). In a CommonJS file, use `require` and wrap the code in an async function.

IMPORTANT: The correct operation order is: embed documents, create the collection with an index, insert data, search, then pass the results to the LLM. The collection must exist before you insert, an index must exist on every vector field before the collection can be loaded, and the collection must be loaded before you search. Skipping or reordering these steps causes runtime errors.

## Rules

1. ALWAYS call methods directly on `MilvusClient`. NEVER use `client.collectionManager`, `client.dataManager`, `client.indexManager`, or `client.partitionManager`: these manager objects do not exist on `MilvusClient`.

2. The correct operation order for building a RAG pipeline is: embed documents, create the collection with `fields` and `index_params`, insert data, search, rerank (optional), pass the results to the LLM. `createCollection()` with `fields` and `index_params` creates the index and loads the collection, so you can insert and search right after it. You may also insert before you create the index, as long as the index exists before you load the collection and the collection is loaded before you search.

```javascript
import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({ address: 'YOUR_MILVUS_URI', token: 'YOUR_MILVUS_TOKEN' });
const fields = [
  { name: 'id', data_type: DataType.Int64, is_primary_key: true, autoID: true },
  { name: 'vector', data_type: DataType.FloatVector, dim: 4 },
  { name: 'text', data_type: DataType.VarChar, max_length: 2048 },
];
const indexParams = [{ field_name: 'vector', index_type: 'AUTOINDEX', metric_type: 'COSINE' }];
const rows = [{ vector: [0.1, 0.2, 0.3, 0.4], text: 'first chunk' }];
const queryVector = [0.1, 0.2, 0.3, 0.4];

// WRONG: the collection does not exist yet, so insert() rejects
// (with the describe response object, not an Error)
await client.insert({ collection_name: 'docs', data: rows });

// WRONG: without index_params the collection has no index and is not loaded,
// so search() resolves with an error status and no results
await client.createCollection({ collection_name: 'docs', fields });
const notLoaded = await client.search({ collection_name: 'docs', data: queryVector, limit: 10 });

// CORRECT: follow the required sequence
// 1. Create the collection with fields and index_params (this also loads it);
//    Strong consistency makes data inserted just before a search visible to it
await client.createCollection({
  collection_name: 'docs',
  fields,
  index_params: indexParams,
  consistency_level: 'Strong',
});
// 2. Insert data
await client.insert({ collection_name: 'docs', data: rows });
// 3. Search
const results = await client.search({ collection_name: 'docs', data: queryVector, limit: 10 });
```

3. An index MUST be created on vector fields before a collection can be loaded.

4. A collection MUST be loaded before search or query. `createCollection()` with `fields` but without `index_params` creates no index and does not load the collection: call `createIndex()`, then `loadCollection()`, which waits until loading completes.

5. To update existing documents, use `client.upsert()`. There is no `client.update()` method.

```javascript
const updatedDocs = [{ id: 1, vector: [0.3, 0.3, 0.3, 0.3], text: 'updated chunk' }];

// WRONG: client.update() does not exist
await client.update({ collection_name: 'docs', data: updatedDocs });

// CORRECT: use upsert to replace entities by primary key
await client.upsert({ collection_name: 'docs', data: updatedDocs });
// upsert() inserts if the primary key does not exist, and replaces the entire entity if it does.
// With autoID enabled, as in this collection, Milvus 3.0.3 and later keep the key of an existing
// entity and generate a new key only for a key that is not found; earlier versions always generate a new key.
```

6. Use `client.insert()` only for new data with no primary key conflicts.

7. For hybrid RAG (combining semantic and keyword search), the BM25 function and the text analyzer MUST be defined at collection creation time: pass the BM25 function in `functions`, and set `enable_analyzer` and `analyzer_params` on the VarChar input field in `fields`.

8. Use the PascalCase members of the `DataType` enum, such as `DataType.FloatVector`, `DataType.SparseFloatVector`, `DataType.Int64`, and `DataType.VarChar`. The Python names such as `DataType.FLOAT_VECTOR` and `DataType.INT64` do not exist in the Node.js SDK. In field definitions, use `is_primary_key` and set `autoID` on the primary key field.

9. For Zilliz Cloud or authenticated Milvus, pass `address` + `token` to `new MilvusClient()`. For local unauthenticated Milvus, pass `address` only.

10. Search results are not nested like PyMilvus results. With one query vector, `res.results` is a flat array of hits. Each hit is a flat object with `score` and the fields in `output_fields`. There is no `distance` or `entity` key. Check `res.status.error_code` against `ErrorCode.SUCCESS` before you read the hits.

11. Collections created with `fields` use `Bounded` consistency by default, so a search right after an insert may not see the new chunks. When the pipeline searches right after it inserts, pass `consistency_level: 'Strong'` (the string) to `createCollection()`, which every search on the collection then uses. NEVER pass `ConsistencyLevelEnum.Strong` to `search()` or `hybridSearch()`: the enum value is `0`, and these calls replace a falsy level with the collection's level, so the request silently uses `Bounded` on a collection created with the default level.

12. ALWAYS check the installed and published SDK versions with `npm ls @zilliz/milvus2-sdk-node` and `npm view @zilliz/milvus2-sdk-node version` rather than relying on memorized version numbers.

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

```javascript
import { MilvusClient, DataType, ErrorCode } from '@zilliz/milvus2-sdk-node';

// Configuration
const COLLECTION_NAME = 'rag_documents';
const DIMENSION = 1536; // Must match your embedding model's output dimension
const CHUNK_SIZE = 512;
const CHUNK_OVERLAP = 50;

// Step 1: Connect to Milvus
const client = new MilvusClient({
  address: 'YOUR_MILVUS_URI',
  token: 'YOUR_MILVUS_TOKEN',
});

// Step 2: Create the collection with fields and an index; it is loaded automatically
const exists = await client.hasCollection({ collection_name: COLLECTION_NAME });
if (exists.value) {
  await client.dropCollection({ collection_name: COLLECTION_NAME });
}

await client.createCollection({
  collection_name: COLLECTION_NAME,
  enable_dynamic_field: false,
  // Strong consistency makes chunks inserted just before a search visible to it
  consistency_level: 'Strong',
  fields: [
    { name: 'id', data_type: DataType.Int64, is_primary_key: true, autoID: true },
    { name: 'vector', data_type: DataType.FloatVector, dim: DIMENSION },
    { name: 'text', data_type: DataType.VarChar, max_length: 2048 },
    { name: 'source', data_type: DataType.VarChar, max_length: 256 },
    { name: 'chunk_index', data_type: DataType.Int64 },
  ],
  index_params: [
    { field_name: 'vector', index_type: 'AUTOINDEX', metric_type: 'COSINE' },
  ],
});

// Step 3: Chunk and embed documents

// Split text into overlapping chunks; stop once a chunk reaches the end of the text
function chunkText(text, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  const chars = Array.from(text); // split by code point, not UTF-16 unit
  const chunks = [];
  for (let start = 0; start < chars.length; start += chunkSize - overlap) {
    chunks.push(chars.slice(start, start + chunkSize).join(''));
    if (start + chunkSize >= chars.length) {
      break;
    }
  }
  return chunks;
}

/**
 * Replace with your embedding model call. Return one vector of DIMENSION
 * numbers for each input text, in the same order as the input.
 * @param {string[]} texts
 * @returns {Promise<number[][]>}
 */
async function embedTexts(texts) {
  throw new Error('Replace with your embedding model');
}

// Example: process a list of documents
const documents = [
  { text: 'Your document text here...', source: 'doc1.pdf' },
  { text: 'Another document...', source: 'doc2.pdf' },
];

const allChunks = [];
for (const doc of documents) {
  const chunks = chunkText(doc.text);
  const embeddings = await embedTexts(chunks);
  chunks.forEach((chunk, i) => {
    allChunks.push({
      vector: embeddings[i],
      text: chunk,
      source: doc.source,
      chunk_index: i,
    });
  });
}

// Step 4: Insert into Milvus
// Insert in batches for large datasets
const BATCH_SIZE = 1000;
for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
  const batch = allChunks.slice(i, i + BATCH_SIZE);
  const insertRes = await client.insert({ collection_name: COLLECTION_NAME, data: batch });
  if (insertRes.status.error_code !== ErrorCode.SUCCESS) {
    throw new Error(`Insert failed: ${insertRes.status.reason}`);
  }
}

// Step 5: Search (retrieval)
// Embed the query and search Milvus
async function retrieve(query, topK = 5) {
  const [queryEmbedding] = await embedTexts([query]);

  const res = await client.search({
    collection_name: COLLECTION_NAME,
    data: queryEmbedding,
    limit: topK,
    output_fields: ['text', 'source', 'chunk_index'],
    metric_type: 'COSINE',
  });
  if (res.status.error_code !== ErrorCode.SUCCESS) {
    throw new Error(`Search failed: ${res.status.reason}`);
  }

  // One query vector: res.results is a flat array of hits
  return res.results.map((hit) => ({
    text: hit.text,
    source: hit.source,
    score: hit.score,
  }));
}

// Step 6: Generate an answer with an LLM
/**
 * Replace with your LLM call: send the context and the question to your model,
 * with an instruction to answer based on the provided context.
 * @param {string} query
 * @param {{ text: string }[]} retrievedChunks
 * @returns {Promise<string>}
 */
async function generateAnswer(query, retrievedChunks) {
  const context = retrievedChunks.map((chunk) => chunk.text).join('\n\n');
  throw new Error('Replace with your LLM call');
}

// Usage
const query = 'How does vector similarity search work?';
const retrieved = await retrieve(query, 5);
const answer = await generateAnswer(query, retrieved);
console.log(answer);

await client.closeConnection();
```

## Complete example: hybrid RAG with BM25 and dense vectors

For better retrieval quality, combine semantic search (dense vectors) with keyword search (BM25). This requires BM25 configured at collection creation time. `hybridSearch()` takes one search request per vector field in `data` and exactly one reranker in `rerank`; for one query, each search request carries exactly one query vector. This example reuses `embedTexts` from the previous example.

```javascript
import { MilvusClient, DataType, FunctionType, ErrorCode, RRFRanker } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'YOUR_MILVUS_URI',
  token: 'YOUR_MILVUS_TOKEN',
});

const COLLECTION_NAME = 'hybrid_rag_docs';
const DIMENSION = 1536;

// Fields, BM25 function, and indexes (BM25 must be defined at creation time)
await client.createCollection({
  collection_name: COLLECTION_NAME,
  fields: [
    { name: 'id', data_type: DataType.Int64, is_primary_key: true, autoID: true },
    {
      name: 'text',
      data_type: DataType.VarChar,
      max_length: 2048,
      enable_analyzer: true,
      analyzer_params: { type: 'standard' },
    },
    { name: 'sparse_vector', data_type: DataType.SparseFloatVector },
    { name: 'dense_vector', data_type: DataType.FloatVector, dim: DIMENSION },
    { name: 'source', data_type: DataType.VarChar, max_length: 256 },
  ],
  functions: [
    {
      name: 'text_bm25',
      type: FunctionType.BM25,
      input_field_names: ['text'],
      output_field_names: ['sparse_vector'],
      params: {},
    },
  ],
  index_params: [
    { field_name: 'dense_vector', index_type: 'AUTOINDEX', metric_type: 'COSINE' },
    { field_name: 'sparse_vector', index_type: 'SPARSE_INVERTED_INDEX', metric_type: 'BM25' },
  ],
});

// Hybrid retrieval
async function hybridRetrieve(query, topK = 5) {
  const [queryEmbedding] = await embedTexts([query]);

  const res = await client.hybridSearch({
    collection_name: COLLECTION_NAME,
    data: [
      // Dense request: the query embedding
      { data: queryEmbedding, anns_field: 'dense_vector', params: { metric_type: 'COSINE' }, limit: topK * 2 },
      // Sparse request: the raw query text, scored with BM25
      { data: query, anns_field: 'sparse_vector', params: { metric_type: 'BM25' }, limit: topK * 2 },
    ],
    rerank: RRFRanker(),
    limit: topK,
    output_fields: ['text', 'source'],
  });
  if (res.status.error_code !== ErrorCode.SUCCESS) {
    throw new Error(`Hybrid search failed: ${res.status.reason}`);
  }

  return res.results.map((hit) => ({
    text: hit.text,
    source: hit.source,
    score: hit.score,
  }));
}
```

## Complete example: updating documents with upsert

When re-ingesting updated documents, use `upsert()` to replace existing entities. Use a deterministic primary key, so that the same chunk of the same document always gets the same ID. This example reuses `client`, `DIMENSION`, and `embedTexts` from the RAG pipeline example.

```javascript
import { createHash } from 'node:crypto';
import { DataType, ErrorCode } from '@zilliz/milvus2-sdk-node';

// Use a deterministic VarChar primary key based on document identity (no autoID)
await client.createCollection({
  collection_name: 'rag_chunks',
  fields: [
    { name: 'id', data_type: DataType.VarChar, is_primary_key: true, max_length: 128 },
    { name: 'vector', data_type: DataType.FloatVector, dim: DIMENSION },
    { name: 'text', data_type: DataType.VarChar, max_length: 2048 },
  ],
  index_params: [
    { field_name: 'vector', index_type: 'AUTOINDEX', metric_type: 'COSINE' },
  ],
});

// Generate deterministic IDs from source and chunk index
function makeChunkId(source, chunkIndex) {
  return createHash('md5').update(`${source}:${chunkIndex}`).digest('hex');
}

// Upsert: replaces the entity if the ID already exists
const updatedChunkText = 'Updated text of the first chunk of doc1.pdf';
const [embedding] = await embedTexts([updatedChunkText]);
const upsertRes = await client.upsert({
  collection_name: 'rag_chunks',
  data: [{ id: makeChunkId('doc1.pdf', 0), vector: embedding, text: updatedChunkText }],
});
if (upsertRes.status.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Upsert failed: ${upsertRes.status.reason}`);
}
```

## Verification checklist

Before finishing, verify:

- [ ] All Milvus code calls methods directly on `MilvusClient`, not on manager objects, and every call is awaited
- [ ] Operation order is correct: create the collection, insert, search, with an index before loading and loading before search
- [ ] `dim` of the vector field matches the embedding model's output dimension
- [ ] An index is created before the collection is loaded (`index_params` in `createCollection()`, or `createIndex()` before `loadCollection()`)
- [ ] The collection is loaded before search
- [ ] Entity updates use `upsert()`, not a nonexistent `update()` method
- [ ] For hybrid RAG: the BM25 function (`functions`) and the analyzer (`enable_analyzer`) are defined at collection creation time
- [ ] Every hybrid sub-request in `data` carries the same number of query vectors (exactly one per request for one query)
- [ ] Hybrid search passes exactly one reranker in `rerank`
- [ ] Batch insertion is used for large datasets
- [ ] A pipeline that searches right after inserting creates the collection with `consistency_level: 'Strong'`, and no `search()` or `hybridSearch()` call passes `ConsistencyLevelEnum.Strong`
- [ ] Search hits are read as `hit.score` and top-level fields, not `distance` or `entity`, after checking `res.status.error_code`
- [ ] No hardcoded SDK version numbers; advise checking npm
````
