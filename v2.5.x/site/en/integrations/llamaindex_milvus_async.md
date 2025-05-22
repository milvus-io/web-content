---
id: llamaindex_milvus_async.md
title: Build RAG with LlamaIndex and Milvus Async API
related_key: LlamaIndex
summary: This tutorial demonstrates how to use LlamaIndex with Milvus to build asynchronous document processing pipeline for RAG. LlamaIndex provides a way to process documents and store in vector db like Milvus. By leveraging the async API of LlamaIndex and Milvus Python client library, we can increase the throughput of the pipeline to efficiently process and index large volumes of data.
---

# RAG with Milvus and LlamaIndex Async API

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_async.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_async.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

This tutorial demonstrates how to use [LlamaIndex](https://www.llamaindex.ai/) with [Milvus](https://milvus.io/) to build asynchronous document processing pipeline for RAG. LlamaIndex provides a way to process documents and store in vector db like Milvus. By leveraging the async API of LlamaIndex and Milvus Python client library, we can increase the throughput of the pipeline to efficiently process and index large volumes of data.

 
In this tutorial, we will first introduce the use of asynchronous methods to build a RAG with LlamaIndex and Milvus from a high level, and then introduce the use of low level methods and the performance comparison of synchronous and asynchronous.


## Before you begin

Code snippets on this page require pymilvus and llamaindex dependencies. You can install them using the following commands:


```bash
$ pip install -U pymilvus llama-index-vector-stores-milvus llama-index nest-asyncio
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

We will use the models from OpenAI. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable.


```python
import os

os.environ["OPENAI_API_KEY"] = "sk-***********"
```

If you are using Jupyter Notebook, you need to run this line of code before running the asynchronous code.


```python
import nest_asyncio

nest_asyncio.apply()
```

### Prepare data

You can download sample data with the following commands:


```bash
$ mkdir -p 'data/'
$ wget 'https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt' -O 'data/paul_graham_essay.txt'
$ wget 'https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf' -O 'data/uber_2021.pdf'
```

## Build RAG with Asynchronous Processing
This section show how to build a RAG system that can process docs in asynchronous manner.

Import the necessary libraries and define Milvus URI and the dimension of the embedding. 



```python
import asyncio
import random
import time

from llama_index.core.schema import TextNode, NodeRelationship, RelatedNodeInfo
from llama_index.core.vector_stores import VectorStoreQuery
from llama_index.vector_stores.milvus import MilvusVectorStore

URI = "http://localhost:19530"
DIM = 768
```

<div class="alert note">

- If you have large scale of data, you can set up a performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.
- In the case of complex systems (such as network communication), asynchronous processing can bring performance improvement compared to synchronization. So we think Milvus-Lite is not suitable for using asynchronous interfaces because the scenarios used are not suitable.

</div>


Define an initialization function that we can use again to rebuild the Milvus collection.


```python
def init_vector_store():
    return MilvusVectorStore(
        uri=URI,
        # token=TOKEN,
        dim=DIM,
        collection_name="test_collection",
        embedding_field="embedding",
        id_field="id",
        similarity_metric="COSINE",
        consistency_level="Strong",  # Supported values are (`"Strong"`, `"Session"`, `"Bounded"`, `"Eventually"`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.
        overwrite=True,  # To overwrite the collection if it already exists
    )


vector_store = init_vector_store()
```

    2025-01-24 20:04:39,414 [DEBUG][_create_connection]: Created new connection using: faa8be8753f74288bffc7e6d38942f8a (async_milvus_client.py:600)


Use SimpleDirectoryReader to wrap a LlamaIndex document object from the file `paul_graham_essay.txt`.


```python
from llama_index.core import SimpleDirectoryReader

# load documents
documents = SimpleDirectoryReader(
    input_files=["./data/paul_graham_essay.txt"]
).load_data()

print("Document ID:", documents[0].doc_id)
```

    Document ID: 41a6f99c-489f-49ff-9821-14e2561140eb


Instantiate a Hugging Face embedding model locally. Using a local model avoids the risk of reaching API rate limits during asynchronous data insertion, as concurrent API requests can quickly add up and use up your budget in public API. However, if you have a high rate limit, you may opt to use a remote model service instead.


```python
from llama_index.embeddings.huggingface import HuggingFaceEmbedding


embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")
```

Create an index and insert the document.

We set the `use_async` to `True` to enable async insert mode.


```python
# Create an index over the documents
from llama_index.core import VectorStoreIndex, StorageContext

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=embed_model,
    use_async=True,
)
```

Initialize the LLM.


```python
from llama_index.llms.openai import OpenAI

