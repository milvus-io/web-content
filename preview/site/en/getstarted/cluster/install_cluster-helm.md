---
id: install_cluster-helm.md
label: Install with Kubernetes
order: 1
group: cluster
---

# Install Milvus Cluster

You can install Milvus Cluster with Docker-Compose or Kubernetes.

<div class="tab-wrapper"><a href="install_cluster-docker.md" class=''>Install with Docker</a><a href="install_cluster-helm.md" class='active '>Install with Kubernetes</a></div>
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


## Install Milvus Cluster


