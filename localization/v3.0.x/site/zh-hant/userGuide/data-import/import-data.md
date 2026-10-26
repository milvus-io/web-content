---
id: import-data.md
order: 1
title: 匯入資料
summary: 本頁面示範了匯入已準備好資料的步驟。
---
<h1 id="Import-data" class="common-anchor-header">匯入資料<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面將示範匯入已準備好資料的步驟。</p>
<h2 id="Before-you-start" class="common-anchor-header">開始之前<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>您已預先準備好資料，並將其存放至 Milvus 儲存桶中。</p>
<p>若尚未準備，請先使用<strong>RemoteBulkWriter</strong>處理資料，並確保已將處理好的資料傳輸至與您的 Milvus 實例一同啟動的 MinIO 實例上的 Milvus 儲存桶中。詳細資訊請參閱《<a href="/docs/zh-hant/prepare-source-data.md">準備來源資料</a>》。</p></li>
<li><p>您已根據用於預處理資料的資料結構建立了一個集合。若尚未建立，請參閱《<a href="/docs/zh-hant/manage-collections.md">管理集合</a>》。</p></li>
</ul>
<div class="language-python">
<p>以下程式碼片段會根據指定的資料結構建立一個簡單的集合。有關參數的更多資訊，請參閱 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> 以及 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> SDK 參考文件。</p>
</div>
<div class="language-java">
<p>以下程式碼片段會根據指定的資料結構建立一個簡單的集合。有關參數的更多資訊，請參閱 <a href="https://milvus.io/api-reference/java/v2.4.x/v1/Collection/createCollection.md"><code translate="no">createCollection()</code></a> SDK 參考文件中的相關內容。</p>
</div>
<h2 id="Import-data" class="common-anchor-header">匯入資料<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h2><p>若您的管線可能會重試失敗或超時的匯入請求，請為該工作標記一個冪等性金鑰；請參閱《<a href="/docs/zh-hant/idempotent-import.md">冪等性批次匯入</a>》。</p>
<p>要匯入已準備好的資料，您必須依照以下方式建立匯入工作：</p>
<div class="multipleCode">
 <a href="#python">Python 
 </a> <a href="#java"> Java</a>
 <a href="#shell"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> bulk_import

url = <span class="hljs-string">f&quot;http://127.0.0.1:19530&quot;</span>

