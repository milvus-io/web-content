---
id: langchain_milvus_async.md
summary: This tutorial explores how to leverage asynchronous functions in langchain-milvus to build high-performance applications. By using async methods, you can significantly improve your application's throughput and responsiveness, especially when dealing with large-scale retrieval.
title: Asynchronous Functions in LangChain Milvus Integration
---

# Asynchronous Functions in LangChain Milvus Integration

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_async.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_async.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

This tutorial explores how to leverage asynchronous functions in [langchain-milvus](https://github.com/langchain-ai/langchain-milvus) to build high-performance applications. By using async methods, you can significantly improve your application's throughput and responsiveness, especially when dealing with large-scale retrieval. Whether you're building a real-time recommendation system, implementing semantic search in your application, or creating a RAG (Retrieval-Augmented Generation) pipeline, async operations can help you handle concurrent requests more efficiently. The high-performance vector database Milvus combined with LangChain's powerful LLM abstractions can provide a robust foundation for building scalable AI applications.

## Async API Overview

langchain-milvus provides comprehensive asynchronous operation support, significantly improving performance in large-scale concurrent scenarios. The async API maintains consistent interface design with sync API.

### Core Async Functions
To use async operations in langchain-milvus, simply add an `a` prefix to method names. This allows for better resource utilization and improved throughput when handling concurrent retrieval requests.


| Operation Type | Sync Method | Async Method | Description |
|---------------|-------------|--------------|-------------|
| Add Texts | `add_texts()` | `aadd_texts()` | Add texts to vector store |
| Add Documents | `add_documents()` | `aadd_documents()` | Add documents to vector store |
| Add Embeddings | `add_embeddings()` | `aadd_embeddings()` | Add embedding vectors |
| Similarity Search | `similarity_search()` | `asimilarity_search()` | Semantic search by text |
| Vector Search | `similarity_search_by_vector()` | `asimilarity_search_by_vector()` | Semantic search by vector |
| Search with Score | `similarity_search_with_score()` | `asimilarity_search_with_score()` | Semantic search by text and return similarity scores |
| Vector Search with Score | `similarity_search_with_score_by_vector()` | `asimilarity_search_with_score_by_vector()` | Semantic search by vector and return similarity scores |
| Diversity Search | `max_marginal_relevance_search()` | `amax_marginal_relevance_search()` | MMR search (return similar ones while also optimizing for diversity) |
| Vector Diversity Search | `max_marginal_relevance_search_by_vector()` | `amax_marginal_relevance_search_by_vector()` |  MMR search by vector |
| Delete Operation | `delete()` | `adelete()` | Delete documents |
| Upsert Operation | `upsert()` | `aupsert()` | Upsert (update if existing, otherwise insert) documents |
| Metadata Search | `search_by_metadata()` | `asearch_by_metadata()` | Query with metadata filtering |
| Get Primary Keys | `get_pks()` | `aget_pks()` | Get primary keys by expression |
| Create from Texts | `from_texts()` | `afrom_texts()` | Create vector store from texts |

For more detailed information about these functions, please refer to the [API Reference](https://python.langchain.com/api_reference/milvus/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html#milvus).

### Performance Benefits

Async operations provide significant performance improvements when handling large volumes of concurrent requests, particularly suitable for:
- Batch document processing
- High-concurrency search scenarios
- Production RAG applications
- Large-scale data import/export

In this tutorial, we'll demonstrate these performance benefits through detailed comparisons of synchronous and asynchronous operations, showing you how to leverage async APIs for optimal performance in your applications.


## Before you begin

Code snippets on this page require the following dependencies:


```python
! pip install -U pymilvus langchain-milvus langchain langchain-core langchain-openai langchain-text-splitters nest-asyncio
```

> If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

We will use OpenAI models. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable:


```python
import os

os.environ["OPENAI_API_KEY"] = "sk-***********"
```

If you are using Jupyter Notebook, you need to run this line of code before running the asynchronous code:


```python
import nest_asyncio

nest_asyncio.apply()
```

## Exploring Async APIs and Performance Comparison

Now let's dive deeper into the performance comparison between synchronous and asynchronous operations with langchain-milvus.

First, import the necessary libraries:


```python
import asyncio
import random
import time
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from langchain_milvus import Milvus

# Define the Milvus URI
URI = "http://localhost:19530"
```

### Setting up Test Functions

Let's create helper functions to generate test data:


```python
def random_id():
    """Generate a random string ID"""
    random_num_str = ""
    for _ in range(16):
        random_digit = str(random.randint(0, 9))
        random_num_str += random_digit
    return random_num_str


def generate_test_documents(num_docs):
    """Generate test documents for performance testing"""
    docs = []
    for i in range(num_docs):
        content = (
            f"This is test document {i} with some random content: {random.random()}"
        )
        metadata = {
            "id": f"doc_{i}",
            "score": random.random(),
            "category": f"cat_{i % 5}",
        }
        doc = Document(page_content=content, metadata=metadata)
        docs.append(doc)
    return docs
```

### Initialize the Vector Store

Before we can run our performance tests, we need to set up a clean Milvus vector store. This function ensures we start with a fresh collection for each test, eliminating any interference from previous data:


```python
def init_vector_store():
    """Initialize and return a fresh vector store for testing"""
    return Milvus(
        embedding_function=OpenAIEmbeddings(),
        collection_name="langchain_perf_test",
        connection_args={"uri": URI},
        auto_id=True,
        drop_old=True,  # Always start with a fresh collection
    )
```

### Async vs Sync: Add Documents

Now let's compare the performance of synchronous vs asynchronous document addition. These functions will help us measure how much faster async operations can be when adding multiple documents to the vector store. The async version creates tasks for each document addition and runs them concurrently, while the sync version processes documents one by one:


```python
async def async_add(milvus_store, num_adding):
    """Add documents asynchronously and measure the time"""
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    tasks = []
    for doc in docs:
        # Create tasks for each document addition
        task = milvus_store.aadd_documents([doc])
        tasks.append(task)
    results = await asyncio.gather(*tasks)
    end_time = time.time()
    return end_time - start_time


def sync_add(milvus_store, num_adding):
    """Add documents synchronously and measure the time"""
    docs = generate_test_documents(num_adding)
    start_time = time.time()
    for doc in docs:
        result = milvus_store.add_documents([doc])
    end_time = time.time()
    return end_time - start_time
```

Now let's execute our performance tests with different document counts to see the real-world performance differences. We'll test with varying loads to understand how async operations scale compared to their synchronous counterparts. The tests will measure execution time for both approaches and help demonstrate the performance benefits of asynchronous operations:


```python
add_counts = [10, 100]

# Get the event loop
loop = asyncio.get_event_loop()

# Create a new vector store for testing
milvus_store = init_vector_store()

# Test async document addition
for count in add_counts:

    async def measure_async_add():
        async_time = await async_add(milvus_store, count)
        print(f"Async add for {count} documents took {async_time:.2f} seconds")
        return async_time

    loop.run_until_complete(measure_async_add())

# Reset vector store for sync tests
milvus_store = init_vector_store()

# Test sync document addition
for count in add_counts:
    sync_time = sync_add(milvus_store, count)
    print(f"Sync add for {count} documents took {sync_time:.2f} seconds")
```

    2025-06-05 10:44:12,274 [DEBUG][_create_connection]: Created new connection using: dd5f77bb78964c079da42c2446b03bf6 (async_milvus_client.py:599)


    Async add for 10 documents took 1.74 seconds


    2025-06-05 10:44:16,940 [DEBUG][_create_connection]: Created new connection using: 8b13404a78654cdd9b790371eb44e427 (async_milvus_client.py:599)


    Async add for 100 documents took 2.77 seconds
    Sync add for 10 documents took 5.36 seconds
    Sync add for 100 documents took 65.60 seconds


### Async vs Sync: Search

For the search performance comparison, we'll need to populate the vector store first. The following functions will help us measure search performance by creating multiple concurrent search queries and comparing the execution time between synchronous and asynchronous approaches:


```python
def populate_vector_store(milvus_store, num_docs=1000):
    """Populate the vector store with test documents"""
    docs = generate_test_documents(num_docs)
    milvus_store.add_documents(docs)
    return docs


async def async_search(milvus_store, num_queries):
    """Perform async searches and measure the time"""
    start_time = time.time()
    tasks = []
    for i in range(num_queries):
        query = f"test document {i % 50}"
        task = milvus_store.asimilarity_search(query=query, k=3)
        tasks.append(task)
    results = await asyncio.gather(*tasks)
    end_time = time.time()
    return end_time - start_time


def sync_search(milvus_store, num_queries):
    """Perform sync searches and measure the time"""
    start_time = time.time()
    for i in range(num_queries):
        query = f"test document {i % 50}"
        result = milvus_store.similarity_search(query=query, k=3)
    end_time = time.time()
    return end_time - start_time
```

Now let's run comprehensive search performance tests to see how async operations scale compared to synchronous ones. We'll test with different query volumes to demonstrate the performance benefits of asynchronous operations, especially as the number of concurrent operations increases:


```python
# Initialize and populate the vector store
milvus_store = init_vector_store()
populate_vector_store(milvus_store, 1000)

query_counts = [10, 100]

# Test async search
for count in query_counts:

    async def measure_async_search():
        async_time = await async_search(milvus_store, count)
        print(f"Async search for {count} queries took {async_time:.2f} seconds")
        return async_time

    loop.run_until_complete(measure_async_search())

# Test sync search
for count in query_counts:
    sync_time = sync_search(milvus_store, count)
    print(f"Sync search for {count} queries took {sync_time:.2f} seconds")
```

    2025-06-05 10:45:28,131 [DEBUG][_create_connection]: Created new connection using: 851824591c64415baac843e676e78cdd (async_milvus_client.py:599)


    Async search for 10 queries took 2.31 seconds
    Async search for 100 queries took 3.72 seconds
    Sync search for 10 queries took 6.07 seconds
    Sync search for 100 queries took 54.22 seconds


### Async vs Sync: Delete

Delete operations are another critical aspect where async operations can provide significant performance improvements. Let's create functions to measure the performance difference between synchronous and asynchronous delete operations. These tests will help demonstrate how async operations can handle batch deletions more efficiently:


```python
async def async_delete(milvus_store, num_deleting):
    """Delete documents asynchronously and measure the time"""
    start_time = time.time()
    tasks = []
    for i in range(num_deleting):
        expr = f"id == 'doc_{i}'"
        task = milvus_store.adelete(expr=expr)
        tasks.append(task)
    results = await asyncio.gather(*tasks)
    end_time = time.time()
    return end_time - start_time


def sync_delete(milvus_store, num_deleting):
    """Delete documents synchronously and measure the time"""
    start_time = time.time()
    for i in range(num_deleting):
        expr = f"id == 'doc_{i}'"
        result = milvus_store.delete(expr=expr)
    end_time = time.time()
    return end_time - start_time
```

Now let's execute the delete performance tests to quantify the performance difference. We'll start with a fresh vector store populated with test data, then perform delete operations using both synchronous and asynchronous approaches:


```python
delete_counts = [10, 100]

# Initialize and populate the vector store
milvus_store = init_vector_store()
populate_vector_store(milvus_store, 1000)

# Test async delete
for count in delete_counts:

    async def measure_async_delete():
        async_time = await async_delete(milvus_store, count)
        print(f"Async delete for {count} operations took {async_time:.2f} seconds")
        return async_time

    loop.run_until_complete(measure_async_delete())

# Reset and repopulate the vector store for sync tests
milvus_store = init_vector_store()
populate_vector_store(milvus_store, 1000)

# Test sync delete
for count in delete_counts:
    sync_time = sync_delete(milvus_store, count)
    print(f"Sync delete for {count} operations took {sync_time:.2f} seconds")
```

    2025-06-05 10:46:57,211 [DEBUG][_create_connection]: Created new connection using: 504e9ce3be92411e87077971c82baca2 (async_milvus_client.py:599)


    Async delete for 10 operations took 0.58 seconds


    2025-06-05 10:47:12,309 [DEBUG][_create_connection]: Created new connection using: 22c1513b444e4c40936e2176d7a1a154 (async_milvus_client.py:599)


    Async delete for 100 operations took 0.61 seconds
    Sync delete for 10 operations took 2.82 seconds
    Sync delete for 100 operations took 29.21 seconds


## Conclusion

This tutorial demonstrated the significant performance advantages of using asynchronous operations with LangChain and Milvus. We compared the synchronous and asynchronous versions of add, search, and delete operations, showing how async operations can provide substantial speed improvements, especially for large batch operations.

Key takeaways:
1. Async operations deliver the most benefit when performing many individual operations that can run in parallel
2. For workload that generates higher throughput, the performance gap between sync and async operations widens
3. Async operations fully utilize the compute power of the machines

When building production RAG applications with LangChain and Milvus, consider using the async API when performance is a concern, especially for concurrent operations.

