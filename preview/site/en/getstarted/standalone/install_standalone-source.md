---
id: install_standalone-source.md
label: Install from Source Code
order: 1
group: standalone
---

# Install Milvus Standalone

## Before You Begin

Before moving forward to installation, you must check the eligibility of your hardware in line with Milvus' requirement.

<details><summary>Check whether your CPU supports SIMD extension instruction set</summary>

Milvus' computing operations depend on CPU’s support for SIMD (Single Instruction, Multiple Data) extension instruction set. Whether your CPU supports SIMD extension instruction set is crucial to index building and vector similarity search within Milvus. Ensure that your CPU supports at least one of the following SIMD instruction sets:

- SSE4.2
- AVX
- AVX2
- AVX512

Run the lscpu command to check if your CPU supports the SIMD instruction sets mentioned above:

```
$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```
</details>

<details><summary>Check your GPU’s eligibility</summary>
Milvus Standalone supports GPU acceleration on floating vectors. 
- Supported Nvidia GPU versions are 6.0, 6.1, 7.0, and 7.5.

<div class="alert note">
You can access <a href="https://developer.nvidia.com/cuda-gpus">Nvidia</a>'s official website to check the corresponding version of your GPU. 
</div>

- Milvus requires [CUDA version 10.0 or higher](https://developer.nvidia.com/cuda-10.0-download-archive). 

<div class="alert note">
Enabling GPU acceleration in Milvus is optional. You can still run the whole Milvus service even if your server does not have a GPU device.
</div>

In the current version, the following vector indexes support GPU acceleration:

- FLAT
- IVF-FLAT
- IVF-SQ8
- IVF-PQ

Learn more about [Vector indexes](https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing#flat-good-for-searching-relatively-small-million-scale-datasets-when-100-recall-is-required).

</details>

## Install Milvus Standalone

<div class="tab-wrapper"><a href="install_standalone-docker.md" class=''>Install with Docker</a><a href="install_standalone-source.md" class='active '>Install from Source Code</a></div>

1. Prerequisites

Install the following dependencies before building Milvus Standalone from source code.

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for version control.
- [Golang](https://golang.org/doc/install) version 1.15 or higher and associated toolkits.
- [CMake](https://cmake.org/install/) version 3.14 or higher for compilation.
- [OpenBLAS](https://github.com/xianyi/OpenBLAS/wiki/Installation-Guide) (Basic Linear Algebra Subprograms) library version 0.3.9 or higher for matrix operations.

 2. Compile executable files for Milvus Standalone:

 ```
 # Clone github repository
$ cd /home/$USER/
$ git clone https://github.com/milvus-io/milvus.git

# Install third-party dependencies
$ cd /home/$USER/milvus/
$ ./scripts/install_deps.sh

# Compile Milvus standalone
$ make singlenode
```

3. Start Milvus Standalone:

```
$ unset http_proxy
$ unset https_proxy

# Start infrastructure service
$ cd /home/$USER/milvus/deployments/docker
$ docker-compose down
$ docker-compose up -d

# Start Milvus Standalone service
$ cd /home/$USER/milvus
./bin/singlenode    > /tmp/singlenode.log 2>&1  &
```
