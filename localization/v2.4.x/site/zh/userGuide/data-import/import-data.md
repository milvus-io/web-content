---
id: import-data.md
order: 1
title: 导入数据
summary: 本页演示导入准备好的数据的程序。
---
<h1 id="Import-data" class="common-anchor-header">导入数据<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h1><p>本页演示导入准备好的数据的步骤。</p>
<h2 id="Before-you-start" class="common-anchor-header">开始之前<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>您已经准备好数据并将其放入 Milvus 存储桶。</p>
<p>如果没有，您应该先使用<strong>RemoteBulkWriter</strong>准备数据，并确保准备好的数据已经传输到与您的 Milvus 实例一起启动的 MinIO 实例上的 Milvus 数据桶中。有关详细信息，请参阅<a href="/docs/zh/v2.4.x/prepare-source-data.md">准备源数据</a>。</p></li>
<li><p>您已经使用用于准备数据的 Schema 创建了一个 Collections。如果没有，请参阅<a href="/docs/zh/v2.4.x/manage-collections.md">管理 Collections</a>。</p></li>
</ul>
<div class="language-python">
<p>下面的代码片段使用给定的 Schema 创建了一个简单的 Collections。有关参数的更多信息，请参阅 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>和 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a>SDK 参考资料。</p>
</div>
<div class="language-java">
<p>以下代码片段使用给定的 Schema 创建一个简单集合。有关参数的更多信息，请参阅 <a href="https://milvus.io/api-reference/java/v2.4.x/v1/Collection/createCollection.md"><code translate="no">createCollection()</code></a>有关参数的更多信息，请参阅 SDK 参考资料中的</p>
</div>
<h2 id="Import-data" class="common-anchor-header">导入数据<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h2><p>要导入准备好的数据，必须创建如下导入任务：</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#shell">cURL</a></div>
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
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl --request POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/jobs/import/create&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;files&quot;: [
        [
            &quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet&quot;
        ],
        [
            &quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet&quot;
        ]
    ],
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>请求体包含两个字段：</p>
<ul>
<li><p><code translate="no">collectionName</code></p>
<p>目标 Collections 的名称。</p></li>
<li><p><code translate="no">files</code></p>
<p>与 Milvus 实例一起启动的 MioIO 实例上相对于 Milvus 存储桶根路径的文件路径列表。可能的子列表如下：</p>
<ul>
<li><p><strong>JSON 文件</strong></p>
<p>如果准备的文件是 JSON 格式，则<strong>每个子列表都应包含单个准备的 JSON 文件的路径</strong>。</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/d1782fa1-6b65-4ff3-b05a-43a436342445/1.json&quot;</span>
],
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Parquet 文件</strong></p>
<p>如果准备的文件是 Parquet 格式，则<strong>每个子列表都应包含单个准备的 parquet 文件的路径</strong>。</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/a6fb2d1c-7b1b-427c-a8a3-178944e3b66d/1.parquet&quot;</span>
]

<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ul>
<p>可能的返回值如下：</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;jobId&quot;</span>: <span class="hljs-string">&quot;448707763884413158&quot;</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Check-import-progress" class="common-anchor-header">检查导入进度<button data-href="#Check-import-progress" class="anchor-icon" translate="no">
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
    </button></h2><p>获得导入任务 ID 后，可以按如下方式检查导入进度：</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#shell">cURL</a></div>
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
<pre><code translate="no" class="language-java"><span class="hljs-function"><span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">getImportProgress</span>(<span class="hljs-params">String jobId</span>)</span> {
    <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
        System.<span class="hljs-keyword">out</span>.println(<span class="hljs-string">&quot;Wait 5 second to check bulkInsert job state...&quot;</span>);
        <span class="hljs-keyword">try</span> {
            TimeUnit.SECONDS.sleep(<span class="hljs-number">5</span>);
        } <span class="hljs-keyword">catch</span> (InterruptedException e) {
            <span class="hljs-keyword">break</span>;
        }

        MilvusDescribeImportRequest request = MilvusDescribeImportRequest.builder()
                .jobId(jobId)
                .build();
        String getImportProgressResult = BulkImport.getImportProgress(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, request);

        JsonObject getImportProgressObject = <span class="hljs-keyword">new</span> Gson().fromJson(getImportProgressResult, JsonObject.<span class="hljs-keyword">class</span>);
        String state = getImportProgressObject.getAsJsonObject(<span class="hljs-string">&quot;data&quot;</span>).<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;state&quot;</span>).getAsString();
        String progress = getImportProgressObject.getAsJsonObject(<span class="hljs-string">&quot;data&quot;</span>).<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;progress&quot;</span>).getAsString();
        <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;Failed&quot;</span>.<span class="hljs-keyword">equals</span>(state)) {
            String reason = getImportProgressObject.getAsJsonObject(<span class="hljs-string">&quot;data&quot;</span>).<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;reason&quot;</span>).getAsString();
            System.<span class="hljs-keyword">out</span>.printf(<span class="hljs-string">&quot;The job %s failed, reason: %s%n&quot;</span>, jobId, reason);
            <span class="hljs-keyword">break</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;Completed&quot;</span>.<span class="hljs-keyword">equals</span>(state)) {
            System.<span class="hljs-keyword">out</span>.printf(<span class="hljs-string">&quot;The job %s completed%n&quot;</span>, jobId);
            <span class="hljs-keyword">break</span>;
        } <span class="hljs-keyword">else</span> {
            System.<span class="hljs-keyword">out</span>.printf(<span class="hljs-string">&quot;The job %s is running, state:%s progress:%s%n&quot;</span>, jobId, state, progress);
        }
    }
}

