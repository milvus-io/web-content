---
id: configure_datanode.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure dataNode for Milvus.
---

# dataNode-related Configurations



## `dataNode.dataSync.flowGraph.maxQueueLength`

<table id="dataNode.dataSync.flowGraph.maxQueueLength">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum length of task queue in flowgraph      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `dataNode.dataSync.flowGraph.maxParallelism`

<table id="dataNode.dataSync.flowGraph.maxParallelism">
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


## `dataNode.dataSync.maxParallelSyncMgrTasks`

<table id="dataNode.dataSync.maxParallelSyncMgrTasks">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The max concurrent sync task number of datanode sync mgr globally      </td>
      <td>256</td>
    </tr>
  </tbody>
</table>


## `dataNode.dataSync.skipMode.enable`

<table id="dataNode.dataSync.skipMode.enable">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Support skip some timetick message to reduce CPU usage      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `dataNode.dataSync.skipMode.skipNum`

<table id="dataNode.dataSync.skipMode.skipNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Consume one for every n records skipped      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>


## `dataNode.dataSync.skipMode.coldTime`

<table id="dataNode.dataSync.skipMode.coldTime">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Turn on skip mode after there are only timetick msg for x seconds      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


## `dataNode.segment.insertBufSize`

<table id="dataNode.segment.insertBufSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each binlog file in a segment buffered in memory. Binlog files whose size exceeds this value are then flushed to MinIO or S3 service.</li>      
        <li>Unit: Byte</li>      
        <li>Setting this parameter too small causes the system to store a small amount of data too frequently. Setting it too large increases the system's demand for memory.</li>      </td>
      <td>16777216</td>
    </tr>
  </tbody>
</table>


## `dataNode.segment.deleteBufBytes`

<table id="dataNode.segment.deleteBufBytes">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Max buffer size in bytes to flush del for a single channel, default as 16MB      </td>
      <td>16777216</td>
    </tr>
  </tbody>
</table>


## `dataNode.segment.syncPeriod`

<table id="dataNode.segment.syncPeriod">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The period to sync segments if buffer is not empty.      </td>
      <td>600</td>
    </tr>
  </tbody>
</table>


## `dataNode.memory.forceSyncEnable`

<table id="dataNode.memory.forceSyncEnable">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Set true to force sync if memory usage is too high      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `dataNode.memory.forceSyncSegmentNum`

<table id="dataNode.memory.forceSyncSegmentNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        number of segments to sync, segments with top largest buffer will be synced.      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>


## `dataNode.memory.checkInterval`

<table id="dataNode.memory.checkInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the interal to check datanode memory usage, in milliseconds      </td>
      <td>3000</td>
    </tr>
  </tbody>
</table>


## `dataNode.memory.forceSyncWatermark`

<table id="dataNode.memory.forceSyncWatermark">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        memory watermark for standalone, upon reaching this watermark, segments will be synced.      </td>
      <td>0.5</td>
    </tr>
  </tbody>
</table>


## `dataNode.channel.workPoolSize`

<table id="dataNode.channel.workPoolSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>specify the size of global work pool of all channels</li>      
        <li>if this parameter <= 0, will set it as the maximum number of CPUs that can be executing</li>      
        <li>suggest to set it bigger on large collection numbers to avoid blocking</li>      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `dataNode.channel.updateChannelCheckpointMaxParallel`

<table id="dataNode.channel.updateChannelCheckpointMaxParallel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>specify the size of global work pool for channel checkpoint updating</li>      
        <li>if this parameter <= 0, will set it as 10</li>      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `dataNode.channel.updateChannelCheckpointInterval`

<table id="dataNode.channel.updateChannelCheckpointInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the interval duration(in seconds) for datanode to update channel checkpoint of each channel      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


## `dataNode.channel.updateChannelCheckpointRPCTimeout`

<table id="dataNode.channel.updateChannelCheckpointRPCTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        timeout in seconds for UpdateChannelCheckpoint RPC call      </td>
      <td>20</td>
    </tr>
  </tbody>
</table>


