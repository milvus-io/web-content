---
id: milvus_backup_overview.md
summary: Milvus-Backup is a tool that allows users to backup and restore Milvus data.
title: Milvus Backup
---

# Milvus Backup

Milvus Backup is a tool that allows users to back up and restore Milvus data. It provides both CLI and API to fit itself into different application scenarios.

## Prerequisites

Before start using Milvus Backup, ensure that

- The operating system is CentOS 7.5+ or Ubuntu LTS 18.04+,
- Go version is 1.20.2 or later.

## Architecture

![Milvus Backup architecture](../../../../assets/milvus_backup_architecture.png)

Milvus Backup facilitates backup and restore of metadata, segments, and data across Milvus instances. It provides northbound interfaces, such as CLI, API, and gRPC-based Go module, for flexible manipulation of the backup and restore processes.

Milvus Backup reads collection metadata and segments from the source Milvus instance to create a backup. It then copies collection data from the root path of the source Milvus instance and saves the copied data into the backup root path.

To restore from a backup, Milvus Backup creates a new collection in the target Milvus instance based on the collection metadata and segment information in the backup. It then copies the backup data from the backup root path to the root path of the target instance.

## Latest release

- [v0.4.15](https://github.com/zilliztech/milvus-backup/releases/tag/v0.4.15)
