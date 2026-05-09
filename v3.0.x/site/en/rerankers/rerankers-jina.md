---
id: rerankers-jina.md
order: 6
summary: Milvus supports Jina reranker model through the `JinaRerankFunction` class. This functionality allows you to score the relevance of query-document pairs effectively.
title: Jina AI - Rerankers
---

# Jina AI

Milvus supports [Jina AI reranker models](https://jina.ai/reranker/) through the JinaRerankFunction class. This functionality allows you to score the relevance of query-document pairs effectively.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the `JinaRerankFunction`:

```python
from pymilvus.model.reranker import JinaRerankFunction

jina_rf = JinaRerankFunction(
    model_name="jina-reranker-v2-base-multilingual", # Defaults to `jina-reranker-v2-base-multilingual`
    api_key=JINAAI_API_KEY
)
```

**Parameters**:

- `model_name` (*string*)

    The name of the Jina AI reranker model to use for encoding. If you leave this parameter unspecified, `jina-reranker-v2-base-multilingual` will be used. For a list of available models, refer to [Jina AI Rerankers](https://jina.ai/reranker/#apiform).

- `api_key` (*string*)

    The API key for accessing the Jina AI API.

Then, use the following code to rerank documents based on the query:

```python
query = "What event in 1956 marked the official birth of artificial intelligence as a discipline?"

documents = [
    "In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.",
    "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.",
    "In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.",
    "The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems."
]

results = jina_rf(
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
Score: 0.937096
Text: The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.

Index: 3
Score: 0.354210
Text: The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.

Index: 0
Score: 0.349866
Text: In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.
```
