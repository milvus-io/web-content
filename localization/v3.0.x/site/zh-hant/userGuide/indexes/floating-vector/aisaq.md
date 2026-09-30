---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQ 是基於磁碟的向量索引，它擴充了 DISKANN 的功能，可在不超出 RAM 限制的情況下處理 10 億規模的資料集。DISKANN
  將壓縮向量儲存在記憶體中，AISAQ 則不同，它將所有資料儲存在磁碟上，提供兩種模式來平衡效能與儲存成本。
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ 是基於磁碟的向量索引，可擴充<a href="/docs/zh-hant/diskann.md">DISKANN</a>，以最小的 DRAM 足跡處理十億級資料集。</p>
<p>DISKANN 將壓縮向量保存在記憶體中，而 AISAQ 則不同，它採用「近零 DRAM 架構」設計，也就是將所有資料結構保存在 SSD 上。</p>
<p>AISAQ 可以使用標準伺服器執行超高規模資料庫，同時提供操作模式以平衡效能與儲存成本。</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">AISAQ 如何運作<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>上圖比較了<strong>DISKANN</strong>、<strong>AISAQ-Performance</strong> 和<strong>AISAQ-Scale</strong> 的儲存佈局，顯示資料 (原始向量、邊緣列表和 PQ 代碼) 在 RAM 和磁碟之間的分配方式。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>Aisaq Vs Diskann</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">基礎：DISKANN 回顧<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>在 DISKANN 中，原始向量和邊緣清單儲存在磁碟上，而 PQ 壓縮向量則儲存在記憶體 (DRAM)。</p>
<p>當 DISKANN 遍歷到一個節點 (例如<em>向量 0</em>)：</p>
<ul>
<li><p>它會從磁碟載入原始向量<strong>(raw_vector_0</strong>) 及其邊緣清單<strong>(edgelist</strong><strong>_0</strong>)。</p></li>
<li><p>邊緣清單指出下一個要造訪的鄰居 (本範例中的節點 2、3 和 5)。</p></li>
<li><p>原始向量用來計算與查詢向量的精確距離，以進行排序。</p></li>
<li><p>記憶體中的 PQ 資料用於近似距離篩選，以引導下一次遍歷。</p></li>
</ul>
<p>由於 PQ 資料已經快取在 DRAM 中，因此每次節點造訪只需要一次磁碟 I/O，以適度的記憶體使用量達到高查詢速度。</p>
<p>有關這些元件和參數的詳細說明，請參閱<a href="/docs/zh-hant/diskann.md">DISKANN</a>。</p>
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">AISAQ 操作模式<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ 提供兩種運作模式，以因應兩種不同的使用情況：</p>
<p>效能模式：針對需要低延遲和高吞吐量的應用程式進行最佳化，例如線上語意搜尋。</p>
<p>規模模式：針對延遲限制較寬鬆的應用程式進行最佳化，例如 RAG 與離線語意搜尋，同時能以符合成本效益的方式將資料集擴充至超高規模。</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">AISAQ-performance 模式</h4><p><strong>AISAQ-performance</strong>透過將 PQ 資料從記憶體移至磁碟，達到「近零 DRAM 足跡」，同時透過資料託管與備援維持低 IOPS。</p>
<ul>
<li><p>每個節點的原始向量、邊緣列表及其鄰居的 PQ 資料都一起儲存在磁碟上。</p></li>
<li><p>此佈局可確保訪問一個節點 (例如向量 0) 仍只需要單次磁碟 I/O。</p></li>
<li><p>由於 PQ 資料在多個節點附近被重複儲存，索引檔案的大小會大幅增加，消耗更多的磁碟空間。</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">AISAQ-scale 模式</h4><p><strong>AISAQ-scale</strong>著重於減少磁碟空間使用量，同時滿足目標應用程式的效能需求。</p>
<p>在此模式中</p>
<ul>
<li><p>PQ 資料會單獨儲存在磁碟上，沒有備援。</p></li>
<li><p>此設計可最小化索引大小，但會導致圖形遍歷過程中產生更多 I/O 作業。</p></li>
<li><p>為了減少 IOPS 開銷，AISAQ 引進了兩種最佳化方法：</p>
<ul>
<li><p>重新排列演算法，可依優先順序排序 PQ 向量，以改善資料位置性。</p></li>
<li><p>DRAM 中的 PQ 快取記憶體 (pq_read_page_cache_size)，可快取經常存取的 PQ 資料。</p></li>
</ul></li>
</ul>
<h2 id="Example-configuration" class="common-anchor-header">配置範例<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">AISAQ 參數<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ 繼承了 DISKANN 的一些參數 -<code translate="no">max_degree</code>,<code translate="no">search_list_size</code>, 和<code translate="no">pq_code_budget_gb_ratio</code> 。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>這些參數會影響 AISAQ 索引的建立方式。調整這些參數會影響索引大小、建立時間和搜尋品質。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>控制每個資料點在 Vamana 圖形中的最大連線（邊）數。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[1, 512]</p><p><strong>預設值</strong>：<code translate="no">56</code></p></td>
     <td><p>較高的值會建立較密集的圖形，可能會增加召回率 (找到更多相關結果)，但也會增加記憶體使用量和建立時間。在大多數情況下，我們建議您設定此範圍內的值：[10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>在索引建構期間，此參數會定義為每個節點搜尋最近鄰居時所使用的候選池大小。對於新增到圖表中的每個節點，演算法會維護一個 search_list_size 最佳候選人清單。當這份清單無法再改善時，鄰居搜尋就會停止。從這個最終候選人資料庫中，選出最高 max_degree 節點來組成最終邊。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[1, 512]</p><p><strong>預設值</strong>：<code translate="no">100</code></p></td>
     <td><p>較大的 search_list_size 會增加找到每個節點的真正最近鄰居的可能性，這可能會導致更高品質的圖、以及更好的搜尋效能 (回復率)。不過，這也是以大幅延長索引建立時間為代價。它應該永遠設定為大於或等於 max_degree 的值。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>每個索引節點內嵌儲存的 PQ 向量數量 (在存取節點時讀取，以減少 IO)</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[0，<em>max_degree］</em></p><p><strong>預設值</strong>：<code translate="no">-1</code></p></td>
     <td><p><code translate="no">inline_pq</code> 的值越高，效能越好，但會增加磁碟空間。</p><p>設定<code translate="no">inline_pq</code>=0 為 AISAQ 的比例模式。</p><p>設定<code translate="no">inline_pq</code>=-1 可自動以 PQ向量填滿索引中未使用的空間，以進一步優化比例模式下的 AISAQ。</p><p>設定<code translate="no">inline_pq</code><em>=max_degree</em>適用於效能模式下的 AISAQ。</p><p><code translate="no">inline_pq</code> 設定值在 0 到<em>max_degree</em>之間，可以調整效能與磁碟空間消耗之間的平衡。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>重新排列 PQ 向量資料結構，以改善資料位置並減少搜尋時的磁碟存取 (在效能模式中忽略)。</p></td>
     <td><p><strong>類型</strong>：布林</p><p><strong>範圍：</strong>[真、假］</p><p><strong>預設值</strong>：<code translate="no">true</code></p></td>
     <td><p>為真時，會減少搜尋期間的 IO，但只會稍微增加記憶體和索引建立時間。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>候選入口點數量，以最佳化搜尋入口點選擇。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[0, 1000]</p><p><strong>預設值</strong>：<code translate="no">100</code></p></td>
     <td><p>高值可從較近的入口點開始搜尋，減少搜尋時間。</p><p>對於較大的區段，請設定較高的值（例如，對於 10M 以上的向量，請使用 1000 的值）。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>控制 PQ 碼（資料點的壓縮表示）相對於未壓縮資料的大小。</p></td>
     <td><p><strong>類型</strong>：浮點數</p><p><strong>範圍</strong>: (0.0, 0.25)</p><p><strong>預設值</strong>：<code translate="no">0.125</code></p></td>
     <td><p>比率越高，搜尋結果越精確，可有效儲存更多原始向量的資訊，但會增加搜尋時的計算複雜度。</p><p>在大多數情況下，我們建議您在此範圍內設定值：(0.0417, 0.25]。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>控制索引中儲存的高精度向量的 PQ 碼大小（用於重新排序），與未壓縮資料的大小相比。</p></td>
     <td><p><strong>類型</strong>：浮點數</p><p><strong>範圍：</strong>[0, 0.25]</p><p><strong>預設值</strong>：<code translate="no">0.25</code></p></td>
     <td><p>預設值為 0.25 時，向量將量化為原始大小的 25%（4 倍壓縮），減少磁碟佔用空間，但對精確度的影響相對較小。</p><p>設定值為 0 時，會在磁碟索引中儲存完整精確度向量，以便重新排序。值越大，召回率越高，但會增加磁碟使用量。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>以 DRAM 為單位的 PQ 向量快取大小 (位元組)。PQ 向量快取記憶體在索引載入時載入，並在搜尋時使用，以減少 IO (在效能模式中忽略)。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[0, 1073741824]</p><p><strong>預設值</strong>：<code translate="no">0</code></p></td>
     <td><p>較大的快取記憶體可改善查詢效能，但會增加 DRAM 使用量。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>控制用於快取頻繁存取的索引節點的 DRAM 容量。</p><p>此快取記憶體在索引載入時載入，並在搜尋時使用，以減少 IO。</p></td>
     <td><p><strong>類型</strong>：浮點數</p><p><strong>範圍：</strong>[0.0, 0.3)</p><p><strong>預設值</strong>：<code translate="no">0</code></p></td>
     <td><p>較高的值會分配更多記憶體用於快取，減少磁碟 IO，但會消耗更多的系統記憶體。較低的值會使用較少的快取記憶體，可能會增加磁碟存取的需求。</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">索引搜尋參數<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>這些參數會影響 AISAQ 執行搜尋的方式。調整這些參數會影響搜尋速度、延遲和資源使用。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>在搜尋作業中，此參數會決定演算法在遍歷圖時所維護的候選池大小。值越大，找到真正最近鄰居的機會越大 (召回率越高)，但也會增加搜尋延遲。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[topk,int32_max]。</p><p><strong>預設值</strong>：<code translate="no">16</code></p></td>
     <td><p>為了在效能與精確度之間取得良好平衡，建議設定此值等於或稍大於您想要擷取的結果數量 (top_k)。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>透過決定讀取索引節點的最大平行磁碟 I/O 請求數目，控制搜尋期間的平行程度。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[1, 16]</p><p><strong>預設值</strong>：<code translate="no">8</code></p></td>
     <td><p>較高的值會增加並行性，這可以在具有強大 CPU 和 SSD 的系統上加快搜尋速度。但是，設定太高可能會導致過度的資源爭用。</p><p>在大多數情況下，我們建議您設定值為 2。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>控制搜尋期間的平行程度，方法是決定讀取相鄰 PQ向量群組的最大平行磁碟 I/O 請求數目 (在效能模式中忽略)。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍</strong>：[1, 4] 必須 &lt;=<em>beamwidth</em></p><p><strong>預設值</strong>：<code translate="no">1</code></p></td>
     <td><p>較高的值會增加平行性，這可以在擁有強大 CPU 和 SSD 的系統上加快搜尋速度。但是，設定太高可能會導致過度的資源爭用，因為每個鄰近的 PQ 向量群可能最多包含 max_degree 向量。</p><p>在大多數情況下，我們建議您設定值為 1。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>每個搜尋線程以 DRAM 為單位的 PQ 讀取快取大小 (位元組)。它會快取包含 PQ 向量的頻繁存取資料頁 (在效能模式中會被忽略，僅在 rearrange 為 true 時適用)。</p><p>PQ 讀取快取記憶體在所有 AISAQ 區段中重複使用。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[0, 33554432]</p><p><strong>預設值</strong>：<code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>較大的快取記憶體可改善查詢效能，但會增加 DRAM 使用量。</p><p>建議值範圍：小區段 (1 M向量) 為 2 MiB，中區段 (50 M向量) 為 5 MiB，大區段 (250 M向量) 為 10 MiB。</p></td>
   </tr>
</table>
