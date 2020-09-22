---
id: milvus_distributions-cpu.md
label: CPU-only Milvus
order: 0
group: distribution
---

# Milvus Distributions



## Overview


Milvus comes in two distributions: CPU-only Milvus and GPU-enabled Milvus.

<ul>
<li>CPU-only Milvus only supports using CPU to search or build index. 
</li> 
<li>GPU-enabled Milvus supports GPU acceleration for searching and index building: You can use CPU for searching and GPU for index building at the same time to improve query efficiency.</li>
</ul>

If your GPU supports CUDA, then you can install GPU-enabled Milvus to achieve much higher search performance in large-scale datasets.

<div class="tab-wrapper"><a href="milvus_distributions-cpu.md" class='active'>CPU-only Milvus</a><a href="milvus_distributions-gpu.md" >GPU-enabled Milvus</a></div> 

## Indexes for CPU-only Milvus

<div class="alert info">
Milvus maps different embedding types with different index types. Click to view the index types supporting your embedding type. 
</div>



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
| ANNOY      | ✔️                | ❌               | ✔️                      | ❌              |

</div>

<div class="filter-binary table-wrapper" markdown="block">

| Index type | Indexing with CPU | Indexing with GPU | Search with CPU       | Search with GPU |
| ---------- | ----------------------- | ----------------- | --------------------- | --------------- |
| FLAT       | N/A                     |  N/A              | ✔️                    | ❌              |
| IVF_FLAT   | ✔️                      | ❌               | ✔️                    | ❌              |

</div>

