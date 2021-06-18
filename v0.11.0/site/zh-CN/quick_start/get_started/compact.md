---
id: compact.md
---


# 数据段整理

数据段是 Milvus 自动将插入的向量数据合并所获得的数据文件。一个集合可包含多个数据段。如果一个数据段中的向量数据被删除，被删除的向量数据占据的空间并不会自动释放。你可以对集合中的数据段进行 compact 操作以释放多余空间。


<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

```python
>>> client.compact('demo_films')
```
</div>

<div class="filter-Java" markdown="block">

```java
client.compact('demo_films');
```
</div>