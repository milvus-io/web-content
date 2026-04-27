---
id: build_RAG_with_milvus_and_gemini.md
summary: In this tutorial, we will show you how to build a RAG (Retrieval-Augmented Generation) pipeline with Milvus and Gemini. We will use the Gemini model to generate text based on a given query. We will also use Milvus to store and retrieve the generated text.
title: Build RAG with Milvus and Gemini
---

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_gemini.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_gemini.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

# Build RAG with Milvus and Gemini

The [Gemini API](https://ai.google.dev/gemini-api/docs) and [Google AI Studio](https://ai.google.dev/aistudio) help you start working with Google's latest models and turn your ideas into applications that scale. Gemini provides access to powerful language models like `Gemini-2.5-Flash` and `Gemini-2.5-Pro` for tasks such as text generation, document processing, vision, audio analysis, and more. It also offers `Gemini Embedding 2`, a multimodal embedding model supporting text, images, video, audio, and PDF documents with flexible output dimensions via Matryoshka Representation Learning. The API allows you to input long context with millions of tokens, fine-tune models for specific tasks, generate structured outputs like JSON, and leverage capabilities like semantic retrieval and code execution.

In this tutorial, we will show you how to build a RAG (Retrieval-Augmented Generation) pipeline with Milvus and Gemini. We will use the Gemini model to generate responses based on a given query, augmented with relevant information retrieved from Milvus.

## Preparation
### Dependencies and Environment

First, install the required packages:


```shell
$ pip install --upgrade pymilvus milvus-lite google-genai requests tqdm
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

You should first log in to the Google AI Studio platform and prepare the [api key](https://aistudio.google.com/apikey) `GEMINI_API_KEY` as an environment variable.


```python
import os

os.environ["GEMINI_API_KEY"] = "***********"
```

### Prepare the data

We use the FAQ pages from the [Milvus Documentation 2.4.x](https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip) as the private knowledge in our RAG, which is a good data source for a simple RAG pipeline.

Download the zip file and extract documents to the folder `milvus_docs`.


```shell
$ wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
$ unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs
```

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

We use the `gemini-2.5-flash` as LLM, and the `gemini-embedding-2-preview` as embedding model. `gemini-embedding-2-preview` is Google's latest multimodal embedding model, supporting text, images, video, audio, and PDF documents with flexible output dimensions (128–3,072) via Matryoshka Representation Learning.

Let's try to generate a test response from the LLM:


```python
from google import genai

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

response = client.models.generate_content(
    model="gemini-2.5-flash", contents="who are you"
)
print(response.text)
```

    I am a large language model, trained by Google.
    
    I'm designed to process and generate human-like text based on the vast amount of data I was trained on. This allows me to:
    
    *   Answer questions
    *   Provide summaries
    *   Generate creative content
    *   Translate languages
    *   And much more
    
    I don't have personal experiences, feelings, or consciousness. I'm a tool designed to be helpful and informative.


Generate a test embedding and print its dimension and first few elements.


```python
test_embeddings = client.models.embed_content(
    model="gemini-embedding-2-preview", contents=["This is a test1", "This is a test2"]
)

embedding_dim = len(test_embeddings.embeddings[0].values)
print(embedding_dim)
print(test_embeddings.embeddings[0].values[:10])
```

    3072
    [-0.016769307, 0.013630492, 0.020277105, 0.0035285393, 0.003968259, -0.013498845, 0.028525498, 0.025498547, -0.021553498, 0.015233516]


## Load data into Milvus

### Create the Collection

Let's initialize the Milvus client and set up our collection:


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
    # Strong consistency waits for all loads to complete, adding latency with large datasets
    # consistency_level="Strong",  # Strong consistency level
)
```

### Insert data
Iterate through the text lines, create embeddings, and then insert the data into Milvus.

Here is a new field `text`, which is a non-defined field in the collection schema. It will be automatically added to the reserved JSON dynamic field, which can be treated as a normal field at a high level.


```python
from tqdm import tqdm

data = []

doc = client.models.embed_content(model="gemini-embedding-2-preview", contents=text_lines)

for i, line in enumerate(tqdm(text_lines, desc="Creating embeddings")):
    data.append({"id": i, "vector": doc.embeddings[i].values, "text": line})

milvus_client.insert(collection_name=collection_name, data=data)
```

    Creating embeddings: 100%|██████████| 72/72 [00:00<00:00, 337796.30it/s]





    {'insert_count': 72, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 'cost': 0}



## Build RAG

### Retrieve data for a query

Let's specify a frequent question about Milvus.


```python
question = "How is data stored in milvus?"
```

Search for the question in the collection and retrieve the semantic top-3 matches.


```python
quest_embed = client.models.embed_content(model="gemini-embedding-2-preview", contents=question)

search_res = milvus_client.search(
    collection_name=collection_name,
    data=[quest_embed.embeddings[0].values],
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
            0.864
        ],
        [
            "Why is there no vector data in etcd?\n\netcd stores Milvus module metadata; MinIO stores entities.",
            0.7923
        ],
        [
            "What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###",
            0.7857
        ]
    ]


### Use LLM to get a RAG response

Convert the retrieved documents into a string format.


```python
context = "\n".join(
    [line_with_distance[0] for line_with_distance in retrieved_lines_with_distances]
)
```

Define system and user prompts for the Language Model. This prompt is assembled with the retrieved documents from Milvus.


```python
from google.genai import types

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

Use Gemini to generate a response based on the prompts.


```python
response = client.models.generate_content(
    model="gemini-2.5-flash",
    config=types.GenerateContentConfig(system_instruction=SYSTEM_PROMPT),
    contents=USER_PROMPT,
)
print(response.text)
```

    Milvus stores data in two main ways:
    
    1.  **Inserted Data:** This includes vector data, scalar data, and collection-specific schema. This type of data is stored in persistent storage as an incremental log. Milvus supports various object storage backends for this, such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS).
    2.  **Metadata:** Metadata is generated within Milvus by its various modules. Each module's metadata is stored in etcd.


