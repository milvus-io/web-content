---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Learn about the system configuration of Milvus.
title: Milvus System Configurations Checklist
---

# Milvus System Configurations Checklist

This topic introduces the general sections of the system configurations in Milvus.

Milvus maintains a considerable number of parameters that configure the system. Each configuration has a default value, which can be used directly. You can modify these parameters flexibly so that Milvus can better serve your application. See [Configure Milvus](configure-docker.md) for more information.

<div class="alert note">
In current release, all parameters take effect only after being configured at the startup of Milvus.
</div>

## Sections

For the convenience of maintenance, Milvus classifies its configurations into 17 sections based on its components, dependencies, and general usage.

### `etcd`

etcd is the metadata engine supporting Milvus' metadata storage and access.

Under this section, you can configure etcd endpoints, relevant key prefixes, etc.

See [etcd-related Configurations](configure_etcd.md) for detailed description for each parameter under this section.

### `minio`

Milvus supports MinIO and Amazon S3 as the storage engine for data persistence of insert log files and index files. Whereas MinIO is the de facto standard for S3 compatibility, you can configure S3 parameters directly under MinIO section.

Under this section, you can configure MinIO or S3 address, relevant access keys, etc.

See [MinIO-related Configurations](configure_minio.md) for detailed description for each parameter under this section.

### `pulsar`

Pulsar is the underlying engine supporting Milvus cluster's reliable storage and publication/subscription of message streams. 

Under this section, you can configure Pulsar address, the message size, etc.

See [Pulsar-related Configurations](configure_pulsar.md) for detailed description for each parameter under this section.

### `rocksmq`

RocksMQ is the underlying engine supporting Milvus standalone's reliable storage and publication/subscription of message streams. It is implemented on the basis of RocksDB.

Under this section, you can configure message size, retention time and size, etc.

See [RocksMQ-related Configurations](configure_rocksmq.md) for detailed description for each parameter under this section.

### `nats`

NATS is a message-oriented middleware that allows data exchange between applications and services, segmented in the form of messages. Milvus uses NATS as a underlying engine for reliable storage and pub/sub of message streams. You can use it as an alternative to RocksMQ.

Under this section, you can configure NATS server, monitoring properties, and rention time and size, etc.

See [NATS-related Configurations](configure_nats.md) for detailed description for each parameter under this section.

### `kafka`

Apache Kafka is an open-source distributed event streaming platform for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications. It serves as an alternative to RocksMQ and Pulsar for reliable storage and publication/subscription of message streams.

See [Kafka-related Configurations](configure_kafka.md) for detailed description for each parameter under this section.

### `rootCoord`

Root coordinator (root coord) handles data definition language (DDL) and data control language (DCL) requests, manages TSO (timestamp Oracle), and publishes time tick messages.

Under this section, you can configure root coord address, index building threshold, etc.

See [Root Coordinator-related Configurations](configure_rootcoord.md) for detailed description for each parameter under this section.

### `proxy`

Proxy is the access layer of the system and endpoint to users. It validates client requests and reduces the returned results.

Under this section, you can configure proxy port, system limits, etc.

See [Proxy-related Configurations](configure_proxy.md) for detailed description for each parameter under this section.

### `queryCoord`

Query coordinator (query coord) manages topology and load-balancing of the query nodes, and handoff operation from growing segments to sealed segments.

Under this section, you can configure query coord address, auto handoff, auto load-balancing, etc.

See [Query coordinator-related Configurations](configure_querycoord.md) for detailed description for each parameter under this section.

### `queryNode`

Query node performs hybrid search of vector and scalar data on both incremental and historical data.

Under this section, you can configure query node port, graceful time, etc.

See [Query Node-related Configurations](configure_querynode.md) for detailed description for each parameter under this section.

### `indexNode`

Index node builds indexes for vectors.

Under this section, you can configure index node port, etc.

See [Index Node-related Configurations](configure_indexnode.md) for detailed description for each parameter under this section.

### `dataCoord`

Data coordinator (data coord) manages the topology of data nodes, maintains metadata, and triggers flush, compact, and other background data operations.

Under this section, you can configure data coord address, segment settings, compaction, garbage collection, etc.

See [Data Coordinator-related Configurations](configure_datacoord.md) for detailed description for each parameter under this section.

### `dataNode`

Data node retrieves incremental log data by subscribing to the log broker, processes mutation requests, and packs log data into log snapshots and stores them in the object storage.

Under this section, you can configure data node port, etc.

See [Data Node-related Configurations](configure_datanode.md) for detailed description for each parameter under this section.

### `localStorage`

Milvus stores the vector data in local storage during search or query to avoid repetitive access to MinIO or S3 service.

Under this section, you can enable local storage, and configure the path, etc.

See [Local Storage-related Configurations](configure_localstorage.md) for detailed description for each parameter under this section.

### `log`

Using Milvus generates a collection of logs. By default, Milvus uses logs to record information at debug or even higher level for standard output (stdout) and standard error (stderr).

Under this section, you can configure the system log output.

See [Log-related Configurations](configure_log.md) for detailed description for each parameter under this section.

