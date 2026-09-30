---
id: storage-v3.md
title: "Storage V3"
summary: "Learn which Milvus 3.0 features require Storage V3, how to enable it, and which compatibility limits apply."
beta: Milvus 3.0.x
---

# Storage V3

## Overview

AI datasets often evolve after a collection is created. As models and workflows change, teams may need to add text, generate new vector fields for existing entities, or use data stored outside Milvus. Supporting these workflows requires a storage model that can evolve with the dataset.

Storage V3 provides this model in Milvus 3.0. It uses a versioned storage layout to incorporate data added or rewritten over time, while applications continue to access collections through the same Milvus APIs.

Storage V3 is disabled by default. After `common.storage.useLoonFFI` takes effect, new writes and compaction output use Storage V3. Existing data remains in its current layout until eligible data is rewritten by background compaction. Milvus can read both layouts during this transition. Enable Storage V3 to use features that depend on it, rather than as a general performance optimization.

## Data formats in Storage V3

Storage V3 uses manifests to describe collection data independently of the underlying data format. This lets the same storage layer work with both data managed by Milvus and data that remains in an external system.

### Managed collection file formats

For managed collections, `dataNode.storage.format` selects the file format for new Storage V3 data. The setting supports the following values:

| Format | Description |
| --- | --- |
| `parquet` | The default, widely adopted columnar file format with broad ecosystem compatibility and mature tooling. Parquet organizes data into row groups and supports per-column encoding and compression, allowing Milvus to read only the required columns and efficiently process large sequential scans. |
| `vortex` | An optional, next-generation columnar file format built around extensible, composable encodings and rich statistics. In Milvus, Vortex supports column projection, range reads, and random-access reads. These capabilities can reduce unnecessary data reads for suitable workloads. |

Changing `dataNode.storage.format` affects new Storage V3 writes. Existing files keep their current format until compaction rewrites the corresponding segments. Most deployments should keep the default `parquet` format unless representative benchmarks show that `vortex` better suits their data and access patterns.

### External collections and supported source formats

External collections allow Milvus to use data stored in external files or tables. Storage V3 supports the following external source formats:

| Format | Category | Expected source | Storage V3 support |
| --- | --- | --- | --- |
| `parquet` | File format | A directory or object-storage prefix containing Parquet files. | Discovers the files, reads their metadata and row groups, and records them in a Storage V3 manifest. |
| `vortex` | File format | A directory or object-storage prefix containing Vortex files. | Discovers the files and uses Vortex layout and statistics for projection, range reads, and random-access reads. |
| `lance-table` | Table format | A Lance dataset directory. | Reads the dataset metadata and maps its fragments into a Storage V3 manifest. |
| `iceberg-table` | Table format | An Iceberg metadata JSON file and snapshot ID. | Resolves the specified snapshot, plans its data files, and preserves position-delete metadata. Equality deletes are not supported and must be converted to position deletes before the external collection is refreshed. |

External sources are read-only. Storage V3 creates and refreshes its own manifest without modifying or copying the source data. Milvus can then build indexes and run searches and queries over the data through an external collection.

#### Cloud storage and cross-account authentication

The following table describes only how an external collection accesses source data stored in another cloud account. It does not describe the object storage used for Milvus-managed data.

| Cloud storage | Supported external formats | Cross-account authentication for external collections |
| --- | --- | --- |
| Amazon S3 | All four formats listed above. | Specify the customer-owned IAM role ARN. Storage V3 uses AWS STS `AssumeRole` to obtain temporary credentials and refreshes them as needed. You can also provide an external ID when required by the role's trust policy. |
| Google Cloud Storage (GCS) | All four formats listed above. | Specify the target service account. Storage V3 impersonates that service account, uses its short-lived OAuth access tokens to access the source bucket, and refreshes the tokens before they expire. |
| Azure Blob Storage | `parquet`, `vortex`, and `lance-table`. `iceberg-table` is not supported. | Milvus requests short-lived SAS credentials through the `milvus-tools` private gRPC service. Storage V3 uses the SAS credentials to access the source container, and the credentials are renewed before they expire. |
| Azure Data Lake Storage Gen2 (ADLS Gen2) | All four formats listed above. | Milvus requests short-lived SAS credentials through the `milvus-tools` private gRPC service. Storage V3 uses the SAS credentials to access the source container, and the credentials are renewed before they expire. |
| Alibaba Cloud Object Storage Service (OSS) | All four formats listed above. | Specify the customer-owned RAM role ARN. Storage V3 assumes the role using the runtime's workload identity or ECS RAM role, then uses temporary credentials to access the source bucket. |

