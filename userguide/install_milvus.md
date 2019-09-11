---
id: install_milvus
title: Install Milvus
sidebar_label: Install Milvus
---

# Install Milvus 

See [here](../Releases) for what's new in the latest release. 

## Before the install

1. Make sure your Linux distribution is one of the following:

| Linux operation system | Supported versions |
| :--------------------- | :----------------- |
| CentOS                 | 7.5 and higher     |
| Ubuntu LTS             | 18.04 and higher   |

2. Make sure the following software packages are installed:
   - [CUDA 10.1 or higher](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
   - [NVIDIA driver & Docker 19.03 or higher](https://github.com/NVIDIA/nvidia-docker)

## Use Docker

1. Install [Docker for Linux](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/). Please carefully check that you meet all prerequisites.

2. Confirm that the Docker daemon is running in the background: 

   ```
   docker version
   ```

   If you do not see the server listed, start the **Docker** daemon.

   > Note: On Linux, Docker needs sudo privileges.

3. Pull the image for the v0.4.0 release of Milvus:

   ```
   sudo docker pull milvusdb/milvus:0.4.0
   ```

4. Download Milvus source file.

   ```shell
   # Create Milvus file
   $ mkdir /home/$USER/milvus
   $ cd /home/$USER/milvus
   $ mkdir conf
   $ cd conf
   $ wget https://raw.githubusercontent.com/milvus-io/docs/branch-0.4.0/assets/server_config.yaml
   $ wget https://raw.githubusercontent.com/milvus-io/docs/branch-0.4.0/assets/log_config.conf
   ```

5. Start Milvus server.

   ```shell
   # Start Milvus
   $ nvidia-docker run -td --runtime=nvidia -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/opt/milvus/db -v /home/$USER/milvus/conf:/opt/milvus -v /home/$USER/milvus/logs:/opt/milvus/logs milvusdb/milvus:0.4.0
   ```

6. Confirm Milvus running status.

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
  - [Try Milvus Bootcamp](bootcamp.md)
  
- If you're ready to run Milvus in production:

  - Build a [Monitoring and Alerting system](monitor.md) to check real-time application performance
  - [Import vectors into Milvus](import_data.md)
  - Tune Milvus performance through [configuration](milvus_config.md)
