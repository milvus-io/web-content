---
id: integrate_with_hugging-face.md
summary: This page goes over how to search for the best answer to questions using Milvus as the Vector Database and Hugging Face as the embedding system.
---

# Question Answering Using Milvus and Hugging Face

This page illustrates how to build a question-answering system using Milvus as the vector database and Hugging Face as the embedding system.

## Before you begin

Code snippets on this page require **pymilvus**, **transformers**, and **datasets** installed. Packages **transformers** and **datasets** are the Hugging Face packages to create the pipeline and **pymilvus** is the client for Milvus. If not present on your system, run the following commands to install them:

```shell
pip install transformers datasets pymilvus torch
```

Then you need to load the modules to be used in this guide.

```python
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility
from datasets import load_dataset_builder, load_dataset, Dataset
from transformers import AutoTokenizer, AutoModel
from torch import clamp, sum
```

## Parameters

Here we can find the parameters used in the following snippets. Some of them need to be changed to fit your environment. Beside each is a description of what it is.

```python
DATASET = 'squad'  # Huggingface Dataset to use
MODEL = 'bert-base-uncased'  # Transformer to use for embeddings
TOKENIZATION_BATCH_SIZE = 1000  # Batch size for tokenizing operaiton
INFERENCE_BATCH_SIZE = 64  # batch size for transformer
INSERT_RATIO = .001  # How many titles to embed and insert
COLLECTION_NAME = 'huggingface_db'  # Collection name
DIMENSION = 768  # Embeddings size
LIMIT = 10  # How many results to search for
MILVUS_HOST = "localhost"
MILVUS_PORT = "19530"
```

