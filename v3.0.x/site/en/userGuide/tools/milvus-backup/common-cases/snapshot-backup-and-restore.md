---
id: snapshot-backup-and-restore.md
summary: Back up a collection and restore it with a new name in the same Milvus instance.
title: Snapshot Backup and Restore in One Instance
beta: Milvus Backup 0.6.x
---

# Snapshot Backup and Restore in One Instance

Back up a collection and restore it with a new name in the same Milvus instance. This example creates a snapshot of `coll` and restores it as `coll_bak` on **Milvus 3.0.1 or later**. For Backup 0.5.x, use [Backup and Restore in One Instance](single-instance-backup-and-restore.md).

## Overview

| Location | Milvus instance | Object store | Bucket | Root path |
| --- | --- | --- | --- | --- |
| Source data | `milvus-a` | `minio-a` | `bucket-a` | `files` |
| Backup created by the source | — | `minio-a` | `bucket-a` | `backup/my_backup` |
| Restored data | `milvus-a` | `minio-a` | `bucket-a` | `files` |

## Prerequisites

- Use Milvus 3.0.1 or later. This example was validated with Milvus Backup 0.6.0 and Milvus 3.0.1. Install the tool as described in [Back up and Restore Data Using Commands](milvus_backup_0_6_cli.md).
- Use an existing collection named `coll`, or create the optional sample collection below. Keep its data unchanged while comparing source and restored results.
- Make the Milvus gRPC port (19530), management port (9091), and object storage accessible to Milvus Backup. The Milvus server must also be able to access the backup storage for snapshot export and import.
- Replace the example hostnames, bucket names, root paths, and credentials with your deployment settings. Milvus storage settings must match the running instance; changing the backup configuration does not reconfigure Milvus.
- Ensure that `coll_bak` does not exist in the target instance.

For Milvus storage settings, see [Object Storage](deploy_s3.md). For existing v1 backup configurations, see [Upgrade Milvus Backup](milvus_backup_upgrade.md#Migrate-the-configuration).

## Prepare sample data

The commands below use an existing collection named `coll`. You can use your own collection by changing the names consistently.

For a small test collection, install PyMilvus and run the following against an empty collection name. Replace the URI if Milvus is not local:

```shell
pip install pymilvus==3.0.0
```

```python
import random
from pymilvus import DataType, MilvusClient

client = MilvusClient(uri="http://localhost:19530")
assert not client.has_collection("coll"), "Use an empty sample collection name"
schema = client.create_schema(auto_id=False, enable_dynamic_field=False)
schema.add_field("id", DataType.INT64, is_primary=True)
schema.add_field("label", DataType.VARCHAR, max_length=64)
schema.add_field("vector", DataType.FLOAT_VECTOR, dim=8)
indexes = client.prepare_index_params()
indexes.add_index(field_name="vector", index_type="AUTOINDEX", metric_type="L2")
client.create_collection("coll", schema=schema, index_params=indexes)

rng = random.Random(601)
rows = [
    {"id": i, "label": f"backup-docs-{i}",
     "vector": [rng.randrange(256) / 256 for _ in range(8)]}
    for i in range(256)
]
client.insert("coll", rows)
client.flush("coll")
```

This creates 256 entities. Keep this test data unchanged while following the remaining steps.

## Back up the collection

### Step 1: Prepare configuration

Run the following from the directory containing the `milvus-backup` binary. Keep this working directory for the remaining commands:

```shell
mkdir -p configs
```

Save the following as `configs/backup-source.yaml`. The example uses MinIO's default test credentials; replace them with credentials for your object store.

```yaml
configVersion: v2
milvus:
  grpc:
    address: milvus-a
    port: 19530
  management:
    endpoint: http://milvus-a:9091
  storage:
    provider: minio
    address: minio-a
    port: 9000
    useSSL: false
    bucketName: bucket-a
    rootPath: files
    auth:
      type: static
      accessKeyID: minioadmin
      secretAccessKey: minioadmin
backup:
  storage:
    bucketName: bucket-a
    rootPath: backup
transfer:
  mode: auto
```

`milvus.storage` describes the source instance's data. `backup.storage` describes the backup destination. Unset backup storage fields inherit from `milvus.storage`, except `rootPath`, which defaults to `backup`.

If Milvus and Milvus Backup use different addresses to reach the same object store, configure `backup.storage.milvusAddress` and `milvusPort` with the address reachable by the Milvus server. See the [0.6.0 configuration example](https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml).

### Step 2: Check connectivity and create a backup

```shell
./milvus-backup check --config configs/backup-source.yaml
./milvus-backup create --format snapshot --filter coll -n my_backup --config configs/backup-source.yaml
./milvus-backup get -n my_backup --config configs/backup-source.yaml
```

The connectivity check should report `Success!`. The create command should report `create backup success`, and the backup information should list `coll`.

The explicit `--format snapshot` selects the snapshot workflow. The default `auto` also selects snapshot on Milvus 3.0. The backup includes metadata and an exported snapshot bundle under `bucket-a/backup/my_backup`. Preserve the whole directory.

## Restore within the same instance

Use the same configuration to restore the backup with a suffix:

```shell
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-source.yaml
```

The CLI `--filter` matches the target name **after** applying `-s` or `--rename`. Use `coll_bak`, not `coll`, in this restore command. A filter that matches nothing can exit successfully without creating a collection.

The restored collection uses the target instance's configured storage. Milvus manages the snapshot import and the resulting data layout.

## Verify the result

For the optional 256-entity sample data above, run this against the restore target. Replace `localhost:19530` with the same Milvus endpoint used to prepare the data. It verifies the count, every scalar and vector value, and a vector search result without deleting data:

```python
import random
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")
assert client.has_collection("coll_bak")
if not client.list_indexes("coll_bak"):
    indexes = client.prepare_index_params()
    indexes.add_index(field_name="vector", index_type="AUTOINDEX", metric_type="L2")
    client.create_index("coll_bak", indexes)
client.load_collection("coll_bak")

rng = random.Random(601)
expected = [
    {"id": i, "label": f"backup-docs-{i}",
     "vector": [rng.randrange(256) / 256 for _ in range(8)]}
    for i in range(256)
]
count = client.query("coll_bak", filter="", output_fields=["count(*)"],
                     consistency_level="Strong")[0]["count(*)"]
actual = client.query("coll_bak", filter="id >= 0",
                      output_fields=["id", "label", "vector"], limit=512,
                      consistency_level="Strong")
assert count == 256
assert sorted(actual, key=lambda row: row["id"]) == expected
hits = client.search("coll_bak", data=[expected[7]["vector"]], limit=1,
                     consistency_level="Strong")
assert hits[0][0]["id"] == 7
print("Backup and restore verified")
```

For other data, compare against your own backup-time baseline. Create an appropriate vector index before loading if the restored collection has none. A successful command alone does not prove that the expected data was restored.
