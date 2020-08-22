---
id: create_drop_collection_python.md
---

# Create and Drop a Collection

This article provides Python sample codes for creating or droping collections.

<div class="alert note">
See <a href="https://github.com/milvus-io/pymilvus/tree/master/examples">example program</a> for more detailed usage.
</div>

## Create a collection

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


## Drop a collection

```python
# Drop a collection.
>>> milvus.drop_collection(collection_name='test01')
```