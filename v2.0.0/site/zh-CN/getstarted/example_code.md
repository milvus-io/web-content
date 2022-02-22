---
id: example_code.md
related_key: pymilvus
label: Python
order: 0
group: example_code.md
summary: Get started with Milvus faster using this Python example code.
---

<div class="tab-wrapper"><a href="example_code.md" class='active '>Python</a><a href="example_code_node.md" class=''>Node.js</a></div>

# 使用 Python 运行Milvus

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


该篇文章介绍了如何使用 Python 运行 Milvus.

通过运行我们提供的示例代码，您将初步了解 Milvus 的功能。



## 准备工作

- [Milvus 2.0.0](install_standalone-docker.md)
- Python 3 (3.71 或者更高版本)
- [PyMilvus 2.0.0](install-pymilvus.md)

## 下载示例代码

使用下面的命令 [下载](https://raw.githubusercontent.com/milvus-io/pymilvus/v2.0.0/examples/hello_milvus.py) `hello_milvus.py` 

```bash
$ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v2.0.0/examples/hello_milvus.py
```


## 代码详解

示例代码将执行以下步骤：

- 导入 PyMilvus 包:
```Python
from pymilvus import (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)
```

- 连接服务:
```Python
connections.connect("default", host="localhost", port="19530")
```

- 创建一个 Collection:
```Python
fields = [
    FieldSchema(name="pk", dtype=DataType.INT64, is_primary=True, auto_id=False),
    FieldSchema(name="random", dtype=DataType.DOUBLE),
    FieldSchema(name="embeddings", dtype=DataType.FLOAT_VECTOR, dim=8)
]
schema = CollectionSchema(fields, "hello_milvus is the simplest demo to introduce the APIs")
hello_milvus = Collection("hello_milvus", schema)
```

- 在创建好的 Collection 中插入向量:
```Python
import random
entities = [
    [i for i in range(3000)],  # field pk
    [float(random.randrange(-20, -10)) for _ in range(3000)],  # field random
    [[random.random() for _ in range(8)] for _ in range(3000)],  # field embeddings
]
insert_result = hello_milvus.insert(entities)
```

- 在数据上构建索引：
```Python
index = {
    "index_type": "IVF_FLAT",
    "metric_type": "L2",
    "params": {"nlist": 128},
}
hello_milvus.create_index("embeddings", index)
```

- 将 Collection 加载到内存并执行相似搜索：
```Python
hello_milvus.load()
vectors_to_search = entities[-1][-2:]
search_params = {
    "metric_type": "l2",
    "params": {"nprobe": 10},
}
result = hello_milvus.search(vectors_to_search, "embeddings", search_params, limit=3, output_fields=["random"])
```


- 执行结构化查询：

```Python
result = hello_milvus.query(expr="random > -14", output_fields=["random", "embeddings"])
```

- 执行混合查询：

```Python
result = hello_milvus.search(vectors_to_search, "embeddings", search_params, limit=3, expr="random > -12", output_fields=["random"])
```

- 根据 pk 删除数据：

```Python
expr = f"pk in [{ids[0]}, {ids[1]}]"
hello_milvus.delete(expr)
```

- 删除 Collection：

```Python
utility.drop_collection("hello_milvus")
```

## 运行示例代码

执行以下命令，运行示例代码：

```Python
$ python3 hello_milvus.py
```

*运行结果如下所示：*

```
=== start connecting to Milvus     ===

Does collection hello_milvus exist in Milvus: False

=== Create collection `hello_milvus` ===


=== Start inserting entities       ===

Number of entities in Milvus: 3000

=== Start Creating index IVF_FLAT  ===


=== Start loading                  ===


=== Start searching based on vector similarity ===

hit: (distance: 0.0, id: 2998), random field: -11.0
hit: (distance: 0.11455299705266953, id: 1581), random field: -18.0
hit: (distance: 0.1232629269361496, id: 2647), random field: -13.0
hit: (distance: 0.0, id: 2999), random field: -11.0
hit: (distance: 0.10560893267393112, id: 2430), random field: -18.0
hit: (distance: 0.13938161730766296, id: 377), random field: -14.0
search latency = 0.2796s

=== Start querying with `random > -14` ===

query result:
-{'pk': 9, 'random': -13.0, 'embeddings': [0.298433, 0.931987, 0.949756, 0.598713, 0.290125, 0.094323, 0.064444, 0.306993]}
search latency = 0.2970s

=== Start hybrid searching with `random > -12` ===

hit: (distance: 0.0, id: 2998), random field: -11.0
hit: (distance: 0.15773043036460876, id: 472), random field: -11.0
hit: (distance: 0.3273330628871918, id: 2146), random field: -11.0
hit: (distance: 0.0, id: 2999), random field: -11.0
hit: (distance: 0.15844076871871948, id: 2218), random field: -11.0
hit: (distance: 0.1622171700000763, id: 1403), random field: -11.0
search latency = 0.3028s

=== Start deleting with expr `pk in [0, 1]` ===

query before delete by expr=`pk in [0, 1]` -> result: 
-{'pk': 0, 'random': -18.0, 'embeddings': [0.142279, 0.414248, 0.378628, 0.971863, 0.535941, 0.107011, 0.207052, 0.98182]}
-{'pk': 1, 'random': -15.0, 'embeddings': [0.57512, 0.358512, 0.439131, 0.862369, 0.083284, 0.294493, 0.004961, 0.180082]}

query after delete by expr=`pk in [0, 1]` -> result: []


=== Drop collection `hello_milvus` ===
```

恭喜！您已经启动了 Milvus 单机版，并执行了第一次结构化查询。
