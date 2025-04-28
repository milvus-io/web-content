---
id: ivf-pq.md
title: IVF_PQ
summary: >-
  IVF_PQ 索引是一種基於量化的索引演算法，用於高維空間的近似近鄰搜尋。雖然速度不如某些基於圖的方法，但 IVF_PQ
  通常需要較少的記憶體，使其成為大型資料集的實用選擇。
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_PQ</strong>索引是一種<strong>基於量化的</strong>索引演算法，用於高維空間的近似近鄰搜尋。雖然速度比不上某些基於圖的方法，但<strong>IVF_PQ</strong>通常需要較少的記憶體，因此是大型資料集的實用選擇。</p>
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
    </button></h2><p><strong>IVF_PQ</strong>是<strong>Inverted File with Product Quantization</strong> 的縮寫，是一種結合索引與壓縮的混合方法，用於有效率的向量搜尋與檢索。它利用兩個核心元件：<strong>倒轉檔案 (IVF)</strong>與<strong>乘積量化 (PQ</strong> <strong>)</strong>。</p>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF 就像是在書本中建立索引。您不需要掃描每一頁 (或在我們的情況下，掃描每一個向量)，而是在索引中查找特定的關鍵字（群組），以快速找到相關的頁面 (向量)。在我們的情況中，向量會被歸類為叢集，演算法會在幾個與查詢向量接近的叢集內進行搜尋。</p>
