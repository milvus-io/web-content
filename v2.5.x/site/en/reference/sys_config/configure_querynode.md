---
id: configure_querynode.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure queryNode for Milvus.
---

# queryNode-related Configurations

Related configuration of queryNode, used to run hybrid search between vector and scalar data.

## `queryNode.stats.publishInterval`

<table id="queryNode.stats.publishInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The interval that query node publishes the node statistics information, including segment status, cpu usage, memory usage, health status, etc. Unit: ms.      </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>


## `queryNode.segcore.knowhereThreadPoolNumRatio`

<table id="queryNode.segcore.knowhereThreadPoolNumRatio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The number of threads in knowhere's thread pool. If disk is enabled, the pool size will multiply with knowhereThreadPoolNumRatio([1, 32]).      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>


## `queryNode.segcore.chunkRows`

<table id="queryNode.segcore.chunkRows">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Row count by which Segcore divides a segment into chunks.      </td>
      <td>128</td>
    </tr>
  </tbody>
</table>


## `queryNode.segcore.interimIndex.enableIndex`

<table id="queryNode.segcore.interimIndex.enableIndex">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Whether to create a temporary index for growing segments and sealed segments not yet indexed, improving search performance.</li>      
        <li>Milvus will eventually seals and indexes all segments, but enabling this optimizes search performance for immediate queries following data insertion.</li>      
        <li>This defaults to true, indicating that Milvus creates temporary index for growing segments and the sealed segments that are not indexed upon searches.</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `queryNode.segcore.interimIndex.nlist`

<table id="queryNode.segcore.interimIndex.nlist">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        temp index nlist, recommend to set sqrt(chunkRows), must smaller than chunkRows/8      </td>
      <td>128</td>
    </tr>
  </tbody>
</table>


## `queryNode.segcore.interimIndex.nprobe`

<table id="queryNode.segcore.interimIndex.nprobe">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        nprobe to search small index, based on your accuracy requirement, must smaller than nlist      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `queryNode.segcore.interimIndex.memExpansionRate`

<table id="queryNode.segcore.interimIndex.memExpansionRate">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        extra memory needed by building interim index      </td>
      <td>1.15</td>
    </tr>
  </tbody>
</table>


## `queryNode.segcore.interimIndex.buildParallelRate`

<table id="queryNode.segcore.interimIndex.buildParallelRate">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the ratio of building interim index parallel matched with cpu num      </td>
      <td>0.5</td>
    </tr>
  </tbody>
</table>


## `queryNode.segcore.multipleChunkedEnable`

<table id="queryNode.segcore.multipleChunkedEnable">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable multiple chunked search      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `queryNode.segcore.knowhereScoreConsistency`

<table id="queryNode.segcore.knowhereScoreConsistency">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable knowhere strong consistency score computation logic      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `queryNode.loadMemoryUsageFactor`

<table id="queryNode.loadMemoryUsageFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The multiply factor of calculating the memory usage while loading segments      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>


## `queryNode.enableDisk`

<table id="queryNode.enableDisk">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        enable querynode load disk index, and search on disk index      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `queryNode.cache.memoryLimit`

<table id="queryNode.cache.memoryLimit">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        2 GB, 2 * 1024 *1024 *1024      </td>
      <td>2147483648</td>
    </tr>
  </tbody>
</table>


## `queryNode.cache.readAheadPolicy`

<table id="queryNode.cache.readAheadPolicy">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The read ahead policy of chunk cache, options: `normal, random, sequential, willneed, dontneed`      </td>
      <td>willneed</td>
    </tr>
  </tbody>
</table>


## `queryNode.cache.warmup`

<table id="queryNode.cache.warmup">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>options: async, sync, disable. </li>      
        <li>Specifies the necessity for warming up the chunk cache. </li>      
        <li>1. If set to "sync" or "async" the original vector data will be synchronously/asynchronously loaded into the </li>      
        <li>chunk cache during the load process. This approach has the potential to substantially reduce query/search latency</li>      
        <li>for a specific duration post-load, albeit accompanied by a concurrent increase in disk usage;</li>      
        <li>2. If set to "disable" original vector data will only be loaded into the chunk cache during search/query.</li>      </td>
      <td>disable</td>
    </tr>
  </tbody>
