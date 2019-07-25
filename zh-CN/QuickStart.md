---
id: QuickStart
title: Milvus Quick Start
sidebar_label: Milvus Quick Start
---

# Milvus快速入门

该指南主要包含Milvus Docker版的快速安装，以及相关Python示例代码的运行。如果想进一步了解Milvus的使用，请访问[Milvus用户指南](/zh-CN/userguide/preface.md)。

## 安装前提
1. Milvus Docker版目前仅在Linux系统上运行，请确保你的Linux系统符合以下版本：

   | Linux 操作系统平台       | 版本        |
   | :----------------------- | :---------- |
   | CentOS                   | 7.5及以上   |
   | Ubuntu LTS               | 16.04及以上 |

2. 硬件配置要求：

   | 硬件名称 |   要求         |
   | -------- | ---------------- |
   | CPU      | 16核+            |
   | GPU      | Pascal系列及以上 |
   | 内存     | 256GB及以上      |
   | 硬盘类型 | SSD或者NVMe      |
   | 网络     | 万兆网卡         |

3. 客户端浏览器要求：

   Milvus提供了基于Prometheus监控和Grafana的展示平台，可以对数据库的各项指标进行可视化展示，兼容目前主流的Web浏览器如：微软IE、Google Chrome、Mozilla Firefox和Safari等。
  
4. 请确保你已经安装以下软件包，以便Milvus Docker版能正常运行：

   - [CUDA 9.0及以上](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
   - [Docker CE](https://docs.docker.com/install/)
   - [NVIDIA-Docker2](https://github.com/NVIDIA/nvidia-docker)


## 安装Milvus Docker版

1. 下载Milvus Docker镜像文件。

   ```shell
   # Download Milvus Docker image
   $ docker pull milvusdb/milvus:0.3.0
   ```

2. 创建Milvus文件，并添加server config和log config。

   ```shell
   # Create Milvus file
   $ mkdir /home/$USER/milvus
   $ cd /home/$USER/milvus
   $ mkdir conf
   $ cd conf
   $ wget https://github.com/milvus-io/docs/blob/branch-0.3.0/assets/server_config.yaml
   $ wget https://github.com/milvus-io/docs/blob/branch-0.3.0/assets/log_config.conf
   ```

3. 启动Milvus server。

   ```shell
   # Start Milvus
   $ nvidia-docker run -td --runtime=nvidia -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/opt/milvus/db -v /home/$USER/milvus/conf:/opt/conf -v /home/$USER/milvus/logs:/opt/milvus/logs milvusdb/milvus:0.3.0
   ```

4. 获得Milvus container id。

   ```shell
   # Get Milvus container id
   $ docker ps -a
   ```

5. 确认Milvus运行状态。

   ```shell
   # Make sure Milvus is up and running
   $ docker logs <milvus container id>
   ```

## 运行Python示例代码

接下来，让我们来运行一个Python程序示例。你将创建一个向量数据表，向其中插入10条向量，然后运行一条向量相似度查询。

1. 请确保系统已经安装了[Python3](https://www.python.org/downloads/)。
2. 安装Milvus Python SDK。

   ```shell
   # Install Milvus Python SDK
   $ pip install pymilvus==0.1.13
   ```

   > 提示：如果需要进一步了解Milvus Python SDK，请阅读[Milvus Python SDK使用手册](https://pypi.org/project/pymilvus)。
   
   > 注意：取决于您所使用的Milvus版本，你不一定要将Pymilvus升级到最新版本。

3. 创建*example.py*文件，并向文件中加入[Python示例代码](https://github.com/milvus-io/pymilvus/blob/branch-0.3.0/examples/example.py)。
4. 运行示例代码。

   ```shell
   # Run Milvus Python example
   $ python3 example.py
   ```

5. 确认程序正确运行。

   ```shell
   Query result is correct.
   ```
如果你看到以上查询结果提示信息，恭喜你！这意味着你已经成功完成了在Milvus上的第一次向量相似度查询。

