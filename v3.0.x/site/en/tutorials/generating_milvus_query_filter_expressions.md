---
id: generating_milvus_query_filter_expressions.md
summary: In this tutorial, we will demonstrate how to use Large Language Models (LLMs) to automatically generate Milvus filter expressions from natural language queries. This approach makes vector database querying more accessible by allowing users to express complex filtering conditions in plain English, which are then converted to proper Milvus syntax.
title: Generating Milvus Query Filter Expressions with Large Language Models
---

# Generating Milvus Query Filter Expressions with Large Language Models

In this tutorial, we will demonstrate how to use Large Language Models (LLMs) to automatically generate Milvus filter expressions from natural language queries. This approach makes vector database querying more accessible by allowing users to express complex filtering conditions in plain English, which are then converted to proper Milvus syntax.

Milvus supports sophisticated filtering capabilities including:

* **Basic Operators**: Comparison operators like `==`, `!=`, `>`, `<`, `>=`, `<=`
* **Boolean Operators**: Logical operators like `and`, `or`, `not` for complex conditions
* **String Operations**: Pattern matching with `like` and other string functions
* **Array Operations**: Working with array fields using `array_contains`, `array_length`, etc.
* **JSON Operations**: Querying JSON fields with specialized operators

By integrating LLMs with Milvus documentation, we can create an intelligent system that understands natural language queries and generates syntactically correct filter expressions. This tutorial will walk through the process of setting up this system, highlighting its effectiveness in various filtering scenarios.

## Dependencies and Environment


```shell
$ pip install --upgrade pymilvus openai requests docling beautifulsoup4
print("Environment setup complete!")
```

## Set up environment variables

Configure your OpenAI API credentials to enable embedding generation and LLM-based filter expression creation. Replace `'your_openai_api_key'` with your actual OpenAI API key.


```python
import os
import openai

os.environ["OPENAI_API_KEY"] = "your_openai_api_key"
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("Please set the OPENAI_API_KEY environment variable!")

openai.api_key = api_key
print("API key loaded.")
```

## Create a Sample Collection

Now let's create a sample Milvus collection with user data. This collection will contain both scalar fields (for filtering) and vector embeddings (for semantic search). We'll use OpenAI's text embedding model to generate vector representations of user information.


```python
from pymilvus import MilvusClient, FieldSchema, CollectionSchema, DataType
import os
from openai import OpenAI
import uuid

client = MilvusClient(uri="http://localhost:19530")
openai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
embedding_model = "text-embedding-3-small"
embedding_dim = 1536

fields = [
    FieldSchema(
        name="pk",
        dtype=DataType.VARCHAR,
        is_primary=True,
        auto_id=False,
        max_length=100,
    ),
    FieldSchema(name="name", dtype=DataType.VARCHAR, max_length=128),
    FieldSchema(name="age", dtype=DataType.INT64),
    FieldSchema(name="city", dtype=DataType.VARCHAR, max_length=128),
    FieldSchema(name="hobby", dtype=DataType.VARCHAR, max_length=128),
    FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]
schema = CollectionSchema(fields=fields, description="User data embedding example")
collection_name = "user_data_collection"

if client.has_collection(collection_name):
    client.drop_collection(collection_name)
# Strong consistency waits for all loads to complete, adding latency with large datasets
# client.create_collection(
#     collection_name=collection_name, schema=schema, consistency_level="Strong"
# )
client.create_collection(collection_name=collection_name, schema=schema)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name="embedding",
    index_type="IVF_FLAT",
    metric_type="COSINE",
    params={"nlist": 128},
)
client.create_index(collection_name=collection_name, index_params=index_params)

data_to_insert = [
    {"name": "John", "age": 23, "city": "Shanghai", "hobby": "Drinking coffee"},
    {"name": "Alice", "age": 29, "city": "New York", "hobby": "Reading books"},
    {"name": "Bob", "age": 31, "city": "London", "hobby": "Playing chess"},
    {"name": "Eve", "age": 27, "city": "Paris", "hobby": "Painting"},
    {"name": "Charlie", "age": 35, "city": "Tokyo", "hobby": "Cycling"},
    {"name": "Grace", "age": 22, "city": "Berlin", "hobby": "Photography"},
    {"name": "David", "age": 40, "city": "Toronto", "hobby": "Watching movies"},
    {"name": "Helen", "age": 30, "city": "Sydney", "hobby": "Cooking"},
    {"name": "Frank", "age": 28, "city": "Beijing", "hobby": "Hiking"},
    {"name": "Ivy", "age": 26, "city": "Seoul", "hobby": "Dancing"},
    {"name": "Tom", "age": 33, "city": "Madrid", "hobby": "Writing"},
]


def get_embeddings(texts):
    return [
        rec.embedding
        for rec in openai_client.embeddings.create(
            input=texts, model=embedding_model, dimensions=embedding_dim
        ).data
    ]


texts = [
    f"{item['name']} from {item['city']} is {item['age']} years old and likes {item['hobby']}."
    for item in data_to_insert
]
embeddings = get_embeddings(texts)

insert_data = []
for item, embedding in zip(data_to_insert, embeddings):
    item_with_embedding = {
        "pk": str(uuid.uuid4()),
        "name": item["name"],
        "age": item["age"],
        "city": item["city"],
        "hobby": item["hobby"],
        "embedding": embedding,
    }
    insert_data.append(item_with_embedding)

client.insert(collection_name=collection_name, data=insert_data)

print(f"Collection '{collection_name}' has been created and data has been inserted.")
```

## Print 3 sample data

The code above creates a Milvus collection with the following structure:

