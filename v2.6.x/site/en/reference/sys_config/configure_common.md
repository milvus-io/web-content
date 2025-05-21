---
id: configure_common.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure common for Milvus.
---

# common-related Configurations



## `common.defaultPartitionName`

<table id="common.defaultPartitionName">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Name of the default partition when a collection is created      </td>
      <td>_default</td>
    </tr>
  </tbody>
</table>


## `common.defaultIndexName`

<table id="common.defaultIndexName">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Name of the index when it is created with name unspecified      </td>
      <td>_default_idx</td>
    </tr>
  </tbody>
</table>


## `common.entityExpiration`

<table id="common.entityExpiration">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Entity expiration in seconds, CAUTION -1 means never expire      </td>
      <td>-1</td>
    </tr>
  </tbody>
</table>


## `common.indexSliceSize`

<table id="common.indexSliceSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Index slice size in MB      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `common.threadCoreCoefficient.highPriority`

<table id="common.threadCoreCoefficient.highPriority">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        This parameter specify how many times the number of threads is the number of cores in high priority pool      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `common.threadCoreCoefficient.middlePriority`

<table id="common.threadCoreCoefficient.middlePriority">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        This parameter specify how many times the number of threads is the number of cores in middle priority pool      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>


## `common.threadCoreCoefficient.lowPriority`

<table id="common.threadCoreCoefficient.lowPriority">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        This parameter specify how many times the number of threads is the number of cores in low priority pool      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>


## `common.gracefulTime`

<table id="common.gracefulTime">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        milliseconds. it represents the interval (in ms) by which the request arrival time needs to be subtracted in the case of Bounded Consistency.      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>


## `common.gracefulStopTimeout`

<table id="common.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        seconds. it will force quit the server if the graceful stop process is not completed during this time.      </td>
      <td>1800</td>
    </tr>
  </tbody>
</table>


## `common.storageType`

<table id="common.storageType">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        please adjust in embedded Milvus: local, available values are [local, remote, opendal], value minio is deprecated, use remote instead      </td>
      <td>remote</td>
    </tr>
  </tbody>
</table>


## `common.simdType`

<table id="common.simdType">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Default value: auto</li>      
        <li>Valid values: [auto, avx512, avx2, avx, sse4_2]</li>      
        <li>This configuration is only used by querynode and indexnode, it selects CPU instruction set for Searching and Index-building.</li>      </td>
      <td>auto</td>
    </tr>
  </tbody>
</table>


## `common.security.superUsers`

<table id="common.security.superUsers">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The superusers will ignore some system check processes,</li>      
        <li>like the old password verification when updating the credential</li>      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `common.security.defaultRootPassword`

<table id="common.security.defaultRootPassword">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        default password for root user. The maximum length is 72 characters, and double quotes are required.      </td>
      <td>Milvus</td>
    </tr>
  </tbody>
</table>


## `common.security.rootShouldBindRole`

<table id="common.security.rootShouldBindRole">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether the root user should bind a role when the authorization is enabled.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `common.security.rbac.overrideBuiltInPrivilegeGroups.enabled`

<table id="common.security.rbac.overrideBuiltInPrivilegeGroups.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether to override build-in privilege groups      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `common.security.rbac.cluster.readonly.privileges`

<table id="common.security.rbac.cluster.readonly.privileges">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Cluster level readonly privileges      </td>
      <td>ListDatabases,SelectOwnership,SelectUser,DescribeResourceGroup,ListResourceGroups,ListPrivilegeGroups</td>
    </tr>
  </tbody>
</table>


## `common.security.rbac.cluster.readwrite.privileges`

<table id="common.security.rbac.cluster.readwrite.privileges">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Cluster level readwrite privileges      </td>
      <td>ListDatabases,SelectOwnership,SelectUser,DescribeResourceGroup,ListResourceGroups,ListPrivilegeGroups,FlushAll,TransferNode,TransferReplica,UpdateResourceGroups</td>
    </tr>
  </tbody>
</table>


## `common.security.rbac.cluster.admin.privileges`

<table id="common.security.rbac.cluster.admin.privileges">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Cluster level admin privileges      </td>
      <td>ListDatabases,SelectOwnership,SelectUser,DescribeResourceGroup,ListResourceGroups,ListPrivilegeGroups,FlushAll,TransferNode,TransferReplica,UpdateResourceGroups,BackupRBAC,RestoreRBAC,CreateDatabase,DropDatabase,CreateOwnership,DropOwnership,ManageOwnership,CreateResourceGroup,DropResourceGroup,UpdateUser,RenameCollection,CreatePrivilegeGroup,DropPrivilegeGroup,OperatePrivilegeGroup</td>
    </tr>
  </tbody>
</table>


## `common.security.rbac.database.readonly.privileges`

<table id="common.security.rbac.database.readonly.privileges">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Database level readonly privileges      </td>
      <td>ShowCollections,DescribeDatabase</td>
    </tr>
  </tbody>
</table>


## `common.security.rbac.database.readwrite.privileges`

