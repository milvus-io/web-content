---
id: prerequisite-docker.md
label: 使用 Docker Compose 安装
order: 0
group: prerequisite-docker.md
---
# 安装前提



在安装 Milvus 之前，请检查你的硬件和软件是否满足要求。

<div class="tab-wrapper"><a href="prerequisite-docker.md" class='active '>使用 Docker Compose 安装</a><a href="prerequisite-helm.md" class=''>使用 Kubernetes 安装</a></div>

## 硬件要求

|硬件           | 要求                                                  |建议配置| 说明                                                         |
| ------------------- | ------------------------------------------------------------ |--------------| ------------------------------------------------------------ |
| CPU                 | Intel CPU Sandy Bridge 或以上                              |<ul><li>单机版： 8 核或更多</li><li>分布式版： 16 核或更多</li></ul>| 当前版本的 Milvus 不支持 AMD 和 Apple M1 CPU。 |
| CPU 指令集 | <ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul> |<ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul> |  Milvus 中的向量相似度搜索和索引构建需要 CPU 支持单指令多数据 (SIMD) 扩展集。 请确保 CPU 至少支持一个列出的 SIMD 扩展集。 有关更多信息，请参阅 [CPUs with AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX)。                         |
| RAM                 | <ul><li>单机版：16G</li><li>分布式版： 64G</li></ul>       |<ul><li>单机版：32G</li><li>分布式版：128G</li></ul>        | RAM 的大小取决于数据量。                 |
| 硬盘          | SATA 3.0 SSD 或以上                                       |SATA 3.0 SSD 或以上 | 硬盘的大小取决于数据量。          |

## 软件要求

| 操作系统           | 软件                                                     | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| macOS 10.14 或以上       | Docker 桌面版                                               | Docker 虚拟机 (VM) 运行配置至少 2 个虚拟 CPU (vCPU) 和 8 GB 初始内存。否则，安装可能会失败。<br/>有关更多信息，请参阅 [Install Docker Desktop on Mac](https://docs.docker.com/desktop/mac/install/)。|
| Linux 发行版            | <ul><li>Docker 19.03 或以上</li><li>Docker Compose 1.25.1 或以上</li></ul> | 有关更多信息，请参阅 [Install Docker Engine](https://docs.docker.com/engine/install/) 和 [Install Docker Compose](https://docs.docker.com/compose/install/)。|
| 启用 WSL 2 的 Windows | Docker 桌面版                                               | 我们建议你将源代码和其他数据绑定存储到 Linux 文件系统中的 Linux 容器中，而不是 Windows 文件系统。<br/>有关更多信息，请参阅 [Install Docker Desktop on Windows with WSL 2 backend](https://docs.docker.com/desktop/windows/install/#wsl-2-backend)。 |

## 更多内容
- 如果你的硬件和软件满足要求，你可以：
  - [Install Milvus standalone with Docker Compose](install_standalone-docker.md)
  - [Install Milvus cluster with Docker Compose](install_cluster-docker.md)

- 安装 Milvus 时可设置的参数，可以参阅 [系统配置](system_configuration.md)。
