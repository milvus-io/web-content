---
id: embedding-function-overview.md
title: Embedding Function Overview
summary: >-
  The Function module in Milvus allows you to transform raw text data into
  vector embeddings by automatically calling external embedding service
  providers (like OpenAI, AWS Bedrock, Google Vertex AI, etc.). With the
  Function module, you no longer need to manually interface with embedding
  APIs—Milvus handles the entire process of sending requests to providers,
  receiving embeddings, and storing them in your collections. For semantic
  search, you need to provide only raw query data, not a query vector. Milvus
  generates the query vector with the same model you used for ingestion,
  compares it to the stored vectors, and returns the most relevant results.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">Embedding Function Overview<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>The Function module in Milvus allows you to transform raw text data into vector embeddings by automatically calling external embedding service providers (like OpenAI, AWS Bedrock, Google Vertex AI, etc.). With the Function module, you no longer need to manually interface with embedding APIs—Milvus handles the entire process of sending requests to providers, receiving embeddings, and storing them in your collections. For semantic search, you need to provide only raw query data, not a query vector. Milvus generates the query vector with the same model you used for ingestion, compares it to the stored vectors, and returns the most relevant results.</p>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Any input field that the Function module embeds must always contain a value; if a null is supplied, the module will throw an error.</p></li>
<li><p>The Function module processes only fields that are explicitly defined in the collection schema; it does not generate embeddings for dynamic fields.</p></li>
<li><p>Input fields to be embedded must be of the <code translate="no">VARCHAR</code> type.</p></li>
<li><p>The Function module can embed an input field to:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>Conversions to <code translate="no">BINARY_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, or <code translate="no">BFLOAT16_VECTOR</code> are not supported.</p></li>
</ul>
<h2 id="Supported-embedding-service-providers" class="common-anchor-header">Supported embedding service providers<button data-href="#Supported-embedding-service-providers" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>Provider</p></th>
     <th><p>Typical Models</p></th>
     <th><p>Embedding Type</p></th>
     <th><p>Authentication Method</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.6.x/openai.md">OpenAI</a></p></td>
     <td><p>text-embedding-3-*</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>API key</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.6.x/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>Deployment-based</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>API key</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.6.x/dashscope.md">DashScope</a></p></td>
     <td><p>text-embedding-v3</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>API key</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.6.x/bedrock.md">Bedrock</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>AK/SK pair</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.6.x/vertex-ai.md">Vertex AI</a></p></td>
     <td><p>text-embedding-005</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>GCP service account JSON credential</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.6.x/voyage-ai.md">Voyage AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code></p></td>
     <td><p>API key</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.6.x/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code></p></td>
     <td><p>API key</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.6.x/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>API key</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.6.x/hugging-face-tei.md">Hugging Face</a></p></td>
     <td><p>Any TEI-served model</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Optional API key</p></td>
   </tr>
</table>
<h2 id="How-it-works" class="common-anchor-header">How it works<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>The following diagram shows how the Function works in Milvus.</p>
<ol>
<li><p><strong>Input text</strong>: Users insert raw data (e.g. documents) into Milvus.</p></li>
<li><p><strong>Generate embeddings</strong>: The Function module within Milvus automatically calls the configured model provider to convert raw data into vector embeddings.</p></li>
<li><p><strong>Store embeddings</strong>: The resulting embeddings are stored in explicitly defined vector fields within Milvus collections.</p></li>
<li><p><strong>Query text</strong>: Users submit text queries to Milvus.</p></li>
<li><p><strong>Semantic search</strong>: Milvus internally converts queries to vector embeddings, conducts similarity searches against stored embeddings, and retrieves relevant results.</p></li>
<li><p><strong>Return results</strong>: Milvus returns top-matching results to the application.</p></li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
    <span>Embedding Function Overview</span>
  </span>
</p>
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
    </button></h2><p>Before using an embedding function with Milvus, configure embedding service credentials for Milvus access.</p>
<p>Milvus lets you supply embedding service credentials in two ways:</p>
<ul>
<li><p><strong>Configuration file</strong> (<code translate="no">milvus.yaml</code>):</p>
<p>The example in this topic demonstrates the <strong>recommended setup</strong> using <code translate="no">milvus.yaml</code>.</p></li>
<li><p><strong>Environment variables</strong>:</p>
<p>For details on configuring credentials via environment variables, see the embedding service provider’s documentation (for example, <a href="/docs/v2.6.x/openai.md">OpenAI</a> or <a href="/docs/v2.6.x/azure-openai.md">Azure OpenAI</a>).</p></li>
</ul>
<p>The following diagram shows the process of configuring credentials via Milvus configuration file (<code translate="no">milvus.yaml</code>) and then calling the Function within Milvus.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
    <span>Credential Config Overflow</span>
  </span>
