---
id: hellomilvus.md
title: Hello Milvus
---

# Run Milvus using Python

After the Milvus server boots successfully, test the platform using our Python sample code.

1. Install pymilvus_orm and its dependencies:

```
pip install pymilvus-orm==2.0.0rc1
```
<div class="alert note">
Python version 3.6 or higher is required. View <a href="https://wiki.python.org/moin/BeginnersGuide/Download">Python documentation</a> for information about installing the correct version for your system.
</div>

2. Download sample code **hello_milvus.py**:

```
$ wget https://raw.githubusercontent.com/milvus-io/pymilvus-orm/main/examples/hello_milvus.py
```

3. Scan **hello_milvus.py**. This sample code does the following:

- Imports the pymilvus package:
```
import pymilvus_orm
```

- Connects to the Milvus server:
```
pymilvus_orm.connections.connect()
```

- Creates a collection:
```
from pymilvus_orm import schema, DataType, Collection
dim = 128
default_fields = [
    schema.FieldSchema(name="count", dtype=DataType.INT64, is_primary=False),
    schema.FieldSchema(name="score", dtype=DataType.FLOAT),
    schema.FieldSchema(name="float_vector", dtype=DataType.FLOAT_VECTOR, dim=dim)
]
default_schema = schema.CollectionSchema(fields=default_fields, description="test collection")
collection = Collection(name="hello_milvus",  schema=default_schema)
```

- Inserts vectors in the new collection:
```
import random
nb = 3000
vectors = [[random.random() for _ in range(dim)] for _ in range(nb)]
collection.insert([[i for i in range(nb)], [float(i) for i in range(nb)], vectors])
```

- Builds an IVF_FLAT index and loads the collection to memory:
```
default_index = {"index_type": "IVF_FLAT", "params": {"nlist": 128}, "metric_type": "L2"}
collection.create_index(field_name="float_vector", index_params=default_index)
collection.load()
```

- Conducts a vector similarity search:
```
topK = 5
search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
res = collection.search(vectors[-2:], "float_vector", search_params, topK, "count > 100")
```

4. Run **hello_milvus.py**:
```
$ python3 hello_pymilvus_orm.py
```

*The returned results and query latency show as follows:*


![Returned results](../../../assets/returned_results.png)

<br/>


*Congratulations! You have successfully booted Milvus Standalone and run your first vector similarity search.*

