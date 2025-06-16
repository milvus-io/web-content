# \_\_call\_\_()

This operation in [JinaRerankFunction](JinaRerankFunction.md) takes in a query and document strings and returns a list of `RerankResult` objects with the top k documents ranked by score.

## Request syntax

```python
# Instance created
jina_rf = JinaRerankFunction()

# __call__ method will be called
jina_rf(
    query: str,
    documents: List[str],
    top_k: int = 5
) -> List[RerankResult]
```

**PARAMETERS:**

- `query` (*string*)

    The query string to use for ranking.

- `documents` (*List[str]*)

    A list of document strings that will be ranked for the given query.

- `top_k` (*int*)

    The maximum number of top ranked documents to return. Defaults to **5**.

**RETURN TYPE:**

*List[RerankResult]*

**RETURNS:**

A list of `RerankResult` objects.

```plaintext
├── RerankResult
|    └── text
|    └── score
|    └── index
```

Each `RerankResult` object contains:

- `text`: The matched document text.

- `score`: The score assigned to that document by the reranking model.

- `index`: The index of the document in the original documents list.

**EXCEPTIONS:**

- **RuntimeError**

    This exception will be raised when the response from the Jina API does not contain the `results` key.

## Examples

```python
from pymilvus.model.reranker import JinaRerankFunction

jina_rf = JinaRerankFunction(
    model_name="jina-reranker-v1-base-en", # Defaults to `jina-reranker-v1-base-en`
    api_key="YOUR_JINAAI_API_KEY"
)

query = "What event in 1956 marked the official birth of artificial intelligence as a discipline?"

documents = [
    "In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.",
    "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.",
    "In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.",
    "The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems."
]

jina_rf(query, documents)

# [RerankResult(text="The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.", score=0.9370958209037781, index=1),
#  RerankResult(text='The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.', score=0.35420963168144226, index=3),
#  RerankResult(text="In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.", score=0.3498658835887909, index=0),
#  RerankResult(text='In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.', score=0.2728956639766693, index=2)]
```
