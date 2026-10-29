---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Learn how to install Milvus standalone with Docker.
title: Run Milvus in Docker (Linux)
---

# Run Milvus in Docker (Linux)

This page illustrates how to launch a Milvus instance in Docker.


## Prerequisites

- [Install Docker](https://docs.docker.com/get-docker/).
- [Check the requirements for hardware and software](prerequisite-docker.md) prior to your installation.


## Install Milvus in Docker

Milvus provides an installation script to install it as a Docker container. The script is available in the [Milvus repository](https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh). Download and inspect the script before starting a new deployment:

```shell
# Download the installation script
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

# Inspect the Docker image selected by the script
$ grep -n "milvusdb/milvus:" standalone_embed.sh

# Start the Docker container
$ bash standalone_embed.sh start
```

<div class="alert note">

The script is downloaded from the Milvus `master` branch. Its Docker image tag is defined in the script and can differ from v3.0.3. To install that exact release, use the versioned configuration in [Run Milvus with Docker Compose](install_standalone-docker-compose.md).

This Docker deployment runs **Woodpecker** with the **local filesystem** as its WAL backend, so no external message-queue service is required. See [Woodpecker](woodpecker.md).

If you want to use [Backup](milvus_backup_overview.md) in standalone deployment mode, it is recommended to use the [Docker Compose](install_standalone-docker-compose.md) deployment method.

If you encounter any issues pulling the image, contact us at <a href="mailto:community@zilliz.com">community@zilliz.com</a> with details about the problem, and we'll provide you with the necessary support.

</div>

After running the installation script:

- A docker container named milvus-standalone has been started at port **19530**.
- An embed etcd is installed along with Milvus in the same container and serves at port **2379**. Its configuration file is mapped to **embedEtcd.yaml** in the current folder.
- To change the default Milvus configuration, add your settings to the **user.yaml** file in the current folder and then restart the service.
- The Milvus data volume is mapped to **volumes/milvus** in the current folder.

Verify the actual image and health status:

```bash
docker inspect --format '{{.Config.Image}}' milvus-standalone
docker inspect --format '{{.State.Health.Status}}' milvus-standalone
```

Wait for `healthy` before following [Quickstart](quickstart.md). When using this server, connect the SDK to `http://localhost:19530`; a local `.db` URI starts Milvus Lite instead.

You can access Milvus WebUI at `http://127.0.0.1:9091/webui/` to learn more about the your Milvus instance. For details, refer to [Milvus WebUI](milvus-webui.md).

## (Optional) Update Milvus configurations

You can modify the Milvus configurations in the **user.yaml** file in the current folder. For example, to change the `proxy.healthCheckTimeout` to `1000` ms, you can modify the file as follows:

```shell
cat << EOF > user.yaml
# Extra config to override default milvus.yaml
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
```

Then restart the service as follows:

```shell
$ bash standalone_embed.sh restart
```

For applicable configuration items, refer to [System Configuration](system_configuration.md).

## Upgrade Milvus

The script's `upgrade` command downloads the script from `master` and recreates the container using the image selected by that script. It does not validate a supported source-to-target version path and can recreate generated configuration files. Do not treat it as a guarantee that an arbitrary older deployment can upgrade safely to v3.0.3.

Before an upgrade, back up metadata, persistent data, `embedEtcd.yaml`, and `user.yaml`. Check the target version, message queue, and storage compatibility, and validate recovery in a non-production environment. For deployments managed with Docker Compose, follow [Upgrade Milvus Standalone with Docker Compose](upgrade_milvus_standalone-docker.md); do not apply that procedure directly to a script-managed container.

## Stop and delete Milvus

You can stop and delete this container as follows

```shell
# Stop Milvus
$ bash standalone_embed.sh stop

# Delete Milvus data
$ bash standalone_embed.sh delete
```

## Optional dependencies

By default this deployment runs **Woodpecker** (local-filesystem WAL) as the message queue and an **embedded etcd** for metadata — nothing else to install. To use a different message queue or connect external object storage / metadata, see:

- Message queue: [Woodpecker](woodpecker.md) (default) · [Pulsar](mq_pulsar.md) · [Kafka](mq_kafka.md) · [RocksMQ](mq_rocksmq.md)
- Object storage: [MinIO](deploy_s3.md) (default) · [AWS S3](deploy_s3.md) · [Azure Blob](abs.md) · [GCP Cloud Storage](gcs.md) · [Aliyun OSS](deploy_s3.md) · [Tencent COS](deploy_s3.md) · [Huawei OBS](deploy_s3.md) · [S3-compatible](deploy_s3.md)
- Metadata: [etcd](deploy_etcd.md)

<div class="alert note">

Storage V3 is disabled by default. Enable it before using features that depend on it. For requirements and compatibility considerations, see [Storage V3](storage-v3.md).

</div>


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

- Review the upgrade considerations on this page before changing the Milvus version.
- [Scale your Milvus cluster](scaleout.md).
- Deploy your Milvu cluster on clouds:
  - [Amazon EKS](eks.md)
  - [Google Cloud](gcp.md)
  - [Microsoft Azure](azure.md)
- Explore [Milvus WebUI](milvus-webui.md), an intuitive web interface for Milvus observability and management.
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://github.com/zilliztech/attu), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).
