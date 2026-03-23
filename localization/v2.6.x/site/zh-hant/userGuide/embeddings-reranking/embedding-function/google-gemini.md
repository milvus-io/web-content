---
id: google-gemini.md
title: Google 雙子星
summary: 使用 Google Gemini 嵌入模型與 Milvus，方法是選擇一個模型並使用您的 Gemini API 金鑰設定 Milvus。
---
<h1 id="Google-Gemini" class="common-anchor-header">Google 雙子星<button data-href="#Google-Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>使用 Google Gemini 嵌入模型與 Milvus，方法是選擇一個模型並使用您的 Gemini API 金鑰設定 Milvus。</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">選擇嵌入模型<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援 Google Gemini 提供的嵌入模型。以下是目前可用的 Gemini 嵌入模型，以供快速參考：</p>
<table>
   <tr>
     <th><p><strong>模型名稱</strong></p></th>
     <th><p><strong>尺寸</strong></p></th>
     <th><p><strong>最大代幣</strong></p></th>
     <th><p><strong>說明</strong></p></th>
   </tr>
   <tr>
     <td><p>gemini-embedding-001</p></td>
     <td><p>預設：3,072 (建議：768、1,536 或 3,072)</p></td>
     <td><p>8,192</p></td>
     <td><p>具有彈性維度的文字嵌入模型，使用 Matryoshka Representation Learning (MRL) 訓練。</p></td>
   </tr>
   <tr>
     <td><p>gemini-embedding-2</p></td>
     <td><p>預設：3,072 (建議：768、1,536 或 3,072)</p></td>
     <td><p>8,192</p></td>
     <td><p>Google 的第一個原生多模式嵌入模型，在統一的嵌入空間中支援文字、圖片、視訊、音訊和文件。</p></td>
   </tr>
</table>
<p>這兩種模型都使用 Matryoshka Representation Learning (MRL) 技術進行訓練，可透過<code translate="no">dim</code> 參數彈性設定輸出尺寸。建議從 768 維度開始，必要時可擴充至 1,536 或 3,072 維度。如需詳細資訊，請參閱<a href="https://ai.google.dev/gemini-api/docs/embeddings">Gemini 嵌入模型</a>。</p>
<p>Gemini 嵌入模型還支援<strong>任務類型</strong>參數，可針對特定用例優化嵌入。Milvus 會根據操作自動設定任務類型：</p>
<ul>
<li><p><strong>Insert / Upsert</strong>：<code translate="no">RETRIEVAL_DOCUMENT</code></p></li>
<li><p><strong>搜尋</strong>：<code translate="no">RETRIEVAL_QUERY</code></p></li>
</ul>
<p>您可以透過明確指定<code translate="no">task</code> 參數 (例如：<code translate="no">SEMANTIC_SIMILARITY</code>,<code translate="no">CLASSIFICATION</code>,<code translate="no">CLUSTERING</code>)，來覆寫這一點。</p>
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
    </button></h2><p>Milvus 必須知道您的 Gemini API 金鑰，才能請求嵌入。Milvus 提供兩種配置憑證的方法：</p>
<ul>
<li><p><strong>設定檔案 (建議使用)：</strong>將 API 金鑰儲存在<code translate="no">milvus.yaml</code> 中，以便每次重新啟動和節點都能自動取得。</p></li>
<li><p><strong>環境變數：</strong>在部署時注入金鑰 - 最適合 Docker Compose。</p></li>
</ul>
<p>在以下兩種方法中選擇一種--配置檔案在裸機和虛擬機器上較容易維護，而 env-var 路線則適合容器工作流程。</p>
<p>如果相同提供者的 API 金鑰同時出現在組態檔案和環境變數中，Milvus 會始終使用<code translate="no">milvus.yaml</code> 中的值，而忽略環境變數。</p>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">選項 1：組態檔案 (建議使用且優先順序較高)<button data-href="#Option-1-Configuration-file-recommended--higher-priority" class="anchor-icon" translate="no">
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
    </button></h3><p>將您的 API 金鑰保留在<code translate="no">milvus.yaml</code> ；Milvus 會在啟動時讀取它們，並覆寫相同提供者的任何環境變數。</p>
<ol>
<li><p><strong>在 credential 下宣告您的金鑰：</strong></p>
<p>您可以列出一個或多個 API 金鑰 - 給每個金鑰一個您自創的標籤，並在稍後參考。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>將 API 金鑰放在這裡，可以讓它們在重新啟動時保持不變，而且只要改變標籤就可以切換金鑰。</p></li>
<li><p><strong>告訴 Milvus 使用哪個金鑰來呼叫 Gemini</strong></p>
<p>在同一個檔案中，將 Gemini 提供者指向您希望它使用的標籤。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">gemini:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
<button class="copy-code-btn"></button></code></pre>
<p>這會將特定的金鑰綁定到 Milvus 傳送至 Gemini embeddings endpoint 的每個請求。</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">選項 2：環境變數<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>當您使用 Docker Compose 執行 Milvus，並希望不在檔案和影像中洩露秘密時，請使用此方法。</p>
<p>只有在<code translate="no">milvus.yaml</code> 中找不到提供者的金鑰時，Milvus 才會使用環境變數。</p>
<table>
   <tr>
     <th><p><strong>變數</strong></p></th>
     <th><p><strong>需要</strong></p></th>
     <th><p><strong>說明</strong></p></th>
   </tr>
   <tr>
     <td><p>milvus_gemini_api_key</p></td>
     <td><p>是</p></td>
     <td><p>讓每個 Milvus 容器都可以使用 Gemini 金鑰 (當 milvus.yaml 中有 Gemini 金鑰時忽略)</p></td>
   </tr>
