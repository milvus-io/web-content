---
id: milvus_distributions-gpu.md
label: GPU 版 Milvus
order: 1
group: distribution
---

# Milvus 版本比较

## 概述

Milvus 提供两个发行版本：CPU 版本和 GPU 版本。

<ul>
<li>CPU 版 Milvus 仅支持搜索计算在创建索引结束后进行，更适合静态数据。</li>
<li>GPU 版 Milvus 在 CPU 版的基础上进行了 GPU 加速：支持同时进行索引创建和搜索计算以提高查询效率，适合动态增加的数据。</li>
</ul>

如果你的计算机上安装了支持 CUDA 功能的 GPU 设备，你可以安装 Milvus 的 GPU 版本以获取针对海量数据的更优的查询性能。

<div class="tab-wrapper"><a href="milvus_distributions-cpu.md" class=''>CPU 版 Milvus</a><a href="milvus_distributions-gpu.md" class='active '>GPU 版 Milvus</a></div> 


## GPU 版 Milvus 支持的索引类型

<div class="alert info">
Milvus 会根据不同的向量类型提供不同的索引支持。请根据你的向量类型查看适用于你的索引。
</div>



<div class="filter">
<a href="#floating">浮点型向量</a> <a href="#binary">二值型向量</a>

</div>

<div class="filter-floating table-wrapper" markdown="block">

| 索引类型  | CPU 建索引        | GPU 建索引      | CPU 搜索            | GPU 搜索         |
| -------- | ----------------- | -------------  | -------------------- | --------------- |
| FLAT     | N/A                | N/A           | ✔️                  | ✔️            |
| IVF_FLAT | ✔️                | ✔️            | ✔️                  | ✔️             |
| IVF_SQ8  | ✔️                | ✔️            | ✔️                  | ✔️             |
| IVF_SQ8H | ✔️                | ✔️            | ✔️                  | ✔️             |
| IVF_PQ   | ✔️                | ✔️            | ✔️                  | ✔️             |
| RNSG     | ✔️                | ❌            | ✔️                  | ❌              |
| HNSW     | ✔️                | ❌            | ✔️                  | ❌              |
| ANNOY    | ✔️                | ❌            | ✔️                  | ❌              |

<div class="alert note">
CPU 和 GPU 创建的索引完全一致，只是一般情况下 GPU 的创建索引速度快于 CPU 的创建速度。
</div>
</div>


<div class="filter-binary table-wrapper" markdown="block">

| 索引类型  | CPU 建索引        | GPU 建索引      | CPU 搜索            | GPU 搜索        |
| --------- | ---------------- | -------------- | ------------------- | --------------- |
| FLAT       | N/A             | N/A            | ✔️                 | ❌             |
| IVF_FLAT   | ✔️              | ❌            | ✔️                 | ❌             |

</div>
