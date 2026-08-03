---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  SPARSE_INVERTED_INDEX 索引是一種由 Milvus
  用於高效儲存與搜尋稀疏向量的索引類型。此索引類型運用反向索引的原理，為稀疏資料建立一套高效能的搜尋結構。
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">SPARSE_INVERTED_INDEX</code> 索引是 Milvus 用於高效儲存和搜尋稀疏向量的索引類型。它會根據稀疏向量中的非零維度建立一個反向結構。您可以使用此索引進行 BM25 全文檢索，以及基於內積的稀疏嵌入檢索。</p>
<p>有關稀疏向量場、度量類型及全文搜尋的更多資訊，請參閱《<a href="/docs/zh-hant/sparse_vector.md">稀疏向量</a>》、《<a href="/docs/zh-hant/metric.md">度量類型</a>》及《<a href="/docs/zh-hant/full-text-search.md">全文搜尋</a>》。</p>
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
    </button></h2><p>若要在 Milvus 中針對稀疏向量欄位建立<code translate="no">SPARSE_INVERTED_INDEX</code> 索引，請使用<code translate="no">add_index()</code> 方法，並指定<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 及索引參數。</p>
<p>若要進行 BM25 全文檢索，請針對由 BM25 函式所產生的稀疏向量場建立索引。將 `<code translate="no">metric_type</code> ` 設定為 `<code translate="no">BM25</code>`。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>對於稀疏嵌入搜尋，請在儲存外部產生之稀疏向量的稀疏向量場上建立索引。將 `<code translate="no">metric_type</code> ` 設定為 `<code translate="no">IP</code>`。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>在上述設定中：</p>
<ul>
<li><p><code translate="no">index_type</code>: 要建立的索引類型。請將此值設定為<code translate="no">SPARSE_INVERTED_INDEX</code> 。</p></li>
<li><p><code translate="no">metric_type</code>: 用於計算稀疏向量之間相似度的度量標準。有效值：</p>
<ul>
<li><p><code translate="no">BM25</code>: 針對全文檢索使用 BM25 相關性評分。</p></li>
<li><p><code translate="no">IP</code> (內積)：使用點積測量稀疏向量的相似度。</p></li>
</ul>
<p>詳細資訊請參閱「<a href="/docs/zh-hant/metric.md">度量類型</a>」與「<a href="/docs/zh-hant/full-text-search.md">全文檢索</a>」。</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: 用於建立和查詢索引的演算法。有效值：</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: 逐份文件 MaxScore 查詢處理。此為<code translate="no">BM25</code> 的預設設定。相關背景請參閱《<a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">查詢評估：策略與最佳化》</a>。</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>：採用「逐份文件 WAND」查詢處理方式。此演算法適用於較小的 topK 值或較短的查詢。相關背景請參閱《<a href="https://dl.acm.org/doi/10.1145/956863.956944">使用兩級檢索流程進行高效查詢評估</a>》。</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: 基本「逐詞」查詢處理。請將此選項用作基準，或當您需要評分機制能動態適應整體資料集統計資料（例如平均文件長度）時使用。</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: 採用區塊層級最高分數元資料的 MaxScore 查詢處理。有關背景資訊，請參閱《<a href="https://dl.acm.org/doi/10.1145/2009916.2010048">使用區塊最大分數索引加速 Top-k 文件檢索</a>》。</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: 採用區塊級最高分元資料的 WAND 查詢處理。相關背景請參閱《<a href="https://dl.acm.org/doi/10.1145/2009916.2010048">使用區塊最高分索引加速 Top-k 文件檢索</a>》。</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: 基於固定文件 ID 視窗的稀疏倒排索引，並採用 SIMD 加速進行搜尋。此為 `<code translate="no">IP</code>` 的預設設定。詳情請參閱<a href="https://arxiv.org/abs/2509.08395">SINDI 論文</a>。</p></li>
</ul>
<p>若未指定<code translate="no">inverted_index_algo</code> ，Milvus 將根據<code translate="no">metric_type</code> 選取預設演算法：<code translate="no">BM25</code> 採用<code translate="no">DAAT_MAXSCORE</code> ，而<code translate="no">IP</code> 則採用<code translate="no">SINDI</code> 。</p>
<p>如需進一步了解<code translate="no">SPARSE_INVERTED_INDEX</code> 索引可用的建置參數，請參閱「<a href="/docs/zh-hant/sparse-inverted-index.md#Index-building-params">索引建置參數</a>」。</p></li>
</ul>
<p>配置完畢索引參數後，您可以直接使用 `<code translate="no">create_index()</code> ` 方法建立索引，或透過 `<code translate="no">create_collection</code> ` 方法傳入索引參數來建立索引。詳細資訊請參閱「<a href="/docs/zh-hant/create-collection.md">建立集合</a>」。</p>
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
<p>對於 BM25 全文搜尋，請使用原始文字作為查詢。Milvus 會透過 BM25 函式將查詢文字轉換為稀疏向量。</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>若要進行稀疏嵌入搜尋，請使用稀疏向量字典作為查詢向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>預設情況下，Milvus 會使用為該索引所配置的搜尋演算法。</p>
<p>若要進一步了解<code translate="no">SPARSE_INVERTED_INDEX</code> 索引可用的搜尋參數，請參閱「<a href="/docs/zh-hant/sparse-inverted-index.md#Index-specific-search-params">索引專用搜尋參數</a>」。</p>
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh-hant/sparse-inverted-index.md#Build-index">建立索引</a>時可配置的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調優建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>用於建立和查詢索引的演算法。它決定索引如何處理查詢。</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>,<code translate="no">"DAAT_WAND"</code>,<code translate="no">"TAAT_NAIVE"</code>,<code translate="no">"BLOCK_MAX_MAXSCORE"</code>,<code translate="no">"BLOCK_MAX_WAND"</code>,<code translate="no">"SINDI"</code></p><p>預設值：對於<code translate="no">BM25</code> 為<code translate="no">"DAAT_MAXSCORE"</code> ；對於<code translate="no">IP</code> 為<code translate="no">"SINDI"</code> 。</p></td>
     <td><p>對於具有高 k 值或包含大量查詢詞彙的 BM25 全文檢索工作負載，請使用<code translate="no">"DAAT_MAXSCORE"</code> 。</p><p>對於 k 值較小或查詢詞彙較少的 BM25 工作負載，請使用<code translate="no">"DAAT_WAND"</code> 。</p><p>請將<code translate="no">"TAAT_NAIVE"</code> 作為基準，或在需要評分動態適應全集統計資料（例如平均文件長度）時使用。</p><p>若要利用區塊層級的最高分數元資料進行查詢修剪，請使用<code translate="no">"BLOCK_MAX_MAXSCORE"</code> 或<code translate="no">"BLOCK_MAX_WAND"</code> 。</p><p>若要搭配 `<code translate="no">IP</code>` 進行稀疏嵌入搜尋，請使用 `<code translate="no">"SINDI"</code> `。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>控制 BM25 計分中的詞頻飽和度。此參數僅在<code translate="no">metric_type</code> 設定為<code translate="no">BM25</code> 時生效。</p></td>
     <td><p>建議範圍：[1.2, 2.0]</p><p>預設值：1.2</p></td>
     <td><p>提高此值可讓詞頻在文件排序中佔有更大權重。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>控制 BM25 計分中文件長度正規化的強度。此參數僅在<code translate="no">metric_type</code> 設定為<code translate="no">BM25</code> 時適用。</p></td>
     <td><p>範圍：[0, 1]</p><p>預設值：0.75</p></td>
     <td><p>使用較高的數值可進行更強的長度正規化；使用較低的數值則可降低文件長度對排名的影響。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">索引專用搜尋參數<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了<a href="/docs/zh-hant/sparse-inverted-index.md#Search-on-index">在該索引上進行搜尋</a>時，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>數值範圍</p></th>
     <th><p>調優建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>搜尋時應忽略的最小值比例，有助於減少雜訊。</p></td>
     <td><p>範圍：[0.0, 1.0) （例如，0.2 會忽略最小值中的 20%）</p></td>
     <td><p>請根據查詢向量的稀疏程度和雜訊水準來調整此參數。</p><p>此參數控制搜尋過程中捨棄低幅度值的比例。增加此數值（例如設定為<code translate="no">0.2</code> ）可降低雜訊，並將搜尋重點放在更重要的成分上，從而可能提升精確度與效率。然而，捨棄更多值也可能因排除潛在相關訊號而降低召回率。請根據您的工作負載，選擇一個能在召回率與精確度之間取得平衡的數值。</p></td>
   </tr>
</table>
