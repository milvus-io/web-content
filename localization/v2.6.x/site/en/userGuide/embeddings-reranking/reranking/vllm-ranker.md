---
id: vllm-ranker.md
title: vLLM Ranker
summary: >-
  The vLLM Ranker leverages the vLLM inference framework to enhance search
  relevance through semantic reranking. It represents an advanced approach to
  search result ordering that goes beyond traditional vector similarity.
beta: Milvus 2.6.x
---
<h1 id="vLLM-Ranker" class="common-anchor-header">vLLM Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#vLLM-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>The vLLM Ranker leverages the <a href="https://docs.vllm.ai/en/latest/index.html">vLLM</a> inference framework to enhance search relevance through semantic reranking. It represents an advanced approach to search result ordering that goes beyond traditional vector similarity.</p>
<p>vLLM Ranker is particularly valuable for applications where precision and context are critical, such as:</p>
<ul>
<li><p>Technical documentation search requiring deep understanding of concepts</p></li>
<li><p>Research databases where semantic relationships outweigh keyword matching</p></li>
<li><p>Customer support systems that need to match user problems with relevant solutions</p></li>
<li><p>E-commerce search that must understand product attributes and user intent</p></li>
</ul>
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
    </button></h2><p>Before implementing vLLM Ranker in Milvus, ensure you have:</p>
<ul>
<li><p>A Milvus collection with a <code translate="no">VARCHAR</code> field containing the text to be reranked</p></li>
<li><p>A running vLLM service with reranking capabilities. For detailed instructions on setting up a vLLM service, refer to the <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">official vLLM documentation</a>. To verify vLLM service availability:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Replace YOUR_VLLM_ENDPOINT_URL with the actual URL (e.g., http://&lt;service-ip&gt;:&lt;port&gt;/v1/rerank)</span>
<span class="hljs-comment"># Replace &#x27;BAAI/bge-reranker-base&#x27; if you deployed a different model</span>

curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;YOUR_VLLM_ENDPOINT_URL&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
  &quot;model&quot;: &quot;BAAI/bge-reranker-base&quot;,
  &quot;query&quot;: &quot;What is the capital of France?&quot;,
  &quot;documents&quot;: [
    &quot;The capital of Brazil is Brasilia.&quot;,
    &quot;The capital of France is Paris.&quot;,
    &quot;Horses and cows are both animals&quot;
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>A successful response should return the documents ranked by relevance scores, similar to the OpenAI rerank API response.</p>
<p>Refer to the <a href="https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html#re-rank-api">vLLM OpenAI Compatible Server documentation</a> for more server arguments and options.</p></li>
</ul>
<h2 id="Create-a-vLLM-ranker-function" class="common-anchor-header">Create a vLLM ranker function<button data-href="#Create-a-vLLM-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>To use vLLM Ranker in your Milvus application, create a Function object that specifies how the reranking should operate. This function will be passed to Milvus search operations to enhance result ranking.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a vLLM Ranker function</span>
vllm_ranker = Function(
    name=<span class="hljs-string">&quot;vllm_semantic_ranker&quot;</span>,    <span class="hljs-comment"># Choose a descriptive name</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Field containing text to rerank</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,        <span class="hljs-comment"># Specifies model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vllm&quot;</span>,         <span class="hljs-comment"># Specifies vLLM service</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://localhost:8080&quot;</span>,  <span class="hljs-comment"># vLLM service address</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">32</span>,              <span class="hljs-comment"># Optional: batch size</span>
        <span class="hljs-string">&quot;truncate_prompt_tokens&quot;</span>: <span class="hljs-number">256</span>,  <span class="hljs-comment"># Optional: Use last 256 tokens</span>
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
                       .name(<span class="hljs-string">&quot;vllm_semantic_ranker&quot;</span>)
                       .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
                       .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;model&quot;</span>)
                       .param(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;vllm&quot;</span>)
                       .param(<span class="hljs-string">&quot;queries&quot;</span>, <span class="hljs-string">&quot;[\&quot;renewable energy developments\&quot;]&quot;</span>)
                       .param(<span class="hljs-string">&quot;endpoint&quot;</span>, <span class="hljs-string">&quot;http://localhost:8080&quot;</span>)
                       .param(<span class="hljs-string">&quot;max_client_batch_size&quot;</span>, <span class="hljs-string">&quot;32&quot;</span>)
                       .param(<span class="hljs-string">&quot;truncate_prompt_tokens&quot;</span>, <span class="hljs-string">&quot;256&quot;</span>)
                       .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="vLLM-ranker-specific-parameters" class="common-anchor-header">vLLM ranker-specific parameters<button data-href="#vLLM-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>The following parameters are specific to the vLLM ranker:</p>
<table>
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
     <td><p>The model service provider to use for reranking.</p></td>
     <td><p><code translate="no">"vllm"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>Yes</p></td>
     <td><p>List of query strings used by the rerank model to calculate relevance scores. The number of query strings must match exactly the number of queries in your search operation (even when using query vectors instead of text), otherwise an error will be reported.</p></td>
     <td><p><em>["search query"]</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">endpoint</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Your vLLM service address.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>Since model services may not process all data at once, this sets the batch size for accessing the model service in multiple requests.</p></td>
     <td><p><code translate="no">32</code> (default)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncate_prompt_tokens</code></p></td>
     <td><p>No</p></td>
     <td><p>If set to an integer <em>k</em>, will use only the last <em>k</em> tokens from the prompt (i.e., left truncation). Defaults to None (i.e., no truncation).</p></td>
     <td><p><code translate="no">256</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>For general parameters shared across all model rankers (e.g., <code translate="no">provider</code>, <code translate="no">queries</code>), refer to <a href="/docs/v2.6.x/model-ranker-overview.md#Create-a-model-ranker">Create a model ranker</a>.</p>
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
    </button></h2><p>To apply vLLM Ranker to a standard vector search:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with vLLM reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[your_query_vector],  <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=vllm_ranker,                         <span class="hljs-comment"># Apply vLLM reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection&quot;</span>)
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
