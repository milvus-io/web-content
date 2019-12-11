---
id: install_milvus
title: Install Milvus
sidebar_label: Install Milvus
---
# 安装 Milvus

Milvus在纯 CPU 或 GPU 环境下都可以运行。若要在纯 CPU 环境下使用 Milvus，请安装仅支持 CPU 的 Milvus。否则，建议安装支持 GPU 的 Milvus 以获取针对海量数据的更优的查询性能。

Milvus 中的向量搜索包含但不限于这两个独立的部分：创建索引过程和搜索计算过程。在支持 GPU 的 Milvus中，这两个过程可以同时进行，提高查询效率，特别适合动态增加的数据。而在仅支持 CPU 的 Milvus 中，搜索计算必须在创建索引结束后才能进行，所以更适合静态数据。

## 安装前提

### 系统要求

| 操作系统   | 版本         |
| ---------- | ------------ |
| CentOS     | 7.5 或以上   |
| Ubuntu LTS | 18.04 或以上 |

### 硬件要求

| 组件 | 建议配置                          |
| ---- | --------------------------------- |
| CPU  | Intel CPU Haswell 或以上          |
| 内存 | 8 GB 或以上 （取决于具体向量数据规模） |
| 硬盘 | SATA 3.0 SSD 或以上               |

> 注意：对于支持 GPU 的 Milvus，您还需要确保 GPU 版本是 NVIDIA Pascal 或以上。

## 使用 Docker 安装

Docker 是下载启动 Milvus 最简单且推荐的方法。仅支持 CPU 和支持 GPU 的 Milvus 镜像都经过了系统测试。 

### Milvus Docker 要求

- 在您的宿主机上[安装 Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) 19.03或更高版本。
- 若要启用 GPU 支持，[安装 NVIDIA Docker](https://github.com/NVIDIA/nvidia-docker).

> 注意：在安装 NVIDIA Docker之前，请确保您已安装 NVIDIA driver 418或以上。如若还未安装，您可以在电脑桌面，进入 **Software & Updates** -> **Additional Drivers**。选择 **Using NVIDIA driver metapackage from nvidia-driver-418**，然后点击 **Apply Changes**。您无需单独安装 CUDA 环境，因为它已经包含在 Milvus Docker 容器里。

### 第一步 确认 Docker 状态

确认后台已经运行 Docker daemon：

```shell
$ docker info
```

如果没有看到相关服务器，请启动 **Docker** daemon.

> 提示：在 Linux 上，Docker 命令前面需加 `sudo`。若要在没有 `sudo` 情况下运行 Dockers 命令，请创建 `docker` 组并添加用户。更多详情，请参阅 [Linux 安装后步骤](https://docs.docker.com/install/linux/linux-postinstall/)。

### 第二步 拉取 Milvus Docker 镜像

若要拉取仅支持 CPU 的镜像：

```shell
$ docker pull milvusdb/milvus:cpu-latest
```

若要拉取支持 GPU 的镜像：

```shell
$ docker pull milvusdb/milvus:latest

```

### 第三步 下载 Milvus 配置文件

下载仅支持 CPU 的配置文件：

```shell
# Download Milvus config file
$ mkdir -p /home/$USER/milvus/conf
$ cd home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/server_config_cpu.yaml
$ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/log_config.conf
```

下载支持 GPU 的配置文件：

```shell
# Download Milvus config file
$ mkdir -p /home/$USER/milvus/conf
$ cd home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/server_config_gpu.yaml
$ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/log_config.conf
```

### 第四步 启动 Milvus Docker 容器

启动仅支持 CPU 的 Docker 容器：

```shell
# Start Milvus
$ docker run -td --name milvus_cpu -e "TZ=Asia/Shanghai" -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/var/lib/milvus/db -v /home/$USER/milvus/conf:/var/lib/milvus/conf -v /home/$USER/milvus/logs:/var/lib/milvus/logs milvusdb/milvus:cpu-latest
```

启动支持 GPU 的 Docker 容器：

```shell
# Start Milvus
$ docker run -td --name milvus_gpu gpus all -e "TZ=Asia/Shanghai" -p 19530:19530 -p 8080:8080 -v /home/$USER/milvus/db:/var/lib/milvus/db -v /home/$USER/milvus/conf:/var/lib/milvus/conf -v /home/$USER/milvus/logs:/var/lib/milvus/logs milvusdb/milvus:latest
```

若要设置时区，请使用 `-e "TZ=Asia/Shanghai"` ，并将 `Asia/Shanghai` 换成您本地的[时区](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)。最后，通过确认 Milvus 运行状态。

```shell
# Confirm Milvus status
$ docker ps
```

如果 Milvus 服务没有正常启动，您可以执行以下命令查询错误日志。

```shell
# Get id of the container running Milvus
$ docker ps -a
# Check docker logs
$ docker logs <milvus container id>
```

## 从源代码编译

[从源代码编译 Milvus](https://github.com/milvus-io/milvus/blob/master/install.md) 并将其安装在 Ubuntu 上。尽管这些说明可能适用于其它系统，但我们仅针对 Ubuntu 18.04版本进行了测试。

## 接下来您可以

- 如果您刚开始了解 Milvus：

  - [运行示例程序](example_code.md)
  - [了解更多 Milvus 操作](milvus_operation.md)
  - [体验 Milvus 在线训练营](https://github.com/milvus-io/bootcamp)

- 如果您已准备好在生产环境中部署 Milvus：

  - [向 Milvus 导入数据](import_data.md)
  - 创建 [监控与报警系统](monitor.md) 实时查看系统表现
  - [设置 Milvus 参数](../reference/milvus_config.md)
