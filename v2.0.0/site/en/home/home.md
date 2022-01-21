---
id: home.md
---

# Welcome to Milvus Docs!


Here you will learn about [what Milvus is](overview.md), and how to [install](install_standalone-docker.md), [use](manage_connection.md), and [deploy](aws.md) Milvus to build an [application](image_similarity_search.md) according to your business need. You will also find [FAQs](performance_faq.md) and [API references](https://milvus.io/api-reference/pymilvus/v2.0.0rc8/api/collection.html) here.


You can start by browsing the recomended contents below or using the search box at the top left to search across the documentation. If you do not find the information you are looking for, feel free to ask _MilMil_![MilMil](../../../assets/icon_bird.svg) at the bottom right or submit an issue via GitHub by using the buttons at the top right of each page.

<div class="card-wrapper">

<div class="start_card_container">
  <a href="install_standalone-docker.md">
    <img  src="../../../assets/standalone.svg" alt="icon" />
    <p class="link-btn">Install Milvus <i class="fas fa-chevron-right"></i></p>
  </a>
  <p>Learn how to install Milvus using either Docker Compose or on Kubernetes.</p>
</div>

<div class="start_card_container">
  <a href="example_code.md">
    <img  src="../../../assets/start.svg" alt="icon" />
    <p class="link-btn">Quick Start <i class="fas fa-chevron-right"></i></p>
  </a>
  <p>Learn how to quickly run Milvus with sample code.</p>
</div>

<div class="start_card_container">
  <a href="/bootcamp">
    <img  src="../../../assets/bootcamps.svg" alt="icon" />
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
- [Insert Data](insert_data.md)
- [Build an Index](build_index.md)
- [Vector Similarity Search](search.md)
- [Query](query.md)
</div>

<div class="recomment-item">
  <p>Deploy</p>

- [Deploy on Clouds](aws.md)
- [Scale a Milvus Cluster](scaleout.md)
- [Set up storage](deploy_s3.md)
- [Monitor and Alert](monitor_overview.md)
- [Upgrade](upgrade.md)
</div>

<div class="recomment-item">
  <p>Learn</p>

- [System Configurations](configuration_standalone-basic.md)
- [Architecture Overview](architecture_overview.md)
- [Vector Index](index_selection.md)
- [Similarity Metrics](metric.md)
- [Glossary](glossary.md)
</div>

</div>

<div class="doc-home-what-is-new">

## What's new in docs


_Dec 2021_

- With the release of [Milvus 2.0-PreGA](release_notes.md), we have published new user guides concerning the new features of [Data Deletion](delete_data.md) and [Collection Alias](collection_alias.md).
- Updated [Search with Time Travel](timetravel.md) by introducing how to [generate a timestamp](timetravel.md#Generate-a-timestamp-for-search) based on an existing timestamp, Unix Epoch time, or date time.
- Added documentation about the newly released Milvus ecosystem tool, [Milvus Attu](attu.md). Learn what Milvus Attu is, and how to [install](attu_install-docker.md) and [use](attu_overview.md) it.
- Remade [Hello Milvus](example_code.md) to demonstrate the new feature of Data Deletion.
- Added a reference documentation explaining the mechanism of [Time Travel](timetravel_ref.md) in Milvus.


_Nov 2021_
  
- With the release of [Milvus 2.0-RC8](release_notes.md), we have published a new documentation introducing the new feature [Time Travel](timetravel.md).
- Added guidance on installation a Milvus cluster on Kubernetes with [Milvus Operator](install_cluster-milvusoperator.md).
- Added documentation about the newly released Milvus ecosystem tool, [Milvus CLI](cli_overview.md).  Learn what Milvus CLI is, and how to [install](install_cli.md) and [use](cli_commands.md) it.
- Added the [installation guide](milvusdm_install.md) for MilvusDM. Learn how to install the data migration tool and import data from [Faiss](f2m.md), [HDF5 files](h2m.md), and [Milvus 1.x](m2m.md) to Milvus 2.0.


</div>
