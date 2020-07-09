---
id: index.md
title: Index Types
sidebar_label: Index Types
---

# Milvus 索引类型

## 索引概览

### CPU 版本 Milvus 支持的索引类型

<div class="table-wrapper" markdown="block">

| 索引类型    | CPU 建索引 | CPU 搜索 | 浮点型向量 | 二值型向量 |
| ---------- | ---------------- | ------------ | ------------- | ------------- |
| FLAT     | -                | ✔️            | ✔️             | ✔️         　   |
| IVF_FLAT | ✔️                | ✔️            | ✔️             | ✔️          　  |
| IVF_SQ8  | ✔️                | ✔️            | ✔️             | ❌             |
| IVF_PQ   | ✔️                | ✔️            | ✔️             | ❌             |
| RNSG     | ✔️                | ✔️            | ✔️             | ❌             |
| HNSW     | ✔️                | ✔️            | ✔️             | ❌             |
| ANNOY    | ✔️                | ✔️            | ✔️             | ❌             |

</div>

### GPU 版本 Milvus 支持的索引类型

<div class="table-wrapper" markdown="block">

| 索引类型    | CPU 建索引    | CPU 搜索 | GPU 建索引      | GPU 搜索       | 浮点型向量  | 二值型向量 |
| ---------- | ---------------- | ------------ | ------------------ | ----------------- | ------------- | ------------ |
| FLAT     | -                | ✔️            | -                  | ✔️<br>（仅支持浮点型向量） | ✔️             | ✔️            |
| IVF_FLAT | ✔️                | ✔️            | ✔️<br>（仅支持浮点型向量）  | ✔️<br>（仅支持浮点型向量） | ✔️             | ✔️            |
| IVF_SQ8  | ✔️                | ✔️            | ✔️                  | ✔️                 | ✔️             | ❌           |
| IVF_SQ8H | ✔️                | ✔️            | ✔️                  | ✔️                 | ✔️             | ❌           |
| IVF_PQ   | ✔️                | ✔️            | ✔️<br>（仅对欧氏距离支持 GPU 索引）                  | ✔️<br>（仅对欧氏距离支持 GPU 搜索）                 | ✔️             | ❌           |
| RNSG     | ✔️                | ✔️            | ❌                 | ❌                | ✔️             | ❌           |
| HNSW     | ✔️                | ✔️            | ❌                 | ❌                | ✔️             | ❌           |
| ANNOY    | ✔️                | ✔️            | ❌                 | ❌                | ✔️             | ❌           |

</div>

<div class="alert info">
<ul>
<li>FLAT 类型不需要建索引。</li>
<li>对于那些 CPU 和 GPU 同时支持的索引，Milvus 支持在创建和搜索时使用不同的设备。比如，你可以在 GPU 上创建索引后再在 CPU 上查询，也可以在 CPU 上创建索引后再在 GPU 上查询。</li>
<li>对于不同索引类型，创建索引的参数和搜索参数也有所不同。详细信息请参考 <a href="milvus_operation.md">Milvus 基本操作</a>。</li>
</ul>
</div>

## 索引详解

### FLAT

FLAT 索引类型是指对向量进行原始文件存储。搜索时，所有向量都会与目标向量进行距离计算和比较。

FLAT 索引类型提供 100% 的检索召回率。

### IVF_FLAT

IVF（Inverted File，倒排文件）是一种基于量化的索引类型。它通过聚类方法把空间里的点划分成 `nlist` 个单元。查询时先把目标向量与所有单元的中心做距离比较，选出 `nprobe` 个最近单元。然后比较这些被选中单元里的所有向量，得到最终的结果。  

IVF_FLAT 是最基础的 IVF 索引，存储在各个单元中的数据编码与原始数据一致。

- 建索引参数

   | 参数   | 说明     | 取值范围     |
   | ------- | -------- |----------- |
   | `nlist` | 聚类单元数 |[1, 65536] |
   
   > 示例：`{"nlist": 2048}`

- 查询参数

   | 参数    | 说明        | 取值范围    |
   | -------- | ----------- | ---------- |
   | `nprobe` | 查询取的单元数 | [1, nlist] |
   
   > 示例：`{"nprobe": 8}`

### IVF_SQ8

IVF_SQ8 是在 IVF 的基础上对放入单元里的每条向量做一次标量量化（Scalar Quantization）。标量量化会把原始向量的每个维度从 4 个字节的浮点数转为 1 个字节的无符号整数，因此 IVF_SQ8 索引文件占用的存储空间远小于 IVF_FLAT。但是，标量量化会导致查询时的精度损失。

- 建索引参数同 IVF_FLAT
- 查询参数同 IVF_FLAT

### IVF_SQ8H

IVF_SQ8H 是一种优化查询执行的 IVF_SQ8 索引类型。

在不同的 `NQ`（Number of queries，查询数量）与系统参数 `gpu_search_threshold` 的关系下，查询方式如下：

- `NQ` &ge; `gpu_search_threshold`：整个查询过程都在 GPU 上执行。
- `NQ` < `gpu_search_threshold`：在 GPU 上执行在 IVF 里寻找 `nprobe` 个最近单元的运算，在 CPU 上执行其它运算。

- 建索引参数同 IVF_FLAT
- 查询参数同 IVF_FLAT

### IVF_PQ

`PQ`（Product Quantization，乘积量化）会将原来的高维向量空间均匀分解成 `m` 个低维向量空间的笛卡尔积，然后对分解得到的低维向量空间分别做矢量量化。乘积量化能将全样本的距离计算转化为到各低维空间聚类中心的距离计算，从而大大降低算法的时间复杂度和空间复杂度。

