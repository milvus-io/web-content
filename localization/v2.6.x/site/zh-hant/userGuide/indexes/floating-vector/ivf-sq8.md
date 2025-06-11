---
id: ivf-sq8.md
title: IVF_SQ8
summary: IVF_SQ8 索引是一種基於量化的索引演算法，專為解決大規模相似性搜尋的挑戰而設計。與窮盡搜尋方法相比，此索引類型能以更小的記憶體佔用量實現更快的搜尋。
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_SQ8</strong>索引是一種<strong>基於量化的</strong>索引演算法，專為解決大規模相似性搜尋的挑戰而設計。與窮盡搜尋方法相比，此索引類型能以更小的記憶體佔用量達到更快的搜尋速度。</p>
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
    </button></h2><p>IVF_SQ8 索引建基於兩個關鍵元件：</p>
<ul>
<li><p><strong>反向檔案 (IVF)：</strong>將資料組織成叢集，使搜尋演算法僅能專注於最相關的向量子集。</p></li>
<li><p><strong>標量量化 (SQ8)：</strong>將向量壓縮成更精簡的形式，大幅降低記憶體使用量，同時維持足夠的精確度以進行快速相似性計算。</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF 就像是在書本中建立索引。您不需要掃描每一頁 (或在我們的情況中，掃描每一個向量)，而是在索引中查找特定的關鍵字（叢集），以快速找到相關的頁面 (向量)。在我們的情況中，向量會被歸類為叢集，演算法會在幾個與查詢向量接近的叢集內進行搜尋。</p>
<p>以下是其運作方式：</p>
<ol>
<li><p><strong>聚類：</strong>使用 k-means 之類的聚類演算法，將向量資料集分為指定數量的叢集。每個叢集都有一個中心點（叢集的代表向量）。</p></li>
<li><p><strong>分派：</strong>每個向量會被分派到其中心點最接近的叢集。</p></li>
<li><p><strong>反向索引：</strong>建立一個索引，將每個群集的中心點對應到分配給該群集的向量清單。</p></li>
<li><p><strong>搜尋：</strong>搜尋最近鄰居時，搜尋演算法會比較您的查詢向量與群集中心點，並選擇最有希望的群集。然後將搜尋範圍縮小到這些選定叢集中的向量。</p></li>
</ol>
<p>要瞭解更多技術細節，請參閱<a href="/docs/zh-hant/ivf-flat.md">IVF_FLAT</a>。</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>標量量化 (Scalar Quantization, SQ) 是一種用更小、更精簡的表示來取代高維向量的值，從而縮小其大小的技術。<strong>SQ8</strong>變體使用 8 位元整數取代典型的 32 位元浮點數來儲存向量的每個維度值。這大大降低了儲存資料所需的記憶體數量。</p>
<p>以下是 SQ8 的運作方式：</p>
<ol>
<li><p><strong>範圍識別：</strong>首先，識別向量內的最小值和最大值。此範圍定義了量化的邊界。</p></li>
<li><p><strong>歸一化：</strong>使用公式將向量值歸一為 0 至 1 的範圍：</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>這可確保所有值都在標準範圍內按比例映射，為壓縮做好準備。</p></li>
<li><p><strong>8 位元壓縮：</strong>將標準化值乘以 255（8 位元整數的最大值），然後將結果四捨五入為最接近的整數。這可有效地將每個值壓縮為 8 位元表示。</p></li>
</ol>
<p>假設您有一個尺寸值為 1.2，最小值為 -1.7，最大值為 2.3。下圖顯示如何應用 SQ8 將 float32 值轉換為 int8 整數。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>Ivf Sq8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">IVF + SQ8</h3><p>IVF_SQ8 索引結合了 IVF 和 SQ8 來有效率地執行相似性搜尋：</p>
<ol>
<li><p><strong>IVF 縮小搜尋範圍</strong>：資料集被分成叢集，當發出查詢時，IVF 首先將查詢與叢集中心點比較，選出最相關的叢集。</p></li>
<li><p><strong>SQ8 加速距離計算</strong>：在選定的叢集內，SQ8 會將向量壓縮為 8 位元整數，以減少記憶體使用量並加速距離計算。</p></li>
</ol>
<p>透過使用 IVF 聚焦搜尋和 SQ8 加速計算，IVF_SQ8 可同時達到快速搜尋時間和記憶體效率。</p>
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
    </button></h2><p>要在 Milvus 的向量場上建立<code translate="no">IVF_SQ8</code> 索引，請使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引類型。在本範例中，設定值為<code translate="no">IVF_SQ8</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用來計算向量間距離的方法。支援的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/metric.md">公制類型</a>。</p></li>
<li><p><code translate="no">params</code>:建立索引的附加設定選項。</p>
<ul>
<li><code translate="no">nlist</code>:在索引建立過程中使用 k-means 演算法建立的叢集數目。</li>
</ul>
<p>要瞭解<code translate="no">IVF_SQ8</code> 索引可用的更多建立參數，請參閱<a href="/docs/zh-hant/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">索引建立參數</a>。</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">params</code>:在索引上搜尋的其他設定選項。</p>
<ul>
<li><code translate="no">nprobe</code>:搜尋候選人的叢集數。</li>
</ul>
<p>要瞭解<code translate="no">IVF_SQ8</code> 索引可用的更多搜尋參數，請參閱<a href="/docs/zh-hant/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">特定</a>於索引的搜尋參數。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數</h3><p>下表列出了<a href="/docs/zh-hant/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">建立索引</a>時可以在<code translate="no">params</code> 中設定的參數。</p>
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
     <td><p>在建立索引時使用 k-means 演算法建立的叢集數目。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1, 65536]</p>
<p><strong>預設值</strong>：<code translate="no">128</code></p></td>
     <td><p>較大的<code translate="no">nlist</code> 值會透過建立更精細的叢集來改善回復率，但會增加索引建立時間。根據資料集大小和可用資源進行最佳化。 在大多數情況下，我們建議您設定此範圍內的值：[32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數</h3><p>下表列出<a href="/docs/zh-hant/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">在索引上搜尋時</a>，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
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
     <td><p><strong>類型</strong>： 整數整數<strong>範圍</strong>：[1、<em>nlist］</em></p>
<p><strong>預設值</strong>：<code translate="no">8</code></p></td>
     <td><p>較高的值允許搜尋更多的叢集，藉由擴大搜尋範圍來改善召回率，但代價是增加查詢延遲。請將<code translate="no">nprobe</code> 與<code translate="no">nlist</code> 成比例設定，以平衡速度與精確度。</p>
<p>在大多數情況下，我們建議您設定此範圍內的值：[1, nlist]。</p></td>
   </tr>
</table>
