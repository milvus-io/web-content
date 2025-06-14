---
id: embedding-function-overview.md
title: 嵌入函数概述Compatible with Milvus 2.6.x
summary: >-
  通过 Milvus 的 Function 模块，您可以自动调用外部模型提供商（如 OpenAI、AWS Bedrock、Google Vertex AI
  等），将原始文本数据转换为向量嵌入。有了 Function 模块，您就不再需要手动与嵌入式 API 接口--Milvus
  会处理向提供商发送请求、接收嵌入式数据并将其存储到您的 Collections
  中的整个过程。对于语义搜索，您只需要提供原始查询数据，而不需要查询向量。Milvus
  使用与您用于摄取的相同模型生成查询向量，将其与存储的向量进行比较，并返回最相关的结果。
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">嵌入函数概述<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 的 Function 模块允许您通过自动调用外部模型提供商（如 OpenAI、AWS Bedrock、Google Vertex AI 等）将原始文本数据转换为向量嵌入。有了 Function 模块，您就不再需要手动与嵌入式 API 接口--Milvus 会处理向提供商发送请求、接收嵌入式数据并将其存储到您的 Collections 中的整个过程。对于语义搜索，您只需要提供原始查询数据，而不需要查询向量。Milvus 使用与您用于接收的相同模型生成查询向量，将其与存储的向量进行比较，并返回最相关的结果。</p>
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
<li><p>功能模块嵌入的任何输入字段必须始终包含一个值；如果提供的是空值，模块会出错。</p></li>
<li><p>Function 模块只处理 Collections Schema 中明确定义的字段；不会生成动态字段的嵌入。</p></li>
<li><p>要嵌入的输入字段必须是<code translate="no">VARCHAR</code> 类型。</p></li>
<li><p>Function 模块可将输入字段嵌入到以下地址：</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>不支持转换为<code translate="no">BINARY_VECTOR</code> 、<code translate="no">FLOAT16_VECTOR</code> 或<code translate="no">BFLOAT16_VECTOR</code> 。</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Function 模块通过调用您选择的外部模型提供者，将原始文本转换为向量嵌入。不同的模型提供程序支持不同的模型、嵌入格式和验证方法，下面将一一概述。</p>
<h3 id="Supported-model-providers" class="common-anchor-header">支持的模型提供程序</h3><table>
   <tr>
     <th><p>提供商</p></th>
     <th><p>典型模型</p></th>
     <th><p>嵌入类型</p></th>
     <th><p>验证方法</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/openai.md">OpenAI</a></p></td>
     <td><p>文本嵌入-3-*</p></td>
     <td><p>密集 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 密钥</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>基于部署</p></td>
     <td><p>密集型 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 密钥</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/dashscope.md">DashScope</a></p></td>
     <td><p>text-embedding-v3</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 密钥</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/bedrock.md">床岩</a></p></td>
     <td><p>亚马逊.Titan-embed-text-v2</p></td>
     <td><p>密 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>AK/SK 对</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/vertex-ai.md">顶点 AI</a></p></td>
     <td><p>text-embedding-005</p></td>
     <td><p>密集 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>GCP 服务帐户 JSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/voyage-ai.md">Voyage AI</a></p></td>
     <td><p>Voyage-3, voyage-lite-02</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code> /<code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>API 密钥</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code> /<code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>API 密钥</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>密集 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 密钥</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/hugging-face-tei.md">Hugging Face</a></p></td>
     <td><p>任何 TEI 服务的模型</p></td>
     <td><p>密集 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>可选的 API 密钥</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">工作流程</h3><p>下图显示了该功能在 Milvus 中的工作原理。</p>
