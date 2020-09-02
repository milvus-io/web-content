---
id: milvus_distributions.md
---

# Milvus Versions

Milvus comes in two distributions: CPU-only Milvus and GPU-enabled Milvus.

- CPU-only Milvus only supports searching after index building completes, and hence is applicable to static datasets. 
- GPU-enabled Milvus supports GPU acceleration for searching and index building: It supports searching and index building at the same time to improve query efficiency, and hence is applicable to dynamic datasets. 

If your GPU supports CUDA, then you can install GPU-enabled Milvus to achieve much higher search performance in large-scale datasets. 




## CPU-only Milvus vs. GPU-enabled Milvus

In Milvus, a vector search includes two separate processes: index building and search. 

- For GPU-enabled Milvus, these two processes can run concurrently, which facilitates more efficient query, especially for incremental data. 
- For CPU-only Milvus, search computation can only be executed after index building is completed, which makes it more suitable for static data.


### Index types in CPU-only Milvus

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

### Index types in Milvus with GPU support

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