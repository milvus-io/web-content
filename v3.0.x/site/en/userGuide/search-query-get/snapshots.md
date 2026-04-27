---
id: snapshots.md
title: "Snapshots"
summary: "Use snapshots to capture point-in-time collection states for rollback, versioning, and testing."
beta: Milvus 3.0.x
---

# Snapshots

A snapshot is a point-in-time image of a Milvus collection, ideal for quick rollbacks, versioning, and testing. It captures the collection's state at a specific timestamp and stores only metadata and manifest files, such as the schema, indexes, and vector data files (binlogs), for efficient storage and restoration.

<div class="alert note">

Snapshots are quick, point-in-time images of data, suitable for fast rollbacks or testing (**days to weeks**). At the same time, backups are independent, complete copies stored separately for long-term disaster recovery (**weeks to years**) and for better protection against total storage failure.

To create backups, refer to [Milvus Backup](milvus_backup_overview.md).

</div>

## Snapshot anatomy

Milvus implements a manifest-based snapshot architecture for efficient point-in-time capture, storage, and restoration of data without duplicating the actual vector data. The architecture separates metadata management from physical data storage, enabling lightweight snapshots that reference existing segment files in object storage.

When you create a snapshot for a collection, Milvus collects the following:

- **Snapshot metadata**

    It provides basic information for creating the snapshot, including the snapshot name and description, the target collection ID, and the time point at which the snapshot is created.

- **Collection description**

    It contains the description of the target collection, including its schema definition, partition information, and properties.

- **Index information**

    It stores the index metadata and the paths to index files.

- **Segment data**

    It captures the vector data files (binlogs), deletion logs (deltalogs), and index files.

Among the above information, Milvus generates an Apache Avro manifest file for each segment and stores the snapshot metadata, collection description, index information, and the paths to the manifest files in a JSON file. The following diagram illustrates the snapshot folder structure.

```text
snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
```

Creating a snapshot usually takes milliseconds, and restoring it takes seconds to minutes, depending on the data volume.

## Storage impacts and considerations

Once Milvus references a segment or index file in a snapshot, it does not garbage-collect those files unless you drop the snapshot. Snapshots consume storage proportional to the size of the target collections, and object storage costs apply to snapshot retention. In extreme cases, a single snapshot can even double your object storage costs. You are advised to

- Remove old snapshots regularly to save storage.
- Use descriptive names and descriptions for future reference.
- Always verify snapshot creation and restoration results.
- Track snapshot creation timestamps, storage usage, and restoration job IDs for monitoring and troubleshooting.

## Limits and restrictions

- Snapshots become immutable after creation.
- You can restore a snapshot only to a new collection within the same cluster as the original.
- Restored collections retain the same schema, number of shards, and partition count.
- Restored historical data may conflict with TTL policies. You are advised to disable TTL or adjust TTL settings before creating snapshots.

## Further readings

- [Manage Snapshots](manage-snapshots.md) — create, list, restore, and delete snapshots.
- [Snapshot Use Cases](snapshot-use-cases.md) — common patterns and workflows.
- [Milvus Backup](milvus_backup_overview.md) — long-term backup and restore across clusters.
