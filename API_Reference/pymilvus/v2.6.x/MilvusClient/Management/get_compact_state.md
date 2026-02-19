# get_compact_state()

This operation returns the status of the specified compaction job.

<div class="admonition note">

<p><b>notes</b></p>

<p>This method is deprecated. For the latest equivalent, refer to <a href="./Management-get_compaction_state">get<em>compaction</em>state()</a>.</p>

</div>

## Request Syntax

```python
get_compaction_state(
    self,
    job_id: int,
    timeout: Optional[float] = None,
    **kwargs,
) -> str
```

**PARAMETERS:**

- **job_id** (*int*) -

    The compaction job ID.

- **timeout** (*Optional[float]*) - 

    The timeout duration for this operation.

    Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*str*

**RETURNS:**

The state of the specified compaction job. Possible values are

- `UndefinedState`

- `Executing`

- `Completed`

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

client.get_compact_state(
    job_id=45389273892800
)

# Completed
```

