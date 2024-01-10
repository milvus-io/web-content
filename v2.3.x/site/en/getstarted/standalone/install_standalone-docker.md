---
id: install_standalone-docker.md
label: Docker (CPU)
related_key: Docker
order: 1
group: install_standalone-docker.md
summary: Learn how to install Milvus stanalone with Docker Compose.
---

<div class="tab-wrapper"><a href="install_standalone-operator.md" class=''>Milvus Operator</a><a href="install_standalone-docker.md" class='active '>Docker (CPU)</a><a href="install_standalone-gpu-docker.md" class=''>Docker (GPU)</a><a href="install_standalone-helm.md" class=''>Helm (CPU)</a><a href="install_standalone-gpu-helm.md" class=''>Helm (GPU)</a></div>

# Install Milvus Standalone with Docker Compose (CPU)

This topic describes how to install Milvus standalone using Docker Compose.

## Prerequisites

Check [the requirements](prerequisite-docker.md) for hardware and software prior to your installation.

For the users using MacOS 10.14 or later, set the Docker virtual machine (VM) to use a minimum of 2 virtual CPUs (vCPUs) and 8 GB of initial memory. Otherwise, installation might fail.

## Download the `YAML` file

[Download](https://github.com/milvus-io/milvus/releases/download/v2.3.4/milvus-standalone-docker-compose.yml) `milvus-standalone-docker-compose.yml` and save it as `docker-compose.yml` manually, or with the following command.

```
$ wget https://github.com/milvus-io/milvus/releases/download/v2.3.4/milvus-standalone-docker-compose.yml -O docker-compose.yml
```

## Start Milvus

In the same directory as the `docker-compose.yml` file, start up Milvus by running:

```shell
$ sudo docker compose up -d
```

<div class="alert note">

If you failed to run the above command, please check whether your system has Docker Compose V1 installed. If it is the case, you are advised to migrate to Docker Compose V2 due to the notes on [this page](https://docs.docker.com/compose/).

</div>

```text
Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
```

Now check if the containers are up and running.

```
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

## Connect to Milvus

Verify which local port the Milvus server is listening on. Replace the container name with your own.

```bash
$ docker port milvus-standalone 19530/tcp
```

You can connect to Milvus using the local IP address and port number returned by this command.

## Stop Milvus

To stop Milvus standalone, run:
```
sudo docker compose down
```

To delete data after stopping Milvus, run:
```
sudo rm -rf  volumes
```

## Minimal Standalone Mode

If you need to use standalone mode with embedded ETCD and local storage (without starting MinIO and additional ETCD)
```
docker run -d \
--name milvus-standalone \
--security-opt seccomp:unconfined \
-e ETCD_USE_EMBED=true \
-e ETCD_DATA_DIR=/var/lib/milvus/etcd \
-e COMMON_STORAGETYPE=local \
-v ${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus \
-p 80:19530 \
-p 9091:9091 \
--health-cmd="curl -f http://localhost:9091/healthz" \
--health-interval=30s \
--health-start-period=90s \
--health-timeout=20s \
--health-retries=3 \
milvusdb/milvus:v2.3.4 \
milvus run standalone
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
