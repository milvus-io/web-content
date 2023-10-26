---
id: install_standalone-gpu-docker.md
label: Docker (GPU)
related_key: Docker
order: 2
group: install_standalone-docker.md
summary: Learn how to install Milvus GPU standalone with Docker Compose.
---

<div class="tab-wrapper"><a href="install_standalone-operator.md" class=''>Milvus Operator</a><a href="install_standalone-docker.md" class=''>Docker (CPU)</a><a href="install_standalone-gpu-docker.md" class='active '>Docker (GPU)</a><a href="install_standalone-helm.md" class=''>Helm (CPU)</a><a href="install_standalone-gpu-helm.md" class=''>Helm (GPU)</a></div>

# Install Milvus Standalone with Docker Compose (GPU)

This guide describes the hardware/software preparations and the procedure to install Milvus with GPU support enabled using Docker Compose.

Milvus now can use GPU devices to build indexes and perform ANN searches thanks to the contributions from NVIDIA.

## Prerequisites

Ensure that

- The compute capability of your GPU device is **6.1**, **7.0**, **7.5**, or **8.0**. To check whether your GPU device suffices the requirement, check [Your GPU Compute Capability](https://developer.nvidia.com/cuda-gpus) on the NVIDIA developer website.

- You have installed the **NVIDIA driver** for your GPU device on one of [the supported Linux distributions](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions) and then the **NVIDIA Container Toolkit** following [this guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html).

- Your hardware and software meet the specification requirements listed on [this page](https://milvus.io/docs/prerequisite-docker.md).

## Download the YAML file

Download `milvus-standalone-docker-compose-gpu.yml` and save it as `docker-compose.yml` manually, or with the following command.

```shell
$ wget https://github.com/milvus-io/milvus/releases/download/v2.3.2/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml
```

You need to make some changes to the environment variables of the standalone service in the YAML file as follows:

- To assign a specific GPU device to Milvus, locate the `deploy.resources.reservations.devices[0].devices_ids` field in the definition of the `standalone` service and replace its value with the ID of the desired GPU. You can use the `nvidia-smi` tool, included with NVIDIA GPU display drivers, to determine the ID of a GPU device. Milvus supports multiple GPU devices.

- Add `KNOWHERE_GPU_MEM_POOL_SIZE` in the `environment` section of the `standalone` service and set its value to reflect the size of a shared display memory pool. The format for the size is `initialSize;maximumSize`, where `initialSize` represents the initial size of the memory pool and `maximumSize` represents its maximum size. Both values should be set in MB. Milvus uses this field to allocate display memory to each process.

Assign a single GPU device to Milvus:

```yaml
...
standalone:
  environment:
    ...
    KNOWHERE_GPU_MEM_POOL_SIZE: 2048:4096
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
  environment:
    ...
    KNOWHERE_GPU_MEM_POOL_SIZE: 2048:4096
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

## Start Milvus

In the directory that holds `docker-compose.yml`, start Milvus by running:

```shell
$ sudo docker compose up -d
``` 

<div class="alert note">

If you failed to run the above command, please check whether your system has Docker Compose V1 installed. If this is the case, you are advised to migrate to Docker Compose V2 due to the notes on [this page](https://docs.docker.com/compose/).

</div>

```shell
Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
```

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

If you have assigned multiple GPU devices to Milvus in `docker-compose.yml`, you can specify which GPU device is visible or available for use.

Make GPU device `0` visible to Milvus:

```shell
CUDA_VISIBLE_DEVICES=0 ./milvus run standalone
```

Make GPU devices `0` and `1` visible to Milvus:

```shell
CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone
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
sudo docker-compose down
```

To delete data after stopping Milvus, run:
```
sudo rm -rf  volumes
```

## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.
- Check [In-memory Index](index.md) for more about GPU-compatible index types.

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

