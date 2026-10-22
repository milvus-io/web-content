---
id: full_text_search_with_milvus_and_haystack.md
summary: This tutorial demonstrates how to implement full-text and hybrid search in your application using Haystack and Milvus.
title: Full-text search with Milvus and Haystack
---

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

# Full-text search with Milvus and Haystack


[Full-text search](https://milvus.io/docs/full-text-search.md#Full-Text-Search) is a traditional method for retrieving documents by matching specific keywords or phrases in the text. It ranks results based on relevance scores calculated from factors like term frequency. While semantic search is better at understanding meaning and context, full-text search excels at precise keyword matching, making it a useful complement to semantic search. The BM25 algorithm is widely used for ranking in full-text search and plays a key role in Retrieval-Augmented Generation (RAG).

[Milvus 2.5](https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md) introduces native full-text search capabilities using BM25. This approach converts text into sparse vectors that represent BM25 scores. You can simply input raw text and Milvus will automatically generate and store the sparse vectors, with no manual sparse embedding generation required.

[Haystack](https://haystack.deepset.ai/) now supports this Milvus feature, making it easy to add full-text search to RAG applications. You can combine full-text search with dense vector semantic search for a hybrid approach that benefits from both semantic understanding and keyword matching precision. This combination improves search accuracy and delivers better results to users.

This tutorial demonstrates how to implement full-text and hybrid search in your application using Haystack and Milvus.

You can run this tutorial locally with Milvus Lite, connect to a Milvus server, or use [Zilliz Cloud](https://docs.zilliz.com/docs/register-with-zilliz-cloud), the fully managed Milvus service.

<div class="alert note">

- Before proceeding with this tutorial, ensure you have a basic understanding of [full-text search](https://milvus.io/docs/full-text-search.md#Full-Text-Search) and the [basic usage](https://github.com/milvus-io/milvus-haystack/blob/main/README.md) of Haystack Milvus integration.

</div>

## Prerequisites

This tutorial requires Python 3.10 or later. Install the Haystack integration for Milvus together with current PyMilvus and Milvus Lite packages:

```shell
pip install --upgrade --quiet "milvus-haystack>=0.1.0" "pymilvus>=3.0.2" "milvus-lite>=3.2.2"
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime** (click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

We will use the models from OpenAI. You should prepare the [api key](https://platform.openai.com/docs/quickstart) `OPENAI_API_KEY` as an environment variable.

```python
import os

os.environ["OPENAI_API_KEY"] = "sk-***********"
```

### Prepare the data

Import the necessary packages in this notebook. Then prepare some sample documents.

```python
import os

from haystack import Document, Pipeline
from haystack.components.builders import ChatPromptBuilder
from haystack.components.embedders import OpenAIDocumentEmbedder, OpenAITextEmbedder
from haystack.components.generators.chat import OpenAIChatGenerator
from haystack.components.writers import DocumentWriter
from haystack.dataclasses import ChatMessage
from haystack.document_stores.types import DuplicatePolicy
from haystack.utils import Secret

from milvus_haystack import (
    MilvusDocumentStore,
    MilvusHybridRetriever,
    MilvusSparseEmbeddingRetriever,
)
from milvus_haystack.function import BM25BuiltInFunction

documents = [
    Document(content="Alice likes this apple", meta={"category": "fruit"}),
    Document(content="Bob likes swimming", meta={"category": "sport"}),
    Document(content="Charlie likes white dogs", meta={"category": "pets"}),
]
```

Integrating full-text search into a RAG system balances semantic search with precise and predictable keyword-based retrieval. You can also choose to only use full text search though it's recommended to combine full text search with semantic search for better search results. Here for demonstration purpose we will show full text search alone and hybrid search.

## BM25 search without embedding
### Create the indexing Pipeline

For full-text search, `MilvusDocumentStore` accepts a `builtin_function` parameter. Pass a `BM25BuiltInFunction` instance to let Milvus generate BM25 sparse vectors on the server side. For example:

```python
connection_args = {"uri": os.getenv("MILVUS_URI", "./milvus_full_text.db")}
if os.getenv("MILVUS_TOKEN"):
    connection_args["token"] = Secret.from_env_var("MILVUS_TOKEN")

document_store = MilvusDocumentStore(
    collection_name="haystack_bm25_demo",
    connection_args=connection_args,
    sparse_vector_field="sparse_vector",  # The sparse vector field.
    text_field="text",
    builtin_function=[
        BM25BuiltInFunction(  # The BM25 function converts the text into a sparse vector.
            input_field_names="text",
            output_field_names="sparse_vector",
        )
    ],
    # Strong consistency waits for all loads to complete, adding latency with large datasets
    # consistency_level="Strong",  # Supported values are (`"Strong"`, `"Session"`, `"Bounded"`, `"Eventually"`).
    drop_old=True,
)
```

<div class="alert note">

For the `connection_args`:
- The default local file, `./milvus_full_text.db`, uses [Milvus Lite](https://milvus.io/docs/milvus_lite.md).
- For a Milvus server on [Docker or Kubernetes](https://milvus.io/docs/quickstart.md), set `MILVUS_URI` to the server address, such as `http://localhost:19530`.
- For [Zilliz Cloud](https://zilliz.com/cloud), set `MILVUS_URI` and `MILVUS_TOKEN` to the [Public Endpoint and API key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) shown in the console.

</div>


Build an indexing pipeline to write documents into the Milvus document store.

```python
writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component("writer", writer)
_ = indexing_pipeline.run({"writer": {"documents": documents}})

print("Number of documents:", document_store.count_documents())
```

    Number of documents: 3

### Create the retrieval pipeline
Create a retrieval pipeline that retrieves documents from the Milvus document store using `MilvusSparseEmbeddingRetriever`, which is a wrapper around `document_store`.

```python
retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(
    "retriever", MilvusSparseEmbeddingRetriever(document_store=document_store)
)

question = "Who likes swimming?"

retrieval_results = retrieval_pipeline.run({"retriever": {"query_text": question}})

print(retrieval_results["retriever"]["documents"][0].content)
```

    Bob likes swimming

## Hybrid Search with semantic search and full-text search

### Create the indexing Pipeline

In the hybrid search, we use the BM25 function to perform full-text search, and specify the dense vector field `vector`, to perform semantic search. This collection also uses a custom analyzer so we can inspect its schema later in the tutorial.

```python
analyzer_params_custom = {
    "tokenizer": "standard",
    "filter": [
        "lowercase",
        {"type": "length", "max": 40},
        {"type": "stop", "stop_words": ["of", "to"]},
    ],
}

document_store = MilvusDocumentStore(
    collection_name="haystack_hybrid_demo",
    connection_args=connection_args,
    vector_field="vector",  # The dense vector field.
    sparse_vector_field="sparse_vector",  # The sparse vector field.
    text_field="text",
    builtin_function=[
        BM25BuiltInFunction(  # The BM25 function converts the text into a sparse vector.
            input_field_names="text",
            output_field_names="sparse_vector",
            analyzer_params=analyzer_params_custom,
            enable_match=True,
        )
    ],
    # Strong consistency waits for all loads to complete, adding latency with large datasets
    # consistency_level="Strong",  # Supported values are (`"Strong"`, `"Session"`, `"Bounded"`, `"Eventually"`).
    drop_old=True,
)
```

Create an indexing pipeline that converts the documents into embeddings. The documents are then written to the Milvus document store.

```python
writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component("dense_doc_embedder", OpenAIDocumentEmbedder())
indexing_pipeline.add_component("writer", writer)
indexing_pipeline.connect("dense_doc_embedder", "writer")
indexing_pipeline.run({"dense_doc_embedder": {"documents": documents}})

print("Number of documents:", document_store.count_documents())
```

    Number of documents: 3

### Create the retrieval pipeline

Create a retrieval pipeline that retrieves documents from the Milvus document store using `MilvusHybridRetriever`, which contains the `document_store` and receives parameters about hybrid search.

```python
# from pymilvus import WeightedRanker
retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component("dense_text_embedder", OpenAITextEmbedder())
retrieval_pipeline.add_component(
    "retriever",
    MilvusHybridRetriever(
        document_store=document_store,
        # top_k=3,
        # reranker=WeightedRanker(0.5, 0.5),  # Default is RRFRanker()
    ),
)

_ = retrieval_pipeline.connect(
    "dense_text_embedder.embedding", "retriever.query_embedding"
)
```

When performing hybrid search using `MilvusHybridRetriever`, we can optionally set the topK and reranker parameters. It will automatically handle the vector embeddings and built-in functions and finally use a reranker to refine the results. The underlying implementation details of the searching process are hidden from the user.

For more information about hybrid search, you can refer to the [Hybrid Search introduction](https://milvus.io/docs/multi-vector-search.md#Hybrid-Search).

```python
question = "Who likes swimming?"

retrieval_results = retrieval_pipeline.run(
    {
        "dense_text_embedder": {"text": question},
        "retriever": {"query_text": question},
    }
)

print(retrieval_results["retriever"]["documents"][0].content)
```

    Bob likes swimming

## Customize analyzer

Analyzers are essential in full-text search by breaking the sentence into tokens and performing lexical analysis like stemming and stop word removal. Analyzers are usually language-specific. You can refer to [this guide](https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview) to learn more about analyzers in Milvus.

Milvus supports two types of analyzers: **Built-in Analyzers** and **Custom Analyzers**. By default, the `BM25BuiltInFunction` will use the [standard built-in analyzer](https://milvus.io/docs/standard-analyzer.md), which is the most basic analyzer that tokenizes the text with punctuation.

The hybrid document store above passes `analyzer_params_custom` to `BM25BuiltInFunction` and enables text matching. This keeps the analyzer definition with the collection that uses it.

We can take a look at the schema of the Milvus collection and make sure the customized analyzer is set up correctly.

```python
collection = document_store.client.describe_collection(document_store.collection_name)
text_field = next(field for field in collection["fields"] if field["name"] == "text")
print("Custom analyzer:", text_field["params"]["analyzer_params"])
```

    Custom analyzer: {"tokenizer": "standard", "filter": ["lowercase", {"type": "length", "max": 40}, {"type": "stop", "stop_words": ["of", "to"]}]}

For more concept details, e.g., `analyzer`, `tokenizer`, `filter`, `enable_match`, `analyzer_params`, please refer to the [analyzer documentation](https://milvus.io/docs/analyzer-overview.md).

## Using Hybrid Search in RAG pipeline
We have learned how to use the basic BM25 built-in function in Haystack and Milvus and prepared a loaded `document_store`. Let's introduce an optimized RAG implementation with hybrid search.


![](https://github.com/milvus-io/bootcamp/blob/master/pics/advanced_rag/hybrid_and_rerank.png?raw=1)

This diagram shows the Hybrid Retrieve & Reranking process, combining BM25 for keyword matching and dense vector search for semantic retrieval. Results from both methods are merged, reranked, and passed to an LLM to generate the final answer.

Hybrid search balances precision and semantic understanding, improving accuracy and robustness for diverse queries. It retrieves candidates with BM25 full-text search and vector search, ensuring both semantic, context-aware, and accurate retrieval.

Let's try an optimized RAG implementation with hybrid search.

```python
prompt_template = [
    ChatMessage.from_user(
        """Answer the following query based on the provided context. If the context does
        not include an answer, reply with 'I don't know'.

        Query: {{query}}
        Documents:
        {% for doc in documents %}
            {{ doc.content }}
        {% endfor %}
        Answer:
        """
    )
]

rag_pipeline = Pipeline()
rag_pipeline.add_component("text_embedder", OpenAITextEmbedder())
rag_pipeline.add_component(
    "retriever", MilvusHybridRetriever(document_store=document_store, top_k=1)
)
rag_pipeline.add_component(
    "prompt_builder", ChatPromptBuilder(template=prompt_template)
)
rag_pipeline.add_component(
    "generator",
    OpenAIChatGenerator(
        api_key=Secret.from_env_var("OPENAI_API_KEY"),
    ),
)
rag_pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
rag_pipeline.connect("retriever.documents", "prompt_builder.documents")
rag_pipeline.connect("prompt_builder.prompt", "generator.messages")

results = rag_pipeline.run(
    {
        "text_embedder": {"text": question},
        "retriever": {"query_text": question},
        "prompt_builder": {"query": question},
    }
)
print("RAG answer:", results["generator"]["replies"][0].text)
```

    RAG answer: Bob

## Conclusion

You have used Milvus native BM25 search, hybrid retrieval, and a custom analyzer in Haystack pipelines. For more integration options, refer to the [milvus-haystack repository](https://github.com/milvus-io/milvus-haystack).
