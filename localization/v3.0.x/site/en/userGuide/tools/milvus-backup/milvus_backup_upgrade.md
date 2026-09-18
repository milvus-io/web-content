---
id: milvus_backup_upgrade.md
summary: >-
  Upgrade Milvus Backup from 0.5.x to 0.6.0, update configuration and commands,
  and validate backup and restore.
title: Upgrade Milvus Backup to 0.6.0
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">Upgrade Milvus Backup to 0.6.0<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Use this guide when upgrading the <strong>Milvus Backup tool</strong> from 0.5.x to 0.6.0. It does not upgrade your Milvus server. If you are staying on 0.5.x, continue using the <a href="/docs/milvus_backup_cli.md">0.5.x CLI</a> or <a href="/docs/milvus_backup_api.md">API</a> guide. For a new installation, use the <a href="/docs/milvus_backup_0_6_cli.md">0.6.0 guide</a>.</p>
<p>V1 YAML configurations still load through automatic translation. However, deprecated CLI flags are rejected in 0.6.0, and the default backup format changes on Milvus 3.0. Review both configuration and commands before switching scheduled jobs or services.</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">Check the starting point<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>Record your Backup version, Milvus source and target versions, configuration files, environment-variable overrides, backup location, and commands used by scripts or API services. Check the <a href="/docs/milvus_backup_overview.md#Compatibility-matrix">compatibility information</a> for those server versions.</p>
<p>Keep the original binary, configuration, and existing backup directories while validating the new installation. Download 0.6.0 into a separate directory using <a href="/docs/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">Obtain Milvus Backup</a>. All commands below run from that directory and invoke the 0.6.0 binary. Place a copy of your v1 configuration at <code translate="no">configs/backup-v1.yaml</code>.</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">Migrate the configuration<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>A v1 configuration still loads in 0.6.0. Milvus Backup translates it to v2 at startup and prints a warning. To save the translated configuration in a separate file:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> rejects an invalid migrated configuration. Without <code translate="no">--output</code>, the command writes the v2 YAML to standard output. Review and use the new file only after checking its resolved settings.</p>
<table>
<thead>
<tr><th>v1 setting</th><th>v2 setting</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>, <code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>, <code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>Source storage under <code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>Backup storage under <code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>Storage credentials</td><td><code translate="no">milvus.storage.auth.*</code> / <code translate="no">backup.storage.auth.*</code>, with an explicit <code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>Review environment variables in the same change as the configuration file. V2 accepts only the supported credential-related environment variables, such as <code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code>. Old v1 names are not applied to a v2 file. For non-credential settings such as bucket names and endpoints, use YAML or a configuration-key override:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> reports affected environment variables without copying their secret values into the output file. See <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">supported v2 environment variables</a>. <code translate="no">config show</code> replaces the deprecated <code translate="no">check config</code> command.</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">Update CLI commands<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>Flags deprecated in 0.5 are rejected in 0.6.0. Update scripts before upgrading the binary.</p>
<table>
<thead>
<tr><th>Command</th><th>Removed option</th><th>Replacement</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> / <code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code>, using target names</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> / <code translate="no">-d</code></td><td>Remove the flag; <code translate="no">get</code> returns the backup information</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> / <code translate="no">-c</code></td><td>No equivalent collection filter</td></tr>
</tbody>
</table>
<p>For example, these 0.5.16 commands select the source name <code translate="no">coll</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Their 0.6.0 replacements use the target name for restore:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>A restore filter that matches nothing can exit successfully without creating a collection. Always check the target collection and its data. The HTTP API’s <code translate="no">collection_names</code> still selects source names in the backup; see the <a href="/docs/milvus_backup_0_6_api.md#Restore-data">0.6.0 API guide</a>.</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">Choose the backup behavior<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>On supported Milvus 2.x servers, the <code translate="no">auto</code> format uses binlog. Upgrading Backup does not require moving to Milvus 3.0.</li>
<li>On Milvus 3.0, <code translate="no">auto</code> selects snapshot. Official backup and restore support starts at Milvus 3.0.1. Pass <code translate="no">--format binlog</code> to retain binlog behavior when creating a backup.</li>
<li>V1 configuration compatibility does not preserve removed command flags or override the new format default.</li>
<li>Purpose presets can set the format and other options. For example, <code translate="no">--for archive</code> forces binlog even if <code translate="no">--format snapshot</code> is also supplied. Review <a href="/docs/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">format and purpose choices</a>.</li>
<li>External collections are skipped during backup. Check the backup metadata rather than treating task success as proof that every collection was included.</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">Validate before switching jobs<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example keeps binlog format and restores into a new collection. Replace <code translate="no">coll</code> with a collection whose schema, count, scalar and vector values, and search results you have recorded. Use a new backup name and ensure the target name <code translate="no">coll_upgrade_check</code> does not exist.</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Confirm that the backup lists <code translate="no">coll</code> and that <code translate="no">coll_upgrade_check</code> exists after restore. Create its vector index if needed, load it, and compare the restored data and search results with the recorded baseline. Keep the source data unchanged during this test.</p>
<p>Also test a representative existing backup before relying on it with the new tool. For a 0.5.16 backup named <code translate="no">legacy_backup</code> containing <code translate="no">coll</code>, use a separate target name:</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>These upgrade paths were validated with <strong>Milvus 2.6.11</strong>, Backup <strong>0.5.16 → 0.6.0</strong>, and binlog backups in MinIO. Both newly created and existing backups restored with matching entity values and vector-search results. This does not establish compatibility for every historical backup or for Milvus 2.x-to-3.0 restoration. It also does not establish that 0.5.x can read backups created by 0.6.0.</p>
<p>Once validation succeeds, update jobs to use the new binary, checked configuration, environment settings, and replacement flags together. For API deployments, start the new service with the checked configuration and verify task completion through the <a href="/docs/milvus_backup_0_6_api.md">0.6.0 HTTP API</a>. To adopt snapshots on Milvus 3.0.1 or later, follow <a href="/docs/snapshot-backup-and-restore.md">Snapshot Backup and Restore in One Instance</a>.</p>
