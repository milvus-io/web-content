---
id: configure_datanode.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure data node of Milvus.
title: Data Node-related Configurations
---

# Data Node-related Configurations

This topic introduces the data node-related configurations of Milvus.

Data node retrieves incremental log data by subscribing to the log broker, processes mutation requests, and packs log data into log snapshots and stores them in the object storage.

Under this section, you can configure data node port, etc.


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
      <td>TCP port of data node.</td>
      <td>21124</td>
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
      <td>
        <li>The maximum size of each RPC request that the data node can receive.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
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
      <td>
        <li>The maximum size of each respond the data node can send when receiving an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
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
      <td>
        <li>The maximum size of each respond that the data node can receive when sending an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
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
      <td>
        <li>The maximum size of each RPC request that the data node can send.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
    </tr>
  </tbody>
</table>

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
      <td>
        <li>The maximum size of task queue cache in flow graph in data node.</li>
        <li>Unit: MB</li>
        <li>Data node uses flow graph to subscribe to and organize the message flow.</li>
      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>


## `dataNode.flush.insertBufSize`

<table id="dataNode.flush.insertBufSize">
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
        <li>Setting this parameter too small causes the system to store a small amount of data too frequently. Setting it too large increases the system's demand for memory.</li>
      </td>
      <td>16777216</td>
    </tr>
  </tbody>
</table>
