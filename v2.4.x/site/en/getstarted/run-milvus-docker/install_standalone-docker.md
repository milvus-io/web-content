---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Learn how to install Milvus standalone with Docker.
title: Run Milvus in Docker
---

# Run Milvus in Docker

This page illustrates how to launch a Milvus instance in Docker.


## Prerequisites

- [Install Docker](https://docs.docker.com/get-docker/).
- [Check the requirements for hardware and software](prerequisite-docker.md) prior to your installation.


## Install Milvus in Docker

Milvus provides an installation script to install it as a docker container. The script is available in the [Milvus repository](https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh). To install Milvus in Docker, just run

```shell
# Download the installation script
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

# Start the Docker container
$ bash standalone_embed.sh start
```

<div class="alert note">

If you encounter any issues pulling the image, contact us at <a href="mailto:community@zilliz.com">community@zilliz.com</a> with details about the problem, and we'll provide you with the necessary support.

</div>

After running the installation script:

- A docker container named milvus has been started at port **19530**.
- An embed etcd is installed along with Milvus in the same container and serves at port **2379**. Its configuration file is mapped to **embedEtcd.yaml** in the current folder.
- To change the default Milvus configuration, add your settings to the **user.yaml** file in the current folder and then restart the service.
- The Milvus data volume is mapped to **volumes/milvus** in the current folder.

You can stop and delete this container as follows

```shell
# Stop Milvus
$ bash standalone_embed.sh stop

# Delete Milvus data
$ bash standalone_embed.sh delete
```

## What's next

Having installed Milvus in Docker, you can:

- Check [Quickstart](quickstart.md) to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Manage Databases](manage_databases.md)
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)

- [Upgrade Milvus Using Helm Chart](upgrade_milvus_cluster-helm.md).
- [Scale your Milvus cluster](scaleout.md).
- Deploy your Milvu cluster on clouds:
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