<p>以下是其運作方式：</p>
<ol>
<li><p><strong>聚類：</strong>使用 k-means 之類的聚類演算法，將向量資料集分為指定數量的叢集。每個叢集都有一個中心點（叢集的代表向量）。</p></li>
<li><p><strong>分派：</strong>每個向量會被分派到其中心點最接近的叢集。</p></li>
<li><p><strong>反向索引：</strong>建立一個索引，將每個群集的中心點對應到分配給該群集的向量清單。</p></li>
<li><p><strong>搜尋：</strong>搜尋最近鄰居時，搜尋演算法會比較您的查詢向量與群集中心點，並選擇最有希望的群集。然後將搜尋範圍縮小到這些選定叢集中的向量。</p></li>
</ol>
<p>要瞭解更多技術細節，請參閱<a href="/docs/zh-hant/ivf-flat.md">IVF_FLAT</a>。</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p><strong>Product Quantization (PQ)</strong>是一種高維向量的壓縮方法，可大幅降低儲存需求，同時實現快速的相似性搜尋作業。</p>
<p>PQ 過程包含以下關鍵階段：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="Ivf Pq 1" class="doc-image" id="ivf-pq-1" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 1</span> </span></p>
<ol>
<li><p><strong>尺寸分解</strong>：該演算法首先將每個高維向量分解為<code translate="no">m</code> 大小相等的子向量。此分解將原始的 D 維空間轉換為<code translate="no">m</code> 不相交的子空間，其中每個子空間包含<em>D/m</em>維。參數<code translate="no">m</code> 控制分解的粒度，並直接影響壓縮比。</p></li>
<li><p><strong>子空間編碼本製作</strong>：在每個子空間中，演算法應用<a href="https://en.wikipedia.org/wiki/K-means_clustering">k-means 聚類</a>來學習一組代表性向量 (中心點)。這些中心點共同形成該子空間的編碼簿。每個編碼簿中的中心點數量由參數<code translate="no">nbits</code> 決定，其中每個編碼簿包含<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits 中心點。例如，如果</span></span></span></span></span></span></span></span></span> <code translate="no">nbits = 8</code> ，每個編碼本將包含 256 個中心點。每個中心點都會被指派一個獨特的<code translate="no">nbits</code> 位元索引。</p></li>
<li><p><strong>向量</strong> <strong>量化</strong>：對於原始向量中的每個子向量，PQ 會使用特定的度量類型在對應的子空間中找出其最近的中心點。此過程能有效地將每個子向量映射到編碼簿中最接近的代表向量。與其儲存完整的子向量座標，不如只保留匹配中心點的索引。</p></li>
<li><p><strong>壓縮表示</strong>：最終的壓縮表示由<code translate="no">m</code> 索引組成，每個子空間一個，統稱為<strong>PQ 編碼</strong>。此編碼可將儲存需求從<em>D × 32</em>位元 (假設為 32 位元浮點數) 減少到<em>m</em>×<em>nbits</em>位元，在保留近似向量距離能力的同時，達到大幅壓縮的效果。</p></li>
</ol>
<p>有關參數調整與最佳化的詳細資訊，請參閱<a href="/docs/zh-hant/ivf-pq.md#Index-params">Index params</a>。</p>
<div class="alert note">
<p>考慮一個使用 32 位元浮點數的<em>D = 128</em>維向量。在 PQ 參數<em>m = 64</em>(子向量) 和<em>nbits = 8</em>(因此<em>k =</em> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">282^8</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> 8</span></span></span></span></span></span></span></span></span> <em>= 256</em>centroids per subspace) 的情況下，我們可以比較儲存需求：</p>
<ul>
<li><p>原始向量：128 維 × 32 位元 = 4,096 位元</p></li>
<li><p>PQ 壓縮向量：64 個子向量 × 8 位元 = 512 位元</p></li>
</ul>
<p>這表示儲存需求減少了 8 倍。</p>
</div>
<p><strong>使用 PQ 計算距離</strong></p>
<p>當使用查詢向量執行相似性搜尋時，PQ 可透過下列步驟有效率地計算距離：</p>
<ol>
<li><p><strong>查詢預處理</strong></p>
<ul>
<li><p>將查詢向量分解為<code translate="no">m</code> 子向量，以符合原始 PQ 分解結構。</p></li>
<li><p>對於每個查詢子向量及其對應的編碼簿 (包含<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits centroids)，計算並儲存與所有 centroids 的距離。</span></span></span></span></span></span></span></span></span></p></li>
<li><p>這會產生<code translate="no">m</code> 查詢表，其中每個表格包含<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits 距離。</span></span></span></span></span></span></span></span></span></p></li>
</ul></li>
<li><p><strong>距離近似</strong></p>
<p>對於任何以 PQ 代碼表示的資料庫向量，其與查詢向量的近似距離計算如下：</p>
<ul>
<li><p>對於每個<code translate="no">m</code> 子向量，使用儲存的中心點索引從對應的查詢表中擷取預先計算的距離。</p></li>
<li><p>將這些<code translate="no">m</code> 距離相加，得到基於特定度量類型 (例如歐氏距離) 的近似距離。</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="Ivf Pq 2" class="doc-image" id="ivf-pq-2" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 2</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p><strong>IVF_PQ</strong>索引結合了<strong>IVF</strong>和<strong>PQ</strong>的優點來加速搜尋。此過程分兩步進行：</p>
<ol>
<li><p><strong>使用 IVF 進行粗過濾</strong>：IVF 將向量空間分割成群組，縮小搜尋範圍。該演算法不評估整個資料集，而只專注於最接近查詢向量的叢集。</p></li>
<li><p><strong>與 PQ 進行精細比較</strong>：在選定的叢集內，PQ 使用壓縮與量化的向量表示來快速計算近似距離。</p></li>
</ol>
<p><strong>IVF_PQ</strong>索引的效能會受到控制 IVF 和 PQ 演算法的參數的顯著影響。要針對特定的資料集和應用程式達到最佳結果，調整這些參數至關重要。有關這些參數以及如何調整參數的詳細資訊，請參閱<a href="/docs/zh-hant/ivf-pq.md#Index-params">Index params</a>。</p>
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
    </button></h2><p>要在 Milvus 的向量場上建立<code translate="no">IVF_PQ</code> 索引，請使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引類型。在本範例中，設定值為<code translate="no">IVF_PQ</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用來計算向量間距離的方法。支援的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/metric.md">公制類型</a>。</p></li>
<li><p><code translate="no">params</code>:建立索引的附加設定選項。</p>
<ul>
<li><code translate="no">m</code>:將向量分割成的子向量數量。</li>
</ul>
<p>要瞭解<code translate="no">IVF_PQ</code> 索引可用的更多建立參數，請參閱<a href="/docs/zh-hant/ivf-pq.md#Index-building-params">索引建立參數</a>。</p></li>
</ul>
<p>索引參數設定完成後，您可以直接使用<code translate="no">create_index()</code> 方法或在<code translate="no">create_collection</code> 方法中傳入索引參數來建立索引。如需詳細資訊，請參閱<a href="/docs/zh-hant/create-collection.md">建立集合</a>。</p>
<h2 id="Search-on-index" class="common-anchor-header">在索引上搜尋<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>索引建立且實體插入後，您就可以在索引上執行相似性搜尋。</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">params</code>:在索引上搜尋的其他設定選項。</p>
<ul>
<li><code translate="no">nprobe</code>:要搜尋的群集數量。</li>
</ul>
<p>要瞭解<code translate="no">IVF_PQ</code> 索引可用的更多搜尋參數，請參閱<a href="/docs/zh-hant/ivf-pq.md#Index-specific-search-params">特定</a>於索引的搜尋參數。</p></li>
</ul>
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
    </button></h2><p>本節概述用於建立索引和在索引上執行搜尋的參數。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數</h3><p>下表列出了<a href="/docs/zh-hant/ivf-pq.md#Build-index">建立索引</a>時可在<code translate="no">params</code> 中設定的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>在建立索引時使用 k-means 演算法建立的叢集數。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1, 65536]</p><p><strong>預設值</strong>：<code translate="no">128</code></p></td>
     <td><p>較大的<code translate="no">nlist</code> 值會透過建立更精細的叢集來改善回復率，但會增加索引建立時間。根據資料集大小和可用資源進行最佳化。在大多數情況下，我們建議您設定此範圍內的值：[32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>在量化過程中，將每個高維向量分割成的子向量（用於量化）數量。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1, 65536]</p><p><strong>預設值</strong>：無</p></td>
     <td><p>較高的<code translate="no">m</code> 值可以提高精確度，但也會增加計算複雜度和記憶體使用量。<code translate="no">m</code> 必須是向量維度<em>(D</em>) 的除數，以確保正確的分解。一般建議的值是<em>m = D/2</em>。</p><p>在大多數情況下，我們建議您在這個範圍內設定一個值：[D/8, D]。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>用來以壓縮形式表示每個子向量中心點索引的位元數。它直接決定每個編碼簿的大小。每個編碼本將包含 $2^{textit{nbits}}$ 的中心點。例如，如果<code translate="no">nbits</code> 設定為 8，則每個子向量將由 8 位元的 centroid 索引表示。如此一來，該子向量的編碼簿中就有 2^8$ (256) 個可能的中心點。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1, 64]</p><p><strong>預設值</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 較高的值允許較大的編碼簿，可能會導致原始向量的表示更精確。不過，這也意味著要使用更多位元來儲存每個索引，導致較少的壓縮。在大多數情況下，我們建議您設定此範圍內的值：[1, 16].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數</h3><p>下表列出<a href="/docs/zh-hant/ivf-pq.md#Search-on-index">在索引上搜尋時</a>，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>搜尋候選人的叢集數。</p></td>
     <td><p><strong>類型</strong>： 整數整數<strong>範圍</strong>：[1、<em>nlist］</em></p><p><strong>預設值</strong>：<code translate="no">8</code></p></td>
     <td><p>較高的值允許搜尋更多的叢集，藉由擴大搜尋範圍來改善召回率，但代價是增加查詢延遲。請依<code translate="no">nlist</code> 的比例設定<code translate="no">nprobe</code> ，以平衡速度與精確度。</p><p>在大多數情況下，我們建議您設定此範圍內的值：[1, nlist]。</p></td>
   </tr>
</table>
