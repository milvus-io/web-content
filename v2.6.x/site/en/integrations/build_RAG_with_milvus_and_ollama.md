---
id: build_RAG_with_milvus_and_ollama.md
summary: In this guide, we’ll show you how to leverage Ollama and Milvus to build a RAG (Retrieval-Augmented Generation) pipeline efficiently and securely.
title: Build RAG with Milvus and Ollama
---

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_ollama.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_ollama.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

# Build RAG with Milvus and Ollama

[Ollama](https://ollama.com/) is an open-source platform that simplifies running and customizing large language models (LLMs) locally. It provides a user-friendly, cloud-free experience, enabling effortless model downloads, installation, and interaction without requiring advanced technical skills. With a growing library of pre-trained LLMs—from general-purpose to domain-specific—Ollama makes it easy to manage and customize models for various applications. It ensures data privacy and flexibility, empowering users to fine-tune, optimize, and deploy AI-driven solutions entirely on their machines.

In this guide, we’ll show you how to leverage Ollama and Milvus to build a RAG (Retrieval-Augmented Generation) pipeline efficiently and securely.



## Preparation
### Dependencies and Environment


```shell
$ pip install pymilvus ollama
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

### Prepare the data

We use the FAQ pages from the [Milvus Documentation 2.4.x](https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip) as the private knowledge in our RAG, which is a good data source for a simple RAG pipeline.

Download the zip file and extract documents to the folder `milvus_docs`.


```shell
$ wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
$ unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs
```

    --2024-11-26 21:47:19--  https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
    Resolving github.com (github.com)... 140.82.112.4
    Connecting to github.com (github.com)|140.82.112.4|:443... connected.
    HTTP request sent, awaiting response... 302 Found
    Location: https://objects.githubusercontent.com/github-production-release-asset-2e65be/267273319/c52902a0-e13c-4ca7-92e0-086751098a05?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=releaseassetproduction%2F20241127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241127T024720Z&X-Amz-Expires=300&X-Amz-Signature=7808b77cbdaa7e122196bcd75a73f29f2540333a350c4830bbdf5f286e876304&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3Dmilvus_docs_2.4.x_en.zip&response-content-type=application%2Foctet-stream [following]
    --2024-11-26 21:47:20--  https://objects.githubusercontent.com/github-production-release-asset-2e65be/267273319/c52902a0-e13c-4ca7-92e0-086751098a05?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=releaseassetproduction%2F20241127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241127T024720Z&X-Amz-Expires=300&X-Amz-Signature=7808b77cbdaa7e122196bcd75a73f29f2540333a350c4830bbdf5f286e876304&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3Dmilvus_docs_2.4.x_en.zip&response-content-type=application%2Foctet-stream
    Resolving objects.githubusercontent.com (objects.githubusercontent.com)... 185.199.109.133, 185.199.111.133, 185.199.108.133, ...
    Connecting to objects.githubusercontent.com (objects.githubusercontent.com)|185.199.109.133|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 613094 (599K) [application/octet-stream]
    Saving to: ‘milvus_docs_2.4.x_en.zip’
    
    milvus_docs_2.4.x_e 100%[===================>] 598.72K  1.20MB/s    in 0.5s    
    
    2024-11-26 21:47:20 (1.20 MB/s) - ‘milvus_docs_2.4.x_en.zip’ saved [613094/613094]
    


We load all markdown files from the folder `milvus_docs/en/faq`. For each document, we just simply use "# " to separate the content in the file, which can roughly separate the content of each main part of the markdown file.


```python
from glob import glob

text_lines = []

for file_path in glob("milvus_docs/en/faq/*.md", recursive=True):
    with open(file_path, "r") as file:
        file_text = file.read()

    text_lines += file_text.split("# ")
```

### Prepare the LLM and Embedding Model

Ollama supports multiple models for both LLM-based tasks and embedding generation, making it easy to develop retrieval-augmented generation (RAG) applications. For this setup:

- We will use **Llama 3.2 (3B)** as our LLM for text generation tasks.
- For embedding generation, we will use **mxbai-embed-large**, a 334M parameter model optimized for semantic similarity.

Before starting, ensure both models are pulled locally:


```python
! ollama pull mxbai-embed-large
```

    [?25lpulling manifest ⠋ [?25h[?25l[2K[1Gpulling manifest ⠙ [?25h[?25l[2K[1Gpulling manifest ⠹ [?25h[?25l[2K[1Gpulling manifest ⠸ [?25h[?25l[2K[1Gpulling manifest ⠼ [?25h[?25l[2K[1Gpulling manifest ⠴ [?25h[?25l[2K[1Gpulling manifest 
    pulling 819c2adf5ce6... 100% ▕████████████████▏ 669 MB                         
    pulling c71d239df917... 100% ▕████████████████▏  11 KB                         
    pulling b837481ff855... 100% ▕████████████████▏   16 B                         
    pulling 38badd946f91... 100% ▕████████████████▏  408 B                         
    verifying sha256 digest 
    writing manifest 
    success [?25h



```python
! ollama pull llama3.2
```

    [?25lpulling manifest ⠋ [?25h[?25l[2K[1Gpulling manifest ⠙ [?25h[?25l[2K[1Gpulling manifest ⠹ [?25h[?25l[2K[1Gpulling manifest ⠸ [?25h[?25l[2K[1Gpulling manifest ⠼ [?25h[?25l[2K[1Gpulling manifest ⠴ [?25h[?25l[2K[1Gpulling manifest 
    pulling dde5aa3fc5ff... 100% ▕████████████████▏ 2.0 GB                         
    pulling 966de95ca8a6... 100% ▕████████████████▏ 1.4 KB                         
    pulling fcc5a6bec9da... 100% ▕████████████████▏ 7.7 KB                         
    pulling a70ff7e570d9... 100% ▕████████████████▏ 6.0 KB                         
    pulling 56bb8bd477a5... 100% ▕████████████████▏   96 B                         
    pulling 34bb5ab01051... 100% ▕████████████████▏  561 B                         
    verifying sha256 digest 
    writing manifest 
    success [?25h


With these models ready, we can proceed to implement LLM-driven generation and embedding-based retrieval workflows.



```python
import ollama


def emb_text(text):
    response = ollama.embeddings(model="mxbai-embed-large", prompt=text)
    return response["embedding"]
```

Generate a test embedding and print its dimension and first few elements.


```python
test_embedding = emb_text("This is a test")
embedding_dim = len(test_embedding)
print(embedding_dim)
print(test_embedding[:10])
```

    1024
    [0.23276396095752716, 0.4257211685180664, 0.19724100828170776, 0.46120673418045044, -0.46039995551109314, -0.1413791924715042, -0.18261606991291046, -0.07602324336767197, 0.39991313219070435, 0.8337644338607788]


## Load data into Milvus

### Create the Collection


```python
from pymilvus import MilvusClient

milvus_client = MilvusClient(uri="./milvus_demo.db")

collection_name = "my_rag_collection"
```

<div class="alert note">

As for the argument of `MilvusClient`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

Check if the collection already exists and drop it if it does.


```python
if milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
```

Create a new collection with specified parameters. 

If we don't specify any field information, Milvus will automatically create a default `id` field for primary key, and a `vector` field to store the vector data. A reserved JSON field is used to store non-schema-defined fields and their values.


```python
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type="IP",  # Inner product distance
    consistency_level="Strong",  # Strong consistency level
)
```

### Insert data
Iterate through the text lines, create embeddings, and then insert the data into Milvus.

Here is a new field `text`, which is a non-defined field in the collection schema. It will be automatically added to the reserved JSON dynamic field, which can be treated as a normal field at a high level.


```python
from tqdm import tqdm

