---
id: metric.md
summary: Milvus 支援多種相似度指標，包括歐氏距離、內積、Jaccard 等。
title: 相似度指標
---
<h1 id="Similarity-Metrics" class="common-anchor-header">相似度指標<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，類似度量用來量度向量之間的類似性。選擇一個好的距離度量有助於顯著改善分類和聚類性能。</p>
<p>下表顯示這些廣泛使用的類似度量如何配合各種輸入資料形式和 Milvus 索引。目前，Milvus 支援各種類型的資料，包括浮點內嵌 (通常稱為浮點向量或密集向量)、二進位內嵌 (也稱為二進位向量)，以及稀疏內嵌 (也稱為稀疏向量)。</p>
<div class="filter">
 <a href="#floating">浮點內嵌</a> <a href="#binary">二進位內嵌</a> <a href="#sparse">稀疏內嵌</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">度量類型</th>
    <th class="tg-0pky">索引類型</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>歐氏距離 (L2)</li><li>內積 (IP)</li><li>余弦相似度 (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>平面</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">公制類型</th>
    <th class="tg-0pky">索引類型</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>傑卡</li><li>漢明</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">公制類型</th>
    <th class="tg-0pky">索引類型</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>Sparse_inverted_index</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">歐氏距離 (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h3><p>基本上，歐氏距離量度的是連接 2 個點的線段長度。</p>
<p>歐氏距離的公式如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>歐氏距離</span> </span></p>
<p>其中<strong>a</strong>= (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>) 和<strong>b</strong>= (<sub>b0</sub>,<sub>b0</sub>,...,<sub>bn-1</sub>) 是 n 維歐氏空間中的兩個點。</p>
<p>這是最常用的距離度量，在資料連續時非常有用。</p>
<div class="alert note">
當選擇歐氏距離為距離公制時，Milvus 只會在應用平方根前計算數值。</div>
<h3 id="Inner-product-IP" class="common-anchor-header">內積 (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h3><p>兩個向量嵌入之間的 IP 距離定義如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span><span class="img-wrapper"><span>IP</span> </span></p>
<p>如果您需要比較非規範化的資料，或是關心大小和角度，IP 會比較有用。</p>
<div class="alert note">
<p>如果將 IP 距離公制套用到規範化的嵌入式，結果就等於計算嵌入式之間的余弦相似度。</p>
</div>
<p>假設 X' 是由嵌入 X 規範化而成：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>歸一化</span> </span></p>
<p>兩個嵌入式之間的相關性如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>歸一化</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">余弦相似性<button data-href="#Cosine-Similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>余弦相似度使用兩組向量之間角度的余弦來衡量它們的相似程度。您可以將兩組向量視為從相同原點 ([0,0,...])，但指向不同方向的兩條線段。</p>
<p>若要計算兩組向量<strong>A = (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)</strong>和<strong>B = (<sub>b0</sub>,<sub>b1</sub>,...,<sub>bn-1</sub>)</strong> 的余弦相似度，請使用下列公式：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>余弦相似度</span> </span></p>
<p>余弦相似度總是在區間<strong>[-1, 1]</strong>。舉例來說，兩個成正比的向量的余弦相似度為<strong>1</strong>，兩個正交的向量的相似度為<strong>0</strong>，兩個相反的向量的相似度為<strong>-1</strong>。余弦越大，兩個向量之間的角度越小，表示這兩個向量之間的相似度越高。</p>
<p>將它們的余弦相似度從 1 減去，就可以得到兩個向量之間的余弦距離。</p>
<h3 id="Jaccard-distance" class="common-anchor-header">Jaccard 距離<button data-href="#Jaccard-distance" class="anchor-icon" translate="no">
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
    </button></h3><p>Jaccard 相似度系數量度兩個樣本集的相似度，定義為定義集的交集的 cardinality 除以它們的結合的 cardinality。它只適用於有限樣本集。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>Jaccard 相似度係數</span> </span></p>
<p>Jaccard 距離量度資料集間的不相似性，將 Jaccard 相似度係數從 1 減去即可得到。對於二元變數，Jaccard 距離等同於 Tanimoto 系數。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>Jaccard 距離</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">漢明距離<button data-href="#Hamming-distance" class="anchor-icon" translate="no">
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
    </button></h3><p>Hamming 距離測量二進位資料串。長度相等的兩個字串之間的距離是位元不同的位元位置數目。</p>
<p>例如，假設有兩個字串，1101 1001 和 1001 1101。</p>
<p>11011001 ⊕ 10011101 = 01000100.由於這包含兩個 1，所以 Hamming 距離 d (11011001, 10011101) = 2。</p>
<h3 id="Structural-Similarity" class="common-anchor-header">結構相似性<button data-href="#Structural-Similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>當一種化學結構作為更大化學結構的一部分出現時，前者稱為次結構，後者稱為上結構。例如，乙醇是乙酸的子結構，而乙酸是乙醇的上層結構。</p>
<p>結構相似性用來判斷兩個化學式是否相似，即其中一個是另一個的上層結構或下層結構。</p>
<p>若要判斷 A 是否是 B 的上層結構，請使用以下公式：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>上層結構</span> </span></p>
<p>其中：</p>
<ul>
<li>A 是要檢索的化學式的二進位表示形式</li>
<li>B 是資料庫中化學式的二進位表示形式</li>
</ul>
<p>一旦返回<code translate="no">0</code> ，<strong>A</strong>就不是<strong>B</strong> 的上層結構。否則，結果會相反。</p>
<p>要確定 A 是否是 B 的子結構，請使用以下公式：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>子結構</span> </span></p>
<p>其中：</p>
<ul>
<li>A 是要檢索的化學式的二進位表示形式</li>
<li>B 是資料庫中化學式的二進位表示形式</li>
</ul>
<p>一旦返回<code translate="no">0</code> ，則<strong>A</strong>不是<strong>B</strong> 的子結構。否則，結果會相反。</p>
<h2 id="FAQ" class="common-anchor-header">常見問題<button data-href="#FAQ" class="anchor-icon" translate="no">
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
如果<summary><font color="#4fc4f9">度量類型是內乘，為什麼向量搜尋的 top1 結果不是搜尋向量本身？</font></summary>如果使用內乘作為距離度量時，您沒有將向量規範化，就會出現這種情況。</details>
<details>
<summary><font color="#4fc4f9">什麼是歸一化？為什麼需要歸一化？</font></summary></p>
<p>歸一化是指轉換內嵌 (向量) 使其規範等於 1 的過程。如果您使用內積來計算內嵌相似度，您必須將您的內嵌歸一化。歸一化之後，內積等於余弦相似度。</p>
<p>
更多資訊請參閱<a href="https://en.wikipedia.org/wiki/Unit_vector">維基百科</a>。</p>
</details>
<details>
<summary><font color="#4fc4f9">為什麼使用 Euclidean distance (L2) 和 Inner Product (IP) 作為距離</font></summary>公制<summary><font color="#4fc4f9">會得到不同的結果？</font></summary>檢查向量是否已歸一化。如果沒有，您需要先將向量歸一化。理論上來說，如果向量沒有歸一化，以 L2 計算出來的相似度和以 IP 計算出來的相似度是不同的。</details>
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
<li>進一步了解 Milvus 支援的<a href="/docs/zh-hant/index.md">索引類型</a>。</li>
</ul>
