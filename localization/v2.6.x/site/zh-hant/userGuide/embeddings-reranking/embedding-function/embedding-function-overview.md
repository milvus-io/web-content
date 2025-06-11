---
id: embedding-function-overview.md
title: 嵌入函數概述Compatible with Milvus 2.6.x
summary: >-
  Milvus 的 Function 模組可讓您透過自動呼叫外部模型提供者（如 OpenAI、AWS Bedrock、Google Vertex AI
  等），將原始文字資料轉換為向量嵌入。有了 Function 模組，您就不需要再手動與嵌入式 API 連接-Milvus
  會處理向提供者傳送請求、接收嵌入式資料，以及將其儲存在您的集合中的整個過程。對於語意搜尋，您只需要提供原始查詢資料，而不需要查詢向量。Milvus
  會以您用於擷取的相同模型產生查詢向量，將其與儲存的向量比較，並傳回最相關的結果。
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">嵌入函數概述<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 的 Function 模組可讓您透過自動呼叫外部模型提供者（如 OpenAI、AWS Bedrock、Google Vertex AI 等），將原始文字資料轉換為向量嵌入。有了 Function 模組，您就不需要再手動與嵌入式 API 連接-Milvus 會處理向提供者傳送請求、接收嵌入式資料，以及將其儲存在您的集合中的整個過程。對於語意搜尋，您只需要提供原始查詢資料，而不需要查詢向量。Milvus 以您用於接收的相同模型產生查詢向量，將其與儲存的向量比較，並傳回最相關的結果。</p>
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
<li><p>Function 模組嵌入的任何輸入欄位必須始終包含一個值；如果提供的是空值，模組將拋出一個錯誤。</p></li>
<li><p>Function 模組只處理集合模式中明確定義的欄位；它不會產生動態欄位的嵌入。</p></li>
<li><p>要嵌入的輸入欄位必須是<code translate="no">VARCHAR</code> 類型。</p></li>
<li><p>Function 模組可以將輸入欄位嵌入到：</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>不支援轉換為<code translate="no">BINARY_VECTOR</code> 、<code translate="no">FLOAT16_VECTOR</code> 或<code translate="no">BFLOAT16_VECTOR</code> 。</p></li>
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
    </button></h2><p>Function 模組透過呼叫您所選擇的外部模型提供者，將原始文字轉換成向量嵌入。不同的提供者支援不同的模型、嵌入格式和認證方法，總結如下。</p>
<h3 id="Supported-model-providers" class="common-anchor-header">支援的模型提供者</h3><table>
   <tr>
     <th><p>提供者</p></th>
     <th><p>典型模型</p></th>
     <th><p>嵌入類型</p></th>
     <th><p>驗證方法</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/openai.md">OpenAI</a></p></td>
     <td><p>文字嵌入-3-*</p></td>
     <td><p>密集 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 金鑰</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>基於部署</p></td>
     <td><p>密集 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 金鑰</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/dashscope.md">DashScope</a></p></td>
     <td><p>text-embedding-v3</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 金鑰</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/bedrock.md">床岩</a></p></td>
     <td><p>墊.titan-embed-text-v2</p></td>
     <td><p>密集 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>AK/SK 對</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/vertex-ai.md">頂點 AI</a></p></td>
     <td><p>文字嵌入-005</p></td>
     <td><p>密集 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>GCP 服務帳戶 JSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/voyage-ai.md">航程 AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code> /<code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>API 金鑰</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/cohere.md">邏輯</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code> /<code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>API 金鑰</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/siliconflow.md">矽流</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>API 金鑰</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/hugging-face-tei.md">擁抱臉</a></p></td>
     <td><p>任何 TEI 服務的模型</p></td>
     <td><p>密集 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>可選 API 金鑰</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">工作流程</h3><p>下圖顯示 Milvus 功能的運作方式。</p>
