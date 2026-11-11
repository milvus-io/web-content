---
id: milvus_backup_0_6_cli.md
summary: >-
  Configure Milvus Backup, create a backup, and verify restored data using the
  CLI.
title: Back up and Restore Data Using Commands
beta: Milvus Backup 0.6.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Back up and Restore Data Using Commands<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.6.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Use Milvus Backup to back up collections and restore them in the same or another Milvus instance. Backup and restore on Milvus 3.0 is officially supported starting with <strong>Milvus 3.0.1</strong>. Milvus Backup also supports binlog workflows on supported Milvus 2.x versions; check <a href="/docs/milvus_backup_overview.md#Compatibility-matrix">Milvus Backup compatibility</a>.</p>
<p>If you are keeping Backup 0.5.x, use the <a href="/docs/milvus_backup_cli.md">0.5.x CLI guide</a>. If you are upgrading, follow <a href="/docs/milvus_backup_upgrade.md">Upgrade Milvus Backup</a> first.</p>
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
    </button></h2><p>The examples below were validated with <strong>Milvus Backup 0.6.0</strong>. Download the binary for your operating system and architecture from the <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0 release</a>, then extract it. Keep the binary and configuration examples on the same release.</p>
<p>To build from source instead, install <strong>Go 1.26 or later</strong>, then run:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>The prebuilt binary does not require Go. Run all subsequent shell commands from the directory containing <code translate="no">milvus-backup</code>.</p>
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
    </button></h2><p>Milvus Backup needs access to the Milvus gRPC endpoint, its management endpoint, the instance’s storage, and the backup destination. For snapshot backups, the Milvus server also needs access to the backup storage.</p>
<p>Create a configuration directory:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Save this MinIO example as <code translate="no">configs/backup.yaml</code>. Replace the addresses, credentials, bucket, and root path with the settings of your deployment. The <code translate="no">minioadmin</code> credentials are MinIO test defaults.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://localhost:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">milvus.grpc</code> connects to the instance being backed up or restored. If authentication is enabled, also set <code translate="no">milvus.user</code> and <code translate="no">milvus.password</code>.</li>
<li><code translate="no">milvus.management.endpoint</code> is used for garbage collection pause/resume during backup.</li>
<li><code translate="no">milvus.storage</code> must match the instance’s actual object storage. Setting a bucket here does not change Milvus configuration.</li>
<li><code translate="no">backup.storage</code> identifies the backup location. Unset fields inherit from <code translate="no">milvus.storage</code>, except <code translate="no">rootPath</code>, which defaults to <code translate="no">backup</code>.</li>
<li><code translate="no">transfer.mode: auto</code> selects storage-side copying when the backends match and streaming through Milvus Backup otherwise. This setting controls object transfer, not the backup format.</li>
</ul>
<p>Typical storage defaults are shown below. Confirm the values in your running deployment before using them.</p>
<table>
<thead>
<tr><th>Setting</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>Bucket</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>Root path</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>If the Milvus server uses a different address to reach the backup store, set <code translate="no">backup.storage.milvusAddress</code> and <code translate="no">milvusPort</code> to the server-reachable address. For authentication, TLS, other storage providers, and additional settings, see the <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">0.6.0 configuration example</a>.</p>
<p>Inspect the effective values and check connectivity:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> masks secret values and reports where each value came from. The connectivity check should report <code translate="no">Success!</code>. Resolve connection or storage errors before creating a backup.</p>
<p>For existing v1 configurations, see <a href="/docs/milvus_backup_upgrade.md#Migrate-the-configuration">Upgrade Milvus Backup</a>. Automatic configuration translation does not replace removed CLI flags.</p>
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
    </button></h2><p>Use an existing collection named <code translate="no">coll</code> and ensure that <code translate="no">coll_bak</code> does not exist. Record the schema, entity count, representative scalar and vector values, and a known search result before backup. Keep the example data unchanged while comparing the restored copy. To create a small disposable dataset instead, use <a href="/docs/snapshot-backup-and-restore.md#Prepare-sample-data">Prepare sample data</a>.</p>
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
    </button></h2><p>Create a named backup of <code translate="no">coll</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>The create command should report <code translate="no">create backup success</code>. <code translate="no">get</code> returns backup metadata; check that the expected collection is present. Omitting <code translate="no">--filter</code> backs up all eligible collections. External collections are skipped.</p>
