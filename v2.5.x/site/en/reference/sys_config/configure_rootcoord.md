---
id: configure_rootcoord.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure rootCoord for Milvus.
---

# rootCoord-related Configurations

Related configuration of rootCoord, used to handle data definition language (DDL) and data control language (DCL) requests

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
      <td>        The number of DML-Channels to create at the root coord startup.      </td>
      <td>16</td>
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
        <li>New partitions cannot be created if this parameter is set as 0 or 1.</li>      
        <li>Range: [0, INT64MAX]</li>      </td>
      <td>1024</td>
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
        <li>Segments with smaller size than this parameter will not be indexed, and will be searched with brute force.</li>      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>


## `rootCoord.maxDatabaseNum`

<table id="rootCoord.maxDatabaseNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum number of database      </td>
      <td>64</td>
    </tr>
  </tbody>
</table>


## `rootCoord.maxGeneralCapacity`

<table id="rootCoord.maxGeneralCapacity">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        upper limit for the sum of of product of partitionNumber and shardNumber      </td>
      <td>65536</td>
    </tr>
  </tbody>
</table>


## `rootCoord.gracefulStopTimeout`

<table id="rootCoord.gracefulStopTimeout">
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


## `rootCoord.ip`

<table id="rootCoord.ip">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP address of rootCoord. If not specified, use the first unicastable address      </td>
      <td></td>
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
      <td>        TCP port of rootCoord      </td>
      <td>53100</td>
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
      <td>        The maximum size of each RPC request that the rootCoord can send, unit: byte      </td>
      <td>536870912</td>
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
      <td>        The maximum size of each RPC request that the rootCoord can receive, unit: byte      </td>
      <td>268435456</td>
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
      <td>        The maximum size of each RPC request that the clients on rootCoord can send, unit: byte      </td>
      <td>268435456</td>
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
      <td>        The maximum size of each RPC request that the clients on rootCoord can receive, unit: byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