For external collection configuration and usage instructions, see [Create an External Collection](create-an-external-collection.md).

## Features that require Storage V3

| Feature | Description | Required configuration |
| --- | --- | --- |
| Vortex file format | Write new managed-collection data in the Vortex file format. | <ul><li><a href="configure_common.md#commonstorageuseLoonFFI"><code>common.storage.useLoonFFI</code></a><code>=true</code></li><li><code>dataNode.storage.format=vortex</code></li></ul> |
| [`TEXT` field](text.md) | Store long source text, such as passages, documents, tickets, or logs, without setting a fixed maximum length in the collection schema. | [`common.storage.useLoonFFI`](configure_common.md#commonstorageuseLoonFFI)`=true` |
| [Function-generated vector fields](add-fields-to-an-existing-collection.md) | Add a BM25 or MinHash Function to an existing collection so Milvus generates a new vector field from an existing `VARCHAR` field. Milvus backfills the generated values for existing entities asynchronously through background compaction. | <ul><li><a href="configure_common.md#commonstorageuseLoonFFI"><code>common.storage.useLoonFFI</code></a><code>=true</code></li><li><a href="configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code>dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code>=true</code></li><li><a href="configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code>dataCoord.compaction.storageVersion.enabled</code></a><code>=true</code></li></ul> |
| [External collections](create-an-external-collection.md) | Query data stored outside Milvus without copying it into a managed collection. Refresh the external collection when the source data changes. To expose additional source fields, see [Alter External Collection Schema](alter-external-collection-schema.md). | [`common.storage.useLoonFFI`](configure_common.md#commonstorageuseLoonFFI)`=true` |

## Before you enable Storage V3

<div class="alert warning">

Once Milvus writes data in Storage V3, downgrading to a Milvus version that cannot read Storage V3 is not supported. Disabling Storage V3 later does not immediately convert all existing Storage V3 data or restore compatibility with the older version.

</div>

Before enabling Storage V3, consider the following data behavior:

- Because `dataCoord.compaction.storageVersion.enabled` is enabled by default, eligible existing data can transition to Storage V3 gradually through background compaction.
- Disabling Storage V3 changes the target storage version for future writes and eligible compaction output. It does not synchronously convert all existing Storage V3 data or make a version downgrade safe.

## Enable Storage V3

Set `common.storage.useLoonFFI` to `true` in your Milvus configuration:

```yaml
common:
  storage:
    useLoonFFI: true
```

Milvus treats this setting as refreshable. Apply the change through the configuration-update workflow supported by your deployment. Editing a static configuration file alone does not guarantee that the running deployment has received the new value.

If you plan to add a Function and its generated vector field to an existing collection, also enable the two compaction settings required for existing-data backfill:

```yaml
dataCoord:
  compaction:
    bumpSchemaVersion:
      enabled: true
    storageVersion:
      enabled: true
```

The Function output for existing entities is generated asynchronously through background compaction. A successful schema update does not indicate that backfill has completed for every existing entity.

## Related documentation

- [Text Field](text.md)
- [Alter Collection Schema](add-fields-to-an-existing-collection.md)
- [Create an External Collection](create-an-external-collection.md)
- [Overview of Milvus Deployment Options](install-overview.md)
- [Upgrade Milvus Standalone with Helm Chart](upgrade_milvus_standalone-helm.md)
- [Upgrade Milvus Cluster with Helm Chart](upgrade_milvus_cluster-helm.md)
- [common-related Configurations](configure_common.md)
- [dataCoord-related Configurations](configure_datacoord.md)
- [Why We Built Loon: a Storage Engine for AI Data That Never Stops Changing](https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md) — Engineering background on the design motivations behind Storage V3.
