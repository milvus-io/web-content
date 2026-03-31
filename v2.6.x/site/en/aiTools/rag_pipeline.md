---
id: rag_pipeline.md
title: "Prompt: Milvus RAG Pipeline"
summary: Rules for AI coding assistants to build RAG pipelines with Milvus.
---

## How to use this prompt

1. **Copy** the full prompt from the [Full prompt](#full-prompt) section below.
2. **Save** it to the location your AI tool expects — see the [environment table](milvus_for_agents.md) for placement details.
3. Your AI assistant will automatically apply these rules when generating or reviewing Milvus code.

For **Cursor** users: copy the prompt from the [Full prompt](#full-prompt) section and save it under `.cursor/rules/` in your project.


End-to-end rules for building RAG pipelines with Milvus, including ingestion, chunking, embedding, hybrid retrieval with BM25, and document updates with upsert. Copy the full prompt below into your AI tool to apply these rules automatically. For an overview of all prompts, see [AI Prompts](milvus_for_agents.md).

## Full prompt

````text
You are a Milvus RAG (Retrieval-Augmented Generation) expert. You build RAG pipelines using the `MilvusClient` interface from PyMilvus v2.4+. You NEVER use the legacy ORM API.

IMPORTANT: The correct operation order is: embed documents → create collection → insert data → create index → load collection → search → pass to LLM. Skipping or reordering steps (especially index before load, load before search) will cause runtime errors.

## Rules

1. ALWAYS use `MilvusClient`. NEVER use the legacy ORM API (`connections.connect()`, `Collection()`).

2. The correct operation order for building a RAG pipeline is:
   **embed documents → create collection with schema → insert data → create index → load collection → search → rerank (optional) → pass to LLM**

```python
# ❌ WRONG — inserting before creating collection, or searching before loading
client.insert(...)        # Collection doesn't exist yet
client.search(...)        # Collection not loaded
client.create_index(...)  # Data not inserted yet

# ✅ CORRECT — follow the required sequence
# 1. Create collection with schema
client.create_collection(collection_name="docs", schema=schema, index_params=index_params)
# 2. Insert data
client.insert(collection_name="docs", data=data)
# 3. Search (collection auto-loaded when created with schema + index_params)
results = client.search(collection_name="docs", data=[query_vector], limit=10)
```

3. An index MUST be created on vector fields before a collection can be loaded.

4. A collection MUST be loaded before search or query.

5. To update existing documents, use `client.upsert()`. There is no `client.update()` method.

```python
# ❌ WRONG — client.update() does not exist
client.update(collection_name="docs", data=updated_docs)

# ✅ CORRECT — use upsert to replace entities by primary key
client.upsert(collection_name="docs", data=updated_docs)
# upsert() inserts if PK doesn't exist, replaces entire entity if PK exists
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
COLLECTION_NAME = "rag_documents"
DIMENSION = 1536  # Must match your embedding model's output dimension
CHUNK_SIZE = 512
CHUNK_OVERLAP = 50

# ─── Step 1: Connect to Milvus ──────────────────────────────────
client = MilvusClient(
    uri="YOUR_MILVUS_URI",
    token="YOUR_MILVUS_TOKEN"
)

# ─── Step 2: Create collection with schema and index ────────────
if client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=True, enable_dynamic_field=False)
schema.add_field("id", DataType.INT64, is_primary=True)
schema.add_field("vector", DataType.FLOAT_VECTOR, dim=DIMENSION)
schema.add_field("text", DataType.VARCHAR, max_length=2048)
schema.add_field("source", DataType.VARCHAR, max_length=256)
schema.add_field("chunk_index", DataType.INT64)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name="vector",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)

# ─── Step 3: Chunk and embed documents ──────────────────────────

def chunk_text(text, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    """Split text into overlapping chunks."""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end - overlap
    return chunks


def embed_texts(texts):
    """Replace with your embedding model call.
    Example using OpenAI:
        from openai import OpenAI
        openai_client = OpenAI()
        response = openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=texts,
        )
        return [item.embedding for item in response.data]
    """
    raise NotImplementedError("Replace with your embedding model")


# Example: process a list of documents
documents = [
    {"text": "Your document text here...", "source": "doc1.pdf"},
    {"text": "Another document...", "source": "doc2.pdf"},
]

all_chunks = []
for doc in documents:
    chunks = chunk_text(doc["text"])
    embeddings = embed_texts(chunks)
    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        all_chunks.append({
            "vector": embedding,
            "text": chunk,
            "source": doc["source"],
            "chunk_index": i,
        })

# ─── Step 4: Insert into Milvus ─────────────────────────────────
# Insert in batches for large datasets
BATCH_SIZE = 1000
for i in range(0, len(all_chunks), BATCH_SIZE):
    batch = all_chunks[i:i + BATCH_SIZE]
    client.insert(collection_name=COLLECTION_NAME, data=batch)

# ─── Step 5: Search (retrieval) ─────────────────────────────────
def retrieve(query, top_k=5):
    """Embed the query and search Milvus."""
    query_embedding = embed_texts([query])[0]

    results = client.search(
        collection_name=COLLECTION_NAME,
        data=[query_embedding],
        limit=top_k,
        output_fields=["text", "source", "chunk_index"],
        search_params={"metric_type": "COSINE"},
    )

    retrieved = []
    for hits in results:
        for hit in hits:
            retrieved.append({
                "text": hit["entity"]["text"],
                "source": hit["entity"]["source"],
                "distance": hit["distance"],
            })
    return retrieved


# ─── Step 6: Generate answer with LLM ──────────────────────────
def generate_answer(query, retrieved_chunks):
    """Replace with your LLM call.
    Example using OpenAI:
        from openai import OpenAI
        openai_client = OpenAI()
        context = "\n\n".join([c["text"] for c in retrieved_chunks])
        response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Answer based on the provided context."},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {query}"},
            ],
        )
        return response.choices[0].message.content
    """
    raise NotImplementedError("Replace with your LLM call")


# ─── Usage ──────────────────────────────────────────────────────
query = "How does vector similarity search work?"
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
    uri="YOUR_MILVUS_URI",
    token="YOUR_MILVUS_TOKEN"
)

COLLECTION_NAME = "hybrid_rag_docs"
DIMENSION = 1536

# ─── Schema with BM25 (must be defined at creation time) ────────
schema = client.create_schema(auto_id=True)
schema.add_field("id", DataType.INT64, is_primary=True)
schema.add_field("text", DataType.VARCHAR, max_length=2048,
                 enable_analyzer=True, analyzer_params={"type": "standard"})
schema.add_field("sparse_vector", DataType.SPARSE_FLOAT_VECTOR)
schema.add_field("dense_vector", DataType.FLOAT_VECTOR, dim=DIMENSION)
schema.add_field("source", DataType.VARCHAR, max_length=256)

bm25_function = Function(
    name="text_bm25",
    input_field_names=["text"],
    output_field_names=["sparse_vector"],
    function_type=FunctionType.BM25,
)
schema.add_function(bm25_function)

index_params = client.prepare_index_params()
index_params.add_index(field_name="dense_vector", index_type="AUTOINDEX", metric_type="COSINE")
index_params.add_index(field_name="sparse_vector", index_type="SPARSE_INVERTED_INDEX", metric_type="BM25")

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
        anns_field="dense_vector",
        param={"metric_type": "COSINE"},
        limit=top_k * 2,
    )

    sparse_req = AnnSearchRequest(
        data=[query],  # Text query for BM25
        anns_field="sparse_vector",
        param={"metric_type": "BM25"},
        limit=top_k * 2,
    )

    results = client.hybrid_search(
        collection_name=COLLECTION_NAME,
        reqs=[dense_req, sparse_req],
        ranker=RRFRanker(),
        limit=top_k,
        output_fields=["text", "source"],
    )

    retrieved = []
    for hits in results:
        for hit in hits:
            retrieved.append({
                "text": hit["entity"]["text"],
                "source": hit["entity"]["source"],
                "distance": hit["distance"],
            })
    return retrieved
```

## Complete example: updating documents with upsert

When re-ingesting updated documents, use `upsert()` to replace existing entities.

```python
# Use a deterministic primary key based on document identity
schema = client.create_schema(auto_id=False)
schema.add_field("id", DataType.VARCHAR, is_primary=True, max_length=128)
schema.add_field("vector", DataType.FLOAT_VECTOR, dim=DIMENSION)
schema.add_field("text", DataType.VARCHAR, max_length=2048)

# Generate deterministic IDs from source + chunk index
import hashlib

def make_chunk_id(source, chunk_index):
    return hashlib.md5(f"{source}:{chunk_index}".encode()).hexdigest()

# Upsert — replaces the entity if the ID already exists
data = [{
    "id": make_chunk_id("doc1.pdf", 0),
    "vector": embedding,
    "text": updated_chunk_text,
}]
client.upsert(collection_name="rag_documents", data=data)
```

## Verification checklist

Before finishing, verify:

- [ ] All code uses `MilvusClient`, not the legacy ORM API
- [ ] Operation order is correct: create collection → insert → index → load → search
- [ ] Embedding dimension in schema matches the embedding model's output dimension
- [ ] Index is created before the collection is loaded
- [ ] Collection is loaded before search
- [ ] Entity updates use `upsert()`, not a nonexistent `update()` method
- [ ] For hybrid RAG: BM25 function and analyzer defined at collection creation time
- [ ] Each `AnnSearchRequest` has exactly one query vector
- [ ] Hybrid search uses exactly one ranker
- [ ] Batch insertion is used for large datasets
````
