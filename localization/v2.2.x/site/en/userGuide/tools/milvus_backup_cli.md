---
id: milvus_backup_cli.md
summary: Learn how to use Milvus Backup through CLI
title: ''
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Back up and Restore Data Using Commands<button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup provides data backup and restoration features to ensure the security of your Milvus data.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Obtain Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>You can either download the compiled binary or build from the source.</p>
<p>To download the compiled binary, go to the <a href="https://github.com/zilliztech/milvus-backup/releases">release</a> page, where you can find all official releases. Remember, always use the binaries in the release marked as <strong>Latest</strong>.</p>
<p>To compile from the source, do as follows:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> git@github.com:zilliztech/milvus-backup.git
go get
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Prepare configuration file<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Download the <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">example configuration file</a> and tailor it to fit your needs.</p>
<p>Then create a folder alongside the downloaded or built Milvus Backup binary, name the folder <code translate="no">configs</code>, and place the configuration file inside the <code translate="no">configs</code> folder.</p>
<p>Your folder structure should be similar to the following:</p>
<pre>
workspace
├── milvus-backup
└── configs
     └── backup.yaml
</pre>
<p>Because Milvus Backup cannot back up your data to a local path, ensure that Minio settings are correct when tailoring the configuration file.</p>
<div class="alert note">
<p>The name of the default Minio bucket varies with the way you install Milvus. When making changes to Minio settings, do refer to the following table.</p>
<table>
<thead>
<tr><th>field</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>files</td><td>file</td></tr>
</tbody>
</table>
</div>
<h2 id="Prepare-data" class="common-anchor-header">Prepare data<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>If you run an empty local Milvus instance at the default port, use the example Python scripts to generate some data in your instance. Feel free to make necessary changes to the scripts to fit your needs.</p>
<p>Obtain the <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">scripts</a>. Then run the scripts to generate the data. Ensure that <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, the official Milvus Python SDK, has been installed.</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>This step is optional. If you skip this, ensure that you already have some data in your Milvus instance.</p>
<h2 id="Back-up-data" class="common-anchor-header">Back up data<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Note that running Milvus Backup against a Milvus instance will not normally affect the running of the instance. Your Milvus instance is fully functional during backup or restore.</p>
<div class="tab-wrapper"><a href="/docs/v2.2.x/attu_install-docker.md" class=''>Install with Docker Compose</a><a href="/docs/v2.2.x/attu_install-helm.md" class=''>Install with Helm Chart</a><a href="/docs/v2.2.x/attu_install-package.md" class=''>Install with Package</a></div>
<p>Run the following command to create a backup.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n &lt;backup_name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Once the command is executed, you can check the backup files in the bucket specified in the Minio settings. Specifically, you can download them using <strong>Minio Console</strong> or the <strong>mc</strong> client.</p>
<p>To download from <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minio Console</a>, log into Minio Console, locate the bucket specified in <code translate="no">minio.address</code>, select the files in the bucket, and click <strong>Download</strong> to download them.</p>
<p>If you prefer <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">the mc client</a>, do as follows:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># configure a Minio host</span>
mc alias <span class="hljs-built_in">set</span> my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;

<span class="hljs-comment"># List the available buckets</span>
mc ls my_minio

<span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Now, you can save the backup files to a safe place for restoration in the future, or upload them to <a href="https://cloud.zilliz.com">Zilliz Cloud</a> to create a managed vector database with your data. For details, refer to <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Migrate from Milvus to Zilliz Cloud</a>.</p>
<h2 id="Restore-data" class="common-anchor-header">Restore data<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><div class="tab-wrapper"><a href="/docs/v2.2.x/attu_install-docker.md" class=''>Install with Docker Compose</a><a href="/docs/v2.2.x/attu_install-helm.md" class=''>Install with Helm Chart</a><a href="/docs/v2.2.x/attu_install-package.md" class=''>Install with Package</a></div>
<p>You can run the <code translate="no">restore</code> command with the <code translate="no">-s</code> flag to create a new collection by restoring the data from the backup:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>The <code translate="no">-s</code> flag allows you to set a suffix for the new collection to be created. The above command will create a new collection called <strong>hello_milvus_recover</strong> in your Milvus instance.</p>
<p>If you prefer to restore the backed-up collection without changing its name, drop the collection before restoring it from the backup. You can now clean the data generated in <a href="#Prepare-data">Prepare data</a> by running the following command.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Then run the following command to restore the data from the backup.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-restored-data" class="common-anchor-header">Verify restored data<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Once the restore completes, you can verify the restored data by indexing the restored collection as follows:</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Note that the above script assumes that you have run the <code translate="no">restore</code> command with the <code translate="no">-s</code> flag and the suffix is set to <code translate="no">-recover</code>. Feel free to make necessary changes to the script to fit your need.</p>
