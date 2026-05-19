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

<div class="doc-home-promotion-wrapper">
  <div class="promotion-content">
    <h2 class="promotion-title">Try Managed Milvus For Free!</h2>
    <p class="promotion-desc">Zilliz Cloud is hassle-free, powered by Milvus and 10x faster.</p>
  </div>

  <div class="cta-wrapper">
    <a class="cta-global" href="https://cloud.zilliz.com/signup?utm_source=partner&utm_medium=referral&utm_campaign=2025-02-24_doc_home_milvus.io">Zilliz Cloud</a>
  </div>
</div>

## Get Started

<div class="card-wrapper">

<div class="start_card_container">
  <a href="install_standalone-docker.md">
    <img src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/home_install.svg" alt="icon" />
    <p class="link-btn">Install Milvus</p>
  </a>
  <p>Learn how to install Milvus using either Docker Compose or on Kubernetes.</p>
</div>

<div class="start_card_container">
  <a href="quickstart.md">
    <img src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/home_quick_start.svg" alt="icon" />
    <p class="link-btn">Quick Start</p>
  </a>
  <p>Learn how to quickly run Milvus with sample code.</p>
</div>

<div class="start_card_container">
  <a href="/bootcamp">
    <img src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/home_bootcamp.svg" alt="icon" />
    <p class="link-btn">Bootcamp</p>
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

- [Manage Collections](manage-collections.md)
- [Insert, Upsert, and Delete](insert-update-delete.md)
- [Single-Vector Search](single-vector-search.md)
- [Hybrid Search](multi-vector-search.md)
- [Get & Scalar Query](get-and-scalar-query.md)
- [Milvus for AI Agents](milvus_for_agents.md)
</div>

<div class="recomment-item">
  <p>Deploy</p>

- [Configure Milvus](configure-docker.md)
- [Manage Dependencies](deploy_s3.md)
- [Deploy on Clouds](eks.md)
- [Scale a Milvus Cluster](scaleout.md)
- [Monitor and Alert](monitor_overview.md)
</div>

<div class="recomment-item">
  <p>Learn</p>

- [System Configuration](system_configuration.md)
- [Architecture Overview](architecture_overview.md)
- [Index Explained](index-explained.md)
- [Similarity Metrics](metric.md)
- [Glossary](glossary.md)
</div>

</div>

<div class="doc-home-what-is-new">

## What's new in docs

_May 2026 - Milvus 3.0.x updates_

- Added Milvus 3.0.x highlights to the [Release Notes](release_notes.md), including External Collection, Snapshot, Storage V3, and lake ecosystem integrations.
- Added guidance on how to [sort search results by scalar fields](single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x) and [aggregate query results](get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x).
- Added guidance on how to use [nullable vector fields](nullable-and-default.md) and [entity-level TTL](set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x).
- Added guidance on how to use [MinHash Function](minhash-function.md) for server-side MinHash signatures.
- Added guidance on how to [search with embedding lists](search-with-embedding-lists.md) and trigger [force merge compaction](force-merge.md).

</div>
