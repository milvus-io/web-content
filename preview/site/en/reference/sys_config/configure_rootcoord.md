---
id: configure_rootcoord.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure root coordinator of Milvus.
title: Root Coordinator-related Configurations
---

# Root Coordinator-related Configurations

This topic introduces the root coordinator-related configurations of Milvus.

Root coordinator (root coord) handles data definition language (DDL) and data control language (DCL) requests, manages TSO (timestamp Oracle), and publishes time tick messages.

Under this section, you can configure root coord address, index building threshold, etc.


## `rootCoord.address`

<table id="rootCoord.address">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>TCP/IP address of root coordinator.</li>
        <li>Root coordinator monitors all IPv4 addresses if this parameter is set as <code>0.0.0.0</code>.</li>
      </td>
      <td>localhost</td>
    </tr>
  </tbody>
</table>


## `rootCoord.port`

<table id="rootCoord.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TCP port of root coordinator.</td>
      <td>53100</td>
    </tr>
  </tbody>
</table>


## `rootCoord.grpc.serverMaxRecvSize`

<table id="rootCoord.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each RPC request that the root coord can receive.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
    </tr>
  </tbody>
</table>


## `rootCoord.grpc.serverMaxSendSize`

<table id="rootCoord.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each respond the root coord can send when receiving an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
    </tr>
  </tbody>
</table>


## `rootCoord.grpc.clientMaxRecvSize`

<table id="rootCoord.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each respond that the root coord can receive when sending an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
    </tr>
  </tbody>
</table>

## `rootCoord.grpc.clientMaxSendSize`

<table id="rootCoord.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each RPC request that the root coord can send.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
    </tr>
  </tbody>
</table>


## `rootCoord.activeStandby.enabled`

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
        Whether the rootCoord works in active-standby mode.
      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>

## `rootCoord.replicas`

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
        Number of rootCoord pods. This is required if `rootCoord.activeStandby.enabled` is set to `true`.
      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>

## `rootCoord.dmlChannelNum`

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
        The number of DML-Channels to create at the root coord startup.
      </td>
      <td>256</td>
    </tr>
  </tbody>
</table>


## `rootCoord.maxPartitionNum`

<table id="rootCoord.maxPartitionNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum number of partitions in each collection.</li>
        <li>New partitions cannot be created if this parameter is set as <code>0</code> or <code>1</code>.</li>
        <li>Range: [0, INT64MAX]</li>
      </td>
      <td>4096</td>
    </tr>
  </tbody>
</table>


## `rootCoord.minSegmentSizeToEnableIndex`

<table id="rootCoord.minSegmentSizeToEnableIndex">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The minimum row count of a segment required for creating index.</li>
        <li>Segments with smaller size than this parameter will not be indexed, and will be searched with brute force.</li>
      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>


## `rootCoord.importTaskExpiration`

<table id="rootCoord.importTaskExpiration">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>A file import task expires after <code>importTaskExpiration</code> seconds.</li>
        <li>Unit: second</li>
        <li>You should also change the value of the parameter in the <code>internal/util/paramtable/component_param.go</code> file.</li>
      </td>
      <td>900</td>
    </tr>
  </tbody>
</table>

## `rootCoord.importTaskRetention`

<table id="rootCoord.importTaskRetention">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvus keeps the record of import tasks for at least <code>importTaskRetention</code> seconds.</li>
        <li>You should also change the value of the parameter in the <code>internal/util/paramtable/component_param.go</code> file.</li>
      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>