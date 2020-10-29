---
id: insert_delete_entity.md
---


# 插入、删除向量

你可以在集合或集合的分区中进行向量操作，本页提供以下内容：

- [在集合中插入向量](#insert-entity-to-collection)
- [在分区中插入向量](#insert-entity-to-partition)
- [通过 ID 删除向量](#delete-entity)


## 在集合中插入向量
<a name="insert-entity-to-collection"></a>

1. 随机生成 10000 个 Entity：

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

   ```python
   >>> import random
   # Generate 10000 entities.
   >>> list_of_int = [random.randint(0, 255) for _ in range(10000)]
   >>> vectors = [[random.random() for _ in range(128)] for _ in range(10000)]
   ```
</div>

<div class="filter-Java" markdown="block">

```java
  private static List<List<Float>> randomFloatVectors() {
    SplittableRandom splitCollectionRandom = new SplittableRandom();
    List<List<Float>> vectors = new ArrayList<>(10000);
    for (int i = 0; i < 10000; ++i) {
      splitCollectionRandom = splitCollectionRandom.split();
      DoubleStream doubleStream = splitCollectionRandom.doubles(128);
      List<Float> vector =
          doubleStream.boxed().map(Double::floatValue).collect(Collectors.toList());
      vectors.add(vector);
    }
    return vectors;
  }
```
</div>

2. 插入向量列表。

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

   ```python
   # Insert embeddings.
   >>> hybrid_entities = [
           {"name": "duration", "values": list_of_int, "type": DataType.INT32},
           {"name": "release_year", "values": list_of_int, "type": DataType.INT64},
           {"name": "embedding", "values": vectors, "type":DataType.FLOAT_VECTOR}
       ]
   >>> client.insert('demo_films', hybrid_entities)
   ```
</div>

<div class="filter-Java" markdown="block">

```java
    /*
     *   Insert three films with their IDs, duration, release year, and fake embeddings into the collection "demo_films".
     */
    List<Long> ids = LongStream.range(0, 10000).boxed().collect(Collectors.toList());
    List<Integer> durations =  /* A list of 1,000 Integers. */
    List<Long> releaseYears =  LongStream.range(0, 10000).boxed().collect(Collectors.toList());
    List<List<Float>> embeddings = randomFloatVectors();

    InsertParam insertParam = InsertParam
        .create(collectionName)
        .addField("duration", DataType.INT32, durations)
        .addField("release_year", DataType.INT64, releaseYears)
        .addVectorField("embedding", DataType.VECTOR_FLOAT, embeddings)
```
</div>


   如果在创建集合时指定`auto_id` 为 `False`, 你也可以自己定义 Entity ID：

   <div class="filter">
   <a href="#Python">Python</a> <a href="#Java">Java</a>
   </div>

   <div class="filter-Python" markdown="block">

   ```python
   >>> entity_ids = [id for id in range(10000)]
   >>> client.insert('demo_films', hybrid_entities, ids=entity_ids)
   ```
   </div>

<div class="filter-Java" markdown="block">

```java
    /*
     *   Insert three films with their IDs, duration, release year, and fake embeddings into the collection "demo_films".
     */
    List<Long> ids = LongStream.range(0, 10000).boxed().collect(Collectors.toList());
    List<Integer> durations =  /* A list of 1,000 Integers. */
    List<Long> releaseYears =  LongStream.range(0, 10000).boxed().collect(Collectors.toList());
    List<List<Float>> embeddings = randomFloatVectors();

    InsertParam insertParam = InsertParam
        .create(collectionName)
        .addField("duration", DataType.INT32, durations)
        .addField("release_year", DataType.INT64, releaseYears)
        .addVectorField("embedding", DataType.VECTOR_FLOAT, embeddings)
        .setEntityIds(ids)
```
</div>

## 在分区中插入向量
<a name="insert-entity-to-partition"></a>

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

```python
>>> client.insert('demo_films', hybrid_entities, partition_tag="American")
```
</div>

<div class="filter-Java" markdown="block">

```java
    /*
     *   Insert three films with their IDs, duration, release year, and fake embeddings into the partition "American".
     */
    List<Long> ids = LongStream.range(0, 10000).boxed().collect(Collectors.toList());
    List<Integer> durations =  /* A list of 1,000 Integers. */
    List<Long> releaseYears =  LongStream.range(0, 10000).boxed().collect(Collectors.toList());
    List<List<Float>> embeddings = randomFloatVectors();

    InsertParam insertParam = InsertParam
        .create(collectionName)
        .addField("duration", DataType.INT32, durations)
        .addField("release_year", DataType.INT64, releaseYears)
        .addVectorField("embedding", DataType.VECTOR_FLOAT, embeddings)
        .setEntityIds(ids)
        .setPartitionTag(partitionTag);
```
</div>

## 通过 ID 删除向量
<a name="delete-entity"></a>

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

假设你的集合中存在以下向量 ID：

```python
>>> ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

你可以通过以下命令删除向量：

```python
>>> client.delete_entity_by_id('demo_films', ids)
```
</div>

<div class="filter-Python" markdown="block">

```java
client.deleteEntityByID(collectionName, ids.subList(0, 10));
```
</div>

<div class="alert note">
在调用 <code>delete</code> 接口后，用户可以选择再调用 <code>flush</code>，保证新增的数据可见，被删除的数据不会再被搜到。
</div>


## 常见问题

<details>
<summary><font color="#4fc4f9">Milvus 中自定义 ID 有没有长度限制？</font></summary>
ID 类型是非负的 64 位整型。
</details>
<details>
<summary><font color="#4fc4f9">Milvus 可以插入重复 ID 的向量吗？</font></summary>
可以，这样在 Milvus 中会存在相同 ID 的多条向量。
</details>
<details>
<summary><font color="#4fc4f9">Milvus 是否支持 “边插入边查询” ？</font></summary>
支持。
</details>
<details>
<summary><font color="#4fc4f9">Milvus 中单次插入数据有上限吗？</font></summary>
单次插入数据不能超过 256 MB。
</details>
