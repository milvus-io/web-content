---
id: use-partition-key.md
title: Use Partition Key
---

# Use Partition Key

This guide walks you through using the partition key to accelerate data retrieval from your collection.

## Overview

The partition key in Milvus allows for the distribution of incoming entities into different partitions based on their respective partition key values. This allows entities with the same key value to be grouped together in a partition, which in turn accelerates search performance by avoiding the need to scan irrelevant partitions when filtering by the key field. Compared to traditional filtering methods, the partition key can greatly enhance query performance.

You can use the partition key to implement multi-tenancy. For details on multi-tenancy, read [Multi-tenancy](https://milvus.io/docs/multi_tenancy.md) for more.

<div class="alert note">

The code snippets on this page use new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) to interact with Milvus. New MilvusClient SDKs for other languages will be released in future updates.

</div>

## Enable partition key

To demonstrate the use of partition keys, we will continue to use the example dataset that contains over 5,000 articles, and the __publication__ field will serve as the partition key. 

```python
import json, time
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility

COLLECTION_NAME="medium_articles_2020" # Set your collection name
DATASET_PATH="{}/../medium_articles_2020_dpr.json".format(os.path.dirname(__file__)) # Set your dataset path

# 1. Connect to cluster
client = MilvusClient(
    uri="http://localhost:19530"
)

# 2. Define collection schema
schema = MilvusClient.create_schema(
    auto_id=True,
    partition_key_field="publication"
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="title_vector", datatype=DataType.FLOAT_VECTOR, dim=768)
schema.add_field(field_name="link", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="reading_time", datatype=DataType.INT64)
schema.add_field(field_name="publication", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="claps", datatype=DataType.INT64)
schema.add_field(field_name="responses", datatype=DataType.INT64)
```
After you have defined the fields, set other necessary parameters.

```python
# 3. Define index parameters
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="title_vector",
    index_type="AUTOINDEX",
    metric_type="L2"
)
```

Finally, you can create a collection.

```python
# 4. Create a collection
client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params
)
```

## Insert data

Once the collection is ready, start inserting data as follows:

### Prepare data

```python
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

## Use partition key

Once you have indexed and loaded the collection as well as inserted data, you can conduct a similarity search using the partition key. 

<div class="admonition note">

<p><b>notes</b></p>

<p>To conduct a similarity search using the partition key, you should include either of the following in the boolean expression of the search request:</p>
<ul>
<li><p><code>expr='&lt;partition_key&gt;=="xxxx"'</code></p></li>
<li><p><code>expr='&lt;partition_key&gt; in ["xxx", "xxx"]'</code></p></li>
</ul>
<p>Do replace <code>&lt;partition_key&gt;</code> with the name of the field that is designated as the partition key.</p>

</div>

```python
res = client.search(
    collection_name=COLLECTION_NAME,
    data=[data_rows[0]['title_vector']],
    filter='claps > 30 and reading_time < 10',
    limit=3,
    output_fields=["title", "reading_time", "claps"],
    search_params={"metric_type": "L2", "params": {}}
)

print(result)
```

## Use cases

To achieve better search performance and enable multi-tenancy, you can utilize the partition key feature. This can be done by assigning a tenant-specific value as the partition key field for each entity. When searching or querying the collection, you can filter entities by the tenant-specific value by including the partition key field in the boolean expression. This approach ensures data isolation by tenants and avoids scanning unnecessary partitions.

