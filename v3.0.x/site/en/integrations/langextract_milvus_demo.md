---
id: langextract_milvus_demo.md
summary: This guide demonstrates how to use LangExtract with Milvus to build an intelligent document processing and retrieval system.
title: LangExtract + Milvus Integration
---

# LangExtract + Milvus Integration

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langextract_milvus_demo.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langextract_milvus_demo.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

This guide demonstrates how to use [LangExtract](https://github.com/google/langextract) with [Milvus](https://milvus.io/) to build an intelligent document processing and retrieval system.

LangExtract is a Python library that uses Large Language Models (LLMs) to extract structured information from unstructured text documents with precise source grounding. The system combines LangExtract's extraction capabilities with Milvus's vector storage to enable both semantic similarity search and precise metadata filtering.

This integration is particularly valuable for content management, semantic search, knowledge discovery, and building recommendation systems based on extracted document attributes.


## Prerequisites

Before running this notebook, make sure you have the following dependencies installed:


```shell
$ pip install --upgrade pymilvus milvus-lite langextract google-genai requests tqdm pandas
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>


We will use Gemini as the LLM in this example. You should prepare the [api key](https://aistudio.google.com/app/apikey) `GEMINI_API_KEY` as an environment variable.


```python
import os

os.environ["GEMINI_API_KEY"] = "AIza*****************"
```

## Define the LangExtract + Milvus pipeline

We will define the pipeline that uses LangExtract for structured information extraction and Milvus as the vector store.


```python
import langextract as lx
import textwrap
from google import genai
from google.genai.types import EmbedContentConfig
from pymilvus import MilvusClient, DataType
import uuid
```

## Configuration and Setup

Let's configure our global parameters for the integration. We'll use Gemini's embedding model to generate vector representations for our documents.


```python
genai_client = genai.Client()

COLLECTION_NAME = "document_extractions"
EMBEDDING_MODEL = "gemini-embedding-001"
EMBEDDING_DIM = 3072  # Default dimension for gemini-embedding-001
```

## Initialize Milvus Client

Now let's initialize our Milvus client. We'll use a local database file for simplicity, but this can easily be scaled to a full Milvus server deployment.


```python
client = MilvusClient(uri="./milvus_demo.db")
```

<div class="alert note">

As for the argument of `MilvusClient`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>


## Sample Data Preparation

For this demonstration, we'll use movie descriptions as our sample documents. This showcases LangExtract's ability to extract structured information like genres, characters, and themes from unstructured text.


```python
sample_documents = [
    "John McClane fights terrorists in a Los Angeles skyscraper during Christmas Eve. The action-packed thriller features intense gunfights and explosive scenes.",
    "A young wizard named Harry Potter discovers his magical abilities at Hogwarts School. The fantasy adventure includes magical creatures and epic battles.",
    "Tony Stark builds an advanced suit of armor to become Iron Man. The superhero movie showcases cutting-edge technology and spectacular action sequences.",
    "A group of friends get lost in a haunted forest where supernatural creatures lurk. The horror film creates a terrifying atmosphere with jump scares.",
    "Two detectives investigate a series of mysterious murders in New York City. The crime thriller features suspenseful plot twists and dramatic confrontations.",
    "A brilliant scientist creates artificial intelligence that becomes self-aware. The sci-fi thriller explores the dangers of advanced technology and human survival.",
    "A romantic comedy about two friends who fall in love during a cross-country road trip. The drama explores personal growth and relationship dynamics.",
    "An evil sorcerer threatens to destroy the magical kingdom. A brave hero must gather allies and master ancient magic to save the fantasy world.",
    "Space marines battle alien invaders on a distant planet. The action sci-fi movie features futuristic weapons and intense combat in space.",
    "A detective investigates supernatural crimes in Victorian London. The horror thriller combines period drama with paranormal investigation themes.",
]

print("=== LangExtract + Milvus Integration Demo ===")
print(f"Preparing to process {len(sample_documents)} documents")
```

    === LangExtract + Milvus Integration Demo ===
    Preparing to process 10 documents


## Setting Up the Milvus Collection

Before we can store our extracted data, we need to create a Milvus collection with the appropriate schema. This collection will store the original document text, vector embeddings, and extracted metadata fields.


```python
print("\n1. Setting up Milvus collection...")

# Drop existing collection if it exists
if client.has_collection(collection_name=COLLECTION_NAME):
    client.drop_collection(collection_name=COLLECTION_NAME)
    print(f"Dropped existing collection: {COLLECTION_NAME}")

# Create collection schema
schema = client.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
    description="Document extraction results and vector storage",
)

# Add fields - simplified to 3 main metadata fields
schema.add_field(
    field_name="id", datatype=DataType.VARCHAR, max_length=100, is_primary=True
)
schema.add_field(
    field_name="document_text", datatype=DataType.VARCHAR, max_length=10000
)
schema.add_field(
    field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=EMBEDDING_DIM
)

