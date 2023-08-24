---
id: integrate_with_cohere.md
summary: This page goes over how to search for the best answer to questions using Milvus as the Vector Database and Hugging Face as the embedding system.
---

# Question Answering Using Milvus and Cohere

This page illustrates how to create a question-answering system based on the SQuAD dataset using Milvus as the vector database and Cohere as the embedding system.

## Before you begin

Code snippets on this page require **pymilvus**, **cohere**, **pandas**, **numpy**, and **tqdm** installed. Among these packages, **pymilvus** is the client for Milvus. If not present on your system, run the following commands to install them:

```shell
pip install pymilvus cohere pandas numpy tqdm
```

Then you need to load the modules to be used in this guide.

```python
import cohere
import pandas
import numpy as np
from tqdm import tqdm
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility
```

## Parameters

Here we can find the parameters used in the following snippets. Some of them need to be changed to fit your environment. Beside each is a description of what it is.

```python
FILE = 'https://rajpurkar.github.io/SQuAD-explorer/dataset/train-v2.0.json'  # The SQuAD dataset url
COLLECTION_NAME = 'question_answering_db'  # Collection name
DIMENSION = 768  # Embeddings size, cohere embeddings default to 4096 with the large model
COUNT = 5000  # How many questions to embed and insert into Milvus
BATCH_SIZE = 96 # How large of batches to use for embedding and insertion
MILVUS_HOST = 'localhost'  # Milvus server URI
MILVUS_PORT = '19530'
COHERE_API_KEY = 'replace-this-with-the-cohere-api-key'  # API key obtained from Cohere
```

To know more about the model and dataset used on this page, refer to [co:here](https://cohere.ai/) and [SQuAD](https://rajpurkar.github.io/SQuAD-explorer/).

## Prepare the dataset

In this example, we are going to use the Stanford Question Answering Dataset (SQuAD) as our truth source for answering questions. This dataset comes in the form of a JSON file and we are going to use **pandas** to load it in.

```python
# Download the dataset
dataset = pandas.read_json(FILE)

# Clean up the dataset by grabbing all the question answer pairs
simplified_records = []
for x in dataset['data']:
    for y in x['paragraphs']:
        for z in y['qas']:
            if len(z['answers']) != 0:
                simplified_records.append({'question': z['question'], 'answer': z['answers'][0]['text']})

# Grab the amount of records based on COUNT
simplified_records = pandas.DataFrame.from_records(simplified_records)
simplified_records = simplified_records.sample(n=min(COUNT, len(simplified_records)), random_state = 42)

# Check the length of the cleaned dataset matches count
print(len(simplified_records))
```

The output should be the number of records in the dataset

```shell
5000
```

## Create a collection

This section deals with Milvus and setting up the database for this use case. Within Milvus, we need to set up a collection and index it.

```python
# Connect to Milvus Database
connections.connect(host=MILVUS_HOST, port=MILVUS_PORT)

# Remove collection if it already exists
if utility.has_collection(COLLECTION_NAME):
    utility.drop_collection(COLLECTION_NAME)

# Create collection which includes the id, title, and embedding.
fields = [
    FieldSchema(name='id', dtype=DataType.INT64, is_primary=True, auto_id=True),
    FieldSchema(name='original_question', dtype=DataType.VARCHAR, max_length=1000),
    FieldSchema(name='answer', dtype=DataType.VARCHAR, max_length=1000),
    FieldSchema(name='original_question_embedding', dtype=DataType.FLOAT_VECTOR, dim=DIMENSION)
]
schema = CollectionSchema(fields=fields)
collection = Collection(name=COLLECTION_NAME, schema=schema)

# Create an IVF_FLAT index for collection.
index_params = {
    'metric_type':'L2',
    'index_type':"IVF_FLAT",
    'params':{"nlist": 1024}
}
collection.create_index(field_name="original_question_embedding", index_params=index_params)
collection.load()
```

## Insert data

Once we have the collection set up we need to start inserting our data. This is done in three steps

- reading the data, 
- embedding the original questions, and 
- inserting the data into the collection we've just created on Milvus.

In this example, the data includes the original question, the original question's embedding, and the answer to the original question. 

```python
# Set up a co:here client.
cohere_client = cohere.Client(COHERE_API_KEY)

# Extract embedings from questions using Cohere
def embed(texts):
    res = cohere_client.embed(texts, model='multilingual-22-12')
    return res.embeddings

# Insert each question, answer, and qustion embedding
total = pandas.DataFrame()
for batch in tqdm(np.array_split(simplified_records, (COUNT/BATCH_SIZE) + 1)):
    questions = batch['question'].tolist()
    
    data = [
        questions,
        batch['answer'].tolist(),
        embed(questions)      
    ]

    collection.insert(data)

# Flush at end to make sure all rows are sent for indexing
collection.flush()
```

## Ask questions

Once all the data is inserted into the Milvus collection, we can ask the system questions by taking our question phrase, embedding it with Cohere, and searching with the collection. 

<div class="alert note">

Searches performed on data right after insertion might be a little slower as searching unindexed data is done in a brute-force manner. Once the new data is automatically indexed, the searches will speed up.

</div>

```python
# Search the database for an answer to a question text
def search(text, top_k = 5):

    # Set search params 
    search_params = {
        "metric_type": "L2",
        "params": {"nprobe": 10}
    }

    results = collection.search(
        data = embed([text]),  # Embeded the question
        anns_field="original_question_embedding",  # Search across the original original question embeddings
        param=search_params,
        limit = top_k,  # Limit to top_k results per search
        output_fields=['original_question', 'answer']  # Include the original question and answer in the result
    )

    ret = []
    for hit in results[0]:
        row = []
        row.extend([hit.entity.get('answer'), hit.score, hit.entity.get('original_question') ])  # Get the answer, distance, and original question for the results
        ret.append(row)
    return ret

# Ask these questions
search_questions = ['What kills bacteria?', 'Whats the biggest dog?']

# Print out the results in order of [answer, similarity score, original question]
for question in search_questions:
    print('Question:', question)
    print('\nAnswer,', 'Distance,', 'Original Question')
    for result in search(question):
        print(result)
    print()
```

The output should be similar to the following:

```shell
Question: What kills bacteria?

Answer, Distance, Original Question
['Phage therapy', 5976.171875, 'What has been talked about to treat resistant bacteria?']
['oral contraceptives', 7065.4130859375, 'In therapy, what does the antibacterial interact with?']
['farming', 7250.0791015625, 'What makes bacteria resistant to antibiotic treatment?']
['slowing down the multiplication of bacteria or killing the bacteria', 7291.306640625, 'How do antibiotics work?']
['converting nitrogen gas to nitrogenous compounds', 7310.67724609375, 'What do bacteria do in soil?']

Question: Whats the biggest dog?

Answer, Distance, Original Question
['English Mastiff', 4205.16064453125, 'What breed was the largest dog known to have lived?']
['Rico', 6108.88427734375, 'What is the name of the dog that could ID over 200 things?']
['part of the family', 7904.853515625, 'Most people today describe their dogs as what?']
['77.5 million', 8752.98828125, 'How many people in the United States are said to own dog?']
['Iditarod Trail Sled Dog Race', 9251.58984375, 'Which dog-sled race in Alaska is the most famous?']
```