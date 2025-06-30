---
id: hugging-face-tei.md
title: Hugging Face TEICompatible with Milvus 2.6.x
summary: >-
  Hugging Face 文本嵌入推理（TEI）是专为文本嵌入模型设计的高性能推理服务器。本指南介绍如何将 Hugging Face TEI 与
  Milvus 结合使用，以高效生成文本嵌入。
beta: Milvus 2.6.x
---
<h1 id="Hugging-Face-TEI" class="common-anchor-header">Hugging Face TEI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Hugging-Face-TEI" class="anchor-icon" translate="no">
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
    </button></h1><p>Hugging Face<a href="https://huggingface.co/docs/text-embeddings-inference/en/index">文本嵌入推理（TEI）</a>是专为文本嵌入模型设计的高性能推理服务器。本指南介绍了如何将 Hugging Face TEI 与 Milvus 结合使用，以高效生成文本嵌入。</p>
<p>TEI 可与 Hugging Face Hub 的许多文本嵌入模型配合使用，包括</p>
<ul>
<li><p>BAAI/bge-* 系列</p></li>
<li><p>Sentence-transformers/* 系列</p></li>
<li><p>E5 模型</p></li>
<li><p>GTE 模型</p></li>
<li><p>以及更多</p></li>
</ul>
<div class="alert note">
<p>有关支持模型的最新列表，请参阅<a href="https://github.com/huggingface/text-embeddings-inference">TEI GitHub 存储库</a>和<a href="https://huggingface.co/models?pipeline_tag=text-embedding">Hugging Face 中枢</a>。</p>
</div>
<h2 id="TEI-deployment" class="common-anchor-header">TEI 部署<button data-href="#TEI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>在为 Milvus 配置 TEI 功能之前，您需要有一个正在运行的 TEI 服务。Milvus 支持两种 TEI 部署方法：</p>
<h3 id="Standard-deployment-external" class="common-anchor-header">标准部署（外部）</h3><p>您可以使用来自 Hugging Face 的官方方法，将 TEI 作为独立服务进行部署。这种方法为您的 TEI 服务提供了最大的灵活性和控制权。</p>
<p>有关使用 Docker 或其他方法部署 TEI 的详细说明，请参阅<a href="https://huggingface.co/docs/text-embeddings-inference/en/quick_tour#deploy">Hugging Face Text Embeddings Inference 官方文档</a>。</p>
<p>部署完成后，请记下您的 TEI 服务端点（如<code translate="no">http://localhost:8080</code> ），因为<a href="/docs/zh/hugging-face-tei.md#Use-embedding-function-">在 Milvus 中使用 TEI 功能</a>时会用到它。</p>
<h3 id="Milvus-Helm-Chart-deployment-integrated" class="common-anchor-header">Milvus Helm 图表部署（已集成）</h3><p>对于 Kubernetes 环境，Milvus 通过其 Helm 图表提供了集成部署选项。这通过与 Milvus 一起部署和配置 TEI 简化了流程。</p>
<p>在 Milvus Helm 部署中启用 TEI：</p>
<ol>
<li><p>配置<strong>values.yaml</strong>以启用 TEI：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">tei:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">image:</span>
    <span class="hljs-attr">repository:</span> <span class="hljs-string">ghcr.io/huggingface/text-embeddings-inference</span>
    <span class="hljs-attr">tag:</span> <span class="hljs-string">&quot;1.7&quot;</span> <span class="hljs-comment"># Modify based on hardware</span>
  <span class="hljs-attr">model:</span> <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span> <span class="hljs-comment"># Modify based on requirements</span>
  <span class="hljs-comment"># revision: &quot;main&quot;</span>
  <span class="hljs-comment"># hfTokenSecretName: &quot;my-huggingface-token-secret&quot;</span>
  <span class="hljs-comment"># apiKey: &quot;your_secure_api_key&quot;</span>
  <span class="hljs-comment"># apiKeySecret:</span>
  <span class="hljs-comment">#   name: &quot;my-tei-api-key-secret&quot;</span>
  <span class="hljs-comment">#   key: &quot;api-key&quot;</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;2&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;8Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
  <span class="hljs-attr">extraArgs:</span> []

<button class="copy-code-btn"></button></code></pre></li>
<li><p>部署或升级 Milvus：</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<span class="hljs-comment"># or</span>
helm upgrade my-release milvus/milvus -f values.yaml --reset-then-reuse-values -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>使用 Helm 图表部署时，TEI 服务将可在 Kubernetes 集群中访问<code translate="no">http://my-release-milvus-tei:80</code> （使用您的版本名称）。在 TEI 功能配置中将其用作端点。</p>
<p></div></p></li>
</ol>
<h2 id="Configuration-in-Milvus" class="common-anchor-header">在 Milvus 中配置<button data-href="#Configuration-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>部署 TEI 服务后，您需要在定义 TEI Embeddings 功能时提供其端点。在大多数情况下，不需要额外的配置，因为 TEI 在 Milvus 中是默认启用的。</p>
<p>不过，如果您的 TEI 服务在部署时使用了 API 密钥验证 (<code translate="no">--api-key</code> 标志)，则需要配置 Milvus 以使用此密钥：</p>
<ol>
<li><p><strong>在<code translate="no">credential</code> 部分定义 API 密钥：</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">tei_key:</span>  <span class="hljs-comment"># You can use any label name</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_TEI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>在 milvus.yaml 中引用凭证：</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">tei:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">tei_key</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># enabled by default. no action required.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Use-embedding-function" class="common-anchor-header">使用 Embeddings 函数<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>配置 TEI 服务后，请按照以下步骤定义和使用嵌入函数。</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">步骤 1：定义 Schema 字段</h3><p>要使用嵌入函数，请创建一个具有特定 Schema 的 Collections。此 Schema 必须至少包含三个必要字段：</p>
<ul>
<li><p>主字段，用于唯一标识 Collections 中的每个实体。</p></li>
<li><p>标量字段，用于存储要嵌入的原始数据。</p></li>
<li><p>一个向量字段，用于存储函数将为标量字段生成的向量嵌入。</p></li>
</ul>
<p>下面的示例定义了一个 Schema 模式，其中一个标量字段<code translate="no">&quot;document&quot;</code> 用于存储文本数据，一个向量字段<code translate="no">&quot;dense_vector&quot;</code> 用于存储将由函数模块生成的嵌入。切记要设置向量维数 (<code translate="no">dim</code>) 以匹配所选嵌入模型的输出。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to exactly match the TEI model&#x27;s output dimension</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">第 2 步：向 Schema 添加嵌入函数</h3><p>Milvus 中的 Function 模块会自动将标量字段中存储的原始数据转换为嵌入数据，并将其存储到明确定义的向量字段中。</p>
<p>下面的示例添加了一个 Function 模块 (<code translate="no">tei_func</code>)，该模块将标量域<code translate="no">&quot;document&quot;</code> 转换为嵌入，将得到的向量存储到之前定义的<code translate="no">&quot;dense_vector&quot;</code> 向量域中。</p>
<p>定义好嵌入函数后，将其添加到 Collections Schema 中。这将指示 Milvus 使用指定的嵌入函数来处理和存储文本数据的嵌入。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define TEI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;tei_func&quot;</span>,                            <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># TEI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;TEI&quot;</span>,                      <span class="hljs-comment"># Must be set to &quot;TEI&quot;</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://your-tei-service-endpoint:80&quot;</span>, <span class="hljs-comment"># Required: Points to your TEI service address</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;truncate&quot;: &quot;true&quot;,                   # Optional: Whether to truncate long input (default false)</span>
        <span class="hljs-comment"># &quot;truncation_direction&quot;: &quot;right&quot;,      # Optional: Truncation direction (default right)</span>
        <span class="hljs-comment"># &quot;max_client_batch_size&quot;: 64,          # Optional: Client max batch size (default 32)</span>
        <span class="hljs-comment"># &quot;ingestion_prompt&quot;: &quot;passage: &quot;,      # Optional: (Advanced) Ingestion phase prompt</span>
        <span class="hljs-comment"># &quot;search_prompt&quot;: &quot;query: &quot;            # Optional: (Advanced) Search phase prompt</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>参数</strong></p></th>
     <th><p><strong>需要吗？</strong></p></th>
     <th><p><strong>描述</strong></p></th>
     <th><p><strong>示例值</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>是</p></td>
     <td><p>Embeddings 模型提供者。设置为 "TEI"。</p></td>
     <td><p>"TEI</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">endpoint</code></p></td>
     <td><p>是</p></td>
     <td><p>指向已部署 TEI 服务的网络地址。如果通过 Milvus Helm Chart 部署，这通常是内部服务地址。</p></td>
     <td><p>"http://localhost:8080"、"http://my-release-milvus-tei:80"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncate</code></p></td>
     <td><p>否</p></td>
     <td><p>是否截断超过模型最大长度的输入文本。默认为假。</p></td>
     <td><p>真</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation_direction</code></p></td>
     <td><p>否</p></td>
     <td><p>截断为 true 时有效。指定从左侧还是右侧截断。默认为右侧。</p></td>
     <td><p>"左"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>无</p></td>
     <td><p>Milvus 客户端发送到 TEI 的最大批量大小。默认为 32。</p></td>
     <td><p>64</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">prompt_name</code></p></td>
     <td><p>否</p></td>
     <td><p>(高级）指定 Sentence Transformers 配置提示字典中的键。用于某些需要特定提示格式的模型。TEI 支持可能有限，并取决于 Hub 上的模型配置。</p></td>
     <td><p>"your_prompt_key</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ingestion_prompt</code></p></td>
     <td><p>无</p></td>
     <td><p>(高级）指定在数据插入（摄取）阶段使用的提示。取决于所使用的 TEI 模型；模型必须支持提示。</p></td>
     <td><p>"passage："</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_prompt</code></p></td>
     <td><p>无</p></td>
     <td><p>(高级）指定在搜索阶段使用的提示。取决于所使用的 TEI 模型；模型必须支持提示。</p></td>
     <td><p>查询"</p></td>
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
    </button></h2><p>配置完 Embeddings 功能后，请参阅功能<a href="/docs/zh/embedding-function-overview.md">概述</a>，了解有关索引配置、数据插入示例和语义搜索操作的其他指导。</p>
