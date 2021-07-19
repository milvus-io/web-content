---
id: release_notes.md
title: Release Notes
---
# Release Notes

## v2.0.0-RC2

Release date: 2021-07-13

### Compatibility

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 2.0.0-RC2 | 2.0.0rc2 | Coming soon            | Coming soon          |

Milvus 2.0.0-RC2 is a preview version of Milvus 2.0.0. It fixes stability and performance issues and refactors code for node and storage management.

### Improvements

- [#6356](https://github.com/milvus-io/milvus/pull/6356) Refactors code for cluster in data coordinator. 
- [#6300](https://github.com/milvus-io/milvus/pull/6300) Refactors code for meta management in data coordinator. (#6300)
- [#6289](https://github.com/milvus-io/milvus/pull/6289) Adds `collectionID` and `partitionID` to `SegmentIndexInfo`. 
- [#6258](https://github.com/milvus-io/milvus/pull/6258) Clears the corresponding `searchMsgStream` in proxy when calling `releaseCollection()`. 
- [#6227](https://github.com/milvus-io/milvus/pull/6227) Merges codes relating to retrieve and search in query node. 
- [#6196](https://github.com/milvus-io/milvus/pull/6196) Adds candidate management for data coordinator to manage data node cluster. 
- [#6188](https://github.com/milvus-io/milvus/pull/6188) Adds Building Milvus with Docker Docs. (#6188)

### Features

- [#6386](https://github.com/milvus-io/milvus/pull/6386) Adds the `fget_objects()` method for loading files from MinIO to the local device.
- [#6253](https://github.com/milvus-io/milvus/pull/6253) Adds the `GetFlushedSegments()` method in data coordinator.
- [#6213](https://github.com/milvus-io/milvus/pull/6213) Adds the `GetIndexStates()` method.

### Bug fixes

- [#6184](https://github.com/milvus-io/milvus/pull/6184) Search accuracy worsens when dataset gets larger.
- [#6308](https://github.com/milvus-io/milvus/pull/6308) The server crashes if the KNNG in NSG is not full.
- [#6212](https://github.com/milvus-io/milvus/pull/6212) Search hangs after restarting query nodes. 
- [#6265](https://github.com/milvus-io/milvus/pull/6265) The server does not check node status when detecting nodes are online. 
- [#6359](https://github.com/milvus-io/milvus/pull/6359) [#6334](https://github.com/milvus-io/milvus/pull/6334) An error occurs when compiling Milvus on CentOS




## v2.0.0-RC1


Release date: 2021-06-28

### Compatibility



| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 2.0.0-RC1 | 2.0.0rc2 | Coming soon            | Coming soon          |



Milvus 2.0.0-RC1 is the preview version of 2.0.0. It introduces Golang as the distributed layer development language and a new cloud-native distributed design. The latter brings significant improvements to scalability, elasticity, and functionality. 

### Architecture

Milvus 2.0 is a cloud-native vector database with storage and computation separated by design. All components in this refactored version of Milvus are stateless to enhance elasticity and flexibility.

 The system breaks down into four levels: 

- Access layer
- Coordinator service
- Worker nodes 
- Storage 

**Access layer:** The front layer of the system and endpoint to users.  It comprises peer proxies for forwarding requests and gathering results.

**Coordinator** **service:** The coordinator service assigns tasks to the worker nodes and functions as the system's brain. It has four coordinator types: root coord, data coord, query coord, and index coord.

**Worker nodes:** Worker nodes are dumb executors that follow the instructions from the coordinator service. There are three types of worker nodes, each responsible for a different job: data nodes, query nodes, and index nodes.

**Storage:** The cornerstone of the system that all other functions depend on. It has three storage types: meta storage, log broker, and object storage. Kudos to the open-source communities of etcd, Pulsar, MinIO, and RocksDB for building this fast, reliable storage.

> For more information about how the system works, see [Milvus 2.0 Architecture](architecture_overview.md).

### New Features

**SDK**

- Object-relational mapping (ORM) PyMilvus

  The PyMilvus-ORM APIs operate directly on collections, partitions, and indexes, helping users focus on the building of an effective data model rather than the detailed implementation. 

**Core Features**

- Hybrid Search between scalar and vector data

  Milvus 2.0 supports storing scalar data. Operators such as GREATER, LESS, EQUAL, NOT, IN, AND, and OR can be used to filter scalar data before a vector search is conducted. Current supported data types include bool, int8, int16, int32, int64, float, and double. Support for string/VARBINARY data will be offered in a later version.

- Match query

  Unlike the search operation, which returns similar results, the match query operation returns exact matches. Match query can be used to retrieve vectors by ID or by condition. 

- Tunable consistency

  Distributed databases make tradeoffs between consistency and availbility/latency. Milvus offers four consistency levels (from strongest to weakest): strong, bounded staleness, session, and consistent prefix. You can define your own read consistency by specifying the read timestamp. As a rule of thumb, the weaker the consistency level, the higher the availability and the higher the performance.

- Time travel

  Time travel allows you to access historical data at any point within a specified time period, making it possible to query data in the past, restore, and backup. 

**Miscellaneous**

- Supports installing Milvus 2.0 with Helm or Docker-compose.

- Compatibility with Prometheus and Grafana for monitoring and alerts.

- Milvus Insight

  Milvus Insight is a graphical management system for Milvus. It features visualization of cluster states, meta management, data queries and more. Milvus Insight will eventually be open sourced.

### Breaking Changes

Milvus 2.0 uses entirely different programming language, data format, and distributed architecture compared with previous versions. This means prior versions of Milvus cannot be upgraded to 2.x. However, Milvus 1.x is receiving long-term support and data migration tools will be made available as soon as possible. 

Specific breaking changes include:

- JAVA, Go, or C++ SDK is not yet supported.

- Delete or update is not yet supported.

- PyMilvus-ORM does not support force flush.

- Data format is incompatible with all prior versions. 

- Mishards is deprecated because Milvus 2.0 is distributed and sharding middleware is no longer necessary.

- Local file system and distributed system storage are not yet supported.
