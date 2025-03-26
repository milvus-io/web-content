---
id: index.md
related_key: index
summary: Milvus 中的索引機制。
title: 記憶體索引
---
<h1 id="In-memory-Index" class="common-anchor-header">記憶體索引<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題列出 Milvus 支援的各種類型的記憶體索引、每種索引最適合的情況，以及使用者可以設定的參數，以達到更好的搜尋效能。關於磁碟索引，請參閱<strong><a href="/docs/zh-hant/disk_index.md">磁碟索引</a></strong>。</p>
<p>索引是有效組織資料的過程，它透過大幅加速大型資料集上耗時的查詢，在使相似性搜尋有用方面扮演重要角色。</p>
<p>為了改善查詢效能，您可以為每個向量欄位<a href="/docs/zh-hant/index-vector-fields.md">指定索引類型</a>。</p>
<div class="alert note">
目前，一個向量欄位只支援一種索引類型。切換索引類型時，Milvus 會自動刪除舊索引。</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">ANNS 向量索引<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援的大部分向量索引類型都使用近似近鄰搜尋 (ANNS) 演算法。相較於精確檢索通常非常耗時，ANNS 的核心理念不再局限於傳回最精確的結果，而是只搜尋目標的近鄰。ANNS 在可接受的範圍內犧牲精確度，以提高檢索效率。</p>
<p>根據實作方法，ANNS 向量索引可分為四種類型：樹狀索引（Tree-based）、圖形索引（Graph-based）、哈希索引（Hash-based）和量化索引（Quantization-based）。</p>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">Milvus 支援的索引<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援多種索引類型，依其處理的向量嵌入類型分類：<strong>浮點嵌入</strong>(也稱為浮點向量或密集向量)、<strong>二進</strong>位嵌入 (也稱為二進位向量)，以及<strong>稀疏嵌入</strong>(也稱為稀疏向量)。</p>
<div class="filter">
 <a href="#floating">浮點內嵌</a> <a href="#binary">二進位內嵌</a> <a href="#sparse">稀疏內嵌</a></div>
<div class="filter-floating">
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">浮點嵌入的索引</h3><p>對於 128 維浮點內嵌 (向量)，它們所佔的儲存空間是 128 * float 的大小 = 512 位元組。而浮點內嵌使用的<a href="/docs/zh-hant/metric.md">距離指標</a>是 Euclidean distance (<code translate="no">L2</code>) 和 Inner product (<code translate="no">IP</code>)。</p>
<p>這些類型的索引包括<code translate="no">FLAT</code>,<code translate="no">IVF_FLAT</code>,<code translate="no">IVF_PQ</code>,<code translate="no">IVF_SQ8</code>,<code translate="no">HNSW</code>,<code translate="no">HNSW_SQ</code>,<code translate="no">HNSW_PQ</code>,<code translate="no">HNSW_PRQ</code>, 以及<code translate="no">SCANN</code> ，用於以 CPU 為基礎的 ANN 搜尋。</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">二元嵌入的索引</h3><p>對於 128 維的二進位嵌入，其所佔的儲存空間為 128 / 8 = 16 位元組。而用於二進位嵌入的距離指標是<code translate="no">JACCARD</code> 和<code translate="no">HAMMING</code> 。</p>
<p>這類索引包括<code translate="no">BIN_FLAT</code> 和<code translate="no">BIN_IVF_FLAT</code> 。</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">稀疏內嵌索引</h3><p>稀疏嵌入式索引僅支援<code translate="no">IP</code> 和<code translate="no">BM25</code> （用於全文檢索）度量。</p>
<p>稀疏嵌入支持的索引類型：<code translate="no">SPARSE_INVERTED_INDEX</code> 。</p>
<div class="alert note">
<p>從 Milvus 2.5.4 起，<code translate="no">SPARSE_WAND</code> 已經被廢棄。取而代之，建議使用<code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> 以達到等效，同時保持相容性。如需詳細資訊，請參閱<a href="/docs/zh-hant/sparse_vector.md#Set-index-params-for-vector-field">Sparse Vector</a>。</p>
</div>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>支援的索引</th>
    <th>分類</th>
    <th>情況</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>平面</td>
    <td>不適用</td>
    <td>
      <ul>
        <li>資料集相對較小</li>
        <li>需要 100% 的召回率</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>不適用</td>
    <td>
      <ul>
        <li>高速查詢</li>
        <li>要求盡可能高的召回率</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>基於量化的索引</td>
    <td>
      <ul>
        <li>非常高速的查詢</li>
        <li>記憶體資源有限</li>
        <li>可接受召回率的輕微折衷</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>基於量化的索引</td>
    <td>
      <ul>
        <li>高速查詢</li>
        <li>有限的記憶體資源</li>
        <li>接受召回率的輕微折衷</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>基於圖表的索引</td>
    <td>
      <ul>
        <li>非常高速的查詢</li>
        <li>要求盡可能高的召回率</li>
        <li>大量記憶體資源</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW_SQ</td>
    <td>基於量化的索引</td>
    <td>
      <ul>
        <li>非常高速的查詢</li>
        <li>有限的記憶體資源</li>
        <li>可接受召回率的輕微折衷</li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>HNSW_PQ</td>
    <td>基於量化的索引</td>
    <td>
      <ul>
        <li>中速查詢</li>
        <li>非常有限的記憶體資源</li>
        <li>接受召回率的輕微折衷</li>
      </ul>
    </td>
  </tr>
    </tr>
    <tr>
    <td>HNSW_PRQ</td>
    <td>基於量化的索引</td>
    <td>
      <ul>
        <li>中速查詢</li>
        <li>非常有限的記憶體資源</li>
        <li>接受召回率的輕微折衷</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>基於量化的索引</td>
    <td>
      <ul>
        <li>非常高速的查詢</li>
        <li>要求盡可能高的召回率</li>
        <li>大量記憶體資源</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper">