# Create collection
client.create_collection(collection_name=COLLECTION_NAME, schema=schema)
print(f"Collection '{COLLECTION_NAME}' created successfully")

# Create vector index
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)
client.create_index(collection_name=COLLECTION_NAME, index_params=index_params)
print("Vector index created successfully")
```

    
    1. Setting up Milvus collection...
    Dropped existing collection: document_extractions
    Collection 'document_extractions' created successfully
    Vector index created successfully


## Defining the Extraction Schema

LangExtract uses prompts and examples to guide the LLM in extracting structured information. Let's define our extraction schema for movie descriptions, specifying what information to extract and how to categorize it.


```python
print("\n2. Extracting tags from documents...")

# Define extraction prompt - for movie descriptions, specify attribute value ranges
prompt = textwrap.dedent(
    """\
    Extract movie genre, main characters, and key themes from movie descriptions.
    Use exact text for extractions. Do not paraphrase or overlap entities.
    
    For each extraction, provide attributes with values from these predefined sets:
    
    Genre attributes:
    - primary_genre: ["action", "comedy", "drama", "horror", "sci-fi", "fantasy", "thriller", "crime", "superhero"]
    - secondary_genre: ["action", "comedy", "drama", "horror", "sci-fi", "fantasy", "thriller", "crime", "superhero"]
    
    Character attributes:
    - role: ["protagonist", "antagonist", "supporting"]
    - type: ["hero", "villain", "detective", "military", "wizard", "scientist", "friends", "investigator"]
    
    Theme attributes:
    - theme_type: ["conflict", "investigation", "personal_growth", "technology", "magic", "survival", "romance"]
    - setting: ["urban", "space", "fantasy_world", "school", "forest", "victorian", "america", "future"]
    
    Focus on identifying key elements that would be useful for movie search and filtering."""
)
```

    
    2. Extracting tags from documents...


## Providing Examples for Better Extraction

To improve the quality and consistency of extractions, we'll provide LangExtract with a few examples. These examples demonstrate the expected format and help the model understand our extraction requirements.


```python
# Provide examples to guide the model - n-shot examples for movie descriptions
# Unify attribute keys to ensure consistency in extraction results
examples = [
    lx.data.ExampleData(
        text="A space marine battles alien creatures on a distant planet. The sci-fi action movie features futuristic weapons and intense combat scenes.",
        extractions=[
            lx.data.Extraction(
                extraction_class="genre",
                extraction_text="sci-fi action",
                attributes={"primary_genre": "sci-fi", "secondary_genre": "action"},
            ),
            lx.data.Extraction(
                extraction_class="character",
                extraction_text="space marine",
                attributes={"role": "protagonist", "type": "military"},
            ),
            lx.data.Extraction(
                extraction_class="theme",
                extraction_text="battles alien creatures",
                attributes={"theme_type": "conflict", "setting": "space"},
            ),
        ],
    ),
    lx.data.ExampleData(
        text="A detective investigates supernatural murders in Victorian London. The horror thriller film combines period drama with paranormal elements.",
        extractions=[
            lx.data.Extraction(
                extraction_class="genre",
                extraction_text="horror thriller",
                attributes={"primary_genre": "horror", "secondary_genre": "thriller"},
            ),
            lx.data.Extraction(
                extraction_class="character",
                extraction_text="detective",
                attributes={"role": "protagonist", "type": "detective"},
            ),
            lx.data.Extraction(
                extraction_class="theme",
                extraction_text="supernatural murders",
                attributes={"theme_type": "investigation", "setting": "victorian"},
            ),
        ],
    ),
    lx.data.ExampleData(
        text="Two friends embark on a road trip adventure across America. The comedy drama explores friendship and self-discovery through humorous situations.",
        extractions=[
            lx.data.Extraction(
                extraction_class="genre",
                extraction_text="comedy drama",
                attributes={"primary_genre": "comedy", "secondary_genre": "drama"},
            ),
            lx.data.Extraction(
                extraction_class="character",
                extraction_text="two friends",
                attributes={"role": "protagonist", "type": "friends"},
            ),
            lx.data.Extraction(
                extraction_class="theme",
                extraction_text="friendship and self-discovery",
                attributes={"theme_type": "personal_growth", "setting": "america"},
            ),
        ],
    ),
]

# Extract from each document
extraction_results = []
for doc in sample_documents:
    result = lx.extract(
        text_or_documents=doc,
        prompt_description=prompt,
        examples=examples,
        model_id="gemini-2.0-flash",
    )
    extraction_results.append(result)
    print(f"Successfully extracted from document: {doc[:50]}...")

