# rename_collection()

This method renames a collection.

## Invocation

```python
rename_collection(old_collection_name, new_collection_name, timeout=None, using="default")
```

## Parameters

| Parameter             | Description                                    | Type  | Required |
| --------------------- | ---------------------------------------------- | ----- | -------- |
| `old_collection_name` | Name of the collection before being renamed    | str   | True     |
| `new_collection_name` | Name of the collection after being renamed     | str   | True     |
| `timeout`             | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client will continue to wait until the server responds or any error occurs.          | float | False    |
| `using`               | An alias of a connection to Milvus, and the value defaults to `default`. | str | False |

## Returns

A boolean value that indicates whether the operation succeeds.

## Example

```python
>>> from pymilvus import Collection, FieldSchema, CollectionSchema, DataType, connections, utility
>>> connections.connect(alias="default")
>>> schema = CollectionSchema(fields=[
...     FieldSchema("int64", DataType.INT64, description="int64", is_primary=True),
...     FieldSchema("float_vector", DataType.FLOAT_VECTOR, is_primary=False, dim=128),
... ])
>>> collection = Collection(name="old_collection", schema=schema)
>>> utility.rename_collection("old_collection", "new_collection")
>>> True
>>> utility.drop_collection("new_collection")
>>> utility.has_collection("new_collection")
>>> False
```