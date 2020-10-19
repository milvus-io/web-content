---
id: create_drop_collection_python.md
---

# 创建、删除集合

本页提供创建或删除集合的 Python 示例代码。

<div class="alert note">
参考 <a href="https://github.com/milvus-io/pymilvus/tree/master/examples">示例程序</a> 获取更详细的使用方式。
</div>

## 创建集合

1. 准备创建集合所需参数：

   ```python
   # Prepare collection parameters.
   >>> param = {'collection_name':'test01', 'dimension':256, 'segment_row_limit':1024, 'metric_type':MetricType.L2}
   ```

2. 创建集合名为 `test01`，维度为 256，自动创建索引的数据文件大小为 1024 MB，距离度量方式为欧氏距离（L2）的集合：

   ```python
   # Create a collection.
   >>> milvus.create_collection(param)
   ```


## 删除集合

```python
# Drop a collection.
>>> milvus.drop_collection(collection_name='test01')
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
