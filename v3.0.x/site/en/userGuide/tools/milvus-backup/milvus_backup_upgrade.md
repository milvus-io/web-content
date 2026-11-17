---
id: milvus_backup_upgrade.md
summary: Upgrade Milvus Backup from 0.5.x to 0.6.x, update configuration and commands, and validate backup and restore.
title: Upgrade Milvus Backup to 0.6.x
beta: Milvus Backup 0.6.x
---

# Upgrade Milvus Backup to 0.6.x

Use this guide when upgrading the **Milvus Backup tool** from 0.5.x to 0.6.x. The procedure below uses 0.6.0 as the validated target version. It does not upgrade your Milvus server. If you are staying on 0.5.x, continue using the [0.5.x CLI](milvus_backup_cli.md) or [API](milvus_backup_api.md) guide. For a new installation, use the [CLI guide](milvus_backup_0_6_cli.md).

V1 YAML configurations still load through automatic translation. However, deprecated CLI flags are rejected in 0.6.0, and the default backup format changes on Milvus 3.0. Review both configuration and commands before switching scheduled jobs or services.

## Check the starting point

Record your Backup version, Milvus source and target versions, configuration files, environment-variable overrides, backup location, and commands used by scripts or API services. Check the [compatibility information](milvus_backup_overview.md#Compatibility-matrix) for those server versions.

Keep the original binary, configuration, and existing backup directories while validating the new installation. Download 0.6.0 into a separate directory using [Obtain Milvus Backup](milvus_backup_0_6_cli.md#Obtain-Milvus-Backup). All commands below run from that directory and invoke the 0.6.0 binary. Place a copy of your v1 configuration at `configs/backup-v1.yaml`.

## Migrate the configuration

A v1 configuration still loads in 0.6.0. Milvus Backup translates it to v2 at startup and prints a warning. To save the translated configuration in a separate file:

```shell
./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
```

`--strict` rejects an invalid migrated configuration. Without `--output`, the command writes the v2 YAML to standard output. Review and use the new file only after checking its resolved settings.

| v1 setting | v2 setting |
| --- | --- |
| `milvus.address`, `milvus.port` | `milvus.grpc.address`, `milvus.grpc.port` |
| Source storage under `minio.*` | `milvus.storage.*` |
| Backup storage under `minio.backup*` | `backup.storage.*` |
| Storage credentials | `milvus.storage.auth.*` / `backup.storage.auth.*`, with an explicit `auth.type` |
| `minio.crossStorage` | `transfer.mode` |
| `backup.gcPause.address` | `milvus.management.endpoint` |

Review environment variables in the same change as the configuration file. V2 accepts only the supported credential-related environment variables, such as `MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY`. Old v1 names are not applied to a v2 file. For non-credential settings such as bucket names and endpoints, use YAML or a configuration-key override:

```shell
./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
```

`config migrate` reports affected environment variables without copying their secret values into the output file. See [supported v2 environment variables](https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md). `config show` replaces the deprecated `check config` command.

## Update CLI commands

Flags deprecated in 0.5 are rejected in 0.6.0. Update scripts before upgrading the binary.

| Command | Removed option | Replacement |
| --- | --- | --- |
| `create` | `--colls` / `-c`, `--databases` / `-d`, `--database_collections` / `-a` | `--filter` |
| `create` | `--force` / `-f` | `--strategy skip_flush` |
| `create` | `--meta_only` | `--strategy meta_only` |
| `restore` | `--collections` / `-c`, `--databases` / `-d`, `--database_collections` / `-a` | `--filter`, using target names |
| `restore` | `--restore_index` | `--rebuild_index` |
| `get` | `--detail` / `-d` | Remove the flag; `get` returns the backup information |
| `list` | `--collection` / `-c` | No equivalent collection filter |

For example, these 0.5.16 commands select the source name `coll`:

```shell
./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
```

Their 0.6.0 replacements use the target name for restore:

```shell
./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
```

A restore filter that matches nothing can exit successfully without creating a collection. Always check the target collection and its data. The HTTP API's `collection_names` still selects source names in the backup; see the [HTTP API guide](milvus_backup_0_6_api.md#Restore-data).

## Choose the backup behavior

- On supported Milvus 2.x servers, the `auto` format uses binlog. Upgrading Backup does not require moving to Milvus 3.0.
- On Milvus 3.0, `auto` selects snapshot. Official backup and restore support starts at Milvus 3.0.1. Pass `--format binlog` to retain binlog behavior when creating a backup.
- V1 configuration compatibility does not preserve removed command flags or override the new format default.
- Purpose presets can set the format and other options. For example, `--for archive` forces binlog even if `--format snapshot` is also supplied. Review [format and purpose choices](milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose).
- External collections are skipped during backup. Check the backup metadata rather than treating task success as proof that every collection was included.

## Validate before switching jobs

The following example keeps binlog format and restores into a new collection. Replace `coll` with a collection whose schema, count, scalar and vector values, and search results you have recorded. Use a new backup name and ensure the target name `coll_upgrade_check` does not exist.

```shell
./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
```

Confirm that the backup lists `coll` and that `coll_upgrade_check` exists after restore. Create its vector index if needed, load it, and compare the restored data and search results with the recorded baseline. Keep the source data unchanged during this test.

Also test a representative existing backup before relying on it with the new tool. For a 0.5.16 backup named `legacy_backup` containing `coll`, use a separate target name:

```shell
./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
```

These upgrade paths were validated with **Milvus 2.6.11**, Backup **0.5.16 → 0.6.0**, and binlog backups in MinIO. Both newly created and existing backups restored with matching entity values and vector-search results. This does not establish compatibility for every historical backup or for Milvus 2.x-to-3.0 restoration. It also does not establish that 0.5.x can read backups created by 0.6.0.

Once validation succeeds, update jobs to use the new binary, checked configuration, environment settings, and replacement flags together. For API deployments, start the new service with the checked configuration and verify task completion through the [HTTP API](milvus_backup_0_6_api.md). To adopt snapshots on Milvus 3.0.1 or later, follow [Snapshot Backup and Restore in One Instance](snapshot-backup-and-restore.md).
