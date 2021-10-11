---
id: prerequisite-helm.md
title: Before you Begin
label: Install on Kubernetes
order: 1
group: prerequisite
summary: Learn the necessary preparations before installing Milvus.
---
# Before you Begin

Before you install Milvus, check hardware and software requirements.

<div class="tab-wrapper"><a href="prerequisite-docker.md" class=''>Install with Docker Compose</a><a href="prerequisite-helm.md" class='active '>Install on Kubernetes</a></div>

## CPU support

Milvus' computing operations depend on the CPU’s support for SIMD (Single Instruction, Multiple Data) extension instruction set. Whether your CPU supports the SIMD extension instruction set is crucial to index building and vector similarity search within Milvus. Ensure that your CPU supports at least one of the following SIMD instruction sets:

- SSE4.2
- AVX
- AVX2
- AVX512

Run the lscpu command to check if your CPU supports the SIMD instruction sets mentioned above:

```
lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```

## Check the K8s version
- K8s 1.14 or later is required.
- [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) is required.

<div class="alert note">
Installing minikube also installs hypervisor and kubectl. Kubectl is a command-line tool for managing K8s from your local workstation.
<br>Minikube requires <a href="https://docs.docker.com/get-docker/">Docker</a> as a dependency. Ensure that you install Docker before deploying Milvus using Helm.
</div>

- Helm 3.0.0 or later is required. See [Helm docs](https://helm.sh/docs/) for more information.
