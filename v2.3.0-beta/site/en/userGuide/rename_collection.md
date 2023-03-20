---
id: rename_collection.md
related_key: rename collection
summary: Learn how to rename a collection from memory in Milvus.
---

# Rename a Collection

If you want to rename a collection, you can use the collection-renaming API to interact with Milvus. This guide helps you understand how to rename an existing collection using the SDK of your choice.

In the following code snippet, we create a collection and name it `old_collection`. Then we rename it `new_collection`.

```python
from pymilvus import Collection, FieldSchema, CollectionSchema, DataType, connections, utility
connections.connect(alias="default")
schema = CollectionSchema(fields=[
...     FieldSchema("int64", DataType.INT64, description="int64", is_primary=True),
...     FieldSchema("float_vector", DataType.FLOAT_VECTOR, is_primary=False, dim=128),
... ])
collection = Collection(name="old_collection", schema=schema)
utility.rename_collection("old_collection", "new_collection") # Output: True
utility.drop_collection("new_collection")
utility.has_collection("new_collection") # Output: False
```

For code examples in the flavor of other programming languages, keep watching.

## What's next

- [Insert data into Milvus](insert_data.md)
- [Create a partition](create_partition.md)
- [Build an index for vectors](build_index.md)
- [Conduct a vector search](search.md)
- [Conduct a hybrid search](hybridsearch.md)

