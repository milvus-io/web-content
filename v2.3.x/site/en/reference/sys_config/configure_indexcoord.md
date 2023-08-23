---
id: configure_indexcoord.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure index coordinator of Milvus.
---

# Index Coordinator-related Configurations

This topic introduces the index coordinator-related configurations of Milvus.

Index coordinator (index coord) manages topology of the index nodes, and maintains index metadata.

Under this section, you can configure index coord address, etc.


## `indexCoord.address`

<table id="indexCoord.address">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>TCP/IP address of index coordinator.</li>
        <li>Index coordinator monitors all IPv4 addresses if this parameter is set as <code>0.0.0.0</code>.</li>
      </td>
      <td>localhost</td>
    </tr>
  </tbody>
</table>


## `indexCoord.port`

<table id="indexCoord.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TCP port of index coordinator.</td>
      <td>31000</td>
    </tr>
  </tbody>
</table>

## `indexCoord.activeStandby.enabled`

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
        Whether the indexCoord works in active-standby mode.
      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>

## `indexCoord.replicas`

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
        Number of indexCoord pods. This is required if `indexCoord.activeStandby.enabled` is set to `true`.
      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>

## `indexCoord.grpc.serverMaxRecvSize`

<table id="indexCoord.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each RPC request that the index coord can receive.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
    </tr>
  </tbody>
</table>

## `indexCoord.grpc.serverMaxSendSize`

<table id="indexCoord.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each respond the index coord can send when receiving an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>2147483647</td>
    </tr>
  </tbody>
</table>

## `indexCoord.grpc.clientMaxRecvSize`

<table id="indexCoord.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each respond that the index coord can receive when sending an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
    </tr>
  </tbody>
</table>

## `indexCoord.grpc.clientMaxSendSize`

<table id="indexCoord.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each RPC request that the index coord can send.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
    </tr>
  </tbody>
</table>
