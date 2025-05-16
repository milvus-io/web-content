---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Learn about the system configuration of Milvus.
title: Milvus System Configurations Checklist
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Milvus System Configurations Checklist<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>This topic introduces the general sections of the system configurations in Milvus.</p>
<p>Milvus maintains a considerable number of parameters that configure the system. Each configuration has a default value, which can be used directly. You can modify these parameters flexibly so that Milvus can better serve your application. See <a href="/docs/v2.3.x/configure-docker.md">Configure Milvus</a> for more information.</p>
<div class="alert note">
In current release, all parameters take effect only after being configured at the startup of Milvus.
</div>
<h2 id="Sections" class="common-anchor-header">Sections<button data-href="#Sections" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>For the convenience of maintenance, Milvus classifies its configurations into 17 sections based on its components, dependencies, and general usage.</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>etcd is the metadata engine supporting Milvus’ metadata storage and access.</p>
<p>Under this section, you can configure etcd endpoints, relevant key prefixes, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_etcd.md">etcd-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>Milvus supports MinIO and Amazon S3 as the storage engine for data persistence of insert log files and index files. Whereas MinIO is the de facto standard for S3 compatibility, you can configure S3 parameters directly under MinIO section.</p>
<p>Under this section, you can configure MinIO or S3 address, relevant access keys, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_minio.md">MinIO-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>Pulsar is the underlying engine supporting Milvus cluster’s reliable storage and publication/subscription of message streams.</p>
<p>Under this section, you can configure Pulsar address, the message size, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_pulsar.md">Pulsar-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>RocksMQ is the underlying engine supporting Milvus standalone’s reliable storage and publication/subscription of message streams. It is implemented on the basis of RocksDB.</p>
<p>Under this section, you can configure message size, retention time and size, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_rocksmq.md">RocksMQ-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="nats" class="common-anchor-header"><code translate="no">nats</code></h3><p>NATS is a message-oriented middleware that allows data exchange between applications and services, segmented in the form of messages. Milvus uses NATS as a underlying engine for reliable storage and pub/sub of message streams. You can use it as an alternative to RocksMQ.</p>
<p>Under this section, you can configure NATS server, monitoring properties, and rention time and size, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_nats.md">NATS-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="kafka" class="common-anchor-header"><code translate="no">kafka</code></h3><p>Apache Kafka is an open-source distributed event streaming platform for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications. It serves as an alternative to RocksMQ and Pulsar for reliable storage and publication/subscription of message streams.</p>
<p>See <a href="/docs/v2.3.x/configure_kafka.md">Kafka-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>Root coordinator (root coord) handles data definition language (DDL) and data control language (DCL) requests, manages TSO (timestamp Oracle), and publishes time tick messages.</p>
<p>Under this section, you can configure root coord address, index building threshold, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_rootcoord.md">Root Coordinator-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>Proxy is the access layer of the system and endpoint to users. It validates client requests and reduces the returned results.</p>
<p>Under this section, you can configure proxy port, system limits, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_proxy.md">Proxy-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>Query coordinator (query coord) manages topology and load-balancing of the query nodes, and handoff operation from growing segments to sealed segments.</p>
<p>Under this section, you can configure query coord address, auto handoff, auto load-balancing, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_querycoord.md">Query coordinator-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>Query node performs hybrid search of vector and scalar data on both incremental and historical data.</p>
<p>Under this section, you can configure query node port, graceful time, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_querynode.md">Query Node-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>Index coordinator (index coord) manages topology of the index nodes, and maintains index metadata.</p>
<p>Under this section, you can configure index coord address, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_indexcoord.md">Index Coordinator-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>Index node builds indexes for vectors.</p>
<p>Under this section, you can configure index node port, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_indexnode.md">Index Node-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>Data coordinator (data coord) manages the topology of data nodes, maintains metadata, and triggers flush, compact, and other background data operations.</p>
<p>Under this section, you can configure data coord address, segment settings, compaction, garbage collection, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_datacoord.md">Data Coordinator-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>Data node retrieves incremental log data by subscribing to the log broker, processes mutation requests, and packs log data into log snapshots and stores them in the object storage.</p>
<p>Under this section, you can configure data node port, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_datanode.md">Data Node-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>Milvus stores the vector data in local storage during search or query to avoid repetitive access to MinIO or S3 service.</p>
<p>Under this section, you can enable local storage, and configure the path, etc.</p>
<p>See <a href="/docs/v2.3.x/configure_localstorage.md">Local Storage-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>Using Milvus generates a collection of logs. By default, Milvus uses logs to record information at debug or even higher level for standard output (stdout) and standard error (stderr).</p>
<p>Under this section, you can configure the system log output.</p>
<p>See <a href="/docs/v2.3.x/configure_log.md">Log-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>Under this section, you can configure the message channel name prefixes and component subscription name prefixes.</p>
<p>See <a href="/docs/v2.3.x/configure_messagechannel.md">Message Channel-related Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>Under this section, you can configure the default names of partition and index, and the Time Travel (data retention) span of Milvus.</p>
<p>See <a href="/docs/v2.3.x/configure_common.md">Common Configurations</a> for detailed description for each parameter under this section.</p>
<h3 id="knowhere" class="common-anchor-header"><code translate="no">knowhere</code></h3><p>Knowhere is the search engine of Milvus.</p>
<p>Under this section, you can configure the default SIMD instruction set type of the system.</p>
<p>See <a href="/docs/v2.3.x/configure_knowhere.md">Knowhere-related Configurations</a> for detailed description for each parameter under this section.</p>
<h2 id="Frequently-used-parameters" class="common-anchor-header">Frequently used parameters<button data-href="#Frequently-used-parameters" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Below list some frequently used parameters categorized in accordance with the purposes of modification.</p>
<h3 id="Performance-tuning" class="common-anchor-header">Performance tuning</h3><p>The following parameters control the system behaviors that influence the performance of index creation and vector similarity search.</p>
<ul>
    <li><a href="/docs/v2.3.x/configure_querynode.md#queryNode.gracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
    <li><a href="/docs/v2.3.x/configure_rootcoord.md#rootCoord.minSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
    <li><a href="/docs/v2.3.x/configure_datacoord.md#dataCoord.segment.maxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
    <li><a href="/docs/v2.3.x/configure_datacoord.md#dataCoord.segment.sealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
    <li><a href="/docs/v2.3.x/configure_datanode.md#dataNode.flush.insertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
    <li><a href="/docs/v2.3.x/configure_querycoord.md#queryCoord.autoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
    <li><a href="/docs/v2.3.x/configure_querycoord.md#queryCoord.autoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
    <li><a href="/docs/v2.3.x/configure_localstorage.md#localStorage.enabled"><code translate="no">localStorage.enabled</code></a></li>
