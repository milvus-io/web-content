---
id: metric.md
title: 度量類型
summary: 相似度量用來衡量向量之間的相似性。選擇適當的距離指標有助於大幅改善分類和聚類效能。
---
<h1 id="Metric-Types" class="common-anchor-header">度量類型<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>相似度量測向量之間的相似性。選擇適當的距離度量有助於大幅改善分類和聚類效能。</p>
<p>目前，Milvus 支援這些類似度量：Euclidean distance (<code translate="no">L2</code>), Inner Product (<code translate="no">IP</code>), Cosine Similarity (<code translate="no">COSINE</code>),<code translate="no">JACCARD</code>,<code translate="no">HAMMING</code>, 和<code translate="no">BM25</code> (專為稀疏向量的全文檢索而設計)。</p>
<p>下表總結了不同欄位類型與相對應的度量類型之間的對應關係。</p>
<table>
   <tr>
     <th><p>欄位類型</p></th>
     <th><p>尺寸範圍</p></th>
     <th><p>支援的公制類型</p></th>
     <th><p>預設公制類型</p></th>
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
     <td><p>不需要指定尺寸。</p></td>
     <td><p><code translate="no">IP</code>,<code translate="no">BM25</code> (僅用於全文檢索)</p></td>
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
<li><p>對於<code translate="no">SPARSE\_FLOAT\_VECTOR</code> 類型的向量場，僅在執行全文檢索時使用<code translate="no">BM25</code> 公制類型。如需詳細資訊，請參閱<a href="/docs/zh-hant/full-text-search.md">全文</a>檢索。</p></li>
<li><p>對於<code translate="no">BINARY_VECTOR</code> 類型的向量欄位，尺寸值 (<code translate="no">dim</code>) 必須是 8 的倍數。</p></li>
</ul>
</div>
<p>下表總結了所有支援的度量類型的相似性距離值特性及其值範圍。</p>
<table>
   <tr>
     <th><p>公制類型</p></th>
     <th><p>相似性距離值的特性</p></th>
     <th><p>相似性距離值範圍</p></th>
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
     <td><p>值越大，表示相似度越高。</p></td>
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
     <td><p>[0, dim(vector)] [0, dim(vector)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>根據詞彙頻率、倒置文件頻率和文件規範化為相關性評分。</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">歐氏距離 (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>基本上，歐氏距離量度的是連接 2 點的一段長度。</p>
<p>歐氏距離的公式如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
   </span> <span class="img-wrapper"> <span>歐氏公制</span> </span></p>
<p>其中<strong>a = (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)</strong>和<strong>b = (<sub>b0</sub>,<sub>b1</sub>,...,<sub>bn-1</sub>)</strong>是 n 維歐氏空間中的兩個點。</p>
<p>這是最常用的距離度量，在資料連續時非常有用。</p>
<div class="alert note">
<p>當選擇歐氏距離為距離公制時，Milvus 只會計算應用平方根之前的值。</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">內積 (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>兩個內嵌之間的 IP 距離定義如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
   </span> <span class="img-wrapper"> <span>IP 公式</span> </span></p>
<p>如果您需要比較非規範化的資料，或是關心幅度和角度時，IP 會比較有用。</p>
<div class="alert note">
<p>如果您使用 IP 來計算嵌入式之間的相似性，您必須將您的嵌入式歸一化。歸一化之後，內積等於余弦相似度。</p>
</div>
<p>假設 X' 是由嵌入 X 正規化而成：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
   </span> <span class="img-wrapper"> <span>規範化公式</span> </span></p>
<p>兩個嵌入式之間的相關性如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>嵌入式之間的相關性</span> </span></p>
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
    </button></h2><p>余弦相似度使用兩組向量之間角度的余弦來衡量它們的相似程度。您可以將兩組向量視為從相同點 (例如 [0,0,...])開始，但指向不同方向的線段。</p>
<p>要計算兩組向量<strong>A = (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)</strong>和<strong>B = (<sub>b0</sub>,<sub>b1</sub>,...,<sub>bn-1</sub>)</strong> 的余弦相似度，請使用下列公式：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
   </span> <span class="img-wrapper"> <span>余弦相似度</span> </span></p>
<p>余弦相似度總是在區間<strong>[-1, 1]</strong>。舉例來說，兩個成正比的向量的余弦相似度為<strong>1</strong>，兩個正交的向量的相似度為<strong>0</strong>，兩個相反的向量的相似度為<strong>-1</strong>。余弦越大，兩個向量之間的角度越小，表示這兩個向量之間的相似度越高。</p>
<p>將它們的余弦相似度從 1 減去，就可以得到兩個向量之間的余弦距離。</p>
<h2 id="JACCARD-distance" class="common-anchor-header">JACCARD 距離<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>JACCARD 相似度系數量度兩個樣本集之間的相似度，定義為定義集的交集的 cardinality 除以它們的結合的 cardinality。它只能應用於有限樣本集。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD 相似度系數公式</span> </span></p>
<p>JACCARD 距離量度資料集間的不相似性，將 JACCARD 相似度系數從 1 減去即可得到。對於二元變數，JACCARD 距離等同於 Tanimoto 系數。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD 距離公式</span> </span></p>
<h2 id="HAMMING-distance" class="common-anchor-header">HAMMING 距離<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>HAMMING 距離量度二進位資料字串。長度相等的兩個字串之間的距離是位元位置不同的位元數。</p>
<p>例如，假設有兩個字串，1101 1001 和 1001 1101。</p>
<p>11011001 ⊕ 10011101 = 01000100.由於這包含兩個 1，所以 HAMMING 距離 d (11011001, 10011101) = 2。</p>
<h2 id="BM25-similarity" class="common-anchor-header">BM25 相似度<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25 是一種廣泛使用的文字相關性測量方法，專門設計用於<a href="/docs/zh-hant/full-text-search.md">全文檢索</a>。它結合了以下三個關鍵因素：</p>
<ul>
<li><p><strong>詞彙頻率 (TF)：</strong>測量詞彙在文件中出現的頻率。雖然較高的頻率通常表示較高的重要性，但 BM25 使用飽和參數 k_1 來防止過度頻繁的詞彙主宰相關性得分。</p></li>
<li><p><strong>反向文件頻率 (IDF)：</strong>反映詞彙在整個語料庫中的重要性。出現在較少文件中的詞彙會得到較高的 IDF 值，表示對相關性的貢獻較大。</p></li>
<li><p><strong>文件長度規範化：</strong>較長的文件往往會因為包含較多的詞彙而得分較高。BM25 藉由將文件長度規範化來減緩這種偏差，而參數 b 則控制規範化的強度。</p></li>
</ul>
<p>BM25 評分的計算方式如下：</p>
<p>score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</p>
<p>參數說明：</p>
<ul>
<li><p>Q: 使用者提供的查詢文字。</p></li>
<li><p>D: 評估中的文件。</p></li>
<li><p>TF(q_i, D)：詞彙頻率，表示詞彙 q_iappears 在文件 D 中出現的頻率。</p></li>
<li><p>IDF(q_i)：反向文件頻率，計算方式為</p>
<p>IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5}+ 1)</p>
<p>其中 N 是語料庫中的文件總數，n(q_i) 是包含術語 q_i 的文件數目。</p></li>
<li><p>|D|:文件 D 的長度（詞彙總數）。</p></li>
<li><p>avgdl：語料庫中所有文件的平均長度。</p></li>
<li><p>k_1：控制詞彙頻率對分數的影響。較高的值會增加詞彙頻率的重要性。典型的範圍是 [1.2，2.0]，而 Milvus 允許的範圍是 [0，3]。</p></li>
<li><p>b:控制長度規範化的程度，範圍從 0 到 1。當值為 0 時，不套用規範化；當值為 1 時，套用完全規範化。</p></li>
</ul>
