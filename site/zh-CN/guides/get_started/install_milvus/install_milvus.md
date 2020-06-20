---
id: install_milvus.md
title: Installation Overview
sidebar_label: Installation Overview
---
# 安装概述

Milvus 在 CPU 或 GPU 环境下都可以运行。若要在 CPU 环境下使用 Milvus，请安装仅需 CPU 的 Milvus。否则，建议安装支持 GPU 的 Milvus 以获取针对海量数据的更优的查询性能。

Milvus 中的向量搜索包含但不限于这两个独立的部分：创建索引过程和搜索计算过程。在支持 GPU 的 Milvus中，这两个过程可以同时进行，提高查询效率，特别适合动态增加的数据。而在仅需 CPU 的 Milvus 中，搜索计算必须在创建索引结束后才能进行，所以更适合静态数据。

## 使用 Docker 安装

使用 Docker 启动 Milvus 是最简单且推荐的方法。

- [安装仅需 CPU 的 Milvus](cpu_milvus_docker.md)
- [安装支持 GPU 的 Milvus](gpu_milvus_docker.md)

### 离线传输 Docker 镜像和配置文件

如果你的主机由于网络限制无法在线获得 Docker 镜像和配置文件，请从其他主机在线获取并使用以下方法离线传输。关于如何获取 Docker 镜像请参考具体安装步骤。在这里假设你的镜像标签是 `milvusdb/milvus`。

#### 离线传输 Docker 镜像

1. 将 Docker 镜像保存为 tar 文件再使用合适的方式传输。

    ```shell
    $ docker save milvusdb/milvus > milvus_image.tar
    ```

2. 将 tar 文件传输完成后使用以下命令重新加载成 Docker 镜像。

    ```shell
    $ docker load < milvus_image.tar
    ```

#### 离线传输配置文件

你可以下载配置文件并使用合适的方式传输。关于如何下载配置文件请参考具体安装步骤。

## 从源代码编译

请参考[从源代码编译 Milvus](https://github.com/milvus-io/milvus/blob/master/INSTALL.md)了解如何从源代码编译。

## 接下来你可以

- 如果你刚开始了解 Milvus：

  - [运行示例程序](../example_code.md)
  - [了解更多 Milvus 操作](../../milvus_operation.md)
  - [体验 Milvus 在线训练营](https://github.com/milvus-io/bootcamp)

- 如果你已准备好在生产环境中部署 Milvus：

  - [配置 Milvus 以用于生产环境](../../../reference/performance_tuning.md)
  - 创建 [监控与报警系统](../../monitor.md) 实时监控系统性能
