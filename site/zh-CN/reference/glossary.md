---
id: glossary.md
title: Glossary
sidebar_label: Glossary
---

# 名词解释

## 数据结构

- 集合（Collection）: 包含一组 entity，可以等价于关系型数据库系统（RDBMS）中的表。

- 实体（Entity）: 包含一组 field。field 与实际对象相对应。

- 实体 ID（Entity ID）: 用于指代一个 entity 的唯一值。

    > 注意：目前，Milvus 不支持 ID 去重，有可能在一个 segment 内出现重复 ID。

- 映射（Mapping）: 一系列规则用来定义 collection 如何组织数据。

- 字段（Field）: entity 的组成部分。field 可以是结构化数据，例如数字和字符串；也可以是非结构化数据，例如向量。

- 索引（Index）: 索引基于原始数据构建，可以提高对 collection 数据搜索的速度。

- 段（Segment）: Milvus 在数据插入时通过合并数据自动创建的数据文件。一个 collection 可以包含多个 segment。在搜索中，Milvus 会搜索每个 segment，过滤被删除的数据，并返回合并后的结果。

- 向量（Vector）: 一种类型的 field，代表对象的特征。在 Milvus 中，一个实体只能包含一个向量。一个 segment 可以包含多个向量。向量可以通过特征提取从非结构化数据中得到。

## 操作

- 整合（Compact）: 当数据从 segment 中删除时释放相应空间。

- 删除（Delete）: 从 Milvus 中删除数据。

- 存盘（Flush）: 将数据从内存保存到硬盘以避免数据丢失。

- 插入（Insert）: 数据导入 Milvus 并存储为原始数据文件。

- 合并（Merge）: 自动在后台将小 segment 合并为大 segment 从而提升搜索性能。

- 搜索（Search）: 依据与目标数据的相似度返回数据集中的数据。