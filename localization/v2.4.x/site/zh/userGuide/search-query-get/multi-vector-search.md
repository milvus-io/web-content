---
id: multi-vector-search.md
order: 2
summary: 本指南演示如何在 Milvus 中执行混合搜索，并了解结果的重新排序。
title: 混合搜索
---
<h1 id="Hybrid-Search" class="common-anchor-header">混合搜索<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>自 Milvus 2.4 版起，我们引入了多向量支持和混合搜索框架，这意味着用户可以在一个 Collections 中引入多个向量场（最多 10 个）。不同列中的这些向量代表数据的不同方面，源自不同的 Embeddings 模型或经过不同的处理方法。混合搜索的结果使用 Rerankers 策略进行整合，如互易等级融合（RRF）和加权评分。要了解有关 Rerankers 策略的更多信息，请参阅<a href="/docs/zh/v2.4.x/reranking.md">Reranking</a>。</p>
<p>这一功能在综合搜索场景中特别有用，例如根据图片、声音、指纹等各种属性识别向量库中最相似的人。</p>
<p>在本教程中，您将学习如何</p>
<ul>
<li><p>创建多个<code translate="no">AnnSearchRequest</code> 实例，用于不同向量场的相似性搜索；</p></li>
<li><p>配置重排策略，对来自多个<code translate="no">AnnSearchRequest</code> 实例的搜索结果进行组合和重排；</p></li>
<li><p>使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a>方法执行混合搜索。</p></li>
</ul>
<div class="alert note">
<p>本页的代码片段使用<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">PyMilvus ORM 模块</a>与 Milvus 进行交互。使用新的<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDK</a>的代码片段即将发布。</p>
</div>
<h2 id="Preparations" class="common-anchor-header">准备工作<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>在开始混合搜索之前，请确保您有一个包含多个向量字段的 Collections。目前，Milvus 引入的每个 Collection 默认有四个向量字段，通过修改<a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum</a>配置，最多可扩展到十个。</p>
<p>下面是一个示例，说明如何创建一个名为<code translate="no">test_collection</code> 的集合，其中包含两个向量字段<code translate="no">filmVector</code> 和<code translate="no">posterVector</code> ，并在其中插入随机实体。</p>
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
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">步骤 1：创建多个 AnnSearchRequest 实例<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>混合搜索使用<code translate="no">hybrid_search()</code> API 在一次调用中执行多个 ANN 搜索请求。每个<code translate="no">AnnSearchRequest</code> 代表对特定向量场的单个搜索请求。</p>
<p>下面的示例创建了两个<code translate="no">AnnSearchRequest</code> 实例，用于对两个向量场执行单独的相似性搜索。</p>
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
<p>参数：</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>对象</em></p>
<p>代表 ANN 搜索请求的类。每次混合搜索可包含 1 到 1,024 个<code translate="no">ANNSearchRequest</code> 对象。</p></li>
<li><p><code translate="no">data</code> <em>列表</em></p>
<p>要在单个<code translate="no">AnnSearchRequest</code> 中搜索的查询向量。目前，该参数只接受包含单个查询向量的列表，例如<code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code> 。今后，该参数将扩展为接受多个查询向量。</p></li>
<li><p><code translate="no">anns_field</code> <em>（字符串）</em></p>
<p>要在单个<code translate="no">AnnSearchRequest</code> 中使用的向量字段名称。</p></li>
<li><p><code translate="no">param</code> <em>（dict）</em></p>
<p>单个<code translate="no">AnnSearchRequest</code> 的搜索参数字典。这些搜索参数与单向量搜索参数相同。更多信息，请参阅<a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">搜索参数</a>。</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>要包含在单个<code translate="no">ANNSearchRequest</code> 中的搜索结果的最大数量。</p>
<p>该参数只影响单个<code translate="no">ANNSearchRequest</code> 中返回的搜索结果数，并不决定<code translate="no">hybrid_search</code> 调用的最终返回结果。在混合搜索中，最终结果是通过对多个<code translate="no">ANNSearchRequest</code> 实例的结果进行组合和 Rerankers 来决定的。</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">步骤 2：配置 Rerankers 策略<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>创建<code translate="no">AnnSearchRequest</code> 实例后，配置 Rerankers 策略，对结果进行组合和重排。目前有两个选项：<code translate="no">WeightedRanker</code> 和<code translate="no">RRFRanker</code> 。有关重排策略的更多信息，请参阅<a href="/docs/zh/v2.4.x/reranking.md">Rerankers</a>。</p>
<ul>
<li><p>使用加权评分</p>
<p><code translate="no">WeightedRanker</code> 用于以指定权重为每个向量场搜索结果分配重要性。如果您将某些向量场的优先级高于其他向量场，<code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> 可以在合并搜索结果中反映出来。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p>使用<code translate="no">WeightedRanker</code> 时，请注意</p>
<ul>
<li>每个权重值的范围从 0（最不重要）到 1（最重要），影响最终的综合得分。</li>
<li><code translate="no">WeightedRanker</code> 中提供的权重值总数应等于您创建的<code translate="no">AnnSearchRequest</code> 实例数。</li>
</ul></li>
<li><p>使用互惠排名融合（RFF）</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">步骤 3：执行混合搜索<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>设置好<code translate="no">AnnSearchRequest</code> 实例和 Rerankers 策略后，使用<code translate="no">hybrid_search()</code> 方法执行混合搜索。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>参数：</p>
<ul>
<li><p><code translate="no">reqs</code> <em>列表</em></p>
<p>搜索请求列表，其中每个请求都是一个<code translate="no">ANNSearchRequest</code> 对象。每个请求可以对应不同的向量场和不同的搜索参数集。</p></li>
<li><p><code translate="no">rerank</code> <em>对象</em></p>
<p>用于混合搜索的 Rerankers 排序策略。可能的值：<code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> 和<code translate="no">RRFRanker()</code> 。</p>
<p>有关重排策略的更多信息，请参阅<a href="/docs/zh/v2.4.x/reranking.md">Rerankers</a>。</p></li>
<li><p><code translate="no">limit</code> <em>（int）</em></p>
<p>在混合搜索中返回的最终结果的最大数量。</p></li>
</ul>
<p>输出类似于下图：</p>
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
<li><p>通常情况下，每个 Collections 默认最多允许 4 个向量字段。不过，您可以选择调整<code translate="no">proxy.maxVectorFieldNum</code> 配置，以扩展集合中向量字段的最大数量，每个集合的最大限制为 10 个向量字段。有关更多信息，请参阅 "<a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">代理相关配置"</a>。</p></li>
<li><p>集合中部分索引或加载的向量字段将导致错误。</p></li>
<li><p>目前，混合搜索中的每个<code translate="no">AnnSearchRequest</code> 只能携带一个查询向量。</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>在哪些情况下推荐使用混合搜索？</strong></p>
<p>混合搜索非常适合需要高精确度的复杂情况，尤其是当一个实体可以由多个不同向量表示时。这适用于同一数据（如一个句子）通过不同的 Embeddings 模型进行处理的情况，或多模态信息（如个人的图像、指纹和声纹）转换为不同向量格式的情况。通过给这些向量分配权重，它们的综合影响可以极大地丰富召回率，提高搜索结果的有效性。</p></li>
<li><p><strong>加权排序器如何对不同向量场之间的距离进行归一化处理？</strong></p>
<p>加权排序器使用为每个向量场分配的权重对向量场之间的距离进行归一化处理。它根据权重计算每个向量场的重要性，优先考虑权重较高的向量场。建议在 ANN 搜索请求中使用相同的度量类型，以确保一致性。这种方法可以确保被认为更重要的向量对整体排名有更大的影响。</p></li>
<li><p><strong>是否可以使用 Cohere Ranker 或 BGE Ranker 等其他排名器？</strong></p>
<p>目前只支持所提供的排名器。正在计划在未来的更新中加入其他排名器。</p></li>
<li><p><strong>是否可以同时进行多个混合搜索操作？</strong></p>
<p>可以，支持同时执行多个混合搜索操作符。</p></li>
<li><p><strong>能否在多个 AnnSearchRequest 对象中使用相同的向量字段来执行混合搜索？</strong></p>
<p>从技术上讲，可以在多个 AnnSearchRequest 对象中使用相同的向量字段进行混合搜索。混合搜索并不需要多个向量字段。</p></li>
</ul>
