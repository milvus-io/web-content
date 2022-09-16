---
id: release_notes.md
summary: Milvus Release Notes
---
# Release Notes

Find out what’s new in Milvus! This page summarizes information about new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.1.0 in this section. We suggest that you regularly visit this page to learn about updates.

## v2.1.2
Release date: 16 September 2022

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
| -------------- | ------------------ | ---------------- | -------------- | ------------------- |
| 2.1.2          | 2.1.2              | 2.1.0            | 2.1.1          | 2.1.2               |

Milvus 2.1.2 is a minor bug-fix version of Milvus 2.1.0. It fixed issues when garbage collector parses binlog path, a few other issues causing search hang, and performance regression when the user authentication feature is enabled.

### Bug Fixes

- [18733](https://github.com/milvus-io/milvus/pull/18733), [18783](https://github.com/milvus-io/milvus/pull/18783), [18844](https://github.com/milvus-io/milvus/pull/18844), [18886](https://github.com/milvus-io/milvus/pull/18886), [18906](https://github.com/milvus-io/milvus/pull/18906) Fixes load/cluster restart/scale hang.

- [18678](https://github.com/milvus-io/milvus/pull/18678) Fixes flush panic after compaction. 

- [18690](https://github.com/milvus-io/milvus/pull/18690) Fixes DataType::bool cast to double.

- [18884](https://github.com/milvus-io/milvus/pull/18884), [18808](https://github.com/milvus-io/milvus/pull/18808) Fixes garbage collection failure when the storage root path starts with "/".

- [18790](https://github.com/milvus-io/milvus/pull/18790) Fixes watchDmChannel being out-of-date after compaction issue.

- [18872](https://github.com/milvus-io/milvus/issues/18872) Disables empty string insertion to avoid server crash.

- [18701](https://github.com/milvus-io/milvus/pull/18701) Fixes RHNSWPQ pqm divided by zero.

- [18714](https://github.com/milvus-io/milvus/pull/18714) Fixes flush hang when Pulsar error causes empty segments.

- [18732](https://github.com/milvus-io/milvus/pull/18732) Fixes performance degradation caused by missing password verification cache.

### Improvements

- [18683](https://github.com/milvus-io/milvus/pull/18683) Deduplicates output fields for query. 

- [18895](https://github.com/milvus-io/milvus/pull/18895) Adds manual compaction periodically to clean up deleted RocksMQ data.

- [18795](https://github.com/milvus-io/milvus/pull/18795), [18850](https://github.com/milvus-io/milvus/pull/18850) Refactors compaction concurrency logic.

### Features

- [17899](https://github.com/milvus-io/milvus/pull/17899) Supports configurable SASL mechanism for Kafka.

## v2.1.1

Release date: 12 August 2022

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
| -------------- | ------------------ | ---------------- | -------------- | ------------------- |
| 2.1.1          | 2.1.1              | 2.1.0            | 2.1.1          | 2.1.2               |

Milvus 2.1.1 is a minor bug fix version of Milvus 2.1.0. It fixed query node crash under high concurrency, garbage collector failure to parse segment ID, and a few other stability issues.

<h3 id="v2.1.1">Bug fixes</h3>

- [#18383](https://github.com/milvus-io/milvus/pull/18383), [#18432](https://github.com/milvus-io/milvus/pull/18432) Fixed garbage collector parse segment ID panics with bad input.

- [#18418](https://github.com/milvus-io/milvus/pull/18418) Fixed metatable related error when etcd compaction error happens.

- [#18568](https://github.com/milvus-io/milvus/pull/18568) Closes Node/Segment detector when closing ShardCluster.

- [#18542](https://github.com/milvus-io/milvus/pull/18542) Adds CGO worker pool for Query Node to avoid OpenMP creating too many threads.

- [#18569](https://github.com/milvus-io/milvus/pull/18569) Releases collection resources when all partitions are released to avoid resource leakage.

<h3 id="v2.1.1">Improvements</h3>

- [#18394](https://github.com/milvus-io/milvus/pull/18394) Removes watch delta channel task-related logic.

- [#18513](https://github.com/milvus-io/milvus/pull/18513) Uses chunkManager rather than minio.Client in Data Node garbage collection.

- [#18410](https://github.com/milvus-io/milvus/pull/18410) Limits the concurrency level for single load request.

<h3 id="v2.1.1">Features</h3>

- [18570](https://github.com/milvus-io/milvus/pull/18570) Supports the dynamic change of log level through HTTP.


## v2.1.0

Release date: 27 July 2022

<h3 id="v2.1.0">Compatibility</h3>

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
		<td>2.1.0</td>
		<td>2.1.0</td>
		<td>2.1.0</td>
		<td>2.1.0</td>
		<td>2.1.2</td>
	</tr>
	</tbody>
</table>


Milvus 2.1.0 not only introduces many new features including support for VARCHAR data type, memory replicas, Kafka support, and RESTful API but also greatly improves the functionality, performance, and stability of Milvus. 

<h3 id="v2.1.0">Features</h3>

- Support for VARCHAR data type

Milvus now supports variable-length string as a scalar data type. Like previous scalar types, VARCHAR can be specified as an output field or be used for attribute filtering. A MARISA-trie-based inverted index is also supported to accelerate prefix query and exact match.

- In-memory replicas

In-memory replicas enable you to load data on multiple query nodes. Like read replicas in traditional databases, in-memory replicas can help increase throughput if you have a relatively small dataset but want to scale read throughput with more hardware resources. We will support hedged read in future releases to increase availability when applying in-memory replicas.

- Embedded Milvus

Embedded Milvus enables you to [pip install Milvus](install_embedded_milvus.md) in one command, try quick demos and run short scripts in Python on your Macbook, including on the ones with M1 processor. 

- Kafka support (Beta)

Apache Kafka is the most widely used open-source distributed message store. In Milvus 2.1.0, you can simply use Kafka for message storage by modifying configurations. 

- RESTful API (Beta)

Milvus 2.1.0 now provides RESTful API for applications written in PHP or Ruby. GIN, one of the most popular Golang web frameworks, is adopted as the web server.

<h3 id="v2.1.0">Performance</h3>

The Milvus core team conducted a full performance benchmarking and profiling, and fixed a few bottlenecks on load/search paths. Under some test cases, Milvus search performance is boosted about 3.2 times thanks to the search combination logic.
- [#16014](https://github.com/milvus-io/milvus/pull/16014) Enables ZSTD compression for pulsar.
- [#16514](https://github.com/milvus-io/milvus/pull/16514) [#17273](https://github.com/milvus-io/milvus/pull/17273) Improves load performance.
- [#17005](https://github.com/milvus-io/milvus/pull/17005) Loads binlog for different fields in parallel. 
- [#17022](https://github.com/milvus-io/milvus/pull/17022) Adds logic for search merging and a simple task scheduler for read tasks.
- [#17194](https://github.com/milvus-io/milvus/pull/17194) Simplifies the merge logic of searchTask.
- [#17287](https://github.com/milvus-io/milvus/pull/17287) Reduces default seal proportion. 

<h3 id="v2.1.0">Stability</h3>

To improve stability, especially during streaming data insertion, we fixed a few critical issues including: 
- Fixed out of memory issues.
- Fixed message queue backlog full caused by message queue subscription leakge.
- Fixed the issue of deleted entities can still be readable.
- Fixed data being erroneously cleaned by compaction during load or index.


<h3 id="v2.1.0">Other improvements</h3>

- Security 

Starting from Milvus 2.1.0, we support username, password, and TLS connection. We also enable safe connections to our dependencies such as S3, Kafka and etcd.

- ANTLR parser

Milvus now adopts Go ANTLR as the plan parser to make adding new grammar such as arithmetic operations on numerical fields more flexible. The adoption of ANTLR also prepares for Milvus query language support in future releases.

- Observability

We refined monitoring metrics by adding important [metrics](metrics_dashboard.md) including search QPS and latency to the new dashboard. Please notify us if any metrics critical to your production environment are not listed.

- Deployment

For users who don't have a K8s environment but still want to deploy a cluster, Milvus now supports Ansible deployment. See [Install Milvus Cluster](install_cluster-ansible.md) for more information.

<h3 id="v2.1.0">Known issues</h3>

1. Partition is not a fully released feature so we recommend user not to rely on it. [#17648 When a partition is dropped, the data and index cannot be cleaned.](https://github.com/milvus-io/milvus/issues/17648)
2. When building index after load, the collection need to released and reloaded. [#17809 When an index is created on a loaded collection, the segment already loaded will not be notified to load the index.](https://github.com/milvus-io/milvus/issues/17809)

