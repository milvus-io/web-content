---
id: milvus_distributions-cpu.md
label: CPU-only Milvus
summary: Learn about the indexes supported for CPU-only Milvus.
---

# CPU-only Milvus

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

