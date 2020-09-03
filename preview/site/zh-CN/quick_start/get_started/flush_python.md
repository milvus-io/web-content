---
id: flush_python.md
---

# 数据落盘

当你在进行有关数据更改的操作时，你可以将 collection 中的数据从内存中进行 flush 操作使数据落盘。Milvus 也会执行自动 flush。自动 flush 会在固定的时间周期（1 秒）将所有现存 collection 的数据进行 flush 操作。

```python
>>> milvus.flush(collection_name_array=['test01'])
```