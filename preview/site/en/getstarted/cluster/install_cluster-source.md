---
id: install_cluster-source.md
label: Install from Source Code
order: 1
group: cluster
---

# Install Milvus Cluster

## Before You Begin

Before moving forward to installation, you must check the eligibility of your hardware in line with Milvus' requirement.

<br/>

### Check whether your CPU supports SIMD extension instruction set

Milvus' computing operations depend on CPU’s support for SIMD (Single Instruction, Multiple Data) extension instruction set. Whether your CPU supports SIMD extension instruction set is crucial to index building and vector similarity search within Milvus. Ensure that your CPU supports at least one of the following SIMD instruction sets:

- SSE4.2
- AVX
- AVX2
- AVX512

Run the lscpu command to check if your CPU supports the SIMD instruction sets mentioned above:

```
$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```
<br/>

### Check your GPU’s eligibility
Milvus Cluster supports GPU acceleration on floating vectors. 
- Supported Nvidia GPU versions are 6.0, 6.1, 7.0, and 7.5.

<div class="alert note">
You can access <a href="https://developer.nvidia.com/cuda-gpus">Nvidia</a>'s official website to check the corresponding version of your GPU. 
</div>

- Milvus requires [CUDA version 10.0 or higher](https://developer.nvidia.com/cuda-10.0-download-archive). 

<div class="alert note">
Enabling GPU acceleration in Milvus is optional. You can still run the whole Milvus service even if your server does not have a GPU device.
</div>

In the current version, the following vector indices support GPU acceleration:

- FLAT
- IVF-FLAT
- IVF-SQ8
- IVF-PQ

Learn more about [vector indices](https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing#flat-good-for-searching-relatively-small-million-scale-datasets-when-100-recall-is-required).


## Install Milvus Cluster

<div class="tab-wrapper"><a href="install_cluster-docker.md" class=''>Install with Docker</a><a href="install_cluster-source.md" class='active '>Install from Source Code</a></div>

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