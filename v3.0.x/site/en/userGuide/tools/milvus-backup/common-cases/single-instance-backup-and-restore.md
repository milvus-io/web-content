---
id: single-instance-backup-and-restore.md
summary: This topic details the process of backing up a collection and restoring it from the backup within the same Milvus instance
title: Backup and Restore in One Instance
beta: Milvus Backup 0.5.x
---

# Backup and Restore in One Instance

For current workflows, see the [CLI guide](milvus_backup_0_6_cli.md) or [upgrade from 0.5.x](milvus_backup_upgrade.md). Check the [compatibility matrix](milvus_backup_overview.md#Compatibility-matrix) for supported Milvus server versions.

This topic details the process of backing up a collection and restoring
it from the backup within the same Milvus instance.

For the 0.6.0 snapshot workflow on Milvus 3.0.1 or later, see [Snapshot Backup and Restore in One Instance](snapshot-backup-and-restore.md).

## Overview

The diagram below illustrates the backup and restore process within a
single Milvus instance.

![single-instance-backup-and-restore.png](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/single-instance-backup-and-restore.png)

Assume we have a Milvus instance, `milvus_A`, using a bucket named
`bucket_A` for data storage. In this example, our goal is to complete the
following tasks:

1. Create a backup (`my_backup`) for collection coll in `bucket_A`.

2. Restore from the backup and name the restored collection `coll_bak`.

## Prerequisites

- Install **Milvus Backup 0.5.16** using the [0.5.x CLI guide](milvus_backup_cli.md#Obtain-Milvus-Backup).

- Familiarize yourself with configuring Milvus object storage settings.
For details, refer to [Object
Storage](https://milvus.io/docs/deploy_s3.md).

## Back up the collection

### Step 1: Prepare configuration

Go to the directory of the milvus-backup project and create a directory
named `configs`:

```shell
mkdir -p configs
```

Download the backup config file backup.yaml:

```shell
wget -O configs/backup.yaml https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml
```

The file structure looks like this:

```
├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
```

### Step 2: Edit configuration file

The YAML below shows fields to edit in the downloaded v1 file. Keep the other required settings. Point `milvus.address` and `milvus.port` to the instance being backed up or restored. Set `minio.backupAddress`, `minio.backupPort`, and `minio.backupStorageType` to the backup destination, and `backup.gcPause.address` to the source Milvus management endpoint (port 9091 by default). Replace all example addresses, bucket names, paths, and credentials with your deployment settings.

Modify the backup.yaml file to set the appropriate configurations for
`milvus_A`. Below is the sample storage configuration:

```yaml
# Related configuration of minio, which is responsible for data persistence for Milvus.
minio:
  # cloudProvider: "minio" # deprecated use storageType instead
  storageType: "minio" # support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)
  
  address: localhost # Address of MinIO/S3
  port: 9000   # Port of MinIO/S3
  accessKeyID: minioadmin  # accessKeyID of MinIO/S3
  secretAccessKey: minioadmin # MinIO/S3 encryption string
  useSSL: false # Access to MinIO/S3 with SSL
  useIAM: false
  iamEndpoint: ""
  
  bucketName: "bucket_A" # Milvus Bucket name in MinIO/S3, make it the same as your milvus instance
  rootPath: "files" # Milvus storage root path in MinIO/S3, make it the same as your milvus instance

  # Backup storage credentials
  backupAccessKeyID: minioadmin  # accessKeyID of MinIO/S3
  backupSecretAccessKey: minioadmin # MinIO/S3 encryption string
  
  backupBucketName: "bucket_A" # Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath
  backupRootPath: "backup" # Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath
```

### Step 3: Create backup

Once backup.yaml is saved, create a backup named `my_backup`:

```shell
./milvus-backup create -c coll -n my_backup --config configs/backup.yaml
```

This command creates the backup `bucket_A/backup/my_backup` in the object
storage of `milvus_A`.

## Restore from the backup within milvus_A

Once the backup is created, you can restore from it using the command
below:

```shell
./milvus-backup restore -c coll -n my_backup -s _bak --config configs/backup.yaml
```

This command restores from the backup and creates a new collection named
coll_bak in `milvus_A`, using the instance's configured storage root `bucket_A/files`.

In Backup 0.5.16, the deprecated `-c` option selects the collection name in the backup, before `_bak` is applied. The 0.6.0 `--filter` replacement uses the target name instead; see [Update CLI commands](milvus_backup_upgrade.md#Update-CLI-commands).

After restoring, confirm that `coll_bak` exists, create an appropriate vector index if needed, and compare its entity count, representative values, and search results against a baseline captured before backup. A successful command alone does not verify the data.
