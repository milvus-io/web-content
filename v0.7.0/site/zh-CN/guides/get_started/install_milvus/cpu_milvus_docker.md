---
id: cpu_milvus_docker.md
title: Install CPU-only Milvus on Docker
sidebar_label: Install CPU-only Milvus on Docker
---

# 安装仅需 CPU 的 Milvus

## 安装前提

#### 操作系统要求

| 操作系统   | 版本                                                         |
| ---------- | ------------------------------------------------------------ |
| CentOS     | 7.5 或以上                                                   |
| Ubuntu LTS | 18.04 或以上                                                 |
| Windows    | Windows 10 64-bit：Pro，Enterprise，或 Education 版（Build 15063 或以上） |
| MacOS      | 10.13 或以上         |

#### 硬件要求

| 组件 | 建议配置                               |
| ---- | -------------------------------------- |
| CPU  | Intel CPU Haswell 或以上               |
| 内存 | 8 GB 或以上 （取决于具体向量数据规模） |
| 硬盘 | SATA 3.0 SSD 或以上                    |

#### Milvus Docker 要求

- 如果使用 Ubuntu 或 CentOS 安装 Milvus，请在您的宿主机上 [安装 Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) 19.03或更高版本。
- 如果在 Windows 上安装 Milvus，请安装 [Docker Desktop](https://docs.docker.com/docker-for-windows/install/)，并进入 **Settings -> Advanced** 调整相关配置。请确保‘可用内存’大于您在 `server_config.yaml` 文件中设置的`insert_buffer_size` 和 `cpu_cache_capacity` 之和。
- 如果在 MacOS 上安装 Milvus，请安装[Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)，并进入 **Preferences -> Advanced** 调整相关配置。请确保‘可用内存’大于您在 `server_config.yaml` 文件中设置的`insert_buffer_size` 和 `cpu_cache_capacity` 之和。

## 在 Ubuntu/CentOS 上安装 Milvus

#### 第一步 确认 Docker 状态

确认 Docker daemon 正在运行：

```shell
$ docker info
```

如果无法正常打印 Docker 相关信息，请启动 **Docker** daemon.

> 提示：在 Linux 上，Docker 命令前面需加 `sudo`。若要在没有 `sudo` 情况下运行 Docker 命令，请创建 `docker` 组并添加用户。更多详情，请参阅 [Linux 安装后步骤](https://docs.docker.com/install/linux/linux-postinstall/)。

#### 第二步 拉取 Milvus 镜像

拉取仅需 CPU 的镜像：

```shell
$ docker pull milvusdb/milvus:0.7.0-cpu-d031120-de409b
```

> 注意：如果您在拉取镜像时速度过慢或一直失败，请参考[操作常见问题](../../../faq/operational_faq.md)中提供的解决办法。

#### 第三步 下载配置文件

```shell
# Create Milvus file
$ mkdir -p /home/$USER/milvus/conf
$ cd /home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.7.0/core/conf/demo/server_config.yaml
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.7.0/core/conf/demo/log_config.conf
```

> 注意：万一您遇到无法通过 `wget` 命令正常下载配置文件的情况，您也可以在 `/home/$USER/milvus/conf` 路径下创建 `server_config.yaml` 和 `log_config.conf` 文件，然后复制粘贴 [server config 文件](https://github.com/milvus-io/milvus/blob/v0.7.0/core/conf/demo/server_config.yaml) 和 [log config 文件](https://github.com/milvus-io/milvus/blob/v0.7.0/core/conf/demo/log_config.conf)的内容。

#### 第四步 启动 Milvus Docker 容器

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
milvusdb/milvus:0.7.0-cpu-d031120-de409b
```

上述命令中用到的 `docker run` 参数定义如下：

- `-d`: 运行 container 到后台并打印 container id。
- `--name`: 为 container 分配一个名字。
- `-p`: 暴露 container 端口到 host。
- `-v`: 将路径挂载至 container。

最后，确认 Milvus 运行状态：

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

## 在 Windows 上安装 Milvus

在 Windows 上安装 Milvus 的步骤和在 Ubuntu/CentOS 上几乎一样，只不过 **第三步** 和 **第四步** 略有不同。

在第三步中，不同于使用 `wget` 来获取配置文件，使用 Windows 安装时，建议在 C 盘，或其它合适的位置创建 `milvus` 文件夹，下面包含 `db`，`conf`，`logs` 和 `wal` 等文件夹，然后分别复制 [server config 文件](https://github.com/milvus-io/milvus/blob/v0.7.0/core/conf/demo/server_config.yaml) 和 [log config 文件](https://github.com/milvus-io/milvus/blob/v0.7.0/core/conf/demo/log_config.conf)的内容到您在 `C:\milvus\conf` 路径下创建的`server_config.yaml` 和 `log_config.conf` 文件中。

第四步，启动 Docker 容器，将 Milvus 文件映射到您本地的文件路径。下面的命令是在命令提示符中运行的：

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
milvusdb/milvus:0.7.0-cpu-d031120-de409b
```

## 在 MacOS 上安装 Milvus

在 Windows 上安装 Milvus 的步骤和在 Ubuntu/CentOS 上几乎一样，只不过 **第三步** 和 **第四步** 略有不同。

第三步，安装路径有细微差别：

```shell
# Create Milvus file
$ mkdir -p /Users/$USER/milvus/conf
$ cd /Users/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.7.0/core/conf/demo/server_config.yaml
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.7.0/core/conf/demo/log_config.conf
```

第四步，启动 Docker 容器，将 Milvus 文件映射到您本地的文件路径：

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
milvusdb/milvus:0.7.0-cpu-d031120-de409b
```

## 接下来您可以

- 如果您刚开始了解 Milvus：

  - [运行示例程序](../example_code.md)
  - [了解更多 Milvus 操作](../../milvus_operation.md)
  - [体验 Milvus 在线训练营](https://github.com/milvus-io/bootcamp)

- 如果您已准备好在生产环境中部署 Milvus：

  - 创建 [监控与报警系统](../../monitor.md) 实时查看系统表现
  - [设置 Milvus 参数](../../../reference/milvus_config.md)
  
- 如果您想使用针对大数据集搜索的 GPU 加速版 Milvus：

  - [安装支持 GPU 的 Milvus](gpu_milvus_docker.md)
