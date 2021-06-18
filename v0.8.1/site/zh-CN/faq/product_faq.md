---
id: product_faq.md
title: Product FAQ
sidebar_label: Product FAQ
---

# 产品常见问题


<!-- TOC -->

- [Milvus 0.7.0 支持旧版本的数据文件吗？](#Milvus-070-支持旧版本的数据文件吗)
- [Milvus 0.7.0 支持旧版本的服务端配置文件吗？](#Milvus-070-支持旧版本的服务端配置文件吗)
- [Milvus 0.7.0 支持基于旧版本的客户端构建的应用吗？](#Milvus-070-支持基于旧版本的客户端构建的应用吗)
- [Milvus 是什么？](#Milvus-是什么)
- [Milvus 适合什么时候使用 ？](#Milvus-适合什么时候使用-)
- [如何使用 Milvus？](#如何使用-Milvus)
- [Milvus 的易用性如何？](#Milvus-的易用性如何)
- [Milvus 具备高可用特性吗？](#Milvus-具备高可用特性吗)
- [Milvus 可以处理百亿或千亿级数据吗？](#Milvus-可以处理百亿或千亿级数据吗)
- [向量存入 Milvus 后如何检索？](#向量存入-Milvus-后如何检索)
- [如何选择向量索引的类型？](#如何选择向量索引的类型)
- [Milvus 是否支持 “边插入边查询” ？](#Milvus-是否支持-边插入边查询-)
- [数据存储在哪里？](#数据存储在哪里)
- [Milvus 与其他向量检索工具对比如何？](#Milvus-与其他向量检索工具对比如何)
- [Milvus 是一款端到端产品吗？](#Milvus-是一款端到端产品吗)
- [仍有问题没有得到解答？](#仍有问题没有得到解答)

<!-- /TOC -->

#### Milvus 0.7.0 支持旧版本的数据文件吗？

不支持。Milvus 0.7.0 无法直接使用旧版本的数据文件。你需要重新导入数据。

#### Milvus 0.7.0 支持旧版本的服务端配置文件吗？

不兼容。Milvus 0.7.0 无法兼容之前版本的服务端配置文件（`server_config.yaml`）。

#### Milvus 0.7.0 支持基于旧版本的客户端构建的应用吗？

不支持。Milvus 0.7.0 的客户端接口已经升级。因此基于旧版本的客户端构建的应用也必须同步升级。

#### Milvus 是什么？

Milvus 是一款开源的、针对海量特征向量的相似性搜索引擎。基于异构众核计算框架设计，成本更低，性能更好。 在有限的计算资源下，十亿向量搜索仅毫秒响应。Milvus 可以很好的运行和部署在 x86 架构的服务器环境和主流的虚拟化环境下，也支持目前主流的网络硬件设备。操作系统方面，Milvus 支持目前主流的 Linux 操作系统环境。

#### Milvus 适合什么时候使用 ？

如果你想要可靠的海量向量相似性检索，以及亿级数据搜索的毫秒级响应，那 Milvus 将是你不二的选择。Milvus 一键安装、配置简易、运行可靠，保证数据准确性的同时，提供超高速的搜索响应。

Milvus 单行读取速度约 0.6 毫秒，单行写入速度在 0.03 毫秒左右。支持多种索引方式，优化了查询性能。Milvus 提供结构化和非结构化数据的混合查询方案。

#### 如何使用 Milvus？

Milvus 提供多种[客户端](../reference/sdk.md)。同时还支持所有基于 gRPC 的通信方式。

#### Milvus 的易用性如何？

Milvus 安装简单，仅需下载相关 docker 镜像文件。易用性强，通过 API 接口即可完成向量插入、删除、检索等操作。若要了解更多，请看 [安装 Milvus](../guides/get_started/install_milvus/install_milvus.md).

想要开启你的第一次向量搜索？请阅读 [运行示例程序](../guides/get_started/example_code.md).

#### Milvus 具备高可用特性吗？

Milvus 支持预写式日志（Write-Ahead Logging，WAL）,可保证数据操作的原子性和持久性。Milvus 集群同样具备高可用性，其存储和计算等集群均容许部分组件失效，而不影响整个集群的使用。若要了解更多，请看 [Milvus 高可用方案](https://github.com/milvus-io/bootcamp/tree/0.5.3/solutions/Milvus_HA)。

#### Milvus 可以处理百亿或千亿级数据吗？

Milvus 提供了集群分片中间件 Mishards，可以实现集群分片部署，满足百亿或者千亿级数据的处理需求。Mishards 还处于试验阶段，不推荐部署到生产环境。详细信息请参考 [Mishards Readme](https://github.com/milvus-io/milvus/blob/0.6.0/shards/README_CN.md)。

#### 向量存入 Milvus 后如何检索？

向量导入 Milvus 后，会被存储并建立索引。Milvus 会给对应向量一个 ID，用户需要自己将该向量 ID 和其对应的其他属性存入另外一个数据库系统。查询的时候，用户提供需要查询的向量，Milvus 会返回和用户提供向量最匹配的数个向量的 ID 以及匹配度。

#### 如何选择向量索引的类型？

请参考 [Milvus 索引类型](../guides/index.md) 获取更详细的信息。

#### Milvus 是否支持 “边插入边查询” ？

支持。 

#### 数据存储在哪里？

向量数据导入 Milvus 后，将自动存储在你的本地磁盘。元数据可以存储在 MySQL 或 SQLite 上。

#### Milvus 与其他向量检索工具对比如何？

与其他向量检索工具对比，Milvus 是其中唯一高性能、易用性强的向量检索引擎，具备高可用、弹性扩展等特性。

#### Milvus 是一款端到端产品吗？

暂时还不是。Milvus 只能接受向量作为输入并通过查询输出向量。你无法使用 Milvus 从非结构化数据中提取向量。

#### 仍有问题没有得到解答？

如果你仍有其它问题，你可以：

- 在 GitHub 上访问 [Milvus](https://github.com/milvus-io/milvus/issues) , 提问，分享交流，帮助其它用户 
- 阅读 [操作常见问题](operational_faq.md)，了解关于 Milvus 操作的常见问题 
- 加入我们的 [Slack 社区](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) ，与其它用户讨论交流

