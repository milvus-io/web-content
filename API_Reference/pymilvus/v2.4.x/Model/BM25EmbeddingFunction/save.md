# save()

This operation saves the BM25 model parameters to a JSON file at the given path.

## Request syntax

```python
save(path: str)
```

__PARAMETERS:__

- path (_string_)

    The path of the JSON file that stores the BM25 model parameters. The configurable parameters include:

    - __k1__ (_float_) -

        The BM25 k1 parameter, a float defaulting to __1.5__. This controls document term normalization.

    - __b__ (_float_) -

        The BM25 b parameter, a float defaulting to __0.75__. This controls field length normalization. 

    - __epsilon__ (_float_)

        A float defaulting to __0.25__. This is used to smooth idf values.

    These parameters can be specified when initializing the BM25EmbeddingFunction class. For details, refer to [BM25EmbeddingFunction](./BM25EmbeddingFunction.md).

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

## Examples

```python
from pymilvus.model.sparse.bm25.tokenizers import build_default_analyzer
from pymilvus.model.sparse import BM25EmbeddingFunction

# there are some built-in analyzers for several languages, now we use 'en' for English.
analyzer = build_default_analyzer(language="en")

bm25_ef = BM25EmbeddingFunction(analyzer)

# Save BM25 parameters to a file
bm25_ef.save("example.json")
```

