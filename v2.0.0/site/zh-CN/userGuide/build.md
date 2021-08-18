---
id: build.md
title: 创建索引
---

# 创建索引
为提高向量搜索的效率，你可以为 collection 中的某一列 Field 创建索引。具体索引参数设置详见[向量索引](index.md)。

1. 准备相关参数：
```
>>> index_param = {
        "metric_type":"L2",
        "index_type":"IVF_FLAT",
        "params":{"nlist":1024}
    }
```

2. 创建索引：
```
>>> collection.create_index(field_name=field_name, index_params=index_param)
Status(code=0, message='')
```

3. 调用 `describe_index()` 查看创建的索引相关信息：
```
>>> collection.index().params
{'metric_type': 'L2', 'index_type': 'IVF_FLAT', 'params': {'nlist': 1024}}
```