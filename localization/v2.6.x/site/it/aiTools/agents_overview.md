---
id: agents_overview.md
title: AGENTI.md per Milvus
summary: >-
  Regole e modelli per agenti di codifica AI che generano, revisionano o
  debuggano il codice del database vettoriale Milvus usando PyMilvus.
---
<h2 id="How-to-use-this-prompt" class="common-anchor-header">Come utilizzare questo prompt<button data-href="#How-to-use-this-prompt" class="anchor-icon" translate="no">
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
<li><strong>Copiare</strong> il prompt completo dalla sezione <a href="#full-prompt">prompt completo</a> qui sotto.</li>
<li><strong>Salvarlo</strong> nella posizione prevista dal proprio strumento di IA (vedere la <a href="/docs/it/milvus_for_agents.md">tabella degli ambienti</a> per i dettagli sul posizionamento).</li>
<li>L'assistente AI applicherà automaticamente queste regole quando genererà o revisionerà il codice Milvus.</li>
</ol>
<p>Per gli utenti del <strong>Cursore</strong>: copiare il prompt dalla sezione <a href="#full-prompt">prompt completo</a> e salvarlo in <code translate="no">.cursor/rules/</code> nel progetto.</p>
<h1 id="AGENTSmd--Milvus" class="common-anchor-header">AGENTS.md - Milvus<button data-href="#AGENTSmd--Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus è un database vettoriale open-source per la ricerca di similarità, la ricerca ibrida e il RAG. Si interagisce con esso attraverso l'interfaccia <code translate="no">MilvusClient</code> del PyMilvus SDK. Copiate il prompt completo qui sotto nel vostro strumento di IA per applicare queste regole automaticamente. Per i prompt dettagliati specifici per le attività, vedere i <a href="/docs/it/milvus_for_agents.md">prompt dell'IA</a>.</p>
<h2 id="Full-prompt" class="common-anchor-header">Richiesta completa<button data-href="#Full-prompt" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="cursor://anysphere.cursor-deeplink/prompt?text=%23%20AGENTS.md%20%E2%80%94%20Milvus%0A%0AMilvus%20is%20an%20open-source%20vector%20database%20for%20similarity%20search%2C%20hybrid%20search%2C%20and%20RAG.%20You%20interact%20with%20it%20through%20the%20PyMilvus%20SDK%27s%20%60MilvusClient%60%20interface.%0A%0AUse%20these%20rules%20whenever%20you%20generate%2C%20review%2C%20or%20debug%20code%20that%20connects%20to%20Milvus%20or%20Zilliz%20Cloud.%0A%0A%23%23%20Client%20%26%20connection%0A%0A1.%20CRITICAL%20%E2%80%94%20Always%20use%20%60MilvusClient%60.%20Never%20use%20the%20legacy%20ORM%20API.%0A2.%20Local%3A%20%60MilvusClient%28uri%3D%22http%3A%2F%2Flocalhost%3A19530%22%29%60.%20Zilliz%20Cloud%3A%20add%20%60token%3D%22...%22%60.%0A%0A%23%23%20Schema%20%26%20data%0A%0A3.%20CRITICAL%20%E2%80%94%20Use%20%60DataType%60%20enum%2C%20not%20strings.%0A4.%20CRITICAL%20%E2%80%94%20Schema%20is%20immutable%20in%20v2.5.x.%20Drop%20and%20recreate%20to%20change.%20v2.6%2B%20allows%20adding%20nullable%20fields.%0A5.%20Primary%20keys%3A%20INT64%20or%20VARCHAR%20only.%20No%20composite%20keys.%0A6.%20Use%20%60upsert%28%29%60%20to%20update.%20There%20is%20no%20%60update%28%29%60%20method.%0A7.%20BM25%20must%20be%20defined%20at%20collection%20creation%20time.%0A%0A%23%23%20Index%20%26%20loading%0A%0A8.%20CRITICAL%20%E2%80%94%20Index%20before%20load%2C%20load%20before%20search.%20Pass%20schema%20%2B%20index_params%20to%20create_collection%28%29%20to%20auto-handle.%0A9.%20Start%20with%20AUTOINDEX.%0A%0A%23%23%20Search%0A%0A10.%20CRITICAL%20%E2%80%94%20One%20vector%20per%20AnnSearchRequest.%0A11.%20One%20ranker%20per%20hybrid_search%28%29%20call.">Apri nel cursore</a></p>
<pre><code translate="no" class="language-text"># AGENTS.md — Milvus

Milvus is an open-source vector database for similarity search, hybrid search, and RAG. You interact with it through the PyMilvus SDK&#x27;s `MilvusClient` interface.

