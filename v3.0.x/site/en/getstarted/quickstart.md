---
id: quickstart.md
summary: Get started with Milvus.
title: Quickstart
---

# Quickstart

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/tutorials/quickstart/quickstart.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/quickstart.ipynb" target="_blank"><img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a>

Vectors, the output data format of Neural Network models, can effectively encode information and serve a pivotal role in AI applications such as knowledge base, semantic search, Retrieval Augmented Generation (RAG) and more.

Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot in Jupyter notebook to building web-scale search that serves billions of users. In this guide, we will walk you through how to set up Milvus locally within minutes and use the Python client library to generate, store and search vectors.

## Install Milvus

Choose one path: use Milvus Lite for a local example, or connect to a Milvus server you have already deployed. Both paths use the collection and query examples below.

### Use a local database

This guide uses Milvus Lite, an optional dependency of the PyMilvus Python SDK that runs locally. For a server deployment, see [Docker](install_standalone-docker.md) or [Kubernetes](install_cluster-milvusoperator.md).

Use Python 3.10 or later on macOS, Linux, or Windows, with binary wheels available for Milvus Lite's dependencies such as `faiss-cpu` and `pyarrow`. The examples use PyMilvus 3.0.2 and Milvus Lite 3.2.2. Install both packages explicitly:

```bash
python3 -m pip install "pymilvus[milvus-lite]==3.0.2" "milvus-lite==3.2.2"
```

On Windows, pip skips the `milvus-lite` extra of PyMilvus 3.0.2; the command above names `milvus-lite` explicitly, so the local path works there as well. For SDK-only installation requirements, see [Install Milvus Python SDK](install-pymilvus.md).

<div class="alert note">

