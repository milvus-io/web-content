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

Milvus' computing operations depend on CPU’s support for SIMD (Single Instruction, Multiple Data) extension instruction set. Whether your CPU supports SIMD extension instruction set is crucial to index building and vector similarity search within Milvus. Ensure that your CPU supports at least one of the following SIMD instruction sets:

- SSE4.2
- AVX
- AVX2
- AVX512

Run the lscpu command to check if your CPU supports the SIMD instruction sets mentioned above:

```
lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```

Check Wikipedia [CPU with AVX](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX) for more details.

## Check your Docker and Docker Compose version 

- Docker version 19.03 or higher is required.

<div class="alert note">
Follow <a href="https://docs.docker.com/get-docker/">Get Docker</a> to install Docker on your system.
</div>

- Docker Compose version 1.25.1 or higher is required.

<div class="alert note">
See <a href="https://docs.docker.com/compose/install/">Install Docker Compose</a> for Docker Compose installation guide.
</div>

## Install Docker Desktop 

| Operating system | Requirements |
| ---------- | ----------------- | 
| **macOS**      | Install Docker for Mac. See [installation instructions](https://docs.docker.com/docker-for-mac/). <br/> **Note:** Set the Docker virtual machine (VM) to have at least 2 vCPU (virtual CPU) and 8 GB of initial memory. Otherwise, installation may fail. <br/> **Note:** Milvus contemporarily does not support Apple M1 CPU.             | 
| **Linux with local Docker**    |Install Docker according to the [instructions](https://docs.docker.com/installation/#installation) for your operating system.              |
| **Windows with Docker Desktop WSL2 backend**    | Install Docker according to the [instructions](https://docs.docker.com/docker-for-windows/wsl-tech-preview/). <br/> <div class="alert note"> Store sources in the local Linux file system, not in the Windows remote mount at <code>/mnt/c</code>.  </div>              | 

