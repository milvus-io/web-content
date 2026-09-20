---
id: milvus_backup_overview.md
summary: Milvus Backup provides CLI and HTTP API workflows for backing up and restoring Milvus data.
title: Milvus Backup
---

# Milvus Backup

Milvus Backup backs up Milvus collections and restores them in the same or another instance. It provides a command-line interface (CLI) and an HTTP API.

Milvus Backup **0.6.0** adds snapshot backups for Milvus 3.0, a versioned v2 configuration schema, and purpose presets for creating backups. Official backup and restore support for Milvus 3.0 starts with **Milvus 3.0.1**.

## Choose your guide

Milvus Backup has its own release version, separate from the Milvus server version. The current guides cover the 0.6.x series; the Backup 0.5.x section preserves the earlier workflows. Page-title labels identify the applicable Backup series. Installation instructions and examples use a specific validated release. Check source and target Milvus server compatibility separately.

| Your task | Guide |
| --- | --- |
| Continue using Backup 0.5.x | [0.5.x commands](milvus_backup_cli.md) and [HTTP API](milvus_backup_api.md), with examples pinned to 0.5.16 |
| Upgrade an existing Backup installation | [Upgrade from 0.5.x to 0.6.x](milvus_backup_upgrade.md) |
| Install and use Backup 0.6.x | [commands and configuration](milvus_backup_0_6_cli.md), or [HTTP API](milvus_backup_0_6_api.md) |
| Back up and restore a snapshot on Milvus 3.0.1 or later | [Snapshot Backup and Restore in One Instance](snapshot-backup-and-restore.md) |

The existing [same-instance](single-instance-backup-and-restore.md), [shared-bucket](shared-bucket-backup-and-restore.md), [cross-bucket](cross-bucket-backup-and-restore.md), and [cross-storage](multi-storage-backup-and-restore.md) guides retain the 0.5.16 configuration and commands. Their examples do not switch versions when a new Backup release is published.

## Prerequisites

- Use a Backup binary and configuration examples from the same release. The [0.5.x guide](milvus_backup_cli.md#Obtain-Milvus-Backup) pins 0.5.16; the [current guide](milvus_backup_0_6_cli.md#Obtain-Milvus-Backup) pins 0.6.0.
- Provide network access to Milvus, its storage, and the backup destination. Snapshot operations also require the Milvus server to reach the backup store.
- Check server compatibility below. Go is required only when building from source: 1.25 or later for Backup 0.5.16, and 1.26 or later for 0.6.0.

## Architecture

![Milvus Backup components](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png)

Milvus Backup coordinates collection metadata and data backups between the Milvus instance and the backup storage. In Backup 0.6.0, the selected format determines how collection data is exported and restored:

| Format | Backup and restore behavior |
| --- | --- |
| `snapshot` | Milvus exports a collection snapshot bundle. Milvus Backup records the bundle information, and restore imports the bundle through Milvus. The server manages the resulting data layout. |
| `binlog` | Milvus Backup copies collection data files and metadata, then recreates collections and imports the backed-up data during restore. |
| `auto` | Selects the format according to the server's supported features. On Milvus 3.0, it selects snapshot. |

A backup directory contains metadata and the files required by its format. Preserve the complete directory when archiving or moving it. Do not assume that a snapshot backup uses the binlog directory layout.

In 0.6.0, the `create --for` presets configure purpose-specific options: `clone` keeps the chosen format, while `archive` and `secondary` require binlog. A secondary also requires a configured replication topology; ordinary migration between instances does not require a secondary. See [Choose a backup format or purpose](milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose).

Backup 0.6.0 skips external collections during backup. A successful task does not imply that external collection data was included.

## Compatibility matrix

**Backup 0.6.0 does not require upgrading every Milvus installation to 3.0.** It supports binlog workflows on supported Milvus 2.x versions. Official backup and restore support for the Milvus 3.0 line starts with **Milvus 3.0.1**; the snapshot example uses that line.

The [upgrade guide](milvus_backup_upgrade.md) was validated with Backup 0.5.16 and 0.6.0 on Milvus 2.6.11, including restoration of a 0.5.16 backup by 0.6.0. This tested combination does not expand the matrix below.

The source and target Milvus versions must form a supported pair. A newer target version alone does not establish compatibility. The following legacy matrix covers Milvus 2.x, as documented since Milvus Backup 0.5.7; it does not establish 2.x-to-3.0 migration compatibility.

| Backup From ↓ / Restore To → | Milvus v2.2.x | Milvus v2.3.x | Milvus v2.4.x | Milvus v2.5.x | Milvus v2.6.x |
| --- | --- | --- | --- | --- | --- |
| Milvus v2.2.x | No | No | Yes | Yes | Yes |
| Milvus v2.3.x | No | No | Yes | Yes | Yes |
| Milvus v2.4.x | No | No | Yes | Yes | Yes |
| Milvus v2.5.x | No | No | No | Yes | Yes |
| Milvus v2.6.x | No | No | No | No | Yes |

Before a cross-version migration, verify the source version, target version, and backup format against the [Backup release documentation](https://github.com/zilliztech/milvus-backup/tree/v0.6.0). These guides do not extend the legacy matrix to unlisted combinations.

## Release notes

- [v0.6.0](https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0)
