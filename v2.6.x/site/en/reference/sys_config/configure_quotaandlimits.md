---
id: configure_quotaandlimits.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure quotaAndLimits for Milvus.
---

# quotaAndLimits-related Configurations

QuotaConfig, configurations of Milvus quota and limits.

By default, we enable:

  1. TT protection;

  2. Memory protection.

  3. Disk quota protection.

You can enable:

  1. DML throughput limitation;

  2. DDL, DQL qps/rps limitation;

  3. DQL Queue length/latency protection;

  4. DQL result rate protection;

If necessary, you can also manually force to deny RW requests.

## `quotaAndLimits.enabled`

<table id="quotaAndLimits.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        `true` to enable quota and limits, `false` to disable.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.quotaCenterCollectInterval`

<table id="quotaAndLimits.quotaCenterCollectInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>quotaCenterCollectInterval is the time interval that quotaCenter</li>      
        <li>collects metrics from Proxies, Query cluster and Data cluster.</li>      
        <li>seconds, (0 ~ 65536)</li>      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limits.allocRetryTimes`

<table id="quotaAndLimits.limits.allocRetryTimes">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        retry times when delete alloc forward data from rate limit failed      </td>
      <td>15</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limits.allocWaitInterval`

<table id="quotaAndLimits.limits.allocWaitInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        retry wait duration when delete alloc forward data rate failed, in millisecond      </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limits.complexDeleteLimitEnable`

<table id="quotaAndLimits.limits.complexDeleteLimitEnable">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        whether complex delete check forward data by limiter      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limits.maxCollectionNumPerDB`

<table id="quotaAndLimits.limits.maxCollectionNumPerDB">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum number of collections per database.      </td>
      <td>65536</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limits.maxInsertSize`

<table id="quotaAndLimits.limits.maxInsertSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        maximum size of a single insert request, in bytes, -1 means no limit      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limits.maxResourceGroupNumOfQueryNode`

<table id="quotaAndLimits.limits.maxResourceGroupNumOfQueryNode">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        maximum number of resource groups of query nodes      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limits.maxGroupSize`

<table id="quotaAndLimits.limits.maxGroupSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        maximum size for one single group when doing search group by      </td>
      <td>10</td>
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
      <td>        Whether DDL request throttling is enabled.      </td>
      <td>false</td>
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
        <li>Setting this item to 10 indicates that Milvus processes no more than 10 collection-related DDL requests per second, including collection creation requests, collection drop requests, collection load requests, and collection release requests.</li>      
        <li>To use this setting, set quotaAndLimits.ddl.enabled to true at the same time.</li>      </td>
      <td>-1</td>
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
        <li>Setting this item to 10 indicates that Milvus processes no more than 10 partition-related requests per second, including partition creation requests, partition drop requests, partition load requests, and partition release requests.</li>      
        <li>To use this setting, set quotaAndLimits.ddl.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.ddl.db.collectionRate`

<table id="quotaAndLimits.ddl.db.collectionRate">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps of db level , default no limit, rate for CreateCollection, DropCollection, LoadCollection, ReleaseCollection      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.ddl.db.partitionRate`

<table id="quotaAndLimits.ddl.db.partitionRate">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps of db level, default no limit, rate for CreatePartition, DropPartition, LoadPartition, ReleasePartition      </td>
      <td>-1</td>
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
      <td>        Whether index-related request throttling is enabled.      </td>
      <td>false</td>
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
        <li>Setting this item to 10 indicates that Milvus processes no more than 10 partition-related requests per second, including index creation requests and index drop requests.</li>      
        <li>To use this setting, set quotaAndLimits.indexRate.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.indexRate.db.max`

<table id="quotaAndLimits.indexRate.db.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps of db level, default no limit, rate for CreateIndex, DropIndex      </td>
      <td>-1</td>
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
      <td>        Whether flush request throttling is enabled.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.flushRate.max`

<table id="quotaAndLimits.flushRate.max">
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
        <li>Setting this item to 10 indicates that Milvus processes no more than 10 flush requests per second.</li>      
        <li>To use this setting, set quotaAndLimits.flushRate.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.flushRate.collection.max`

<table id="quotaAndLimits.flushRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps, default no limit, rate for flush at collection level.      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.flushRate.db.max`

<table id="quotaAndLimits.flushRate.db.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps of db level, default no limit, rate for flush      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.compactionRate.enabled`

