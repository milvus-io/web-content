---
id: install_cluster-docker.md
title: Install Milvus Cluster
label: Install with Docker Compose
order: 0
group: cluster
---

# Install Milvus Cluster

You can install Milvus cluster with Docker Compose or Helm.

You can also [build Milvus from source code](https://github.com/milvus-io/milvus/blob/master/INSTALL.md).

<div class="alert note">
Installing Milvus with Docker Compose can only be used for testing and cannot be used in production.
</div>

<div class="tab-wrapper"><a href="install_cluster-docker.md" class='active '>Install with Docker Compose</a><a href="install_cluster-helm.md" class=''>Install with Helm</a></div>

## Before You Begin

Before moving forward to installation, you must check the eligibility of your Docker, Docker Compose, and hardware in line with Milvus' requirement.

<details><summary>Check your Docker and Docker Compose version</summary>

<li>Docker version 19.03 or higher is required. </li>

<div class="alert note">
Follow <a href="https://docs.docker.com/get-docker/">Get Docker</a> to install Docker on your system.
</div>

<li>Docker Compose version 1.25.1 or higher is required. </li>

<div class="alert note">
See <a href="https://docs.docker.com/compose/install/">Install Docker Compose</a> for Docker Compose installation guide.
</div>
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


1. Download **docker-compose.yml**:

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/docker/cluster/docker-compose.yml -O docker-compose.yml
```

2. Start Milvus Cluster:
```
$ docker-compose up -d
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
      Name                     Command                  State                          Ports
----------------------------------------------------------------------------------------------------------------
milvus-datacoord    /tini -- milvus run datacoord    Up
milvus-datanode     /tini -- milvus run datanode     Up
milvus-etcd         etcd -listen-peer-urls=htt ...   Up (healthy)   2379/tcp, 2380/tcp
milvus-indexcoord   /tini -- milvus run indexcoord   Up
milvus-indexnode    /tini -- milvus run indexnode    Up
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-proxy        /tini -- milvus run proxy        Up             0.0.0.0:19530->19530/tcp,:::19530->19530/tcp
milvus-pulsar       bin/pulsar standalone            Up
milvus-querycoord   /tini -- milvus run querycoord   Up
milvus-querynode    /tini -- milvus run querynode    Up
milvus-rootcoord    /tini -- milvus run rootcoord    Up
```

<div class="alert note">
To stop Milvus Cluster, run <code>$ sudo docker-compose down</code>.
</div>
