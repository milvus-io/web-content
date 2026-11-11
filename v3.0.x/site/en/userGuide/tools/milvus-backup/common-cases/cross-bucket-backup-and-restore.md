---
id: cross-bucket-backup-and-restore.md
summary: This topic details the process of backing up a collection from one Milvus instance and restoring it to another
title: Migrate Between Instances Across Buckets
beta: Milvus Backup 0.5.x
---

# Migrate Between Instances Across Buckets

For current workflows, see the [CLI guide](milvus_backup_0_6_cli.md) or [upgrade from 0.5.x](milvus_backup_upgrade.md). Check the [compatibility matrix](milvus_backup_overview.md#Compatibility-matrix) for supported Milvus server versions.

This topic details the process of backing up a collection from one
Milvus instance and restoring it to another, with each instance using
different buckets within the same object storage.

## Overview

The diagram below illustrates the backup and restore process using
different buckets within the same object storage.

![cross-bucket-backup-and-restore.png](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/cross-bucket-backup-and-restore.png)

Assume we have two Milvus instances, `milvus_A` and `milvus_B`, both
utilizing the default MinIO storage engine for object storage. These
instances use different buckets bucket_A and `bucket_B` within the same
object storage. In this example, our goal is to complete the following
tasks:

1. Create a backup (`my_backup`) for collection `coll` in `bucket_A` and store the backup in `bucket_B`.

2. In `bucket_B`, restore from the backup and name the restored collection `coll_bak`.

## Prerequisites

- Install **Milvus Backup 0.5.16** using the [0.5.x CLI guide](milvus_backup_cli.md#Obtain-Milvus-Backup).

- Familiarize yourself with configuring Milvus object storage settings.
For details, refer to [Object
Storage](https://milvus.io/docs/deploy_s3.md).

## Back up a collection from milvus_A

### Step 1: Prepare configuration

Go to the directory of the milvus-backup project and create a directory
named `configs`. Run the following commands from the directory containing `milvus-backup`:

```shell
mkdir -p configs
```

Download the backup config file `backup.yaml`:

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
`milvus_A`:

- Connection configs

  ```yaml
  # milvus proxy address, compatible to milvus.yaml
  milvus:
    address: milvus_A
    port: 19530
    authorizationEnabled: false
    # tls mode values [0, 1, 2]
    # 0 is close, 1 is one-way authentication, 2 is two-way authentication.
    tlsMode: 0
    user: "root"
    password: "Milvus"
  ```

  - `milvus.address`: IP address or hostname of the `milvus_A` server.

  - `milvus.port`: TCP port on which Milvus server is listening (default
  19530).

- Storage configs (MinIO/S3 settings)

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
    
    backupBucketName: "bucket_B" # Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath
    backupRootPath: "backup" # Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath
  ```

- `minio.bucketName`: Name of the bucket used for data storage in `milvus_A`. In this example, set to `bucket_A`.

- `minio.rootPath`: Root path within the bucket where data from `milvus_A` is stored. In this example, set to `files`.

- `minio.backupBucketName`: Name of the bucket used for backup storage in
`milvus_B`. In this example, `milvus_A` and `milvus_B` use different buckets. Therefore, set to `bucket_B`.

- `minio.backupRootPath`: Root path within the bucket designated for storing backup files in `milvus_B`. In this example, set to `backup`.

### Step 3: Create backup

Once backup.yaml is saved, create a backup named `my_backup`:

```shell
./milvus-backup create -c coll -n my_backup --config configs/backup.yaml
```

This command creates the backup `bucket_B/backup/my_backup` in object
storage for the collection coll.

## Restore the backup to milvus_B

### Step 1: Configure restoration settings

Repeat step
2 to modify configs for restoration to `milvus_B`, ensuring `minio.bucketName` is set to `bucket_B`.

Here\'s a sample configuration:

```yaml
...
# milvus proxy address, compatible to milvus.yaml
milvus:
  address: milvus_B
  port: 19530
  authorizationEnabled: false
  # tls mode values [0, 1, 2]
  # 0 is close, 1 is one-way authentication, 2 is two-way authentication.
  tlsMode: 0
  user: "root"
  password: "Milvus"
  
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
  
  bucketName: "bucket_B" # Milvus Bucket name in MinIO/S3, make it the same as your milvus instance
  rootPath: "files" # Milvus storage root path in MinIO/S3, make it the same as your milvus instance

  # Backup storage credentials
  backupAccessKeyID: minioadmin  # accessKeyID of MinIO/S3
  backupSecretAccessKey: minioadmin # MinIO/S3 encryption string
  
  backupBucketName: "bucket_B" # Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath
  backupRootPath: "backup" # Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath
...
```

### Step 2: Restore backup

Restore the backup to `milvus_B`:

```shell
./milvus-backup restore -c coll -n my_backup -s _bak --config configs/backup.yaml
```

This command restores the backup into a new collection named `coll_bak` in `milvus_B`, using the target instance's configured storage root `bucket_B/files`.

In Backup 0.5.16, the deprecated `-c` option selects the collection name in the backup, before `_bak` is applied. The 0.6.0 `--filter` replacement uses the target name instead; see [Update CLI commands](milvus_backup_upgrade.md#Update-CLI-commands).

After restoring, confirm that `coll_bak` exists, create an appropriate vector index if needed, and compare its entity count, representative values, and search results against a baseline captured before backup. A successful command alone does not verify the data.
