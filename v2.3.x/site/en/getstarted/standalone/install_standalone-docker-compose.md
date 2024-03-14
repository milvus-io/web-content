---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
order: 4
group: install_standalone-docker.md
summary: Learn how to install Milvus standalone with Docker Compose.
---

<div class="tab-wrapper"><a href="install_standalone-docker.md" class=''>Docker</a><a href="install_standalone-operator.md" class=''>Milvus Operator</a><a href="install_standalone-helm.md" class=''>Helm</a><a href="install_standalone-aptyum.md" class=''>DEB/RPM</a><a href="install_standalone-docker-compose.md" class='active '>Docker Compose</a></div>

# Install Milvus Standalone with Docker Compose

This topic describes how to install Milvus standalone with Docker Compose.

## Prerequisites

- Check whether [Docker and Docker Compose](https://docs.docker.com/compose/install/) are installed on your machine.
- Check [the requirements](prerequisite-docker.md) for hardware and software requirements before installing Milvus.

  - For the users using MacOS 10.14 or later, set the Docker virtual machine (VM) to use a minimum of 2 virtual CPUs (vCPUs) and 8 GB of initial memory. Otherwise, the installation might fail.

## Procedure

To install Milvus standalone with Docker Compose, follow these steps:

### Download the `YAML` file

[Download](https://github.com/milvus-io/milvus/releases/download/v2.3.11/milvus-standalone-docker-compose.yml) `milvus-standalone-docker-compose.yml` and save it as `docker-compose.yml` manually, or with the following command.

```shell
$ wget https://github.com/milvus-io/milvus/releases/download/v2.3.11/milvus-standalone-docker-compose.yml -O docker-compose.yml
```


### Start Milvus

In the directory that holds `docker-compose.yml`, start Milvus by running:

```shell
$ sudo docker compose up -d
```

<div class="alert note">

If you failed to run the above command, please check whether your system has Docker Compose V1 installed. If this is the case, you are advised to migrate to Docker Compose V2 due to the notes on [this page](https://docs.docker.com/compose/).

</div>

```text
Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
```

## Verify the Installation

Now check if the containers are up and running.

```shell
$ sudo docker compose ps
```

After Milvus standalone starts, there will be three docker containers running, including the Milvus standalone service and its two dependencies.

```
      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530->19530/tcp, 0.0.0.0:9091->9091/tcp
```

### Connect to Milvus

Verify which local port the Milvus server is listening on. Replace the container name with your own.

```bash
$ docker port milvus-standalone 19530/tcp
```

Please refer to [Hello Milvus](https://milvus.io/docs/example_code.md), then run the example code.

## Stop Milvus

To stop Milvus standalone, run:
```
sudo docker compose down
```

To delete data after stopping Milvus, run:
```
sudo rm -rf  volumes
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
