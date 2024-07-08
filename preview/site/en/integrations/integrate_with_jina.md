---
id: integrate_with_jina.md
summary: This guide demonstrates how to use Jina embeddings and Milvus to conduct similarity search and retrieval tasks.  
title: Integrate Milvus with Jina
---

# Integrate Milvus with Jina AI

<a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_with_Jina.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

This guide demonstrates how to use Jina AI embeddings and Milvus to conduct similarity search and retrieval tasks.

## Who is Jina AI
Jina AI, founded in 2020 in Berlin, is a pioneering AI company focused on revolutionizing the future of artificial intelligence through its search foundation. Specializing in multimodal AI, Jina AI aims to empower businesses and developers to harness the power of multimodal data for value creation and cost savings through its integrated suite of components, including embeddings, rerankers, prompt ops, and core infrastructure.
Jina AI's cutting-edge embeddings boast top-tier performance, featuring an 8192 token-length model ideal for comprehensive data representation. Offering multilingual support and seamless integration with leading platforms like OpenAI, these embeddings facilitate cross-lingual applications.

## Milvus and Jina AI's Embedding
In order to store and search these embeddings efficiently for speed and scale, specific infrastructure designed for this purpose is required. Milvus is a widely known advanced open-source vector database capable of handling large-scale vector data. Milvus enables fast and accurate vector(embedding) search according plenty of metrics. Its scalability allows for seamless handling of massive volumes of image data, ensuring high-performance search operations even as datasets grow.

## Examples
Jina embeddings have been integrated into the PyMilvus model library. Now, we will demonstrate code examples to show how to use Jina embeddings in action.

Before we start, we need to install model library for PyMilvus.


```python
$ pip install -U pymilvus
$ pip install "pymilvus[model]"
```

<div class="alert note">

If you are using Google Colab, to enable dependencies just installed, you may need to **restart the runtime**. (Click on the "Runtime" menu at the top of the screen, and select "Restart session" from the dropdown menu).

</div>

## General-Purpose Embedding
Jina AI's core embedding model, excels in understanding detailed text, making it ideal for semantic search, content classification thus supports advanced sentiment analysis, text summarization, and personalized recommendation systems.


```python
from pymilvus.model.dense import JinaEmbeddingFunction

jina_api_key = "<YOUR_JINA_API_KEY>"
ef = JinaEmbeddingFunction("jina-embeddings-v2-base-en", jina_api_key)

query = "what is information retrieval?"
doc = "Information retrieval is the process of finding relevant information from a large collection of data or documents."

qvecs = ef.encode_queries([query])
dvecs = ef.encode_documents([doc])
```

## Bilingual Embeddings
Jina AI's bilingual models enhance multilingual platforms, global support, and cross-lingual content discovery. Designed for German-English and Chinese-English translations, they foster understanding among diverse linguistic groups, simplifying interactions across languages.


```python
from pymilvus.model.dense import JinaEmbeddingFunction

jina_api_key = "<YOUR_JINA_API_KEY>"
ef = JinaEmbeddingFunction("jina-embeddings-v2-base-de", jina_api_key)

query = "what is information retrieval?"
doc = "Information Retrieval ist der Prozess, relevante Informationen aus einer großen Sammlung von Daten oder Dokumenten zu finden."

qvecs = ef.encode_queries([query])
dvecs = ef.encode_documents([doc])
```

## Code Embeddings
Jina AI's code embedding model provides searching ability through code and documentation. It supports English and 30 popular programming languages that can be used for enhancing code navigation, streamlined code review and automated documentation assistance.


