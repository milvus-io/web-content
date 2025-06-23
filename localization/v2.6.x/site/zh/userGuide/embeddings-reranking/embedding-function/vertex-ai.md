---
id: vertex-ai.md
title: 顶点人工智能Compatible with Milvus 2.6.x
summary: >-
  Google Cloud Vertex AI 是专为文本嵌入模型设计的高性能服务。本指南介绍如何将 Google Cloud Vertex AI 与
  Milvus 结合使用，实现高效的文本嵌入生成。
beta: Milvus 2.6.x
---
<h1 id="Vertex-AI" class="common-anchor-header">顶点人工智能<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Vertex-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Google Cloud<a href="https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings">Vertex AI</a>是专为文本嵌入模型设计的高性能服务。本指南介绍如何将 Google Cloud Vertex AI 与 Milvus 结合使用，高效生成文本嵌入。</p>
<p>Vertex AI 支持多种嵌入模型，适用于不同的使用案例：</p>
<ul>
<li><p>gemini-embedding-001 （在英语、多语种和代码任务中的一流性能）</p></li>
<li><p>text-embedding-005（最新文本嵌入模型）</p></li>
<li><p>text-multilingual-embedding-002（最新的多语言文本嵌入模型）</p></li>
</ul>
<p>更多信息，请参阅<a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">Vertex AI 文本嵌入模型</a>。</p>
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
    </button></h2><p>在配置 Vertex AI 之前，请确保满足以下要求：</p>
<ul>
<li><p><strong>运行 Milvus 2.6 或更高版本</strong>- 确认您的部署满足最低版本要求。</p></li>
<li><p><strong>创建 Google 云服务帐户</strong>- 至少，您可能需要 "Vertex AI 用户 "等角色或其他更具体的角色。有关详细信息，请参阅<a href="https://cloud.google.com/iam/docs/service-accounts-create?_gl=1*1jz33xw*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDIyOTEkajE0JGwwJGgw">创建服务帐户</a>。</p></li>
<li><p><strong>下载服务帐户的 JSON 密钥文件</strong>- 将此凭证文件安全地存储在服务器或本地计算机上。有关详情，请参阅<a href="https://cloud.google.com/iam/docs/keys-create-delete?_gl=1*ittbs8*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDI0NjMkajYwJGwwJGgw#creating">创建服务帐户密钥</a>。</p></li>
</ul>
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
    </button></h2><p>在 Milvus 调用顶点人工智能之前，它需要访问你的 GCP 服务账户 JSON 密钥。我们支持两种方法，请根据您的部署和操作符选择其中一种。</p>
<table>
   <tr>
     <th><p>选项</p></th>
     <th><p>优先级</p></th>
     <th><p>最适合</p></th>
   </tr>
   <tr>
     <td><p>配置文件 (<code translate="no">milvus.yaml</code>)</p></td>
     <td><p>高</p></td>
     <td><p>全群集、持久设置</p></td>
   </tr>
   <tr>
     <td><p>环境变量 (<code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>)</p></td>
     <td><p>低</p></td>
     <td><p>容器工作流程、快速测试</p></td>
   </tr>
</table>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">选项 1：配置文件（推荐且优先级更高）</h3><p>Milvus 总是优先选择在<code translate="no">milvus.yaml</code> 中声明的凭据，而不是同一提供商的任何环境变量。</p>
<ol>
<li><p>对 JSON 密钥进行 Base64 编码</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> credentials.json | jq . | <span class="hljs-built_in">base64</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>在<code translate="no">milvus.yaml</code></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp_vertex:</span>                      <span class="hljs-comment"># arbitrary label</span>
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">|
      &lt;YOUR_BASE64_ENCODED_JSON&gt;
