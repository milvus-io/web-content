---
id: milvus_backup_0_6_api.md
summary: >-
  Create and monitor Milvus Backup 0.6.0 backup and restore tasks through the
  HTTP API.
title: Use the Milvus Backup 0.6.0 HTTP API
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">Use the Milvus Backup 0.6.0 HTTP API<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>Use the Milvus Backup HTTP API to create backups, restore collections, and monitor asynchronous tasks. The snapshot example below uses <strong>Milvus Backup 0.6.0</strong> with <strong>Milvus 3.0.1 or later</strong>. For Backup 0.5.x, use the <a href="/docs/milvus_backup_api.md">0.5.x API guide</a>. For an existing installation, see <a href="/docs/milvus_backup_upgrade.md">Upgrade Milvus Backup</a>.</p>
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
    </button></h2><p>Download and extract the appropriate binary from the <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0 release</a>. To build from source instead, follow <a href="/docs/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">Obtain Milvus Backup</a>; building requires Go 1.26 or later.</p>
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
    </button></h2><p>Create <code translate="no">configs/backup.yaml</code> using the v2 example in <a href="/docs/milvus_backup_0_6_cli.md#Prepare-configuration-file">Prepare configuration file</a>. Configure access to Milvus, the instance’s storage, and the backup destination. The Milvus server must also be able to access the backup storage for snapshot operations.</p>
<p>If you have a v1 file, it remains loadable. See <a href="/docs/milvus_backup_upgrade.md#Migrate-the-configuration">Migrate the configuration</a> before changing its schema or environment variables.</p>
<p>From the directory containing the binary, inspect the configuration and check connectivity:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Continue when the connectivity check reports <code translate="no">Success!</code>.</p>
<h2 id="Start-up-the-API-server" class="common-anchor-header">Start up the API server<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Start the service with the configuration you checked:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>The default port is 8080. To choose another port, use <code translate="no">-p</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Run only one of these commands for a given service. The examples below use port 8080; change their URLs if you selected another port. Swagger UI is available at <code translate="no">http://localhost:8080/api/v1/docs/index.html</code>.</p>
<p>Keep the service running while polling tasks. Task IDs and live progress belong to the service process; the persisted backup remains in object storage after the process stops.</p>
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
    </button></h2><p>Use an existing collection named <code translate="no">coll</code>, or create the 256-entity test collection from <a href="/docs/snapshot-backup-and-restore.md#Prepare-sample-data">Prepare sample data</a>. Change the collection names in the requests if you use your own data. Keep the test data unchanged while verifying the result.</p>
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
    </button></h2><p>Submit an asynchronous backup request:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>The response includes a <code translate="no">requestId</code>. Submission does not mean that the backup is complete. Copy that value into <code translate="no">backup_id</code> and poll:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Wait for <code translate="no">data.state_code</code> to become <code translate="no">2</code>. The API uses these task states:</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>Meaning</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>Initial</td></tr>
<tr><td><code translate="no">1</code></td><td>Executing</td></tr>
<tr><td><code translate="no">2</code></td><td>Success</td></tr>
<tr><td><code translate="no">3</code></td><td>Failed</td></tr>
<tr><td><code translate="no">4</code></td><td>Timed out</td></tr>
</tbody>
</table>
<p>Check both the response and the task state. HTTP 200 alone is insufficient: a nonzero response <code translate="no">code</code> indicates an error. A successful response can omit <code translate="no">code</code> because its value is zero. If a task fails or times out, inspect the response details and server log before restoring from that backup.</p>
<p>List the stored backups and inspect the completed backup by name:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> returns JSON metadata, including <code translate="no">collection_backups</code>; it does <strong>not</strong> download backup files. For a backup created by another process, a name-only query can return metadata without live task progress. Use the task ID from the current service’s create response when monitoring an active backup.</p>
<p>The default format is <code translate="no">auto</code>, which selects snapshot on Milvus 3.0. To explicitly request binlog, add <code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> to the create body. The CLI’s <code translate="no">--for</code> presets are not an HTTP request field.</p>
<p>To preserve or move the backup, copy the entire directory in object storage. See the <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">0.6.0 transfer guide</a>.</p>
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
    </button></h2><p>Ensure that <code translate="no">coll_bak</code> does not already exist. Submit a restore request with a suffix:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>The HTTP <code translate="no">collection_names</code> field selects names <strong>in the backup</strong>, before the suffix is applied. This request selects <code translate="no">coll</code> and creates <code translate="no">coll_bak</code>. The CLI’s <code translate="no">--filter</code> instead matches target names after renaming; do not substitute <code translate="no">coll_bak</code> into this HTTP field.</p>
<p>Copy <code translate="no">data.id</code> from the restore response and poll the task:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Wait for <code translate="no">data.state_code: 2</code> and check <code translate="no">collection_restore_tasks</code> for the expected target collection. A submitted task is not yet a verified restore.</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">Restore with the original name<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p>Use a target instance where <code translate="no">coll</code> does not exist. Start a separate backup API service configured for that target and the completed backup location, then send this request to the target service:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Poll <code translate="no">get_restore</code> on the same service using the returned task ID. Configure <code translate="no">milvus.*</code> for the restore target and <code translate="no">backup.storage</code> for the existing backup. See <a href="/docs/milvus_backup_0_6_cli.md#Prepare-configuration-file">Prepare configuration file</a>.</p>
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
    </button></h2><p>After the restore task succeeds, connect to the target Milvus instance and verify that the expected collection and data exist. For the 256-entity test collection, use the full scalar, vector, and search checks in <a href="/docs/snapshot-backup-and-restore.md#Verify-the-result">Verify the result</a>.</p>
<p>Change <code translate="no">coll_bak</code> to <code translate="no">coll</code> when you restore with the original name. The verification code reads the restored data without deleting it. For production data, compare against a baseline captured at backup time.</p>
