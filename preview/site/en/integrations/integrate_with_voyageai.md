---
id: integrate_with_voyageai.md
title: Semantic Search with Milvus and VoyageAI
summary: This page discusses vector database integration with VoyageAI's embedding API.
---

# Semantic Search with Milvus and VoyageAI

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/semantic_search_with_milvus_and_voyageai.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

This guide showcases how [VoyageAI's Embedding API](https://docs.voyageai.com/docs/embeddings) can be used with Milvus vector database to conduct semantic search on text.

## Getting started
Before you start, make sure you have the Voyage API key ready, or you get one from the [VoyageAI website](https://dash.voyageai.com/api-keys).

The data used in this example are book titles. You can download the dataset [here](https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks) and put it in the same directory where you run the following code.

First, install the package for Milvus and Voyage AI:


```python
$ pip install --upgrade voyageai pymilvus
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime**. (Click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

With this, we're ready to generate embeddings and use vector database to conduct semantic search.

## Searching book titles with VoyageAI & Milvus

In the following example, we load book title data from the downloaded CSV file, use Voyage AI embedding model to generate vector representations, and store them in Milvus vector database for semantic search.


```python
import voyageai
from pymilvus import MilvusClient

MODEL_NAME = "voyage-law-2"  # Which model to use, please check https://docs.voyageai.com/docs/embeddings for available models
DIMENSION = 1024  # Dimension of vector embedding

# Connect to VoyageAI with API Key.
voyage_client = voyageai.Client(api_key="<YOUR_VOYAGEAI_API_KEY>")

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

vectors = voyage_client.embed(texts=docs, model=MODEL_NAME, truncation=False).embeddings

# Prepare data to be stored in Milvus vector database.
# We can store the id, vector representation, raw text and labels such as "subject" in this case in Milvus.
data = [
    {"id": i, "vector": vectors[i], "text": docs[i], "subject": "history"}
    for i in range(len(docs))
]


# Connect to Milvus, all data is stored in a local file named "milvus_voyage_demo.db"
# in current directory. You can also connect to a remote Milvus server following this
# instruction: https://milvus.io/docs/install_standalone-docker.md.
milvus_client = MilvusClient(uri="milvus_voyage_demo.db")
COLLECTION_NAME = "demo_collection"  # Milvus collection name
# Create a collection to store the vectors and text.
if milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(collection_name=COLLECTION_NAME, dimension=DIMENSION)

# Insert all data into Milvus vector database.
res = milvus_client.insert(collection_name="demo_collection", data=data)

print(res["insert_count"])
```

<div class="alert note">

As for the argument of `MilvusClient`:

- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

With all data in Milvus vector database, we can now perform semantic search by generating vector embedding for the query and conduct vector search.


```python
queries = ["When was artificial intelligence founded?"]

query_vectors = voyage_client.embed(
    texts=queries, model=MODEL_NAME, truncation=False
).embeddings

res = milvus_client.search(
    collection_name=COLLECTION_NAME,  # target collection
    data=query_vectors,  # query vectors
    limit=2,  # number of returned entities
    output_fields=["text", "subject"],  # specifies fields to be returned
)

for q in queries:
    print("Query:", q)
    for result in res:
        print(result)
    print("\n")
```

    Query: When was artificial intelligence founded?
    [{'id': 0, 'distance': 0.7196218371391296, 'entity': {'text': 'Artificial intelligence was founded as an academic discipline in 1956.', 'subject': 'history'}}, {'id': 1, 'distance': 0.6297335028648376, 'entity': {'text': 'Alan Turing was the first person to conduct substantial research in AI.', 'subject': 'history'}}]
    
    

