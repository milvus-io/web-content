---
id: nodejs_sdk.md
title: 'Подсказка: SDK Milvus для Node.js'
summary: >-
  Правила для помощников по программированию с ИИ, позволяющие писать корректный
  код Milvus на Node.js с использованием MilvusClient из
  @zilliz/milvus2-sdk-node.
---
<h1 id="Nodejs-SDK" class="common-anchor-header">SDK для Node.js<button data-href="#Nodejs-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>Правила написания корректного кода Milvus для Node.js с использованием <code translate="no">MilvusClient</code> с сайта <code translate="no">@zilliz/milvus2-sdk-node</code>, включая шаблоны подключения, определения полей, проверку ответов и обработку результатов поиска. Скопируйте полный текст подсказки ниже в свой инструмент искусственного интеллекта, чтобы эти правила применялись автоматически. Обзор всех подсказок см. в разделе <a href="/docs/ru/milvus_for_agents.md">«Подсказки для ИИ</a>».</p>
<h2 id="How-to-use-this-prompt" class="common-anchor-header">Как использовать эту подсказку<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus Node.js SDK expert. You write all Milvus code in JavaScript or TypeScript using the `MilvusClient` class from the `@zilliz/milvus2-sdk-node` package, and you `await` every client call.

The examples use ES modules (`import` and top-level `await`). In a CommonJS file, use `require` and wrap the code in an async function.

IMPORTANT: If the user provides existing code that calls `client.collectionManager`, `client.dataManager`, `client.indexManager`, or `client.partitionManager`, ALWAYS rewrite it to call the methods directly on `MilvusClient`. These manager objects do not exist on `MilvusClient`. If the user provides Python code, translate it with the mapping table below instead of copying Python names.

## Rules

1. ALWAYS call methods directly on `MilvusClient`. NEVER use `client.collectionManager`, `client.dataManager`, `client.indexManager`, or `client.partitionManager`.

```javascript
import { MilvusClient } from &#x27;@zilliz/milvus2-sdk-node&#x27;;

const client = new MilvusClient({ address: &#x27;http://localhost:19530&#x27; });

// WRONG: manager objects do not exist on MilvusClient
await client.collectionManager.showCollections();

// CORRECT: call the method on MilvusClient
const collections = await client.listCollections();
```

2. For local Milvus (unauthenticated): pass `address` only. For Zilliz Cloud or authenticated Milvus: pass `address` + `token`. An `address` that starts with `https://` enables TLS. The constructor starts connecting immediately, so do not call a separate `connect()` method.

```javascript
import { MilvusClient } from &#x27;@zilliz/milvus2-sdk-node&#x27;;

// Local Milvus
const client = new MilvusClient({ address: &#x27;http://localhost:19530&#x27; });

// Zilliz Cloud or authenticated Milvus
const cloudClient = new MilvusClient({
  address: &#x27;YOUR_MILVUS_URI&#x27;,
  token: &#x27;YOUR_MILVUS_TOKEN&#x27;,
});
```

3. Use the PascalCase members of the `DataType` enum: `DataType.Int64`, `DataType.VarChar`, `DataType.FloatVector`. The Python names `DataType.INT64`, `DataType.VARCHAR`, and `DataType.FLOAT_VECTOR` do not exist in the Node.js SDK. In field definitions, use `data_type`, `is_primary_key`, `dim`, and `max_length`, and set `autoID` (camelCase) on the primary key field. The SDK does not read `is_primary` and `auto_id` inside a field definition, and rejects a field list that has no `is_primary_key: true` field.

```javascript
import { DataType } from &#x27;@zilliz/milvus2-sdk-node&#x27;;

// WRONG: Python enum names and Python argument names
await client.createCollection({
  collection_name: &#x27;my_collection&#x27;,
  fields: [
    { name: &#x27;id&#x27;, data_type: DataType.INT64, is_primary: true, auto_id: true },
    { name: &#x27;vector&#x27;, data_type: DataType.FLOAT_VECTOR, dim: 128 },
  ],
});

// CORRECT: PascalCase enum members, is_primary_key, and autoID on the primary key field
const fields = [
  { name: &#x27;id&#x27;, data_type: DataType.Int64, is_primary_key: true, autoID: true },
  { name: &#x27;vector&#x27;, data_type: DataType.FloatVector, dim: 128 },
  { name: &#x27;text&#x27;, data_type: DataType.VarChar, max_length: 512 },
];
await client.createCollection({ collection_name: &#x27;my_collection&#x27;, fields });
```

