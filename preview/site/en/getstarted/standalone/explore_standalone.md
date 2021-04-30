---
id: explore_standalone.md
title: Explore Pymilvus (Standalone)
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
>>> from milvus import Milvus, DataType
>>> milvus = Milvus(host='localhost', port='19530')
```

## Create a collection
A collection in Milvus is equivalent to a table in a relational database. Collections can only be created after successfully connecting to the Milvus server.

1. Prepare collection parameters, including collection name and field parameters. See [API document](https://pymilvus-orm.readthedocs.io/en/latest/) for a detailed description of these parameters.

```
>>> collection_name = "example_collection"
>>> field_name = "example_field"
>>> fields = {"fields":[{
            "name": field_name,
            "type": DataType.FLOAT_VECTOR,
            "metric_type": "L2",
            "params": {"dim": 8},
            "indexes": [{"metric_type": "L2"}]
        }]}
```

2. Call `create_collection()` provided by the Milvus instance to create a collection:
```
>>> milvus.create_collection(collection_name=collection_name, fields=fields)
```
3. Check if the collection is created successfully:
```
>>> milvus.has_collection(collection_name=collection_name)
```

List all created collections:
```
>>> milvus.list_collections()
['example_collection']
```
View collection statistics, such as row count:
```
>>> milvus.get_collection_stats(collection_name=collection_name)
{'row_count': 0}
```
## Create a partition (optional)
Search performance worsens as more vectors are inserted into the collection. To help mitigate declining search performance, consider creating collection partitions. Partitioning is logic for separating data. Partition tags narrow a search to a specific number of vectors, improving query performance. To improve search efficiency, divide a collection into several partitions by tag.
```
>>> partition_tag = "example_partition"
>>> milvus.create_partition(collection_name=collection_name,partition_tag=partition_tag)
```
Milvus creates a default partition tag, `_default`, for new collections. After creating a partition, you have two partition tags, `tag01` and `_default`. Call `list_partitons()` to list all partitions in a collection.
```
>>> milvus.list_partitions(collection_name=collection_name)
['_default', 'example_partition']
```
Call `has_partition()` to check if a partition is successfully created.
```
>>> milvus.has_partition(collection_name=collection_name,partition_tag=partition_tag)
True
```

## Insert vectors
You can insert vectors to a specified partition within a specific collection.

1. Generate random vectors:
```
>>> import random
>>> vectors = [[random.random() for _ in range(8)] for _ in range(10)]
>>> entities = [{"name": field_name, "type": DataType.FLOAT_VECTOR, "values": vectors}]
```
2. Insert the random vectors to the newly created collection. Milvus automatically assigns IDs to the inserted vectors, similar to AutoID in a relational database.

*Milvus returns the assigned vector IDs.*

```
>>> milvus.insert(collection_name=collection_name, entities=entities)
[424363819726212428, 424363819726212429, ...]
```

3. You can also manually define IDs for vector and then insert them.
```
>>> ids = [id for id in range(10)]
>>> milvus.insert(collection_name=collection_name, entities=entities, ids=ids)
```
4. By specifying `partition_tag` when calling `insert()`, you can insert vectors to a specified partition:
```
>>> milvus.insert(collection_name=collection_name, entities=entities, partition_tag=partition_tag)
```
5. Milvus temporarily stores the inserted vectors in the memory. Call `flush()` to flush them to the disk.
```
>>> milvus.flush([collection_name])
```
## Build an index
Create an index for a specified field in a collection to accelerate vector similarity search. See [Vector Index](vector_index.md) for more information about setting index parameters.

1.Prepare the index parameters:
```
>>> index_param = {
        "metric_type":"L2",
        "index_type":"IVF_FLAT",
        "params":{"nlist":1024}
    }
```
2. Build an index.
```
>>> milvus.create_index(collection_name, field_name, index_param)
Status(code=0, message='')
```
Call `describe_index()` to view more details of the new index:
```
>>> milvus.describe_index(collection_name,field_name)
{'metric_type': 'L2', 'index_type': 'IVF_FLAT', 'params': {'nlist': 1024}}
```
## Conduct a vector similarity search
1. Create a search DSL.
```
>>> dsl = {"bool": {"must": [{"vector": {
                        field_name: {
                            "metric_type": "L2",
                            "query": vectors,
                            "topk": 10,
                            "params": {"nprobe": 16}
                        }
    }}]}}
```
2. Load the collection to memory before conducting a vector similarity search.
```
>>> milvus.load_collection(collection_name=collection_name)
```
3. Call `search()` with the newly created random vectors query_records:

*Milvus returns the IDs of the most similar vectors and their distances.*
```
>>> results = milvus.search(collection_name, dsl)
>>> results[0].ids
[424363819726212428, 424363819726212436, ...]
>>> results[0].distances
[0.0, 1.0862197875976562, 1.1029295921325684, ...]
```
To search in a specific partition or field, set the parameters `partition_tags` and `fields` when calling `search()`.
```
>>> milvus.search(collection_name=collection_name, dsl=dsl, partition_tags=[partition_tag],fields=[field_name])
```
4. Release the collections loaded in Milvus to reduce memory consumption when the search is completed. Query other collections.
```
>>> milvus.release_collection(collection_name=collection_name)
```

# Delete operations
The delete operations affect data already inserted into Milvus. Think twice before you delete.

> The function of deleting specified vectors by ID is currently unavailable.

## Drop an index
Drop the index of a specified field in a specified collection.
```
>>> milvus.drop_index(collection_name=collection_name, field_name=field_name)
```
## Drop a partition
The `drop_partition()` method removes a partition and all vectors under it.
```
>>> milvus.drop_partition(collection_name=collection_name, partition_tag=partition_tag)
```

## Drop a collection
When you no longer need a collection, you can call `drop_collection()` to delete it.
```
>>> milvus.drop_collection(collection_name=collection_name)
```
## Close server connection
When you no longer need Milvus services, you can call `close()` to release all connection resources to the Milvus server:

```
>>> milvus.close()
```








