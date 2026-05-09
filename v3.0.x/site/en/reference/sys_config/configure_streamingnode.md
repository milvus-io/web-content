---
id: configure_streamingnode.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure streamingNode for Milvus.
---

# streamingNode-related Configurations

Any configuration related to the streaming node server.

## `streamingNode.ip`

<table id="streamingNode.ip">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP address of streamingNode. If not specified, use the first unicastable address      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `streamingNode.port`

<table id="streamingNode.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP port of streamingNode      </td>
      <td>22222</td>
    </tr>
  </tbody>
</table>


## `streamingNode.grpc.serverMaxSendSize`

<table id="streamingNode.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the streamingNode can send, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `streamingNode.grpc.serverMaxRecvSize`

<table id="streamingNode.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the streamingNode can receive, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `streamingNode.grpc.clientMaxSendSize`

<table id="streamingNode.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on streamingNode can send, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `streamingNode.grpc.clientMaxRecvSize`

<table id="streamingNode.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on streamingNode can receive, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


