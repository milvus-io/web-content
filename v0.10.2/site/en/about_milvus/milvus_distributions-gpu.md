---
id: milvus_distributions-gpu.md
label: GPU-only Milvus
order: 1
group: distribution
---

# Milvus Distributions

<div class="tab-wrapper"><a href="milvus_distributions-cpu.md" >CPU-only Milvus</a><a href="milvus_distributions-gpu.md" class='active'>GPU-only Milvus</a></div> 

## Overview

Milvus comes in two distributions: CPU-only Milvus and GPU-enabled Milvus.

<ul>
<li>CPU-only Milvus only supports searching after index building completes, and hence is applicable to static datasets.</li> 
<li>GPU-enabled Milvus supports GPU acceleration for searching and index building: It supports searching and index building at the same time to improve query efficiency, and hence is applicable to dynamic datasets.</li>
</ul>

If your GPU supports CUDA, then you can install GPU-enabled Milvus to achieve much higher search performance in large-scale datasets.


## Indexes for GPU-enabled Milvus

<div class="table-wrapper" markdown="block">

| Name       | Index building with CPU | Search with CPU | Search with GPU                                                  | Search with GPU                                          | Float vector support | Binary vector support |
| ---------- | ----------------------- | --------------- | ---------------------------------------------------------------- | -------------------------------------------------------- | -------------------- | --------------------- |
| FLAT     | -                | ✔️            | -                  | ✔️<br>(Only Supports floating point vectors) | ✔️             | ✔️            |
| IVF_FLAT | ✔️                | ✔️            | ✔️<br>(Only Supports floating point vectors)  | ✔️<br>(Only Supports floating point vectors) | ✔️             | ✔️            |
| IVF_SQ8  | ✔️                | ✔️            | ✔️                  | ✔️                 | ✔️             | ❌           |
| IVF_SQ8H | ✔️                | ✔️            | ✔️                  | ✔️                 | ✔️             | ❌           |
| IVF_PQ   | ✔️                | ✔️            | ✔️<br>(Only Supports GPU index for Euclidean distance)                  | ✔️<br>(Only Supports GPU search for Euclidean distance)                 | ✔️             | ❌           |
| RNSG     | ✔️                | ✔️            | ❌                 | ❌                | ✔️             | ❌           |
| HNSW     | ✔️                | ✔️            | ❌                 | ❌                | ✔️             | ❌           |
| ANNOY    | ✔️                | ✔️            | ❌                 | ❌                | ✔️             | ❌           |

</div>

<div class="alert note">
<ul>
<li>For indexes supporting both CPU search and GPU search, you can create or search them using different devices, either CPU or GPU. For example, you can create an index using CPU and conduct a vector search using GPU.</li>
</ul>
</div>