---
id: model-ranker-overview.md
title: 模型排名器概述Compatible with Milvus 2.6.x
summary: >-
  传统的向量搜索纯粹通过数学相似度--向量在高维空间中的匹配程度--来对结果进行排序。这种方法虽然高效，但往往会忽略真正的语义相关性。考虑搜索
  "数据库优化的最佳实践"：您可能会收到向量相似度很高的文档，这些文档经常提到这些术语，但实际上并没有提供可操作的优化策略。
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">模型排名器概述<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>传统的向量搜索纯粹通过数学相似度--向量在高维空间中的匹配程度--对结果进行排序。这种方法虽然高效，但往往会忽略真正的语义相关性。考虑搜索<strong>"数据库优化的最佳实践"：</strong>您可能会收到具有高向量相似性的文档，这些文档经常提到这些术语，但实际上并没有提供可操作的优化策略。</p>
<p>模型排名器通过集成高级语言模型来理解查询和文档之间的语义关系，从而改变了 Milvus 搜索。它不完全依赖向量相似性，而是对内容含义和上下文进行评估，从而提供更智能、更相关的结果。</p>
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
<li><p>模型排名器不能用于分组搜索。</p></li>
<li><p>用于模型重排的字段必须是文本类型 (<code translate="no">VARCHAR</code>)。</p></li>
<li><p>每个模型排名器一次只能使用一个<code translate="no">VARCHAR</code> 字段进行评估。</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">工作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>模型排序器通过一个定义明确的工作流程，将语言模型理解能力整合到 Milvus 搜索流程中：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>模型排序器概述</span> </span></p>
<ol>
<li><p><strong>初始查询</strong>：您的应用程序向 Milvus 发送查询</p></li>
<li><p><strong>向量搜索</strong>：Milvus 执行标准向量搜索以识别候选文档</p></li>
<li><p><strong>候选检索</strong>：系统根据向量相似性识别初始候选文档集</p></li>
<li><p><strong>模型评估</strong>：模型排序器功能处理查询-文档对：</p>
<ul>
<li><p>将原始查询和候选文档发送至外部模型服务</p></li>
<li><p>语言模型评估查询和每个文档之间的语义相关性</p></li>
<li><p>根据语义理解为每个文档打分</p></li>
</ul></li>
<li><p><strong>智能 Rerankers</strong>：根据模型生成的相关性得分对文档重新排序</p></li>
<li><p><strong>增强结果</strong>：您的应用程序将收到根据语义相关性而不仅仅是向量相似性排序的结果</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">根据您的需求选择模型提供商<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持以下模型服务提供商进行重新排序，每个服务提供商都具有不同的特点：</p>
<table>
   <tr>
     <th><p>提供商</p></th>
     <th><p>最适合</p></th>
     <th><p>特点</p></th>
     <th><p>使用案例示例</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>需要深入语义理解和定制的复杂应用</p></td>
     <td><ul>
<li><p>支持各种大型语言模型</p></li>
<li><p>灵活的部署选项</p></li>
<li><p>更高的计算要求</p></li>
<li><p>更大的定制潜力</p></li>
</ul></td>
     <td><p>部署特定领域模型的法律研究平台，可理解法律术语和判例法关系</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>快速实施，有效利用资源</p></td>
     <td><ul>
<li><p>针对文本操作优化的轻量级服务</p></li>
<li><p>部署更简单，资源需求更低</p></li>
<li><p>预先优化的 Rerankers 模型</p></li>
<li><p>基础设施开销最小</p></li>
</ul></td>
     <td><p>内容管理系统需要具有标准要求的高效 Rerankers 功能</p></td>
   </tr>
</table>
<p>有关各模型服务实施的详细信息，请参阅专用文档：</p>
<ul>
<li><p><a href="/docs/zh/v2.6.x/vllm-ranker.md">vLLM 排序器</a></p></li>
<li><p><a href="/docs/zh/v2.6.x/tei-ranker.md">TEI 排序器</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">实施<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>在实施模型排名器之前，请确保您拥有</p>
<ul>
<li><p>具有<code translate="no">VARCHAR</code> 字段的 Milvus Collections，其中包含要重新排名的文本</p></li>
<li><p>可访问 Milvus 实例的正在运行的外部模型服务（vLLM 或 TEI</p></li>
<li><p>Milvus 与所选模型服务之间的适当网络连接</p></li>
</ul>
<p>模型排序器可与标准向量搜索和混合搜索操作无缝集成。实现方法包括创建一个定义 Reranker 配置的 Function 对象，并将其传递给搜索操作。</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">创建模型排序器</h3><p>要实现模型 Rerankers，首先要定义一个具有相应配置的 Function 对象：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot; or &quot;vllm&quot;</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>是否需要？</p></th>
     <th><p>说明</p></th>
     <th><p>值/示例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>是</p></td>
     <td><p>执行搜索时使用的功能标识符。</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>用于重新排序的文本字段名称。必须是<code translate="no">VARCHAR</code> 类型的字段。</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>指定创建的函数类型。 所有模型排名器必须设置为<code translate="no">RERANK</code> 。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>是</p></td>
     <td><p>包含基于模型的 Reranker 功能配置的字典。可用参数（键）因提供程序（<code translate="no">tei</code> 或<code translate="no">vllm</code> ）而异。详情请参考<a href="/docs/zh/v2.6.x/vllm-ranker.md">vLLM Ranker</a>或<a href="/docs/zh/v2.6.x/tei-ranker.md">TEI Ranker</a>。</p></td>
     <td><p>{...}</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>必须设置为<code translate="no">"model"</code> 才能启用模型重排。</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>是</p></td>
     <td><p>用于重新排序的模型服务提供商。</p></td>
     <td><p><code translate="no">"tei"</code> 或<code translate="no">"vllm"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>是</p></td>
     <td><p>重排模型用于计算相关性得分的查询字符串列表。 查询字符串的数量必须与搜索操作中的查询数量完全匹配（即使使用查询向量代替文本），否则将报错。</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>是</p></td>
     <td><p>模型服务的 URL。</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxBatch</code></p></td>
     <td><p>否</p></td>
     <td><p>单个批次中要处理的最大文档数。数值越大，吞吐量越大，但需要的内存也越多。</p></td>
     <td><p><code translate="no">32</code> (默认值）</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">应用于标准向量搜索</h3><p>定义模型排序器后，可以通过将其传递给排序器参数，在搜索操作过程中应用该排序器：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>], <span class="hljs-comment"># Number of queries must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">应用于混合搜索</h3><p>模型排序器也可以应用于结合多个向量场的混合搜索操作：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply model ranker to hybrid search</span>
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Same model ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
