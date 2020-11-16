---
id: flush.md
---

# Data Flushing

When performing operations that change data, you can flush the data in the collection from memory to make the data available. Milvus also performs an automatic flush. The automatic flush function flushes all existing collection data every a fixed interval (1 second).

<div class="filter">
<a href="#Python">Python</a> <a href="#Java">Java</a>
</div>

<div class="filter-Python" markdown="block">

```python
>>> client.flush(collection_name_array=['test01'])
```

<div class="filter-Java" markdown="block">

```java
client.flush('test01');
```
</div>

<div class="alert note">
After calling <code>delete</code>, you can call <code>flush</code> again to ensure that the newly inserted data is visible and the deleted data is no longer recoverable.
</div>

## FAQ

<details>
<summary><font color="#4fc4f9">Why my data cannot be searched immediately after insertion?</font></summary>
This is because the data has not been flushed from memory to disk. To ensure that data can be searched immediately after insertion, you can call <code>flush</code>. However, calling this method too often creates too many small files and affects search speed.
</details>
