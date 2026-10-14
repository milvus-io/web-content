# get_flush_all_state()

This operation returns whether a flush-all operation has completed. Use this after calling `flush_all()` to check the flush status.

## Request syntax

```python
client.get_flush_all_state(
    flush_all_ts: int,
    timeout: float = None
) -> bool
```

**PARAMETERS:**

- **flush_all_ts** (*int*) -

    **[REQUIRED]**

    The timestamp returned by the flush-all operation that identifies the target flush-all round.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*bool*

**RETURNS:**

**True** if the flush-all operation is completed, **False** otherwise.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

client.flush_all()

# Check if flush completed
is_done = client.get_flush_all_state(flush_all_ts=0)
print(is_done)  # True or False
```
