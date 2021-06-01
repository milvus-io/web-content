---
id: product_faq.md
title: Product FAQ
sidebar_label: Product FAQ
---

# 产品常见问题


<!-- TOC -->



<!-- /TOC -->

#### Milvus 会收费吗？

Milvus 会坚持开源路线，软件本身不会收取任何费用。

请遵循 [Apache 2.0 协议](http://www.apache.org/licenses/LICENSE-2.0) 使用 Milvus 开源项目。

对于不愿意自行搭建和维护 Milvus 分布式实例的用户，Zilliz 也提供全托管式平台 [Zilliz Cloud](https://zilliz.com/cloud)，允许用户根据实际使用服务付费，数据可靠性由云平台负责管理。

#### Milvus 支持非 x86 平台吗？

Milvus 暂不支持非 x86 平台。

为保证 Milvus 的正常运行，你的 CPU 须支持以下任一指令集：SSE4.2、AVX、AVX2、AVX512。这些均为 x86 平台专用的 SIMD 指令集。

#### Milvus 可以处理百亿或千亿级数据吗？

理论上来说，Milvus 能够处理的数据规模取决于用户自身的硬件条件，其中有两大关键指标，即系统内存容量和持久化存储空间容量。

- 执行查询操作前，Milvus 需先将所有指定的 collection 或 partition 加载到内存。因此，内存容量决定了 Milvus 可查询数据的上限。
- 执行插入操作时，Milvus 需先将所有的 entity 以及 collection 相关的 schema （当前仅支持 MinIO 作为持久化存储）全部写入持久化存储。因此，持久化存储空间的容量决定了 Milvus 可插入数据的上限。

 

#### Milvus 数据存储在哪里？

Milvus 包含两部分数据：用户插入的数据和元数据。

用户插入的数据以增量日志的方式存储在持久化存储上（当前仅支持 MinIO 作为持久化存储），包括向量数据、标量数据以及 collection 相关 schema 等。

每个 Milvus 模块都会产生各自的元数据，存储在 etcd 中。

 

#### 为什么我在 etcd 找不到向量数据？

etcd 只用于存放 Milvus 系统的元数据，entity 存储在 MinIO 中。

 

#### Milvus 的 Python SDK 有连接池吗？

Milvus v0.9.0 及更高版本对应的 Python SDK 有连接池。连接池的连接数量没有上限。

 

#### Milvus 是否支持 “边插入边查询” ？

支持。插入操作和查询操作由两个相互独立的模块分开执行，因此互不影响。对于客户端，插入数据进入消息队列即意味着该插入操作结束，尽管此时的数据可能还无法被查询到。只有加载到 query node 的数据才能被用户查询到。若插入的 segment 的大小未满足构建索引的阈值（默认值为 512 MB），Milvus 将使用暴搜，这种情况下的查询性能会受到一定影响。

#### Milvus 允许插入重复 ID 的向量吗？

允许，Milvus 不会对向量 ID 进行去重。

#### 如果插入重复 ID 的向量，Milvus 是否会将其作为数据更新处理？

不会。首先，Milvus 暂不支持向量数据更新操作；其次，Milvus 系统不会对 entity ID 做去重检查。你需要自行确保 entity ID 的唯一性，否则可能会出现多条 entity 对应同一个 ID 的情况。

这可能会导致查询返回多个重复 ID 的结果，造成混淆。

 

#### Milvus 中自定义 ID 有没有长度限制？

Entity ID 必须是非负的 64 位整型。

 

#### Milvus 中单次插入数据有上限吗？

因 gRPC 限制，单次插入数据不能超过 1024MB。

 

#### 搜索指定 partition 时，如果所在的 collection 大小发生变化，是否对查询性能有影响？

不会。如果你在搜索时指定了 partition，Milvus 只会在相应 partition 进行搜索。

 

#### 如果已指定仅搜索部分 partition，Milvus 会将整个 collection 的数据加载到内存吗？

不会。查询前需先保证数据已加载到内存。

- 如果明确知道当前数据所在 partition，可直接调用 load_partition() 方法加载指定 partition 的数据，然后调用 search() 方法并指定该 partition。
- 如果不确定数据所在 partition，那么在调用 search() 方法前需先调用 load_collection() 方法。
- 如果未在查询前加载 collection 或 partition 数据，Milvus 会报错。

#### Milvus 支持在同一 collection 的同一字段上创建多个不同索引吗？

支持。Milvus 支持在 collection 中的同一字段上创建多个索引，但必须给每个索引指定 collection 内唯一的索引名。如果出现索引重名的情况，后建的索引会覆盖之前构建的同名索引。调用 load_index() 方法可加载指定索引 ，在该索引上进行查询操作。

 

#### Milvus 支持新增向量后再建索引吗？

支持。调用 create_index() 方法后，Milvus 会为后续新增向量自动构建索引的任务。每当新增数据量达到一个完整的 segment 时即触发这一任务，Milvus 为新插入的向量构建索引。

新增向量的索引文件与前期构建的索引文件相互独立。

 

#### IVF_SQ8 索引和 IVF_SQ8H 索引在召回率上有区别吗?

对于相同的数据集，IVF_SQ8 和 IVF_SQ8H 的召回率一致。

 

#### Milvus 中 FLAT 索引和 IVF_FLAT 索引的原理比较？

IVF_FLAT 索引将向量空间分成 nlist 个聚类单元。假设以默认值 nlist = 16,384 搜索，Milvus 会先比较这 16,384 个单元的中心与目标向量之间的距离，得出最近的 nprobe 个单元，接着比较这些单元内所有向量距离，得到最接近的向量。

FLAT 则计算每条向量和目标向量之间的距离。

当向量总条数约等于 nlist 时，两者的计算量相当，无明显性能差距。然而，随着向量条数达到 nlist 的 2 倍、3 倍、n 倍之后，IVF_FLAT 的性能优势就越来越突出。

可参阅 [如何选择索引类型](https://milvus.io/cn/blogs/2019-12-03-select-index.md)。

 

#### Milvus 的数据落盘逻辑是怎样的？

新增数据写入消息队列后，Milvus 即返回插入成功，表示当前插入操作已经结束，但是此时数据并未落盘。Milvus 系统的 data node 负责将消息队列中的数据以增量日志的方式写入持久化存储；如果调用 flush() 方法，也会迫使 data node 立刻将当前消息队列的所有数据写入持久化存储。

 

#### 什么是归一化？Milvus 中为什么有时候需要归一化？

归一化指通过数学变换将向量的模长变为 1 的过程。如需使用点积计算向量相似度，则必须对向量作归一化处理。处理后点积与余弦相似度等价。

可参阅文章 [向量搜索的简明数学基础](https://zhuanlan.zhihu.com/p/88117781)。

 

#### 为什么欧氏距离和内积在计算向量相似度时的结果不一致？

根据数学原理，对于已经归一化的向量数据，用欧氏距离和内积分别计算向量相似度，其返回的结果是一致的。

如果用欧氏距离和内积计算向量相似度返回的结果不一致，需要检查向量数据是否已经归一化。

#### Milvus 对 collection 和 partition 的总数有限制吗？

Milvus 对 collection 数量没有限制，但每个 collection 内的 partition 数量不能超过参数 master.maxPartitionNum 所设定的值。

 

#### 为什么搜索 topk 条向量，但召回结果不足 k 条向量？

在 Milvus 支持的索引类型中，IVF_FLAT 和 IVF_SQ8 是基于 k-means 空间划分的分单元搜索算法。空间被分为 nlist 个单元，导入的向量被分配存储在基于 nlist 划分的文件结构中。Milvus 计算出距离最近的 nprobe 个单元，比较目标向量与选定单元中所有向量之间的距离，以返回最终结果。

如果 nlist 和 topk 比较大，而 nprobe 又足够小，就有可能出现 nprobe 个单元中的所有向量总数小于 k 的情况，导致返回结果不足 k 条向量。

想要避免这种情况，可以尝试将 nprobe 设置为更大值，或者把 nlist 和 k 设置为更小值。

详见 索引类型。

#### Milvus 支持的向量维度的最大值是多少？

Milvus 最多支持 32,768 维向量。

#### 仍有问题没有得到解答？

如果仍有其他问题，你可以：

- 访问我们的 [GitHub 主页](https://github.com/milvus-io/milvus/issues)，与我们分享你的问题和想法，或帮助其他用户。
- 加入我们的 [Slack 社区](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)，参与开源社区的讨论交流。
