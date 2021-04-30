---
id: begin_cluster.md
title: Before You Begin 
---

# Before you begin

- Milvus' computing operations depend on CPU’s support for SIMD (Single Instruction, Multiple Data) extension instruction set. [Check whether your CPU supports SIMD extension instruction set](#check-whether-your-cpu-supports-simd-extension-instruction-set).

- Milvus standalone supports GPU acceleration. If you wish to enable GPU acceleration, [check whether your GPU meets Milvus' requirement for computing ability](#check-your-gpus-eligibility).

- Docker-compose is the recommended way to [install Milvus standalone](install_standalone-docker.md).

- You can also [build Milvus standalone from source code](install_standalone-source.md).

<br/>

## Check whether your CPU supports SIMD extension instruction set

Whether your CPU supports SIMD extension instruction set is crucial to index building and vector similarity search within Milvus. Ensure that your CPU supports at least one of the following SIMD instruction sets:

- SSE4_2
- AVX
- AVX2
- AVX512

Run the lscpu command to check if your CPU supports the SIMD instruction sets mentioned above:

```
$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```
<br/>

## Check your GPU’s eligibility
 

Milvus supports GPU acceleration on floating vectors.

- Supported Nvidia GPU versions are 6.0, 6.1, 7.0, and 7.5.

> You can access [Nvidia](https://developer.nvidia.com/cuda-gpus)'s official website to check the corresponding version of your GPU. 

- Milvus requires [CUDA version 10.0 or higher](https://developer.nvidia.com/cuda-10.0-download-archive). 

> Enabling GPU acceleration in Milvus is optional. You can still run the whole Milvus service even if your server does not have a GPU device.

In the current version, the following vector indexes support GPU acceleration:

- FLAT
- IVF-FLAT
- IVF-SQ8
- IVF-PQ

Learn more about [vector indexes](https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing#flat-good-for-searching-relatively-small-million-scale-datasets-when-100-recall-is-required).

