---
id: release_notes.md
summary: Milvus Release Notes
---
# Release Notes

Find out what’s new in Milvus! This page summarizes information about new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.1.0 in this section. We suggest that you regularly visit this page to learn about updates.

## v2.2.0
Release date: 18 November, 2022

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
| -------------- | ------------------ | ---------------- | -------------- | ------------------- |
| 2.2.0          | 2.2.0              | 2.2.1            | Coming soon          | 2.2.0               |

Milvus 2.2.0 introduces many new features including support for Disk-based approximate nearest neighbor (ANN) algorithm, bulk insertion of entities from files, and role-based access control (RBAC) for an improved security. In addition, this major release also ushers in a new era for vector search with enhanced stability, faster search speed, and more flexible scalability.

<h3 id="v2.2.0">Breaking changes</h3> 

Since metadata storage is refined and API usage is normalize, Milvus 2.2 is not fully compatible with earlier releases. Read [this guide](upgrade_milvus_cluster-helm.md) to learn how to safely upgrade from Milvus 2.1.x to 2.2.0.

<h3 id="v2.2.0">Features</h3> 

- Support for bulk insertion of entities from files
Milvus now offers a new set of bulk insertion APIs to make data insertion more efficient. You can now upload entities in a Json file directly to Milvus. See [Insert Entities from Files](bulk_load.md) for details.

- Query result pagination 
To avoid massive search and query results returned in a single RPC, Milvus now supports configuring offset and filtering results with keywords in searches and queries. See [Search](search.md) and [Query](query.md) for details.


- Role-based access control (RBAC)
Like other traditional databases, Milvus now supports RBAC so that you can manages users, roles and privileges. See [Enable RBAC](rbac.md) for details.

- Quotas and limits
Quota is a new mechanism that protects the system from OOM and crash under a burst of traffic. By imposing quota limitations, you can limit ingestion rate, search rate, etc. See [Quota and Limitation Configurations](configure_quota_limits.md) for details.


- Time to live (TTL) at a collection level
In prior releases, we only support configuring TTL at a cluster level. Milvus 2.2.0 now supports configuring collection TTL when you create or modify a collection. After setting TTL for a collection, the entities in this collection automatically expires after the specified period of time. See [Create a collection](create_collection.md) or [Modify a collection](modify_collection.md) for details.


- Support for disk-based approximate nearest neighbor search (ANNS) indexes (Beta)
Traditionally, you need to load the entire index into memory before search. Now with DiskANN, an SSD-resident and Vamana graph-based ANNS algorithm, you can directly search on large-scale datasets and save up to 10 times the memory.


- Data backup (Beta)
Thanks to the contribution from [Zilliz](https://zilliz.com/), Milvus 2.2.0 now provides [a tool](https://github.com/zilliztech/milvus-backup) to back up and restore data. The tool can be used either in a command line or an API server for data security.
 

<h3 id="v2.2.0">Bug fixes and stability</h3>

- Implements query coord V2, which handles all channel/segment allocation in a fully event-driven and asynchronous mode. Query coord V2 address all issues of stuck searches and accelerates failure recovery.
- Root coord and index coord are refactored for more elegant handling of errors and better task scheduling.
- Fixes the issue of invalid RocksMQ retention mechanism when Milvus Standalone restarts.
- Meta storage format in etcd is refactored. With the new compression mechanism, etcd kv size is reduced by 10 times and the issues of etcd memory and space are solved.
- Fixes a couple of memory issues when entities are continuously inserted or deleted.

<h3 id="v2.2.0">Improvements</h3>

- Performance
  - Fixes performance bottleneck to that Milvus can fully utilize all cores when CPU is more than 8 cores.
  - Dramatically improves the search throughput and reduce the latency.
  - Decreases load speed by processing load in parallel.
  
- Observability
  - Changes all log levels to `info` by default.
  - Added collection-level latency metrics for search, query, insertion, and deletion.

- Debug tool
  - [BirdWatcher](https://github.com/milvus-io/birdwatcher), the debug tool for Milvus, is further optimized as it can now connect to Milvus meta storage and inspect the part of the internal status of the Milvus system.

<h3 id="v2.2.0">Others</h3>

- Index and load
  - A collection can only be loaded with an index created on it.
  - Indexes cannot be created after a collection is loaded.
  - A loaded collection must be released before dropping the index created on this collection.
  
- Flush
  - Flush API, which forces a seal on a growing segment and syncs the segment to object storage, is now exposed to users. Calling `flush()` frequently may affect search performance as too many small segments are created. 
  - No auto-flush is triggered by any SDK APIs such as `num_entities()`, `create_index()`, etc.
  
- Time Travel
  - In Milvus 2.2,  Time Travel is disabled by default to save disk usage. To enable Time Travel, configure the parameter `common.retentionDuration` manually.
