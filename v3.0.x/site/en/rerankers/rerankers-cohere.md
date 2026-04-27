---
id: rerankers-cohere.md
order: 3
summary: Milvus supports Cohere reranker models through the `CohereRerankFunction` class. This functionality allows you to score the relevance of query-document pairs effectively.
title: Rerankers Cohere
---

# Cohere

Milvus supports [Cohere](https://docs.cohere.com/docs/rerank-2)[ reranker models](https://docs.cohere.com/docs/rerank-2) through the `CohereRerankFunction` class. This functionality allows you to score the relevance of query-document pairs effectively.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the `CohereRerankFunction`:

```python
from pymilvus.model.reranker import CohereRerankFunction

# Define the rerank function
cohere_rf = CohereRerankFunction(
    model_name="rerank-english-v3.0",  # Specify the model name. Defaults to `rerank-english-v2.0`.
    api_key=COHERE_API_KEY # Replace with your Cohere API key
)
```

**Parameters**

- `model_name` (*string*)

    The name of the model to use. You can specify any of the available Cohere reranker model names, for example, `rerank-english-v3.0`, `rerank-multilingual-v3.0`, etc. If you leave this parameter unspecified, `rerank-english-v2.0` will be used. For a list of available models, refer to [Rerank](https://docs.cohere.com/docs/rerank-2).

- `api_key` (*string*)

    The API key for accessing the Cohere API. For information on how to create an API key, refer to [Cohere dashboard](https://dashboard.cohere.com/api-keys).

Then, use the following code to rerank documents based on the query:

```python
query = "What event in 1956 marked the official birth of artificial intelligence as a discipline?"

documents = [
    "In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.",
    "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.",
    "In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.",
    "The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems."
]

results = cohere_rf(
    query=query,
    documents=documents,
    top_k=3,
)

for result in results:
    print(f"Index: {result.index}")
    print(f"Score: {result.score:.6f}")
    print(f"Text: {result.text}\n")
```

The expected output is similar to the following:

```python
Index: 1
Score: 0.99691266
Text: The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.

Index: 3
Score: 0.8578872
Text: The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.

Index: 0
Score: 0.3589146
Text: In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.
```
