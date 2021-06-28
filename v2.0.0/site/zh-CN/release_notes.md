---
id: release_notes.md
title: 发版说明
---

# 发版说明

## v2.0.0-RC1

发布时间：2021-06-28

### 版本兼容


| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :------------- | :----------------- | :--------------- | :------------- |
| 2.0.0-RC1         | 2.0.0-RC1              | 即将上线            | 即将上线          |


Milvus 2.0.0-RC1 是 2.0.0 的预览版本。 该版本引入 Go 语言搭建分布式系统，并采用了新的云原生分布式设计。 后者大大提高了系统扩展性和系统弹性。

### 系统架构

Milvus 2.0 是一款云原生向量数据库，采用存储与计算分离的架构设计。该重构版本的所有组件均为无状态组件，极大地增强了系统弹性和灵活性。

整个系统分为四个层面：

- 接入层（Access Layer）
- 协调服务（Coordinator Service）
- 执行节点（Worker Node）
- 存储服务 （Storage）

**接入层Access Layer**：系统的门面，包含了一组对等的 proxy 节点。接入层是暴露给用户的统一 endpoint，负责转发请求并收集执行结果。

**协调服务（Coordinator Service）**：系统的大脑，负责分配任务给执行节点。总共有四类协调者角色，分别为 root 协调者、data 协调者、query 协调者和 index 协调者。

**执行节点（Worker Node）**： 系统的四肢。执行节点只负责被动执行协调服务发起的读写请求。目前有三类执行节点，即 data 节点、query 节点和 index 节点。

**存储服务（Storage）**： 系统的骨骼，是所有其他功能实现的基础。Milvus 依赖三类存储：元数据存储、消息存储（Log Broker）和对象存储。


### 新增功能

**SDK**

- PyMilvus-ORM

  PyMilvus-ORM API 直接在 collection、partion 和 index 对象上进行操作。用户可专注于搭建业务数据模型，而不必担心具体实现。

**核心功能**

- 标量和向量数据混合查询

  Milvus 2.0 支持存储标量数据。支持使用大于、小于、等于、NOT、IN、AND、OR 等运算符在向量搜索之前进行标量过滤。 当前支持的数据类型包括 bool、int8、int16、int32、int64、float 和 double。 后期版本将逐步支持字符串和 VARBINARY 数据类型。

- 匹配查询（Match Query）

  与返回相似结果的搜索操作不同，匹配查询操作返回完全匹配表达式的对象，可用于按 ID 或按搜索条件查询向量。

- 多一致性

- 分布式数据库需在一致性与可用性以及一致性与延迟之间进行权衡。 Milvus 提供四种一致性级别，从强到弱分别为：强一致性(Strong)、有界一致性(Bounded Staleness)、会话一致性(Session) 、前缀一致性（Consistent Prefix)。 用户可以通过指定时间戳自定义读取一致性。 一般情况下，一致性级别越弱，可用性越高，性能也越好。

- 时间旅行（Time Travel）

  通过时间旅行可以访问指定时间段内任意时刻的历史数据。用户可使用该功能查询、恢复和备份历史数据。

**其他**

- 支持基于 helm 和 docker-compose 一键部署 Milvus 2.0。

- 使用 Prometheus 和 Grafana 实现数据监测和报警功能。

- Milvus Insight

  Milvus Insight 是 Milvus 图形化管理工具，包含了集群状态可视化、元数据管理、数据查询等实用功能。Milvus Insight 源码未来也会作为独立项目开源。

### 不兼容改动

Milvus 2.0 使用的编程语言、数据格式以及分布式架构都与之前的版本完全不同，这意味着不能从之前的 Milvus 版本升级到 2.x 版本。不过，Milvus 1.x 是长期支持版本（LTS），相关的数据迁移工具将尽快上线。

具体改动如下：

- 暂不支持 JAVA、Go 和 C++ SDK。

- 暂不支持删除和更新操作。

- PyMilvus-ORM 不支持 force flush。

- 数据格式与之前版本不兼容。

- 废弃 Mishards —— Milvus 2.0 为分布式架构，无需分片中间件。

- 暂不支持本地文件存储和分布式系统存储。
