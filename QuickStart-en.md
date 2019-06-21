##  Milvus Docker - Quick Start Guide



In this guide, we will walk you through installing Milvus Docker as well as running some Python example codes in Milvus. If you want to learn more about how to use Milvus Docker, please visit Milvus Docker User Manuals.

#### Installation prerequisites

1. As Milvus Docker is now supported only on Linux systems, make sure your Linux distribution is one of the following:

| Linux operation system | Version          |
| :--------------------- | :--------------- |
| CentOS                 | 7.5 and higher   |
| Ubuntu LTS             | 16.04 and higher |

2. Make sure these software packages are installed so that Milvus can be run on Docker:

- [CUDA 9.0 and higher]( https://docs.nvidia.com/cuda/)
- [Docker CE]( https://docs.docker.com/install/)
- [NVIDIA-Docker2](https://github.com/NVIDIA/nvidia-docker)

#### Installing Milvus Docker

1. Download Milvus Docker image.
2. Start Milvus server.

```
# Start Milvus
$ nvidia-docker run --runtime=nvidia -p 33001:33001 -v /home/$USER/milvus:/tmp milvus/ubuntu16.04:0.3.0
```

3. Confirm that Milvus is up and running.

```
# Check Milvus log export
docker logs <Milvus container id>
```

#### Running Python example codes

To confirm that Milvus Docker is running and returns search results, follow these procedures to run some Python example codes:

1. Make sure [Python3](https://www.python.org/downloads/ ) is already installed. 

2. Install Milvus Python SDK. Learn more about [Milvus Python SDK user manuals]( https://pypi.org/project/pymilvus/).

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

3. Run Python example codes

```
# Run Milvus python example
$ python3 milvus_examples.py
Table table_14, row counts: 20
```

When you see the table of 20 rows, congratulations, Milvus is running normally now.



#### 

