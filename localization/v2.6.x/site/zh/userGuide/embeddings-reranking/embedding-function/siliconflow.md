---
id: siliconflow.md
title: SiliconFLowCompatible with Milvus 2.6.x
summary: 本主题介绍如何在 Milvus 中配置和使用 SiliconFLow 嵌入功能。
beta: Milvus 2.6.x
---
<h1 id="SiliconFLow" class="common-anchor-header">SiliconFLow<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#SiliconFLow" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍如何在 Milvus 中配置和使用 SiliconFLow 嵌入功能。</p>
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
    </button></h2><p>Milvus 支持 SiliconFLow 提供的嵌入模型。以下是当前可用的 SiliconFLow 嵌入模型，供快速参考：</p>
<table>
   <tr>
     <th><p>模型名称</p></th>
     <th><p>尺寸</p></th>
     <th><p>最大令牌数</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>大型中文文本嵌入模型，属于 BGE（BAAI 通用嵌入）系列。</p></td>
   </tr>
   <tr>
     <td><p>BAAI/bge-large-en-v1.5</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>大型英文文本嵌入模型，是 BGE（BAAI 通用嵌入）系列的一部分。</p></td>
   </tr>
   <tr>
     <td><p>netease-youdao/bce-embedding-base_v1</p></td>
     <td><p>768</p></td>
     <td><p>512</p></td>
     <td><p>网易有道开发的双语和跨语言嵌入模型。该模型在中英文语义表示和检索任务中表现出色，尤其在跨语言场景中表现突出。</p></td>
   </tr>
   <tr>
     <td><p>BAAI/bge-m3</p></td>
     <td><p>1,024</p></td>
     <td><p>8,192</p></td>
     <td><p>多功能、多语言、多粒度文本 Embeddings 模型。它支持三种常见的检索功能：密集检索、多向量检索和稀疏检索。</p></td>
   </tr>
   <tr>
     <td><p>Pro/BAAI/bge-m3</p></td>
     <td><p>1,024</p></td>
     <td><p>8,192</p></td>
     <td><p>多功能、多语言、多粒度文本 Embeddings 模型。它支持三种常见的检索功能：密集检索、多向量检索和稀疏检索。该模型可处理 100 多种语言的输入，并能处理不同粒度的输入。</p></td>
   </tr>
</table>
<h2 id="Configure-credentials" class="common-anchor-header">配置证书<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 必须知道您的 SiliconFlow API 密钥，才能请求嵌入。Milvus 提供两种配置凭据的方法：</p>
<ul>
<li><p><strong>配置文件（推荐）：</strong>将 API 密钥存储在<code translate="no">milvus.yaml</code> 中，这样每次重启和节点都会自动获取它。</p></li>
<li><p><strong>环境变量：</strong>在部署时注入密钥--最适合 Docker Compose。</p></li>
</ul>
<p>从以下两种方法中选择一种--配置文件在裸机和虚拟机上更易于维护，而环境变量方法适合容器工作流。</p>
<div class="alert note">
<p>如果同一提供商的 API 密钥同时存在于配置文件和环境变量中，Milvus 将始终使用<code translate="no">milvus.yaml</code> 中的值，而忽略环境变量。</p>
</div>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">选项 1：配置文件</h3><p>将 API 密钥保存在<code translate="no">milvus.yaml</code> 中；Milvus 会在启动时读取它们，并覆盖同一提供商的任何环境变量。</p>
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
<li><p><strong>告诉 Milvus 调用服务时使用哪个密钥</strong></p>
<p>在同一文件中，将 SiliconFlow 提供程序指向您希望它使用的标签。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">siliconflow:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://api.siliconflow.cn/v1/embeddings   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>这样，Milvus 向 OpenAI Embeddings 端点发送的每个请求都会绑定特定密钥。</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">方案 2：环境变量</h3><p>当您使用 Docker Compose 运行 Milvus，并希望不对文件和映像保密时，请使用这种方法。</p>
<p>只有在<code translate="no">milvus.yaml</code> 中找不到提供程序的密钥时，Milvus 才会使用环境变量。</p>
<table>
   <tr>
     <th><p>变量</p></th>
     <th><p>需要</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_SILICONFLOW_API_KEY</code></p></td>
     <td><p>是</p></td>
     <td><p>有效的 SiliconFlow API 密钥。</p></td>
   </tr>
</table>
<p>在<strong>docker-compose.yaml</strong>文件中，设置<code translate="no">MILVUSAI_SILICONFLOW_API_KEY</code> 环境变量。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the SiliconFlow API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_SILICONFLOW_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_SILICONFLOW_API_KEY&gt;</span>
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
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">第 2 步：向 Schema 添加嵌入函数</h3><p>Milvus 中的 Function 模块会自动将标量字段中存储的原始数据转换为嵌入数据，并将其存储到明确定义的向量字段中。</p>
<p>下面的示例添加了一个 Function 模块 (<code translate="no">siliconflow_embedding</code>)，该模块将标量域<code translate="no">&quot;document&quot;</code> 转换为嵌入，将得到的向量存储到之前定义的<code translate="no">&quot;dense&quot;</code> 向量域中。</p>
<p>定义好嵌入函数后，将其添加到 Collections Schema 中。这将指示 Milvus 使用指定的嵌入函数来处理和存储文本数据中的嵌入。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for embedding model provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;siliconflow_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                      <span class="hljs-comment"># Provider-specific embedding parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;siliconflow&quot;</span>,                <span class="hljs-comment"># Must be set to &quot;siliconflow&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span>,    <span class="hljs-comment"># Specifies the SiliconFlow embedding model to use</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,          # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;url&quot;: &quot;https://api.siliconflow.cn/v1/embeddings&quot;,  # Defaults to the official endpoint if omitted</span>
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
    </button></h2><p>配置好嵌入函数后，请参阅 "<a href="/docs/zh/embedding-function-overview.md">功能概述</a>"，了解有关索引配置、数据插入示例和语义搜索操作的更多指导。</p>
