---
id: index.md
related_key: index
---

# 索引概述

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


创建索引是一个组织数据的过程，是向量数据库实现快速查询百万、十亿、甚至万亿级数据集所依赖的一个巨大组成部分。

## 加速向量查询

相似性搜索引擎的工作原理是将输入的对象与数据库中的对象进行比较，找出与输入最相似的对象。索引是有效组织数据的过程，极大地加速了对大型数据集的查询，在相似性搜索的实现中起着重要作用。对一个大规模向量数据集创建索引后，查询可以被路由到最有可能包含与输入查询相似的向量的集群或数据子集。在实践中，这意味着要牺牲一定程度的准确性来加快对真正的大规模向量数据集的查询。

为提高查询性能，你可以为每个向量字段指定一种索引类型。目前，一个向量字段仅支持一种索引类型。切换索引类型时，Milvus 自动删除之前的索引。

## 索引创建机制

当 `create_index` 方法被调用时，Milvus 会同步为这个字段的现有数据创建索引。Segment 是 Milvus 中储存数据的最小单位。在建立索引时，Milvus 为每个 Segment 单独创建索引文件。

<div class="alert note">
  默认设定下，Milvus 不会对插入的数据少于 1024 行的 segment 创建索引。如修改此项参数，需修改 <code>milvus.yaml</code> 中的 <a href="configure_rootcoord.md#rootCoord.minSegmentSizeToEnableIndex"><code>rootCoord.minSegmentSizeToEnableIndex</code></a> 配置项。
</div>


## 根据应用场景选择索引


Milvus 目前支持的向量索引类型大都属于 ANNS（Approximate Nearest Neighbors Search，近似最近邻搜索）。ANNS 的核心思想是不再局限于只返回最精确的结果项，而是仅搜索可能是近邻的数据项，即以牺牲可接受范围内的精度的方式提高检索效率。

关于索引和向量距离计算方法的选择，请访问 [距离计算方式](metric.md)。

根据实现方式，ANNS 向量索引可分为四大类：

- 基于树的索引

- 基于图的索引

- 基于哈希的索引

- 基于量化的索引

下表将目前 Milvus 支持的索引进行了归类：

<table>
<thead>
  <tr>
    <th>Milvus 支持的索引</th>
    <th>索引分类</th>
    <th>适用场景</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="#FLAT">FLAT</a></td>
    <td>N/A</td>
    <td><ul>
        <li>查询数据规模小</li>
        <li>需要 100% 的召回率。</li>
        </ul></td>
  </tr>
  <tr>
    <td><a href="#IVF_FLAT">IVF_FLAT</a></td>
    <td>基于量化的索引</td>
    <td><ul>
        <li>高速查询</li>
        <li>要求高召回率</li>
        </ul></td>
  </tr>
  <tr>
    <td><a href="#IVF_SQ8">IVF_SQ8</a></td>
    <td>基于量化的索引</td>
    <td><ul>
        <li>高速查询</li>
        <li>磁盘和内存资源有限</li>
        <li>查询召回率低于 IVF_FLAT</li>
        </ul></td>
  </tr>
  <tr>
    <td><a href="#IVF_PQ">IVF_PQ</a></td>
    <td>基于量化的索引</td>
    <td><ul>
        <li>超高速查询</li>
        <li>磁盘和内存资源有限</li>
        <li>可以接受偏低的查询召回率</li>
        </ul></td>
  </tr>
  <tr>
    <td><a href="#HNSW">HNSW</a></td>
    <td>基于图的索引</td>
    <td><ul>
        <li>高速查询</li>
        <li>要求尽可能高的召回率</li>
        <li>内存空间大</li>
        </ul></td>
  </tr>
  <tr>
    <td><a href="#IVF_HNSW">IVF_HNSW</a></td>
    <td>Quantization-and-graph-based index</td>
    <td>
      <ul>
        <li>High-speed query</li>
        <li>Requires a recall rate as high as possible</li>
        <li>Large memory resources</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><a href="#RHNSW_FLAT">RHNSW_FLAT</a></td>
    <td>Quantization-and-graph-based index</td>
    <td>
      <ul>
        <li>High-speed query</li>
        <li>Requires a recall rate as high as possible</li>
        <li>Large memory resources</li>
      </ul>
    </td>
  <tr>
    <td><a href="#RHNSW_SQ">RHNSW_SQ</a></td>
    <td>Quantization-and-graph-based index</td>
    <td>
      <ul>
        <li>High-speed query</li>
        <li>Limited memory resources</li>
        <li>Accepts minor compromise in recall rate</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><a href="#RHNSW_PQ">RHNSW_PQ</a></td>
    <td>Quantization-and-graph-based index</td>
    <td>
      <ul>
        <li>Very high-speed query</li>
        <li>Limited memory resources</li>
        <li>Accepts substantial compromise in recall rate</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><a href="#ANNOY">ANNOY</a></td>
    <td>基于树的索引</td>
    <td><ul>
        <li>低维向量空间</li>
        </ul></td>
  </tr>
