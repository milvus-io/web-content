---
id: install_milvus
title: Install Milvus
sidebar_label: Install Milvus
---

# Install Milvus 

Milvus runs on machines with or without GPU. To use Milvus on machines without a GPU, install CPU-only Milvus. Otherwise, it is recommended to use GPU-enabled Milvus to achieve better search performance for larger queries. 

In Milvus, the vector search includes 2 separate processes: index building and search computation. For GPU-enabled Milvus, these two processes can run concurrently, which faciliate more efficient query, especially for incremental data. While for CPU-only Milvus, search computation can only be executed after index building is completed, which makes it more suitable for static data.


## Prerequisites

#### System requirements

| Operating system | Supported versions |
| :--------------- | :----------------- |
| CentOS           | 7.5 or higher      |
| Ubuntu LTS       | 18.04 or higher    |

#### Hardware requirements

| Component  | Recommended configuration             |
| ---------- | ------------------------------------- |
| CPU        | Intel CPU Haswell or higher           |
| RAM        | 8 GB or more (depends on data volume) |
| Hard drive | SATA 3.0 SSD or higher                |

## Install using Docker

Docker is the easiest and recommended way to install and run Milvus. Docker images are tested for both CPU-only or GPU-enabled Milvus.

### Milvus Docker requirements

- [Install Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) 19.03 or higher on your local host machine.
- To enable GPU support, [install NVIDIA Docker support](https://github.com/NVIDIA/nvidia-docker).

> Note: Before installing NVIDIA Docker support, make sure you have installed NVIDIA driver 418. If not, you can launch **Software & Updates** utility on the desktop, and go to **Additional Drivers** tab. Select **Using NVIDIA driver metapackage from nvidia-driver-418**, and click **Apply Changes**. You don't have to install CUDA separately, as it is included in Milvus Docker container.

### Step 1 Confirm Docker status

Confirm that the Docker daemon is running in the background:

```shell
docker info
```

If you do not see the server listed, start the **Docker** daemon.

> Note: On Linux, Docker needs sudo privileges. To run Docker command without `sudo`, create the `docker` group and add your user. For details, see the [post-installation steps for Linux](https://docs.docker.com/install/linux/linux-postinstall/).

### Step 2 Pull Milvus Docker images

To pull the CPU-only image:

```shell
docker pull milvusdb/milvus:cpu-latest
```

To pull the GPU-enabled image:

```shell
docker pull milvusdb/milvus:latest
```

### Step 3 Download Milvus Configuration files

For CPU-only Milvus:

```shell
# Download Milvus config file
$ mkdir -p /home/$USER/milvus/conf
$ cd home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/server_config_cpu.yaml
$ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/log_config.conf
```

For GPU-enabled Milvus:

```shell
# Download Milvus config file
$ mkdir -p /home/$USER/milvus/conf
$ cd home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/server_config_gpu.yaml
$ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/log_config.conf
```

### Step 4 Start Milvus Docker container

To start CPU-only container:

```shell
# Start Milvus
$ docker run -td --milvus_cpu -e "TZ=Asia/Shanghai" -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/var/lib/milvus/db -v /home/$USER/milvus/conf:/var/lib/milvus/conf -v /home/$USER/milvus/logs:/var/lib/milvus/logs milvusdb/milvus:latest
```

To start GPU-enabled container:

```shell
# Start Milvus
$ docker run -td --gpus all -e "TZ=Asia/Shanghai" -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/var/lib/milvus/db -v /home/$USER/milvus/conf:/var/lib/milvus/conf -v /home/$USER/milvus/logs:/var/lib/milvus/logs milvusdb/milvus:latest
```

To configure your timezone, use `-e "TZ=Asia/Shanghai"` , and change `Asia/Shanghai` to your local timezone. Finally confirm Milvus running status by the following command:

```shell
# Confirm Milvus status
$ docker ps
```

If Milvus server is not successfully started, you can check the error logs by the following command.

```shell
# Get id of the container running Milvus
$ docker ps -a
# Check docker logs
$ docker logs <milvus container id>
```

## Build from Source

[Build Milvus from source](https://github.com/milvus-io/milvus/blob/master/install.md) and install it on Ubuntu Linux. While the instructions might work for other systems, it is only tested and supported for Ubuntu 18.04 or higher. 

## What's next

- If you're just getting started with Milvus:

  - [Try an example program](example_code.md)
  - [Learn more about Milvus operations](milvus_operation.md)
  - [Try Milvus Bootcamp](https://github.com/milvus-io/bootcamp)
  
- If you're ready to run Milvus in production:

  - Build a [monitoring and alerting system](monitor.md) to check real-time application performance
  - [Import vectors into Milvus](import_data.md)
  - Tune Milvus performance through [configuration](../reference/milvus_config.md)