<span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span>(<span class="hljs-params">String[] args</span>) throws Exception</span> {
    List&lt;List&lt;String&gt;&gt; batchFiles = uploadData();
    String jobId = bulkImport(batchFiles);
    getImportProgress(jobId);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl --request POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/jobs/import/describe&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;jobId&quot;: &quot;449839014328146739&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>可能的返回如下</p>
<pre><code translate="no">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
        <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:13Z&quot;</span>,
        <span class="hljs-string">&quot;details&quot;</span>: [
            {
                <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:11Z&quot;</span>,
                <span class="hljs-string">&quot;fileName&quot;</span>: <span class="hljs-string">&quot;id:449839014328146740 paths:\&quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet\&quot; &quot;</span>,
                <span class="hljs-string">&quot;fileSize&quot;</span>: <span class="hljs-number">31567874</span>,
                <span class="hljs-string">&quot;importedRows&quot;</span>: <span class="hljs-number">100000</span>,
                <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">100</span>,
                <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Completed&quot;</span>,
                <span class="hljs-string">&quot;totalRows&quot;</span>: <span class="hljs-number">100000</span>
            },
            {
                <span class="hljs-string">&quot;completeTime&quot;</span>: <span class="hljs-string">&quot;2024-05-18T02:57:11Z&quot;</span>,
                <span class="hljs-string">&quot;fileName&quot;</span>: <span class="hljs-string">&quot;id:449839014328146741 paths:\&quot;/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet\&quot; &quot;</span>,
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
<h2 id="List-Import-Jobs" class="common-anchor-header">列出导入任务<button data-href="#List-Import-Jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以按如下方式列出相对于特定 Collections 的所有导入任务：</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#shell">cURL</a></div>
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
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl --request POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/jobs/import/list&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>可能的值如下：</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;records&quot;</span>: [
            {
                <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
                <span class="hljs-string">&quot;jobId&quot;</span>: <span class="hljs-string">&quot;448761313698322011&quot;</span>,
                <span class="hljs-string">&quot;progress&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Importing&quot;</span>
            }
        ]
    }
}
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
<li><p>每个导入文件的大小不得超过<strong>16 GB</strong>。</p></li>
<li><p>导入请求的最大数量限制为<strong>1024</strong>。</p></li>
<li><p>每个导入请求的最大文件数不得超过<strong>1024</strong>。</p></li>
<li><p>导入请求中只能指定一个分区名称。如果没有指定分区名称，数据将插入默认分区。此外，如果在目标 Collections 中设置了 Partition Key，则无法在导入请求中设置分区名称。</p></li>
</ul>
<h2 id="Constraints" class="common-anchor-header">限制条件<button data-href="#Constraints" class="anchor-icon" translate="no">
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
    </button></h2><p>导入数据前，请确保已确认以下 Milvus 行为方面的约束：</p>
<ul>
<li><p>有关加载行为的限制：</p>
<ul>
<li>如果在导入之前已经加载了一个 Collections，则可以在导入完成后使用<code translate="no">refresh_load</code> 函数加载新导入的数据。</li>
</ul></li>
<li><p>有关查询和搜索行为的限制：</p>
<ul>
<li><p>在导入任务状态为 "<strong>已完成 "</strong>之前，保证新导入的数据对查询和搜索是不可见的。</p></li>
<li><p>一旦任务状态为<strong>完成</strong>、</p>
<ul>
<li><p>如果 Collections 未加载，可使用<code translate="no">load</code> 函数加载新导入的数据。</p></li>
<li><p>如果 Collections 已加载，则可调用<code translate="no">load(is_refresh=True)</code> 加载导入的数据。</p></li>
</ul></li>
</ul></li>
<li><p>有关删除行为的限制：</p>
<ul>
<li><p>在导入任务状态为 "<strong>已完成 "</strong>之前，不保证删除成功。</p></li>
<li><p>在任务状态为 "<strong>已完成</strong>"之后，删除将保证成功。</p></li>
</ul></li>
</ul>
<h2 id="Recommendations" class="common-anchor-header">建议<button data-href="#Recommendations" class="anchor-icon" translate="no">
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
    </button></h2><p>我们强烈建议使用多文件导入功能，该功能允许您在单个请求中上传多个文件。这种方法不仅简化了导入过程，还能显著提高导入性能。同时，通过合并上传，您可以减少用于数据管理的时间，提高工作流程的效率。</p>
