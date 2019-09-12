---
id: product_faq
title: Product FAQ
sidebar_label: Product FAQ
---

# 产品 FAQ

### Milvus是什么？

Milvus 是一款面向向量检索的数据库系统，可以很好的运行和部署在 x86 架构的服务器环境和主流的虚拟化环境下，也支持目前主流的网络硬件设备。操作系统方面，Milvus 支持目前主流的 Linux 操作系统环境。

### Milvus 适合什么时候使用 ？

如果您想要可靠的海量向量相似性检索，以及亿级数据搜索的毫秒级响应，那 Milvus 将是您不二的选择。Milvus 一键安装、配置简易、运行可靠，保证数据准确性的同时，提供超高速的搜索响应。

Milvus 单行读取速度约 0.6 毫秒，单行写入速度在 0.03 毫秒左右。高效兼容各类机器学习模型和算法，优化了查询性能。而且提供结构化和非结构化数据的混合查询方案。

### 如何使用 Milvus？

目前 Milvus 提供 Python 和 C++ 的 SDK 接口，同时还支持所有基于 Thrift 的通信方式。

### Milvus 的易用性如何？

Milvus 安装简单，仅需下载相关 docker 镜像文件。易用性强，通过Python等SKD接口即可完成向量插入、检索等操作。若要了解更多，请看 [安装 Milvus](userguide/install_milvus.md).

想要开启您的第一次向量搜索？请阅读 [运行示例程序](userguide/example_code.md).

### Milvus 具备高可用特性吗？

Milvus 集群具备高可用性，其存储和计算等集群均容许部分组件失效，而不影响整个集群的使用。

### 向量存入Milvus后，如何检索？

向量存入 Milvus 后，Milvus 会给对应向量一个ID，用户需要自己将该向量ID和其对应的其他属性存入另外一个数据库系统。查询的时候，用户提供需要查询的向量，Milvus 会返回和用户提供向量最匹配的数个向量的ID以及匹配度。

### 如何选择向量索引的类型？

依据用户的需求，您可以选择以下索引类型：

- `Flat`

  如果需求精确匹配，那么请选择 `Flat` 类型索引。精确匹配，可以为用户提供100%精确匹配的向量，但是由于计算量巨大，性能影响也很大。

- `IVFFlat`

  如果不追求100%精确匹配，可以选择 `IVFFlat` 类型索引，支持大数据量的高精度匹配。

- `IVF_SQ8`

  运用 scalar quantization 的向量索引，能大幅缩小向量体积（大概缩减3/4），从而能有效提高向量吞吐量。

### Milvus 是否支持 “边插入边查询” ？

支持。如果您想在Milvus里边插入向量边查询，建议在 `home/$USER/milvus/conf/server_config.yaml` 下的 `cache_config` 区域，将参数 `insert_cache_immediately` 设置为 `True`。

### 数据存储在哪里？

向量数据可以存储在您的本地磁盘，或是MinIO云上。若要了解更多，请阅览[数据存储](https://www.milvus.io/docs/zh-CN/userguide/data-storage)。

### Milvus 与 FAISS 和 SPTAG 对比如何?

尽管这些都支持海量向量的相似度检索，Milvus 是其中唯一成熟易用的向量检索数据库系统，具备高可用、弹性扩展等特性。

想要了解更多性能对比，请看 [与 FAISS 和 SPTAG 对比](comparison.md)。

### 仍有问题没有得到解答？

如果您仍有其它问题，您可以：

- 在 GitHub 上访问 [Milvus-io](https://github.com/milvus-io)，提问、闲逛、和其它用户交流
- 阅读 [操作 FAQ](faq/operational_faq.md)，了解关于 Milvus 操作的常见问题 

