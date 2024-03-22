---
id: enable-dynamic-field.md
title: Enable Dynamic Field
---

# Enable Dynamic Field

This page explains how to use the dynamic field in a collection for flexible data insertion and retrieval.

## Overview

Schema design is crucial for Zilliz Cloud cluster data processing. Before inserting entities into a collection, clarify the schema design and ensure that all data entities inserted afterward match the schema. However, this puts limits on collections, making them similar to tables in relational databases.

Dynamic schema enables users to insert entities with new fields into a collection without modifying the existing schema. This means that users can insert data without knowing the full schema of a collection and can include fields that are not yet defined.

Dynamic schema also provides flexibility in data processing, enabling users to store and retrieve complex data structures in their collections. This includes nested data, arrays, and other complex data types.

<div class="alert note">

The code snippets on this page use new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) to interact with Milvus. New MilvusClient SDKs for other languages will be released in future updates.

</div>

## Enable dynamic field

To create a collection using a dynamic schema, set `enable_dynamic_field` to `True` when defining the data model. Afterward, all undefined fields and their values in the data entities inserted afterward will be treated as pre-defined fields. We prefer to use the term "dynamic fields" to refer to these key-value pairs.

With these dynamic fields, you can ask Zilliz Cloud to output dynamic fields in search/query results and include them in search and query filter expressions just as they are already defined in the collection schema.

```python
import json, os, time
from pymilvus import MilvusClient, DataType

CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT" # Set your cluster endpoint
TOKEN="YOUR_CLUSTER_TOKEN" # Set your token
COLLECTION_NAME="medium_articles_2020" # Set your collection name
DATASET_PATH="{}/../medium_articles_2020_dpr.json".format(os.path.dirname(__file__)) # Set your dataset path

# 1. Connect to cluster
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

# 2. Define collection schema
schema = MilvusClient.create_schema(
    auto_id=True,
    enable_dynamic_field=True
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="title_vector", datatype=DataType.FLOAT_VECTOR, dim=768)

# 3. Define index parameters
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="title_vector",
    index_type="AUTOINDEX",
    metric_type="L2"
)

# 4. Create a collection
client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params
)
```

## Insert dynamic data

Once the collection is created, you can start inserting data, including the dynamic data into the collection.

### Prepare data

Now we need to prepare a piece of applicable data.

```python
# 6. Prepare data
with open(DATASET_PATH) as f:
    data = json.load(f)
    list_of_rows = data['rows']

    data_rows = []
    for row in list_of_rows:
        # Remove the id field because the primary key has auto_id enabled.
        del row['id']
        # Other keys except the title and title_vector fields in the row 
        # will be treated as dynamic fields.
        data_rows.append(row)
```

### Insert data

Then you can safely insert the data into the collection.

```python
# 7. Insert data
res = client.insert(
    collection_name=COLLECTION_NAME,
    data=data_rows,
)

# Output
#
# {
#     "insert_count": 5979
# }

time.sleep(5000)
```

## Search with dynamic fields

If you have created the collection with the dynamic field enabled and inserted non-schema-defined fields, you can use these fields in the filter expression of a search or a query as follows:

```python
# 8. Search data
res = client.search(
    collection_name=COLLECTION_NAME,
    data=[data_rows[0]['title_vector']],
    filter='claps > 30 and reading_time < 10',
    limit=3,
    output_fields=["title", "reading_time", "claps"],
    search_params={"metric_type": "L2", "params": {}}
)

print(result)

# Output
#
# [
#     [
#         {
#             "id": 443943328732915404,
#             "distance": 0.36103835701942444,
#             "entity": {
#                 "title": "The Hidden Side Effect of the Coronavirus",
#                 "reading_time": 8,
#                 "claps": 83
#             }
#         },
#         {
#             "id": 443943328732915438,
#             "distance": 0.37674015760421753,
#             "entity": {
#                 "title": "Why The Coronavirus Mortality Rate is Misleading",
#                 "reading_time": 9,
#                 "claps": 2900
#             }
#         },
#         {
#             "id": 443943328732913238,
#             "distance": 0.4162980318069458,
#             "entity": {
#                 "title": "Coronavirus shows what ethical Amazon could look like",
#                 "reading_time": 4,
#                 "claps": 51
#             }
#         }
#     ]
# ]
```

## Recaps

It is worth noting that __claps__ and __reading_time__ are not present when you define the schema, but this does not prevent you from using them in the filter expression and including them in the output fields if the data entities inserted have these fields, just like you normally do in the past.

If the key of a dynamic field contains characters other than digits, letters, and underscores (e.g. plus signs, asterisks, or dollar signs), you need to include the key within __$meta[]__ as shown in the following code snippet when using it in a boolean expression or including it in the output fields.

```python
... 
expr='$meta["#key"] in ["a", "b", "c"]', 
output_fields='$meta["#key"]'  
...
```
