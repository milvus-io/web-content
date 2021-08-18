---
id: example_code.md
title: Hello Milvus
---

# Run Milvus using Python

After the Milvus server boots successfully, test the platform using our Python sample code.

1. Install pymilvus_orm and its dependencies:

```Python
pip install pymilvus-orm==2.0.0rc4
```
<div class="alert note">
Python version 3.6 or higher is required. View <a href="https://wiki.python.org/moin/BeginnersGuide/Download">Python documentation</a> for information about installing the correct version for your system.
</div>

2. Download sample code **hello_milvus.py**:

```Python
$ wget https://raw.githubusercontent.com/milvus-io/pymilvus-orm/v2.0.0rc4/examples/hello_milvus.py
```

3. Scan **hello_milvus.py**. This sample code does the following:

- Imports the pymilvus package:
```Python
from pymilvus_orm import connections, FieldSchema, CollectionSchema, DataType, Collection
```

- Connects to the Milvus server:
```Python
connections.connect(host='localhost', port='19530')
```

- Creates a collection:
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

- Inserts vectors in the new collection:
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

- Builds an IVF_FLAT index and loads the collection to memory:
```Python
default_index = {"index_type": "IVF_FLAT", "params": {"nlist": 128}, "metric_type": "L2"}
collection.create_index(field_name="float_vector", index_params=default_index)
collection.load()
```

- Conducts a vector similarity search:
```Python
topK = 5
search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
# define output_fields of search result
res = collection.search(
    vectors[-2:], "float_vector", search_params, topK,
    "count > 100", output_fields=["count", "random_value"]
)
```

- Conducts a hybrid search：
<div class="alert note">
    The example below only performs approximate search on entities whose <code>film_id</code> is in [2,4,6,8]
</div>

```Python
from pymilvus_orm import connections, Collection, FieldSchema, CollectionSchema, DataType
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

4. Run **hello_milvus.py**:
```Python
$ python3 hello_pymilvus.py
```

*The returned results and query latency show as follows:*

<pre>
<code>
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
</code>
</pre>


<br/>


*Congratulations! You have successfully booted Milvus Standalone and run your first vector similarity search.*

