---
id: create_drop_index.md
---

# Create and Drop an Index

This article provides Python sample codes for creating or dropping indexes.

## Create an index

Milvus supports one index for each field in a collection. Switching index type causes the original index to be deleted. A collection uses FLAT as its default index before an index type is specified. 

<div class="alert note">
<code>create_index()</code> specifies the index type of a collection and synchronously creates indexes for the previously inserted data. When the row count of the inserted data reaches <code>segment_row_limit</code>, Milvus automatically creates indexes in the background. For streaming data, it is recommended to create indexes before inserting the vector so that the system can automatically build indexes for the next data. For static data, it is recommended to import all the data at first and then create indexes. See <a href="https://github.com/milvus-io/pymilvus/tree/0.3.0/examples/indexes">index sample program</a> for more information about using index.
</div>

1. Prepare the parameters required for creating an IVF_FLAT vector index. 
   <div class="alert note">
   Different index types requires different indexing parameters. They <b>must</b> all have a value.
   </div>

   <div class="filter">
   <a href="#Python">Python</a> <a href="#Java">Java</a>
   </div>
   
   <div class="filter-Python" markdown="block">

   ```python
   # Prepare index param.
   >>> ivf_param = {"index_type": "IVF_FLAT", "metric_type": "L2", "params": {"nlist": 4096}}
   ```

   </div>
   
   <div class="filter-Java" markdown="block">
   
   ```java
    Index index = Index
        .create(collectionName, "embedding")
        .setIndexType(IndexType.IVF_FLAT)
        .setMetricType(MetricType.L2)
        .setParamsInJson(new JsonBuilder().param("nlist", 100).build());
   ```  
   </div>

2. Create index for the collection:

   <div class="filter">
   <a href="#Python">Python</a> <a href="#Java">Java</a>
   </div>
   
   <div class="filter-Python" markdown="block">

   ```python
   # Create an index.
   >>> client.create_index('demo_films', "Vec", ivf_param)
   ```
   </div>
   <div class="filter-Java" markdown="block">

   ```java
   client.createIndex(index);
   ```
   </div>

## Drop an index

After deleting the index, the vector field uses the default index type FLAT again.

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

```python
>>> client.drop_index('demo_films', "Vec")
```
</div>

<div class="filter-Java" markdown="block">

```java
client.dropIndex(collectionName, "embedding");
```
</div>

## FAQ

<details>
<summary><font color="#4fc4f9">How to set the value of <code>nlist</code> when I build indexes?</font></summary>
It depends on your scenario. See <a href="tuning.md#Index">Performance tuning > Index</a> for more information.
</details>
<details>
<summary><font color="#4fc4f9">Can Milvus create different types of index for different partitions in the same collection?</font></summary>
No. A collection can have only one index type at a time.
</details>
<details>
<summary><font color="#4fc4f9">Does Milvus create new indexes after vectors are inserted?</font></summary>
Yes. When the inserted vectors grow to a specified volume, Milvus creates a new segment and starts to create an index file for it at the same time. The building of the new index file does not affect the existing index files.
</details>

