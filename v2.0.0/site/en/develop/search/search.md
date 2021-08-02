---
id: search.md
title: Conduct a Search
---

# Conduct a vector similarity search

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