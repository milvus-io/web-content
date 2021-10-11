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

Milvus' computing operations depend on the CPU’s support for SIMD (Single Instruction, Multiple Data) extension instruction set. Whether your CPU supports the SIMD extension instruction set is crucial to index building and vector similarity search within Milvus. Ensure that your CPU supports at least one of the following SIMD instruction sets:

- SSE4.2
- AVX
- AVX2
- AVX512

Run the lscpu command to check if your CPU supports the SIMD instruction sets mentioned above:

```
lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```

See [CPU with AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX) for more information.

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
| **macOS**      | See [Docker Desktop for Mac user manual](https://docs.docker.com/docker-for-mac/) for more information. <br/> **Note:** Set the Docker virtual machine (VM) to have at least 2 vCPU (virtual CPU) and 8 GB of initial memory. Otherwise, installation may fail. <br/> Currently, Milvus does not support Apple M1 CPUs.           | 
| **Linux**    |See [Get Docker](https://docs.docker.com/installation/#installation) for more information.      |
| **Windows with WSL 2 enabled**    |See [Docker Desktop WSL 2 backend](https://docs.docker.com/docker-for-windows/wsl-tech-preview/) for more information. <br/> <div class="alert note"> We recommend that you store source code and other data bind-mounted into Linux containers in the Linux file system instead of the Windows file system.</div>              | 

