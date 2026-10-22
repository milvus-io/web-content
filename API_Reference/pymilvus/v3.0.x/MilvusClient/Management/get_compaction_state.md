# get_compaction_state()

This operation returns the current state of a compaction job. Use this after calling `compact()` to verify that compaction has completed.

<div class="alert note">

This method was previously named `get_compact_state()`. The behavior is identical.

</div>

## Request syntax

```python
client.get_compaction_state(
    job_id: int,
    timeout: float = None
) -> str
```

**PARAMETERS:**

- **job_id** (*int*) -

    **[REQUIRED]**

    The ID of the compaction job returned by `compact()`.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*str*

**RETURNS:**

The state name of the compaction job. Possible values are `"UndefiedState"`, `"Executing"`, and `"Completed"`.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when the job ID is invalid or the server encounters an error.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

# Create a collection and insert some data
client.create_collection(collection_name="my_collection", dimension=4)
client.insert(collection_name="my_collection", data=[{"id": i, "vector": [0.1] * 4} for i in range(10)])

# Flush the data so that the inserted segments are sealed and become compactable
client.flush(collection_name="my_collection")

# Start compaction and check its state
job_id = client.compact(collection_name="my_collection")
state = client.get_compaction_state(job_id=job_id)
print(state)  # "Executing" or "Completed"
```

