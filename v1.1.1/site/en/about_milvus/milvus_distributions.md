---
id: milvus_distributions.md
title: 
label: CPU-only Milvus
summary: Learn about the indexes supported for Milvus distributions.
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

- [CPU-only Milvus](milvus_distributions-cpu)

- [GPU-enabled Milvus](milvus_distributions-gpu)