- **pk**: Primary key field (VARCHAR)
- **name**: User name (VARCHAR) 
- **age**: User age (INT64)
- **city**: User city (VARCHAR)
- **hobby**: User hobby (VARCHAR)
- **embedding**: Vector embedding (FLOAT_VECTOR, 1536 dimensions)

We have inserted 11 sample users with their personal information and generate embeddings for semantic search capabilities. Each user's information is converted into a descriptive text that captures their name, location, age, and interests before being embedded. Let's verify that our collection was created successfully and contains the expected data by querying a few sample records.


```python
from pymilvus import MilvusClient
import os
from openai import OpenAI

client = MilvusClient(uri="http://localhost:19530")
collection_name = "user_data_collection"

client.load_collection(collection_name=collection_name)

result = client.query(
    collection_name=collection_name,
    filter="",
    output_fields=["name", "age", "city", "hobby"],
    limit=3,
)

for record in result:
    print(record)
```

## Collecting Milvus Filter Expression Documentation

To help the large language model better understand Milvus's filter expression syntax, we need to provide it with relevant official documentation. We'll use the `docling` library to scrape several key pages from the official Milvus website.

These pages contain detailed information about:
- **Boolean operators**: `and`, `or`, `not` for complex logical conditions
- **Basic operators**: Comparison operators like `==`, `!=`, `>`, `<`, `>=`, `<=`
- **Filtering templates**: Advanced filtering patterns and syntax
- **String matching**: Pattern matching with `like` and other string operations

This documentation will serve as the knowledge base for our LLM to generate accurate filter expressions.


```python
import docling
from docling.document_converter import DocumentConverter

converter = DocumentConverter()
docs = [
    converter.convert(url)
    for url in [
        "https://milvus.io/docs/boolean.md",
        "https://milvus.io/docs/basic-operators.md",
        "https://milvus.io/docs/filtering-templating.md",
    ]
]

for doc in docs[:3]:
    print(doc.document.export_to_markdown())
```

The documentation scraping provides comprehensive coverage of Milvus filter syntax. This knowledge base will enable our LLM to understand the nuances of filter expression construction, including proper operator usage, field referencing, and complex condition combinations.

## LLM-Powered Filter Generation

Now that we have the documentation context, let's set up the LLM system to generate filter expressions. We'll create a structured prompt that combines the scraped documentation with user queries to produce syntactically correct Milvus filter expressions.

Our filter generation system uses a carefully crafted prompt that:

1. **Provides context**: Includes the complete Milvus documentation as reference material
2. **Sets constraints**: Ensures the LLM only uses documented syntax and features  
3. **Enforces accuracy**: Requires syntactically correct expressions
4. **Maintains focus**: Returns only the filter expression without explanations

Let's test this with a natural language query and see how well the LLM performs.


```python
from openai import OpenAI
import json
from IPython.display import display, Markdown

context = "\n".join([doc.document.export_to_markdown() for doc in docs])

prompt = f"""
You are an expert Milvus vector database engineer. Your task is to convert a user's natural language query into a valid Milvus filter expression, using the provided Milvus documentation as your knowledge base.

Follow these rules strictly:
1. Only use the provided documents as your source of knowledge.
2. Ensure the generated filter expression is syntactically correct.
3. If there isn't enough information in the documents to create an expression, state that directly.
4. Only return the final filter expression. Do not include any explanations or extra text.

---
**Milvus Documentation Context:**
{context}

---
**User Query:**
{user_query}

---
**Filter Expression:**
"""

client = OpenAI()


def generate_filter_expr(user_query):
    """
    Generates a Milvus filter expression from a user query using GPT-4o-mini.
    """
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_query},
        ],
        temperature=0.0,
    )
    return completion.choices[0].message.content


user_query = "Find people older than 30 who live in London, Tokyo, or Toronto"

filter_expr = generate_filter_expr(user_query)

print(f"Generated filter expression: {filter_expr}")
```

The LLM successfully generated a filter expression that combines multiple conditions:
- Age comparison using `>`
- Multiple city matching using `in` operator  
- Proper field referencing and syntax

This demonstrates the power of providing comprehensive documentation context to guide LLM filter generation.

## Test the Generated Filter

Now let's test our generated filter expression by using it in an actual Milvus search operation. We'll combine semantic search with precise filtering to find users that match both the query intent and the specific criteria.


```python
from pymilvus import MilvusClient
from openai import OpenAI
import os

client = MilvusClient(uri="http://localhost:19530")
openai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

clean_filter = (
    filter_expr.replace("```", "").replace('filter="', "").replace('"', "").strip()
)
print(f"Using filter: {clean_filter}")

query_embedding = (
    openai_client.embeddings.create(
        input=[user_query], model="text-embedding-3-small", dimensions=1536
    )
    .data[0]
    .embedding
)

search_results = client.search(
    collection_name="user_data_collection",
    data=[query_embedding],
    limit=10,
    filter=clean_filter,
    output_fields=["pk", "name", "age", "city", "hobby"],
    search_params={
        "metric_type": "COSINE",
        "params": {"nprobe": 10},
    },
)

print("Search results:")
for i, hits in enumerate(search_results):
    print(f"Query {i}:")
    for hit in hits:
        print(f"  - {hit}")
    print()
```

## Results Analysis

The search results demonstrate successful integration of LLM-generated filters with Milvus vector search. The filter correctly identified users who:

- Are older than 30 years
- Live in London, Tokyo, or Toronto
- Match the semantic context of the query

This approach combines the precision of structured filtering with the flexibility of natural language input, making vector databases more accessible to users who may not be familiar with specific query syntax.
