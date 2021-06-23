---
id: overview.md
title: Milvus 是什么
---

# Milvus 是什么

Milvus 是一款开源向量数据库，赋能 AI 应用和向量相似度搜索。

Milvus 提供 [单机版](overview_standalone.md) 与 [分布式版](overview_cluster.md)。

## Milvus 概念

### 非结构化数据
非结构化数据指的是数据结构不规则，没有统一的预定义数据模型，不方便用数据库二维逻辑表来表现的数据。非结构化数据包括图片、视频、音频、自然语言等，占所有数据总量的 80%。非结构化数据的处理可以通过各种人工智能（AI）或机器学习（ML）模型转化为向量数据进行。

### 向量
向量又称为 vector embedding，是各种非结构化数据，如视频、照片、音频的特征抽象。在数学表示上，向量是一个由浮点数或者二值型数据组成的 n 维数组。通过现代的向量转化技术，比如各种人工智能（AI）或者机器学习（ML）模型可以将非结构化数据抽象为 n 维特征向量空间的向量。这样就可以采用最近邻算法（ANN）计算非结构化数据之间的相似度。

### 向量相似度检索（近似最近邻搜索）
相似度检索是指将目标对象与数据库中数据进行比对，并召回最相似的结果。同理，向量相似度检索返回的是最相似的向量数据。近似最近邻搜索（ANN）算法能够 [计算向量之间的距离](metric.md)。

## 加入开发者社区

如果你有任何建议、意见或问题，欢迎加入 Milvus 的 [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) 社区与我们的工程师团队交流。

[![Milvus Slack Channel](../../../assets/slack.png)](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ)

你也可以访问 [常见问题](https://milvus.io/cn/docs/v1.1.0/performance_faq.md) 页面查看相关问题。

订阅 Milvus 邮件：

- [Technical Steering Committee](https://lists.lfai.foundation/g/milvus-tsc)
- [Technical Discussions](https://lists.lfai.foundation/g/milvus-technical-discuss)
- [Announcement](https://lists.lfai.foundation/g/milvus-announce)

关注我们的社交媒体：

- [知乎](zhihu.com/org/zilliz-11/columns)
- [CSDN](http://zilliz.blog.csdn.net)
- [Bilibili](http://space.bilibili.com/478166626)
- Zilliz 技术交流微信群
![wechat](../../../assets/wechat_qr_code.jpeg)
###### 如二维码失效，请加zilliz小助手微信：zilliz-tech
