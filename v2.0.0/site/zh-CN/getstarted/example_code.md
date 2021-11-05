---
id: example_code.md
label: Python
order: 0
group: example
---

<div class="tab-wrapper"><a href="example_code.md" class='active '>Python</a><a href="example_code_node.md" class=''>Node.js</a></div>

# 通过 Python 使用 Milvus

成功启动 Milvus 服务端后，通过 Python 示例代码使用 Milvus。

1. 安装 PyMilvus 及依赖库:
```Python
pip3 install pymilvus==2.0.0rc8
```

<div class="alert note">
PyMilvus 需要 Python 3.6 版本或以上，详见 <a href="https://wiki.python.org/moin/BeginnersGuide/Download">Python 安装指南</a>。
</div>


2. 下载 **hello_milvus.py** 示例代码:
```Python
$ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v2.0.0rc8/examples/hello_milvus.py
```
3. 浏览 **hello_milvus.py**，这个示例程序将：
- 导入 pymilvus 包
```Python
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection
```

- 连接 Milvus 服务端
```Python
connections.connect(host='localhost', port='19530')
```

- 创建一个 collection：
```Python
dim = 128
default_fields = [
    FieldSchema(name="count", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="random_value", dtype=DataType.DOUBLE),
    FieldSchema(name="float_vector", dtype=DataType.FLOAT_VECTOR, dim=dim)
]
default_schema = CollectionSchema(fields=default_fields, description="test collection")

print(f"\nCreate collection...")
collection = Collection(name="hello_milvus", schema=default_schema)
```
- 向创建的 collection 中插入数据：
```Python
import random
nb = 3000
vectors = [[random.random() for _ in range(dim)] for _ in range(nb)]
collection.insert(
    [
        [i for i in range(nb)],
        [float(random.randrange(-20,-10)) for _ in range(nb)],
        vectors
    ]
)
```
- 构建 IVF_FLAT 索引并加载 collection 至内存：
```Python
default_index = {"index_type": "IVF_FLAT", "params": {"nlist": 128}, "metric_type": "L2"}
collection.create_index(field_name="float_vector", index_params=default_index)
collection.load()
```

- 进行向量相似度查询：
```Python
topK = 5
search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
# define output_fields of search result
res = collection.search(
    vectors[-2:], "float_vector", search_params, topK,
    "count > 100", output_fields=["count", "random_value"]
)
```

根据 ID 和相似度输出搜索结果:
```Python
for raw_result in res:
    for result in raw_result:
        id = result.id  # result id
        distance = result.distance
        print(id, distance)
```
更多详情，参考 [API Reference](/api-reference/pymilvus/2.0.0rc8/results.html)。

- 进行混合查询：
<div class="alert note">
以下示例中，仅对 <code>film_id</code> 在 [2,4, 6, 8]中的 entity 进行向量相似度查询
</div>

```Python
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
>>> import random
>>> connections.connect()
>>> schema = CollectionSchema([
...     FieldSchema("film_id", DataType.INT64, is_primary=True),
...     FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
... ])
>>> collection = Collection("test_collection_search", schema)
>>> # insert
>>> data = [
...     [i for i in range(10)],
...     [[random.random() for _ in range(2)] for _ in range(10)],
... ]
>>> collection.insert(data)
>>> collection.num_entities
10
>>> collection.load()
>>> # search
>>> search_param = {
...     "data": [[1.0, 1.0]],
...     "anns_field": "films",
...     "param": {"metric_type": "L2"},
...     "limit": 2,
...     "expr": "film_id in [2,4,6,8]",
... }
>>> res = collection.search(**search_param)
>>> assert len(res) == 1
>>> hits = res[0]
>>> assert len(hits) == 2
>>> print(f"- Total hits: {len(hits)}, hits ids: {hits.ids} ")
- Total hits: 2, hits ids: [2, 4]
>>> print(f"- Top1 hit id: {hits[0].id}, distance: {hits[0].distance}, score: {hits[0].score} ")
- Top1 hit id: 2, distance: 0.10143111646175385, score: 0.101431116461
```

4. 运行 **hello_milvus.py**:
```Python
$ python3 hello_milvus.py
```
*运行结果及查询等待时间如下：*


<div class='result-bock'>
<p>Search...</p>
<p>(distance: 0.0, id: 2998) -20.0</p>
<p>(distance: 13.2614107131958, id: 989) -11.0</p>
<p>(distance: 14.489648818969727, id: 1763) -19.0</p>
<p>(distance: 15.295698165893555, id: 968) -20.0</p>
<p>(distance: 15.34445571899414, id: 2049) -19.0</p>
<p>(distance: 0.0, id: 2999) -12.0</p>
<p>(distance: 14.63361930847168, id: 1259) -13.0</p>
<p>(distance: 15.421361923217773, id: 2530) -15.0</p>
<p>(distance: 15.427900314331055, id: 600) -14.0</p>
<p>(distance: 15.538337707519531, id: 637) -19.0</p>
<p>search latency = 0.0549s</p>
</div>


<br/>


*恭喜！你已成功启动 Milvus，并完成了在 Milvus上的第一次向量查询。*
