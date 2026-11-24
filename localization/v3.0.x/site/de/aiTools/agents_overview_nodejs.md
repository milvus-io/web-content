---
id: agents_overview_nodejs.md
title: AGENTS.md für Milvus (Node.js)
summary: >-
  Regeln und Muster für KI-Programmieragenten, die mithilfe des Node.js-SDK Code
  für die Milvus-Vektordatenbank generieren, überprüfen oder debuggen.
---
<h1 id="AGENTSmd-Nodejs" class="common-anchor-header">AGENTS.md (Node.js)<button data-href="#AGENTSmd-Nodejs" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ist eine Open-Source-Vektordatenbank für Ähnlichkeitssuche, hybride Suche und RAG. In JavaScript oder TypeScript interagieren Sie mit ihr über „ <code translate="no">MilvusClient</code> “ aus dem Paket „ <code translate="no">@zilliz/milvus2-sdk-node</code> “. Kopieren Sie den vollständigen Befehl unten in Ihr KI-Tool, um diese Regeln automatisch anzuwenden. Detaillierte, aufgabenbezogene Befehle finden Sie unter <a href="/docs/de/milvus_for_agents.md">„KI-Befehle</a>“.</p>
<h2 id="How-to-use-this-prompt" class="common-anchor-header">So verwenden Sie diesen Befehl<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
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
<li><strong>Kopieren Sie</strong> den vollständigen Befehl aus dem Abschnitt <a href="#full-prompt">„Vollständiger Befehl</a> “ weiter unten.</li>
<li><strong>Speichern Sie</strong> ihn an dem Ort, den Ihr KI-Tool erwartet – Details zur Platzierung finden Sie in der <a href="/docs/de/milvus_for_agents.md">Umgebungstabelle</a>.</li>
<li>Ihr KI-Assistent wendet diese Regeln automatisch an, wenn er Milvus-Code generiert oder überprüft.</li>
</ol>
<p>Für <strong>Cursor</strong> -Nutzer: Kopieren Sie den Befehl aus dem Abschnitt <a href="#full-prompt">„Vollständiger Befehl</a> “ und speichern Sie ihn in Ihrem Projekt unter „ <code translate="no">.cursor/rules/</code> “.</p>
<h2 id="Full-prompt" class="common-anchor-header">Vollständige Eingabeaufforderung<button data-href="#Full-prompt" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text"># AGENTS.md for Milvus (Node.js)

Milvus is an open-source vector database for similarity search, hybrid search, and RAG. You interact with it from JavaScript or TypeScript through the `MilvusClient` class of the `@zilliz/milvus2-sdk-node` package, and you `await` every client call.

Use these rules whenever you generate, review, or debug Node.js code that connects to Milvus or Zilliz Cloud. The examples use ES modules (`import` and top-level `await`); in a CommonJS file, use `require` and wrap the code in an async function. Check the installed and published SDK versions with `npm ls @zilliz/milvus2-sdk-node` and `npm view @zilliz/milvus2-sdk-node version` instead of relying on memorized version numbers.

## Client &amp; connection

1. **CRITICAL: Always call methods directly on `MilvusClient`.** Never use `client.collectionManager`, `client.dataManager`, `client.indexManager`, or `client.partitionManager`: these manager objects do not exist on `MilvusClient`. If the user provides code that uses them, rewrite it to call `MilvusClient` methods such as `createCollection()`, `insert()`, and `search()`.

2. **Connection patterns.** Milvus without authentication: `address` only. Zilliz Cloud or Milvus with authentication: `address` + `token`.

```javascript
import { MilvusClient } from &#x27;@zilliz/milvus2-sdk-node&#x27;;

// Milvus without authentication
const client = new MilvusClient({ address: &#x27;YOUR_MILVUS_URI&#x27; });

// Zilliz Cloud or Milvus with authentication
const authClient = new MilvusClient({ address: &#x27;YOUR_MILVUS_URI&#x27;, token: &#x27;YOUR_MILVUS_TOKEN&#x27; });
```

## Schema &amp; data

3. **CRITICAL: Use the `DataType` enum, not strings.** Write `DataType.FloatVector`, not `&#x27;FLOAT_VECTOR&#x27;`. Enum members are PascalCase: `DataType.FLOAT_VECTOR` is `undefined`, and `createCollection()` throws &quot;The data_type is not supported&quot; for the string `&#x27;FLOAT_VECTOR&#x27;`.

4. **CRITICAL: Schema changes are limited.** On Milvus 2.5.x and earlier, the schema is immutable: drop and recreate the collection to change it. On Milvus 2.6 and later, `addCollectionField()` adds a field, and the field must set `nullable: true`; a field with only a `default_value` is rejected. On Milvus 3.0 and later, `dropCollectionField()` drops a field, except the primary key, the partition key, the clustering key, the last vector field, the dynamic field, system fields, fields that a function reads or generates, and the field that the collection&#x27;s `ttl_field` property names. `alterCollectionFieldProperties()` changes field properties such as `max_length`. You cannot change the data type of an existing field: create a new collection and migrate the data.

5. **Primary keys: `DataType.Int64` or `DataType.VarChar` only.** Composite primary keys are not supported. Primary keys must be unique across the entire collection, including across partitions.

