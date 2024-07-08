---
id: configure_datacoord.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure data coordinator of Milvus.
title: Data Coordinator-related Configurations
---

# Data Coordinator-related Configurations

This topic introduces the data coordinator-related configurations of Milvus.

Data coordinator (data coord) manages the topology of data nodes, maintains metadata, and triggers flush, compact, and other background data operations.

Under this section, you can configure data coord address, segment settings, compaction, garbage collection, etc.


## `dataCoord.address`

<table id="dataCoord.address">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>TCP/IP address of data coordinator.</li>
        <li>Data coordinator monitors all IPv4 addresses if this parameter is set as <code>0.0.0.0</code>.</li>
      </td>
      <td>localhost</td>
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
      <td>TCP port of data coordinator.</td>
      <td>13333</td>
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
      <td>
        <li>The maximum size of each RPC request that the data coord can receive.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
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
      <td>
        <li>The maximum size of each respond the data coord can send when receiving an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
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
      <td>
        <li>The maximum size of each respond that the data coord can receive when sending an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
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
      <td>
        <li>The maximum size of each RPC request that the data coord can send.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
    </tr>
  </tbody>
</table>

## `dataCoord.activeStandby.enabled`

<table id="rootCoord.dmlChannelNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Whether the dataCoord works in active-standby mode.
      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>

## `dataCoord.replicas`

<table id="rootCoord.dmlChannelNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Number of dataCoord pods. This is required if `dataCoord.activeStandby.enabled` is set to `true`.
      </td>
      <td>1</td>
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
        <li>Switch value to control if to enable segment compaction.</li>
        <li>Compaction merges small-size segments into a large segment, and clears the entities deleted beyond the rentention duration of Time Travel.</li>
      </td>
      <td>true</td>
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
      <td>
        Switch value to control if to enable garbage collection to clear the discarded data in MinIO or S3 service.
      </td>
      <td>true</td>
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
      <td>
        <li>The maximum size of a segment.</li>
        <li>Unit: MB</li>
        <li><code>datacoord.segment.maxSize</code> and <code>datacoord.segment.sealProportion</code> together determine if a segment can be sealed.</li>
      </td>
      <td>512</td>
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
      <td>
        <li>The minimum proportion to <code>datacoord.segment.maxSize</code> to seal a segment.</li>
        <li><code>datacoord.segment.maxSize</code> and <code>datacoord.segment.sealProportion</code> together determine if a segment can be sealed.</li>
      </td>
      <td>0.23</td>
    </tr>
  </tbody>
</table>


## `dataCoord.segment.assignmentExpiration`

<table id="dataCoord.segment.maxSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Expiration time of the segment assignment.</li>
        <li>Unit: ms</li>
      </td>
      <td>2000</td>
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
        <li>This configuration takes effect only when <code>dataCoord.enableCompaction</code> is set as <code>true</code>.</li>
      </td>
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
      <td>
        <li>The interval at which data coord performs garbage collection.</li>
        <li>Unit: Second</li>
        <li>This configuration takes effect only when <code>dataCoord.enableGarbageCollection</code> is set as <code>true</code>.</li>
      </td>
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
      <td>
        <li>The retention duration of the unrecorded binary log (binlog) files.</li>
        <li>Setting a reasonably large value for this parameter avoids erroneously deleting the newly created binlog files that lack metadata.</li>
        <li>Unit: Second</li>
        <li>This configuration takes effect only when <code>dataCoord.enableGarbageCollection</code> is set as <code>true</code>.</li>
      </td>
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
      <td>
        <li>The retention duration of the binlog files of the deleted segments before they are cleared.</li>
        <li>Unit: Second</li>
        <li>This configuration takes effect only when <code>dataCoord.enableGarbageCollection</code> is set as <code>true</code>.</li>
      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>