<p><code translate="no">--filter</code> accepts comma-separated names: <code translate="no">coll</code> in the default database, <code translate="no">db1.coll</code>, or <code translate="no">'db1.*'</code> for all collections in a database. Quote patterns containing <code translate="no">*</code> to prevent shell expansion.</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">Choose a backup format or purpose<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>With the default <code translate="no">--format auto</code>, Milvus 3.0 uses snapshot backups; supported Milvus 2.x servers use binlog. To retain binlog behavior explicitly, pass <code translate="no">--format binlog</code>. The <a href="/docs/snapshot-backup-and-restore.md">snapshot example</a> selects <code translate="no">--format snapshot</code> explicitly.</p>
<p>Use <code translate="no">--for</code> when a purpose matches your workflow:</p>
<table>
<thead>
<tr><th>Purpose</th><th>Values applied by the preset</th><th>Intended use</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>Enables RBAC backup; keeps your format and strategy choices</td><td>Copy data to another instance; <code translate="no">auto</code> uses snapshot on Milvus 3.0</td></tr>
<tr><td><code translate="no">archive</code></td><td>Forces <code translate="no">binlog</code> and enables RBAC backup</td><td>Keep a binlog-format backup for later restoration</td></tr>
<tr><td><code translate="no">secondary</code></td><td>Forces <code translate="no">binlog</code>, <code translate="no">bulk_flush</code>, RBAC backup, and index extra metadata</td><td>Initialize a secondary in a configured replication topology</td></tr>
</tbody>
</table>
<p>For example:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>A preset overrides conflicting values for the options it fixes. For example, <code translate="no">--for archive --format snapshot</code> produces a binlog backup. Backing up RBAC metadata does not automatically restore it; use the restore command’s <code translate="no">--rbac</code> option when required.</p>
<p><code translate="no">secondary</code> is not a shortcut for ordinary cross-instance restoration. It also requires access to the source etcd for index metadata, correct replication cluster IDs and channels, and a fresh secondary target. The backup must retain its complete metadata, including <code translate="no">meta/full_meta.json</code>. Configuring replication and performing failover are outside this guide. See the <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">0.6.0 source and reference</a> for the version-specific implementation and requirements.</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">Preserve the complete backup<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>A backup is stored under <code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code>. Preserve every object in this directory. Snapshot backups include an exported bundle as well as metadata.</p>
<p>Do not copy only the metadata files or assume a snapshot backup has the same layout as a binlog backup.</p>
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
    </button></h2><p>Restore <code translate="no">coll</code> as <code translate="no">coll_bak</code> in the configured instance:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>On the CLI, <code translate="no">--filter</code> matches names <strong>after</strong> <code translate="no">-s</code> or <code translate="no">--rename</code> is applied. A command with <code translate="no">--filter coll -s _bak</code> matches nothing and can exit successfully without restoring a collection.</p>
<p>To restore using the original name, choose a target where that collection name does not exist, point the configuration to that target and the backup location, and omit the suffix:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>For a complete same-instance example, see <a href="/docs/snapshot-backup-and-restore.md">Snapshot Backup and Restore in One Instance</a>. The existing cross-instance common-case pages use Backup 0.5.16 and v1 configuration; do not apply their commands unchanged to 0.6.0. For 0.6.0 transfer configuration, see the <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">versioned transfer guide</a>.</p>
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
    </button></h2><p>Confirm that <code translate="no">coll_bak</code> exists. If the restore did not recreate its vector index, create the index appropriate to your schema before loading the collection. Compare its schema, entity count, scalar and vector values, and known search results against the baseline captured before backup.</p>
<p>For the disposable 256-entity dataset, use the complete checks in <a href="/docs/snapshot-backup-and-restore.md#Verify-the-result">Verify the result</a>. A successful command alone does not prove that the expected data was restored.</p>
