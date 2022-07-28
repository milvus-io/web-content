---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
order: 1
group: prerequisite-docker.md
summary: Learn the necessary preparations before installing Milvus.
---

# Environment Checklist

Before you install Milvus, check your hardware and software to see if they meet the requirements.

<div class="tab-wrapper"><a href="prerequisite-docker.md" class=''>Install with Docker Compose</a><a href="prerequisite-helm.md" class='active '>Install on Kubernetes</a></div>

## Hardware requirements

| Component           | Requirement                                                  |Recommendation| Note                                                         |
| ------------------- | ------------------------------------------------------------ |--------------| ------------------------------------------------------------ |
| CPU                 | <ul><li>Intel 2nd Gen Core CPU or higher</li><li>Apple Silicon</li></ul>|<ul><li>Standalone: 8 core or more</li><li>Cluster: 16 core or more</li></ul>| Current version of Milvus does not support AMD CPUs. |
| CPU instruction set | <ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul> |<ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul> |  Vector similarity search and index building within Milvus require CPU's support of single instruction, multiple data (SIMD) extension sets. Ensure that the CPU supports at least one of the SIMD extensions listed. See [CPUs with AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX) for more information.                           |
| RAM                 | <ul><li>Standalone: 16G</li><li>Cluster: 64G</li></ul>       |<ul><li>Standalone: 32G</li><li>Cluster: 128G</li></ul>        | The size of RAM depends on the data volume.                  |
| Hard drive          | SATA 3.0 SSD or higher                                       |NVMe SSD or higher | The size of hard drive depends on the data volume.           |

## Software requirements

It is recommended that you run the Kubernetes cluster on Linux platforms.

kubectl is the command-line tool for Kubernetes. Use a kubectl version that is within one minor version difference of your cluster. Using the latest version of kubectl helps avoid unforeseen issues.

minikube is required when running Kubernetes cluster locally. minikube requires Docker as a dependency. Ensure that you install Docker before installing Milvus using Helm. See <a href="https://docs.docker.com/get-docker">Get Docker</a> for more information.

| Operating system | Software                                                     | Note                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Linux platforms  | <ul><li>Kubernetes 1.16 or later</li><li>kubectl</li><li>Helm 3.0.0 or later</li><li>minikube (for Milvus standalone)</li><li>Docker 19.03 or later (for Milvus standalone)</li></ul> | See [Helm Docs](https://helm.sh/docs/) for more information. |

| Software | Version                       | Note |
| -------- | ----------------------------- | ---- |
| etcd     | 3.5.0                         |  See [additional disk requirements](#Additional-disk-requirements). |
| MinIO    |  RELEASE.2020-11-06T23-17-07Z | |
| Pulsar   | 2.8.2                         | |

### Additional disk requirements

Disk performance is critical to etcd. It is highly recommended that you use local NVMe SSDs. Slower disk reponse may cause frequent cluster elections that will eventually degrade the etcd service.

To test if your disk is qualified, use [fio](https://github.com/axboe/fio).

```bash
mkdir test-data
fio --rw=write --ioengine=sync --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
```

Ideally, your disk should reach over 500  IOPS and below 10ms for the 99th percentile fsync latency. Read the etcd [Docs](https://etcd.io/docs/v3.5/op-guide/hardware/#disks) for more detailed requirements.

## What's next

- If your hardware and software meet the requirements, you can:
  - [Install Milvus standalone on Kubernetes](install_standalone-helm.md)
  - [Install Milvus cluster on Kubernetes](install_cluster-helm.md)

- See [System Configuration](system_configuration.md) for parameters you can set while installing Milvus.