llm = OpenAI(model="gpt-3.5-turbo")
```

When building the query engine, you can also set the `use_async` parameter to `True` to enable asynchronous search.


```python
query_engine = index.as_query_engine(use_async=True, llm=llm)
response = await query_engine.aquery("What did the author learn?")
```


```python
print(response)
```

    The author learned that the field of artificial intelligence, as practiced at the time, was not as promising as initially believed. The approach of using explicit data structures to represent concepts in AI was not effective in achieving true understanding of natural language. This realization led the author to shift his focus towards Lisp and eventually towards exploring the field of art.


## Explore the Async API

In this section, we'll introduce lower level API usage and compare the performance of synchronous and asynchronous runs.

### Async add

Re-initialize the vector store.


```python
vector_store = init_vector_store()
```

    2025-01-24 20:07:38,727 [DEBUG][_create_connection]: Created new connection using: 5e0d130f3b644555ad7ea6b8df5f1fc2 (async_milvus_client.py:600)


Let's define a node producing function, which will be used to generate large number of test nodes for the index.


```python
def random_id():
    random_num_str = ""
    for _ in range(16):
        random_digit = str(random.randint(0, 9))
        random_num_str += random_digit
    return random_num_str


def produce_nodes(num_adding):
    node_list = []
    for i in range(num_adding):
        node = TextNode(
            id_=random_id(),
            text=f"n{i}_text",
            embedding=[0.5] * (DIM - 1) + [random.random()],
            relationships={NodeRelationship.SOURCE: RelatedNodeInfo(node_id=f"n{i+1}")},
        )
        node_list.append(node)
    return node_list
```

Define a aync function to add documents to the vector store. We use the `async_add()` function in Milvus vector store instance.


```python
async def async_add(num_adding):
    node_list = produce_nodes(num_adding)
    start_time = time.time()
    tasks = []
    for i in range(num_adding):
        sub_nodes = node_list[i]
        task = vector_store.async_add([sub_nodes])  # use async_add()
        tasks.append(task)
    results = await asyncio.gather(*tasks)
    end_time = time.time()
    return end_time - start_time
```


```python
add_counts = [10, 100, 1000]
```

Get the event loop.


```python
loop = asyncio.get_event_loop()
```

Asynchronously add documents to the vector store.


```python
for count in add_counts:

    async def measure_async_add():
        async_time = await async_add(count)
        print(f"Async add for {count} took {async_time:.2f} seconds")
        return async_time

    loop.run_until_complete(measure_async_add())
```

    Async add for 10 took 0.19 seconds
    Async add for 100 took 0.48 seconds
    Async add for 1000 took 3.22 seconds



```python
vector_store = init_vector_store()
```

    2025-01-24 20:07:45,554 [DEBUG][_create_connection]: Created new connection using: b14dde8d6d24489bba26a907593f692d (async_milvus_client.py:600)


#### Compare with synchronous add
Define a sync add function. Then measure the running time under the same condition.


```python
def sync_add(num_adding):
    node_list = produce_nodes(num_adding)
    start_time = time.time()
    for node in node_list:
        result = vector_store.add([node])
    end_time = time.time()
    return end_time - start_time
```


```python
for count in add_counts:
    sync_time = sync_add(count)
    print(f"Sync add for {count} took {sync_time:.2f} seconds")
```

    Sync add for 10 took 0.56 seconds
    Sync add for 100 took 5.85 seconds
    Sync add for 1000 took 62.91 seconds


The result shows that the sync adding process is much slower than the async one.


### Async search

Re-initialize the vector store and add some documents before running the search.


```python
vector_store = init_vector_store()
node_list = produce_nodes(num_adding=1000)
inserted_ids = vector_store.add(node_list)
```

    2025-01-24 20:08:57,982 [DEBUG][_create_connection]: Created new connection using: 351dc7ea4fb14d4386cfab02621ab7d1 (async_milvus_client.py:600)


Define an async search function. We use the `aquery()` function in Milvus vector store instance.


```python
async def async_search(num_queries):
    start_time = time.time()
    tasks = []
    for _ in range(num_queries):
        query = VectorStoreQuery(
            query_embedding=[0.5] * (DIM - 1) + [0.6], similarity_top_k=3
        )
        task = vector_store.aquery(query=query)  # use aquery()
        tasks.append(task)
    results = await asyncio.gather(*tasks)
    end_time = time.time()
    return end_time - start_time
```


```python
query_counts = [10, 100, 1000]
```

Asynchronously search from Milvus store.


```python
for count in query_counts:

    async def measure_async_search():
        async_time = await async_search(count)
        print(f"Async search for {count} queries took {async_time:.2f} seconds")
        return async_time

    loop.run_until_complete(measure_async_search())
```

    Async search for 10 queries took 0.55 seconds
    Async search for 100 queries took 1.39 seconds
    Async search for 1000 queries took 8.81 seconds


#### Compare with synchronous search

Define a sync search function. Then measure the running time under the same condition.


```python
def sync_search(num_queries):
    start_time = time.time()
    for _ in range(num_queries):
        query = VectorStoreQuery(
            query_embedding=[0.5] * (DIM - 1) + [0.6], similarity_top_k=3
        )
        result = vector_store.query(query=query)
    end_time = time.time()
    return end_time - start_time
```


```python
for count in query_counts:
    sync_time = sync_search(count)
    print(f"Sync search for {count} queries took {sync_time:.2f} seconds")
```

    Sync search for 10 queries took 3.29 seconds
    Sync search for 100 queries took 30.80 seconds
    Sync search for 1000 queries took 308.80 seconds


The result shows that the sync search process is much slower than the async one.
