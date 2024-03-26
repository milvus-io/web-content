---
id: quickstart.md
summary: Get started with Milvus.
---

# Quickstart

This guide explains how to connect to your Milvus cluster and performs CRUD operations in minutes

## Before you start

- You have installed [Milvus standalone](https://milvus.io/docs/install_standalone-docker.md) or [Milvus cluster](https://milvus.io/docs/install_cluster-milvusoperator.md).

- You have installed preferred SDKs. You can choose among various languages, including [Python](https://milvus.io/docs/install-pymilvus.md), [Java](https://milvus.io/docs/install-java.md), [Go](https://milvus.io/docs/install-go.md), and [Node.js](https://milvus.io/docs/install-node.md).

## Connect to Milvus

Once you have obtained the cluster credentials or an API key, you can use it to connect to your Milvus now.

```python
from pymilvus import MilvusClient, DataType

# 1. Set up a Milvus client
client = MilvusClient(
    uri="http://localhost:19530"
)
```

<div class="alert note">

<p>If you have enabled authentication on your Milvus instance, you should add <code>token</code> as a parameter when initiating MilvusClient and set the value to a colon-separated username and password. To authenticate using the default username and password, set <code>token</code> to <code>root:Milvus</code>.</p>

</div>

## Create a Collection

In Milvus, you need to store your vector embeddings in collections. All vector embeddings stored in a collection share the same dimensionality and distance metric for measuring similarity. You can create a collection in either of the following manners.

### Quick setup

To set up a collection in quick setup mode, you only need to set the collection name and the dimension of the vector field of the collection.

```python
# 2. Create a collection in quick setup mode
client.create_collection(
    collection_name="quick_setup",
    dimension=5
)
```

In the above setup, 

- The primary and vector fields use their default names (__id__ and __vector__).

- The metric type is also set to its default value (__COSINE__).

- The primary field accepts integers and does not automatically increments.

- A reserved JSON field named __$meta__ is used to store non-schema-defined fields and their values.

<div class="admonition note">

<p><b>notes</b></p>

<p>Collections created using the RESTful API supports a minimum of 32-dimensional vector field.</p>

</div>

### Customized setup

To define the collection schema by yourself, use the customized setup. In this manner, you can define the attributes of each field in the collection, including its name, data type, and extra attributes of a specific field.

```python
# 3. Create a collection in customized setup mode

# 3.1. Create schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
)

# 3.2. Add fields to schema
schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)

# 3.3. Prepare index parameters
index_params = client.prepare_index_params()

# 3.4. Add indexes
index_params.add_index(
    field_name="my_id"
)

index_params.add_index(
    field_name="my_vector", 
    index_type="AUTOINDEX",
    metric_type="IP"
)

# 3.5. Create a collection
client.create_collection(
    collection_name="customized_setup",
    schema=schema,
    index_params=index_params
)
```

In the above setup, you have the flexibility to define various aspects of the collection during its creation, including its schema and index parameters.

- __Schema__

    The schema defines the structure of a collection. Except for adding pre-defined fields and setting their attributes as demonstrated above, you have the option of enabling and disabling

    - __AutoID__

        Whether to enable the collection to automatically increment the primary field.

    - __Dynamic Field__

        Whether to use the reserved JSON field __$meta__ to store non-schema-defined fields and their values. 

     For a detailed explanation of the schema, refer to [Schema](schema.md).

- __Index parameters__

    Index parameters dictate how Milvus organizes your data within a collection. You can assign specific indexes to fields by configuring their __metric types__ and __index types__. 

    - For the vector field, you can use __AUTOINDEX__ as the index type and use __COSINE__, __L2__, or __IP__ as the `metric_type`.

    - For scalar fields, including the primary field, Milvus uses __TRIE__ for integers and __STL_SORT__ for strings.

    For additional insights into index types, refer to [Index](index.md).

<div class="admonition note">

<p><b>notes</b></p>

<p>The collection created in the preceding code snippets are automatically loaded. If you prefer not to create an automatically loaded collection, refer to <a href="https://milvus.io/docs/manage-collections.md">Manage Collections</a>.</p>
<p>Collections created using the RESTful API are always automatically loaded.</p>

</div>

## Insert Data

Collections created in either of the preceding ways have been indexed and loaded. Once you are ready, insert some example data.

```python
# 4. Insert data into the collection
# 4.1. Prepare data
data=[
    {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "color": "pink_8682"},
    {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "color": "red_7025"},
    {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "color": "orange_6781"},
    {"id": 3, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "color": "pink_9298"},
    {"id": 4, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "color": "red_4794"},
    {"id": 5, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "color": "yellow_4222"},
    {"id": 6, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "color": "red_9392"},
    {"id": 7, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "color": "grey_8510"},
    {"id": 8, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "color": "white_9381"},
    {"id": 9, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "color": "purple_4976"}
]

# 4.2. Insert data
res = client.insert(
    collection_name="quick_setup",
    data=data
)

print(res)

# Output
#
# {
#     "insert_count": 10,
#     "ids": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# }
```

The provided code assumes that you have created a collection in the __Quick Setup__ manner. As shown in the above code, 

- The data to insert is organized into a list of dictionaries, where each dictionary represents a data record, termed as an entity.

- Each dictionary contains a non-schema-defined field named __color__.

- Each dictionary contains the keys corresponding to both pre-defined and dynamic fields.

<div class="admonition note">

<p><b>notes</b></p>

<p>Collections created using RESTful API enabled AutoID, and therefore you need to skip the primary field in the data to insert.</p>

</div>

### Insert more data

You can safely skip this section if you prefer to search with the inserted 10 entities later. To learn more about the search performance of  Milvus, you are advised use the following code snippet to add more randomly generated entities into the collection.

```python
# 5. Insert more data into the collection
# 5.1. Prepare data

colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = [ {
    "id": i, 
    "vector": [ random.uniform(-1, 1) for _ in range(5) ], 
    "color": f"{random.choice(colors)}_{str(random.randint(1000, 9999))}" 
} for i in range(1000) ]

# 5.2. Insert data
res = client.insert(
    collection_name="quick_setup",
    data=data[10:]
)

print(res)

# Output
#
# {
#     "insert_count": 990
# }
```

<div class="admonition note">

<p><b>notes</b></p>

<p>You can insert a maximum of 100 entities in a batch upon each call to the Insert RESTful API.</p>

</div>

## Similarity Search

You can conduct similarity searches based on one or more vector embeddings.

<div class="admonition note">

<p><b>notes</b></p>

<p>The insert operations are asynchronous, and conducting a search immediately after data insertions may result in empty result set. To avoid this, you are advised to wait for a few seconds.</p>

</div>

### Single-vector search

The value of the __query_vectors__ variable is a list containing a sub-list of floats. The sub-list represents a vector embedding of 5 dimensions. 

```python
# 6. Search with a single vector
# 6.1. Prepare query vectors
query_vectors = [
    [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648]
]

# 6.2. Start search
res = client.search(
    collection_name="quick_setup",     # target collection
    data=query_vectors,                # query vectors
    limit=3,                           # number of returned entities
)

print(res)

# Output
#
# [
#     [
#         {
#             "id": 548,
#             "distance": 0.08589144051074982,
#             "entity": {}
#         },
#         {
#             "id": 736,
#             "distance": 0.07866684347391129,
#             "entity": {}
#         },
#         {
#             "id": 928,
#             "distance": 0.07650312781333923,
#             "entity": {}
#         }
#     ]
# ]

```

The output is a list containing a sub-list of three dictionaries, representing the returned entities with their IDs and distances.

### Bulk-vector search

You can also include multiple vector embeddings in the __query_vectors__ variable to conduct a batch similarity search.

```python
# 7. Search with multiple vectors
# 7.1. Prepare query vectors
query_vectors = [
    [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648],
    [0.0039737443, 0.003020432, -0.0006188639, 0.03913546, -0.00089768134]
]

# 7.2. Start search
res = client.search(
    collection_name="quick_setup",
    data=query_vectors,
    limit=3,
)

print(res)

# Output
#
# [
#     [
#         {
#             "id": 548,
#             "distance": 0.08589144051074982,
#             "entity": {}
#         },
#         {
#             "id": 736,
#             "distance": 0.07866684347391129,
#             "entity": {}
#         },
#         {
#             "id": 928,
#             "distance": 0.07650312781333923,
#             "entity": {}
#         }
#     ],
#     [
#         {
#             "id": 532,
#             "distance": 0.044551681727170944,
#             "entity": {}
#         },
#         {
#             "id": 149,
#             "distance": 0.044386886060237885,
#             "entity": {}
#         },
#         {
#             "id": 271,
#             "distance": 0.0442606583237648,
#             "entity": {}
#         }
#     ]
# ]

```

The output should be a list of two sub-lists, each of which contains three dictionaries, representing the returned entities with their IDs and distances. 

### Filtered searches

- __With schema-defined fields__

    You can also enhance the search result by including a filter and specifying certain output fields in the search request.

    ```python
    # 8. Search with a filter expression using schema-defined fields
    # 1 Prepare query vectors
    query_vectors = [
        [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648]
    ]
    
    # 2. Start search
    res = client.search(
        collection_name="quick_setup",
        data=query_vectors,
        filter="500 < id < 800",
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     [
    #         {
    #             "id": 548,
    #             "distance": 0.08589144051074982,
    #             "entity": {}
    #         },
    #         {
    #             "id": 736,
    #             "distance": 0.07866684347391129,
    #             "entity": {}
    #         },
    #         {
    #             "id": 505,
    #             "distance": 0.0749310627579689,
    #             "entity": {}
    #         }
    #     ]
    # ]
    ```

    The output should be a list containing a sub-list of three dictionaries, each representing a searched entity with its ID, distance, and the specified output fields.

- __With non-schema-defined fields__

    You can also include dynamic fields in a filter expression. In the following code snippet, `color` is a non-schema-defined field. You can include them either as keys in the magic `$meta` field, such as `$meta["color"]`, or directly use it like a schema-defined field, such as `color`.

    ```python
    # 9. Search with a filter expression using custom fields
    # 9.1.Prepare query vectors
    query_vectors = [
        [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648]
    ]
    
    # 9.2.Start search
    res = client.search(
        collection_name="quick_setup",
        data=query_vectors,
        filter='$meta["color"] like "red%"',
        limit=3,
        output_fields=["color"]
    )
    
    print(res)
    
    # Output
    #
    # [
    #     [
    #         {
    #             "id": 240,
    #             "distance": 0.0694073885679245,
    #             "entity": {
    #                 "color": "red_8667"
    #             }
    #         },
    #         {
    #             "id": 581,
    #             "distance": 0.059804242104291916,
    #             "entity": {
    #                 "color": "red_1786"
    #             }
    #         },
    #         {
    #             "id": 372,
    #             "distance": 0.049707964062690735,
    #             "entity": {
    #                 "color": "red_2186"
    #             }
    #         }
    #     ]
    # ]
    
    ```

## Scalar Query

Unlike a vector similarity search, a query retrieves vectors via scalar filtering based on [filter expressions](https://milvus.io/docs/boolean.md).

- __With filter using schema-defined fields__

    ```python
    # 10. Query with a filter expression using a schema-defined field
    res = client.query(
        collection_name="quick_setup",
        filter="10 < id < 15",
        output_fields=["color"]
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "color": "green_7413",
    #         "id": 11
    #     },
    #     {
    #         "color": "orange_1417",
    #         "id": 12
    #     },
    #     {
    #         "color": "orange_6143",
    #         "id": 13
    #     },
    #     {
    #         "color": "white_4084",
    #         "id": 14
    #     }
    # ]
    
    ```

## Get Entities

If you know the IDs of the entities to retrieve, you can get entities by their IDs as follows:

```python
# 12. Get entities by IDs
res = client.get(
    collection_name="quick_setup",
    ids=[1,2,3],
    output_fields=["title", "vector"]
)

print(res)

# Output
#
# [
#     {
#         "id": 1,
#         "vector": [
#             0.19886813,
#             0.060235605,
#             0.6976963,
#             0.26144746,
#             0.8387295
#         ]
#     },
#     {
#         "id": 2,
#         "vector": [
#             0.43742132,
#             -0.55975026,
#             0.6457888,
#             0.7894059,
#             0.20785794
#         ]
#     },
#     {
#         "id": 3,
#         "vector": [
#             0.3172005,
#             0.97190446,
#             -0.36981148,
#             -0.48608947,
#             0.9579189
#         ]
#     }
# ]
```

<div class="admonition note">

<p><b>notes</b></p>

<p>Currently, the RESTful API does not provide a get endpoint.</p>

</div>

## Delete Entities

Milvus allows deleting entities by IDs and by filters.

- __Delete entities by IDs.__

    ```python
    # 13. Delete entities by IDs
    res = client.delete(
        collection_name="quick_setup",
        ids=[0,1,2,3,4]
    )
    
    print(res)
    
    # Output
    #
    # {
    #     "delete_count": 5
    # }
    ```

- __Delete entities by filter__

    ```python
    # 14. Delete entities by a filter expression
    res = client.delete(
        collection_name="quick_setup",
        filter="id in [5,6,7,8,9]"
    )
    
    print(res)
    
    # Output
    #
    # {
    #     "delete_count": 5
    # }
    ```

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>Currently, the delete endpoint of the RESTful API does not support filters.</p>

    </div>

## Drop the collection

The Starter plan allows up to two collections in the serverless cluster. Once you have done this guide, you can drop the collection as follows:

```python
# 15. Drop collection
client.drop_collection(
    collection_name="quick_setup"
)

client.drop_collection(
    collection_name="customized_setup"
)
```

## Recaps

- There are two ways to create a collection. The first is the quick setup, which only requires you to provide a name and the dimension of the vector field. The second is the customized setup, which allows you to customize almost every aspect of the collection.

- The data insertion process may take some time to complete. It is recommended to wait a few seconds after inserting data and before conducting similarity searches.

- Filter expressions can be used in both search and query requests. However, they are mandatory for query requests.

