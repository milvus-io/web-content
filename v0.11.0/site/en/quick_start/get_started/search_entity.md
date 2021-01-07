---
id: search_entity.md
---

# Conduct a Vector Search

Milvus supports searching vectors in a collection or partition.

## Search for vectors in a collection

1. Create search parameters DSL.

      <div class="filter">
   <a href="#Python">Python</a> <a href="#Java">Java</a>
   </div>

   <div class="filter-Python" markdown="block">

   ```python
   # This DSL searches for topk `entities` that are
   # closest to vectors[:1] searched by `IVF_FLAT` index with `nprobe = 10` and `metric_type = L2`,
   # AND field "A" in [1, 2, 5],
   # AND field "B" greater than 1 less than 100
   >>> dsl = {
   ...     "bool": {
   ...         "must":[
   ...             {
   ...                 "term": {"A": [1, 2, 5]}
   ...             },
   ...             {
   ...                 "range": {"B": {"GT": 1, "LT": 100}}
   ...             },
   ...             {
   ...                 "vector": {
   ...                    "Vec": {"topk": 10, "query": vectors[:1], "metric_type": "L2", "params": {"nprobe": 10}}
   ...                 }
   ...             }
   ...         ]
   ...     }
   ... }
   ```
   </div>

   <div class="filter-Java" markdown="block">

   ```java
   // Basic hybrid search:
   // Let's say we have a film with its `embedding` and we want to find `top10` films that are
   // most similar to it by L2 metric_type (Euclidean Distance).
   // In addition to vector similarities, we also want to filter films such that:
   // - `term` is 1, 2, or 5,
   // - `range` larger than 250 minutes.
   List<List<Float>> queryEmbedding = /* your query vectors */;
    final long topK = 10;
    String dsl = String.format(
        "{\"bool\": {"
            + "\"must\": [{"
            + "    \"range\": {"
            + "        \"A\": {\"GT\": 250}" // "GT" for greater than
            + "    }},{"
            + "    \"term\": {"
            + "        \"B\": [1, 2, 5]" // "term" is a list
            + "    }},{"
            + "    \"vector\": {"
            + "        \"embedding\": {"
            + "            \"topk\": %d, \"metric_type\": \"L2\", \"type\": \"float\", \"query\": %s"
            + "    }}}]}}", topK, queryEmbedding.toString());
   ```
   </div>

   <div class="alert note">
   <ul>
   <li><code>topk</code> refers to the k vectors closest to the target vector in the vector space.</li>
   <li>The range of <code>topk</code> is [1, 16384].</li>
   <li>Different index requires different search parameters. To conduct an embedding search, you <b>must</b> assign values to all search parameters. See <a href="index.md">Vector Indexes</a> for more information. </li>  
   </ul>
   </div>



2. Conduct a similarity search:

     <div class="filter">
   <a href="#Python">Python</a> <a href="#Java">Java</a>
   </div>

   <div class="filter-Python" markdown="block">

   ```python
   >>> client.search('test01', dsl)
   ```
   </div>

   <div class="filter-Java" markdown="block">

   ```java
   SearchParam searchParam = SearchParam
    .create(collectionName)
    .setDsl(dsl);

   SearchResult searchResult = client.search(searchParam);
   ```
   </div>

You can also set Milvus to return a specified field. Here, we retrieve values in the `B` field:

<div class="filter">
   <a href="#Python">Python</a> <a href="#Java">Java</a>
   </div>

   <div class="filter-Python" markdown="block">

   ```python
   >>> client.search('test01', dsl, fields=["B"])
   ```
   </div>
   
   <div class="filter-Java" markdown="block">

   ```java
   SearchParam searchParam = SearchParam
        .create(collectionName)
        .setDsl(dsl)
        .setParamsInJson("{\"fields\": [\"B\"]}");
   SearchResult searchResult = client.search(searchParam);
   ```
   </div>

## Search vectors in a partition

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

```python
>>> client.search('test01', dsl, partition_tags=['tag01'])
```
</div>

<div class="filter-Java" markdown="block">

```java
setPartitionTags​(java.util.List<java.lang.String> partitionTags);
```
</div>

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
Check if the value of <code>cache.cache_size</code> in <strong>milvus.yaml</strong> is greater than the size of the collection.
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
This is because, after restarting, Milvus needs to load data from the disk to the memory for the first vector search. You can set <code>preload_collection</code> in <strong>milvus.yaml</strong> and load as many collections as the memory permits. Milvus loads collections to the memory each time it restarts. 
</p>
<p>
Otherwise, you can call <code>load_collection()</code> to load collections to the memory.
</p>

</details>
