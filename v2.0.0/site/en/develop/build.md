---
id: build.md
title: Build an Index for
---

## Build an index
Create an index for a specified field in a collection to accelerate vector similarity search. See [Vector Index](index.md) for more information about setting index parameters.

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

3. Call `describe_index()` to view more details of the new index:

```
>>> collection.index().params
{'metric_type': 'L2', 'index_type': 'IVF_FLAT', 'params': {'nlist': 1024}}
```
