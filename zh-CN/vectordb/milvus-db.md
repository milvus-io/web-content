---
id: milvus-db
title: Milvus database
sidebar_label: Milvus database
---

# Milvus特征向量数据库
## Milvus特征向量数据库

Milvus是Zilliz公司针对AI应用大规模落地，当前工业界并没有一款成熟向量检索系统，而研制的面向海量特征向量检索的数据库系统，旨在帮助用户实现非结构化数据的近似检索和分析。其实现原理是通过AI算法提取非结构化数据的特征，然后利用特征向量唯一标识该非结构化数据，最后用向量间的距离衡量非结构化数据之间的相似度。

与当前工业界其它向量检索工具相比，Milvus具有以下性能优势：

|                    |Milvus                 |  FAISS               |   SPTAG   |
|--------------------|-----------------------|----------------------|-----------|
| CPU/GPU异构计算能力 |:heavy_check_mark:     | :heavy_check_mark:    |:x: |
| 量化索引            | :heavy_check_mark:     | :heavy_check_mark:   |    :x:    |
| 哈希索引                    | :heavy_check_mark:     | :heavy_check_mark:   |    :x:    |
| 图索引                         | :heavy_check_mark:     | :x:                  |   :heavy_check_mark:|
| 分布式架构      | :heavy_check_mark:     |  :x:                 |   :x:     |
| 高可用设计                | :heavy_check_mark:     |  :x:                 |    :x:    |
| 易用用户接口   | :heavy_check_mark:     |  :x:                 |   :x:     |
| 图形化监控工具      | :heavy_check_mark:    |   :x:                 |    :x:   |
| 易部署             | :heavy_check_mark:    |   :x:                 |  :x:     |
| C++/Python SDK                | :heavy_check_mark:    |   :heavy_check_mark:  |  :heavy_check_mark:     |
| RESTful API                   | :heavy_check_mark:    |   :x:                 |    :x:    |
| 企业级用户支持      | :heavy_check_mark:    |   :x:                 |    :x:   |