<ol>
<li><p><strong>输入文本</strong>：用户将原始数据（如文档）插入 Milvus。</p></li>
<li><p><strong>生成 Embeddings</strong>：Milvus 中的 Function 模块会自动调用配置的模型提供程序，将原始数据转换为向量嵌入。</p></li>
<li><p><strong>存储嵌入</strong>：生成的嵌入会存储在 Milvus Collections 中明确定义的向量字段中。</p></li>
<li><p><strong>查询文本</strong>：用户向 Milvus 提交文本查询。</p></li>
<li><p><strong>语义搜索</strong>：Milvus 在内部将查询转换为向量嵌入，根据存储的嵌入进行相似性搜索，并检索相关结果。</p></li>
<li><p><strong>返回结果</strong>：Milvus 向应用程序返回匹配度最高的结果。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>嵌入功能概述</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">凭证管理</h3><p>连接到外部 Embeddings API 需要验证凭证（API 密钥或访问/保密密钥对）。在应用程序代码中暴露这些凭证会产生安全风险。Milvus 通过在 Milvus 配置文件 (<code translate="no">milvus.yaml</code>) 中安全地存储凭据来解决这个问题。</p>
<ol>
<li><p><strong>添加凭据</strong>：在顶层<code translate="no">credential:</code> 块下，给每个凭据一个唯一的标签；然后在<code translate="no">function:</code> 块中指向该标签。</p></li>
<li><p><strong>服务器加载配置</strong>：Milvus 会读取 YAML 文件，在内存中缓存原始密钥，并只记住它们的标签（如<code translate="no">apikey1</code> ）。</p></li>
<li><p><strong>调用函数</strong>：可选择指定<code translate="no">credential</code> 参数。</p>
<ul>
<li><p>如果在定义函数时提供了证书名称，Milvus 将使用指定的证书。</p></li>
<li><p>如果省略参数，Milvus 会自动退回到<code translate="no">milvus.yaml</code> 中为该模型提供者配置的凭据。</p>
<p>无论哪种方式，秘钥都不会离开服务器。</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>凭据配置溢出</span> </span></p>
<div class="alert note">
<p>如果使用 Docker Compose 部署 Milvus，也可以通过环境变量注入相同的字段。有关变量的确切名称，请参阅特定提供商指南。</p>
</div>
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
    </button></h2><p>在使用 Milvus 的 Embeddings 功能之前，请配置访问凭据。</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">步骤 1：在 Milvus 配置中添加凭据</h3><p>在<code translate="no">milvus.yaml</code> 文件中，编辑<code translate="no">credential</code> 块，为需要访问的每个提供商添加条目：</p>
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
<table>
   <tr>
     <th><p>提供商类型</p></th>
     <th><p>必填字段</p></th>
     <th><p>配置示例</p></th>
   </tr>
   <tr>
     <td><p>AK/SK 对（AWS Bedrock）</p></td>
     <td><p><code translate="no">access_key_id</code>,<code translate="no">secret_access_key</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     aksk1:    # custom label
         access_key_id: &lt;YOUR_AK&gt;
         secret_access_key: &lt;YOUR_SK&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>基于 API 的密钥（OpenAI、Voyage AI 等）</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>GCP 服务帐户 JSON（Vertex AI）</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">第 2 步：配置提供商设置</h3><p>在同一个配置文件中，编辑<code translate="no">function</code> 块，告诉 Milvus 使用哪个密钥嵌入服务调用：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关如何应用 Milvus 配置的更多信息，请参阅《<a href="/docs/zh/dynamic_config.md">动态配置 Milvus</a>》。</p>
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
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">步骤 1：定义 Schema 字段</h3><p>要使用嵌入功能，请创建具有特定 Schema 的 Collections。此 Schema 必须至少包含三个必要字段：</p>
<ul>
<li><p>主字段，用于唯一标识 Collections 中的每个实体。</p></li>
<li><p>标量字段，用于存储要嵌入的原始数据。</p></li>
<li><p>一个向量字段，用于存储函数将为标量字段生成的向量嵌入。</p></li>
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
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
<span class="hljs-comment"># For sparse vector, data type must be SPARSE_FLOAT_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">第 2 步：向 Schema 添加嵌入函数</h3><p>Milvus 中的 Function 模块会自动将标量字段中存储的原始数据转换为嵌入数据，并将其存储到明确定义的向量字段中。</p>
<p>下面的示例添加了一个 Function 模块 (<code translate="no">openai_embedding</code>)，该模块将标量域<code translate="no">&quot;document&quot;</code> 转换为嵌入，将得到的向量存储到之前定义的<code translate="no">&quot;dense&quot;</code> 向量域中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,                    # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optionally shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>示例值</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>嵌入函数在 Milvus 中的唯一标识符。</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>使用的嵌入函数类型。可能的值：</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>:生成密集向量，捕捉文本中的语义。</p></li>
<li><p><code translate="no">FunctionType.BM25</code>:根据 BM25 排序算法生成稀疏向量，该算法使用术语频率和反向文档频率计算相关性得分。更多信息，请参阅<a href="/docs/zh/full-text-search.md">全文搜索</a>。</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>包含要嵌入的原始数据的标量字段。目前，该参数只接受一个字段名称。</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>向量字段，用于存储生成的 Embeddings。目前，该参数只接受一个字段名称。</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>包含嵌入配置的字典。注：<code translate="no">params</code> 中的参数因嵌入模型提供者而异。</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>嵌入模型提供者。</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>指定要使用的嵌入模型。</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p><code translate="no">milvus.yaml</code> 顶层<code translate="no">credential:</code> 部分定义的凭证标签。 </p>
<ul>
<li><p>提供时，Milvus 会检索匹配的密钥对或 API 令牌，并在服务器端签署请求。</p></li>
<li><p>省略时（<code translate="no">None</code> ），Milvus 会退回到<code translate="no">milvus.yaml</code> 中为目标模型提供者明确配置的凭据。</p></li>
<li><p>如果标签未知或引用的密钥丢失，则调用失败。</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>输出嵌入的维数。对于 OpenAI 的第三代模型，您可以缩短全向量以降低成本和延迟，同时不会损失大量语义信息。更多信息，请参阅<a href="https://openai.com/blog/new-embedding-models-and-api-updates">OpenAI 公告博文</a>。<strong>注意：</strong>如果您缩短了向量维度，请确保 Schema 的<code translate="no">add_field</code> 方法中为向量字段指定的<code translate="no">dim</code> 值与您的嵌入函数的最终输出维度相匹配。</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>用于跟踪 API 使用情况的用户级标识符。</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>对于具有多个需要进行文本到向量转换的标量字段的 Collections，请在 Collections Schema 中添加单独的函数，确保每个函数都有唯一的名称和<code translate="no">output_field_names</code> 值。</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">第 3 步：配置索引</h3><p>在定义了包含必要字段和内置函数的 Schema 后，请为您的 Collection 设置索引。为简化这一过程，请使用<code translate="no">AUTOINDEX</code> 作为<code translate="no">index_type</code> ，该选项允许 Milvus 根据数据结构选择和配置最合适的索引类型。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">第 4 步：创建 Collections</h3><p>现在使用定义的 Schema 和索引参数创建 Collections。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">第 5 步：插入数据</h3><p>设置好集合和索引后，就可以插入原始数据了。在此过程中，您只需提供原始文本。我们之前定义的 Function 模块会为每个文本条目自动生成相应的稀疏向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">第 6 步：执行向量搜索</h3><p>插入数据后，使用原始查询文本执行语义搜索。Milvus 会自动将你的查询转换成 Embeddings 向量，根据相似度检索相关文档，并返回匹配度最高的结果。</p>
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
<p>有关搜索和查询操作的更多信息，请参阅<a href="/docs/zh/single-vector-search.md">基本向量搜索</a>和<a href="/docs/zh/get-and-scalar-query.md">查询</a>。</p>
