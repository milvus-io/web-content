---
id: release_notes.md
summary: Milvus Release Notes
---
# Release Notes

Find out what’s new in Milvus! This page summarizes information about new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.0.0-RC1 in this section. We suggest that you regularly visit this page to learn about updates.

## v2.0.2

Release date: 2022-04-02

<h3 id="v2.0.2">Compatibility</h3>

<table class="version">
	<thead>
	<tr>
		<th>Milvus version</th>
		<th>Python SDK version</th>
		<th>Java SDK version</th>
		<th>Go SDK version</th>
		<th>Node.js SDK version</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>2.0.2</td>
		<td>2.0.2</td>
		<td>2.0.4</td>
		<td>2.0.0</td>
		<td>2.0.2</td>
	</tr>
	</tbody>
</table>


Milvus 2.0.2 is a minor bug-fix version of Milvus 2.0. We fixed multiple critical issues of collection load failure and server crash. We've also greatly boosted the query by ID performance by utilizing primary key index. The Prometheus metrics is redesigned in this version and we highly recommend you to deploy the monitoring system in production environment.

<h3 id="v2.0.2">Bug fixes</h3>

- [#16338](https://github.com/milvus-io/milvus/pull/16338) Data coord uses VChannel when when unsubscribing to data node.
- [#16178](https://github.com/milvus-io/milvus/pull/16178) [#15725](https://github.com/milvus-io/milvus/pull/15725) Query node crashes.
- [#16035](https://github.com/milvus-io/milvus/pull/16035) [#16063](https://github.com/milvus-io/milvus/pull/16063) [#16066](https://github.com/milvus-io/milvus/pull/16066) Collection load error.
- [#15932](https://github.com/milvus-io/milvus/pull/15932) Compaction runtime error.
- [#15823](https://github.com/milvus-io/milvus/pull/15823) `DescribeCollection` RPC fails in data node failover.
- [#15783](https://github.com/milvus-io/milvus/pull/15783) Recall drops after compaction.
- [#15790](https://github.com/milvus-io/milvus/pull/15790) Shallow copy of `typeutil.AppendFieldData`.
- [#15728](https://github.com/milvus-io/milvus/pull/15728) Query coord sets wrong `watchDmchannelInfo` when one partition is empty.
- [#15712](https://github.com/milvus-io/milvus/pull/15712) `DEPLOY_MODE` is got or used before set.
- [#15702](https://github.com/milvus-io/milvus/pull/15702) Data coord panics if message queue service quits before it.
- [#15707](https://github.com/milvus-io/milvus/pull/15707) Compaction generates empty segment.

<h3 id="v2.0.2">Performance</h3>

- [#16327](https://github.com/milvus-io/milvus/pull/16327) Accelerates query speed in sealed segments.
- [#15732](https://github.com/milvus-io/milvus/pull/15732) [#15738](https://github.com/milvus-io/milvus/pull/15738) [#15774](https://github.com/milvus-io/milvus/pull/15774) [#15749](https://github.com/milvus-io/milvus/pull/15749) [#15614](https://github.com/milvus-io/milvus/pull/15614) Avoids memory copy for `kv` interface && GGO.

<h3 id="v2.0.2">Improvements</h3>

- [#16244](https://github.com/milvus-io/milvus/pull/16244) [#16243](https://github.com/milvus-io/milvus/pull/16243) [#16245](https://github.com/milvus-io/milvus/pull/16245) Extends `DataCluster` Watch information via etcd.
- [#15760](https://github.com/milvus-io/milvus/pull/15760) [#15787](https://github.com/milvus-io/milvus/pull/15787) [#16252](https://github.com/milvus-io/milvus/pull/16252) Fixes CentOS build.
- [#15759](https://github.com/milvus-io/milvus/pull/15759) Refines code of data node `binlogIO`.

<h3 id="v2.0.2">Features</h3>

- [#15540](https://github.com/milvus-io/milvus/pull/15540) Adds and implements `chunkManager` interface.
- [#16072](https://github.com/milvus-io/milvus/pull/16072) [#15839](https://github.com/milvus-io/milvus/pull/15839) [#15684](https://github.com/milvus-io/milvus/pull/15684) [#15640](https://github.com/milvus-io/milvus/pull/15640) [#15582](https://github.com/milvus-io/milvus/pull/15582) [#15649](https://github.com/milvus-io/milvus/pull/15649) [#15650](https://github.com/milvus-io/milvus/pull/15650) [#15606](https://github.com/milvus-io/milvus/pull/15606) Refines Prometheus metrics.



## v2.0.1

Release date: 2022-02-23

<h3 id="v2.0.1">Compatibility</h3>

<table class="version">
	<thead>
	<tr>
		<th>Milvus version</th>
		<th>Python SDK version</th>
		<th>Java SDK version</th>
		<th>Go SDK version</th>
		<th>Node.js SDK version</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>2.0.1</td>
		<td>2.0.1</td>
		<td>2.0.4</td>
		<td>2.0.0</td>
		<td>2.0.1</td>
	</tr>
	</tbody>
</table>


Milvus 2.0.1 is a minor bug-fix version of Milvus 2.0. The key progress of Milvus 2.0.1 includes that, first, the execution engine of Milvus `knowhere` was separated from the Milvus repository and moved to a new one - [milvus-io/knowhere](https://github.com/milvus-io/knowhere), and, second, supports were enabled for Milvus to be compiled across multiple platforms. We fixed a few critical issues that cause query node crash, index building failure, and server hang. The default dependency of Golang is upgraded to solve memory usage issues. We also upgrade the default dependency of Pulsar to solve the `log4j` security issue.

<h3 id="v2.0.1">Improvements</h3>

- [#15491](https://github.com/milvus-io/milvus/pull/15491) Supports compiling and running Milvus on Mac.
- [#15453](https://github.com/milvus-io/milvus/pull/15453) Adds log when removing keys in garbage collector. 
- [#15551](https://github.com/milvus-io/milvus/pull/15551) Avoids copying while converting C bytes to Go bytes.
- [#15377](https://github.com/milvus-io/milvus/pull/15377) Adds `collectionID` to the return of `SearchResults` and `QueryResults`. 

<h3 id="v2.0.1">Features</h3>

- [#14418](https://github.com/milvus-io/milvus/pull/14418) Implements automatic item expiration on compaction.
- [#15542](https://github.com/milvus-io/milvus/pull/15542) Implements mixed compaction logic.

<h3 id="v2.0.1">Bug fixes</h3>

- [#15702](https://github.com/milvus-io/milvus/pull/15702) Data coord panics if message queue service quits before it closes.
- [#15663](https://github.com/milvus-io/milvus/pull/15663) Query node crashes on concurrent search.
- [#15580](https://github.com/milvus-io/milvus/pull/15580) Data node panics when compacting empty segment.
- [#15626](https://github.com/milvus-io/milvus/pull/15626) Failed to create index when segment size is set to large than 2GB.
- [#15497](https://github.com/milvus-io/milvus/pull/15497) `SessionWatcher` quits if not re-watch logic is provided when meeting `ErrCompacted`.
- [#15530](https://github.com/milvus-io/milvus/pull/15530) Segments under Flushing status are not treated as Flushed segment.
- [#15436](https://github.com/milvus-io/milvus/pull/15436) Watch DML channel failed because of no collection meta, causing load collection failure.
- [#15455](https://github.com/milvus-io/milvus/pull/15455) `SegmentIDs` is not respected when `querynode.GetSegmentInfo` is called.
- [#15482](https://github.com/milvus-io/milvus/pull/15482) `EntriesNum` of delta logs is not recorded correctly in segment meta.

<h3 id="v2.0.1">Dependency Upgrade</h3>

- [#11393](https://github.com/milvus-io/milvus/pull/11393) Upgrades Golang from 1.15.2 to 1.16.9.
- [#15603](https://github.com/milvus-io/milvus/pull/15603) Upgrades `Knowhere` to 1.0.1.
- [#15580](https://github.com/milvus-io/milvus/pull/15580) Upgrades Pulsar from 2.7.3 to 2.8.2.


## v2.0.0

Release date: 2022-01-25

<h3 id="v2.0.0">Compatibility</h3>

<table class="version">
	<thead>
	<tr>
		<th>Milvus version</th>
		<th>Python SDK version</th>
		<th>Java SDK version</th>
		<th>Go SDK version</th>
		<th>Node.js SDK version</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>2.0.0</td>
		<td>2.0.0</td>
		<td>2.0.2</td>
		<td>2.0.0</td>
		<td>2.0.0</td>
	</tr>
	</tbody>
</table>


We are excited to announce the general release of Milvus 2.0 and it is now considered as production ready. Without changing the existing functionality released in the PreGA release, we fixed several critical bugs reported by users. We sincerely encourage all users to upgrade your Milvus to 2.0.0 release for better stability and performance.

<h3 id="v2.0.0">Improvements</h3>

- Changes the default consistency level to `Bounded`:
		If consistency level `Strong` is adopted during a search, Milvus waits until data is synchronized before the search, thus spending longer even on a small dataset. Under the the default consistency level of `Bounded`, newly inserted data remain invisible for a could of seconds before they can be retrieved. For more information, see [Guarantee Timestamp in Search Requests](https://github.com/milvus-io/milvus/blob/master/docs/developer_guides/how-guarantee-ts-works.md).

- [#15223](https://github.com/milvus-io/milvus/pull/15223) Makes query nodes send search or query results by RPC.

<h3 id="v2.0.0">Bug fixes</h3>

- Writing blocked by message storage quota exceed exception:
	- [#15221](https://github.com/milvus-io/milvus/pull/15221) Unsubscribes channel when closing Pulsar consumer.
	- [#15230](https://github.com/milvus-io/milvus/pull/15230) Unsubscribes channel after query node is down.
	- [#15284](https://github.com/milvus-io/milvus/pull/15284) Adds retry logic when pulsar consumer unsubscribes channel.
	- [#15353](https://github.com/milvus-io/milvus/pull/15353) Unsubscribes topic in data coord.

- Resource leakage:
	- [#15303](https://github.com/milvus-io/milvus/pull/15303) Cleans flow graph if failed to `watchChannel`.
	- [#15237](https://github.com/milvus-io/milvus/pull/15237) Calls for releasing memory in case that error occurs.
	- [#15013](https://github.com/milvus-io/milvus/pull/15013) Closes payload writer when error occurs.
	- [#14630](https://github.com/milvus-io/milvus/pull/14630) Checks leakage of index CGO object.
	- [#14543](https://github.com/milvus-io/milvus/pull/14543) Fixes that Pulsar reader is not close.
	- [#15068](https://github.com/milvus-io/milvus/pull/15068) Fixes that file is not close when `ReadAll` returns error in local chunk manager.
	- [#15305](https://github.com/milvus-io/milvus/pull/15305) Fixes query node search exceptions will cause memory leak.
	
- High memory usage:
	- [#15196](https://github.com/milvus-io/milvus/pull/15196) Releases memory to OS after index is built.
	- [#15180](https://github.com/milvus-io/milvus/pull/15180) Refactors flush manager injection to reduce goroutine number.
	- [#15100](https://github.com/milvus-io/milvus/pull/15100) Fixes storage memory leak caused by `runtime.SetFinalizer`.


- Cluster hang:
	- [#15181](https://github.com/milvus-io/milvus/pull/15181) Stops handoff if the segment has been compacted.
	- [#15189](https://github.com/milvus-io/milvus/pull/15189) Retains `nodeInfo` when query coord panic at `loadBalanceTask`. 
	- [#15250](https://github.com/milvus-io/milvus/pull/15250) Fixes `collectResultLoop` hang after search timeout.
	- [#15102](https://github.com/milvus-io/milvus/pull/15102) Adds flow graph manager and event manager.
	- [#15161](https://github.com/milvus-io/milvus/pull/15161) Panic when recover query node failed.
	- [#15347](https://github.com/milvus-io/milvus/pull/15347) Makes index node panic when failed to save meta to `MetaKV`.
	- [#15343](https://github.com/milvus-io/milvus/pull/15343) Fixes Pulsar client bug.
	- [#15370](https://github.com/milvus-io/milvus/pull/15370) Releases collection first when drop collection.

- Incorrect returned data:
	- [#15177](https://github.com/milvus-io/milvus/pull/15177) Removes global sealed segments in historical.
	- [#14758](https://github.com/milvus-io/milvus/pull/14758) Fixes that deleted data returned when handoff is done for the segment.

<h3 id="v2.0.0">Known issues</h3>

- [#14077](https://github.com/milvus-io/milvus/issues/14077) Core dump happens under certain workload and it is still under reproducing.
 	Solution: The system will be recovered automatically.
- [#15283](https://github.com/milvus-io/milvus/issues/15283) Cluster fails to recover because Pulsar's failure to create consumer [Pulsar #13920](https://github.com/apache/pulsar/issues/13920).
 	Solution: Restart pulsar cluster.
- The default dependency Pulsar use old log4j2 version and contains security vulnerability.
 	Solution: Upgrade pulsar dependency to 2.8.2. We will soon release a minor version to upgrade Pulsar to newer releases.
- [#15371](https://github.com/milvus-io/milvus/issues/15371) Data coord may fail to cleanup channel subscription if balance and node crash happens at same time.
 	Solution: Remove the channel subscription with Pulsar admin.

## v2.0.0-PreGA

Release date: 2021-12-31

<h3 id="v2.0.0-PreGA">Compatibility</h3>

<table class="version">
	<thead>
	<tr>
		<th>Milvus version</th>
		<th>Python SDK version</th>
		<th>Java SDK version</th>
		<th>Go SDK version</th>
		<th>Node.js SDK version</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>2.0.0-PreGA</td>
		<td>2.0.0rc9</td>
		<td>2.0.0</td>
		<td>Coming soon</td>
		<td>1.0.20</td>
	</tr>
	</tbody>
</table>



Milvus 2.0.0-PreGA is the preview release of Milvus 2.0. It now supports entity deletion by primary key and data compaction to purge deleted data. We also introduce a load balancing mechanism into Milvus to distribute the memory usage of each query node evenly. Some critical issues are fixed in this release, including cleanup of dropped collection data, wrong distance calculation of Jaccard distance, and several bugs that cause system hang and memory leakage.

It should be noted that Milvus 2.0.0-PreGA is NOT compatible with previous versions of Milvus 2.0 because of some changes made to data codec format and RocksMQ data format.

<h3 id="v2.0.0-PreGA">Features</h3>

- Deleting entity: Milvus now supports deleting entities through primary keys. Whereas Milvus relies on append-only storage, it only supports logical deletion, id est, Milvus inserts a deletion mark on the entities to cover actual data so that no search or query will return the marked entities. Therefore, it should be noted that overusing deletion may cause search performance to plummet and storage usage to surge. See [Delete entities](delete_data.md) for more instruction.

- Compaction: Compaction mechanism purges the deleted or expired entities in binlogs to save storage space. It is a background task that is triggered by data coord and executed by data node.

- Automatic Loadbalance [#9481](https://github.com/milvus-io/milvus/issues/9481)：Loadbalance mechanism distributes segments evenly across query nodes to balance the memory usage of the cluster. It can be triggered either automatically or by users.

- Handoff [#9481](https://github.com/milvus-io/milvus/issues/9481)：Handoff mechanism refers to that, when a growing segment is sealed, query node waits until the segment is built with index by index node and then loads the segment into memory for search or query.

<h3 id="v2.0.0-PreGA">Improvements</h3>

- [#12199](https://github.com/milvus-io/milvus/pull/12199) Parallelizes executions between segments to improve the search performance.
- [#11373](https://github.com/milvus-io/milvus/pull/11373) Allows batch consumption of messages in RocksMQ internal loop to improve the system efficiency.
- [#11665](https://github.com/milvus-io/milvus/pull/11665) Postpones the execution of handoff until index creation is completed.

<h3 id="v2.0.0-PreGA">Bug fixes</h3>

- Data is not cleared on etcd, Pulsar, and MinIO when a collection is dropped:
  - [#12191](https://github.com/milvus-io/milvus/pull/12191) Clears the metadata of the dropped segment on etcd.
  - [#11554](https://github.com/milvus-io/milvus/pull/11554) Adds garbage collector for data coord.
  - [#11552](https://github.com/milvus-io/milvus/pull/11552) Completes procedure of dropping collection in data node.
  - [#12227](https://github.com/milvus-io/milvus/pull/12227) Removes all index when dropping collection.
  - [#11436](https://github.com/milvus-io/milvus/pull/11436) Changes the default retentionSizeInMB to 8192 (8GB).
- [#11901](https://github.com/milvus-io/milvus/pull/11901) Wrong distances calculation caused by properties of different metric types.
- [#12511](https://github.com/milvus-io/milvus/pull/12511) Wrong similarity correlation caused by properties of different metric types.
- [#12225](https://github.com/milvus-io/milvus/pull/12225) RocksMQ produce hang when do search repeatedly
- [#12255](https://github.com/milvus-io/milvus/pull/12255) RocksMQ server does not close when standalone exits.
- [#12281](https://github.com/milvus-io/milvus/pull/12281) Error when dropping alias.
- [#11769](https://github.com/milvus-io/milvus/pull/11769) Update serviceableTime incorrectly.
- [#11325](https://github.com/milvus-io/milvus/pull/11325) Panic when reducing search results.
- [#11248](https://github.com/milvus-io/milvus/pull/11248) Parameter guarantee_timestamp is not working.

<h3 id="v2.0.0-PreGA">Other Enhancements</h3>

- [#12351](https://github.com/milvus-io/milvus/pull/12351) Changes proxy default RPC transfer limitation.
- [#12055](https://github.com/milvus-io/milvus/pull/12055) Reduces memory cost when loading from MinIO.
- [#12248](https://github.com/milvus-io/milvus/pull/12248) Supports more deployment metrics.
- [#11247](https://github.com/milvus-io/milvus/pull/11247) Adds getNodeInfoByID and getSegmentInfoByNode function for cluster.
- [#11181](https://github.com/milvus-io/milvus/pull/11181) Refactors segment allocate policy on query coord.

## v2.0.0-RC8

Release date: 2021-11-5

<h3 id="v2.0.0-RC8">Compatibility</h3>

<table class="version">
	<thead>
	<tr>
		<th>Milvus version</th>
		<th>Python SDK version</th>
		<th>Java SDK version</th>
		<th>Go SDK version</th>
		<th>Node.js SDK version</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>2.0.0-RC8</td>
		<td>2.0.0rc8</td>
		<td>Coming soon</td>
		<td>Coming soon</td>
		<td>2.0.2</td>
	</tr>
	</tbody>
</table>



Milvus 2.0.0-RC8 is the last release candidate of Milvus 2.0. It supports handoff task, primary key deduplication and search by Time Travel functionalities. The mean time to recovery (MTTR) has also been greatly reduced with the enhancement of timetick mechanism. We had run stress test on 2.0.0-RC8 with 10M datasets, and both standalone and distributed cluster survived for 84 hours.

Current deduplication feature does not guarantee overwriting the old data copies when data with duplicate primary keys (`pk`) are inserted. Therefore, which data copy will return when queried remains unknown behavior. This limitation will be fixed in future releases. 

<h3 id="v2.0.0-RC8">Improvements</h3>

- Failure Recovery speed:
  - [#10737](https://github.com/milvus-io/milvus/pull/10737) Fixes Session checker for proxy.
  - [#10723](https://github.com/milvus-io/milvus/pull/10723 ) Fixes seek query channel error.
  - [#10907](https://github.com/milvus-io/milvus/pull/10907) Fixes `LatestPosition` option conflict with earliest patch.
  - [#10616](https://github.com/milvus-io/milvus/pull/10616) Removes Common YAML.
  - [#10771](https://github.com/milvus-io/milvus/pull/10771) Changes `SeekPosition` to the earliest of all segments.
  - [#10651](https://github.com/milvus-io/milvus/pull/10651) Fixes query coord set seek position error.
  - [#9543](https://github.com/milvus-io/milvus/pull/9543) Initializes global sealed segments and seek query channel when `AddQueryChannel`.
  - [#9684](https://github.com/milvus-io/milvus/pull/9684) Skips re-consuming timetick MsgStream when data coord restarts.

- Refactor meta snapshot:
  - [#10288](https://github.com/milvus-io/milvus/pull/10288) Reduces information saved in `SnapshotMeta`.
  - [#10703](https://github.com/milvus-io/milvus/pull/10703 ) Fixes failure when creating meta table because of compatibility issue.
  - [#9778](https://github.com/milvus-io/milvus/pull/9778) Simplifies `meta_snapshot` interface.

- [#10563](https://github.com/milvus-io/milvus/pull/10563) Changes default balance policy.

- [#10730](https://github.com/milvus-io/milvus/pull/10730) Returns segment state when getting query segment information.

- [#10534](https://github.com/milvus-io/milvus/pull/10534) Supports reading MinIO configuration from environment variables.

- [#10114](https://github.com/milvus-io/milvus/pull/10114) Sets default `gracefulTime` to `0`.

- [#9860](https://github.com/milvus-io/milvus/pull/9860) Hides `liveChn` into `sessionutil` and fix liveness initialization order.

- [#7115](https://github.com/milvus-io/milvus/pull/7115) Uses etcd to watch channel on data node.

- [#7606](https://github.com/milvus-io/milvus/pull/7606) Makes `knowhere` compile independently.

<h3 id="v2.0.0-RC8">Features</h3>

- Handoff:   

  - [#10330](https://github.com/milvus-io/milvus/pull/10330) Adds `handoffTask`.

  - [#10084](https://github.com/milvus-io/milvus/pull/10084) Broadcasts `sealedSegmentChangeInfo` to `queryChannel`.
  - [#10619](https://github.com/milvus-io/milvus/pull/10619) Fixes removing segment when query node receives `segmentChangeInfo`.
  - [#10045](https://github.com/milvus-io/milvus/pull/10045) Watches `changeInfo` in query node.
  - [#10011](https://github.com/milvus-io/milvus/pull/10011) Updates excluded segments info when receiving `changeInfo`.
  - [#9606](https://github.com/milvus-io/milvus/pull/9606) Adds initialization information for `AddQueryChannelRequest`.
  - [#10619](https://github.com/milvus-io/milvus/pull/10619) Fixes removing segment when query node receives `segmentChangeInfo`.

- Primary Deduplication:
  - [#10834](https://github.com/milvus-io/milvus/pull/10834) Removes primary key duplicated query result in query node.
  - [#10355](https://github.com/milvus-io/milvus/pull/10355) Removes duplicated search results in proxy.
  - [#10117](https://github.com/milvus-io/milvus/pull/10117) Removes duplicated search results in segcore reduce.
  - [#10949](https://github.com/milvus-io/milvus/pull/10949) Uses primary key only to check search result duplication.
  - [#10967](https://github.com/milvus-io/milvus/pull/10967) Removes primary key duplicated query result in proxy.

- Auto-flush:
  - [#10659](https://github.com/milvus-io/milvus/pull/10659) Adds `injectFlush` method for `flushManager` interface.
  - [#10580](https://github.com/milvus-io/milvus/pull/10580) Adds injection logic for `FlushManager`.
  - [#10550](https://github.com/milvus-io/milvus/pull/10550) Merges automatic and manual flush with same segment ID.
  - [#10539](https://github.com/milvus-io/milvus/pull/10539) Allows flushed segments to trigger flush process.
  - [#10197](https://github.com/milvus-io/milvus/pull/10197) Adds a timed flush trigger mechanism.
  - [#10142](https://github.com/milvus-io/milvus/pull/10142) Applies flush manager logic in data node.
  - [#10075](https://github.com/milvus-io/milvus/pull/10075) Uses single signal channel to notify flush.
  - [#9986](https://github.com/milvus-io/milvus/pull/9986) Adds flush manager structure.

- [#10173](https://github.com/milvus-io/milvus/pull/10173) Adds binlog iterators.

- [#10193](https://github.com/milvus-io/milvus/pull/10193) Changes bloom filter use primary key.

- [#9782](https://github.com/milvus-io/milvus/pull/9782) Adds `allocIDBatch` for data node allocator.

<h3 id="v2.0.0-RC8">Bug fixes</h3>

- Incorrect collection loading behavior if there is not enough memory:
  - [#10796](https://github.com/milvus-io/milvus/pull/10796) Fixes get container mem usage.
  - [#10800](https://github.com/milvus-io/milvus/pull/10800) Uses `TotalInactiveFile` in `GetContainerMemUsed`.
  - [#10603](https://github.com/milvus-io/milvus/pull/10603) Increases compatibility for `EstimateMemorySize` interface.
  - [#10363](https://github.com/milvus-io/milvus/pull/10363) Adds `cgroups` to get container memory and check index memory in segment loader.
  - [#10294](https://github.com/milvus-io/milvus/pull/10294) Uses proto size to calculate request size.
  - [#9688](https://github.com/milvus-io/milvus/pull/9688) Estimates memory size with descriptor event.
  - [#9681](https://github.com/milvus-io/milvus/pull/9681) Fixes the way that binlog stores the original memory size.
  - [#9628](https://github.com/milvus-io/milvus/pull/9628) Stores original memory size of binlog file to extra information.

- Size of etcd-related request is too large:
  - [#10909](https://github.com/milvus-io/milvus/pull/10909) Fixes too many operations in `txn` request when saving `segmentInfo`.
  - [#10812](https://github.com/milvus-io/milvus/pull/10812) Fixes too large request when loading segment.
  - [#10768](https://github.com/milvus-io/milvus/pull/10768) Fixes too large request when loading collection.
  - [#10655](https://github.com/milvus-io/milvus/pull/10655) Splits watch operations into many transactions.
  - [#10587](https://github.com/milvus-io/milvus/pull/10587) Compacts `multiSegmentChangeInfo` to a single info.
  - [#10425](https://github.com/milvus-io/milvus/pull/10425) Trims `segmentinfo` binlog for `VChaninfo` usage.
  - [#10340](https://github.com/milvus-io/milvus/pull/10340) Fixes `multiSave` `childTask` failed to etcd.
  - [#10310](https://github.com/milvus-io/milvus/pull/10310) Fixes error when assigning load segment request.
  - [#10125](https://github.com/milvus-io/milvus/pull/10125) Splits large `loadSegmentReq` to multiple small requests.

- System panics:
  - [#10832](https://github.com/milvus-io/milvus/pull/10832) Adds query `mutex` to fix crash with panic.
  - [#10821](https://github.com/milvus-io/milvus/pull/10821) Index node finishes the task before index coord changed the meta.
  - [#10182](https://github.com/milvus-io/milvus/pull/10182) Fixes panic when flushing segment.
  - [#10681](https://github.com/milvus-io/milvus/pull/10681) Fixes query coord panic when upgrading `querychannelInfo`.

- RocksMQ-related issues:
  - [#10367](https://github.com/milvus-io/milvus/pull/10367) Stops retention gracefully.
  - [#9828](https://github.com/milvus-io/milvus/pull/9828) Fixes retention data race.
  - [#9933](https://github.com/milvus-io/milvus/pull/9933) Changes retention ticker time to 10 minutes.
  - [#9694](https://github.com/milvus-io/milvus/pull/9694) Deletes messages before deleting metadata in rocksmq retention.
  - [#11029](https://github.com/milvus-io/milvus/pull/11029) Fixes rocksmq `SeekToLatest`.
  - [#11057](https://github.com/milvus-io/milvus/pull/11057) Fixes `SeekToLatest` memory leakage and remove redundant logic.
  - [#11081](https://github.com/milvus-io/milvus/pull/11081) Fixes rocksdb retention ts not set.
  - [#11083](https://github.com/milvus-io/milvus/pull/11083) Adds topic lock for rocksmq `Seek`.
  - [#11076](https://github.com/milvus-io/milvus/pull/11076) Moves topic lock to the front of final delete in retention expired cleanup.

- [#10751](https://github.com/milvus-io/milvus/pull/10751) `loadIndex` keep retrying when `indexFilePathInfo` gets empty list.

- [#10583](https://github.com/milvus-io/milvus/pull/10583) `ParseHybridTs` returns type to INT64.

- [#10599](https://github.com/milvus-io/milvus/pull/10599) Delete message hash error.

- [#10314](https://github.com/milvus-io/milvus/pull/10314) Index building task mistakenly canceled by index coord by mistake.

- [#9701](https://github.com/milvus-io/milvus/pull/9701) Incorrect `CreateAlias/DropAlias/AlterAlias` implementation.

- [#9573](https://github.com/milvus-io/milvus/pull/9573) Timeout when data coord saves binlog.

- [#9788](https://github.com/milvus-io/milvus/pull/9788) Watch Channel canceled due to revision compacted.

- [#10994](https://github.com/milvus-io/milvus/pull/10994) Index node does not balances load.

- [#11152](https://github.com/milvus-io/milvus/pull/11152) Search is wrong when using Time Travel without filtering condition and call `num_entities`.

- [#11249](https://github.com/milvus-io/milvus/pull/11249) [#11277](https://github.com/milvus-io/milvus/pull/11277) Release collection block in query node.

- [#11222](https://github.com/milvus-io/milvus/pull/11222) Incorrect empty retrieve result handling.


## v2.0.0-RC7

Release date: 2021-10-11

<h3 id="v2.0.0-RC7">Compatibility</h3>

<table class="version">
	<thead>
	<tr>
		<th>Milvus version</th>
		<th>Python SDK version</th>
		<th>Java SDK version</th>
		<th>Go SDK version</th>
		<th>Node.js SDK version</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>2.0.0-RC7</td>
		<td>2.0.0rc7</td>
		<td>Coming soon</td>
		<td>Coming soon</td>
		<td>2.0.2</td>
	</tr>
	</tbody>
</table>



Milvus 2.0.0-RC7 is a preview version of Milvus 2.0. It supports collection alias, shares `msgstream` on physical channel, and changes the default MinIO and Pulsar dependencies to cluster version. Several resource leaks and deadlocks were fixed. 

It should be noted that Milvus 2.0.0-RC7 is NOT compatible with previous versions of Milvus 2.0 because of some changes made to storage format. 

<h3 id="v2.0.0-RC7">Improvements</h3>

- [#8215](https://github.com/milvus-io/milvus/pull/8215) Adds max number of retries for `interTask` in query coord.

- [#9459](https://github.com/milvus-io/milvus/pull/9459) Applies collection start position.

- [#8721](https://github.com/milvus-io/milvus/pull/8721) Adds Node ID to Log Name. 

- [#8940](https://github.com/milvus-io/milvus/pull/8940) Adds streaming segments memory to used memory in `checkLoadMemory`.

- [#8542](https://github.com/milvus-io/milvus/pull/8542) Replaces `proto.MarshalTextString` with `proto.Marshal`. 

- [#8770](https://github.com/milvus-io/milvus/pull/8770) Refactors flowgraph and related invocation.

- [#8666](https://github.com/milvus-io/milvus/pull/8666) Changes CMake version.

- [#8653](https://github.com/milvus-io/milvus/pull/8653) Updates `getCompareOpType`.

- [#8697](https://github.com/milvus-io/milvus/pull/8697) [#8682](https://github.com/milvus-io/milvus/pull/8682) [#8657](https://github.com/milvus-io/milvus/pull/8657) Applies collection start position when opening segment.

- [#8608](https://github.com/milvus-io/milvus/pull/8608) Changes segment replica structure.

- [#8565](https://github.com/milvus-io/milvus/pull/8565) Refactors buffer size calculation.  

- [#8262](https://github.com/milvus-io/milvus/pull/8262) Adds `segcore` logger.

- [#8138](https://github.com/milvus-io/milvus/pull/8138) Adds `BufferData` in `insertBufferNode`.

- [#7738](https://github.com/milvus-io/milvus/pull/7738) Implements allocating `msgstream` from pool when creating collections.

- [#8054](https://github.com/milvus-io/milvus/pull/8054) Improves codes in `insertBufferNode`.

- [#7909](https://github.com/milvus-io/milvus/pull/7909) Upgrades `pulsar-client-go` to 0.6.0.

- [#7913](https://github.com/milvus-io/milvus/pull/7913) Moves segcore rows_per_chunk configuration to query_node.yaml.

- [#7792](https://github.com/milvus-io/milvus/pull/7792) Removes `ctx` from `LongTermChecker`.

- [#9269](https://github.com/milvus-io/milvus/pull/9269) Changes `==` to `is` when comparing to None in expression.

- [#8159](https://github.com/milvus-io/milvus/pull/8159) Make `FlushSegments` async.

- [#8278](https://github.com/milvus-io/milvus/pull/8278) Refactor rocksmq close logic and improve codecov.

- [#7797](https://github.com/milvus-io/milvus/pull/7797) Uses definitional type instead of raw type.

<h3 id="v2.0.0-RC7">Features</h3>

- [#9579](https://github.com/milvus-io/milvus/pull/9579) Uses replica memory size and `cacheSize` in `getSystemInfoMetrics`.

- [#9556](https://github.com/milvus-io/milvus/pull/9556) Adds `ProduceMark` interface to return message ID.

- [#9554](https://github.com/milvus-io/milvus/pull/9554) Supports `LoadPartial` interface for DataKV.

- [#9471](https://github.com/milvus-io/milvus/pull/9471) Supports `DescribeCollection` by collection ID.

- [#9451](https://github.com/milvus-io/milvus/pull/9451) Stores index parameters to descriptor event.

- [#8574](https://github.com/milvus-io/milvus/pull/8574) Adds a `round_decimal` parameter for precision control to search function.

- [#8947](https://github.com/milvus-io/milvus/pull/8947) Rocksmq supports `SubscriptionPositionLatest`.

- [#8919](https://github.com/milvus-io/milvus/pull/8919) Splits blob into several string rows when index file is large.

- [#8914](https://github.com/milvus-io/milvus/pull/8914) Binlog parser tool supports index files.

- [#8514](https://github.com/milvus-io/milvus/pull/8514) Refactors the index file format.

- [#8765](https://github.com/milvus-io/milvus/pull/8765) Adds `cacheSize` to prevent OOM in query node.

- [#8673](https://github.com/milvus-io/milvus/pull/8673) [#8420](https://github.com/milvus-io/milvus/pull/8420) [#8212](https://github.com/milvus-io/milvus/pull/8212) [#8272](https://github.com/milvus-io/milvus/pull/8272) [#8166](https://github.com/milvus-io/milvus/pull/8166) Supports multiple Milvus clusters sharing Pulsar and MinIO. 

- [#8654](https://github.com/milvus-io/milvus/pull/8654) Adds `BroadcastMark` for `Msgstream` returning Message IDs.

- [#8586](https://github.com/milvus-io/milvus/pull/8586) Adds Message ID return value into producers.

- [#8408](https://github.com/milvus-io/milvus/pull/8408) [#8363](https://github.com/milvus-io/milvus/pull/8363) [#8454](https://github.com/milvus-io/milvus/pull/8454) [#8064](https://github.com/milvus-io/milvus/pull/8064) [#8480](https://github.com/milvus-io/milvus/pull/8480) Adds session liveness check.

- [#8264](https://github.com/milvus-io/milvus/pull/8264) Adds description event extras.

- [#8341](https://github.com/milvus-io/milvus/pull/8341) Replaces `MarshalTextString` with `Marshal` in root coord.

- [#8228](https://github.com/milvus-io/milvus/pull/8228) Supports healthz check API.

- [#8276](https://github.com/milvus-io/milvus/pull/8276) Initializes the SIMD type when initializing an index node.

- [#7967](https://github.com/milvus-io/milvus/pull/7967) Adds knowhere.yaml to support knowhere configuration. 

- [#7974](https://github.com/milvus-io/milvus/pull/7974) Supports setting max task number of task queue.

- [#7948](https://github.com/milvus-io/milvus/pull/7948) [#7975](https://github.com/milvus-io/milvus/pull/7975) Adds `suffixSnapshot` to implement SnapshotKV.

- [#7942](https://github.com/milvus-io/milvus/pull/7942) Supports configuring SIMD type.

- [#7814](https://github.com/milvus-io/milvus/pull/7814) Supports bool field filter in search and query expression.

- [#7635](https://github.com/milvus-io/milvus/pull/7635) Supports setting segcore rows_per_chunk via configuration file.

<h3 id="v2.0.0-RC7">Bug fixes</h3>

- [#9572](https://github.com/milvus-io/milvus/pull/9572) Rocksdb does not delete the end key after `DeleteRange` is called.

- [#8735](https://github.com/milvus-io/milvus/pull/8735) Acked infomation takes up memory resources.

- [#9454](https://github.com/milvus-io/milvus/pull/9454) Data race in query service.

- [#8850](https://github.com/milvus-io/milvus/pull/8850) SDK raises error with a message about index when dropping collection by alias.

- [#8930](https://github.com/milvus-io/milvus/pull/8930) Flush occasionally gets stuck when `SaveBinlogPath` fails due to instant buffer removal from `insertBuf`.

- [#8868](https://github.com/milvus-io/milvus/pull/8868) Trace log catches the wrong file name and line number.

- [#8844](https://github.com/milvus-io/milvus/pull/8844) `SearchTask` result is nil.

- [#8835](https://github.com/milvus-io/milvus/pull/8835) Root coord crashes because of bug in pulsar-client-go.

- [#8780](https://github.com/milvus-io/milvus/pull/8780) [#8268](https://github.com/milvus-io/milvus/pull/8268) [#7255](https://github.com/milvus-io/milvus/pull/7255) Collection alias-related issues.

- [#8744](https://github.com/milvus-io/milvus/pull/8744) Rocksdb_kv error process.

- [#8752](https://github.com/milvus-io/milvus/pull/8752) Data race in mqconsumer.

- [#8686](https://github.com/milvus-io/milvus/pull/8686) Flush after auto-flush will not finish.

- [#8564](https://github.com/milvus-io/milvus/pull/8564) [#8405](https://github.com/milvus-io/milvus/pull/8405) [#8743](https://github.com/milvus-io/milvus/pull/8743) [#8798](https://github.com/milvus-io/milvus/pull/8798) [#9509](https://github.com/milvus-io/milvus/pull/9509) [#8884](https://github.com/milvus-io/milvus/pull/8884) rocksdb memory leak.

- [#8671](https://github.com/milvus-io/milvus/pull/8671) Objects are not removed in MinIO when dropped.

- [#8050](https://github.com/milvus-io/milvus/pull/8050) [#8545](https://github.com/milvus-io/milvus/pull/8545) [#8567](https://github.com/milvus-io/milvus/pull/8567) [#8582](https://github.com/milvus-io/milvus/pull/8582) [#8562](https://github.com/milvus-io/milvus/pull/8562) tsafe-related issues.

- [#8137](https://github.com/milvus-io/milvus/pull/8137) Time goes backward because TSO does not load last timestamp.

- [#8461](https://github.com/milvus-io/milvus/pull/8461) Potential data race in data coord.

- [#8386](https://github.com/milvus-io/milvus/pull/8386) Incomplete logic when allocating dm channel to data node.

- [#8206](https://github.com/milvus-io/milvus/pull/8206) Incorrect reduce algorithm in proxy search task. 

- [#8120](https://github.com/milvus-io/milvus/pull/8120) Potential data race in root coord.

- [#8068](https://github.com/milvus-io/milvus/pull/8068) Query node crashes when query result is empty and optional `retrieve_ret_` is not initialized.

- [#8060](https://github.com/milvus-io/milvus/pull/8060) Query task panicking.

- [#8091](https://github.com/milvus-io/milvus/pull/8091) Data race in proxy gRPC client.

- [#8078](https://github.com/milvus-io/milvus/pull/8078) Data race in root coord gRPC client.

- [#7730](https://github.com/milvus-io/milvus/pull/7730) Topic and ConsumerGroup remain after `CloseRocksMQ`.

- [#8188](https://github.com/milvus-io/milvus/pull/8188) Logic error in releasing collections.



## v2.0.0-RC6

Release date: 2021-09-10

<h3 id="v2.0.0-RC6">Compatibility</h3>

<table class="version">
	<thead>
	<tr>
		<th>Milvus version</th>
		<th>Python SDK version</th>
		<th>Java SDK version</th>
		<th>Go SDK version</th>
		<th>Node.js SDK version</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>2.0.0-RC6</td>
		<td>2.0.0rc6</td>
		<td>Coming soon</td>
		<td>Coming soon</td>
		<td>2.0.2</td>
	</tr>
	</tbody>
</table>


Milvus 2.0.0-RC6 is a preview version of Milvus 2.0. It supports specifying shard number when creating collections, and query by expression. It exposes more cluster metrics through API. In RC6 we increase the unit test coverage to 80%. We also fixed a series of issues involving resource leakage, system panic, etc.

<h3 id="v2.0.0-RC6">Improvements</h3>

- Increases unit test coverage to 80%.

<h3 id="v2.0.0-RC6">Features</h3>

- [#7482](https://github.com/milvus-io/milvus/pull/7482) Supports specifying shard number when creating a collection.
- [#7386](https://github.com/milvus-io/milvus/pull/7386) Supports query by expression.
- Exposes system metrics through API:
  - [#7400](https://github.com/milvus-io/milvus/pull/7400) Proxy metrics integrate with other coordinators.
  - [#7177](https://github.com/milvus-io/milvus/pull/7177) Exposes metrics of data node and data coord.
  - [#7228](https://github.com/milvus-io/milvus/pull/7228) Exposes metrics of root coord.
  - [#7472](https://github.com/milvus-io/milvus/pull/7472) Exposes more detailed metrics information.
  - [#7436](https://github.com/milvus-io/milvus/pull/7436) Supports caching the system information metrics.

<h3 id="v2.0.0-RC6">Bug fixes</h3>

- [#7434](https://github.com/milvus-io/milvus/pull/7434) Query node OOM if loading a collection that beyond the memory limit.
- [#7678](https://github.com/milvus-io/milvus/pull/7678) Standalone OOM when recovering from existing storage.
- [#7636](https://github.com/milvus-io/milvus/pull/7636) Standalone panic when sending message to a closed channel.
- [#7631](https://github.com/milvus-io/milvus/pull/7631) Milvus panic when closing flowgraph.
- [#7605](https://github.com/milvus-io/milvus/pull/7605) Milvus crashed with panic when running nightly CI tests.
- [#7596](https://github.com/milvus-io/milvus/pull/7596) Nightly cases failed because rootcoord disconnected with etcd.
- [#7557](https://github.com/milvus-io/milvus/pull/7557) Wrong search result returned when the term content in expression is not in order.
- [#7536](https://github.com/milvus-io/milvus/pull/7536) Incorrect `MqMsgStream` Seek logic.
- [#7527](https://github.com/milvus-io/milvus/pull/7527) Dataset's memory leak in `knowhere` when searching.
- [#7444](https://github.com/milvus-io/milvus/pull/7444) Deadlock of channels time ticker.
- [#7428](https://github.com/milvus-io/milvus/pull/7428) Possible deadlock when `MqMsgStream` broadcast fails.
- [#7715](https://github.com/milvus-io/milvus/pull/7715) Query request overwritten by concurrent operations on the same slice.



## v2.0.0-RC5

Release date: 2021-08-30

<h3 id="v2.0.0-RC5">Compatibility</h3>

<table class="version">
	<thead>
	<tr>
		<th>Milvus version</th>
		<th>Python SDK version</th>
		<th>Java SDK version</th>
		<th>Go SDK version</th>
		<th>Node.js SDK version</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>2.0.0-RC5</td>
		<td>2.0.0rc5</td>
		<td>Coming soon</td>
		<td>Coming soon</td>
		<td>2.0.2</td>
	</tr>
	</tbody>
</table>

Milvus 2.0.0-RC5 is a preview version of Milvus 2.0. It supports message queue data retention mechanism and etcd data cleanup,  exposes cluster metrics through API, and prepares for delete operation support. RC5 also made great progress on system stability. We fixed a series of resource leakage, operation hang and the misconfiguration of standalone Pulsar under Milvus cluster.

<h3 id="v2.0.0-RC5">Improvements</h3>

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

<h3 id="v2.0.0-RC5">Features</h3>

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

<h3 id="v2.0.0-RC5">Bug fixes</h3>

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

<h3 id="v2.0.0-RC4">Compatibility</h3>

| Milvus version | Python SDK version                | Java SDK version | Go SDK version |
| ------------------ | ------------------------------------- | -------------------- | ------------------ |
| 2.0.0-RC4          | 2.0.0rc4 | Coming soon          | Coming soon        |

Milvus 2.0.0-RC4 is a preview version of Milvus 2.0. It mainly focuses on fixing stability issues, it also offers functionalities to retrieve vector data from object storage and specify output field by wildcard matching.

<h3 id="v2.0.0-RC4">Improvements</h3>

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

<h3 id="v2.0.0-RC4">Features</h3>

- [#6706](https://github.com/milvus-io/milvus/pull/6707) Supports reading vectors from disk.

- [#6299](https://github.com/milvus-io/milvus/issues/6299) [#6598](https://github.com/milvus-io/milvus/pull/6598) Supports query vector field.

- [#5210](https://github.com/milvus-io/milvus/pull/6460) Extends the grammar of Boolean expressions.

- [#6411](https://github.com/milvus-io/milvus/pull/6510) [#6650](https://github.com/milvus-io/milvus/pull/6671) Supports wildcards and wildcard matching on search/query output fields.  

- [#6464](https://github.com/milvus-io/milvus/pull/6613) Adds a vector chunk manager to support vector file local storage.

- [#6701](https://github.com/milvus-io/milvus/pull/6702) Supports data persistence with docker compose deployments.

- [#6767](https://github.com/milvus-io/milvus/pull/6770) Adds a Grafana dashboard .json file for Milvus.

<h3 id="v2.0.0-RC4">Bug fixes</h3>

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

<h3 id="v2.0.0-RC2">Compatibility</h3>

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 2.0.0-RC2 | 2.0.0rc2 | Coming soon            | Coming soon          |

Milvus 2.0.0-RC2 is a preview version of Milvus 2.0. It fixes stability and performance issues and refactors code for node and storage management.

<h3 id="v2.0.0-RC2">Improvements</h3>

- [#6356](https://github.com/milvus-io/milvus/pull/6356) Refactors code for cluster in data coordinator. 
- [#6300](https://github.com/milvus-io/milvus/pull/6300) Refactors code for meta management in data coordinator. 
- [#6289](https://github.com/milvus-io/milvus/pull/6289) Adds `collectionID` and `partitionID` to `SegmentIndexInfo`. 
- [#6258](https://github.com/milvus-io/milvus/pull/6258) Clears the corresponding `searchMsgStream` in proxy when calling `releaseCollection()`. 
- [#6227](https://github.com/milvus-io/milvus/pull/6227) Merges codes relating to retrieve and search in query node. 
- [#6196](https://github.com/milvus-io/milvus/pull/6196) Adds candidate management for data coordinator to manage data node cluster. 
- [#6188](https://github.com/milvus-io/milvus/pull/6188) Adds Building Milvus with Docker Docs. 

<h3 id="v2.0.0-RC2">Features</h3>

- [#6386](https://github.com/milvus-io/milvus/pull/6386) Adds the `fget_objects()` method for loading files from MinIO to the local device.
- [#6253](https://github.com/milvus-io/milvus/pull/6253) Adds the `GetFlushedSegments()` method in data coordinator.
- [#6213](https://github.com/milvus-io/milvus/pull/6213) Adds the `GetIndexStates()` method.

<h3 id="v2.0.0-RC2">Bug fixes</h3>

- [#6184](https://github.com/milvus-io/milvus/pull/6184) Search accuracy worsens when dataset gets larger.
- [#6308](https://github.com/milvus-io/milvus/pull/6308) The server crashes if the KNNG in NSG is not full.
- [#6212](https://github.com/milvus-io/milvus/pull/6212) Search hangs after restarting query nodes. 
- [#6265](https://github.com/milvus-io/milvus/pull/6265) The server does not check node status when detecting nodes are online. 
- [#6359](https://github.com/milvus-io/milvus/pull/6359) [#6334](https://github.com/milvus-io/milvus/pull/6334) An error occurs when compiling Milvus on CentOS




## v2.0.0-RC1


Release date: 2021-06-28

<h3 id="v2.0.0-RC1">Compatibility</h3>



| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 2.0.0-RC1 | 2.0.0rc1 | Coming soon            | Coming soon          |



Milvus 2.0.0-RC1 is the preview version of 2.0. It introduces Golang as the distributed layer development language and a new cloud-native distributed design. The latter brings significant improvements to scalability, elasticity, and functionality. 


<h3 id="v2.0.0-RC1">Architecture</h3>

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


<h3 id="v2.0.0-RC1">New Features</h3>

**SDK**

- Object-relational mapping (ORM) PyMilvus

  The PyMilvus APIs operate directly on collections, partitions, and indexes, helping users focus on the building of an effective data model rather than the detailed implementation. 

**Core Features**

- Hybrid Search between scalar and vector data

  Milvus 2.0 supports storing scalar data. Operators such as GREATER, LESS, EQUAL, NOT, IN, AND, and OR can be used to filter scalar data before a vector search is conducted. Currently supported data types include bool, int8, int16, int32, int64, float, and double. Support for string/VARBINARY data will be offered in a later version.

- Match query

  Unlike the search operation, which returns similar results, the match query operation returns exact matches. Match query can be used to retrieve vectors by primary keys or by condition. 

- Tunable consistency

  Distributed databases make tradeoffs between consistency and availability/latency. Milvus offers four consistency levels (from strongest to weakest): strong, bounded staleness, session, and consistent prefix. You can define your own read consistency by specifying the read timestamp. As a rule of thumb, the weaker the consistency level, the higher the availability and the higher the performance.

- Time travel

  Time travel allows you to access historical data at any point within a specified time period, making it possible to query data in the past, restore, and backup. 

**Miscellaneous**

- Supports installing Milvus 2.0 with Helm or Docker-compose.

- Compatibility with Prometheus and Grafana for monitoring and alerts.

- Milvus Insight

  Milvus Insight is a graphical management system for Milvus. It features visualization of cluster states, meta management, data queries and more. Milvus Insight will eventually be open sourced.


<h3 id="v2.0.0-RC1">Breaking Changes</h3>

Milvus 2.0 uses an entirely different programming language, data format, and distributed architecture compared with previous versions. This means prior versions of Milvus cannot be upgraded to 2.x. However, Milvus 1.x is receiving long-term support and data migration tools will be made available as soon as possible. 

Specific breaking changes include:

- JAVA, Go, or C++ SDK is not yet supported.

- Delete or update is not yet supported.

- PyMilvus-ORM does not support force flush.

- Data format is incompatible with all prior versions. 

- Mishards is deprecated because Milvus 2.0 is distributed and sharding middleware is no longer necessary.

- Local file system and distributed system storage are not yet supported.
