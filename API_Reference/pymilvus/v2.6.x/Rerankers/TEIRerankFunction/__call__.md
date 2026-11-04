# \_\_call\_\_()

This operation in [TEIRerankFunction](TEIRerankFunction.md) takes in a query and document strings and returns a list of `RerankResult` objects with the top k documents ranked by score.

## Request Syntax

```python
# Instance created
tei_rf = TEIRerankFunction()

# __call__ method will be called
tei_rf(
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

```python
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

    This exception will be raised when the response from the TEI service contains an error.

## Example

```python
from pymilvus.model.reranker import TEIRerankFunction

# Define the rerank function
tei_rf = TEIRerankFunction(
    api_url="http://localhost:8080", # Replace with the URL of your TEI reranking service
)

query = "What event in 1956 marked the official birth of artificial intelligence as a discipline?"

documents = [
    "In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.",
    "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.",
    "In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.",
    "The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems."
]

tei_rf(query, documents)
```
