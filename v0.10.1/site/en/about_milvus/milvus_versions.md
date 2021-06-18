---
id: milvus_versions.md
---

# Milvus Versions

## Overview

Milvus runs on machines with or without GPU. To use Milvus on machines without a GPU, install CPU-only Milvus. Otherwise, if you have CUDA-enabled GPUs in your computer, it is recommended that you use GPU-enabled Milvus to achieve better search performance for larger queries.




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
<li>FLAT index does not need index building.</li>
<li>For indexes supporting both CPU search and GPU search, you can create or search them using different devices, either CPU or GPU. For example, you can create an index using CPU and conduct a vector search using GPU.</li>
<li>Index building parameters and search parameters vary with index type. See <a href="milvus_operation.md">Milvus Operations</a> for more information.</li>
</ul>
</div>