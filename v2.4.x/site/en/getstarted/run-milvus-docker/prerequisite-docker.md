---
id: prerequisite-docker.md
label: Docker requirements
related_key: Docker
summary: Learn the necessary preparations before installing Milvus with Docker Compose.
title: Requirements for Installing Milvus with Docker Compose
---

# Requirements for Installing Milvus with Docker Compose

Before installing a Milvus instance, check your hardware and software to see if they meet the requirements.

## Hardware requirements

| Component           | Requirement                                                  |Recommendation| Note                                                         |
| ------------------- | ------------------------------------------------------------ |--------------| ------------------------------------------------------------ |
| CPU                 | <ul><li>Intel 2nd Gen Core CPU or higher</li><li>Apple Silicon</li></ul>  |<ul><li>Standalone: 4 core or more</li><li>Cluster: 8 core or more</li></ul>|  |
| CPU instruction set | <ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul> |<ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul> |  Vector similarity search and index building within Milvus require CPU's support of single instruction, multiple data (SIMD) extension sets. Ensure that the CPU supports at least one of the SIMD extensions listed. See [CPUs with AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX) for more information.                           |
| RAM                 | <ul><li>Standalone: 8G</li><li>Cluster: 32G</li></ul>       |<ul><li>Standalone: 16G</li><li>Cluster: 128G</li></ul>        | The size of RAM depends on the data volume.                  |
| Hard drive          | SATA 3.0 SSD or higher                                       | NVMe SSD or higher | The size of hard drive depends on the data volume.           |

## Software requirements

| Operating system           | Software                                                     | Note                                                         |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| macOS 10.14 or later       | Docker Desktop                                               | Set the Docker virtual machine (VM) to use a minimum of 2 virtual CPUs (vCPUs) and 8 GB of initial memory. Otherwise, installation might fail. <br/>See [Install Docker Desktop on Mac](https://docs.docker.com/desktop/mac/install/) for more information. |
| Linux platforms            | <ul><li>Docker 19.03 or later</li><li>Docker Compose 1.25.1 or later</li></ul> | See [Install Docker Engine](https://docs.docker.com/engine/install/) and [Install Docker Compose](https://docs.docker.com/compose/install/) for more information. |
| Windows with WSL 2 enabled | Docker Desktop                                               | We recommend that you store source code and other data bind-mounted into Linux containers in the Linux file system instead of the Windows file system.<br/>See [Install Docker Desktop on Windows with WSL 2 backend](https://docs.docker.com/desktop/windows/install/#wsl-2-backend) for more information. |

| Software | Version                       | Note |
| -------- | ----------------------------- | ---- |
| etcd     | 3.5.0                         |  See [additional disk requirements](#Additional-disk-requirements). |
| MinIO    |  RELEASE.2023-03-20T20-16-18Z | |
| Pulsar   | 2.8.2                         | |

### Additional disk requirements

Disk performance is critical to etcd. It is highly recommended that you use local NVMe SSDs. Slower disk response may cause frequent cluster elections that will eventually degrade the etcd service.

To test if your disk is qualified, use [fio](https://github.com/axboe/fio).

```bash
mkdir test-data
fio --rw=write --ioengine=sync --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
```

Ideally, your disk should reach over 500  IOPS and below 10ms for the 99th percentile fsync latency. Read the etcd [Docs](https://etcd.io/docs/v3.5/op-guide/hardware/#disks) for more detailed requirements.

## What's next

If your hardware and software meet the above requirements, you can 

- [Run Milvus in Docker](install_standalone-docker.md)
- [Run Milvus with Docker Compose](install_standalone-docker-compose.md)
