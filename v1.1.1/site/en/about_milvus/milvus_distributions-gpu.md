---
id: milvus_distributions-gpu.md
label: GPU-enabled Milvus
order: 0
group: distribution
summary: Learn about the indexes supported for GPU-enabled Milvus.
---

<div class="tab-wrapper"><a href="milvus_distributions-gpu.md" class='active '>GPU-enabled Milvus</a><a href="milvus_distributions-cpu.md" class=''>CPU-only Milvus</a></div>

# GPU-enabled Milvus

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

