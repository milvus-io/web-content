---
id: install_cluster-docker.md
title: Install Milvus Cluster
label: Install with Docker Compose
order: 0
group: cluster
---

# Install Milvus Cluster

You can install Milvus cluster with Docker Compose or Helm.

You can also [build Milvus from source code](https://github.com/milvus-io/milvus).


<div class="tab-wrapper"><a href="install_cluster-docker.md" class='active '>Install with Docker Compose</a><a href="install_cluster-helm.md" class=''>Install with Helm</a></div>

## Before You Begin

Before moving forward to installation, you must check the eligibility of your Docker, Docker Compose, and hardware in line with Milvus' requirement.

<details><summary>Check your Docker and Docker Compose version</summary>

<li>Docker version 19.03 or higher is required. </li>
<li>Docker Compose version 1.25.1 or higher is required. </li>
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


<div class="alert note">
Installing Milvus with Docker Compose can only be used for testing and cannot be used in production.
</div>


## Install Milvus Cluster


1. Download **docker-compose.yml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/docker/cluster/docker-compose.yml -O docker-compose.yml
```

2. Start Milvus Cluster:
```
$ sudo docker-compose up -d
Docker Compose is now in the Docker CLI, try `docker compose up`
Creating milvus-etcd   ... done
Creating milvus-minio  ... done
Creating milvus-pulsar ... done
Creating milvus-proxy      ... done
Creating milvus-rootcoord  ... done
Creating milvus-indexcoord ... done
Creating milvus-querycoord ... done
Creating milvus-datacoord  ... done
Creating milvus-querynode  ... done
Creating milvus-indexnode  ... done
Creating milvus-datanode   ... done
```

*If Milvus Cluster boots successfully, 11 running docker containers appear (three infrastructure services and eight Milvus services):*

```
$ sudo docker ps 
```
![Running Docker containers](../../../../assets/install_cluster.png)


> To stop Milvus Cluster, run ```$ sudo docker-compose down```.
