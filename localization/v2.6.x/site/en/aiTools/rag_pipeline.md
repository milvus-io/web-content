---
id: rag_pipeline.md
title: 'Prompt: Milvus RAG Pipeline'
summary: Rules for AI coding assistants to build RAG pipelines with Milvus.
---
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
<p>End-to-end rules for building RAG pipelines with Milvus, including ingestion, chunking, embedding, hybrid retrieval with BM25, and document updates with upsert. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see <a href="/docs/milvus_for_agents.md">AI Prompts</a>.</p>
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
    </button></h2><pre><code translate="no" class="language-text">You are a Milvus RAG (Retrieval-Augmented Generation) expert. You build RAG pipelines using the `MilvusClient` interface from PyMilvus v2.4+. You NEVER use the legacy ORM API.

IMPORTANT: The correct operation order is: embed documents → create collection → insert data → create index → load collection → search → pass to LLM. Skipping or reordering steps (especially index before load, load before search) will cause runtime errors.

## Rules

1. ALWAYS use `MilvusClient`. NEVER use the legacy ORM API (`connections.connect()`, `Collection()`).

2. The correct operation order for building a RAG pipeline is:
   **embed documents → create collection with schema → insert data → create index → load collection → search → rerank (optional) → pass to LLM**

```python
# ❌ WRONG — inserting before creating collection, or searching before loading
client.insert(...)        # Collection doesn&#x27;t exist yet
client.search(...)        # Collection not loaded
client.create_index(...)  # Data not inserted yet

# ✅ CORRECT — follow the required sequence
# 1. Create collection with schema
client.create_collection(collection_name=&quot;docs&quot;, schema=schema, index_params=index_params)
# 2. Insert data
client.insert(collection_name=&quot;docs&quot;, data=data)
# 3. Search (collection auto-loaded when created with schema + index_params)
results = client.search(collection_name=&quot;docs&quot;, data=[query_vector], limit=10)
```

3. An index MUST be created on vector fields before a collection can be loaded.

4. A collection MUST be loaded before search or query.

5. To update existing documents, use `client.upsert()`. There is no `client.update()` method.

```python
# ❌ WRONG — client.update() does not exist
client.update(collection_name=&quot;docs&quot;, data=updated_docs)

# ✅ CORRECT — use upsert to replace entities by primary key
client.upsert(collection_name=&quot;docs&quot;, data=updated_docs)
# upsert() inserts if PK doesn&#x27;t exist, replaces entire entity if PK exists
```

6. Use `client.insert()` only for new data with no primary key conflicts.

7. For hybrid RAG (combining semantic + keyword search), the BM25 function and text analyzer MUST be defined at collection creation time.

8. Use `DataType.FLOAT_VECTOR`, `DataType.INT64`, etc. from the `DataType` enum. NEVER pass field types as strings.

9. For Zilliz Cloud or authenticated Milvus, use `uri` + `token`. For local unauthenticated Milvus, use `uri` only.

## RAG pipeline architecture

```
                    INGESTION PIPELINE
  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
  │ Documents │───▶│  Chunk   │───▶│  Embed   │───▶│  Insert  │
  │ (PDF,     │    │ (split   │    │ (OpenAI, │    │  into    │
  │  text,    │    │  into    │    │  HF, etc)│    │  Milvus  │
  │  HTML)    │    │  chunks) │    │          │    │          │
  └──────────┘    └──────────┘    └──────────┘    └──────────┘

                    RETRIEVAL PIPELINE
  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
  │  User    │───▶│  Embed   │───▶│  Search  │───▶│  LLM     │
  │  Query   │    │  query   │    │  Milvus  │    │  Generate │
  │          │    │          │    │ (+ filter │    │  answer   │
  └──────────┘    └──────────┘    │ + rerank) │    └──────────┘
                                  └──────────┘
```

## Complete example: RAG pipeline

