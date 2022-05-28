---
id: configure_proxy.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure proxy of Milvus.
---

# Proxy-related Configurations

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


This topic introduces the proxy-related configurations of Milvus.

Proxy is the access layer of the system and endpoint to users. It validates client requests and reduces the returned results.

Under this section, you can configure proxy port, system limits, etc.


## `proxy.port`

<table id="proxy.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TCP port of proxy.</td>
      <td>19530</td>
    </tr>
  </tbody>
</table>


## `proxy.grpc.serverMaxRecvSize`

<table id="proxy.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each RPC request that the proxy can receive.</li>
        <li>Unit: Byte</li>
      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


## `proxy.grpc.serverMaxSendSize`

<table id="proxy.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each respond the proxy can send when receiving an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>

## `proxy.grpc.clientMaxRecvSize`

<table id="proxy.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each respond that the proxy can receive when sending an RPC request.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
    </tr>
  </tbody>
</table>


## `proxy.grpc.clientMaxSendSize`

<table id="proxy.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size of each RPC request that the proxy can send.</li>
        <li>Unit: Byte</li>
      </td>
      <td>104857600</td>
    </tr>
  </tbody>
</table>


## `proxy.timeTickInterval`

<table id="proxy.timeTickInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The interval at which proxy synchronizes the time tick.</li>
        <li>Unit: ms</li>
      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>

## `proxy.msgStream.timeTick.bufSize`

<table id="proxy.msgStream.timeTick.bufSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        The maximum number of messages can be buffered in the timeTick message stream of the proxy when producing messages.
      </td>
      <td>512</td>
    </tr>
  </tbody>
</table>

## `proxy.maxNameLength`

<table id="proxy.maxNameLength">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The maximum length of the name or alias that can be created in Milvus, including the collection name, collection alias, partition name, and field name.</td>
      <td>255</td>
    </tr>
  </tbody>
</table>

## `proxy.maxFieldNum`

<table id="proxy.maxFieldNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The maximum number of field can be created when creating in a collection. </td>
      <td>256</td>
    </tr>
  </tbody>
</table>

## `proxy.maxDimension`

<table id="proxy.maxDimension">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The maximum number of dimensions of a vector can have when creating in a collection.</td>
      <td>32768</td>
    </tr>
  </tbody>
</table>

## `proxy.maxShardNum`

<table id="proxy.maxShardNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The maximum number of shards can be created when creating in a collection.</td>
      <td>256</td>
    </tr>
  </tbody>
</table>

## `proxy.maxTaskNum`

<table id="proxy.maxShardNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The maximum number of tasks in the task queue of the proxy.</td>
      <td>1024</td>
    </tr>
  </tbody>
</table>