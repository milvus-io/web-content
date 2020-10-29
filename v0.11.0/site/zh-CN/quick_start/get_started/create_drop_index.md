---
id: create_drop_index.md
---

# 创建、删除索引

本页提供创建或删除索引的示例代码。

## 创建索引

目前，一个集合的每个字段只支持一种索引类型，切换索引类型会自动删除旧的索引文件。在创建其它索引前，FLAT 作为集合的默认索引类型。

<div class="alert note">
</div>

1. 准备创建索引所需参数（以向量字段创建索引 IVF_FLAT 为例）。

   <div class="alert note">
   对于不同的索引类型，创建索引所需参数也有区别。所有的索引参数都<b>必须</b>赋值。详细信息请参考 <a href="index.md">Milvus 索引类型</a>。
   </div>

   <div class="filter">
   <a href="#Python">Python</a> <a href="#Java">Java</a>
   </div>
   
   <div class="filter-Python" markdown="block">

   ```python
   # Prepare indexing parameters.
   >>> ivf_param = {"index_type": "IVF_FLAT", "metric_type": "L2", "params": {"nlist": 4096}}
   ```
   </div>
   
   <div class="filter-Java" markdown="block">
   
   ```java
    Index index = Index
        .create(collectionName, "embedding")
        .setIndexType(IndexType.IVF_FLAT)
        .setMetricType(MetricType.L2)
        .setParamsInJson(new JsonBuilder().param("nlist", 100).build());
   ```  
   </div>
   


2. 为指定集合创建索引：

   <div class="filter">
   <a href="#Python">Python</a> <a href="#Java">Java</a>
   </div>
   
   <div class="filter-Python" markdown="block">

   ```python
   # Create an index.
   >>> client.create_index('demo_films', "Vec", ivf_param)
   ```
   </div>
   <div class="filter-Java" markdown="block">

   ```java
   client.createIndex(index);
   ```
   </div>

## 删除索引

删除索引后，向量字段再次使用默认索引类型 FLAT。

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

```python
>>> client.drop_index('demo_films', "Vec")
```
</div>

<div class="filter-Java" markdown="block">

```java
client.dropIndex(collectionName, "embedding");
```
</div>

## 常见问题

<details>
<summary><font color="#4fc4f9">建索引参数 <code>nlist</code> 的大小该如何选择？</font></summary>
该值需要根据具体的使用情况去设置。详见 <a href="tuning.md#索引">性能调优 > 索引</a> 和 <a href="https://www.milvus.io/cn/blogs/2020-2-16-api-setting.md">如何设置 Milvus 参数</a>。
</details>
<details>
<summary><font color="#4fc4f9">Milvus 可以在同一个集合中的不同分区上建立不同索引吗？</font></summary>
不可以。同一个集合在某一刻只能有一种索引。
</details>
<details>
<summary><font color="#4fc4f9">Milvus 中支持新增向量后再建索引吗？</font></summary>
支持。Milvus 中数据是分文件存储的，后续新增向量会存在新的数据文件中。该文件达到一定量后会自动触发建立索引，生成一个新的索引文件，不会影响之前已经建立过的索引。
</details>

