---
id: metric.md
summary: Milvus 支持多种相似性度量，包括欧氏距离、内积、Jaccard 等。
title: 相似度量
---
<h1 id="Similarity-Metrics" class="common-anchor-header">相似度量<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>在 Milvus 中，相似度量用于衡量向量之间的相似性。选择一个好的距离度量有助于显著提高分类和聚类性能。</p>
<p>下表显示了这些广泛使用的相似度量如何与各种输入数据形式和 Milvus 索引相匹配。目前，Milvus 支持各种类型的数据，包括浮点嵌入（通常称为浮点向量或密集向量）、二进制嵌入（也称为二进制向量）和稀疏嵌入（也称为稀疏向量）。</p>
<div class="filter">
 <a href="#floating">浮点</a> <a href="#binary">嵌入 二进制嵌入</a> <a href="#sparse">稀疏嵌入</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">度量类型</th>
    <th class="tg-0pky">索引类型</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>欧氏距离 (L2)</li><li>内积 (IP)</li><li>余弦相似度 (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>平面</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">度量类型</th>
    <th class="tg-0pky">索引类型</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>雅卡德</li><li>汉明</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">度量类型</th>
    <th class="tg-0pky">索引类型</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>稀疏反转索引</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">欧氏距离（L2）</h3><p>从本质上讲，欧氏距离测量的是连接两点的线段的长度。</p>
<p>欧氏距离的计算公式如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>欧几里得</span> </span></p>
<p>其中<strong>a</strong>= (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>) 和<strong>b</strong>= (<sub>b0</sub>,<sub>b0</sub>,...,<sub>bn-1</sub>) 是 n 维欧几里得空间中的两点。</p>
<p>这是最常用的距离度量，在数据连续时非常有用。</p>
<div class="alert note">
当选择欧氏距离作为距离度量时，Milvus 只在应用平方根之前计算数值。</div>
<h3 id="Inner-product-IP" class="common-anchor-header">内积（IP）</h3><p>两个向量 Embeddings 之间的 IP 距离定义如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span><span class="img-wrapper"><span>IP</span> </span></p>
<p>如果需要比较非标准化数据，或者需要考虑幅度和角度，IP 会更有用。</p>
<div class="alert note">
<p>如果将 IP 距离度量应用于归一化嵌入，结果将等同于计算嵌入之间的余弦相似度。</p>
</div>
<p>假设 X' 是由嵌入 X 归一化而来：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>归一化</span> </span></p>
<p>两个嵌入式之间的相关性如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>归一化</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">余弦相似性</h3><p>余弦相似度使用两组向量之间角度的余弦来衡量它们的相似程度。你可以把两组向量看成是从同一个原点（[0,0,...]）出发但指向不同方向的两条线段。</p>
<p>要计算两组向量<strong>A = (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)</strong>和<strong>B = (<sub>b0</sub>,<sub>b1</sub>,...,<sub>bn-1</sub>)</strong> 之间的余弦相似度，请使用下面的公式：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>余弦相似度</span> </span></p>
<p>余弦相似度始终位于区间<strong>[-1, 1]</strong>。例如，两个正比向量的余弦相似度为<strong>1</strong>，两个正交向量的余弦相似度为<strong>0</strong>，两个相反向量的余弦相似度为<strong>-1</strong>。余弦越大，两个向量之间的夹角越小，说明这两个向量之间的相似度越高。</p>
<p>用 1 减去它们的余弦相似度，就可以得到两个向量之间的余弦距离。</p>
<h3 id="Jaccard-distance" class="common-anchor-header">雅卡德距离</h3><p>Jaccard 相似性系数衡量两个样本集之间的相似性，其定义为定义集的交集的卡方除以它们的联合的卡方。它只能应用于有限样本集。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>杰卡德相似系数</span> </span></p>
<p>雅卡距离测量数据集之间的不相似性，通过从 1 减去雅卡相似系数得出。对于二元变量，雅卡距离等同于塔尼莫托系数。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>雅卡距离</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">汉明距离</h3><p>汉明距离测量二进制数据字符串。两个长度相等的字符串之间的距离是比特不同的比特位置数。</p>
<p>例如，假设有两个字符串：1101 1001 和 1001 1101。</p>
<p>11011001 ⊕ 10011101 = 01000100.由于其中包含两个 1，所以汉明距离 d (11011001, 10011101) = 2。</p>
<h3 id="Structural-Similarity" class="common-anchor-header">结构相似性</h3><p>当一种化学结构作为更大化学结构的一部分出现时，前者称为子结构，后者称为上结构。例如，乙醇是乙酸的子结构，乙酸是乙醇的上结构。</p>
<p>结构相似性是用来判断两个化学式是否相似，即一个化学式是另一个化学式的上结构或下结构。</p>
<p>要确定 A 是否是 B 的上结构，请使用下式：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>上层建筑</span> </span></p>
<p>其中</p>
<ul>
<li>A 是要检索的化学式的二进制表示形式</li>
<li>B 是数据库中化学式的二进制表示形式</li>
</ul>
<p>一旦返回<code translate="no">0</code> ，<strong>A</strong>就不是<strong>B</strong> 的上层结构。否则，结果正好相反。</p>
<p>要确定 A 是否是 B 的子结构，请使用下面的公式：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>子结构</span> </span></p>
<p>其中</p>
<ul>
<li>A 是要检索的化学式的二进制表示形式</li>
<li>B 是数据库中化学式的二进制表示形式</li>
</ul>
<p>一旦返回<code translate="no">0</code> ，则<strong>A</strong>不是<strong>B</strong> 的子结构。否则，结果正好相反。</p>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p><details>
如果<summary><font color="#4fc4f9">度量类型是内积，为什么向量搜索的 top1 结果不是搜索向量本身？</font></summary>如果使用内积作为距离度量时没有对向量进行归一化处理，就会出现这种情况。</details>
<details>
<summary><font color="#4fc4f9">什么是归一化？为什么需要归一化？</font></summary></p>
<p>归一化指的是转换嵌入（向量）使其法向量等于 1 的过程。如果使用内积计算嵌入式相似度，就必须对嵌入式进行归一化处理。归一化后，内积等于余弦相似度。</p>
<p>
更多信息，请参阅<a href="https://en.wikipedia.org/wiki/Unit_vector">维基百科</a>。</p>
</details>
<details>
<summary><font color="#4fc4f9">为什么使用欧氏距离 (L2) 和内积 (IP) 作为距离度量会得到不同的结果？</font></summary>检查向量是否归一化。如果没有，则需要先对向量进行归一化处理。从理论上讲，如果向量没有归一化，用 L2 计算出的相似度与用 IP 计算出的相似度是不同的。</details>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li>进一步了解 Milvus 支持的<a href="/docs/zh/v2.4.x/index.md">索引类型</a>。</li>
</ul>
