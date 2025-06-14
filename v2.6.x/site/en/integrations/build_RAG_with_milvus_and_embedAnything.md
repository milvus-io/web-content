---
id: build_RAG_with_milvus_and_embedAnything.md
summary: In this tutorial, we’ll demonstrate how to build a Retrieval-Augmented Generation (RAG) pipeline using EmbedAnything together with Milvus. Rather than tightly coupling with any specific database, EmbedAnything uses a pluggable adapter system, adapters serve as wrappers that define how embeddings are formatted, indexed, and stored in the target vector store.
title: Building RAG with Milvus and EmbedAnything
---

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_embedAnything.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_embedAnything.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

# Building RAG with Milvus and EmbedAnything

[EmbedAnything](https://github.com/StarlightSearch/EmbedAnything) is a blazing-fast, lightweight embedding pipeline built in Rust that supports text, PDFs, images, audio, and more.

In this tutorial, we’ll demonstrate how to build a Retrieval-Augmented Generation (RAG) pipeline using EmbedAnything together with [Milvus](https://milvus.io). Rather than tightly coupling with any specific database, EmbedAnything uses a pluggable **adapter** system — adapters serve as wrappers that define how embeddings are formatted, indexed, and stored in the target vector store.

By pairing EmbedAnything with a Milvus adapter, you can generate embeddings from diverse file types and efficiently store them in Milvus in just a few lines of code.

> ⚠️ Note: While the adapter in EmbedAnything handles insertion into Milvus, it does not support search out of the box. To build a full RAG pipeline, you’ll also need to instantiate a MilvusClient separately and implement the retrieval logic (e.g., similarity search over vectors) as part of your application.

## Preparation
### Dependencies and Environment


```shell
$ pip install -qU pymilvus openai embed_anything
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

### Clone the Repository and Load Adapter

Next, we’ll clone the [EmbedAnything](https://github.com/StarlightSearch/EmbedAnything) repo and add the `examples/adapters` directory to the Python path. This is where we store the custom Milvus adapter implementation, which allows EmbedAnything to communicate with Milvus for vector insertion.


```python
import sys

# Clone the EmbedAnything repository if not already cloned
![ -d "EmbedAnything" ] || git clone https://github.com/StarlightSearch/EmbedAnything.git

# Add the `examples/adapters` directory to the Python path
sys.path.append("EmbedAnything/examples/adapters")
print("✅ EmbedAnything cloned and adapter path added.")
```

    ✅ EmbedAnything cloned and adapter path added.


We will use OpenAI as the LLM in this RAG pipeline. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable. 


```python
import os
from openai import OpenAI

os.environ["OPENAI_API_KEY"] = "sk-***********"

openai_client = OpenAI()
```

## Build RAG
### Initialize Milvus 

Before we embed any files, we need to prepare two components that interact with Milvus:

1. `MilvusVectorAdapter` – This is the Milvus adapter for EmbedAnything, and is used **only for vector ingestion** (i.e., inserting embeddings and creating indexes). It currently does **not** support search operations.
2. `MilvusClient` – This is the official client from `pymilvus`, which enables **full access** to Milvus capabilities including vector search, filtering, and collection management.

To avoid confusion:
- Think of `MilvusVectorAdapter` as your "write-only" tool for storing vectors.
- Think of `MilvusClient` as your "read-and-search" engine to actually perform queries and retrieve documents for RAG.


```python
import embed_anything
from embed_anything import (
    WhichModel,
    EmbeddingModel,
)
from milvus_db import MilvusVectorAdapter
from pymilvus import MilvusClient

# Official Milvus client for full operations
milvus_client = MilvusClient(uri="./milvus.db", token="")

# EmbedAnything adapter for pushing embeddings into Milvus
index_name = "embed_anything_milvus_collection"
milvus_adapter = MilvusVectorAdapter(
    uri="./milvus.db", token="", collection_name=index_name
)

# Delete existing collection if it exists
if milvus_client.has_collection(index_name):
    milvus_client.drop_collection(index_name)

# Create a new collection with dimension matching the embedding model later used
milvus_adapter.create_index(dimension=384)
```

    Ok - Milvus DB connection established.
    Collection 'embed_anything_milvus_collection' created with index.

<div class="alert note">

As for the argument of `MilvusVectorAdapter` and `MilvusClient`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, say more than a million vectors, you can set up a more performant Milvus server on [Docker or Kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server address and port as your uri, e.g.`http://localhost:19530`. If you enable the authentication feature on Milvus, use "<your_username>:<your_password>" as the token, otherwise don't set the token.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

### Initialize Embedding Model and Embed PDF Document

Now we'll initialize the embedding model. We'll use the `all-MiniLM-L12-v2 model` from the sentence-transformers library, which is a lightweight yet powerful model for generating text embeddings. It produces 384-dimensional embeddings, so this aligns with our Milvus collection dimension being set to 384. This alignment is crucial and ensures compatibility between the vector dimensions stored in Milvus and those generated by the model.

EmbedAnything supports a lot more embedding models. For more details, please refer to the [official documentation](https://github.com/StarlightSearch/EmbedAnything).


```python
# Initialize the embedding model
model = EmbeddingModel.from_pretrained_hf(
    WhichModel.Bert, model_id="sentence-transformers/all-MiniLM-L12-v2"
)
```

Now, let's embed a PDF file. EmbedAnything makes it easy to process PDF (and many more) documents and store their embeddings directly in Milvus.


```python
# Embed a PDF file
data = embed_anything.embed_file(
    "./pdf_files/WhatisMilvus.pdf",
    embedder=model,
    adapter=milvus_adapter,
)
```

    Converted 12 embeddings for insertion.
    Successfully inserted 12 embeddings.


### Retrieve and Generate Response

Again, the `MilvusVectorAdapter` from EmbedAnything currently is a lightweight abstraction for vector ingestion and indexing only. It **does not support search** or retrieval queries. Therefore, for search relevant documents to build our RAG pipeline, we must directly use the `MilvusClient` instance (`milvus_client`) to query our Milvus vector store.

Define a function to retrieve relevant documents from Milvus.


```python
def retrieve_documents(question, top_k=3):
    query_vector = list(
        embed_anything.embed_query([question], embedder=model)[0].embedding
    )
    search_res = milvus_client.search(
        collection_name=index_name,
        data=[query_vector],
        limit=top_k,
        output_fields=["text"],
    )
    docs = [(res["entity"]["text"], res["distance"]) for res in search_res[0]]
    return docs
```

Define a function to generate a response using the retrieved documents in the RAG pipeline.


```python
def generate_rag_response(question):
    retrieved_docs = retrieve_documents(question)
    context = "\n".join([f"Text: {doc[0]}\n" for doc in retrieved_docs])
    system_prompt = (
        "You are an AI assistant. Provide answers based on the given context."
    )
    user_prompt = f"""
    Use the following pieces of information to answer the question. If the information is not in the context, say you don't know.
    
    Context:
    {context}
    
    Question: {question}
    """
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    )
    return response.choices[0].message.content
```

Let's test the RAG pipeline with a sample question.


```python
question = "How does Milvus search for similar documents?"
answer = generate_rag_response(question)
print(f"Question: {question}")
print(f"Answer: {answer}")
```

    Question: How does Milvus search for similar documents?
    Answer: Milvus searches for similar documents primarily through Approximate Nearest Neighbor (ANN) search, which finds the top K vectors closest to a given query vector. It also supports various other types of searches, such as filtering search under specified conditions, range search within a specified radius, hybrid search based on multiple vector fields, and keyword search based on BM25. Additionally, it can perform reranking to adjust the order of search results based on additional criteria, refining the initial ANN search results.

