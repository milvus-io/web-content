---
id: helloworld_standalone.md
title: Hello Milvus
---

# 通过 Python 使用 Milvus
成功启动 Milvus 服务端后，通过 Python 示例代码使用 Milvus。

1. 安装 pymilvus_orm 及依赖库:

```
$ pip install pymilvus-orm
```
> pymilvus_orm 需要 Python 3.6 版本或以上，详见 [Python 安装指南](https://wiki.python.org/moin/BeginnersGuide/Download)。

2. 下载 **hello_milvus.py** 示例代码:

```
$ wget https://github.com/milvus-io/pymilvus-orm/blob/main/examples/hello_milvus.py
```
3. 浏览 **hello_milvus.py**，这个示例程序将：

- 导入 pymilvus 包
```
import pymilvus_orm
```
- 连接 Milvus 服务端
```
pymilvus_orm.connections.connect()
```
- 创建一个 collection：
```
from pymilvus_orm import schema, DataType, Collection
dim = 128
default_fields = [
    schema.FieldSchema(name="count", dtype=DataType.INT64, is_primary=False),
    schema.FieldSchema(name="score", dtype=DataType.FLOAT),
    schema.FieldSchema(name="float_vector", dtype=DataType.FLOAT_VECTOR, dim=dim)
]
default_schema = schema.CollectionSchema(fields=default_fields, description="test collection")
collection = Collection(name="hello_milvus", data=None, schema=default_schema)
```
- 向创建的 collection 中插入数据：
```
import random
nb = 3000
vectors = [[random.random() for _ in range(dim)] for _ in range(nb)]
collection.insert([[i for i in range(nb)], [float(i) for i in range(nb)], vectors])
```
- 构建 IVF_FLAT 索引并加载 collection 至内存：
```
default_index = {"index_type": "IVF_FLAT", "params": {"nlist": 128}, "metric_type": "L2"}
collection.create_index(field_name="float_vector", index_params=default_index)
collection.load()
```
- 进行向量相似度查询：
```
topK = 5
search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
res = collection.search(vectors[-2:], "float_vector", search_params, topK, "count > 100")
```
4. 运行 **hello_milvus.py**:
```
$ python3 hello_milvus.py
```
*运行结果及查询等待时间如下：*

![Returend results and query latency](../../../../assets/returned_results_and_query_latency)

恭喜！你已成功启动 Milvus，并完成了在 Milvus上的第一次向量查询。
