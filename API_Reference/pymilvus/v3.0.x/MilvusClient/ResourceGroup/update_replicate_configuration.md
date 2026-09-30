# update_replicate_configuration()

This operation updates replication configuration across Milvus clusters. This is used to set up cross-cluster data replication by defining cluster connections and replication topology.

## Request syntax

```python
client.update_replicate_configuration(
    clusters: List[dict] = None,
    cross_cluster_topology: List[dict] = None,
    timeout: float = None
)
```

**PARAMETERS:**

- **clusters** (*List[dict]* | *None*) -

    A list of cluster configurations. Each dict should contain `cluster_id` (str), `connection_param` (dict with `uri` and `token`), and optionally `pchannels` (List[str]).

- **cross_cluster_topology** (*List[dict]* | *None*) -

    A list of replication relationships. Each dict should contain `source_cluster_id` (str) and `target_cluster_id` (str).

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*Status*

**EXCEPTIONS:**

- **ParamError**

    This exception will be raised when neither `clusters` nor `cross_cluster_topology` is provided.

- **MilvusException**

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
