

# Milvus Docker版 - 快速入门

该指南主要包含Milvus Docker版的快速安装，以及相关Python示例代码的运行。如果想了解Milvus Docker版的具体使用，请访问Milvus Docker版用户手册。

## 安装前提
1. Milvus Docker版目前仅在Linux系统上运行，请确保你的Linux系统符合以下版本：

| Linux 操作系统平台       | 版本        |
| :----------------------- | :---------- |
| CentOS                   | 7.5及以上   |
| Ubuntu LTS               | 16.04及以上 |

2. 请确保你已经安装以下软件包，以便Milvus Docker版能正常运行：

- [CUDA 9.0及以上](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
- [Docker CE](https://docs.docker.com/install/)
- [NVIDIA-Docker2](https://github.com/NVIDIA/nvidia-docker)


## 安装Milvus Docker版

1. 下载Milvus Docker镜像文件。

```
# Start Milvus
$ nvidia-docker run --runtime=nvidia -p 33001:33001 -v /home/$USER/milvus:/tmp milvus/ubuntu16.04:0.3.0
=======
​```shell
# Download Milvus Docker image
$ docker pull milvusdb/milvus:latest
>>>>>>> master
```

2. 启动Milvus server。

```
# Check Milvus log export
docker logs <Milvus container id>
=======
​```shell
# Download Milvus Docker image
$ nvidia-docker run --runtime=nvidia -p 33001:33001
>>>>>>> master
```

3. 确认Milvus运行状态。

```shell
# Make sure Milvus is up and running
$ docker logs <Milvus container id>
```

## 运行Python示例代码

为了确认Milvus Docker版已经能正常运行，请按照以下步骤运行Python示例代码：

1. 请确保系统已经安装了[Python3](https://www.python.org/downloads/)。

2. 安装Milvus Python SDK。了解[Milvus Python SDK 用户指南](https://pypi.org/project/pymilvus)

```
<<<<<<< HEAD
# Run Milvus python example
$ python3 milvus_examples.py
Table table_14, row counts: 20
=======
# 安装 Milvus Python SDK
$ pip install pymilvus
>>>>>>> master
```

3. 运行Python示例代码https://github.com/milvus-io/pymilvus/blob/master/examples/simple_example.py

#### 