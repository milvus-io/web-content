---
id: create_drop_partition.md
---

# 创建、删除分区

本页提供创建或删除分区的 Python 示例代码。

## 创建分区

你可以通过标签将集合分割为若干个分区，从而提高搜索效率。每个分区实际上也是一个集合。

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

## 删除分区

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