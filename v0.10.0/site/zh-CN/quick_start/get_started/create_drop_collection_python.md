---
id: create_drop_collection_python.md
---

# 创建、删除集合

本页提供创建或删除集合的 Python 示例代码。

<div class="alert note">
参考<a href="https://github.com/milvus-io/pymilvus/tree/master/examples">示例程序</a>获取更详细的使用方式。
</div>

## 创建 collection

1. 准备创建 collection 所需参数：

   ```python
   # Prepare collection parameters
   >>> param = {'collection_name':'test01', 'dimension':256, 'index_file_size':1024, 'metric_type':MetricType.L2}
   ```

2. 创建 collection 名为 `test01`，维度为 256，自动创建索引的数据文件大小为 1024 MB，距离度量方式为欧氏距离（L2）的 collection：

   ```python
   # Create a collection
   >>> milvus.create_collection(param)
   ```


## 删除 collection

```python
# Drop collection
>>> milvus.drop_collection(collection_name='test01')
```