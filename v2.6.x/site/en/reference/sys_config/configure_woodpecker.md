---
id: configure_woodpecker.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure woodpecker for Milvus.
---

# woodpecker-related Configurations

Related configuration of woodpecker, used to manage Milvus logs of recent mutation operations, output streaming log, and provide embedded log sequential read and write.

## `woodpecker.meta.type`

<table id="woodpecker.meta.type">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The Type of the metadata provider. Currently only support etcd.      </td>
      <td>etcd</td>
    </tr>
  </tbody>
</table>


## `woodpecker.meta.prefix`

<table id="woodpecker.meta.prefix">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The Prefix of the metadata provider.      </td>
      <td>woodpecker</td>
    </tr>
  </tbody>
</table>


## `woodpecker.client.segmentAppend.queueSize`

<table id="woodpecker.client.segmentAppend.queueSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The size of the queue for pending messages to be sent of each log.      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>


## `woodpecker.client.segmentAppend.maxRetries`

<table id="woodpecker.client.segmentAppend.maxRetries">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum number of retries for segment append operations.      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>


## `woodpecker.client.segmentRollingPolicy.maxSize`

<table id="woodpecker.client.segmentRollingPolicy.maxSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum size of a segment.      </td>
      <td>256M</td>
    </tr>
  </tbody>
</table>


## `woodpecker.client.segmentRollingPolicy.maxInterval`

<table id="woodpecker.client.segmentRollingPolicy.maxInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum interval between two segments.      </td>
      <td>10m</td>
    </tr>
  </tbody>
</table>


## `woodpecker.client.segmentRollingPolicy.maxBlocks`

<table id="woodpecker.client.segmentRollingPolicy.maxBlocks">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum number of blocks in a segment.      </td>
      <td>1000</td>
    </tr>
  </tbody>
</table>


## `woodpecker.client.auditor.maxInterval`

<table id="woodpecker.client.auditor.maxInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum interval between two auditing operations.      </td>
      <td>10s</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentSyncPolicy.maxInterval`

<table id="woodpecker.logstore.segmentSyncPolicy.maxInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum interval between two sync operations.      </td>
      <td>200ms</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentSyncPolicy.maxIntervalForLocalStorage`

<table id="woodpecker.logstore.segmentSyncPolicy.maxIntervalForLocalStorage">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum interval between two sync operations for local storage backend.      </td>
      <td>10ms</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentSyncPolicy.maxBytes`

<table id="woodpecker.logstore.segmentSyncPolicy.maxBytes">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum size of write buffer in bytes.      </td>
      <td>256M</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentSyncPolicy.maxEntries`

<table id="woodpecker.logstore.segmentSyncPolicy.maxEntries">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum entries number of write buffer.      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentSyncPolicy.maxFlushRetries`

<table id="woodpecker.logstore.segmentSyncPolicy.maxFlushRetries">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum number of retries for flush operations.      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentSyncPolicy.retryInterval`

<table id="woodpecker.logstore.segmentSyncPolicy.retryInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum interval between two retries.      </td>
      <td>1000ms</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentSyncPolicy.maxFlushSize`

<table id="woodpecker.logstore.segmentSyncPolicy.maxFlushSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum size of a fragment in bytes to flush.      </td>
      <td>2M</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentSyncPolicy.maxFlushThreads`

<table id="woodpecker.logstore.segmentSyncPolicy.maxFlushThreads">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum number of threads to flush data.      </td>
      <td>32</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentCompactionPolicy.maxSize`

<table id="woodpecker.logstore.segmentCompactionPolicy.maxSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of the merged files.      </td>
      <td>2M</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentCompactionPolicy.maxParallelUploads`

<table id="woodpecker.logstore.segmentCompactionPolicy.maxParallelUploads">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of parallel upload threads for compaction.      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentCompactionPolicy.maxParallelReads`

<table id="woodpecker.logstore.segmentCompactionPolicy.maxParallelReads">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of parallel read threads for compaction.      </td>
      <td>8</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentReadPolicy.maxBatchSize`

<table id="woodpecker.logstore.segmentReadPolicy.maxBatchSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum size of a batch in bytes.      </td>
      <td>16M</td>
    </tr>
  </tbody>
</table>


## `woodpecker.logstore.segmentReadPolicy.maxFetchThreads`

<table id="woodpecker.logstore.segmentReadPolicy.maxFetchThreads">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum number of threads to fetch data.      </td>
      <td>32</td>
    </tr>
  </tbody>
</table>


## `woodpecker.storage.type`

<table id="woodpecker.storage.type">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Default value: "minio"</li>
        <li>Valid values: [minio, local]</li>      </td>
      <td>minio</td>
    </tr>
  </tbody>
</table>


## `woodpecker.storage.rootPath`

<table id="woodpecker.storage.rootPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The root path of the storage provider.      </td>
      <td>/var/lib/milvus/woodpecker</td>
    </tr>
  </tbody>
</table>

