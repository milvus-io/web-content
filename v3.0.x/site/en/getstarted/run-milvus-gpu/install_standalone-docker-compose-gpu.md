---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: Learn how to install Milvus standalone with GPU support using Docker Compose.
title: Run Milvus with GPU Support Using Docker Compose
---

# Run Milvus with GPU Support Using Docker Compose

This page illustrates how to start a Milvus instance with GPU support using Docker Compose.

## Prerequisites

- [Install Docker](https://docs.docker.com/get-docker/).
- [Check the requirements for hardware and software](prerequisite-gpu.md) prior to your installation.

<div class="alert note">

If you encounter any issues pulling the image, contact us at <a href="mailto:community@zilliz.com">community@zilliz.com</a> with details about the problem, and we'll provide you with the necessary support.

</div>

## Install Milvus

To install Milvus with GPU support using Docker Compose, follow these steps.

### 1. Download and configure the YAML file

Download [`milvus-standalone-docker-compose-gpu.yaml`](https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml) and save it as docker-compose.yml manually, or with the following command.

```shell
$ wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml
```

To check the download, compare the output of the following command with the `sha256` digest listed for `milvus-standalone-docker-compose-gpu.yaml` on the [release page](https://github.com/milvus-io/milvus/releases/tag/v3.0.5):

```shell
$ sha256sum docker-compose.yml
```

You can change the GPU devices assigned to Milvus in the `deploy` section of the `standalone` service in the YAML file as follows:

- To assign a specific GPU device to Milvus, locate the `deploy.resources.reservations.devices[0].device_ids` field in the definition of the `standalone` service and replace its value with the ID of the desired GPU. You can use the `nvidia-smi` tool, included with NVIDIA GPU display drivers, to determine the ID of a GPU device. Milvus supports multiple GPU devices.

Assign a single GPU device to Milvus:

```yaml
...
standalone:
  ...
  deploy:
    resources:
      reservations:
        devices:
          - driver: nvidia
            capabilities: ["gpu"]
            device_ids: ["0"]
...
```

Assign multiple GPU devices to Milvus:

```yaml
...
standalone:
  ...
  deploy:
    resources:
      reservations:
        devices:
          - driver: nvidia
            capabilities: ["gpu"]
            device_ids: ['0', '1']
...
```

### 2. Start Milvus

In the directory that holds docker-compose.yml, start Milvus by running:

```shell
$ sudo docker compose up -d
```

<div class="alert note">

If you failed to run the above command, check whether your system has Docker Compose V1 installed. If this is the case, you are advised to migrate to Docker Compose V2 due to the notes on [this page](https://docs.docker.com/compose/).

</div>

After starting up Milvus,

- Containers named **milvus-standalone**, **milvus-minio**, and **milvus-etcd** are up.
  - The **milvus-etcd** container does not expose any ports to the host and maps its data to **volumes/etcd** in the current folder.
  - The **milvus-minio** container serves ports **9000** and **9001** with the default authentication credentials and maps its data to **volumes/minio** in the current folder.
  - The **milvus-standalone** container serves ports **19530** and **9091** with the default settings and maps its data to **volumes/milvus** in the current folder.

The `standalone` service sets `security_opt: seccomp:unconfined`, so the Milvus container runs without the default Docker seccomp profile.

<div class="alert warning">

> The Compose file publishes these ports without a host IP, so Docker binds them to all network interfaces of the host, and other machines that can reach this host can connect to Milvus and MinIO. MinIO uses the access key and secret key `minioadmin`, which are set in the Compose file. To publish the ports on the loopback address only, add `127.0.0.1:` to the `ports` entries of the `minio` and `standalone` services in `docker-compose.yml`, for example `"127.0.0.1:19530:19530"`, and run `sudo docker compose up -d` again. For details, see [Port publishing and mapping](https://docs.docker.com/engine/network/port-publishing/). To use other MinIO credentials, change `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY` of the `minio` service, and set the same values in `minio.accessKeyID` and `minio.secretAccessKey` of the Milvus configuration. To require a user name and password for client connections to Milvus, see [Authenticate User Access](authenticate.md).

</div>

You can check if the containers are up and running using the following command:

```shell
$ sudo docker compose ps
```

By default, the command lists only running containers. Check that the output lists the **milvus-etcd**, **milvus-minio**, and **milvus-standalone** containers, and that the `STATUS` column of each of them starts with `Up`.

You can also access Milvus WebUI at `http://127.0.0.1:9091/webui/` to learn more about the your Milvus instance. For details, refer to [Milvus WebUI](milvus-webui.md).

To change the GPU devices that Milvus uses after it has started, edit the `device_ids` field under `deploy.resources.reservations.devices` of the `standalone` service in docker-compose.yml as shown in step 1, and then run the following command. Because the service configuration has changed, `docker compose up` stops and recreates the **milvus-standalone** container. For details, see [Run Docker Compose services with GPU access](https://docs.docker.com/compose/how-tos/gpu-support/).

```shell
$ sudo docker compose up -d
```

You can stop and delete this container as follows.

```shell
# Stop Milvus
$ sudo docker compose down

# Delete service data
$ sudo rm -rf volumes
```

## Configure memory pool

After Milvus is up and running, you can customize the memory pool by changing the `initMemSize` and `maxMemSize` settings in the `gpu` section of the Milvus configuration.

<div class="alert note">

The `milvus.yaml` file is located in the `/milvus/configs/` directory inside the Milvus container. Settings in a `user.yaml` file in the same directory override the values in `milvus.yaml`.

</div>

To keep your settings when the container is recreated, store them in a `user.yaml` file on the host and mount the file into the container as follows.

1. In the directory that holds docker-compose.yml, create a file named `user.yaml` with the settings you want to change. The following example shows the `gpu` section with its default values. Replace them with the sizes you need:

    ```yaml
    gpu:
      initMemSize: 2048
      maxMemSize: 4096
    ```

    - `initMemSize`: Initial size of the memory pool, in MB. Defaults to 2048.
    - `maxMemSize`: Maximum size of the memory pool, in MB. Defaults to 4096.

2. In docker-compose.yml, add the `user.yaml` file to the `volumes` list of the `standalone` service:

    ```yaml
    ...
    standalone:
      ...
      volumes:
        - ${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus
        - ./user.yaml:/milvus/configs/user.yaml
    ...
    ```

3. Recreate the Milvus container to apply the changes:

    ```shell
    $ sudo docker compose up -d
    ```

After the file is mounted, restart the `standalone` service to apply later changes to `user.yaml`:

```shell
$ sudo docker compose restart standalone
```

<div class="alert note">

Storage V3 is disabled by default. Enable it before using features that depend on it. For requirements and compatibility considerations, see [Storage V3](storage-v3.md).

</div>


## What's next

Having installed Milvus in Docker, you can:

- Check [Quickstart](quickstart.md) to see what Milvus can do.

- Check [Milvus WebUI](milvus-webui.md) to learn more about the Milvus instance.

- Learn the basic operations of Milvus:
  - [Manage Databases](manage_databases.md)
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)

- [Upgrade Milvus Standalone with Docker Compose](upgrade_milvus_standalone-docker.md). That page shows the CPU image tag. For this GPU deployment, keep the `-gpu` suffix (`milvusdb/milvus:v3.0.5-gpu`) and keep your `deploy` and `user.yaml` settings.
- [Scale a Milvus cluster](scaleout.md) on Kubernetes. That procedure uses Helm and does not apply to this Docker deployment.
- Deploy your Milvu cluster on clouds:
  - [Amazon EKS](eks.md)
  - [Google Cloud](gcp.md)
  - [Microsoft Azure](azure.md)
- Explore [Milvus WebUI](milvus-webui.md), an intuitive web interface for Milvus observability and management.
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://github.com/zilliztech/attu), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).

 