print(f"Completed tag extraction, processed {len(extraction_results)} documents")
```

## Processing and Vectorizing the Results

Now we need to process the extraction results and generate vector embeddings for each document. We'll also flatten the extracted attributes into separate fields to make them easily searchable in Milvus.


```python
print("\n3. Processing extraction results and generating vectors...")

processed_data = []

for result in extraction_results:
    # Generate vectors for documents
    embedding_response = genai_client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=[result.text],
        config=EmbedContentConfig(
            task_type="RETRIEVAL_DOCUMENT",
            output_dimensionality=EMBEDDING_DIM,
        ),
    )
    embedding = embedding_response.embeddings[0].values
    print(f"Successfully generated vector: {result.text[:30]}...")

    # Initialize data structure, flatten attributes into separate fields
    data_entry = {
        "id": result.document_id or str(uuid.uuid4()),
        "document_text": result.text,
        "embedding": embedding,
        # Initialize all possible fields with default values
        "genre": "unknown",
        "primary_genre": "unknown",
        "secondary_genre": "unknown",
        "character_role": "unknown",
        "character_type": "unknown",
        "theme_type": "unknown",
        "theme_setting": "unknown",
    }

    # Process extraction results, flatten attributes
    for extraction in result.extractions:
        if extraction.extraction_class == "genre":
            # Flatten genre attributes
            data_entry["genre"] = extraction.extraction_text
            attrs = extraction.attributes or {}
            data_entry["primary_genre"] = attrs.get("primary_genre", "unknown")
            data_entry["secondary_genre"] = attrs.get("secondary_genre", "unknown")

        elif extraction.extraction_class == "character":
            # Flatten character attributes (take first main character's attributes)
            attrs = extraction.attributes or {}
            if (
                data_entry["character_role"] == "unknown"
            ):  # Only take first character's attributes
                data_entry["character_role"] = attrs.get("role", "unknown")
                data_entry["character_type"] = attrs.get("type", "unknown")

        elif extraction.extraction_class == "theme":
            # Flatten theme attributes (take first main theme's attributes)
            attrs = extraction.attributes or {}
            if (
                data_entry["theme_type"] == "unknown"
            ):  # Only take first theme's attributes
                data_entry["theme_type"] = attrs.get("theme_type", "unknown")
                data_entry["theme_setting"] = attrs.get("setting", "unknown")

    processed_data.append(data_entry)

print(f"Completed data processing, ready to insert {len(processed_data)} records")
```

    
    3. Processing extraction results and generating vectors...
    Successfully generated vector: John McClane fights terrorists...
    Successfully generated vector: A young wizard named Harry Pot...
    Successfully generated vector: Tony Stark builds an advanced ...
    Successfully generated vector: A group of friends get lost in...
    Successfully generated vector: Two detectives investigate a s...
    Successfully generated vector: A brilliant scientist creates ...
    Successfully generated vector: A romantic comedy about two fr...
    Successfully generated vector: An evil sorcerer threatens to ...
    Successfully generated vector: Space marines battle alien inv...
    Successfully generated vector: A detective investigates super...
    Completed data processing, ready to insert 10 records


## Inserting Data into Milvus

With our processed data ready, let's insert it into the Milvus collection. This will enable us to perform both semantic searches and precise metadata filtering.


```python
print("\n4. Inserting data into Milvus...")

if processed_data:
    res = client.insert(collection_name=COLLECTION_NAME, data=processed_data)
    print(f"Successfully inserted {len(processed_data)} documents into Milvus")
    print(f"Insert result: {res}")
else:
    print("No data to insert")
```

    
    4. Inserting data into Milvus...
    Successfully inserted 10 documents into Milvus
    Insert result: {'insert_count': 10, 'ids': ['doc_f8797155', 'doc_78c7e586', 'doc_fa3a3ab5', 'doc_64981815', 'doc_3ab18cb2', 'doc_1ea42b18', 'doc_f0779243', 'doc_386590b7', 'doc_3b3ae1ab', 'doc_851089d6']}


## Demonstrating Metadata Filtering

One of the key advantages of combining LangExtract with Milvus is the ability to perform precise filtering based on extracted metadata. Let's demonstrate this with some filter expression searches.


```python
print("\n=== Filter Expression Search Examples ===")

# Load collection into memory for querying
print("Loading collection into memory...")
client.load_collection(collection_name=COLLECTION_NAME)
print("Collection loaded successfully")

# Search for thriller movies
print("\n1. Searching for thriller movies:")
results = client.query(
    collection_name=COLLECTION_NAME,
    filter='secondary_genre == "thriller"',
    output_fields=["document_text", "genre", "primary_genre", "secondary_genre"],
    limit=5,
)

for result in results:
    print(f"- {result['document_text'][:100]}...")
    print(
        f"  Genre: {result['genre']} ({result.get('primary_genre')}-{result.get('secondary_genre')})"
    )

