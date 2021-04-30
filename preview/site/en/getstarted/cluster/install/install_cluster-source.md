---
id: install_cluster-source.md
label: Build from Source Code
order: 1
group: install_cluster 
---

# Install Milvus Clusters

## Build Milvus Cluster from source code

1. Prerequisites

Install the following dependencies before building Milvus Standalone from source code.

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for version control.
- [Golang](https://golang.org/doc/install) version 1.15 or higher and associated toolkits.
- [CMake](https://cmake.org/install/) version 3.14 or higher for compilation.
- [OpenBLAS](https://github.com/xianyi/OpenBLAS/wiki/Installation-Guide) (Basic Linear Algebra Subprograms) library version 0.3.9 or higher for matrix operations.

2. Compile executable files for Milvus Cluster:

```
# Clone github repository
$ cd /home/$USER
$ git clone https://github.com/milvus-io/milvus.git

# Install third-party dependencies
$ cd milvus
$ ./scripts/install_deps.sh

# Compile Milvus Cluster
$ make milvus
```

3. Start Milvus Cluster:
```
# Start infrastructure service
$ cd /home/$USER/milvus/deployments/docker
$ sudo docker-compose up -d

# Start Milvus Service
$ cd /home/$USER/milvus
echo "start master"
./bin/milvus run master        > /tmp/master_service.log 2>&1  &
sleep 1
echo "start service"
./bin/milvus run proxyservice  > /tmp/proxy_service.log  2>&1  &
./bin/milvus run dataservice   > /tmp/data_service.log   2>&1  &
./bin/milvus run indexservice  > /tmp/index_service.log  2>&1  &
./bin/milvus run queryservice  > /tmp/query_service.log  2>&1  &
sleep 5
echo "start node"
./bin/milvus run proxynode     > /tmp/proxy_node.log     2>&1  &
./bin/milvus run datanode      > /tmp/data_node.log      2>&1  &
./bin/milvus run indexnode     > /tmp/index_node.log     2>&1  &
./bin/milvus run querynode     > /tmp/query_node.log     2>&1  &
```