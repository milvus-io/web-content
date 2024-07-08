---
id: configure_rocksmq.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure RocksMQ for Milvus standalone.
title: RocksMQ-related Configurations
---

# RocksMQ-related Configurations

This topic introduces the RocksMQ-related configurations of Milvus.

RocksMQ is the underlying engine supporting Milvus standalone's reliable storage and publication/subscription of message streams. It is implemented on the basis of RocksDB.

Under this section, you can configure message size, retention time and size, etc.


## `rocksmq.path`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefix of the key to where Milvus stores data in RocksMQ.</li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
        <li>Set an easy-to-identify root key prefix for Milvus if etcd service already exists.</li>
      </td>
      <td>/var/lib/milvus/rdb_data</td>
    </tr>
  </tbody>
</table>


## `rocksmq.rocksmqPageSize`

<table id="rocksmq.rocksmqPageSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of messages in each page in RocksMQ. Messages in RocksMQ are checked and cleared (when expired) in batch based on this parameters.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483648</td>
    </tr>
  </tbody>
</table>


## `rocksmq.retentionTimeInMinutes`

<table id="rocksmq.retentionTimeInMinutes">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum retention time of acked messages in RocksMQ. Acked messages in RocksMQ are retained for the specified period of time and then cleared.</li>
        <li>Unit: Minute</li>
      </td>
      <td>10080</td>
    </tr>
  </tbody>
</table>


## `rocksmq.retentionSizeInMB`

<table id="rocksmq.retentionSizeInMB">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum retention size of acked messages of each topic in RocksMQ. Acked messages in each topic are cleared if their size exceed this parameter.</li>
        <li>Unit: MB</li>
      </td>
      <td>8192</td>
    </tr>
  </tbody>
</table>

## `rocksmq.compactionInterval`

<table id="rocksmq.compactionInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Time interval to trigger rocksdb compaction to remove deleted data. </li>
        <li>Unit: Second</li>
      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>

## `rocksmq.lrucacheratio`

<table id="rocksmq.lrucacheratio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Rocksdb cache memory ratio. </li>
      </td>
      <td>0.06</td>
    </tr>
  </tbody>
</table>