<ol>
<li><p><strong>輸入文字</strong>：使用者將原始資料（例如文件）插入 Milvus。</p></li>
<li><p><strong>產生嵌入</strong>：Milvus 中的 Function 模組會自動呼叫已設定的模型提供者，將原始資料轉換成向量嵌入。</p></li>
<li><p><strong>儲存嵌入資料</strong>：產生的嵌入資料會儲存在 Milvus 集合中明確定義的向量欄位中。</p></li>
<li><p><strong>查詢文字</strong>：使用者向 Milvus 提交文字查詢。</p></li>
<li><p><strong>語意搜尋</strong>：Milvus 內部會將查詢轉換為向量嵌入，針對儲存的嵌入進行相似性搜尋，並擷取相關結果。</p></li>
<li><p><strong>傳回結果</strong>：Milvus 會將最匹配的結果傳回給應用程式。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>嵌入功能概述</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">憑證管理</h3><p>連接至外部嵌入 API 需要認證憑證（API 金鑰或存取/保密金鑰對）。在您的應用程式碼中暴露這些認證會造成安全風險。Milvus 通過在 Milvus 配置文件 (<code translate="no">milvus.yaml</code>) 中安全地存儲憑證來解決這個問題。</p>
<ol>
<li><p><strong>新增憑證</strong>：在頂層<code translate="no">credential:</code> 區塊下，給每個憑證一個唯一的標籤；然後在<code translate="no">function:</code> 區塊中指向該標籤。</p></li>
<li><p><strong>伺服器載入設定</strong>：Milvus 讀取 YAML 檔案，將原始金鑰快取到記憶體中，並只記住它們的標籤 (例如<code translate="no">apikey1</code>)。</p></li>
<li><p><strong>呼叫函式</strong>：可選擇指定<code translate="no">credential</code> 參數。</p>
<ul>
<li><p>如果您在函式定義時提供憑證名稱，Milvus 會使用指定的憑證。</p></li>
<li><p>如果省略參數，Milvus 會自動回復到<code translate="no">milvus.yaml</code> 中為該模型提供者設定的憑證。</p>
<p>無論哪種方式，秘鑰都不會離開伺服器。</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>憑證配置溢出</span> </span></p>
<div class="alert note">
<p>如果您使用 Docker Compose 部署 Milvus，您也可以透過環境變數注入相同的欄位。有關確切的變量名稱，請參閱特定提供者的指南。</p>
</div>
<h2 id="Configure-credentials" class="common-anchor-header">配置憑證<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>在使用 Milvus 的嵌入功能之前，請先設定存取憑證。</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">步驟 1：在 Milvus 配置中加入憑證</h3><p>在<code translate="no">milvus.yaml</code> 檔案中，編輯<code translate="no">credential</code> 區塊，為您需要存取的每個提供者加入項目：</p>
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
     <th><p>提供商類型</p></th>
     <th><p>必填欄位</p></th>
     <th><p>配置範例</p></th>
   </tr>
   <tr>
     <td><p>AK/SK 對 (AWS Bedrock)</p></td>
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
     <td><p>基於 API 鑰匙 (OpenAI、Voyage AI 等)</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>GCP 服務帳戶 JSON (Vertex AI)</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">步驟 2：配置提供者設定</h3><p>在同一組態檔案中，編輯<code translate="no">function</code> 區塊，告訴 Milvus 使用哪個 key 來嵌入服務呼叫：</p>
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
<p>有關如何套用 Milvus 設定的詳細資訊，請參閱<a href="/docs/zh-hant/dynamic_config.md">Configure Milvus on the Fly</a>。</p>
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
    </button></h2><p>一旦配置了憑證，請按照以下步驟定義和使用嵌入函數。</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">步驟 1：定義模式欄位</h3><p>若要使用嵌入功能，請建立具有特定模式的集合。此模式必須包含至少三個必要欄位：</p>
