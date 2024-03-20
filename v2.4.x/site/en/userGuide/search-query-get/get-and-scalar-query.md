---
id: get-and-scalar-query.md
order: 3
summary: This guide demonstrates how to get entities by ID and conduct scalar filtering.
---

# Get & Scalar Query

This guide demonstrates how to get entities by ID and conduct scalar filtering. A scalar filtering retrieves entities that match the specified filtering conditions.

## Overview

A scalar query filters entities in a collection based on a defined condition using boolean expressions. The query result is a set of entities that match the defined condition. Unlike a vector search, which identifies the closest vector to a given vector in a collection, queries filter entities based on specific criteria.

On Zilliz Cloud, __a filter is always a string compising field names joined by operators__. In this guide, you will find various filter examples. To learn more about the operator details, go to the [Reference](./get-and-scalar-query#reference-on-scalar-filters) section.

<div class="alert note">

The code snippets on this page use new <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">MilvusClient</a> (Python) to interact with Milvus. New MilvusClient SDKs for other languages will be released in future updates.

</div>

## Preparations

The following steps repurpose the code to connect to a Zilliz Cloud cluster, quickly set up a collection, and insert over 1,000 randomly generated entities into the collection.

### Step 1: Create a collection

```python
from pymilvus import MilvusClient

CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_CLUSTER_TOKEN"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create a collection
client.create_collection(
    collection_name="quick_setup",
    dimension=5,
)
```

### Step 2: Insert randomly generated entities

```python
# 3. Insert randomly generated vectors 
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = [ {
        "id": i, 
        "vector": [ random.uniform(-1, 1) for _ in range(5) ], 
        "color": random.choice(colors), 
        "tag": random.randint(1000, 9999) 
    } for i in range(1000) ]

for i in data:
    i["color_tag"] = "{}_{}".format(i["color"], i["tag"])

print(data[0])

# Output
#
# {
#     "id": 0,
#     "vector": [
#         0.5913205104316952,
#         -0.5474675922381218,
#         0.9433357315736743,
#         0.22479148416151284,
#         0.28294612647978834
#     ],
#     "color": "grey",
#     "tag": 5024,
#     "color_tag": "grey_5024"
# }

# 4. Insert entities to the collection
res = client.insert(
    collection_name="quick_setup",
    data=data
)

print(res)

# Output
#
# {
#     "insert_count": 1000
# }
```

### Step 3: Create partitions and insert more entities

```python
# 5. Create two partitions
client.create_partition(collection_name="quick_setup", partition_name="partitionA")
client.create_partition(collection_name="quick_setup", partition_name="partitionB")

# 6. Insert 500 entities in partition A
data = [ {
        "id": i + 1000, 
        "vector": [ random.uniform(-1, 1) for _ in range(5) ], 
        "color": random.choice(colors), 
        "tag": random.randint(1000, 9999) 
    } for i in range(500) ]

for i in data:
    i["color_tag"] = "{}_{}".format(i["color"], i["tag"])

res = client.insert(
    collection_name="quick_setup",
    data=data,
    partition_name="partitionA"
)

print(res)

# Output
#
# {
#     "insert_count": 500
# }

# 7. Insert 300 entities in partition B
data = [ {
        "id": i + 1500, 
        "vector": [ random.uniform(-1, 1) for _ in range(5) ], 
        "color": random.choice(colors), 
        "tag": random.randint(1000, 9999) 
    } for i in range(300) ]

for i in data:
    i["color_tag"] = "{}_{}".format(i["color"], i["tag"])

res = client.insert(
    collection_name="quick_setup",
    data=data,
    partition_name="partitionB"
)

print(res)

# Output
#
# {
#     "insert_count": 300
# }
```

## Get Entities by ID

If you know the IDs of the entities of your interests, you can use the `get()` method.

```python
# 4. Get entities by ID
res = client.get(
    collection_name="quick_setup",
    ids=[0, 1, 2]
)

print(res)

# Output
#
# [
#     {
#         "id": 0,
#         "vector": [
#             0.68824464,
#             0.6552274,
#             0.33593303,
#             -0.7099536,
#             -0.07070546
#         ],
#         "color_tag": "green_2006",
#         "color": "green"
#     },
#     {
#         "id": 1,
#         "vector": [
#             -0.98531723,
#             0.33456197,
#             0.2844234,
#             0.42886782,
#             0.32753858
#         ],
#         "color_tag": "white_9298",
#         "color": "white"
#     },
#     {
#         "id": 2,
#         "vector": [
#             -0.9886812,
#             -0.44129863,
#             -0.29859528,
#             0.06059075,
#             -0.43817034
#         ],
#         "color_tag": "grey_5312",
#         "color": "grey"
#     }
# ]
```

### Get entities from partitions

You can also get entities from specific partitions.

```python
# 5. Get entities from partitions
res = client.get(
    collection_name="quick_setup",
    ids=[0, 1, 2],
    partition_names=["_default"]
)

print(res)

# Output
#
# [
#     {
#         "color_tag": "green_2006",
#         "color": "green",
#         "id": 0,
#         "vector": [
#             0.68824464,
#             0.6552274,
#             0.33593303,
#             -0.7099536,
#             -0.07070546
#         ]
#     },
#     {
#         "color_tag": "white_9298",
#         "color": "white",
#         "id": 1,
#         "vector": [
#             -0.98531723,
#             0.33456197,
#             0.2844234,
#             0.42886782,
#             0.32753858
#         ]
#     },
#     {
#         "color_tag": "grey_5312",
#         "color": "grey",
#         "id": 2,
#         "vector": [
#             -0.9886812,
#             -0.44129863,
#             -0.29859528,
#             0.06059075,
#             -0.43817034
#         ]
#     }
# ]
```

## Use Basic Operators

In this section, you will find examples of how to use basic operators in scalar filtering. You can apply these filters to [vector searches](./single-vector-search#filtered-search) and [data deletions](./insert-update-delete#delete-entities) too.

- Filter entities with their tag values falling between 1,000 to 1,500.

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter="1000 < tag < 1500",
        output_fields=["color_tag"],
        # highlight-end
        limit=3
    )
    
    # Output
    #
    # 
    ```

- Filter entities with their __color__ values set to __red__.

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter='color == "brown"',
        output_fields=["color_tag"],
        # highlight-end
        limit=3
    )
    
    # Output
    #
    # 
    ```

- Filter entities with their __color__ values not set to __green__ and __purple__.

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter='color not in ["green", "purple"]',
        output_fields=["color_tag"],
        # highlight-end
        limit=3
    )
    
    # Output
    #
    # 
    ```

- Filter articles whose color tags start with __red__.

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter='color_tag like "red%"',
        output_fields=["color_tag"],
        # highlight-end
        limit=3
    )
    
    # Output
    #
    # 
    ```

