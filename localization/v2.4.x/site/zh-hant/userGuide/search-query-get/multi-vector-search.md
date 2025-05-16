---
id: multi-vector-search.md
order: 2
summary: 本指南示範如何在 Milvus 中執行混合搜尋，並了解結果的重新排序。
title: 混合搜尋
---
<h1 id="Hybrid-Search" class="common-anchor-header">混合搜尋<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>自 Milvus 2.4 起，我們引入了多向量支援和混合搜尋架構，這表示使用者可以將多個向量欄位（最多 10 個）整合到單一集合中。這些向量在不同的欄位代表資料的不同層面，來自不同的嵌入模型或經過不同的處理方法。混合搜尋的結果會使用 Reranking 策略進行整合，例如 Reciprocal Rank Fusion (RRF) 和 Weighted Scoring。若要瞭解有關重新排名策略的更多資訊，請參閱重新<a href="/docs/zh-hant/v2.4.x/reranking.md">排名</a>。</p>
<p>此功能在綜合搜尋的情境中特別有用，例如根據圖片、語音、指紋等各種屬性在向量庫中找出最相似的人。</p>
<p>在本教程中，您將學習如何</p>
<ul>
<li><p>建立多個<code translate="no">AnnSearchRequest</code> 實例，用於不同向量領域的相似性搜尋；</p></li>
<li><p>配置重排策略，以合併來自多個<code translate="no">AnnSearchRequest</code> 實例的搜尋結果，並對其進行重排；</p></li>
<li><p>使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a>方法執行混合搜尋。</p></li>
</ul>
<div class="alert note">
<p>本頁的程式碼片段使用<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">PyMilvus ORM 模組</a>與 Milvus 互動。使用新的<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDK</a>的程式碼片段即將推出。</p>
</div>
<h2 id="Preparations" class="common-anchor-header">準備工作<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>在開始混合搜尋之前，確保你有一個有多向量欄位的集合。目前，Milvus 預設每個集合有四個向量欄位，透過修改<a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum</a>的設定，最多可擴充至十個。</p>
<p>以下是一個例子，說明如何建立一個名為<code translate="no">test_collection</code> 的集合，其中有兩個向量欄位<code translate="no">filmVector</code> 和<code translate="no">posterVector</code> ，並在其中插入隨機實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Connect to Milvus</span>
connections.connect(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-comment"># Replace with your Milvus server IP</span>
    port=<span class="hljs-string">&quot;19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;film_id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;filmVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>), <span class="hljs-comment"># Vector field for film vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;posterVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)] <span class="hljs-comment"># Vector field for poster vectors</span>

schema = CollectionSchema(fields=fields,enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Create collection</span>
collection = Collection(name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)

<span class="hljs-comment"># Create index for each vector field</span>
index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}

collection.create_index(<span class="hljs-string">&quot;filmVector&quot;</span>, index_params)
collection.create_index(<span class="hljs-string">&quot;posterVector&quot;</span>, index_params)

<span class="hljs-comment"># Generate random entities to insert</span>
entities = []

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    <span class="hljs-comment"># generate random values for each field in the schema</span>
    film_id = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>)
    film_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]
    poster_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]

    <span class="hljs-comment"># create a dictionary for each entity</span>
    entity = {
        <span class="hljs-string">&quot;film_id&quot;</span>: film_id,
        <span class="hljs-string">&quot;filmVector&quot;</span>: film_vector,
        <span class="hljs-string">&quot;posterVector&quot;</span>: poster_vector
    }

    <span class="hljs-comment"># add the entity to the list</span>
    entities.append(entity)
    
