---
id: operational_faq.md
title: Operational FAQ
---

# 操作常见问题

<!-- TOC -->

<!-- /TOC -->

#### 安装 Milvus 时，从 Docker Hub 拉取镜像失败怎么办？

如果无法从 Docker Hub 拉取镜像，可以尝试添加其它的镜像源。

中国大陆用户可以在文件 **/etc/docker/daemon.json** 中的 registry-mirrors 组添加国内镜像源地址 "https://registry.docker-cn.com" 。

```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```
 
#### Milvus 只能使用 Docker 部署吗？

使用 Docker 能高效部署 Milvus，但并不是唯一方式。Milvus 也支持从源码编译安装，但该方法仅支持 Ubuntu 系统（内核版本 18.04 或以上）和 CentOS 系统（内核版本 7 或以上）。详见 [从源代码编译 Milvus]()。

#### 召回率主要受哪些因素影响？

召回率主要受索引类型和查询参数影响。

对于 FLAT 索引，Milvus 会在 collection 内做全量搜索，召回率为 100%。

对于 IVF 索引，nprobe 参数决定了搜索范围——nprobe 越大，搜索的数据比例越高，召回率也就越高，但查询性能会相应降低。

对于 HNSW 索引，ef 参数决定了导航图搜索的广度——ef 越大，图上扫描到的结点越多，召回率也就越高，但查询性能会相应降低。

详见 [Milvus 索引类型](https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing)。

#### 为什么配置文件更新后没有生效？

Milvus v2.0 暂不支持运行时动态修改配置文件。配置文件更新后，必须重启 Milvus Docker 让修改生效。 

#### 如何得知我的 Milvus 已经成功启动？

如果通过 Docker Compose 启动 Milvus 服务，可运行 docker ps 命令观察运行中的 Docker 容器数量，以此判断 Milvus 服务是否已经启动。

- 对于单机版 Milvus ，应至少有三个 Docker 容器正在运行，其中一个是 Milvus 服务，其余两个是 etcd 管理和存储服务。详见 [安装单机版 Milvus]()。
- 对于分布式 Milvus ，应至少有 12 个 Docker 容器正在运行，其中 9 个是 Milvus 服务，其余三个是基础服务。详见 [安装分布式 Milvus]()。

#### 为什么日志文件时间与系统时间不一致？

日志文件时间与系统时间不一致通常是因为主机未使用 UTC 时间。

Docker 镜像内部的日志文件默认使用 UTC 时间。因此，如果主机未使用 UTC 时间，就会出现日志文件时间与系统时间不一致的情况。

#### 如何确认我的 CPU 支持 Milvus？

[fragment] 详见 [CPU 对 SIMD 指令集的支持]()。

#### 为什么 Milvus 在启动时返回 Illegal instruction？

要保证 Milvus 的正常运行，你的 CPU 须支持以下至少一种 SIMD 指令集种：SSE4.2、AVX、AVX2 和 AVX512。如果 Milvus 在启动时返回 Illegal instruction ，说明当前 CPU 不支持以上任何一种指令集。

详见 [CPU 对 SIMD 指令集的支持]()。

#### 可以在 Windows 上安装 Milvus 吗？

如果使用 Docker 部署 Milvus，目前仅支持在 [Windows Docker Desktop WSL 2 backend](https://docs.docker.com/docker-for-windows/wsl/) 上进行部署。

暂不支持在 Windows 或 macOS 系统上以源码编译部署 Milvus，目前仅支持在 Ubuntu 系统（内核版本 18.04 或以上）或 CentOS 系统（内核版本 7 或以上）上以源码编译部署 Milvus。

#### 在 Windows 安装 PyMilvus 报错，如何解决？

不建议在 Windows 安装 pymilvus。可以尝试在 Conda 环境下安装。

#### 能否在内网离线环境中部署 Milvus 服务？

Milvus 可以通过 Docker 镜像的形式进行离线部署以单机版 Milvus 为例:

1. 在有网的环境中拉取 MinIO、etcd 及 Milvus 的Docker 镜像；
2. 运行 docker save 命令将各个镜像保存为 **.TAR** 文件；
3. 将 .**TAR** 文件保存至本地；
4. 运行 docker load 命令将该文件导入为镜像；
5. 运行 docker-compose 命令启动 Milvus 服务。

更多 Docker 相关内容，详见 [安装单机版 Milvus]()。

#### 仍有问题没有得到解答？

如果仍有其他问题，你可以：

- 访问我们的 [GitHub](https://github.com/milvus-io/milvus/issues)，与我们分享你的问题和想法，或帮助其他用户。
- 加入我们的 [Slack 社区](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)，参与开源社区的讨论交流。
