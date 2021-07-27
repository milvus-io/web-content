---
id: prerequisite-helm.md
title: Before you Begin
order: 1
---

Before proceeding to installation, you must check the eligibility of your hardware and software.

<div class="tab-wrapper"></div>

# Check if your CPU supports SIMD extension instruction set

Milvus' computing operations depend on CPU’s support for SIMD (Single Instruction, Multiple Data) extension instruction set. Whether your CPU supports SIMD extension instruction set is crucial to index building and vector similarity search within Milvus. Ensure that your CPU supports at least one of the following SIMD instruction sets:

- SSE4.2
- AVX
- AVX2
- AVX512

Run the lscpu command to check if your CPU supports the SIMD instruction sets mentioned above:

```
lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```

# Check your Kubernetes and Helm version
- Kubernetes version 1.14.0 or higher is required.
- [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) is required.

<div class="alert note">
Installing minikube will also install hypervisor and kubectl. Kubectl is a command-line tool for managing Kubernetes from your local workstation.
</div>

- Helm version 3.0.0 or higher is required. See [Helm docs](https://helm.sh/docs/).