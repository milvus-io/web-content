---
id: create_drop_collection_python.md
---

# Create and Drop a Collection

This article provides Python sample codes for creating or dropping collections.

<div class="alert note">
See <a href="https://github.com/milvus-io/pymilvus/tree/master/examples">example program</a> for more detailed usage.
</div>

## Create a collection

1. Prepare the parameters needed to create the collection:

   ```python
   # Prepare collection parameters.
   >>> param = {'collection_name':'test01', 'dimension':256, 'segment_row_limit':1024, 'metric_type':MetricType.L2}
   ```

2. Create a collection named `test01`, with a dimension of 256 and an index file size of 1024 MB. It uses Euclidean distance (L2) as the distance measurement method.

   ```python
   # Create a collection.
   >>> milvus.create_collection(param)
   ```


## Drop a collection

```python
# Drop a collection.
>>> milvus.drop_collection(collection_name='test01')
```

## FAQ

<details>
<summary><font color="#4fc4f9">Can I update <code>segment_row_limit</code> and <code>metric_type</code> after creating a collection?</font></summary>
No, you cannot.
</details>
<details>
<summary><font color="#4fc4f9">Is there a limit on the total number of collections and partitions?</font></summary>
Yes. The total number of collections and partitions must not exceed 4,096.
</details>
