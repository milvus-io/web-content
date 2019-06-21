

# Milvus快速入门

该指南主要包含Milvus Docker版的快速安装，以及相关Python示例代码的运行。如果想进一步了解Milvus的使用，请访问Milvus用户手册。

## 安装前提
1. Milvus Docker版目前仅在Linux系统上运行，请确保你的Linux系统符合以下版本：

| Linux 操作系统平台       | 版本        |
| :----------------------- | :---------- |
| CentOS                   | 7.5及以上   |
| Ubuntu LTS               | 16.04及以上 |

2. 请确保您已经安装以下软件包，以便Milvus Docker版能正常运行：

- [CUDA 9.0及以上](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
- [Docker CE](https://docs.docker.com/install/)
- [NVIDIA-Docker2](https://github.com/NVIDIA/nvidia-docker)


## 安装Milvus Docker版

1. 下载Milvus Docker镜像文件。

```shell
# Download Milvus Docker image
$ docker pull milvusdb/milvus:latest
```

2. 启动Milvus server。

```shell
# Start Milvus
$ nvidia-docker run --runtime=nvidia -p 33001:33001 -v /home/$USER/milvus:/tmp milvus/milvus:latest
```

3. 获得Milvus container id

```shell
# Get Milvus container id
$ docker ps -a
```

4. 确认Milvus运行状态。

```shell
# Make sure Milvus is up and running
$ docker logs <milvus container id>
```

## 运行Python示例代码

接下来，让我们来运行一个Python程序示例。您将创建一个向量数据表，向其中插入10条向量，然后运行一条向量相似度查询。

1. 请确保系统已经安装了[Python3](https://www.python.org/downloads/)。
2. 安装Milvus Python SDK。

```shell
# Install Milvus Python SDK
$ pip install pymilvus
```

如果需要进一步了解Milvus Python SDK，请阅读[Milvus Python SDK 用户指南](https://pypi.org/project/pymilvus)。

3. 下载Python示例代码：https://github.com/milvus-io/pymilvus/blob/master/examples/example.py。
4. 运行示例。

```shell
# Run Milvus Python example
$ python3 example.py
```

5. 确认程序正确运行。

```shell
Query result is correct.
```
## 