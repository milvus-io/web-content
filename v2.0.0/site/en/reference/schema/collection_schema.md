---
id: collection_schema.md
summary: Learn how to define a collection schema in Milvus.
---

# Collection Schema

A collection schema is the logical definition of a collection. Usually you need to define the [field schema](field_schema.md) before defining a collection schema and [creating a collection](create.md). 

A collection schema defines all the fields of a collection consists of, automatic ID allocation enablement, and collection description.

## Create a collection schema

<div class="alert note">
  Define the field schemas before defining a collection schema.
</div>

```python
from pymilvus import FieldSchema, CollectionSchema
id_field = FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, description="primary id")
age_field = FieldSchema(name="age", dtype=DataType.INT64, description="age")
embedding_field = FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=128, description="vector")
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=False,description="desc of a collection")
```

Create a collection with the schema specified:

```python
from pymilvus import Collection
collection_name1 = "tutorial_1"
collection1 = Collection(name=collection_name1, schema=schema, using='default', shards_num=2)
```
<div class="alert note">
  You can define the shard number with <code>shards_num</code> and in which Milvus server you wish to create a collection by specifying the alias in <code>using</code>.
  </div>
  
<br/>
You can also create a collection with `Collection.construct_from_dataframe`, which automatically generates a collction schema from DataFrame and creates a collection.

```python
import pandas as pd
df = pd.DataFrame({
        "id": [i for i in range(nb)],
        "age": [random.randint(20, 40) for i in range(nb)],
        "embedding": [[random.random() for _ in range(dim)] for _ in range(nb)]
    })
collection, ins_res = Collection.construct_from_dataframe(
                                'my_collection',
                                df,
                                primary_field='id',
                                auto_id=False
                                )
```

