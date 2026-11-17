# update_replicate_configuration()

This operation updates replication configuration across Milvus clusters. This is used to set up cross-cluster data replication by defining cluster connections and replication topology.

## Request Syntax

```python
client.update_replicate_configuration(
    clusters: List[dict],
    cross_cluster_topology: Optional[List[dict]] = None,
    force_promote: bool = False,
    timeout: Optional[float] = None
)
```

**PARAMETERS:**

- **clusters** (*List[dict]*) -

    **[REQUIRED]**

    A list of cluster configurations. Each dict should contain `cluster_id` (str), `connection_param` (dict with `uri` and `token`), and optionally `pchannels` (List[str]).

- **cross_cluster_topology** (*List[dict]* | *None*) -

    A list of replication relationships. Each dict should contain `source_cluster_id` (str) and `target_cluster_id` (str).

    The value defaults to **None**.

- **force_promote** (*bool*) -

    Whether to forcibly promote the replication configuration. Setting this to **True** forces the promotion even if the target cluster is not ready. The value defaults to **False**.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*Status*

**RETURNS:**

The status of the operation.

**EXCEPTIONS:**

- **ParamError**

    This exception will be raised when `clusters` is not provided.

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when the operation fails.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

client.update_replicate_configuration(
    clusters=[
        {
            "cluster_id": "source_cluster",
            "connection_param": {
                "uri": "http://source:19530",
                "token": "source_token"
            },
        },
        {
            "cluster_id": "target_cluster",
            "connection_param": {
                "uri": "http://target:19530",
                "token": "target_token"
            },
        }
    ],
    cross_cluster_topology=[
        {
            "source_cluster_id": "source_cluster",
            "target_cluster_id": "target_cluster"
        }
    ]
)
```
