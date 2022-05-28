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


## 推荐阅读

<div class="doc-home-recommend-section">

<div class="recomment-item">
  <p>基本操作</p>

- [创建 Collection](create_collection.md)
- [管理数据](insert_data.md)
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

- [系统配置](system_configuration.md)
- [系统架构](architecture_overview.md)
- [向量索引](index.md)
- [距离计算方式](metric.md)
- [Milvus 术语](glossary.md)
</div>

</div>

<div class="doc-home-what-is-new">

## 文档动态

_2022 年 04 月_

- 添加 [Ansible](install_cluster-ansible.md) 安装分布式版 Milvus 指南。
- 重制 [PyMilvus](https://milvus.io/api-reference/pymilvus/v2.0.2/About.md) 以及 [Milvus GO SDK](https://milvus.io/api-reference/go/v2.0.0/About.md) API 参考文档。


_2022 年 03 月_

- 添加 [距离计算](calculate_distance.md) 指南。
- 添加 [加载](load_partition.md) and [释放](release_partition.md) partition 指南。
- 添加 Milvus [性能测试报告](benchmark.md)。


</div>
