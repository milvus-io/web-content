# set_properties()

This method modifies the current collection by setting its properties. Currently, you can only change the time-to-live (TTL) property of the collection by setting `collection.ttl.seconds`.

# Invocation

```Python
set_properties(properties, timeout=None)
```

# Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `properties`      | A dictionary comprising pairs of properties and values | Dictionary          | True     |
| `timeout`         | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs.                                 | Float         | False    |

# Returns

No returns

# Example

```Python
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
connections.connect()
fields = [
    FieldSchema("film_id", DataType.INT64, is_primary=True),
    FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=128)
]
schema = CollectionSchema(fields=fields)
collection.set_properties({"collection.ttl.seconds": 60})
```