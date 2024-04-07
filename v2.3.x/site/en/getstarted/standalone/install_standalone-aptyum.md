---
id: install_standalone-aptyum.md
label: DEB/RPM
related_key: Install
order: 3
group: install_standalone-docker.md
summary: Learn how to install Milvus stanalone with dpkg/yum.
title: Install Milvus Standalone with dpkg/yum
---

<div class="tab-wrapper"><a href="install_standalone-docker.md" class=''>Docker</a><a href="install_standalone-operator.md" class=''>Milvus Operator</a><a href="install_standalone-helm.md" class=''>Helm</a><a href="install_standalone-aptyum.md" class='active '>DEB/RPM</a><a href="install_standalone-docker-compose.md" class=''>Docker Compose</a></div>

# Install Milvus Standalone with dpkg/yum

This topic describes how to install Milvus standalone using package manager dpkg or yum on Linux systems.


## Prerequisites

Check [the requirements](prerequisite-docker.md) for hardware and software prior to your installation.

## Install Milvus

### Install Milvus with dpkg on Ubuntu

```bash
$ wget https://github.com/milvus-io/milvus/releases/download/v2.3.12/milvus_2.3.12-1_amd64.deb
$ sudo apt-get update
$ sudo dpkg -i milvus_2.3.12-1_amd64.deb
$ sudo apt-get -f install
```

### Install Milvus with yum on RedHat9

```bash
$ sudo yum install -y https://github.com/milvus-io/milvus/releases/download/v2.3.12/milvus-2.3.12-1.el9.x86_64.rpm
```

## Check the status of Milvus

```bash
$ sudo systemctl restart milvus
$ sudo systemctl status milvus
```

## Connect to Milvus

Please refer to [Hello Milvus](https://milvus.io/docs/example_code.md), then run the example code. 

## Uninstall Milvus

### Uninstall Milvus on Ubuntu

```bash
$ sudo dpkg -P milvus
```

### Uninstall Milvus on RedHat9

```bash
$ sudo yum remove -y milvus
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
