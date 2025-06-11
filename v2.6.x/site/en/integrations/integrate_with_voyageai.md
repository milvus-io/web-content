---
id: integrate_with_voyageai.md
title: Semantic Search with Milvus and VoyageAI
summary: This page discusses vector database integration with VoyageAI's embedding API.
---

# Semantic Search with Milvus and VoyageAI

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/semantic_search_with_milvus_and_voyageai.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/semantic_search_with_milvus_and_voyageai.ipynb" target="_blank"><img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a>

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
    

## Searching images with VoyageAI & Milvus

```python
import base64
import voyageai
from pymilvus import MilvusClient
import urllib.request
import matplotlib.pyplot as plt
from io import BytesIO
import urllib.request
import fitz  # PyMuPDF
from PIL import Image
```

```python
def pdf_url_to_screenshots(url: str, zoom: float = 1.0) -> list[Image]:

    # Ensure that the URL is valid
    if not url.startswith("http") and url.endswith(".pdf"):
        raise ValueError("Invalid URL")

    # Read the PDF from the specified URL
    with urllib.request.urlopen(url) as response:
        pdf_data = response.read()
    pdf_stream = BytesIO(pdf_data)
    pdf = fitz.open(stream=pdf_stream, filetype="pdf")

    images = []

    # Loop through each page, render as pixmap, and convert to PIL Image
    mat = fitz.Matrix(zoom, zoom)
    for n in range(pdf.page_count):
        pix = pdf[n].get_pixmap(matrix=mat)

        # Convert pixmap to PIL Image
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        images.append(img)

    # Close the document
    pdf.close()

    return images


def image_to_base64(image):
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    return img_str.decode("utf-8")

DIMENSION = 1024  # Dimension of vector embedding
```

Then we need to prepare the input data for Milvus. Let's reuse the VoyageAI client we created in the previous chapter. For the available VoyageAI multimodal embedding model check this [page](https://docs.voyageai.com/docs/multimodal-embeddings).

```python
pages = pdf_url_to_screenshots("https://www.fdrlibrary.org/documents/356632/390886/readingcopy.pdf", zoom=3.0)
inputs = [[img] for img in pages]

vectors = client.multimodal_embed(inputs, model="voyage-multimodal-3")

inputs = [i[0] if isinstance(i[0], str) else image_to_base64(i[0]) for i in inputs]
# Prepare data to be stored in Milvus vector database.
# We can store the id, vector representation, raw text and labels such as "subject" in this case in Milvus.
data = [
    {"id": i, "vector": vectors.embeddings[i], "data": inputs[i], "subject": "fruits"}
    for i in range(len(inputs))
]
```

Next, we create a Milvus database connection and insert the embeddings to the Milvus database.

```python
milvus_client = MilvusClient(uri="milvus_voyage_multi_demo.db")
COLLECTION_NAME = "demo_collection"  # Milvus collection name
# Create a collection to store the vectors and text.
if milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(collection_name=COLLECTION_NAME, dimension=DIMENSION)

# Insert all data into Milvus vector database.
res = milvus_client.insert(collection_name="demo_collection", data=data)

print(res["insert_count"])
```

Now we are ready to search the images. Here, the query is a string, but we can query with images as well. (check the documentation for the multimodal API [here](https://docs.voyageai.com/docs/multimodal-embeddings)).
We use matplotlib to show the result images.

```python
queries = [["The consequences of a dictator's peace"]]

query_vectors = client.multimodal_embed(
    inputs=queries, model="voyage-multimodal-3", truncation=False
).embeddings

res = milvus_client.search(
    collection_name=COLLECTION_NAME,  # target collection
    data=query_vectors,  # query vectors
    limit=4,  # number of returned entities
    output_fields=["data", "subject"],  # specifies fields to be returned
)

for q in queries:
    print("Query:", q)
    for result in res:
        fig, axes = plt.subplots(1, len(result), figsize=(66, 6))
        for n, page in enumerate(result):
            page_num = page['id']
            axes[n].imshow(pages[page_num])
            axes[n].axis("off")

    plt.tight_layout()
    plt.show()
```