```python
from pymilvus.model.dense import JinaEmbeddingFunction

jina_api_key = "<YOUR_JINA_API_KEY>"
ef = JinaEmbeddingFunction("jina-embeddings-v2-base-code", jina_api_key)

# Case1: Enhanced Code Navigation
# query: text description of the functionality
# document: relevant code snippet

query = "function to calculate average in Python."
doc = """
def calculate_average(numbers):
    total = sum(numbers)
    count = len(numbers)
    return total / count
"""

# Case2: Streamlined Code Review
# query: text description of the programming concept
# document: relevante code snippet or PR

query = "pull quest related to Collection"
doc = "fix:[restful v2] parameters of create collection ..."

# Case3: Automatic Documentation Assistance
# query: code snippet you need explanation
# document: relevante document or DocsString

query = "What is Collection in Milvus"
doc = """
In Milvus, you store your vector embeddings in collections. All vector embeddings within a collection share the same dimensionality and distance metric for measuring similarity.
Milvus collections support dynamic fields (i.e., fields not pre-defined in the schema) and automatic incrementation of primary keys.
"""

qvecs = ef.encode_queries([query])
dvecs = ef.encode_documents([doc])
```

## Semantic Search with Jina & Milvus
With the powerful vector embedding function, we can combine the embeddings retrieved by utilizing Jina AI models with Milvus Lite vector database to perform semantic search.


```python
from pymilvus.model.dense import JinaEmbeddingFunction
from pymilvus import MilvusClient

jina_api_key = "<YOUR_JINA_API_KEY>"
ef = JinaEmbeddingFunction("jina-embeddings-v2-base-en", jina_api_key)
DIMENSION = 768  # size of jina-embeddings-v2-base-en

doc = [
    "In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.",
    "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.",
    "In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.",
    "The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.",
]

dvecs = ef.encode_documents(doc)

data = [
    {"id": i, "vector": dvecs[i], "text": doc[i], "subject": "history"}
    for i in range(len(dvecs))
]

milvus_client = MilvusClient("./milvus_jina_demo.db")
COLLECTION_NAME = "demo_collection"  # Milvus collection name
if milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(collection_name=COLLECTION_NAME, dimension=DIMENSION)

res = milvus_client.insert(collection_name=COLLECTION_NAME, data=data)

print(res["insert_count"])
```

<div class="alert note">

As for the argument of `MilvusClient`:
- Setting the `uri` as a local file, e.g.`./milvus.db`, is the most convenient method, as it automatically utilizes [Milvus Lite](https://milvus.io/docs/milvus_lite.md) to store all data in this file.
- If you have large scale of data, you can set up a more performant Milvus server on [docker or kubernetes](https://milvus.io/docs/quickstart.md). In this setup, please use the server uri, e.g.`http://localhost:19530`, as your `uri`.
- If you want to use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the `uri` and `token`, which correspond to the [Public Endpoint and Api key](https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details) in Zilliz Cloud.

</div>

With all data in Milvus vector database, we can now perform semantic search by generating vector embedding for the query and conduct vector search.


```python
queries = "What event in 1956 marked the official birth of artificial intelligence as a discipline?"
qvecs = ef.encode_queries([queries])

res = milvus_client.search(
    collection_name=COLLECTION_NAME,  # target collection
    data=[qvecs[0]],  # query vectors
    limit=3,  # number of returned entities
    output_fields=["text", "subject"],  # specifies fields to be returned
)[0]

for result in res:
    print(result)
```

    {'id': 1, 'distance': 0.8802614808082581, 'entity': {'text': "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.", 'subject': 'history'}}


## Jina Reranker
Jina Ai also provides rerankers to further enhance retrieval quality after searching using embeddings.


```python
from pymilvus.model.reranker import JinaRerankFunction

jina_api_key = "<YOUR_JINA_API_KEY>"

rf = JinaRerankFunction("jina-reranker-v1-base-en", jina_api_key)

query = "What event in 1956 marked the official birth of artificial intelligence as a discipline?"

documents = [
    "In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.",
    "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.",
    "In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.",
    "The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.",
]

rf(query, documents)
```




    [RerankResult(text="The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.", score=0.9370958209037781, index=1),
     RerankResult(text='The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.', score=0.35420963168144226, index=3),
     RerankResult(text="In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.", score=0.3498658835887909, index=0),
     RerankResult(text='In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.', score=0.2728956639766693, index=2)]
