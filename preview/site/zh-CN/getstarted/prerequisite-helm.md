---
id: prerequisite-helm.md
label: 使用 Kubernetes 安装
order: 1
group: prerequisite-docker.md
---
# 安装前提



在安装 Milvus 之前，请检查你的硬件和软件是否满足要求。

<div class="tab-wrapper"><a href="prerequisite-docker.md" class=''>使用 Docker Compose 安装</a><a href="prerequisite-helm.md" class='active '>使用 Kubernetes 安装</a></div>

## 硬件要求

| 硬件           | 要求                                                  |建议配置| 说明                                                         |
| ------------------- | ------------------------------------------------------------ |--------------| ------------------------------------------------------------ |
| CPU                 | Intel CPU Sandy Bridge 或以上                              |<ul><li>单机版：8 核或更多</li><li>分布式版：16 核或更多</li></ul>| 当前版本的 Milvus 不支持 AMD 和 Apple M1 CPU。 |
| CPU 指令集 | <ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul> |<ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul> |  Milvus 中的向量相似度搜索和索引构建需要 CPU 支持单指令多数据 (SIMD) 扩展集。 请确保 CPU 至少支持一个列出的 SIMD 扩展集。 有关更多信息，请参阅 [CPUs with AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX)。                           |
| RAM                 | <ul><li>单机版： 16G</li><li>分布式版： 64G</li></ul>       |<ul><li>单机版： 32G</li><li>分布式版： 128G</li></ul>        | RAM 的大小取决于数据量。                  |
| 硬盘          | SATA 3.0 SSD 或以上                                       |SATA 3.0 SSD 或以上 | 硬盘的大小取决于数据量。           |


## 软件要求

建议你在 Linux 平台上运行 Kubernetes 集群。

kubectl 是 Kubernetes 的命令行工具。使用与集群一个次要版本差异内的 kubectl 版本。使用最新版本的 kubectl 有助于避免不可预见的问题。

在本地运行 Kubernetes 集群时需要安装 minikube。 minikube 需要 Docker 作为依赖项。确保在使用 Helm 安装 Milvus 之前安装 Docker。有关更多信息，请参阅 <a href="https://docs.docker.com/get-docker">Get Docker</a>。



| 操作系统 | 软件                                                     | 说明                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Linux 发行版  | <ul><li>Kubernetes 1.16 或以上</li><li>kubectl</li><li>Helm 3.0.0 或以上</li><li>minikube (Milvus 单机版)</li><li>Docker 19.03 或以上 (Milvus 单机版)</li></ul> | 有关更多信息，请参阅 [Helm Docs](https://helm.sh/docs/)。|

| 软件      | 版本                          |
| -------- | ----------------------------- |
| etcd     | 3.5.0                         |
| MinIO    |  RELEASE.2020-11-06T23-17-07Z |
| Pulsar   | 2.8.2                         |

## 更多内容
- 如果你的硬件和软件满足要求，你可以：
  - [Install Milvus standalone with Docker Compose](install_standalone-docker.md)
  - [Install Milvus cluster with Docker Compose](install_cluster-docker.md)

- 安装 Milvus 时可设置的参数，可以参阅 [系统配置](system_configuration.md)。
