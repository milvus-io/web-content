---
id: basic_usage_langchain.md
summary: This notebook shows how to use functionality related to the Milvus vector database.
title: Use Milvus as a Vector Store
---

# Use Milvus as a LangChain Vector Store

This notebook shows how to use functionality related to the [Milvus](https://milvus.io/docs/overview.md) as a [LangChain vector store](https://python.langchain.com/docs/integrations/vectorstores/).

## Setup

You'll need to install `langchain-milvus` and other necessary dependencies.



```shell
$ pip install -qU langchain-milvus milvus-lite langchain-openai
```

The latest version of pymilvus comes with a local vector database Milvus Lite, good for prototyping. If you have large scale of data such as more than a million docs, we recommend setting up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/install_standalone-docker.md#Start-Milvus).


## Initialization




```python
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
```


```python
from langchain_milvus import Milvus

# The easiest way is to use Milvus Lite where everything is stored in a local file.
# If you have a Milvus server you can use the server URI such as "http://localhost:19530".
URI = "./milvus_example.db"

vector_store = Milvus(
    embedding_function=embeddings,
    connection_args={"uri": URI},
)
```

### Compartmentalize the data with Milvus Collections

You can store different unrelated documents in different collections within same Milvus instance to maintain the context

Here's how you can create a new vector store collection from documents:


```python
from langchain_core.documents import Document

vector_store_saved = Milvus.from_documents(
    [Document(page_content="foo!")],
    embeddings,
    collection_name="langchain_example",
    connection_args={"uri": URI},
)
```

And here is how you retrieve that stored collection


```python
vector_store_loaded = Milvus(
    embeddings,
    connection_args={"uri": URI},
    collection_name="langchain_example",
)
```

## Manage vector store

Once you have created your vector store, we can interact with it by adding and deleting different items.

### Add items to vector store

We can add items to our vector store by using the `add_documents` function.


```python
from uuid import uuid4

from langchain_core.documents import Document

document_1 = Document(
    page_content="I had chocalate chip pancakes and scrambled eggs for breakfast this morning.",
    metadata={"source": "tweet"},
)

document_2 = Document(
    page_content="The weather forecast for tomorrow is cloudy and overcast, with a high of 62 degrees.",
    metadata={"source": "news"},
)

document_3 = Document(
    page_content="Building an exciting new project with LangChain - come check it out!",
    metadata={"source": "tweet"},
)

document_4 = Document(
    page_content="Robbers broke into the city bank and stole $1 million in cash.",
    metadata={"source": "news"},
)

document_5 = Document(
    page_content="Wow! That was an amazing movie. I can't wait to see it again.",
    metadata={"source": "tweet"},
)

document_6 = Document(
    page_content="Is the new iPhone worth the price? Read this review to find out.",
    metadata={"source": "website"},
)

document_7 = Document(
    page_content="The top 10 soccer players in the world right now.",
    metadata={"source": "website"},
)

document_8 = Document(
    page_content="LangGraph is the best framework for building stateful, agentic applications!",
    metadata={"source": "tweet"},
)

document_9 = Document(
    page_content="The stock market is down 500 points today due to fears of a recession.",
    metadata={"source": "news"},
)

document_10 = Document(
    page_content="I have a bad feeling I am going to get deleted :(",
    metadata={"source": "tweet"},
)

documents = [
    document_1,
    document_2,
    document_3,
    document_4,
    document_5,
    document_6,
    document_7,
    document_8,
    document_9,
    document_10,
]
uuids = [str(uuid4()) for _ in range(len(documents))]

vector_store.add_documents(documents=documents, ids=uuids)
```




    ['31915e2d-55fd-4bfb-ae08-d441252b8e08',
     'dbf6560a-1487-4a6e-8797-245d57874f5b',
     'e991a253-5f37-46ae-850a-82a660e33013',
     '2818c051-5a1a-44cb-9deb-aaaac709f616',
     '91c7ef07-26d1-4319-b48c-9261df9ce8d7',
     'fb258085-6400-4cd7-aa92-fc5e32ca243e',
     'ffea9a9f-460d-4d8d-ba07-c45e9cfa1e33',
     'eb149e29-239a-4e2c-9f99-751cb7207abf',
     '119d4a42-fd6b-433d-842b-1e0be5df81e5',
     '5b099eb0-98fe-40a3-b13a-300c10250960']



### Delete items from vector store


```python
vector_store.delete(ids=[uuids[-1]])
```




    True



## Query vector store

Once your vector store has been created and the relevant documents have been added you will most likely wish to query it during the running of your chain or agent. 

### Query directly

#### Similarity search

Performing a simple similarity search with filtering on metadata can be done as follows:


```python
results = vector_store.similarity_search(
    "LangChain provides abstractions to make working with LLMs easy",
    k=2,
    expr='source == "tweet"',
    # param=...  # Search params for the index type
)
for res in results:
    print(f"* {res.page_content} [{res.metadata}]")
```

    WARNING: All log messages before absl::InitializeLog() is called are written to STDERR
    I0000 00:00:1761298048.354308 7886403 fork_posix.cc:71] Other threads are currently calling into gRPC, skipping fork() handlers


    * Building an exciting new project with LangChain - come check it out! [{'source': 'tweet', 'pk': 'e991a253-5f37-46ae-850a-82a660e33013'}]
    * LangGraph is the best framework for building stateful, agentic applications! [{'source': 'tweet', 'pk': 'eb149e29-239a-4e2c-9f99-751cb7207abf'}]


