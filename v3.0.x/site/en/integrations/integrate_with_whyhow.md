---
id: integrate_with_whyhow.md
summary: This guide demonstrates how to use whyhow.ai and Milvus Lite to conduct Rule-based Retrieval.  
title: Integrate Milvus with WhyHow
---

# Integrate Milvus with WhyHow

This guide demonstrates how to use whyhow.ai and Milvus Lite to conduct Rule-based Retrieval. 

## Overview

WhyHow is a platform which provides developers the building blocks they need to organize, contextualize, and reliably retrieve unstructured data to perform complex RAG. The Rule-based Retrieval package is a Python package developed by WhyHow that enables people to create and manage Retrieval Augmented Generation (RAG) applications with advanced filtering capabilities. 

## Installation

Before you start, please install all the necessary python packages for later usage.

```shell
pip install --upgrade pymilvus, whyhow_rbr
```

Next, we need to initialize the Milvus client to implement the Rule-based Retrieval by using Milvus Lite.

```python
from pymilvus import MilvusClient

# Milvus Lite local path
path="./milvus_demo.db" # random name for local milvus lite db path

# Initialize the ClientMilvus
milvus_client = ClientMilvus(path)
```

You can also initialize the Milvus client through Milvus Cloud

```python
from pymilvus import MilvusClient

# Milvus Cloud credentials
YOUR_MILVUS_CLOUD_END_POINT = "YOUR_MILVUS_CLOUD_END_POINT"
YOUR_MILVUS_CLOUD_TOKEN = "YOUR_MILVUS_CLOUD_TOKEN"

# Initialize the ClientMilvus
milvus_client = ClientMilvus(
        milvus_uri=YOUR_MILVUS_CLOUD_END_POINT, 
        milvus_token=YOUR_MILVUS_CLOUD_TOKEN,
)
```

## Create Collection

### Defining necessary variables

```python
# Define collection name
COLLECTION_NAME="YOUR_COLLECTION_NAME" # take your own collection name

# Define vector dimension size
DIMENSION=1536 # decide by the model you use
```

### Add schema

Before inserting any data into Milvus Lite database, we need to first define the data field, which is called schema in here. Through create object `CollectionSchema` and add data field through `add_field()`, we can control our data type and their characteristics. This step is mandatory before inserting any data into Milvus.

```python
schema = milvus_client.create_schema(auto_id=True) # Enable id matching

schema = milvus_client.add_field(schema=schema, field_name="id", datatype=DataType.INT64, is_primary=True)
schema = milvus_client.add_field(schema=schema, field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
```

### Create index

For each schema, it is better to have an index so that the querying will be much more efficient. To create an index, we first need an `index_params` and later add more index data on this `IndexParams` object.

```python
# Start to indexing data field
index_params = milvus_client.prepare_index_params()
index_params = milvus_client.add_index(
    index_params=index_params,  # pass in index_params object
    field_name="embedding",
    index_type="AUTOINDEX",  # use autoindex instead of other complex indexing method
    metric_type="COSINE",  # L2, COSINE, or IP
)
```

This method is a thin wrapper around the official Milvus implementation ([official docs](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md)).

### Create collection

After defining all the data field and indexing them, we now need to create our database collection so that we can access our data quick and precise. What needs to be mentioned is that we initialized the `enable_dynamic_field` to be true so that you can upload any data freely. The cost is that data querying might be inefficient.

```python
# Create Collection
milvus_client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params
)
```

## Upload documents

After creating a collection, we are ready to populate it with documents. In `whyhow_rbr` this is done using the `upload_documents` method of the `MilvusClient`. It performs the following steps under the hood:

- **Preprocessing**: Reading and splitting the provided PDF files into chunks
- **Embedding**: Embedding all the chunks using an OpenAI model
- **Inserting**: Uploading both the embeddings and the metadata to Milvus Lite

```python
# get pdfs
pdfs = ["harry-potter.pdf", "game-of-thrones.pdf"] # replace to your pdfs path

# Uploading the PDF document
milvus_client.upload_documents(
    collection_name=COLLECTION_NAME,
    documents=pdfs
)
```

## Question answering

Now we can finally move to retrieval augmented generation.

```python
# Search data and implement RAG!
res = milvus_client.search(
    question='What food does Harry Potter like to eat?',
    collection_name=COLLECTION_NAME,
    anns_field='embedding',
    output_fields='text'
)
print(res['answer'])
print(res['matches'])
```

### Rules

In the previous example, every single document in our index was considered. However, sometimes it might be beneficial to only retrieve documents satisfying some predefined conditions (e.g. `filename=harry-potter.pdf`). In `whyhow_rbr` through Milvus Lite, this can be done via adjusting searching parameters.

A rule can control the following metadata attributes

- `filename` name of the file
- `page_numbers` list of integers corresponding to page numbers (0 indexing)
- `id` unique identifier of a chunk (this is the most "extreme" filter)
- Other rules base on [Boolean Expressions](https://milvus.io/docs/boolean.md)

```python
# RULES(search on book harry-potter on page 8):
PARTITION_NAME='harry-potter' # search on books
page_number='page_number == 8'

# first create a partitions to store the book and later search on this specific partition:
milvus_client.crate_partition(
    collection_name=COLLECTION_NAME,
    partition_name=PARTITION_NAME # separate base on your pdfs type
)

# search with rules
res = milvus_client.search(
    question='Tell me about the greedy method',
    collection_name=COLLECTION_NAME,
    partition_names=PARTITION_NAME,
    filter=page_number, # append any rules follow the Boolean Expression Rule
    anns_field='embedding',
    output_fields='text'
)
print(res['answer'])
print(res['matches'])
```

In this example, we first create a partition that store harry-potter related pdfs, and through searching within this partition, we can get the most direct information. Also, we apply page numbers as a filter to specify the exact page we wish to search on. Remember, the filer parameter needs to follow the [boolean rule](https://milvus.io/docs/boolean.md).

### Clean up

At last, after implementing all the instructions, you can clean up the database by calling `drop_collection()`.

```python
# Clean up
milvus_client.drop_collection(
    collection_name=COLLECTION_NAME
)
```

