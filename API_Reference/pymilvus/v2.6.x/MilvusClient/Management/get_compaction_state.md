# get_compaction_state()

This operation returns the current state of a compaction job. Use this after calling `compact()` to verify that compaction has completed.

<div class="admonition note">

<p><b>notes</b></p>

<p>This method was previously named <code>get_compact_state()</code>. The behavior is identical.</p>

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

- **MilvusException**

    This exception will be raised when the job ID is invalid or the server encounters an error.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

# Start compaction and check its state
job_id = client.compact(collection_name="my_collection")
state = client.get_compaction_state(job_id=job_id)
print(state)  # "Executing" or "Completed"
```

