---
id: manage-file-resources.md
title: 管理檔案資源
summary: 註冊並管理 Milvus 文字分析器可在執行時載入的外部字典檔案。
---
<h1 id="Manage-File-Resources" class="common-anchor-header">管理檔案資源<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>檔案資源</strong>是伺服器註冊的外部辭典檔案參考，文字分析器在執行時會使用這個參考。在 Milvus 3.0 中，有四個分析器元件可以從檔案資源載入字典，而不是從內嵌陣列載入：</p>
<table>
   <tr>
     <th><p><strong>分析器元件</strong></p></th>
     <th><p><strong>接受檔案資源的參數</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/jieba-tokenizer.md">Jieba tokenizer</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/stop-filter.md">停止篩選器</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/decompounder-filter.md">分解篩選器</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/synonym-filter.md">同義詞篩選器</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>檔案資源解決了內嵌字典陣列的兩個實際問題：</p>
<ul>
<li><p>真實的詞典是很大的。一個中文傑巴詞彙可能有數萬行；同義詞表通常有數以千計的規則。將它們內嵌到分析器配置中是不切實際的。</p></li>
<li><p>相同的字典通常會在不同的集合中共用。先註冊一次，然後以名稱來參照它，可以讓模式保持在較小的範圍內，並且讓字典更新成為單一的操作。</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">檔案資源類型<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援兩種具有不同管理責任的檔案資源類型：</p>
<table>
   <tr>
     <th><p><strong>類型</strong></p></th>
     <th><p><strong>檔案所在位置</strong></p></th>
     <th><p><strong>誰管理檔案</strong></p></th>
     <th><p><strong>適合</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>遠端</strong></p></td>
     <td><p>在您的 Milvus 叢集已設定使用的物件儲存空間 (MinIO / S3 / GCS / Azure) 中</p></td>
     <td><p>Milvus，透過<code translate="no">add_file_resource</code> /<code translate="no">remove_file_resource</code> /<code translate="no">list_file_resources</code> 客戶端 API</p></td>
     <td><p>建議用於大多數部署。</p></td>
   </tr>
   <tr>
     <td><p><strong>本機</strong></p></td>
     <td><p>在每個 Milvus 元件（DataNode、QueryNode、StreamingNode）的本機檔案系統上的相同絕對路徑。</p></td>
     <td><p>您 - 自行掛載檔案，例如透過 Kubernetes 卷冊</p></td>
     <td><p>開放原始碼/自我託管的情境，您偏好在 Milvus 外部管理字典檔案。</p></td>
   </tr>
