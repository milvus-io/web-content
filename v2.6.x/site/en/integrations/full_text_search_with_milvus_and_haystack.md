---
id: full_text_search_with_milvus_and_haystack.md
summary: This tutorial demonstrates how to implement full-text and hybrid search in your application using Haystack and Milvus.
title: Full-text search with Milvus and Haystack
---

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_parent">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_blank">
    <img src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a>

# Full-text search with Milvus and Haystack


[Full-text search](https://milvus.io/docs/full-text-search.md#Full-Text-Search) is a traditional method for retrieving documents by matching specific keywords or phrases in the text. It ranks results based on relevance scores calculated from factors like term frequency. While semantic search is better at understanding meaning and context, full-text search excels at precise keyword matching, making it a useful complement to semantic search. The BM25 algorithm is widely used for ranking in full-text search and plays a key role in Retrieval-Augmented Generation (RAG).

[Milvus 2.5](https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md) introduces native full-text search capabilities using BM25. This approach converts text into sparse vectors that represent BM25 scores. You can simply input raw text and Milvus will automatically generate and store the sparse vectors, with no manual sparse embedding generation required.
 
[Haystack](https://haystack.deepset.ai/) now supports this Milvus feature, making it easy to add full-text search to RAG applications. You can combine full-text search with dense vector semantic search for a hybrid approach that benefits from both semantic understanding and keyword matching precision. This combination improves search accuracy and delivers better results to users.
 
This tutorial demonstrates how to implement full-text and hybrid search in your application using Haystack and Milvus.

To use the Milvus vector store, specify your Milvus server `URI` (and optionally with the `TOKEN`). To start a Milvus server, you can set up a Milvus server by following the [Milvus installation guide](https://milvus.io/docs/install-overview.md) or simply [trying Zilliz Cloud](https://docs.zilliz.com/docs/register-with-zilliz-cloud)(fully managed Milvus) for free.

<div class="alert note">

- Full-text search is currently available in Milvus Standalone, Milvus Distributed, and Zilliz Cloud, though not yet supported in Milvus Lite (which has this feature planned for future implementation). Reach out support@zilliz.com for more information.
- Before proceeding with this tutorial, ensure you have a basic understanding of [full-text search](https://milvus.io/docs/full-text-search.md#Full-Text-Search) and the [basic usage](https://github.com/milvus-io/milvus-haystack/blob/main/README.md) of Haystack Milvus integration.

</div>

## Prerequisites

Before running this notebook, make sure you have the following dependencies installed:


```shell
$ pip install --upgrade --quiet pymilvus milvus-haystack
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
from haystack import Pipeline
from haystack.components.embedders import OpenAIDocumentEmbedder, OpenAITextEmbedder
from haystack.components.writers import DocumentWriter
from haystack.utils import Secret
from milvus_haystack import MilvusDocumentStore, MilvusSparseEmbeddingRetriever
from haystack.document_stores.types import DuplicatePolicy
from milvus_haystack.function import BM25BuiltInFunction
from milvus_haystack import MilvusDocumentStore
from milvus_haystack.milvus_embedding_retriever import MilvusHybridRetriever

from haystack.utils import Secret
from haystack.components.builders import PromptBuilder
from haystack.components.generators import OpenAIGenerator
from haystack import Document

documents = [
    Document(content="Alice likes this apple", meta={"category": "fruit"}),
    Document(content="Bob likes swimming", meta={"category": "sport"}),
    Document(content="Charlie likes white dogs", meta={"category": "pets"}),
]
```

Integrating full-text search into a RAG system balances semantic search with precise and predictable keyword-based retrieval. You can also choose to only use full text search though it's recommended to combine full text search with semantic search for better search results. Here for demonstration purpose we will show full text search alone and hybrid search.

## BM25 search without embedding

### Create the indexing Pipeline

For full-text search Milvus MilvusDocumentStore accepts a `builtin_function` parameter. Through this parameter, you can pass in an instance of the `BM25BuiltInFunction`, which implements the BM25 algorithm on the Milvus server side. Set the `builtin_function` specified as the BM25 function instance. For example:


```python
connection_args = {"uri": "http://localhost:19530"}
# connection_args = {"uri": YOUR_ZILLIZ_CLOUD_URI, "token": Secret.from_env_var("ZILLIZ_CLOUD_API_KEY")}

document_store = MilvusDocumentStore(
    connection_args=connection_args,
    sparse_vector_field="sparse_vector",  # The sparse vector field.
    text_field="text",
    builtin_function=[
        BM25BuiltInFunction(  # The BM25 function converts the text into a sparse vector.
            input_field_names="text",
            output_field_names="sparse_vector",
        )
    ],
    consistency_level="Strong",  # Supported values are (`"Strong"`, `"Session"`, `"Bounded"`, `"Eventually"`).
    drop_old=True,  # Drop the old collection if it exists and recreate it.
)
```

For the connection_args:

- You can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server address, e.g.`http://localhost:19530`, as your `uri`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.


Build an indexing pipeline to write documents into the Milvus document store.


```python
writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component("writer", writer)
indexing_pipeline.run({"writer": {"documents": documents}})
```




    {'writer': {'documents_written': 3}}



### Create the retrieval pipeline

Create a retrieval pipeline that retrieves documents from the Milvus document store using `MilvusSparseEmbeddingRetriever`, which is a wrapper around `document_store`.


```python
retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(
    "retriever", MilvusSparseEmbeddingRetriever(document_store=document_store)
)

question = "Who likes swimming?"

retrieval_results = retrieval_pipeline.run({"retriever": {"query_text": question}})

retrieval_results["retriever"]["documents"][0]
```




    Document(id=bd334348dd2087c785e99b5a0009f33d9b8b8198736f6415df5d92602d81fd3e, content: 'Bob likes swimming', meta: {'category': 'sport'}, score: 1.2039074897766113)



## Hybrid Search with semantic search and full-text search

### Create the indexing Pipeline

In the hybrid search, we use the BM25 function to perform full-text search, and specify the dense vector field `vector`, to perform semantic search.


```python
document_store = MilvusDocumentStore(
    connection_args=connection_args,
    vector_field="vector",  # The dense vector field.
    sparse_vector_field="sparse_vector",  # The sparse vector field.
    text_field="text",
    builtin_function=[
        BM25BuiltInFunction(  # The BM25 function converts the text into a sparse vector.
            input_field_names="text",
            output_field_names="sparse_vector",
        )
    ],
    consistency_level="Strong",  # Supported values are (`"Strong"`, `"Session"`, `"Bounded"`, `"Eventually"`).
    drop_old=True,  # Drop the old collection and recreate it.
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

    Calculating embeddings: 100%|██████████| 1/1 [00:01<00:00,  1.15s/it]


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

retrieval_pipeline.connect("dense_text_embedder.embedding", "retriever.query_embedding")
```




    <haystack.core.pipeline.pipeline.Pipeline object at 0x3383ad990>
    🚅 Components
      - dense_text_embedder: OpenAITextEmbedder
      - retriever: MilvusHybridRetriever
    🛤️ Connections
      - dense_text_embedder.embedding -> retriever.query_embedding (List[float])



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

retrieval_results["retriever"]["documents"][0]
```




    Document(id=bd334348dd2087c785e99b5a0009f33d9b8b8198736f6415df5d92602d81fd3e, content: 'Bob likes swimming', meta: {'category': 'sport'}, score: 0.032786883413791656, embedding: vector of size 1536)



## Customize analyzer

Analyzers are essential in full-text search by breaking the sentence into tokens and performing lexical analysis like stemming and stop word removal. Analyzers are usually language-specific. You can refer to [this guide](https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview) to learn more about analyzers in Milvus.

Milvus supports two types of analyzers: **Built-in Analyzers** and **Custom Analyzers**. By default, the `BM25BuiltInFunction` will use the [standard built-in analyzer](https://milvus.io/docs/standard-analyzer.md), which is the most basic analyzer that tokenizes the text with punctuation. 

If you want to use a different analyzer or customize the analyzer, you can pass in the `analyzer_params` parameter in the `BM25BuiltInFunction` initialization.


```python
analyzer_params_custom = {
    "tokenizer": "standard",
    "filter": [
        "lowercase",  # Built-in filter
        {"type": "length", "max": 40},  # Custom filter
        {"type": "stop", "stop_words": ["of", "to"]},  # Custom filter
    ],
}

document_store = MilvusDocumentStore(
    connection_args=connection_args,
    vector_field="vector",
    sparse_vector_field="sparse_vector",
    text_field="text",
    builtin_function=[
        BM25BuiltInFunction(
            input_field_names="text",
            output_field_names="sparse_vector",
            analyzer_params=analyzer_params_custom,  # Custom analyzer parameters.
            enable_match=True,  # Whether to enable match.
        )
    ],
    consistency_level="Strong",
    drop_old=True,
)

# write documents to the document store
writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)
indexing_pipeline = Pipeline()
indexing_pipeline.add_component("dense_doc_embedder", OpenAIDocumentEmbedder())
indexing_pipeline.add_component("writer", writer)
indexing_pipeline.connect("dense_doc_embedder", "writer")
indexing_pipeline.run({"dense_doc_embedder": {"documents": documents}})
```

    Calculating embeddings: 100%|██████████| 1/1 [00:00<00:00,  1.39it/s]





    {'dense_doc_embedder': {'meta': {'model': 'text-embedding-ada-002-v2',
       'usage': {'prompt_tokens': 11, 'total_tokens': 11}}},
     'writer': {'documents_written': 3}}



We can take a look at the schema of the Milvus collection and make sure the customized analyzer is set up correctly.


```python
document_store.col.schema
```




    {'auto_id': False, 'description': '', 'fields': [{'name': 'text', 'description': '', 'type': <DataType.VARCHAR: 21>, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase', {'type': 'length', 'max': 40}, {'type': 'stop', 'stop_words': ['of', 'to']}]}}}, {'name': 'id', 'description': '', 'type': <DataType.VARCHAR: 21>, 'params': {'max_length': 65535}, 'is_primary': True, 'auto_id': False}, {'name': 'vector', 'description': '', 'type': <DataType.FLOAT_VECTOR: 101>, 'params': {'dim': 1536}}, {'name': 'sparse_vector', 'description': '', 'type': <DataType.SPARSE_FLOAT_VECTOR: 104>, 'is_function_output': True}], 'enable_dynamic_field': True, 'functions': [{'name': 'bm25_function_7b6e15a4', 'description': '', 'type': <FunctionType.BM25: 1>, 'input_field_names': ['text'], 'output_field_names': ['sparse_vector'], 'params': {}}]}



For more concept details, e.g., `analyzer`, `tokenizer`, `filter`, `enable_match`, `analyzer_params`, please refer to the [analyzer documentation](https://milvus.io/docs/analyzer-overview.md).

## Using Hybrid Search in RAG pipeline
We have learned how to use the basic BM25 build-in function in Haystack and Milvus and prepared a loaded `document_store`. Let's introduce an optimized RAG implementation with hybrid search.


![](https://github.com/milvus-io/bootcamp/blob/master/images/advanced_rag/hybrid_and_rerank.png?raw=1)

This diagram shows the Hybrid Retrieve & Reranking process, combining BM25 for keyword matching and dense vector search for semantic retrieval. Results from both methods are merged, reranked, and passed to an LLM to generate the final answer.

Hybrid search balances precision and semantic understanding, improving accuracy and robustness for diverse queries. It retrieves candidates with BM25 full-text search and vector search, ensuring both semantic, context-aware, and accurate retrieval.

Let's try an optimized RAG implementation with hybrid search.



```python
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
    "retriever", MilvusHybridRetriever(document_store=document_store, top_k=1)
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
        "retriever": {"query_text": question},
        "prompt_builder": {"query": question},
    }
)
print("RAG answer:", results["generator"]["replies"][0])
```

    RAG answer: Bob likes swimming.


For more information about how to use milvus-haystack, please refer to the [milvus-haystack offical repository](https://github.com/milvus-io/milvus-haystack).