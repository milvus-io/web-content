---
id: metric.md
title: 度量类型
summary: 相似度量用于衡量向量之间的相似性。选择合适的距离度量有助于显著提高分类和聚类性能。
---
<h1 id="Metric-Types" class="common-anchor-header">度量类型<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>相似度量用于衡量向量之间的相似性。选择合适的距离度量有助于显著提高分类和聚类性能。</p>
<p>目前，Milvus 支持这些类型的相似度度量：欧氏距离 (<code translate="no">L2</code>)、内积 (<code translate="no">IP</code>)、余弦相似度 (<code translate="no">COSINE</code>)、<code translate="no">JACCARD</code>,<code translate="no">HAMMING</code> 和<code translate="no">BM25</code> （专门为稀疏向量的全文检索而设计）。</p>
<p>下表总结了不同字段类型与相应度量类型之间的映射关系。</p>
<table>
   <tr>
     <th><p>字段类型</p></th>
     <th><p>维度范围</p></th>
     <th><p>支持的度量类型</p></th>
     <th><p>默认度量类型</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>,<code translate="no">L2</code> 、<code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>,<code translate="no">L2</code> 、<code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>,<code translate="no">L2</code> 、<code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>无需指定维度。</p></td>
     <td><p><code translate="no">IP</code>,<code translate="no">BM25</code> （仅用于全文检索）</p></td>
     <td><p><code translate="no">IP</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code translate="no">HAMMING</code>,<code translate="no">JACCARD</code></p></td>
     <td><p><code translate="no">HAMMING</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>对于<code translate="no">SPARSE\_FLOAT\_VECTOR</code> 类型的向量场，仅在执行全文检索时使用<code translate="no">BM25</code> 公制类型。有关详细信息，请参阅<a href="/docs/zh/full-text-search.md">全文搜索</a>。</p></li>
