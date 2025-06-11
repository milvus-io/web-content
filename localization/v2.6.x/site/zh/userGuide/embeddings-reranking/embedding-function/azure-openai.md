---
id: azure-openai.md
title: Azure OpenAICompatible with Milvus 2.6.x
summary: 本主题介绍如何在 Milvus 中配置和使用 Azure OpenAI 嵌入函数。
beta: Milvus 2.6.x
---
<h1 id="Azure-OpenAI" class="common-anchor-header">Azure OpenAI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Azure-OpenAI" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍如何在 Milvus 中配置和使用 Azure OpenAI 嵌入函数。</p>
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
    </button></h2><p>Milvus 支持 Azure OpenAI 提供的所有嵌入模型。以下是当前可用的 Azure OpenAI 嵌入模型，供快速参考：</p>
<table>
   <tr>
     <th><p>模型</p></th>
     <th><p>尺寸</p></th>
     <th><p>最大令牌数</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p>text-embedding-3-small</p></td>
     <td><p>默认：1,536（可截断至 1536 以下的尺寸大小）</p></td>
     <td><p>8,191</p></td>
     <td><p>成本敏感型和可扩展语义搜索的理想选择--以较低的价格提供较强的性能。</p></td>
   </tr>
   <tr>
     <td><p>文本-Embeddings-3-大号</p></td>
     <td><p>默认：3,072（可截断至 3072 以下的尺寸大小）</p></td>
     <td><p>8,191</p></td>
     <td><p>最适合需要更高的检索准确性和更丰富的语义表述的应用。</p></td>
   </tr>
   <tr>
     <td><p>文本嵌入-ADA-002</p></td>
     <td><p>固定：1,536（不支持截断）</p></td>
     <td><p>8,191</p></td>
     <td><p>上一代模型适用于传统管道或需要向后兼容的场景。</p></td>
   </tr>
</table>
<p>第三代嵌入模型<strong>（text-embedding-3</strong>）支持通过<code translate="no">dim</code> 参数减小嵌入的大小。通常情况下，从计算、内存和存储的角度来看，较大的嵌入会更加昂贵。通过调整维数，可以更好地控制总体成本和性能。有关每种模型的更多详情，请参阅<a href="https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models?tabs=global-standard,standard-chat-completions#embeddings">Embeddings</a>。</p>
<h2 id="Configure-credentials" class="common-anchor-header">配置凭据<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 必须知道你的 Azure OpenAI API 密钥，才能请求嵌入。Milvus 提供两种配置凭据的方法：</p>
<ul>
<li><p><strong>配置文件（推荐）：</strong>将 API 密钥存储在<code translate="no">milvus.yaml</code> 中，以便每次重启和节点都能自动获取。</p></li>
<li><p><strong>环境变量：</strong>在部署时注入密钥--最适合 Docker Compose。</p></li>
</ul>
<p>从以下两种方法中选择一种--配置文件在裸机和虚拟机上更易于维护，而环境变量方法适合容器工作流。</p>
<div class="alert note">
<p>如果同一提供商的 API 密钥同时存在于配置文件和环境变量中，Milvus 将始终使用<code translate="no">milvus.yaml</code> 中的值，而忽略环境变量。</p>
</div>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">选项 1：配置文件（推荐且优先级更高）</h3><p>将 API 密钥保存在<code translate="no">milvus.yaml</code> 中；Milvus 会在启动时读取它们，并覆盖同一提供商的任何环境变量。</p>
<ol>
<li><p>**在<code translate="no">credential:</code></p>
<p>你可以列出一个或多个 API 密钥--给每个密钥贴上你自创的标签，以便日后参考。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>把 API 密钥放在这里，可以让它们在重启时保持不变，而且只需更改标签就能切换密钥。</p></li>
<li><p><strong>告诉 Milvus 在 Azure OpenAI 调用中使用哪个密钥</strong></p>
<p>在同一文件中，将 Azure OpenAI 提供程序指向你希望它使用的标签。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">azure_openai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-attr">resource_name:</span>  <span class="hljs-comment"># Your azure openai resource name</span>
        <span class="hljs-comment"># url: # Your azure openai embedding url</span>
