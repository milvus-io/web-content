---
id: four_layers.md
title: 存储/计算
---

# 存储/计算分离

从架构上来看，Milvus 遵循数据流和控制流分离，整体分为了四个层次，分别为接入层（access layer）、协调服务（coordinator service）、执行节点（worker node）和存储层（storage）。各个层次相互独立，独立扩展和容灾。

## **接入层**

接入层由一组无状态 proxy 组成，是整个系统的门面，对外提供用户连接的 endpoint。接入层负责验证客户端请求并减少返回结果。

- Proxy 本身是无状态的，一般通过负载均衡组件（Nginx、Kubernetes Ingress、NodePort、LVS）对外提供统一的访问地址并提供服务。
- 由于 Milvus 采用大规模并行处理（MPP）架构，proxy 会先对执行节点返回的中间结果进行全局聚合和后处理后再返回至客户端。

## **协调服务**

协调服务是系统的大脑，负责向执行节点分配任务。它承担的任务包括集群拓扑节点管理、负载均衡、时间戳生成、数据声明和数据管理等。

协调服务共有四种角色：

### Root coordinator（root coord）

负责处理数据定义语言（DDL）和数据控制语言（DCL）请求，比如创建或删除 collection、partition、index 等，同时负责维护中心授时服务 TSO 和时间窗口的推进。

### Query coordinator (query coord）

负责管理 query node 的拓扑结构和负载均衡以及 growing segment 到 sealed segment的切换流程（handoff）。

### Data coordinator (data coord）

负责管理 data node 的拓扑结构，维护数据的元信息以及触发 flush、compact 等后台数据操作。

### Index coordinator (index coord）

负责管理 index node 的拓扑结构，构建索引构和维护索引元信息。

## **执行节点**

执行节点是系统的四肢，负责完成协调服务下发的指令和 proxy 发起的数据操作语言（DML）命令。由于采取了存储计算分离，执行节点是无状态的，可以配合 Kubernetes 快速实现扩缩容和故障恢复。执行节点分为三种角色：

### Query node 

Query node 通过订阅消息存储（log broker）获取增量日志数据并转化为 growing segment，基于对象存储加载历史数据，提供标量+向量的混合查询和搜索功能。

### Data node 

Data node 通过订阅消息存储获取增量日志数据，处理更改请求，并将日志数据打包存储在对象存储上实现日志快照持久化。

### Index node 

Index node 负责执行索引构建任务。Index node不需要常驻于内存，可以通过 serverless 的模式实现。

## **存储服务**

存储服务是系统的骨骼，负责 Milvus 数据的持久化**，**分为元数据存储（meta store）、消息存储（log broker）和对象存储（object storage）三个部分。

### 元数据存储

负责存储元信息的快照，比如 collection schema 信息、节点状态信息、消息消费的 checkpoint 等。元信息存储需要极高的可用性、强一致和事务支持，因此 etcd 是这个场景下的不二选择。除此之外，etcd 还承担了服务注册和健康检查的职责。

### 对象存储

负责存储日志的快照文件、标量/向量索引文件以及查询的中间处理结果。Milvus 采用 MinIO 作为对象存储，另外也支持部署于 AWS S3 和Azure Blob 这两大最广泛使用的低成本存储。但是由于对象存储访问延迟较高，且需要按照查询计费，因此 Milvus 未来计划支持基于内存或 SSD 的缓存池，通过冷热分离的方式提升性能以降低成本。

### 消息存储 

消息存储是一套支持回放的发布订阅系统，用于持久化流式写入的数据，以及可靠的异步执行查询、事件通知和结果返回。执行节点宕机恢复时，通过回放消息存储保证增量数据的完整性。目前分布式 Milvus 依赖 Pulsar 作为消息存储，Milvus standalone 依赖 RocksDB 作为消息存储。消息存储也可以替换为 Kafka、Pravega 等流式存储。

整个 Milvus 围绕日志为核心来设计，遵循**日志即数据**的准则，因此在 2.0 版本中没有维护物理上的表，而是通过日志持久化和日志快照来保证数据的可靠性。

![Log_mechanism](../../../assets/log_mechanism.png)

日志系统作为系统的主干，承担了数据持久化和解耦的作用。通过日志的发布—订阅机制，Milvus 将系统的读、写组件解耦。一个极致简化的模型如上图所示，整个系统主要由两个角⾊构成，分别是消息存储（log broker）（负责维护“日志序列”）与“⽇志订阅者”。其中的“⽇志序列”记录了所有改变库表状态的操作，“日志订阅者”通过订阅日志序列更新本地数据，以只读副本的⽅式提供服务。 发布—订阅机制的出现也给系统预留了很大的拓展空间，便于 change data capture（CDC）、全球部署等功能的拓展。 
