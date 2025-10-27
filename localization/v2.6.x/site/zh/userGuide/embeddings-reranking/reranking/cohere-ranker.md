---
id: cohere-ranker.md
title: 搜索排名器Compatible with Milvus 2.6.x
summary: >-
  Cohere Ranker 利用 Cohere 强大的 Rerankers 模型，通过语义 Reranking 增强搜索相关性。它提供企业级
  Reranker 功能，具有强大的 API 基础设施和优化的性能，适用于生产环境。
beta: Milvus 2.6.x
---
<h1 id="Cohere-Ranker" class="common-anchor-header">搜索排名器<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Cohere-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Cohere Ranker 利用<a href="https://cohere.com/">Cohere</a>强大的 Rerankers 模型，通过语义 Reranking 增强搜索相关性。它通过强大的 API 基础设施和优化的性能为生产环境提供企业级的 Reranker 功能。</p>
<p>Cohere Ranker 对于需要以下功能的应用特别有价值：</p>
<ul>
<li><p>通过最先进的 Reranker 模型实现高质量的语义理解</p></li>
<li><p>针对生产工作负载的企业级可靠性和可扩展性</p></li>
<li><p>跨不同内容类型的多语言 Reranker 能力</p></li>
<li><p>具有内置速率限制和错误处理功能的一致 API 性能</p></li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中实施 Cohere Ranker 之前，请确保您拥有</p>
<ul>
<li><p>具有<code translate="no">VARCHAR</code> 字段的 Milvus Collections，其中包含要重新排名的文本</p></li>
<li><p>可访问 Rerankers 模型的有效 Cohere API 密钥。在<a href="https://dashboard.cohere.com/">Cohere 平台</a>上注册，以获取 API 证书。您可以</p>
<ul>
<li><p>设置<code translate="no">COHERE_API_KEY</code> 环境变量，或</p></li>
<li><p>在<a href="/docs/zh/cohere-ranker.md#Create-a-Cohere-ranker-function">排名器配置</a>的<code translate="no">credential</code> 中直接指定 API 密钥</p></li>
</ul></li>
</ul>
<h2 id="Create-a-Cohere-ranker-function" class="common-anchor-header">创建 Cohere 排名器函数<button data-href="#Create-a-Cohere-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>要在您的 Milvus 应用程序中使用 Cohere Ranker，请创建一个 Function 对象，指定 Reranker 应如何操作。该函数将传递给 Milvus 搜索操作符，以增强结果排名。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure Cohere Ranker</span>
cohere_ranker = Function(
    name=<span class="hljs-string">&quot;cohere_semantic_ranker&quot;</span>,          <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],         <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,      <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,                <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;cohere&quot;</span>,               <span class="hljs-comment"># Specifies Cohere as the service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;rerank-english-v3.0&quot;</span>, <span class="hljs-comment"># Cohere rerank model to use</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>], <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,       <span class="hljs-comment"># Optional: batch size for model service requests (default: 128)</span>
        <span class="hljs-string">&quot;max_tokens_per_doc&quot;</span>: <span class="hljs-number">4096</span>,         <span class="hljs-comment"># Optional: max tokens per document (default: 4096)</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;your-cohere-api-key&quot; # Optional: authentication credential for Cohere API</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                       .functionType(FunctionType.RERANK)
                       .name(<span class="hljs-string">&quot;cohere_semantic_ranker&quot;</span>)
                       .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
                       .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;model&quot;</span>)
                       .param(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;cohere&quot;</span>)
                       .param(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;rerank-english-v3.0&quot;</span>)
                       .param(<span class="hljs-string">&quot;queries&quot;</span>, <span class="hljs-string">&quot;[\&quot;renewable energy developments\&quot;]&quot;</span>)
                       .param(<span class="hljs-string">&quot;endpoint&quot;</span>, <span class="hljs-string">&quot;http://localhost:8080&quot;</span>)
                       .param(<span class="hljs-string">&quot;max_client_batch_size&quot;</span>, <span class="hljs-string">&quot;128&quot;</span>)
                       .param(<span class="hljs-string">&quot;max_tokens_per_doc&quot;</span>, <span class="hljs-string">&quot;4096&quot;</span>)
                       .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Cohere-ranker-specific-parameters" class="common-anchor-header">Cohere 排序器专用参数<button data-href="#Cohere-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>以下参数是 Cohere 排序器的特定参数：</p>
<table>
   <tr>
     <th><p><strong>参数</strong></p></th>
     <th><p><strong>是否需要？</strong></p></th>
     <th><p><strong>说明</strong></p></th>
     <th><p><strong>值/示例</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>必须设置为<code translate="no">"model"</code> 才能启用模型重排。</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>是</p></td>
     <td><p>用于重排的模型服务提供商。</p></td>
     <td><p><code translate="no">"cohere"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>是</p></td>
     <td><p>从 Cohere 平台支持的模型中选择要使用的 Cohere Rerankers 模型。</p><p>有关可用 Rerankers 模型的列表，请参阅<a href="https://docs.cohere.com/docs/rerank">Cohere 文档</a>。</p></td>
     <td><p><code translate="no">"rerank-english-v3.0"</code>,<code translate="no">"rerank-multilingual-v3.0"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>是</p></td>
     <td><p>Rerankers 模型用于计算相关性得分的查询字符串列表。查询字符串的数量必须与搜索操作中的查询数量完全一致（即使使用查询向量代替文本），否则将报错。</p></td>
     <td><p><em>["搜索查询"]</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>否</p></td>
     <td><p>由于模型服务可能无法一次性处理所有数据，因此此项设置了在多个请求中访问模型服务的批量大小。</p></td>
     <td><p><code translate="no">128</code> (默认值）</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_tokens_per_doc</code></p></td>
     <td><p>无</p></td>
     <td><p>每个文档的最大标记数。长文档将自动截断为指定的标记数。</p></td>
     <td><p><code translate="no">4096</code> （默认值）</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>无</p></td>
     <td><p>访问 Cohere API 服务的身份验证凭据。如果未指定，系统将查找<code translate="no">COHERE_API_KEY</code> 环境变量。</p></td>
     <td><p><em>"your-cohere-api-key</em></p></td>
   </tr>
</table>
<div class="alert note">
<p>有关所有模型排序器共享的一般参数（如<code translate="no">provider</code>,<code translate="no">queries</code> ），请参阅<a href="/docs/zh/model-ranker-overview.md#Create-a-model-ranker">创建模型排序器</a>。</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">应用于标准向量搜索<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>将 Cohere Ranker 应用于标准向量搜索：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with Cohere reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[your_query_vector],  <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=cohere_ranker,                       <span class="hljs-comment"># Apply Cohere reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;AI Research Progress&quot;</span>), <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;What is AI&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-to-hybrid-search" class="common-anchor-header">应用于混合搜索<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Cohere Ranker 还可用于混合检索，将密集检索和稀疏检索方法结合起来：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Configure dense vector search</span>
dense_search = AnnSearchRequest(
    data=[your_query_vector_1], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Configure sparse vector search  </span>
sparse_search = AnnSearchRequest(
    data=[your_query_vector_2], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>, 
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Execute hybrid search with Cohere reranking</span>
hybrid_results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    [dense_search, sparse_search],              <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=cohere_ranker,                      <span class="hljs-comment"># Apply Cohere reranking to combined results</span></span>
    limit=<span class="hljs-number">5</span>,                                   <span class="hljs-comment"># Final number of results</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
        
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)
        .vectors(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(embedding1), <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(embedding2)))
        .limit(<span class="hljs-number">5</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;AI Research Progress&quot;</span>), <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;What is AI&quot;</span>)))
        .limit(<span class="hljs-number">5</span>)
        .build());

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(<span class="hljs-string">&quot;your_collection&quot;</span>)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(<span class="hljs-number">5</span>)
                .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
