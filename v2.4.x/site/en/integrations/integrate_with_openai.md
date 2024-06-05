---
id: integrate_with_openai.md
title: Semantic Search with Milvus and OpenAI
summary: This page discusses vector database integration with OpenAI's embedding API.
---

# Semantic Search with Milvus and OpenAI

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/semantic_search_with_milvus_and_openai.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

This guide showcases how [OpenAI's Embedding API](https://platform.openai.com/docs/guides/embeddings) can be used with Milvus vector database to conduct semantic search on text.

## Getting started
Before you start, make sure you have the OpenAI API key ready, or you get one from the [OpenAI website](https://openai.com/index/openai-api/).

The data used in this example are book titles. You can download the dataset [here](https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks) and put it in the same directory where you run the following code.

First, install the package for Milvus and OpenAI:

```shell
pip install --upgrade openai pymilvus
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime**.

</div>

With this, we're ready to generate embeddings and use vector database to conduct semantic search.

## Searching book titles with OpenAI & Milvus

In the following example, we load book title data from the downloaded CSV file, use OpenAI embedding model to generate vector representations, and store them in Milvus vector database for semantic search.


```python
from openai import OpenAI
from pymilvus import MilvusClient

MODEL_NAME = "text-embedding-3-small"  # Which model to use, please check https://platform.openai.com/docs/guides/embeddings for available models
DIMENSION = 1536  # Dimension of vector embedding

# Connect to OpenAI with API Key.
openai_client = OpenAI(api_key="<YOUR_OPENAI_API_KEY>")

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

vectors = [
    vec.embedding
    for vec in openai_client.embeddings.create(input=docs, model=MODEL_NAME).data
]

# Prepare data to be stored in Milvus vector database.
# We can store the id, vector representation, raw text and labels such as "subject" in this case in Milvus.
data = [
    {"id": i, "vector": vectors[i], "text": docs[i], "subject": "history"}
    for i in range(len(docs))
]


# Connect to Milvus, all data is stored in a local file named "milvus_openai_demo.db"
# in current directory. You can also connect to a remote Milvus server following this
# instruction: https://milvus.io/docs/install_standalone-docker.md.
milvus_client = MilvusClient("milvus_openai_demo.db")
COLLECTION_NAME = "demo_collection"  # Milvus collection name
# Create a collection to store the vectors and text.
milvus_client.create_collection(collection_name=COLLECTION_NAME, dimension=DIMENSION)

# Insert all data into Milvus vector database.
res = milvus_client.insert(collection_name="demo_collection", data=data)

print(res["insert_count"])
```

With all data in Milvus vector database, we can now perform semantic search by generating vector embedding for the query and conduct vector search.


```python
queries = ["When was artificial intelligence founded?"]

query_vectors = [
    vec.embedding
    for vec in openai_client.embeddings.create(input=queries, model=MODEL_NAME).data
]

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

You should see the following as the output:


```python
[
    {
        "id": 0,
        "distance": -0.772376537322998,
        "entity": {
            "text": "Artificial intelligence was founded as an academic discipline in 1956.",
            "subject": "history",
        },
    },
    {
        "id": 1,
        "distance": -0.58596271276474,
        "entity": {
            "text": "Alan Turing was the first person to conduct substantial research in AI.",
            "subject": "history",
        },
    },
]
```
