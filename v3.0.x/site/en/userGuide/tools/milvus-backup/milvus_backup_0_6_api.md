---
id: milvus_backup_0_6_api.md
summary: Create and monitor backup and restore tasks through the Milvus Backup HTTP API.
title: Back up and Restore Data Using APIs
beta: Milvus Backup 0.6.x
---

# Back up and Restore Data Using APIs

Use the Milvus Backup HTTP API to create backups, restore collections, and monitor asynchronous tasks. The snapshot example below requires **Milvus 3.0.1 or later**. For Backup 0.5.x, use the [0.5.x API guide](milvus_backup_api.md). For an existing installation, see [Upgrade Milvus Backup](milvus_backup_upgrade.md).

## Obtain Milvus Backup

The examples below were validated with **Milvus Backup 0.6.0**. Download and extract the appropriate binary from the [v0.6.0 release](https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0). To build from source instead, follow [Obtain Milvus Backup](milvus_backup_0_6_cli.md#Obtain-Milvus-Backup); building requires Go 1.26 or later.

## Prepare configuration file

Create `configs/backup.yaml` using the v2 example in [Prepare configuration file](milvus_backup_0_6_cli.md#Prepare-configuration-file). Configure access to Milvus, the instance's storage, and the backup destination. The Milvus server must also be able to access the backup storage for snapshot operations.

If you have a v1 file, it remains loadable. See [Migrate the configuration](milvus_backup_upgrade.md#Migrate-the-configuration) before changing its schema or environment variables.

From the directory containing the binary, inspect the configuration and check connectivity:

```shell
./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
```

Continue when the connectivity check reports `Success!`.

## Start up the API server

Start the service with the configuration you checked:

```shell
./milvus-backup server --config configs/backup.yaml
```

The default port is 8080. To choose another port, use `-p`:

```shell
./milvus-backup server -p 18080 --config configs/backup.yaml
```

Run only one of these commands for a given service. The examples below use port 8080; change their URLs if you selected another port. Swagger UI is available at `http://localhost:8080/api/v1/docs/index.html`.

Keep the service running while polling tasks. Task IDs and live progress belong to the service process; the persisted backup remains in object storage after the process stops.

## Prepare data

Use an existing collection named `coll`, or create the 256-entity test collection from [Prepare sample data](snapshot-backup-and-restore.md#Prepare-sample-data). Change the collection names in the requests if you use your own data. Keep the test data unchanged while verifying the result.

## Back up data

Submit an asynchronous backup request:

```shell
curl --request POST 'http://localhost:8080/api/v1/create' \
  --header 'Content-Type: application/json' \
  --data '{
    "async": true,
    "backup_name": "my_backup",
    "collection_names": ["coll"]
  }'
```

The response includes a `requestId`. Submission does not mean that the backup is complete. Copy that value into `backup_id` and poll:

```shell
curl 'http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&backup_name=my_backup'
```

Wait for `data.state_code` to become `2`. The API uses these task states:

| `state_code` | Meaning |
| --- | --- |
| `0` | Initial |
| `1` | Executing |
| `2` | Success |
| `3` | Failed |
| `4` | Timed out |

Check both the response and the task state. HTTP 200 alone is insufficient: a nonzero response `code` indicates an error. A successful response can omit `code` because its value is zero. If a task fails or times out, inspect the response details and server log before restoring from that backup.

List the stored backups and inspect the completed backup by name:

```shell
curl 'http://localhost:8080/api/v1/list'
curl 'http://localhost:8080/api/v1/get_backup?backup_name=my_backup'
```

`get_backup` returns JSON metadata, including `collection_backups`; it does **not** download backup files. For a backup created by another process, a name-only query can return metadata without live task progress. Use the task ID from the current service's create response when monitoring an active backup.

The default format is `auto`, which selects snapshot on Milvus 3.0. To explicitly request binlog, add `"format": "binlog"` to the create body. The CLI's `--for` presets are not an HTTP request field.

To preserve or move the backup, copy the entire directory in object storage. See the [0.6.0 transfer guide](https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md).

## Restore data

Ensure that `coll_bak` does not already exist. Submit a restore request with a suffix:

```shell
curl --request POST 'http://localhost:8080/api/v1/restore' \
  --header 'Content-Type: application/json' \
  --data '{
    "async": true,
    "backup_name": "my_backup",
    "collection_names": ["coll"],
    "collection_suffix": "_bak"
  }'
```

The HTTP `collection_names` field selects names **in the backup**, before the suffix is applied. This request selects `coll` and creates `coll_bak`. The CLI's `--filter` instead matches target names after renaming; do not substitute `coll_bak` into this HTTP field.

Copy `data.id` from the restore response and poll the task:

```shell
curl 'http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID'
```

Wait for `data.state_code: 2` and check `collection_restore_tasks` for the expected target collection. A submitted task is not yet a verified restore.

### Restore with the original name

Use a target instance where `coll` does not exist. Start a separate backup API service configured for that target and the completed backup location, then send this request to the target service:

```shell
curl --request POST 'http://localhost:8080/api/v1/restore' \
  --header 'Content-Type: application/json' \
  --data '{
    "async": true,
    "backup_name": "my_backup",
    "collection_names": ["coll"],
    "collection_suffix": ""
  }'
```

Poll `get_restore` on the same service using the returned task ID. Configure `milvus.*` for the restore target and `backup.storage` for the existing backup. See [Prepare configuration file](milvus_backup_0_6_cli.md#Prepare-configuration-file).

## Verify restored data

After the restore task succeeds, connect to the target Milvus instance and verify that the expected collection and data exist. For the 256-entity test collection, use the full scalar, vector, and search checks in [Verify the result](snapshot-backup-and-restore.md#Verify-the-result).

Change `coll_bak` to `coll` when you restore with the original name. The verification code reads the restored data without deleting it. For production data, compare against a baseline captured at backup time.