> If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime**. (Click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

### Use an existing Milvus server

If you have already installed Milvus with Docker or Kubernetes, or have a Zilliz Cloud endpoint, install only the SDK. PyMilvus 3.0.2 requires Python 3.9 or later; you do not need the local Lite dependency for this path:

```bash
python3 -m pip install "pymilvus==3.0.2"
```

Use the server connection block in the next section instead of opening a `.db` path. Confirm that the SDK version is compatible with your server; see [Release Notes](release_notes.md).

## Set Up Vector Database

Choose exactly one connection block below.

### Local Milvus Lite

To create a local Milvus vector database, instantiate a `MilvusClient` with a storage path, such as `milvus_demo.db`. Milvus Lite 3.x creates a directory at this path, even when its name ends in `.db`.

If you have a database file created by Milvus Lite 2.x, export it with the old version before migrating. Do not open that file directly with Milvus Lite 3.x. See [Migrating data from Milvus Lite](milvus_lite.md#Migrating-data-from-Milvus-Lite).

```python
from pymilvus import MilvusClient

client = MilvusClient("milvus_demo.db")
```

### Existing Milvus server

For a local Docker deployment, connect to its server endpoint. For Zilliz Cloud, replace the URI with the cluster endpoint and the token with your API key:

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")
```

Use your configured credentials if you have changed them. The remaining examples use the `client` you selected; they do not require a separate local Lite database.

## Create a Collection

In Milvus, we need a collection to store vectors and their associated metadata. You can think of it as a table in traditional SQL databases. When creating a collection, you can define schema and index params to configure vector specs such as dimensionality, index types and distant metrics. There are also complex concepts to optimize the index for vector search performance. For now, let's just focus on the basics and use default for everything possible. At minimum, you only need to set the collection name and the dimension of the vector field of the collection.

```python
if client.has_collection(collection_name="demo_collection"):
    client.drop_collection(collection_name="demo_collection")
client.create_collection(
    collection_name="demo_collection",
    dimension=768,  # The vectors we will use in this demo have 768 dimensions
)
```

In the above setup,

- The primary key and vector fields use their default names ("id" and "vector").
- The metric type (vector distance definition) is set to its default value ([COSINE](https://milvus.io/docs/metric.md#Cosine-Similarity)).
- The primary key field accepts integers and does not automatically increment (namely, not using [auto-id feature](https://milvus.io/docs/schema.md)).
  Alternatively, you can formally define the schema of the collection by following this [instruction](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md).

## Prepare Data

In this guide, we use vectors to perform semantic search on text. We need to generate vectors for text by downloading embedding models. This can be easily done by using the utility functions from `pymilvus[model]` library.

## Represent text with vectors

First, install the model library. This package includes essential ML tools such as PyTorch. The package download may take some time if your local environment has never installed PyTorch.

```bash
python3 -m pip install "pymilvus[model]==3.0.2"
```

Generate vector embeddings with default model. Milvus expects data to be inserted organized as a list of dictionaries, where each dictionary represents a data record, termed as an entity.

```python
from pymilvus import model

# If connection to https://huggingface.co/ failed, uncomment the following path
# import os
# os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'

# This will download a small embedding model "paraphrase-albert-small-v2" (~50MB).
embedding_fn = model.DefaultEmbeddingFunction()

# Text strings to search from.
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

vectors = embedding_fn.encode_documents(docs)
# The output vector has 768 dimensions, matching the collection that we just created.
print("Dim:", embedding_fn.dim, vectors[0].shape)  # Dim: 768 (768,)

# Each entity has id, vector representation, raw text, and a subject label that we use
# to demo metadata filtering later.
data = [
    {"id": i, "vector": vectors[i], "text": docs[i], "subject": "history"}
    for i in range(len(vectors))
]

print("Data has", len(data), "entities, each with fields: ", data[0].keys())
print("Vector dim:", len(data[0]["vector"]))
```

```
Dim: 768 (768,)
Data has 3 entities, each with fields:  dict_keys(['id', 'vector', 'text', 'subject'])
Vector dim: 768
```

## [Alternatively] Use fake representation with random vectors

If you couldn't download the model due to network issues, as a walkaround, you can use random vectors to represent the text and still finish the example. Just note that the search result won't reflect semantic similarity as the vectors are fake ones.

```python
import random

# Text strings to search from.
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]
# Use fake representation with random vectors (768 dimension).
# Keep the same interface as the model-backed path so the remaining examples run.
class DemoEmbeddingFunction:
    dim = 768

    def __init__(self):
        self.rng = random.Random(42)

    def encode_documents(self, texts):
        return [[self.rng.uniform(-1, 1) for _ in range(self.dim)] for _ in texts]

    def encode_queries(self, texts):
        return self.encode_documents(texts)

embedding_fn = DemoEmbeddingFunction()
vectors = embedding_fn.encode_documents(docs)
data = [
    {"id": i, "vector": vectors[i], "text": docs[i], "subject": "history"}
    for i in range(len(vectors))
]

print("Data has", len(data), "entities, each with fields: ", data[0].keys())
print("Vector dim:", len(data[0]["vector"]))
```

```
Data has 3 entities, each with fields:  dict_keys(['id', 'vector', 'text', 'subject'])
Vector dim: 768
```

## Insert Data

Let's insert the data into the collection:

```python
res = client.insert(collection_name="demo_collection", data=data)

print(res)
```

```
{'insert_count': 3, 'ids': [0, 1, 2], 'cost': 0}
```

## Semantic Search

Now we can do semantic searches by representing the search query text as vector, and conduct vector similarity search on Milvus.

### Vector search

Milvus accepts one or multiple vector search requests at the same time. The value of the query_vectors variable is a list of vectors, where each vector is an array of float numbers.

```python
query_vectors = embedding_fn.encode_queries(["Who is Alan Turing?"])
# If you don't have the embedding function you can use a fake vector to finish the demo:
# query_vectors = [ [ random.uniform(-1, 1) for _ in range(768) ] ]

res = client.search(
    collection_name="demo_collection",  # target collection
    data=query_vectors,  # query vectors
    limit=2,  # number of returned entities
    output_fields=["text", "subject"],  # specifies fields to be returned
)

print(res)
```

```
data: ["[{'id': 2, 'distance': 0.5859944820404053, 'entity': {'text': 'Born in Maida Vale, London, Turing was raised in southern England.', 'subject': 'history'}}, {'id': 1, 'distance': 0.5118255615234375, 'entity': {'text': 'Alan Turing was the first person to conduct substantial research in AI.', 'subject': 'history'}}]"] , extra_info: {'cost': 0}
```

The output is a list of results, each mapping to a vector search query. Each query contains a list of results, where each result contains the entity primary key, the distance to the query vector, and the entity details with specified `output_fields`.

## Vector Search with Metadata Filtering

You can also conduct vector search while considering the values of the metadata (called "scalar" fields in Milvus, as scalar refers to non-vector data). This is done with a filter expression specifying certain criteria. Let's see how to search and filter with the `subject` field in the following example.

```python
# Insert more docs in another subject.
docs = [
    "Machine learning has been used for drug design.",
    "Computational synthesis with AI algorithms predicts molecular properties.",
    "DDR1 is involved in cancers and fibrosis.",
]
vectors = embedding_fn.encode_documents(docs)
data = [
    {"id": 3 + i, "vector": vectors[i], "text": docs[i], "subject": "biology"}
    for i in range(len(vectors))
]

client.insert(collection_name="demo_collection", data=data)

# This will exclude any text in "history" subject despite close to the query vector.
res = client.search(
    collection_name="demo_collection",
    data=embedding_fn.encode_queries(["tell me AI related information"]),
    filter="subject == 'biology'",
    limit=2,
    output_fields=["text", "subject"],
)

print(res)
```

```
data: ["[{'id': 4, 'distance': 0.27030569314956665, 'entity': {'text': 'Computational synthesis with AI algorithms predicts molecular properties.', 'subject': 'biology'}}, {'id': 3, 'distance': 0.16425910592079163, 'entity': {'text': 'Machine learning has been used for drug design.', 'subject': 'biology'}}]"] , extra_info: {'cost': 0}
```

By default, the scalar fields are not indexed. If you need to perform metadata filtered search in large dataset, you can consider using fixed schema and also turn on the [index](https://milvus.io/docs/scalar_index.md) to improve the search performance.

In addition to vector search, you can also perform other types of searches:

### Query

A query() is an operation that retrieves all entities matching a criteria, such as a [filter expression](https://milvus.io/docs/boolean.md) or matching some ids.

For example, retrieving all entities whose scalar field has a particular value:

```python
res = client.query(
    collection_name="demo_collection",
    filter="subject == 'history'",
    output_fields=["text", "subject"],
)
```

Directly retrieve entities by primary key:

```python
res = client.query(
    collection_name="demo_collection",
    ids=[0, 2],
    output_fields=["vector", "text", "subject"],
)
```

## Delete Entities

If you'd like to purge data, you can delete entities specifying the primary key or delete all entities matching a particular filter expression.

```python
# Delete entities by primary key
res = client.delete(collection_name="demo_collection", ids=[0, 2])

print(res)

# Delete entities by a filter expression
res = client.delete(
    collection_name="demo_collection",
    filter="subject == 'biology'",
)

print(res)
```

```
[0, 2]
[3, 4, 5]
```

## Load Existing Data

This section applies to the local Lite path. For a server deployment, reconnect with the same server URI and credentials instead.

Milvus Lite persists data under its local storage path. Close the client before reopening the same path to continue using the existing collections:

```python
from pymilvus import MilvusClient

client.close()
client = MilvusClient("milvus_demo.db")
```

## Drop the collection

If you would like to delete all the data in a collection, you can drop the collection with

```python
# Drop collection
client.drop_collection(collection_name="demo_collection")
```

## Learn More

After completing the local example, choose a next step:

- Build an application with [Retrieval Augmented Generation (RAG)](build-rag-with-milvus.md).
- Design fields and filters for your own data with [Data Model Design for Search](schema-hands-on.md).
- Compare local and server requirements with [Milvus Deployment Options](install-overview.md).

Milvus Lite is great for getting started with a local python program. If you have large scale data or would like to use Milvus in production, you can learn about deploying Milvus on [Docker](https://milvus.io/docs/install_standalone-docker.md) and [Kubernetes](https://milvus.io/docs/install_cluster-milvusoperator.md). All deployment modes of Milvus share the same API, so your client side code doesn't need to change much if moving to another deployment mode. Simply specify the [URI and Token](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md) of a Milvus server deployed anywhere:

```python
client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")
```

To migrate data from Milvus Lite to Milvus deployed on Docker or Kubernetes, refer to [Migrating data from Milvus Lite](milvus_lite.md#Migrating-data-from-Milvus-Lite).

Milvus provides REST and gRPC API, with client libraries in languages such as [Python](https://milvus.io/docs/install-pymilvus.md), [Java](https://milvus.io/docs/install-java.md), [Go](https://milvus.io/docs/install-go.md), C# and [Node.js](https://milvus.io/docs/install-node.md).

For schema design, Milvus supports flexible schema design, where you can define the fields and their data types, including vector fields. You can also define the index type and parameters for each field. For more information, see [Data Model Design for Search](https://milvus.io/docs/schema-hands-on.md).

## Milvus for AI Agents

If you are using AI coding assistants like Claude Code or Cursor, you can install [Milvus Skill](https://github.com/zilliztech/milvus-skill) to help your AI tools write correct Milvus code.

For more agent tools including MCP servers and curated prompts, see [Milvus for AI Agents](milvus_for_agents.md).
