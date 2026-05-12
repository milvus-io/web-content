---
id: rerankers-overview.md
order: 1
summary: PyMilvus model library integrates rerank functions to optimize the order of results returned from initial searches.
title: Rerankers Overview
---

# Rerankers Overview

In the realm of information retrieval and generative AI, a reranker is an essential tool that optimizes the order of results from initial searches. Rerankers differ from traditional [embedding models](embeddings.md) by taking a query and document as input and directly returning a similarity score instead of embeddings. This score indicates the relevance between the input query and document.

Rerankers are often employed after the first stage retrieval, typically done via vector Approximate Nearest Neighbor (ANN) techniques. While ANN searches are efficient at fetching a broad set of potentially relevant results, they might not always prioritize results in terms of actual semantic closeness to the query. Here, rerankers is used to optimize the results order using deeper contextual analyses, often leveraging advanced machine learning models like BERT or other Transformer-based models. By doing this, rerankers can dramatically enhance the accuracy and relevance of the final results presented to the user.

PyMilvus model library integrates rerank functions to optimize the order of results returned from initial searches. After you retrieved nearest embedings from Milvus, you can leverage these reranking tools to refine search results to enhance the precision of search outcomes.

| Rerank Function | API or Open-sourced |
| --------------- | ------------------- |
| [BGE](https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/BGERerankFunction/BGERerankFunction.md)     | Open-sourced        |
| [Cross Encoder](https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/CrossEncoderRerankFunction/CrossEncoderRerankFunction.md)   | Open-sourced        |
| [Voyage](https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/VoyageRerankFunction/VoyageRerankFunction.md)        | API                 |
| [Cohere](https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/CohereRerankFunction/CohereRerankFunction.md)          | API                 |
| [Jina AI](https://milvus.io/api-reference/pymilvus/v2.4.x/Rerankers/JinaRerankFunction/JinaRerankFunction.md)          | API                 |

<div class="alert note">

- Before using open-source rerankers, make sure to download and install all required dependencies and models.

- For API-based rerankers, get an API key from the provider and set it in the appropriate environment variables or arguments.

</div>

## Example 1: Use BGE rerank function to rerank documents according to a query

In this example, we demonstrate how to rerank search results using the [BGE reranker](rerankers-bge.md) based on a specific query.

To use a reranker with [PyMilvus model](https://github.com/milvus-io/milvus-model) library, start by installing the PyMilvus model library along with the model subpackage that contains all necessary reranking utilities:

```bash
pip install pymilvus[model]
# or pip install "pymilvus[model]" for zsh.
```

To use the BGE reranker, first import the `BGERerankFunction` class:

```python
from pymilvus.model.reranker import BGERerankFunction
```

Then, create a `BGERerankFunction` instance for reranking:

```python
bge_rf = BGERerankFunction(
    model_name="BAAI/bge-reranker-v2-m3",  # Specify the model name. Defaults to `BAAI/bge-reranker-v2-m3`.
    device="cpu" # Specify the device to use, e.g., 'cpu' or 'cuda:0'
)
```

To rerank documents based on a query, use the following code:

```python
query = "What event in 1956 marked the official birth of artificial intelligence as a discipline?"

documents = [
    "In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.",
    "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.",
    "In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.",
    "The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems."
]

bge_rf(query, documents)
```

The expected output is similar to the following:

```python
[RerankResult(text="The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.", score=0.9911615761470803, index=1),
 RerankResult(text="In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.", score=0.0326971950177779, index=0),
 RerankResult(text='The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.', score=0.006514905766152258, index=3),
 RerankResult(text='In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.', score=0.0042116724917325935, index=2)]
```

## Example 2: Use a reranker to enhance relevance of search results

In this guide, we'll explore how to utilize the `search()` method in PyMilvus for conducting similarity searches, and how to enhance the relevance of the search results using a reranker. Our demonstration will use the following dataset:

```python
entities = [
    {'doc_id': 0, 'doc_vector': [-0.0372721,0.0101959,...,-0.114994], 'doc_text': "In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence."}, 
    {'doc_id': 1, 'doc_vector': [-0.00308882,-0.0219905,...,-0.00795811], 'doc_text': "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals."}, 
    {'doc_id': 2, 'doc_vector': [0.00945078,0.00397605,...,-0.0286199], 'doc_text': 'In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.'}, 
    {'doc_id': 3, 'doc_vector': [-0.0391119,-0.00880096,...,-0.0109257], 'doc_text': 'The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.'}
]
```

__Dataset components__:

- `doc_id`: Unique identifier for each document.
- `doc_vector`: Vector embeddings representing the document. For guidance on generating embeddings, refer to [Embeddings](embeddings.md).
- `doc_text`: Text content of the document.

### Preparations

Before initiating a similarity search, you need to establish a connection with Milvus, create a collection, and prepare and insert data into that collection. The following code snippet illustrates these preliminary steps.

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri="http://10.102.6.214:19530" # replace with your own Milvus server address
)

client.drop_collection('test_collection')

# define schema

schema = client.create_schema(auto_id=False, enabel_dynamic_field=True)

schema.add_field(field_name="doc_id", datatype=DataType.INT64, is_primary=True, description="document id")
schema.add_field(field_name="doc_vector", datatype=DataType.FLOAT_VECTOR, dim=384, description="document vector")
schema.add_field(field_name="doc_text", datatype=DataType.VARCHAR, max_length=65535, description="document text")

# define index params

index_params = client.prepare_index_params()

index_params.add_index(field_name="doc_vector", index_type="IVF_FLAT", metric_type="IP", params={"nlist": 128})

# create collection

client.create_collection(collection_name="test_collection", schema=schema, index_params=index_params)

# insert data into collection

client.insert(collection_name="test_collection", data=entities)

# Output:
# {'insert_count': 4, 'ids': [0, 1, 2, 3]}
```

### Conduct a similarity search

After data insertion, perform similarity searches using the `search` method.

```python
# search results based on our query

res = client.search(
    collection_name="test_collection",
    data=[[-0.045217834, 0.035171617, ..., -0.025117004]], # replace with your query vector
    limit=3,
    output_fields=["doc_id", "doc_text"]
)

for i in res[0]:
    print(f'distance: {i["distance"]}')
    print(f'doc_text: {i["entity"]["doc_text"]}')
```

The expected output is similar to the following:

```python
distance: 0.7235960960388184
doc_text: The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.
distance: 0.6269873976707458
doc_text: In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.
distance: 0.5340118408203125
doc_text: The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.
```

### Use a reranker to enhance search results

Then, improve the relevance of your search results with a reranking step. In this example, we use `CrossEncoderRerankFunction` built in PyMilvus to rerank the results for improved accuracy.

```python
# use reranker to rerank search results

from pymilvus.model.reranker import CrossEncoderRerankFunction

ce_rf = CrossEncoderRerankFunction(
    model_name="cross-encoder/ms-marco-MiniLM-L-6-v2",  # Specify the model name.
    device="cpu" # Specify the device to use, e.g., 'cpu' or 'cuda:0'
)

reranked_results = ce_rf(
    query='What event in 1956 marked the official birth of artificial intelligence as a discipline?',
    documents=[
        "In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.",
        "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.",
        "In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.",
        "The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems."
    ],
    top_k=3
)

# print the reranked results
for result in reranked_results:
    print(f'score: {result.score}')
    print(f'doc_text: {result.text}')
```

The expected output is similar to the following:

```python
score: 6.250532627105713
doc_text: The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.
score: -2.9546022415161133
doc_text: In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.
score: -4.771512031555176
doc_text: The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.
```
