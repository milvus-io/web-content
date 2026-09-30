# dump_messages()

This operation dumps messages from a WAL range for data salvage using a server-streaming RPC. It is typically used after a force failover: call `get_replicate_info()` on the old primary to obtain the salvage checkpoint, then dump the messages that were not yet synchronized to the new primary.

## Request syntax

```python
client.dump_messages(
    pchannel: str,
    start_message_id: Dict,
    start_timetick: int = 0,
    end_timetick: int = 0,
    timeout: Optional[float] = None
) -> Generator[dict]
```

**PARAMETERS:**

- **pchannel** (*str*) -

    **[REQUIRED]**

    The physical channel name to dump from.

- **start_message_id** (*dict*) -

    **[REQUIRED]**

    The start position in the WAL. A dictionary with the keys **id** (*str*) and **wal_name** (*str*). This parameter accepts the value of `get_replicate_info()["salvage_checkpoint"]["message_id"]` directly.

- **start_timetick** (*int*) -

    Only dump messages with a timetick greater than or equal to this value. The value **0** means no lower bound.

- **end_timetick** (*int*) -

    Only dump messages with a timetick less than or equal to this value. The value **0** means no limit — the server keeps streaming until the RPC is cancelled; combined with no timeout, iteration blocks indefinitely.

- **timeout** (*Optional[float]*) -

    The timeout in seconds applied to the entire stream.

**RETURN TYPE:**

*Generator[dict]*

**RETURNS:**

A generator yielding one dictionary per message with the following members:

- **message_id** (*dict* | *None*) -

    The message position in the WAL, containing the keys **id** (*str*) and **wal_name** (*str*).

- **payload** (*bytes*) -

    The raw payload of the message.

- **properties** (*dict*) -

    The properties of the message.

**EXCEPTIONS:**

- **ParamError**

    Raised when **pchannel** or **start_message_id** is missing or invalid at call time.

- **MilvusException**

    This exception will be raised when the server reports an error during iteration.

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
ckpt = info["salvage_checkpoint"]

for msg in client.dump_messages(
    pchannel="by-dev-rootcoord-dml_0",
    start_message_id=ckpt["message_id"],
    start_timetick=ckpt["time_tick"],
    end_timetick=0,
):
    print(msg["message_id"], len(msg["payload"]))
```

## Related methods

- [get_replicate_info()](get_replicate_info.md)

- [update_replicate_configuration()](../ResourceGroup/update_replicate_configuration.md)
