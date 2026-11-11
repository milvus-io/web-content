---
id: milvus_backup_0_6_cli.md
summary: Configure Milvus Backup, create a backup, and verify restored data using the CLI.
title: Back up and Restore Data Using Commands
beta: Milvus Backup 0.6.x
---

# Back up and Restore Data Using Commands

Use Milvus Backup to back up collections and restore them in the same or another Milvus instance. Backup and restore on Milvus 3.0 is officially supported starting with **Milvus 3.0.1**. Milvus Backup also supports binlog workflows on supported Milvus 2.x versions; check [Milvus Backup compatibility](milvus_backup_overview.md#Compatibility-matrix).

If you are keeping Backup 0.5.x, use the [0.5.x CLI guide](milvus_backup_cli.md). If you are upgrading, follow [Upgrade Milvus Backup](milvus_backup_upgrade.md) first.

## Obtain Milvus Backup

The examples below were validated with **Milvus Backup 0.6.0**. Download the binary for your operating system and architecture from the [v0.6.0 release](https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0), then extract it. Keep the binary and configuration examples on the same release.

To build from source instead, install **Go 1.26 or later**, then run:

```shell
git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
```

The prebuilt binary does not require Go. Run all subsequent shell commands from the directory containing `milvus-backup`.

## Prepare configuration file

Milvus Backup needs access to the Milvus gRPC endpoint, its management endpoint, the instance's storage, and the backup destination. For snapshot backups, the Milvus server also needs access to the backup storage.

Create a configuration directory:

```shell
mkdir -p configs
```

Save this MinIO example as `configs/backup.yaml`. Replace the addresses, credentials, bucket, and root path with the settings of your deployment. The `minioadmin` credentials are MinIO test defaults.

```yaml
configVersion: v2
milvus:
  grpc:
    address: localhost
    port: 19530
  management:
    endpoint: http://localhost:9091
  storage:
    provider: minio
    address: localhost
    port: 9000
    useSSL: false
    bucketName: a-bucket
    rootPath: files
    auth:
      type: static
      accessKeyID: minioadmin
      secretAccessKey: minioadmin
backup:
  storage:
    bucketName: a-bucket
    rootPath: backup
transfer:
  mode: auto
```

- `milvus.grpc` connects to the instance being backed up or restored. If authentication is enabled, also set `milvus.user` and `milvus.password`.
- `milvus.management.endpoint` is used for garbage collection pause/resume during backup.
- `milvus.storage` must match the instance's actual object storage. Setting a bucket here does not change Milvus configuration.
- `backup.storage` identifies the backup location. Unset fields inherit from `milvus.storage`, except `rootPath`, which defaults to `backup`.
- `transfer.mode: auto` selects storage-side copying when the backends match and streaming through Milvus Backup otherwise. This setting controls object transfer, not the backup format.

Typical storage defaults are shown below. Confirm the values in your running deployment before using them.

| Setting | Docker Compose | Helm / Milvus Operator |
| --- | --- | --- |
| Bucket | `a-bucket` | `milvus-bucket` |
| Root path | `files` | `file` |

If the Milvus server uses a different address to reach the backup store, set `backup.storage.milvusAddress` and `milvusPort` to the server-reachable address. For authentication, TLS, other storage providers, and additional settings, see the [0.6.0 configuration example](https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml).

Inspect the effective values and check connectivity:

```shell
./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
```

`config show` masks secret values and reports where each value came from. The connectivity check should report `Success!`. Resolve connection or storage errors before creating a backup.

For existing v1 configurations, see [Upgrade Milvus Backup](milvus_backup_upgrade.md#Migrate-the-configuration). Automatic configuration translation does not replace removed CLI flags.

## Prepare data

Use an existing collection named `coll` and ensure that `coll_bak` does not exist. Record the schema, entity count, representative scalar and vector values, and a known search result before backup. Keep the example data unchanged while comparing the restored copy. To create a small disposable dataset instead, use [Prepare sample data](snapshot-backup-and-restore.md#Prepare-sample-data).

## Back up data

Create a named backup of `coll`:

```shell
./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
```

The create command should report `create backup success`. `get` returns backup metadata; check that the expected collection is present. Omitting `--filter` backs up all eligible collections. External collections are skipped.

`--filter` accepts comma-separated names: `coll` in the default database, `db1.coll`, or `'db1.*'` for all collections in a database. Quote patterns containing `*` to prevent shell expansion.

### Choose a backup format or purpose

With the default `--format auto`, Milvus 3.0 uses snapshot backups; supported Milvus 2.x servers use binlog. To retain binlog behavior explicitly, pass `--format binlog`. The [snapshot example](snapshot-backup-and-restore.md) selects `--format snapshot` explicitly.

Use `--for` when a purpose matches your workflow:

| Purpose | Values applied by the preset | Intended use |
| --- | --- | --- |
| `clone` | Enables RBAC backup; keeps your format and strategy choices | Copy data to another instance; `auto` uses snapshot on Milvus 3.0 |
| `archive` | Forces `binlog` and enables RBAC backup | Keep a binlog-format backup for later restoration |
| `secondary` | Forces `binlog`, `bulk_flush`, RBAC backup, and index extra metadata | Initialize a secondary in a configured replication topology |

For example:

```shell
./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
```

A preset overrides conflicting values for the options it fixes. For example, `--for archive --format snapshot` produces a binlog backup. Backing up RBAC metadata does not automatically restore it; use the restore command's `--rbac` option when required.

`secondary` is not a shortcut for ordinary cross-instance restoration. It also requires access to the source etcd for index metadata, correct replication cluster IDs and channels, and a fresh secondary target. The backup must retain its complete metadata, including `meta/full_meta.json`. Configuring replication and performing failover are outside this guide. See the [0.6.0 source and reference](https://github.com/zilliztech/milvus-backup/tree/v0.6.0) for the version-specific implementation and requirements.

### Preserve the complete backup

A backup is stored under `<backup.storage.bucketName>/<backup.storage.rootPath>/<backup_name>`. Preserve every object in this directory. Snapshot backups include an exported bundle as well as metadata.

Do not copy only the metadata files or assume a snapshot backup has the same layout as a binlog backup.

## Restore data

Restore `coll` as `coll_bak` in the configured instance:

```shell
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
```

On the CLI, `--filter` matches names **after** `-s` or `--rename` is applied. A command with `--filter coll -s _bak` matches nothing and can exit successfully without restoring a collection.

To restore using the original name, choose a target where that collection name does not exist, point the configuration to that target and the backup location, and omit the suffix:

```shell
./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
```

For a complete same-instance example, see [Snapshot Backup and Restore in One Instance](snapshot-backup-and-restore.md). The existing cross-instance common-case pages use Backup 0.5.16 and v1 configuration; do not apply their commands unchanged to 0.6.0. For 0.6.0 transfer configuration, see the [versioned transfer guide](https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md).

## Verify restored data

Confirm that `coll_bak` exists. If the restore did not recreate its vector index, create the index appropriate to your schema before loading the collection. Compare its schema, entity count, scalar and vector values, and known search results against the baseline captured before backup.

For the disposable 256-entity dataset, use the complete checks in [Verify the result](snapshot-backup-and-restore.md#Verify-the-result). A successful command alone does not prove that the expected data was restored.
