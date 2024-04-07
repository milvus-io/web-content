---
id: configure_quota_limits.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure quotas and limitations.
title: Quota- and Limit-related configurations
---

# Quota- and Limit-related configurations

This topic introduces the configuration items related to quotas and limits in Milvus.

Some of these configuration items are used to set thresholds for Milvus to proactively throttle DDL/DML/DQL requests related to collections, partitions, indexes, etc.

Some of them are used to set backpressure signals that force Milvus to lower the rate of DDL/DML/DQL requests.

## `quotaAndLimits.limits.maxCollectionNumPerDB`

<table id="quotaAndLimits.ddl.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Maximum number of collections per database.</td>
      <td>64</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.ddl.enabled`

<table id="quotaAndLimits.ddl.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether DDL request throttling is enabled.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.ddl.collectionRate`

<table id="quotaAndLimits.ddl.collectionRate">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum number of collection-related DDL requests per second.</li>
        <li>Setting this item to <code>10</code> indicates that Milvus processes no more than 10 collection-related DDL requests per second, including collection creation requests, collection drop requests, collection load requests, and collection release requests.</li>
        <li>To use this setting, set <code>quotaAndLimits.ddl.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.ddl.partitionRate`

<table id="quotaAndLimits.ddl.partitionRate">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum number of partition-related DDL requests per second.</li>
        <li>Setting this item to <code>10</code> indicates that Milvus processes no more than 10 partition-related requests per second, including partition creation requests, partition drop requests, partition load requests, and partition release requests.</li>
        <li>To use this setting, set <code>quotaAndLimits.ddl.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.indexRate.enabled`

<table id="quotaAndLimits.indexRate.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether index-related request throttling is enabled.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.indexRate.max`

<table id="quotaAndLimits.indexRate.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum number of index-related requests per second.</li>
        <li>Setting this item to <code>10</code> indicates that Milvus processes no more than 10 partition-related requests per second, including index creation requests and index drop requests.</li>
        <li>To use this setting, set <code>quotaAndLimits.indexRate.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.flushRate.enabled`

<table id="quotaAndLimits.flushRate.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether flush request throttling is enabled.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.flush.max`

<table id="quotaAndLimits.flush.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum number of flush requests per second.</li>
        <li>Setting this item to <code>10</code> indicates that Milvus processes no more than 10 flush requests per second.</li>
        <li>To use this setting, set <code>quotaAndLimits.flushRate.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.compaction.enabled`

<table id="quotaAndLimits.compaction.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether flush request throttling is enabled.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.compaction.max`

<table id="quotaAndLimits.compaction.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum number of manual-compaction requests per second.</li>
        <li>Setting this item to <code>10</code> indicates that Milvus processes no more than 10 manual-compaction requests per second.</li>
        <li>To use this setting, set <code>quotaAndLimits.compaction.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.dml.enabled`

<table id="quotaAndLimits.dml.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether DML request throttling is enabled.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.dml.insertRate.max`

<table id="quotaAndLimits.dml.insertRate.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Highest data insertion rate per second.</li>
        <li>Setting this item to <code>5</code> indicates that Milvus only allows data insertion at the rate of 5 MB/s.</li>
        <li>To use this setting, set <code>quotaAndLimits.dml.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.dml.insertRate.collection.max`

<table id="quotaAndLimits.dml.insertRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Highest data insertion rate per collection per second.</li>
        <li>Setting this item to <code>5</code> indicates that Milvus only allows data insertion to any collection at the rate of 5 MB/s.</li>
        <li>To use this setting, set <code>quotaAndLimits.dml.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.dml.deleteRate.max`

<table id="quotaAndLimits.dml.deleteRate.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Highest data deletion rate per second.</li>
        <li>Setting this item to <code>0.1</code> indicates that Milvus only allows data deletion at the rate of 0.1 MB/s.</li>
        <li>To use this setting, set <code>quotaAndLimits.dml.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.dml.deleteRate.collection.max`

<table id="quotaAndLimits.dml.deleteRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Highest data deletion rate per second.</li>
        <li>Setting this item to <code>0.1</code> indicates that Milvus only allows data deletion from any collection at the rate of 0.1 MB/s.</li>
        <li>To use this setting, set <code>quotaAndLimits.dml.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.dql.enabled`

<table id="quotaAndLimits.dql.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether DQL request throttling is enabled.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.dql.searchRate.max`

<table id="quotaAndLimits.dql.searchRate.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum number of vectors to search per second.</li>
        <li>Setting this item to <code>100</code> indicates that Milvus only allows searching 100 vectors per second no matter whether these 100 vectors are all in one search or scattered across multiple searches.</li>
        <li>To use this setting, set <code>quotaAndLimits.dql.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.dql.searchRate.collection.max`

<table id="quotaAndLimits.dql.searchRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum number of vectors to search per collection per second.</li>
        <li>Setting this item to <code>100</code> indicates that Milvus only allows searching 100 vectors per second per collection no matter whether these 100 vectors are all in one search or scattered across multiple searches.</li>
        <li>To use this setting, set <code>quotaAndLimits.dql.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.dql.queryRate.max`

<table id="quotaAndLimits.dql.queryRate.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum number of queries per second.</li>
        <li>Setting this item to <code>100</code> indicates that Milvus only allows 100 queries per second.</li>
        <li>To use this setting, set <code>quotaAndLimits.dql.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.dql.queryRate.collection.max`

<table id="quotaAndLimits.dql.queryRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum number of queries per collection per second.</li>
        <li>Setting this item to <code>100</code> indicates that Milvus only allows 100 queries per collection per second.</li>
        <li>To use this setting, set <code>quotaAndLimits.dql.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.ttProtection.enabled`

