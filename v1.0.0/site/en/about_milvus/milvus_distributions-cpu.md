---
id: milvus_distributions-cpu.md
label: CPU-only Milvus
order: 0
group: distribution
---

# Milvus Distributions



## Overview


Milvus is available in CPU-only and GPU-enabled distributions:

<ul>
<li>The CPU-only Milvus distribution relies on CPU exclusively to search and build indexes. 
</li> 
<li>The GPU-enabled Milvus distribution supports GPU acceleration for search and index building. For example, CPU can be used for search while GPU is used for index building, improving query efficiency.</li>
</ul>

For GPUs that support CUDA, the GPU-enabled Milvus distribution can be used to achieve much better search performance when working with large-scale datasets.

<div class="tab-wrapper"><a href="milvus_distributions-cpu.md" class='active '>CPU-only Milvus</a><a href="milvus_distributions-gpu.md" class=''>GPU-enabled Milvus</a></div> 

## Indexes for CPU-only Milvus

Milvus maps different embedding types with different index types. Click the tab below to view the index types supporting your embedding type. 



<div class="filter">
<a href="#floating">Floating point embeddings</a> <a href="#binary">Binary embeddings</a>

</div>

<div class="filter-floating table-wrapper" markdown="block">

| Index type | Indexing with CPU | Indexing with GPU | Search with CPU          | Search with GPU |
| ---------- | ----------------- | ----------------- | ------------------------ | --------------- |
| FLAT       | N/A               | N/A               | ✔️                      | ❌              |
| IVF_FLAT   | ✔️                | ❌               | ✔️                      | ❌              |
| IVF_SQ8    | ✔️                | ❌               | ✔️                      | ❌              |
| IVF_PQ     | ✔️                | ❌               | ✔️                      | ❌              |
| RNSG       | ✔️                | ❌               | ✔️                      | ❌              |
| HNSW       | ✔️                | ❌               | ✔️                      | ❌              |
| Annoy      | ✔️                | ❌               | ✔️                      | ❌              |

</div>

<div class="filter-binary table-wrapper" markdown="block">

| Index type | Indexing with CPU | Indexing with GPU | Search with CPU       | Search with GPU |
| ---------- | ----------------------- | ----------------- | --------------------- | --------------- |
| FLAT       | N/A                     |  N/A              | ✔️                    | ❌              |
| IVF_FLAT   | ✔️                      | ❌               | ✔️                    | ❌              |

</div>

