---
id: install_standalone-aptyum.md
label: Dpkg
related_key: Install
order: 3
group: install_standalone-docker.md
summary: Learn how to install Milvus stanalone with dpkg.
---

<div class="tab-wrapper"><a href="install_standalone-docker.md" class=''>Docker</a><a href="install_standalone-operator.md" class=''>Milvus Operator</a><a href="install_standalone-helm.md" class=''>Helm</a><a href="install_standalone-aptyum.md" class='active '>Dpkg</a><a href="install_standalone-docker-compose.md" class=''>Docker</a></div>

# Install Milvus Standalone with dpkg

This topic describes how to install Milvus standalone on Ubuntu systems.

## Prerequisites

Check [the requirements](prerequisite-docker.md) for hardware and software prior to your installation.

## Install Milvus with dpkg on Ubuntu

```bash
$ wget https://github.com/milvus-io/milvus/releases/download/v2.3.5/milvus_2.3.5-1_amd64.deb
$ sudo apt-get update
$ sudo dpkg -i milvus_2.3.5-1_amd64.deb
$ sudo apt-get -f install
```

## Check the status of Milvus

```bash
$ sudo systemctl status milvus
```

## Connect to Milvus

Please refer to [Hello Milvus](https://milvus.io/docs/example_code.md), then run the example code. 

## Uninstall Milvus

```bash
$ sudo dpkg -P milvus
```

## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.
- Check [In-memory Index](index.md) for more about CPU-compatible index types.

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Manage Databases](manage_databases.md)
  - [Create a collection](create_collection.md)
  - [Create a partition](create_partition.md)
  - [Insert data](insert_data.md)
  - [Conduct a vector search](search.md)

- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://milvus.io/docs/attu.md), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md)
