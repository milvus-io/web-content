---
id: gpu_milvus_docker.md
title: Install GPU-enabled Milvus
sidebar_label: Install GPU-enabled Milvus
---

# Install GPU-enabled Milvus

## Prerequisites

#### System requirements

| Operating system | Supported versions |
| :--------------- | :----------------- |
| CentOS           | 7.5 or higher      |
| Ubuntu LTS       | 18.04 or higher    |

#### Hardware requirements

| Component  | Recommended configuration             |
| ---------- | ------------------------------------- |
| CPU        | Intel CPU Sandy Bridge or higher. |
| CPU instruction set | <li>SSE42</li><li>AVX</li><li>AVX2</li><li>AVX512</li> |
| GPU        | NVIDIA Pascal or higher               |
| RAM        | 8 GB or more (depends on data volume) |
| Hard drive | SATA 3.0 SSD or higher                |

#### Milvus Docker requirements

- [Install Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) 19.03 or higher on your local host machine.
- Install NVIDIA driver 418 or higher.
- [Install NVIDIA Docker support](https://github.com/NVIDIA/nvidia-docker)

## Step 1 Confirm Docker status

Confirm that the Docker daemon is running in the background:

```shell
$ docker info
```

If you do not see the server listed, start the **Docker** daemon.

> Note: On Linux, Docker needs sudo privileges. To run Docker command without `sudo`, create the `docker` group and add your user. For details, see the [post-installation steps for Linux](https://docs.docker.com/install/linux/linux-postinstall/).

## Step 2 Pull Milvus image

Pull the GPU-enabled image:

```shell
$ docker pull milvusdb/milvus:0.9.1-gpu-d052920-e04ed5
```

> Note: If the pulling speed is too slow or the pulling process constantly fails, refer to [Operational FAQ](../../../faq/operational_faq.md) for possible solutions.

## Step 3 Download configuration files

```shell
$ mkdir -p /home/$USER/milvus/conf
$ cd /home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.9.1/core/conf/demo/server_config.yaml
```

> Note: In case you encounter problems downloading configuration files using `wget` command, you can also create the `server_config.yaml` file under `/home/$USER/milvus/conf`, then copy and paste the content from [server config file](https://github.com/milvus-io/milvus/blob/v0.9.1/core/conf/demo/server_config.yaml).


## Step 4 Start Docker container

Before starting the Docker container, you must set `enable` to `true` in `gpu_resource_config` section of `server_config.yaml`.

```shell
$ docker run -d --name milvus_gpu_0.9.1 --gpus all \
-p 19530:19530 \
-p 19121:19121 \
-v /home/$USER/milvus/db:/var/lib/milvus/db \
-v /home/$USER/milvus/conf:/var/lib/milvus/conf \
-v /home/$USER/milvus/logs:/var/lib/milvus/logs \
-v /home/$USER/milvus/wal:/var/lib/milvus/wal \
milvusdb/milvus:0.9.1-gpu-d052920-e04ed5
```

The `docker run` options used in the above command are defined as follows:

- `-d`: run container in background and print container ID
- `--name`: assign a name to the container
- `--gpus`: GPU devices to add to the container (‘all’ to pass all GPUs)
- `-p`: publish a container’s port(s) to the host
- `-v`: mounts a directory into the container

Confirm Milvus running status by the following command:

```shell
$ docker ps
```

If Milvus server is not successfully started, you can check the error logs by the following command.

```shell
# Get the ID of the container running Milvus.
$ docker ps -a
# Check docker logs.
$ docker logs <milvus container id>
```

## What's next

- If you're just getting started with Milvus:

  - [Try an example program](../example_code.md)
  - [Learn more about Milvus operations](../../milvus_operation.md)
  - [Try Milvus Bootcamp](https://github.com/milvus-io/bootcamp)
  
- If you're ready to run Milvus in production:

  - Build a [monitoring and alerting system](../../monitor.md) to check real-time application performance
  - Tune Milvus performance through [configuration](../../../reference/milvus_config.md)
  
- If you want to run Milvus on machines without an Nvidia GPU:
  
  - [Install CPU-only Milvus](cpu_milvus_docker.md)