<ul>
<li><p>唯一識別集合中每個實體的主要欄位。</p></li>
<li><p>儲存要嵌入的原始資料的標量欄位。</p></li>
<li><p>預留向量欄位，用來儲存函式將為標量欄位產生的向量嵌入。</p></li>
</ul>
<p>以下範例定義了一個模式，其中一個標量欄位<code translate="no">&quot;document&quot;</code> 用來儲存文字資料，另一個向量欄位<code translate="no">&quot;dense&quot;</code> 用來儲存函式模組要產生的嵌入資料。切記設定向量維度 (<code translate="no">dim</code>) 以符合您所選擇的嵌入模型輸出。</p>
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
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">步驟 2：在模式中加入嵌入函數</h3><p>Milvus 中的 Function 模組會自動將儲存在標量欄位中的原始資料轉換為嵌入資料，並將其儲存在明確定義的向量欄位中。</p>
<p>下面的範例新增了一個 Function 模組 (<code translate="no">openai_embedding</code>)，將標量欄位<code translate="no">&quot;document&quot;</code> 轉換成嵌入式資料，將產生的向量儲存到之前定義的<code translate="no">&quot;dense&quot;</code> 向量欄位中。</p>
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
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>範例值</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Milvus 內嵌入函數的唯一識別碼。</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>使用的嵌入函數類型。可能的值：</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>:產生密集向量，捕捉文字中的語意。</p></li>
<li><p><code translate="no">FunctionType.BM25</code>:根據 BM25 排序演算法產生稀疏向量，該演算法使用詞彙頻率和反向文件頻率計算相關性分數。如需詳細資訊，請參閱<a href="/docs/zh-hant/full-text-search.md">全文檢索</a>。</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>包含要嵌入的原始資料的標量欄位。目前，此參數只接受一個欄位名稱。</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>向量欄位，用於儲存已產生的嵌入。目前，此參數只接受一個欄位名稱。</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>包含嵌入配置的字典。註：<code translate="no">params</code> 內的參數會因嵌入模型提供者而異。</p></td>
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
     <td><p>在<code translate="no">milvus.yaml</code> 的頂層<code translate="no">credential:</code> 部分定義的憑證的標籤。 </p>
<ul>
<li><p>提供時，Milvus 會擷取匹配的金鑰對或 API 令牌，並在伺服器端簽署請求。</p></li>
<li><p>如果省略 (<code translate="no">None</code>)，Milvus 會回退到<code translate="no">milvus.yaml</code> 中為目標模型提供者明確配置的憑證。</p></li>
<li><p>如果標籤未知或參考的金鑰遺失，則呼叫失敗。</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>輸出嵌入的維數。對於 OpenAI 的第三代模型，您可以縮短全向量以降低成本和延遲，而不會造成語意資訊的重大損失。如需詳細資訊，請參閱<a href="https://openai.com/blog/new-embedding-models-and-api-updates">OpenAI 公佈部落格文章</a>。<strong>注意：</strong>如果您縮短向量維度，請確保在模式的<code translate="no">add_field</code> 方法中為向量欄位指定的<code translate="no">dim</code> 值與您嵌入函式的最終輸出維度相符。</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>用於追蹤 API 使用情況的使用者層級識別碼。</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>對於具有多個需要將文字轉換為向量的標量欄位的集合，請在集合模式中加入單獨的函式，確保每個函式都有唯一的名稱和<code translate="no">output_field_names</code> 值。</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">步驟 3：配置索引</h3><p>定義包含必要欄位和內建函式的模式後，為您的集合設定索引。為了簡化這個過程，請使用<code translate="no">AUTOINDEX</code> 作為<code translate="no">index_type</code> ，這個選項允許 Milvus 根據您的資料結構選擇和配置最適合的索引類型。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">步驟 4：建立集合</h3><p>現在使用已定義的模式和索引參數建立資料集。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">步驟 5：插入資料</h3><p>設定資料集和索引後，您就可以插入原始資料了。在這個過程中，您只需要提供原始文字。我們之前定義的 Function 模組會自動為每個文字項目產生相對應的稀疏向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">步驟 6：執行向量搜尋</h3><p>插入資料後，使用原始查詢文字執行語意搜尋。Milvus 會自動將您的查詢轉換成嵌入向量，根據相似度擷取相關文件，並傳回最匹配的結果。</p>
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
<p>有關搜尋和查詢操作的詳細資訊，請參閱<a href="/docs/zh-hant/single-vector-search.md">基本向量</a> <a href="/docs/zh-hant/get-and-scalar-query.md">搜尋和查詢</a>。</p>
