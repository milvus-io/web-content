# get_replicate_info()

This operation retrieves the replication checkpoint state for a source cluster and source physical channel (pchannel). It is typically used to inspect the progress of cross-cluster replication and to obtain the salvage checkpoint before a force failover.

## Request syntax

```python
client.get_replicate_info(
    source_cluster_id: str,
    target_pchannel: str,
    timeout: Optional[float] = None
) -> dict
```

**PARAMETERS:**

- **source_cluster_id** (*str*) -

    **[REQUIRED]**

    The ID of the source cluster.

- **target_pchannel** (*str*) -

    **[REQUIRED]**

    The pchannel that belongs to the source cluster. The proto field naming is historical and misleading; the value expected here is the pchannel of the cluster specified by **source_cluster_id**.

- **timeout** (*Optional[float]*) -

    The RPC timeout in seconds.

**RETURN TYPE:**

*dict*

**RETURNS:**

A dictionary with the following members:

- **checkpoint** (*dict* | *None*) -

    The current replication position, or **None** when no checkpoint exists.

- **salvage_checkpoint** (*dict* | *None*) -

    The last-known position from a prior force promote, or **None** when no force promote occurred.

Each non-**None** checkpoint dictionary has the following keys:

- **cluster_id** (*str*) -

    The ID of the cluster.

- **pchannel** (*str*) -

    The physical channel name.

- **message_id** (*dict* | *None*) -

    The message position in the WAL. Contains the keys **id** (*str*) and **wal_name** (*str*).

- **time_tick** (*int*) -

    The time tick of the checkpoint.

**EXCEPTIONS:**

- **ParamError**

    Raised when **source_cluster_id** or **target_pchannel** is empty.

- **MilvusException**

    This exception will be raised when the RPC fails.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

info = client.get_replicate_info(
    source_cluster_id="primary",
    target_pchannel="by-dev-rootcoord-dml_0",
)
print(info["checkpoint"])
print(info["salvage_checkpoint"])
```

## Related methods

- [dump_messages()](dump_messages.md)

- [update_replicate_configuration()](../ResourceGroup/update_replicate_configuration.md)

- [get_replicate_configuration()](../ResourceGroup/get_replicate_configuration.md)
