---
id: glossary.md
---

# 术语表

## Binlog

A binlog is a binary log, or a smaller unit in segment, that records and handles the updates and changes made to data in the Milvus vector database. Data from a segment is persisted in multiple binlogs. There are three types of binlogs in Milvus: InsertBinlog, DeleteBinlog, and DDLBinlog.

## Collection
包含一组 entity，可以等价于关系型数据库系统（RDBMS）中的表。

## Dependency

依赖是另一个程序赖以工作的程序。Milvus 的依赖包括 etcd (存储元数据)、MinIO 或 S3 (对象存储) 和 Pulsar( 管理快照日志)。

## Entity
包含一组 field。field 与实际对象相对应。field 可以是代表对象属性的结构化数据，也可以是代表对象特征的向量。primary key 是用于指代一个 entity 的唯一值。

<div class="alert note">
你可以自定义 primary key，否则 Milvus 将会自动生成 primary key。请注意，目前 Milvus 不支持 primary key 去重，因此有可能在一个 collection 内出现 primary key 相同的 entity。
</div>

## Field
Entity 的组成部分。Field 可以是结构化数据，例如数字和字符串，也可以是向量。

<div class="alert note">
Milvus 2.0 现已支持标量字段过滤。
</div>

## Partition
分区是集合的一个分区。Milvus 支持将收集数据划分为物理存储上的多个部分。这个过程称为分区，每个分区可以包含多个段。

## PChannel
PChannel 表示物理信道。每个 PChannel 对应一个日志存储主题。默认情况下，将分配一组 256 个 PChannels 来存储记录 Milvus 集群启动时数据插入、删除和更新的日志。

## Schema
模式是定义数据类型和数据属性的元信息。每个集合都有自己的集合模式，该模式定义了集合的所有字段、自动ID (主键) 分配支持以及集合描述。集合模式中还包括定义字段名称、数据类型和其他属性的字段模式。

## Segment
Milvus 在数据插入时通过合并数据自动创建的数据文件。一个 collection 可以包含多个 segment。一个 segment 可以包含多个 entity。在搜索中，Milvus 会搜索每个 segment，并返回合并后的结果。

## Sharding
Shard 是指将数据写入操作分散到不同节点上，使 Milvus 能充分利用集群的并行计算能力进行写入。默认情况下单个 collection 包含 2 个分片（shard）。目前 Milvus 采用基于主键哈希的分片方式，未来将支持随机分片、自定义分片等更加灵活的分片方式。

<div class="alert note">
Partition 的意义在于通过划定分区减少数据读取，而shard 的意义在于多台机器上并行写入操作。
</div>

## VChannel
VChannel 表示逻辑通道。每个集合将分配一组 VChannels，用于记录数据的插入、删除和更新。VChannels 在逻辑上是分开的，但在物理上共享资源。


## 单机部署
一种 Milvus 的部署方式。在单机部署模式下，数据插入、索引构建、近似搜索等所有操作都在一个进程中完成。

## 分布式部署
一种 Milvus 的部署方式。在分布式部署模式下，Milvus 服务由一组节点共同提供，可实现高可用和易扩展。

## 非结构化数据
非结构化数据，包括图像、视频、音频和自然语言，是不遵循预定义模型或组织方式的信息。这种数据类型约占全球数据的 80%，可以通过各种人工智能 (AI) 和机器学习 (ML) 模型转换为矢量。

## 归一化
归一化指的是通过数学变换将向量的模长变为 1 的过程。如需使用点积计算向量相似度，则必须对向量作归一化处理。处理后点积与余弦相似度等价。

## 日志代理
日志代理是一个支持回放的发布-订阅系统。它负责流数据持久化、可靠异步查询的执行、事件通知和查询结果的返回。当工作节点从系统崩溃中恢复时，它还确保增量数据的完整性。

## 日志订阅者
日志订阅方通过订阅日志序列来更新本地数据，并以只读副本的形式提供服务。

## 日志序列
日志序列记录了在 Milvus 中更改集合状态的所有操作。


## 索引
索引基于原始数据构建，可以提高对 collection 数据搜索的速度。Milvus 支持多种[索引类型](index.md)。


## 向量
向量是非结构化数据的特征抽象，比如电子邮件、物联网传感器数据、Instagram 照片、蛋白质结构等等。从数学上讲，向量是一个浮点数或二进制数组。现代嵌入技术将非结构化数据转化为向量。

## 向量相似性搜索
向量相似度搜索是将一个向量与数据库进行比较，找出与目标搜索向量最相似的向量的过程。近似最近邻 (ANN) 搜索算法用于计算向量之间的相似度。
