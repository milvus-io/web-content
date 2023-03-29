---
id: release_notes.md
summary: Milvus Release Notes
---
# Release Notes

Find out what’s new in Milvus! This page summarizes information about new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.2.0 in this section. We suggest that you regularly visit this page to learn about updates.

## 2.2.5

Release date: 29 March, 2023

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
| -------------- | ------------------ | ---------------- | -------------- | ------------------- |
| 2.2.5          | 2.2.4              | 2.2.4            | 2.2.1          | 2.2.4               |

### Security

Fixed MinIO CVE-2023-28432 by upgrading MinIO to RELEASE.2023-03-20T20-16-18Z。

### New Features

- **First/Random replica selection policy**

  This policy allows for a random replica selection if the first replica chosen under the round-robin selection policy fails. This improves the throughput of database operations.

### Bug fixes

- Fixed index data loss during the upgrade from Milvus 2.2.0 to 2.2.3.

  - Fixed an issue to prevent DataCoord from calculating segment lines by stale log entries num (#23069)
  - Fixed DataCoord's meta that may be broken with DataNode of the prior version (#23031)

- Fixed DataCoord Out-of-Memory (OOM) with large fresh pressure.

  - Fixed an issue to make DataNode's tt interval configurable (#22990) 
  - Fixed endless appending SIDs (#22989)

- Fixed a concurrency issue in the LRU cache that was caused by concurrent queries with specified output fields.

  - Fixed an issue to use single-flight to limit the readWithCache concurrent operation (#23037)
  - Fixed LRU cache concurrency (#23041)
  - Fixed query performance issue with a large number of segments (#23028)
  - Fixed shard leader cache
  - Fixed GetShardLeader returns old leader (#22887) (#22903)
  - Fixed an issue to deprecate the shard cache immediately if a query failed (#22848)
  - Fixed an issue to enable batch delete files on GCP of MinIO (#23052) (#23083)
  - Fixed flush delta buffer if SegmentID equals 0 (#23064)
  - fixed unassigned from resource group (#22800)
  - Fixed load partition timeout logic still using createdAt (#23022)
  - Fixed unsub channel always removes QueryShard (#22961)

### Enhancements

- Added memory Protection by using the buffer size in memory synchronization policy (#22797)
- Added dimension checks upon inserted records (#22819) (#22826)
- Added configuration item to disable BF load (#22998)
- Aligned the maximum dimensions of the DisANN index and that of a collection (#23027)
- Added checks whether all columns aligned with same num_rows (#22968) (#22981)
- Upgraded Knowhere to 1.3.11 (#22975)
- Added the user RPC counter (#22870)

## 2.2.4
Release date: 17 March, 2023

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
| -------------- | ------------------ | ---------------- | -------------- | ------------------- |
| 2.2.4          | 2.2.3              | 2.2.3            | 2.2.1          | 2.2.4               |

Milvus 2.2.4 is a minor update to Milvus 2.2.0. It introduces new features, such as namespace-based resource grouping, collection-level physical isolation, and collection renaming. 

In addition to these features, Milvus 2.2.4 also addresses several issues related to rolling upgrades, failure recovery, and load balancing. These bug fixes contribute to a more stable and reliable system. 

We have also made several enhancements to make your Milvus cluster faster and consume less memory with reduced convergence time for failure recovery.

### New Features

- Resource grouping

  Milvus has implemented resource grouping for QueryNodes. A resource group is a collection of QueryNodes. Milvus supports grouping QueryNodes in the cluster into different resource groups, where access to physical resources in different resource groups is completely isolated. See [Manage Resource Group](resource_group.md) for more information.

- Collection renaming

  The Collection-renaming API provides a way for users to change the name of a collection. Currently, PyMilvus supports this API, and SDKs for other programming languages are on the way. See [Rename a Collection](rename_collection.md) for details.

- Google Cloud Storage support

  Milvus now supports Google Cloud Storage as the object storage.

- New option to the search and query APIs

  If you are more concerned with performance rather than data freshness, enabling this option will skip search on all growing segments and offer better search performance under the scenario search with insertion. See [search()](https://milvus.io/api-reference/pymilvus/v2.2.3/Collection/search().md) and [query()](https://milvus.io/api-reference/pymilvus/v2.2.3/Collection/query().md) for details.

### Bug fixes

- Fixed segment not found when forwarding delete to empty segment [#22528](https://github.com/milvus-io/milvus/pull/22528)[#22551](https://github.com/milvus-io/milvus/pull/22551)
- Fixed possible broken channel checkpoint in v2.2.2 [#22205](https://github.com/milvus-io/milvus/pull/22205) [#22227](https://github.com/milvus-io/milvus/pull/22227)
- Fixed entity number mismatch with some entities inserted  [#22306](https://github.com/milvus-io/milvus/pull/22306)
- Fixed DiskANN recovery failure after QueryNode reboots [#22488](https://github.com/milvus-io/milvus/pull/22488) [#22514](https://github.com/milvus-io/milvus/pull/22514)
- Fixed search/release on same segment [#22414](https://github.com/milvus-io/milvus/pull/22414)
- Fixed file system crash during bulk-loading files prefixed with a '.' [#22215](https://github.com/milvus-io/milvus/pull/22215)
- Added tickle for DataCoord watch event [#21193](https://github.com/milvus-io/milvus/pull/21193) [#22209](https://github.com/milvus-io/milvus/pull/22209)
- Fixed deadlock when releasing segments and removing nodes concurrently [#22584](https://github.com/milvus-io/milvus/pull/22584)
- Added channel balancer on DataCoord [#22324](https://github.com/milvus-io/milvus/pull/22324) [#22377](https://github.com/milvus-io/milvus/pull/22377)
- Fixed balance generated reduce task [#22236](https://github.com/milvus-io/milvus/pull/22236) [#22326](https://github.com/milvus-io/milvus/pull/22326)
- Fixed QueryCoord panic caused by balancing [#22486](https://github.com/milvus-io/milvus/pull/22486)
- Added scripts for rolling update Milvus's component installed with helm [#22124](https://github.com/milvus-io/milvus/pull/22124)
- Added `NotFoundTSafer` and `NoReplicaAvailable` to retriable error code [#22505](https://github.com/milvus-io/milvus/pull/22505)
- Fixed no retires upon gRPC error [#22529](https://github.com/milvus-io/milvus/pull/22529)
- Fixed an issue for automatic component state update to healthy after start [#22084](https://github.com/milvus-io/milvus/pull/22084)
- Added graceful-stop for sessions [#22386](https://github.com/milvus-io/milvus/pull/22386)
- Added retry op for all servers [#22274](https://github.com/milvus-io/milvus/pull/22274)
- Fixed metrics info panic when network error happens [#22802](https://github.com/milvus-io/milvus/pull/22802)
- Fixed disordered minimum timestamp in proxy's pchan statistics [#22756](https://github.com/milvus-io/milvus/pull/22756)
- Fixed an issue to ensure segment ID recovery upon failures to send time-tick [#22771](https://github.com/milvus-io/milvus/pull/22771)
- Added segment info retrieval without the binlog path [#22741](https://github.com/milvus-io/milvus/pull/22741)
- Added distribution.Peek for GetDataDistribution in case of blocked by release [#22752](https://github.com/milvus-io/milvus/pull/22752)
- Fixed the segment not found error [#22739](https://github.com/milvus-io/milvus/pull/22739)
- Reset delta position to vchannel in packSegmentLoadReq [#22721](https://github.com/milvus-io/milvus/pull/22721) 
- Added vector float data verification for bulkinsert and insert [#22729](https://github.com/milvus-io/milvus/pull/22729)
- Upgraded Knowhere to 1.3.10 to fix bugs [#22746](https://github.com/milvus-io/milvus/pull/22746) 
- Fixed RootCoord double updates TSO [#22715](https://github.com/milvus-io/milvus/pull/22715) [#22723](https://github.com/milvus-io/milvus/pull/22723)
- Fixed confused time-tick logs [#22733](https://github.com/milvus-io/milvus/pull/22733) [#22734](https://github.com/milvus-io/milvus/pull/22734)
- Fixed session nil point [#22696](https://github.com/milvus-io/milvus/pull/22696)
- Upgraded Knowhere to 1.3.10 [#22614](https://github.com/milvus-io/milvus/pull/22614)
- Fixed incorrect sequence of timetick statistics on proxy[#21855](https://github.com/milvus-io/milvus/pull/21855) [#22560](https://github.com/milvus-io/milvus/pull/22560)
- Enabled DataCoord to handle GetIndexedSegment error from IndexCoord [#22673](https://github.com/milvus-io/milvus/pull/22673)
- Fixed an issue for Milvus writes flushed segment key only after the segment is flushed [#22667](https://github.com/milvus-io/milvus/pull/22667)
- Marked cache deprecated instead of removing it [#22675](https://github.com/milvus-io/milvus/pull/22675)
- Updated shard leader cache [#22632](https://github.com/milvus-io/milvus/pull/22632)
- Fixed an issue for the replica observer to assign node [#22635](https://github.com/milvus-io/milvus/pull/22635)
- Fixed the not found issue when retrieving collection creation timestamp [#22629](https://github.com/milvus-io/milvus/pull/22629) [#22634](https://github.com/milvus-io/milvus/pull/22634)
- Fixed time-tick running backwards during DDLs [#22617](https://github.com/milvus-io/milvus/pull/22617) [#22618](https://github.com/milvus-io/milvus/pull/22618)
- Fixed max collection name case [#22601](https://github.com/milvus-io/milvus/pull/22601) 
- Fixed DataNode tickle not run default [#22622](https://github.com/milvus-io/milvus/pull/22622)-
- Fixed DataCoord panic while reading timestamp of an empty segment [#22598](https://github.com/milvus-io/milvus/pull/22598)
- Added scripts to get etcd info [#22589](https://github.com/milvus-io/milvus/pull/22589)
- Fixed concurrent loading timeout during DiskANN indexing [#22548](https://github.com/milvus-io/milvus/pull/22548)
- Fixed an issue to ensure index file not finish early because of compaction [#22509](https://github.com/milvus-io/milvus/pull/22509)
- Added `MultiQueryNodes` tag for resource group [#22527](https://github.com/milvus-io/milvus/pull/22527) [#22544](https://github.com/milvus-io/milvus/pull/22544)

### Enhancement

- **Performance**

  - Improved query performance by avoiding counting all bits [#21909](https://github.com/milvus-io/milvus/pull/21909) [#22285](https://github.com/milvus-io/milvus/pull/22285)
  - Fixed dual copy of varchar fields while loading [#22114](https://github.com/milvus-io/milvus/pull/22114) [#22291](https://github.com/milvus-io/milvus/pull/22291)
  - Updated DataCoord compaction panic after DataNode update plan to ensure consistency [#22143](https://github.com/milvus-io/milvus/pull/22143) [#22329](https://github.com/milvus-io/milvus/pull/22329)
  - Improved search performance by avoiding allocating a zero-byte vector during searches [#22219](https://github.com/milvus-io/milvus/pull/22219) [#22357](https://github.com/milvus-io/milvus/pull/22357)
  - Upgraded Knowhere to 1.3.9 to accelerate IVF/BF [#22368](https://github.com/milvus-io/milvus/pull/22368)
  - Improved search task merge policy [#22006](https://github.com/milvus-io/milvus/pull/22006) [#22287](https://github.com/milvus-io/milvus/pull/22287)
  - Refined Read method of MinioChunkManager to reduce IO[#22257](https://github.com/milvus-io/milvus/pull/22257)

- **Memory Usage**

  - Saved index files by 16m to save memory usage while indexing [#22369](https://github.com/milvus-io/milvus/pull/22369)
  - Added memory usage too large sync policy [#22241](https://github.com/milvus-io/milvus/pull/22241)

- **Others**

  - Removed constraints that compaction happens only on indexed segment [#22145](https://github.com/milvus-io/milvus/pull/22145)
  - Changed RocksMQ page size to 256M to reduce RocksMQ disk usage [#22433](https://github.com/milvus-io/milvus/pull/22433)
  - Changed the etcd session timeout to 20s to improve recovery speed[#22400](https://github.com/milvus-io/milvus/pull/22400)
  - Added the RBAC for the GetLoadingProgress and GetLoadState API [#22313](https://github.com/milvus-io/milvus/pull/22313)

## 2.2.3
Release date: 10 February, 2023

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
| -------------- | ------------------ | ---------------- | -------------- | ------------------- |
| 2.2.3          | 2.2.2              | 2.2.3            | 2.2.0          | 2.2.3               |

Milvus 2.2.3 introduces the rolling upgrade capability to Milvus clusters and brings high availability settings to RootCoords. The former greatly reduces the impacts brought by the upgrade and restart of the Milvus cluster in production to the minimum, while the latter enables coordinators to work in active-standby mode and ensures a short failure recovery time of no more than 30 seconds. 

In this release, Milvus also ships with a lot of improvements and enhancements in performance, including a fast bulk-insert experience with reduced memory usage and less loading time. 

### Breaking changes

In 2.2.3, the maximum number of fields in a collection is reduced from 256 to 64. ([#22030](https://github.com/milvus-io/milvus/pull/22030))

### Features

- Rolling upgrade

  The rolling upgrade feature allows Milvus to respond to incoming requests during the upgrade, which is not possible in previous releases. In such releases, upgrading a Milvus instance requires it to be stopped first and then restarted after the upgrade is complete, leaving all incoming requests unanswered.

  Related issues:

  - Graceful stop of index nodes implemented ([#21556](https://github.com/milvus-io/milvus/pull/21556))
  - Graceful stop of query nodes implemented ([#21528](https://github.com/milvus-io/milvus/pull/21528))
  - Auto-sync of segments on closing implemented ([#21576](https://github.com/milvus-io/milvus/pull/21576))
  - Graceful stop APIs and error messages improved ([#21580](https://github.com/milvus-io/milvus/pull/21580))
  - Issues identified and fixed in the code of QueryNode and QueryCoord ([#21565](https://github.com/milvus-io/milvus/pull/21565))

- Coordinator HA

  Coordinator HA allows Milvus coordinators to work in active-standby mode to avoid single-point of failures.

  Related issues:

  - HA-related issues identified and fixed in QueryCoordV2 ([#21501](https://github.com/milvus-io/milvus/pull/21501))
  - Auto-registration on the startup of Milvus was implemented to prevent both coordinators from working as the active coordinators. ([#21641](https://github.com/milvus-io/milvus/pull/21641))
  - HA-related issues identified and fixed in RootCoords ([#21700](https://github.com/milvus-io/milvus/pull/21700))
  - Issues identified and fixed in active-standby switchover ([#21747](https://github.com/milvus-io/milvus/pull/21747))

### Enhancements

- Bulk-insert performance enhanced

  - Bulk-insert enhancement implemented ([#20986](https://github.com/milvus-io/milvus/pull/20986) [#21532](https://github.com/milvus-io/milvus/pull/21532))
  - JSON parser optimized for data import ([#21332](https://github.com/milvus-io/milvus/pull/21332))
  - Stream-reading NumPy data implemented ([#21540](https://github.com/milvus-io/milvus/pull/21540))
  - Bulk-insert progress report implemented ([#21612](https://github.com/milvus-io/milvus/pull/21612))
  - Issues identified and fixed so that Milvus checks indexes before flushes segments before bulk-insert is complete ([#21604](https://github.com/milvus-io/milvus/pull/21604))
  - Issues related to bulk-insert progress identified and fixed ([#21668](https://github.com/milvus-io/milvus/pull/21668))
  - Issues related to bulk-insert report identified and fixed ([#21758](https://github.com/milvus-io/milvus/pull/21758))
  - Issues identified and fixed so that Milvus does not seal failed segments while performing bulk-insert operations. ([#21779](https://github.com/milvus-io/milvus/pull/21779))
  - Issues identified and fixed so that bulk-insert operations do not cause a slow flush ([#21918](https://github.com/milvus-io/milvus/pull/21918))
  - Issues identified and fixed so that bulk-insert operations do not crash the DataNodes ([#22040](https://github.com/milvus-io/milvus/pull/22040)) 
  - Refresh option added to LoadCollection and LoadPartition APIs ([#21811](https://github.com/milvus-io/milvus/pull/21811))
  - Segment ID update on data import implemented ([#21583](https://github.com/milvus-io/milvus/pull/21583))

- Memory usage reduced

  - Issues identified and fixed so that loading failures do not return insufficient memory ([#21592](https://github.com/milvus-io/milvus/pull/21592))
  - Arrow usage removed from FieldData ([#21523](https://github.com/milvus-io/milvus/pull/21523))
  - Memory usage reduced in indexing scalar fields ([#21970](https://github.com/milvus-io/milvus/pull/21970)) ([#21978](https://github.com/milvus-io/milvus/pull/21978))

- Monitoring metrics optimized

  - Issues related to unregistered metrics identified and fixed  ([#22098](https://github.com/milvus-io/milvus/pull/22098))
  - A new segment metric that counts the number of binlog files added ([#22085](https://github.com/milvus-io/milvus/pull/22085))
  - Many new metrics added ([#21975](https://github.com/milvus-io/milvus/pull/21975))
  - Minor fix on segment metric ([#21977](https://github.com/milvus-io/milvus/pull/21977))

- Meta storage performance improved

  - Improved ListSegments performance for Datacoord catalog. ([#21600](https://github.com/milvus-io/milvus/pull/21600))
  - Improved LoadWithPrefix performance for SuffixSnapshot. ([#21601](https://github.com/milvus-io/milvus/pull/21601))
  - Removed redundant LoadPrefix requests for Catalog ListCollections. ([#21551](https://github.com/milvus-io/milvus/pull/21551)) ([#21594](https://github.com/milvus-io/milvus/pull/21594))
  - Added A WalkWithPrefix API for MetaKv interface. ([#21585](https://github.com/milvus-io/milvus/pull/21585))
  - Added GC for snapshot KV based on time-travel. ([#21417](https://github.com/milvus-io/milvus/pull/21417)) ([#21763](https://github.com/milvus-io/milvus/pull/21763))

- Performance improved

  - Upgraded Knowhere to 1.3.7. ([#21735](https://github.com/milvus-io/milvus/pull/21735))
  - Upgraded Knowhere to 1.3.8. ([#22024](https://github.com/milvus-io/milvus/pull/22024))
  - Skipped search GRPC call for standalone. ([#21630](https://github.com/milvus-io/milvus/pull/21630))
  - Optimized some low-efficient code. ([#20529](https://github.com/milvus-io/milvus/pull/20529)) ([#21683](https://github.com/milvus-io/milvus/pull/21683))
  - Fixed fill the string field twice when string index exists. ([#21852](https://github.com/milvus-io/milvus/pull/21852)) ([#21865](https://github.com/milvus-io/milvus/pull/21865))
  - Used all() API for bitset check. ([#20462](https://github.com/milvus-io/milvus/pull/20462)) ([#21682](https://github.com/milvus-io/milvus/pull/21682))

- Others

  - Implemented the GetLoadState API. ([#21533](https://github.com/milvus-io/milvus/pull/21533))
  - Added a task to unsubscribe dmchannel. ([#21513](https://github.com/milvus-io/milvus/pull/21513)) ([#21794](https://github.com/milvus-io/milvus/pull/21794))
  - Explicitly list the triggering reasons when Milvus denies reading/writing. ([#21553](https://github.com/milvus-io/milvus/pull/21553))
  - Verified and adjusted the number of rows in a segment before saving and passing SegmentInfo. ([#21200](https://github.com/milvus-io/milvus/pull/21200))
  - Added a segment seal policy by the number of binlog files. ([#21941](https://github.com/milvus-io/milvus/pull/21941))
  - Upgraded etcd to 3.5.5. ([#22007](https://github.com/milvus-io/milvus/pull/22007)）

### Bug Fixes

- QueryCoord segment replacement fixed
  
  - Fixed the mismatch of sealed segments IDs after enabling load-balancing in 2.2. ([#21322](https://github.com/milvus-io/milvus/pull/21322))
  - Fixed the sync logic of the leader observer. ([#20478](https://github.com/milvus-io/milvus/pull/20478)) ([#21315](https://github.com/milvus-io/milvus/pull/21315))
  - Fixed the issues that observers may update the current target to an unfinished next target. ([#21107](https://github.com/milvus-io/milvus/pull/21107)) ([#21280](https://github.com/milvus-io/milvus/pull/21280))
  - Fixed the load timeout after the next target updates. ([#21759](https://github.com/milvus-io/milvus/pull/21759)) ([#21770](https://github.com/milvus-io/milvus/pull/21770))
  - Fixed the issue that the current target may be updated to an invalid target. ([#21742](https://github.com/milvus-io/milvus/pull/21742)) ([#21762](https://github.com/milvus-io/milvus/pull/21762))
  - Fixed the issue that a failed node may update the current target to an unavailable target. ([#21743](https://github.com/milvus-io/milvus/pull/21743))

- Improperly invalidated proxy cache fixed

  - Fixed the issue that the proxy does not update the shard leaders cache for some types of error ([#21185](https://github.com/milvus-io/milvus/pull/21185)) ([#21303](https://github.com/milvus-io/milvus/pull/21303))
  - Fixed the issue that Milvus invalidates the proxy cache first when the shard leader list contains error ([#21451](https://github.com/milvus-io/milvus/pull/21451)) ([#21464](https://github.com/milvus-io/milvus/pull/21464))

- CheckPoint and GC Related issues fixed

  - Fixed the issue that the checkpoint will not update after data delete and compact ([#21495](https://github.com/milvus-io/milvus/pull/21495))
  - Fixed issues related to channel checkpoint and GC ([#22027](https://github.com/milvus-io/milvus/pull/22027))
  - Added restraints on segment GC of DML position before channel copy ([#21773](https://github.com/milvus-io/milvus/pull/21773))
  - Removed collection meta after GC is complete ([#21595](https://github.com/milvus-io/milvus/pull/21595)) ([#21671](https://github.com/milvus-io/milvus/pull/21671))

- Issues related to not being able to use embedded etcd with Milvus fixed

  - Added setup config files for embedded etcd ([#22076](https://github.com/milvus-io/milvus/pull/22076))

- Others

  - Fixed the offset panic in queries ([#21292](https://github.com/milvus-io/milvus/pull/21292)) ([#21751](https://github.com/milvus-io/milvus/pull/21751))
  - Fixed the issue that small candidate compaction should only happen with more than one segment ([#21250](https://github.com/milvus-io/milvus/pull/21250))
  - Fixed the issue of memory usage calculation ([#21798](https://github.com/milvus-io/milvus/pull/21798))
  - Fixed the issue that a timestamp allocation failure blocks compaction queue forever ([#22039](https://github.com/milvus-io/milvus/pull/22039)) ([#22046](https://github.com/milvus-io/milvus/pull/22046))
  - Fixed the issue that QueryNode may panic when stopped ([#21406](https://github.com/milvus-io/milvus/pull/21406)) ([#21419](https://github.com/milvus-io/milvus/pull/21419))
  - Modified lastSyncTime in advance to prevent multiple flush binlogs ([#22048](https://github.com/milvus-io/milvus/pull/22048))
  - Fixed the issue that a collection does not exist when users try to recover it ([#21471](https://github.com/milvus-io/milvus/pull/21471)) ([#21628](https://github.com/milvus-io/milvus/pull/21628))
  - Use tt msg stream for consume delete msg ([#21478](https://github.com/milvus-io/milvus/pull/21478))
  - Prevent users from deleting entities by any non-primary-key field ([#21459](https://github.com/milvus-io/milvus/pull/21459)) ([#21472](https://github.com/milvus-io/milvus/pull/21472))
  - Fixed potential nil access on segments ([#22104](https://github.com/milvus-io/milvus/pull/22104))

## 2.2.2
Release date: 22 December, 2022

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
| -------------- | ------------------ | ---------------- | -------------- | ------------------- |
| 2.2.2          | 2.2.1              | 2.2.1            | 2.2.0          | 2.2.1         |

Milvus 2.2.2 is a minor fix of Milvus 2.2.1. It fixed a few loading failure issues as of the upgrade to 2.2.1 and the issue that the proxy cache is not cleaned upon some types of errors.


<h3 id="v2.2.1">Bug Fixes</h3> 

- Fixed the issue that the proxy doesn't update the cache of shard leaders due to some types of errors. ([#21320](https://github.com/milvus-io/milvus/pull/21320))
- Fixed the issue that the loaded info is not cleaned for released collections/partitions. ([#21321](https://github.com/milvus-io/milvus/pull/21321))
- Fixed the issue that the load count is not cleared on time. ([#21314](https://github.com/milvus-io/milvus/pull/21314))

## v2.2.1
Release date: 15 December, 2022

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
| -------------- | ------------------ | ---------------- | -------------- | ------------------- |
| 2.2.1          | 2.2.1              | 2.2.1            | 2.2.0          | 2.2.1         |

Milvus 2.2.1 is a minor fix of Milvus 2.2.0. It supports authentication and TLS on all dependencies, optimizes the performance ludicrously on searches and fixes some critical issues. With tremendous contribution from the community, this release managed to resolve over 280 issues, so please try the new release and give us feedback on stability, performance and ease of use.

<h3 id="v2.2.1">New Features</h3> 

- Supports Pulsa tenant and authentication. ([#20762](https://github.com/milvus-io/milvus/pull/20762))
- Supports TLS in etcd config source. ([#20910](https://github.com/milvus-io/milvus/pull/20910))

<h3 id="v2.2.1">Performance</h3> 

After upgrading the Knowhere vector engine and changing the parallelism strategy, Milvus 2.2.1 improves search performance by over 30%. 

Optimizes the scheduler, and increases merge tasks probability. ([#20931](https://github.com/milvus-io/milvus/pull/20931))

<h3 id="v2.2.1">Bug Fixes</h3> 

- Fixed term filtering failures on indexed scalar fields. ([#20840](https://github.com/milvus-io/milvus/pull/20840))
- Fixed the issue that only partial data returned upon QueryNode restarts. ([#21139](https://github.com/milvus-io/milvus/pull/21139))([#20976](https://github.com/milvus-io/milvus/pull/20976))
- Fixed IndexNode panic upon failures to create an index. ([#20826](https://github.com/milvus-io/milvus/pull/20826))
- Fixed endless BinaryVector compaction and generation of data on Minio. ([#21119](https://github.com/milvus-io/milvus/pull/21119)) ([#20971](https://github.com/milvus-io/milvus/pull/20971))
- Fixed the issue that `meta_cache` of proxy partially updates. ([#21232](https://github.com/milvus-io/milvus/pull/21232))
- Fixed slow segment loading due to staled checkpoints. ([#21150](https://github.com/milvus-io/milvus/pull/21150))
- Fixed concurrently loaded Casbin model causing concurrent write operations. ([#21132](https://github.com/milvus-io/milvus/pull/21132))([#21145](https://github.com/milvus-io/milvus/pull/21145))([#21073](https://github.com/milvus-io/milvus/pull/21073))
- Forbade garbage-collecting index meta when creating an index. ([#21024](https://github.com/milvus-io/milvus/pull/21024))
- Fixed a bug that the index data can not be garbage-collected because `ListWithPrefix` from Minio with recursive is false. ([#21040](https://github.com/milvus-io/milvus/pull/21040)) 
- Fixed an issue that an error code is returned when a query expression does not match any results. ([#21066](https://github.com/milvus-io/milvus/pull/21066))
- Fixed search failures on disk index when `search_list` equals to `limit`. ([#21114](https://github.com/milvus-io/milvus/pull/21114))
- Filled collection schema after DataCoord restarts.  ([#21164](https://github.com/milvus-io/milvus/pull/21164))
- Fixed an issue that the compaction handler may double release and hang. ([#21019](https://github.com/milvus-io/milvus/pull/21019))
- [restapi] Fixed precision loss for Int64 fields upon insert requests. ([#20827](https://github.com/milvus-io/milvus/pull/20827))
- Increased `MaxWatchDuration` and make it configurable to prevent shards with large data loads from timing out. ([#21010](https://github.com/milvus-io/milvus/pull/21010))
- Fixed the issue that the compaction target segment `rowNum` is always 0. ([#20941](https://github.com/milvus-io/milvus/pull/20941))
- Fixed the issue that IndexCoord deletes segment index by mistake because IndexMeta is not stored in time. ([#21058](https://github.com/milvus-io/milvus/pull/21058))
- Fixed the issue that DataCoord crushes if auto-compaction is disabled. ([#21079](https://github.com/milvus-io/milvus/pull/21079))
- Fixed the issue that searches on growing segments even though the segments are indexed. ([#21215](https://github.com/milvus-io/milvus/pull/21215))

<h3 id="v2.2.1">Improvements</h3> 

- Refined logs and the default log level is set to INFO.
- Fixed incorrect metrics and refined the metric dashboard.
- Made TopK limit configurable ([#21155](https://github.com/milvus-io/milvus/pull/21155))

<h3 id="v2.2.1">Breaking changes</h3> 

Milvus now limits each RPC to 64 MB to avoid OOM and generating large message packs.

## v2.2.0
Release date: 18 November, 2022

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
| -------------- | ------------------ | ---------------- | -------------- | ------------------- |
| 2.2.0          | 2.2.0              | 2.2.1            | 2.2.0          | 2.2.0               |

Milvus 2.2.0 introduces many new features including support for Disk-based approximate nearest neighbor (ANN) algorithm, bulk insertion of entities from files, and role-based access control (RBAC) for an improved security. In addition, this major release also ushers in a new era for vector search with enhanced stability, faster search speed, and more flexible scalability.

<h3 id="v2.2.0">Breaking changes</h3> 

Since metadata storage is refined and API usage is normalized, Milvus 2.2 is *not* fully compatible with earlier releases. Read [this guide](upgrade_milvus_cluster-helm.md) to learn how to safely upgrade from Milvus 2.1.x to 2.2.0.

<h3 id="v2.2.0">Features</h3> 

- Support for bulk insertion of entities from files
Milvus now offers a new set of bulk insertion APIs to make data insertion more efficient. You can now upload entities in a Json file directly to Milvus. See [Insert Entities from Files](bulk_insert.md) for details.

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
