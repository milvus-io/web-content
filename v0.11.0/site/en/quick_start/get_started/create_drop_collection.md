---
id: create_drop_collection.md
---

# Create and Drop a Collection

This article provides Python sample codes for creating or dropping collections.

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

<div class="alert note">
See <a href="https://github.com/milvus-io/pymilvus/tree/0.3.0/examples">example program</a> for more detailed usage.
</div>
</div>

<div class="filter-Java" markdown="block">
<div class="alert note">
See <a href="https://github.com/milvus-io/milvus-sdk-java/tree/0.9.1/examples/src/main/java">example program</a> for more detailed usage.
</div>
</div>


## Create a collection

1. Prepare the parameters needed to create the collection:

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

   ```python
   # Create a collection of 4 fields, where fields A, B, and C are int type fields
   # and Vec is a 128-dimension float vector field.
   # The default value of segment_row_limit is 524288 if not specified.
   # If you set auto_id to True, you have Milvus create entity IDs. 
   >>> collection_param = {
   ...    "fields": [
   ...        {"name": "A", "type": DataType.INT32},
   ...        {"name": "B", "type": DataType.INT32},
   ...        {"name": "C", "type": DataType.INT64},
   ...        {"name": "Vec", "type": DataType.FLOAT_VECTOR, "params": {"dim": 128}}
   ...    ],
   ...    "segment_row_limit": 100000,
   ...    "auto_id": True
   ... }
   ```
</div>

<div class="filter-Java" markdown="block">

```java 
   // Basic create collection:
   // We will create a collection with three fields: film  duration, release_year and an
   // embedding which is essentially a float vector.
   // CollectionMapping will be used to create a collection. When adding vector fields, the
   // dimension must be specified. `auto_id` is set to false so we can provide custom ids.
    final int dimension = 8;
    final String collectionName = "demo_films";
    CollectionMapping collectionMapping = CollectionMapping
        .create(collectionName)
        .addField("duration", DataType.INT32)
        .addField("release_year", DataType.INT64)
        .addVectorField("embedding", DataType.VECTOR_FLOAT, dimension)
        .setParamsInJson("{\"segment_row_limit\": 4096, \"auto_id\": false}");
```
</div>

2. Create a collection with a name `test01`.

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

   ```python
   # Create a collection.
   >>> client.create_collection('test01', collection_param)
   ```
</div>

<div class="filter-Java" markdown="block">

```java
client.createCollection(collectionMapping);
```
</div>

## Drop a collection

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

```python
# Drop a collection.
>>> client.drop_collection('test01')
```
</div>

<div class="filter-Java" markdown="block">

```java
client.dropCollection(collectionName);
```
</div>

## FAQ

<details>
<summary><font color="#4fc4f9">Can I update <code>segment_row_limit</code> and <code>metric_type</code> after creating a collection?</font></summary>
No, you cannot.
</details>
<details>
<summary><font color="#4fc4f9">Is there a limit on the total number of collections and partitions?</font></summary>
Yes. The total number of collections and partitions must not exceed 4,096.
</details>
