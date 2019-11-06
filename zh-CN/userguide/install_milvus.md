---
id: install_milvus
title: Install Milvus
sidebar_label: Install Milvus
---
# 安装 Milvus

点击 [版本发布](../release/v0.5.1.md) 了解最新版本的功能。

## 安装前提

### 硬件要求

| 组件 | 建议配置                          |
| ---- | --------------------------------- |
| CPU  | Intel CPU Haswell 或以上          |
| GPU  | NVIDIA Pascal series 或以上       |
| 内存 | 8 GB 或以上 （取决于具体向量数据规模） |
| 硬盘 | SATA 3.0 SSD 或以上               |

### 系统要求

 | 操作系统 | 版本             |
 | ----------------- | --------------- |
 | CentOS             | 7.5 或以上   |
 | Ubuntu LTS         | 18.04 或以上|

### 软件要求

 | 软件 | 版本             |
 | ----------------- | --------------- |
 | NVIDIA driver            | 418 或以上   |
 | [Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)        | 19.03 或以上|
   
> 若要安装 NVIDIA driver 418，在电脑桌面，进入 **Software & Updates** -> **Additional Drivers**。选择 **Using NVIDIA driver metapackage from nvidia-driver-418**，然后点击 **Apply Changes**。您无需单独安装 CUDA 环境，因为它已经包含在 Milvus Docker 容器里。
   
## 使用 Docker

1. 确认后台已经运行 Docker daemon：

   ```shell
   docker info
   ```

   如果没有看到相关服务器，请启动 **Docker** daemon.

   > 提示：在 Linux 上，Docker 需要带 sudo。如果您有 root 权限，可以不加 sudo。

2. 拉取 Milvus 最新版本的镜像：

   ```shell
   sudo docker pull milvusdb/milvus:latest
   ```

3. 下载 Milvus 源文件。

   ```shell
   # Create Milvus file
   $ mkdir -p /home/<$USER>/milvus/conf
   $ cd home/<$USER>/milvus/conf
   $ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/server_config.yaml
   $ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/log_config.conf
   ```

4. 启动 Milvus server。

   若要给 Milvus container 一个自定义的名字，请使用 `--name <milvus container name>` 。若要设置时区，请使用 `-e "TZ=Asia/Shanghai"` 。请按需要将 `Asia/Shanghai` 换成您的当地时间。

   ```shell
   # Start Milvus
   $ docker run -td --gpus all --name milvus -e "TZ=Asia/Shanghai" -p 19530:19530 -p 8080:8080 -v /home/<$USER>/milvus/db:/opt/milvus/db -v /home/<$USER>/milvus/conf:/opt/milvus/conf -v /home/<$USER>/milvus/logs:/opt/milvus/logs milvusdb/milvus:latest
   ```

5. 确认 Milvus 运行状态。

   ```shell
   # Confirm Milvus status
   $ docker ps
   ```
   
   如果 Milvus 服务没有正常启动，您可以执行以下命令查询错误日志。
   
   ```shell
   # Check docker logs
   $ docker logs <milvus container name>
   ```

## 接下来您可以

- 如果您刚开始了解 Milvus：

  - [运行示例程序](example_code.md)
  - [了解更多 Milvus 操作](milvus_operation.md)
  - [体验 Milvus 在线训练营](https://github.com/milvus-io/bootcamp)

- 如果您已准备好在生产环境中部署 Milvus：

  - [向 Milvus 导入数据](import_data.md)
  - 创建 [监控与报警系统](monitor.md) 实时查看系统表现
  - [设置 Milvus 参数](../reference/milvus_config.md)