</span><button class="copy-code-btn"></button></code></pre></li>
<li><p>将证书绑定到顶点 AI 提供商</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp_vertex</span>      <span class="hljs-comment"># must match the label above</span>
        <span class="hljs-attr">url:</span> <span class="hljs-string">&lt;optional:</span> <span class="hljs-string">custom</span> <span class="hljs-string">Vertex</span> <span class="hljs-string">AI</span> <span class="hljs-string">endpoint&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>如果以后需要轮换密钥，只需更新<code translate="no">credential_json</code> 下的 Base64 字符串，然后重启 Milvus--无需更改环境或容器。</p>
<p></div></p></li>
</ol>
<h3 id="Option-2-Environment-variables" class="common-anchor-header">选项 2：环境变量</h3><p>如果喜欢在部署时注入秘密，请使用此方法。只有当<code translate="no">milvus.yaml</code> 中不存在匹配的条目时，Milvus 才会使用环境变量。</p>
<div class="alert note">
<p>配置步骤取决于 Milvus 的部署模式（独立集群与分布式集群）和协调平台（Docker Compose 与 Kubernetes）。</p>
</div>
<div class="filter">
 <a href="#docker">Docker Compose</a>Helm</div>
<div class="filter-docker">
<div class="alert note">
<p>要获取 Milvus 配置文件<strong>（docker-compose.yaml</strong>），请参阅<a href="/docs/zh/v2.6.x/configure-docker.md#Download-an-installation-file">下载安装文件</a>。</p>
</div>
<ol>
<li><p><strong>将密钥挂载到容器中</strong></p>
<p>编辑<code translate="no">docker-compose.yaml</code> 文件，加入凭证卷映射：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-comment"># Map host credential file to container path</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>
<button class="copy-code-btn"></button></code></pre>
<p>在前面的配置中：</p>
<ul>
<li><p>使用绝对路径进行可靠的文件访问 (<code translate="no">/home/user/credentials.json</code> 而不是<code translate="no">~/credentials.json</code>)</p></li>
<li><p>容器路径必须以<code translate="no">.json</code> 扩展名结尾</p></li>
<li><p><code translate="no">:ro</code> 标志确保只读访问的安全性</p></li>
</ul></li>
<li><p><strong>设置环境变量</strong></p>
<p>在同一<code translate="no">docker-compose.yaml</code> 文件中，添加指向凭证路径的环境变量：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-comment"># Essential for Vertex AI authentication</span>
      <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>应用更改</strong></p>
<p>重启 Milvus 容器，激活配置：</p>
<pre><code translate="no" class="language-bash">docker-compose down &amp;&amp; docker-compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<div class="filter-helm">
<div class="alert note">
<p>要获取你的 Milvus 配置文件<strong>（values.yaml</strong>），请参阅<a href="/docs/zh/v2.6.x/configure-helm.md#Configure-Milvus-via-configuration-file">通过配置文件配置 Milvus</a>。</p>
</div>
<ol>
<li><p><strong>创建 Kubernetes 密钥</strong></p>
<p>在控制机器（配置<strong>kubectl</strong>的地方）上执行此命令：</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic vertex-ai-secret \
  --from-file=credentials.json=/path/to/your/credentials.json \
  -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>在前面的命令中</p>
<ul>
<li><p><code translate="no">vertex-ai-secret</code>:秘密名称（可定制）</p></li>
<li><p><code translate="no">/path/to/your/credentials.json</code>:GCP 证书文件的本地文件名</p></li>
<li><p><code translate="no">&lt;your-milvus-namespace&gt;</code>:托管 Milvus 的 Kubernetes 命名空间</p></li>
</ul></li>
<li><p><strong>配置 Helm 值</strong></p>
<p>根据部署类型更新<code translate="no">values.yaml</code> ：</p>
<ul>
<li><p><strong>独立部署</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">extraEnv:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Container path</span>
  
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>  <span class="hljs-comment"># Must match Step 1</span>
  
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Must match extraEnv value</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>  <span class="hljs-comment"># Must match secret key name</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>分布式部署（添加到每个组件）</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">extraEnv:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
  <span class="hljs-attr">volumes:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>