<span class="hljs-comment"># Bulk-insert data from a set of JSON files already uploaded to the MinIO server</span>
resp = bulk_import(
    url=url,
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    files=[[<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/1.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/2.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/3.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/4.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/5.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/6.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/7.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/8.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/9.parquet&#x27;</span>],
           [<span class="hljs-string">&#x27;a1e18323-a658-4d1b-95a7-9907a4391bcf/10.parquet&#x27;</span>]],
)

job_id = resp.json()[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-string">&#x27;jobId&#x27;</span>]
<span class="hljs-built_in">print</span>(job_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> String <span class="hljs-title function_">bulkImport</span><span class="hljs-params">(List&lt;List&lt;String&gt;&gt; batchFiles)</span> <span class="hljs-keyword">throws</span> InterruptedException {
    <span class="hljs-type">MilvusImportRequest</span> <span class="hljs-variable">milvusImportRequest</span> <span class="hljs-operator">=</span> MilvusImportRequest.builder()
            .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
            .files(batchFiles)
            .build();
    <span class="hljs-type">String</span> <span class="hljs-variable">bulkImportResult</span> <span class="hljs-operator">=</span> BulkImport.bulkImport(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, milvusImportRequest);
    System.out.println(bulkImportResult);

    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">bulkImportObject</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>().fromJson(bulkImportResult, JsonObject.class);
    <span class="hljs-type">String</span> <span class="hljs-variable">jobId</span> <span class="hljs-operator">=</span> bulkImportObject.getAsJsonObject(<span class="hljs-string">&quot;data&quot;</span>).get(<span class="hljs-string">&quot;jobId&quot;</span>).getAsString();
    System.out.println(<span class="hljs-string">&quot;Create a bulkInert task, job id: &quot;</span> + jobId);
    <span class="hljs-keyword">return</span> jobId;
}

<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> <span class="hljs-keyword">throws</span> Exception {
    List&lt;List&lt;String&gt;&gt; batchFiles = uploadData();
    <span class="hljs-type">String</span> <span class="hljs-variable">jobId</span> <span class="hljs-operator">=</span> bulkImport(batchFiles);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">export MILVUS_URI=&quot;localhost:19530&quot;

curl --request POST &quot;http://${MILVUS_URI}/v2/vectordb/jobs/import/create&quot; \
--header &quot;Content-Type: application/json&quot; \
--header &quot;Request-Timeout: 10&quot; \
--data-raw &#x27;{
    &quot;files&quot;: [
        [
            &quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet&quot;
        ],
        [
            &quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet&quot;
        ]
    ],
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>請求正文包含兩個欄位：</p>
<ul>
<li><p><code translate="no">collectionName</code></p>
<p>目標集合的名稱。</p></li>
<li><p><code translate="no">files</code></p>
<p>一組以清單形式表示的檔案路徑，這些路徑是相對於在您的 Milvus 實例啟動時一併啟動的 MioIO 實例上，該 Milvus 儲存桶的根目錄而言的相對路徑。可能的子清單如下：</p>
<ul>
<li><p><strong>JSON 檔案</strong></p>
<p>若已準備的檔案為 JSON 格式<strong>，每個子清單應包含單一已準備 JSON 檔案的路徑</strong>。</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/d1782fa1-6b65-4ff3-b05a-43a436342445/1.json&quot;</span>
],
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Parquet 檔案</strong></p>
<p>若預備檔案為 Parquet<strong>格式，每個子清單應包含單一預備 Parquet 檔案的路徑</strong>。</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/a6fb2d1c-7b1b-427c-a8a3-178944e3b66d/1.parquet&quot;</span>
]

<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ul>
<p>可能的回傳結果如下：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;jobId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;448707763884413158&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-import-progress" class="common-anchor-header">檢查匯入進度<button data-href="#Check-import-progress" class="anchor-icon" translate="no">
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
    </button></h2><p>取得匯入工作 ID 後，可透過以下方式檢查匯入進度：</p>
<div class="multipleCode">
 <a href="#python">Python 
 </a> <a href="#java"> Java</a>
 <a href="#shell"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> get_import_progress

url = <span class="hljs-string">f&quot;http://127.0.0.1:19530&quot;</span>

<span class="hljs-comment"># Get bulk-insert job progress</span>
resp = get_import_progress(
    url=url,
    job_id=<span class="hljs-string">&quot;453265736269038336&quot;</span>,
)

<span class="hljs-built_in">print</span>(json.dumps(resp.json(), indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">getImportProgress</span><span class="hljs-params">(String jobId)</span> {
    <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
        System.out.println(<span class="hljs-string">&quot;Wait 5 second to check bulkInsert job state...&quot;</span>);
        <span class="hljs-keyword">try</span> {
            TimeUnit.SECONDS.sleep(<span class="hljs-number">5</span>);
        } <span class="hljs-keyword">catch</span> (InterruptedException e) {
            <span class="hljs-keyword">break</span>;
        }

        <span class="hljs-type">MilvusDescribeImportRequest</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> MilvusDescribeImportRequest.builder()
                .jobId(jobId)
                .build();
        <span class="hljs-type">String</span> <span class="hljs-variable">getImportProgressResult</span> <span class="hljs-operator">=</span> BulkImport.getImportProgress(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, request);

        <span class="hljs-type">JsonObject</span> <span class="hljs-variable">getImportProgressObject</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>().fromJson(getImportProgressResult, JsonObject.class);
        <span class="hljs-type">String</span> <span class="hljs-variable">state</span> <span class="hljs-operator">=</span> getImportProgressObject.getAsJsonObject(<span class="hljs-string">&quot;data&quot;</span>).get(<span class="hljs-string">&quot;state&quot;</span>).getAsString();
        <span class="hljs-type">String</span> <span class="hljs-variable">progress</span> <span class="hljs-operator">=</span> getImportProgressObject.getAsJsonObject(<span class="hljs-string">&quot;data&quot;</span>).get(<span class="hljs-string">&quot;progress&quot;</span>).getAsString();
        <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;Failed&quot;</span>.equals(state)) {
            <span class="hljs-type">String</span> <span class="hljs-variable">reason</span> <span class="hljs-operator">=</span> getImportProgressObject.getAsJsonObject(<span class="hljs-string">&quot;data&quot;</span>).get(<span class="hljs-string">&quot;reason&quot;</span>).getAsString();
            System.out.printf(<span class="hljs-string">&quot;The job %s failed, reason: %s%n&quot;</span>, jobId, reason);
            <span class="hljs-keyword">break</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;Completed&quot;</span>.equals(state)) {
            System.out.printf(<span class="hljs-string">&quot;The job %s completed%n&quot;</span>, jobId);
            <span class="hljs-keyword">break</span>;
        } <span class="hljs-keyword">else</span> {
            System.out.printf(<span class="hljs-string">&quot;The job %s is running, state:%s progress:%s%n&quot;</span>, jobId, state, progress);
        }
    }
}

<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> <span class="hljs-keyword">throws</span> Exception {
    List&lt;List&lt;String&gt;&gt; batchFiles = uploadData();
    <span class="hljs-type">String</span> <span class="hljs-variable">jobId</span> <span class="hljs-operator">=</span> bulkImport(batchFiles);
    getImportProgress(jobId);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">export MILVUS_URI=&quot;localhost:19530&quot;

curl --request POST &quot;http://${MILVUS_URI}/v2/vectordb/jobs/import/describe&quot; \
--header &quot;Content-Type: application/json&quot; \
--header &quot;Request-Timeout: 10&quot; \
--data-raw &#x27;{
    &quot;jobId&quot;: &quot;449839014328146739&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>可能的回應如下：</p>
<pre><code translate="no">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
        <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:13Z&quot;</span>,
        <span class="hljs-string">&quot;details&quot;</span>: [
            {
                <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:11Z&quot;</span>,
                <span class="hljs-string">&quot;fileName&quot;</span>: <span class="hljs-string">&quot;id:449839014328146740 paths:<span class="hljs-subst">\&quot;</span>/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet<span class="hljs-subst">\&quot;</span> &quot;</span>,
                <span class="hljs-string">&quot;fileSize&quot;</span>: <span class="hljs-number">31567874</span>,
                <span class="hljs-string">&quot;importedRows&quot;</span>: <span class="hljs-number">100000</span>,
                <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">100</span>,
                <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Completed&quot;</span>,
                <span class="hljs-string">&quot;totalRows&quot;</span>: <span class="hljs-number">100000</span>
            },
            {
                <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:11Z&quot;</span>,
                <span class="hljs-string">&quot;fileName&quot;</span>: <span class="hljs-string">&quot;id:449839014328146741 paths:<span class="hljs-subst">\&quot;</span>/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet<span class="hljs-subst">\&quot;</span> &quot;</span>,
                <span class="hljs-string">&quot;fileSize&quot;</span>: <span class="hljs-number">31517224</span>,
                <span class="hljs-string">&quot;importedRows&quot;</span>: <span class="hljs-number">100000</span>,
                <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">100</span>,
                <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Completed&quot;</span>,
                <span class="hljs-string">&quot;totalRows&quot;</span>: <span class="hljs-number">200000</span>            
            }
        ],
        <span class="hljs-string">&quot;fileSize&quot;</span>: <span class="hljs-number">63085098</span>,
        <span class="hljs-string">&quot;importedRows&quot;</span>: <span class="hljs-number">200000</span>,
        <span class="hljs-string">&quot;jobId&quot;</span>: <span class="hljs-string">&quot;449839014328146739&quot;</span>,
        <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Completed&quot;</span>,
        <span class="hljs-string">&quot;totalRows&quot;</span>: <span class="hljs-number">200000</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-Import-Jobs" class="common-anchor-header">列出匯入工作<button data-href="#List-Import-Jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以透過以下方式列出特定集合所對應的所有匯入工作：</p>
<div class="multipleCode">
 <a href="#python">Python 
 </a> <a href="#java"> Java</a>
 <a href="#shell"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> list_import_jobs

url = <span class="hljs-string">f&quot;http://127.0.0.1:19530&quot;</span>

<span class="hljs-comment"># List bulk-insert jobs</span>
resp = list_import_jobs(
    url=url,
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
)

<span class="hljs-built_in">print</span>(json.dumps(resp.json(), indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">listImportJobs</span><span class="hljs-params">()</span> {
    <span class="hljs-type">MilvusListImportJobsRequest</span> <span class="hljs-variable">listImportJobsRequest</span> <span class="hljs-operator">=</span> MilvusListImportJobsRequest.builder().collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>).build();
    <span class="hljs-type">String</span> <span class="hljs-variable">listImportJobsResult</span> <span class="hljs-operator">=</span> BulkImport.listImportJobs(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, listImportJobsRequest);
    System.out.println(listImportJobsResult);
}

<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> <span class="hljs-keyword">throws</span> Exception {
    listImportJobs();
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">export MILVUS_URI=&quot;localhost:19530&quot;

curl --request POST &quot;http://${MILVUS_URI}/v2/vectordb/jobs/import/list&quot; \
--header &quot;Content-Type: application/json&quot; \
--header &quot;Request-Timeout: 10&quot; \
--data-raw &#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>可能的值如下：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;records&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;collectionName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;quick_setup&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-attr">&quot;jobId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;448761313698322011&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-attr">&quot;progress&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span>
                <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Importing&quot;</span>
            <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limitations" class="common-anchor-header">限制<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>每個匯入檔案的大小不得超過<strong>16 GB</strong>。</p></li>
<li><p>每個匯入請求的檔案數量上限不得超過<strong>1024 個</strong>。每個匯入請求的資料量上限為：每檔 16 GB × 1024 檔 = 16 TB。</p></li>
<li><p>同時進行的匯入請求數量上限為<strong>1024</strong> 個。</p></li>
</ul>
<ul>
<li>每個匯入請求中僅能指定一個分區名稱。若未指定分區名稱，資料將插入預設分區。此外，若您已在目標集合中設定「分區金鑰」，則無法在匯入請求中設定分區名稱。</li>
</ul>
<h2 id="Constraints" class="common-anchor-header">限制條件<button data-href="#Constraints" class="anchor-icon" translate="no">
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
    </button></h2><p>在匯入資料之前，請務必確認您已了解以下 Milvus 行為相關的限制：</p>
<ul>
<li><p>關於「載入」行為的限制：</p>
<ul>
<li>若集合在匯入前已載入，您可在匯入完成後使用 `<code translate="no">refresh_load</code> ` 函式載入新匯入的資料。</li>
</ul></li>
<li><p>關於查詢與搜尋行為的限制：</p>
<ul>
<li><p>在匯入工作狀態顯示為「<strong>已完成</strong>」之前，新匯入的資料在查詢與搜尋中絕對不會被檢索到。</p></li>
<li><p>一旦工作狀態變為「<strong>已完成</strong>」，</p>
<ul>
<li><p>若集合尚未載入，您可以使用 `<code translate="no">load</code> ` 函式來載入新匯入的資料。</p></li>
<li><p>若集合已載入，您可以呼叫 `<code translate="no">load(is_refresh=True)</code> ` 來載入已匯入的資料。</p></li>
</ul></li>
</ul></li>
<li><p>關於刪除行為的限制：</p>
<ul>
<li><p>在匯入工作狀態變為「<strong>已完成</strong>」之前，刪除操作無法保證成功，結果可能成功也可能失敗。</p></li>
<li><p>當工作狀態為「<strong>已完成</strong>」後進行刪除，則保證成功。</p></li>
</ul></li>
</ul>
<h2 id="Recommendations" class="common-anchor-header">建議<button data-href="#Recommendations" class="anchor-icon" translate="no">
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
    </button></h2><p>我們強烈建議使用多檔案匯入功能，此功能可讓您在單一請求中上傳多個檔案。此方法不僅能簡化匯入流程，更能顯著提升匯入效能。同時，透過整合上傳作業，您可以減少花在資料管理上的時間，並使工作流程更為高效。</p>
