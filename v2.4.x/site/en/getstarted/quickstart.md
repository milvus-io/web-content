---
id: quickstart.md
summary: Get started with Milvus.
title: Quickstart
---

# Quickstart

Vectors, the output data format of Neural Network models, can effectively encode information and serve a pivotal role in AI applications such as knowledge base, semantic search, Retrieval Augmented Generation (RAG) and more. 

Milvus is an open-source vector database that suits AI applictions of every size from running a demo chatbot in Jupyter notebook to building web-scale search that serves billions of users. In this guide, we will walk you through how to set up Milvus locally within minutes and use the Python client library to generate, store and search vectors. 

## Install Milvus

In this guide we use Milvus Lite, a python library included in pymilvus that can be embedded into the client application. Milvus also supports deployment on [Docker](install_standalone-docker.md) and [Kubenetes](install_cluster-milvusoperator.md) for production use cases.

Before starting, make sure you have Python 3.7+ available in the local environment. Now let's install pymilvus which contains both the python client library and Milvus Lite (`-U` is used to force updates if you have installed an older version of pymilvus before):

```
pip install -U pymilvus
```

## Setup Vector Database

To create a local Milvus vector database, simply instantiate a MilvusClient by specifying a file name to store all data, such as `"milvus_demo.db"`.

```python
from pymilvus import MilvusClient

client = MilvusClient("milvus_demo.db")
```

## Create a Collection

In Milvus, we need a collection to store vectors and their associated metadata. You can think of it as a table in traditional SQL databases. When creating a collection, you can define schema and index params to configure vector specs such as dimensionality, index types and distant metrics. There are also complex concepts to optimize the index for vector search performance. For now, let's just focus on the basics and use default for everything possible. At minimum, you only need to set the collection name and the dimension of the vector field of the collection.

```python
client.create_collection(
    collection_name="demo_collection",
    dimension=768  # The vectors we will use in this demo has 768 dimensions
)
```

In the above setup, 

