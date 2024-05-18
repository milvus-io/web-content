---
id: rerankers-cross-encoder.md
order: 4
summary: Milvus supports Cross Encoder reranker models through the `CrossEncoderRerankFunction` class. This functionality allows you to score the relevance of query-document pairs effectively.
title: Cross Encoder
---

# Cross Encoder

Milvus supports [Cross-Encoders](https://github.com/FlagOpen/FlagEmbedding/tree/master/FlagEmbedding/reranker) through the `CrossEncoderRerankFunction` class. This functionality allows you to score the relevance of query-document pairs effectively.

To use this feature, install the necessary dependencies:

```bash
pip install --upgrade pymilvus
pip install "pymilvus[model]"
```

Then, instantiate the `CrossEncoderRerankFunction`:

```python
from pymilvus.model.reranker import CrossEncoderRerankFunction

# Define the rerank function
ce_rf = CrossEncoderRerankFunction(
    model_name="cross-encoder/ms-marco-MiniLM-L-6-v2",  # Specify the model name.
    device="cpu" # Specify the device to use, e.g., 'cpu' or 'cuda:0'
)
```

**Parameters**:

- `model_name` (*string*)

    The name of the model to use. You can specify any of the available Cross-Encoder model names, for example, `cross-encoder/ms-marco-TinyBERT-L-2-v2`, `cross-encoder/ms-marco-MiniLM-L-2-v2`, etc. If you leave this parameter unspecified, an empty string will be used. For a list of available models, refer to [Pretrained Cross-Encoders](https://www.sbert.net/docs/pretrained_cross-encoders.html#).

- `device` (*string*)

    The device to use for running the model. You can specify `cpu` for the CPU and `cuda:n` for the nth GPU device.

Then, use the following code to rerank documents based on the query:

```python
query = "What event in 1956 marked the official birth of artificial intelligence as a discipline?"

documents = [
    "In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.",
    "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.",
    "In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.",
    "The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems."
]

results = ce_rf(
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
Score: 6.250533
Text: The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.

Index: 0
Score: -2.954602
Text: In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.

Index: 3
Score: -4.771512
Text: The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.
```
