# fit()

This operation fits various statistics that are required to calculate BM25 ranking score using the corpus given.

## Request syntax

```python
fit(
    corpus: List[str], 
)
```

**PARAMETERS:**

- **corpus** (*string*)

    A list of strings that represent the documents used to fit the model

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

## Examples

```python
from pymilvus.pymilvus.model.sparse.bm25.tokenizers import build_default_analyzer
from pymilvus.pymilvus.model.sparse import BM25EmbeddingFunction

# there are some built-in analyzers for several languages, now we use 'en' for English.
analyzer = build_default_analyzer(language="en")

corpus = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

bm25_ef = BM25EmbeddingFunction(analyzer)

# Fit the model on the corpus to get the statstics of the corpus.
bm25_ef.fit(corpus)
```
