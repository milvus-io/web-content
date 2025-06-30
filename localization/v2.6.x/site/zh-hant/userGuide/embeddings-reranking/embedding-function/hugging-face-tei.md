---
id: hugging-face-tei.md
title: 抱抱臉 TEICompatible with Milvus 2.6.x
summary: >-
  Hugging Face Text Embeddings Inference (TEI) 是專為文字嵌入模型設計的高效能推論伺服器。本指南說明如何使用
  Hugging Face TEI 與 Milvus 進行高效率的文字嵌入產生。
beta: Milvus 2.6.x
---
<h1 id="Hugging-Face-TEI" class="common-anchor-header">抱抱臉 TEI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Hugging-Face-TEI" class="anchor-icon" translate="no">
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
    </button></h1><p>Hugging Face<a href="https://huggingface.co/docs/text-embeddings-inference/en/index">Text Embeddings Inference (TEI)</a>是專為文字嵌入模型設計的高效能推論伺服器。本指南說明如何使用 Hugging Face TEI 與 Milvus 進行高效率的文字嵌入產生。</p>
<p>TEI 可與 Hugging Face Hub 的許多文字內嵌模型搭配使用，包括</p>
<ul>
<li><p>BAAI/bge-* 系列</p></li>
<li><p>sentence-transformers/* 系列</p></li>
<li><p>E5 模型</p></li>
<li><p>GTE 模型</p></li>
<li><p>以及更多</p></li>
</ul>
<div class="alert note">
<p>如需支援機型的最新清單，請參閱<a href="https://github.com/huggingface/text-embeddings-inference">TEI GitHub 套件庫</a>和<a href="https://huggingface.co/models?pipeline_tag=text-embedding">Hugging Face Hub</a>。</p>
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
    </button></h2><p>在設定 Milvus 的 TEI 功能之前，您需要有一個執行中的 TEI 服務。Milvus 支援兩種 TEI 部署方式：</p>
<h3 id="Standard-deployment-external" class="common-anchor-header">標準部署 (外部)</h3><p>您可以使用 Hugging Face 的官方方法，將 TEI 部署為獨立的服務。此方法可讓您對 TEI 服務擁有最大的彈性與控制。</p>
<p>有關使用 Docker 或其他方法部署 TEI 的詳細說明，請參閱<a href="https://huggingface.co/docs/text-embeddings-inference/en/quick_tour#deploy">Hugging Face Text Embeddings Inference 官方文件</a>。</p>
<p>部署完成後，請記下您的 TEI 服務端點 (例如：<code translate="no">http://localhost:8080</code>)，因為您<a href="/docs/zh-hant/hugging-face-tei.md#Use-embedding-function-">在 Milvus 中使用 TEI 功能</a>時會需要它。</p>
<h3 id="Milvus-Helm-Chart-deployment-integrated" class="common-anchor-header">Milvus Helm Chart 部署 (整合)</h3><p>對於 Kubernetes 環境，Milvus 透過其 Helm 圖表提供整合式部署選項。這簡化了在 Milvus 旁邊部署和設定 TEI 的流程。</p>
<p>若要在您的 Milvus Helm 部署中啟用 TEI，請</p>
<ol>
<li><p>設定<strong>values.yaml</strong>以啟用 TEI：</p>
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
<li><p>部署或升級 Milvus：</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<span class="hljs-comment"># or</span>
helm upgrade my-release milvus/milvus -f values.yaml --reset-then-reuse-values -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>使用 Helm 圖表部署時，TEI 服務將可在您的 Kubernetes 叢集中存取，網址為<code translate="no">http://my-release-milvus-tei:80</code> (使用您的發行版名稱)。在 TEI 功能組態中使用此作為您的端點。</p>
<p></div></p></li>
</ol>
<h2 id="Configuration-in-Milvus" class="common-anchor-header">在 Milvus 中進行組態<button data-href="#Configuration-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>部署 TEI 服務後，您需要在定義 TEI 嵌入函式時提供其端點。在大多數情況下，不需要額外的設定，因為在 Milvus 中 TEI 是預設啟用的。</p>
<p>然而，如果您的 TEI 服務是以 API 金鑰驗證 (<code translate="no">--api-key</code> flag) 部署的，您就需要設定 Milvus 來使用此金鑰：</p>
<ol>
<li><p><strong>在<code translate="no">credential</code> 部分定義 API 金鑰：</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">tei_key:</span>  <span class="hljs-comment"># You can use any label name</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_TEI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>在 milvus.yaml 中引用憑證：</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">tei:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">tei_key</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># enabled by default. no action required.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Use-embedding-function" class="common-anchor-header">使用嵌入功能<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>一旦設定好 TEI 服務，請依照下列步驟定義並使用嵌入函式。</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">步驟 1：定義模式欄位</h3><p>若要使用嵌入函式，請建立具有特定模式的集合。此模式必須包含至少三個必要欄位：</p>
<ul>
<li><p>唯一識別集合中每個實體的主要欄位。</p></li>
<li><p>儲存要嵌入的原始資料的標量欄位。</p></li>
<li><p>預留向量欄位，用來儲存函式將為標量欄位產生的向量嵌入。</p></li>
</ul>
<p>以下範例定義了一個模式，其中一個標量欄位<code translate="no">&quot;document&quot;</code> 用來儲存文字資料，另一個向量欄位<code translate="no">&quot;dense_vector&quot;</code> 用來儲存函式模組要產生的嵌入資料。切記設定向量維度 (<code translate="no">dim</code>) 以符合您所選擇的嵌入模型輸出。</p>
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
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">步驟 2：在模式中加入嵌入函數</h3><p>Milvus 中的 Function 模組會自動將儲存在標量欄位中的原始資料轉換為嵌入資料，並將其儲存在明確定義的向量欄位中。</p>
<p>下面的範例新增了一個 Function 模組 (<code translate="no">tei_func</code>)，將標量欄位<code translate="no">&quot;document&quot;</code> 轉換為嵌入，將產生的向量儲存到之前定義的<code translate="no">&quot;dense_vector&quot;</code> 向量欄位中。</p>
<p>定義好嵌入函數後，將它加入集合模式。這會指示 Milvus 使用指定的 embedding 函式來處理和儲存文字資料的 embeddings。</p>
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
     <th><p><strong>參數</strong></p></th>
     <th><p><strong>需要嗎？</strong></p></th>
     <th><p><strong>說明</strong></p></th>
     <th><p><strong>範例 值</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>是</p></td>
     <td><p>嵌入模型提供者。設定為 "TEI"。</p></td>
     <td><p>"TEI</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">endpoint</code></p></td>
     <td><p>是</p></td>
     <td><p>指向您部署的 TEI 服務的網路位址。如果透過 Milvus Helm Chart 部署，這通常是內部服務位址。</p></td>
     <td><p>"http://localhost:8080"、"http://my-release-milvus-tei:80"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncate</code></p></td>
     <td><p>否</p></td>
     <td><p>是否截斷超過模型最大長度的輸入文字。預設為 false。</p></td>
     <td><p>"true" (真)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation_direction</code></p></td>
     <td><p>否</p></td>
     <td><p>當 truncate 為 true 時有效。指定從左側或右側截斷。預設為右。</p></td>
     <td><p>「左」</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>否</p></td>
     <td><p>Milvus 用戶端傳送至 TEI 的最大批次大小。預設為 32。</p></td>
     <td><p>64</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">prompt_name</code></p></td>
     <td><p>否</p></td>
     <td><p>(進階) 指定句子轉換器設定提示字典中的關鍵字。用於需要特定提示格式的特定機型。TEI 支援可能有限，且取決於 Hub 上的機型組態。</p></td>
     <td><p>"your_prompt_key" (您的提示鍵)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ingestion_prompt</code></p></td>
     <td><p>無</p></td>
     <td><p>(進階）指定在資料插入（擷取）階段中使用的提示。取決於所使用的 TEI 模型；模型必須支援提示。</p></td>
     <td><p>"passage："</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_prompt</code></p></td>
     <td><p>無</p></td>
     <td><p>(進階）指定在搜尋階段使用的提示。視所使用的 TEI 模式而定；該模式必須支援提示。</p></td>
     <td><p>"query："</p></td>
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
    </button></h2><p>設定嵌入功能之後，請參閱<a href="/docs/zh-hant/embedding-function-overview.md">功能概述</a>，以取得有關索引設定、資料插入範例和語意搜尋作業的其他指引。</p>
