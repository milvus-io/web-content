---
id: install_standalone-aptyum.md
label: APT or YUM
related_key: Install
order: 2
group: install_standalone-docker.md
summary: Learn how to install Milvus stanalone with APT or YUM.
---

<div class="tab-wrapper"><a href="install_standalone-docker.md" class=''>Docker Compose</a><a href="install_standalone-helm.md" class=''>Helm</a><a href="install_standalone-aptyum.md" class='active '>APT or YUM</a></div>

# Install Milvus Standalone with APT/YUM

This topic describes how to install Milvus standalone using package manager APT or YUM on Linux systems.

## Prerequisites

Ensure that your CPU, RAM, and disk meets the requirements in [Environment Checklist](prerequisite-docker.md) prior to your installation.

## Install Milvus with APT on Ubuntu

On Ubuntu, you can install Milvus standalone either via Launchpad PPA or directly with a `.deb` package.

### Install via Launchpad PPA

You can install Milvus standalone via Launchpad PPA (Personal Package Archive). PPA allows you to install packages outside Ubuntu's official repository with APT.

<div class="alert note">
Currently, the PPA package of Milvus only supports Ubuntu 18.04.
</div>

```bash
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:milvusdb/milvus
$ sudo apt update
$ sudo apt install milvus
```

### Install with a `.deb` package

You can also download the `.deb` package that Milvus provides and install Milvus standalone.

```bash
$ wget https://github.com/milvus-io/milvus/releases/download/v2.2.0/milvus_2.2.0-1_amd64.deb
$ sudo apt-get update
$ sudo dpkg -i milvus_2.2.0-1_amd64.deb
$ sudo apt-get -f install
```

## Install Milvus with YUM on CentOS

On CentOS, you can install Milvus standalone with YUM.

```bash
$ sudo yum install https://github.com/milvus-io/milvus/releases/download/v2.2.0/milvus-2.2.0-1.el7.x86_64.rpm
```

## Check the status of Milvus and its dependencies

After installation, Milvus standalone and its dependencies (etcd and MinIO) start automatically. You can check their status by:

```bash
$ sudo systemctl status milvus
$ sudo systemctl status milvus-etcd
$ sudo systemctl status milvus-minio
```

## Start / Stop Milvus service

You can start or stop Milvus service by following commands after installing Milvus with apt or yum.

```Shell
# start Milvus service
$ sudo systemctl start milvus
# stop Milvus service
$ sudo systemctl stop milvus
# restart Milvus service
$ sudo systemctl restart milvus
```

## View Milvus log

Use `journalctl` to view Milvus logs.

```Shell
$ journalctl -u milvus
```

## Uninstall Milvus

Run the following command to uninstall Milvus.

```bash
$ sudo apt-get remove milvus
```

Additionally, remove Milvus from your system's repository list if you installed via PPA.

```bash
$ sudo add-apt-repository --remove ppa:milvusdb/milvus
````

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
