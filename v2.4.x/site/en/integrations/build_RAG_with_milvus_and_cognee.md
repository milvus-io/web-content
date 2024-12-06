---
id: build_RAG_with_milvus_and_cognee.md
summary: In this tutorial, we will show you how to build a RAG (Retrieval-Augmented Generation) pipeline with Milvus and Cognee.
title: Build RAG with Milvus and Cognee
---

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

### Build RAG with Milvus and Cognee

[Cognee](https://www.cognee.ai) is a developer-first platform that streamlines AI application development with scalable, modular ECL (Extract, Cognify, Load) pipelines. By integrating seamlessly with Milvus,  Cognee enables efficient connection and retrieval of conversations, documents, and transcriptions, reducing hallucinations and optimizing operational costs.

With strong support for vector stores like Milvus, graph databases, and LLMs, Cognee provides a flexible and customizable framework for building retrieval-augmented generation (RAG) systems. Its production-ready architecture ensures improved accuracy and efficiency for AI-powered applications. 

In this tutorial, we will show you how to build a RAG (Retrieval-Augmented Generation) pipeline with Milvus and Cognee.



```shell
$ pip install pymilvus git+https://github.com/topoteretes/cognee.git
```

> If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

By default, it use OpenAI as the LLM in this example. You should prepare the [api key](https://platform.openai.com/docs/quickstart), and set it in the config `set_llm_api_key()` function.

To configure Milvus as the vector database, set the `VECTOR_DB_PROVIDER` to `milvus` and specify the `VECTOR_DB_URL` and `VECTOR_DB_KEY`. Since we are using Milvus Lite to store data in this demo, only the `VECTOR_DB_URL` needs to be provided.


```python
import os

import cognee

cognee.config.set_llm_api_key("YOUR_OPENAI_API_KEY")


os.environ["VECTOR_DB_PROVIDER"] = "milvus"
os.environ["VECTOR_DB_URL"] = "./milvus.db"
```

<div class="alert note">

As for the environment variables `VECTOR_DB_URL` and `VECTOR_DB_KEY`:
- Setting the `VECTOR_DB_URL` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `VECTOR_DB_URL`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `VECTOR_DB_URL` and `VECTOR_DB_KEY`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</a>

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

## Build RAG

### Resetting Cognee Data


```python
await cognee.prune.prune_data()
await cognee.prune.prune_system(metadata=True)
```

With a clean slate ready, we can now add our dataset and process it into a knowledge graph.

### Adding Data and Cognifying


```python
await cognee.add(data=text_lines, dataset_name="milvus_faq")
await cognee.cognify()

# [DocumentChunk(id=UUID('6889e7ef-3670-555c-bb16-3eb50d1d30b0'), updated_at=datetime.datetime(2024, 12, 4, 6, 29, 46, 472907, tzinfo=datetime.timezone.utc), text='Does the query perform in memory? What are incremental data and historical data?\n\nYes. When ...
# ...
```

The `add` method loads the dataset (Milvus FAQs) into Cognee and the `cognify` method processes the data to extract entities, relationships, and summaries, constructing a knowledge graph.

### Querying for Summaries

Now that the data has been processed, let's query the knowledge graph.


```python
from cognee.api.v1.search import SearchType

query_text = "How is data stored in milvus?"
search_results = await cognee.search(SearchType.SUMMARIES, query_text=query_text)

print(search_results[0])
```

    {'id': 'de5c6713-e079-5d0b-b11d-e9bacd1e0d73', 'text': 'Milvus stores two data types: inserted data and metadata.'}


This query searches the knowledge graph for a summary related to the query text, and the most related candidate is printed.

### Querying for Chunks

Summaries offer high-level insights, but for more granular details, we can query specific chunks of data directly from the processed dataset. These chunks are derived from the original data that was added and analyzed during the knowledge graph creation.


```python
from cognee.api.v1.search import SearchType

query_text = "How is data stored in milvus?"
search_results = await cognee.search(SearchType.CHUNKS, query_text=query_text)
```

Let's format and display it for better readability!


```python
def format_and_print(data):
    print("ID:", data["id"])
    print("\nText:\n")
    paragraphs = data["text"].split("\n\n")
    for paragraph in paragraphs:
        print(paragraph.strip())
        print()


format_and_print(search_results[0])
```

    ID: 4be01c4b-9ee5-541c-9b85-297883934ab3
    
    Text:
    
    Where does Milvus store data?
    
    Milvus deals with two types of data, inserted data and metadata.
    
    Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).
    
    Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.
    
    ###
    


In our previous steps, we queried the Milvus FAQ dataset for both summaries and specific chunks of data. While this provided detailed insights and granular information, the dataset was large, making it challenging to clearly visualize the dependencies within the knowledge graph.

To address this, we will reset the Cognee environment and work with a smaller, more focused dataset. This will allow us to better demonstrate the relationships and dependencies extracted during the cognify process. By simplifying the data, we can clearly see how Cognee organizes and structures information in the knowledge graph.

### Reset Cognee


```python
await cognee.prune.prune_data()
await cognee.prune.prune_system(metadata=True)
```

### Adding the Focused Dataset

Here, a smaller dataset with only one line of text is added and processed to ensure a focused and easily interpretable knowledge graph.


```python
# We only use one line of text as the dataset, which simplifies the output later
text = """
    Natural language processing (NLP) is an interdisciplinary
    subfield of computer science and information retrieval.
    """

await cognee.add(text)
await cognee.cognify()
```

### Querying for Insights

By focusing on this smaller dataset, we can now clearly analyze the relationships and structure within the knowledge graph.


```python
query_text = "Tell me about NLP"
search_results = await cognee.search(SearchType.INSIGHTS, query_text=query_text)

for result_text in search_results:
    print(result_text)

# Example output:
# ({'id': UUID('bc338a39-64d6-549a-acec-da60846dd90d'), 'updated_at': datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), 'name': 'natural language processing', 'description': 'An interdisciplinary subfield of computer science and information retrieval.'}, {'relationship_name': 'is_a_subfield_of', 'source_node_id': UUID('bc338a39-64d6-549a-acec-da60846dd90d'), 'target_node_id': UUID('6218dbab-eb6a-5759-a864-b3419755ffe0'), 'updated_at': datetime.datetime(2024, 11, 21, 12, 23, 15, 473137, tzinfo=datetime.timezone.utc)}, {'id': UUID('6218dbab-eb6a-5759-a864-b3419755ffe0'), 'updated_at': datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), 'name': 'computer science', 'description': 'The study of computation and information processing.'})
# (...)
#
# It represents nodes and relationships in the knowledge graph:
# - The first element is the source node (e.g., 'natural language processing').
# - The second element is the relationship between nodes (e.g., 'is_a_subfield_of').
# - The third element is the target node (e.g., 'computer science').
```

This output represents the results of a knowledge graph query, showcasing entities (nodes) and their relationships (edges) as extracted from the processed dataset. Each tuple includes a source entity, a relationship type, and a target entity, along with metadata like unique IDs, descriptions, and timestamps. The graph highlights key concepts and their semantic connections, providing a structured understanding of the dataset.

Congratulations, you have learned the basic usage of cognee with Milvus. If you want to know more advanced usage of cognee, please refer to its official [page](https://github.com/topoteretes/cognee) .

