---
id: diskann.md
title: DISKANN
summary: >-
  在資料集可能包含數十億甚至數萬億向量的大型場景中，標準的記憶體內索引方法 (例如 HNSW、IVF_FLAT)
  常常會因為記憶體的限制而無法跟上步伐。DISKANN 提供了一種基於磁碟的方法，可以在資料集大小超過可用 RAM
  時保持高搜尋準確性和速度，從而解決這些挑戰。
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>在資料集可能包含數十億甚至數萬億向量的大型場景中，標準的記憶體內索引方法 (例如<a href="/docs/zh-hant/hnsw.md">HNSW</a>、<a href="/docs/zh-hant/ivf-flat.md">IVF_FLAT</a>) 常常會因為記憶體的限制而無法跟上步伐。<strong>DISKANN</strong>提供了一種基於磁碟的方法，可以在資料集大小超過可用 RAM 時保持高搜尋準確性和速度，從而解決這些挑戰。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>DISKANN</strong>結合了高效向量搜尋的兩項關鍵技術：</p>
<ul>
<li><p><strong>Vamana 圖形</strong>-<strong>以磁碟為基礎</strong>、<strong>以圖形為</strong> <strong>基</strong>礎的索引，可連結資料點（或向量）以在搜尋過程中進行有效率的導航。</p></li>
<li><p><strong>Product Quantization (PQ)</strong>- 縮小向量大小的<strong>記憶體內</strong>壓縮方法，可快速計算向量間的近似距離。</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">索引建構</h3><h4 id="Vamana-graph" class="common-anchor-header">Vamana 圖形</h4><p>Vamana 圖是 DISKANN 基於磁碟策略的核心。它可以處理非常大的資料集，因為它不需要在建立期間或之後完全駐留在記憶體中。</p>
<p>下圖顯示 Vamana 圖是如何建構的。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>Diskann</span> </span></p>
<ol>
<li><p><strong>初始隨機連接：</strong>每個資料點 (向量) 在圖表中表示為一個節點。這些節點最初會隨機連接，形成密集的網路。通常，一個節點一開始會有約 500 條邊（或連結），以獲得廣泛的連線。</p></li>
<li><p><strong>精煉以提高效率：</strong>初始隨機圖會經過優化程序，使其更有效率地進行搜尋。這包括兩個關鍵步驟：</p>
<ul>
<li><p><strong>修剪多餘的邊緣：</strong>演算法會根據節點間的距離捨棄不必要的連線。此步驟會優先處理品質較高的邊緣。</p>
<p><code translate="no">max_degree</code> 參數限制每個節點的最大邊數。<code translate="no">max_degree</code> 越高，圖形就越密集，有可能找到更多相關的鄰居 (召回率更高)，但也會增加記憶體使用量和搜尋時間。</p></li>
<li><p><strong>增加策略性捷徑：</strong>Vamana 引入了長距離邊緣，連接向量空間中相距較遠的資料點。這些捷徑可讓搜尋快速跳過圖表，繞過中間節點，大幅加快導航速度。</p>
<p><code translate="no">search_list_size</code> 參數決定圖形精煉過程的寬度。較高的<code translate="no">search_list_size</code> 會擴大建構過程中對鄰居的搜尋，並可提高最終精確度，但會增加索引建構時間。</p></li>
</ul></li>
</ol>
<p>要瞭解關於參數調整的更多資訊，請參閱<a href="/docs/zh-hant/diskann.md#DISKANN-params">DISKANN params</a>。</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANN 使用<strong>PQ</strong>將高維向量壓縮成較小的表示<strong>(PQ 代碼</strong>)，並儲存在記憶體中，以便快速計算近似距離。</p>
<p><code translate="no">pq_code_budget_gb_ratio</code> 參數管理專門用於儲存這些 PQ 代碼的記憶體佔用空間。它表示向量的總大小（以千兆位元組為單位）與分配用於儲存 PQ 代碼的空間之間的比率。您可以使用以下公式計算實際的 PQ 代碼預算（以千兆位元組為單位）：</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>其中</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> 是向量的總大小（以 GB 為單位）。</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> 是使用者定義的比率，代表保留給 PQ 代碼的總資料大小的部分。此參數允許在搜尋準確度和記憶體資源之間進行權衡。有關參數調整的詳細資訊，請參閱<a href="/docs/zh-hant/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configs</a>。</p></li>
</ul>
<p>有關基本 PQ 方法的技術細節，請參閱<a href="/docs/zh-hant/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ</a>。</p>
<h3 id="Search-process" class="common-anchor-header">搜尋過程</h3><p>一旦建立索引（磁碟上的 Vamana 圖形和記憶體中的 PQ 代碼），DISKANN 就會執行 ANN 搜尋，如下所示：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>Diskann 2</span> </span></p>
<ol>
<li><p><strong>查詢和入口點：</strong>提供查詢向量以找出其最近的鄰居。DISKANN 從 Vamana 圖形中選定的入口點開始，通常是資料集的全局中心點附近的節點。全局中心點代表所有向量的平均值，這有助於最小化圖形的遍歷距離，從而找到所需的鄰居。</p></li>
<li><p><strong>鄰居探索：</strong>演算法會從目前節點的邊緣收集潛在的候選鄰居 (圖中紅色圓圈)，利用記憶體中的 PQ 代碼來近似這些候選鄰居與查詢向量之間的距離。這些潛在的候選鄰居是透過 Vamana 圖形中的邊緣直接連接到所選入口點的節點。</p></li>
<li><p><strong>選擇節點進行精確距離計算：</strong>從近似結果中，選出最有希望的鄰居 (圖中綠色圓圈) 子集，使用其原始、未壓縮的向量進行精確距離評估。這需要從磁碟讀取資料，相當耗時。DISKANN 使用兩個參數來控制精確度和速度之間的微妙平衡：</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>:一個控制搜尋廣度的比率，它決定了有多少候選鄰居會被選出來並行探索它們的鄰居。<code translate="no">beam_width_ratio</code> 越大，探索的範圍就越廣，可能會帶來更高的精確度，但也會增加計算成本和磁碟 I/O。波束寬度或選取的節點數目，是使用公式決定的：<code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>:分配用於快取頻繁存取的磁碟資料的記憶體比例。這種快取有助於最小化磁碟 I/O，使重複搜尋更快，因為資料已經在記憶體中。</p></li>
</ul>
<p>要瞭解關於參數調整的更多資訊，請參閱<a href="/docs/zh-hant/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configs</a>。</p></li>
<li><p><strong>迭代探索：</strong>搜尋會反覆精煉候選集，重複執行近似評估 (使用 PQ) 之後的精確檢查 (使用磁碟中的原始向量)，直到找到足夠數量的鄰居。</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">在 Milvus 中啟用 DISKANN<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>在預設情況下，Milvus 會停用<strong>DISKANN</strong>，以優先處理適合 RAM 的資料集的記憶體索引速度。但是，如果您正在處理大量資料集，或想要利用<strong>DISKANN</strong> 的可擴展性和 SSD 最佳化，您可以輕鬆啟用它。</p>
<p>以下是如何在 Milvus 啟用 DISKANN：</p>
<ol>
<li><p><strong>更新 Milvus 設定檔</strong></p>
<ol>
<li><p>找到您的 Milvus 配置文件<strong>。</strong>(有關尋找此檔案的詳細資訊，請參閱 Milvus 有關組態的說明文件）。</p></li>
<li><p>找到<code translate="no">queryNode.enableDisk</code> 參數，並將其值設為<code translate="no">true</code> ：</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>優化 DISKANN 儲存空間</strong></p></li>
</ol>
<p>為確保 DISKANN 的最佳效能，建議將 Milvus 資料儲存於快速的 NVMe SSD。以下是 Milvus 單機和集群部署的方法：</p>
<ul>
<li><p><strong>Milvus 單機版</strong></p>
<ul>
<li><p>將 Milvus 資料目錄掛載到 Milvus 容器內的 NVMe SSD。您可以在<code translate="no">docker-compose.yml</code> 檔案或使用其他容器管理工具執行此動作。</p></li>
<li><p>例如，如果您的 NVMe SSD 掛載在<code translate="no">/mnt/nvme</code> ，您可以像這樣更新<code translate="no">docker-compose.yml</code> 的<code translate="no">volumes</code>區段：</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Milvus 群集</strong></p>
<ul>
<li><p>在 QueryNode 和 IndexNode 容器中，將 Milvus 資料目錄掛載到 NVMe SSD。您可以透過容器協調設定來實現這一目標。</p></li>
<li><p>透過在兩種節點類型中將資料掛載到 NVMe SSD 上，您可以確保搜尋和索引作業的快速讀寫速度。</p></li>
</ul></li>
</ul>
<p>完成這些變更後，請重新啟動您的 Milvus 實例，讓設定生效。現在，Milvus 將利用 DISKANN 的功能來處理大型資料集，提供有效率且可擴充的向量搜尋。</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">設定 DISKANN<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>DISKANN 相關參數只能透過 Milvus 配置檔 (<code translate="no">milvus.yaml</code>) 設定：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">DiskIndex:</span>
    <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>  <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
    <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>  <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">PQCodeBudgetGBRatio:</span> <span class="hljs-number">0.125</span>  <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
    <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
    <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關參數說明的詳細資訊，請參閱<a href="/docs/zh-hant/diskann.md#DISKANN-params">DISKANN params</a>。</p>
<h2 id="DISKANN-params" class="common-anchor-header">DISKANN 參數<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>微調 DISKANN 的參數可讓您根據特定資料集和搜尋工作負載調整其行為，在速度、準確性和記憶體使用量之間取得適當的平衡。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數</h3><p>這些參數會影響 DISKANN 索引的建構方式。調整這些參數會影響索引大小、建立時間和搜尋品質。</p>
<div class="alert note">
<p>以下清單中的所有索引建立參數，只能透過您的 Milvus 配置檔 (<code translate="no">milvus.yaml</code>) 來設定。</p>
</div>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p>邊</p></td>
     <td><p><code translate="no">MaxDegree</code></p></td>
     <td><p>控制每個資料點在 Vamana 圖形中的最大連線（邊）數。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1, 512]</p>
