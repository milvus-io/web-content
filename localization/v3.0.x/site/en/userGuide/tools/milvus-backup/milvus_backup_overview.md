---
id: milvus_backup_overview.md
summary: >-
  Milvus Backup provides CLI and HTTP API workflows for backing up and restoring
  Milvus data.
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup backs up Milvus collections and restores them in the same or another instance. It provides a command-line interface (CLI) and an HTTP API.</p>
<p>Milvus Backup <strong>0.6.0</strong> adds snapshot backups for Milvus 3.0, a versioned v2 configuration schema, and purpose presets for creating backups. Official backup and restore support for Milvus 3.0 starts with <strong>Milvus 3.0.1</strong>.</p>
<h2 id="Choose-your-guide" class="common-anchor-header">Choose your guide<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup has its own release version, separate from the Milvus server version. The current guides cover the 0.6.x series; the Backup 0.5.x section preserves the earlier workflows. Page-title labels identify the applicable Backup series. Installation instructions and examples use a specific validated release. Check source and target Milvus server compatibility separately.</p>
<table>
<thead>
<tr><th>Your task</th><th>Guide</th></tr>
</thead>
<tbody>
<tr><td>Continue using Backup 0.5.x</td><td><a href="/docs/milvus_backup_cli.md">0.5.x commands</a> and <a href="/docs/milvus_backup_api.md">HTTP API</a>, with examples pinned to 0.5.16</td></tr>
<tr><td>Upgrade an existing Backup installation</td><td><a href="/docs/milvus_backup_upgrade.md">Upgrade from 0.5.x to 0.6.x</a></td></tr>
<tr><td>Install and use Backup 0.6.x</td><td><a href="/docs/milvus_backup_0_6_cli.md">commands and configuration</a>, or <a href="/docs/milvus_backup_0_6_api.md">HTTP API</a></td></tr>
<tr><td>Back up and restore a snapshot on Milvus 3.0.1 or later</td><td><a href="/docs/snapshot-backup-and-restore.md">Snapshot Backup and Restore in One Instance</a></td></tr>
</tbody>
</table>
<p>The existing <a href="/docs/single-instance-backup-and-restore.md">same-instance</a>, <a href="/docs/shared-bucket-backup-and-restore.md">shared-bucket</a>, <a href="/docs/cross-bucket-backup-and-restore.md">cross-bucket</a>, and <a href="/docs/multi-storage-backup-and-restore.md">cross-storage</a> guides retain the 0.5.16 configuration and commands. Their examples do not switch versions when a new Backup release is published.</p>
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
<li>Use a Backup binary and configuration examples from the same release. The <a href="/docs/milvus_backup_cli.md#Obtain-Milvus-Backup">0.5.x guide</a> pins 0.5.16; the <a href="/docs/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">current guide</a> pins 0.6.0.</li>
<li>Provide network access to Milvus, its storage, and the backup destination. Snapshot operations also require the Milvus server to reach the backup store.</li>
<li>Check server compatibility below. Go is required only when building from source: 1.25 or later for Backup 0.5.16, and 1.26 or later for 0.6.0.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Architecture<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" />
    <span>Milvus Backup components</span>
  </span>
</p>
<p>Milvus Backup coordinates collection metadata and data backups between the Milvus instance and the backup storage. In Backup 0.6.0, the selected format determines how collection data is exported and restored:</p>
<table>
<thead>
<tr><th>Format</th><th>Backup and restore behavior</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>Milvus exports a collection snapshot bundle. Milvus Backup records the bundle information, and restore imports the bundle through Milvus. The server manages the resulting data layout.</td></tr>
<tr><td><code translate="no">binlog</code></td><td>Milvus Backup copies collection data files and metadata, then recreates collections and imports the backed-up data during restore.</td></tr>
<tr><td><code translate="no">auto</code></td><td>Selects the format according to the server’s supported features. On Milvus 3.0, it selects snapshot.</td></tr>
</tbody>
</table>
<p>A backup directory contains metadata and the files required by its format. Preserve the complete directory when archiving or moving it. Do not assume that a snapshot backup uses the binlog directory layout.</p>
<p>In 0.6.0, the <code translate="no">create --for</code> presets configure purpose-specific options: <code translate="no">clone</code> keeps the chosen format, while <code translate="no">archive</code> and <code translate="no">secondary</code> require binlog. A secondary also requires a configured replication topology; ordinary migration between instances does not require a secondary. See <a href="/docs/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">Choose a backup format or purpose</a>.</p>
<p>Backup 0.6.0 skips external collections during backup. A successful task does not imply that external collection data was included.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">Compatibility matrix<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Backup 0.6.0 does not require upgrading every Milvus installation to 3.0.</strong> It supports binlog workflows on supported Milvus 2.x versions. Official backup and restore support for the Milvus 3.0 line starts with <strong>Milvus 3.0.1</strong>; the snapshot example uses that line.</p>
<p>The <a href="/docs/milvus_backup_upgrade.md">upgrade guide</a> was validated with Backup 0.5.16 and 0.6.0 on Milvus 2.6.11, including restoration of a 0.5.16 backup by 0.6.0. This tested combination does not expand the matrix below.</p>
<p>The source and target Milvus versions must form a supported pair. A newer target version alone does not establish compatibility. The following legacy matrix covers Milvus 2.x, as documented since Milvus Backup 0.5.7; it does not establish 2.x-to-3.0 migration compatibility.</p>
<table>
<thead>
<tr><th>Backup From ↓ / Restore To →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>No</td><td>No</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Milvus v2.3.x</td><td>No</td><td>No</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Milvus v2.4.x</td><td>No</td><td>No</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Milvus v2.5.x</td><td>No</td><td>No</td><td>No</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Milvus v2.6.x</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td></tr>
</tbody>
</table>
<p>Before a cross-version migration, verify the source version, target version, and backup format against the <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">Backup release documentation</a>. These guides do not extend the legacy matrix to unlisted combinations.</p>
<h2 id="Release-notes" class="common-anchor-header">Release notes<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
