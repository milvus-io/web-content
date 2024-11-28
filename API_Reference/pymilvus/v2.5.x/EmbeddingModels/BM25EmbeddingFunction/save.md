# save()

This operation saves the BM25 model parameters to a JSON file at the given path.

## Request syntax

```python
save(path: str)
```

**PARAMETERS:**

- path (*string*)

    The path of the JSON file that stores the BM25 model parameters. The configurable parameters include:

    - **k1** (*float*) -

        The BM25 k1 parameter, a float defaulting to **1.5**. This controls document term normalization.

    - **b** (*float*) -

        The BM25 b parameter, a float defaulting to **0.75**. This controls field length normalization. 

    - **epsilon** (*float*)

        A float defaulting to **0.25**. This is used to smooth idf values.

    These parameters can be specified when initializing the BM25EmbeddingFunction class. For details, refer to [BM25EmbeddingFunction](BM25EmbeddingFunction.md).

**RETURN TYPE:**

*NoneType*

**RETURNS:**

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

