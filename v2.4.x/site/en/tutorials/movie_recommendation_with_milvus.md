---
id: movie_recommendation_with_milvus.md
summary: In this notebook, we will explore how to generate embeddings of movie descriptions using OpenAI and leverage those embeddings within Milvus to recommend movies that match your preferences. To enhance our search results, we will utilize filtering to perform metadata searches. The dataset used in this example is sourced from HuggingFace datasets and contains over 8,000 movie entries, providing a rich pool of options for movie recommendations.
title: Movie Recommendation with Milvus
---

# Movie Recommendation with Milvus

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/movie_recommendation_with_milvus.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/movie_recommendation_with_milvus.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

In this notebook, we will explore how to generate embeddings of movie descriptions using OpenAI and leverage those embeddings within Milvus to recommend movies that match your preferences. To enhance our search results, we will utilize filtering to perform metadata searches. The dataset used in this example is sourced from HuggingFace datasets and contains over 8,000 movie entries, providing a rich pool of options for movie recommendations.



## Dependencies and Environment
You can install the dependencies by running the following command:



```python
$ pip install openai pymilvus datasets tqdm
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

We will use OpenAI as the LLM in this example. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable.

</div>


```python
import os

os.environ["OPENAI_API_KEY"] = "sk-***********"
```

## Initialize OpenAI client and Milvus
Initialize the OpenAI client.


```python
from openai import OpenAI

openai_client = OpenAI()
```

Set the collection name and dimension for the embeddings.


```python
COLLECTION_NAME = "movie_search"
DIMENSION = 1536

BATCH_SIZE = 1000
```

Connect to Milvus.


```python
from pymilvus import MilvusClient

# Connect to Milvus Database
client = MilvusClient("./milvus_demo.db")
```

<div class="alert note">

As for the argument of `url` and `token`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, say more than a million vectors, you can set up a more performant Milvus server on [Docker or Kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server address and port as your uri, e.g.`http://localhost:19530`. If you enable the authentication feature on Milvus, use "<your_username>:<your_password>" as the token, otherwise don't set the token.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>


```python
# Remove collection if it already exists
if client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)
```

Define the fields for the collection, which include the id, title, type, release year, rating, and description.


```python
from pymilvus import DataType

# Create collection which includes the id, title, and embedding.

# 1. Create schema
schema = MilvusClient.create_schema(
    auto_id=True,
    enable_dynamic_field=False,
)

# 2. Add fields to schema
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=64000)
schema.add_field(field_name="type", datatype=DataType.VARCHAR, max_length=64000)
schema.add_field(field_name="release_year", datatype=DataType.INT64)
schema.add_field(field_name="rating", datatype=DataType.VARCHAR, max_length=64000)
schema.add_field(field_name="description", datatype=DataType.VARCHAR, max_length=64000)
schema.add_field(field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)

# 3. Create collection with the schema
client.create_collection(collection_name=COLLECTION_NAME, schema=schema)
```

Create the index on the collection and load it.


```python
# Create the index on the collection and load it.

# 1. Prepare index parameters
index_params = client.prepare_index_params()


# 2. Add an index on the embedding field
index_params.add_index(
    field_name="embedding", metric_type="IP", index_type="AUTOINDEX", params={}
)


# 3. Create index
client.create_index(collection_name=COLLECTION_NAME, index_params=index_params)


# 4. Load collection
client.load_collection(collection_name=COLLECTION_NAME, replica_number=1)
```

## Dataset
With Milvus up and running we can begin grabbing our data. `Hugging Face Datasets` is a hub that holds many different user datasets, and for this example we are using HuggingLearners's netflix-shows dataset. This dataset contains movies and their metadata pairs for over 8 thousand movies. We are going to embed each description and store it within Milvus along with its title, type, release_year and rating.


```python
from datasets import load_dataset

dataset = load_dataset("hugginglearners/netflix-shows", split="train")
```

## Insert the Data
Now that we have our data on our machine we can begin embedding it and inserting it into Milvus. The embedding function takes in text and returns the embeddings in a list format.


