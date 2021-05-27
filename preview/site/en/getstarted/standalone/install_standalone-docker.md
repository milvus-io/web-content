---
id: install_standalone-docker.md
title: Install Milvus Standalone
label: Install with Docker
order: 0
group: standalone
---

# Install Milvus Standalone

## Before You Begin

Before moving forward to installation, you must check the eligibility of your hardware in line with Milvus' requirement.

<br/>

<a href="#cpu_support"></a>

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
Milvus Standalone supports GPU acceleration on floating vectors.
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


## Install Milvus Standalone

<div class="tab-wrapper"><a href="install_standalone-docker.md" class='active '>Install with Docker</a><a href="install_standalone-source.md" class=''>Install from Source Code</a></div>

1. Docker version 19.03 or higher is required. Check Docker version:

```
$ sudo docker info
```

> Follow [Get Docker](https://docs.docker.com/get-docker/) to install Docker on your system.

2. Docker Compose version 1.25.1 or higher is required. Check Docker Compose version:

```
$ sudo docker-compose version
```

> See [Install Docker Compose](https://docs.docker.com/compose/install/) for Docker Compose installation guide.

3. Pull the docker image:

```
$ sudo docker pull milvusdb/milvus:2.0.0-d043021-19c36b
```

4. Download **docker-compose.standalone.yml** and save it as **docker-compose.yml**:

```
$ mkdir -p /home/$USER/milvus
$ chome/$USER/milvus
$ wget <https://raw.githubusercontent.com/milvus-io/milvus/v2.0.0/deployments/docker/docker-compose.standalone.yml> -O docker-compose.yml
$ wget <https://raw.githubusercontent.com/milvus-io/milvus/v2.0.0/deployments/docker/.env>
```
> The **.env** file contains all variable definitions used in **docker-compose.yml**.

| Variable      | Definition |
| ----------- | ----------- |
| TARGET_DOCKER_IMAGE         | Docker image.       |
| ETCD_ADDRESS   | 	Etcd service address.        |
| MINIO_ADDRESS      | MinIO service address.       |
| MASTER_ADDRESS   | Master service address.        |
| PROXY_SERVICE_ADDRESS      | Proxy service address.       |
| INDEX_SERVICE_ADDRESS   | Index service address.        |
| DATA_SERVICE_ADDRESS      | Data service address.       |
| QUERY_SERVICE_ADDRESS   | Query service address.        |

<br/>

5. Start Docker Compose.

Ensure that you set the docker image in TARGET_DOCKER_IMAGE to the image defined in the **.env** file.

```
TARGET_DOCKER_IMAGE=milvusdb/milvus:2.0.0-d043021-19c36b
```

Start Docker Compose:

```
$ sudo docker-compose up -d 
```
Stop Docker Compose:

```
$ sudo docker-compose down
```
> If Docker Compose boots successfully, three running docker containers will appear (two infrastructure services and one Milvus service):

```
$ docker ps 

CONTAINER ID | IMAGE | COMMAND | CREATED |STATUS | PORTS | NAMES
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
|3baf500700ff | milvusdb/milvus:2.0.0-d043021-19c36b | "/tini -- /milvus-di…" | 3 seconds ago | Up 1 second |   0.0.0.0:19530->19530/tcp | deploy_standalone_1|
|d807e1e1e9b1 |  quay.io/coreos/etcd:latest | "etcd -listen-peer-u…" |  6 seconds ago  | Up 4 seconds  |  0.0.0.0:2379-2380->2379-2380/tcp, 0.0.0.0:4001->4001/tcp  |deploy_etcd_1 |
| a103514a959a  | minio/minio:RELEASE.2020-12-03T00-03-10Z |   "/usr/bin/docker-ent…"  | 6 seconds ago  | Up 4 seconds (health: starting) |  0.0.0.0:9000->9000/tcp    | deploy_minio_1|

```
