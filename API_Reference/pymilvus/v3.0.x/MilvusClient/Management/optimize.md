# optimize()

This operation optimizes a collection to adjust segment sizes for better query performance.

<div class="alert warning">

This is a Preview version feature for non-production use only (Benchmark, POC).

</div>

This method performs the following operations:

1. Waits for all indexes to complete building.
2. Triggers a force merge compaction with the optional target size.
3. Waits for the compaction to complete.
4. Waits for the index rebuild to complete.
5. Refreshes the collection load if the collection is loaded.

## Request Syntax

```python
client.optimize(
    collection_name: str,
    target_size: Optional[str] = None,
    wait: bool = True,
    timeout: Optional[float] = None
) -> Union[OptimizeResult, OptimizeTask]
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection to optimize.

- **target_size** (*Optional[str]*) -

    Target segment size. Format: `"1000MB"`, `"1GB"`, `"1.2gb"`. If not provided, the system default is used.

- **wait** (*bool*) -

    Whether to wait for optimization to complete. Defaults to **True**. If **False**, returns an `OptimizeTask` for async tracking.

- **timeout** (*float*) -

    Maximum time in seconds to wait for optimization. Only applies when `wait=True`.

**RETURN TYPE:**
*OptimizeResult | OptimizeTask*

Returns an `OptimizeResult` when `wait=True`, or an `OptimizeTask` when `wait=False`.

**RETURNS:**

When `wait=True`, returns an **OptimizeResult** with the following members:

- **status** (*str*) -

    The status of the optimization, for example `"success"`.

- **collection_name** (*str*) -

    The name of the optimized collection.

- **compaction_id** (*int*) -

    The ID of the compaction triggered by the optimization.

- **target_size** (*str* | *None*) -

    The target segment size used for the optimization.

- **progress** (*list*) -

    The list of progress stages completed.

When `wait=False`, returns an **OptimizeTask** that supports `done()`, `progress()`, `result()`, and `cancel()`.

**EXCEPTIONS:**

- **ParamError**

    This exception will be raised when `collection_name` is invalid or `target_size` format is incorrect.

- **MilvusException**

    This exception will be raised when index build fails, compaction fails, or timeout occurs.

## Examples

```python
from pymilvus import MilvusClient
import time

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

# Wait for completion
result = client.optimize(
    collection_name="book",
    target_size="512MB",
    wait=True,
)
print(result)

# Run asynchronously
task = client.optimize(
    collection_name="book",
    target_size="1GB",
    wait=False,
)
while not task.done():
    print(f"Progress: {task.progress()}")
    time.sleep(1)
result = task.result()
print(result.status)
```
