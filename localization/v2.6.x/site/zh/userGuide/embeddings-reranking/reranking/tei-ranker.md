---
id: tei-ranker.md
title: TEI 排名器Compatible with Milvus 2.6.x
summary: >-
  TEI Ranker 利用 Hugging Face
  提供的文本嵌入推理（TEI）服务，通过语义重排来提高搜索相关性。它代表了一种超越传统向量相似性的先进搜索结果排序方法。
beta: Milvus 2.6.x
---
<h1 id="TEI-Ranker" class="common-anchor-header">TEI 排名器<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#TEI-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>TEI Ranker 利用 Hugging Face 提供的<a href="/docs/zh/v2.6.x/tei-ranker.md">文本嵌入推理（TEI）</a>服务，通过语义重排来提高搜索相关性。它代表了一种先进的搜索结果排序方法，超越了传统的向量相似性。</p>
<p>与<a href="/docs/zh/v2.6.x/vllm-ranker.md">vLLM Ranker</a> 相比，TEI Ranker 可与 Hugging Face 的生态系统和预训练的 Reranking 模型直接集成，因此非常适合以易于部署和维护为优先考虑事项的应用。</p>
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
    </button></h2><p>在 Milvus 中实施 vLLM Ranker 之前，请确保您拥有</p>
<ul>
<li><p>具有<code translate="no">VARCHAR</code> 字段的 Milvus Collections，其中包含要进行重新排序的文本</p></li>
<li><p>运行中的具有 Reranker 功能的 TEI 服务。有关设置 TEI 服务的详细说明，请参阅<a href="https://huggingface.co/docs/text-embeddings-inference/en/quick_tour">TEI 官方文档</a>。</p></li>
</ul>
<h2 id="Create-a-TEI-ranker-function" class="common-anchor-header">创建 TEI 排序器函数<button data-href="#Create-a-TEI-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>要在你的 Milvus 应用程序中使用 TEI Ranker，请创建一个函数对象，指定重排应该如何操作。该函数将传递给 Milvus 搜索操作，以增强结果排序。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure TEI Ranker</span>
tei_ranker = Function(
    name=<span class="hljs-string">&quot;tei_semantic_ranker&quot;</span>,            <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],        <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,     <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,               <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,                 <span class="hljs-comment"># Specifies TEI as the service provider</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],  <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://localhost:8080&quot;</span>,  <span class="hljs-comment"># Your TEI service URL</span>
        <span class="hljs-string">&quot;maxBatch&quot;</span>: <span class="hljs-number">32</span>,                    <span class="hljs-comment"># Optional: batch size for processing (default: 32)</span>
        <span class="hljs-string">&quot;truncate&quot;</span>: <span class="hljs-literal">True</span>,                <span class="hljs-comment"># Optional: Truncate the inputs that are longer than the maximum supported size</span>
        <span class="hljs-string">&quot;truncation_direction&quot;</span>: <span class="hljs-string">&quot;Right&quot;</span>,    <span class="hljs-comment"># Optional: Direction to truncate the inputs</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="TEI-ranker-specific-parameters" class="common-anchor-header">TEI 排序器特定参数</h3><p>以下参数是 TEI 排序器的特定参数：</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>是否需要？</p></th>
     <th><p>说明</p></th>
     <th><p>值/示例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">truncate</code></p></td>
     <td><p>不需要</p></td>
     <td><p>是否截断超过最大序列长度的输入。如果<code translate="no">False</code> ，过长的输入将导致错误。</p></td>
     <td><p><code translate="no">True</code> 或<code translate="no">False</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation_direction</code></p></td>
     <td><p>否</p></td>
     <td><p>当输入过长时截断的方向：</p>
<ul>
<li><p><code translate="no">"Right"</code> (默认）：  从序列末尾删除标记，直到符合最大支持大小。</p></li>
<li><p><code translate="no">"Left"</code>:从序列的开头开始删除标记。</p></li>
</ul></td>
     <td><p><code translate="no">"Right"</code> 或<code translate="no">"Left"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>有关所有模型排序器共享的一般参数（如<code translate="no">provider</code>,<code translate="no">queries</code> ），请参阅<a href="/docs/zh/v2.6.x/model-ranker-overview.md#Create-a-model-ranker">创建模型排序器</a>。</p>
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
    </button></h2><p>将 TEI Ranker 应用于标准向量搜索：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with vLLM reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],  <span class="hljs-comment"># Search queries</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=tei_ranker,                         <span class="hljs-comment"># Apply tei reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
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
    </button></h2><p>TEI Ranker 还可以与混合搜索一起使用，以结合密集和稀疏检索方法：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Configure dense vector search</span>
dense_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Configure sparse vector search  </span>
sparse_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>, 
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Execute hybrid search with vLLM reranking</span>
hybrid_results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    [dense_search, sparse_search],              <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=tei_ranker,                        <span class="hljs-comment"># Apply tei reranking to combined results</span></span>
    limit=<span class="hljs-number">5</span>,                                   <span class="hljs-comment"># Final number of results</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