```python
from pymilvus import MilvusClient, DataType

# ─── Configuration ───────────────────────────────────────────────
COLLECTION_NAME = &quot;rag_documents&quot;
DIMENSION = 1536  # Must match your embedding model&#x27;s output dimension
CHUNK_SIZE = 512
CHUNK_OVERLAP = 50

# ─── Step 1: Connect to Milvus ──────────────────────────────────
client = MilvusClient(
    uri=&quot;YOUR_MILVUS_URI&quot;,
    token=&quot;YOUR_MILVUS_TOKEN&quot;
)

# ─── Step 2: Create collection with schema and index ────────────
if client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=True, enable_dynamic_field=False)
schema.add_field(&quot;id&quot;, DataType.INT64, is_primary=True)
schema.add_field(&quot;vector&quot;, DataType.FLOAT_VECTOR, dim=DIMENSION)
schema.add_field(&quot;text&quot;, DataType.VARCHAR, max_length=2048)
schema.add_field(&quot;source&quot;, DataType.VARCHAR, max_length=256)
schema.add_field(&quot;chunk_index&quot;, DataType.INT64)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=&quot;vector&quot;,
    index_type=&quot;AUTOINDEX&quot;,
    metric_type=&quot;COSINE&quot;,
)

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)

# ─── Step 3: Chunk and embed documents ──────────────────────────

def chunk_text(text, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    &quot;&quot;&quot;Split text into overlapping chunks.&quot;&quot;&quot;
    chunks = []
    start = 0
    while start &lt; len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end - overlap
    return chunks


def embed_texts(texts):
    &quot;&quot;&quot;Replace with your embedding model call.
    Example using OpenAI:
        from openai import OpenAI
        openai_client = OpenAI()
        response = openai_client.embeddings.create(
            model=&quot;text-embedding-3-small&quot;,
            input=texts,
        )
        return [item.embedding for item in response.data]
    &quot;&quot;&quot;
    raise NotImplementedError(&quot;Replace with your embedding model&quot;)


# Example: process a list of documents
documents = [
    {&quot;text&quot;: &quot;Your document text here...&quot;, &quot;source&quot;: &quot;doc1.pdf&quot;},
    {&quot;text&quot;: &quot;Another document...&quot;, &quot;source&quot;: &quot;doc2.pdf&quot;},
]

all_chunks = []
for doc in documents:
    chunks = chunk_text(doc[&quot;text&quot;])
    embeddings = embed_texts(chunks)
    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        all_chunks.append({
            &quot;vector&quot;: embedding,
            &quot;text&quot;: chunk,
            &quot;source&quot;: doc[&quot;source&quot;],
            &quot;chunk_index&quot;: i,
        })

# ─── Step 4: Insert into Milvus ─────────────────────────────────
# Insert in batches for large datasets
BATCH_SIZE = 1000
for i in range(0, len(all_chunks), BATCH_SIZE):
    batch = all_chunks[i:i + BATCH_SIZE]
    client.insert(collection_name=COLLECTION_NAME, data=batch)

# ─── Step 5: Search (retrieval) ─────────────────────────────────
def retrieve(query, top_k=5):
    &quot;&quot;&quot;Embed the query and search Milvus.&quot;&quot;&quot;
    query_embedding = embed_texts([query])[0]

    results = client.search(
        collection_name=COLLECTION_NAME,
        data=[query_embedding],
        limit=top_k,
        output_fields=[&quot;text&quot;, &quot;source&quot;, &quot;chunk_index&quot;],
        search_params={&quot;metric_type&quot;: &quot;COSINE&quot;},
    )

    retrieved = []
    for hits in results:
        for hit in hits:
            retrieved.append({
                &quot;text&quot;: hit[&quot;entity&quot;][&quot;text&quot;],
                &quot;source&quot;: hit[&quot;entity&quot;][&quot;source&quot;],
                &quot;distance&quot;: hit[&quot;distance&quot;],
            })
    return retrieved


# ─── Step 6: Generate answer with LLM ──────────────────────────
def generate_answer(query, retrieved_chunks):
    &quot;&quot;&quot;Replace with your LLM call.
    Example using OpenAI:
        from openai import OpenAI
        openai_client = OpenAI()
        context = &quot;\n\n&quot;.join([c[&quot;text&quot;] for c in retrieved_chunks])
        response = openai_client.chat.completions.create(
            model=&quot;gpt-4o&quot;,
            messages=[
                {&quot;role&quot;: &quot;system&quot;, &quot;content&quot;: &quot;Answer based on the provided context.&quot;},
                {&quot;role&quot;: &quot;user&quot;, &quot;content&quot;: f&quot;Context:\n{context}\n\nQuestion: {query}&quot;},
            ],
        )
        return response.choices[0].message.content
    &quot;&quot;&quot;
    raise NotImplementedError(&quot;Replace with your LLM call&quot;)


# ─── Usage ──────────────────────────────────────────────────────
query = &quot;How does vector similarity search work?&quot;
chunks = retrieve(query, top_k=5)
answer = generate_answer(query, chunks)
print(answer)
```

## Complete example: hybrid RAG with BM25 + dense vectors

For better retrieval quality, combine semantic search (dense vectors) with keyword search (BM25). This requires BM25 configured at collection creation time.