## Multimodal Search

Since `gemini-embedding-2-preview` maps text, images, and other modalities into the same embedding space, we can perform cross-modal search — for example, using a text query to find the most relevant images.

### Prepare image data

We download a set of RAG architecture diagrams from the Milvus Bootcamp repository to use as our image dataset.


```python
import urllib.request
from pathlib import Path

image_dir = Path("images")
image_dir.mkdir(exist_ok=True)

image_files = [
    "vanilla_rag.png",
    "hyde.png",
    "query_routing.png",
    "self_reflection.png",
    "hybrid_and_rerank.png",
    "hierarchical_index.png",
]

base_url = "https://raw.githubusercontent.com/milvus-io/bootcamp/master/pics/advanced_rag/"

for fname in image_files:
    path = image_dir / fname
    if not path.exists():
        urllib.request.urlretrieve(base_url + fname, path)
        print(f"Downloaded {fname}")
    else:
        print(f"Already exists {fname}")

print(f"\nTotal images: {len(image_files)}")
```

    Downloaded vanilla_rag.png
    Downloaded hyde.png
    Downloaded query_routing.png
    Downloaded self_reflection.png
    Downloaded hybrid_and_rerank.png
    Downloaded hierarchical_index.png
    
    Total images: 6

### Embed images and store in Milvus

We read each image as bytes and pass it to `gemini-embedding-2-preview` to generate embeddings, then store them in a new Milvus collection.


```python
from google.genai import types

image_data = []

for fname in image_files:
    path = image_dir / fname
    with open(path, "rb") as f:
        image_bytes = f.read()

    result = client.models.embed_content(
        model="gemini-embedding-2-preview",
        contents=types.Part.from_bytes(data=image_bytes, mime_type="image/png"),
    )
    image_data.append(
        {
            "id": len(image_data),
            "vector": result.embeddings[0].values,
            "filename": fname,
        }
    )
    print(f"Embedded {fname}")

# Create a new collection for images
image_collection = "image_collection"
if milvus_client.has_collection(image_collection):
    milvus_client.drop_collection(image_collection)

milvus_client.create_collection(
    collection_name=image_collection,
    dimension=len(image_data[0]["vector"]),
    metric_type="IP",
)

milvus_client.insert(collection_name=image_collection, data=image_data)
print(f"\nInserted {len(image_data)} image embeddings (dim={len(image_data[0]['vector'])})")
```

    Embedded vanilla_rag.png
    Embedded hyde.png
    Embedded query_routing.png
    Embedded self_reflection.png
    Embedded hybrid_and_rerank.png
    Embedded hierarchical_index.png
    
    Inserted 6 image embeddings (dim=3072)

### Cross-modal search: Text query → Image results

Now let's use a text query to search across image embeddings. Since both text and images are mapped into the same embedding space, we can directly compare them.


```python
from IPython.display import display, Image

text_queries = [
    "How does a basic RAG pipeline work?",
    "What is the hypothetical document embedding approach?",
    "How to combine hybrid search with reranking?",
]

for query in text_queries:
    query_embed = client.models.embed_content(
        model="gemini-embedding-2-preview", contents=query
    )

    results = milvus_client.search(
        collection_name=image_collection,
        data=[query_embed.embeddings[0].values],
        limit=1,
        search_params={"metric_type": "IP", "params": {}},
        output_fields=["filename"],
    )

    best = results[0][0]
    print(f"\nQuery: {query}")
    print(f"Match: {best['entity']['filename']} (score: {best['distance']:.4f})")
    display(Image(filename=str(image_dir / best["entity"]["filename"]), width=600))
```

    
    Query: How does a basic RAG pipeline work?
    Match: vanilla_rag.png (score: 0.5132)



    
![Vanilla RAG Pipeline](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build_RAG_with_milvus_and_gemini_38_1.png)
    


    
    Query: What is the hypothetical document embedding approach?
    Match: hyde.png (score: 0.4756)



    
![HyDE](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build_RAG_with_milvus_and_gemini_38_3.png)
    


    
    Query: How to combine hybrid search with reranking?
    Match: hybrid_and_rerank.png (score: 0.5271)



    
![Hybrid Retrieval and Reranking](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build_RAG_with_milvus_and_gemini_38_5.png)
    


Great! We have successfully built a RAG pipeline with Milvus and Gemini, and demonstrated cross-modal search using text queries to retrieve relevant images — all powered by the unified embedding space of `gemini-embedding-2-preview`.
