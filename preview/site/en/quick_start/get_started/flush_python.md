---
id: flush_python.md
---

# Data Flushing

When performing operations that change data, you can flush the data in the collection from memory to make the data available. Milvus also performs an automatic flush. The automatic flush function flushes all existing collection data every a fixed interval (1 second).

```python
>>> milvus.flush(collection_name_array=['test01'])
```