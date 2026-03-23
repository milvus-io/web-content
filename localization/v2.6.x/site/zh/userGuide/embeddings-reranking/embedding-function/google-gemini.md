---
id: google-gemini.md
title: 谷歌双子座
summary: 通过选择一个模型，并使用 Gemini API 密钥配置 Milvus，即可将 Google Gemini 嵌入模型与 Milvus 结合使用。
---
<h1 id="Google-Gemini" class="common-anchor-header">谷歌双子座<button data-href="#Google-Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>通过选择一个模型，并使用您的双子座 API 密钥配置 Milvus，即可在 Milvus 中使用谷歌双子座嵌入模型。</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">选择嵌入模型<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持 Google Gemini 提供的嵌入模型。以下是当前可用的 Gemini 嵌入模型，供快速参考：</p>
<table>
   <tr>
     <th><p><strong>模型名称</strong></p></th>
     <th><p><strong>尺寸</strong></p></th>
     <th><p><strong>最大代币数</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p>gemini-embedding-001</p></td>
     <td><p>默认：3,072（建议：768、1,536 或 3,072）</p></td>
     <td><p>8,192</p></td>
     <td><p>具有灵活维度的文本嵌入模型，使用 Matryoshka Representation Learning (MRL) 训练。</p></td>
   </tr>
   <tr>
     <td><p>gemini-embeddings-2</p></td>
     <td><p>默认：3,072（建议：768、1,536 或 3,072）</p></td>
     <td><p>8,192</p></td>
     <td><p>Google 首款原生多模态嵌入模型，在统一的嵌入空间中支持文本、图片、视频、音频和文档。</p></td>
   </tr>
</table>
<p>这两种模型都是使用 Matryoshka 表征学习（MRL）技术训练的，可以通过<code translate="no">dim</code> 参数实现灵活的输出维度。建议从 768 维度开始，必要时可扩展到 1,536 或 3,072 维度。更多详情，请参阅<a href="https://ai.google.dev/gemini-api/docs/embeddings">双子座嵌入模型</a>。</p>
<p>Gemini 嵌入模型还支持<strong>任务类型</strong>参数，可针对特定用例优化嵌入。Milvus 会根据操作符自动设置任务类型：</p>
<ul>
<li><p><strong>插入/倒插</strong>：<code translate="no">RETRIEVAL_DOCUMENT</code></p></li>
<li><p><strong>搜索</strong>：<code translate="no">RETRIEVAL_QUERY</code></p></li>
</ul>
<p>您可以通过明确指定<code translate="no">task</code> 参数（如<code translate="no">SEMANTIC_SIMILARITY</code>,<code translate="no">CLASSIFICATION</code>,<code translate="no">CLUSTERING</code> ）来覆盖这一点。</p>
<h2 id="Configure-credentials" class="common-anchor-header">配置凭证<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 在请求 Embeddings 之前必须知道您的 Gemini API 密钥。Milvus 提供两种配置凭据的方法：</p>
<ul>
<li><p><strong>配置文件（推荐）：</strong>将 API 密钥存储在<code translate="no">milvus.yaml</code> 中，这样每次重启和节点都会自动获取该密钥。</p></li>
<li><p><strong>环境变量：</strong>在部署时注入密钥--最适合 Docker Compose。</p></li>
</ul>
<p>从以下两种方法中选择一种--配置文件在裸机和虚拟机上更易于维护，而环境变量方法适合容器工作流。</p>
<p>如果同一提供商的 API 密钥同时存在于配置文件和环境变量中，Milvus 将始终使用<code translate="no">milvus.yaml</code> 中的值，而忽略环境变量。</p>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">选项 1：配置文件（推荐且优先级更高）<button data-href="#Option-1-Configuration-file-recommended--higher-priority" class="anchor-icon" translate="no">
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
    </button></h3><p>将 API 密钥保存在<code translate="no">milvus.yaml</code> 中；Milvus 会在启动时读取它们，并覆盖同一提供商的任何环境变量。</p>
<ol>
<li><p><strong>在凭据下声明你的密钥：</strong></p>
<p>你可以列出一个或多个 API 密钥--给每个密钥贴上你自创的标签，以便日后参考。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>把 API 密钥放在这里，可以让它们在重启时保持不变，而且只需更改标签就能切换密钥。</p></li>
<li><p><strong>告诉 Milvus 在调用 Gemini 时使用哪个密钥</strong></p>
<p>在同一文件中，将 Gemini 提供者指向你希望它使用的标签。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">gemini:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
<button class="copy-code-btn"></button></code></pre>
<p>这样，Milvus 向 Gemini embeddings 端点发送的每个请求都会绑定特定密钥。</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">方案 2：环境变量<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>当你使用 Docker Compose 运行 Milvus，并希望不对文件和映像保密时，请使用这种方法。</p>
<p>只有在<code translate="no">milvus.yaml</code> 中找不到提供程序的密钥时，Milvus 才会使用环境变量。</p>
<table>
   <tr>
     <th><p><strong>变量</strong></p></th>
     <th><p><strong>需要</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p>milvus_gemini_api_key</p></td>
     <td><p>是</p></td>
     <td><p>让每个 Milvus 容器都能使用 Gemini 密钥（如果在 milvus.yaml 中存在 Gemini 密钥，则忽略该变量）。</p></td>
   </tr>
