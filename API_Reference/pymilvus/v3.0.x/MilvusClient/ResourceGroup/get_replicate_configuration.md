# get_replicate_configuration()

This operation retrieves the current cross-cluster replication topology and settings from Milvus.

## Request Syntax

```python
get_replicate_configuration(
    self,
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **timeout** (*Optional[float]*) -

    The timeout for this operation in seconds.

- **kwargs** (*dict*) -

    Additional request options passed to the underlying RPC.

**RETURN TYPE:**

*ReplicateConfiguration*

The current replication configuration, including cluster definitions and cross-cluster topology.

**EXCEPTIONS:**

- **MilvusException**

    Raised when replication metadata cannot be fetched or the request fails.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

config = client.get_replicate_configuration()
print(config)
```
