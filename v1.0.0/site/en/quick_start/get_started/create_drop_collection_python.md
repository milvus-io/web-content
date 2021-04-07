---
id: create_drop_collection_python.md
---

# Create and Drop a Collection

This article provides Python sample codes for creating or dropping collections.

<div class="alert note">
See <a href="https://github.com/milvus-io/pymilvus/tree/master/examples">Example Program</a> for more detailed usage.
</div>

## Create a Collection

1. Prepare the parameters needed to create the collection:

   ```python
   # Prepare collection parameters.
   >>> param = {'collection_name':'test01', 'dimension':256, 'index_file_size':1024, 'metric_type':MetricType.L2}
   ```

2. Create a collection named `test01`, with a dimension of 256 and an index file size of 1024 MB. It uses Euclidean distance (L2) as the distance measurement method.

   ```python
   # Create a collection.
   >>> milvus.create_collection(param)
   ```


## Drop a Collection

```python
# Drop a collection.
>>> milvus.drop_collection(collection_name='test01')
```

## FAQ

<details>
<summary><font color="#4fc4f9">How can I get the best performance from Milvus through setting <code>index_file_size</code>?</font></summary>
<p>You need to set <code>index_file_size</code> when creating a collection from a client. This parameter specifies the size of each segment, and its default value is 1024 in MB. When the size of newly inserted vectors reaches the specified volume, Milvus packs these vectors into a new segment. In other words, newly inserted vectors do not go into a segment until they grow to the specified volume. When it comes to creating indexes, Milvus creates one index file for each segment. When conducting a vector search, Milvus searches all index files one by one.
</p>
<p>
As a rule of thumb, we would see a 30% ~ 50% increase in the search performance after changing the value of <code>index_file_size</code> from 1024 to 2048. Note that an overly large <code>index_file_size</code> value may cause failure to load a segment into the memory or graphics memory. Suppose the graphics memory is 2 GB and <code>index_file_size</code> 3 GB, each segment is obviously too large.
</p>
<p>
In situations where vectors are not frequently inserted, we recommend setting the value of <code>index_file_size</code> to 1024 MB or 2048 MB. Otherwise, we recommend setting the value to 256 MB or 512 MB to keep unindexed files from getting too large.
</p>
See <a href="tuning.md#Index">Performance Tuning > Index</a> for more information.

</details>
<details>
<summary><font color="#4fc4f9">Can I update <code>index_file_size</code> and <code>metric_type</code> after creating a collection?</font></summary>
No, you cannot.
</details>
<details>
<summary><font color="#4fc4f9">Is there a limit on the total number of collections and partitions?</font></summary>
There is no limit on the number of collections. The upper limit on the number of partitions in a collection is 4096.
</details>
<details>
<summary><font color="#4fc4f9">What is the maximum dimension of a vector in Milvus?</font></summary>
Milvus can support vectors with up to 32,768 dimensions.  
</details>