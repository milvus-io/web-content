---
id: configure_datacoord.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure dataCoord for Milvus.
---

# dataCoord-related Configurations



## `dataCoord.channel.watchTimeoutInterval`

<table id="dataCoord.channel.watchTimeoutInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Timeout on watching channels (in seconds). Datanode tickler update watch progress will reset timeout timer.      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>


## `dataCoord.channel.legacyVersionWithoutRPCWatch`

<table id="dataCoord.channel.legacyVersionWithoutRPCWatch">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Datanodes <= this version are considered as legacy nodes, which doesn't have rpc based watch(). This is only used during rolling upgrade where legacy nodes won't get new channels      </td>
      <td>2.4.1</td>
    </tr>
  </tbody>
</table>


## `dataCoord.channel.balanceSilentDuration`

<table id="dataCoord.channel.balanceSilentDuration">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The duration after which the channel manager start background channel balancing      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>


## `dataCoord.channel.balanceInterval`

<table id="dataCoord.channel.balanceInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The interval with which the channel manager check dml channel balance status      </td>
      <td>360</td>
    </tr>
  </tbody>
</table>


## `dataCoord.channel.checkInterval`

<table id="dataCoord.channel.checkInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The interval in seconds with which the channel manager advances channel states      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>


## `dataCoord.channel.notifyChannelOperationTimeout`

<table id="dataCoord.channel.notifyChannelOperationTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Timeout notifing channel operations (in seconds).      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.maxSize`

<table id="dataCoord.segment.maxSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of a segment, unit: MB. datacoord.segment.maxSize and datacoord.segment.sealProportion together determine if a segment can be sealed.      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.diskSegmentMaxSize`

<table id="dataCoord.segment.diskSegmentMaxSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximun size of a segment in MB for collection which has Disk index      </td>
      <td>2048</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.sealProportion`

<table id="dataCoord.segment.sealProportion">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The minimum proportion to datacoord.segment.maxSize to seal a segment. datacoord.segment.maxSize and datacoord.segment.sealProportion together determine if a segment can be sealed.      </td>
      <td>0.12</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.sealProportionJitter`

<table id="dataCoord.segment.sealProportionJitter">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        segment seal proportion jitter ratio, default value 0.1(10%), if seal proportion is 12%, with jitter=0.1, the actuall applied ratio will be 10.8~12%      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.assignmentExpiration`

<table id="dataCoord.segment.assignmentExpiration">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Expiration time of the segment assignment, unit: ms      </td>
      <td>2000</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.allocLatestExpireAttempt`

<table id="dataCoord.segment.allocLatestExpireAttempt">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The time attempting to alloc latest lastExpire from rootCoord after restart      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.maxLife`

<table id="dataCoord.segment.maxLife">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The max lifetime of segment in seconds, 24*60*60      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.maxIdleTime`

<table id="dataCoord.segment.maxIdleTime">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>If a segment didn't accept dml records in maxIdleTime and the size of segment is greater than</li>      
        <li>minSizeFromIdleToSealed, Milvus will automatically seal it.</li>      
        <li>The max idle time of segment in seconds, 10*60.</li>      </td>
      <td>600</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.minSizeFromIdleToSealed`

<table id="dataCoord.segment.minSizeFromIdleToSealed">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The min size in MB of segment which can be idle from sealed.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.maxBinlogFileNumber`

<table id="dataCoord.segment.maxBinlogFileNumber">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The max number of binlog (which is equal to the binlog file num of primary key) for one segment, </li>      
        <li>the segment will be sealed if the number of binlog file reaches to max value.</li>      </td>
      <td>32</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.smallProportion`

<table id="dataCoord.segment.smallProportion">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The segment is considered as "small segment" when its # of rows is smaller than      </td>
      <td>0.5</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.compactableProportion`

