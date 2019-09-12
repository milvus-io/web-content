---
id: QuickStart
title: Milvus Quick Start
sidebar_label: Milvus Quick Start
---

# Milvus 快速入门

该指南主要包含 Milvus Docker 版的快速安装，以及相关 Python 示例代码的运行。如果想进一步了解 Milvus 的使用，请访问 [Milvus 用户指南](./userguide/preface.md)。

## 安装前提
1. Milvus Docker 版目前仅在 Linux 系统上运行，请确保您的 Linux 系统符合以下版本：

   | Linux 操作系统平台       | 版本        |
   | :----------------------- | :---------- |
   | CentOS                   | 7.5及以上   |
   | Ubuntu LTS               | 16.04及以上 |

2. 硬件配置要求：

   | 硬件名称 |   要求         |
   | -------- | ---------------- |
   | CPU      | 16核+            |
   | GPU      | Pascal 系列及以上 |
   | 内存     | 256GB及以上      |
   | 硬盘类型 | SSD 或者 NVMe      |
   | 网络     | 万兆网卡         |

3. 客户端浏览器要求：

   Milvus 提供了基于 Prometheus 监控和 Grafana 的展示平台，可以对数据库的各项指标进行可视化展示，兼容目前主流的 Web 浏览器如：微软 IE、Google Chrome、Mozilla Firefox 和 Safari 等。
  
4. 请确保您已经安装以下软件包：

   - [NVIDIA driver 418 及以上](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
   - [Docker 19.03 及以上](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)
   
   > 注意：如果您已安装更老版本的 Docker (< 19.03)，建议安装 [nvidia-docker2](https://github.com/NVIDIA/nvidia-docker/wiki/Installation-(version-2.0))。如果你已安装 nvidia-docker2，您也可以将 Docker 升级到最新版本 (>= 19.03)。


## 安装 Milvus

1. 下载 Milvus Docker 镜像文件。

   ```shell
   # Download Milvus Docker image
   $ docker pull milvusdb/milvus:0.4.0
   ```

2. 创建 Milvus 文件，并添加 `server_config.yaml` 和 `log_config.conf`。

   ```shell
   # Create Milvus file
   $ mkdir /home/$USER/milvus
   $ cd /home/$USER/milvus
   $ mkdir conf
   $ cd conf
   $ wget https://raw.githubusercontent.com/milvus-io/docs/branch-0.4.0/assets/server_config.yaml
   $ wget https://raw.githubusercontent.com/milvus-io/docs/branch-0.4.0/assets/log_config.conf
   ```

3. 启动 Milvus server。

   ```shell
   # Start Milvus
   $ nvidia-docker run -td --runtime=nvidia -e "TZ=Asia/Shanghai" -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/opt/milvus/db -v /home/$USER/milvus/conf:/opt/conf -v /home/$USER/milvus/logs:/opt/milvus/logs milvusdb/milvus:0.4.0
   ```

4. 获得 Milvus container id。

   ```shell
   # Get Milvus container id
   $ docker ps -a
   ```

5. 确认 Milvus 运行状态。

   ```shell
   # Make sure Milvus is up and running
   $ docker logs <milvus container id>
   ```

## 运行 Python 示例代码

接下来，让我们来运行一个 Python 程序示例。您将创建一个向量数据表，向其中插入10条向量，然后运行一条向量相似度查询。

1. 请确保系统已经安装了 [Python3](https://www.python.org/downloads/)。

2. 安装 Milvus Python SDK。

   ```shell
   # Install Milvus Python SDK
   $ pip install pymilvus==0.2.0
   ```

   > 提示：如果需要进一步了解 Milvus Python SDK，请阅读 [Milvus Python SDK 使用手册](https://pypi.org/project/pymilvus)。
   
3. 创建 `example.py` 文件，并向文件中加入 [Python示例代码](https://github.com/milvus-io/pymilvus/blob/branch-0.4.0/examples/AdvancedExample.py)。

4. 运行示例代码。

   ```shell
   # Run Milvus Python example
   $ python3 example.py
   ```

5. 确认程序正确运行。

   恭喜您！您已经成功完成了在 Milvus 上的第一次向量相似度查询。
   
## 接下来您可以

- 了解更多 Milvus [基础操作](milvus_operation.md) 
- [体验 Milvus 在线训练营](https://github.com/jielinxu/docs/blob/branch-0.4.0/userguide/bootcamp.md)，发现更多解决方案
