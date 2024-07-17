# BM25EmbeddingFunction

BM25EmbeddingFunction is a class in pymilvus that handles encoding text into embeddings using the BM25 model to support embedding retrieval in Milvus.

```python
pymilvus.model.sparse.bm25.BM25EmbeddingFunction
```

## Constructor

Constructs a BM25EmbeddingFunction for common use cases.

```python
BM25EmbeddingFunction(
    analyzer: Analyzer = None,
    corpus: Optional[List] = None,
    k1: float = 1.5,
    b: float = 0.75,
    epsilon: float = 0.25,
    num_workers: Optional[int] = None,
)
```

**PARAMETERS:**

- **analyzer** (*object*) -

    An Analyzer object used to tokenize texts. Defaults to a built-in English language analyzer if not specified. For more information, refer to 

- **corpus** (*list*) -

    A list of strings representing the corpus of documents used to fit the model. 

- **k1** (*float*) -

    The BM25 k1 parameter, a float defaulting to **1.5**. This controls document term normalization.

- **b** (*float*) -

    The BM25 b parameter, a float defaulting to **0.75**. This controls field length normalization. 

- **epsilon** (*float*) -

    A float defaulting to **0.25**. This is used to smooth idf values.

- **num_workers** (*int*)

    The number of worker processes to use for parallelization. Defaults to the number of CPU cores if not specified.

## Examples

```python
from pymilvus.model.sparse.bm25.tokenizers import build_default_analyzer
from pymilvus.model.sparse import BM25EmbeddingFunction

# there are some built-in analyzers for several languages, now we use 'en' for English.
analyzer = build_default_analyzer(language="en")

corpus = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

bm25_ef = BM25EmbeddingFunction(analyzer)
```
