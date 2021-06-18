---
id: insert_delete_entity.md
---


# Insert and Delete Entities

You can perform vector operations on collections or partitions. This article talks about the following topics:

- [Insert entities to a collection](#insert-entity-to-collection)
- [Insert entities to a partition](#insert-entity-to-partition)
- [Delete entities by ID](#delete-entity)


## Insert entities to a collection
<a name="insert-entity-to-collection"></a>

1. Generate 1,000 random vectors.

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

2. Insert a list of vectors. 

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
    // Insert three films with their IDs, duration, release year, and fake embeddings into the collection "demo_films".
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
   ```

   If `auto_id` is specified as `False` in the collection, you can also specify the entity IDs:

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
    // Insert three films with their IDs, duration, release year, and fake embeddings into the collection "demo_films".
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

## Insert entities to a partition
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
    // Insert three films with their IDs, duration, release year, and fake embeddings into the partition "American".
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

## Delete entities by ID
<a name="delete-entity"></a>

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

Suppose your collection contains the following vector IDs:

```python
>>> ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Run these following command to delete specified embedding vectors:

```python
>>> client.delete_entity_by_id('demo_films', ids)
```
</div>

<div class="filter-Java" markdown="block">

```java
client.deleteEntityByID(collectionName, ids.subList(0, 10));
```
</div>
<div class="alert note">
After calling <code>delete</code>, you can call <code>flush</code> again to ensure that the newly inserted data is visible and the deleted data is no longer recoverable.
</div>



## FAQ

<details>
<summary><font color="#4fc4f9">Is there a length limit on the self-defined entity IDs?</font></summary>
Entity IDs must be non-negative 64-bit integers.
</details>
<details>
<summary><font color="#4fc4f9">Can I insert vectors with existing IDs?</font></summary>
Yes, you can. If you insert vectors with an existing ID, you would end up having duplicate IDs.
</details>
<details>
<summary><font color="#4fc4f9">Does Milvus support inserting while searching?</font></summary>
Yes.
</details>
<details>
<summary><font color="#4fc4f9">Is there a volume limit on the vectors inserted each time?</font></summary>
Vectors inserted each time must not exceed 256 MB.
</details>