<p><strong>預設值</strong>：<code translate="no">56</code></p></td>
     <td><p>較高的值會建立較密集的圖形，可能會增加召回率（找到更多相關結果），但也會增加記憶體使用量和建立時間。 
 在大多數情況下，我們建議您設定此範圍內的值：[10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">SearchListSize</code></p></td>
     <td><p>在索引建構期間，此參數會定義為每個節點搜尋最近鄰居時所使用的候選池大小。對於新增到圖表中的每個節點，演算法會維護一個<code translate="no">search_list_size</code> 最佳候選人清單。當這份清單無法再改善時，鄰居搜尋就會停止。從這個最終的候選者池中，選出最頂端的<code translate="no">max_degree</code> 節點來形成最終的邊緣。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1,<em>int_max</em>]。</p>
<p><strong>預設值</strong>：<code translate="no">100</code></p></td>
     <td><p>較大的<code translate="no">search_list_size</code> 會增加為每個節點找到真正最近鄰居的可能性，這可能會產生品質較高的圖形和較好的搜尋效能 (回復率)。不過，這也是以大幅延長索引建立時間為代價。它應該永遠設定為大於或等於<code translate="no">max_degree</code> 的值。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">SearchCacheBudgetGBRatio</code></p></td>
     <td><p>控制在索引建立期間，為快取圖表中經常存取的部分所分配的記憶體數量。</p></td>
     <td><p><strong>類型</strong>：浮動<strong>範圍</strong>：[0.0, 0.3)</p>
