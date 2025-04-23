---
id: llamaindex_milvus_metadata_filter.md
title: Metadata Filtering with LlamaIndex and Milvus
related_key: LlamaIndex
summary: This notebook illustrates the use of the Milvus vector store in LlamaIndex, focusing on metadata filtering capabilities. You will learn how to index documents with metadata, perform vector searches with LlamaIndex's built-in metadata filters, and apply Milvus's native filtering expressions to the vector store.
---

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

# Metadata Filtering with LlamaIndex and Milvus

This notebook illustrates the use of the Milvus vector store in LlamaIndex, focusing on metadata filtering capabilities. You will learn how to index documents with metadata, perform vector searches with LlamaIndex's built-in metadata filters, and apply Milvus's native filtering expressions to the vector store.

By the end of this notebook, you will understand how to utilize Milvus's filtering features to narrow down search results based on document metadata.

## Prerequisites

**Install dependencies**

Before getting started, make sure you have the following dependencies installed:


```shell
$ pip install llama-index-vector-stores-milvus llama-index
```

<div class="alert note">

If you're using Google Colab, you may need to **restart the runtime** (Navigate to the "Runtime" menu at the top of the interface, and select "Restart session" from the dropdown menu.)

</div>

**Set up accounts**

This tutorial uses OpenAI for text embeddings and answer generation. You need to prepare the [OpenAI API key](https://platform.openai.com/api-keys). 


```python
import openai

openai.api_key = "sk-"
```

To use the Milvus vector store, specify your Milvus server `URI` (and optionally with the `TOKEN`). To start a Milvus server, you can set up a Milvus server by following the [Milvus installation guide](https://milvus.io/docs/install-overview.md) or simply trying [Zilliz Cloud](https://docs.zilliz.com/docs/register-with-zilliz-cloud) for free.


```python
URI = "./milvus_filter_demo.db"  # Use Milvus-Lite for demo purpose
# TOKEN = ""
```

**Prepare data**

For this example, we'll use a few books with similar or identical titles but different metadata (author, genre, and publication year) as the sample data. This will help demonstrate how Milvus can filter and retrieve documents based on both vector similarity and metadata attributes.


```python
from llama_index.core.schema import TextNode

nodes = [
    TextNode(
        text="Life: A User's Manual",
        metadata={
            "author": "Georges Perec",
            "genre": "Postmodern Fiction",
            "year": 1978,
        },
    ),
    TextNode(
        text="Life and Fate",
        metadata={
            "author": "Vasily Grossman",
            "genre": "Historical Fiction",
            "year": 1980,
        },
    ),
    TextNode(
        text="Life",
        metadata={
            "author": "Keith Richards",
            "genre": "Memoir",
            "year": 2010,
        },
    ),
    TextNode(
        text="The Life",
        metadata={
            "author": "Malcolm Knox",
            "genre": "Literary Fiction",
            "year": 2011,
        },
    ),
]
```

## Build Index

In this section, we will store sample data in Milvus using the default embedding model (OpenAI's `text-embedding-ada-002`). Titles will be converted into text embeddings and stored in a dense embedding field, while all metadata will be stored in scalar fields.


```python
from llama_index.vector_stores.milvus import MilvusVectorStore
from llama_index.core import StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    # token=TOKEN,
    collection_name="test_filter_collection",  # Change collection name here
    dim=1536,  # Vector dimension depends on the embedding model
    overwrite=True,  # Drop collection if exists
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex(nodes, storage_context=storage_context)
```

    2025-04-22 08:31:09,871 [DEBUG][_create_connection]: Created new connection using: 19675caa8f894772b3db175b65d0063a (async_milvus_client.py:547)


## Metadata Filters

In this section, we will apply LlamaIndex's built-in metadata filters and conditions to Milvus search.

**Define metadata filters**


```python
from llama_index.core.vector_stores import (
    MetadataFilter,
    MetadataFilters,
    FilterOperator,
)

filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key="year", value=2000, operator=FilterOperator.GT
        )  # year > 2000
    ]
)
```

**Retrieve from vector store with filters**


```python
retriever = index.as_retriever(filters=filters, similarity_top_k=5)
result_nodes = retriever.retrieve("Books about life")
for node in result_nodes:
    print(node.text)
    print(node.metadata)
    print("\n")
```

    The Life
    {'author': 'Malcolm Knox', 'genre': 'Literary Fiction', 'year': 2011}
    
    
    Life
    {'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}
    
    


### Multiple Metdata Filters

You can also combine multiple metadata filters to create more complex queries. LlamaIndex supports both `AND` and `OR` conditions to combine filters. This allows for more precise and flexible retrieval of documents based on their metadata attributes.

**Condition `AND`**

Try an example filtering for books published between 1979 and 2010 (specifically, where 1979 < year ≤ 2010):


```python
from llama_index.core.vector_stores import FilterCondition

filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key="year", value=1979, operator=FilterOperator.GT
        ),  # year > 1979
        MetadataFilter(
            key="year", value=2010, operator=FilterOperator.LTE
        ),  # year <= 2010
    ],
    condition=FilterCondition.AND,
)

retriever = index.as_retriever(filters=filters, similarity_top_k=5)
result_nodes = retriever.retrieve("Books about life")
for node in result_nodes:
    print(node.text)
    print(node.metadata)
    print("\n")
```

    Life and Fate
    {'author': 'Vasily Grossman', 'genre': 'Historical Fiction', 'year': 1980}
    
    
    Life
    {'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}
    
    


**Condition `OR`**

Try another example that filters books written by either Georges Perec or Keith Richards:


```python
filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key="author", value="Georges Perec", operator=FilterOperator.EQ
        ),  # author is Georges Perec
        MetadataFilter(
            key="author", value="Keith Richards", operator=FilterOperator.EQ
        ),  # author is Keith Richards
    ],
    condition=FilterCondition.OR,
)

retriever = index.as_retriever(filters=filters, similarity_top_k=5)
result_nodes = retriever.retrieve("Books about life")
for node in result_nodes:
    print(node.text)
    print(node.metadata)
    print("\n")
```

    Life
    {'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}
    
    
    Life: A User's Manual
    {'author': 'Georges Perec', 'genre': 'Postmodern Fiction', 'year': 1978}
    
    


## Use Milvus's Keyword Arguments

In addition to the built-in filtering capabilities, you can use Milvus's native filtering expressions by the `string_expr` keyword argument. This allows you to pass specific filter expressions directly to Milvus during search operations, extending beyond the standard metadata filtering to access Milvus's advanced filtering capabilities.

Milvus provides powerful and flexible filtering options that enable precise querying of your vector data:

- Basic Operators: Comparison operators, range filters, arithmetic operators, and logical operators
- Filter Expression Templates: Predefined patterns for common filtering scenarios
- Specialized Operators: Data type-specific operators for JSON or array fields

For comprehensive documentation and examples of Milvus filtering expressions, refer to the official documentation of [Milvus Filtering](https://milvus.io/docs/boolean.md).


```python
retriever = index.as_retriever(
    vector_store_kwargs={
        "string_expr": "genre like '%Fiction'",
    },
    similarity_top_k=5,
)
result_nodes = retriever.retrieve("Books about life")
for node in result_nodes:
    print(node.text)
    print(node.metadata)
    print("\n")
```

    The Life
    {'author': 'Malcolm Knox', 'genre': 'Literary Fiction', 'year': 2011}
    
    
    Life and Fate
    {'author': 'Vasily Grossman', 'genre': 'Historical Fiction', 'year': 1980}
    
    
    Life: A User's Manual
    {'author': 'Georges Perec', 'genre': 'Postmodern Fiction', 'year': 1978}
    
    

