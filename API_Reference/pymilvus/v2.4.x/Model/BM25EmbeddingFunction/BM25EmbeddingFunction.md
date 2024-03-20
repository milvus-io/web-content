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

__PARAMETERS:__

- __analyzer__ (_object_) -

    An Analyzer object used to tokenize texts. Defaults to a built-in English language analyzer if not specified. For more information, refer to 

- __corpus__ (_list_) -

    A list of strings representing the corpus of documents used to fit the model. 

- __k1__ (_float_) -

    The BM25 k1 parameter, a float defaulting to __1.5__. This controls document term normalization.

- __b__ (_float_) -

    The BM25 b parameter, a float defaulting to __0.75__. This controls field length normalization. 

- __epsilon__ (_float_) -

    A float defaulting to __0.25__. This is used to smooth idf values.

- __num_workers__ (_int_)

    The number of worker processes to use for parallelization. Defaults to the number of CPU cores if not specified.

## Examples

```python
__from__ pymilvus.model.sparse.bm25.tokenizers __import__ build_default_analyzer
__from__ pymilvus.model.sparse __import__ BM25EmbeddingFunction

_# there are some built-in analyzers for several languages, now we use 'en' for English._
analyzer __=__ build_default_analyzer(language__=__"en")

corpus = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

bm25_ef __=__ BM25EmbeddingFunction(analyzer)
```