<p><strong>預設值</strong>：<code translate="no">0.10</code></p></td>
     <td><p>較高的值會分配更多記憶體用於快取，大幅減少磁碟 I/O，但會消耗更多的系統記憶體。在大多數情況下，我們建議您設定此範圍內的值：[0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">PQCodeBudgetGBRatio</code></p></td>
     <td><p>控制 PQ 代碼（資料點的壓縮表示）相對於未壓縮資料的大小。</p></td>
     <td><p><strong>類型</strong>：浮點<strong>範圍</strong>：(0.0, 0.25)</p>
<p><strong>預設值</strong>：<code translate="no">0.125</code></p></td>
     <td><p>較高的比率會為 PQ 碼分配較大比例的記憶體，有效地儲存原始向量的更多資訊，從而獲得更精確的搜尋結果。較低的比率會減少記憶體使用量，但可能會犧牲精確度，因為較小的 PQ 代碼會保留較少的資訊。此方法適用於需要考慮記憶體限制的情況，有可能使大型資料集的索引成為可能。</p>
<p>在大多數情況下，我們建議您在此範圍內設定值：(0.0625, 0.25] 。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數</h3><p>這些參數會影響 DISKANN 執行搜尋的方式。調整它們會影響搜尋速度、延遲和資源使用。</p>
<div class="alert note">
<p>下面清單中的<code translate="no">BeamWidthRatio</code> 只能透過您的 Milvus 配置檔 (<code translate="no">milvus.yaml</code>) 來設定。</p>
<p>以下清單中的<code translate="no">search_list</code> 只能在 SDK 的搜尋參數中設定。</p>
</div>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">BeamWidthRatio</code></p></td>
     <td><p>透過決定相對於可用 CPU 核心數的最大平行磁碟 I/O 請求數，控制搜尋期間的平行程度。</p></td>
     <td><p><strong>類型</strong>：浮動<strong>範圍</strong>：[1，max(128 / CPU 數目，16)</p>
<p><strong>預設值</strong>：<code translate="no">4.0</code></p></td>
     <td><p>較高的值會增加並行性，在擁有強大 CPU 和 SSD 的系統上，可以加快搜尋速度。不過，設定太高可能會導致過度的資源爭用。 在大多數情況下，我們建議您在此範圍內設定值：[1.0, 4.0].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>在搜尋作業期間，此參數會決定演算法在遍歷圖時所維護的候選池大小。較大的值會增加找到真正近鄰的機會 (較高的召回率)，但也會增加搜尋延遲。</p></td>
     <td><p><strong>類型</strong>：整<strong>數</strong>整數<strong>範圍</strong>：[1、<em>int_max］</em></p>
<p><strong>預設值</strong>：<code translate="no">100</code></p></td>
     <td><p>為了在效能與精確度之間取得良好的平衡，建議將此值設定為等於或稍大於您想要擷取的結果數量 (top_k)。</p></td>
   </tr>
</table>
