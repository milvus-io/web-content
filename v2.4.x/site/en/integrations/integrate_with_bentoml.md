---
id: integrate_with_bentoml.md
summary: This guide demonstrates how to use an open-source embedding model and large-language model on BentoCloud with Milvus vector database to build a Retrieval Augmented Generation (RAG) application. 
title: Retrieval-Augmented Generation (RAG) with Milvus and BentoML
---

# Retrieval-Augmented Generation (RAG) with Milvus and BentoML

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_bentoml.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

## Introduction
This guide demonstrates how to use an open-source embedding model and large-language model on BentoCloud with Milvus vector database to build a RAG (Retrieval Augmented Generation) application. 
BentoCloud is an AI Inference Platform for fast-moving AI teams, offering fully-managed infrastructure tailored for model inference. It works in conjunction with BentoML, an open-source model serving framework, to facilitate the easy creation and deployment of high-performance model services. In this demo, we use Milvus Lite as vector database, which is the lightweight version of Milvus that can be embedded into your Python application.

## Before you begin
Milvus Lite is available on PyPI. You can install it via pip for Python 3.8+:


```python
$ pip install -U pymilvus bentoml
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (Click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

After sign in the BentoCloud, we can interact with deployed BentoCloud Services in Deployments, and the corresponding END_POINT and API are located in Playground -> Python.
You can download the city data [here](https://github.com/ytang07/bento_octo_milvus_RAG/tree/main/data).

## Serving Embeddings with BentoML/BentoCloud 
To use this endpoint, import `bentoml` and set up an HTTP client using the `SyncHTTPClient` by specifying the endpoint and optionally the token (if you turn on `Endpoint Authorization` on BentoCloud). Alternatively, you can use the same model served through BentoML using its [Sentence Transformers Embeddings](https://github.com/bentoml/BentoSentenceTransformers) repository.


```python
import bentoml

BENTO_EMBEDDING_MODEL_END_POINT = "BENTO_EMBEDDING_MODEL_END_POINT"
BENTO_API_TOKEN = "BENTO_API_TOKEN"

embedding_client = bentoml.SyncHTTPClient(
    BENTO_EMBEDDING_MODEL_END_POINT, token=BENTO_API_TOKEN
)
```

Once we connect to the embedding_client, we need to process our data. We provided several functions to perform data splitting and embedding.

Read files and preprocess the text into a list of strings.


```python
# naively chunk on newlines
def chunk_text(filename: str) -> list:
    with open(filename, "r") as f:
        text = f.read()
    sentences = text.split("\n")
    return sentences
```

First we need to download the city data.


```python
import os
import requests
import urllib.request

# set up the data source
repo = "ytang07/bento_octo_milvus_RAG"
directory = "data"
save_dir = "./city_data"
api_url = f"https://api.github.com/repos/{repo}/contents/{directory}"


response = requests.get(api_url)
data = response.json()

if not os.path.exists(save_dir):
    os.makedirs(save_dir)

for item in data:
    if item["type"] == "file":
        file_url = item["download_url"]
        file_path = os.path.join(save_dir, item["name"])
        urllib.request.urlretrieve(file_url, file_path)
```

Next, we process each of the files we have.


```python
# please upload your data directory under this file's folder
cities = os.listdir("city_data")
# store chunked text for each of the cities in a list of dicts
city_chunks = []
for city in cities:
    chunked = chunk_text(f"city_data/{city}")
    cleaned = []
    for chunk in chunked:
        if len(chunk) > 7:
            cleaned.append(chunk)
    mapped = {"city_name": city.split(".")[0], "chunks": cleaned}
    city_chunks.append(mapped)
```

Splits a list of strings into a list of embeddings, each grouped 25 text strings.


```python
def get_embeddings(texts: list) -> list:
    if len(texts) > 25:
        splits = [texts[x : x + 25] for x in range(0, len(texts), 25)]
        embeddings = []
        for split in splits:
            embedding_split = embedding_client.encode(sentences=split)
            embeddings += embedding_split
        return embeddings
    return embedding_client.encode(
        sentences=texts,
    )
```

Now, we need to match up embeddings and text chunks. Since the list embeddings and the list of sentences should match by index, we can `enumerate` through either list to match them up. 


```python
entries = []
for city_dict in city_chunks:
    # No need for the embeddings list if get_embeddings already returns a list of lists
    embedding_list = get_embeddings(city_dict["chunks"])  # returns a list of lists
    # Now match texts with embeddings and city name
    for i, embedding in enumerate(embedding_list):
        entry = {
            "embedding": embedding,
            "sentence": city_dict["chunks"][
                i
            ],  # Assume "chunks" has the corresponding texts for the embeddings
            "city": city_dict["city_name"],
        }
        entries.append(entry)
    print(entries)
