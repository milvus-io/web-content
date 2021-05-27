---
id: overview.md
title: Milvus 是什么
---

# Milvus 是什么

Milvus 是一款开源向量数据库，赋能 AI 应用和向量相似度搜索。

## 产品亮点

### 针对万亿级向量的毫秒级搜索

完成万亿条向量数据搜索的平均延迟以毫秒计。

### 简化的非结构化数据管理

一整套专为数据科学工作流设计的 API。

无论是笔记本、本地集群还是云服务器，始终如一的跨平台用户体验。

可以在任何场景下实现实时搜索与分析。

### 稳定可靠的用户体验

Milvus 具有故障转移和故障恢复的机制，即使服务中断，也能确保数据和应用程序的业务连续性。

### 高扩展，超灵活

组件级别的高扩展性，支持精准扩展。

### 广受社区支持和业界认可

Milvus 项目在 GitHub 上获星超 6,000，拥有逾 1,000 家企业用户，还有活跃的开源社区。Milvus 由 [LF AI & DATA 基金会](https://lfaidata.foundation/) 背书，是该基金会的孵化项目。

## 产品路线图

### Milvus 2.0 - 分布式向量数据库 Beta 版本

- 全托管式故障转移和服务发现的高可用系统。
- 支持标量字段过滤和点查询。
- 提供基于对象关系映射（Obejct Relational Mapping）抽象的 API。
- 提供三个级别的一致性，分别是：strong、session、consistent prefix。

### Milvus 2.1 - 支持全套数据操纵语言（Data Manipulation Language）函数的稳定版本

- 支持向量删除与更新。
- 支持字符串和 varbinary 数据类型。
- 基于距离的向量搜索。
- Segment 整理，释放磁盘空间，优化查询性能。
- 集群负载均衡。
- Kubernetes 部署优化资源配置。
- 支持 Apache Spark 和 Apache Flink 连接器等业界主流插件，扩大 Milvus 生态。

### Milvus 2.2 - 云原生的向量数据库

- 添加访问控制，实现多租户场景下的数据安全。
- 支持查询节点隔离，满足部分用户的资源独占需求。
- 支持批量导入，优化数据导入效率。
- 以流量管控和背压为特征的集群保护机制。
- 通过分布式追踪和日志聚合迅速实现故障转移和故障恢复。
- 提供可在笔记本电脑上运行的内嵌式 Milvus，无需更改代码即可轻松部署到云生产环境。
- 通过 Kafta/Pulsar 连接器融合流处理和批处理两种作业方式。
- 多机房多地部署，多云融合。
- 支持数据内存副本，提高可用性，优化计算性能。

### Milvus 长期目标

- 支持跨数据库、数据仓库和数据湖的联合查询。
- 支持回溯（time travel）访问历史数据。
- 冷热数据存储分离，资源配置更高效。
- 增量备份，更加省时、省空间。
- 采用基于代价的优化查询算法，提高查询效率。
- 支持在磁盘上构建索引。
- 支持变更数据捕获，用于数据整合。
- 基于数据导入器、数据转换器提供向量生成服务。

## 加入开发者社区

如果你有任何建议、意见或问题，欢迎加入 Milvus 的 [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) 社区与我们的工程师团队交流，或者你也可以通过 [常见问题](https://milvus.io/cn/docs/v1.1.0/performance_faq.md) 页面提交相关问题。

订阅 Milvus 邮件：

- [Technical Steering Committee](https://lists.lfai.foundation/g/milvus-tsc)
- [Technical Discussions](https://lists.lfai.foundation/g/milvus-technical-discuss)
- [Announcement](https://lists.lfai.foundation/g/milvus-announce)

关注我们的社交媒体：

- [知乎](zhihu.com/org/zilliz-11/columns)
- [CSDN](http://zilliz.blog.csdn.net)
- [Bilibili](http://space.bilibili.com/478166626)
- Zilliz 技术交流微信群
![wechat](../../../assets/wechat_qr_code.jpeg)
###### 如二维码失效，请加zilliz小助手微信：zilliz-tech
