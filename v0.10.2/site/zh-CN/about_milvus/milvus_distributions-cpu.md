---
id: milvus_distributions-cpu.md
label: CPU 版 Milvus
order: 0
group: distribution
---

# Milvus 版本比较

<div class="tab-wrapper"><a href="milvus_distributions-cpu.md" class='active'>CPU 版 Milvus</a><a href="milvus_distributions-gpu.md" >GPU 版 Milvus</a></div> 

## 概述

Milvus 提供两个发行版本：CPU 版本和 GPU 版本。

<ul>
<li>CPU 版 Milvus 仅支持搜索计算在创建索引结束后进行，更适合静态数据。</li>
<li>GPU 版 Milvus 在 CPU 版的基础上进行了 GPU 加速：支持同时进行索引创建和搜索计算以提高查询效率，适合动态增加的数据。</li>
</ul>

如果你的计算机上安装了支持 CUDA 功能的 GPU 设备，你可以安装 Milvus 的 GPU 版本以获取针对海量数据的更优的查询性能。


## CPU 版本 Milvus 支持的索引类型

<div class="filter">
<a href="#floating">浮点型向量</a> <a href="#binary">二值型向量</a>
</div>

<div class="table-wrapper filter-floating" markdown="block">

| 索引类型  | CPU 建索引        | CPU 搜索       |
| -------- | ----------------- | -------------- |
| FLAT     | N/A                | ✔️           |
| IVF_FLAT | ✔️                | ✔️            |
| IVF_SQ8  | ✔️                | ✔️            |
| IVF_PQ   | ✔️                | ✔️            |
| RNSG     | ✔️                | ✔️            |
| HNSW     | ✔️                | ✔️            |
| ANNOY    | ✔️                | ✔️            |

</div>

## GPU 版本 Milvus 支持的索引类型

<div class="table-wrapper filter-binary" markdown="block">

| 索引类型  | CPU 建索引        | CPU 搜索        |
| -------- | ----------------- | -------------- |
| FLAT     | N/A               | ✔️             |
| IVF_FLAT | ✔️                | ✔️            |

</div>

<div class="alert note">
<ul>
<li>对于那些 CPU 和 GPU 同时支持的索引，Milvus 支持在创建和搜索时使用不同的设备。比如，你可以在 GPU 上创建索引后再在 CPU 上查询，也可以在 CPU 上创建索引后再在 GPU 上查询。</li>
</ul>
</div>