## `dataNode.channel.maxChannelCheckpointsPerPRC`

<table id="dataNode.channel.maxChannelCheckpointsPerPRC">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of channel checkpoints per UpdateChannelCheckpoint RPC.      </td>
      <td>128</td>
    </tr>
  </tbody>
</table>


## `dataNode.channel.channelCheckpointUpdateTickInSeconds`

<table id="dataNode.channel.channelCheckpointUpdateTickInSeconds">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The frequency, in seconds, at which the channel checkpoint updater executes updates.      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `dataNode.import.maxConcurrentTaskNum`

<table id="dataNode.import.maxConcurrentTaskNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of import/pre-import tasks allowed to run concurrently on a datanode.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `dataNode.import.maxImportFileSizeInGB`

<table id="dataNode.import.maxImportFileSizeInGB">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum file size (in GB) for an import file, where an import file refers to either a Row-Based file or a set of Column-Based files.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `dataNode.import.readBufferSizeInMB`

<table id="dataNode.import.readBufferSizeInMB">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The data block size (in MB) read from chunk manager by the datanode during import.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `dataNode.import.maxTaskSlotNum`

<table id="dataNode.import.maxTaskSlotNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of slots occupied by each import/pre-import task.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `dataNode.compaction.levelZeroBatchMemoryRatio`

<table id="dataNode.compaction.levelZeroBatchMemoryRatio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The minimal memory ratio of free memory for level zero compaction executing in batch mode      </td>
      <td>0.5</td>
    </tr>
  </tbody>
</table>


## `dataNode.compaction.levelZeroMaxBatchSize`

<table id="dataNode.compaction.levelZeroMaxBatchSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Max batch size refers to the max number of L1/L2 segments in a batch when executing L0 compaction. Default to -1, any value that is less than 1 means no limit. Valid range: >= 1.      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `dataNode.compaction.useMergeSort`

<table id="dataNode.compaction.useMergeSort">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether to enable mergeSort mode when performing mixCompaction.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `dataNode.compaction.maxSegmentMergeSort`

<table id="dataNode.compaction.maxSegmentMergeSort">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of segments to be merged in mergeSort mode.      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>


## `dataNode.gracefulStopTimeout`

<table id="dataNode.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        seconds. force stop node without graceful stop      </td>
      <td>1800</td>
    </tr>
  </tbody>
</table>


## `dataNode.slot.slotCap`

<table id="dataNode.slot.slotCap">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of tasks(e.g. compaction, importing) allowed to run concurrently on a datanode      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `dataNode.clusteringCompaction.memoryBufferRatio`

<table id="dataNode.clusteringCompaction.memoryBufferRatio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The ratio of memory buffer of clustering compaction. Data larger than threshold will be flushed to storage.      </td>
      <td>0.3</td>
    </tr>
  </tbody>
</table>


## `dataNode.clusteringCompaction.workPoolSize`

<table id="dataNode.clusteringCompaction.workPoolSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        worker pool size for one clustering compaction job.      </td>
      <td>8</td>
    </tr>
  </tbody>
</table>


## `dataNode.bloomFilterApplyParallelFactor`

<table id="dataNode.bloomFilterApplyParallelFactor">
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


## `dataNode.storage.deltalog`

<table id="dataNode.storage.deltalog">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        deltalog format, options: [json, parquet]      </td>
      <td>json</td>
    </tr>
  </tbody>
</table>


## `dataNode.ip`

<table id="dataNode.ip">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP address of dataNode. If not specified, use the first unicastable address      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `dataNode.port`

<table id="dataNode.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP port of dataNode      </td>
      <td>21124</td>
    </tr>
  </tbody>
</table>


## `dataNode.grpc.serverMaxSendSize`

<table id="dataNode.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the dataNode can send, unit: byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


## `dataNode.grpc.serverMaxRecvSize`

<table id="dataNode.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the dataNode can receive, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `dataNode.grpc.clientMaxSendSize`

<table id="dataNode.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on dataNode can send, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `dataNode.grpc.clientMaxRecvSize`

<table id="dataNode.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on dataNode can receive, unit: byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


