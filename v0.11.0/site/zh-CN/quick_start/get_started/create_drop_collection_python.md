---
id: create_drop_collection_python.md
---

# 创建、删除集合

本页提供创建或删除集合的 Python 示例代码。

<div class="alert note">
参考 <a href="https://github.com/milvus-io/pymilvus/tree/0.3.0/examples">示例程序</a> 获取更详细的使用方式。
</div>

## 创建集合

1. 准备创建集合所需参数：

   ```python
   # create collection name
   >>> collection_name = 'test01'
   
   # create a collection of 4 fields, fields A, B and C are int type fields
   # and Vec is a float vector field with  dimension of 128.
   # segment_row_limit is default as 524288 if not specified
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

2. 创建集合名为 `test01` 的集合：

   ```python
   # Create a collection.
   >>> client.create_collection('test01', collection_param)
   ```


## 删除集合

```python
# Drop a collection.
>>> milvus.drop_collection('test01')
```

## 常见问题

<details>
<summary><font color="#4fc4f9">建立集合后，<code>segment_row_limit</code> 和 <code>metric_type</code> 还支持修改吗？</font></summary>
不支持。
</details>
<details>
<summary><font color="#4fc4f9">Milvus 对集合和分区的总数有限制吗？</font></summary>
有。二者之和不能超过 4,096。
</details>
