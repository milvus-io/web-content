# dump_messages()

Adds message dumping for data-salvage workflows. Async variant shares the sync method contract.

## Request Syntax

```python
def dump_messages( self, pchannel: str, start_message_id: Dict, start_timetick: int = 0, end_timetick: int = 0, timeout: Optional[float] = None, **kwargs, ):
```

**PARAMETERS:**

- **pchannel** (*str*) -
**[REQUIRED]**
The name of the physical channel from which to dump messages.

- **start_message_id** (*Dict*) -
**[REQUIRED]**
The starting write-ahead-log position, expressed as an object with `id` and `wal_name`. The `message_id` from `get_replicate_info()` can be passed directly.

- **start_timetick** (*int*) -
Default: `0`
The inclusive lower timetick bound. Use `0` to omit the lower bound.

- **end_timetick** (*int*) -
Default: `0`
The inclusive upper timetick bound. Use `0` to keep streaming until the RPC is cancelled.

- **timeout** (*Optional[float]*) -
Default: `None`
The maximum time, in seconds, allowed for the entire stream.

- **kwargs** (*Any*) -
The additional keyword arguments passed to the underlying client or request.

**RETURN TYPE:**

*Generator[dict, None, None]*

**RETURNS:**

Generator yielding dictionaries with message_id, payload, and properties for each WAL message.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

Demonstrates dump messages usage.

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")
for message in client.dump_messages(pchannel="by-dev-rootcoord-dml_0", start_message_id={"id": "message-id", "wal_name": "default"}, start_timetick=0, timeout=30):
    print(message)
```