<table id="dataCoord.segment.compactableProportion">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>(smallProportion * segment max # of rows).</li>      
        <li>A compaction will happen on small segments if the segment after compaction will have</li>      </td>
      <td>0.85</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.expansionRate`

<table id="dataCoord.segment.expansionRate">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>over (compactableProportion * segment max # of rows) rows.</li>      
        <li>MUST BE GREATER THAN OR EQUAL TO <smallProportion>!!!</li>      
        <li>During compaction, the size of segment # of rows is able to exceed segment max # of rows by (expansionRate-1) * 100%. </li>      </td>
      <td>1.25</td>
    </tr>
  </tbody>
</table>


## `dataCoord.sealPolicy.channel.growingSegmentsMemSize`

<table id="dataCoord.sealPolicy.channel.growingSegmentsMemSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The size threshold in MB, if the total size of growing segments of each shard </li>      
        <li>exceeds this threshold, the largest growing segment will be sealed.</li>      </td>
      <td>4096</td>
    </tr>
  </tbody>
</table>


## `dataCoord.autoUpgradeSegmentIndex`

<table id="dataCoord.autoUpgradeSegmentIndex">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        whether auto upgrade segment index to index engine's version      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segmentFlushInterval`

<table id="dataCoord.segmentFlushInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the minimal interval duration(unit: Seconds) between flusing operation on same segment      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>


## `dataCoord.enableCompaction`

<table id="dataCoord.enableCompaction">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Switch value to control if to enable segment compaction. </li>      
        <li>Compaction merges small-size segments into a large segment, and clears the entities deleted beyond the rentention duration of Time Travel.</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.enableAutoCompaction`

<table id="dataCoord.compaction.enableAutoCompaction">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Switch value to control if to enable automatic segment compaction during which data coord locates and merges compactable segments in the background.</li>      
        <li>This configuration takes effect only when dataCoord.enableCompaction is set as true.</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.taskPrioritizer`

<table id="dataCoord.compaction.taskPrioritizer">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>compaction task prioritizer, options: [default, level, mix]. </li>      
        <li>default is FIFO.</li>      
        <li>level is prioritized by level: L0 compactions first, then mix compactions, then clustering compactions.</li>      
        <li>mix is prioritized by level: mix compactions first, then L0 compactions, then clustering compactions.</li>      </td>
      <td>default</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.taskQueueCapacity`

<table id="dataCoord.compaction.taskQueueCapacity">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        compaction task queue size      </td>
      <td>100000</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.dropTolerance`

<table id="dataCoord.compaction.dropTolerance">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Compaction task will be cleaned after finish longer than this time(in seconds)      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.gcInterval`

<table id="dataCoord.compaction.gcInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The time interval in seconds for compaction gc      </td>
      <td>1800</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.mix.triggerInterval`

<table id="dataCoord.compaction.mix.triggerInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The time interval in seconds to trigger mix compaction      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.levelzero.triggerInterval`

<table id="dataCoord.compaction.levelzero.triggerInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The time interval in seconds for trigger L0 compaction      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.levelzero.forceTrigger.minSize`

<table id="dataCoord.compaction.levelzero.forceTrigger.minSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The minmum size in bytes to force trigger a LevelZero Compaction, default as 8MB      </td>
      <td>8388608</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.levelzero.forceTrigger.maxSize`

<table id="dataCoord.compaction.levelzero.forceTrigger.maxSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maxmum size in bytes to force trigger a LevelZero Compaction, default as 64MB      </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.levelzero.forceTrigger.deltalogMinNum`

<table id="dataCoord.compaction.levelzero.forceTrigger.deltalogMinNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The minimum number of deltalog files to force trigger a LevelZero Compaction      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.levelzero.forceTrigger.deltalogMaxNum`

<table id="dataCoord.compaction.levelzero.forceTrigger.deltalogMaxNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maxmum number of deltalog files to force trigger a LevelZero Compaction, default as 30      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.single.ratio.threshold`

<table id="dataCoord.compaction.single.ratio.threshold">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The ratio threshold of a segment to trigger a single compaction, default as 0.2      </td>
      <td>0.2</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.single.deltalog.maxsize`

<table id="dataCoord.compaction.single.deltalog.maxsize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The deltalog size of a segment to trigger a single compaction, default as 16MB      </td>
      <td>16777216</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.single.deltalog.maxnum`

<table id="dataCoord.compaction.single.deltalog.maxnum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The deltalog count of a segment to trigger a compaction, default as 200      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.single.expiredlog.maxsize`

<table id="dataCoord.compaction.single.expiredlog.maxsize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The expired log size of a segment to trigger a compaction, default as 10MB      </td>
      <td>10485760</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.enable`

<table id="dataCoord.compaction.clustering.enable">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable clustering compaction      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.autoEnable`

<table id="dataCoord.compaction.clustering.autoEnable">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable auto clustering compaction      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.triggerInterval`

<table id="dataCoord.compaction.clustering.triggerInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        clustering compaction trigger interval in seconds      </td>
      <td>600</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.minInterval`

<table id="dataCoord.compaction.clustering.minInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The minimum interval between clustering compaction executions of one collection, to avoid redundant compaction      </td>
      <td>3600</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.maxInterval`

<table id="dataCoord.compaction.clustering.maxInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        If a collection haven't been clustering compacted for longer than maxInterval, force compact      </td>
      <td>259200</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.newDataSizeThreshold`

<table id="dataCoord.compaction.clustering.newDataSizeThreshold">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        If new data size is large than newDataSizeThreshold, execute clustering compaction      </td>
      <td>512m</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.maxTrainSizeRatio`

<table id="dataCoord.compaction.clustering.maxTrainSizeRatio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        max data size ratio in Kmeans train, if larger than it, will down sampling to meet this limit      </td>
      <td>0.8</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.maxCentroidsNum`

<table id="dataCoord.compaction.clustering.maxCentroidsNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        maximum centroids number in Kmeans train      </td>
      <td>10240</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.minCentroidsNum`

<table id="dataCoord.compaction.clustering.minCentroidsNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        minimum centroids number in Kmeans train      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.minClusterSizeRatio`

<table id="dataCoord.compaction.clustering.minClusterSizeRatio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        minimum cluster size / avg size in Kmeans train      </td>
      <td>0.01</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.maxClusterSizeRatio`

<table id="dataCoord.compaction.clustering.maxClusterSizeRatio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        maximum cluster size / avg size in Kmeans train      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `dataCoord.compaction.clustering.maxClusterSize`

<table id="dataCoord.compaction.clustering.maxClusterSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        maximum cluster size in Kmeans train      </td>
      <td>5g</td>
    </tr>
  </tbody>
</table>


## `dataCoord.syncSegmentsInterval`

<table id="dataCoord.syncSegmentsInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The time interval for regularly syncing segments      </td>
      <td>300</td>
    </tr>
  </tbody>
</table>


## `dataCoord.index.memSizeEstimateMultiplier`

<table id="dataCoord.index.memSizeEstimateMultiplier">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        When the memory size is not setup by index procedure, multiplier to estimate the memory size of index data      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>


## `dataCoord.enableGarbageCollection`

<table id="dataCoord.enableGarbageCollection">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Switch value to control if to enable garbage collection to clear the discarded data in MinIO or S3 service.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `dataCoord.gc.interval`

<table id="dataCoord.gc.interval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The interval at which data coord performs garbage collection, unit: second.      </td>
      <td>3600</td>
    </tr>
  </tbody>
</table>


## `dataCoord.gc.missingTolerance`

<table id="dataCoord.gc.missingTolerance">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The retention duration of the unrecorded binary log (binlog) files. Setting a reasonably large value for this parameter avoids erroneously deleting the newly created binlog files that lack metadata. Unit: second.      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>


## `dataCoord.gc.dropTolerance`

<table id="dataCoord.gc.dropTolerance">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The retention duration of the binlog files of the deleted segments before they are cleared, unit: second.      </td>
      <td>10800</td>
    </tr>
  </tbody>
</table>


## `dataCoord.gc.removeConcurrent`

<table id="dataCoord.gc.removeConcurrent">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        number of concurrent goroutines to remove dropped s3 objects      </td>
      <td>32</td>
    </tr>
  </tbody>
</table>


## `dataCoord.gc.scanInterval`

<table id="dataCoord.gc.scanInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        orphan file (file on oss but has not been registered on meta) on object storage garbage collection scanning interval in hours      </td>
      <td>168</td>
    </tr>
  </tbody>
</table>


## `dataCoord.brokerTimeout`

<table id="dataCoord.brokerTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        5000ms, dataCoord broker rpc timeout      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>


## `dataCoord.autoBalance`

<table id="dataCoord.autoBalance">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable auto balance      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `dataCoord.checkAutoBalanceConfigInterval`

<table id="dataCoord.checkAutoBalanceConfigInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the interval of check auto balance config      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `dataCoord.import.filesPerPreImportTask`

<table id="dataCoord.import.filesPerPreImportTask">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of files allowed per pre-import task.      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>


## `dataCoord.import.taskRetention`

<table id="dataCoord.import.taskRetention">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The retention period in seconds for tasks in the Completed or Failed state.      </td>
      <td>10800</td>
    </tr>
  </tbody>
</table>


## `dataCoord.import.maxSizeInMBPerImportTask`

<table id="dataCoord.import.maxSizeInMBPerImportTask">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        To prevent generating of small segments, we will re-group imported files. This parameter represents the sum of file sizes in each group (each ImportTask).      </td>
      <td>6144</td>
    </tr>
  </tbody>
</table>


## `dataCoord.import.scheduleInterval`

<table id="dataCoord.import.scheduleInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The interval for scheduling import, measured in seconds.      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>


## `dataCoord.import.checkIntervalHigh`

<table id="dataCoord.import.checkIntervalHigh">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The interval for checking import, measured in seconds, is set to a high frequency for the import checker.      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>


## `dataCoord.import.checkIntervalLow`

<table id="dataCoord.import.checkIntervalLow">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The interval for checking import, measured in seconds, is set to a low frequency for the import checker.      </td>
      <td>120</td>
    </tr>
  </tbody>
</table>


## `dataCoord.import.maxImportFileNumPerReq`

<table id="dataCoord.import.maxImportFileNumPerReq">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of files allowed per single import request.      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>


## `dataCoord.import.maxImportJobNum`

<table id="dataCoord.import.maxImportJobNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum number of import jobs that are executing or pending.      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>


## `dataCoord.import.waitForIndex`

<table id="dataCoord.import.waitForIndex">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Indicates whether the import operation waits for the completion of index building.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `dataCoord.gracefulStopTimeout`

<table id="dataCoord.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        seconds. force stop node without graceful stop      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>


## `dataCoord.slot.clusteringCompactionUsage`

<table id="dataCoord.slot.clusteringCompactionUsage">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        slot usage of clustering compaction job.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `dataCoord.slot.mixCompactionUsage`

<table id="dataCoord.slot.mixCompactionUsage">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        slot usage of mix compaction job.      </td>
      <td>8</td>
    </tr>
  </tbody>
</table>


## `dataCoord.slot.l0DeleteCompactionUsage`

<table id="dataCoord.slot.l0DeleteCompactionUsage">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        slot usage of l0 compaction job.      </td>
      <td>8</td>
    </tr>
  </tbody>
</table>


## `dataCoord.ip`

<table id="dataCoord.ip">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP address of dataCoord. If not specified, use the first unicastable address      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `dataCoord.port`

<table id="dataCoord.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP port of dataCoord      </td>
      <td>13333</td>
    </tr>
  </tbody>
</table>


## `dataCoord.grpc.serverMaxSendSize`

<table id="dataCoord.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the dataCoord can send, unit: byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


## `dataCoord.grpc.serverMaxRecvSize`

<table id="dataCoord.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the dataCoord can receive, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `dataCoord.grpc.clientMaxSendSize`

<table id="dataCoord.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on dataCoord can send, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `dataCoord.grpc.clientMaxRecvSize`

<table id="dataCoord.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on dataCoord can receive, unit: byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


