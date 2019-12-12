---
id: cpu_milvus
title: Install CPU-only Milvus on Docker
sidebar_label: Install CPU-only Milvus on Docker
---

# Install CPU-only Milvus on Docker

## Prerequisites

#### System requirements

| Operating system | Supported versions |
| :--------------- | :----------------- |
| CentOS           | 7.5 or higher      |
| Ubuntu LTS       | 18.04 or higher    |
| Windows          | Windows 10         |

#### Hardware requirements

| Component  | Recommended configuration             |
| ---------- | ------------------------------------- |
| CPU        | Intel CPU Haswell or higher           |
| RAM        | 8 GB or more (depends on data volume) |
| Hard drive | SATA 3.0 SSD or higher                |

#### Milvus Docker requirements

[Install Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) 19.03 or higher on your local host machine.

## Step 1 Confirm Docker status

Confirm that the Docker daemon is running in the background:

```shell
$ docker info
```

If you do not see the server listed, start the **Docker** daemon.

> Note: On Linux, Docker needs sudo privileges. To run Docker command without `sudo`, create the `docker` group and add your user. For details, see the [post-installation steps for Linux](https://docs.docker.com/install/linux/linux-postinstall/).

## Step 2 Pull Milvus images

To pull the CPU-only image:

```shell
$ docker pull milvusdb/milvus:cpu-latest
```

## Step 3 Start Docker container

```shell
# Start Milvus
$ docker run -d --name milvus_cpu -e "TZ=Asia/Shanghai" -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/var/lib/milvus/db -v /home/$USER/milvus/logs:/var/lib/milvus/logs milvusdb/milvus:cpu-latest
```

> Note: To configure your timezone, use `-e "TZ=Asia/Shanghai"` , and change `Asia/Shanghai` to your local [timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). 

Finally confirm Milvus running status by the following command:

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

## What's next

- If you're just getting started with Milvus:

  - [Try an example program](example_code.md)
  - [Learn more about Milvus operations](milvus_operation.md)
  - [Try Milvus Bootcamp](https://github.com/milvus-io/bootcamp)
  
- If you're ready to run Milvus in production:

  - Build a [monitoring and alerting system](monitor.md) to check real-time application performance
  - Tune Milvus performance through [configuration](../reference/milvus_config.md)