```

## Inserting Data into a Vector Database for Retrieval  
With our embeddings and data prepared, we can insert the vectors together with metadata into Milvus Lite for vector search later. The first step in this section is to start a client by connecting to Milvus Lite.
We simply import the `MilvusClient` module and initialize a Milvus Lite client that connects to your Milvus Lite vector database. The dimension size comes from the size of the embedding model, e.g. the Sentence Transformer model `all-MiniLM-L6-v2` produces vectors of 384 dimension. 


```python
from pymilvus import MilvusClient

COLLECTION_NAME = "Bento_Milvus_RAG"  # random name for your collection
DIMENSION = 384

# Initialize a Milvus Lite client
milvus_client = MilvusClient("milvus_demo.db")
```

<div class="alert note">

As for the argument of `MilvusClient`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

Or with old connections.connect API (not recommended):


```python
from pymilvus import connections

connections.connect(uri="milvus_demo.db")
```

## Creating Your Milvus Lite Collection 
Creating a collection using Milvus Lite involves two steps: first, defining the schema, and second, defining the index. For this section, we need one module: DataType tells us what type of data will be in a field. We also need to use two functions to create schema and add fields. create_schema():  creates a collection schema, add_field(): adds a field to the schema of a collection.


```python
from pymilvus import MilvusClient, DataType, Collection

# Create schema
schema = MilvusClient.create_schema(
    auto_id=True,
    enable_dynamic_field=True,
)

# 3.2. Add fields to schema
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
```

Now that we have created our schema and successfully defined data field, we need to define the index. In terms of search, an "index" defines how we are going to map our data out for retrieval. We use the default choice [AUTOINDEX](https://docs.zilliz.com/docs/autoindex-explained) to index our data for this project. 

Next, we create the collection with the previously given name, schema and index. Finally, we insert the previously processed data.


```python
# prepare index parameters
index_params = milvus_client.prepare_index_params()

# add index
index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",  # use autoindex instead of other complex indexing method
    metric_type="COSINE",  # L2, COSINE, or IP
)

# create collection
if milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(
    collection_name=COLLECTION_NAME, schema=schema, index_params=index_params
)

# Outside the loop, now you upsert all the entries at once
milvus_client.insert(collection_name=COLLECTION_NAME, data=entries)
```

## Set up Your LLM for RAG 
To build a RAG app, we need to deploy an LLM on BentoCloud. Let’s use the latest Llama3 LLM. Once it is up and running, simply copy the endpoint and token of this model service and set up a client for it. 


```python
BENTO_LLM_END_POINT = "BENTO_LLM_END_POINT"

llm_client = bentoml.SyncHTTPClient(BENTO_LLM_END_POINT, token=BENTO_API_TOKEN)
```

## LLM Instructions 
Now, we set up the LLM instructions with the prompt, context, and the question. Here is the function that behaves as an LLM and it then returns the output from the client in a string format.


```python
def dorag(question: str, context: str):

    prompt = (
        f"You are a helpful assistant. The user has a question. Answer the user question based only on the context: {context}. \n"
        f"The user question is {question}"
    )

    results = llm_client.generate(
        max_tokens=1024,
        prompt=prompt,
    )

    res = ""
    for result in results:
        res += result

    return res
```

## A RAG Example 
Now we’re ready to ask a question. This function simply takes a question and then does RAG to generate the relevant context from the background information. Then, we pass the context and the question to dorag() and get the result.


```python
question = "What state is Cambridge in?"


def ask_a_question(question):
    embeddings = get_embeddings([question])
    res = milvus_client.search(
        collection_name=COLLECTION_NAME,
        data=embeddings,  # search for the one (1) embedding returned as a list of lists
        anns_field="embedding",  # Search across embeddings
        limit=5,  # get me the top 5 results
        output_fields=["sentence"],  # get the sentence/chunk and city
    )

    sentences = []
    for hits in res:
        for hit in hits:
            print(hit)
            sentences.append(hit["entity"]["sentence"])
    context = ". ".join(sentences)
    return context


context = ask_a_question(question=question)
print(context)
```

Implement RAG


```python
print(dorag(question=question, context=context))
```

For the example question asking which state Cambridge is in, we can print the entire response from BentoML. However, if we take the time to parse through it, it just looks nicer, and it should tell us that Cambridge is located in Massachusetts.
