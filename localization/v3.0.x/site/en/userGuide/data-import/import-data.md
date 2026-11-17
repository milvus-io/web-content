---
id: import-data.md
order: 1
title: Import Data
summary: This page demonstrates the procedure to import the prepared data.
---
<h1 id="Import-data" class="common-anchor-header">Import data<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h1><p>This page demonstrates the procedure to import the prepared data.</p>
<h2 id="Before-you-start" class="common-anchor-header">Before you start<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>You have already prepared your data and placed it into the Milvus bucket.</p>
<p>If not, you should use <strong>RemoteBulkWriter</strong> to prepare your data first, and ensure that the prepared data has already been transferred to the Milvus bucket on the MinIO instance started along with your Milvus instance. For details, refer to <a href="/docs/prepare-source-data.md">Prepare Source Data</a>.</p></li>
<li><p>You have already created a collection with the schema you use to prepare your data. If not, refer to <a href="/docs/manage-collections.md">Manage Collections</a>.</p></li>
</ul>
<div class="language-python">
<p>The following code snippet creates a simple collection with the given schema. For more information on parameters, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> in the SDK reference.</p>
</div>
<div class="language-java">
<p>The following code snippet creates a simple collection with the given schema. For more information on parameters, refer to <a href="https://milvus.io/api-reference/java/v2.4.x/v1/Collection/createCollection.md"><code translate="no">createCollection()</code></a> in the SDK reference.</p>
</div>
<h2 id="Import-data" class="common-anchor-header">Import data<button data-href="#Import-data" class="anchor-icon" translate="no">
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
    </button></h2><p>If your pipeline may retry a failed or timed-out import request, tag the job with an idempotency key; see <a href="/docs/idempotent-import.md">Idempotent Bulk Import</a>.</p>
<p>To import the prepared data, you have to create an import job as follows:</p>
<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> bulk_import

url = <span class="hljs-string">f&quot;http://127.0.0.1:19530&quot;</span>

<span class="hljs-comment"># Bulk-insert data from a set of Parquet files already uploaded to the MinIO server</span>
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
<p>The request body contains two fields:</p>
<ul>
<li><p><code translate="no">collectionName</code></p>
<p>The name of the target collection.</p></li>
<li><p><code translate="no">files</code></p>
<p>A list of lists of file paths relative to the root path of the Milvus bucket on the MioIO instance started along with your Milvus instance. Possible sub-lists are as follows:</p>
<ul>
<li><p><strong>JSON files</strong></p>
<p>If the prepared file is in JSON format, <strong>each sub-list should contain the path to a single prepared JSON file</strong>.</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/d1782fa1-6b65-4ff3-b05a-43a436342445/1.json&quot;</span>
],
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Parquet files</strong></p>
<p>If the prepared file is in Parquet format, <strong>each sub-list should contain the path to a single prepared parquet file</strong>.</p>
<pre><code translate="no">[
    <span class="hljs-string">&quot;/a6fb2d1c-7b1b-427c-a8a3-178944e3b66d/1.parquet&quot;</span>
]

