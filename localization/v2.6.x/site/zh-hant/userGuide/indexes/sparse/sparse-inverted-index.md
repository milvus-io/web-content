---
id: sparse-inverted-index.md
title: sparse_inverted_index
summary: >-
  SPARSE_INVERTED_INDEX 索引是 Milvus
  用來有效儲存和搜尋稀疏向量的一種索引類型。此索引類型利用倒轉索引的原理，為稀疏資料建立高效率的搜尋結構。如需詳細資訊，請參閱 INVERTED。
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">sparse_inverted_index<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">SPARSE_INVERTED_INDEX</code> 索引是 Milvus 用來有效儲存和搜尋稀疏向量的一種索引類型。此索引類型利用倒轉索引的原理，為稀疏資料建立高效率的搜尋結構。如需詳細資訊，請參閱<a href="/docs/zh-hant/inverted.md">INVERTED</a>。</p>
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
    </button></h2><p>要在 Milvus 中的稀疏向量場上建立<code translate="no">SPARSE_INVERTED_INDEX</code> 索引，請使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的其他參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引類型。在本範例中，設定值為<code translate="no">SPARSE_INVERTED_INDEX</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用於計算稀疏向量之間相似性的度量。有效值：</p>
<ul>
<li><p><code translate="no">IP</code> (Inner Product)：使用點乘積測量相似性。</p></li>
<li><p><code translate="no">BM25</code>:通常用於全文搜尋，著重於文字相似性。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/metric.md">公制類型</a>與<a href="/docs/zh-hant/full-text-search.md">全文</a>檢索。</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>:用於建立和查詢索引的演算法。有效值：</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (預設）：使用 MaxScore 演算法的最佳化 Document-at-a-Time (DAAT) 查詢處理。MaxScore 可跳過可能影響最小的詞彙和文件，為高<em>k</em>值或包含許多詞彙的查詢提供更好的效能。為了達到這個目的，MaxScore 會根據最大影響分數，將詞彙分為必要和非必要兩組，並將重點放在對 top-k 結果有貢獻的詞彙上。</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>:使用 WAND 演算法優化 DAAT 查詢處理。WAND 利用最大影響分數跳過非競爭性文件，評估較少的命中文件，但每次命中的開銷較高。這使得 WAND 對於<em>k</em>值較小的查詢或較短的查詢更有效率，在這些情況下跳過是較可行的。</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>:Basic Term-at-a-Time (TAAT) 查詢處理。雖然與<code translate="no">DAAT_MAXSCORE</code> 和<code translate="no">DAAT_WAND</code> 相比較慢，但<code translate="no">TAAT_NAIVE</code> 提供了獨特的優勢。DAAT 演算法使用快取的最大影響分數，不論全域收集參數 (avgdl) 如何變更，這些分數都會保持靜態，而<code translate="no">TAAT_NAIVE</code> 則不同，它會動態適應這些變更。</p></li>
</ul>
<p>若要瞭解<code translate="no">SPARSE_INVERTED_INDEX</code> 索引可用的更多建立參數，請參閱<a href="/docs/zh-hant/sparse-inverted-index.md#Index-building-params">索引建立參數</a>。</p></li>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters</span>
search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># Additional optional search parameters</span>
}

<span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">params</code>:在索引上搜尋的其他設定選項。</p>
<ul>
<li><code translate="no">drop_ratio_search</code>:微調搜尋效能，指定在搜尋過程中忽略多少比例的小向量值。例如，使用<code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code> 時，查詢向量中最小的 20% 值將在搜尋過程中被忽略。</li>
</ul>
<p>要瞭解<code translate="no">SPARSE_INVERTED_INDEX</code> 索引可用的更多搜尋參數，請參閱<a href="/docs/zh-hant/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">特定於索引的搜尋參數</a>。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數</h3><p>下表列出了<a href="/docs/zh-hant/sparse-inverted-index.md#Build-index">建立索引</a>時可在<code translate="no">params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>用於建立和查詢索引的演算法。它決定索引如何處理查詢。</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (預設）， 、<code translate="no">"DAAT_WAND"</code> <code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>使用<code translate="no">"DAAT_MAXSCORE"</code> 來處理 k 值高的情況或包含許多詞彙的查詢，可從跳過非競爭性文件中獲益。 
 對於 k 值較小的查詢或較短的查詢，請選擇<code translate="no">"DAAT_WAND"</code> ，以利用更有效率的跳過。</p>
<p>如果需要動態調整以適應集合變化 (例如，avgdl)，請使用<code translate="no">"TAAT_NAIVE"</code> 。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數</h3><p>下表列出<a href="/docs/zh-hant/sparse-inverted-index.md#Search-on-index">在索引上搜尋時</a>，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>搜尋時忽略最小值的比例，有助於減少雜訊。</p></td>
     <td><p>介於 0.0 和 1.0 之間的比例（例如，0.2 會忽略最小 20% 的值）</p></td>
     <td><p>根據查詢向量的稀疏程度和雜訊程度調整此參數。例如，將其設定為 0.2 會有助於在搜尋時專注於較重要的值，從而提高準確度。</p></td>
   </tr>
</table>