### `msgChannel`

Under this section, you can configure the message channel name prefixes and component subscription name prefixes.

See [Message Channel-related Configurations](configure_messagechannel.md) for detailed description for each parameter under this section.

### `common`

Under this section, you can configure the default names of partition and index, and the Time Travel (data retention) span of Milvus.

See [Common Configurations](configure_common.md) for detailed description for each parameter under this section.

### `knowhere`

Under this section, you can configure the default SIMD instruction set type of the system.

See [Knowhere-related Configurations](configure_knowhere.md) for detailed description for each parameter under this section.

## Frequently used parameters

Below list some frequently used parameters categorized in accordance with the purposes of modification.

### Performance tuning

The following parameters control the system behaviors that influence the performance of index creation and vector similarity search.

<ul>
    <li><a href="configure_querynode.md#queryNode.gracefulTime"><code>queryNode.gracefulTime</code></a></li>
    <li><a href="configure_rootcoord.md#rootCoord.minSegmentSizeToEnableIndex"><code>rootCoord.minSegmentSizeToEnableIndex</code></a></li>
    <li><a href="configure_datacoord.md#dataCoord.segment.maxSize"><code>dataCoord.segment.maxSize</code></a></li>
    <li><a href="configure_datacoord.md#dataCoord.segment.sealProportion"><code>dataCoord.segment.sealProportion</code></a></li>
    <li><a href="configure_datanode.md#dataNode.flush.insertBufSize"><code>dataNode.flush.insertBufSize</code></a></li>
    <li><a href="configure_querycoord.md#queryCoord.autoHandoff"><code>queryCoord.autoHandoff</code></a></li>
    <li><a href="configure_querycoord.md#queryCoord.autoBalance"><code>queryCoord.autoBalance</code></a></li>
    <li><a href="configure_localstorage.md#localStorage.enabled"><code>localStorage.enabled</code></a></li>
</ul>

### Data and metadata retention

The following parameters control the retention of data and metadata.

<ul>
    <li><a href="configure_common.md#common.retentionDuration"><code>common.retentionDuration</code></a></li>
    <li><a href="configure_rocksmq.md#rocksmq.retentionTimeInMinutes"><code>rocksmq.retentionTimeInMinutes</code></a></li>
    <li><a href="configure_datacoord.md#dataCoord.enableCompaction"><code>dataCoord.enableCompaction</code></a></li>
    <li><a href="configure_datacoord.md#dataCoord.enableGarbageCollection"><code>dataCoord.enableGarbageCollection</code></a></li>
    <li><a href="configure_datacoord.md#dataCoord.gc.dropTolerance"><code>dataCoord.gc.dropTolerance</code></a></li>
</ul>


### Administration

The following parameters control the log output and object storage access.

<ul>
    <li><a href="configure_log.md#log.level"><code>log.level</code></a></li>
    <li><a href="configure_log.md#log.file.rootPath"><code>log.file.rootPath</code></a></li>
    <li><a href="configure_log.md#log.file.maxAge"><code>log.file.maxAge</code></a></li>
    <li><a href="configure_minio.md#minio.accessKeyID"><code>minio.accessKeyID</code></a></li>
    <li><a href="configure_minio.md#minio.secretAccessKey"><code>minio.secretAccessKey</code></a></li>
</ul>

### Quotas and limits

<ul>
    <li><a href="configure_quota_limits.md#quotaAndLimitsddlenabled"><code>quotaAndLimits.ddl.enabled</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsddlcollectionRate"><code>quotaAndLimits.ddl.collectionRate</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsddlpartitionRate"><code>quotaAndLimits.ddl.partitionRate</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsindexRateenabled"><code>quotaAndLimits.indexRate.enabled</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsindexRatemax"><code>quotaAndLimits.indexRate.max</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsflushRateenabled"><code>quotaAndLimits.flushRate.enabled</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsflushmax"><code>quotaAndLimits.flush.max</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitscompationenabled"><code>quotaAndLimits.compation.enabled</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitscompactionmax"><code>quotaAndLimits.compaction.max</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsdmlenabled"><code>quotaAndLimits.dml.enabled</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsdmlinsertRatemax"><code>quotaAndLimits.dml.insertRate.max</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsdmldeleteRatemax"><code>quotaAndLimits.dml.deleteRate.max</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsdqlenabled"><code>quotaAndLimits.dql.enabled</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsdqlsearchRatemax"><code>quotaAndLimits.dql.searchRate.max</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitsdqlqueryRatemax"><code>quotaAndLimits.dql.queryRate.max</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingttProtectionenabled"><code>quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code>quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code>quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code>quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code>quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code>quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code>quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingforceDeny"><code>quotaAndLimits.limitWriting.forceDeny</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code>quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code>quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code>quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code>quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code>quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
    <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingforceDeny"><code>quotaAndLimits.limitReading.forceDeny</code></a></li>
</ul>

## What's next

- Learn how to [configure Milvus](configure-docker.md) before installation.

- Learn more about the installation of Milvus:
  - [Install Milvus Standalone](install_standalone-docker.md)