<span class="hljs-comment"># Repeat same configuration for dataNode, etc.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
<li><p><strong>应用 Helm 配置</strong></p>
<p>将更新的配置部署到群集：</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
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
    </button></h2><p>Vertex AI 配置完成后，请按照以下步骤定义和使用嵌入函数。</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">步骤 1：定义 Schema 字段</h3><p>要使用嵌入功能，请创建一个具有特定 Schema 的 Collections。此 Schema 必须至少包含三个必要字段：</p>
<ul>
<li><p>主字段，用于唯一标识 Collections 中的每个实体。</p></li>
<li><p>标量字段，用于存储要嵌入的原始数据。</p></li>
<li><p>一个向量字段，用于存储函数将为标量字段生成的向量嵌入。</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the output dimension of the model and parameters</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">步骤 2：向 Schema 添加嵌入函数</h3><p>Milvus 中的函数模块会自动将标量字段中存储的原始数据转换为嵌入数据，并将其存储到明确定义的向量字段中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define Vertex AI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;vert_func&quot;</span>,                           <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># Vertex AI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vertexai&quot;</span>,                 <span class="hljs-comment"># Must be set to &quot;vertexai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-005&quot;</span>,     <span class="hljs-comment"># Required: Specifies the Vertex AI model to use</span>
        <span class="hljs-string">&quot;projectid&quot;</span>: <span class="hljs-string">&quot;your-gcp-project-id&quot;</span>,     <span class="hljs-comment"># Required: Your Google Cloud project ID</span>
        <span class="hljs-comment"># Optional parameters (include these only if necessary):</span>
        <span class="hljs-comment"># &quot;location&quot;: &quot;us-central1&quot;,            # Optional: Vertex AI service region (default us-central1)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;DOC_RETRIEVAL&quot;,              # Optional: Embedding task type (default DOC_RETRIEVAL)</span>
        <span class="hljs-comment"># &quot;dim&quot;: 768                            # Optional: Output vector dimension (1-768)</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>参数</strong></p></th>
     <th><p><strong>描述</strong></p></th>
     <th><p><strong>是否需要？</strong></p></th>
     <th><p><strong>示例值</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Embeddings 模型提供者。设为 "vertexai"。</p></td>
     <td><p>是</p></td>
     <td><p><code translate="no">"vertexai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>指定要使用的 Vertex AI 嵌入模型。</p></td>
     <td><p>是</p></td>
     <td><p><code translate="no">"text-embedding-005"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">projectid</code></p></td>
     <td><p>您的 Google 云项目 ID。</p></td>
     <td><p>是</p></td>
     <td><p><code translate="no">"your-gcp-project-id"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">location</code></p></td>
     <td><p>Vertex AI 服务的区域。目前，Vertex AI 嵌入主要支持 us-central1。默认为 us-central1。</p></td>
     <td><p>不支持</p></td>
     <td><p><code translate="no">"us-central1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">task</code></p></td>
     <td><p>指定嵌入任务类型，影响嵌入结果。可接受的值：DOC_RETRIEVAL（默认）、CODE_RETRIEVAL（仅支持 005）、STS（语义文本相似性）。</p></td>
     <td><p>不支持</p></td>
     <td><p><code translate="no">"DOC_RETRIEVAL"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>输出嵌入向量的维度。接受 1 到 768 之间的整数。<strong>注意：</strong>如果指定，请确保 Schema 中向量字段的维数与此值相匹配。</p></td>
     <td><p>无</p></td>
     <td><p><code translate="no">768</code></p></td>
   </tr>
</table>
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
    </button></h2><p>配置完 Embeddings 功能后，请参阅功能<a href="/docs/zh/v2.6.x/embeddings.md">概述</a>，了解有关索引配置、数据插入示例和语义搜索操作的其他指导。</p>
