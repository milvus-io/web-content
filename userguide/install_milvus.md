---
id: install_milvus
title: Install Milvus
sidebar_label: Install Milvus
---

# Install Milvus 

See [here](../release/v0.5.0.md) for what's new in the latest release.

## Prerequisites

### Hardware requirements

| Component | Recommended configuration             |
| --------- | ------------------------------------- |
| CPU       | Intel CPU Haswell or higher           |
| GPU       | NVIDIA Pascal series or higher        |
| RAM    | 8 GB or more (depends on data volume) |
| Hard drive   | SATA 3.0 SSD or higher                |

### System requirements

 | Operating system | Supported versions |
 | :--------------------- | :----------------- |
 | CentOS                 | 7.5 or higher     |
 | Ubuntu LTS             | 18.04 or higher   |

### Software requirements

 | Software | Supported versions |
 | :--------------------- | :----------------- |
 | NVIDIA driver          | 418 or higher     |
 | [Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)            |  19.03 or higher   |
     
   > Note: To install NVIDIA driver 418, on your desktop, launch **Software & Updates** utility, and go to **Additional Drivers** tab. Select **Using NVIDIA driver metapackage from nvidia-driver-418**, and click **Apply Changes**. You don't have to install CUDA separately, as it is included in Milvus Docker container.

## Use Docker

1. Confirm that the Docker daemon is running in the background:

   ```shell
   docker info
   ```

   If you do not see the server listed, start the **Docker** daemon.

   > Note: On Linux, Docker needs sudo privileges. If you want to use Docker without sudo, you need to have root privileges.

2. Pull the image for the latest release of Milvus:

   ```shell
   docker pull milvusdb/milvus:latest
   ```

3. Download Milvus source file.

   ```shell
   # Create Milvus file
   $ mkdir -p /home/<$USER>/milvus/conf
   $ cd home/<$USER>/milvus/conf
   $ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/server_config.yaml
   $ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/log_config.conf
   ```

4. Start Milvus server.

   Use `--name <milvus container name>` to assign your Milvus container a customized name, and `-e "TZ=Asia/Shanghai"` to configure the timezone. You can change `Asia/Shanghai` to your local time when necessary.

   ```shell
   # Start Milvus
   $ docker run -td --gpus all --name milvus -e "TZ=Asia/Shanghai" -p 19530:19530 -p 8080:8080 -v /home/<$USER>/milvus/db:/opt/milvus/db -v /home/<$USER>/milvus/conf:/opt/milvus/conf -v /home/<$USER>/milvus/logs:/opt/milvus/logs milvusdb/milvus:latest
   ```
   
5. Confirm Milvus running status.

   ```shell
   # Confirm Milvus status
   $ docker ps
   ```

   If Milvus server is not successfully started, you can check the error logs by the following command.
   
   ```shell
   # Check docker logs
   $ docker logs <milvus container name>
   ```

## What's next

- If you're just getting started with Milvus:

  - [Try an example program](example_code.md)
  - [Learn more about Milvus operations](milvus_operation.md)
  - [Try Milvus Bootcamp](https://github.com/milvus-io/bootcamp)
  
- If you're ready to run Milvus in production:

  - Build a [monitoring and alerting system](monitor.md) to check real-time application performance
  - [Import vectors into Milvus](import_data.md)
  - Tune Milvus performance through [configuration](../reference/milvus_config.md)