</tbody>
</table>

### 索引概览

#### FLAT

<a name="FLAT"></a>

对于需要 100% 召回率且数据规模相对较小（百万级）的向量相似性搜索应用，FLAT 索引是一个很好的选择。FLAT 是指对向量进行原始文件存储，是唯一可以保证精确的检索结果的索引。FLAT 的结果也可以用于对照其他召回率低于 100% 的索引产生的结果。

FLAT 之所以精准是因为它采取了详尽查询的方法，即对于每个查询，目标输入都要与数据集中的每个向量进行比较。因此 FLAT 是列表中查询速度最慢的，而且不适合查询大量的向量数据。Milvus 中没有 FLAT 索引的参数，使用它不需要数据训练，也不需要占用额外的磁盘空间。

- 查询参数

  | 参数          | 说明                | 取值范围                                   |
  | ------------- | ------------------- | ------------------------------------------ |
  | `metric_type` | [可选] 距离计算方式 | 详见 [目前支持的距离计算方式](metric.md)。 |

#### IVF_FLAT

<a name="IVF_FLAT"></a>​

IVF_FLAT 它通过聚类方法把空间里的点划分至 `nlist` 个单元，然后比较目标向量与所有单元中心的距离，选出 `nprobe` 个最近单元。然后比较这些被选中单元里的所有向量，得到最终的结果，极大地缩短了查询时间。 

通过调整 `nprobe`，可以找到特定场景下查询准确性和查询速度之间的理想平衡。IVF_FLAT 性能测试结果表明，随着目标输入向量的数量（`nq`）和需要检索的集群数量（`nprobe`）的增加，查询时间也急剧增加。

IVF_FLAT 是最基础的 IVF 索引，存储在各个单元中的数据编码与原始数据一致。

- 建索引参数

   | 参数   | 说明     | 取值范围     |
   | ------- | -------- |----------- |
   | `nlist` | 聚类单元数 |[1, 65536] |
   

- 查询参数

   | 参数     | 说明        | 取值范围    |
   | -------- | ----------- | ---------- |
   | `nprobe` | 查询取的单元数 | [1, 65536] |

#### IVF_SQ8

<a name="IVF_SQ8"></a>​

由于 IVF_FLAT 未对原始的向量数据做任何压缩，IVF_FLAT 索引文件的大小与原始数据文件大小相当。例如 sift-1b 数据集原始数据文件的大小为 476 GB，生成的 IVF_FLAT 索引文件大小有 470 GB 左右，若将全部索引文件加载进内存，就需要 470 GB 的内存资源。

当磁盘或内存、显存资源有限时，IVF_SQ8 是一个更好的选择。它通过对向量进行标量量化（scalar quantization），能把原始向量中每个FLOAT（4 字节）转为UINT8（1 字节），从而可以把磁盘及内存、显存资源的消耗量减少为原来的 1/4 至 1/3。同样以 sift-1b 数据集为例，生成的 IVF_SQ8 索引文件只有 140 GB。

- 建索引参数

   | 参数   | 说明     | 取值范围     |
   | ------- | -------- |----------- |
   | `nlist` | 聚类单元数 |[1, 65536] |
   

