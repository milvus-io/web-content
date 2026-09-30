# get_replicate_info()

Returns the current and salvage replication checkpoints for a source cluster and physical channel.

## Request Syntax

```python
get_replicate_info(
    source_cluster_id: str,
    target_pchannel: str,
    timeout: Optional[float] = None,
    **kwargs
) -> dict
```

**PARAMETERS:**

- **source_cluster_id** (*str*) -
**[REQUIRED]**
ID of the source cluster.

- **target_pchannel** (*str*) -
**[REQUIRED]**
Name of the physical channel in the source cluster. The `target_pchannel` name is retained for protocol compatibility.

- **timeout** (*Optional[float]*) -
Default: `None`
Maximum time, in seconds, to wait for the RPC to complete.

- **kwargs** (*Any*) -
Additional request context options.

**RETURN TYPE:**

*dict*

**RETURNS:**

Dictionary containing `checkpoint` and `salvage_checkpoint` entries. Each checkpoint includes `cluster_id`, `pchannel`, `message_id`, and `time_tick` information when available.

**EXCEPTIONS:**

- **ParamError**
Raised when `source_cluster_id` or `target_pchannel` is empty. Provide both source identifiers.

- **MilvusException**
Raised when the RPC fails. Inspect the server error message for exact failure details.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")
info = client.get_replicate_info(
    source_cluster_id="source-cluster",
    target_pchannel="by-dev-rootcoord-dml_0",
)
print(info)
# {
#     "checkpoint": {
#         "cluster_id": "source-cluster",
#         "pchannel": "by-dev-rootcoord-dml_0",
#         "message_id": {"id": "msg-x", "wal_name": "Pulsar"},
#         "time_tick": 200,
#     },
#     "salvage_checkpoint": None,
# }
```
