## Milvus - Quick Start Guide



This guide is intended to provide you with a quick overview of working with Milvus in Linux systems. (Any assumptions here?)

#### Overview

In this guide, we will walk you through installing Milvus and its Python SDK, enabling Milvus and test running it in your environment.

#### Installing Milvus

So far, Milvus supports  the following Linux distributions:

| Linux operation system   | Version          |
| :----------------------- | :--------------- |
| Red Hat Enterprise Linux | 7.5 and higher   |
| CentOS                   | 7.5 and higher   |
| Ubuntu LTS               | 16.04 and higher |

Before installing Milvus, you need to install the following software packages: 

- CUDA 9.0 and higher
- Docker CE
- NVIDIA-Docker2

For CUDA installing procedures, please refer to https://docs.nvidia.com/cuda/

For how to install Docker CE, go to https://docs.docker.com/install/

And for NVIDIA-Docker2 installing methods, simply visit https://github.com/NVIDIA/nvidia-docker



#### Installing Milvus Python SDK

```
# Install Milvus Python SDK
$ pip install pymilvus
```

For Milvus Python SDK user manuals, visit https://pypi.org/project/pymilvus/



#### Enabling Milvus

After you have downloaded Milvus Docker image, you can start Milvus Server and receive client requests via Port 33001, through the following command. 

```
# Start Milvus
$ nvidia-docker run --runtime=nvidia -p 33001:33001 -v /home/$USER/milvus:/tmp milvus/ubuntu16.04:0.3.0
```

To check Milvus running status and logs, use this: 

```
# Check Milvus log export
docker logs <Milvus container id>
```



#### Running Example

1. Make sure Python3 is already installed. If not, go to https://www.python.org/downloads/ to install it.

2. Save the following code to the file "milvus_examples.py".

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

3. Run below command under the same file.

```
# Run Milvus python example
$ python3 milvus_examples.py
Table table_14, row counts: 20
```

When you see the table of 20 rows, congratulations! Milvus is running normally now.



#### 