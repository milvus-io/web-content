---
id: delete.md
title: Delete
---

# Delete operations
The delete operations affect data already inserted into Milvus. Think twice before you delete.

> The function of deleting specified vectors by ID is currently unavailable.

## Drop an index
Drop the index of a specified field in a specified collection.
```
>>> collection.drop_index()
```

## Drop a partition
The `drop_partition()` method removes a partition and all vectors under it.

```
>>> collection.drop_partition(partition_name=partition_name)
```

## Drop a collection
When you no longer need a collection, you can call `drop_collection()` to delete it.
```
>>> collection.drop()
```
