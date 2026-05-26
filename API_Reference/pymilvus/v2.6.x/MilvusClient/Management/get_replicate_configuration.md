# get_replicate_configuration()

This operation retrieves the current cross-cluster replication configuration from Milvus so you can inspect cluster topology, pchannel assignments, and failover state before orchestration changes.

## Request Syntax

```python
get_replicate_configuration(
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **timeout** (*float*) -

    Optional RPC timeout in seconds. If omitted, the client waits according to the default request timeout behavior.

- **kwargs** (*dict*) -

    Optional request context parameters, such as database routing context or request-scoped metadata.

**RETURN TYPE:**

*ReplicateConfiguration*

The current replication configuration, including configured clusters and cross-cluster topology relationships.

**EXCEPTIONS:**

- **MilvusException**

    Raised when the RPC fails or the server returns a non-success status.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")
config = client.get_replicate_configuration()

print(config)
```
