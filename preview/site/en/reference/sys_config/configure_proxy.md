---
id: configure_proxy.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure proxy of Milvus.
title: Proxy-related Configurations
---

# Proxy-related Configurations

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
      <td>64</td>
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
      <td>64</td>
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

## `proxy.maxVectorFieldNum`

<table id="proxy.maxVectorFieldNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The maximum number of vector fields that can be specified in a collection. Value range: [1, 10].</td>
      <td>4</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.enable`

<table id="proxy.accessLog.enable">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether to enable the access log feature.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.filename`

<table id="proxy.accessLog.filename">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The name of the access log file. If you leave this parameter empty, access logs will be printed to stdout.</td>
      <td>Empty string</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.localPath`

<table id="proxy.accessLog.localPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The local folder path where the access log file is stored. This parameter can be specified when <code>proxy.accessLog.filename</code> is not empty.</td>
      <td>/tmp/milvus_access</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.maxSize`

<table id="proxy.accessLog.maxSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum size allowed for a single access log file. If the log file size reaches this limit, a rotation process will be triggered. This process seals the current access log file, creates a new log file, and clears the contents of the original log file.</li>
        <li>Unit: MB</li>
      </td>
      <td>64</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.rotatedTime`

<table id="proxy.accessLog.rotatedTime">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum time interval allowed for rotating a single access log file. Upon reaching the specified time interval, a rotation process is triggered, resulting in the creation of a new access log file and sealing of the previous one.</li>
        <li>Unit: seconds</li>
      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.maxBackups`

<table id="proxy.accessLog.maxBackups">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The maximum number of sealed access log files that can be retained. If the number of sealed access log files exceeds this limit, the oldest one will be deleted.</td>
      <td>8</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.minioEnable`

<table id="proxy.accessLog.minioEnable">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether to upload local access log files to MinIO. This parameter can be specified when <code>proxy.accessLog.filename</code> is not empty.</td>
      <td>False</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.remotePath`

<table id="proxy.accessLog.remotePath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The path of the object storage for uploading access log files.</td>
      <td>access_log/</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.remoteMaxTime`

<table id="proxy.accessLog.remoteMaxTime">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The time interval allowed for uploading access log files. If the upload time of a log file exceeds this interval, the file will be deleted. Setting the value to <code>0</code> disables this feature.</td>
      <td>0</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.base.format`

<table id="proxy.accessLog.base.format">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The log format with dynamic metrics. This format applies to all methods by default. For more information about metrics, see <a href="configure_access_logs.md">Configure Access Logs</a>.</td>
      <td>Empty string</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.<custom_formatter_name>.format`

<table id="proxy.accessLog.<custom_formatter_name>.format">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The custom log format that you configure for specific methods. This parameter works together with <code>proxy.accessLog.&lt;custom_formatter_name&gt;.methods</code>.</td>
      <td>Empty string</td>
    </tr>
  </tbody>
</table>

## `proxy.accessLog.<custom_formatter_name>.methods`

<table id="proxy.accessLog.<custom_formatter_name>.methods">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The methods to which the custom formatter applies. This parameter works together with <code>proxy.accessLog.&lt;custom_formatter_name&gt;.format</code>.</td>
      <td>Empty string</td>
    </tr>
  </tbody>
</table>