</table>


## `queryNode.mmap.vectorField`

<table id="queryNode.mmap.vectorField">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable mmap for loading vector data      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `queryNode.mmap.vectorIndex`

<table id="queryNode.mmap.vectorIndex">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable mmap for loading vector index      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `queryNode.mmap.scalarField`

<table id="queryNode.mmap.scalarField">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable mmap for loading scalar data      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `queryNode.mmap.scalarIndex`

<table id="queryNode.mmap.scalarIndex">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable mmap for loading scalar index      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `queryNode.mmap.chunkCache`

<table id="queryNode.mmap.chunkCache">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable mmap for chunk cache (raw vector retrieving).      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `queryNode.mmap.growingMmapEnabled`

<table id="queryNode.mmap.growingMmapEnabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Enable memory mapping (mmap) to optimize the handling of growing raw data. </li>      
        <li>By activating this feature, the memory overhead associated with newly added or modified data will be significantly minimized. </li>      
        <li>However, this optimization may come at the cost of a slight decrease in query latency for the affected data segments.</li>      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `queryNode.mmap.fixedFileSizeForMmapAlloc`

<table id="queryNode.mmap.fixedFileSizeForMmapAlloc">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tmp file size for mmap chunk manager      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>


## `queryNode.mmap.maxDiskUsagePercentageForMmapAlloc`

<table id="queryNode.mmap.maxDiskUsagePercentageForMmapAlloc">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        disk percentage used in mmap chunk manager      </td>
      <td>50</td>
    </tr>
  </tbody>
</table>


## `queryNode.lazyload.enabled`

<table id="queryNode.lazyload.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable lazyload for loading data      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `queryNode.lazyload.waitTimeout`

<table id="queryNode.lazyload.waitTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        max wait timeout duration in milliseconds before start to do lazyload search and retrieve      </td>
      <td>30000</td>
    </tr>
  </tbody>
</table>


## `queryNode.lazyload.requestResourceTimeout`

<table id="queryNode.lazyload.requestResourceTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        max timeout in milliseconds for waiting request resource for lazy load, 5s by default      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>


## `queryNode.lazyload.requestResourceRetryInterval`

<table id="queryNode.lazyload.requestResourceRetryInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        retry interval in milliseconds for waiting request resource for lazy load, 2s by default      </td>
      <td>2000</td>
    </tr>
  </tbody>
</table>


## `queryNode.lazyload.maxRetryTimes`

<table id="queryNode.lazyload.maxRetryTimes">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        max retry times for lazy load, 1 by default      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>


## `queryNode.lazyload.maxEvictPerRetry`

<table id="queryNode.lazyload.maxEvictPerRetry">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        max evict count for lazy load, 1 by default      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>


## `queryNode.indexOffsetCacheEnabled`

<table id="queryNode.indexOffsetCacheEnabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        enable index offset cache for some scalar indexes, now is just for bitmap index, enable this param can improve performance for retrieving raw data from index      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `queryNode.scheduler.maxReadConcurrentRatio`

<table id="queryNode.scheduler.maxReadConcurrentRatio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>maxReadConcurrentRatio is the concurrency ratio of read task (search task and query task).</li>      
        <li>Max read concurrency would be the value of hardware.GetCPUNum * maxReadConcurrentRatio.</li>      
        <li>It defaults to 2.0, which means max read concurrency would be the value of hardware.GetCPUNum * 2.</li>      
        <li>Max read concurrency must greater than or equal to 1, and less than or equal to hardware.GetCPUNum * 100.</li>      
        <li>(0, 100]</li>      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>


## `queryNode.scheduler.cpuRatio`

