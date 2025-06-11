---
id: hnsw-pq.md
title: HNSW_PQ
summary: >-
  HNSW_PQ 利用 Hierarchical Navigable Small World (HNSW) 圖形與 Product Quantization
  (PQ)，創造出先進的向量索引方法，提供可控制的大小與精確度權衡。與 HNSW_SQ
  相比，此索引類型在相同壓縮層級下提供更高的召回率，儘管查詢處理速度較低且索引建置時間較長。
---
<h1 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PQ</strong>利用 Hierarchical Navigable Small World (HNSW) 圖形與 Product Quantization (PQ)，創造出先進的向量索引方法，提供可控制的大小與精確度權衡。與<a href="/docs/zh-hant/hnsw-sq.md">HNSW_SQ</a> 相比，此索引類型在相同的壓縮層級下提供更高的召回率，儘管查詢處理速度較低且索引建置時間較長。</p>
<h2 id="Overview" class="common-anchor-header">概觀<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>HNSW_PQ 結合了兩種索引技術：<strong>HNSW</strong>用於基於圖表的快速導覽，而<strong>PQ</strong>則用於有效率的向量壓縮。</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW 會建構一個多層圖表，其中每個節點對應資料集中的向量。在這個圖形中，節點是根據其相似性連接起來的，因此可以快速遍歷資料空間。層級結構可讓搜尋演算法縮小候選鄰近點的範圍，大幅加速高維空間的搜尋過程。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/hnsw.md">HNSW</a>。</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p>PQ 是一種向量壓縮技術，可將高維向量分解成較小的子向量，然後再進行量化和壓縮。壓縮可大幅降低記憶體需求，並加速距離計算。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/ivf-pq.md#PQ">IVF_PQ</a>。</p>
<h3 id="HNSW-+-PQ" class="common-anchor-header">HNSW + PQ</h3><p>HNSW_PQ 結合了 HNSW 和 PQ 的優點，以實現高效率的近似近鄰搜尋。它使用 PQ 來壓縮資料（從而減少記憶體的使用），然後在這些壓縮向量上建立 HNSW 圖形，以實現快速的候選檢索。在搜尋過程中，演算法可以選擇使用更高精度的資料來精煉候選結果，以提高精確度。以下是流程的運作方式：</p>
<ol>
<li><p><strong>資料壓縮</strong>：PQ 將每個向量分割成多個子向量，並使用中心點的編碼簿對其進行量化，這些編碼簿由<code translate="no">m</code> （子向量數量）和<code translate="no">nbits</code> （每個子向量的位元）等參數控制。</p></li>
<li><p><strong>圖形建構</strong>：壓縮向量之後會用來建立 HNSW 圖形。由於向量是以壓縮形式儲存，因此所產生的圖形通常較小、所需記憶體較少，而且可以更快速地遍歷，大幅加快候選人擷取步驟。</p></li>
<li><p><strong>候選人擷取</strong>：當執行查詢時，演算法會使用 HNSW 圖形中的壓縮資料來有效率地找出候選鄰居。這種以圖表為基礎的查詢方式可大幅減少必須考慮的向量數量，相較於粗暴的搜尋方式，可改善查詢的延遲時間。</p></li>
<li><p><strong>(可選）結果精煉</strong>：初始候選結果可以根據下列參數進行精煉，以獲得更高的精確度：</p>
<ul>
<li><p><code translate="no">refine</code>:控制是否啟動此精煉步驟。當設定為<code translate="no">true</code> 時，系統會使用更高精度或未壓縮的表示重新計算距離。</p></li>
<li><p><code translate="no">refine_type</code>:指定精煉過程中使用的資料精確度等級（例如 SQ6、SQ8、BF16）。更高精度的選擇，例如<code translate="no">FP32</code> ，可以產生更精確的結果，但需要更多的記憶體。這必須比原始壓縮資料集的精確度高出<code translate="no">sq_type</code> 。</p></li>
<li><p><code translate="no">refine_k</code>:作為放大係數。例如，如果您的 top<em>k</em>是 100，而<code translate="no">refine_k</code> 是 2，系統會重新排序前 200 名候選人，並傳回最佳的 100 名，以提高整體精確度。</p></li>
</ul></li>
</ol>
<p>如需參數及有效值的完整清單，請參閱<a href="/docs/zh-hant/hnsw-sq.md#Index-params">索引參數</a>。</p>
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
    </button></h2><p>要在 Milvus 的向量場上建立<code translate="no">HNSW_PQ</code> 索引，請使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引類型。在本範例中，設定值為<code translate="no">HNSW_PQ</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用來計算向量間距離的方法。支援的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/metric.md">公制類型</a>。</p></li>
<li><p><code translate="no">params</code>:建立索引的附加設定選項。詳情請參閱<a href="/docs/zh-hant/hnsw-pq.md#Index-building-params">索引建立參數</a>。</p></li>
</ul>
<p>索引參數配置完成後，您可以直接使用<code translate="no">create_index()</code> 方法或在<code translate="no">create_collection</code> 方法中傳入索引參數來建立索引。如需詳細資訊，請參閱<a href="/docs/zh-hant/create-collection.md">建立集合</a>。</p>
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
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><code translate="no">params</code>:在索引上搜索的附加配置选项。詳情請參閱<a href="/docs/zh-hant/hnsw-pq.md#Index-specific-search-params">特定於索引的搜尋參數</a>。</li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數</h3><p>下表列出了<a href="/docs/zh-hant/hnsw-pq.md#Build-index">建立索引</a>時可以在<code translate="no">params</code> 中設定的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>每個節點在圖表中可擁有的最大連線（或邊緣）數量，包括傳出和傳入的邊緣。 此參數直接影響索引建立和搜尋。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[2, 2048]</p>
<p><strong>預設值</strong>：<code translate="no">30</code> (每個節點最多可有 30 條出站邊和 30 條入站邊)</p></td>
     <td><p>較大的<code translate="no">M</code> 通常會帶來<strong>較高的精確度</strong>，<strong>但會增加記憶體開銷</strong>，<strong>並減慢索引建置和搜尋的</strong>速度。對於高維度的資料集或高召回率非常重要時，請考慮增加<code translate="no">M</code> 。</p>
<p>如果記憶體佔用量和搜尋速度是主要考量，則考慮降低<code translate="no">M</code> 。</p>
<p>在大多數情況下，我們建議您設定此範圍內的值：[5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>在索引建構過程中，考慮連接的候選鄰居數量。 每個新元素都會評估更多的候選鄰居，但實際建立的最大連接數仍受限於<code translate="no">M</code> 。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1，<em>int_max］</em></p>
<p><strong>預設值</strong>：<code translate="no">360</code></p></td>
     <td><p>較高的<code translate="no">efConstruction</code> 通常會產生<strong>更精確的索引</strong>，因為會探索更多的潛在連線。考慮增加<code translate="no">efConstruction</code> 以提高精確度<strong>，</strong>尤其是在索引時間不太重要的情況下。</p>
<p>在資源有限的情況下，可考慮降低<code translate="no">efConstruction</code> ，以加快索引建置速度。</p>
<p>在大多數情況下，我們建議您設定此範圍內的值：[50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>在量化過程中，將每個高維向量分割成的子向量（用於量化）數量。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1, 65536]</p>
<p><strong>預設值</strong>：無</p></td>
     <td><p>較高的<code translate="no">m</code> 值可以提高精確度，但也會增加計算複雜度和記憶體使用量。<code translate="no">m</code> 必須是向量維度<em>(D</em>) 的除數，以確保正確的分解。一般建議的值是<em>m = D/2</em>。</p>
<p>在大多數情況下，我們建議您在這個範圍內設定一個值：[D/8, D]。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>用來以壓縮形式表示每個子向量中心點索引的位元數。每個編碼本將包含 $2^{textit{nbits}}$ 的中心點。例如，如果<code translate="no">nbits</code> 設定為 8，則每個子向量將由 8 位元的 centroid 索引表示。如此一來，該子向量的編碼簿中就有 2^8$ (256) 個可能的中心點。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1, 64]</p>
<p><strong>預設值</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 較高的值允許較大的編碼本，可能會導致原始向量的表示更精確。在大多數情況下，我們建議您設定此範圍內的值：[1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>一個布林標誌，用來控制是否在搜尋過程中應用精煉步驟。精煉包括透過計算查詢向量與候選項之間的精確距離，重新排列初始結果。</p></td>
     <td><p><strong>類型</strong>：<strong>布林範圍</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]</p>
<p><strong>預設值</strong>：<code translate="no">false</code></p></td>
     <td><p>如果高準確度是必要的，而且您可以容忍稍慢的搜尋時間，請設定為<code translate="no">true</code> 。如果速度是優先考量，且可以接受精確度的輕微折衷，請使用<code translate="no">false</code> 。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>決定精煉過程中使用的資料精確度。 此精確度必須高於壓縮向量的精確度（由<code translate="no">m</code> 和<code translate="no">nbits</code> 參數設定）。</p></td>
     <td><p><strong>類型</strong>：字串<strong>範圍</strong>:[<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code>,<code translate="no">FP32</code> ]。</p>
<p><strong>預設值</strong>：無</p></td>
     <td><p>使用<code translate="no">FP32</code> 可在較高記憶體成本下獲得最高精確度，使用<code translate="no">SQ6</code>/<code translate="no">SQ8</code> 則可獲得更好的壓縮效果。<code translate="no">BF16</code> 和<code translate="no">FP16</code> 提供了一個平衡的替代方案。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數</h3><p>下表列出<a href="/docs/zh-hant/hnsw-pq.md#Search-on-index">在索引上搜尋時</a>，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>控制最近鄰檢索時的搜尋範圍。它決定要造訪多少節點，並將其評估為潛在最近鄰居。 
 此參數只會影響搜尋過程，並只適用於圖形的底層。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1、<em>int_max］</em></p>
<p><strong>預設值</strong>:<em>limit</em>(要回傳的 TopK 最近鄰居)</p></td>
     <td><p>較大的<code translate="no">ef</code> 通常會導致<strong>較高的搜尋準確度</strong>，因為會考慮更多的潛在鄰居。當達到高召回率是關鍵，而<strong>搜尋</strong>速度較不重要時，請考慮增加<code translate="no">ef</code> 。</p>
<p>考慮降低<code translate="no">ef</code> 以優先加快搜尋速度，尤其是在可以接受稍微降低精確度的情況下。</p>
<p>在大多數情況下，我們建議您設定此範圍內的值：[K, 10K]。</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>放大係數，用來控制在精細化（重新排序）階段中，相對於要求的前 K 個結果，有多少額外的候選人會被檢驗。</p></td>
     <td><p><strong>類型</strong>：浮動<strong>範圍</strong>：[1,<em>float_max</em>)</p>
<p><strong>預設值</strong>：1</p></td>
     <td><p><code translate="no">refine_k</code> 的值越高，可提高召回率和準確度，但也會增加搜尋時間和資源使用。值為 1 表示精煉過程只考慮初始的前 K 個結果。</p></td>
   </tr>
</table>
