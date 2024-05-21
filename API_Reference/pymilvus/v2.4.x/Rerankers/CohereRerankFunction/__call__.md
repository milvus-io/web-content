# \_\_call\_\_()

This operation in [CohereRerankFunction](CohereRerankFunction.md) takes in a query and document strings and returns a list of `RerankResult` objects with the top k documents ranked by score.

## Request syntax

```python
# Instance created
cohere_rf = CohereRerankFunction()

# __call__ method will be called
cohere_rf(
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

- **ImportError**

    This exception will be raised when the Cohere module is not installed.

## Examples

```python
from pymilvus.model.reranker import CohereRerankFunction

# Define the rerank function
cohere_rf = CohereRerankFunction(
    model_name="rerank-english-v3.0",  # Specify the model name. Defaults to `rerank-english-v2.0`.
    api_key=COHERE_API_KEY # Replace with your Cohere API key
)

query = "What event in 1956 marked the official birth of artificial intelligence as a discipline?"

documents = [
    "In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.",
    "The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.",
    "In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.",
    "The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems."
]

cohere_rf(query, documents)

# [RerankResult(text="The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.", score=0.99691266, index=1),
#  RerankResult(text="The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.", score=0.8578872, index=3),
#  RerankResult(text='The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.', score=0.006514905766152258, index=3),
#  RerankResult(text='In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.', score=0.3589146, index=0)]
```