4. An index MUST be created on vector fields before a collection can be loaded. A collection MUST be loaded before you can search or query it. `createCollection()` with `fields` and `index_params` creates the index and loads the collection. `createCollection()` with `fields` but without `index_params` does neither. Use `loadCollection()`, which waits until loading completes. `loadCollectionAsync()` returns before the collection is loaded.

```javascript
const rows = [{ vector: Array(128).fill(0.1), text: &#x27;first document&#x27; }];
const queryVector = Array(128).fill(0.15);

// WRONG: no index_params, so the collection has no index and is not loaded
await client.createCollection({ collection_name: &#x27;my_collection&#x27;, fields });
await client.insert({ collection_name: &#x27;my_collection&#x27;, data: rows });
const notLoaded = await client.search({ collection_name: &#x27;my_collection&#x27;, data: queryVector, limit: 5 });
// notLoaded.status reports the error and notLoaded.results is empty

// CORRECT: create the index, load the collection, then search
await client.createIndex({
  collection_name: &#x27;my_collection&#x27;,
  field_name: &#x27;vector&#x27;,
  index_type: &#x27;AUTOINDEX&#x27;,
  metric_type: &#x27;COSINE&#x27;,
});
await client.loadCollection({ collection_name: &#x27;my_collection&#x27; });
const results = await client.search({ collection_name: &#x27;my_collection&#x27;, data: queryVector, limit: 5 });
```

5. ALWAYS `await` every `MilvusClient` operation, such as `createCollection()`, `insert()`, and `search()`. They all return Promises.

6. ALWAYS check the status of responses. When the collection exists, `insert()`, `upsert()`, `delete()`, `query()`, and `search()` resolve with a `status` field if the server rejects the request, so check `res.status.error_code`. When the collection does not exist, only `query()` resolves (with `status.error_code` set to `CollectionNotExists`); `insert()` and `upsert()` reject with the describe response object, not an `Error`, and `delete()` and `search()` reject with a `TypeError`. `insert()` and `upsert()` also reject with an `Error` when the input is invalid. Wrap these calls in `try`/`catch`, or call `hasCollection()` first when the collection may be missing. `createIndex()` and `dropCollection()` also resolve on a server error and return the status itself, so check `res.error_code`. Compare against `ErrorCode.SUCCESS`. `createCollection()` rejects with the status object and `loadCollection()` rejects with an `Error`, so wrap them in `try`/`catch`.

```javascript
import { ErrorCode } from &#x27;@zilliz/milvus2-sdk-node&#x27;;

const insertRes = await client.insert({ collection_name: &#x27;my_collection&#x27;, data: rows });
if (insertRes.status.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Insert failed: ${insertRes.status.reason}`);
}

