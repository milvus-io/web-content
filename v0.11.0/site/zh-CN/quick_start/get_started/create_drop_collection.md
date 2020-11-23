---
id: create_drop_collection.md
---

# 创建、删除集合

本页提供创建或删除集合的示例代码。

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

<div class="alert note">
参考 <a href="https://github.com/milvus-io/pymilvus/tree/0.3.0/examples">示例程序</a> 获取更详细的使用方式。
</div>
</div>

<div class="filter-Java" markdown="block">
<div class="alert note">
参考 <a href="https://github.com/milvus-io/milvus-sdk-java/tree/0.9.0/examples/src/main/java">示例程序</a> 获取更详细的使用方式。
</div>
</div>


## 创建集合

1. 准备创建集合所需参数：

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
   // We will create a collection with three fields: film duration, release_year and an
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

2. 创建集合名为 `demo_films` 的集合：

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

   ```python
   # Create a collection.
   >>> client.create_collection('demo_films', collection_param)
   ```
</div>

<div class="filter-Java" markdown="block">

```java
client.createCollection(collectionMapping);
```
</div>

## 删除集合

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

```python
# Drop a collection.
>>> client.drop_collection('demo_films')
```
</div>

<div class="filter-Java" markdown="block">

```java
client.dropCollection(collectionName);
```
</div>

## 常见问题

<details>
<summary><font color="#4fc4f9">建立集合后，<code>segment_row_limit</code> 和 <code>metric_type</code> 还支持修改吗？</font></summary>
不支持。
</details>
<details>
<summary><font color="#4fc4f9">Milvus 对集合和分区的总数有限制吗？</font></summary>
有。二者之和不能超过 4,096。
</details>