#### Similarity search with score

You can also search with score:


```python
results = vector_store.similarity_search_with_score(
    "Will it be hot tomorrow?", k=1, expr='source == "news"'
)
for res, score in results:
    print(f"* [SIM={score:3f}] {res.page_content} [{res.metadata}]")
```

    * [SIM=0.893776] The weather forecast for tomorrow is cloudy and overcast, with a high of 62 degrees. [{'source': 'news', 'pk': 'dbf6560a-1487-4a6e-8797-245d57874f5b'}]


For a full list of all the search options available when using the `Milvus` vector store, you can visit the [API reference](https://python.langchain.com/api_reference/milvus/vectorstores/langchain_milvus.vectorstores.milvus.Milvus.html).

### Query by turning into retriever

You can also transform the vector store into a retriever for easier usage in your chains. 


```python
retriever = vector_store.as_retriever(search_type="mmr", search_kwargs={"k": 1})
retriever.invoke("Stealing from the bank is a crime", expr='source == "news"')
```

    I0000 00:00:1761298049.275354 7886403 fork_posix.cc:71] Other threads are currently calling into gRPC, skipping fork() handlers





    [Document(metadata={'source': 'news', 'pk': '2818c051-5a1a-44cb-9deb-aaaac709f616'}, page_content='Robbers broke into the city bank and stole $1 million in cash.')]



## Usage for Retrieval-Augmented Generation

For guides on how to use this vector store for retrieval-augmented generation (RAG), see this [RAG guide](https://milvus.io/docs/integrate_with_langchain.md).

### Per-User Retrieval

When building a retrieval app, you often have to build it with multiple users in mind. This means that you may be storing data not just for one user, but for many different users, and they should not be able to see eachother’s data.

Milvus recommends using [partition_key](https://milvus.io/docs/multi_tenancy.md#Partition-key-based-multi-tenancy) to implement multi-tenancy, here is an example.
> The feature of Partition key is now not available in Milvus Lite, if you want to use it, you need to start Milvus server from [docker or kubernetes](https://milvus.io/docs/install_standalone-docker.md#Start-Milvus).


```python
from langchain_core.documents import Document

docs = [
    Document(page_content="i worked at kensho", metadata={"namespace": "harrison"}),
    Document(page_content="i worked at facebook", metadata={"namespace": "ankush"}),
]
vectorstore = Milvus.from_documents(
    docs,
    embeddings,
    collection_name="partitioned_collection",  # Use a different collection name
    connection_args={"uri": URI},
    # drop_old=True,
    partition_key_field="namespace",  # Use the "namespace" field as the partition key
)
```

To conduct a search using the partition key, you should include either of the following in the boolean expression of the search request:

`search_kwargs={"expr": '<partition_key> == "xxxx"'}`

`search_kwargs={"expr": '<partition_key> == in ["xxx", "xxx"]'}`

Do replace `<partition_key>` with the name of the field that is designated as the partition key.

Milvus changes to a partition based on the specified partition key, filters entities according to the partition key, and searches among the filtered entities.



```python
# This will only get documents for Ankush
vectorstore.as_retriever(search_kwargs={"expr": 'namespace == "ankush"'}).invoke(
    "where did i work?"
)
```




    [Document(metadata={'namespace': 'ankush', 'pk': 460829372217788296}, page_content='i worked at facebook')]




```python
# This will only get documents for Harrison
vectorstore.as_retriever(search_kwargs={"expr": 'namespace == "harrison"'}).invoke(
    "where did i work?"
)
```




    [Document(metadata={'namespace': 'harrison', 'pk': 460829372217788295}, page_content='i worked at kensho')]



## API reference

For detailed documentation, head to the API reference: https://reference.langchain.com/python/integrations/langchain_milvus/
