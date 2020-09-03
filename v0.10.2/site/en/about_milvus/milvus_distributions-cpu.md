---
id: milvus_distributions-cpu.md
label: CPU-only Milvus
order: 0
group: distribution
---

# Milvus Distributions

<div class="tab-wrapper"><a href="milvus_distributions-cpu.md" class='active'>CPU-only Milvus</a><a href="milvus_distributions-gpu.md" >GPU-only Milvus</a></div> 

## Overview


Milvus comes in two distributions: CPU-only Milvus and GPU-enabled Milvus.

<ul>
<li>CPU-only Milvus only supports searching after index building completes, and hence is applicable to static datasets.</li> 
<li>GPU-enabled Milvus supports GPU acceleration for searching and index building: It supports searching and index building at the same time to improve query efficiency, and hence is applicable to dynamic datasets.</li>
</ul>

If your GPU supports CUDA, then you can install GPU-enabled Milvus to achieve much higher search performance in large-scale datasets.



## Indexes for CPU-only Milvus

<div class="table-wrapper" markdown="block">

| Name       | Index building with CPU | Search with CPU | Float vector support | Binary vector support |
| -------- | ----------------- | -------------- | -------------- | ---------------- |
| FLAT     | -                 | ✔️             | ✔️             | ✔️         　   |
| IVF_FLAT | ✔️                | ✔️            | ✔️             | ✔️          　  |
| IVF_SQ8  | ✔️                | ✔️            | ✔️             | ❌             |
| IVF_PQ   | ✔️                | ✔️            | ✔️             | ❌             |
| RNSG     | ✔️                | ✔️            | ✔️             | ❌             |
| HNSW     | ✔️                | ✔️            | ✔️             | ❌             |
| ANNOY    | ✔️                | ✔️            | ✔️             | ❌             |

</div>