<table id="quotaAndLimits.compactionRate.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether manual compaction request throttling is enabled.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.compactionRate.max`

<table id="quotaAndLimits.compactionRate.max">
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
        <li>Setting this item to 10 indicates that Milvus processes no more than 10 manual-compaction requests per second.</li>      
        <li>To use this setting, set quotaAndLimits.compaction.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.compactionRate.db.max`

<table id="quotaAndLimits.compactionRate.db.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps of db level, default no limit, rate for manualCompaction      </td>
      <td>-1</td>
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
      <td>        Whether DML request throttling is enabled.      </td>
      <td>false</td>
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
        <li>Setting this item to 5 indicates that Milvus only allows data insertion at the rate of 5 MB/s.</li>      
        <li>To use this setting, set quotaAndLimits.dml.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.insertRate.db.max`

<table id="quotaAndLimits.dml.insertRate.db.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit      </td>
      <td>-1</td>
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
        <li>Setting this item to 5 indicates that Milvus only allows data insertion to any collection at the rate of 5 MB/s.</li>      
        <li>To use this setting, set quotaAndLimits.dml.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.insertRate.partition.max`

<table id="quotaAndLimits.dml.insertRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.upsertRate.max`

<table id="quotaAndLimits.dml.upsertRate.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.upsertRate.db.max`

<table id="quotaAndLimits.dml.upsertRate.db.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.upsertRate.collection.max`

<table id="quotaAndLimits.dml.upsertRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.upsertRate.partition.max`

<table id="quotaAndLimits.dml.upsertRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit      </td>
      <td>-1</td>
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
        <li>Setting this item to 0.1 indicates that Milvus only allows data deletion at the rate of 0.1 MB/s.</li>      
        <li>To use this setting, set quotaAndLimits.dml.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.deleteRate.db.max`

<table id="quotaAndLimits.dml.deleteRate.db.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit      </td>
      <td>-1</td>
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
        <li>Setting this item to 0.1 indicates that Milvus only allows data deletion from any collection at the rate of 0.1 MB/s.</li>      
        <li>To use this setting, set quotaAndLimits.dml.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.deleteRate.partition.max`

<table id="quotaAndLimits.dml.deleteRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.bulkLoadRate.max`

<table id="quotaAndLimits.dml.bulkLoadRate.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit, not support yet. TODO: limit bulkLoad rate      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.bulkLoadRate.db.max`

<table id="quotaAndLimits.dml.bulkLoadRate.db.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit, not support yet. TODO: limit db bulkLoad rate      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.bulkLoadRate.collection.max`

<table id="quotaAndLimits.dml.bulkLoadRate.collection.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit, not support yet. TODO: limit collection bulkLoad rate      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dml.bulkLoadRate.partition.max`

<table id="quotaAndLimits.dml.bulkLoadRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB/s, default no limit, not support yet. TODO: limit partition bulkLoad rate      </td>
      <td>-1</td>
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
      <td>        Whether DQL request throttling is enabled.      </td>
      <td>false</td>
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
        <li>Setting this item to 100 indicates that Milvus only allows searching 100 vectors per second no matter whether these 100 vectors are all in one search or scattered across multiple searches.</li>      
        <li>To use this setting, set quotaAndLimits.dql.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dql.searchRate.db.max`

<table id="quotaAndLimits.dql.searchRate.db.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        vps (vectors per second), default no limit      </td>
      <td>-1</td>
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
        <li>Setting this item to 100 indicates that Milvus only allows searching 100 vectors per second per collection no matter whether these 100 vectors are all in one search or scattered across multiple searches.</li>      
        <li>To use this setting, set quotaAndLimits.dql.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dql.searchRate.partition.max`

<table id="quotaAndLimits.dql.searchRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        vps (vectors per second), default no limit      </td>
      <td>-1</td>
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
        <li>Setting this item to 100 indicates that Milvus only allows 100 queries per second.</li>      
        <li>To use this setting, set quotaAndLimits.dql.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dql.queryRate.db.max`

<table id="quotaAndLimits.dql.queryRate.db.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps, default no limit      </td>
      <td>-1</td>
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
        <li>Setting this item to 100 indicates that Milvus only allows 100 queries per collection per second.</li>      
        <li>To use this setting, set quotaAndLimits.dql.enabled to true at the same time.</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.dql.queryRate.partition.max`

