---
id: home.md
---

# 欢迎阅读 Milvus 文档！ 

在 Milvus 文档页，你可以了解 [什么是 Milvus](overview.md)，如何 [安装](install_standalone-docker.md)、[使用](manage_connection.md)、[部署](aws.md) Milvus，以及 [根据场景需求使用 Milvus 搭建应用系统的教程](image_similarity_search.md)。 你还可以在这里找到常见问题 [FAQs](performance_faq.md) 及 [API 参考](https://milvus.io/api-reference/pymilvus/v2.0.0rc8/api/collection.html)。


你可以先浏览推荐阅读下的内容，或者在左上角的搜索框内输入关键字寻找所需文档。如未能找到所需信息，你可以向页面右下角的 _MilMil_![MilMil](../../../assets/icon_bird.svg) 提问，或者通过任意文档页右上角的选项反馈文档问题。

<div class="card-wrapper">

<div class="start_card_container">
  <a href="install_standalone-docker.md">
    <img  src="../../../assets/standalone.svg" alt="icon" />
    <p class="link-btn">安装 Milvus <i class="fas fa-chevron-right"></i></p>
  </a>
  <p>了解如何使用 Docker Compose 或 Kubernetes 安装 Milvus。</p>
</div>

<div class="start_card_container">
  <a href="example_code.md">
    <img  src="../../../assets/start.svg" alt="icon" />
    <p class="link-btn">快速开始 <i class="fas fa-chevron-right"></i></p>
  </a>
  <p>通过示例代码快速上手 Milvus。</p>
</div>

<div class="start_card_container">
  <a href="/bootcamp">
    <img  src="../../../assets/bootcamps.svg" alt="icon" />
    <p class="link-btn">Milvus 训练营 <i class="fas fa-chevron-right"></i></p>
  </a>
  <p>
  探索如何使用 Milvus 轻松搭建向量相似度检索系统。
  </p>
</div>

</div>

## 推荐阅读

<div class="doc-home-recommend-section">

<div class="recomment-item">
  <p>基本操作</p>

- [创建 Collection](create_collection.md)
- [插入数据](insert_data.md)
- [创建索引](build_index.md)
- [向量搜索](search.md)
- [结构化匹配](query.md)
</div>

<div class="recomment-item">
  <p>部署运维</p>

- [云端部署](aws.md)
- [扩缩容](scaleout.md)
- [配置 S3 存储](deploy_s3.md)
- [监控与报警](monitor.md)
- [升级 Milvus 2.0](upgrade.md)
</div>

<div class="recomment-item">
  <p>参考指南</p>

- [系统配置](configuration_standalone-basic.md)
- [系统架构](architecture_overview.md)
- [向量索引](index_selection.md)
- [距离计算方式](metric.md)
- [Milvus 术语](glossary.md)
</div>

</div>

<div class="doc-home-what-is-new">

## 文档动态

_2021 年 12 月_

- 随着 [Milvus 2.0-PreGA](release_notes.md) 版本的发布，Milvus 文档新增了 [数据删除](delete_data.md) 以及 [Collection 别名](collection_alias.md) 功能使用说明。
- 更新 [Time Travel](timetravel.md) 功能文档，添加 [生成时间戳](timetravel.md#Generate-a-timestamp-for-search) 功能介绍。
- Milvus 生态系统新增工具 [Milvus Attu](attu.md)。了解如何 [安装](attu_install-docker.md) 以及 [使用](attu_overview.md) Milvus Attu。
- 重制 [Hello Milvus](example_code.md)，新增数据删除以及 LoadBalance 功能展示。
- 添加 [Time Travel 原理](timetravel_ref.md) 文档。

_2021 年 11 月_
- 随着 [Milvus 2.0-RC8](release_notes.md) 版本的发布，Milvus 文档新增了 [Time Travel](timetravel.md) 功能使用说明。
- 新增安装指南：使用 [Milvus Operator](install_cluster-milvusoperator.md) 在 Kubernetes 集群上安装分布式版 Milvus。
- Milvus 生态系统新增 CLI 工具，[点击阅读](cli_overview.md) 了解如何安装和使用 Milvus CLI。
- 新增 [MilvusDM 安装指南](milvusdm_install.md)。了解如何安装并使用数据迁移工具 MilvusDM 将 [Faiss](f2m.md) 数据、[HDF5 文件](h2m.md) 以及 [Milvus 1.x](m2m.md) 数据导入至 Milvus 2.0。


</div>
