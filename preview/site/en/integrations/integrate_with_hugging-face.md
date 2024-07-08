---
id: integrate_with_hugging-face.md
summary: This tutorial shows how to build a question answering system using Hugging Face as the data loader & embedding generator for data processing and Milvus as the vector database for semantic search.
title: Question Answering Using Milvus and Hugging Face
---

# Question Answering Using Milvus and Hugging Face

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/qa_with_milvus_and_hf.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

A question answering system based on semantic search works by finding the most similar question from a dataset of question-answer pairs for a given query question. Once the most similar question is identified, the corresponding answer from the dataset is considered as the answer for the query. This approach relies on semantic similarity measures to determine the similarity between questions and retrieve relevant answers.

This tutorial shows how to build a question answering system using [Hugging Face](https://huggingface.co) as the data loader & embedding generator for data processing and [Milvus](https://milvus.io) as the vector database for semantic search.

## Before you begin

You need to make sure all required dependencies are installed:

- `pymilvus`: a python package works with the vector database service powered by Milvus or Zilliz Cloud.
- `datasets`, `transformers`: Hugging Face packages manage data and utilize models.
- `torch`: a powerful library provides efficient tensor computation and deep learning tools.


```python
$ pip install --upgrade pymilvus transformers datasets torch
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime**. (Click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

## Prepare data

In this section, we will load example question-answer pairs from the Hugging Face Datasets. As a demo, we only take partial data from the validation split of [SQuAD](https://huggingface.co/datasets/rajpurkar/squad).


```python
from datasets import load_dataset


DATASET = "squad"  # Name of dataset from HuggingFace Datasets
INSERT_RATIO = 0.001  # Ratio of example dataset to be inserted

data = load_dataset(DATASET, split="validation")
# Generates a fixed subset. To generate a random subset, remove the seed.
data = data.train_test_split(test_size=INSERT_RATIO, seed=42)["test"]
# Clean up the data structure in the dataset.
data = data.map(
    lambda val: {"answer": val["answers"]["text"][0]},
    remove_columns=["id", "answers", "context"],
)

# View summary of example data
print(data)
```

    Dataset({
        features: ['title', 'question', 'answer'],
        num_rows: 11
    })


To generate embeddings for questions, you are able to select a text embedding model from Hugging Face Models. In this tutorial, we will use a small sentencce embedding model [all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) as example.


```python
from transformers import AutoTokenizer, AutoModel
import torch

MODEL = (
    "sentence-transformers/all-MiniLM-L6-v2"  # Name of model from HuggingFace Models
)
INFERENCE_BATCH_SIZE = 64  # Batch size of model inference

# Load tokenizer & model from HuggingFace Hub
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModel.from_pretrained(MODEL)


def encode_text(batch):
    # Tokenize sentences
    encoded_input = tokenizer(
        batch["question"], padding=True, truncation=True, return_tensors="pt"
    )

    # Compute token embeddings
    with torch.no_grad():
        model_output = model(**encoded_input)

    # Perform pooling
    token_embeddings = model_output[0]
    attention_mask = encoded_input["attention_mask"]
    input_mask_expanded = (
        attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    )
    sentence_embeddings = torch.sum(
        token_embeddings * input_mask_expanded, 1
    ) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

    # Normalize embeddings
    batch["question_embedding"] = torch.nn.functional.normalize(
        sentence_embeddings, p=2, dim=1
    )
    return batch


data = data.map(encode_text, batched=True, batch_size=INFERENCE_BATCH_SIZE)
data_list = data.to_list()
```

## Insert data

Now we have question-answer pairs ready with question embeddings. The next step is to insert them into the vector database.

We will first need to connect to Milvus service and create a Milvus collection.


```python
from pymilvus import MilvusClient


MILVUS_URI = "./huggingface_milvus_test.db"  # Connection URI
COLLECTION_NAME = "huggingface_test"  # Collection name
DIMENSION = 384  # Embedding dimension depending on model

milvus_client = MilvusClient(MILVUS_URI)
if milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(
    collection_name=COLLECTION_NAME,
    dimension=DIMENSION,
    auto_id=True,  # Enable auto id
    enable_dynamic_field=True,  # Enable dynamic fields
    vector_field_name="question_embedding",  # Map vector field name and embedding column in dataset
    consistency_level="Strong",  # To enable search with latest data
)
```

<div class="alert note">

As for the argument of `MilvusClient`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

Insert all data into the collection:


```python
milvus_client.insert(collection_name=COLLECTION_NAME, data=data_list)
```




    {'insert_count': 11,
     'ids': [450072488481390592, 450072488481390593, 450072488481390594, 450072488481390595, 450072488481390596, 450072488481390597, 450072488481390598, 450072488481390599, 450072488481390600, 450072488481390601, 450072488481390602],
     'cost': 0}



## Ask questions

Once all the data is inserted into Milvus, we can ask questions and see what the closest answers are.


```python
questions = {
    "question": [
        "What is LGM?",
        "When did Massachusetts first mandate that children be educated in schools?",
    ]
}

# Generate question embeddings
question_embeddings = [v.tolist() for v in encode_text(questions)["question_embedding"]]

# Search across Milvus
search_results = milvus_client.search(
    collection_name=COLLECTION_NAME,
    data=question_embeddings,
    limit=3,  # How many search results to output
    output_fields=["answer", "question"],  # Include these fields in search results
)

# Print out results
for q, res in zip(questions["question"], search_results):
    print("Question:", q)
    for r in res:
        print(
            {
                "answer": r["entity"]["answer"],
                "score": r["distance"],
                "original question": r["entity"]["question"],
            }
        )
    print("\n")
```

    Question: What is LGM?
    {'answer': 'Last Glacial Maximum', 'score': 0.956273078918457, 'original question': 'What does LGM stands for?'}
    {'answer': 'coordinate the response to the embargo', 'score': 0.2120140939950943, 'original question': 'Why was this short termed organization created?'}
    {'answer': '"Reducibility Among Combinatorial Problems"', 'score': 0.1945795714855194, 'original question': 'What is the paper written by Richard Karp in 1972 that ushered in a new era of understanding between intractability and NP-complete problems?'}
    
    
    Question: When did Massachusetts first mandate that children be educated in schools?
    {'answer': '1852', 'score': 0.9709997177124023, 'original question': 'In what year did Massachusetts first require children to be educated in schools?'}
    {'answer': 'several regional colleges and universities', 'score': 0.34164726734161377, 'original question': 'In 1890, who did the university decide to team up with?'}
    {'answer': '1962', 'score': 0.1931006908416748, 'original question': 'When were stromules discovered?'}