</ul>
<h3 id="Data-and-metadata-retention" class="common-anchor-header">Data and metadata retention</h3><p>The following parameters control the retention of data and metadata.</p>
<ul>
    <li><a href="/docs/v2.3.x/configure_common.md#common.retentionDuration"><code translate="no">common.retentionDuration</code></a></li>
    <li><a href="/docs/v2.3.x/configure_rocksmq.md#rocksmq.retentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
    <li><a href="/docs/v2.3.x/configure_datacoord.md#dataCoord.enableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
    <li><a href="/docs/v2.3.x/configure_datacoord.md#dataCoord.enableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
    <li><a href="/docs/v2.3.x/configure_datacoord.md#dataCoord.gc.dropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
</ul>
<h3 id="Administration" class="common-anchor-header">Administration</h3><p>The following parameters control the log output and object storage access.</p>
<ul>
    <li><a href="/docs/v2.3.x/configure_log.md#log.level"><code translate="no">log.level</code></a></li>
    <li><a href="/docs/v2.3.x/configure_log.md#log.file.rootPath"><code translate="no">log.file.rootPath</code></a></li>
    <li><a href="/docs/v2.3.x/configure_log.md#log.file.maxAge"><code translate="no">log.file.maxAge</code></a></li>
    <li><a href="/docs/v2.3.x/configure_minio.md#minio.accessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
    <li><a href="/docs/v2.3.x/configure_minio.md#minio.secretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
</ul>
<h3 id="Quotas-and-limits" class="common-anchor-header">Quotas and limits</h3><ul>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsflushmax"><code translate="no">quotaAndLimits.flush.max</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitscompationenabled"><code translate="no">quotaAndLimits.compation.enabled</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitscompactionmax"><code translate="no">quotaAndLimits.compaction.max</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code translate="no">quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code translate="no">quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code translate="no">quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
    <li><a href="/docs/v2.3.x/configure_quota_limits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li><p>Learn how to <a href="/docs/v2.3.x/configure-docker.md">configure Milvus</a> before installation.</p></li>
<li><p>Learn more about the installation of Milvus:</p>
<ul>
<li><a href="/docs/v2.3.x/install_standalone-docker.md">Install Milvus Standalone</a></li>
</ul></li>
</ul>
