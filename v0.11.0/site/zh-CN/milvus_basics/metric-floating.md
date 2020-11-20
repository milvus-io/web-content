---
id: metric-floating.md
label: 浮点型向量
order: 0
group: vector
---
# 距离计算方式

Milvus 基于不同的距离计算方式比较向量间的距离。选择合适的距离计算方式能极大地提高数据分类和聚类性能。

以下表格列出了 Milvus 目前支持的距离计算方式与数据格式、索引类型之间的兼容关系。
<div class="tab-wrapper"><a href="metric-binary.md" class=''>二值型向量</a><a href="metric-floating.md" class='active '>浮点型向量</a></div> 


<div class="filter-floating table-wrapper" markdown="block">

<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky">距离计算方式</th>
    <th class="tg-0pky">索引类型</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">欧氏距离 (L2)</td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_SQ8H</li><li>IVF_PQ</li><li>RNSG</li><li>HNSW</li></ul></td>
  </tr>
  <tr>
    <td class="tg-0pky">内积 (IP)</td>
  </tr>
</tbody>
</table>

<div class="filter-floating" markdown="block">

### 欧氏距离（L2）

欧氏距离计算的是两点之间最短的直线距离。

欧氏距离的计算公式为：

![euclidean](../../../assets/euclidean_metric.png)

其中 **a** = (a1, a2,..., an) 和 **b** = (b1, b2,..., bn) 是 n 维欧氏空间中的两个点。

欧氏距离是最常用的距离计算方式之一，应用广泛，适合数据完整，数据量纲统一的场景。

### 内积 （IP）

两条向量内积距离的计算公式为：

![ip](../../../assets/IP_formula.png)


假设有 A 和 B 两条向量，则 `||A||` 与 `||B||` 分别代表 A 和 B 归一化后的值。

内积更适合计算向量的方向而不是大小。

<div class="alert note">
如需使用点积计算向量相似度，则必须对向量作归一化处理。处理后点积与余弦相似度等价。
</div>

假设 X' 是向量 X 的归一化向量：

![normalize](../../../assets/normalize_formula.png)

两者之间的关系为：

![normalization](../../../assets/normalization_formula.png)

</div>

## 常见问题

<details>
<summary><font color="#4fc4f9">为什么向量距离计算方式是内积时，搜索出来的 top1 不是目标向量本身？</font></summary>
向量距离计算方式用内积时，如果向量未归一化，会出现这样的情况。
</details>
<details>
<summary><font color="#4fc4f9">什么是归一化？Milvus 中为什么有时候需要归一化？</font></summary>
<p>归一化指的是通过数学变换将向量的模长变为 1 的过程。如需使用点积计算向量相似度，则必须对向量作归一化处理。处理后点积与余弦相似度等价。
</p>
<p>
可参阅文章 <a href="https://zhuanlan.zhihu.com/p/88117781">向量搜索的简明数学基础</a>。
</p>
</details>
<details>
<summary><font color="#4fc4f9">为什么欧氏距离和内积在计算向量相似度时的结果不一致？</font></summary>
如果欧氏距离和内积返回不一致的结果，需要检查数据是否已经归一化。如果没有，请先对数据进行归一化。理论上可以证明，对于未归一化的数据，欧氏距离和内积的结果是不一致的。
</details>
