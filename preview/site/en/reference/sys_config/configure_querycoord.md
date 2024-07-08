---
id: configure_querycoord.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure query coordinator of Milvus.
title: Query Coordinator-related Configurations
---

# Query Coordinator-related Configurations

This topic introduces the query coordinator-related configurations of Milvus.

Query coordinator (query coord) manages topology and load-balancing of the query nodes, and handoff operation from growing segments to sealed segments.

Under this section, you can configure query coord address, auto handoff, auto load-balancing, etc.


## `queryCoord.address`

<table id="queryCoord.address">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>TCP/IP address of query coordinator.</li>
        <li>Query coordinator monitors all IPv4 addresses if this parameter is set as <code>0.0.0.0</code>.</li>
      </td>
      <td>localhost</td>
    </tr>
  </tbody>
</table>

## `queryCoord.port`

<table id="queryCoord.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TCP port of query coordinator.</td>
      <td>19531</td>
    </tr>
  </tbody>
</table>

## `queryCoord.activeStandby.enabled`

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
        Whether the queryCoord works in active-standby mode.
      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>

## `queryCoord.replicas`

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
        Number of queryCoord pods. This is required if `queryCoord.activeStandby.enabled` is set to `true`.
      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>

## `queryCoord.autoHandoff`

<table id="queryCoord.autoHandoff">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Switch value to control if to automatically replace a growing segment with the corresponding indexed sealed segment when the growing segment reaches the sealing threshold.</li>
        <li>If this parameter is set <code>false</code>, Milvus simply searches the growing segments with brute force.</li>
      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>

## `queryCoord.autoBalance`

<table id="queryCoord.autoBalance">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Switch value to control if to automatically balance the memory usage among query nodes by distributing segment loading and releasing operations evenly.
      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>

## `queryCoord.overloadedMemoryThresholdPercentage`

<table id="queryCoord.overloadedMemoryThresholdPercentage">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        The threshold of memory usage (in percentage) in a query node to trigger the sealed segment balancing. 
      </td>
      <td>90</td>
    </tr>
  </tbody>
</table>

## `queryCoord.balanceIntervalSeconds`

<table id="queryCoord.balanceIntervalSeconds">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The interval at which query coord balances the memory usage among query nodes.</li>
        <li>Unit: Second</li>
      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


## `queryCoord.memoryUsageMaxDifferencePercentage`

<table id="queryCoord.memoryUsageMaxDifferencePercentage">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        The threshold of memory usage difference (in percentage) between any two query nodes to trigger the sealed segment balancing. 
      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>

## `queryCoord.grpc.serverMaxRecvSize`

<table id="queryCoord.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each RPC request that the query coord can receive.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
    </tr>
  </tbody>
</table>

## `queryCoord.grpc.serverMaxSendSize`

<table id="queryCoord.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each respond the query coord can send when receiving an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
    </tr>
  </tbody>
</table>


## `queryCoord.grpc.clientMaxRecvSize`

<table id="queryCoord.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each respond that the query coord can receive when sending an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
    </tr>
  </tbody>
</table>

## `queryCoord.grpc.clientMaxSendSize`

<table id="queryCoord.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each RPC request that the query coord can send.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
    </tr>
  </tbody>
</table>