- Filter entities with their colors set to red and tag values within the range from 1,000 to 1,500.

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter='(color == "red") and (1000 < tag < 1500)',
        output_fields=["color_tag"],
        # highlight-end
        limit=3
    )
    
    # Output
    #
    # 
    ```

## Use Advanced Operators

In this section, you will find examples of how to use advanced operators in scalar filtering. You can apply these filters to [vector searches](./single-vector-search#filtered-search) and [data deletions](./insert-update-delete#delete-entities) too.

### Count entities

- Counts the total number of entities in a collection.

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        output_fields=["count(*)"]
        # highlight-end
    )
    
    # Output
    #
    # 
    ```

- Counts the total number of entities in specific partitions.

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        output_fields=["count(*)"],
        partition_name="partitionA"
        # highlight-end
    )
    
    # Output
    #
    # 
    
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        output_fields=["count(*)"],
        partition_name="partitionB"
        # highlight-end
    )
    
    # Output
    #
    # 
    ```

- Counts the number of entities that match a filtering condition

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter='(publication == "Towards Data Science") and ((claps > 1500 and responses > 15) or (10 < reading_time < 15))',
        output_fields=["count(*)"],
        # highlight-end
    )
    
    # Output
    #
    # 
    ```

## Reference on scalar filters

### Basic Operators

A __boolean expression__ is always __a string comprising field names joined by operators__. In this section, you will learn more about basic operators.

|  __Operator__   |  __Description__                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
|  __add (&&)__   |  True if both operands are true                                                                                                             |
|  __or (\|\|)__  |  True if either operand is true                                                                                                             |
|  __+, -, *, /__ |  Addition, subtraction, multiplication, and division                                                                                        |
|  __**__         |  Exponent                                                                                                                                   |
|  __%__          |  Modulus                                                                                                                                    |
|  __<, >__       |  Less than, greater than                                                                                                                    |
|  __==, !=__     |  Equal to, not equal to                                                                                                                     |
|  __<=, >=__     |  Less than or equal to, greater than or equal to                                                                                            |
|  __not__        |  Reverses the result of a given condition.                                                                                                  |
|  __like__       |  Compares a value to similar values using wildcard operators.<br/> For example, like "prefix%" matches strings that begin with "prefix". |
|  __in__         |  Tests if an expression matches any value in a list of values.                                                                              |

### Advanced operators

- `count(*)`

    Counts the exact number of entities in the collection. Use this as an output field to get the exact number of entities in a collection or partition.

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>This applies to loaded collections. You should use it as the only output field.</p>

    </div>

    