---
id: install_milvus
title: Install Milvus
sidebar_label: Install Milvus
---

# Install Milvus 

See [here](../Releases/v0.4.0.md) for what's new in the latest release. 

## Before the install

1. Make sure your Linux distribution is one of the following:

   | Linux operating system | Supported versions |
   | :--------------------- | :----------------- |
   | CentOS                 | 7.5 and higher     |
   | Ubuntu LTS             | 16.04 and higher   |

2. Make sure the following software packages are installed:

   - [NVIDIA driver 418 or higher](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
   - [Docker 19.03 or higher](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)
   
   > Note: If you are running an old version of docker (< 19.03), it is recommended to install [nvidia-docker2](https://github.com/NVIDIA/nvidia-docker/wiki/Installation-(version-2.0)) package. If you already have the old package installed (nvidia-docker2), updating to the latest Docker version (>= 19.03) will still work.  
   
   > Note: You don't have to install CUDA separately, as it is included in Milvus Docker container.

## Use Docker

1. Confirm that the Docker daemon is running in the background: 

   ```
   docker version
   ```

   If you do not see the server listed, start the **Docker** daemon.

   > Note: On Linux, Docker needs sudo privileges.

2. Pull the image for the v0.4.0 release of Milvus:

   ```
   docker pull milvusdb/milvus:latest
   ```

3. Download Milvus source file.

   ```shell
   # Create Milvus file
   $ mkdir /home/$USER/milvus
   $ cd /home/$USER/milvus
   $ mkdir conf
   $ cd conf
   $ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/server_config.yaml
   $ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/log_config.conf
   ```

4. Start Milvus server.

   ```shell
   # Start Milvus
   $ nvidia-docker run -td --runtime=nvidia -e "TZ=Asia/Shanghai" -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/opt/milvus/db -v /home/$USER/milvus/conf:/opt/milvus/conf -v /home/$USER/milvus/logs:/opt/milvus/logs milvusdb/milvus:latest
   ```

5. Confirm Milvus running status.

   ```shell
   # Get Milvus container id
   $ docker ps -a
   # Make sure Milvus is up and running
   $ docker logs <milvus container id>
   ```

## What's next？

- If you're just getting started with Milvus:

  - [Try an Example Program](example_code.md)
  - [Learn more about Milvus Operations](milvus_operation.md)
  - [Try Milvus Bootcamp](https://github.com/milvus-io/bootcamp)
  
- If you're ready to run Milvus in production:

  - Build a [Monitoring and Alerting system](monitor.md) to check real-time application performance
  - [Import vectors into Milvus](import_data.md)
  - Tune Milvus performance through [configuration](../reference/milvus_config.md)
