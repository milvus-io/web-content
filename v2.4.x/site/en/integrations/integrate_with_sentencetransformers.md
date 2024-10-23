---
id: integrate_with_sentencetransformers.md
summary: This page discusses movie search using Milvus
title: Movie Search Using Milvus and SentenceTransformers
---

# Movie Search Using Milvus and SentenceTransformers

In this example, we are going to be going over a Wikipedia article search using Milvus and the SentenceTransformers library. The dataset we are searching through is [Wikipedia Movie Plots with Summaries](https://huggingface.co/datasets/vishnupriyavr/wiki-movie-plots-with-summaries) hosted on HuggingFace.

Let's get started!

## Required Libraries

For this example, we are going to be using `pymilvus` to connect to use Milvus, `sentence-transformers` to generate vector embeddings, and `datasets` to download the example dataset.

```shell
pip install pymilvus sentence-transformers datasets tqdm
```

```python
from datasets import load_dataset
from pymilvus import MilvusClient, connections
from pymilvus import FieldSchema, CollectionSchema, DataType, Collection
from sentence_transformers import SentenceTransformer
from tqdm import tqdm
```

We'll define some global parameters,
```python
embedding_dim = 384
collection_name = "movie_embeddings"
```

## Downloading and Opening the Dataset
In a single line, `datasets` allows us to download and open a dataset. The library will cache the dataset locally and use that copy next time it is run. Each row contains the details of a movie that has an accompanying Wikipedia article. We only make use of the `Title` and `PlotSummary` columns.

```python
ds = load_dataset("vishnupriyavr/wiki-movie-plots-with-summaries", split="train")
print(ds)
```

## Connecting to the Database
At this point, we are going to begin setting up Milvus. The steps are as follows:

1. Create a Milvus Lite database in a local file. (Replace this URI to the server address for Milvus Standalone and Milvus Distributed.)

```python
connections.connect(uri="./sentence_transformers_example.db")
```

2. Create the data schema. This specifies the fields that comprise an element including the dimension of the vector embedding.

```python
fields = [
    FieldSchema(name='id', dtype=DataType.INT64, is_primary=True, auto_id=True),
    FieldSchema(name='title', dtype=DataType.VARCHAR, max_length=256),
    FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, dim=embedding_dim)
]

schema = CollectionSchema(fields=fields, enable_dynamic_field=False)
collection = Collection(name=collection_name, schema=schema)
```

3. Define the vector search indexing algorithm. Milvus Lite implements brute force search and HNSW, whereas Milvus Standalone and Milvus Distributed implement a wide variety of methods. For this scale of data, the naive brute force search suffices.

```python
params = {
    'index_type':"FLAT",
    'metric_type': "IP"
    }

collection.create_index(
    'embedding',
    params
)
```

Once these steps are done, we are ready to insert data into the collection and perform a search. Any data added will be indexed automatically and be available to search immediately. If the data is very fresh, the search might be slower as brute force searching will be used on data that is still in process of getting indexed.

## Inserting the Data

For this example, we are going to use the SentenceTransformers miniLM model to create embeddings of the plot text. This model returns 384-dimension embeddings.

```python
model = SentenceTransformer("all-MiniLM-L12-v2")
```

We loop over the rows of the data, embed the plot summary field, and insert entities into the vector database. In general, you should perform this step over batches of data items to maximize CPU or GPU throughput for the embedding model, as we do here.

```python
for batch in tqdm(ds.batch(batch_size=512)):
    embeddings = model.encode(batch['PlotSummary'])
    data = [{"title": title, "embedding": embedding} for title, embedding in zip(batch['Title'], embeddings)]
    res = collection.insert(data=data)
```

To be safe, we flush the data writing queue and check that the expected number of elements are present in the database.

```python
collection.flush()
print(collection.num_entities)
```

<div class="alert note">

The above operation is relatively time-consuming because embedding takes time. This step takes around 2 minutes using the CPU on a 2023 MacBook Pro and will be much faster with dedicated GPUs. Take a break and enjoy a cup of coffee!

</div>

## Performing the Search
With all the data inserted into Milvus, we can start performing our searches. In this example, we are going to search for movies based on the plot. Because we are doing a batch search, the search time is shared across the movie searches. (Can you guess what the intended result was based on the movie search?)

```python
queries = [
    'A shark terrorizes an LA beach.',
    'An archaeologist searches for ancient artifacts while fighting Nazis.',
    'Teenagers in detention learn about themselves.',
    'A teenager fakes illness to get off school and have adventures with two friends.',
    'A young couple with a kid look after a hotel during winter and the husband goes insane.',
    'Four turtles fight bad guys.'
    ]

# Search the database based on input text
def embed_search(data):
    embeds = model.encode(data) 
    return [x for x in embeds]

search_data = embed_search(queries)

res = collection.search(
    data=search_data,
    anns_field="embedding",
    param={},
    limit=3,
    output_fields=['title']
)

for idx, hits in enumerate(res):
    print('Title:', queries[idx])
    # print('Search Time:', end-start)
    print('Results:')
    for hit in hits:
        print( hit.entity.get('title'), '(', round(hit.distance, 2), ')')
    print()
```

The results are:

```shell
Title: An archaeologist searches for ancient artifacts while fighting Nazis.
Results:
"Pimpernel" Smith ( 0.48 )
Phantom of Chinatown ( 0.42 )
Counterblast ( 0.41 )

Title: Teenagers in detention learn about themselves.
Results:
The Breakfast Club ( 0.54 )
Up the Academy ( 0.46 )
Fame ( 0.43 )

Title: A teenager fakes illness to get off school and have adventures with two friends.
Results:
Ferris Bueller's Day Off ( 0.48 )
Fever Lake ( 0.47 )
A Walk to Remember ( 0.45 )

Title: A young couple with a kid look after a hotel during winter and the husband goes insane.
Results:
Always a Bride ( 0.54 )
Fast and Loose ( 0.49 )
The Shining ( 0.48 )

Title: Four turtles fight bad guys.
Results:
TMNT 2: Out of the Shadows ( 0.49 )
Teenage Mutant Ninja Turtles II: The Secret of the Ooze ( 0.47 )
Gamera: Super Monster ( 0.43 )
```

