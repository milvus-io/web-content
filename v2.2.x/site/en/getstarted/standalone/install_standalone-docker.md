---
id: install_standalone-docker.md
label: Docker Compose
related_key: Docker
order: 0
group: install_standalone-docker.md
summary: Learn how to install Milvus stanalone with Docker Compose.
---

<div class="tab-wrapper"><a href="install_standalone-docker.md" class='active '>Docker Compose</a><a href="install_standalone-helm.md" class=''>Helm</a><a href="install_standalone-aptyum.md" class=''>APT or YUM</a></div>

# Install Milvus Standalone with Docker Compose

This topic describes how to install Milvus standalone using Docker Compose.

## Prerequisites

Check [the requirements](prerequisite-docker.md) for hardware and software prior to your installation.

## Download the `YAML` file

[Download](https://github.com/milvus-io/milvus/releases/download/v2.2.0/milvus-standalone-docker-compose.yml) `milvus-standalone-docker-compose.yml` and save it as `docker-compose.yml` manually, or with the following command.

```
$ wget https://github.com/milvus-io/milvus/releases/download/v2.2.0/milvus-standalone-docker-compose.yml -O docker-compose.yml
```

## Start Milvus

In the same directory as the `docker-compose.yml` file, start up Milvus by running:

```shell
$ sudo docker-compose up -d
```

<div class="alert note">
If your system has Docker Compose V2 installed instead of V1, use <code> docker compose </code> instead of <code> docker-compose </code>. Check if this is the case with <code> $ docker compose version </code>. Read <a href="https://docs.docker.com/compose/#compose-v2-and-the-new-docker-compose-command"> here </a> for more information.
</div>

```text
Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
```

Now check if the containers are up and running.

```
$ sudo docker-compose ps
```

After Milvus standalone starts, there will be three docker containers running, including the Milvus standalone service and its two dependencies.

```
      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530->19530/tcp, 0.0.0.0:9091->9091/tcp
```

## Stop Milvus

To stop Milvus standalone, run:
```
sudo docker-compose down
```

To delete data after stopping Milvus, run:
```
sudo rm -rf  volumes
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
