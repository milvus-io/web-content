---
id: integrate_with_llama.md
summary: This page goes over how to search for the best answer to questions using Milvus as the Vector Database and LlamaIndex as the embedding system.
---

# Documentation QA using LlamaIndex and Milvus

With ChatGPT taking the headlines, many companies are wondering how they can take advantage of it for their current products. One big use case that stands out is improving the tedious and limited search functionality of product documentation. Currently, if a user wants to figure out how to use a product, they must comb through all the document pages hoping to come up with an answer. What if we could replace this tedious process with ChatGPT? What if ChatGPT could summarize all the info that is needed and answer any questions that a user might have?  This is where LlamaIndex and Milvus come in.

LlamaIndex and Milvus work together to ingest and retrieve relevant info. LlamaIndex begins by taking in all the different documents you may have and embedding them using OpenAI. Once we have the embeddings we can push them into Milvus along with any relevant text and metadata. When a user wants to ask a question, LlamaIndex will search through Milvus for the closest answers and use ChatGPT to summarize those answers.

For this example, the documentation that we are going to be searching through is the documentation found on the Milvus [website](milvus.io/docs).

Let's get started.

## Installing requirements

For this example, we are going to be using `pymilvus` to connect to use Milvus and `llama-index` to handle the data manipulation and pipelining. This example will also require having an OpenAI API key for embedding generation.

```shell
pip install pymilvus llama-index
```

## Grabbing the data

We are going to use `git` to pull the Milvus website data. A majority of the documents come in the form of markdown files.

```shell
git clone https://github.com/milvus-io/milvus-docs
```

## Global parameters

Here, we can find the main arguments that need to be modified for running with your own accounts. Beside each is a description of what it is.

```python
from os import environ

HOST = "localhost"
PORT = "19530" 

environ["OPENAI_API_KEY"] = "sk-******" # OpenAI API Key
```

## Consuming the knowledge

Once we have our data on the system, we can proceed to consume it using LlamaIndex and upload it to Milvus. This comes in the form of 2 steps. We begin by loading a markdown reader from [Llama Hub](https://llamahub.ai) and converting all our markdowns into documents.

```python
from llama_index import download_loader
from glob import glob

# Load the markdown reader from the hub
MarkdownReader = download_loader("MarkdownReader")
markdownreader = MarkdownReader()

# Grab all markdown files and convert them using the reader
docs = []
for file in glob("./milvus-docs/site/en/**/*.md", recursive=True):
    docs.extend(markdownreader.load_data(file=file))
print(len(docs))
```

Once we have our documents formed, we can proceed to push them through into Milvus. This step requires the configs for both Milvus and OpenAI.

```python
from llama_index import GPTMilvusIndex

# Push all markdown files into Zilliz Cloud
index = GPTMilvusIndex.from_documents(docs, host=HOST, port=PORT, overwrite=True)
```

## Asking a question

With our documents loaded into Zilliz Cloud, we can begin asking questions. The questions will be searched against the knowledge base and any relevant documents will be used to generate an answer.

```python
s = index.query("What is a collection?")
print(s)

# Output:
# A collection in Milvus is a logical grouping of entities, similar to a table in a relational database management system (RDBMS). It is used to store and manage entities.
```

We are also able to save our connection information and reload it using `save_to_dict()` and `load_from_dict()`.

```python
saved = index.save_to_dict()
del index

index = GPTMilvusIndex.load_from_dict(saved, overwrite = False)
s = index.query("What communication protocol is used in Pymilvus for commicating with Milvus?")
print(s)

# Output:
# The communication protocol used in Pymilvus for communicating with Milvus is gRPC.
```