# Search for movies with military characters
print("\n2. Searching for movies with military characters:")
results = client.query(
    collection_name=COLLECTION_NAME,
    filter='character_type == "military"',
    output_fields=["document_text", "genre", "character_role", "character_type"],
    limit=5,
)

for result in results:
    print(f"- {result['document_text'][:100]}...")
    print(f"  Genre: {result['genre']}")
    print(
        f"  Character: {result.get('character_role')} ({result.get('character_type')})"
    )
```

    
    === Filter Expression Search Examples ===
    Loading collection into memory...
    Collection loaded successfully
    
    1. Searching for thriller movies:
    - A brilliant scientist creates artificial intelligence that becomes self-aware. The sci-fi thriller e...
      Genre: sci-fi thriller (sci-fi-thriller)
    - Two detectives investigate a series of mysterious murders in New York City. The crime thriller featu...
      Genre: crime thriller (crime-thriller)
    - A detective investigates supernatural crimes in Victorian London. The horror thriller combines perio...
      Genre: horror thriller (horror-thriller)
    - John McClane fights terrorists in a Los Angeles skyscraper during Christmas Eve. The action-packed t...
      Genre: action-packed thriller (action-thriller)
    
    2. Searching for movies with military characters:
    - Space marines battle alien invaders on a distant planet. The action sci-fi movie features futuristic...
      Genre: action sci-fi
      Character: protagonist (military)


## Combining Semantic Search with Metadata Filtering

The real power of this integration comes from combining semantic vector search with precise metadata filtering. This allows us to find semantically similar content while applying specific constraints based on extracted attributes.


```python
print("\n=== Semantic Search Examples ===")

# 1. Search for action-related content + only thriller genre
print("\n1. Searching for action-related content + only thriller genre:")
query_text = "action fight combat battle explosion"

query_embedding_response = genai_client.models.embed_content(
    model=EMBEDDING_MODEL,
    contents=[query_text],
    config=EmbedContentConfig(
        task_type="RETRIEVAL_QUERY",
        output_dimensionality=EMBEDDING_DIM,
    ),
)
query_embedding = query_embedding_response.embeddings[0].values

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_embedding],
    anns_field="embedding",
    limit=3,
    filter='secondary_genre == "thriller"',
    output_fields=["document_text", "genre", "primary_genre", "secondary_genre"],
    search_params={"metric_type": "COSINE"},
)

if results:
    for result in results[0]:
        print(f"- Similarity: {result['distance']:.4f}")
        print(f"  Text: {result['document_text'][:100]}...")
        print(
            f"  Genre: {result.get('genre')} ({result.get('primary_genre')}-{result.get('secondary_genre')})"
        )

# 2. Search for magic-related content + fantasy genre + conflict theme
print("\n2. Searching for magic-related content + fantasy genre + conflict theme:")
query_text = "magic wizard spell fantasy magical"

query_embedding_response = genai_client.models.embed_content(
    model=EMBEDDING_MODEL,
    contents=[query_text],
    config=EmbedContentConfig(
        task_type="RETRIEVAL_QUERY",
        output_dimensionality=EMBEDDING_DIM,
    ),
)
query_embedding = query_embedding_response.embeddings[0].values

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[query_embedding],
    anns_field="embedding",
    limit=3,
    filter='primary_genre == "fantasy" and theme_type == "conflict"',
    output_fields=[
        "document_text",
        "genre",
        "primary_genre",
        "theme_type",
        "theme_setting",
    ],
    search_params={"metric_type": "COSINE"},
)

if results:
    for result in results[0]:
        print(f"- Similarity: {result['distance']:.4f}")
        print(f"  Text: {result['document_text'][:100]}...")
        print(f"  Genre: {result.get('genre')} ({result.get('primary_genre')})")
        print(f"  Theme: {result.get('theme_type')} ({result.get('theme_setting')})")

print("\n=== Demo Complete ===")
```

    
    === Semantic Search Examples ===
    
    1. Searching for action-related content + only thriller genre:
    - Similarity: 0.6947
      Text: John McClane fights terrorists in a Los Angeles skyscraper during Christmas Eve. The action-packed t...
      Genre: action-packed thriller (action-thriller)
    - Similarity: 0.6128
      Text: Two detectives investigate a series of mysterious murders in New York City. The crime thriller featu...
      Genre: crime thriller (crime-thriller)
    - Similarity: 0.5889
      Text: A brilliant scientist creates artificial intelligence that becomes self-aware. The sci-fi thriller e...
      Genre: sci-fi thriller (sci-fi-thriller)
    
    2. Searching for magic-related content + fantasy genre + conflict theme:
    - Similarity: 0.6986
      Text: An evil sorcerer threatens to destroy the magical kingdom. A brave hero must gather allies and maste...
      Genre: fantasy (fantasy)
      Theme: conflict (fantasy_world)
    
    === Demo Complete ===

