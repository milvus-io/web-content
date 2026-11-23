---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Learn how to install Milvus standalone with Docker Compose.
title: Run Milvus with Docker Compose (Linux)
---

# Run Milvus with Docker Compose (Linux)

This page illustrates how to launch a Milvus instance in Docker using Docker Compose.

## Prerequisites

- [Install Docker](https://docs.docker.com/get-docker/).
- Install the [Docker Compose plugin](https://docs.docker.com/compose/install/linux/) (V2 or later) and verify it with `docker compose version`. These instructions use `docker compose`, not the legacy `docker-compose` V1 command.
- [Check the requirements for hardware and software](prerequisite-docker.md) prior to your installation.

## Install Milvus

Milvus provides a Docker Compose configuration file in the Milvus repository. Download the configuration for v3.0.5 with the `wget` command below. Right after the download, before you edit the file or start Milvus with `sudo docker compose up -d`, run `sha256sum docker-compose.yaml` and compare the result with the `sha256` digest listed for `milvus-standalone-docker-compose.yaml` on the [v3.0.5 release page](https://github.com/milvus-io/milvus/releases/tag/v3.0.5):

```shell
# Download the configuration file
$ wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml

# Start Milvus
$ sudo docker compose up -d
```

<div class="alert note">

**Default deployment (v3.0.5):** `docker compose up -d` starts three long-running containers — `milvus-etcd` (metadata), `milvus-minio` (object storage), and `milvus-standalone`. The message queue is **Woodpecker (embedded, with MinIO / object storage as its WAL backend)**, so no separate message-queue container is required.

The configuration also runs the one-shot `milvus-volume-init` service to prepare data-directory ownership. It exits after completing that task.

**Message-queue default by version:**
- **2.5.x** — default message queue is **RocksMQ**.
- **2.6.x and later** — default message queue is **Woodpecker (embedded)**.

Use the configuration attached to the release you intend to install. For an existing deployment, follow the upgrade instructions instead of replacing its configuration with a new-installation file.

- If `docker compose` is unavailable, install the Compose plugin using the [Docker instructions](https://docs.docker.com/compose/install/linux/).

- If you encounter any issues pulling the image, contact us at <a href="mailto:community@zilliz.com">community@zilliz.com</a> with details about the problem, and we'll provide you with the necessary support.

</div>

After starting up Milvus,

- Containers named **milvus-standalone**, **milvus-minio**, and **milvus-etcd** are up.
  - The **milvus-etcd** container does not expose any ports to the host and maps its data to **volumes/etcd** in the current folder.
  - The **milvus-minio** container publishes ports **9000** and **9001** with the default authentication credentials and maps its data to **volumes/minio** in the current folder.
  - The **milvus-standalone** container publishes ports **19530** and **9091** with the default settings and maps its data to **volumes/milvus** in the current folder.

The `standalone` service sets `security_opt: seccomp:unconfined`, so the Milvus container runs without the default Docker seccomp profile.

<div class="alert warning">

> The configuration file publishes these ports without a host address. Docker publishes a port without a host address on all host addresses, so other machines that can reach this host can also connect to Milvus and MinIO. MinIO uses the access key and secret key `minioadmin`, which are set in the configuration file. To limit access to this host, add `127.0.0.1:` to the `ports` entries of the `minio` and `standalone` services in `docker-compose.yaml`, for example `"127.0.0.1:19530:19530"`, and run `sudo docker compose up -d` again. To use other MinIO credentials, change `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY` of the `minio` service, and set the same values in `minio.accessKeyID` and `minio.secretAccessKey` of the Milvus configuration. To require credentials for Milvus connections, see [Authenticate User Access](authenticate.md).

</div>

You can check if the containers are up and running using the following command:

```shell
$ sudo docker compose ps

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       "etcd -advertise-cli…"   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       "/usr/bin/docker-ent…"   minio        2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9000-9001->9000-9001/tcp
milvus-standalone   …       "/tini -- milvus run…"   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091->9091/tcp, 0.0.0.0:19530->19530/tcp
```

The `PORTS` column can also list each published port with the IPv6 address `[::]`, for example `[::]:19530->19530/tcp`, because Docker publishes a port without a host address on both `0.0.0.0` and `[::]`.

You can also access Milvus WebUI at `http://127.0.0.1:9091/webui/` to learn more about the your Milvus instance. For details, refer to [Milvus WebUI](milvus-webui.md).

To try the running server, follow the **Use an existing Milvus server** path in [Quickstart](quickstart.md) and connect to `http://localhost:19530`. Do not use the local `.db` connection block, which starts a separate Milvus Lite database.

## (Optional) Update Milvus configurations

To update Milvus configuration to suit your needs, put your settings in a `user.yaml` file on the host and mount it at `/milvus/configs/user.yaml` in the `milvus-standalone` container. The configuration file mounts only `/var/lib/milvus` into this container, so a `user.yaml` that you edit inside the container is lost when Compose recreates the container, for example after a change to `docker-compose.yaml` or to the Milvus image.

1. Create `user.yaml` in the folder that contains `docker-compose.yaml`. Create the file before you mount it: if the source path does not exist, Compose creates a directory with that name instead.
  The following assumes that you need to override the default `proxy.healthCheckTimeout`. For applicable configuration items, refer to [System Configuration](system_configuration.md).

    ```shell
    cat << EOF > user.yaml
    # Extra config to override default milvus.yaml
    proxy:
      healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
    EOF
    ```

1. In `docker-compose.yaml`, add the file to the `volumes` list of the `standalone` service. Keep the other settings of the service, such as `security_opt`, `healthcheck`, and `depends_on`, as they are.

    ```yaml
    services:
      standalone:
        volumes:
          - ${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus
          - ./user.yaml:/milvus/configs/user.yaml
    ```

1. Apply the change. Because the service configuration changed, Compose recreates the `milvus-standalone` container and keeps the data in its mounted volumes.

    ```shell
    sudo docker compose up -d
    ```

After the file is mounted, restart the `standalone` service to apply later changes to `user.yaml`:

```shell
sudo docker compose restart standalone
```

## Stop and delete Milvus

You can stop and delete this container as follows

```shell
# Stop Milvus
$ sudo docker compose down

# Delete service data
$ sudo rm -rf volumes
```

## Upgrade an existing deployment

For a Milvus 2.6.x standalone deployment, follow [Upgrade Milvus Standalone with Docker Compose](upgrade_milvus_standalone-docker.md). Back up metadata and persistent data, preserve the existing dependencies and configuration, and validate the documented source-to-target upgrade path before changing the Milvus image. Do not replace an older deployment's Compose file with the new-installation configuration above.

**Message Queue limitations**: When upgrading to Milvus v3.0.5, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.


Milvus 2.6.x and later default to Woodpecker, while 2.5.x deployments default to **RocksMQ**. If the deployment you are upgrading still runs RocksMQ, pin it in `user.yaml` before changing the Milvus image, so the upgraded instance keeps its existing message queue instead of starting with the new default:

```yaml
# user.yaml — keep RocksMQ across the upgrade
mq:
  type: rocksmq
```

After the upgraded instance is running on v3.0.5, you can move from RocksMQ to Woodpecker with [Switch Message Queue](switch-mq-type.md), which is available in Milvus 3.0 and later.

## Optional dependencies

This deployment runs **Woodpecker** (embedded, MinIO WAL backend) for messaging, **etcd** for metadata, and **MinIO** for object storage. To use a different message queue or connect external object storage / metadata, see:

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

- [Upgrade Milvus Standalone with Docker Compose](upgrade_milvus_standalone-docker.md).
- [Scale a Milvus cluster](scaleout.md) on Kubernetes. That procedure uses Helm and does not apply to this Docker deployment.
- Deploy your Milvus cluster on clouds:
  - [Amazon EKS](eks.md)
  - [Google Cloud](gcp.md)
  - [Microsoft Azure](azure.md)
- Explore [Milvus WebUI](milvus-webui.md), an intuitive web interface for Milvus observability and management.
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://github.com/zilliztech/attu), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).
