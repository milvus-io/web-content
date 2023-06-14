---
id: example_code_NL.md
---

# Voer Milvus uit met Python

Dit onderwerp beschrijft hoe je Milvus kan uitvoeren met Python.

## 1. Installeer PyMilvus

```Python
pip3 install pymilvus==2.2.x
```
<div class="alert note">
Python 3.6 of later is vereist. Zie <a href="https://wiki.python.org/moin/BeginnersGuide/Download">Python downloaden</a> voor meer informatie.
</div>

## 2. Download voorbeeld code

```bash
$ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v2.2.x/examples/hello_milvus.py
```

## 3. Scan het voorbeeld
De voorbeeld code voert de volgende stappen uit.

- Importeer een PyMilvus package:
```Python
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection
```

- Verbind met een server:
```Python
connections.connect(host='localhost', port='19530')
```

- Maakt een collectie aan:
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

- voert vectors in in collectie:
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

- Bouwt indexes en laadt de collectie:
```Python
default_index = {"index_type": "IVF_FLAT", "params": {"nlist": 128}, "metric_type": "L2"}
collection.create_index(field_name="float_vector", index_params=default_index)
collection.load()
```

- Voert vector vergelijkbaarheids zoekopdracht uit:
```Python
topK = 5
search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
# define output_fields of search result
res = collection.search(
    vectors[-2:], "float_vector", search_params, topK,
    "count > 100", output_fields=["count", "random_value"]
)
```
Om zoekresultaten weer te printen op basis van ID en afstand, voer de volgende opdracht uit.
```Python
for raw_result in res:
    for result in raw_result:
        id = result.id  # result id
        distance = result.distance
        print(id, distance)
```
Zie [API Reference](/api-reference/pymilvus/v2.2.x/results.html) voor meer informatie.

- Voert hybride zoekopdracht uit：
<div class="alert note">
    Het volgende voorbeeld voert een geschatte zoekopdracht uit op entiteiten met <code>film_id</code> range binnen [2,4,6,8].
    </div>

```Python
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
import random
connections.connect()
schema = CollectionSchema([
    FieldSchema("film_id", DataType.INT64, is_primary=True),
    FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
])
collection = Collection("test_collection_search", schema)
# insert
data = [
    [i for i in range(10)],
    [[random.random() for _ in range(2)] for _ in range(10)],
]
collection.insert(data)
collection.num_entities
10
collection.load()
# search
search_param = {
    "data": [[1.0, 1.0]],
    "anns_field": "films",
    "param": {"metric_type": "L2"},
    "limit": 2,
    "expr": "film_id in [2,4,6,8]",
}
res = collection.search(**search_param)
assert len(res) == 1
hits = res[0]
assert len(hits) == 2
print(f"- Total hits: {len(hits)}, hits ids: {hits.ids} ")
- Total hits: 2, hits ids: [2, 4]
print(f"- Top1 hit id: {hits[0].id}, distance: {hits[0].distance}, score: {hits[0].score} ")
- Top1 hit id: 2, distance: 0.10143111646175385, score: 0.101431116461

```

## 4. Voer voorbeeld uit
```Python
$ python3 hello_milvus.py
```

*De teruggegeven resultaten en query latentie zijn als volgt laten zien:*

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

*Gefeliciteerd! Je heb Milvus standalone opgestart en je eerste vector vergelijkbaarheids zoekopdracht uitgevoerd.*