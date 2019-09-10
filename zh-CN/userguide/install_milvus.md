---
id: install_milvus
title: Install Milvus
sidebar_label: Install Milvus
---
# 安装 Milvus

点击 [版本发布] 了解最新版本的功能。若要更新到最新版本，请访问 [升级 Milvus]。

## 安装前提

1. 请确保您的Linux系统符合以下版本：

| Linux 操作系统平台 | 版本             |
| :----------------- | :--------------- |
| CentOS             | 7.5 and higher   |
| Ubuntu LTS         | 18.04 and higher |

2. 请确保您已经安装以下软件包：
   - [CUDA 10.1及以上](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
   - [NVIDIA-Docker2](https://github.com/NVIDIA/nvidia-docker)

## 使用 Docker

1. 安装 [Docker for Linux](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)。请仔细检查以确保您已经满足 Docker 安装的前提条件。

2. 确认后台已经运行 Docker daemon：

   ```
   docker version
   ```

   如果没有看到相关服务器，请启动 **Docker** daemon.

   > 提示：在 Linux 上，Docker 需要带 sudo。

3. 拉取 Milvus 0.4.0版本的镜像：

   ```
   sudo docker pull milvusdb/milvus:0.4.0
   ```

4. 下载 Milvus 源文件。

   ```shell
   # Create Milvus file
   $ mkdir /home/$USER/milvus
   $ cd /home/$USER/milvus
   $ mkdir conf
   $ cd conf
   $ wget https://raw.githubusercontent.com/milvus-io/docs/branch-0.4.0/assets/server_config.yaml
   $ wget https://raw.githubusercontent.com/milvus-io/docs/branch-0.4.0/assets/log_config.conf
   ```

5. 启动 Milvus server。

   ```shell
   # Start Milvus
   $ nvidia-docker run -td --runtime=nvidia -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/opt/milvus/db -v /home/$USER/milvus/conf:/opt/milvus -v /home/$USER/milvus/logs:/opt/milvus/logs milvusdb/milvus:0.3.0
   ```

6. 确认 Milvus 运行状态。

   ```shell
   # Get Milvus container id
   $ docker ps -a
   # Make sure Milvus is up and running
   $ docker logs <milvus container id>
   ```

## 接下来您可以

- 如果您刚开始了解 Milvus：

  - [了解更多 Milvus 操作]
  - [体验 Milvus Boot Camp] 

- 如果您已准备好在生产环境中部署 Milvus：

  - 创建 [监控与报警系统] 实时查看系统表现
  - [设置 Milvus 参数]