<button class="copy-code-btn"></button></code></pre>
<p>这样，Milvus 向 Azure OpenAI embeddings 端点发送的每个请求都会绑定特定密钥。</p></li>
</ol>
<h3 id="Option-2-Environment-variables" class="common-anchor-header">方案 2：环境变量</h3><p>当你使用 Docker Compose 运行 Milvus，并希望不对文件和映像保密时，请使用这种方法。</p>
<p>只有在<code translate="no">milvus.yaml</code> 中找不到提供程序的密钥时，Milvus 才会使用环境变量。</p>
<table>
   <tr>
     <th><p>变量</p></th>
     <th><p>需要</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_AZURE_OPENAI_API_KEY</code></p></td>
     <td><p>是</p></td>
     <td><p>使 Azure OpenAI 密钥在每个 Milvus 容器中可用<em>（当<code translate="no">milvus.yaml</code> 中存在 Azure OpenAI 密钥时忽略</em>该变量）</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_AZURE_OPENAI_RESOURCE_NAME</code></p></td>
     <td><p>是</p></td>
     <td><p>创建 Azure OpenAI 服务资源时定义的 Azure OpenAI 资源名称。</p></td>
   </tr>
</table>
<p>在<strong>docker-compose.yaml</strong>文件中设置环境变量。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Azure OpenAI API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_AZURE_OPENAI_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_AZURE_OPENAI_API_KEY&gt;</span>
    <span class="hljs-attr">MILVUSAI_AZURE_OPENAI_RESOURCE_NAME:</span> <span class="hljs-string">&lt;MILVUSAI_AZURE_OPENAI_RESOURCE_NAME&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">environment:</code> 块只将密钥注入 Milvus 容器，而不会触及主机操作系统。有关详情，请参阅<a href="/docs/zh/configure-docker.md#Configure-Milvus-with-Docker-Compose">使用 Docker Compose 配置 Milvus</a>。</p>
<h2 id="Use-embedding-function" class="common-anchor-header">使用 Embeddings 功能<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>配置凭证后，请按照以下步骤定义和使用嵌入函数。</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">步骤 1：定义 Schema 字段</h3><p>要使用嵌入函数，请创建一个具有特定 Schema 的 Collections。此 Schema 必须至少包含三个必要字段：</p>
<ul>
<li><p>主字段，用于唯一标识 Collections 中的每个实体。</p></li>
<li><p>标量字段，用于存储要嵌入的原始数据。</p></li>
<li><p>一个向量字段，用于存储函数将为标量字段生成的向量嵌入。</p></li>
</ul>
<p>下面的示例定义了一个 Schema 模式，其中一个标量字段<code translate="no">&quot;document&quot;</code> 用于存储文本数据，一个向量字段<code translate="no">&quot;dense&quot;</code> 用于存储将由函数模块生成的嵌入。切记要设置向量维数 (<code translate="no">dim</code>) 以匹配所选嵌入模型的输出。</p>
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
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">第 2 步：向 Schema 添加嵌入函数</h3><p>定义好嵌入函数后，将其添加到 Collections Schema 中。这将指示 Milvus 使用指定的嵌入函数来处理和存储文本数据的嵌入。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for Azure OpenAI provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;azopenai&quot;</span>,                                <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific embedding parameters</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;azure_openai&quot;</span>,                 <span class="hljs-comment"># Embedding provider name (must be &quot;azure_openai&quot;)</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;zilliz-text-embedding-3-small&quot;</span>,      <span class="hljs-comment"># Model should be set to the deployment name you chose when you deployed the embedding model</span>
        <span class="hljs-comment"># Optional parameters (only specify if necessary):</span>
        <span class="hljs-comment"># &quot;url&quot;: &quot;https://{resource_name}.openai.azure.com/&quot; # Optional: Your Azure OpenAI service endpoint</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optional: Shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;,                        # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-steps" class="common-anchor-header">下一步<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>配置嵌入功能后，请参阅<a href="/docs/zh/embedding-function-overview.md">功能概述</a>，了解有关索引配置、数据插入示例和语义搜索操作的其他指导。</p>
