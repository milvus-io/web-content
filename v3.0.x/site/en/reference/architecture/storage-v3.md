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

## Features that require Storage V3

| Feature | Description | Required configuration |
| --- | --- | --- |
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