data = []

for i, line in enumerate(tqdm(text_lines, desc="Creating embeddings")):
    data.append({"id": i, "vector": emb_text(line), "text": line})

milvus_client.insert(collection_name=collection_name, data=data)
```

    Creating embeddings: 100%|██████████| 72/72 [00:03<00:00, 22.56it/s]





    {'insert_count': 72, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 'cost': 0}



## Build RAG

### Retrieve data for a query

Let's specify a frequent question about Milvus.


```python
question = "How is data stored in milvus?"
```

Search for the question in the collection and retrieve the semantic top-3 matches.


```python
search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        emb_text(question)
    ],  # Use the `emb_text` function to convert the question to an embedding vector
    limit=3,  # Return top 3 results
    search_params={"metric_type": "IP", "params": {}},  # Inner product distance
    output_fields=["text"],  # Return the text field
)
```

Let's take a look at the search results of the query



```python
import json

retrieved_lines_with_distances = [
    (res["entity"]["text"], res["distance"]) for res in search_res[0]
]
print(json.dumps(retrieved_lines_with_distances, indent=4))
```

    [
        [
            " Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###",
            231.9398193359375
        ],
        [
            "How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###",
            226.48316955566406
        ],
        [
            "What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###",
            210.60745239257812
        ]
    ]


### Use LLM to get a RAG response

Convert the retrieved documents into a string format.


```python
context = "\n".join(
    [line_with_distance[0] for line_with_distance in retrieved_lines_with_distances]
)
```

Define system and user prompts for the Lanage Model. This prompt is assembled with the retrieved documents from Milvus.


```python
SYSTEM_PROMPT = """
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
"""
USER_PROMPT = f"""
Use the following pieces of information enclosed in <context> tags to provide an answer to the question enclosed in <question> tags.
<context>
{context}
</context>
<question>
{question}
</question>
"""
```

Use the `llama3.2` model provided by Ollama to generate a response based on the prompts.



```python
from ollama import chat
from ollama import ChatResponse

response: ChatResponse = chat(
    model="llama3.2",
    messages=[
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": USER_PROMPT},
    ],
)
print(response["message"]["content"])
```

    According to the provided context, data in Milvus is stored in two types:
    
    1. **Inserted data**: Storing data in persistent storage as incremental log. It supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage.
    
    2. **Metadata**: Generated within Milvus and stored in etcd.


Great! We have successfully built a RAG pipeline with Milvus and Ollama.