- 查询参数

   | 参数     | 说明        | 取值范围    |
   | -------- | ----------- | ---------- |
   | `nprobe` | 查询取的单元数 | [1, nlist] |
   
#### IVF_PQ

<a name="IVF_PQ"></a>

`PQ`（Product Quantization，乘积量化）会将原来的高维向量空间均匀分解成 `m` 个低维向量空间的笛卡尔积，然后对分解得到的低维向量空间分别做矢量量化。最终每条向量会存储在 `m` × `nbits` 个 bit 位里。乘积量化能将全样本的距离计算转化为到各低维空间聚类中心的距离计算，从而大大降低算法的时间复杂度。

IVF_PQ 是先对向量做乘积量化，然后进行 IVF 索引聚类。其索引文件甚至可以比 IVF_SQ8 更小，不过同样地也会导致查询时的精度损失。

<div class="alert note">

不同版本的建索引参数和查询参数设置不同，请根据使用的 Milvus 版本查看相应的参数信息。

</div>

- 建索引参数

   | 参数   | 说明          | 取值范围     |
   | --------| ------------- | ----------- |
   | `nlist` | 聚类单元数　    | [1, 65536] |
   | `m`     | 乘积量化因子个数 | dim ≡ 0 (mod m) |
   | `nbits` | 分解后每个低维向量的存储位数 (可选) | [1, 16]（默认 8）|

- 查询参数

   | 参数   | 说明          | 取值范围     |
   | -------- | ----------- | ---------- |
   | `nprobe` | 查询取的单元数 | [1, nlist] |


#### HNSW
<a name="HNSW"></a>

HNSW（Hierarchical Small World Graph）是一种基于图的索引算法。它会为一张图按规则建成多层导航图，并让越上层的图越稀疏，结点间的距离越远；越下层的图越稠密，结点间的距离越近。搜索时从最上层开始，找到本层距离目标最近的结点后进入下一层再查找。如此迭代，快速逼近目标位置。
  
为了提高性能，HNSW 限定了每层图上结点的最大度数 `M` 。此外，建索引时可以用 `efConstruction`，查询时可以用 `ef` 来指定搜索范围。



- 建索引参数

   | 参数            | 说明                | 取值范围   |
   | ---------------- | ------------------ | --------- |
   | `M`              | 结点的最大度数        | [4, 64]  |
   | `efConstruction` | 搜索范围      | [8, 512] |

- 查询参数

   | 参数   | 说明            | 取值范围      |
   | --------|--------------- | ------------ |
   | `ef`    | 搜索范围  | [`top_k`, 32768] |

#### IVF_HNSW

<a name="IVF_HNSW"></a>

IVF_HNSW is an indexing algorithm based on IVF_FLAT and HNSW. Using HNSW indexing algorithm as quantizer, this index type builds the multi-layer navigation structure with the `nlist` cluster units divided by IVF_FLAT indexing algorithm, so that it can approach the target position quickly.


- Index building parameters

  | Parameter        | Description                | Range      |
  | ---------------- | -------------------------- | ---------- |
  | `nlist`          | Number of cluster units    | [1, 65536] |
  | `M`              | Maximum degree of the node | [4, 64]    |
  | `efConstruction` | Search scope               | [8, 512]   |

- Search parameters

  | Parameter | Description                | Range            |
  | --------- | -------------------------- | ---------------- |
  | `nprobe`  | Number of units to query   | [1, nlist]       |
  | `ef`      | Search scope               | [`top_k`, 32768] |

#### RHNSW_FLAT

<a name="RHNSW_FLAT"></a>

RHNSW_FLAT (Refined Hierarchical Small World Graph) is a refined indexing algorithm based on HNSW. This index type optimizes the data storage solution of HNSW and thereby reduces the storage consumption.

- Index building parameters

  | Parameter        | Description                | Range    |
  | ---------------- | -------------------------- | -------- |
  | `M`              | Maximum degree of the node | [4, 64]  |
  | `efConstruction` | Search scope               | [8, 512] |


- Search parameters

  | Parameter | Description  | Range            |
  | --------- | ------------ | ---------------- |
  | `ef`      | Search scope | [`top_k`, 32768] |

