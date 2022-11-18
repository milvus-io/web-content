---
id: modify_collection.md
related_key: modify collection
summary: Learn how to modify the properties of a collection in Milvus.
---

# Modify a collection

This topic describes how to modify the properties, especially the time to live (TTL), of a collection.

Currently, the TTL feature is only available in Python.

```
collection.set_properties(properties={"collection.ttl.seconds": 1800})
```

The example above changes the collection TTL to 1800 seconds.

|  Parameter                         |   Description                                                |   Option                            |
| ---------------------------------- | ------------------------------------------------------------ | ----------------------------------- |
| Properties: collection.ttl.seconds | Collection time to live (TTL) is the expiration time of a collection. Data in an expired collection will be cleaned up and will not be involved in searches or queries. Specify TTL in the unit of seconds. | The value should be 0 or greater. 0 means TTL is disabled. |


## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Create a partition](create_partition.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
