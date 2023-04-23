---
id: integrate_with_langchain.md
summary: This page goes over how to search for the best answer to questions using Milvus as the Vector Database and LlamaIndex as the embedding system.
---

# Question Answering over Documents with Milvus and LangChain

This guide demonstrates how to build an LLM-driven question-answering application with Milvus and LangChain.

## Before you begin

Code snippets on this page require **pymilvus** and **langchain** installed. OpenAI's embedding API has also been used to embed docs into the vector store, and therefore **openai** and **tiktoken** are also required. If they are not present on your system, run the following commands to install them.

```shell
! python -m pip install --upgrade pymilvus langchain openai tiktoken
```

## Global parameters

In this section, you need to set up all parameters to be used in the following code snippets.

```python
from os import environ

MILVUS_HOST = "localhost"
MILVUS_PORT = "19530"
OPENAI_API_KEY = "sk-******" # example: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

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
from langchain.vectorstores import Milvus
from langchain.document_loaders import WebBaseLoader
from langchain.text_splitter import CharacterTextSplitter

# Use the WebBaseLoader to load specified web pages into documents
loader = WebBaseLoader([
    "https://milvus.io/docs/overview.md",
])

docs = loader.load()

# Split the documents into smaller chunks
text_splitter = CharacterTextSplitter(chunk_size=1024, chunk_overlap=0)
docs = text_splitter.split_documents(docs)
```

The output of the text splitter would be similar to the following:

```shell
Created a chunk of size 1745, which is longer than the specified 1024
Created a chunk of size 1278, which is longer than the specified 1024
```

Once the documents are ready, we need to convert them into vector embeddings and save them into the vector store.

```python
# Set up an embedding model to covert document chunks into vector embeddings.
embeddings = OpenAIEmbeddings(model="ada")

# Set up a vector store used to save the vector embeddings. Here we use Milvus as the vector store.
vector_store = Milvus.from_documents(
    docs,
    embedding=embeddings,
    connection_args={"host": MILVUS_HOST, "port": MILVUS_PORT}
)
```

You can try text-to-text similarity searches using the following code snippet. The results returned will be the most relevant text in the document to the queries.

```python
query = "What is milvus?"
docs = vector_store.similarity_search(query)

print(docs)
```

The output should be similar to the following:

```shell
[Document(page_content='Milvus workflow.', metadata={'source': 'https://milvus.io/docs/overview.md', 'title': 'Introduction Milvus documentation', 'description': 'Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.', 'language': 'en'}), Document(page_content="Installat...rved.", metadata={'source': 'https://milvus.io/docs/overview.md', 'title': 'Introduction Milvus documentation', 'description': 'Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.', 'language': 'en'}), Document(page_content='Introduction ... Milvus is able to analyze the correlation between two vectors by calculating their similarity distance. If the two embedding vectors are very similar, it means that the original data sources are similar as well.', metadata={'source': 'https://milvus.io/docs/overview.md', 'title': 'Introduction Milvus documentation', 'description': 'Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.', 'language': 'en'}), Document(page_content="Key concepts\n...search algorithms are used to accelerate the searching process. If the two embedding vectors are very similar, it means that the original data sources are similar as well.\nWhy Milvus?", metadata={'source': 'https://milvus.io/docs/overview.md', 'title': 'Introduction Milvus documentation', 'description': 'Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.', 'language': 'en'})]
```

## Ask your question

Once the documents are ready to serve, you can set up a chain to include them in a prompt so that LLM will use the docs as a reference when preparing answers.

Note that LangChain offers four chain types for question-answering with sources, namely **stuff**, **map_reduce**, **refine**, and **map-rerank**. In simple terms, a **stuff** chain will include the document as a whole, which is only suitable for small documents. As most LLMs impose restrictions on the maximum number of tokens a prompt can contain, it is recommended to use the other three types of chains. These chains split the input document into smaller pieces and feed them to the LLM in different ways. For details, refer to [Index-related chains](https://docs.langchain.com/docs/components/chains/index_related_chains) in LangChain documents.

The following code snippet sets up a chain using OpenAI as the LLM and **map-reduce** the chain type.

```python
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.llms import OpenAI

chain = load_qa_with_sources_chain(OpenAI(temperature=0), chain_type="map_reduce", return_intermediate_steps=True)
query = "What is Milvus?"
chain({"input_documents": docs, "question": query}, return_only_outputs=True)
```

The returned results include both the **intermediate_steps** and **output_text**. The former indicates what documents it refers to during the search, and the latter is the final answer to the question.

```shell
{'intermediate_steps': [' No relevant text.',
  ' What is Milvus vector database?',
  '\nWhat is Milvus? Milvus was created in 2019 with a singular goal: store, index, and manage massive embedding vectors generated by deep neural networks and other machine learning (ML) models. As a database specifically designed to handle queries over input vectors, it is capable of indexing vectors on a trillion scale. Unlike existing relational databases which mainly deal with structured data following a pre-defined pattern, Milvus is designed from the bottom-up to handle embedding vectors converted from unstructured data.',
  ' Milvus is a vector database and similarity search platform that enables users to quickly and accurately search for semantically similar vectors in an unstructured data repository. It uses modern embedding techniques to convert unstructured data to embedding vectors, and approximate nearest neighbor (ANN) search algorithms to accelerate the searching process.'],
 'output_text': ' Milvus is a vector database and similarity search platform that enables users to quickly and accurately search for semantically similar vectors in an unstructured data repository. It uses modern embedding techniques to convert unstructured data to embedding vectors, and approximate nearest neighbor (ANN) search algorithms to accelerate the searching process.\nSOURCES: https://milvus.io/docs/overview.md'}
```