---
id: compact.md
---

# Compact Segments

Milvus automatically merges the inserted vector data to segments. A collection can contain multiple segments. After deleting some vector data in a segment, the system cannot automatically release the space occupied by the deleted vector data. So, you need to compact the segments in the collection to free up extra space.

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

```python
>>> client.compact('test01')
```
</div>

<div class="filter-Java" markdown="block">

```java
client.compact('demo_films');
```
</div>