</table>
<p>本頁其餘的內容會介紹這兩種類型，從較常見的遠端類型開始。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>對於<strong>遠端</strong>檔案資源，您的 Milvus 部署必須配置物件儲存。大多數的部署已經是這樣了 - 檢查<code translate="no">milvus.yaml</code> 的<code translate="no">minio:</code> 區段 (或相對應的 Helm 圖表值)。請注意<code translate="no">bucketName</code> 和<code translate="no">rootPath</code> 值；註冊檔案資源時會用到它們。</p></li>
<li><p>對於<strong>本機</strong>檔案資源，您必須能夠以相同的絕對路徑在每個 Milvus pod / 容器上放置檔案。如何做到這一點取決於您的部署（綁定掛載、ConfigMap 支持的卷、init 容器等）。</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">註冊遠端檔案資源<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>註冊遠端檔案資源是一個三步驟的工作流程：<strong>上傳</strong>檔案到物件儲存空間、以選定的名稱在 Milvus<strong>註冊</strong>它，然後從任何需要它的分析器<strong>引用</strong>它。</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">步驟 1.將字典檔案上傳到物件儲存空間<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>使用您自己的工具 (<code translate="no">mc</code>,<code translate="no">aws s3 cp</code>,<code translate="no">boto3</code>, 或任何 S3 相容的用戶端 ) 將檔案放入 Milvus 設定使用的資料桶。</p>
<p>例如，如果<code translate="no">milvus.yaml</code> 包含：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p>上傳名為<code translate="no">chinese_terms.txt</code> 並以<code translate="no">rootPath</code> 為前綴的檔案，會將該物件置於<code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code> 。</p>
<p>您在步驟 2 中傳給<code translate="no">add_file_resource</code> 的<code translate="no">path</code> 參數是<strong>完整的物件金鑰，包括 rootPath 前綴</strong>- 對於上面的範例，<code translate="no">path=&quot;file/chinese_terms.txt&quot;</code> 。沒有前綴的路徑 (例如，只有<code translate="no">&quot;chinese_terms.txt&quot;</code>) 會被拒絕，並顯示錯誤<code translate="no">file resource path not exist</code> 。</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">步驟 2.註冊檔案<code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> 同步驗證：只有在 Milvus 確認物件存在於設定的物件儲存空間<code translate="no">path</code> 之後，呼叫才會回傳。如果物件遺失，呼叫會產生<code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> - 先上傳檔案，然後再重試。</p>
<p>該呼叫是惰性的。使用相同的<code translate="no">name</code> 和<code translate="no">path</code> 來呼叫<code translate="no">add_file_resource</code> 兩次不會產生重複。</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">步驟 3.從分析器引用檔案資源<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>只要分析器參數接受檔案參考 (<code translate="no">extra_dict_file</code>,<code translate="no">stop_words_file</code>,<code translate="no">word_list_file</code>,<code translate="no">synonyms_file</code>)，就使用典型的遠端形式：</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>所有四個分析器參數使用相同的形狀；只有周圍的分析器關鍵不同。有關每個分析器的具體範例，請參閱 Jieba tokenizer、Stop filter、Decompounder filter 及 Synonym filter。</p>
<p>參數名稱是<code translate="no">resource_name</code> 和<code translate="no">file_name</code> - 不是<code translate="no">name</code> 和<code translate="no">file</code> 。使用<code translate="no">name</code> /<code translate="no">file</code> (或<code translate="no">&quot;type&quot;: &quot;resource&quot;</code> 而非<code translate="no">&quot;type&quot;: &quot;remote&quot;</code>) 會在分析器建立時產生<code translate="no">MilvusException</code> ，並帶有類似<code translate="no">resource name of remote file ... must be set</code> 的訊息。</p>
<h2 id="List-file-resources" class="common-anchor-header">列出檔案資源<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> 返回<code translate="no">FileResourceInfo</code> 对象的列表，每个对象都有<code translate="no">.name</code> 和<code translate="no">.path</code> 属性。空簇返回<code translate="no">[]</code> 。沒有每個資源的<code translate="no">get</code> ；<code translate="no">list_file_resources</code> 是唯一的讀取 API。</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">移除檔案資源<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> 是idempotent：為一個不存在的名稱呼叫它會返回<code translate="no">None</code> ，而不會升級。</p>
<p>在移除檔案資源之前，請刪除或變更其分析器配置引用它的任何集合。保留檔案資源直到沒有集合依賴它，可以避免資源消失後分析器查詢失敗的風險。</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">使用本機檔案資源<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>本機</strong>檔案資源直接指向每個 Milvus 元件本機檔案系統上的路徑。沒有<code translate="no">add_file_resource</code> 呼叫 - Milvus 不跟蹤本機資源。您自己將檔案放置在每個相關 pod 或容器上的相同絕對路徑，然後透過路徑引用它：</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>本地檔案資源僅在您控制 DataNodes、QueryNodes 和 StreamingNodes 檔案系統的部署中有效 - 通常是裸機上的自託管 Milvus 或 Kubernetes 叢集上的自託管 Milvus，您可以在其中新增卷掛載。檔案必須以完全相同的絕對路徑存在於每個元件上；否則，某些節點在載入分析器時會失敗。</p>
<p>檔案會在分析器首次建立時開啟。如果該路徑當時不存在，則分析器的建立會以<code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code> 失敗。</p>
<h2 id="Considerations" class="common-anchor-header">注意事項<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>叢集範圍內的可用性不是即時的。</strong> <code translate="no">add_file_resource</code> 返回後，Milvus 會同步檔案到需要它的每個元件。在這個短暫的視窗中，引用資源的集合可能會在尚未同步的節點上建立失敗。典型的解決方法是在幾秒鐘後重試建立呼叫。</p></li>
<li><p><strong>僅當沒有集合依賴於資源時才移除。</strong>在呼叫<code translate="no">remove_file_resource</code> 之前，請移除或變更分析器設定引用該資源的任何集合，以避免分析器查詢找不到檔案。</p></li>
<li><p><code translate="no">list_file_resources()</code> 返回<code translate="no">name</code> 和<code translate="no">path</code> - 沒有大小、校驗和、上傳時間或其他元資料<strong>。</strong>如果需要，請使用自己的命名慣例追蹤字典版本。</p></li>
</ul>
