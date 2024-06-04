---
id: milvus_lite.md
summary: Get started with Milvus.
title: Run Milvus Lite Locally
---

# Run Milvus Lite Locally

This page illustrates how to run Milvus Lite locally for development and testing purposes.

## Overview

Milvus Lite is the lightweight version of [Milvus](https://github.com/milvus-io/milvus), an open-source vector database that powers AI applications with vector embeddings and similarity search.

Milvus Lite can be imported into your Python application, providing the core vector search functionality of Milvus. Milvus Lite is included in the [Python SDK of Milvus](https://github.com/milvus-io/pymilvus), thus it can be simply deployed with `pip install pymilvus`. This repo contains the core components of Milvus Lite.

Milvus Lite shares the same API and covers most of the features of Milvus. Together, they provide a consistent user experience across different types of environments, fitting use cases of different size. With the same client-side code, you can run a quick demo of less than a million vectors with Milvus Lite, or a small scale app with Milvus Docker container hosted on a single machine, and eventually to a large scale production deployment on Kubenetes serving billions of vectors at thousands of QPS.

## Prerequisites

Milvus Lite supports the following OS distributions and sillicon types:

- Ubuntu >= 20.04 (x86_64)
- MacOS >= 11.0 (Apple Silicon and x86_64)

Please note that Milvus Lite is good for getting started with vector search or building demos and prototypes. For a production use case, we recommend using Milvus on [Docker](install_standalone-docker.md) and [Kubenetes](install_cluster-milvusoperator.md), or considering the fully-managed Milvus on [Zilliz Cloud](https://zilliz.com/cloud).

## Set up Milvus Lite

Milvus Lite has been packed along with pymilvus, the Python SDK library of Milvus. To set up Milvus Lite, run the following command in the terminal.

```
pip install "pymilvus>=2.4.2"
```

## Connect to Milvus Lite

You can connect to Milvus Lite as follows.

```python
from pymilvus import MilvusClient

client = MilvusClient("milvus_demo.db")
```


After running the above code snippet, a database file named **milvus_demo.db** will be generated in the current folder.

## What's next

Having connected to Milvus Lite, you can:

- Check [Quickstart](quickstart.md) to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Manage Databases](manage_databases.md)
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Multi-Vector Search](multi-vector-search.md)

- [Upgrade Milvus Using Helm Chart](upgrade_milvus_cluster-helm.md).
- [Scale your Milvus cluster](scaleout.md).
- Deploy your Milvus cluster on clouds:
  - [Amazon EC2](aws.md)
  - [Amazon EKS](eks.md)
  - [Google Cloud](gcp.md)
  - [Google Cloud Storage](gcs.md)
  - [Microsoft Azure](azure.md)
  - [Microsoft Azure Blob Storage](abs.md)
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://milvus.io/docs/attu.md), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).
