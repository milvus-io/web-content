---
id: configure_querynode.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure query node of Milvus.
title: Query Node-related Configurations
---

# Query Node-related Configurations

This topic introduces the query node-related configurations of Milvus.

Query node performs hybrid search of vector and scalar data on both incremental and historical data.

Under this section, you can configure query node port, graceful time, etc.


## `queryNode.gracefulTime`

<table id="queryNode.gracefulTime">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The minimum time before the newly inserted data can be searched.</li>
        <li>Unit: ms</li>
        <li>Milvus executes a search request directly when the search message timestamp is earlier the query node system time.</li>
        <li>When the search message timestamp is later than the query node system time, the Milvus waits until that the time diferrence between query node system time and the timestamp is less than this parameter, and then executes the search request.</li>
      </td>
      <td>0</td>
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
      <td>TCP port of query node.</td>
      <td>21123</td>
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
      <td>
        <li>The maximum size of each RPC request that the query node can receive.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
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
      <td>
        <li>The maximum size of each respond the query node can send when receiving an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
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
      <td>
        <li>The maximum size of each respond that the query node can receive when sending an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
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
      <td>
        <li>The maximum size of each RPC request that the query node can send.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
    </tr>
  </tbody>
</table>

## `queryNode.replicas`

<table id="queryNode.replicas">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>
        The number of in-memory replicas of data segments that are created on query nodes when a collection is loaded. In a Standalone deployment, the maximum value is 1. For more information, refer to <a href="https://milvus.io/docs/replica.md#In-Memory-Replica">In-Memory Replica</a>.
      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>

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
      <td>
        <li>The interval that query node publishes the node statistics information, including segment status, cpu usage, memory usage, health status, etc. </li>
        <li>Unit: ms</li>
      </td>
      <td>1000</td>
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
      <td>
        <li>The maximum size of task queue cache in flow graph in query node.</li>
        <li>Unit: MB</li>
        <li>Query node uses flow graph to subscribe to and organize the message flow.</li>
      </td>
      <td>1024</td>
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
      <td>
          Row count by which Segcore divides a segment into chunks.
      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>

## `queryNode.segcore.InterimIndex`

<table id="queryNode.segcore.chunkRows">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
          Whether to create a temporary index for growing segments and sealed segments not yet indexed, improving search performance.<br/>
          <ul><li>
            Milvus will eventually seals and indexes all segments, but enabling this optimizes search performance for immediate queries following data insertion.
          </li>
          <li>
            This defaults to `true`, indicating that Milvus creates temporary index for growing segments and the sealed segments that are not indexed upon searches.
          </li></ul>
      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>
