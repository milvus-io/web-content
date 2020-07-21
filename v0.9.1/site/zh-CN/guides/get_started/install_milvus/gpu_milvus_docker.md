---
id: gpu_milvus_docker.md
title: Install GPU-enabled Milvus on Docker
sidebar_label: Install GPU-enabled Milvus on Docker
---

# 安装支持 GPU 的 Milvus

## 安装前提

#### 系统要求

| 操作系统   | 建议版本     |
| ---------- | ------------ |
| CentOS     | 7.5 或以上   |
| Ubuntu LTS | 18.04 或以上 |

#### 硬件要求

| 组件 | 建议配置                               |
| ---- | -------------------------------------- |
| CPU        | Intel CPU Sandy Bridge 或以上 |
| CPU 指令集 | <li>SSE42</li><li>AVX</li><li>AVX2</li><li>AVX512</li> |
| GPU  | NVIDIA Pascal 或以上                   |
| 内存 | 8 GB 或以上 （取决于具体向量数据规模） |
| 硬盘 | SATA 3.0 SSD 或以上                    |

#### Milvus Docker 要求

- 在你的宿主机上安装 [Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) 19.03 或更高版本。
- 安装 NVIDIA driver 418 或更高版本。
- 安装 [NVIDIA Docker](https://github.com/NVIDIA/nvidia-docker)。

## 第一步 确认 Docker 状态

确认 Docker daemon 正在运行：

```shell
$ docker info
```

如果无法正常打印 Docker 相关信息，请启动 **Docker** daemon.

> 提示：在 Linux 上，Docker 命令前面需加 `sudo`。若要在没有 `sudo` 情况下运行 Docker 命令，请创建 `docker` 组并添加用户。更多详情，请参阅 [Linux 安装后步骤](https://docs.docker.com/install/linux/linux-postinstall/)。

## 第二步 拉取 Milvus 镜像

拉取支持 GPU 的镜像：

```shell
$ docker pull milvusdb/milvus:0.9.1-gpu-d052920-e04ed5
```

> 注意：如果你在拉取镜像时速度过慢或一直失败，请参考 [操作常见问题](../../../faq/operational_faq.md) 中提供的解决办法。

## 第三步 下载并修改配置文件

你可以使用以下方法下载配置文件：

```shell
$ mkdir -p /home/$USER/milvus/conf
$ cd /home/$USER/milvus/conf
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v0.9.1/core/conf/demo/server_config.yaml
```

> 注意：万一你遇到无法通过 `wget` 命令正常下载配置文件的情况，你也可以在 `/home/$USER/milvus/conf` 路径下创建 `server_config.yaml` 文件，然后复制粘贴 [server config 文件](https://github.com/milvus-io/milvus/blob/v0.9.1/core/conf/demo/server_config.yaml) 的内容。

配置文件下载完成后，你需要将 `server_config.yaml` 中的 `gpu_resource_config` 部分的 `enable` 参数设置为 `true`。


## 第四步 启动 Milvus Docker 容器

```shell
$ docker run -d --name milvus_gpu_0.9.1 --gpus all \
-p 19530:19530 \
-p 19121:19121 \
-v /home/$USER/milvus/db:/var/lib/milvus/db \
-v /home/$USER/milvus/conf:/var/lib/milvus/conf \
-v /home/$USER/milvus/logs:/var/lib/milvus/logs \
-v /home/$USER/milvus/wal:/var/lib/milvus/wal \
milvusdb/milvus:0.9.1-gpu-d052920-e04ed5
```

上述命令中用到的 `docker run` 参数定义如下：

- `-d`: 运行 container 到后台并打印 container id。
- `--name`: 为 container 分配一个名字。
- `--gpus`: 指定可用的 GPU。如未填写任何值，则所有 GPU 都可用。
- `-p`: 暴露 container 端口到 host。
- `-v`: 将路径挂载至 container。

最后，确认 Milvus 运行状态：

```shell
$ docker ps
```

如果 Milvus 服务没有正常启动，你可以执行以下命令查询错误日志。

```shell
# 获得运行 Milvus 的 container ID。
$ docker ps -a
# 检查 docker 日志。
$ docker logs <milvus container id>
```

## 接下来你可以

- 如果你刚开始了解 Milvus：

  - [运行示例程序](../example_code.md)
  - [了解更多 Milvus 操作](../../milvus_operation.md)
  - [体验 Milvus 在线训练营](https://github.com/milvus-io/bootcamp)

- 如果你已准备好在生产环境中部署 Milvus：

  - 创建 [监控与报警系统](../../monitor.md) 实时查看系统表现
  - [设置 Milvus 参数](../../../reference/milvus_config.md)
  
- 如果你想在仅有 CPU 的环境下使用 Milvus：

  - [安装仅需 CPU 的 Milvus](cpu_milvus_docker.md)