#### RHNSW_SQ

<a name="RHNSW_SQ"></a>

RHNSW_SQ (Refined Hierarchical Small World Graph and Scalar Quantization) is a refined indexing algorithm based on HNSW. This index type performs scalar quantization on vector data on the basis of HNSW and thereby substantially reduces the storage consumption.

- Index building parameters

  | Parameter        | Description                | Range    |
  | ---------------- | -------------------------- | -------- |
  | `M`              | Maximum degree of the node | [4, 64]  |
  | `efConstruction` | Search scope               | [8, 512] |


- Search parameters

  | Parameter | Description  | Range            |
  | --------- | ------------ | ---------------- |
  | `ef`      | Search scope | [`top_k`, 32768] |

#### RHNSW_PQ

<a name="RHNSW_PQ"></a>

RHNSW_SQ (Refined Hierarchical Small World Graph and Product Quantization) is a refined indexing algorithm based on HNSW. This index type performs product quantization on vector data on the basis of HNSW and thereby significantly reduces the storage consumption.

- Index building parameters

  | Parameter        | Description                               | Range               |
  | ---------------- | ----------------------------------------- | ------------------- |
  | `M`              | Maximum degree of the node                | [4, 64]             |
  | `efConstruction` | Search scope                              | [8, 512]            |
  | `PQM`            | Number of factors of product quantization | dim ≡ 0 (mod `PQM`) |


- Search parameters

  | Parameter | Description  | Range            |
  | --------- | ------------ | ---------------- |
  | `ef`      | Search scope | [`top_k`, 32768] |


#### Annoy
<a name="Annoy"></a>

Annoy（Approximate Nearest Neighbors Oh Yeah）是一种用超平面把高维空间分割成多个子空间，并把这些子空间以树型结构存储的索引方式。

在查询时，Annoy 会顺着树结构找到距离目标向量较近的一些子空间，然后比较这些子空间里的所有向量（要求比较的向量数不少于 `search_k` 个）以获得最终结果。显然，当目标向量靠近某个子空间的边缘时，有时需要大大增加搜索的子空间数以获得高召回率。因此，Annoy 会使用 `n_trees` 次不同的方法来划分全空间，并同时搜索所有划分方法以减少目标向量总是处于子空间边缘的概率。

- 建索引参数

   | 参数     | 说明     　    | 取值范围  |
   | --------- |-------------- | -------- |
   | `n_trees` | 空间划分的方法数 | [1, 1024] |

- 查询参数

   | 参数      | 说明                              | 取值范围          |
   | -----------|--------------------------------- | ---------------- |
   | `search_k` | 搜索的结点数。`-1` 表示用全数据量的 5% | {-1} ∪ [`top_k`, n × `n_trees`] |
   
## 常见问题

<details>
<summary><font color="#4fc4f9">Milvus 中 FLAT 索引和 IVF_FLAT 索引的原理比较？</font></summary>
<p>把 FLAT 和 IVF_FLAT 做比较，可以这么估算：</p>
<p>
已知 IVF_FLAT 索引是把向量分成 <code>nlist</code> 个单元。假设用默认的 <code>nlist</code> = 16384，搜索的时候是先用目标向量和这 16384 个中心点计算距离，得到最近的 <code>nprobe</code> 个单元，再在单元里计算最近向量。而 FLAT 是每条向量和目标向量计算距离。
</p>
<p>
所以当总的向量条数约等于 <code>nlist</code> 时，两者的计算量相当，性能也差不多。而随着向量条数达到 <code>nlist</code> 的 2 倍、3 倍、n 倍之后，IVF_FLAT 的优势就越来越大。</p>
<p>
可参阅 <a href="https://milvus.io/cn/blog/2019-12-03-select-index.md">如何选择索引类型</a>。
</p>
</details>

## 参考文献

- HNSW：<a href="https://arxiv.org/abs/1603.09320">Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs</a>
- Annoy：<a href="https://erikbern.com/2015/10/01/nearest-neighbors-and-vector-models-part-2-how-to-search-in-high-dimensional-spaces.html">Nearest neighbors and vector models – part 2 – algorithms and data structures</a>
