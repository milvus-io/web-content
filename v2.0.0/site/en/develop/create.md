---
id: create.md
title: Create
---

# Create a collection
Collections can only be created after successfully connecting to the Milvus server.

<div class="alert note">
The created collection must contain a primary key field. Int64 is the only supported data type for the primary key field for now.
</div>


1. Prepare collection parameters, including collection name and field parameters. See [API document](https://pymilvus-orm.readthedocs.io/en/latest/) for a detailed description of these parameters.

```
>>> collection_name = "example_collection"
>>> field_name = "example_field"
>>> from pymilvus_orm import Collection, CollectionSchema, FieldSchema, DataType
>>> pk = FieldSchema(name="pk", dtype=DataType.INT64, is_primary=True, auto_id=True)
>>> field = FieldSchema(name=field_name, dtype=DataType.FLOAT_VECTOR, dim=8)
>>> schema = CollectionSchema(fields=[pk,field], description="example collection")
```

2. Call `create_collection()` provided by the Milvus instance to create a collection:

```
>>> collection = Collection(name=collection_name, schema=schema)
```

3. Check if the collection is created successfully:

```
>>> import pymilvus_orm
>>> pymilvus_orm.utility.get_connection().has_collection(collection_name)
True
```

4. List all created collections:

```
>>> pymilvus_orm.utility.get_connection().list_collections()
['example_collection']
```

5. View collection statistics, such as row count:

```
>>> collection.num_entities
0
```

# Create a partition (optional)
Search performance worsens as more vectors are inserted into the collection. To help mitigate declining search performance, consider creating collection partitions. Partitioning is a way to separate data. Partition names narrow a search to a specific number of vectors, improving query performance. To improve search efficiency, divide a collection into several partitions by name.

```
>>> partition_name = "example_partition"
>>> partition = collection.create_partition(partition_name)
```

Milvus creates a default partition name, `_default`, for new collections. After creating a partition, you have two partition names, `example_partition` and `_default`. Call `list_partitons()` to list all partitions in a collection.

```
>>> collection.partitions
[{"name": "_default", "description": "", "num_entities": 0}, {"name": "example_partition", "description": "", "num_entities": 0}]
```

Call `has_partition()` to check if a partition is successfully created.

```
>>> collection.has_partition(partition_name)
True
```
