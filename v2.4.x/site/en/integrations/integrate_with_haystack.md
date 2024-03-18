---
id: integrate_with_haystack.md
summary: This page goes over how to search for the best answer to questions using Milvus as the Vector Database and Haystack as the LLM framework.
---

# Build Retrieval Augmented Generative System with Milvus and Haystack

[Haystack](https://github.com/deepset-ai/haystack) is an open source LLM framework in Python by [deepset](https://www.deepset.ai/) for building customizable, production-ready LLM applications. It is an end-to-end framework that assists the orchestration of complete NLP applications by providing tooling for each step of the application-building life cycle.

This guide demonstrates how to build an LLM-driven question-answering application **on the Milvus documentation** with the [Milvus integration of Haystack](https://haystack.deepset.ai/integrations/milvus-document-store). In this example, **Haystack** and **Milvus** work together first to ingest documentation pages and store them in a `MilvusDocumentStore`, and then to use `gpt-4` to answer questions using retrieval-augmentation.

🚀 See the full application that uses the `MilvusDocumentStore` to do Milvus documentation QA [here](https://github.com/TuanaCelik/milvus-documentation-qa/tree/main).

## Installation

Install Haystack and the Milvus integration:

```bash
pip install milvus-haystack
```

## Usage

First, start a Milvus service following the '[Start Milvus](https://milvus.io/docs/install_standalone-docker.md#Start-Milvus)' instructions in the documentation.

Once you have Milvus running locally on `localhost:19530`, you can start using Milvus with Haystack by initializing a `MilvusDocumentStore`: 

```python
from milvus_haystack import MilvusDocumentStore

document_store = MilvusDocumentStore()
```

## Writing Documents to MilvusDocumentStore

To write documents to your `MilvusDocumentStore`, create an indexing pipeline or use the `write_documents()` function.
For this step, you may make use of the available [FileConverters](https://docs.haystack.deepset.ai/docs/file_converters) and [PreProcessors](https://docs.haystack.deepset.ai/docs/preprocessor), as well as other [Haystack Integrations](https://haystack.deepset.ai/integrations) that might help you fetch data from other resources and preprocess them. 

Below is the example indexing pipeline used in the Milvus Documentation QA demo. In this indexing pipeline, we use:
- [Crawler](https://docs.haystack.deepset.ai/docs/crawler) to fetch documentation pages in `https://milvus.io/docs/`
- [PreProcessors](https://docs.haystack.deepset.ai/docs/preprocessor) to split fetched pages into smaller chunks
- [EmbeddingRetriever](https://docs.haystack.deepset.ai/docs/retriever#embedding-retrieval-recommended) to create embeddings for each chunk using `sentence-transformers/multi-qa-mpnet-base-dot-v1` model and index them into `MilvusDocumentStore`

```python
from haystack import Pipeline
from haystack.nodes import Crawler, PreProcessor, EmbeddingRetriever
from milvus_haystack import MilvusDocumentStore

document_store = MilvusDocumentStore(recreate_index=True, return_embedding=True, similarity="cosine")
crawler = Crawler(urls=["https://milvus.io/docs/"], crawler_depth=1, overwrite_existing_files=True, output_dir="crawled_files")
preprocessor = PreProcessor(
    clean_empty_lines=True,
    clean_whitespace=False,
    clean_header_footer=True,
    split_by="word",
    split_length=500,
    split_respect_sentence_boundary=True,
)
retriever = EmbeddingRetriever(document_store=document_store, embedding_model="sentence-transformers/multi-qa-mpnet-base-dot-v1")

indexing_pipeline = Pipeline()
indexing_pipeline.add_node(component=crawler, name="crawler", inputs=['File'])
indexing_pipeline.add_node(component=preprocessor, name="preprocessor", inputs=['crawler'])
indexing_pipeline.add_node(component=retriever, name="retriever", inputs=['preprocessor'])
indexing_pipeline.add_node(component=document_store, name="document_store", inputs=['retriever'])

indexing_pipeline.run()
```

## Creating a Retrieval Augmented Generative (RAG) Pipeline

Once you have documents in your `MilvusDocumentStore`, they can be used in any Haystack pipeline. 

Below is a RAG pipeline that makes use of GPT-4 model from OpenAI with the ["deepset/question-answering"](https://prompthub.deepset.ai/?prompt=deepset%2Fquestion-answering) prompt that is designed to generate answers for the retrieved documents:

```python
from haystack import Pipeline
from haystack.nodes import EmbeddingRetriever, PromptNode, PromptTemplate, AnswerParser
from milvus_haystack import MilvusDocumentStore

document_store = MilvusDocumentStore()

retriever = EmbeddingRetriever(document_store=document_store, embedding_model="sentence-transformers/multi-qa-mpnet-base-dot-v1")
template = PromptTemplate(prompt="deepset/question-answering", output_parser=AnswerParser())
prompt_node = PromptNode(model_name_or_path="gpt-4", default_prompt_template=template, api_key=YOUR_OPENAI_API_KEY, max_length=200)

query_pipeline = Pipeline()
query_pipeline.add_node(component=retriever, name="Retriever", inputs=["Query"])
query_pipeline.add_node(component=prompt_node, name="PromptNode", inputs=["Retriever"])
```

## Ask your question


Once the query pipeline is ready, you can go ahead and run it with a query. The pipeline will then extract relevant sections from the Milvus documentation and generate a response based on the information retrieved.

```python
response = query_pipeline.run(query="How can I start Milvus with Docker?")

print(response)
```
