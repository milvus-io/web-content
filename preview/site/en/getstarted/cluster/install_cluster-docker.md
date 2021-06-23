---
id: install_cluster-docker.md
title: Install Milvus Cluster
label: Install with Docker
order: 0
group: cluster
---

# Install Milvus Cluster

You can install Milvus Cluster with Docker-Compose or Kubernetes.

<div class="tab-wrapper"><a href="install_cluster-docker.md" class='active '>Install with Docker</a><a href="install_cluster-helm.md" class=''>Install with Kubernetes</a></div>
## Before You Begin

Before moving forward to installation, you must check the eligibility of your hardware in line with Milvus' requirement.

<details><summary>Check your Docker and Docker Compose version</summary>

<div class="alert note">
Docker Compose is the recommended way to install Milvus.
</div>

- Docker version 19.03 or higher is required.
- Docker Compose version 1.25.1 or higher is required. 
</details>

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


## Install Milvus Cluster


1. Download **docker-compose.yml**.

```
$ mkdir -p /home/$USER/milvus
$ cd home/$USER/milvus
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v2.0.0/deployments/docker/distributed/docker-compose.yml
```
2. Start Docker Compose.
```
$ sudo docker-compose up -d 
```

*If Docker Compose boots successfully, 11 running docker containers will appear (eight infrastructure services and three Milvus services):*

```
$ sudo docker ps 
```

> To stop Docker Compose, run ```$ sudo docker-compose down```.