</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration-file" class="common-anchor-header">Step 1: Add credentials to Milvus configuration file</h3><p>In your <code translate="no">milvus.yaml</code> file, edit the <code translate="no">credential</code> block with entries for each provider you need to access:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml credential store section</span>
<span class="hljs-comment"># This section defines all your authentication credentials for external embedding providers</span>
<span class="hljs-comment"># Each credential gets a unique name (e.g., aksk1, apikey1) that you&#x27;ll reference elsewhere</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-comment"># For AWS Bedrock or services using access/secret key pairs</span>
  <span class="hljs-comment"># &#x27;aksk1&#x27; is just an example name - you can choose any meaningful identifier</span>
  <span class="hljs-attr">aksk1:</span>                       
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_AK&gt;</span>      
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_SK&gt;</span>  
  
  <span class="hljs-comment"># For OpenAI, Voyage AI, or other API key-based services</span>
  <span class="hljs-comment"># &#x27;apikey1&#x27; is a custom name you choose to identify this credential  </span>
  <span class="hljs-attr">apikey1:</span>                     
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_API_KEY&gt;</span>        
  
  <span class="hljs-comment"># For Google Vertex AI using service account credentials</span>
  <span class="hljs-comment"># &#x27;gcp1&#x27; is an example name for your Google Cloud credentials</span>
  <span class="hljs-attr">gcp1:</span>                        
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">&lt;BASE64_OF_JSON&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">Step 2: Configure provider settings</h3><p>In the same configuration file (<code translate="no">milvus.yaml</code>), edit the <code translate="no">function</code> block to tell Milvus which key to use for embedding service calls:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>For more information on how to apply Milvus configuration, refer to <a href="/docs/v2.6.x/dynamic_config.md">Configure Milvus on the Fly</a>.</p>
<h2 id="Use-embedding-function" class="common-anchor-header">Use embedding function<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Once credentials are configured in your Milvus configuration file, follow these steps to define and use embedding functions.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Step 1: Define schema fields</h3><p>To use an embedding function, create a collection with a specific schema. This schema must include at least three necessary fields:</p>
<ul>
<li><p>The <strong>primary field</strong> that uniquely identifies each entity in a collection.</p></li>
<li><p>A <strong>scalar field</strong> that stores raw data to be embedded.</p></li>
<li><p>A <strong>vector field</strong> reserved to store vector embeddings that the function will generate for the scalar field.</p></li>
</ul>
<p>The following example defines a schema with one scalar field <code translate="no">&quot;document&quot;</code> for storing textual data and one vector field <code translate="no">&quot;dense&quot;</code> for storing embeddings to be generated by the Function module. Remember to set the vector dimension (<code translate="no">dim</code>) to match the output of your chosen embedding model.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Create a new schema for the collection</span>
schema = client.create_schema()

<span class="hljs-comment"># Add primary field &quot;id&quot;</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add scalar field &quot;document&quot; for storing textual data</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)