<table id="binary">
<thead>
  <tr>
    <th>支援的索引</th>
    <th>分類</th>
    <th>情況</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>基於量化的索引</td>
    <td><ul>
      <li>取決於相對較小的資料集。</li>
      <li>要求完美的精確度。</li>
      <li>不適用壓縮。</li>
      <li>保證精確的搜尋結果。</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>基於量化的索引</td>
    <td><ul>
      <li>高速查詢</li>
      <li>要求盡可能高的召回率</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper">
<table id="sparse">
<thead>
  <tr>
    <th>支援的索引</th>
    <th>分類</th>
    <th>情況</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>稀疏反向索引</td>
    <td>反向索引</td>
    <td><ul>
      <li>取決於相對較小的資料集。</li>
      <li>需要 100% 的召回率。</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">FLAT</h3><p>對於需要完美精確度，且依賴相對較小（百萬量級）資料集的向量相似性搜尋應用，FLAT 索引是很好的選擇。FLAT 不會壓縮向量，而且是唯一能保證精確搜尋結果的索引。FLAT 的結果也可以用來比較其他召回率低於 100% 的索引所產生的結果。</p>
<p>FLAT 之所以精確，是因為它採用了窮盡方式進行搜尋，也就是說，對於每次查詢，目標輸入都會與資料集中的每一組向量進行比較。這使得 FLAT 成為我們清單上最慢的索引，而且不適合查詢大量向量資料。在 Milvus 中，FLAT 索引不需要任何參數，使用它也不需要資料訓練。</p>
<ul>
<li><p>搜尋參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[可選] 選擇的距離度量。</td><td>請參閱<a href="/docs/zh-hant/metric.md">支援的公制</a>。</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT</h3><p>IVF_FLAT 將向量資料分割成<code translate="no">nlist</code> 叢集單位，然後比較目標輸入向量與每個叢集中心點之間的距離。根據系統設定查詢的叢集數量 (<code translate="no">nprobe</code>) ，相似性搜尋結果只會根據目標輸入與最相似叢集中向量的比較結果傳回 - 大幅縮短查詢時間。</p>
<p>透過調整<code translate="no">nprobe</code> ，可以在特定情況下找到精確度與速度之間的理想平衡。<a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLAT 效能測試</a>的結果顯示，當目標輸入向量的數量 (<code translate="no">nq</code>) 和要搜尋的叢集數量 (<code translate="no">nprobe</code>) 增加時，查詢時間也會大幅增加。</p>
<p>IVF_FLAT 是最基本的 IVF 索引，每個單元儲存的編碼資料與原始資料一致。</p>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>群組單位數量</td><td>[1, 65536]</td><td>128</td></tr>
</tbody>
</table>
</li>
<li><p>搜尋參數</p>
<ul>
<li><p>共用搜尋</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查詢的單位數量</td><td>[1, nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>範圍搜尋</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td><br/><br/>這是範圍搜尋參數，當連續空桶的數量達到指定值時，搜尋程序會終止。增加此值可以提高召回率，但代價是增加搜尋時間。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8</h3><p>IVF_FLAT 不會執行任何壓縮，因此它產生的索引檔案大小與原始、未編入索引的向量資料大致相同。例如，如果原始的 1B SIFT 資料集是 476 GB，則其 IVF_FLAT 索引檔案會稍微小一些 (~470 GB)。將所有索引檔案載入記憶體將會消耗 470 GB 的儲存空間。</p>
<p>當磁碟、CPU 或 GPU 記憶體資源有限時，IVF_SQ8 是比 IVF_FLAT 更好的選擇。此索引類型可透過執行 Scalar Quantization (SQ) 將每個 FLOAT (4 位元組) 轉換為 UINT8 (1 位元組)。這樣可以減少 70-75% 的磁碟、CPU 和 GPU 記憶體消耗。對於 1B SIFT 資料集，IVF_SQ8 索引檔案只需要 140 GB 的儲存空間。</p>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>叢集單位數量</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>搜尋參數</p>
<ul>
<li><p>共用搜尋</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查詢的單位數量</td><td>[1, nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>範圍搜尋</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td><br/><br/>這是範圍搜尋參數，當連續空桶的數量達到指定值時，搜尋程序會終止。增加此值可以提高召回率，但代價是增加搜尋時間。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ</h3><p><code translate="no">PQ</code> (Product Quantization) 將原始的高維向量空間均勻地分解成 低維向量空間的笛卡兒乘積，然後將分解後的低維向量空間量化。乘積量化不需要計算目標向量與所有單元中心的距離，可以計算目標向量與每個低維空間的聚類中心的距離，大大降低了演算法的時間複雜度和空間複雜度。<code translate="no">m</code> </p>
<p>IVF_PQ 在量化向量的乘積之前先執行 IVF 索引聚類。其索引檔案比 IVF_SQ8 更小，但在搜尋向量時也會造成精確度的損失。</p>
<div class="alert note">
<p>索引建立參數和搜尋參數因 Milvus 分佈而異。請先選擇您的 Milvus 分佈。</p>
</div>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>群集單位數量</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>乘積量化的因子數</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Optional] 儲存每個低維向量的位元數。</td><td>[1, 64] (預設為 8)</td></tr>
</tbody>
</table>
</li>
<li><p>搜尋參數</p>
<ul>
<li><p>一般搜尋</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查詢的單位數量</td><td>[1, nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>範圍搜尋</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td><br/><br/>這是範圍搜尋參數，當連續空桶的數量達到指定值時，搜尋程序會終止。增加此值可以提高召回率，但代價是增加搜尋時間。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="SCANN" class="common-anchor-header">SCANN</h3><p>ScaNN (Scalable Nearest Neighbors) 在向量聚類和乘積量化方面與 IVF_PQ 相似。它們的不同之處在於乘積量化的實作細節，以及使用 SIMD (Single-Instruction / Multi-data) 進行有效率的計算。</p>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>叢集單位數量</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">with_raw_data</code></td><td>是否在索引中包含原始資料</td><td><code translate="no">True</code> 或 .預設為 。<code translate="no">False</code> <code translate="no">True</code></td></tr>
</tbody>
</table>
  <div class="alert note">
<p>與 IVF_PQ 不同，預設值適用於<code translate="no">m</code> 和<code translate="no">nbits</code> ，以取得最佳效能。</p>
  </div>
</li>
<li><p>搜尋參數</p>
<ul>
<li><p>常見搜尋</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查詢的單位數量</td><td>[1, nlist］</td><td></td></tr>
<tr><td><code translate="no">reorder_k</code></td><td>要查詢的候選單位數量</td><td>[<code translate="no">top_k</code>, ∞]</td><td><code translate="no">top_k</code></td></tr>
</tbody>
</table>
</li>
<li><p>範圍查詢</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td><br/><br/>這是範圍搜尋參數，當連續空桶的數量達到指定值時，搜尋程序會終止。增加此值可以提高召回率，但代價是增加搜尋時間。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW (Hierarchical Navigable Small World Graph) 是一種以圖表為基礎的索引演算法。它根據特定規則為圖像建立多層導覽結構。在此結構中，上層較為稀疏，節點之間的距離較遠；下層較為密集，節點之間的距離較近。搜尋從最上層開始，在這一層中找到最接近目標的節點，然後進入下一層開始另一次搜尋。經過多次迭代後，可以快速接近目標位置。</p>
<p>為了改善效能，HNSW 將圖表每層上節點的最大度數限制為<code translate="no">M</code> 。此外，您可以使用<code translate="no">efConstruction</code> (建立索引時) 或<code translate="no">ef</code> (搜尋目標時) 來指定搜尋範圍。</p>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M 定義圖表中出線連線的最大數目。在固定 ef/efConstruction 時，M 越大，精確度/run_time 越高。</td><td>[2, 2048]</td><td>無</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction 控制索引搜尋速度/建立速度的取捨。增加 efConstruction 參數可能會提高索引品質，但也會延長索引建立時間。</td><td>[1, int_max］</td><td>無</td></tr>
</tbody>
</table>
</li>
<li><p>搜尋參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>控制查詢時間/精確度權衡的參數。<code translate="no">ef</code> 越高，搜尋越精確，但速度越慢。</td><td>[<code translate="no">top_k</code>, int_max]</td><td>無</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWSQ" class="common-anchor-header">HNSW_SQ</h3><p>標量量化 (Scalar Quantization, SQ) 是一種技術，用來根據浮點資料的大小，將其離散成一組有限的數值。例如，<strong>SQ6</strong>表示量化為 (2^6 = 64) 個離散數值，其中每個浮點數使用 6 位元編碼。同樣地，<strong>SQ8</strong>將資料量化為 (2^8 = 256) 個離散數值，其中每個浮點數使用 8 位元表示。這種量化方式可減少記憶體佔用量，同時保留資料的基本結構，以提高處理效率。</p>
<p>結合 SQ，HNSW_SQ 在索引大小與精確度之間提供了可控制的權衡，同時維持每秒高查詢 (QPS) 的效能。與標準的 HNSW 相比，它會導致索引建置時間的適度增加。</p>
<ul>
<li><p>索引建置參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M 定義圖表中出線連線的最大數目。在固定 ef/efConstruction 時，M 越大，精確度/run_time 越高。</td><td>[2, 2048]</td><td>無</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction 控制索引搜尋速度/建立速度的取捨。增加 efConstruction 參數可能會提高索引品質，但也會延長索引建立時間。</td><td>[1, int_max］</td><td>無</td></tr>
<tr><td><code translate="no">sq_type</code></td><td>標量量化器類型。</td><td><code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code> 、<code translate="no">FP16</code></td><td><code translate="no">SQ8</code></td></tr>
<tr><td><code translate="no">refine</code></td><td>索引建立時是否保留精煉資料。</td><td><code translate="no">true</code>,<code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>精煉索引的資料類型。</td><td><code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code> 、<code translate="no">FP32</code></td><td>無</td></tr>
</tbody>
</table>
</li>
<li><p>搜尋參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>控制查詢時間/精確度權衡的參數。<code translate="no">ef</code> 越高，搜尋越精確，但速度越慢。</td><td>[<code translate="no">top_k</code>, int_max]</td><td>無</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>refine 相對於<em>k</em> 的放大係數。</td><td>[1,<em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPQ" class="common-anchor-header">HNSW_PQ</h3><p>PQ 的基本概念是將向量分割成<code translate="no">m</code> 個子向量，每個子向量會根據 kmeans 找到<em>2^{nbits}</em> 的 centroids，每個子向量會選擇最接近的 centroids 作為它的近似子向量。然後，我們記錄所有的中心點，因此每個子向量可以編碼為<code translate="no">nbits</code> ，而長度為<code translate="no">dim</code> 的浮動向量可以編碼為<em>m ⋅ nbits</em>位元。</p>
<p>結合 PQ，HNSW_PQ 在索引大小與精確度之間提供了可控制的折衷，但在相同的壓縮率下，它的 QPS 值比 HNSW_SQ 低，召回率也比 HNSW_SQ 高。與 HNSW_SQ 相比，它需要更長的時間來建立索引。</p>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M 定義圖表中出線連線的最大數目。在固定 ef/efConstruction 時，M 越大，精確度/run_time 越高。</td><td>[2, 2048]</td><td>無</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction 控制索引搜尋速度/建立速度的取捨。增加 efConstruction 參數可能會提高索引品質，但也會延長索引建立時間。</td><td>[1, int_max］</td><td>無</td></tr>
<tr><td><code translate="no">m</code></td><td>將向量分割成的子向量群組數。</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>每個子向量群量化成的位元數。</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">refine</code></td><td>建立索引時是否保留精煉資料。</td><td><code translate="no">true</code>,<code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>精煉索引的資料類型。</td><td><code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code> 、<code translate="no">FP32</code></td><td>無</td></tr>
</tbody>
</table>
</li>
<li><p>搜尋參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>控制查詢時間/精確度權衡的參數。<code translate="no">ef</code> 越高，搜尋越精確，但速度越慢。</td><td>[<code translate="no">top_k</code>, int_max]</td><td>無</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>refine 相對於<em>k</em> 的放大係數。</td><td>[1,<em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ</h3><p>PRQ 與 PQ 相似，也是將向量分成<code translate="no">m</code> 組。每個子向量將被編碼為<code translate="no">nbits</code> 。完成 pq 量化後，會計算向量與 pq 量化向量之間的殘差，並對殘差向量套用 pq 量化。總共會執行<code translate="no">nrq</code> 完整的 pq 量化，因此長度為<code translate="no">dim</code> 的浮動向量將被編碼為<em>m ⋅ nbits ⋅ nrq</em>bits。</p>
<p>結合了 Product Residual Quantizer (PRQ)，HNSW_PRQ 在索引大小與精確度之間提供了更高的可控權衡。與 HNSW_PQ 相比，在相同的壓縮率下，HNSW_PRQ 的 QPS 值與 HNSW_PQ 的召回率幾乎相等。與 HNSW_PQ 相比，建立索引的時間可能會增加數倍。</p>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M 定義圖表中出線連線的最大數目。在固定 ef/efConstruction 時，M 越大，精確度/run_time 越高。</td><td>[2, 2048]</td><td>無</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction 控制索引搜尋速度/建立速度的取捨。增加 efConstruction 參數可能會提高索引品質，但也會延長索引建立時間。</td><td>[1, int_max］</td><td>無</td></tr>
<tr><td><code translate="no">m</code></td><td>將向量分割成的子向量群組數。</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>每個子向量群量化成的位元數。</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">nrq</code></td><td>殘餘子量化器的數量。</td><td>[1, 16]</td><td>2</td></tr>
<tr><td><code translate="no">refine</code></td><td>建立索引時是否保留精煉資料。</td><td><code translate="no">true</code>,<code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>精煉索引的資料類型。</td><td><code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code> 、<code translate="no">FP32</code></td><td>無</td></tr>
</tbody>
</table>
</li>
<li><p>搜尋參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>控制查詢時間/精確度權衡的參數。<code translate="no">ef</code> 越高，搜尋越精確，但速度越慢。</td><td>[<code translate="no">top_k</code>, int_max]</td><td>無</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>refine 相對於<em>k</em> 的放大係數。</td><td>[1,<em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT</h3><p>除了只能用於二進位嵌入之外，這個索引與 FLAT 完全相同。</p>
<p>對於需要完美精確度，並依賴相對較小（百萬量級）資料集的向量相似性搜尋應用，BIN_FLAT 索引是一個不錯的選擇。BIN_FLAT 不會壓縮向量，而且是唯一能保證精確搜尋結果的索引。BIN_FLAT 的結果也可以用來比較其他召回率低於 100% 的索引所產生的結果。</p>
<p>BIN_FLAT 之所以準確，是因為它採用了窮盡搜尋的方式，也就是說，對於每個查詢，目標輸入都會與資料集中的向量進行比較。這使得 BIN_FLAT 成為我們清單上最慢的索引，而且不適合查詢大量向量資料。在 Milvus 中，BIN_FLAT 索引沒有任何參數，使用它不需要資料訓練或額外的儲存空間。</p>
<ul>
<li><p>搜尋參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[可選] 選擇的距離度量。</td><td>請參閱<a href="/docs/zh-hant/metric.md">支援的公制</a>。</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT</h3><p>這個索引與 IVF_FLAT 完全相同，只是只能用於二進位嵌入。</p>
<p>BIN_IVF_FLAT 會將向量資料分割成<code translate="no">nlist</code> 叢集單位，然後比較目標輸入向量與每個叢集中心的距離。根據系統設定查詢的叢集數量 (<code translate="no">nprobe</code>)，相似性搜尋結果只會根據目標輸入與最相似叢集中向量的比較結果傳回 - 大幅縮短查詢時間。</p>
<p>透過調整<code translate="no">nprobe</code> ，可以在特定情況下找到精確度與速度之間的理想平衡。查詢時間會隨著目標輸入向量的數量 (<code translate="no">nq</code>) 以及要搜尋的群集數量 (<code translate="no">nprobe</code>) 的增加而急遽增加。</p>
<p>BIN_IVF_FLAT 是最基本的 BIN_IVF 索引，每個單元儲存的編碼資料與原始資料一致。</p>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>群集單元數</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>搜尋參數</p>
<ul>
<li><p>共用搜尋</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查詢的單位數量</td><td>[1, nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>範圍搜尋</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td><br/><br/>這是範圍搜尋參數，當連續空桶的數量達到指定值時，搜尋程序會終止。增加此值可以提高召回率，但代價是增加搜尋時間。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
</div>
<div class="filter-sparse">
<h3 id="SPARSEINVERTEDINDEX" class="common-anchor-header">sparse_inverted_index</h3><p>每個維度都會維護一個在該維度上有非零值的向量清單。在搜尋過程中，Milvus 會反覆搜尋查詢向量的每個維度，並計算在這些維度上有非零值的向量的分數。</p>
<ul>
<li><p>索引建立參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">inverted_index_algo</code></td><td>用於建立和查詢索引的演算法。如需詳細資訊，請參閱<a href="/docs/zh-hant/sparse_vector.md#Set-index-params-for-vector-field">Sparse Vector</a>.</td><td><code translate="no">DAAT_MAXSCORE</code> (預設值)， 、<code translate="no">DAAT_WAND</code> <code translate="no">TAAT_NAIVE</code></td></tr>
<tr><td><code translate="no">bm25_k1</code></td><td>控制詞彙頻率飽和度。較高的值會增加術語頻率在文件排序中的重要性。</td><td>[1.2, 2.0]</td></tr>
<tr><td><code translate="no">bm25_b</code></td><td>控制文件長度規範化的程度。預設為 0.75。</td><td>[0, 1]</td></tr>
</tbody>
</table>
  <div class="alert note">
<p><code translate="no">drop_ratio_build</code> 參數自 Milvus v2.5.4 起已被廢棄，在建立索引時仍可接受，但將不再對索引有實際影響。</p>
  </div>
</li>
<li><p>搜尋參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>在搜尋過程中排除小向量值的比例。此選項允許微調搜尋過程，方法是指定忽略查詢向量中最小值的比例。它有助於平衡搜尋精確度與效能。<code translate="no">drop_ratio_search</code> 設定的值越小，這些小值對最終得分的貢獻就越小。藉由忽略一些小值，可以在對精確度影響最小的情況下提高搜尋效能。</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
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
<summary><font color="#4fc4f9">FLAT 索引與 IVF_FLAT 索引有何不同？</font></summary></p>
<p>IVF_FLAT 索引將向量空間分為<code translate="no">nlist</code> 叢集。如果您保持<code translate="no">nlist</code> 的預設值為 16384，Milvus 會比較目標向量與所有 16384 叢集中心的距離，以得到<code translate="no">nprobe</code> 最近的叢集。接著，Milvus 會比較目標向量與選取的叢集中向量之間的距離，以得到最近的向量。與 IVF_FLAT 不同，FLAT 直接比較目標向量與每個向量之間的距離。</p>
<p>
因此，當向量的總數大約等於<code translate="no">nlist</code> 時，IVF_FLAT 與 FLAT 所需的計算方式與搜尋效能差異不大。但是當向量的數量增加到<code translate="no">nlist</code> 的 2 倍、3 倍或 n 倍時，IVF_FLAT 索引就開始顯示出越來越大的優勢。</p>
<p>
更多資訊請參閱<a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">如何在 Milvus 中選擇索引</a>。</p>
</details>
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
<li>了解更多關於 Milvus 支援的<a href="/docs/zh-hant/metric.md">相似度指標</a>。</li>
</ul>
