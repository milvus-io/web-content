---
id: m2m.md
summary: >-
  This guide provides a comprehensive, step-by-step process for migrating data
  from Milvus 1.x (including 0.9.x and above) to Milvus 2.x.
title: From Milvus 1.x
---
<h1 id="From-Milvus-1x" class="common-anchor-header">From Milvus 1.x<button data-href="#From-Milvus-1x" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide provides a comprehensive, step-by-step process for migrating data from Milvus 1.x (including 0.9.x and above) to Milvus 2.x. By following this guide, you will be able to efficiently transfer your data, leveraging Milvus 2.x advanced features and improved performance.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>Software versions</strong>:
<ul>
<li>Source Milvus: 0.9.x to 1.x</li>
<li>Target Milvus: 2.x</li>
</ul></li>
<li><strong>Required tools</strong>:
<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> tool. For installation details, refer to <a href="/docs/milvusdm_install.md/v2.4.x">Install Migration Tool</a>.</li>
</ul></li>
</ul>
<h2 id="Export-metadata-of-the-source-Milvus-installation" class="common-anchor-header">Export metadata of the source Milvus installation<button data-href="#Export-metadata-of-the-source-Milvus-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>To prepare migration data for Milvus 0.9.x through 1.x, stop the source Milvus or at least stop performing any DML operations in it.</p>
<ol>
<li><p>Export metadata of the source Milvus installation to <code translate="no">meta.json</code>.</p>
<ul>
<li>For those installations using MySQL as the backend, run</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -m <span class="hljs-string">&quot;user:password@tcp(adderss)/milvus?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span> -o outputDir
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>For those installations using SQLite as the backend, run</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -s /milvus/db/meta.sqlite -o outputDir
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Copy the <code translate="no">tables</code> folder of your Milvus installation, then move both <code translate="no">meta.json</code> and the <code translate="no">tables</code> folder to an empty folder.</p>
<p>Once this step is done, the structure of the empty folder should look like this:</p>
<pre><code translate="no">migration_data
├── meta.json
└── tables
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Upload the folder prepared in the preceding step to an S3 block storage bucket or directly use this local folder in the next section.</p></li>
</ol>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Configure the migration file<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Save the example migration config file as <code translate="no">migration.yaml</code> and modify the configs based on your actual conditions. You are free to put the config file in any local directory.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 16
meta:
  mode: <span class="hljs-built_in">local</span>
  localFile: /outputDir/test/meta.json
<span class="hljs-built_in">source</span>:
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: <span class="hljs-string">&quot;migration/test/xx&quot;</span>
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: <span class="hljs-literal">true</span>
    checkBucket: <span class="hljs-literal">false</span>
  milvus2x:
    endpoint: <span class="hljs-string">&quot;{yourMilvus2_xServerAddress}:{port}&quot;</span>
    username: xxxx
    password: xxxx
<button class="copy-code-btn"></button></code></pre>
<p>The following table describes the parameters in the example config file. For a full list of configs, refer to <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">Milvus Migration: Milvus1.x to Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>The concurrency of dumper threads.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>The operational mode of the migration job. Set to <code translate="no">milvus1x</code> when migrating from Milvus 1.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Buffer size to read from Milvus 1.x in each batch. Unit: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Buffer size to write to Milvus 2.x in each batch. Unit: KB.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>The concurrency of loader threads.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Specifies where the meta file meta.json is read from. Valid values: <code translate="no">local</code>, <code translate="no">remote</code>, <code translate="no">mysql</code>, <code translate="no">sqlite</code>.</td></tr>
<tr><td><code translate="no">meta.localFile</code></td><td>Local directory path where the <code translate="no">meta.json</code> file resides. This config is used only when <code translate="no">meta.mode</code> is set to <code translate="no">local</code>. For other meta configs, refer to <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta">README_1X</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Specifies where the source files are read from. Valid values:<br/>- <code translate="no">local</code>: reads files from a local disk.<br/>- <code translate="no">remote</code>: reads files from remote storage.</td></tr>
<tr><td><code translate="no">source.local.tablesDir</code></td><td>The directory path where the source files are located. For example, <code translate="no">/db/tables/</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Storage location for dumped files. Valid values:<br/>- <code translate="no">local</code>: Store dumped files on local disks.<br/>- <code translate="no">remote</code>: Store dumped files on object storage.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Output directory path in the cloud storage bucket.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Access key for Milvus 2.x storage.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Secret key for Milvus 2.x storage.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Cloud storage service provider. Example values: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Cloud storage region. It can be any value if you use local MinIO.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Bucket name for storing data. The value must be the same as the config in Milvus 2.x. For more information, refer to <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">System Configurations</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Whether to use an IAM Role for connection.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Whether to check if the specified bucket exists in object storage.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Address of the target Milvus server.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Username for the Milvus 2.x server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to <a href="https://milvus.io/docs/authenticate.md">Enable Authentication</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Password for the Milvus 2.x server. This parameter is required if user authentication is enabled for your Milvus server. For more information, refer to <a href="https://milvus.io/docs/authenticate.md">Enable Authentication</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">Start the migration task<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Start the migration task with the following command. Replace <code translate="no">{YourConfigFilePath}</code> with the local directory where the config file <code translate="no">migration.yaml</code> resides.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>The command above converts the source data in Milvus 1.x into NumPy files, and then uses the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> operation to write the data to the target bucket.</p></li>
<li><p>Once NumPy files are generated, import these files into Milvus 2.x with the following command. Replace <code translate="no">{YourConfigFilePath}</code> with the local directory where the config file <code translate="no">migration.yaml</code> resides.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-result" class="common-anchor-header">Verify the result<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>Once the migration task is executed, you can make API calls or use Attu to view the number of entities migrated. For more information, refer to <a href="https://github.com/zilliztech/attu">Attu</a> and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
