---
id: snapshot-use-cases.md
title: "Snapshot Use Cases"
summary: "In this guide, you will find common use cases for snapshots."
beta: Milvus 3.0.x
---

# Snapshot Use Cases

In this guide, you will find common use cases for snapshots.

## Data backup and restoration

Snapshots are quick, point-in-time images of data, suitable for fast rollbacks or testing (days to weeks). At the same time, backups are independent, complete copies stored separately for long-term disaster recovery (weeks to years) and for better protection against total storage failure.

The following table compares snapshots and backups.

<table>
   <tr>
     <th></th>
     <th><p>Backup</p></th>
     <th><p>Snapshot</p></th>
   </tr>
   <tr>
     <td><p>Backup creation</p></td>
     <td><p>Copies all data files (time-consuming)</p></td>
     <td><p>Creates metadata only (in milliseconds)</p></td>
   </tr>
   <tr>
     <td><p>Restoration</p></td>
     <td><p>Imports data and rebuilds indexes</p></td>
     <td><p>Copies existing data and index files only</p></td>
   </tr>
   <tr>
     <td><p>Performance</p></td>
     <td><p>Slow and resource-intensive</p></td>
     <td><p>Fast and lightweight (in seconds to minutes)</p></td>
   </tr>
   <tr>
     <td><p>System impact</p></td>
     <td><p>High I/O and CPU usage</p></td>
     <td><p>Minimal impact</p></td>
   </tr>
</table>

Creating a snapshot usually takes milliseconds, and restoring it takes seconds to minutes, depending on the data volume.

For more details on snapshot limits, restrictions, and their system impacts, refer to [Snapshots](snapshots.md).

## Data processing with external collections

Snapshots can provide stable, point-in-time sources for analytical or validation workloads. For Milvus snapshots, use the `milvus-table` external collection format instead of reading snapshot files directly as generic Spark input. A Milvus snapshot stores collection metadata, segment manifests, delete logs, and primary-key statistics, so Milvus needs the snapshot metadata JSON and the `milvus-table` reader to preserve the correct schema and delete semantics.

This workflow creates a queryable external collection over the snapshot data. The main column data remains referenced from the snapshot source, and refresh maps the source StorageV3 manifests into target external segments.

### Step 1: Get the snapshot metadata path

Create or choose a snapshot from a normal Milvus collection, and then describe it to get its object-storage location.

```python
from pymilvus import DataType, MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

snapshot_info = client.describe_snapshot(
    snapshot_name="analytics_snapshot_20260321",
    collection_name="my_collection",
    include_collection_info=True
)

external_source = f"s3://bucket/{snapshot_info.s3_location}"
```

### Step 2: Create and refresh a `milvus-table` external collection

Create an external collection whose schema matches the snapshot source collection. Set `external_spec.format` to `"milvus-table"`, and set each target data field's `external_field` to the corresponding source field name.

```python
schema = client.create_schema(
    external_source=external_source,
    external_spec="""{
        "format": "milvus-table",
        "extfs": {
            "cloud_provider": "aws",
            "region": "us-west-2",
            "access_key_id": "YOUR_ACCESS_KEY",
            "access_key_value": "YOUR_SECRET_KEY"
        }
    }""",
)

schema.add_field(
    field_name="id",
    datatype=DataType.INT64,
    is_primary=True,
    external_field="id",
)
schema.add_field(
    field_name="embedding",
    datatype=DataType.FLOAT_VECTOR,
    dim=768,
    external_field="embedding",
)

client.create_collection(
    collection_name="snapshot_external_collection",
    schema=schema,
)

job_id = client.refresh_external_collection(
    collection_name="snapshot_external_collection"
)
```

After refresh completes, you can create indexes, load the external collection, and run search or query operations against the snapshot-backed view.
