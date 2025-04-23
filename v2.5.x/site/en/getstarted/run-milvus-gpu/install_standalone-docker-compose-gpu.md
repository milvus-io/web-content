---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: Learn how to install Milvus cluster on Kubernetes.
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

Download [`milvus-standalone-docker-compose-gpu.yml`](https://github.com/milvus-io/milvus/releases/download/v2.5.10/milvus-standalone-docker-compose-gpu.yml) and save it as docker-compose.yml manually, or with the following command.

```shell
$ wget https://github.com/milvus-io/milvus/releases/download/v2.5.10/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml
```

You need to make some changes to the environment variables of the standalone service in the YAML file as follows:

- To assign a specific GPU device to Milvus, locate the `deploy.resources.reservations.devices[0].devices_ids` field in the definition of the `standalone` service and replace its value with the ID of the desired GPU. You can use the `nvidia-smi` tool, included with NVIDIA GPU display drivers, to determine the ID of a GPU device. Milvus supports multiple GPU devices.

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

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
```

<div class="alert note">

If you failed to run the above command, check whether your system has Docker Compose V1 installed. If this is the case, you are advised to migrate to Docker Compose V2 due to the notes on [this page](https://docs.docker.com/compose/).

</div>

After starting up Milvus,

- Containers named **milvus-standalone**, **milvus-minio**, and **milvus-etcd** are up.
  - The **milvus-etcd** container does not expose any ports to the host and maps its data to **volumes/etcd** in the current folder.
  - The **milvus-minio** container serves ports **9090** and **9091** locally with the default authentication credentials and maps its data to **volumes/minio** in the current folder.
  - The **milvus-standalone** container serves ports **19530** locally with the default settings and maps its data to **volumes/milvus** in the current folder.

You can check if the containers are up and running using the following command:

```shell
$ sudo docker compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530->19530/tcp, 0.0.0.0:9091->9091/tcp
```

You can also access Milvus WebUI at `http://127.0.0.1:9091/webui/` to learn more about the your Milvus instance. For details, refer to [Milvus WebUI](milvus-webui.md).

If you have assigned multiple GPU devices to Milvus in docker-compose.yml, you can specify which GPU device is visible or available for use.

Make GPU device `0` visible to Milvus:

```shell
$ CUDA_VISIBLE_DEVICES=0 ./milvus run standalone
```

Make GPU devices `0` and `1` visible to Milvus:

```shell
$ CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone
```

You can stop and delete this container as follows.

```shell
# Stop Milvus
$ sudo docker compose down

# Delete service data
$ sudo rm -rf volumes
```

## Configure memory pool

After Milvus is up and running, you can customize the memory pool by modifying the `initMemSize` and `maxMemSize` settings in the `milvus.yaml` file.

<div class="alert note">

The `milvus.yaml` file is located in the `/milvus/configs/` directory inside the Milvus container.

</div>

To confgiure the memory pool, modify the `initMemSize` and `maxMemSize` settings in the `milvus.yaml` file as follows.

1. Use the following command to copy `milvus.yaml` from the Milvus container to your local machine. Replace `<milvus_container_id>` with your actual Milvus container ID.

    ```shell
    docker cp <milvus_container_id>:/milvus/configs/milvus.yaml milvus.yaml
    ```

2. Open the copied `milvus.yaml` file with your preferred text editor. For example, using vim:

    ```shell
    vim milvus.yaml
    ```

3. Edit the `initMemSize` and `maxMemSize` settings as needed and save your changes:

    ```yaml
    ...
    gpu:
      initMemSize: 0
      maxMemSize: 0
    ...
    ```

    - `initMemSize`: Initial size of the memory pool. Defaults to 1024.
    - `maxMemSize`: Maximum size of the memory pool. Defaults to 2048.

4. Use the following command to copy the modified `milvus.yaml` file back to the Milvus container. Replace `<milvus_container_id>` with your actual Milvus container ID.

    ```shell
    docker cp milvus.yaml <milvus_container_id>:/milvus/configs/milvus.yaml
    ```

5. Restart the Milvus container to apply the changes:

    ```shell
    docker stop <milvus_container_id>
    docker start <milvus_container_id>
    ```

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

- [Upgrade Milvus Using Helm Chart](upgrade_milvus_cluster-helm.md).
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

 
