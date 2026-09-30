---
id: model-ranker-overview.md
title: 模型排名器概述Compatible with Milvus 2.6.x
summary: >-
  传统的向量搜索完全根据数学上的相似度——即向量在高维空间中的匹配程度——对结果进行排序。虽然这种方法效率很高，但往往会忽略真正的语义相关性。以搜索“数据库优化的最佳实践”为例：你可能会收到向量相似度很高、且频繁提及这些术语的文档，但这些文档实际上并未提供可操作的优化策略。
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
    </button></h1><p>传统的向量搜索完全基于数学相似性对结果进行排序——即向量在高维空间中的匹配程度。虽然这种方法效率很高，但往往会忽略真正的语义相关性。以<strong>搜索“数据库优化的最佳实践”</strong>为例<strong>：</strong>您可能会收到向量相似度很高、频繁提及这些术语的文档，但这些文档实际上并未提供可操作的优化策略。</p>
<p>Model Ranker 通过集成能够理解查询与文档之间语义关系的先进语言模型，彻底革新了 Milvus 的搜索方式。它不再仅依赖向量相似度，而是通过评估内容含义和上下文，提供更智能、更相关的搜索结果。</p>
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
<li><p>模型排序器无法与分组搜索配合使用。</p></li>
<li><p>用于模型重新排序的字段必须为文本类型（<code translate="no">VARCHAR</code> ）。</p></li>
<li><p>每个模型排名器每次只能使用一个<code translate="no">VARCHAR</code> 字段进行评估。</p></li>
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
    </button></h2><p>模型排序器通过一个明确定义的工作流，将语言模型的理解能力集成到 Milvus 搜索过程中：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" /> 
   <span>模型排名器概述</span>
  
 </span></p>
<ol>
<li><p><strong>初始查询</strong>：您的应用程序向 Milvus 发送查询</p></li>
<li><p><strong>向量搜索</strong>：Milvus 执行标准向量搜索以识别候选文档</p></li>
<li><p><strong>候选文档检索</strong>：系统根据向量相似度确定初始候选文档集</p></li>
<li><p><strong>模型评估</strong>：模型排序器函数处理查询-文档对：</p>
<ul>
<li><p>将原始查询和候选文档发送至外部模型服务</p></li>
<li><p>语言模型评估查询与每篇文档之间的语义相关性</p></li>
<li><p>每份文档根据语义理解获得相关性评分</p></li>
</ul></li>
<li><p><strong>智能重新排序</strong>：根据模型生成的相关性评分对文档进行重新排序</p></li>
<li><p><strong>增强的搜索结果</strong>：您的应用程序将获得按语义相关性排序的结果，而非仅基于向量相似性排序的结果</p></li>
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
    </button></h2><p>Milvus 支持以下用于重新排序的模型服务提供商，各具特色：</p>
<table>
   <tr>
     <th><p>提供商</p></th>
     <th><p>最适合</p></th>
     <th><p>特点</p></th>
     <th><p>示例用例</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>需要深度语义理解和定制化的复杂应用</p></td>
     <td><ul><li><p>支持各种大型语言模型</p></li><li><p>灵活的部署选项</p></li><li><p>更高的计算要求</p></li><li><p>更大的定制潜力</p></li></ul></td>
     <td><p>部署了能够理解法律术语和判例法关系的领域专用模型的法律研究平台</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>快速实施，资源利用率高</p></td>
     <td><ul><li><p>针对文本操作进行优化的轻量级服务</p></li><li><p>部署更简便，资源需求更低</p></li><li><p>预优化重新排序模型</p></li><li><p>基础设施开销极低</p></li></ul></td>
     <td><p>需要高效重新排序功能且符合标准要求的內容管理系统</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>优先考虑可靠性和易于集成的企业级应用</p></td>
     <td><ul><li><p>企业级可靠性和可扩展性</p></li><li><p>无需基础设施维护的托管服务</p></li><li><p>多语言重新排序功能</p></li><li><p>内置速率限制和错误处理</p></li></ul></td>
     <td><p>需要高可用性搜索、稳定API性能及多语言产品目录的电子商务平台</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>具有特定性能和上下文要求的RAG应用</p></td>
     <td><ul><li><p>专门针对重新排序任务训练的模型</p></li><li><p>针对不同文档长度的精细截断控制</p></li><li><p>针对生产环境工作负载优化的推理</p></li><li><p>多种模型变体（rerank-2、rerank-lite 等）</p></li></ul></td>
     <td><p>包含不同文档长度、需要精细调整性能控制和专业语义理解的研究数据库</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>优先考虑成本效益的長文档处理应用</p></td>
     <td><ul><li><p>支持可配置重叠度的先进文档分块技术</p></li><li><p>基于片段的评分（得分最高的片段代表整个文档）</p></li><li><p>支持多种重新排序模型</p></li><li><p>提供标准版和专业版两种模型，性价比高</p></li></ul></td>
     <td><p>技术文档检索系统，用于处理需要智能分段和重叠控制的长篇手册及论文</p></td>
   </tr>
   <tr>
     <td><p>Hugging Face</p></td>
     <td><p>使用托管版 Hugging Face 句子相似度模型的应用程序</p></td>
     <td><ul><li><p>使用托管版<code translate="no">hf-inference</code> 提供商</p></li><li><p>从Hugging Face Hub中选择模型</p></li><li><p>针对每个候选项计算一个句子相似度分数</p></li><li><p>使用 API 密钥进行身份验证</p></li></ul></td>
     <td><p>希望使用 Hugging Face 模型对候选文本进行重新排序，而无需运行独立推理服务的语义搜索应用程序</p></td>
   </tr>