IVF_PQ 是先对向量做乘积量化，然后进行 IVF 索引聚类。其索引文件甚至可以比 IVF_SQ8 更小，不过同样地也会导致查询时的精度损失。  

- 建索引参数

   | 参数   | 说明          | 取值范围     |
   | --------| ------------- | ----------- |
   | `nlist` | 聚类单元数　    | [1, 65536] |
   | `m`     | 乘积量化因子个数 | `m` 须在 {1, 2, 3, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 96} 内，并且分解出的低维向量空间的维度须在 {1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32} 内。 |
   
   > 示例: `{"nlist": 2048, "m": 16}`

- 查询参数同 IVF_FLAT

### RNSG

RNSG（Refined Navigating Spreading-out Graph）是一种基于图的索引算法。它把全图中心位置设为导航点，然后通过特定的选边策略来控制每个点的出度（小于等于 `out_degree`），使得搜索时既能减少内存使用，又能快速定位到目标位置附近。 

RNSG 的建图流程如下：

1. 为每个点精确寻找 `knng` 个最近邻结点。
2. 以 `knng` 个最近邻结点为基础迭代至少 `search_length` 次，以选出 `candidate_pool_size` 个可能的最邻近结点。
3. 在选出的 `candidate_pool_size` 个结点里按择边策略构建每个点的出边。

RNSG 的查询流程与建图流程类似，以导航点为起点至少迭代 `search_length` 次以得到最终结果。

<div class="alert info">
参考文献：<a href="http://www.vldb.org/pvldb/vol12/p461-fu.pdf">Fast Approximate Nearest Neighbor Search With The Navigating Spreading-out Graph</a>
</div>

- 建索引参数

   | 参数                 | 说明                | 取值范围   |
   | ----------------------| ------------------- | -------- |
   | `out_degree`          | 结点的最大出度        | [5, 300]  |
   | `candidate_pool_size` | 结点出边候选池 　     | [50, 1000] |
   | `search_length`       | 查询迭代次数        　| [10, 300] |
   | `knng`                | 预计算最近邻结点数   　| [５, 300] |
   
   > 示例: `{"out_degree": 30, "candidate_pool_size": 300, "search_length": 60, "knng": 50}`

- 查询参数

   | 参数           | 说明        | 取值范围   |
   | --------------- | ----------- | --------- |
   | `search_length` | 查询迭代次数  | [10, 300] |

   > 示例: `{"search_length": 100}`

### HNSW

HNSW（Hierarchical Small World Graph）是一种基于图的索引算法。它会为一张图按规则建成多层导航图，并让越上层的图越稀疏，结点间的距离越远；越下层的图越稠密，结点间的距离越近。搜索时从最上层开始，找到本层距离目标最近的结点后进入下一层再查找。如此迭代，快速逼近目标位置。
  
为了提高性能，HNSW 限定了每层图上结点的最大度数 `M` 。此外，建索引时可以用 `efConstruction`，查询时可以用 `ef` 来指定搜索范围。

<div class="alert info">
参考文献：<a href="https://arxiv.org/abs/1603.09320">Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs</a>
</div>

- 建索引参数

   | 参数            | 说明                | 取值范围   |
   | ---------------- | ------------------ | --------- |
   | `M`              | 结点的最大度数        | [4, 64]  |
   | `efConstruction` | 搜索范围      | [8, 512] |

   > 示例: `{"M": 16, "efConstruction": 40}`

- 查询参数

   | 参数   | 说明            | 取值范围      |
   | --------|--------------- | ------------ |
   | `ef`    | 搜索范围  | [topK, 4096] |

   > 示例: `{"ef": 64}`

### ANNOY

ANNOY（Approximate Nearest Neighbors Oh Yeah）是一种用超平面把高维空间分割成多个子空间，并把这些子空间以树型结构存储的索引方式。

在查询时，ANNOY 会顺着树结构找到距离目标向量较近的一些子空间，然后比较这些子空间里的所有向量（要求比较的向量数不少于 `search_k` 个）以获得最终结果。显然，当目标向量靠近某个子空间的边缘时，有时需要大大增加搜索的子空间数以获得高召回率。因此，ANNOY 会使用 `n_trees` 次不同的方法来划分全空间，并同时搜索所有划分方法以减少目标向量总是处于子空间边缘的概率。

<div class="alert info">
参考文献：<a href="https://erikbern.com/2015/10/01/nearest-neighbors-and-vector-models-part-2-how-to-search-in-high-dimensional-spaces.html">Nearest neighbors and vector models – part 2 – algorithms and data structures</a>
</div>

- 建索引参数

   | 参数     | 说明     　    | 取值范围  |
   | --------- |-------------- | -------- |
   | `n_trees` | 空间划分的方法数 | [1, 1024] |

   > 示例: `{"n_trees": 8}`

- 查询参数

   | 参数      | 说明                              | 取值范围          |
   | -----------|--------------------------------- | ---------------- |
   | `search_k` | 搜索的结点数。`-1` 表示用全数据量的 5% | {-1} ∪ [topk, n × `n_trees`] |

   > 示例: `{"search_k": -1}`

## 如何选择索引

若要为你的使用场景选择合适的索引，请参阅 [如何选择索引类型](https://milvus.io/cn/blogs/2019-12-03-select-index.md)。

关于索引和向量距离计算方法的选择，请访问 [距离计算方式](metric.md)。
