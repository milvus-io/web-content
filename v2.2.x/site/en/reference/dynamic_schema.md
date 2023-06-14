---
id: dynamic_schema.md
related_key: dynamic_schema
summary: Dynamic schema in Milvus.
---

# Dynamic Schema

Schema design is crucial for Milvus data processing. Before inserting entities into a Milvus collection, clarify the schema design and ensure that all data entities inserted afterward match the schema. However, this limits Milvus collections, making them similar to tables in relational databases. 

NoSQL databases offer a document data model that allows storage and combination of any type of data. They also provide sophisticated data access and rich indexing capabilities. When attempting to insert entities with additional information that does not fit into existing schema fields, a dynamic schema is useful. Inspired by the flexibility of NoSQL databases, Milvus collections now accept dynamic schema, enabling innovative use of your data. 

## Dynamic schema explained

Dynamic schema enables users to insert entities with new fields into a Milvus collection without modifying the existing schema. This means that users can insert data without knowing the full schema of a collection and can include fields that are not yet defined.

Dynamic schema also provides flexibility in data processing, enabling users to store and retrieve complex data structures in their Milvus collections. This includes nested data, arrays, and other complex data types.

To create a collection using a dynamic data model, set `enable_dynamic_field` to `true` when defining the data model. Afterward, all undefined fields and their values in the data entities inserted afterward will be stored in a magic JSON field named `$meta` as key-value pairs. We prefer to use the term "dynamic fields" to refer to these key-value pairs.

Notice that the `$meta` field does not bring any changes to the way you use Milvus. You can ask Milvus to output dynamic fields in search/query results and include them in search and query filter expressions just as they are already defined in the collection schema. 

```python
from pymilvus import FieldSchema, CollectionSchema

# 1. define fields
fields = [
    FieldSchema(name="id", dtype=DataType.VARCHAR, is_primary=True, auto_id=True, max_length=100),
    FieldSchema(name="title", dtype=DataType.VARCHAR),
    FieldSchema(name="title_vector", dtype=DataType.FLOAT_VECTOR, dim=384)
]
# 2. enable dynamic schema in schema definition
schema = CollectionSchema(fields, "The schema for a medium news collection", enable_dynamic_field=True)

# 3. reference the schema in a collection
collection = Collection("news_collection", schema)
```

After you index and load the collection, you can use dynamic fields in the filter expression of a search or a query as follows:

```python
query_vectors = [
    [-3.683152198791504, -4.5939459800720215, ..., -1.6634856462478638]
]

collection.search(
    data=query_vectors,
    anns_field="title_vector",
    param={"metric_type": "IP", "params": {"nprobe": 10}},
    limit=10,
    # Use dynamic fields as pre-defined fields in filter expression
    expr='$meta["claps"] > 30 and reading_time < 10',  
    # Ask Milvus to output both pre-defined and dynamic fields
    output_fields=["title", "claps", "reading_time"] 
)
```

It is worth noting that claps and reading_time are not present when you define the schema, which does not prevent you from using them in the filter expression and including them in the output fields if the data entities inserted have these fields, just like you normally do in the past.

```python
id: 5607, distance: 0.8194807767868042, entity: {'title': 'The Hidden Side Effect of the Coronavirus', 'reading_time': 8, 'claps': 83}
id: 5641, distance: 0.8116299510002136, entity: {'title': 'Why The Coronavirus Mortality Rate is Misleading', 'reading_time': 9, 'claps': 2900}
id: 3441, distance: 0.7918508052825928, entity: {'title': 'Coronavirus shows what ethical Amazon could look like', 'reading_time': 4, 'claps': 51}
id: 938, distance: 0.7819530963897705, entity: {'title': 'Mortality Rate As an Indicator of an Epidemic Outbreak', 'reading_time': 6, 'claps': 65}
```

## JSON: a new data type

As mentioned previously, `$meta` is a JSON field, which means that Milvus now supports JSON as a data type. 

Defining a JSON field doesn't require you to enable dynamic schema. JSON fields are composed of key-value pairs, where each key is a string and its corresponding value can be a number, string, boolean, list, or array. It's worth noting that values in a list or array should be of the same type, and all nested dictionaries will be treated as strings. When defining JSON keys, it's important to use only alphanumeric characters and underscores, as other characters may cause filter or search issues.

To access a specific key within a JSON field, you can either directly use the key name or place the key name within square brackets and put the square brackets next to the JSON field name. For example, to access the `claps` key in the `$meta` JSON field, use either `$meta["claps"]` or `claps`.

When working with JSON fields in Milvus, you can enclose a string value with either double quotation marks ("") or single quotation marks (''). It's important to note that Milvus doesn't perform any semantic escape or conversion for string values in the JSON field and stores them as is. For instance, `'a"b'`, `"a'b"`, `'a\\'b'`, and `"a\\"b"` will be saved as is, while `'a'b'` and `"a"b"` will be treated as invalid values.

To build filter expressions using a JSON field, utilize the keys within the field. If a key's value is an integer or a float, you can compare it with another integer or float key or an INT32/64 or FLOAT32/64 field. If a key's value is a string, you can compare it only with another string key or a VARCHAR field.

## What's next

[Supported data types](schema.md#Supported-data-type)
[Boolean express rules](boolean.md)