```python
def emb_texts(texts):
    res = openai_client.embeddings.create(input=texts, model="text-embedding-3-small")
    return [res_data.embedding for res_data in res.data]
```

This next step does the actual inserting. We iterate through all the entries and create batches that we insert once we hit our set batch size. After the loop is over we insert the last remaning batch if it exists.


```python
from tqdm import tqdm

# batch (data to be inserted) is a list of dictionaries
batch = []

# Embed and insert in batches
for i in tqdm(range(0, len(dataset))):
    batch.append(
        {
            "title": dataset[i]["title"] or "",
            "type": dataset[i]["type"] or "",
            "release_year": dataset[i]["release_year"] or -1,
            "rating": dataset[i]["rating"] or "",
            "description": dataset[i]["description"] or "",
        }
    )

    if len(batch) % BATCH_SIZE == 0 or i == len(dataset) - 1:
        embeddings = emb_texts([item["description"] for item in batch])

        for item, emb in zip(batch, embeddings):
            item["embedding"] = emb

        client.insert(collection_name=COLLECTION_NAME, data=batch)
        batch = []
```

## Query the Database
With our data safely inserted into Milvus, we can now perform a query. The query takes in a tuple of the movie description you are searching for and the filter to use. More info about the filter can be found [here](https://milvus.io/docs/boolean.md). The search first prints out your description and filter expression. After that for each result we print the score, title, type, release year, rating and description of the result movies.


```python
import textwrap


def query(query, top_k=5):
    text, expr = query

    res = client.search(
        collection_name=COLLECTION_NAME,
        data=emb_texts(text),
        filter=expr,
        limit=top_k,
        output_fields=["title", "type", "release_year", "rating", "description"],
        search_params={
            "metric_type": "IP",
            "params": {},
        },
    )

    print("Description:", text, "Expression:", expr)

    for hit_group in res:
        print("Results:")
        for rank, hit in enumerate(hit_group, start=1):
            entity = hit["entity"]

            print(
                f"\tRank: {rank} Score: {hit['distance']:} Title: {entity.get('title', '')}"
            )
            print(
                f"\t\tType: {entity.get('type', '')} "
                f"Release Year: {entity.get('release_year', '')} "
                f"Rating: {entity.get('rating', '')}"
            )
            description = entity.get("description", "")
            print(textwrap.fill(description, width=88))
            print()


my_query = ("movie about a fluffly animal", 'release_year < 2019 and rating like "PG%"')

query(my_query)
```

    Description: movie about a fluffly animal Expression: release_year < 2019 and rating like "PG%"
    Results:
    	Rank: 1 Score: 0.42213767766952515 Title: The Adventures of Tintin
    		Type: Movie Release Year: 2011 Rating: PG
    This 3-D motion capture adapts Georges Remi's classic comic strip about the adventures
    of fearless young journalist Tintin and his trusty dog, Snowy.
    
    	Rank: 2 Score: 0.4041026830673218 Title: Hedgehogs
    		Type: Movie Release Year: 2016 Rating: PG
    When a hedgehog suffering from memory loss forgets his identity, he ends up on a big
    city journey with a pigeon to save his habitat from a human threat.
    
    	Rank: 3 Score: 0.3980264663696289 Title: Osmosis Jones
    		Type: Movie Release Year: 2001 Rating: PG
    Peter and Bobby Farrelly outdo themselves with this partially animated tale about an
    out-of-shape 40-year-old man who's the host to various organisms.
    
    	Rank: 4 Score: 0.39479154348373413 Title: The Lamb
    		Type: Movie Release Year: 2017 Rating: PG
    A big-dreaming donkey escapes his menial existence and befriends some free-spirited
    animal pals in this imaginative retelling of the Nativity Story.
    
    	Rank: 5 Score: 0.39370301365852356 Title: Open Season 2
    		Type: Movie Release Year: 2008 Rating: PG
    Elliot the buck and his forest-dwelling cohorts must rescue their dachshund pal from
    some spoiled pets bent on returning him to domesticity.

