# compact()

This operation starts a compaction job that merges small segments in a collection to improve storage layout and query efficiency.

## Request Syntax

```python
compact(
    collection_name: str,
    is_clustering: Optional[bool] = False,
    is_l0: Optional[bool] = False,
    target_size: Optional[int] = None,
    target_size_unit: str = "mb",
    timeout: Optional[float] = None,
    **kwargs,
) -> int
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    Name of the collection to compact.

- **is_clustering** (*bool*) -

    Whether to trigger clustering compaction.

- **is_l0** (*bool*) -

    Whether to trigger L0 compaction.

- **target_size** (*int*) -

    Optional target segment size after compaction. Must be a positive integer.

- **target_size_unit** (*str*) -

    Unit for `target_size`. Supported values are `"b"`, `"kb"`, `"mb"`, `"gb"`, `"tb"`, and `"pb"`.

- **timeout** (*float*) -

    Optional RPC timeout in seconds.

- **kwargs** (*dict*) -

    Optional request context parameters.

**RETURN TYPE:**

*int*

Compaction job ID for follow-up status queries.

**EXCEPTIONS:**

- **ParamError**

    Raised when `target_size` is not an integer or when `target_size_unit` is invalid.

- **MilvusException**

    Raised when the server rejects the request or the compaction RPC fails.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")
job_id = client.compact(
    collection_name="book_catalog",
    is_clustering=True,
    target_size=512,
    target_size_unit="mb",
)

print(job_id)
```
