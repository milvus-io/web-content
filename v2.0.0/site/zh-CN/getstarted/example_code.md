---
id: example_code.md
related_key: pymilvus
label: Python
order: 0
group: example
summary: Get started with Milvus faster using this Python example code.
---

<div class="tab-wrapper"><a href="example_code.md" class='active '>Python</a><a href="example_code_node.md" class=''>Node.js</a></div>

# Run Milvus using Python

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>Edit this page</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">发起 GitHub Issue</a>。
</div>

This topic describes how to run Milvus using Python.

Through running the example code we provided, you will have a primary understanding of what Milvus is capable of.

## Preparations

Before running this example code, you will need to install [Milvus](install_standalone-docker.md) and [PyMilvus](install-pymilvus.md) on your device.


## Download example code

[Download](https://raw.githubusercontent.com/milvus-io/pymilvus/v2.0.0rc9/examples/hello_milvus.py) `hello_milvus.py` directly or with the following command.

```Python
$ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v2.0.0rc9/examples/hello_milvus.py
```


## Scan the example code

The example code performs the following steps.

- Imports a PyMilvus package:
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

- Connects to a server:
```Python
connections.connect("default", host="localhost", port="19530")
```

- Creates a collection:
```Python
fields = [
    FieldSchema(name="pk", dtype=DataType.INT64, is_primary=True, auto_id=False),
    FieldSchema(name="random", dtype=DataType.DOUBLE),
    FieldSchema(name="embeddings", dtype=DataType.FLOAT_VECTOR, dim=8)
]
schema = CollectionSchema(fields, "hello_milvus is the simplest demo to introduce the APIs")
hello_milvus = Collection("hello_milvus", schema)
```

- Inserts vectors in the collection:
```Python
import random
entities = [
    [i for i in range(3000)],  # field pk
    [float(random.randrange(-20, -10)) for _ in range(3000)],  # field random
    [[random.random() for _ in range(8)] for _ in range(3000)],  # field embeddings
]
insert_result = hello_milvus.insert(entities)
```

- Builds indexes on the entities:
```Python
index = {
    "index_type": "IVF_FLAT",
    "metric_type": "L2",
    "params": {"nlist": 128},
}
hello_milvus.create_index("embeddings", index)
```

- Loads the collection to memory and performs a vector similarity search:
```Python
hello_milvus.load()
vectors_to_search = entities[-1][-2:]
search_params = {
    "metric_type": "l2",
    "params": {"nprobe": 10},
}
result = hello_milvus.search(vectors_to_search, "embeddings", search_params, limit=3, output_fields=["random"])
```


- Performs a vector query:

```Python
result = hello_milvus.query(expr="random > -14", output_fields=["random", "embeddings"])
```

- Performs a hybrid search:

```Python
result = hello_milvus.search(vectors_to_search, "embeddings", search_params, limit=3, expr="random > -12", output_fields=["random"])
```

- Deletes entities by their primary keys:

```Python
expr = f"pk in [{ids[0]}, {ids[1]}]"
hello_milvus.delete(expr)
```

- Drops the collection:

```Python
utility.drop_collection("hello_milvus")
```

## Run the example code

Execute the following command to run the example code.

```Python
$ python3 hello_milvus.py
```

*The returned results and query latency are shown as follows:*

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


*Congratulations! You have started Milvus standalone and performed your first vector similarity search.*

