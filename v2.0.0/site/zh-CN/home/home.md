---
id: home.md
---

# 欢迎阅读 Milvus 文档！ 

在 Milvus 文档页，你可以了解 [什么是 Milvus](overview.md)，如何 [安装](install_standalone-docker.md)、[使用](connect.md)、[部署](aws.md) Milvus，以及 [根据场景需求使用 Milvus 搭建应用系统的教程](image_similarity_search.md)。 你还可以在这里找到常见问题 [FAQs](performance_faq.md) 及 [API 参考](https://milvus.io/api-reference/pymilvus/v2.0.0rc8/api/collection.html)。

你可以先浏览推荐阅读下的内容，或者在左上角的搜索框内输入关键字寻找所需文档。如未能找到所需信息，你可以向页面右下角的 _MilMil_![MilMil](../../../assets/icon_bird.svg) 提问，或者通过任意文档页右上角的选项反馈文档问题。

<div class="card-wrapper">

<div class="start_card_container">
  <a href="install_standalone-docker.md">
    <img  src="../../../assets/standalone.svg" alt="icon" />
    <p class="link-btn">安装 Milvus <i class="fas fa-chevron-circle-right"></i></p>
  </a>
  <p>了解如何使用 Docker Compose 或 Kubernetes 安装 Milvus。</p>
</div>

<div class="start_card_container">
  <a href="example_code.md">
    <img  src="../../../assets/start.svg" alt="icon" />
    <p class="link-btn">快速开始 <i class="fas fa-chevron-circle-right"></i></p>
  </a>
  <p>通过示例代码快速上手 Milvus。</p>
</div>

<div class="start_card_container">
  <a href="/bootcamp">
    <img  src="../../../assets/bootcamps.svg" alt="icon" />
    <p class="link-btn">Milvus 训练营 <i class="fas fa-chevron-circle-right"></i></p>
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

- [创建 Collection、Partition](create.md)
- [插入数据](insert.md)
- [创建索引](build.md)
- [向量搜索](search.)
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

_2021 年 10 月_

- 随着 Milvus 2.0-RC7 版本的发布，Milvus 文档更新了兼容性及性能相关信息。更多内容详见[发版说明](release_notes.md)。注意：由于 Milvus 的存储形式发生改变，RC7 与此前发布的所有 Milvus 2.0.0 RC 版本均不兼容。 
- [Milvus 系统搭建教程](image_similarity_search.md) 中新增了 Jupyter Notebook、GitHub 仓库及在线 demo 的链接。阅读最新教程，了解如何使用 Milvus 轻松搭建 [DNA 序列分类系统](dna_sequence_classification.md)。
- 我们更新了 [Milvus 用户](milvus_adopters.md) 名单。相应用户案例也在 [Milvus 博客](https://milvus.io/cn/blog) 板块中更新。如果你所在公司也是 Milvus 用户但不在名单上，请 [联系我们](https://github.com/milvus-io/milvus-docs/issues/new?assignees=&labels=&template=--error-report.yaml&title=v2.0.0%20Milvus%20Adopters%20(milvus_adopters.md)%20Doc%20Update)。
</div>
