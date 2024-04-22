# load()

This operation loads BM25 model parameters from a JSON file.

## Request syntax

```python
load(
    path: Optional[str] = None
)
```

**PARAMETERS:**

- **path** (*string*)

    The file path to load the BM25 model parameters from. Defaults to **None**, where the code will use a default metadata filename and URL to load the default parameters. The default parameters are fitted on the [MS MARCO](https://microsoft.github.io/msmarco/) ranking dataset.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**Exceptions:**

- **OSError**

    This exception will be raised when the file cannot be opened, such as when the path is invalid or permissions do not allow opening the file.

## Examples

```python
from pymilvus.model.sparse.bm25.tokenizers import build_default_analyzer
from pymilvus.model.sparse import BM25EmbeddingFunction

# there are some built-in analyzers for several languages, now we use 'en' for English.
analyzer = build_default_analyzer(language="en")

bm25_ef = BM25EmbeddingFunction(analyzer)

# Save BM25 parameters to a file
bm25_ef.save("example.json")

# Build a new BM25EmbeddingFunction
new_bm25_ef = BM25EmbeddingFunction(analyzer)

# Load the saved parameters from the file
new_bm25_ef.load("example.json")
```
