---
id: create_drop_collection_python.md
---

# Create and Drop a Collection

This article provides Python sample codes for creating or dropping collections.

<div class="alert note">
See <a href="https://github.com/milvus-io/pymilvus/tree/0.3.0/examples">example program</a> for more detailed usage.
</div>

## Create a collection

1. Prepare the parameters needed to create the collection:

   ```python
   # Create a collection of 4 fields, where fields A, B, and C are int type fields
   # and Vec is a 128-dimension float vector field.
   # The default value of segment_row_limit is 524288 if not specified.
   # If you set auto_id to True, you have Milvus create entity IDs. 
   >>> collection_param = {
   ...    "fields": [
   ...        {"name": "A", "type": DataType.INT32},
   ...        {"name": "B", "type": DataType.INT32},
   ...        {"name": "C", "type": DataType.INT64},
   ...        {"name": "Vec", "type": DataType.FLOAT_VECTOR, "params": {"dim": 128}}
   ...    ],
   ...    "segment_row_limit": 100000,
   ...    "auto_id": True
   ... }
   ```

2. Create a collection with a name `test01`.

   ```python
   # Create a collection.
   >>> client.create_collection('test01', collection_param)
   ```


## Drop a collection

```python
# Drop a collection.
>>> milvus.drop_collection('test01')
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
