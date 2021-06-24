---
id: glossary.md
title: 术语表
---

# 术语表

## 单机部署
一种 Milvus 的部署方式。在单机部署模式下，数据插入、索引构建、近似搜索等所有操作都在一个进程中完成。

## 集群部署
一种 Milvus 的部署方式。在集群部署模式下，Milvus 服务由一组节点共同提供，可实现高可用和易扩展。

## Collection
包含一组 entity，可以等价于关系型数据库系统（RDBMS）中的表。

## Partition
把 collection 中的数据根据一定规则在物理存储上分成多个部分。这种对 collection 数据的划分就叫分区（partitioning）。每个 partition 可包含多个segment。

## Sharding
Shard 是指将数据写入操作分散到不同节点上，使 Milvus 能充分利用集群的并行计算能力进行写入。默认情况下单个 collection 包含 2 个分片（shard）。目前 Milvus 采用基于主键哈希的分片方式，未来将支持随机分片、自定义分片等更加灵活的分片方式。

> Partition 的意义在于通过划定分区减少数据读取，而shard 的意义在于多台机器上并行写入操作。

## Segment
Milvus 在数据插入时通过合并数据自动创建的数据文件。一个 collection 可以包含多个 segment。一个 segment 可以包含多个 entity。在搜索中，Milvus 会搜索每个 segment，并返回合并后的结果。

## Entity
包含一组 field。field 与实际对象相对应。field 可以是代表对象属性的结构化数据，也可以是代表对象特征的向量。Row ID 是用于指代一个 entity 的唯一值。

> 你可以自定义 row ID，否则 Milvus 将会自动生成 row ID。请注意，目前 Milvus 不支持 ID 去重，因此有可能在一个 collection 内出现 ID 相同的 entity。

## Field
Entity 的组成部分。Field 可以是结构化数据，例如数字和字符串，也可以是向量。

<div class="alert note">
Milvus 2.0 现已支持标量字段过滤。
</div>
 
## 向量
一种类型的 field，代表对象的特征。非结构化数据可以通过各种 AI 模型和 embedding 技术转化为向量。

> 目前，一个实体最多只能包含一个向量。

## 索引
索引基于原始数据构建，可以提高对 collection 数据搜索的速度。Milvus 支持多种[索引类型](index.md)。

## 归一化
归一化指的是通过数学变换将向量的模长变为 1 的过程。如需使用点积计算向量相似度，则必须对向量作归一化处理。处理后点积与余弦相似度等价。

 