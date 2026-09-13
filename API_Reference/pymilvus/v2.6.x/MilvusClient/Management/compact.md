# compact()

This operation triggers a manual compaction to merge small segments in a collection and returns the compaction job ID.

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
The name of the collection to compact.

- **is_clustering** (*Optional[bool]*) -
Default: `False`
The flag that requests a clustering compaction.

- **is_l0** (*Optional[bool]*) -
Default: `False`
The flag that requests a level-zero compaction.

- **target_size** (*Optional[int]*) -
Default: `None`
The desired segment size after compaction. The value must be a positive integer; the server default is used when omitted.

- **target_size_unit** (*str*) -
Default: `"mb"`
The unit for `target_size`. Supported values are `b`, `kb`, `mb`, `gb`, `tb`, and `pb`; the default is `mb`.

- **timeout** (*Optional[float]*) -
Default: `None`
The maximum time, in seconds, to wait for the RPC. When omitted, the client waits until the server responds or an error occurs.

- **kwargs** (*Any*) -
The additional request context options.

**RETURN TYPE:**

*int*

**RETURNS:**

Compaction job identifier returned by Milvus.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

Demonstrates compact usage.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")
job_id = client.compact(collection_name="book_chunks", target_size=512, target_size_unit="mb")
print(job_id)
```