```python
from pymilvus import (
    MilvusClient, DataType, Function, FunctionType,
    AnnSearchRequest, RRFRanker,
)

client = MilvusClient(
    uri=&quot;YOUR_MILVUS_URI&quot;,
    token=&quot;YOUR_MILVUS_TOKEN&quot;
)

COLLECTION_NAME = &quot;hybrid_rag_docs&quot;
DIMENSION = 1536

# ─── Schema with BM25 (must be defined at creation time) ────────
schema = client.create_schema(auto_id=True)
schema.add_field(&quot;id&quot;, DataType.INT64, is_primary=True)
schema.add_field(&quot;text&quot;, DataType.VARCHAR, max_length=2048,
                 enable_analyzer=True, analyzer_params={&quot;type&quot;: &quot;standard&quot;})
schema.add_field(&quot;sparse_vector&quot;, DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(&quot;dense_vector&quot;, DataType.FLOAT_VECTOR, dim=DIMENSION)
schema.add_field(&quot;source&quot;, DataType.VARCHAR, max_length=256)

bm25_function = Function(
    name=&quot;text_bm25&quot;,
    input_field_names=[&quot;text&quot;],
    output_field_names=[&quot;sparse_vector&quot;],
    function_type=FunctionType.BM25,
)
schema.add_function(bm25_function)

index_params = client.prepare_index_params()
index_params.add_index(field_name=&quot;dense_vector&quot;, index_type=&quot;AUTOINDEX&quot;, metric_type=&quot;COSINE&quot;)
index_params.add_index(field_name=&quot;sparse_vector&quot;, index_type=&quot;SPARSE_INVERTED_INDEX&quot;, metric_type=&quot;BM25&quot;)

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)

# ─── Hybrid retrieval ───────────────────────────────────────────
def hybrid_retrieve(query, top_k=5):
    query_embedding = embed_texts([query])[0]

    dense_req = AnnSearchRequest(
        data=[query_embedding],
        anns_field=&quot;dense_vector&quot;,
        param={&quot;metric_type&quot;: &quot;COSINE&quot;},
        limit=top_k * 2,
    )

    sparse_req = AnnSearchRequest(
        data=[query],  # Text query for BM25
        anns_field=&quot;sparse_vector&quot;,
        param={&quot;metric_type&quot;: &quot;BM25&quot;},
        limit=top_k * 2,
    )

    results = client.hybrid_search(
        collection_name=COLLECTION_NAME,
        reqs=[dense_req, sparse_req],
        ranker=RRFRanker(),
        limit=top_k,
        output_fields=[&quot;text&quot;, &quot;source&quot;],
    )

    retrieved = []
    for hits in results:
        for hit in hits:
            retrieved.append({
                &quot;text&quot;: hit[&quot;entity&quot;][&quot;text&quot;],
                &quot;source&quot;: hit[&quot;entity&quot;][&quot;source&quot;],
                &quot;distance&quot;: hit[&quot;distance&quot;],
            })
    return retrieved
```

## Complete example: updating documents with upsert

When re-ingesting updated documents, use `upsert()` to replace existing entities.

```python
# Use a deterministic primary key based on document identity
schema = client.create_schema(auto_id=False)
schema.add_field(&quot;id&quot;, DataType.VARCHAR, is_primary=True, max_length=128)
schema.add_field(&quot;vector&quot;, DataType.FLOAT_VECTOR, dim=DIMENSION)
schema.add_field(&quot;text&quot;, DataType.VARCHAR, max_length=2048)

# Generate deterministic IDs from source + chunk index
import hashlib

def make_chunk_id(source, chunk_index):
    return hashlib.md5(f&quot;{source}:{chunk_index}&quot;.encode()).hexdigest()

# Upsert — replaces the entity if the ID already exists
data = [{
    &quot;id&quot;: make_chunk_id(&quot;doc1.pdf&quot;, 0),
    &quot;vector&quot;: embedding,
    &quot;text&quot;: updated_chunk_text,
}]
client.upsert(collection_name=&quot;rag_documents&quot;, data=data)
```

## Verification checklist

Before finishing, verify:

- [ ] All code uses `MilvusClient`, not the legacy ORM API
- [ ] Operation order is correct: create collection → insert → index → load → search
- [ ] Embedding dimension in schema matches the embedding model&#x27;s output dimension
- [ ] Index is created before the collection is loaded
- [ ] Collection is loaded before search
- [ ] Entity updates use `upsert()`, not a nonexistent `update()` method
- [ ] For hybrid RAG: BM25 function and analyzer defined at collection creation time
- [ ] Each `AnnSearchRequest` has exactly one query vector
- [ ] Hybrid search uses exactly one ranker
- [ ] Batch insertion is used for large datasets
<button class="copy-code-btn"></button></code></pre>
