---
id: release_notes.md
title: Release Notes
---
# Release Notes
## v2.0.0-RC4

Release date: 2021-08-13

### Compatibility

| **Milvus version** | **Python SDK version**                | **Java SDK version** | **Go SDK version** |
| ------------------ | ------------------------------------- | -------------------- | ------------------ |
| 2.0.0-RC4          | 2.0.0rc4 | Coming soon          | Coming soon        |

Milvus 2.0.0-RC4 is a preview version of Milvus 2.0.0. It mainly focuses on fixing stability issues, it also offers functionalities to retrieve vector data from object storage and specify output field by wildcard matching.

### Improvements

- [#6984](https://github.com/milvus-io/milvus/issues/6984) [#6772](https://github.com/milvus-io/milvus/issues/6772) [#6704](https://github.com/milvus-io/milvus/issues/6704) [#6652](https://github.com/milvus-io/milvus/issues/6652) [#6536](https://github.com/milvus-io/milvus/issues/6536) [#6522](https://github.com/milvus-io/milvus/issues/6522) Unit test improvements.

- [#6859](https://github.com/milvus-io/milvus/pull/6861) Increases the `MaxCallRecvMsgSize` and `MaxCallSendMsgSize` of gRPC client.

- [#6796](https://github.com/milvus-io/milvus/pull/6807) Fixes MsgStream exponential retry.

- [#6897](https://github.com/milvus-io/milvus/pull/6897) [#6899](https://github.com/milvus-io/milvus/pull/6899) [#6681](https://github.com/milvus-io/milvus/pull/6899) [#6766](https://github.com/milvus-io/milvus/pull/6766) [#6768](https://github.com/milvus-io/milvus/pull/6768) [#6597](https://github.com/milvus-io/milvus/pull/6597) [#6501](https://github.com/milvus-io/milvus/pull/6501) [#6477](https://github.com/milvus-io/milvus/pull/6477) [#6478](https://github.com/milvus-io/milvus/pull/6478) [#6935](https://github.com/milvus-io/milvus/pull/6935) [#6871](https://github.com/milvus-io/milvus/pull/6871) [#6671](https://github.com/milvus-io/milvus/pull/6671) [#6682](https://github.com/milvus-io/milvus/pull/6682) Log improvements.

- [#6440](https://github.com/milvus-io/milvus/pull/6441) Refactors segment manager.

- [#6421](https://github.com/milvus-io/milvus/pull/6449) Splits raw vectors to several smaller binlog files when creating index.

- [#6466](https://github.com/milvus-io/milvus/pull/6467) Separates the idea of query and search.

- [#6505](https://github.com/milvus-io/milvus/pull/6506) Changes `output_fields` to `out_fields_id` for RetrieveRequest.

- [#6427](https://github.com/milvus-io/milvus/pull/6328) Refactors the logic of assigning tasks in index coord.

- [#6529](https://github.com/milvus-io/milvus/pull/6543) [#6599](https://github.com/milvus-io/milvus/pull/6600) Refactors the snapshot of timestamp statistics.

- [#6692](https://github.com/milvus-io/milvus/issues/6692) [#6343](https://github.com/milvus-io/milvus/pull/6700) Shows/Describes collections/partitions with created timestamps.

- [#6629](https://github.com/milvus-io/milvus/pull/6663) Adds the WatchWithVersion interface for etcdKV.

- [#6666](https://github.com/milvus-io/milvus/pull/6667) Refactors expression executor to use single bitsets.

- [#6664](https://github.com/milvus-io/milvus/pull/6665) Auto creates new segments when allocating rows that exceeds the maximum number of rows per segment.

- [#6786](https://github.com/milvus-io/milvus/pull/6786) Refactors `RangeExpr` and `CompareExpr`.

- [#6497](https://github.com/milvus-io/milvus/pull/6503) Looses the lower limit of dimension when searching on a binary vector field.

### Features

- [#6706](https://github.com/milvus-io/milvus/pull/6707) Supports reading vectors from disk.

- [#6299](https://github.com/milvus-io/milvus/issues/6299) [#6598](https://github.com/milvus-io/milvus/pull/6598) Supports query vector field.

- [#5210](https://github.com/milvus-io/milvus/pull/6460) Extends the grammar of Boolean expressions.

- [#6411](https://github.com/milvus-io/milvus/pull/6510) [#6650](https://github.com/milvus-io/milvus/pull/6671) Supports wildcards and wildcard matching on search/query output fields.  

- [#6464](https://github.com/milvus-io/milvus/pull/6613) Adds a vector chunk manager to support vector file local storage.

- [#6701](https://github.com/milvus-io/milvus/pull/6702) Supports data persistence with docker compose deployments.

- [#6767](https://github.com/milvus-io/milvus/pull/6770) Adds a Grafana dashboard .json file for Milvus.

### Bug fixes

- [#5443](https://github.com/milvus-io/milvus/pull/6976) `CalcDistance` returns wrong results when fetching vectors from collection.

- [#7004](https://github.com/milvus-io/milvus/pull/7004) Pulsar consumer causes goroutine leakage.

- [#6946](https://github.com/milvus-io/milvus/pull/6946) Data race occurs when a flow graph `close()` immediately after `start()`.

- [#6903](https://github.com/milvus-io/milvus/pull/6958) Uses proto marshal instead of marshalTextString in querycoord to avoid crash triggered by unknown field name crash.

- [#6374](https://github.com/milvus-io/milvus/issues/6374) [#6849](https://github.com/milvus-io/milvus/pull/6908) Load collection failure.

- [#6977](https://github.com/milvus-io/milvus/pull/6978) Search returns wrong limit after a partition or collection is dropped.

- [#6515](https://github.com/milvus-io/milvus/issues/6515) [#6567](https://github.com/milvus-io/milvus/issues/6567) [#6552](https://github.com/milvus-io/milvus/issues/6552) [#6483](https://github.com/milvus-io/milvus/pull/6551) Data node BackGroundGC does not work and causes memory leak.

- [#6943](https://github.com/milvus-io/milvus/pull/6944) The MinIOKV `GetObject` method does not close client and causes goroutine leaking per call.

- [#6370](https://github.com/milvus-io/milvus/pull/6935) Search is stuck due to wrong semantics offered by load partition.

- [#6831](https://github.com/milvus-io/milvus/pull/6832) Data node crashes in meta service.

- [#6469](https://github.com/milvus-io/milvus/pull/6905) Search binary results are wrong with metrics of Hamming when limit (topK) is bigger than the quantity of inserted entities.

- [#6693](https://github.com/milvus-io/milvus/pull/6870) Timeout caused by segment race condition.

- [#6097](https://github.com/milvus-io/milvus/pull/6351) Load hangs after frequently restarting query node within a short period of time.

- [#6464](https://github.com/milvus-io/milvus/pull/6465) Data sorter edge cases.

- [#6419](https://github.com/milvus-io/milvus/pull/6439) Milvus crashes when inserting empty vectors.

- [#6477](https://github.com/milvus-io/milvus/pull/6477) Different components repeatedly create buckets in MinIO.

- [#6377](https://github.com/milvus-io/milvus/pull/6377) Query results get incorrect global sealed segments from etcd.

- [#6499](https://github.com/milvus-io/milvus/pull/6500) TSO allocates wrong timestamps.

- [#6501](https://github.com/milvus-io/milvus/pull/6545) Channels are lost after data node crashes.

- [#6527](https://github.com/milvus-io/milvus/pull/6568) Task info of `watchQueryChannels` can't be deleted from etcd.

- [#6576](https://github.com/milvus-io/milvus/issues/6576) [#6526](https://github.com/milvus-io/milvus/pull/6577) Duplicate primary field IDs are added when retrieving entities.

- [#6627](https://github.com/milvus-io/milvus/issues/6627) [#6569](https://github.com/milvus-io/milvus/pull/6628) `std::sort` does not work properly to filter search results when the distance of new record is NaN.

- [#6655](https://github.com/milvus-io/milvus/pull/6656) Proxy crashes when retrieve task is called.

- [#6762](https://github.com/milvus-io/milvus/pull/6763) Incorrect created timestamp of collections and partitions.

- [#6644](https://github.com/milvus-io/milvus/pull/6658) Data node failes to restart automatically.

- [#6641](https://github.com/milvus-io/milvus/pull/6642) Failure to stop data coord when disconnecting with etcd.

- [#6621](https://github.com/milvus-io/milvus/pull/6621) Milvus throws an exception when the inserted data size is larger than the segment.

- [#6436](https://github.com/milvus-io/milvus/issues/6436) [#6573](https://github.com/milvus-io/milvus/issues/6573) [#6507](https://github.com/milvus-io/milvus/pull/6814) Incorrect handling of time synchronization.

- [#6732](https://github.com/milvus-io/milvus/pull/6871) Failure to create IVF_PQ index.




## v2.0.0-RC2

Release date: 2021-07-13

### Compatibility

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 2.0.0-RC2 | 2.0.0rc4 | Coming soon            | Coming soon          |

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
| 2.0.0-RC1 | 2.0.0rc4 | Coming soon            | Coming soon          |



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
