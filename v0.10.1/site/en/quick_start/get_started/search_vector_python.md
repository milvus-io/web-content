---
id: search_vector_python.md
---

# Search Vectors

Milvus supports searching vectors in a collection or partition.

## Search vectors in a collection

1. Create search parameters. The search parameters are stored in a JSON string, which is represented by a dictionary in the Python SDK.

   ```python
   >>> search_param = {'nprobe': 16}
   ```

   <div class="alert note">
   Different index types requires different search parameters. You must <b>assign values</b> to all search parameters.
   </div>

   | Index Type | Search Parameter | Exmaple Parameter | Range |
   | ---------- | --------------- | ----------------- | ----- |
   | `FLAT` | - | | - |
   | `IVFLAT`/`SQ8`/`SQ8H`/`IVFPQ` | `nprobe`: The number of vector classes involved in the query. `nprobe` affects query accuracy. The larger the value, the higher the accuracy and the slower the speed.         | `{nprobe: 32}`         | [1, `nlist`]   |
   | `NSG`                                | `search_length`: The larger the value, the more nodes to search in the graph, the higher the recall rate, and the slower the speed.                         | `{search_length:100}` | [10, 300]      |
   | `HNSW`                               | `ef`: The larger the value, the more data to search in the index, the higher the recall rate, and the slower the speed.                                    | `{ef: 64}`            | [`top_k`, 4096] |
   | `ANNOY`                              | `search_k`: The value affects search performance. The larger the value, the more accurate the search results, but the longer the search time.</br>-1 represents the default value, taking 5% of the total data. | `{"search_k": -1}`    | {-1} ∪ [`top_k`, ∞) |

   <div class="alert note">
   <code>top_k</code> means searching the k vectors most similar to the target vector. It is defined during the search. The range of <code>top_k</code> is (0, 2048].
   </div>

2. Create random vectors as `query_records` to search:

   ```python
   # create 5 vectors of 256-dimension
   >>> q_records = [[random.random() for _ in range(256)] for _ in range(5)]
   >>> milvus.search(collection_name='test01', query_records=q_records, top_k=2, params=search_param)
   ```

## Search vectors in a partition

```python
# create 5 vectors of 256-dimension
>>> q_records = [[random.random() for _ in range(256)] for _ in range(5)]
>>> milvus.search(collection_name='test01', query_records=q_records, top_k=1, partition_tags=['tag01'], params=search_param)
```

<div class="alert note">
If you do not specify <code>partition_tags</code>, Milvus searches similar vectors in the entire collection.
</div>