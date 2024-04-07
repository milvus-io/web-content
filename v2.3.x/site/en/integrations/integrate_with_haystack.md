---
id: integrate_with_haystack.md
summary: This page goes over how to search for the best answer to questions using Milvus as the Vector Database and Haystack as the LLM framework.
title: Build Retrieval Augmented Generative System with Milvus and Haystack
---

# Build Retrieval Augmented Generative System with Milvus and Haystack

[Haystack](https://github.com/deepset-ai/haystack) is an open source LLM framework in Python by [deepset](https://www.deepset.ai/) for building customizable, production-ready LLM applications. It is an end-to-end framework that assists the orchestration of complete NLP applications by providing tooling for each step of the application-building life cycle.

This guide demonstrates how to build an LLM-driven question-answering application **on the Milvus documentation** with the [Milvus integration of Haystack](https://haystack.deepset.ai/integrations/milvus-document-store). In this example, **Haystack** and **Milvus** work together first to ingest documentation pages and store them in a `MilvusDocumentStore`, and then to use `OpenAIGenerator` to answer questions using retrieval-augmentation.

🚀 See the full application that uses the `MilvusDocumentStore` to do Milvus documentation QA [here](https://github.com/TuanaCelik/milvus-documentation-qa/tree/main).

## Installation

Install Haystack and the Milvus integration:

```bash
pip install milvus-haystack
```

## Usage

First, start a Milvus service following the '[Start Milvus](https://milvus.io/docs/install_standalone-docker.md#Start-Milvus)' instructions in the documentation.

Once you have Milvus running locally on `localhost:19530`, you can start using Milvus with Haystack by initializing a `MilvusDocumentStore`: 


### Create the indexing Pipeline and index some documents
```python
import os

from haystack import Pipeline
from haystack.components.converters import MarkdownToDocument
from haystack.components.embedders import SentenceTransformersDocumentEmbedder, SentenceTransformersTextEmbedder
from haystack.components.preprocessors import DocumentSplitter
from haystack.components.writers import DocumentWriter

from milvus_haystack import MilvusDocumentStore
from milvus_haystack.milvus_embedding_retriever import MilvusEmbeddingRetriever

file_paths = [os.path.abspath(__file__)]  # Your knowledge documents here

document_store = MilvusDocumentStore(
    connection_args={
        "host": "localhost",
        "port": "19530",
        "user": "",
        "password": "",
        "secure": False,
    },
    drop_old=True,
)
indexing_pipeline = Pipeline()
indexing_pipeline.add_component("converter", MarkdownToDocument())
indexing_pipeline.add_component("splitter", DocumentSplitter(split_by="sentence", split_length=2))
indexing_pipeline.add_component("embedder", SentenceTransformersDocumentEmbedder())
indexing_pipeline.add_component("writer", DocumentWriter(document_store))
indexing_pipeline.connect("converter", "splitter")
indexing_pipeline.connect("splitter", "embedder")
indexing_pipeline.connect("embedder", "writer")
indexing_pipeline.run({"converter": {"sources": file_paths}})

print("Number of documents:", document_store.count_documents())

```

### Create the retrieval pipeline and try a query
```python
question = "How to install Haystack and the Milvus integration?"

retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component("embedder", SentenceTransformersTextEmbedder())
retrieval_pipeline.add_component("retriever", MilvusEmbeddingRetriever(document_store=document_store, top_k=3))
retrieval_pipeline.connect("embedder", "retriever")

retrieval_results = retrieval_pipeline.run({"embedder": {"text": question}})

for doc in retrieval_results["retriever"]["documents"]:
    print(doc.content)
    print("-" * 10)
```

### Create the RAG pipeline and try a query
```python
from haystack.utils import Secret
from haystack.components.embedders import SentenceTransformersTextEmbedder
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
rag_pipeline.add_component("text_embedder", SentenceTransformersTextEmbedder())
rag_pipeline.add_component("retriever", MilvusEmbeddingRetriever(document_store=document_store, top_k=3))
rag_pipeline.add_component("prompt_builder", PromptBuilder(template=prompt_template))
rag_pipeline.add_component("generator", OpenAIGenerator(api_key=Secret.from_token(os.getenv("OPENAI_API_KEY")),
                                                        generation_kwargs={"temperature": 0}))
rag_pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
rag_pipeline.connect("retriever.documents", "prompt_builder.documents")
rag_pipeline.connect("prompt_builder", "generator")

results = rag_pipeline.run(
    {
        "text_embedder": {"text": question},
        "prompt_builder": {"query": question},
    }
)
print('RAG answer:', results["generator"]["replies"][0])
```