<span class="hljs-comment"># Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment"># IMPORTANT: Set `dim` to match the exact output dimension of the embedding model.</span>
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Step 2: Add embedding function to schema</h3><p>The Function module in Milvus automatically converts raw data stored in a scalar field into embeddings and stores them into the explicitly defined vector field.</p>
<p>The example below adds a Function module (<code translate="no">openai_embedding</code>) that converts the scalar field <code translate="no">&quot;document&quot;</code> into embeddings, storing the resulting vectors in the <code translate="no">&quot;dense&quot;</code> vector field defined earlier.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                  <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING, <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],           <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],             <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                  <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                 <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,            # Optional: Credential label</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,       # Optionally shorten the vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;    # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Example Value</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Unique identifier for the embedding function within Milvus.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Type of function used. For text embedding, set the value to <code translate="no">FunctionType.TEXTEMBEDDING</code>.<br><strong>Note:</strong> Milvus accepts <code translate="no">FunctionType.BM25</code> (for sparse-embedding transformation) and <code translate="no">FunctionType.RERANK</code> (for reranking) for this parameter. Refer to <a href="/docs/v2.6.x/full-text-search.md">Full Text Search</a> and <a href="/docs/v2.6.x/decay-ranker-overview.md">Decay Ranker Overview</a> for details.</p></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Scalar field containing raw data to be embedded. Currently, this parameter accepts only one field name.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Vector field for storing generated embeddings. Currently, this parameter accepts only one field name.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Dictionary containing embedding configurations. Note: Parameters within <code translate="no">params</code> vary depending on the embedding model providers.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>The embedding model provider.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Specifies which embedding model to use.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>The label of a credential defined in the top-level <code translate="no">credential:</code> section of <code translate="no">milvus.yaml</code>. </p>
<ul>
<li><p>When provided, Milvus retrieves the matching key pair or API token and signs the request on the server side.</p></li>
<li><p>When omitted (<code translate="no">None</code>), Milvus falls back to the credential explicitly configured for the target model provider in <code translate="no">milvus.yaml</code>.</p></li>
<li><p>If the label is unknown or the referenced key is missing, the call fails.</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>The number of dimensions for the output embeddings. For OpenAI's third-generation models, you can shorten the full vector to reduce cost and latency without a significant loss of semantic information. For more information, refer to <a href="https://openai.com/blog/new-embedding-models-and-api-updates">OpenAI announcement blog post</a>.<br>
 <strong>Note:</strong> If you shorten the vector dimension, ensure the <code translate="no">dim</code> value specified in the schema's <code translate="no">add_field</code> method for the vector field matches the final output dimension of your embedding function.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>A user-level identifier for tracking API usage.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>For collections with multiple scalar fields requiring text-to-vector conversion, add separate functions to the collection schema, ensuring each function has a unique name and <code translate="no">output_field_names</code> value.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">Step 3: Configure index</h3><p>After defining the schema with necessary fields and the built-in function, set up the index for your collection. To simplify this process, use <code translate="no">AUTOINDEX</code> as the <code translate="no">index_type</code>, an option that allows Milvus to choose and configure the most suitable index type based on the structure of your data.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">Step 4: Create collection</h3><p>Now create the collection using the schema and index parameters defined.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">Step 5: Insert data</h3><p>After setting up your collection and index, you’re ready to insert your raw data. In this process, you need only to provide the raw text. The Function module we defined earlier automatically generates the corresponding sparse vector for each text entry.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">Step 6: Perform vector search</h3><p>After data insertion, perform a semantic search using raw query text. Milvus automatically converts your query into an embedding vector, retrieves relevant documents based on similarity, and returns the top-matching results.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.8821347951889038, &#x27;entity&#x27;: {&#x27;document&#x27;: &#x27;Milvus simplifies semantic search through embeddings.&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<p>For more information about search and query operations, refer to <a href="/docs/v2.6.x/single-vector-search.md">Basic Vector Search</a> and <a href="/docs/v2.6.x/get-and-scalar-query.md">Query</a>.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-the-difference-between-configuring-credentials-in-milvusyaml-vs-environment-variables" class="common-anchor-header">What’s the difference between configuring credentials in milvus.yaml vs environment variables?</h3><p>Both methods work, but using <code translate="no">milvus.yaml</code> is the recommended approach as it provides centralized credential management and consistent credential naming across all providers. When using environment variables, the variable names vary depending on the embedding service provider, so refer to each provider’s dedicated page to understand the specific environment variable names required (for example, <a href="/docs/v2.6.x/openai.md">OpenAI</a> or <a href="/docs/v2.6.x/azure-openai.md">Azure OpenAI</a>).</p>
<h3 id="What-happens-if-I-dont-specify-a-credential-parameter-in-the-function-definition" class="common-anchor-header">What happens if I don’t specify a credential parameter in the function definition?</h3><p>Milvus follows this credential resolution order:</p>
<ol>
<li>First, it looks for the default credential configured for that provider in the <code translate="no">milvus.yaml</code> file</li>
<li>If no default credential exists in milvus.yaml, it falls back to environment variables (if configured)</li>
<li>If neither <code translate="no">milvus.yaml</code> credentials nor environment variables are configured, Milvus will throw an error</li>
</ol>
<h3 id="How-can-I-verify-that-embeddings-are-being-generated-correctly" class="common-anchor-header">How can I verify that embeddings are being generated correctly?</h3><p>You can check by:</p>
<ol>
<li>Querying your collection after insertion to see if the vector field contains data</li>
<li>Checking the vector field length matches your expected dimensions</li>
<li>Performing a simple similarity search to verify the embeddings produce meaningful results</li>
</ol>
<h3 id="When-I-perform-a-similarity-search-can-I-use-a-query-vector-rather-than-raw-text" class="common-anchor-header">When I perform a similarity search, can I use a query vector rather than raw text?</h3><p>Yes, you can use pre-computed query vectors instead of raw text for similarity search. While the Function module automatically converts raw text queries to embeddings, you can also directly provide vector data to the data parameter in your search operation. Note: The dimension size of your provided query vector must be consistent with the dimension size of the vector embeddings generated by your Function module.</p>
<p><strong>Example</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using raw text (Function module converts automatically)</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,
    limit=<span class="hljs-number">1</span>
)

<span class="hljs-comment"># Using pre-computed query vector (must match stored vector dimensions)</span>
query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, ...]  <span class="hljs-comment"># Must be same dimension as stored embeddings</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[query_vector],
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,
    limit=<span class="hljs-number">1</span>
)
<button class="copy-code-btn"></button></code></pre>
