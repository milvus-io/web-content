# flush()

This method seals all entities in the current collection. Any insertion after a flush operation results in generating new segments. Note that only sealed segments can be indexed.

## Invocation

```Python
flush(timeout=None)
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `timeout`         | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs.                                 | Float         | False    |

## Returns

No returns

## Example

```Python
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
connections.connect()
fields = [
    FieldSchema("film_id", DataType.INT64, is_primary=True),
    FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=128)
]
schema = CollectionSchema(fields=fields)
collection = Collection(name="test_collection_flush", schema=schema)
collection.insert([[1, 2], [[1.0, 2.0], [3.0, 4.0]]])
collection.flush()
collection.num_entities
# Prints the number of entities flushed: 2
```