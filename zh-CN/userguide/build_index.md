---
id: build-index
title: Build index
sidebar_label: Build index
---

# 创建索引

以下解释是为了说明为什么您需要手动创建索引：

假设您有3.5 GB的向量数据需要插入Milvus以待查询。为了提高查询效率，这些向量通常会被分别存在几个文件中。每个文件的大小由您在设置Milvus里设置的index_building_threshold参数相关。如果index_building_threshold=1 GB，那么这意味着每个文件可以存储1 GB的数据，并自动创建索引。因此，3.5 GB的数据将分布存储在4个文件中。其中3个文件各存有1 GB数据，剩下1个文件存有0.5 GB的数据。只有当文件存满1 GB时才会触发自动创建索引，这意味着存有0.5 GB的那个文件将不会自动创建索引。这种情况下，您就需要手动为这类文件创建索引了。

请参照下列命令为表创建索引：

```
# Build index
>>> milvus.build_index(table_name='test01')
Status(code='0', message='OK!')
```
