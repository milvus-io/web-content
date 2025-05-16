---
id: f2m.md
title: From Faiss
related_key: 'Faiss, migrate, import'
summary: Learn how to migrate Faiss data to Milvus.
---
<h1 id="From-Faiss" class="common-anchor-header">From Faiss<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide provides a comprehensive, step-by-step process for migrating data from Faiss to Milvus 2.x. By following this guide, you will be able to efficiently transfer your data, leveraging Milvus 2.x advanced features and improved performance.</p>
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
<li>Source Faiss</li>
<li>Target Milvus: 2.x</li>
<li>For installation details, see <a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">Installing Faiss</a> and <a href="https://milvus.io/docs/install_standalone-docker.md">Install Milvus</a>.</li>
</ul></li>
<li><strong>Required tools</strong>:
<ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> tool. For installation details, refer to <a href="/docs/milvusdm_install.md/v2.4.x">Install Migration Tool</a>.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">Configure the migration<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: faiss    <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 2
<span class="hljs-built_in">source</span>: <span class="hljs-comment"># configs for the source Faiss index.</span>
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: <span class="hljs-comment"># configs for the target Milvus collection.</span>
  create:
    collection:
      name: test1w
      shardsNums: 2
      dim: 256
      metricType: L2

  mode: remote
  remote:
    outputDir: testfiles/output/
    cloud: aws
    endpoint: 0.0.0.0:9000
    region: ap-southeast-1
    bucket: a-bucket
    ak: minioadmin
    sk: minioadmin
    useIAM: <span class="hljs-literal">false</span>
    useSSL: <span class="hljs-literal">false</span>
    checkBucket: <span class="hljs-literal">true</span>
  milvus2x:
    endpoint: localhost:19530
    username: xxxxx
    password: xxxxx

<button class="copy-code-btn"></button></code></pre>
<p>The following table describes the parameters in the example config file. For a full list of configs, refer to <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Milvus Migration: Faiss to Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>The concurrency of dumper threads.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>The operational mode of the migration job. Set to faiss when migrating from Faiss indexes.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Buffer size to read from Faiss in each batch. Unit: KB.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Buffer size to write to Milvus in each batch. Unit: KB.</td></tr>
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
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Specifies where the source files are read from. Valid values:<br/>- <code translate="no">local</code>: reads files from a local disk.<br/>- <code translate="no">remote</code>: reads files from remote storage.</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>The directory path where the source files are located. For example, <code translate="no">/db/faiss.index</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>Name of the Milvus collection.</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>Number of shards to be created in the collection. For more information on shards, refer to <a href="https://milvus.io/docs/glossary.md#Shard">Terminology</a>.</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>Dimension of the vector field.</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>Metric type used to measure similarities between vectors. For more information, refer to <a href="https://milvus.io/docs/glossary.md#Metric-type">Terminology</a>.</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>Storage location for dumped files. Valid values:<br/>- <code translate="no">local</code>: Store dumped files on local disks.<br/>- <code translate="no">remote</code>: Store dumped files on object storage.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Output directory path in the cloud storage bucket.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Cloud storage service provider. Example values: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>Endpoint of Milvus 2.x storage.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Cloud storage region. It can be any value if you use local MinIO.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Bucket name for storing data. The value must be the same as the config in Milvus 2.x. For more information, refer to <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">System Configurations</a>.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Access key for Milvus 2.x storage.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Secret key for Milvus 2.x storage.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Whether to use an IAM Role for connection.</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>Whether to enable SSL when connecting to Milvus 2.x. For more information, refer to <a href="https://milvus.io/docs/tls.md#Encryption-in-Transit">Encryption in Transit</a>.</td></tr>
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
<p>The command above converts the Faiss index data into NumPy files, and then uses the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> operation to write the data to the target bucket.</p></li>
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
