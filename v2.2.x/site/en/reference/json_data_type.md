---
id: json_data_type.md
related_key: json_data_type
summary: JSON data type in Milvus.
---

# JavaScript Object Notation (JSON)

JSON stands for Javascript Object Notation, which is a lightweight and easy-to-use text-based data format. JSON fields consist of key-value pairs, where each key is a string and its corresponding value can be a number, string, boolean, list, or array. You can insert dictionaries as a field value into collections of your Milvus instances.

For instance, here's an example of a JSON field that stores the metadata of a published article.

```python
{
      'title': 'The Reported Mortality Rate of Coronavirus Is Not Important', 
      'title_vector': [0.041732933, 0.013779674, -0.027564144, ..., 0.030096486], 
      'article_meta': {
        'link': 'https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912', 
        'reading_time': 13, 
        'publication': 'The Startup', 
        'claps': 1100, 
        'responses': 18
      }
}
```

Please keep in mind that when creating a list or array, it's important to ensure that all values are of the same type. Additionally, any nested dictionaries will be treated as strings. When defining JSON keys, it's recommended to only use alphanumeric characters and underscores, as other characters may cause issues with filtering or searching.

## Define JSON field

To define a JSON field, simply follow the same procedure as defining fields of other types.

```python
import json
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType

# 1. define fields
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True, max_length=100),
    FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=512),
    FieldSchema(name="title_vector", dtype=DataType.FLOAT_VECTOR, dim=768),
    FieldSchema(name="article_meta", dtype=DataType.JSON),
]
# 2. disable dynamic schema in schema definition
schema = CollectionSchema(
        fields, 
        "The schema for a medium news collection", 
        enable_dynamic_field=False # Optional, defaults to 'False'.
)
# 3. reference the schema in a collection
collection = Collection("medium_articles_with_json", schema)

# 4. index the vector field and load the collection
index_params = {
    "index_type": "AUTOINDEX",
    "metric_type": "L2",
    "params": {}
}

collection.create_index(
  field_name="title_vector", 
  index_params=index_params
)

# 5. load the collection
collection.load()
```

To accomplish the task described above, you'll need to create a FieldSchema object that corresponds to the JSON field, and set its dtype attribute to DataType.JSON.

## Insert Field Values

After creating a collection from the CollectionSchema object, dictionaries such as the one above can be inserted into it.

```python

# You can directly insert the record listed at the top of this page into the collection

# 5. insert data
collection.insert(data_rows)
collection.flush()
```

## Search within JSON field

Once all of your data has been added, you can conduct searches using the keys in the JSON field in the same manner as you would with a standard scalar field. Simply follow these steps:

```python
# 6. search data
result = collection.search(
    data=[data_rows[0]['title_vector']],
    anns_field="title_vector",
    param={"metric_type": "L2", "params": {"nprobe": 10}},
    limit=3,
    expr='article_meta["claps"] > 30 and article_meta["reading_time"] < 10',
    output_fields=["title", "article_meta" ],
)

for hits in result:
    print("Matched IDs: ", hits.ids)
    print("Distance to the query vector: ", hits.distances)
    print("Matched articles: ")
    for hit in hits:
        print(
            "Title: ", 
            hit.entity.get("title"), 
            ", Reading time: ", 
            json.loads(hit.entity.get("article_meta"))['reading_time'], 
            ", Claps", 
            json.loads(hit.entity.get("article_meta"))['claps']
        )

# Output:
# Matched articles: 
# Title:  The Hidden Side Effect of the Coronavirus , Reading time:  8 , Claps 83
# Title:  Why The Coronavirus Mortality Rate is Misleading , Reading time:  9 , Claps 2900
# Title:  Coronavirus shows what ethical Amazon could look like , Reading time:  4 , Claps 51
```

To access a particular key within a JSON field, you can reference the key name by including the JSON field name (such as article_meta["claps"] in expr) and include the name of the JSON field in output_fields. Then you can access the keys in the returned JSON value as normal dictionaries.

## Limits

When working with JSON fields, you can enclose a string value with either double quotation marks ("") or single quotation marks (''). It's important to note that Milvus stores string values in the JSON field as is without performing semantic escape or conversion. For instance, **'a"b'**, **"a'b"**, **'a\\'b'**, and **"a\\"b"** will be saved as is, while **'a'b'** and **"a"b"** will be treated as invalid values.

To build filter expressions using a JSON field, you can utilize the keys within the field. If a key's value is an integer or a float, you can compare it with another integer or float key or an INT32/64 or FLOAT32/64 field. If a key's value is a string, you can compare it only with another string key or a VARCHAR field.

The following table assumes that the value of a JSON field has a key named A. Use it as a reference when constructing boolean expressions using JSON field keys.

| Operator     | Examples                                    | Remarks                                                                                                |
| ------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **<**        |  "A < 3"                                    | A should exist.                                                                                        |
| **>**        |  "A > 1"                                    | A should exist.                                                                                        |
| **==**       |  "A == 1"  or "A == 'abc'"                  | A should exist.                                                                                        |
| **!=**       |  "A != 1" or "A != 'abc'"                   | A can be not existing.                                                                                 |
| **<=**       |  "A <= 5"                                   | A should exist.                                                                                        |
| **>=**       |  "A >= 1"                                   | A should exist.                                                                                        |
| **not**      |  "not A == 1" or "not A != 'abc'"           | A can be not existing.                                                                                 |
| **in**       |  "A in [1, 2, 3]" or "A in ['a', 'b', 'c']" | A should exist.                                                                                        |
| **add (&&)** | "A > 1 && A < 3"                            | Whether A should exists depends on the requirements of the expressions at either side of the operator. |
| **or (||)**  | "A > 1 || A < 3"                            | Whether A should exists depends on the requirements of the expressions at either side of the operator. |
| **exist**    | "exist A"                                   | A should exist.                                                                                        |

## What's next

[Dynamic Schema](dynamic_schema.md)

