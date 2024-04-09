---
id: integrate_with_voyageai.md
summary: This page discusses vector database integration with VoyageAI's embedding API.
---

# Similarity Search with Milvus and VoyageAI

This page discusses vector database integration with VoyageAI's embedding API.

We'll showcase how [VoyageAI's Embedding API](https://docs.voyageai.com/docs/embeddings) can be used with our vector database to search across book titles. Many existing book search solutions (such as those used by public libraries, for example) rely on keyword matching rather than a semantic understanding of what the title is actually about. Using a trained model to represent the input data is known as _semantic search_, and can be expanded to a variety of different text-based use cases, including anomaly detection and document search.

## Getting started

The only prerequisite you'll need here is an API key from the [VoyageAI website](https://dash.voyageai.com/api-keys). Be sure you have already [started up a Milvus instance](https://milvus.io/docs/install_standalone-docker.md).

We'll also prepare the data that we're going to use for this example. You can grab the book titles [here](https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks). Let's create a function to load book titles from our CSV.

```python
import csv
import random
import voyageai
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

## Searching book titles with VoyageAI & Milvus

Here we can find the main parameters that need to be modified for running with your own accounts. Beside each is a description of what it is.

```python
FILE = './content/books.csv'  # Download it from https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks and save it in the folder that holds your script.
COLLECTION_NAME = 'title_db'  # Collection name
DIMENSION = 1024  # Embeddings size
COUNT = 100  # How many titles to embed and insert.
MILVUS_HOST = 'localhost'  # Milvus server URI
MILVUS_PORT = '19530'
MODEL_NAME = 'voyage-2'  # Which model to use, please check https://docs.voyageai.com/docs/embeddings for available models
client = voyageai.Client(api_key="YOUR_VOYAGEAI_API_KEY")
```

Then we need to connect to Milvus vector database to store and search the vector embeddings. Within Milvus, we need to create a collection and set up the index. For more information on how to use Milvus, look [here](https://milvus.io/docs/example_code.md).

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
# Extract embedding from text using VoyageAI
def embed(text):
    response = client.embed(
        texts=[text],
        model=MODEL_NAME,
        truncation=False
    )
    return response.embeddings[0]


# Insert each title and its embedding
for idx, text in enumerate(random.sample(sorted(csv_load(FILE)), k=COUNT)):  # Load COUNT amount of random values from dataset
    ins=[[idx], [text], [embed(text)]]  # Insert the title id, the title text, and the title embedding vector
    collection.insert(ins)
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
[39, 0.4663320779800415, "Tomorrow's Promise"]
[1, 0.4680519700050354, "A Writer's Workbook: Daily Exercises for the Writing Life"]
[45, 0.46855345368385315, 'The Pragmatic Programmer: From Journeyman to Master']
[70, 0.47063353657722473, 'Saturday']
[28, 0.4742085337638855, 'Marvels']

Search term: landscape
[70, 0.1867476850748062, 'Saturday']
[28, 0.38813990354537964, 'Marvels']
[11, 0.4200461506843567, 'Henry V']
[83, 0.4219294786453247, 'Checkpoint']
[19, 0.42225468158721924, 'Beach Music']
```
