---
id: release_notes.md
title: Release Notes
---
# Release Notes
## v2.0.0-RC5

Release date: 2021-08-30

### Compatibility

<table class="version">
	<thead>
	<tr>
		<th>Milvus version</th>
		<th>Python SDK version</th>
		<th>Java SDK version</th>
		<th>Go SDK version</th>
		<th>Node SDK version</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>2.0.0-RC5</td>
		<td>2.0.0rc5</td>
		<td>Coming soon</td>
		<td>Coming soon</td>
		<td>1.0.16</td>
	</tr>
	</tbody>
</table>

Milvus 2.0.0-RC5 is a preview version of Milvus 2.0.0. It supports message queue data retention mechanism and etcd data cleanup,  exposes cluster metrics through API, and prepares for delete operation support. RC5 also made great progress on system stability. We fixed a series of resource leakage, operation hang and the misconfiguration of standalone Pulsar under Milvus cluster.

### Improvements

- [#7226](https://github.com/milvus-io/milvus/pull/7226) Refactors data coord allocator.
- [#6867](https://github.com/milvus-io/milvus/pull/6867) Adds connection manager.
- [#7172](https://github.com/milvus-io/milvus/pull/7172) Adds a seal policy to restrict the lifetime of a segment.
- [#7163](https://github.com/milvus-io/milvus/pull/7163) Increases the timeout for gRPC connection when creating index.
- [#6996](https://github.com/milvus-io/milvus/pull/6996) Adds a minimum interval for segment flush.
- [#6590](https://github.com/milvus-io/milvus/pull/6590) Saves binlog path in `SegmentInfo`.
- [#6848](https://github.com/milvus-io/milvus/pull/6848) Removes `RetrieveRequest` and `RetrieveTask.`
- [#7102](https://github.com/milvus-io/milvus/pull/7102) Supports vector field as output.
- [#7075](https://github.com/milvus-io/milvus/pull/7075) Refactors `NewEtcdKV` API.
- [#6965](https://github.com/milvus-io/milvus/pull/6965) Adds channel for data node to watch etcd.
- [#7066](https://github.com/milvus-io/milvus/pull/7066) Optimizes search reduce logics.
- [#6993](https://github.com/milvus-io/milvus/pull/6993) Enhances the log when parsing gRPC recv/send parameters.
- [#7331](https://github.com/milvus-io/milvus/pull/7331) Changes context to correct package. 
- [#7278](https://github.com/milvus-io/milvus/pull/7278) Enables etcd auto compaction for every 1000 revision.
- [#7355](https://github.com/milvus-io/milvus/pull/7355) Clean `fmt.Println `in util/flowgraph.

### Features

- [#7112](https://github.com/milvus-io/milvus/pull/7112) [#7174](https://github.com/milvus-io/milvus/pull/7174) Imports an embedded etcdKV (part 1).
- [#7231](https://github.com/milvus-io/milvus/pull/7231) Adds a segment filter interface.
- [#7157](https://github.com/milvus-io/milvus/pull/7157) Exposes metrics of index coord and index nodes.
- [#7137](https://github.com/milvus-io/milvus/pull/7137) [#7157](https://github.com/milvus-io/milvus/pull/7157) Exposes system topology information by proxy.
- [#7113](https://github.com/milvus-io/milvus/pull/7113) [#7157](https://github.com/milvus-io/milvus/pull/7157) Exposes metrics of query coord and query nodes.
- [#7134](https://github.com/milvus-io/milvus/pull/7134) Allows users to get vectors using memory instead of local storage.
- [#6617](https://github.com/milvus-io/milvus/pull/6617) Supports retention for rocksmq.
- [#7303](https://github.com/milvus-io/milvus/pull/7303) Adds query node segment filter.
- [#7304](https://github.com/milvus-io/milvus/pull/7304) Adds `delete` API into proto.
- [#7261](https://github.com/milvus-io/milvus/pull/7261) Adds delete node.
- [#7268](https://github.com/milvus-io/milvus/pull/7268) Constructs Bloom filter when inserting.

### Bug Fixes

- [#7272](https://github.com/milvus-io/milvus/pull/7272) [#7352](https://github.com/milvus-io/milvus/pull/7352) [#7335](https://github.com/milvus-io/milvus/pull/7335) Failure to start new docker container with existing volumes if index was created: proxy is not healthy.
- [#7243](https://github.com/milvus-io/milvus/pull/7243) Failure to create index in a new version of Milvus for data that were inserted in an old version.
- [#7253](https://github.com/milvus-io/milvus/pull/7253) Search gets empty results after releasing a different partition.
- [#7244](https://github.com/milvus-io/milvus/pull/7244) [#7227](https://github.com/milvus-io/milvus/pull/7227) Proxy crashes when receiving empty search results.
- [#7203](https://github.com/milvus-io/milvus/pull/7203) Connection gets stuck when gRPC server is down.
- [#7188](https://github.com/milvus-io/milvus/pull/7188) Incomplete unit test logics.
- [#7175](https://github.com/milvus-io/milvus/pull/7175) Unspecific error message returns when calculating distances using collection IDs without loading.
- [#7151](https://github.com/milvus-io/milvus/pull/7151) Data node flowgraph does not close caused by missing `DropCollection`.
- [#7167](https://github.com/milvus-io/milvus/pull/7167) Failure to load IVF_FLAT index.
- [#7123](https://github.com/milvus-io/milvus/pull/7123) Timestamp go back for `timeticksync`.
- [#7140](https://github.com/milvus-io/milvus/pull/7140) `calc_distance` returns wrong results for binary vectors when using TANIMOTO metrics.
- [#7143](https://github.com/milvus-io/milvus/pull/7143) The state of memory and etcd is inconsistent if KV operation fails.
- [#7141](https://github.com/milvus-io/milvus/pull/7141) [#7136](https://github.com/milvus-io/milvus/pull/7136) Index building gets stuck when the index node pod is frequently killed and pulled up.
- [#7119](https://github.com/milvus-io/milvus/pull/7119) Pulsar `msgStream` may get stuck when subscribed with the same topic and sub name.
- [#6971](https://github.com/milvus-io/milvus/pull/6971) Exception occurs when searching with index (HNSW).
- [#7104](https://github.com/milvus-io/milvus/pull/7104) Search gets stuck if query nodes only load sealed segment without watching insert channels.
- [#7085](https://github.com/milvus-io/milvus/pull/7085) Segments do not auto flush.
- [#7074](https://github.com/milvus-io/milvus/pull/7074) Index nodes wait for index coord to start to complete.
- [#7061](https://github.com/milvus-io/milvus/pull/7061) Segment allocation does not expire if data coord does not receive timetick message from data node.
- [#7059](https://github.com/milvus-io/milvus/pull/7059) Query nodes get producer leakage.
- [#7005](https://github.com/milvus-io/milvus/pull/7005) Query nodes do not return error to query coord when `loadSegmentInternal` fails.
- [#7054](https://github.com/milvus-io/milvus/pull/7054) Query nodes return incorrect IDs when `topk` is larger than `row_num.`
- [#7053](https://github.com/milvus-io/milvus/pull/7053) Incomplete allocation logics.
- [#7044](https://github.com/milvus-io/milvus/pull/7044) Lack of check on unindexed vectors in memory before retriving vectors in local storage.
- [#6862](https://github.com/milvus-io/milvus/pull/6862) Memory leaks in flush cache of data node.
- [#7346](https://github.com/milvus-io/milvus/pull/7346) Query coord container exited in less than 1 minute when re-installing Milvus cluster.
- [#7339](https://github.com/milvus-io/milvus/pull/7339) Incorrect expression boundary.
- [#7311](https://github.com/milvus-io/milvus/pull/7311) Collection nil when adding query collection.
- [#7266](https://github.com/milvus-io/milvus/pull/7266) Flowgraph released incorrectly.
- [#7310](https://github.com/milvus-io/milvus/pull/7310) Excessive timeout when searching after releasing and loading a partition.
- [#7320](https://github.com/milvus-io/milvus/pull/7320) Port conflicts between embedded etcd and external etcd.
- [#7336](https://github.com/milvus-io/milvus/pull/7336) Data node corner cases.




## v2.0.0-RC4

Release date: 2021-08-13

### Compatibility

| **Milvus version** | **Python SDK version**                | **Java SDK version** | **Go SDK version** |
| ------------------ | ------------------------------------- | -------------------- | ------------------ |
| 2.0.0-RC4          | 2.0.0rc5 | Coming soon          | Coming soon        |

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
| 2.0.0-RC2 | 2.0.0rc5 | Coming soon            | Coming soon          |

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
| 2.0.0-RC1 | 2.0.0rc5 | Coming soon            | Coming soon          |



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
