

# 快速入门

## 安装前提
Milvus Docker版目前支持以下版本的Linux系统: 

| Linux 操作系统平台       | 版本        |
| :----------------------- | :---------- |
| CentOS                   | 7.5及以上   |
| Ubuntu LTS               | 16.04及以上 |

Milvus Docker版安装前，需要在系统内安装下面软件包：

- CUDA 9.0及以上
- Docker CE
- NVIDIA-Docker2

关于CUDA的安装方法和步骤，请移步：https://docs.nvidia.com/cuda/

关于Docker CE的安装方法和步骤，请移步：https://docs.docker.com/install/

关于NVIDIA-Docker2的安装方法和步骤，请移步：https://github.com/NVIDIA/nvidia-docker


## 安装Milvus Docker版


下载Milvus Docker镜像文件。

```shell
# Download Milvus Docker image
$ docker pull milvusdb/milvus:latest
```

启动Milvus Server。

```shell
# Download Milvus Docker image
$ nvidia-docker run --runtime=nvidia -p 33001:33001
```

确认Milvus运行状态。

```shell
# Make sure Milvus is up and running
$ docker logs <Milvus container id>
```

## 运行Python示例代码

首先，请确保系统已经安装了Python3。如果没有请移步：https://www.python.org/downloads/

然后，安装Milvus Python SDK。关于Python SDK的详细使用，请访问[Milvus Python开发手册](https://milvus.io/docs/pymilvus)

```
# 安装 Milvus Python SDK
$ pip install pymilvus
```

https://github.com/milvus-io/pymilvus/blob/master/examples/simple_example.py

#### 