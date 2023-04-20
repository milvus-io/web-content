---
id: integrate_with_openai.md
summary: This page discusses vector database integration with OpenAI's embedding API.
---

# Similarity Search with Milvus and OpenAI

This page discusses vector database integration with OpenAI's embedding API.

We'll showcase how [OpenAI's Embedding API](https://beta.openai.com/docs/guides/embeddings) can be used with our vector database to search across book titles. Many existing book search solutions (such as those used by public libraries, for example) rely on keyword matching rather than a semantic understanding of what the title is actually about. Using a trained model to represent the input data is known as _semantic search_, and can be expanded to a variety of different text-based use cases, including anomaly detection and document search.

## Getting started

The only prerequisite you'll need here is an API key from the [OpenAI website](https://openai.com/api/). Be sure you have already [started up a Milvus instance](https://milvus.io/docs/install_standalone-docker.md).

We'll also prepare the data that we're going to use for this example. You can grab the book titles [here](https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks). Let's create a function to load book titles from our CSV.

```python
import csv
import json
import random
import openai
import time
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility
```

```python
# Extract the book titles
def csv_load(file):
    with open(file, newline='') as f:
        reader=csv.reader(f, delimiter=',')
        for row in reader:
            yield row[1]
```

With this, we're ready to move on to generating embeddings.

## Searching book titles with OpenAI & Milvus

Here we can find the main parameters that need to be modified for running with your own accounts. Beside each is a description of what it is.

```python
FILE = './content/books.csv'  # Download it from https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks and save it in the folder that holds your script.
COLLECTION_NAME = 'title_db'  # Collection name
DIMENSION = 1536  # Embeddings size
COUNT = 100  # How many titles to embed and insert.
MILVUS_HOST = 'localhost'  # Milvus server URI
MILVUS_PORT = '19530'
OPENAI_ENGINE = 'text-embedding-ada-002'  # Which engine to use
openai.api_key = 'sk-******'  # Use your own Open AI API Key here
```
<div class="alert note">
Because the embedding process for a free OpenAI account is relatively time-consuming, we use a set of data small enough to reach a balance between the script executing time and the precision of the search results. You can change the <code>COUNT</code> constant to fit your needs.
</div>

This segment deals with Milvus and setting up the database for this use case. Within Milvus, we need to set up a collection and index the collection. For more information on how to use Milvus, look [here](https://milvus.io/docs/example_code.md).

```python
# Connect to Milvus
connections.connect(host=MILVUS_HOST, port=MILVUS_PORT)

# Remove collection if it already exists
if utility.has_collection(COLLECTION_NAME):
    utility.drop_collection(COLLECTION_NAME)

# Create collection which includes the id, title, and embedding.
fields = [
    FieldSchema(name='id', dtype=DataType.INT64, descrition='Ids', is_primary=True, auto_id=False),
    FieldSchema(name='title', dtype=DataType.VARCHAR, description='Title texts', max_length=200),
    FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, description='Embedding vectors', dim=DIMENSION)
]
schema = CollectionSchema(fields=fields, description='Title collection')
collection = Collection(name=COLLECTION_NAME, schema=schema)

# Create an index for the collection.
# Create an index for the collection.
index_params = {
    'index_type': 'IVF_FLAT',
    'metric_type': 'L2',
    'params': {'nlist': 1024}
}
collection.create_index(field_name="embedding", index_params=index_params)
```

Once we have the collection setup we need to start inserting our data. This is in three steps: reading the data, embedding the titles, and inserting into Milvus.

```python
# Extract embedding from text using OpenAI
def embed(text):
    return openai.Embedding.create(
        input=text, 
        engine=OPENAI_ENGINE)["data"][0]["embedding"]

# Insert each title and its embedding
for idx, text in enumerate(random.sample(sorted(csv_load(FILE)), k=COUNT)):  # Load COUNT amount of random values from dataset
    ins=[[idx], [(text[:198] + '..') if len(text) > 200 else text], [embed(text)]]  # Insert the title id, the title text, and the title embedding vector
    collection.insert(ins)
    time.sleep(3)  # Free OpenAI account limited to 60 RPM
```

```python
# Load the collection into memory for searching
collection.load()

# Search the database based on input text
def search(text):
    # Search parameters for the index
    search_params={
        "metric_type": "L2"
    }

    results=collection.search(
        data=[embed(text)],  # Embeded search value
        anns_field="embedding",  # Search across embeddings
        param=search_params,
        limit=5,  # Limit to five results per search
        output_fields=['title']  # Include title field in result
    )

    ret=[]
    for hit in results[0]:
        row=[]
        row.extend([hit.id, hit.score, hit.entity.get('title')])  # Get the id, distance, and title for the results
        ret.append(row)
    return ret

search_terms=['self-improvement', 'landscape']

for x in search_terms:
    print('Search term:', x)
    for result in search(x):
        print(result)
    print()
```

You should see the following as the output:

```
Search term: self-improvement
[46, 0.37948882579803467, 'The Road Less Traveled: A New Psychology of Love  Traditional Values  and Spiritual Growth']
[24, 0.39301538467407227, 'The Leader In You: How to Win Friends  Influence People and Succeed in a Changing World']
[35, 0.4081816077232361, 'Think and Grow Rich: The Landmark Bestseller Now Revised and Updated for the 21st Century']
[93, 0.4174671173095703, 'Great Expectations']
[10, 0.41889268159866333, 'Nicomachean Ethics']

Search term: landscape
[49, 0.3966977894306183, 'Traveller']
[20, 0.41044068336486816, 'A Parchment of Leaves']
[40, 0.4179283380508423, 'The Illustrated Garden Book: A New Anthology']
[97, 0.42227691411972046, 'Monsoon Summer']
[70, 0.42461898922920227, 'Frankenstein']
```
