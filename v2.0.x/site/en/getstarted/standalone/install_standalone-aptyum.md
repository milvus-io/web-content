---
id: install_standalone-aptyum.md
label: APT or YUM
related_key: Install
order: 2
group: install_standalone-docker.md
summary: Learn how to install Milvus stanalone with APT or YUM.
---

# Install Milvus Standalone

This topic describes how to install Milvus standalone with Docker Compose or on Kubernetes. 

[Check the requirements for hardware and software](prerequisite-docker.md) prior to your installation. 

If you run into image loading errors while installing, you can [Install Milvus Offline](install_offline-docker.md).

You can also build Milvus from source code at [GitHub](https://github.com/milvus-io/milvus#to-start-developing-milvus).


<div class="tab-wrapper"><a href="install_standalone-docker.md" class=''>Docker Compose</a><a href="install_standalone-helm.md" class=''>Helm</a><a href="install_standalone-aptyum.md" class='active '>APT or YUM</a></div>

## Install Milvus with APT on Ubuntu

You can install Milvus standalone with either Launchpad PPA or directly with the Debian software package.

### Install via Launchpad PPA on Ubuntu

Milvus standalone is now available on Launchpad PPA.

<div class="alert note">
Currently, Milvus supports installation via Launchpad PPA only on Ubuntu 18.04.
</div>

```bash
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:milvusdb/milvus
$ sudo apt update
$ sudo apt install milvus
```

### Install with Debian software package

Alternatively, you can download the Debian software package and install Milvus standalone.

```bash
$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus_2.0.2-1_amd64.deb
$ sudo apt-get update
$ sudo dpkg -i milvus_2.0.2-1_amd64.deb
$ sudo apt-get -f install
```

## Install Milvus with YUM on CentOS

You can install Milvus standalone with YUM.

```bash
$ sudo yum install https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-2.0.2-.el7.x86_64.rpm
```


## Check the status of Milvus and its dependencies

After installation, Milvus standalone and its dependencies, i.e. etcd and MinIO, start directly. You can check their status.

```bash
$ sudo systemctl status milvus
$ sudo systemctl status milvus-etcd
$ sudo systemctl status milvus-minio
```

## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Create a collection](create_collection.md)
  - [Create a partition](create_partition.md)
  - [Insert data](insert_data.md)
  - [Conduct a vector search](search.md)

- Explore [MilvusDM](migrate_overview.md), an open-source tool designed for importing and exporting data in Milvus.
- [Monitor Milvus with Prometheus](monitor.md).