Use these rules whenever you generate, review, or debug code that connects to Milvus or Zilliz Cloud.

## Client &amp; connection

1. **CRITICAL — Always use `MilvusClient`.** Never use the legacy ORM API (`connections.connect()`, `Collection()`, `utility.list_collections()`). The ORM API is deprecated and will be removed. If the user provides ORM code, rewrite it to `MilvusClient`.

2. **Connection patterns.** Local unauthenticated: `uri` only. Zilliz Cloud or authenticated Milvus: `uri` + `token`.

```python
# Local Milvus
client = MilvusClient(uri=&quot;http://localhost:19530&quot;)

# Zilliz Cloud / authenticated Milvus
client = MilvusClient(uri=&quot;YOUR_MILVUS_URI&quot;, token=&quot;YOUR_MILVUS_TOKEN&quot;)
```

## Schema &amp; data

3. **CRITICAL — Use `DataType` enum, not strings.** Write `DataType.FLOAT_VECTOR`, not `&quot;FLOAT_VECTOR&quot;`.

4. **CRITICAL — Schema is immutable in v2.5.x and earlier.** You cannot add, modify, or delete fields after creation — drop and recreate the collection. In v2.6+, you can add new nullable fields with `add_collection_field()` but still cannot modify or delete existing fields.

5. **Primary keys: `INT64` or `VARCHAR` only.** Composite primary keys are not supported. Primary keys must be unique across the entire collection, including across partitions.

6. **Use `upsert()` to update entities.** There is no `client.update()` method. `upsert()` replaces the entire entity if the primary key exists, or inserts a new one. Use `insert()` only when you are certain there are no primary key conflicts.

7. **BM25 must be defined at collection creation time.** The BM25 function and text analyzer cannot be added to an existing collection.

## Index &amp; loading

8. **CRITICAL — Index before load, load before search.** A vector field must have an index before the collection can be loaded. A collection must be loaded before any search or query. Shortcut: pass both `schema` and `index_params` to `create_collection()` and Milvus handles index creation and loading automatically.

9. **Start with `AUTOINDEX`.** Use `index_type=&quot;AUTOINDEX&quot;` unless you have specific requirements. Choose HNSW for high recall, DiskANN for larger-than-RAM datasets, IVF_FLAT for memory-constrained scenarios.

## Search

10. **CRITICAL — One vector per `AnnSearchRequest`.** Each sub-request in a hybrid search accepts exactly one query vector. Do not pass a list of multiple vectors.

11. **One ranker per `hybrid_search()` call.** You cannot chain `WeightedRanker` and `RRFRanker` together. Pick one.

## Quick start

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri=&quot;http://localhost:19530&quot;)

# 1. Define schema
schema = client.create_schema(auto_id=True)
schema.add_field(&quot;id&quot;, DataType.INT64, is_primary=True)
schema.add_field(&quot;vector&quot;, DataType.FLOAT_VECTOR, dim=768)
schema.add_field(&quot;text&quot;, DataType.VARCHAR, max_length=512)

# 2. Define index
index_params = client.prepare_index_params()
index_params.add_index(field_name=&quot;vector&quot;, index_type=&quot;AUTOINDEX&quot;, metric_type=&quot;COSINE&quot;)

# 3. Create collection (auto-indexes and auto-loads)
client.create_collection(collection_name=&quot;docs&quot;, schema=schema, index_params=index_params)

# 4. Insert
client.insert(collection_name=&quot;docs&quot;, data=[
    {&quot;vector&quot;: [0.1] * 768, &quot;text&quot;: &quot;first doc&quot;},
    {&quot;vector&quot;: [0.2] * 768, &quot;text&quot;: &quot;second doc&quot;},
])

# 5. Search
results = client.search(
    collection_name=&quot;docs&quot;,
    data=[[0.15] * 768],
    limit=5,
    output_fields=[&quot;text&quot;],
)
```

## Common mistakes

| Mistake | Fix |
|---|---|
| Using `connections.connect()` / `Collection()` | Rewrite with `MilvusClient` |
| Calling `client.search()` before loading | Pass `index_params` to `create_collection()`, or call `create_index()` then `load_collection()` first |
| Multiple vectors in one `AnnSearchRequest` | One vector per sub-request; create multiple `AnnSearchRequest` objects |
| Calling `client.update()` | Use `client.upsert()` |
| Adding BM25 after collection exists | Define BM25 function and analyzer at `create_collection()` time |
| String field types (`&quot;FLOAT_VECTOR&quot;`) | Use `DataType.FLOAT_VECTOR` from the enum |
<button class="copy-code-btn"></button></code></pre>
