---
id: openai.md
title: OpenAICompatible with Milvus 2.6.x
summary: 選擇一個模型，並使用您的 OpenAI API 金鑰設定 Milvus，即可使用 Milvus 的 OpenAI 嵌入模型。
beta: Milvus 2.6.x
---
<h1 id="OpenAI" class="common-anchor-header">OpenAI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#OpenAI" class="anchor-icon" translate="no">
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
    </button></h1><p>選擇一個模型，並使用您的OpenAI API key設定Milvus，使用Milvus的OpenAI嵌入模型。</p>
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
    </button></h2><p>Milvus 支援 OpenAI 提供的所有嵌入模型。以下是目前可用的 OpenAI 嵌入模型，以供快速參考：</p>
<table>
   <tr>
     <th><p>模型名稱</p></th>
     <th><p>尺寸</p></th>
     <th><p>最大代幣</p></th>
     <th><p>說明</p></th>
   </tr>
   <tr>
     <td><p>文字嵌入-3-小</p></td>
     <td><p>預設：1,536 (可縮短為 1,536 以下的尺寸大小)</p></td>
     <td><p>8,191</p></td>
     <td><p>最適合對成本敏感且可擴充的語意搜尋-以較低的價格提供強大的效能。</p></td>
   </tr>
   <tr>
     <td><p>文字嵌入-3-大</p></td>
     <td><p>預設：3,072 (可縮短至尺寸小於 3,072)</p></td>
     <td><p>8,191</p></td>
     <td><p>最適合需要增強檢索準確性和更豐富語意表示的應用程式。</p></td>
   </tr>
   <tr>
     <td><p>文字嵌入-ADA-002</p></td>
     <td><p>固定：1,536 (無法縮短)</p></td>
     <td><p>8,191</p></td>
     <td><p>前一代模型適合傳統管道或需要向後相容性的情況。</p></td>
   </tr>
</table>
<p>第三代嵌入模型<strong>(text-embedding-3</strong>) 支援透過<code translate="no">dim</code> 參數減少嵌入的大小。一般而言，從運算、記憶體和儲存的角度來看，較大的嵌入會比較昂貴。能夠調整維度的數量，可以更有效地控制整體成本和效能。有關每個模型的詳細資訊，請參閱<a href="https://platform.openai.com/docs/guides/embeddings#embedding-models">嵌入模型</a>與<a href="https://openai.com/blog/new-embedding-models-and-api-updates">OpenAI 公告部落格文章</a>。</p>
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
    </button></h2><p>Milvus 必須先知道您的 OpenAI API 金鑰，才能請求嵌入。Milvus 提供兩種配置憑證的方法：</p>
<ul>
<li><p><strong>配置文件（推薦）：</strong>將 API 金鑰儲存在<code translate="no">milvus.yaml</code> ，以便每次重新啟動和節點都會自動擷取。</p></li>
<li><p><strong>環境變數：</strong>在部署時注入金鑰 - 最適合 Docker Compose。</p></li>
</ul>
<p>在以下兩種方法中選擇一種--配置檔案在裸機和虛擬機器上較容易維護，而 env-var 路線則適合容器工作流程。</p>
<div class="alert note">
<p>如果相同提供者的 API 金鑰同時出現在組態檔案和環境變數中，Milvus 會始終使用<code translate="no">milvus.yaml</code> 中的值，而忽略環境變數。</p>
</div>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">選項 1：組態檔案 (建議使用且優先順序較高)</h3><p>將您的 API 金鑰保留在<code translate="no">milvus.yaml</code> ；Milvus 會在啟動時讀取它們，並覆寫相同提供者的任何環境變數。</p>
<ol>
<li><p>**在下列位置宣告您的金鑰<code translate="no">credential:</code></p>
<p>您可以列出一個或多個 API 金鑰 - 給每個金鑰一個您自創的標籤，稍後可以參考。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>將 API 金鑰放在這裡可以讓它們在重新啟動時保持不變，並讓您只需更改標籤就可以切換金鑰。</p></li>
<li><p><strong>告訴 Milvus 在呼叫 OpenAI 時使用哪個金鑰</strong></p>
<p>在同一個檔案中，將 OpenAI 提供者指向您希望它使用的標籤。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>這樣，Milvus 傳送至 OpenAI embeddings endpoint 的每個請求都會綁定特定的 key。</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">選項 2：環境變數</h3><p>當您使用 Docker Compose 執行 Milvus，並希望不在檔案和影像中洩露秘密時，請使用此方法。</p>
<p>只有在<code translate="no">milvus.yaml</code> 中找不到提供者的金鑰時，Milvus 才會使用環境變數。</p>
<table>
   <tr>
     <th><p>變數</p></th>
     <th><p>需要</p></th>
     <th><p>說明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_OPENAI_API_KEY</code></p></td>
     <td><p>是</p></td>
     <td><p>讓每個 Milvus 容器都可以使用 OpenAI 的金鑰<em>(當<code translate="no">milvus.yaml</code> 有 OpenAI 的金鑰時忽略</em>)</p></td>
   </tr>
</table>
<p>在你的<strong>docker-compose.yaml</strong>檔案中，設定<code translate="no">MILVUSAI_OPENAI_API_KEY</code> 環境變數。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the OpenAI API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_OPENAI_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_OPENAI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">environment:</code> 區塊只會將金鑰注入 Milvus 容器，而不會碰觸到您的主機作業系統。詳情請參考<a href="/docs/zh-hant/configure-docker.md#Configure-Milvus-with-Docker-Compose">使用 Docker Compose 設定 Milvus</a>。</p>
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
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">步驟 1：定義模式欄位</h3><p>若要使用嵌入函式，請建立具有特定模式的集合。此模式必須包含至少三個必要欄位：</p>
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
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">步驟 2：在模式中加入嵌入函數</h3><p>Milvus 中的 Function 模組會自動將儲存在標量欄位中的原始資料轉換為嵌入資料，並將其儲存在明確定義的向量欄位中。</p>
<p>下面的範例新增了一個 Function 模組 (<code translate="no">openai_embedding</code>)，將標量欄位<code translate="no">&quot;document&quot;</code> 轉換為嵌入，將產生的向量儲存到之前定義的<code translate="no">&quot;dense&quot;</code> 向量欄位中。</p>
<p>定義好嵌入函數後，將它加入集合模式。這會指示 Milvus 使用指定的 embedding 函式來處理和儲存文字資料的 embeddings。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optional: Shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
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
    </button></h2><p>配置完嵌入函數後，請參閱函數<a href="/docs/zh-hant/embedding-function-overview.md">概觀</a>，以獲得關於索引配置、資料插入範例和語意搜尋作業的其他指引。</p>
