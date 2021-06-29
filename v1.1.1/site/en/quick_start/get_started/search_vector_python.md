---
id: search_vector_python.md
---

# Conduct a Vector Search

Milvus supports searching vectors in a collection or partition.

## Search for Vectors in a Collection

1. Create search parameters. The search parameters are stored in a JSON string, which is represented by a dictionary in the Python SDK.

   ```python
   >>> search_param = {'nprobe': 16}
   ```

   <div class="alert note">
   Different index types requires different search parameters. You must <b>assign values</b> to all search parameters. See <a href="index.md">Vector Indexes</a> for more information. 
   </div>



2. Create random vectors as `query_records` to search:

   ```python
   # Create 5 vectors of 256 dimensions.
   >>> q_records = [[random.random() for _ in range(256)] for _ in range(5)]
   >>> milvus.search(collection_name='test01', query_records=q_records, top_k=2, params=search_param)
   ```
   <div class="alert note">
   <ul><li><code>top_k</code> means searching the k vectors most similar to the target vector. It is defined during the search.</li><li>The range of <code>top_k</code> is [1, 1048576].</li></ul>
   </div>

## Search Vectors in a Partition

```python
# Create 5 vectors of 256 dimensions.
>>> q_records = [[random.random() for _ in range(256)] for _ in range(5)]
>>> milvus.search(collection_name='test01', query_records=q_records, top_k=1, partition_tags=['tag01'], params=search_param)
```

<div class="alert note">
If you do not specify <code>partition_tags</code>, Milvus searches similar vectors in the entire collection.
</div>


## FAQ

<details>
<summary><font color="#4fc4f9">Why is my recall rate unsatisfying?</font></summary>
You can increase the value of <code>nprobe</code> when searching from a client. The greater the value, the more accurate the result, and the more time it takes. See <a href="tuning.md#Index">Performance Tuning > Index</a> for more information.

</details>
<details>
<summary><font color="#4fc4f9">Does Milvus support inserting while searching?</font></summary>
Yes.
</details>
<details>
<summary><font color="#4fc4f9">Does the size of a collection affect vector searches in one of its partitions, especially when it holds up to 100 million vectors?</font></summary>
No. If you have specified partitions when conducting a vector search, Milvus searches the specified partitions only.
</details>
<details>
<summary><font color="#4fc4f9">Does Milvus load the whole collection to the memory if I search only certain partitions in that collection?</font></summary>
No, Milvus only loads the partitions to search.
</details>
<details>
<summary><font color="#4fc4f9">Are queries in segments processed in parallel?</font></summary>
<p>Yes. But the parallelism processing mechanism varies with Milvus versions.
</p>
<p>
Suppose a collection has multiple segments, then when a query request comes in:
<ul>
<li>CPU-only Milvus processes the segment reading tasks and the segment searching tasks in pipeline.</li>
<li>On top of the abovementioned pipeline mechanism, GPU-enabled Milvus distributes the segments among the available GPUs.</li>
</ul>
</p>
<p>
See <a href="https://medium.com/unstructured-data-service/how-does-milvus-schedule-query-tasks-2ca38d7bc2f2">How Does Milvus Schedule Query Tasks</a> for more information.
</p>

</details>
<details>
<summary><font color="#4fc4f9">Will a batch query benefit from multi-threading?</font></summary>
If your batch query is on a small scale (<code>nq</code> < 64), Milvus combines the query requests, in which case multi-threading helps.

Otherwise, the resources are already exhausted, hence multi-threading does not help much.
</details>
<details>
<summary><font color="#4fc4f9">Why the search is very slow?</font></summary>
Check if the value of <code>cache.cache_size</code> in <strong>server_config.yaml</strong> is greater than the size of the collection.
</details>
<details>
<summary><font color="#4fc4f9">Why do I see a surge in memory usage when conducting a vector search immediately after an index is created?</font></summary>
This is because:

- Milvus loads the newly created index file to the memory for the vector search.

- The original vector files used to create the index are not yet released from the memory, because the size of original vector files and the index file has not exceeded the upper limit specified by <code>cache.cache_size</code>.
</details>
<details>
<summary><font color="#4fc4f9">Why does the first search take a long time after Milvus restarts?</font></summary>
<p>
This is because, after restarting, Milvus needs to load data from the disk to the memory for the first vector search. You can set <code>preload_collection</code> in <strong>server_config.yaml</strong> and load as many collections as the memory permits. Milvus loads collections to the memory each time it restarts. 
</p>
<p>
Otherwise, you can call <code>load_collection()</code> to load collections to the memory.
</p>

</details>
