---
id: example_code_id.md
---

# Menjalankan Milvus menggunkan Python

Topik ini menjelaskan bagaimana cara menjalankan Milvus menggunkan Python.

## 1. Instal PyMilvus

```Python
pip3 install pymilvus==2.2.0
```
<div class="alert note">
Python 3.6 atau yang lebih baru dibutuhkan. Lihat <a href="https://wiki.python.org/moin/BeginnersGuide/Download">Mengunduh Python</a> untuk informasi lebih lanjut.
</div>

## 2. Unduh kode sampel

```bash
$ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v2.2.0/examples/hello_milvus.py
```

## 3. Pindai sampel
Langkah-langkah yang dilakukan untuk membuat kode sampel.

- Impor paket PyMilvus :
```Python
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection
```

- Koneksikan ke server:
```Python
connections.connect(host='localhost', port='19530')
```

- Buat koleksi:
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

- Tambahkan vector ke dalam koleksi:
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

- Bangun indeks dan muat koleksi:
```Python
default_index = {"index_type": "IVF_FLAT", "params": {"nlist": 128}, "metric_type": "L2"}
collection.create_index(field_name="float_vector", index_params=default_index)
collection.load()
```

- Lakukan pencarian persamaan vektor::
```Python
topK = 5
search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
# define output_fields of search result
res = collection.search(
    vectors[-2:], "float_vector", search_params, topK,
    "count > 100", output_fields=["count", "random_value"]
)
```
Untuk mencetak hasil pencarian berdasarkan ID dan jarak, jalankan perintah berikut.
```Python
for raw_result in res:
    for result in raw_result:
        id = result.id  # result id
        distance = result.distance
        print(id, distance)
```
Baca [Referensi API](/api-reference/pymilvus/v2.2.0/results.html) untuk informasi lebih lanjut.

- Lakukan pencarian hibrid：
<div class="alert note">
    Contoh berikut melakukan pencarian perkiraan pada entitas dengan <code>film_id</code> berkisar [2,4,6,8].
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

## 4. Jalankan sampel
```Python
$ python3 hello_milvus.py
```

*Hasil yang dikembalikan dan latensi kueri ditampilkan sebagai berikut:*

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


*Selamat! Kamu baru saja memulai Milvus mandiri dan melakukan pencarian persamaan vector pertama.*

