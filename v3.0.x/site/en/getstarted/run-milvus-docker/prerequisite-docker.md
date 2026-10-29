---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: Learn the necessary preparations before installing Milvus Standalone.
title: Requirements for Installing Milvus Standalone
---

# Requirements for Installing Milvus Standalone

Before installing a Milvus Standalone instance, check your hardware and software to see if they meet the requirements.

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
| macOS supported by Docker Desktop | Docker Desktop                                               | Allocate at least 8 GB of memory to the Docker virtual machine (VM) and size its CPUs according to the hardware recommendations above. <br/>See [Install Docker Desktop on Mac](https://docs.docker.com/desktop/setup/install/mac-install/) for more information. |
| Linux platforms            | <ul><li>Docker 19.03 or later</li><li>Docker Compose plugin V2 or later (for Compose deployments)</li></ul> | See [Install Docker Engine](https://docs.docker.com/engine/install/) and [Install Docker Compose](https://docs.docker.com/compose/install/) for more information. |
| Windows with WSL 2 enabled | Docker Desktop                                               | We recommend that you store source code and other data bind-mounted into Linux containers in the Linux file system instead of the Windows file system.<br/>See [Install Docker Desktop on Windows with WSL 2 backend](https://docs.docker.com/desktop/features/wsl/) for more information. |

The Compose guides use `docker compose`, not the legacy `docker-compose` V1 command. Verify the plugin before following them:

```bash
docker compose version
```

The installation method determines how dependencies are provided. Use the image versions pinned in the downloaded script or Compose file:

| Component | Docker script | Docker Compose |
| --------- | ------------- | -------------- |
| etcd | Embedded in the Milvus container | Separate container; see [additional disk requirements](#Additional-disk-requirements). |
| Object storage | Local filesystem; no MinIO container | MinIO container with its image pinned in the Compose file |
| Woodpecker | Bundled with Milvus; local-filesystem WAL backend | Bundled with Milvus; MinIO/object-storage WAL backend |
| Pulsar | Optional external service; not installed by default | Optional external service; not installed by default |

### Additional disk requirements

Disk performance is critical to etcd. It is highly recommended that you use local NVMe SSDs. Slower disk response may cause frequent cluster elections that will eventually degrade the etcd service.

To test if your disk is qualified, use [fio](https://github.com/axboe/fio).

```bash
mkdir test-data
fio --rw=write --ioengine=sync --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
```

Ideally, your disk dedicated to etcd should reach over 500  IOPS and below 10ms for the 99th percentile fsync latency. Read the etcd [Docs](https://etcd.io/docs/v3.5/op-guide/hardware/#disks) for more detailed requirements.

## What's next

If your hardware and software meet the above requirements, you can 

- [Run Milvus in Docker](install_standalone-docker.md)
- [Run Milvus with Docker Compose](install_standalone-docker-compose.md)
