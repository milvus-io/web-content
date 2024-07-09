---
id: integrate_with_haystack.md
summary: This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using Haystack and Milvus.
title: Retrieval-Augmented Generation (RAG) with Milvus and Haystack
---

# Retrieval-Augmented Generation (RAG) with Milvus and Haystack

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_haystack.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

This guide demonstrates how to build a Retrieval-Augmented Generation (RAG) system using Haystack and Milvus.

The RAG system combines a retrieval system with a generative model to generate new text based on a given prompt. The system first retrieves relevant documents from a corpus using Milvus, and then uses a generative model to generate new text based on the retrieved documents.

[Haystack](https://haystack.deepset.ai/) is the open source Python framework by deepset for building custom apps with large language models (LLMs). [Milvus](https://milvus.io/) is the world's most advanced open-source vector database, built to power embedding similarity search and AI applications.



## Prerequisites

Before running this notebook, make sure you have the following dependencies installed:


```python
! pip install --upgrade --quiet pymilvus milvus-haystack markdown-it-py mdit_plain
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (Click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

We will use the models from OpenAI. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable.


```python
import os

os.environ["OPENAI_API_KEY"] = "sk-***********"
```

## Prepare the data

We use an online content about [Leonardo Da Vinci](https://www.gutenberg.org/cache/epub/7785/pg7785.txt) as a store of private knowledge for our RAG pipeline, which is a good data source for a simple RAG pipeline.

Download it and save it as a local text file.


```python
import os
import urllib.request

url = "https://www.gutenberg.org/cache/epub/7785/pg7785.txt"
file_path = "./davinci.txt"

if not os.path.exists(file_path):
    urllib.request.urlretrieve(url, file_path)
```

## Create the indexing Pipeline

Create an indexing pipeline that converts the text into documents, splits them into sentences, and embeds them. The documents are then written to the Milvus document store.


```python
from haystack import Pipeline
from haystack.components.converters import MarkdownToDocument
from haystack.components.embedders import OpenAIDocumentEmbedder, OpenAITextEmbedder
from haystack.components.preprocessors import DocumentSplitter
from haystack.components.writers import DocumentWriter
from haystack.utils import Secret

from milvus_haystack import MilvusDocumentStore
from milvus_haystack.milvus_embedding_retriever import MilvusEmbeddingRetriever


document_store = MilvusDocumentStore(
    connection_args={"uri": "./milvus.db"},
    # connection_args={"uri": "http://localhost:19530"},
    # connection_args={"uri": YOUR_ZILLIZ_CLOUD_URI, "token": Secret.from_env_var("ZILLIZ_CLOUD_API_KEY")},
    drop_old=True,
)
```

<div class="alert note">

For the connection_args:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>


```python
indexing_pipeline = Pipeline()
indexing_pipeline.add_component("converter", MarkdownToDocument())
indexing_pipeline.add_component(
    "splitter", DocumentSplitter(split_by="sentence", split_length=2)
)
indexing_pipeline.add_component("embedder", OpenAIDocumentEmbedder())
indexing_pipeline.add_component("writer", DocumentWriter(document_store))
indexing_pipeline.connect("converter", "splitter")
indexing_pipeline.connect("splitter", "embedder")
indexing_pipeline.connect("embedder", "writer")
indexing_pipeline.run({"converter": {"sources": [file_path]}})

print("Number of documents:", document_store.count_documents())
```

    Converting markdown files to Documents: 100%|█| 1/
    Calculating embeddings: 100%|█| 9/9 [00:05<00:00, 
    E20240516 10:40:32.945937 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed
    E20240516 10:40:32.946677 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed
    E20240516 10:40:32.946704 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed
    E20240516 10:40:32.946725 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed


    Number of documents: 277


## Create the retrieval pipeline

Create a retrieval pipeline that retrieves documents from the Milvus document store using a vector similarity search engine.


```python
question = 'Where is the painting "Warrior" currently stored?'

retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component("embedder", OpenAITextEmbedder())
retrieval_pipeline.add_component(
    "retriever", MilvusEmbeddingRetriever(document_store=document_store, top_k=3)
)
retrieval_pipeline.connect("embedder", "retriever")

retrieval_results = retrieval_pipeline.run({"embedder": {"text": question}})

for doc in retrieval_results["retriever"]["documents"]:
    print(doc.content)
    print("-" * 10)
```

    ). The
    composition of this oil-painting seems to have been built up on the
    second cartoon, which he had made some eight years earlier, and which
    was apparently taken to France in 1516 and ultimately lost.
    ----------
    
    This "Baptism of Christ," which is now in the Accademia in Florence
    and is in a bad state of preservation, appears to have been a
    comparatively early work by Verrocchio, and to have been painted
    in 1480-1482, when Leonardo would be about thirty years of age.
    
    To about this period belongs the superb drawing of the "Warrior," now
    in the Malcolm Collection in the British Museum.
    ----------
    " Although he
    completed the cartoon, the only part of the composition which he
    eventually executed in colour was an incident in the foreground
    which dealt with the "Battle of the Standard." One of the many
    supposed copies of a study of this mural painting now hangs on the
    south-east staircase in the Victoria and Albert Museum.
    ----------


## Create the RAG pipeline

Create a RAG pipeline that combines the MilvusEmbeddingRetriever and the OpenAIGenerator to answer the question using the retrieved documents.


```python
from haystack.utils import Secret
from haystack.components.builders import PromptBuilder
from haystack.components.generators import OpenAIGenerator

prompt_template = """Answer the following query based on the provided context. If the context does
                     not include an answer, reply with 'I don't know'.\n
                     Query: {{query}}
                     Documents:
                     {% for doc in documents %}
                        {{ doc.content }}
                     {% endfor %}
                     Answer:
                  """

rag_pipeline = Pipeline()
rag_pipeline.add_component("text_embedder", OpenAITextEmbedder())
rag_pipeline.add_component(
    "retriever", MilvusEmbeddingRetriever(document_store=document_store, top_k=3)
)
rag_pipeline.add_component("prompt_builder", PromptBuilder(template=prompt_template))
rag_pipeline.add_component(
    "generator",
    OpenAIGenerator(
        api_key=Secret.from_token(os.getenv("OPENAI_API_KEY")),
        generation_kwargs={"temperature": 0},
    ),
)
rag_pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
rag_pipeline.connect("retriever.documents", "prompt_builder.documents")
rag_pipeline.connect("prompt_builder", "generator")

results = rag_pipeline.run(
    {
        "text_embedder": {"text": question},
        "prompt_builder": {"query": question},
    }
)
print("RAG answer:", results["generator"]["replies"][0])
```

    RAG answer: The painting "Warrior" is currently stored in the Malcolm Collection in the British Museum.


For more information about how to use milvus-haystack, please refer to the [milvus-haystack Readme](https://github.com/milvus-io/milvus-haystack).
