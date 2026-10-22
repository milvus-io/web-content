# get_compaction_plans()

This operation returns the compaction plans for a specific compaction job, including the merge plans showing which segments will be combined.

## Request syntax

```python
client.get_compaction_plans(
    job_id: int,
    timeout: float = None
) -> CompactionPlans
```

**PARAMETERS:**

- **job_id** (*int*) -

    **[REQUIRED]**

    The ID of the compaction job returned by `compact()`.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*CompactionPlans*

**RETURNS:**

A `CompactionPlans` object with the following members:

- **compaction_id** (*int*) -

    The ID of the compaction job.

- **state** (*State*) -

    The overall state of the compaction job. Possible values are **UndefiedState**, **Executing**, and **Completed**.

- **plans** (*List[Plan]*) -

    The merge plans of the compaction job. Each `Plan` object has the following members:

    - **sources** (*list*) -

        The IDs of the source segments to merge.

    - **target** (*int*) -

        The ID of the target segment.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Create a collection and insert some data
client.create_collection(collection_name="my_collection", dimension=5)
client.insert(collection_name="my_collection", data=[{"id": i, "vector": [0.1] * 5} for i in range(10)])

# Flush the data so that the inserted segments are sealed and become compactable
client.flush(collection_name="my_collection")

job_id = client.compact(collection_name="my_collection")
plans = client.get_compaction_plans(job_id=job_id)
print(plans)
```
