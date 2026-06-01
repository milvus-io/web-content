# compact()

- **kwargs** (*dict*) -

    Optional request context parameters.

- **ParamError**

    Raised when `target_size` is not an integer or when `target_size_unit` is invalid.

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

    The name of the target collection.

- **is_clustering** (*bool*) -

    Whether to perform a clustering compaction. Defaults to **False**.

- **is_l0** (*bool*) -

    Whether to perform an L0 compaction, which specifically handles L0 segments by merging delete operations into existing data segments. Defaults to **False**.

- **target_size** (*int*) -

    Target segment size after compaction. Must be a positive integer. The unit is specified by **target_size_unit** (default MB). If not provided, the server uses its default target size.

- **target_size_unit** (*str*) -

Unit for target_size. Supported values: "b", "kb", "mb" (default), "gb", "tb", "pb". The value is converted to MB before being sent to the server.

- **timeout** (*float*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*int*

Compaction job ID for follow-up status queries.

A compaction job ID, which can be used to get the compaction status.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

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
