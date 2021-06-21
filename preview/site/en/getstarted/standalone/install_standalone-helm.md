---
id: install_standalone-helm.md
label: Install with Helm Chart
order: 1
group: standalone
---

# Install Milvus Standalone
You can install Milvus Standalone with Docker-Compose or Kubernetes.

<div class="tab-wrapper"><a href="install_standalone-docker.md" class=''>Install with Docker</a><a href="install_standalone-helm.md" class='active '>Install with Helm Chart</a></div>

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


## Install Milvus Standalone

