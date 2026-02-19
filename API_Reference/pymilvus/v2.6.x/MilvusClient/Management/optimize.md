# optimize()

This operation optimizes a collection by adjusting segment sizes to improve query performance. This method performs a sequence of operations: waiting for index building, triggering force-merge compaction, waiting for completion, rebuilding indexes, and refreshing the collection load.

<div class="admonition note">

<p><b>warning</b></p>

<p>This is a Preview version feature for non-production use only (Benchmark, POC).</p>

</div>

## Request syntax

```python
client.optimize(
    collection_name: str,
    target_size: str = None,
    wait: bool = True,
    timeout: float = None
) -> Union[OptimizeResult, OptimizeTask]
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection to optimize.

- **target_size** (*str* | *None*) -

    Target segment size. Format: `"1000MB"`, `"1GB"`, `"1.2gb"`. If not provided, uses the system default.

- **wait** (*bool*) -

    Whether to wait for optimization to complete. Defaults to **True**. If **False**, returns an `OptimizeTask` for async tracking.

- **timeout** (*float* | *None*) -

    Maximum time in seconds to wait for optimization. Only applies when `wait=True`.

**RETURN TYPE:**

*OptimizeResult* | *OptimizeTask*

**RETURNS:**

When `wait=True`, returns an **OptimizeResult** with status, collection_name, compaction_id, target_size, and progress. When `wait=False`, returns an **OptimizeTask** supporting `done()`, `progress()`, `result()`, and `cancel()`.

**EXCEPTIONS:**

- **ParamError**

    This exception will be raised when `collection_name` is invalid or `target_size` format is incorrect.

- **MilvusException**

    This exception will be raised when index build fails, compaction fails, or timeout occurs.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Synchronous optimization
result = client.optimize(
    collection_name="my_collection",
    target_size="512MB"
)

# Asynchronous optimization
task = client.optimize(
    collection_name="my_collection",
    target_size="512MB",
    wait=False
)
while not task.done():
    print(f"Progress: {task.progress()}")
    time.sleep(1)
result = task.result()
```
