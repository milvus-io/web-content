---
id: main_components.md
---

# 主要组件

Milvus 支持两种部署模式，单机模式（standalone）和分布式模式（cluster）。两种模式具备完全相同的能力，用户可以根据数据规模、访问量等因素选择适合自己的模式。Standalone 模式部署的 Milvus 暂时不支持在线升级为 cluster 模式。

## 单机版 Milvus

**单机版 Milvus** 包括三个组件：

- **Milvus** 负责提供系统的核心功能。

- **Etcd** 是元数据引擎，用于管理 Milvus 内部组件的元数据访问和存储，例如 proxy、index node 等。 

- **MinIO** 是存储引擎，负责维护 Milvus 的数据持久化。

![Standalone_architecture](../../../../assets/standalone_architecture.jpg)

## 分布式版 Milvus

**分布式版 Milvus** 由八个微服务组件和三个第三方依赖组成，每个微服务组件可使用 Kubernetes 独立部署。

### **微服务组件**

- Root coord
- Proxy 
- Query coord 
- Query node 
- Index coord 
- Index node 
- Data coord 
- Data node

### **第三方依赖**

- **etcd** 负责存储集群中各组件的元数据信息。

- **MinIO** 负责处理集群中大型文件的数据持久化，如索引文件和全二进制日志文件。

- **Pulsar** 负责管理近期更改操作的日志，输出流式日志及提供日志订阅服务。

![Distributed_architecture](../../../../assets/distributed_architecture.jpg)




更多 Milvus 架构细节，参考 [存储计算分离](four_layers.md)。
