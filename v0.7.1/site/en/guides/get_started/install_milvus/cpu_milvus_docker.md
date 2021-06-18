---
id: cpu_milvus_docker.md
title: Install CPU-only Milvus
sidebar_label: Install CPU-only Milvus
---

# Install CPU-only Milvus

## Prerequisites

#### Operating system requirements

| Operating system | Supported versions                              |
| :--------------- | :----------------------------------------------------------- |
| CentOS           | 7.5 or higher                                                |
| Ubuntu LTS       | 18.04 or higher                                              |
| Windows          | Windows 10 64-bit: Pro, Enterprise, or Education (Build 15063 or later) |
| MacOS            |  10.13 or higher      |

#### Hardware requirements

| Component  | Recommended configuration             |
| ---------- | ------------------------------------- |
| CPU        | Intel CPU Haswell or higher           |
| RAM        | 8 GB or more (depends on data volume) |
| Hard drive | SATA 3.0 SSD or higher                |

#### Milvus Docker requirements

- If you're using Ubuntu or CentOS, [Install Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) 19.03 or higher on your local host machine.
- If you're installing Milvus on Windows, install [Docker Desktop](https://docs.docker.com/docker-for-windows/install/), and make certain configurations in **Settings -> Advanced**. Make sure the Memory available to Docker Engine exceeds the sum of `insert_buffer_size` and `cpu_cache_capacity` you set in the `server_config.yaml` file.
- If you're installing Milvus on MacOS, install [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/), and make certain configurations in **Settings -> Advanced**. Make sure the Memory available to Docker Engine exceeds the sum of `insert_buffer_size` and `cpu_cache_capacity` you set in the `server_config.yaml` file.

## Install Milvus on Ubuntu/CentOS

#### Step 1 Confirm Docker status

Confirm that the Docker daemon is running in the background:

```shell
$ docker info
```

If you do not see the server listed, start the **Docker** daemon.

> Note: On Linux, Docker needs sudo privileges. To run Docker command without `sudo`, create the `docker` group and add your user. For details, see the [post-installation steps for Linux](https://docs.docker.com/install/linux/linux-postinstall/).

#### Step 2 Pull Docker image

Pull the CPU-only image:

```shell
$ docker pull milvusdb/milvus:0.7.1-cpu-d040120-d2fad1
```

> Note: If the pulling speed is too slow or the pulling process constantly fails, refer to [Operational FAQ](../../../faq/operational_faq.md) for possible solutions.

#### Step 3 Download configuration files

```shell
# Create Milvus file
$ mkdir -p /home/$USER/milvus/conf
$ cd /home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.7.1/core/conf/demo/server_config.yaml
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.7.1/core/conf/demo/log_config.conf
```

> Note: In case you encounter problems downloading configuration files using `wget` command, you can also create the `server_config.yaml` and `log_config.conf` files under `/home/$USER/milvus/conf`, then copy and paste the content from [server config file](https://github.com/milvus-io/milvus/blob/v0.7.1/core/conf/demo/server_config.yaml) and [log config file](https://github.com/milvus-io/milvus/blob/v0.7.1/core/conf/demo/log_config.conf).

#### Step 4 Start Docker container

```shell
# Start Milvus
$ docker run -d --name milvus_cpu \
-p 19530:19530 \
-p 19121:19121 \
-p 9091:9091 \
-v /home/$USER/milvus/db:/var/lib/milvus/db \
-v /home/$USER/milvus/conf:/var/lib/milvus/conf \
-v /home/$USER/milvus/logs:/var/lib/milvus/logs \
-v /home/$USER/milvus/wal:/var/lib/milvus/wal \
milvusdb/milvus:0.7.1-cpu-d040120-d2fad1
```

The `docker run` options used in the above command are defined as follows:

- `-d`: Run container in background and print container ID
- `--name`: Assign a name to the container
- `--gpus`: GPU devices to add to the container (‘all’ to pass all GPUs)
- `-p`: Publish a container’s port(s) to the host
- `-v`: Mounts the directory into the container

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

## Install Milvus on Windows

The procedures of installing Milvus on Windows are similar to the steps on Ubuntu/CentOS, except for **Step 3 and Step 4**.

For Step 3, instead of using `wget` to obtain the files, it is suggested to create a `milvus` file containing `db`, `conf`, `logs`, and `wal` folders in a location you find appropriate, for example on the C drive, and copy the the content from [server config file](https://github.com/milvus-io/milvus/blob/v0.7.1/core/conf/demo/server_config.yaml) and [log config file](https://github.com/milvus-io/milvus/blob/v0.7.1/core/conf/demo/log_config.conf) to `server_config.yaml` and `log_config.conf` you created under `C:\milvus\conf`.

For Step 4, start the docker by mapping Milvus files to the right path. The following command is run in Windows Command shell:

```cmd
# Start Milvus
$ docker run -d --name milvus_cpu ^
-p 19530:19530 ^
-p 19121:19121 ^
-p 9091:9091 ^
-v C:\milvus\db:/var/lib/milvus/db ^
-v C:\milvus\conf:/var/lib/milvus/conf ^
-v C:\milvus\logs:/var/lib/milvus/logs ^
-v C:\milvus\wal:/var/lib/milvus/wal ^
milvusdb/milvus:0.7.1-cpu-d040120-d2fad1
```

## Install Milvus on MacOS

The procedures of installing Milvus on Windows are similar to the steps on Ubuntu/CentOS, except for **Step 3 and Step 4**.

For Step 3, the path has some minor differences:

```shell
# Create Milvus file
$ mkdir -p /Users/$USER/milvus/conf
$ cd /Users/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.7.1/core/conf/demo/server_config.yaml
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.7.1/core/conf/demo/log_config.conf
```

For Step 4, start the docker by mapping Milvus files to the right path:

```shell
# Start Milvus
$ docker run -d --name milvus_cpu \
-p 19530:19530 \
-p 19121:19121 \
-p 9091:9091 \
-v /home/$USER/milvus/db:/var/lib/milvus/db \
-v /home/$USER/milvus/conf:/var/lib/milvus/conf \
-v /home/$USER/milvus/logs:/var/lib/milvus/logs \
-v /home/$USER/milvus/wal:/var/lib/milvus/wal \
milvusdb/milvus:0.7.1-cpu-d040120-d2fad1
```

## What's next

- If you're just getting started with Milvus:

  - [Try an example program](../example_code.md)
  - [Learn more about Milvus operations](../../milvus_operation.md)
  - [Try Milvus Bootcamp](https://github.com/milvus-io/bootcamp)
  
- If you're ready to run Milvus in production:

  - Build a [monitoring and alerting system](../../monitor.md) to check real-time application performance
  - Tune Milvus performance through [configuration](../../../reference/milvus_config.md)
  
- If you want to use GPU-accelerated Milvus for search in large datasets:
  
  - [Install GPU-enabled Milvus](gpu_milvus_docker.md)
