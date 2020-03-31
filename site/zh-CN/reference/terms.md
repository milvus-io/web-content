---
id: terms.md
title: Milvus 术语
sidebar_label: Milvus 术语
---

# Milvus 术语

- **Collection**: 包含一组 entity，可以等价于关系型数据库系统（RDBMS）中的表。

- **Segment**: Milvus 在数据插入时通过合并数据自动创建的数据文件。一个 collection 可以包含多个 segment。一个 segment 可以包含多个 entity。在搜索中，Milvus 会搜索每个 segment，过滤被删除的数据，并返回合并后的结果。

- **Entity**: 包含一组 field。field 与实际对象相对应。field 可以是代表对象属性的结构化数据，也可以是代表对象特征的向量。

- **Entity ID**: 用于指代一个 entity 的唯一值。
  > 注意：目前，Milvus 不支持 ID 去重，因此有可能在一个 segment 内出现重复 ID。

- **Field**: entity 的组成部分。field 可以是结构化数据，例如数字和字符串，也可以是向量。

- **Vector**: 一种类型的 field，代表对象的特征。
  > 注意：目前，一个实体最多只能包含一个向量。

- **Index**: 索引基于原始数据构建，可以提高对 collection 数据搜索的速度。

- **Mapping**: 一系列规则用来定义 collection 如何组织数据。