---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
order: 1
group: prerequisite
summary: Learn the necessary preparations before installing Milvus.
---

# Environment Checklist

Before you install Milvus, check your hardware and software to see if they meet the requirements.

<div class="tab-wrapper"><a href="prerequisite-docker.md" class=''>Install with Docker Compose</a><a href="prerequisite-helm.md" class='active '>Install on Kubernetes</a></div>

## Hardware requirements

| Component           | Requirement                                                  | Note                                                         |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| CPU                 | Intel CPU Sandy Bridge or later                              | Current version of Milvus does not support AMD and Apple M1 CPUs. |
| CPU instruction set | <ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul> | Vector similarity search and index building within Milvus require CPU's support of single instruction, multiple data (SIMD) extension sets. Ensure that the CPU supports at least one of the SIMD extensions listed. See [CPUs with AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX) for more information. |
| RAM                 | 8 GB or more                                                 | The size of RAM depends on the data volume.                  |
| Hard drive          | SATA 3.0 SSD or later                                        | The size of hard drive depends on the data volume.           |

## Software requirements

It is recommended that you run the Kubernetes cluster on Linux platforms. 

kubectl is the command-line tool for Kubernetes. Use a kubectl version that is within one minor version difference of your cluster. Using the latest version of kubectl helps avoid unforeseen issues.

minikube is required when running Kubernetes cluster locally. minikube requires Docker as a dependency. Ensure that you install Docker before installing Milvus using Helm. See <a href="https://docs.docker.com/get-docker">Get Docker</a> for more information.



| Operating system | Software                                                     | Note                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Linux platforms  | <ul><li>Kubernetes 1.16 or later</li><li>kubectl</li><li>Helm 3.0.0 or later</li><li>minikube (for Milvus standalone)</li><li>Docker 19.03 or later (for Milvus standalone)</li></ul> | See [Helm Docs](https://helm.sh/docs/) for more information. |

## What's next
- If your hardware and software meet the requirements, you can:
  - [Install Milvus standalone on Kubernetes](install_standalone-helm.md)
  - [Install Milvus cluster on Kubernetes](install_cluster-helm.md)

- See [System Configuration](configuration_cluster-basic.md) for parameters you can set while installing Milvus.
