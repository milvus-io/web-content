# compact()

This operation compacts the collection by merging small segments into larger ones. It is recommended to call this operation after inserting a large amount of data into a collection.

## Request Syntax

```python
compact(
    collection_name: str,
    is_clustering: Optional[bool] = False,
    is_l0: Optional[bool] = False,
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

- **timeout** (*Optional[float]*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*int*

**RETURNS:**

A compaction job ID, which can be used to get the compaction status.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Standard compaction
job_id = client.compact(
    collection_name="my_collection"
)

# Clustering compaction
job_id = client.compact(
    collection_name="my_collection",
    is_clustering=True
)

# L0 compaction
job_id = client.compact(
    collection_name="my_collection",
    is_l0=True
)

# Check compaction status
state = client.get_compaction_state(job_id)
print(state)
```