- The primary key and vector fields use their default names ("**id**" and "**vector**"). The [auto-id feature](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md) isn't used. The integer value of the primary key field must be specified.
- The metric type (vector distance definition) is set to its default value ([COSINE](https://milvus.io/docs/metric.md#Cosine-Similarity)).
- The dimension field must match the dimension of vectors to be inserted.
- This supports any metadata field, but doesn't build index for them. If you need more efficient metadata filtering, please specify the [scala index](https://milvus.io/docs/scalar_index.md).

Alternatively, you can formally define the schema of the collection by following [this instruction](https://milvus.io/docs/schema.md).

## Prepare Data

In this guide, we use vectors to perform semantic search on text. We need to generate vectors for text by downloading embedding models.

### Use embedding model to generate vectors for text

For convenience, `pymilvus` contains a subpackage that integrates most commonly used embedding models, such as open-source `SentenceTransformer` models and OpenAI embedding API. Let's install the `pymilvus[model]` package.

```
pip install pymilvus[model]
```

We can generate vector embeddings with a default open-source model. Running the following code will automatically download this small model of about 50MB. We also need to compose the data object to be inserted. Milvus expects data to be inserted organized as a list of dictionaries, where each dictionary represents a data record, termed as an entity.

```python
from pymilvus import model

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
data = [ {"id": i, "vector": vectors[i], "text": docs[i], "subject": "history"} for i in range(len(vectors)) ]

print("Data has", len(data), "entities, each with fields: ", data[0].keys())
print("Vector dim:", len(data[0]["vector"]))
```

<div class="alert note">

The above code snippet requires downloading a small embedding model. If you prefer to use fake representation with random vectors, do as follows:

```python
import random

# Text strings to search from.
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

# Use fake representation with random vectors (768 dimension).
vectors = [ [ random.uniform(-1, 1) for _ in range(768) ] for _ in docs ]
data = [ {"id": i, "vector": vectors[i], "text": docs[i], "subject": "history"} for i in range(len(vectors)) ]

print("Data has", len(data), "entities, each with fields: ", data[0].keys())
print("Vector dim:", len(data[0]["vector"]))
```

</div>


## Insert data

Let's insert the data into the collection:

```python
res = client.insert(
    collection_name="demo_collection",
    data=data
)

print(res)

# Output
# {'insert_count': 3, 'ids': [0, 1, 2], 'cost': 0}
```

## Search search

Now we can do semantic searches by representing the search query text as vector, and conduct vector similarity search on Milvus.

### Vector search

Milvus accepts one or multiple vector search requests at the same time. The value of the **query_vectors** variable is a list of vectors, where each vector is an array of float numbers.

```python
query_vectors = embedding_fn.encode_queries([ "Who is Alan Turing?" ])
# If you don't have the embedding function you can use a fake vector to finish the demo:
# query_vectors = [ [ random.uniform(-1, 1) for _ in range(768) ] ]

res = client.search(
    collection_name="demo_collection", # target collection
    data=query_vectors,                # query vectors
    limit=2,                           # number of returned entities
    output_fields=["text", "subject"], # specifies fields to be returned
)

print(res)

# Output
# data: ["[{'id': 2, 'distance': 0.5859944820404053, 'entity': {'text': 'Born in Maida Vale, London, Turing was raised in southern England.', 'subject': 'history'}}, {'id': 1, 'distance': 0.5118255019187927, 'entity': {'text': 'Alan Turing was the first person to conduct substantial research in AI.', 'subject': 'history'}}]"] , extra_info: {'cost': 0}
```

The output is a list of results, each mapping to a vector search query. Each query contains a list of results, where each result contains the entity primary key, the distance to the query vector, and the entity details with specified `output_fields`.

### Vector Search with Metadata Filtering

You can also conduct vector search while considering the values of the metadata (called "scalar" fields in Milvus, as scalar refers to non-vector data). This is done with a filter expression specifying certain criteria. Let's see how to search and filter with the `subject` field in the following example.

```python
# Insert more docs in another subject.
docs = [
    "Machine learning has been used for drug design.",
    "Computational synthesis with AI algorithms predicts molecular properties.",
    "DDR1 is involved in cancers and fibrosis.",
]
vectors = embedding_fn.encode_documents(docs)
data = [ {"id": 2+i, "vector": vectors[i], "text": docs[i], "subject": "biology"} for i in range(len(vectors)) ]

client.insert(
    collection_name="demo_collection",
    data=data
)

# This will exclude any text in "history" subject despite close to the query vector.
res = client.search(
    collection_name="demo_collection",
    data=embedding_fn.encode_queries([ "tell me AI related information" ]),
    filter="subject == 'biology'",
    limit=2,
    output_fields=["text", "subject"],
)

print(res)

# Output
#
# [
#     [
#         {
#             "id": 551,
#             "distance": 0.08821295201778412,
#             "entity": {}
#         },
#         {
#             "id": 760,
#             "distance": 0.07432225346565247,
#             "entity": {}
#         },
#     ]
# ]
```

By default, the scalar fields are not indexed. If you need to perform metadata filtered search in large dataset, you can consider using fixed schema and also turn on the [index](https://milvus.io/docs/scalar_index.md) to improve the search performance. 

In addition to vector search, you can also perform other types of searches:

### Query

A query() is an operation that retrieves all entities matching a cretria, such as a [filter expression](https://milvus.io/docs/boolean.md) or matching some ids.

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
    ids=[0,2],
    output_fields=["vector", "text", "subject"]
)
```

### Delete entities

If you'd like to purge data, you can delete entities specifying the primary key or delete all entities matching a particular filter expression.

```python
# Delete entities by primary key
res = client.delete(
    collection_name="demo_collection",
    ids=[0,2]
)

print(res)

# Output
#
# {
#     "delete_count": 2
# }

# Delete entities by a filter expression
res = client.delete(
    collection_name="demo_collection",
    filter="subject == 'biology'",
)

print(res)

# Output
#
# {
#     "delete_count": 3
# }
```

## Load Existing Data

Since all data of Milvus Lite is stored in a local file, you can load all data into memory even after the program terminates, by creating a **MilvusClient** with the existing file. For example, this will recover the collections from `"milvus_demo.db"` file and continue to write data into it.

```python
from pymilvus import MilvusClient

client = MilvusClient("milvus_demo.db")
```

## Drop the collection

If you would like to delete all the data in a collection, you can drop the collection with

```python
# 15. Drop collection
client.drop_collection(
    collection_name="demo_collection"
)
```

## Learn more

Milvus Lite is great for getting started with a local python program. If you have large scale data or would like to use Milvus in production, you can learn about deploying Milvus on [Docker](install_standalone-docker.md) and [Kubenetes](install_cluster-milvusoperator.md). All deployment modes of Milvus share the same API, so your client side code doesn't need to change much if moving to another deployment mode. Simply specify the [URI and Token](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md) of a Milvus server deployed anywhere:

```python
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)
```

Milvus provides REST and gRPC API, with client libraries in languages such as [Python](https://milvus.io/docs/install-pymilvus.md), [Java](https://milvus.io/docs/install-java.md), [Go](https://milvus.io/docs/install-go.md), C# and [Node.js](https://milvus.io/docs/install-node.md).