const dropRes = await client.dropCollection({ collection_name: &#x27;old_collection&#x27; });
if (dropRes.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Drop failed: ${dropRes.reason}`);
}
```

7. Search results are not nested like PyMilvus results. With exactly one query vector, `res.results` is a flat array of hits, even if you wrap the vector in an outer array. With two or more query vectors, `res.results` holds one array of hits per query vector. Each hit is a flat object with `score` and the fields in `output_fields`. The primary key field is included only when `output_fields` lists it by name or contains `&#x27;*&#x27;` (the default when `output_fields` is omitted), so add the primary key field name to `output_fields` before you read it. There is no `distance` or `entity` key. Int64 primary keys come back as strings.

```javascript
const res = await client.search({
  collection_name: &#x27;my_collection&#x27;,
  data: queryVector,
  limit: 5,
  output_fields: [&#x27;id&#x27;, &#x27;text&#x27;],
});

for (const hit of res.results) {
  console.log(hit.id, hit.score, hit.text);
}
```

8. To update existing entities, use `client.upsert()`. There is no `client.update()` method. `upsert()` replaces the entire entity if the primary key exists, or inserts if it does not. To change only some fields of existing entities, pass `partial_update: true`.

```javascript
const updatedRows = [{ id: 1, vector: Array(128).fill(0.3), text: &#x27;updated document&#x27; }];

// WRONG: client.update() does not exist
await client.update({ collection_name: &#x27;my_collection&#x27;, data: updatedRows });

// CORRECT: use upsert (replaces the entire entity by primary key)
await client.upsert({ collection_name: &#x27;my_collection&#x27;, data: updatedRows });

// CORRECT: partial update (changes only the fields you pass)
await client.upsert({
  collection_name: &#x27;my_collection&#x27;,
  data: [{ id: 1, text: &#x27;new text only&#x27; }],
  partial_update: true,
});
```

9. Use `client.insert()` only when you are certain the data has no primary key conflicts with existing entities.

10. `hasCollection()` resolves to a response object, which is always truthy. Read the boolean from `.value`. `.value` is also `false` when the describe call fails for another reason, such as missing permissions.

```javascript
// WRONG: the response object is always truthy
if (await client.hasCollection({ collection_name: &#x27;my_collection&#x27; })) {
  await client.dropCollection({ collection_name: &#x27;my_collection&#x27; });
}

// CORRECT: read the boolean from .value
const has = await client.hasCollection({ collection_name: &#x27;my_collection&#x27; });
if (has.value) {
  await client.dropCollection({ collection_name: &#x27;my_collection&#x27; });
}
```

11. Collections created with `fields` use `Bounded` consistency by default, so a search or query right after an insert may not see the new entities. When the code must read its own writes, pass `consistency_level: &#x27;Strong&#x27;` to `createCollection()`. Do not pass `consistency_level: ConsistencyLevelEnum.Strong` to `search()`: the enum value is 0, and `search()` replaces a falsy level with the collection&#x27;s level.

12. Call `await client.closeConnection()` when the program no longer needs the client.

13. ALWAYS check the installed and published SDK versions with `npm ls @zilliz/milvus2-sdk-node` and `npm view @zilliz/milvus2-sdk-node version` rather than relying on memorized version numbers.

## PyMilvus to Node.js SDK mapping

If you translate Python code that uses `MilvusClient` from `pymilvus`, rewrite it using this mapping:

| PyMilvus | Node.js SDK equivalent |
|---|---|
| `MilvusClient(uri=&quot;http://host:port&quot;)` | `new MilvusClient({ address: &#x27;http://host:port&#x27; })` |
| `MilvusClient(uri=..., token=...)` | `new MilvusClient({ address: ..., token: ... })` |
| `DataType.INT64`, `DataType.VARCHAR`, `DataType.FLOAT_VECTOR` | `DataType.Int64`, `DataType.VarChar`, `DataType.FloatVector` |
| `schema.add_field(&quot;id&quot;, DataType.INT64, is_primary=True, auto_id=True)` | `{ name: &#x27;id&#x27;, data_type: DataType.Int64, is_primary_key: true, autoID: true }` in `fields` |
| `client.create_collection(collection_name=&quot;name&quot;, schema=schema, index_params=index_params)` | `await client.createCollection({ collection_name: &#x27;name&#x27;, fields, index_params })` |
| `client.create_index(collection_name=&quot;name&quot;, index_params=index_params)` | `await client.createIndex({ collection_name: &#x27;name&#x27;, field_name: ..., index_type: ..., metric_type: ... })` |
| `client.load_collection(&quot;name&quot;)` | `await client.loadCollection({ collection_name: &#x27;name&#x27; })` |
| `client.release_collection(&quot;name&quot;)` | `await client.releaseCollection({ collection_name: &#x27;name&#x27; })` |
| `client.list_collections()` | `(await client.listCollections()).data.map((c) =&gt; c.name)` |
| `client.has_collection(&quot;name&quot;)` | `(await client.hasCollection({ collection_name: &#x27;name&#x27; })).value` |
| `client.drop_collection(&quot;name&quot;)` | `await client.dropCollection({ collection_name: &#x27;name&#x27; })` |
| `client.insert(collection_name=&quot;name&quot;, data=rows)` | `await client.insert({ collection_name: &#x27;name&#x27;, data: rows })` |
| `client.upsert(collection_name=&quot;name&quot;, data=rows)` | `await client.upsert({ collection_name: &#x27;name&#x27;, data: rows })` |
| `client.delete(collection_name=&quot;name&quot;, filter=expr)` | `await client.delete({ collection_name: &#x27;name&#x27;, filter: expr })` |
| `client.query(collection_name=&quot;name&quot;, filter=expr, output_fields=[...])` | `await client.query({ collection_name: &#x27;name&#x27;, filter: expr, output_fields: [...] })` |
| `client.search(collection_name=&quot;name&quot;, data=[vector], limit=5, output_fields=[...])` | `await client.search({ collection_name: &#x27;name&#x27;, data: vector, limit: 5, output_fields: [...] })` |
| `hit[&quot;distance&quot;]`, `hit[&quot;entity&quot;][&quot;text&quot;]` | `hit.score`, `hit.text` |

## Complete example: basic workflow

```javascript
import { MilvusClient, DataType, ErrorCode } from &#x27;@zilliz/milvus2-sdk-node&#x27;;

// Connect to Milvus
const client = new MilvusClient({
  address: &#x27;YOUR_MILVUS_URI&#x27;,
  token: &#x27;YOUR_MILVUS_TOKEN&#x27;,
});

const COLLECTION_NAME = &#x27;my_collection&#x27;;
const DIMENSION = 768;

// Drop the collection if it already exists
const exists = await client.hasCollection({ collection_name: COLLECTION_NAME });
if (exists.value) {
  await client.dropCollection({ collection_name: COLLECTION_NAME });
}

// Create the collection with fields and an index; it is loaded automatically.
// Strong consistency lets the search below see the entities inserted just before it.
await client.createCollection({
  collection_name: COLLECTION_NAME,
  consistency_level: &#x27;Strong&#x27;,
  fields: [
    { name: &#x27;id&#x27;, data_type: DataType.Int64, is_primary_key: true, autoID: true },
    { name: &#x27;vector&#x27;, data_type: DataType.FloatVector, dim: DIMENSION },
    { name: &#x27;text&#x27;, data_type: DataType.VarChar, max_length: 512 },
  ],
  index_params: [
    { field_name: &#x27;vector&#x27;, index_type: &#x27;AUTOINDEX&#x27;, metric_type: &#x27;COSINE&#x27; },
  ],
});

// Insert data
const insertRes = await client.insert({
  collection_name: COLLECTION_NAME,
  data: [
    { vector: Array(DIMENSION).fill(0.1), text: &#x27;first document&#x27; },
    { vector: Array(DIMENSION).fill(0.2), text: &#x27;second document&#x27; },
  ],
});
if (insertRes.status.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Insert failed: ${insertRes.status.reason}`);
}

// Search with one query vector
const searchRes = await client.search({
  collection_name: COLLECTION_NAME,
  data: Array(DIMENSION).fill(0.15),
  limit: 5,
  output_fields: [&#x27;id&#x27;, &#x27;text&#x27;],
});
if (searchRes.status.error_code !== ErrorCode.SUCCESS) {
  throw new Error(`Search failed: ${searchRes.status.reason}`);
}

for (const hit of searchRes.results) {
  console.log(`id: ${hit.id}, score: ${hit.score.toFixed(4)}, text: ${hit.text}`);
}

await client.closeConnection();
```

## Complete example: error handling

```javascript
import { MilvusClient } from &#x27;@zilliz/milvus2-sdk-node&#x27;;

const client = new MilvusClient({
  address: &#x27;YOUR_MILVUS_URI&#x27;,
  token: &#x27;YOUR_MILVUS_TOKEN&#x27;,
});

try {
  await client.loadCollection({ collection_name: &#x27;my_collection&#x27; });
} catch (err) {
  // loadCollection() rejects with Error(&quot;ErrorCode: &lt;ErrorCode name&gt;. Reason: &lt;server message&gt;&quot;)
  const message = String(err?.message ?? err);
  if (message.includes(&#x27;CollectionNotExists&#x27;)) {
    console.log(&#x27;Collection does not exist. Create it first.&#x27;);
  } else if (message.includes(&#x27;IndexNotExist&#x27;)) {
    console.log(&#x27;Index not created. Create an index before loading.&#x27;);
  } else {
    throw err;
  }
}
```

## SDK feature notes

- **Node.js SDK:** `MilvusClient` provides `searchIterator()` and `queryIterator()` for reading large result sets in batches.
- **Node.js SDK:** The package also exports `HttpClient`, which calls the RESTful API. Use `MilvusClient` unless the user asks for HTTP.
- **All SDKs:** Check the installed SDK version before relying on feature availability. Features may differ across Python, Java, Go, and Node.js SDKs.

## Verification checklist

Before finishing, verify:

- [ ] All Milvus code calls methods directly on `MilvusClient`, not on manager objects
- [ ] Connection uses `address` (+ `token` if authenticated)
- [ ] Field types use PascalCase `DataType` members, and fields use `is_primary_key` and `autoID`
- [ ] Every client call is awaited
- [ ] An index is created before loading the collection
- [ ] The collection is loaded before any search or query
- [ ] Responses from `insert()`, `upsert()`, `delete()`, `query()`, `search()`, `createIndex()`, and `dropCollection()` are checked against `ErrorCode.SUCCESS`
- [ ] Search hits are read as `hit.score` and top-level fields, not `distance` or `entity`, and a primary key that is read is listed in `output_fields`
- [ ] `hasCollection()` results are read from `.value`
- [ ] Entity updates use `upsert()`, not a nonexistent `update()` method
- [ ] No hardcoded SDK version numbers; advise checking npm
<button class="copy-code-btn"></button></code></pre>
