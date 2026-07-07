---
id: dashscope-ranker.md
title: DashScope Ranker
summary: >-
  This topic describes how to configure and use DashScope reranking models, such
  as Qwen rerank models, in Milvus.
beta: Milvus 2.6.x
---
<h1 id="DashScope-Ranker" class="common-anchor-header">DashScope Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#DashScope-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>The DashScope Ranker lets Milvus call Alibaba Cloud DashScope reranking models to reorder search results by semantic relevance.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Before using the DashScope Ranker, ensure that you have:</p>
<ul>
<li><p>A Milvus collection with a <code translate="no">VARCHAR</code> field that contains the text to rerank.</p></li>
<li><p>A valid DashScope API key.</p></li>
<li><p>Access to a DashScope reranking model, such as <code translate="no">gte-rerank-v2</code>.</p></li>
</ul>
<p>For available rerank models and regional endpoints, refer to the <a href="https://www.alibabacloud.com/help/en/model-studio/text-rerank-api">Alibaba Cloud Model Studio Text Rerank API</a>.</p>
<h2 id="Configure-credentials" class="common-anchor-header">Configure credentials<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus must know your DashScope API key before it can request reranking from DashScope. You can configure the API key in <code translate="no">milvus.yaml</code> or through an environment variable.</p>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">Option 1: Configuration file<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Store your API key in <code translate="no">milvus.yaml</code> and point the DashScope rerank provider to the credential label.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">dashscope_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DASHSCOPE_API_KEY&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">rerank:</span>
    <span class="hljs-attr">model:</span>
      <span class="hljs-attr">providers:</span>
        <span class="hljs-attr">ali:</span>
          <span class="hljs-attr">credential:</span> <span class="hljs-string">dashscope_apikey</span>
          <span class="hljs-comment"># url: https://dashscope.aliyuncs.com/api/v1/services/rerank/text-rerank/text-rerank</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Option 2: Environment variable<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>If no matching credential is configured in <code translate="no">milvus.yaml</code>, Milvus can read the DashScope API key from the following environment variable:</p>
<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Required?</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUS_DASHSCOPE_API_KEY</code></p></td>
     <td><p>Yes</p></td>
     <td><p>DashScope API key used by the Milvus service to call Alibaba Cloud DashScope.</p></td>
   </tr>
</table>
<h2 id="Create-a-DashScope-ranker-function" class="common-anchor-header">Create a DashScope ranker function<button data-href="#Create-a-DashScope-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>To use the DashScope Ranker, create a Function object that specifies the DashScope reranking model and query text. Use <code translate="no">provider: &quot;ali&quot;</code> for DashScope reranking.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

dashscope_ranker = Function(
    name=<span class="hljs-string">&quot;dashscope_semantic_ranker&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;ali&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;gte-rerank-v2&quot;</span>,
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;dashscope_apikey&quot;</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="DashScope-ranker-specific-parameters" class="common-anchor-header">DashScope ranker-specific parameters<button data-href="#DashScope-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Required?</p></th>
     <th><p>Description</p></th>
     <th><p>Value / Example</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Must be set to <code translate="no">"model"</code> to enable model reranking.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Yes</p></td>
     <td><p>The model service provider to use for reranking. For DashScope, use <code translate="no">"ali"</code>.</p></td>
     <td><p><code translate="no">"ali"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Yes</p></td>
     <td><p>The DashScope reranking model to use.</p></td>
     <td><p><code translate="no">"gte-rerank-v2"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>Yes</p></td>
     <td><p>List of query strings used by the rerank model to calculate relevance scores. The number of query strings must match the number of queries in the search request.</p></td>
     <td><p><code translate="no">["renewable energy developments"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>Maximum number of documents to send to the model service per request.</p></td>
     <td><p><code translate="no">128</code> (default)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>No</p></td>
     <td><p>The label of a credential defined in the top-level <code translate="no">credential:</code> section of <code translate="no">milvus.yaml</code>.</p></td>
     <td><p><code translate="no">"dashscope_apikey"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>For general parameters shared across all model rankers, such as <code translate="no">provider</code> and <code translate="no">queries</code>, refer to <a href="/docs/model-ranker-overview.md#Create-a-model-ranker">Create a model ranker</a>.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">Apply to standard vector search<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>To apply DashScope Ranker to a standard vector search, pass the ranker Function to <code translate="no">search()</code>.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[your_query_vector],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
    ranker=dashscope_ranker,
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
