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

Milvus's computing relies on single instruction, multiple data (SIMD) extension instruction sets. Similarity search with vector indexing using Milvus requires the support of SIMD extensions. Ensure that the CPU supports at least one of the following SIMD extensions:

- SSE4.2
- AVX
- AVX2
- AVX-512

Run the lscpu command to view supported instruction sets:

```
lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```

## Check the K8s version
- K8s 1.14 or later is required.
- Minikube is required. See [minikube start](https://kubernetes.io/docs/tasks/tools/install-minikube/) for more information.

<div class="alert note">
<ul>
<li>Installing minikube also installs Hyper-V and kubectl. Kubectl is a command-line tool for managing K8s from your local workstation.</li>
<li>Minikube requires Docker as a dependency. Ensure that you install Docker before installing Milvus using Helm. See <a href="https://docs.docker.com/get-docker">Get Docker</a> for more information.</li>
</ul></div>

- Helm 3.0.0 or later is required. See [Helm Docs](https://helm.sh/docs/) for more information.
