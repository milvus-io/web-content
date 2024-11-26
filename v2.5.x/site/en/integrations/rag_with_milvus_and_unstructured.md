---
id: rag_with_milvus_and_unstructured.md
summary: In this tutorial, we will use Unstructured to ingest PDF documents and then use Milvus to build a RAG pipeline.
title: Build a RAG with Milvus and Unstructured
---

# Build a RAG with Milvus and Unstructured

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_unstructured.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_unstructured.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

[Unstructured](https://docs.unstructured.io/welcome) provides a platform and tools to ingest and process unstructured documents for Retrieval Augmented Generation (RAG) and model fine-tuning. It offers both a no-code UI platform and serverless API services, allowing users to process data on Unstructured-hosted compute resources.

In this tutorial, we will use Unstructured to ingest PDF documents and then use Milvus to build a RAG pipeline.


## Preparation
### Dependencies and Environment


```python
$ pip install -qU "unstructured-ingest[pdf]" unstructured pymilvus openai
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

You can get your `UNSTRUCTURED_API_KEY` and `UNSTRUCTURED_URL` environment variables from [here](https://docs.unstructured.io/api-reference/api-services/saas-api-development-guide).

We will use OpenAI as the LLM in this example. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable.


```python
import os


os.environ["UNSTRUCTURED_API_KEY"] = "***********"
os.environ["UNSTRUCTURED_URL"] = "***********"

os.environ["OPENAI_API_KEY"] = "***********"
```

### Prepare Milvus and OpenAI clients
You can use the Milvus client to create a Milvus collection and insert data into it.


```python
from pymilvus import MilvusClient, DataType

# Initialize Milvus client
milvus_client = MilvusClient(uri="./milvus_demo.db")  # TODO
```

<div class="alert note">

As for the argument of `MilvusClient`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, say more than a million vectors, you can set up a more performant Milvus server on [Docker or Kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server address and port as your uri, e.g.`http://localhost:19530`. If you enable the authentication feature on Milvus, use "<your_username>:<your_password>" as the token, otherwise don't set the token.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

Check if the collection already exists and drop it if it does.


```python
collection_name = "my_rag_collection"

if milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
```

Prepare a OpenAI client to generate embeddings and generate responses.


```python
from openai import OpenAI

openai_client = OpenAI()


def emb_text(text):
    return (
        openai_client.embeddings.create(input=text, model="text-embedding-3-small")
        .data[0]
        .embedding
    )
```

Generate a test embedding and print its dimension and first few elements.


```python
test_embedding = emb_text("This is a test")
embedding_dim = len(test_embedding)
print(embedding_dim)
print(test_embedding[:10])
```

    1536
    [0.009889289736747742, -0.005578675772994757, 0.00683477520942688, -0.03805781528353691, -0.01824733428657055, -0.04121600463986397, -0.007636285852640867, 0.03225184231996536, 0.018949154764413834, 9.352207416668534e-05]


## Create Milvus Collection
We will create a collection with the following schema:
- `id`: the primary key, which is a unique identifier for each document.
- `vector`: the embedding of the document.
- `text`: the text content of the document.
- `metadata`: the metadata of the document.

Then we build an `AUTOINDEX` index on the `vector` field. And then create the collection.


```python
# Create schema
schema = milvus_client.create_schema(auto_id=False, enable_dynamic_field=False)
# Add fields to schema
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=embedding_dim)
schema.add_field(field_name="text", datatype=DataType.VARCHAR, max_length=65535)
schema.add_field(field_name="metadata", datatype=DataType.JSON)
index_params = MilvusClient.prepare_index_params()
index_params.add_index(
    field_name="vector",
    metric_type="COSINE",
    index_type="AUTOINDEX",
)
milvus_client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    consistency_level="Strong",
)

milvus_client.load_collection(collection_name=collection_name)
```

## Load data from Unstructured
Unstructured provides a flexible and powerful ingestion pipeline to process various file types, including PDF, HTML, and more.
We will use the ingest functionality to partition PDF files in a local directory. And then load the data into Milvus.


```python
from unstructured_ingest.v2.pipeline.pipeline import Pipeline
from unstructured_ingest.v2.interfaces import ProcessorConfig
from unstructured_ingest.v2.processes.connectors.local import (
    LocalIndexerConfig,
    LocalDownloaderConfig,
    LocalConnectionConfig,
    LocalUploaderConfig,
)
from unstructured_ingest.v2.processes.partitioner import PartitionerConfig

directory_with_pdfs = "./pdf_files"
directory_with_results = "./pdf_processed_outputs"

Pipeline.from_configs(
    context=ProcessorConfig(),
    indexer_config=LocalIndexerConfig(input_path=directory_with_pdfs),
    downloader_config=LocalDownloaderConfig(),
    source_connection_config=LocalConnectionConfig(),
    partitioner_config=PartitionerConfig(
        partition_by_api=True,
        api_key=os.getenv("UNSTRUCTURED_API_KEY"),
        partition_endpoint=os.getenv("UNSTRUCTURED_API_URL"),
        strategy="hi_res",
        additional_partition_args={
            "split_pdf_page": True,
            "split_pdf_concurrency_level": 15,
        },
    ),
    uploader_config=LocalUploaderConfig(output_dir=directory_with_results),
).run()


from unstructured.staging.base import elements_from_json


def load_processed_files(directory_path):
    elements = []
    for filename in os.listdir(directory_path):
        if filename.endswith(".json"):
            file_path = os.path.join(directory_path, filename)
            try:
                elements.extend(elements_from_json(filename=file_path))
            except IOError:
                print(f"Error: Could not read file {filename}.")

    return elements


elements = load_processed_files(directory_with_results)
```

Insert data into Milvus.


```python
data = []
for i, element in enumerate(elements):
    data.append(
        {
            "id": i,
            "vector": emb_text(element.text),
            "text": element.text,
            "metadata": element.metadata.to_dict(),
        }
    )
milvus_client.insert(collection_name=collection_name, data=data)
```

## Retrieve and Generate Response

Define a function to retrieve relevant documents from Milvus.


```python
def retrieve_documents(question, top_k=3):
    search_res = milvus_client.search(
        collection_name=collection_name,
        data=[emb_text(question)],
        limit=top_k,
        # search_params={"metric_type": "IP", "params": {}},
        output_fields=["text"],
    )
    return [(res["entity"]["text"], res["distance"]) for res in search_res[0]]
```

Define a function to generate a response using the retrieved documents in the RAG pipeline.


```python
def generate_rag_response(question):
    retrieved_docs = retrieve_documents(question)
    context = "\n".join([f"Text: {doc[0]}\n" for doc in retrieved_docs])
    system_prompt = (
        "You are an AI assistant. Provide answers based on the given context."
    )
    user_prompt = f"""
    Use the following pieces of information to answer the question. If the information is not in the context, say you don't know.
    
    Context:
    {context}
    
    Question: {question}
    """
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    )
    return response.choices[0].message.content
```

Let's test the RAG pipeline with a sample question.


```python
question = "What is the Advanced Search Algorithms in Milvus?"
answer = generate_rag_response(question)
print(f"Question: {question}")
print(f"Answer: {answer}")
```

    INFO: HTTP Request: POST https://api.openai.com/v1/embeddings "HTTP/1.1 200 OK"
    INFO: HTTP Request: POST https://api.openai.com/v1/chat/completions "HTTP/1.1 200 OK"


    Question: What is the Advanced Search Algorithms in Milvus?
    Answer: The Advanced Search Algorithms in Milvus refer to a wide range of in-memory and on-disk indexing/search algorithms it supports, including IVF, HNSW, DiskANN, and more. These algorithms have been deeply optimized, and Milvus delivers 30%-70% better performance compared to popular implementations like FAISS and HNSWLib.