<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ul>
<p>The possible return is as follows:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;jobId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;448707763884413158&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="bulkimport-parameters" class="common-anchor-header"><code translate="no">bulk_import</code> parameters<button data-href="#bulkimport-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">bulk_import()</code> is a thin wrapper around <code translate="no">POST /v2/vectordb/jobs/import/create</code>. Beyond the
example above, it exposes the following parameters (PyMilvus 2.6 and later).</p>
<table>
<thead>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">url</code></td><td><code translate="no">str</code></td><td>Server address, for example <code translate="no">http://127.0.0.1:19530</code> or <code translate="no">https://api.cloud.zilliz.com</code>.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td><code translate="no">str</code></td><td>Target collection.</td></tr>
<tr><td><code translate="no">db_name</code></td><td><code translate="no">str</code></td><td>Target database. Sent as the <code translate="no">DB-Name</code> header for RBAC.</td></tr>
<tr><td><code translate="no">files</code></td><td><code translate="no">list[list[str]]</code></td><td>Files already available to the Milvus instance, for example on MinIO. These are <strong>server-side paths, not object URLs</strong>. Each sub-list is one JSON or Parquet file, or one set of NumPy files.</td></tr>
<tr><td><code translate="no">partition_name</code></td><td><code translate="no">str</code></td><td>Target partition. Passed through extra keyword arguments rather than a declared parameter, so it is easy to miss in the signature. Leave it empty for collections that use a partition key.</td></tr>
<tr><td><code translate="no">object_url</code></td><td><code translate="no">str</code></td><td>Single object URL on cloud object storage. Superseded by <code translate="no">object_urls</code>.</td></tr>
<tr><td><code translate="no">object_urls</code></td><td><code translate="no">list[list[str]]</code></td><td>Object URLs on cloud object storage, for example <code translate="no">s3://bucket/prefix/1.parquet</code>. Each sub-list is one object or one prefix that ends with <code translate="no">/</code>. Use this <strong>instead of</strong> <code translate="no">files</code>; the two are different transports, not synonyms.</td></tr>
<tr><td><code translate="no">cluster_id</code></td><td><code translate="no">str</code></td><td>Zilliz Cloud cluster ID.</td></tr>
<tr><td><code translate="no">project_id</code></td><td><code translate="no">str</code></td><td>Zilliz Cloud project ID, for project databases.</td></tr>
<tr><td><code translate="no">region_id</code></td><td><code translate="no">str</code></td><td>Region of the project database.</td></tr>
<tr><td><code translate="no">api_key</code></td><td><code translate="no">str</code></td><td>API key, or <code translate="no">username:password</code> for a self-hosted instance.</td></tr>
<tr><td><code translate="no">access_key</code> / <code translate="no">secret_key</code></td><td><code translate="no">str</code></td><td>Object storage credentials for <code translate="no">object_urls</code>.</td></tr>
<tr><td><code translate="no">token</code></td><td><code translate="no">str</code></td><td>Session token for short-term object storage credentials.</td></tr>
<tr><td><code translate="no">volume_name</code></td><td><code translate="no">str</code></td><td>Zilliz Cloud volume to import from. Requires <code translate="no">data_paths</code>.</td></tr>
<tr><td><code translate="no">data_paths</code></td><td><code translate="no">list[list[str]]</code></td><td>Paths inside <code translate="no">volume_name</code>. Each sub-list is one file or one prefix that ends with <code translate="no">/</code>.</td></tr>
<tr><td><code translate="no">verify</code></td><td><code translate="no">bool</code> or <code translate="no">str</code></td><td>Verify the server TLS certificate; <code translate="no">True</code> by default. A string is treated as a CA bundle path.</td></tr>
<tr><td><code translate="no">cert</code></td><td><code translate="no">str</code> or <code translate="no">tuple</code></td><td>Client certificate for mutual TLS: a file path, or a <code translate="no">('cert', 'key')</code> pair.</td></tr>
<tr><td><code translate="no">headers</code></td><td><code translate="no">dict[str, str]</code></td><td>Extra HTTP headers merged into the request; caller values win. Use it to send an idempotency key, for example <code translate="no">{IDEMPOTENCY_KEY_HEADER: &quot;nightly-2026-09-07-batch-3&quot;}</code>; see <a href="/docs/idempotent-import.md">Idempotent Bulk Import</a>.</td></tr>
<tr><td><code translate="no">options</code></td><td><code translate="no">dict</code></td><td>Additional import options forwarded to the server in the request body.</td></tr>
</tbody>
</table>
<p>Any remaining keyword arguments are forwarded to <code translate="no">requests.post</code>, so <code translate="no">timeout</code> and <code translate="no">proxies</code>
work as they do there. The wrapper sends a 20-second timeout by default.</p>
<h2 id="Check-import-progress" class="common-anchor-header">Check import progress<button data-href="#Check-import-progress" class="anchor-icon" translate="no">
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
    </button></h2><p>Once you get an import job ID, you can check the import progress as follows:</p>
<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#shell">cURL</a>
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
<p>The possible response is as follows:</p>
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
<h2 id="List-Import-Jobs" class="common-anchor-header">List Import Jobs<button data-href="#List-Import-Jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>You can list all import jobs relative to a specific collection as follows:</p>
<div class="multipleCode">
  <a href="#python">Python</a>
  <a href="#java">Java</a>
  <a href="#shell">cURL</a>
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
<p>The possible values are as follows:</p>
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
<h2 id="Limitations" class="common-anchor-header">Limitations<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>Each import file size should not exceed <strong>16 GB</strong>.</p></li>
<li><p>The maximum number of files per import request should not exceed <strong>1024</strong>. Each import request can have at most 16GB per file * 1024 files = 16TB of data.</p></li>
<li><p>The maximum number of concurrent import requests is limited to <strong>1024</strong>.</p></li>
</ul>
<ul>
<li>Only one partition name can be specified in an import request. If no partition name is specified, the data will be inserted into the default partition. Additionally, you cannot set a partition name in the import request if you have set the Partition Key in the target collection.</li>
</ul>
<h2 id="Constraints" class="common-anchor-header">Constraints<button data-href="#Constraints" class="anchor-icon" translate="no">
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
    </button></h2><p>Before importing data, ensure that you have acknowledged the constaints in terms of the following Milvus behaviors:</p>
<ul>
<li><p>Constraints regarding the Load behavior:</p>
<ul>
<li>If a collection has already been loaded before an import, you can use the <code translate="no">refresh_load</code> function to load the newly imported data after the import is complete.</li>
</ul></li>
<li><p>Constraints regarding the query & search behaviors:</p>
<ul>
<li><p>Before the import job status is <strong>Completed</strong>, the newly import data is guaranteed to be invisible to queries and searches.</p></li>
<li><p>Once the job status is <strong>Completed</strong>,</p>
<ul>
<li><p>If the collection is not loaded, you can use the <code translate="no">load</code> function to load the newly imported data.</p></li>
<li><p>If the collection is already loaded, you can call <code translate="no">load(is_refresh=True)</code> to load the imported data.</p></li>
</ul></li>
</ul></li>
<li><p>Constraints regarding the delete behavior:</p>
<ul>
<li><p>Before the import job status is <strong>Completed</strong>, deletion is not guaranteed and may or may not succeed.</p></li>
<li><p>Deletion after the job status is <strong>Completed</strong> is guaranted to succeed.</p></li>
</ul></li>
</ul>
<h2 id="Recommendations" class="common-anchor-header">Recommendations<button data-href="#Recommendations" class="anchor-icon" translate="no">
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
    </button></h2><p>We highly recommend utilizing the multi-file import feature, which allows you to upload several files in a single request. This method not only simplifies the import process but also significantly boosts import performance. Meanwhile, by consolidating your uploads, you can reduce the time spent on data management and make your workflow more efficient.</p>
