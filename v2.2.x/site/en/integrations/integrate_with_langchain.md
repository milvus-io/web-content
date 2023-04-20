---
id: integrate_with_langchain.md
summary: This page goes over how to search for the best answer to questions using Milvus as the Vector Database and LlamaIndex as the embedding system.
---

# Question Answering over Documents with Milvus and LangChain

This guide demonstrates how to build an LLM-driven question-answering application with Milvus and LangChain. 

## Before you begin

Code snippets on this page require **pymilvus** and **langchain** installed. If not present on your system, run the following commands to install it.

```shell
python -m pip install pymilvus, langchain
```

## Grabbing the Data

We are going to use `git` to pull the Milvus website data. A majority of the documents come in the form of markdown files.

```shell
git clone https://github.com/milvus-io/milvus-docs
```

## Global parameters

In this section, you need to set up all parameters to be used in the following code snippets.

```python
MILVUS_HOST = "127.0.0.1"
MILVUS_PORT = "19530"
OPENAI_API_KEY = "sk-******" # example: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
DOC_SOURCE = "Jupiter.pdf" # example: "/path/to/your/source/docs"

## Set up environment variables
environ["OPENAI_API_KEY"] = OPENAI_API_KEY
```

## Prepare data

Before you dive in, you should finish the following steps:

- Prepare the documents you want the LLM to peak at when it thinks.
- Set up an embedding model to convert documents into vector embeddings.
- Set up a vector store used to save the vector embeddings.

```python
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Milvus
from langchain.document_loaders import UnstructuredMarkdownLoader
```