<li><p>对于<code translate="no">BINARY_VECTOR</code> 类型的向量字段，维度值 (<code translate="no">dim</code>) 必须是 8 的倍数。</p></li>
</ul>
</div>
<p>下表总结了所有支持的度量类型的相似性距离值特征及其取值范围。</p>
<table>
   <tr>
     <th><p>度量类型</p></th>
     <th><p>相似性距离值的特征</p></th>
     <th><p>相似性距离值范围</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>值越小表示相似度越高。</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>值越大，表示相似度越高。</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>数值越大，表示相似度越高。</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>值越小，表示相似度越高。</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>值越小，表示相似度越高。</p></td>
     <td><p>[0，dim(向量)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>根据词频、反转文档频率和文档归一化对相关性进行评分。</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">欧氏距离（L2）<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>从本质上讲，欧氏距离测量的是连接两点的线段的长度。</p>
<p>欧氏距离的计算公式如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
   </span> <span class="img-wrapper"> <span>欧氏公因子</span> </span></p>
<p>其中<strong>a = (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)</strong>和<strong>b = (<sub>b0</sub>,<sub>b1</sub>,...,<sub>bn-1</sub>)</strong>是 n 维欧几里得空间中的两点。</p>
<p>这是最常用的距离度量，在数据连续时非常有用。</p>
<div class="alert note">
<p>当选择欧氏距离作为距离度量时，Milvus 只计算应用平方根之前的值。</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">内积（IP）<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>两个 Embeddings 之间的 IP 距离定义如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
   </span> <span class="img-wrapper"> <span>IP 公式</span> </span></p>
<p>如果需要比较非标准化数据，或者需要考虑幅度和角度，IP 会更有用。</p>
<div class="alert note">
<p>如果使用 IP 计算嵌入式之间的相似性，必须对嵌入式进行归一化处理。归一化后，内积等于余弦相似度。</p>
</div>
<p>假设 X' 是由嵌入式 X 归一化而来：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
   </span> <span class="img-wrapper"> <span>归一化公式</span> </span></p>
<p>两个嵌入式之间的相关性如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>嵌入式之间的相关性</span> </span></p>
<h2 id="Cosine-similarity" class="common-anchor-header">余弦相似性<button data-href="#Cosine-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>余弦相似度使用两组向量之间角度的余弦来衡量它们的相似程度。你可以把两组向量看成从同一点（如 [0,0,...]）出发，但指向不同方向的线段。</p>
<p>要计算两组向量<strong>A = (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)</strong>和<strong>B = (<sub>b0</sub>,<sub>b1</sub>,...,<sub>bn-1</sub>)</strong> 之间的余弦相似度，请使用下面的公式：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
   </span> <span class="img-wrapper"> <span>余弦相似度</span> </span></p>
<p>余弦相似度总是在区间<strong>[-1, 1]</strong> 内。例如，两个正比向量的余弦相似度为<strong>1</strong>，两个正交向量的余弦相似度为<strong>0</strong>，两个相反向量的余弦相似度为<strong>-1</strong>。余弦越大，两个向量之间的夹角越小，说明这两个向量之间的相似度越高。</p>
<p>用 1 减去它们的余弦相似度，就可以得到两个向量之间的余弦距离。</p>
<h2 id="JACCARD-distance" class="common-anchor-header">JACCARD 距离<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>JACCARD 相似性系数衡量两个样本集之间的相似性，定义为定义集的交集的卡方值除以它们的联合的卡方值。它只能应用于有限样本集。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD 相似度系数公式</span> </span></p>
<p>JACCARD 距离测量数据集之间的不相似性，用 1 减去 JACCARD 相似系数即可得到。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD 距离公式</span> </span></p>
<h2 id="HAMMING-distance" class="common-anchor-header">汉明距离<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>HAMMING 距离测量二进制数据字符串。两个长度相等的字符串之间的距离是比特不同的比特位置数。</p>
<p>例如，假设有两个字符串：1101 1001 和 1001 1101。</p>
<p>11011001 ⊕ 10011101 = 01000100.由于其中包含两个 1，因此 HAMMING 距离 d (11011001, 10011101) = 2。</p>
<h2 id="BM25-similarity" class="common-anchor-header">BM25 相似性<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 是一种广泛使用的文本相关性测量方法，专门用于<a href="/docs/zh/full-text-search.md">全文检索</a>。它结合了以下三个关键因素：</p>
<ul>
<li><p><strong>术语频率 (TF)：</strong>衡量术语在文档中出现的频率。虽然较高的频率通常表示较高的重要性，但 BM25 使用饱和参数 k_1 来防止过于频繁的术语主导相关性得分。</p></li>
<li><p><strong>反向文档频率（IDF）：</strong>反映术语在整个语料库中的重要性。在较少文档中出现的术语会获得较高的 IDF 值，这表明其对相关性的贡献更大。</p></li>
<li><p><strong>文档长度归一化：</strong>较长的文档由于包含较多的术语，往往得分较高。BM25 通过对文档长度进行归一化处理来减轻这种偏差，参数 b 可控制归一化处理的强度。</p></li>
</ul>
<p>BM25 评分的计算方法如下：</p>
<p>score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</p>
<p>参数说明：</p>
<ul>
<li><p>Q： 用户提供的查询文本。</p></li>
<li><p>D：正在评估的文档。</p></li>
<li><p>TF(q_i,D)：术语频率，表示术语 q_ia 在文档 D 中出现的频率。</p></li>
<li><p>IDF(q_i)：反向文档频率，计算公式为</p>
<p>IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5}+ 1)</p>
<p>其中，N 是语料库中的文档总数，n(q_i) 是包含术语 q_i 的文档数。</p></li>
<li><p>|D|:文档 D 的长度（术语总数）。</p></li>
<li><p>avgdl：语料库中所有文档的平均长度。</p></li>
<li><p>k_1：控制词频对得分的影响。数值越大，词频的重要性越高。典型的范围是 [1.2, 2.0]，而 Milvus 允许的范围是 [0, 3]。</p></li>
<li><p>b:控制长度归一化的程度，范围从 0 到 1。当值为 0 时，不进行归一化处理；当值为 1 时，进行完全归一化处理。</p></li>
</ul>
