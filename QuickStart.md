---
id: QuickStart
title: Milvus Quick Start
sidebar_label: Milvus Quick Start
---

#  Milvus Quick Start

In this guide, we will walk you through installing Milvus Docker as well as running some Python example codes. If you want to learn more about how to use Milvus, visit [Milvus Docker User Guide](https://github.com/milvus-io/docs/blob/master/UserGuide.md).

## Prerequisites

1. As Milvus Docker is now supported only on Linux systems, make sure your Linux distribution is one of the following:

   | Linux operation system | Supported versions          |
   | :--------------------- | :--------------- |
   | CentOS                 | 7.5 and higher   |
   | Ubuntu LTS             | 16.04 and higher |

2. Make sure these software packages are installed so that Milvus can be run on Docker:

   - [CUDA 9.0 and higher]( https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
   - [Docker CE]( https://docs.docker.com/install/)
   - [NVIDIA-Docker2](https://github.com/NVIDIA/nvidia-docker)

## Installing Milvus Docker

1. Download Milvus Docker image.

   ```shell
   # Download Milvus Docker image
   $ docker pull milvusdb/milvus:latest
   ```

2. Start Milvus server.

   ```shell
   # Start Milvus
   $ nvidia-docker run --runtime=nvidia -p 19530:19530 -v /home/$USER/milvus:/tmp milvus/milvus:latest
   ```

3. Get Milvus container id.

   ```shell
   # Get Milvus container id
   $ docker ps -a
   ```

4. Confirm Milvus running status.

   ```shell
   # Make sure Milvus is up and running
   $ docker logs <milvus container id>
   ```

## Running Python example program

Now, let's run a Python example program. You will need to create a vector data table, insert 10 vectors, and then run a vector similarity search.

1. Make sure [Python3](https://www.python.org/downloads/ ) is already installed. 

2. Install Milvus Python SDK.

   ```shell
   # Install Milvus Python SDK
   $ pip install pymilvus
   ```

   Note: To learn more about Milvus Python SDK, go to [Milvus Python SDK Playbook](https://pypi.org/project/pymilvus).

3. Download Python example code at https://github.com/milvus-io/pymilvus/blob/master/examples/example.py.

4. Run the example code.

   ```shell
   # Run Milvus Python example
   $ python3 example.py
   ```

5. Confirm the program is running correctly.

   ```shell
   Query result is correct.
   ```

If you see the above query result message, congratulations! You have successfully completed your first vector similarity search with Milvus.


