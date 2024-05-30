---
id: integrate_with_llamaindex.md
summary: This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using LlamaIndex and Milvus.
title: Retrieval-Augmented Generation (RAG) with Milvus and LlamaIndex
---

# Retrieval-Augmented Generation (RAG) with Milvus and LlamaIndex

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_llamaindex.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using LlamaIndex and Milvus.

The RAG system combines a retrieval system with a generative model to generate new text based on a given prompt. The system first retrieves relevant documents from a corpus using a vector similarity search engine like Milvus, and then uses a generative model to generate new text based on the retrieved documents.

[LlamaIndex](https://www.llamaindex.ai/) is a simple, flexible data framework for connecting custom data sources to large language models (LLMs). [Milvus](https://milvus.io/) is the world's most advanced open-source vector database, built to power embedding similarity search and AI applications.

In this notebook we are going to show a quick demo of using the MilvusVectorStore. 

## Before you begin

### Install dependencies
Code snippets on this page require pymilvus and llamaindex dependencies. You can install them using the following commands:


```python
$ pip install pymilvus>=2.4.2
```


```python
$ pip install llama-index-vector-stores-milvus
```


```python
$ pip install llama-index
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime**.

</div>

### Setup OpenAI

Lets first begin by adding the openai api key. This will allow us to access chatgpt.


```python
import openai

openai.api_key = "sk-***********"
```

### Prepare data

You can download sample data with the following commands:


```python
$ mkdir -p 'data/paul_graham/'
$ wget 'https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt' -O 'data/paul_graham/paul_graham_essay.txt'
```

## Getting Started

### Generate our data
As a first example, lets generate a document from the file found in the `data/paul_graham/` folder. In this folder there is a single essay from Paul Graham titled `What I Worked On`. To generate the documents we will use the SimpleDirectoryReader.


```python
from llama_index.core import SimpleDirectoryReader

# load documents
documents = SimpleDirectoryReader("./data/paul_graham/").load_data()

print("Document ID:", documents[0].doc_id)
```

    Document ID: 11c3a6fe-799e-4e40-8122-2339936c2722


### Create an index across the data

Now that we have a document, we can can create an index and insert the document. For the index we will use a GPTMilvusIndex. GPTMilvusIndex takes in a few arguments:

- `uri (str, optional)`: The URI to connect to, comes in the form of "https://address:port" if using Milvus or Zilliz Cloud service, or "path/to/local/milvus.db" if using a lite local Milvus. Defaults to "./milvus_llamaindex.db".
- `token (str, optional)`: The token for log in. Empty if not using rbac, if using rbac it will most likely be "username:password". Defaults to "".
- `collection_name (str, optional)`: The name of the collection where data will be stored. Defaults to "llamalection".
- `dim (int, optional)`: The dimension of the embeddings. If it is not provided, collection creation will be done on first insert. Defaults to None.
- `embedding_field (str, optional)`: The name of the embedding field for the collection, defaults to DEFAULT_EMBEDDING_KEY.
- `doc_id_field (str, optional)`: The name of the doc_id field for the collection, defaults to DEFAULT_DOC_ID_KEY.
- `similarity_metric (str, optional)`: The similarity metric to use, currently supports IP and L2. Defaults to "IP".
- `consistency_level (str, optional)`: Which consistency level to use for a newly created collection. Defaults to "Strong".
- `overwrite (bool, optional)`: Whether to overwrite existing collection with same name. Defaults to False.
- `text_key (str, optional)`: What key text is stored in in the passed collection. Used when bringing your own collection. Defaults to None.
- `index_config (dict, optional)`: The configuration used for building the Milvus index. Defaults to None.
- `search_config (dict, optional)`: The configuration used for searching the Milvus index. Note that this must be compatible with the index type specified by index_config. Defaults to None.

<div class="alert note">

Please note that **Milvus Lite** requires `pymilvus>=2.4.2`.

</div>


```python
# Create an index over the documnts
from llama_index.core import VectorStoreIndex, StorageContext
from llama_index.vector_stores.milvus import MilvusVectorStore


vector_store = MilvusVectorStore(uri="./milvus_demo.db", dim=1536, overwrite=True)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
```

### Query the data
Now that we have our document stored in the index, we can ask questions against the index. The index will use the data stored in itself as the knowledge base for chatgpt.


```python
import textwrap


query_engine = index.as_query_engine()
response = query_engine.query("What did the author learn?")
print(textwrap.fill(str(response), 100))
```

    The author learned about programming on early computers like the IBM 1401 using Fortran, the
    limitations of early computing technology, the transition to microcomputers, and the excitement of
    having a personal computer like the TRS-80. Additionally, the author explored different academic
    paths, initially planning to study philosophy but eventually switching to AI due to a lack of
    interest in philosophy courses. Later on, the author pursued art education, attending RISD and the
    Accademia di Belli Arti in Florence, where they encountered a different approach to teaching art.



```python
response = query_engine.query("What was a hard moment for the author?")
print(textwrap.fill(str(response), 100))
```

    Dealing with the stress and challenges related to managing Hacker News was a difficult moment for
    the author.


This next test shows that overwriting removes the previous data.


```python
from llama_index.core import Document


vector_store = MilvusVectorStore(uri="./milvus_demo.db", dim=1536, overwrite=True)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    [Document(text="The number that is being searched for is ten.")],
    storage_context,
)
query_engine = index.as_query_engine()
res = query_engine.query("Who is the author?")
print("Res:", res)
```

    Res: The author is the individual who created the content or work in question.


The next test shows adding additional data to an already existing  index.


```python
del index, vector_store, storage_context, query_engine

vector_store = MilvusVectorStore(uri="./milvus_demo.db", overwrite=False)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
query_engine = index.as_query_engine()
res = query_engine.query("What is the number?")
print("Res:", res)
```

    Res: The number is ten.



```python
res = query_engine.query("Who is the author?")
print("Res:", res)
```

    Res: Paul Graham