To know more about the model and dataset used on this page, refer to [bert-base-uncased](https://huggingface.co/bert-base-uncased) and [squad](https://huggingface.co/datasets/squad).

## Create a collection

This section deals with Milvus and setting up the database for this use case. Within Milvus, we need to set up a collection and index it. 

```python
# Connect to Milvus Database
connections.connect(uri=URI, user=USER, password=PASSWORD, secure=True)

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
    'params':{"nlist":1536}
}
collection.create_index(field_name="original_question_embedding", index_params=index_params)
collection.load()
```

## Insert data

Once we have the collection set up we need to start inserting our data. This is done in three steps

- tokenizing the original question, 
- embedding the tokenized question, and 
- inserting the embedding, original question, and answer.

In this example, the data includes the original question, the original question's embedding, and the answer to the original question. 

```python
data_dataset = load_dataset(DATASET, split='all')
# Generates a fixed subset. To generate a random subset, remove the seed setting. For details, see <https://huggingface.co/docs/datasets/v2.9.0/en/package_reference/main_classes#datasets.Dataset.train_test_split.seed>
data_dataset = data_dataset.train_test_split(test_size=INSERT_RATIO, seed=42)['test']
# Clean up the data structure in the dataset.
data_dataset = data_dataset.map(lambda val: {'answer': val['answers']['text'][0]}, remove_columns=['answers'])

tokenizer = AutoTokenizer.from_pretrained(MODEL)

# Tokenize the question into the format that bert takes.
def tokenize_question(batch):
    results = tokenizer(batch['question'], add_special_tokens = True, truncation = True, padding = "max_length", return_attention_mask = True, return_tensors = "pt")
    batch['input_ids'] = results['input_ids']
    batch['token_type_ids'] = results['token_type_ids']
    batch['attention_mask'] = results['attention_mask']
    return batch

# Generate the tokens for each entry.
data_dataset = data_dataset.map(tokenize_question, batch_size=TOKENIZATION_BATCH_SIZE, batched=True)
# Set the ouput format to torch so it can be pushed into embedding model
data_dataset.set_format('torch', columns=['input_ids', 'token_type_ids', 'attention_mask'], output_all_columns=True)

model = AutoModel.from_pretrained(MODEL)
# Embed the tokenized question and take the mean pool with respect to attention mask of hidden layer.
def embed(batch):
    sentence_embs = model(
                input_ids=batch['input_ids'],
                token_type_ids=batch['token_type_ids'],
                attention_mask=batch['attention_mask']
                )[0]
    input_mask_expanded = batch['attention_mask'].unsqueeze(-1).expand(sentence_embs.size()).float()
    batch['question_embedding'] = sum(sentence_embs * input_mask_expanded, 1) / clamp(input_mask_expanded.sum(1), min=1e-9)
    return batch

data_dataset = data_dataset.map(embed, remove_columns=['input_ids', 'token_type_ids', 'attention_mask'], batched = True, batch_size=INFERENCE_BATCH_SIZE)

# Due to the varchar constraint we are going to limit the question size when inserting
def insert_function(batch):
    insertable = [
        batch['question'],
        [x[:995] + '...' if len(x) > 999 else x for x in batch['answer']],
        batch['question_embedding'].tolist()
    ]    
    collection.insert(insertable)

data_dataset.map(insert_function, batched=True, batch_size=64)
collection.flush()
```

## Ask questions

Once all the data is inserted and indexed within Milvus, we can ask questions and see what the closest answers are.

```python
questions = {'question':['When was chemistry invented?', 'When was Eisenhower born?']}
question_dataset = Dataset.from_dict(questions)

question_dataset = question_dataset.map(tokenize_question, batched = True, batch_size=TOKENIZATION_BATCH_SIZE)
question_dataset.set_format('torch', columns=['input_ids', 'token_type_ids', 'attention_mask'], output_all_columns=True)
question_dataset = question_dataset.map(embed, remove_columns=['input_ids', 'token_type_ids', 'attention_mask'], batched = True, batch_size=INFERENCE_BATCH_SIZE)

def search(batch):
    res = collection.search(batch['question_embedding'].tolist(), anns_field='original_question_embedding', param = {}, output_fields=['answer', 'original_question'], limit = LIMIT)
    overall_id = []
    overall_distance = []
    overall_answer = []
    overall_original_question = []
    for hits in res:
        ids = []
        distance = []
        answer = []
        original_question = []
        for hit in hits:
            ids.append(hit.id)
            distance.append(hit.distance)
            answer.append(hit.entity.get('answer'))
            original_question.append(hit.entity.get('original_question'))
        overall_id.append(ids)
        overall_distance.append(distance)
        overall_answer.append(answer)
        overall_original_question.append(original_question)
    return {
        'id': overall_id,
        'distance': overall_distance,
        'answer': overall_answer,
        'original_question': overall_original_question
    }
question_dataset = question_dataset.map(search, batched=True, batch_size = 1)
for x in question_dataset:
    print()
    print('Question:')
    print(x['question'])
    print('Answer, Distance, Original Question')
    for x in zip(x['answer'], x['distance'], x['original_question']):
        print(x)
```

The output would vary with the subset of data you have downloaded if you leave [the `seed` parameter of the `train_test_split()` method](#Insert-data) unspecified, and should be similar to the following:

```python
Question:
When was chemistry invented?
Answer, Distance, Original Question
('until 1870', tensor(12.7554), 'When did the Papal States exist?')
('October 1992', tensor(12.8504), 'When were free elections held?')
('1787', tensor(14.8283), 'When was the Tower constructed?')
('taxation', tensor(17.1399), 'How did Hobson argue to rid the world of imperialism?')
('1981', tensor(18.9243), "When was ZE's Mutant Disco released?")
('salt and iron', tensor(19.8073), 'What natural resources did the Chinese government have a monopoly on?')
('Medieval Latin', tensor(20.9864), "What was the Latin of Charlemagne's era later known as?")
('military education', tensor(21.0572), 'What Prussian system was superior to the French example?')
('Edgar Bronfman Jr.', tensor(21.6317), 'Who was the head of Seagram?')
('because of persecution, increased poverty and better economic opportunities', tensor(23.1249), 'Why did more than half a million people flee?')

Question:
When was Eisenhower born?
Answer, Distance, Original Question
('until 1870', tensor(17.2719), 'When did the Papal States exist?')
('1787', tensor(17.3752), 'When was the Tower constructed?')
('October 1992', tensor(20.3766), 'When were free elections held?')
('1992', tensor(21.0860), 'In what year was the Premier League created?')
('1981', tensor(23.1728), "When was ZE's Mutant Disco released?")
('Medieval Latin', tensor(23.5315), "What was the Latin of Charlemagne's era later known as?")
('Poland, Bulgaria, the Czech Republic, Slovakia, Hungary, Albania, former East Germany and Cuba', tensor(25.1409), 'Where was Russian schooling mandatory in the 20th century?')
('Antonio B. Won Pat', tensor(25.8398), 'What is the name of the international airport in Guam?')
('1973', tensor(26.7827), 'In what year did the State Management Scheme cease?')
('2019', tensor(27.1236), 'When will Argo be launched?')
```
