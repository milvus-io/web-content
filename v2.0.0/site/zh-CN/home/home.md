---
id: home.md
---

<div class="doc-h1-wrapper">

  <div class="title">
    欢迎阅读 Milvus 文档！ 
  </div>

  <div class="sub-title">
    在 Milvus 文档页，你可以了解什么是 Milvus，如何安装、使用、部署 Milvus，以及根据场景需求使用 Milvus 搭建应用系统的教程。
  </div>

</div>

## Get Started

<div class="card-wrapper">

<div class="start_card_container">
  <a href="install_standalone-docker.md">
    <img  src="../../../assets/home_install.svg" alt="icon" />
    <p class="link-btn">安装 Milvus <i class="fas fa-chevron-right"></i></p>
  </a>
  <p>了解如何使用 Docker Compose 或 Kubernetes 安装 Milvus。</p>
</div>

<div class="start_card_container">
  <a href="example_code.md">
    <img  src="../../../assets/home_quick_start.svg" alt="icon" />
    <p class="link-btn">快速开始 <i class="fas fa-chevron-right"></i></p>
  </a>
  <p>通过示例代码快速上手 Milvus。</p>
</div>

<div class="start_card_container">
  <a href="/bootcamp">
    <img  src="../../../assets/home_bootcamp.svg" alt="icon" />
    <p class="link-btn">Milvus 训练营 <i class="fas fa-chevron-right"></i></p>
  </a>
  <p>
  探索如何使用 Milvus 轻松搭建向量相似度检索系统。
  </p>
</div>

</div>

<div class="milmi-tip">
  <p>
    你可以向页面右下角的 _MilMil_!提问，或者通过任意文档页右上角的选项反馈文档问题。
  </p>
  <img  src="../../../assets/MilMil.svg" alt="MilMil" />
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

_2022 年 01 月_

- Milvus 发布了其正式版本 [Milvus 2.0.0](release_notes.md)。
- 添加使用 [APT 或 YUM](install_standalone-aptyum.md) 安装 Milvus 单机版指南。
- 添加 [Milvus 配置指南](configure-docker.md)。
- 添加安装 Milvus [GO SDK](install-go.md) 以及 [Java SDk](install-java.md) 指南。
- 在操作指南中添加 GO 以及 Java 语言示例代码。

_2021 年 12 月_

- 随着 [Milvus 2.0-PreGA](release_notes.md) 版本的发布，Milvus 文档新增了 [数据删除](delete_data.md) 以及 [Collection 别名](collection_alias.md) 功能使用说明。
- 更新 [Time Travel](timetravel.md) 功能文档，添加 [生成时间戳](timetravel.md#Generate-a-timestamp-for-search) 功能介绍。
- Milvus 生态系统新增工具 [Attu](attu.md)。了解如何 [安装](attu_install-docker.md) 以及 [使用](attu_overview.md) Attu。
- 重制 [Hello Milvus](example_code.md)，新增数据删除功能展示。
- 添加 [Time Travel 原理](timetravel_ref.md) 文档。


</div>