<table id="common.security.rbac.database.readwrite.privileges">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Database level readwrite privileges      </td>
      <td>ShowCollections,DescribeDatabase,AlterDatabase</td>
    </tr>
  </tbody>
</table>


## `common.security.rbac.database.admin.privileges`

<table id="common.security.rbac.database.admin.privileges">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Database level admin privileges      </td>
      <td>ShowCollections,DescribeDatabase,AlterDatabase,CreateCollection,DropCollection</td>
    </tr>
  </tbody>
</table>


## `common.security.rbac.collection.readonly.privileges`

<table id="common.security.rbac.collection.readonly.privileges">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Collection level readonly privileges      </td>
      <td>Query,Search,IndexDetail,GetFlushState,GetLoadState,GetLoadingProgress,HasPartition,ShowPartitions,DescribeCollection,DescribeAlias,GetStatistics,ListAliases</td>
    </tr>
  </tbody>
</table>


## `common.security.rbac.collection.readwrite.privileges`

<table id="common.security.rbac.collection.readwrite.privileges">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Collection level readwrite privileges      </td>
      <td>Query,Search,IndexDetail,GetFlushState,GetLoadState,GetLoadingProgress,HasPartition,ShowPartitions,DescribeCollection,DescribeAlias,GetStatistics,ListAliases,Load,Release,Insert,Delete,Upsert,Import,Flush,Compaction,LoadBalance,CreateIndex,DropIndex,CreatePartition,DropPartition</td>
    </tr>
  </tbody>
</table>


## `common.security.rbac.collection.admin.privileges`

<table id="common.security.rbac.collection.admin.privileges">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Collection level admin privileges      </td>
      <td>Query,Search,IndexDetail,GetFlushState,GetLoadState,GetLoadingProgress,HasPartition,ShowPartitions,DescribeCollection,DescribeAlias,GetStatistics,ListAliases,Load,Release,Insert,Delete,Upsert,Import,Flush,Compaction,LoadBalance,CreateIndex,DropIndex,CreatePartition,DropPartition,CreateAlias,DropAlias</td>
    </tr>
  </tbody>
</table>


## `common.session.ttl`

<table id="common.session.ttl">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ttl value when session granting a lease to register service      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>


## `common.session.retryTimes`

<table id="common.session.retryTimes">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        retry times when session sending etcd requests      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>


## `common.locks.metrics.enable`

<table id="common.locks.metrics.enable">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        whether gather statistics for metrics locks      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `common.locks.threshold.info`

<table id="common.locks.threshold.info">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        minimum milliseconds for printing durations in info level      </td>
      <td>500</td>
    </tr>
  </tbody>
</table>


## `common.locks.threshold.warn`

<table id="common.locks.threshold.warn">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        minimum milliseconds for printing durations in warn level      </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>


## `common.locks.maxWLockConditionalWaitTime`

<table id="common.locks.maxWLockConditionalWaitTime">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        maximum seconds for waiting wlock conditional      </td>
      <td>600</td>
    </tr>
  </tbody>
</table>


## `common.ttMsgEnabled`

<table id="common.ttMsgEnabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Whether to disable the internal time messaging mechanism for the system. </li>      
        <li>If disabled (set to false), the system will not allow DML operations, including insertion, deletion, queries, and searches. </li>      
        <li>This helps Milvus-CDC synchronize incremental data</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `common.traceLogMode`

<table id="common.traceLogMode">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        trace request info      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>


## `common.bloomFilterSize`

<table id="common.bloomFilterSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        bloom filter initial size      </td>
      <td>100000</td>
    </tr>
  </tbody>
</table>


## `common.bloomFilterType`

<table id="common.bloomFilterType">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        bloom filter type, support BasicBloomFilter and BlockedBloomFilter      </td>
      <td>BlockedBloomFilter</td>
    </tr>
  </tbody>
</table>


## `common.maxBloomFalsePositive`

<table id="common.maxBloomFalsePositive">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        max false positive rate for bloom filter      </td>
      <td>0.001</td>
    </tr>
  </tbody>
</table>


## `common.bloomFilterApplyBatchSize`

<table id="common.bloomFilterApplyBatchSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        batch size when to apply pk to bloom filter      </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>


## `common.collectionReplicateEnable`

<table id="common.collectionReplicateEnable">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether to enable collection replication.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `common.usePartitionKeyAsClusteringKey`

<table id="common.usePartitionKeyAsClusteringKey">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        if true, do clustering compaction and segment prune on partition key field      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `common.useVectorAsClusteringKey`

<table id="common.useVectorAsClusteringKey">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        if true, do clustering compaction and segment prune on vector field      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `common.enableVectorClusteringKey`

<table id="common.enableVectorClusteringKey">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        if true, enable vector clustering key and vector clustering compaction      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `common.localRPCEnabled`

<table id="common.localRPCEnabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        enable local rpc for internal communication when mix or standalone mode.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `common.sync.taskPoolReleaseTimeoutSeconds`

<table id="common.sync.taskPoolReleaseTimeoutSeconds">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum time to wait for the task to finish and release resources in the pool      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


