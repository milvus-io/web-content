## 快速入门



#### 安装Milvus 

目前Milvus支持以下版本的Linux: 

| Linux 操作系统平台       | 版本        |
| :----------------------- | :---------- |
| Red Hat Enterprise Linux | 7.5及以上   |
| CentOS                   | 7.5及以上   |
| Ubuntu LTS               | 16.04及以上 |

此外，Milvus安装前，还需要在系统内安装下面软件包：

- CUDA 9.0及以上
- Docker CE
- NVIDIA-Docker2

对于CUDA的安装方法和步骤，请移步：https://docs.nvidia.com/cuda/

对于Docker CE的安装方法和步骤，请移步：https://docs.docker.com/install/

对于NVIDIA-Docker2的安装方法和步骤，请移步：https://github.com/NVIDIA/nvidia-docker



#### 安装Milvus Python SDK

```
# 安装 Milvus Python SDK
$ pip install pymilvus
```

Milvus Python SDK的使用手册，请访问：https://pypi.org/project/pymilvus/



#### 启动Milvus

下载Milvus的Docker镜像后，您可以通过下面命令启动Milvus Server，并且在端口33001端口接受客户端请求：

```
# 启动 Milvus
$ nvidia-docker run --runtime=nvidia -p 33001:33001 -v /home/$USER/milvus:/tmp milvus/ubuntu16.04:0.3.0
```

检查 Milvus 运行状态和运行日志：

```
# 查看 Milvus 的日志输出
docker logs <Milvus container id>
```



#### 运行Example

首先，请确保系统已经安装了安装Python3，如果没有请移步：https://www.python.org/downloads/

然后，将下面的代码保存到milvus_examples.py这个文件中。

```
# Python Example
from milvus import Milvus, Prepare, IndexType, Status
import random

milvus = Milvus()
table_name = 'table_'+str(random.randint(0,100))

# Connect
milvus.connect(host='localhost', port='33001')

# Create table
milvus.create_table(Prepare.table_schema(table_name, dimension=256, index_type=IndexType.IDMAP))

# Add 20 256-dim-vectors to table
vectors = Prepare.records([[random.random()for _ in range(256)] for _ in range(20)])
milvus.add_vectors(table_name=table_name, records=vectors)

# Get table row count
_, result = milvus.get_table_row_count(table_name=table_name)
print('Table {}, row counts: {}'.format(table_name, result))
```

最后，在相同的目录下运行下面的命令。

```
# 运行 Milvus python example
$ python3 milvus_examples.py
Table table_14, row counts: 20
```

看到运行结果显示Table的行数为20行，表明Milvus Server已经正常运行。



#### 