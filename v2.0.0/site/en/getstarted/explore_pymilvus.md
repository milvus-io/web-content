---
id: explore_pymilvus.md
title: Explore PyMilvus
---

# Basic Milvus Operations

This section covers fundamentals and basic Milvus operations in Python interactive mode.

Type `python3` in your terminal to enter Python interactive mode. Here we take Python 3.9.1 as an example:

```
➜  ~ python3
Python 3.9.1 (default, Feb  3 2021, 07:38:02)
[Clang 12.0.0 (clang-1200.0.32.29)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

## Connect to the Milvus server

```
>>> from pymilvus_orm import connections
>>> connections.connect("default", host='localhost', port='19530')
```

## Create a collection
Collections can only be created after successfully connecting to the Milvus server.

> The created collection must contain a primary key field. Int64 is the only supported data type for the primary key field for now.

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

## Create a partition (optional)
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

## Insert vectors
You can insert vectors to a specified partition within a specific collection.

1. Generate random vectors:

```
>>> import random
>>> vectors = [[random.random() for _ in range(8)] for _ in range(10)]
>>> entities = [vectors]
```

2. Insert the random vectors to the newly created collection. Milvus automatically assigns IDs to the inserted vectors, similar to AutoID in a relational database.

*Milvus returns the value of MutationResult, which contains the corresponding primary_keys of the inserted vectors.*

```
>>> mr = collection.insert(entities)
<pymilvus_orm.search.MutationResult object at 0x7fcfe8255550>
>>> mr.primary_keys
[425790736918318406, 425790736918318407, 425790736918318408, ...]
```

3. By specifying `partition_name` when calling `insert()`, you can insert vectors to a specified partition:

```
>>> collection.insert(data=entities, partition_name=partition_name)
```

4. Milvus temporarily stores the inserted vectors in the memory. Call `flush()` to flush them to the disk.

```
>>> pymilvus_orm.utility.get_connection().flush([collection_name])
```

## Build an index
Create an index for a specified field in a collection to accelerate vector similarity search. See [Vector Index] (index.md) for more information about setting index parameters.

1. Prepare the index parameters:
```
>>> index_param = {
        "metric_type":"L2",
        "index_type":"IVF_FLAT",
        "params":{"nlist":1024}
    }
```

2. Build an index:
```
>>> collection.create_index(field_name=field_name, index_params=index_param)
Status(code=0, message='')
```

Call `describe_index()` to view more details of the new index:

```
>>> collection.index().params
{'metric_type': 'L2', 'index_type': 'IVF_FLAT', 'params': {'nlist': 1024}}
```

## Conduct a vector similarity search

1. Create search parameters:
```
>>> search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
```

2. Load the collection to memory before conducting a vector similarity search:
```
>>> collection.load()
```

3. Call `search()` with the newly created random vectors `query_records`:

*Milvus returns the IDs of the most similar vectors and their distances.*

```
>>> results = collection.search(vectors[:5], field_name, param=search_params, limit=10, expr=None)
>>> results[0].ids
[424363819726212428, 424363819726212436, ...]
>>> results[0].distances
[0.0, 1.0862197875976562, 1.1029295921325684, ...]
```

To search in a specific partition or field, set the parameters `partition_names` and fields when calling `search()`.

```
>>> collection.search(vectors[:5], field_name, param=search_params, limit=10, expr=None, partition_names=[partition_name])
```

4. Release the collections loaded in Milvus to reduce memory consumption when the search is completed. Query other collections:
```
>>> collection.release()
```

## Delete operations
The delete operations affect data already inserted into Milvus. Think twice before you delete.

> The function of deleting specified vectors by ID is currently unavailable.

### Drop an index
Drop the index of a specified field in a specified collection.
```
>>> collection.drop_index()
```

### Drop a partition
The `drop_partition()` method removes a partition and all vectors under it.

```
>>> collection.drop_partition(partition_name=partition_name)
```

### Drop a collection
When you no longer need a collection, you can call `drop_collection()` to delete it.
```
>>> collection.drop()
```

## Close server connection
When you no longer need Milvus services, you can call `close()` to release all connection resources to the Milvus server:

```
>>> connections.disconnect("default")
```