<table id="quotaAndLimits.limitWriting.ttProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether the backpressure based on time tick delay is enabled.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay`

<table id="quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum time tick delay. A time tick delay is the difference between RootCoord TSO and the minimum time tick of all flow graphs on DataNodes and QueryNodes.</li>
        <li>Setting this item to <code>300</code> indicates that Milvus reduces the DML request rate as the delay increases and drops all DML requests once the delay reaches the set maximum in seconds.</li>
        <li>To use this setting, set <code>quotaAndLimits.limitWriting.ttProtection.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.memProtection.enabled`

<table id="quotaAndLimits.limitWriting.memProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether the backpressure based on memory water level is enabled.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel`

<table id="quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Low memory water level on DataNodes. The memory water level is the ratio between the used memory and total memory on DataNodes.</li>
        <li>Setting this item to <code>0.85</code> indicates that Milvus reduces the DML request rate as the memory water level on DataNodes reaches the set value.</li>
        <li>To use this setting, set <code>quotaAndLimits.limitWriting.memProtection.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>0.85</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel`

<table id="quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Low memory water level on QueryNodes. The memory water level is the ratio between the used memory and total memory on QueryNodes.</li>
        <li>Setting this item to <code>0.85</code> indicates that Milvus reduces the DML request rate as the memory water level on QueryNodes reaches the set value.</li>
        <li>To use this setting, set <code>quotaAndLimits.limitWriting.memProtection.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>0.85</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel`

<table id="quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>High memory water level on DataNodes. The memory water level is the ratio between the used memory and total memory on DataNodes.</li>
        <li>Setting this item to <code>0.95</code> indicates that Milvus drops all DML requests as the memory water level on DataNodes reaches the set value.</li>
        <li>To use this setting, set <code>quotaAndLimits.limitWriting.memProtection.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>0.95</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel`

<table id="quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>High memory water level on QueryNodes. The memory water level is the ratio between the used memory and total memory on QueryNodes.</li>
        <li>Setting this item to <code>0.95</code> indicates that Milvus drops all DML requests as the memory water level on QueryNodes reaches the set value.</li>
        <li>To use this setting, set <code>quotaAndLimits.limitWriting.memProtection.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>0.95</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.diskProtection.enabled`

<table id="quotaAndLimits.limitWriting.diskProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether the backpressure based on disk quota is enabled.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.diskProtection.diskQuota`

<table id="quotaAndLimits.limitWriting.diskProtection.diskQuota">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Disk quota allocated to binlog.</li>
        <li>Setting this item to <code>8192</code> indicates that Milvus drops all DML requests as the size of binlog reaches the set value.</li>
        <li>To use this setting, set <code>quotaAndLimits.limitWriting.diskProtection.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection`

<table id="quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Disk quota allocated to binlog per collection.</li>
        <li>Setting this item to <code>8192</code> indicates that Milvus drops all DML requests in a collection as the size of binlog of the collection reaches the set value.</li>
        <li>To use this setting, set <code>quotaAndLimits.limitWriting.diskProtection.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.forceDeny`

<table id="quotaAndLimits.limitWriting.forceDeny">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether to manually configure Milvus to drop all DML requests.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitReading.queueProtection.enabled`

<table id="quotaAndLimits.limitReading.queueProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether the backpressure based on the lengths of the search and query queue is enabled.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold`

<table id="quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum number of search vectors or queries. Note that a search request containing multiple search vectors are regarded as multiple seaches, while a query is the same as a search request containing only one search vector.</li>
        <li>Setting this item to <code>10000</code> indicates that Milvus reduces the DQL request rate as the number of searches and queries reaches the set maximum in milliseconds, and the backpressure is resolved when the number decreases below the set value. The reduction rate id determined by <code>quotaAndLimits.limitReading.coolOffSpeed</code>.</li>
        <li>To use this setting, set <code>quotaAndLimits.limitReading.queueProtection.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold`

<table id="quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Average latency of the queued searches and queries. Note that a search request containing multiple search vectors are regarded as multiple seaches, while a query is the same as a search request containing only one search vector.</li>
        <li>Setting this item to <code>200</code> indicates that Milvus reduces the DQL request rate as the average latency reaches the set maximum in milliseconds, and the backpressure is resolved when the number decreases below the set value in milliseconds. The reduction rate id determined by <code>quotaAndLimits.limitReading.coolOffSpeed</code>.</li>
        <li>To use this setting, set <code>quotaAndLimits.limitReading.queueProtection.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitReading.resultProtection.enabled`

<table id="quotaAndLimits.limitReading.resultProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether the backpressure based on the rate of the query results is enabled.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitReading.resultProtection.maxReadResultRate`

<table id="quotaAndLimits.limitReading.resultProtection.maxReadResultRate">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Rate of the data returned to the client. </li>
        <li>Setting this item to <code>2</code> indicates that Milvus reduces the DQL request rate as the data rate reaches the set maximum in MB/s, and the backpressure is resolved when the number decreases below the set value in MB/s. The reduction rate id determined by <code>quotaAndLimits.limitReading.coolOffSpeed</code>.</li>
        <li>To use this setting, set <code>quotaAndLimits.limitReading.resultProtection.enabled</code> to <code>true</code> at the same time.</li>
      </td>
      <td>∞</td>
    </tr>
  </tbody>
</table>

## `quotaAndLimits.limitWriting.forceDeny`

<table id="quotaAndLimits.limitWriting.forceDeny">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether to manually configure Milvus to drop all DQL requests.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>
