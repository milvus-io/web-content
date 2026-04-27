---
id: configure_indexnode.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure indexNode for Milvus.
---

# indexNode-related Configurations



## `indexNode.enableDisk`

<table id="indexNode.enableDisk">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        enable index node build disk vector index      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `indexNode.ip`

<table id="indexNode.ip">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP address of indexNode. If not specified, use the first unicastable address      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `indexNode.port`

<table id="indexNode.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP port of indexNode      </td>
      <td>21121</td>
    </tr>
  </tbody>
</table>


## `indexNode.grpc.serverMaxSendSize`

<table id="indexNode.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the indexNode can send, unit: byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


## `indexNode.grpc.serverMaxRecvSize`

<table id="indexNode.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the indexNode can receive, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `indexNode.grpc.clientMaxSendSize`

<table id="indexNode.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on indexNode can send, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `indexNode.grpc.clientMaxRecvSize`

<table id="indexNode.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on indexNode can receive, unit: byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


