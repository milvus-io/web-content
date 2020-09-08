---
id: milvus_distributions-gpu.md
label: GPU-enabled Milvus
order: 1
group: distribution
---

# Milvus Distributions

## Overview

Milvus comes in two distributions: CPU-only Milvus and GPU-enabled Milvus.

<ul>
<li>CPU-only Milvus only supports searching after index building completes, and hence is applicable to static datasets.</li> 
<li>GPU-enabled Milvus supports GPU acceleration for searching and index building: It supports searching and index building at the same time to improve query efficiency, and hence is applicable to dynamic datasets.</li>
</ul>

If your GPU supports CUDA, then you can install GPU-enabled Milvus to achieve much higher search performance in large-scale datasets.

<div class="tab-wrapper"><a href="milvus_distributions-cpu.md" >CPU-only Milvus</a><a href="milvus_distributions-gpu.md" class='active'>GPU-enabled Milvus</a></div> 

## Indexes for GPU-enabled Milvus

<div class="alert info">
Milvus maps different embedding types with different index types. Click to view the index types supporting your embedding type. 
</div>



<div class="filter">
<a href="#floating">Floating point embeddings</a> <a href="#binary">Binary embeddings</a>

</div>

<div class="filter-floating table-wrapper" markdown="block">

| Index type | Indexing with CPU | Indexing with GPU |  Search with CPU     | Search with GPU |
| ---------- | ----------------- | ----------------- | -------------------- | --------------- |
| FLAT     | N/A                | N/A                | ✔️                  | ✔️              |
| IVF_FLAT | ✔️                | ✔️                 | ✔️                  | ✔️              |
| IVF_SQ8  | ✔️                | ✔️                 | ✔️                  | ✔️              |
| IVF_SQ8H | ✔️                | ✔️                 | ✔️                  | ✔️              |
| IVF_PQ   | ✔️                | ✔️                 | ✔️                  | ✔️              |
| RNSG     | ✔️                | ❌                 | ✔️                  | ❌              |
| HNSW     | ✔️                | ❌                 | ✔️                  | ❌              |
| ANNOY    | ✔️                | ❌                 | ✔️                  | ❌              |

<div class="alert note">
<ul>
<li>For indexes supporting both CPU and GPU, you can create or search them using different devices. For example, you can create an index using CPU and conduct a vector search using GPU, and vice versa.</li>
</ul>
</div>
</div>

<div class="filter-binary table-wrapper" markdown="block">

| Index type | Indexing with CPU | Indexing with GPU | Search with CPU    | Search with GPU |
| ---------- | ----------------- | ----------------  | ------------------ | --------------- |
| FLAT       | N/A               | N/A               | ✔️                 | ❌             |
| IVF_FLAT   | ✔️                | ❌               | ✔️                 | ❌             |


</div>