</table>
<p>有关各模型服务实现的详细信息，请参阅相关文档：</p>
<ul>
<li><p><a href="/docs/zh/v2.6.x/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/zh/v2.6.x/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/zh/v2.6.x/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/zh/v2.6.x/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/zh/v2.6.x/siliconflow-ranker.md">SiliconFlow 排名器</a></p></li>
<li><p><a href="/docs/zh/v2.6.x/hugging-face-ranker.md">Hugging Face 排名器</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">实现<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>在实现模型排序器之前，请确保您拥有：</p>
<ul>
<li><p>一个包含<code translate="no">VARCHAR</code> 字段的Milvus Collection，该字段中包含待重新排序的文本</p></li>
<li><p>一个正在运行的外部模型服务，且您的 Milvus 实例可访问该服务</p></li>
<li><p>Milvus 与您选择的模型服务之间具备适当的网络连接</p></li>
</ul>
<p>模型排序器可与标准向量搜索和混合搜索操作无缝集成。实现过程包括创建一个 Function 对象来定义您的重新排序配置，并将该对象传递给搜索操作。</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">创建模型排序器<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>要实现模型重新排序，首先需定义一个带有适当配置的 Function 对象。在此示例中，我们使用 TEI 作为服务提供商：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.ModelRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">ModelRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> ModelRanker.builder()
        .name(<span class="hljs-string">&quot;semantic_ranker&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .provider(<span class="hljs-string">&quot;tei&quot;</span>)
        .queries(Collections.singletonList(<span class="hljs-string">&quot;machine learning for time series&quot;</span>))
        .endpoint(<span class="hljs-string">&quot;http://model-service:8080&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>必填？</p></th>
     <th><p>描述</p></th>
     <th><p>值 / 示例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>是</p></td>
     <td><p>用于执行搜索时函数的标识符。</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>用于重新排序的文本字段名称。</p><p>必须是<code translate="no">VARCHAR</code> 类型的字段。</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>指定正在创建的函数类型。</p><p>对于所有模型排名器，必须设置为“<code translate="no">RERANK</code> ”。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>是</p></td>
     <td><p>一个包含基于模型的重新排序函数配置的字典。可用参数（键）因服务提供商而异。</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>必须设置为<code translate="no">"model"</code> 才能启用模型重新排序。</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>是</p></td>
     <td><p>用于重新排序的模型服务提供商。</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>是</p></td>
     <td><p>重新排序模型用于计算相关性得分的查询字符串列表。</p><p>查询字符串的数量必须与搜索操作中的查询数量完全一致（即使使用查询向量代替文本），否则将报告错误。</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>是</p></td>
     <td><p>模型服务的 URL。</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>否</p></td>
     <td><p>单批次中处理的文档最大数量。数值越大，吞吐量越高，但需要更多的内存。</p></td>
     <td><p><code translate="no">32</code> (默认)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">应用于标准向量搜索<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>定义模型排序器后，您可以在搜索操作中通过将其传递给 ranker 参数来应用该排序器：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Number of query vectors must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(document))
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
