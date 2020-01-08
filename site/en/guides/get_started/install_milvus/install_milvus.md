---
id: install_milvus.md
title: Installation Overview
sidebar_label: Installation Overview
---

# Installation Overview

Milvus runs on machines with or without GPU. To use Milvus on machines without a GPU, install CPU-only Milvus. Otherwise, it is recommended to use GPU-enabled Milvus to achieve better search performance for larger queries. 

In Milvus, the vector search includes 2 separate processes: index building and search computation. For GPU-enabled Milvus, these two processes can run concurrently, which facilitate more efficient query, especially for incremental data. While for CPU-only Milvus, search computation can only be executed after index building is completed, which makes it more suitable for static data.

## Install using Docker

Docker is the easiest and recommended way to install and run Milvus. 

- [Install CPU-only Milvus on Docker](cpu_milvus_docker.md)
- [Install GPU-enabled Milvus on Docker](gpu_milvus_docker.md)

## Build from Source

[Build Milvus from source](https://github.com/milvus-io/milvus/blob/0.6.0/install.md) and install it on Ubuntu Linux. While the instructions might work for other systems, it is only tested and supported for Ubuntu 18.04 or higher. 

## What's next

- If you're just getting started with Milvus:

  - [Try an example program](../example_code.md)
  - [Learn more about Milvus operations](../../milvus_operation.md)
  - [Try Milvus Bootcamp](https://github.com/milvus-io/bootcamp)
  
- If you're ready to run Milvus in production:

  - Build a [monitoring and alerting system](../../monitor.md) to check real-time application performance
  - Tune Milvus performance through [configuration](../../../reference/milvus_config.md)
