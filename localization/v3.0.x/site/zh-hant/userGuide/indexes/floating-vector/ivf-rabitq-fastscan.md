---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: IVF_RABITQ_FASTSCAN 結合了 IVF、RaBitQ 二進位量化以及 SIMD 批次掃描技術，以提供記憶體效率高且高吞吐量的向量搜尋功能。
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> 結合了 IVF 分區、RaBitQ 二進位量化以及 FastScan 批次處理技術。它為資料庫向量儲存一位元的 RaBitQ 碼，並以 32 個資料庫向量為一組（此組結構適合 SIMD 運算）來處理這些碼。這使其成為高吞吐量、記憶體受限且可接受近似結果的工作負載之理想選擇。</p>
<p>當搜尋需掃描大量候選項且吞吐量為首要目標時，應選擇<code translate="no">IVF_RABITQ_FASTSCAN</code> <a href="/docs/zh-hant/ivf-rabitq.md">而非IVF_RABITQ</a>。 FastScan 的每查詢設定成本會分攤至各壓縮碼區塊中，因此對於大型資料集或長 IVF 清單而言，通常更具效益。若為小型資料集或僅需檢查少量候選項的搜尋，請改用<code translate="no">IVF_RABITQ</code> 。它亦支援可配置的查詢量化、更多精細化類型以及迭代器。</p>
<h2 id="How-it-works" class="common-anchor-header">運作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> 包含以下階段：</p>
<ol>
<li><strong>IVF 分區</strong>：IVF 將向量分組為<code translate="no">nlist</code> 個簇，並搜尋<code translate="no">nprobe</code> 個最接近的簇。</li>
<li><strong>RaBitQ 編碼</strong>：每個向量殘差皆被編碼為每維度一位元的 RaBitQ 碼。</li>
<li><strong>FastScan</strong>：索引模組會將代碼打包，以利進行對快取友善的 SIMD 批次處理。每批次會評估 32 個資料庫向量。</li>
<li><strong>可選精細化</strong>：啟用此功能時，FP32 精細化器會在 Milvus 返回最終結果之前，對候選項進行重新評分。</li>
</ol>
<p>底層的 Faiss 索引為<code translate="no">IndexIVFRaBitQFastScan</code> 。Knowhere 會透過隨機旋轉變換對其進行封裝，並可選擇性地添加 FP32 精細化模組。</p>
<p>FastScan 會在掃描封裝的程式碼區塊之前，執行每筆查詢的設定工作，例如建立並量化與查詢相關的查表。請使用您的資料和搜尋參數，分別對<code translate="no">IVF_RABITQ</code> 和<code translate="no">IVF_RABITQ_FASTSCAN</code> 進行效能測試。</p>
<h2 id="Build-index" class="common-anchor-header">建立索引<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>若要在 Milvus 的向量場上建立<code translate="no">IVF_RABITQ_FASTSCAN</code> 索引，請使用<code translate="no">add_index()</code> 方法，並指定<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 以及索引的其他參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中：</p>
<ul>
<li><p><code translate="no">index_type</code>: 要建立的索引類型。在此範例中，將值設定為 `<code translate="no">IVF_RABITQ_FASTSCAN</code>`。</p></li>
<li><p><code translate="no">metric_type</code>: 用於計算向量之間距離的方法。支援的值包括<code translate="no">COSINE</code> 、<code translate="no">L2</code> 以及<code translate="no">IP</code> 。詳細資訊請參閱「<a href="/docs/zh-hant/metric.md">度量類型</a>」。</p></li>
<li><p><code translate="no">params</code>: 建立索引的額外設定選項。詳細資訊請參閱「<a href="/docs/zh-hant/ivf-rabitq-fastscan.md#Index-building-params">索引建立參數</a>」。</p></li>
</ul>
<p>配置完索引參數後，您可以直接使用<code translate="no">create_index()</code> 方法，或透過<code translate="no">create_collection</code> 方法傳入索引參數來建立索引。詳情請參閱「<a href="/docs/zh-hant/create-collection.md">建立集合</a>」。</p>
<h2 id="Search-on-index" class="common-anchor-header">在索引上進行搜尋<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>建立索引並插入實體後，即可對該索引執行相似度搜尋。</p>
<p>設定 `<code translate="no">nprobe</code> ` 以控制要搜尋的 IVF 叢集數量。若索引是透過精細化功能建立的，請使用 `<code translate="no">refine_k</code> ` 來控制傳遞給 FP32 精細化器的候選叢集。</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中：</p>
<ul>
<li><code translate="no">params</code>：針對索引搜尋的額外設定選項。詳細資訊請參閱《<a href="/docs/zh-hant/ivf-rabitq-fastscan.md#Index-specific-search-params">索引專用搜尋參數</a>》。</li>
</ul>
<div class="alert note">
<p>與 `<code translate="no">IVF_RABITQ</code>` 不同，`<code translate="no">IVF_RABITQ_FASTSCAN</code> ` 不接受 `<code translate="no">rbq_bits_query</code> ` 搜尋參數。FastScan 內部始終使用 8 位元查詢量化，因此請省略 `<code translate="no">rbq_bits_query</code> ` 或將其設定為 `<code translate="no">0</code>`；較大的數值將被拒絕。</p>
</div>
<h2 id="Index-params" class="common-anchor-header">索引參數<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>本節概述用於建立索引及對索引執行搜尋的參數。</p>
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh-hant/ivf-rabitq-fastscan.md#Build-index">建立索引</a>時可配置的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調校建議</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>在建立索引時，使用 k-means 演算法所建立的聚類數。每個聚類由一個聚類中心代表，並儲存一組向量清單。增加此參數值會減少每個聚類中的向量數量，從而產生規模較小且更精準的分區。</p></td>
     <td><p><strong>類型</strong>：整數<br><strong>範圍</strong>：[1, 65536]<br><strong>預設值</strong>：<code translate="no">128</code></p></td>
     <td><p>較大的<code translate="no">nlist</code> 值可透過建立更精細的聚類來提升召回率，但會增加索引建置時間。請根據資料集大小及可用資源進行優化。在大多數情況下，我們建議您將值設定在此範圍內：[32, 4096]。</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>啟用精細化處理並儲存經精細化的資料。<code translate="no">IVF_RABITQ_FASTSCAN</code> 僅支援 FP32 精細化。</p></td>
     <td><p><strong>類型</strong>：布林值<br><strong>範圍</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]<br><strong>預設值</strong>：<code translate="no">false</code></p></td>
     <td><p>若需達到 0.9 以上的召回率，請設定為<code translate="no">true</code> 。啟用精細化可提升準確度，但會增加儲存需求及索引建置時間。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>用於定義在啟用 `<code translate="no">refine</code> ` 時，精細化所採用的資料表示形式。僅當 `<code translate="no">refine</code> ` 設定為 `<code translate="no">true</code>` 時才為必填。</p></td>
     <td><p><strong>類型</strong>：字串<br><strong>範圍</strong>：[<code translate="no">FP32</code>,<code translate="no">FLAT</code>]<br><strong>預設值</strong>：無</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> 僅支援 FP32 精細化，且<code translate="no">FLAT</code> 與<code translate="no">FP32</code> 完全相同。值比對不區分大小寫。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">索引專用的搜尋參數<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了<a href="/docs/zh-hant/ivf-rabitq-fastscan.md#Search-on-index">在索引上進行搜尋</a>時，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調優建議</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>用於搜尋候選項的叢集數量。較高的數值可讓系統搜尋更多叢集，透過擴大搜尋範圍來提升召回率，但代價是會增加查詢延遲。</p></td>
     <td><p><strong>類型</strong>：整數<br><strong>範圍</strong>：[1,<em>nlist</em>]<br><strong>預設值</strong>：<code translate="no">8</code></p></td>
     <td><p>增加此值可提升召回率，但可能會減慢搜尋速度。請將 `<code translate="no">nprobe</code> ` 設定為與 `<code translate="no">nlist</code> ` 成比例的數值，以平衡速度與準確度。在大多數情況下，我們建議您將值設定在此範圍內：[1,<em>nlist</em>]。</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>精細化過程會採用更高品質的量化技術，從透過 IVF_RABITQ_FASTSCAN 選出的、規模為<code translate="no">refine_k</code> 倍的候選集合中，篩選出所需數量的最近鄰。若已停用精細化功能，此參數將無效。</p></td>
     <td><p><strong>類型</strong>：浮點數<br><strong>範圍</strong>：[1,<em>float_max</em>)<br><strong>預設值</strong>：<code translate="no">1</code></p></td>
     <td><p>較高的<code translate="no">refine_k</code> 值會降低每秒查詢次數（QPS），但能提高召回率。建議從<code translate="no">1</code> 開始，並測試<code translate="no">2</code> 、<code translate="no">3</code> 、<code translate="no">4</code> 及<code translate="no">5</code> 等值，以針對您的資料集找出QPS與召回率之間的最佳平衡點。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>設定是否對查詢向量套用額外的標量量化。<strong>此功能不支援<code translate="no">IVF_RABITQ_FASTSCAN</code></strong> ：該索引<strong>在</strong>內部始終使用 8 位元查詢量化。請省略此參數或將其設定為<code translate="no">0</code> ；大於<code translate="no">0</code> 的值將被拒絕。</p></td>
     <td><p><strong>類型</strong>：整數<br><strong>範圍</strong>：[0, 0]<br><strong>預設值</strong>：<code translate="no">0</code></p></td>
     <td><p>請勿設定此參數。若需可配置的查詢量化，請改用<a href="/docs/zh-hant/ivf-rabitq.md">IVF_RABITQ</a>。</p></td>
   </tr>
</table>
<h2 id="Limitations" class="common-anchor-header">限制<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>FastScan 採用固定的 1 位元 RaBitQ 資料庫編碼及 8 位元查詢量化。<code translate="no">rbq_bits_query</code> 必須省略，或設定為<code translate="no">0</code> 。</li>
<li>僅支援 FP32（等同於<code translate="no">FLAT</code> ）的精細化。</li>
<li>不支援迭代器。</li>
<li>此為 CPU 索引，無法在 GPU 上執行。</li>
<li>實際效能取決於 CPU 的 SIMD 支援能力、向量維度、<code translate="no">nlist</code> 、<code translate="no">nprobe</code> 以及資料分佈。在部署至生產環境前，請先使用您的工作負載進行效能測試。</li>
</ul>
<p>關於非 FastScan 版本的 RaBitQ 及其額外的精細化選項，請參閱<a href="/docs/zh-hant/ivf-rabitq.md">IVF_RABITQ</a>。</p>
