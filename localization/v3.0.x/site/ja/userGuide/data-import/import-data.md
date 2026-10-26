---
id: import-data.md
order: 1
title: データのインポート
summary: このページでは、準備したデータをインポートする手順を説明します。
---
<h1 id="Import-data" class="common-anchor-header">データのインポート<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、準備したデータをインポートする手順を説明します。</p>
<h2 id="Before-you-start" class="common-anchor-header">開始する前に<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>データはすでに準備済みで、Milvusバケットに格納されているものとします。</p>
<p>そうでない場合は、まず<strong>RemoteBulkWriter</strong>を使用してデータを準備し、準備したデータが Milvus インスタンスとともに起動された MinIO インスタンス上の Milvus バケットにすでに転送されていることを確認してください。詳細については、「<a href="/docs/ja/prepare-source-data.md">ソースデータの準備</a>」を参照してください。</p></li>
<li><p>データの前処理に使用するスキーマに基づいて、コレクションをすでに作成しているものとします。まだ作成していない場合は、「<a href="/docs/ja/manage-collections.md">コレクションの管理</a>」を参照してください。</p></li>
</ul>
<div class="language-python">
<p>以下のコードスニペットは、指定されたスキーマを使用して単純なコレクションを作成します。パラメータの詳細については、 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> および <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> SDKリファレンスを参照してください。</p>
</div>
<div class="language-java">
<p>以下のコードスニペットは、指定されたスキーマを持つ単純なコレクションを作成します。パラメータの詳細については、 <a href="https://milvus.io/api-reference/java/v2.4.x/v1/Collection/createCollection.md"><code translate="no">createCollection()</code></a> SDKリファレンスの</p>
</div>
<h2 id="Import-data" class="common-anchor-header">データのインポート<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h2><p>パイプラインで、失敗またはタイムアウトしたインポートリクエストを再試行する可能性がある場合は、ジョブにイデポテンシーキーを付与してください。「<a href="/docs/ja/idempotent-import.md">イデポテンシーのある一括インポート」を</a>参照してください。</p>
<p>準備したデータをインポートするには、次のようにインポートジョブを作成する必要があります。</p>
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
<p>リクエスト本文には 2 つのフィールドが含まれます:</p>
<ul>
<li><p><code translate="no">collectionName</code></p>
<p>ターゲットコレクションの名前。</p></li>
<li><p><code translate="no">files</code></p>
<p>Milvusインスタンスとともに起動されたMioIOインスタンス上のMilvusバケットのルートパスに対する相対ファイルパスのリストのリスト。含まれる可能性のあるサブリストは以下の通りです：</p>
<ul>
<li><p><strong>JSONファイル</strong></p>
<p>準備されたファイルがJSON形式の場合、<strong>各サブリストには、1つの準備済みJSONファイルへのパスを含める必要があります</strong>。</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/d1782fa1-6b65-4ff3-b05a-43a436342445/1.json&quot;</span>
],
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Parquetファイル</strong></p>
<p>準備されたファイルがParquet形式の場合、<strong>各サブリストには、1つの準備済みParquetファイルへのパスを含める必要があります</strong>。</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/a6fb2d1c-7b1b-427c-a8a3-178944e3b66d/1.parquet&quot;</span>
]

<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ul>
<p>返される可能性のある結果は以下の通りです：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;jobId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;448707763884413158&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-import-progress" class="common-anchor-header">インポートの進捗状況を確認する<button data-href="#Check-import-progress" class="anchor-icon" translate="no">
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
    </button></h2><p>インポートジョブ ID を取得したら、次のようにインポートの進捗状況を確認できます:</p>
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
<p>返される応答は以下の通りです：</p>
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
<h2 id="List-Import-Jobs" class="common-anchor-header">インポートジョブのリスト表示<button data-href="#List-Import-Jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>特定のコレクションに関連するすべてのインポートジョブを、次のように一覧表示できます：</p>
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
<p>指定可能な値は以下の通りです：</p>
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
<h2 id="Limitations" class="common-anchor-header">制限事項<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>各インポートファイルのサイズは<strong>16 GB</strong> を超えてはなりません。</p></li>
<li><p>1回のインポートリクエストあたりの最大<strong>ファイル数は1024</strong>を超えてはなりません。各インポートリクエストでは、1ファイルあたり最大16 GB × 1024ファイル = 16 TBのデータを処理できます。</p></li>
<li><p>同時に実行できるインポートリクエストの最大数は<strong>1024</strong> に制限されています。</p></li>
</ul>
<ul>
<li>インポートリクエストで指定できるパーティション名は1つだけです。パーティション名が指定されていない場合、データはデフォルトのパーティションに挿入されます。また、ターゲットコレクションでパーティションキーが設定されている場合、インポートリクエストでパーティション名を設定することはできません。</li>
</ul>
<h2 id="Constraints" class="common-anchor-header">制約事項<button data-href="#Constraints" class="anchor-icon" translate="no">
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
    </button></h2><p>データをインポートする前に、Milvusの以下の動作に関する制約事項を必ず確認してください：</p>
<ul>
<li><p>ロード動作に関する制約：</p>
<ul>
<li>インポート前にコレクションがすでにロードされている場合、<code translate="no">refresh_load</code> 関数を使用して、インポート完了後に新しくインポートされたデータをロードすることができます。</li>
</ul></li>
<li><p>クエリおよび検索の動作に関する制約：</p>
<ul>
<li><p>インポートジョブのステータスが「<strong>完了</strong>」になるまでは、新しくインポートされたデータはクエリや検索の対象外となることが保証されています。</p></li>
<li><p>ジョブのステータスが「<strong>完了</strong>」になると、</p>
<ul>
<li><p>コレクションが読み込まれていない場合は、<code translate="no">load</code> 関数を使用して、新しくインポートされたデータを読み込むことができます。</p></li>
<li><p>コレクションがすでに読み込まれている場合は、<code translate="no">load(is_refresh=True)</code> を呼び出して、インポートされたデータを読み込むことができます。</p></li>
</ul></li>
</ul></li>
<li><p>削除動作に関する制約：</p>
<ul>
<li><p>インポートジョブのステータスが「<strong>完了</strong>」になる前は、削除が保証されず、成功する場合もあれば失敗する場合もあります。</p></li>
<li><p>ジョブのステータスが「<strong>完了</strong>」になった後の削除は、確実に成功します。</p></li>
</ul></li>
</ul>
<h2 id="Recommendations" class="common-anchor-header">推奨事項<button data-href="#Recommendations" class="anchor-icon" translate="no">
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
    </button></h2><p>1回のリクエストで複数のファイルをアップロードできる「複数ファイルインポート」機能の利用を強く推奨します。この方法により、インポートプロセスが簡素化されるだけでなく、インポートのパフォーマンスも大幅に向上します。また、アップロードを統合することで、データ管理に費やす時間を削減し、ワークフローの効率化を図ることができます。</p>