collection.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">步驟 1：建立多個 AnnSearchRequest Instances<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>混合搜尋使用<code translate="no">hybrid_search()</code> API 在單一呼叫中執行多個 ANN 搜尋請求。每個<code translate="no">AnnSearchRequest</code> 代表在特定向量欄位上的單一搜尋請求。</p>
<p>下面的示例创建了两个<code translate="no">AnnSearchRequest</code> 实例，用于在两个向量场上执行单独的相似性搜索。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Create ANN search request 1 for filmVector</span>
query_filmVector = [[<span class="hljs-number">0.8896863042430693</span>, <span class="hljs-number">0.370613100114602</span>, <span class="hljs-number">0.23779315077113428</span>, <span class="hljs-number">0.38227915951132996</span>, <span class="hljs-number">0.5997064603128835</span>]]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_filmVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;filmVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># Create ANN search request 2 for posterVector</span>
query_posterVector = [[<span class="hljs-number">0.02550758562349764</span>, <span class="hljs-number">0.006085637357292062</span>, <span class="hljs-number">0.5325251250159071</span>, <span class="hljs-number">0.7676432650114147</span>, <span class="hljs-number">0.5521074424751443</span>]]
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_posterVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;posterVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># Store these two requests as a list in `reqs`</span>
reqs = [request_1, request_2]
<button class="copy-code-btn"></button></code></pre>
<p>參數：</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>(物件</em>)</p>
<p>代表 ANN 搜尋請求的類別。每個混合搜尋一次可包含 1 到 1,024 個<code translate="no">ANNSearchRequest</code> 物件。</p></li>
<li><p><code translate="no">data</code> <em>(list</em>)</p>
<p>要在單一<code translate="no">AnnSearchRequest</code> 中搜尋的查詢向量。目前，此參數只接受包含單一查詢向量的清單，例如：<code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code> 。未來，此參數將擴充為接受多個查詢向量。</p></li>
<li><p><code translate="no">anns_field</code> <em>（字串）</em></p>
<p>要在單一<code translate="no">AnnSearchRequest</code> 中使用的向量欄位名稱。</p></li>
<li><p><code translate="no">param</code> <em>(dict</em>)</p>
<p>單一<code translate="no">AnnSearchRequest</code> 的搜尋參數字典。這些搜尋參數與單一向量搜尋的參數相同。如需詳細資訊，請參閱<a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">搜尋參數</a>。</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>要包含在單一<code translate="no">ANNSearchRequest</code> 中的最大搜尋結果數目。</p>
<p>此參數只會影響在單一<code translate="no">ANNSearchRequest</code> 內傳回的搜尋結果數目，並不會決定<code translate="no">hybrid_search</code> 呼叫傳回的最終結果。在混合搜尋中，最終結果是由來自多個<code translate="no">ANNSearchRequest</code> 實例的結果結合並重新排序後決定的。</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">步驟 2：配置重排策略<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>建立<code translate="no">AnnSearchRequest</code> 實體後，設定重新排序策略以合併和重新排序結果。目前有兩個選項：<code translate="no">WeightedRanker</code> 和<code translate="no">RRFRanker</code> 。有關重新排名策略的詳細資訊，請參閱重新<a href="/docs/zh-hant/v2.4.x/reranking.md">排名</a>。</p>
<ul>
<li><p>使用加權評分</p>
<p><code translate="no">WeightedRanker</code> 用指定的權重為每個向量領域搜尋的結果指定重要性。如果您將某些向量領域的優先順序排在其他向量領域之前，<code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> ，就可以在合併的搜尋結果中反映出來。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p>使用<code translate="no">WeightedRanker</code> 時，請注意</p>
<ul>
<li>每個權重值的範圍從 0 (最不重要) 到 1 (最重要)，影響最後的合計分數。</li>
<li><code translate="no">WeightedRanker</code> 中提供的權重值總數應等於您建立的<code translate="no">AnnSearchRequest</code> 實例數目。</li>
</ul></li>
<li><p>使用互惠排名融合 (RFF)</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">步驟 3：執行混合搜尋<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">AnnSearchRequest</code> 實例和重排策略設定完成後，使用<code translate="no">hybrid_search()</code> 方法執行混合搜尋。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>參數：</p>
<ul>
<li><p><code translate="no">reqs</code> <em>(list</em>)</p>
<p>搜尋請求的清單，其中每個請求都是<code translate="no">ANNSearchRequest</code> 物件。每個請求可以對應不同的向量領域和不同的搜尋參數。</p></li>
<li><p><code translate="no">rerank</code> <em>(物件</em>)</p>
<p>混合搜尋要使用的重排策略。可能的值：<code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> 和<code translate="no">RRFRanker()</code> 。</p>
<p>有關 reranking 策略的詳細資訊，請參閱<a href="/docs/zh-hant/v2.4.x/reranking.md">Reranking</a>。</p></li>
<li><p><code translate="no">limit</code> <em>(英特</em>)</p>
<p>混合搜尋中要返回的最終結果的最大數目。</p></li>
</ul>
<p>輸出與以下類似：</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>一般而言，每個集合預設最多容許 4 個向量欄位。但是，您可以選擇調整<code translate="no">proxy.maxVectorFieldNum</code> 設定，以擴大集合中向量欄位的最大數量，每個集合的最大限制為 10 個向量欄位。更多資訊請參閱<a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">Proxy 相關組態</a>。</p></li>
<li><p>集合中部分索引或載入的向量欄位會導致錯誤。</p></li>
<li><p>目前，混合搜尋中的每個<code translate="no">AnnSearchRequest</code> 只能載入一個查詢向量。</p></li>
</ul>
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
    </button></h2><ul>
<li><p><strong>在哪些情況下建議使用混合搜尋？</strong></p>
<p>混合搜尋非常適合需要高準確度的複雜情況，尤其是當一個實體可以由多個不同的向量來表示時。這適用於相同資料 (例如一個句子) 經由不同的嵌入模型處理，或多模態資訊 (例如個人的影像、指紋和聲紋) 轉換成不同向量格式的情況。透過為這些向量指定權重，它們的綜合影響力可以大幅豐富回復率，並改善搜尋結果的有效性。</p></li>
<li><p><strong>加權排序器如何將不同向量領域之間的距離規範化？</strong></p>
<p>加權排序器使用分配給每個欄位的權重，將向量欄位之間的距離規範化。它會根據權重計算每個向量欄位的重要性，優先處理權重較高的向量欄位。建議在 ANN 搜尋請求中使用相同的度量類型，以確保一致性。此方法可確保被視為較重要的向量對整體排名有較大的影響力。</p></li>
<li><p><strong>是否可以使用 Cohere Ranker 或 BGE Ranker 等其他排名器？</strong></p>
<p>目前只支援所提供的排名器。我們正計劃在未來的更新中加入其他排名器。</p></li>
<li><p><strong>是否可以同時執行多個混合搜尋作業？</strong></p>
<p>可以，支援同時執行多個混合搜尋作業。</p></li>
<li><p><strong>我可以在多個 AnnSearchRequest 物件中使用相同的向量欄位來執行混合搜尋嗎？</strong></p>
<p>技術上來說，可以在多個 AnnSearchRequest 物件中使用相同的向量欄位來執行混合搜尋。混合搜尋不一定要有多個向量欄位。</p></li>
</ul>