</table>
<p>在<strong>docker-compose.yaml</strong>文件中，设置<code translate="no">MILVUS_GEMINI_API_KEY</code> 环境变量。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Gemini API key inside the container</span>
    <span class="hljs-attr">MILVUS_GEMINI_API_KEY:</span> <span class="hljs-string">&lt;YOUR_GEMINI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">environment:</code> 块只将密钥注入 Milvus 容器，而不会触及你的主机操作系统。详情请参阅《<a href="http://configure-docker.md#Configure-Milvus-with-Docker-Compose">使用 Docker Compose 配置 Milvus</a>》。</p>
<h2 id="Step-1-Create-a-collection-with-a-text-embedding-function" class="common-anchor-header">第 1 步：创建具有文本嵌入功能的 Collections<button data-href="#Step-1-Create-a-collection-with-a-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Define-schema-fields" class="common-anchor-header">定义 Schema 字段<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>要使用嵌入功能，请创建一个具有特定 Schema 的 Collections。此 Schema 必须至少包含三个必要字段：</p>
<ul>
<li><p>唯一标识 Collections 中每个实体的主字段。</p></li>
<li><p><code translate="no">VARCHAR</code> 字段，用于存储要嵌入的原始数据。</p></li>
<li><p>一个预留向量字段，用于存储文本嵌入函数将为<code translate="no">VARCHAR</code> 字段生成的密集向量嵌入。</p></li>
</ul>
<p>下面的示例定义了一个 Schema 模式，其中一个标量字段<code translate="no">&quot;document&quot;</code> 用于存储文本数据，一个向量字段<code translate="no">&quot;dense&quot;</code> 用于存储将由函数模块生成的嵌入。切记设置向量维数 (<code translate="no">dim</code>) 以匹配所选嵌入模型的输出。</p>
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
<span class="hljs-comment"># For instance, Gemini&#x27;s gemini-embedding-001 model outputs 3072-dimensional vectors by default,</span>
<span class="hljs-comment"># but can be shortened to 768 or 1536 dimensions.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-text-embedding-function" class="common-anchor-header">定义文本嵌入函数<button data-href="#Define-the-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h3><p>文本嵌入函数会自动将存储在<code translate="no">VARCHAR</code> 字段中的原始数据转换为嵌入数据，并将其存储到明确定义的向量字段中。</p>
<p>下面的示例添加了一个 Function 模块 (<code translate="no">gemini_embedding</code>) ，该模块将标量字段<code translate="no">&quot;document&quot;</code> 转换为嵌入式数据，将得到的向量存储到前面定义的<code translate="no">&quot;dense&quot;</code> 向量字段中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: Gemini provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;gemini_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;gemini&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;gemini-embedding-001&quot;</span>,       <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;768&quot;,                             # Optional: Output vector dimension (default 3072)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;RETRIEVAL_DOCUMENT&quot;,             # Optional: Task type for embedding optimization</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<p><strong>任务参数支持的任务类型：</strong></p>
<ul>
<li><p><code translate="no">RETRIEVAL_DOCUMENT</code> - 优化嵌入式文档索引（默认为插入/上插）。</p></li>
<li><p><code translate="no">RETRIEVAL_QUERY</code> - 为查询检索优化嵌入（默认为搜索）。</p></li>
<li><p><code translate="no">SEMANTIC_SIMILARITY</code> - 优化用于测量文本相似性的嵌入。</p></li>
<li><p><code translate="no">CLASSIFICATION</code> - 优化嵌入式文本分类。</p></li>
<li><p><code translate="no">CLUSTERING</code> - 优化聚类嵌入。</p></li>
</ul>
<p>如果没有明确设置，Milvus 会在插入/上载时自动使用<code translate="no">RETRIEVAL_DOCUMENT</code> ，在搜索时自动使用<code translate="no">RETRIEVAL_QUERY</code> 。</p>
<h3 id="Configure-the-index" class="common-anchor-header">配置索引<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>在定义了包含必要字段和内置函数的 Schema 后，请为您的 Collections 设置索引。为简化这一过程，请使用<code translate="no">AUTOINDEX</code> 作为<code translate="no">index_type</code> ，该选项允许 Milvus 根据数据结构选择和配置最合适的索引类型。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-the-collection" class="common-anchor-header">创建 Collections<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>现在使用定义的 Schema 和索引参数创建 Collections。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-data" class="common-anchor-header">第 2 步：插入数据<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>设置好集合和索引后，就可以插入原始数据了。在此过程中，您只需提供原始文本。我们之前定义的 Function 模块会为每个文本条目自动生成相应的稀疏向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-text" class="common-anchor-header">步骤 3：搜索文本<button data-href="#Step-3-Search-with-text" class="anchor-icon" translate="no">
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
    </button></h2><p>插入数据后，使用原始查询文本执行语义搜索。Milvus 会自动将你的查询转换成 Embeddings 向量，根据相似度检索相关文档，并返回匹配度最高的结果。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>有关搜索和查询操作的更多信息，请参阅<a href="/docs/zh/single-vector-search.md">基本向量搜索</a>和<a href="/docs/zh/get-and-scalar-query.md">查询</a>。</p>
