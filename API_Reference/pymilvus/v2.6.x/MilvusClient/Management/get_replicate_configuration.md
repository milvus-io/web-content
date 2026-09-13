# get_replicate_configuration()

This operation returns the current replication configuration from Milvus.

## Request Syntax

```python
get_replicate_configuration(
    timeout: Optional[float] = None,
    **kwargs,
) -> ReplicateConfiguration
```

**PARAMETERS:**

- **timeout** (*Optional[float]*) -
Default: `None`
The maximum time, in seconds, to wait for the RPC.

- **kwargs** (*Any*) -
The additional request arguments.

**RETURN TYPE:**

*ReplicateConfiguration*

**RETURNS:**

Current replication configuration returned by Milvus.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

Demonstrates get replicate configuration usage.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")
config = client.get_replicate_configuration()
print(config)
```
