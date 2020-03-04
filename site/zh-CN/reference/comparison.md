---
id: comparison.md
title: Milvus in Comparison
sidebar_label: Milvus in Comparison
---

# 与其它向量检索工具对比

与业界其它向量检索工具相比，Milvus 具有以下性能优势：

|                     | [Milvus](https://github.com/milvus-io/milvus) | [FAISS](https://github.com/facebookresearch/faiss) | [Hnswlib](https://github.com/nmslib/hnswlib) | [ANNOY](https://github.com/spotify/annoy) |
| ------------------- | ------ | ----- | ----- | ----- |
| CPU/GPU 异构计算能力 | ✔️      | ✔️     |  ❌    |  ❌    |
| 量化索引            | ✔️      | ✔️     |   ❌   |   ❌    |
| 哈希索引            | ✔️      | ✔️     |   ❌   |  ❌     |
| 图索引              | ✔️      | ✔️     |  ✔️   |     ✔️   |
| 分布式架构          | ✔️      | ❌     |    ❌   |  ❌       |
| 高可用设计          | ✔️      | ❌     |    ❌  |   ❌     |
| 易用用户接口        | ✔️      | ❌     |    ❌ |    ❌     |
| 图形化监控工具      | ✔️      | ❌     |    ❌  |    ❌     |
| 易部署              | ✔️      | ❌     |   ❌   |   ❌      |
| 多种客户端支持       | ✔️  |    ✔️   |     ✔️   |   ✔️     |
| RESTful API         | ✔️      | ❌     |  ❌    |    ❌   |
| 企业级用户支持      | ✔️      | ❌     |  ❌    |    ❌     |
| 十亿级向量检索支持      | ✔️      | ✔️     |  ❌    |    ❌     |