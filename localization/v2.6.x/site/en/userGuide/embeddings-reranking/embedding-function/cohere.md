---
id: cohere.md
title: Cohere
summary: >-
  This topic describes how to configure and use Cohere embedding functions in
  Milvus.
beta: Milvus 2.6.x
---
<h1 id="Cohere" class="common-anchor-header">Cohere<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Cohere" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to configure and use Cohere embedding functions in Milvus.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">Choose an embedding model<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supports embedding models provided by Cohere. Below are the currently available embedding models for quick reference:</p>
<table>
   <tr>
     <th><p>Model Name</p></th>
     <th><p>Dimensions</p></th>
     <th><p>Max Tokens</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p>embed-english-v3.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>A model that allows for text to be classified or turned into embeddings. English only.</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-v3.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>Provides multilingual classification and embedding support. <a href="https://docs.cohere.com/docs/supported-languages">See supported languages here</a>.</p></td>
   </tr>
   <tr>
     <td><p>embed-english-light-v3.0</p></td>
     <td><p>384</p></td>
     <td><p>512</p></td>
     <td><p>A smaller, faster version of <code translate="no">embed-english-v3.0</code>. Almost as capable, but a lot faster. English only.</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-light-v3.0</p></td>
     <td><p>384</p></td>
     <td><p>512</p></td>
     <td><p>A smaller, faster version of <code translate="no">embed-multilingual-v3.0</code>. Almost as capable, but a lot faster. Supports multiple languages.</p></td>
   </tr>
   <tr>
     <td><p>embed-english-v2.0</p></td>
     <td><p>4,096</p></td>
     <td><p>512</p></td>
     <td><p>Older embeddings model that allows for text to be classified or turned into embeddings. English only.</p></td>
   </tr>
   <tr>
     <td><p>embed-english-light-v2.0</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>A smaller, faster version of embed-english-v2.0. Almost as capable, but a lot faster. English only.</p></td>
   </tr>
   <tr>
     <td><p>embed-multilingual-v2.0</p></td>
     <td><p>768</p></td>
     <td><p>256</p></td>
     <td><p>Provides multilingual classification and embedding support. <a href="https://docs.cohere.com/docs/supported-languages">See supported languages here</a>.</p></td>
   </tr>
</table>
<p>For details, refer to <a href="https://docs.cohere.com/docs/cohere-embed">Cohere’s Embed Models</a>.</p>
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
    </button></h2><p>Milvus must know your Cohere API key before it can request embeddings. Milvus provides two methods to configure credentials:</p>
<ul>
<li><p><strong>Configuration file (recommended):</strong> Store the API key in <code translate="no">milvus.yaml</code> so every restart and node picks it up automatically.</p></li>
<li><p><strong>Environment variables:</strong> Inject the key at deploy time—ideal for Docker Compose.</p></li>
</ul>
<p>Choose one of the two methods below—the configuration file is easier to maintain on bare-metal and VMs, while the env-var route fits container workflows.</p>
<div class="alert note">
<p>If an API key for the same provider is present in both the configuration file and an environment variable, Milvus always uses the value in <code translate="no">milvus.yaml</code> and ignores the environment variable.</p>
</div>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Option 1: Configuration file (recommended & higher priority)</h3><p>Keep your API keys in <code translate="no">milvus.yaml</code>; Milvus reads them at startup and overrides any environment variable for the same provider.</p>
<ol>
<li><p>**Declare your keys under <code translate="no">credential:</code></p>
<p>You may list one or many API keys—give each a label you invent and will reference later.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>Putting the API keys here makes them persistent across restarts and lets you switch keys just by changing a label.</p></li>
<li><p><strong>Tell Milvus which key to use for OpenAI calls</strong></p>
<p>In the same file, point the Cohere provider at the label you want it to use.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">cohere:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://api.cohere.com/v2/embed   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>This binds a specific key to every request Milvus sends to the Cohere embeddings endpoint.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Option 2: Environment variable</h3><p>Use this method when you run Milvus with Docker Compose and prefer to keep secrets out of files and images.</p>
<p>Milvus falls back to the environment variable only if no key for the provider is found in <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Required</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_COHERE_API_KEY</code></p></td>
     <td><p>Yes</p></td>
     <td><p>Your valid Cohere API key.</p></td>
   </tr>
</table>
<p>In your <strong>docker-compose.yaml</strong> file, set the <code translate="no">MILVUSAI_COHERE_API_KEY</code> environment variable.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the OpenAI API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_COHERE_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_COHERE_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>The <code translate="no">environment:</code> block injects the key only into the Milvus container, leaving your host OS untouched. For details, refer to <a href="/docs/v2.6.x/configure-docker.md#Configure-Milvus-with-Docker-Compose">Configure Milvus with Docker Compose</a>.</p>
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
    </button></h2><p>Once credentials are configured, follow these steps to define and use embedding functions.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Step 1: Define schema fields</h3><p>To use an embedding function, create a collection with a specific schema. This schema must include at least three necessary fields:</p>
<ul>
<li><p>The primary field that uniquely identifies each entity in a collection.</p></li>
<li><p>A scalar field that stores raw data to be embedded.</p></li>
<li><p>A vector field reserved to store vector embeddings that the function will generate for the scalar field.</p></li>
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
<span class="hljs-comment"># IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Step 2: Add embedding function to schema</h3><p>The Function module in Milvus automatically converts raw data stored in a scalar field into embeddings and stores them into the explicitly defined vector field.</p>
<p>The example below adds a Function module (<code translate="no">cohere_func</code>) that converts the scalar field <code translate="no">&quot;document&quot;</code> into embeddings, storing the resulting vectors in the <code translate="no">&quot;dense&quot;</code> vector field defined earlier.</p>
<p>Once you have defined your embedding function, add it to your collection schema. This instructs Milvus to use the specified embedding function to process and store embeddings from your text data.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for embedding model provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;cohere_func&quot;</span>,                                 <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,           <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                     <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                       <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                            <span class="hljs-comment"># Provider-specific embedding parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;cohere&quot;</span>,                           <span class="hljs-comment"># Must be set to &quot;cohere&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;embed-english-v3.0&quot;</span>,             <span class="hljs-comment"># Specifies the embedding model to use</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;url&quot;: &quot;https://api.cohere.com/v2/embed&quot;,     # Defaults to the official endpoint if omitted</span>
        <span class="hljs-comment"># &quot;truncate&quot;: &quot;NONE&quot;,                           # Specifies how the API will handle inputs longer than the maximum token length.</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-steps" class="common-anchor-header">Next steps<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>After configuring the embedding function, refer to the <a href="/docs/v2.6.x/embedding-function-overview.md">Function Overview</a> for additional guidance on index configuration, data insertion examples, and semantic search operations.</p>
