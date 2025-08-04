---
id: scann.md
title: SCANN
summary: >-
  Milvus 中的 SCANN 索引由 Google 的 ScaNN
  函式庫提供技術支援，旨在解決向量相似性搜尋的縮放挑戰，在速度與精確度之間取得平衡，即使在傳統上會對大多數搜尋演算法構成挑戰的大型資料集上也是如此。
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 中的<code translate="no">SCANN</code> 索引由 Google 的<a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a>函式庫支援，專為解決向量相似性搜尋的擴充挑戰而設計，在速度與精確度之間取得平衡，即使在傳統上會對大多數搜尋演算法構成挑戰的大型資料集上也是如此。</p>
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
    </button></h2><p>ScaNN 旨在解決向量搜尋的最大挑戰之一：即使資料集越來越大、越來越複雜，仍能在高維空間中有效率地找到最相關的向量。其架構將向量搜尋過程分為不同的階段：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>掃描</span> </span></p>
<ol>
<li><p><strong>分割</strong>：將資料集分割成群組。這種方法只會集中在相關的資料子集，而不會掃描整個資料集，因此可以縮小搜尋空間，節省時間和處理資源。ScaNN 通常使用聚類演算法 (例如<a href="https://zilliz.com/blog/k-means-clustering">k-means</a>) 來識別叢集，這可讓它更有效率地執行相似性搜尋。</p></li>
<li><p><strong>量化</strong>：ScaNN 在分割後會應用一種稱為<a href="https://arxiv.org/abs/1908.10396">異向向量量化</a>的量化程序。傳統的量化著重於最小化原始向量與壓縮向量之間的整體距離，這對於<a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">最大內乘積搜尋 (Maximum Inner Product Search, MIPS)</a> 等任務並不理想，因為在這些任務中，相似性是由向量的內乘積而非直接距離決定。各向異性量化會優先保留向量之間的平行分量，或對計算精確內乘最重要的部分。此方法可讓 ScaNN 謹慎地將壓縮向量與查詢對齊，以維持高 MIPS 精確度，從而實現更快速、更精確的類似性搜尋。</p></li>
<li><p><strong>重新排序</strong>：重新排序階段是最後一步，ScaNN 在此階段會微調分割與量化階段的搜尋結果。重新排序會將精確的內積計算應用於頂部的候選向量，確保最終結果高度精確。重新排序在高速推薦引擎或圖片搜尋應用中至關重要，在這些應用中，最初的篩選和聚類可作為粗略的層次，而最後的階段則可確保只向使用者傳回最相關的結果。</p></li>
</ol>
<p><code translate="no">SCANN</code> 的效能由兩個關鍵參數控制，讓您可以微調速度與精確度之間的平衡：</p>
<ul>
<li><p><code translate="no">with_raw_data</code>:控制原始向量資料是否與量化表示同時儲存。啟用此參數可提高重新排序時的精確度，但會增加儲存需求。</p></li>
<li><p><code translate="no">reorder_k</code>:決定在最後重新排序階段精煉多少候選人。較高的值會提高精確度，但會增加搜尋延遲。</p></li>
</ul>
<p>如需針對您的特定使用個案最佳化這些參數的詳細指引，請參閱<a href="/docs/zh-hant/scann.md#Index-params">索引參數</a>。</p>
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
    </button></h2><p>要在 Milvus 的向量場上建立<code translate="no">SCANN</code> 索引，請使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的其他參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引類型。在本範例中，設定值為<code translate="no">SCANN</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用來計算向量間距離的方法。支援的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/metric.md">公制類型</a>。</p></li>
<li><p><code translate="no">params</code>:建立索引的附加設定選項。</p>
<ul>
<li><code translate="no">with_raw_data</code>:是否將原始向量資料與量化表示同時儲存。</li>
</ul>
<p>要瞭解<code translate="no">SCANN</code> 索引可用的更多建立參數，請參閱<a href="/docs/zh-hant/scann.md#Index-building-params">索引建立參數</a>。</p></li>
</ul>
<p>索引參數設定完成後，您可以直接使用<code translate="no">create_index()</code> 方法或在<code translate="no">create_collection</code> 方法中傳入索引參數，以建立索引。如需詳細資訊，請參閱<a href="/docs/zh-hant/create-collection.md">建立集合</a>。</p>
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
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
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
<li><code translate="no">reorder_k</code>:在重新排序階段要精煉的候選數。</li>
</ul>
<p>要瞭解<code translate="no">SCANN</code> 索引可用的更多搜尋參數，請參閱<a href="/docs/zh-hant/scann.md#Index-specific-search-params">特定</a>於索引的搜尋參數。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數</h3><p>下表列出了<a href="/docs/zh-hant/scann.md#Build-index">建立索引</a>時可在<code translate="no">params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>是否在量化表示的同時儲存原始向量資料。啟用時，可使用原始向量而非量化近似值，在重新排序階段進行更精確的相似度計算。</p></td>
     <td><p><strong>類型</strong>：<strong>布林範圍</strong>：<code translate="no">true</code>,<code translate="no">false</code></p>
<p><strong>預設值</strong>：<code translate="no">true</code></p></td>
     <td><p>設定為<code translate="no">true</code> ，以獲得<strong>更高的搜尋準確度</strong>，且儲存空間並非主要考量。原始向量資料可在重新排序時進行更精確的相似度計算。 設定為<code translate="no">false</code> 可<strong>減少儲存開銷</strong>和記憶體使用量，特別是對於大型資料集。不過，這可能會導致搜尋準確度稍微降低，因為重新排序階段會使用量化向量。</p>
<p><strong>建議</strong>使用：對於精確度要求極高的生產應用程式，請使用<code translate="no">true</code> 。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數</h3><p>下表列出<a href="/docs/zh-hant/scann.md#Search-on-index">在索引上搜尋時</a>，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>控制在重新排序階段精煉的候選向量數量。此參數決定使用更精確的相似度計算，重新評估初始分割和量化階段的頂尖候選向量數量。</p></td>
     <td><p><strong>類型</strong>： 整數整數<strong>範圍</strong>：[1、<em>int_max］</em></p>
<p><strong>預設值</strong>：無</p></td>
     <td><p>較大的<code translate="no">reorder_k</code> 通常會帶來<strong>較高的搜尋準確度</strong>，因為在最後的精煉階段會考慮更多的候選人，但這也會因為額外的計算而增加<strong>搜尋時間</strong>。但這也會因為額外的計算而<strong>增加搜尋時間</strong>。當達到高召回率是關鍵，而搜尋速度不是那麼重要時，請考慮增加<code translate="no">reorder_k</code> 。一個好的起點是 2-5 倍您所期望的<code translate="no">limit</code> (返回的 TopK 結果)。</p>
<p>考慮降低<code translate="no">reorder_k</code> 以優先加快搜尋速度，尤其是在可以接受精確度稍微降低的情況下。</p>
<p>在大多數情況下，我們建議您設定此範圍內的值：[<em>limit</em>,<em>limit</em>* 5]。</p></td>
   </tr>
</table>
