---
id: insert.md
title: Insert
---

# Insert vectors
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