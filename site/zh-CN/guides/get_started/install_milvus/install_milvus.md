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

## 从源代码编译

[从源代码编译 Milvus](https://github.com/milvus-io/milvus/blob/0.6.0/install.md) 并将其安装在 Ubuntu 上。尽管这些说明可能适用于其它系统，但我们仅针对 Ubuntu 18.04版本进行了测试。

## 接下来您可以

- 如果您刚开始了解 Milvus：

  - [运行示例程序](../example_code.md)
  - [了解更多 Milvus 操作](../../milvus_operation.md)
  - [体验 Milvus 在线训练营](https://github.com/milvus-io/bootcamp)

- 如果您已准备好在生产环境中部署 Milvus：

  - 创建 [监控与报警系统](../../monitor.md) 实时查看系统表现
  - [设置 Milvus 参数](../../../reference/milvus_config.md)
