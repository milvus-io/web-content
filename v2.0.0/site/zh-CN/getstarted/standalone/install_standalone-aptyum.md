---
id: install_standalone-aptyum.md
label: 使用 APT 或 YUM 安装
related_key: Install
order: 2
group: standalone
summary: Learn how to install Milvus stanalone with APT or YUM.
---

# Install Milvus Standalone

你可以使用 Docker Compose 或 Kubernetes 安装 Milvus 单机版。安装前，请先阅读[安装前提](prerequisite-docker.md)。

你也可以[从源代码编译 Milvus](https://github.com/milvus-io/milvus#to-start-developing-milvus)。


<div class="tab-wrapper"><a href="install_standalone-docker.md" class=''>使用 Docker Compose 安装</a><a href="install_standalone-helm.md" class=''>使用 Kubernetes 安装</a><a href="install_standalone-aptyum.md" class='active '>使用 APT 或 YUM 安装</a></div>

## Install Milvus with APT on Ubuntu

You can install Milvus standalone with either Launchpad PPA or directly with the Debian software package.

### Install via Launchpad PPA on Ubuntu

Milvus standalone is now available on Launchpad PPA.

<div class="alert note">
Currently, Milvus supports installation via Launchpad PPA only on Ubuntu 18.04.
</div>

```bash
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:milvusdb/milvus-standalone
$ sudo apt update
$ sudo apt install milvus
```

### Install with Debian software package

Alternatively, you can download the Debian software package and install Milvus standalone.

```bash
$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.0-pre-ga/milvus_2.0.0-preGA_1-1_amd64.deb
$ sudo apt-get update
$ sudo dpkg -i milvus_2.0.0-preGA_1-1_amd64.deb
$ sudo apt-get -f install
```

## Install Milvus with YUM on CentOS

You can install Milvus standalone with YUM.

```bash
$ sudo yum install https://github.com/milvus-io/milvus/releases/download/v2.0.0-pre-ga/milvus-2.0.0-preGA.1.el7.x86_64.rpm
```


## Check the status of Milvus and its dependencies

After installation, Milvus standalone and its dependencies, i.e. etcd and MinIO, start directly. You can check their status.

```bash
$ sudo systemctl status milvus
$ sudo systemctl status milvus-etcd
$ sudo systemctl status milvus-minio
```

## Configure Milvus (optional)

To configure your Milvus service, make changes to the Milvus configuration file `milvus.yaml` under `/etc/milvus/configs/` in your local device after installation, and restart Milvus standalone.

```bash
$ sudo systemctl restart milvus
```

## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

- Explore [MilvusDM](migrate_overview.md), an open-source tool designed for importing and exporting data in Milvus.
- [Monitor Milvus with Prometheus](monitor.md).
