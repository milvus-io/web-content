---
id: example_code_fr.md
---

# Exécuter Milvus avec Python

Ce topic décrit comment exécuter Milvus avec Python.

## 1. Installer PyMilvus

```Python
pip3 install pymilvus==2.2.0
```
<div class="alert note">
Il est nécessaire d'utiliser la version 3.6 ou une version plus récente de Python. Plus d'informations sont disponibles dans le <a href="https://wiki.python.org/moin/BeginnersGuide/Download">guide d'installation de Python</a>.
</div>

## 2. Télécharger un exemple code source

```bash
$ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v2.2.0/examples/hello_milvus.py
```

## 3. Scanner le code source
L'exemple fourni exécute les étapes suivantes.

- Import du package PyMilvus :
```Python
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection
```

- Connexion à un serveur :
```Python
connections.connect(host='localhost', port='19530')
```

- Création d'une collection :
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

- Insertion des vecteurs dans la collection :
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

- Construction des index et chargement de la collection en mémoire :
```Python
default_index = {"index_type": "IVF_FLAT", "params": {"nlist": 128}, "metric_type": "L2"}
collection.create_index(field_name="float_vector", index_params=default_index)
collection.load()
```

- Exécute une recherche de similitude entre vecteurs :
```Python
topK = 5
search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
# define output_fields of search result
res = collection.search(
    vectors[-2:], "float_vector", search_params, topK,
    "count > 100", output_fields=["count", "random_value"]
)
```
Pour afficher les résultats classés par ID et distance, exécutez la commande suivante.
```Python
for raw_result in res:
    for result in raw_result:
        id = result.id  # result id
        distance = result.distance
        print(id, distance)
```
Se référer à [la documentation de l'API](/api-reference/pymilvus/v2.2.0/results.html) pour plus d'informations.

- Exécute une recherche hybride :
<div class="alert note">
  L'exemple suivant fait une recherche approximative sur entités où la variable <code>film_id</code> prend les valeurs [2,4,6,8].
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

## 4. Exécuter le code source
```Python
$ python3 hello_milvus.py
```

*Les résultats ainsi que le temps de latence des requêtes sont affichés de cette manière :*

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


*Félicitations ! Vous avez démarré Milvus standalone et exécuté votre première recherche de similitude entre vecteurs.*