</table>
<p>在您的<strong>docker-compose.yaml</strong>檔案中，設定<code translate="no">MILVUS_GEMINI_API_KEY</code> 環境變數。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Gemini API key inside the container</span>
    <span class="hljs-attr">MILVUS_GEMINI_API_KEY:</span> <span class="hljs-string">&lt;YOUR_GEMINI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">environment:</code> 區塊只會將金鑰注入 Milvus 容器，而不會碰觸到您的主機作業系統。詳情請參考<a href="http://configure-docker.md#Configure-Milvus-with-Docker-Compose">使用 Docker Compose 設定 Milvus</a>。</p>
<h2 id="Step-1-Create-a-collection-with-a-text-embedding-function" class="common-anchor-header">步驟 1：建立具有文字嵌入功能的集合<button data-href="#Step-1-Create-a-collection-with-a-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Define-schema-fields" class="common-anchor-header">定義模式欄位<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>若要使用嵌入功能，請建立具有特定模式的集合。此模式必須包含至少三個必要欄位：</p>
<ul>
<li><p>唯一識別集合中每個實體的主要欄位。</p></li>
<li><p><code translate="no">VARCHAR</code> 欄位，用來儲存要嵌入的原始資料。</p></li>
<li><p>預留向量欄位，用來儲存文字嵌入函式將為<code translate="no">VARCHAR</code> 欄位產生的密集向量嵌入。</p></li>
</ul>
<p>以下範例定義了一個模式，其中一個標量欄位<code translate="no">&quot;document&quot;</code> 用於儲存文字資料，另一個向量欄位<code translate="no">&quot;dense&quot;</code> 用於儲存將由 Function 模組產生的嵌入資料。請記住設定向量維度 (<code translate="no">dim</code>) 以符合您選擇的嵌入模型輸出。</p>
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
<h3 id="Define-the-text-embedding-function" class="common-anchor-header">定義文字嵌入函數<button data-href="#Define-the-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h3><p>文字嵌入函數會自動將儲存在<code translate="no">VARCHAR</code> 欄位中的原始資料轉換為嵌入資料，並將其儲存在明確定義的向量欄位中。</p>
<p>以下範例新增了一個 Function 模組 (<code translate="no">gemini_embedding</code>)，可將標量欄位<code translate="no">&quot;document&quot;</code> 轉換成嵌入式資料，並將產生的向量儲存於先前定義的<code translate="no">&quot;dense&quot;</code> 向量欄位中。</p>
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
<p><strong>支援的任務參數類型：</strong></p>
<ul>
<li><p><code translate="no">RETRIEVAL_DOCUMENT</code> - 優化嵌入式文件索引（預設為插入/上插）。</p></li>
<li><p><code translate="no">RETRIEVAL_QUERY</code> - 為查詢檢索優化嵌入式資料（預設為搜尋）。</p></li>
<li><p><code translate="no">SEMANTIC_SIMILARITY</code> - 為測量文字相似性最佳化內嵌。</p></li>
<li><p><code translate="no">CLASSIFICATION</code> - 優化文字分類的內嵌。</p></li>
<li><p><code translate="no">CLUSTERING</code> - 優化聚類的內嵌。</p></li>
</ul>
<p>如果沒有明確設定，Milvus 會在插入/上載時自動使用<code translate="no">RETRIEVAL_DOCUMENT</code> ，在搜尋時自動使用<code translate="no">RETRIEVAL_QUERY</code> 。</p>
<h3 id="Configure-the-index" class="common-anchor-header">設定索引<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>定義包含必要欄位和內建函式的模式後，為您的資料集設定索引。為了簡化這個過程，使用<code translate="no">AUTOINDEX</code> 作為<code translate="no">index_type</code> ，這個選項允許 Milvus 根據您的資料結構選擇和配置最適合的索引類型。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-the-collection" class="common-anchor-header">建立資料集<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>現在使用已定義的模式和索引參數建立資料夾。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-data" class="common-anchor-header">步驟 2：插入資料<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>設定資料集和索引後，您就可以插入原始資料了。在這個過程中，您只需要提供原始文字。我們之前定義的 Function 模組會自動為每個文字項目產生相對應的稀疏向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-text" class="common-anchor-header">步驟 3：使用文字搜尋<button data-href="#Step-3-Search-with-text" class="anchor-icon" translate="no">
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
    </button></h2><p>插入資料後，使用原始查詢文字執行語意搜尋。Milvus 會自動將您的查詢轉換成嵌入向量，根據相似性擷取相關文件，並傳回最匹配的結果。</p>
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
<p>有關搜尋和查詢操作的詳細資訊，請參閱<a href="/docs/zh-hant/single-vector-search.md">基本向量</a> <a href="/docs/zh-hant/get-and-scalar-query.md">搜尋和查詢</a>。</p>
