---
id: prerequisite-docker.md
title: Before you Begin
label: Install with Docker Compose
order: 0
group: prerequisite
summary: Learn the necessary preparations before installing Milvus.
---
# Before you Begin

Before you install Milvus, check hardware and software requirements.

<div class="tab-wrapper"><a href="prerequisite-docker.md" class='active '>Install with Docker Compose</a><a href="prerequisite-helm.md" class=''>Install on Kubernetes</a></div>

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

See [CPUs with AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX) for more information.

## Check the Docker version 

- Docker 19.03 or later is required.

<div class="alert note">
See <a href="https://docs.docker.com/get-docker/">Get Docker</a> for more information about installing Docker.
</div>

- Docker Compose 1.25.1 or later is required.

<div class="alert note">
See <a href="https://docs.docker.com/compose/install/">Install Docker Compose</a> for more information about installing Docker Compose.
</div>

## Install Docker Desktop 

| Operating system | Notes |
| ---------- | ----------------- | 
| **macOS**      | See [Docker Desktop for Mac user manual](https://docs.docker.com/docker-for-mac/) for more information. <br/> **Note:** Set the Docker virtual machine (VM) to use a minimum of 2 virtual CPUs (vCPUs) and 8 GB of initial memory. Otherwise, installation might fail. <br/> Currently, Milvus does not support Apple M1 CPUs.           | 
| **Linux**    |See [Get Docker](https://docs.docker.com/installation/#installation) for more information.      |
| **Windows with WSL 2 enabled**    |See [Docker Desktop WSL 2 backend](https://docs.docker.com/docker-for-windows/wsl-tech-preview/) for more information. <br/> <div class="alert note"> We recommend that you store source code and other data bind-mounted into Linux containers in the Linux file system instead of the Windows file system.</div>              | 

