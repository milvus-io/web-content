---
id: home.md
---

<div class="doc-h1-wrapper">

  <h1 class="title">
    Welcome to Milvus Docs!
  </h1>

  <h2 class="sub-title">
    Here you will learn about what Milvus is, and how to install, use, and deploy Milvus to build an application according to your business need.
  </h2>

</div>

## Get Started

<div class="card-wrapper">

<div class="start_card_container">
  <a href="install_standalone-docker.md">
    <img  src="../../../assets/home_install.svg" alt="icon" />
    <p class="link-btn">Install Milvus <i class="fas fa-chevron-right"></i></p>
  </a>
  <p>Learn how to install Milvus using either Docker Compose or on Kubernetes.</p>
</div>

<div class="start_card_container">
  <a href="example_code.md">
    <img  src="../../../assets/home_quick_start.svg" alt="icon" />
    <p class="link-btn">Quick Start <i class="fas fa-chevron-right"></i></p>
  </a>
  <p>Learn how to quickly run Milvus with sample code.</p>
</div>

<div class="start_card_container">
  <a href="/bootcamp">
    <img  src="../../../assets/home_bootcamp.svg" alt="icon" />
    <p class="link-btn">Bootcamp <i class="fas fa-chevron-right"></i></p>
  </a>
  <p>
  Learn how to build vector similarity search applications with Milvus.
  </p>
</div>

</div>


## Recommended articles

<div class="doc-home-recommend-section">

<div class="recomment-item">
  <p>Use</p>

- [Create a Collection](create_collection.md)
- [Manage Data](insert_data.md)
- [Build an Index](build_index.md)
- [Search](search.md)
- [Query](query.md)
</div>

<div class="recomment-item">
  <p>Deploy</p>

- [Configure Milvus](configure-docker.md)
- [Manage Dependencies](deploy_s3.md)
- [Deploy on Clouds](aws.md)
- [Scale a Milvus Cluster](scaleout.md)
- [Monitor and Alert](monitor_overview.md)
</div>

<div class="recomment-item">
  <p>Learn</p>

- [System Configuration](system_configuration.md)
- [Architecture Overview](architecture_overview.md)
- [Vector Index](index.md)
- [Similarity Metrics](metric.md)
- [Glossary](glossary.md)
</div>

</div>

<div class="doc-home-what-is-new">

## What's new in docs

_Sep 2022_

- Official release of 2.1.0 [Java API reference](https://milvus.io/api-reference/java/v2.1.0/About.md).
- Added reference docs for [consistency levels in Milvus](consistency.md),[in-memory replica](replica.md), [bitset](bitset.md), and [Knowhere](knowhere.md), the vector execution engine in Milvus.
- Added indexes on binary embeddings to [vector index](index.md)reference doc.
- Updated reference doc explaining the mechanism behind [Time Travel](timetravel_ref.md).

  
_Aug 2022_

- Added the Milvus 2.1 [benchmark test report](benchmark.md).
- Added guidance on how to [install embedded Milvus](install_embedded_milvus.md).
  

_Jul 2022 - Milvus 2.1 release_

- Added guidance on how to load a collection as [multiple in-memory replicas](load_collection.md). 
- Added guidance on how to [configure Milvus with Milvus Operator](configure_operator.md).
- Added guidance on how to configure [object storage](deploy_s3.md), [meta storage](deploy_etcd.md) and [message storage](deploy_pulsar.md) with Docker Compose or Helm.
- Added guidance on how to [configure RocksMQ, Pulsar and Kafka for message storage](message_storage_operator.md) with Milvus Operator.
- Added a full list of important monitoring metrics in the [Milvus Metrics Dashboard](metrics_dashboard.md).
- Added security guidance including [user access authentication](authenticate.md) and [encryption in transit](tls.md) .

</div>
