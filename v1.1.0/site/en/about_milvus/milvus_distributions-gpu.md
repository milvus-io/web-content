---
id: milvus_distributions-gpu.md
label: GPU-enabled Milvus
order: 1
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

<div class="tab-wrapper"><a href="milvus_distributions-cpu.md" class=''>CPU-only Milvus</a><a href="milvus_distributions-gpu.md" class='active '>GPU-enabled Milvus</a></div> 

## Indexes for GPU-enabled Milvus

Milvus maps different embedding types with different index types. Click the tab below to view the index types supporting your embedding type. 



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
| Annoy    | ✔️                | ❌                 | ✔️                  | ❌              |


<div class="alert note">
<ul>
<li>An index built with GPU is identical to built with CPU. The only difference is the time to build the index: GPU usually takes less time.</li>
<li>If <code>top_k</code> > 2048, Milvus switches from GPU search to CPU search.</li>
<li>If <code>nprobe</code> > 2048, Milvus switches from GPU search to CPU search.</li>
</ul>
</div>

</div>

<div class="filter-binary table-wrapper" markdown="block">

| Index type | Indexing with CPU | Indexing with GPU | Search with CPU    | Search with GPU |
| ---------- | ----------------- | ----------------  | ------------------ | --------------- |
| FLAT       | N/A               | N/A               | ✔️                 | ❌             |
| IVF_FLAT   | ✔️                | ❌               | ✔️                 | ❌             |


</div>