<table id="queryNode.scheduler.cpuRatio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ratio used to estimate read task cpu usage.      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `queryNode.scheduler.scheduleReadPolicy.name`

<table id="queryNode.scheduler.scheduleReadPolicy.name">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>fifo: A FIFO queue support the schedule.</li>      
        <li>user-task-polling:</li>      
        <li>	The user's tasks will be polled one by one and scheduled.</li>      
        <li>	Scheduling is fair on task granularity.</li>      
        <li>	The policy is based on the username for authentication.</li>      
        <li>	And an empty username is considered the same user.</li>      
        <li>	When there are no multi-users, the policy decay into FIFO"</li>      </td>
      <td>fifo</td>
    </tr>
  </tbody>
</table>


## `queryNode.scheduler.scheduleReadPolicy.taskQueueExpire`

<table id="queryNode.scheduler.scheduleReadPolicy.taskQueueExpire">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Control how long (many seconds) that queue retains since queue is empty      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


## `queryNode.scheduler.scheduleReadPolicy.enableCrossUserGrouping`

<table id="queryNode.scheduler.scheduleReadPolicy.enableCrossUserGrouping">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable Cross user grouping when using user-task-polling policy. (Disable it if user's task can not merge each other)      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `queryNode.scheduler.scheduleReadPolicy.maxPendingTaskPerUser`

<table id="queryNode.scheduler.scheduleReadPolicy.maxPendingTaskPerUser">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Max pending task per user in scheduler      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>


## `queryNode.levelZeroForwardPolicy`

<table id="queryNode.levelZeroForwardPolicy">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        delegator level zero deletion forward policy, possible option["FilterByBF", "RemoteLoad"]      </td>
      <td>FilterByBF</td>
    </tr>
  </tbody>
</table>


## `queryNode.streamingDeltaForwardPolicy`

<table id="queryNode.streamingDeltaForwardPolicy">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        delegator streaming deletion forward policy, possible option["FilterByBF", "Direct"]      </td>
      <td>FilterByBF</td>
    </tr>
  </tbody>
</table>


## `queryNode.dataSync.flowGraph.maxQueueLength`

<table id="queryNode.dataSync.flowGraph.maxQueueLength">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of task queue cache in flow graph in query node.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `queryNode.dataSync.flowGraph.maxParallelism`

<table id="queryNode.dataSync.flowGraph.maxParallelism">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum number of tasks executed in parallel in the flowgraph      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>


## `queryNode.enableSegmentPrune`

<table id="queryNode.enableSegmentPrune">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        use partition stats to prune data in search/query on shard delegator      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `queryNode.queryStreamBatchSize`

<table id="queryNode.queryStreamBatchSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        return min batch size of stream query      </td>
      <td>4194304</td>
    </tr>
  </tbody>
</table>


## `queryNode.queryStreamMaxBatchSize`

<table id="queryNode.queryStreamMaxBatchSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        return max batch size of stream query      </td>
      <td>134217728</td>
    </tr>
  </tbody>
</table>


## `queryNode.bloomFilterApplyParallelFactor`

<table id="queryNode.bloomFilterApplyParallelFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        parallel factor when to apply pk to bloom filter, default to 4*CPU_CORE_NUM      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>


## `queryNode.workerPooling.size`

<table id="queryNode.workerPooling.size">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the size for worker querynode client pool      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `queryNode.ip`

<table id="queryNode.ip">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP address of queryNode. If not specified, use the first unicastable address      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `queryNode.port`

<table id="queryNode.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP port of queryNode      </td>
      <td>21123</td>
    </tr>
  </tbody>
</table>


## `queryNode.grpc.serverMaxSendSize`

<table id="queryNode.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the queryNode can send, unit: byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


## `queryNode.grpc.serverMaxRecvSize`

<table id="queryNode.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the queryNode can receive, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `queryNode.grpc.clientMaxSendSize`

<table id="queryNode.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on queryNode can send, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `queryNode.grpc.clientMaxRecvSize`

<table id="queryNode.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on queryNode can receive, unit: byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


