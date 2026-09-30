---
id: configure_proxy.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure proxy for Milvus.
---

# proxy-related Configurations

Related configuration of proxy, used to validate client requests and reduce the returned results.

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
      <td>        The interval at which proxy synchronizes the time tick, unit: ms.      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>


## `proxy.healthCheckTimeout`

<table id="proxy.healthCheckTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ms, the interval that to do component healthy check      </td>
      <td>3000</td>
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
      <td>        The maximum number of messages can be buffered in the timeTick message stream of the proxy when producing messages.      </td>
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
      <td>        The maximum length of the name or alias that can be created in Milvus, including the collection name, collection alias, partition name, and field name.      </td>
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
      <td>        The maximum number of field can be created when creating in a collection. It is strongly DISCOURAGED to set maxFieldNum >= 64.      </td>
      <td>64</td>
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
      <td>        The maximum number of vector fields that can be specified in a collection. Value range: [1, 10].      </td>
      <td>4</td>
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
      <td>        The maximum number of shards can be created when creating in a collection.      </td>
      <td>16</td>
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
      <td>        The maximum number of dimensions of a vector can have when creating in a collection.      </td>
      <td>32768</td>
    </tr>
  </tbody>
</table>


## `proxy.ginLogging`

<table id="proxy.ginLogging">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Whether to produce gin logs.\n</li>      
        <li>please adjust in embedded Milvus: false</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `proxy.ginLogSkipPaths`

<table id="proxy.ginLogSkipPaths">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        skip url path for gin log      </td>
      <td>/</td>
    </tr>
  </tbody>
</table>


## `proxy.maxTaskNum`

<table id="proxy.maxTaskNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of tasks in the task queue of the proxy.      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>


## `proxy.ddlConcurrency`

<table id="proxy.ddlConcurrency">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The concurrent execution number of DDL at proxy.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `proxy.dclConcurrency`

<table id="proxy.dclConcurrency">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The concurrent execution number of DCL at proxy.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `proxy.mustUsePartitionKey`

<table id="proxy.mustUsePartitionKey">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        switch for whether proxy must use partition key for the collection      </td>
      <td>false</td>
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
      <td>        Whether to enable the access log feature.      </td>
      <td>false</td>
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
      <td>        Whether to upload local access log files to MinIO. This parameter can be specified when proxy.accessLog.filename is not empty.      </td>
      <td>false</td>
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
      <td>        The local folder path where the access log file is stored. This parameter can be specified when proxy.accessLog.filename is not empty.      </td>
      <td>/tmp/milvus_access</td>
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
      <td>        The name of the access log file. If you leave this parameter empty, access logs will be printed to stdout.      </td>
      <td></td>
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
      <td>        The maximum size allowed for a single access log file. If the log file size reaches this limit, a rotation process will be triggered. This process seals the current access log file, creates a new log file, and clears the contents of the original log file. Unit: MB.      </td>
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
      <td>        The maximum time interval allowed for rotating a single access log file. Upon reaching the specified time interval, a rotation process is triggered, resulting in the creation of a new access log file and sealing of the previous one. Unit: seconds      </td>
      <td>0</td>
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
      <td>        The path of the object storage for uploading access log files.      </td>
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
      <td>        The time interval allowed for uploading access log files. If the upload time of a log file exceeds this interval, the file will be deleted. Setting the value to 0 disables this feature.      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>


## `proxy.accessLog.cacheSize`

<table id="proxy.accessLog.cacheSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Size of log of write cache, in byte. (Close write cache if size was 0)      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>


## `proxy.accessLog.cacheFlushInterval`

<table id="proxy.accessLog.cacheFlushInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        time interval of auto flush write cache, in seconds. (Close auto flush if interval was 0)      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>


## `proxy.connectionCheckIntervalSeconds`

<table id="proxy.connectionCheckIntervalSeconds">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the interval time(in seconds) for connection manager to scan inactive client info      </td>
      <td>120</td>
    </tr>
  </tbody>
</table>


## `proxy.connectionClientInfoTTLSeconds`

<table id="proxy.connectionClientInfoTTLSeconds">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        inactive client info TTL duration, in seconds      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>


## `proxy.maxConnectionNum`

<table id="proxy.maxConnectionNum">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the max client info numbers that proxy should manage, avoid too many client infos      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>


## `proxy.gracefulStopTimeout`

<table id="proxy.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        seconds. force stop node without graceful stop      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>


## `proxy.slowQuerySpanInSeconds`

<table id="proxy.slowQuerySpanInSeconds">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        query whose executed time exceeds the `slowQuerySpanInSeconds` can be considered slow, in seconds.      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>


## `proxy.queryNodePooling.size`

<table id="proxy.queryNodePooling.size">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the size for shardleader(querynode) client pool      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `proxy.http.enabled`

<table id="proxy.http.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether to enable the http server      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `proxy.http.debug_mode`

<table id="proxy.http.debug_mode">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether to enable http server debug mode      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `proxy.http.port`

<table id="proxy.http.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        high-level restful api      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `proxy.http.acceptTypeAllowInt64`

<table id="proxy.http.acceptTypeAllowInt64">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        high-level restful api, whether http client can deal with int64      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `proxy.http.enablePprof`

<table id="proxy.http.enablePprof">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether to enable pprof middleware on the metrics port      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `proxy.ip`

<table id="proxy.ip">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP address of proxy. If not specified, use the first unicastable address      </td>
      <td></td>
    </tr>
  </tbody>
</table>


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
      <td>        TCP port of proxy      </td>
      <td>19530</td>
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
      <td>        The maximum size of each RPC request that the proxy can send, unit: byte      </td>
      <td>268435456</td>
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
      <td>        The maximum size of each RPC request that the proxy can receive, unit: byte      </td>
      <td>67108864</td>
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
      <td>        The maximum size of each RPC request that the clients on proxy can send, unit: byte      </td>
      <td>268435456</td>
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
      <td>        The maximum size of each RPC request that the clients on proxy can receive, unit: byte      </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>