6. **Use `upsert()` to update entities.** There is no `client.update()` method. By default, `upsert()` replaces the entire entity if the primary key exists, or inserts a new one. When the primary key field sets `autoID: true`, still pass the primary key: Milvus 3.0.3 and later keep the key of an existing entity and generate a new key only for rows whose key is not found, which requires the collection to be loaded; earlier versions give every upserted entity a new key generated by the server. To change only some fields of existing entities, pass `partial_update: true`. Use `insert()` only when you are certain there are no primary key conflicts.

7. **Define BM25 at collection creation time.** Pass the BM25 function in `functions` of `createCollection()`, with a `DataType.VarChar` input field that sets `enable_analyzer: true` and a `DataType.SparseFloatVector` output field. Adding a BM25 function field to an existing collection with `addFunctionField()` needs Milvus 3.0 or later with Storage V3 (`common.storage.useLoonFFI`, disabled by default), schema version compaction, and storage version compaction enabled; otherwise the server rejects the request.

## Index &amp; loading

8. **CRITICAL: Index before load, load before search.** A vector field must have an index before the collection can be loaded: without one, `loadCollection()` rejects with an `Error` whose message contains `IndexNotExist`. A collection must be loaded before any search or query: a search on a collection that is not loaded resolves with a failed `status`, so check `res.status.error_code`. Shortcut: pass both `fields` and `index_params` to `createCollection()`, and the SDK creates the index and loads the collection. Otherwise call `createIndex()` and then `loadCollection()`.

9. **Start with `AUTOINDEX`.** Use `index_type: &#x27;AUTOINDEX&#x27;` unless you have specific requirements. Choose HNSW for high recall, DiskANN for larger-than-RAM datasets, IVF_FLAT for memory-constrained scenarios.

## Search

10. **CRITICAL: Every `hybridSearch()` sub-request must carry the same number of query vectors.** For one query, put exactly one vector in the `data` of each sub-request, for example `{ data: queryVector, anns_field: &#x27;vector&#x27; }`. The server rejects sub-requests with different numbers of vectors (&quot;sub search request nq should be the same&quot;), and the call resolves with a failed `status`. With more than one vector per sub-request, `res.results` holds one array of hits per query vector instead of a flat array.

11. **One ranker per `hybridSearch()` call.** Pass exactly one reranker in `rerank`, such as `RRFRanker(60)` or `WeightedRanker([0.7, 0.3])`. You cannot chain `WeightedRanker` and `RRFRanker` together. Pick one.

## Quick start

```javascript
import { MilvusClient, DataType, ErrorCode } from &#x27;@zilliz/milvus2-sdk-node&#x27;;

const client = new MilvusClient({ address: &#x27;YOUR_MILVUS_URI&#x27;, token: &#x27;YOUR_MILVUS_TOKEN&#x27; });

// 1. Define fields
const fields = [
  { name: &#x27;id&#x27;, data_type: DataType.Int64, is_primary_key: true, autoID: true },
  { name: &#x27;vector&#x27;, data_type: DataType.FloatVector, dim: 768 },
  { name: &#x27;text&#x27;, data_type: DataType.VarChar, max_length: 512 },
];

// 2. Define index
const index_params = [{ field_name: &#x27;vector&#x27;, index_type: &#x27;AUTOINDEX&#x27;, metric_type: &#x27;COSINE&#x27; }];

// 3. Create collection (creates the index and loads the collection; rejects on failure);
//    Strong consistency lets the search below see the entities inserted just before it
await client.createCollection({
  collection_name: &#x27;docs&#x27;,
  fields,
  index_params,
  consistency_level: &#x27;Strong&#x27;,
});

// 4. Insert
const insertRes = await client.insert({
  collection_name: &#x27;docs&#x27;,
  data: [
    { vector: Array(768).fill(0.1), text: &#x27;first doc&#x27; },
    { vector: Array(768).fill(0.2), text: &#x27;second doc&#x27; },
  ],
});
if (insertRes.status.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Insert failed: ${insertRes.status.reason}`);
}

// 5. Search; each hit holds `score` and the fields listed in output_fields,
//    so list the primary key to read hit.id
const searchRes = await client.search({
  collection_name: &#x27;docs&#x27;,
  data: Array(768).fill(0.15),
  limit: 5,
  output_fields: [&#x27;id&#x27;, &#x27;text&#x27;],
});
if (searchRes.status.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Search failed: ${searchRes.status.reason}`);
}
for (const hit of searchRes.results) {
  console.log(hit.id, hit.score, hit.text);
}

await client.closeConnection();
```

## Common mistakes

| Mistake | Fix |
|---|---|
| Using `client.collectionManager` or another manager object | Call the method directly on `MilvusClient` |
| Calling `client.search()` before loading | Pass `index_params` to `createCollection()`, or call `createIndex()` then `loadCollection()` first |
| Different numbers of vectors across `hybridSearch()` sub-requests | Give every sub-request the same number of vectors; one vector each for one query |
| Calling `client.update()` | Use `client.upsert()` |
| Adding BM25 after the collection exists | Define the BM25 function in `functions` and `enable_analyzer: true` at `createCollection()` time |
| String field types (`&#x27;FLOAT_VECTOR&#x27;`) or `DataType.FLOAT_VECTOR` | Use `DataType.FloatVector` from the enum |
| Passing `consistency_level: ConsistencyLevelEnum.Strong` to `search()` to read entities inserted just before | Pass `consistency_level: &#x27;Strong&#x27;` to `createCollection()`; the enum value is `0`, and `search()` replaces a falsy level with the collection&#x27;s level |
<button class="copy-code-btn"></button></code></pre>
