---
id: create_drop_partition.md
---

# Create and Drop a Partition

This article provides sample codes for creating or dropping partitions.

## Create a partition

To improve search efficiency, you can divide a collection into several partitions by tags. In fact, each partition is a collection.

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

```python
# Create a partition.
>>> client.create_partition('demo_films', 'American')
```
</div>

<div class="filter-Java" markdown="block">

```java
// Here we create a partition called "American"
// because the films to insert are American films.
final String partitionTag = "American";
client.createPartition(collectionName, partitionTag);
```
</div>

## Drop a partition

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

```python
>>> client.drop_partition(collection_name='demo_films', partition_tag='American')
```
</div>

<div class="filter-Java" markdown="block">

```java
client.dropPartition(collectionName, partitionTag);
```
</div>