<table id="quotaAndLimits.dql.queryRate.partition.max">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        qps, default no limit      </td>
      <td>-1</td>
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
      <td>
        <li>forceDeny false means dml requests are allowed (except for some</li>      
        <li>specific conditions, such as memory of nodes to water marker), true means always reject all dml requests.</li>      </td>
      <td>false</td>
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
        <li>maxTimeTickDelay indicates the backpressure for DML Operations.</li>      
        <li>DML rates would be reduced according to the ratio of time tick delay to maxTimeTickDelay,</li>      
        <li>if time tick delay is greater than maxTimeTickDelay, all DML requests would be rejected.</li>      
        <li>seconds</li>      </td>
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
      <td>
        <li>When memory usage > memoryHighWaterLevel, all dml requests would be rejected;</li>      
        <li>When memoryLowWaterLevel < memory usage < memoryHighWaterLevel, reduce the dml rate;</li>      
        <li>When memory usage < memoryLowWaterLevel, no action.</li>      </td>
      <td>true</td>
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
      <td>        (0, 1], memoryLowWaterLevel in DataNodes      </td>
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
      <td>        (0, 1], memoryHighWaterLevel in DataNodes      </td>
      <td>0.95</td>
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
      <td>        (0, 1], memoryLowWaterLevel in QueryNodes      </td>
      <td>0.85</td>
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
      <td>        (0, 1], memoryHighWaterLevel in QueryNodes      </td>
      <td>0.95</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.growingSegmentsSizeProtection.enabled`

<table id="quotaAndLimits.limitWriting.growingSegmentsSizeProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>No action will be taken if the growing segments size is less than the low watermark.</li>      
        <li>When the growing segments size exceeds the low watermark, the dml rate will be reduced,</li>      
        <li>but the rate will not be lower than minRateRatio * dmlRate.</li>      </td>
      <td>false</td>
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
      <td>        When the total file size of object storage is greater than `diskQuota`, all dml requests would be rejected;      </td>
      <td>true</td>
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
      <td>        MB, (0, +inf), default no limit      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.diskProtection.diskQuotaPerDB`

<table id="quotaAndLimits.limitWriting.diskProtection.diskQuotaPerDB">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB, (0, +inf), default no limit      </td>
      <td>-1</td>
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
      <td>        MB, (0, +inf), default no limit      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.diskProtection.diskQuotaPerPartition`

<table id="quotaAndLimits.limitWriting.diskProtection.diskQuotaPerPartition">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MB, (0, +inf), default no limit      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.enabled`

<table id="quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        switch to enable l0 segment row count quota      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.lowWaterLevel`

<table id="quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.lowWaterLevel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        l0 segment row count quota, low water level      </td>
      <td>30000000</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.highWaterLevel`

<table id="quotaAndLimits.limitWriting.l0SegmentsRowCountProtection.highWaterLevel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        l0 segment row count quota, high water level      </td>
      <td>50000000</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.deleteBufferRowCountProtection.enabled`

<table id="quotaAndLimits.limitWriting.deleteBufferRowCountProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        switch to enable delete buffer row count quota      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.deleteBufferRowCountProtection.lowWaterLevel`

<table id="quotaAndLimits.limitWriting.deleteBufferRowCountProtection.lowWaterLevel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        delete buffer row count quota, low water level      </td>
      <td>32768</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.deleteBufferRowCountProtection.highWaterLevel`

<table id="quotaAndLimits.limitWriting.deleteBufferRowCountProtection.highWaterLevel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        delete buffer row count quota, high water level      </td>
      <td>65536</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.deleteBufferSizeProtection.enabled`

<table id="quotaAndLimits.limitWriting.deleteBufferSizeProtection.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        switch to enable delete buffer size quota      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.deleteBufferSizeProtection.lowWaterLevel`

<table id="quotaAndLimits.limitWriting.deleteBufferSizeProtection.lowWaterLevel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        delete buffer size quota, low water level      </td>
      <td>134217728</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitWriting.deleteBufferSizeProtection.highWaterLevel`

<table id="quotaAndLimits.limitWriting.deleteBufferSizeProtection.highWaterLevel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        delete buffer size quota, high water level      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `quotaAndLimits.limitReading.forceDeny`

<table id="quotaAndLimits.limitReading.forceDeny">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>forceDeny false means dql requests are allowed (except for some</li>      
        <li>specific conditions, such as collection has been dropped), true means always reject all dql requests.</li>      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


