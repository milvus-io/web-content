---
id: compact_python.md
---


# 数据段整理

Segment 是 Milvus 自动将插入的向量数据合并所获得的数据文件。一个 collection 可包含多个 segment 。如果一个 segment 中的向量数据被删除，被删除的向量数据占据的空间并不会自动释放。你可以对 collection 中的 segment 进行 compact 操作以释放多余空间。

```python
>>> milvus.compact(collection_name='test01', timeout='1')
```