---
id: configuration_standalone.md
title: Milvus Standalone System Configuration
---
# System Configurations

## Common Configurations

### Third-party engine configurations

The Milvus Standalone uses three third-party engines: etcd, minIO, and RocksDB. Among them, etcd is the metadata engine of the system, supporting the metadata storage and visit. minIO is the storage engine that supports the persistent storage of the log files and index files. And RocksDB is the underlying engine that supports the reliable storage and pub/sub of log streams.

| **Configuration**     | **Description**                                             |
| --------------------- | ----------------------------------------------------------- |
| etcd.address          | IP address of etcd                                          |
| etcd.port             | Port of etcd                                                |
| etcd.rootPath         | Root path to etcd for data storage                          |
| minio.address         | IP address of minIO                                         |
| minio.port            | Port of minIO                                               |
| minio.accessKeyID     | User access key ID that minIO provided for authorized acess |
| minio.secretAccessKey | String that minIO used for encryption                       |
| minio.useSSL          | Whether enable minIO to use SSL protocol                    |

### Log configurations

Log configurations are used to control the system log output. A rich collection of logs will be generated during the service of Milvus. By default, Milvus will export logs, which carry debug records and contents of higher level, to standard output (stdout) and standard error (stderr).

| **Configuration** | **Description**                               |
| ----------------- | --------------------------------------------- |
| log.level         | Log level in Milvus                           |
| log.file.rootPath | Root path to the folder holding the log files |

### Server address configurations

Server address configurations are used to set the IP address and port of the monitor request from Milvus service.

| **Configuration** | **Description**                             |
| ----------------- | ------------------------------------------- |
| proxyNode.port    | Port of monitor request from Milvus service |

### Other configurations

Other configurations are used to set the IDs of some services.

| **Configuration**   | **Description**     |
| ------------------- | ------------------- |
| dataService.nodeID  | ID of data service  |
| master.nodeID       | ID of master        |
| queryService.nodeID | ID of query service |

## Advanced Configurations

### etcd-related configurations

etcd-related configurations are used to set the subprefix of the key to the data from Milvus.

| **Configuration**        | **Description**                                    |
| ------------------------ | -------------------------------------------------- |
| etcd.metaSubPath         | Subprefix of key to metadata                       |
| etcd.kvSubPath           | Subprefix of key to the latest global clock and ID |
| etcd.segFlushMetaSubPath | Subprefix of key to persistent DM data             |
| etcd.ddlFlushMetaSubPath | Subprefix of key to persistent DDL data            |

### minIO-related configuration

minIO-related configuration is used to set the bucket name of the folder where minIO stores the data from Milvus.

| **Configuration** | **Description**      |
| ----------------- | -------------------- |
| minio.bucketName  | Bucket name of minIO |

### Log-related configurations

Log-related configurations are used to set the relevant information of the log files.

| **Configuration**   | **Description**                                        |
| ------------------- | ------------------------------------------------------ |
| log.file.maxSize    | The maximum size of each log file                      |
| log.file.maxAge     | The maximum length of time that Milvus keeps log files |
| log.file.maxBackups | The maximum number of log files that Milvus keeps      |
| log.format          | The output format of logs                              |

### Log stream-related configurations

The underlying engine of the message stream in the Milvus Standalone is RocksDB, whereas that of the Milvus Cluster is Pulsar. In Milvus terminology, ‘channel’ is equivalent to the ‘topic’ in Pulsar.

In Milvus system, some of the messages - insert log and timetick, for instance - are supposed to be non-volatile. Milvus supports this function based on the log stream system.

Log stream-related configurations control the name of the channel and the subscription name of each service. In the general application scenarios, users do not have to change those configurations. If they expect to adopt the existing message system to support the message stream of Milvus (for instance, using the existing Pulsar cluster to support Milvus), please ensure that the default channel name of Milvus does not conflict with the naming of the existing message stream.

| **Configuration**                                  | **Description**                                              |
| -------------------------------------------------- | ------------------------------------------------------------ |
| msgChannel.chanNamePrefix.dataDefinition           | Name prefix of the channel of data definition message        |
| msgChannel.chanNamePrefix.masterTimeTick           | Name prefix of the channel where master publishes the timetick message |
| msgChannel.chanNamePrefix.masterStatistics         | Name prefix of the channel where master publishes the statistics message of this module |
| msgChannel.chanNamePrefix.search                   | Name prefix of the channel of the search message             |
| msgChannel.chanNamePrefix.searchResult             | Name prefix of the channel of the search result message      |
| msgChannel.chanNamePrefix.k2s                      | Name prefix of the channel of the key to segment message     |
| msgChannel.chanNamePrefix.proxyTimeTick            | Name prefix of the channel where proxy node publishes the timetick message |
| msgChannel.chanNamePrefix.proxyServiceTimeTick     | Name prefix of the channel where proxy service publishes the timetick message |
| msgChannel.chanNamePrefix.queryTimeTick            | Name prefix of the channel where query node publishes the timetick message |
| msgChannel.chanNamePrefix.queryNodeStats           | Name prefix of the channel where query node publishes the statistics message of this module |
| msgChannel.chanNamePrefix.cmd                      | Name prefix of the channel where load index and flush completed instructions are published |
| msgChannel.chanNamePrefix.dataServiceInsertChannel | Name prefix of the channel where insert message is published |
| msgChannel.chanNamePrefix.dataServiceStatistic     | Name prefix of the channel where data node publishes the statistics message of this module |
| msgChannel.chanNamePrefix.dataServiceTimeTick      | Name prefix of the channel where data node publishes the timetick message |
| msgChannel.chanNamePrefix.dataServiceSegmentInfo   | Name prefix of the channel where data service publishes segment info message and data node publishes segment flushed message |
| msgChannel.subNamePrefix.masterSubNamePrefix       | Subscription name prefix with which master subscribes message stream |
| msgChannel.subNamePrefix.proxySubNamePrefix        | Subscription name prefix with which proxy node subscribes message stream |
| msgChannel.subNamePrefix.queryNodeSubNamePrefix    | Subscription name prefix with which query node subscribes message stream |
| msgChannel.subNamePrefix.dataNodeSubNamePrefix     | Subscription name prefix with which data node subscribes message stream |
| msgChannel.subNamePrefix.dataServiceSubNamePrefix  | Subscription name prefix with which data service subscribes message stream |

### Datanode-related configurations

Specific configurations of datanode module

| **Configuration**                          | **Description**                                              |
| ------------------------------------------ | ------------------------------------------------------------ |
| dataNode.dataSync.flowGraph.maxQueueLength | The maximum queue length of the flow graph                   |
| dataNode.flush.insertBufSize               | The maximum number of rows of insert log that datanode buffers in memory before autoflush into persistent storage. |
| dataNode.flush.ddBufSize                   | The maximum number of ddl instruction that datanode buffers in memory before autoflush into persistent storage. |

### Dataservice-related configurations

Specific configurations of dataservice module

| **Configuration**                      | **Description**                                              |
| -------------------------------------- | ------------------------------------------------------------ |
| dataService.segment.sizeFactor         | The maximum proportion which the real size of a segment takes up the dataService.segment.size |
| dataService.segment.size               | The maximum size of a segment file                           |
| dataService.segment.IDAssignExpiration | The validity period for a valid ID                           |
| dataService.insertChannelNum           | The number of insert channel                                 |

### Master-related configurations

Specific configurations of master module

| **Configuration**                  | **Description**                                              |
| ---------------------------------- | ------------------------------------------------------------ |
| master.maxPartitionNum             | The maximum number of partitions users can create            |
| master.minSegmentSizeToEnableIndex | The minimum number of rows of the insert log in one segment to enable indexing |

### Proxynode-related configurations

Specific configurations of proxynode module

| **Configuration**                    | **Description**                                              |
| ------------------------------------ | ------------------------------------------------------------ |
| proxyNode.timeTickInterval           | The time interval between which proxynode publishes timetick messages |
| proxyNode.msgStream.timeTick.bufSize | The buffer size of the channel holding timetick messages     |
| proxyNode.maxNameLength              | The maximum length of the name-related string                |
| proxyNode.maxFieldNum                | The maximum number of fields a collection can contain        |
| proxyNode.maxDimension               | The maximum number of dimensions of a vector                 |

### Querynode-related configurations

Specific configurations of querynode module

| **Configuration**                            | **Description**                                              |
| -------------------------------------------- | ------------------------------------------------------------ |
| queryNode.gracefulTime                       | The minimum waiting time before the search is executed when the system times of query node and the search are not synchronized. |
| queryNode.stats.publishInterval              | The interval that query node sends out its own statistics message |
| queryNode.dataSync.flowGraph.maxQueueLength  | The maximum message queue length of flow graph               |
| queryNode.msgStream.insert.recvBufSize       | The buffer size of the channel which msgStream stores insert log |
| queryNode.msgStream.insert.pulsarBufSize     | The buffer size of log stream underlying engine to store insert log |
| queryNode.msgStream.search.recvBufSize       | The buffer size of the channel which Milvus log stream stores search message |
| queryNode.msgStream.search.pulsarBufSize     | The buffer size of log stream underlying engine to store search message |
| queryNode.msgStream.searchResult.recvBufSize | The buffer size of the channel which Milvus log stream stores search result message |
| queryNode.msgStream.stats.recvBufSize        | The buffer size of the channel which Milvus log stream stores status message |
| queryNode.msgStream.timeTick.recvBufSize     | The buffer size of the channel which Milvus log stream stores timetick message |

### Other configurations

Configurations of the default names of partitions and indexes in the system

| **Configuration**           | **Description**           |
| --------------------------- | ------------------------- |
| common.defaultPartitionName | Partition name by default |
| common.defaultIndexName     | Index name by default     |

## Common Configurations Details

### Third-party engine configuration details

#### etcd

etcd.address

- IP address of the monitoring request of etcd.
- Default value: localhost
- Environment variable: ETCD_ADDRESS
- Detailed descriptions:
  - It is used to access etcd service. etcd.address and etcd.port together forms the valid address of etcd monitoring request. When Milvus is started, it preferentially acquires the valid address from the environment variable ETCD_ADDRESS.
  - Milvus currently only supports communication with etcd on a single node. The default value applies to the condition that etcd and Milvus are running on the same network.
  - The function of communicating with etcd cluster will be supported in subsequent versions.

etcd.port

- Port of etcd.
- Default value: 2379
- Detailed descriptions:
  - Port of the etcd service monitor. etcd.address and etcd.port togrther forms the valid address of etcd monitoring request. When Milvus is started, it preferentially acquires the valid address from the environment variable ETCD_ADDRESS.

etcd.rootPath

- Root key prefix that Milvus used to store data to etcd
- Default value: "by-dev"
- Detailed descriptions:
  - The data stored by Milvus in etcd will be under this root path.
  - After using Milvus for a period of time, do not change this configuration unless you have a clear idea of it. After the change, all previous data will not be accessed correctly.
  - It is recommended to change this configuration before starting Milvus for the first time.
  - For the existing etcd services, please set an easy-to-identify root path for Milvus. We recommend setting it to "milvus-root".

#### minIO

minio.address

- IP address of the monitoring request of minIO
- Default value: localhost
- Environment variable: MINIO_ADDRESS
- Detailed descriptions:
  - It is used to access the minIO service. minio.address and minio.port together forms the valid address of the minIO monitoring request. When Milvus is started, it preferentially acquires the valid address from the environment variable MINIO_ADDRESS.
  - The default value applies to the condition that minIO and Milvus are running on the same network.
  - Milvus currently uses non-secure mode to access minIO. Subsequent versions will support secure access to minIO.

minio.port

- The port of minIO monitoring request
- Default value: 9000
- Detailed descriptions:
  - It is used to access the minIO service. minio.address and minio.port together forms the valid address of the minIO monitoring request. When Milvus is started, it preferentially acquires the valid address from the environment variable MINIO_ADDRESS.

minio.accessKeyID

- User access key ID that minIO provided for authorized acess
- Default value: minioadmin
- Detailed descriptions:
  - Access key ID that minIO issued to users as authorized acess. It is used for identity authentication to access the minIO service in conjunction with minio.secretAccessKey.
  - This configuration in Milvus is required to be identical to the environment variable MINIO_ACCESS_KEY which is necessitated when the minIO service is started. The default value applies to the minIO service started with the default docker-compose.yml provided by Milvus.

minio.secretAccessKey

- The string used for minIO encryption
- Default value: minioadmin
- Detailed descriptions:
  - It is the secret key used to encrypt the signature string and verify the signature string on the server side. It must be kept strictly confidential, and only the minIO server and users are supposed to know it.
  - This configuration in Milvus needs to be identical to the environment variable MINIO_SECRET_KEY which is necessitated when the minIO service is started. The default value applies to the minIO service started with the default docker-compose.yml provided by Milvus.

minio.useSSL

- It is to configure whether to access the MinIO service through SSL.
- Default value: false
- Detailed descriptions:
  - Using SSL refers to using HTTPS protocol to access minIO, which has high security. Not using SSL refers to using HTTP protocol to access minIO, which is less secure.
  - Currently, Milvus does not support secure access to the minIO service. Subsequent versions will support secure access to the minIO service.

### Log configuration details

Log.Level

- Log record level
- Default value: debug
- Detailed descriptions:
  - Optional: Debug, Info, Warn, Error, Panic, Fatal, Dpanic.
  - We recommend using the Debug level in the test and development environment, and the Info level in the production environment.

Log.File.RootPath

- Path to the log files
- Default value:""
- Detailed descriptions:
  - The default is empty, indicating that output to standard output (stdout) and standard error (stderr).
  - If it is set to a valid local path, the Milvus log will be written and stored in this path.
  - Please set it as the path that you have permission to write. We recommend using "/tmp/milvus".

### Service address configuration details

ProxyNode.port

- The TCP port of Milvus monitoring request
- Default value: 19530
- This parameter takes effect only after being configured at startup.

### Other configuration details

dataService.nodeID

- ID of dataService
- Default value: 14040
- Detailed description:
  - Data service derives ID from this parameter when it starts.

master.nodeID

- ID of master
- Default value: 100
- Detailed description:
  - Master derives ID from this parameter when it starts.

queryService.nodeID

- ID of queryService
- Default value: 200
- Detailed description:
  - Query service derives ID from this parameter when it starts.

### Environment variable

- QUERY_NODE_ID
- ID of queryNode
- Detailed description: The environment variable depends on QueryNode to start. Different values are required to be set when multiple querynodes are started.

## Advanced configuration details

### etcd-related detailed configurations

etcd.metaSubPath

- Subpath used to store metadata to etcd
- Default value: "meta"
- Detailed descriptions:
  - All of the metadata-related information in Milvus system is stored under this path.
  - Unless you are very clear about the purpose of changing this configuration, do not change it after you have been using Milvus for a while. Changing this configuration will cause failure for Milvus to access the data under the path that was before the change.
  - By default, visit the etcd path *by-dev/meta* to learn what metadata does Milvus store in etcd.

etcd.kvSubPath

- Subpath under which the global latest clock and global unique latest ID are stored.
- Default value: "kv"
- Detailed descriptions:
  - The global latest clock and global unique latest ID in Milvus system are stored under this path
  - If there is no special case, the default value can meet most of the needs.
  - By default, visit *by-dev/kv* to access these contents.

etcd.segFlushMetaSubPath

- Subpath under which persistent DML data path is stored
- Default value: "datanode/segment"
- Detailed descriptions:
  - DML data is persisted in the reliable storage (S3/Minio, etc) by datanode. The real path of those persistent data will be stored under this path of etcd.
  - By default, visit the etcd path *by-dev/datanode/segment* to learn where DML data is stored in Minio/S3.
  - We recommend not changing it arbitrarily.

etcd.ddlFlushMetaSubPath

- Subpath for storing persistent DDL data paths
- Default value: "dataNode/ddl"
- Detailed descriptions:
  - DDL data is persisted in the reliable storage (S3/Minio, etc) by datanode. The real path of those persistent data will be stored under this path of etcd.
  - By default, visit the etcd path *by-dev/datanode/ddl* to learn where DDL data is stored in Minio/S3.

### minIO-related configuration details

minio.bucketName

- buckets where minIO stores data. For relevant concepts, check the [Instruction of minIO](https://docs.min.io/minio/baremetal/introduction/minio-overview.html#buckets).
- Default value: a-bucket
- Detailed descriptions:
  - For buckets that stores data, all persistent data in Milvus will be stored in this bucket of the minIO service. Currently, Milvus does not support storing data in multiple buckets.
  - If this bucket does not exist in the minIO service, it will be created. If the bucket already exists and is accessible, it will be used directly. Otherwise, there will be an error.
  - When using Docker to start the minIO service locally, the data will be stored in the local Docker, ensure that the disk space is sufficient.
  - In minIO service, bucketName is globally unique. There are no two buckets with the same name.
  - This configuration is compatible with S3.

### Log-related configuration details

log.file.maxSize

- Maximum size of a single log file
- Default value: 300
- Unit: MB
- Detailed descriptions:
  - It takes effect only after the valid log.file.rootPath is set. The minimum value is 1.
  - When the size of the log file exceeds this configuration value, the system will back up the current file and automatically write on a new log file.

log.file.maxAge

- The maximum number of days that log files are reserved
- Default value: 10
- Unit: day
- Detailed descriptions:
  - It takes effect only after the valid log.file.rootPath is set. The minimum value is 1.
  - Log files are automatically cleared when the system log files have been saved for more than this value and the system is running.

log.file.maxBackups

- The maximum number of log files to back up.
- Default value: 20
- Detailed descriptions:
  - It takes effect only after the valid log.file.rootPath is set. The minimum value is 1.
  - Log files are automatically cleared when the number of backups of the system log files exceeds this value and the system is running.

log.format

- Format of log output
- Default value: text
- Optional: text, JSON

### Log Stream Related Configuration Details

msgChannel.chanNamePrefix.dataDefinition

- Name prefix of data definition message channel
- Default value: data-definition
- Detailed descriptions:
  - data definition message indicates defining or modifying metadata or the related operations, such as create a collection, drop a collection, etc.
  - After the master service receives the rpc data definition request, it will first complete the current operation of metadata creation or modification, and then publish the current data definition message to this channel
  - By subscribing to the data definition channel, other services can access the change log of the current metadata, and thereby calculate the metadata information of any time point.

msgChannel.chanNamePrefix.masterTimeTick

- Name prefix of the channel where master publishes the timetick message
- Default value: master-timetick
- Detailed descriptions:
  - master service regularly publishes this module's current latest timetick message to this channel.
  - By subscribing to this channel, external service can access to master service's current clock.

msgChannel.chanNamePrefix.masterStatistics

- Name prefix of the channel where master publishes the module statistics message
- Default value: master-statistics
- Detailed descriptions:
  - Module statistics message refers to the internal statistics of master service, including CPU occupation, memory usage, health, etc.
  - By subscribing to this channel, external service can access the work status of master service.

msgChannel.chanNamePrefix.search

- Name prefix of the channel of search message
- Default value: search
- Detailed descriptions:
  - After called by the rpc search, proxy node publishessearch message to this channel.
  - Query node will subscribe to this Channel and is responsible for query operations.
  - By subscribing to this channel, external service can calculate the query load of the current Milvus system.

msgChannel.chanNamePrefix.searchResult

- Name prefix of the channel of search result message.
- Default value: searchResult
- Detailed descriptions:
  - Query node is responsible for publishing the current query result to this channel.
  - Proxy node is responsible for subscribing to this channel to read query results.

msgChannel.chanNamePrefix.k2s

- Name prefix of the channel of the key to segment message
- Default value: k2s
- Detailed descriptions:
  - key to segment message indicates the location of a specified primary key. It can be used to delete the specified primary key record.
  - Data node is responsible for publishing key to segment messages to this channel.
  - *(To be implemented)* Query node is responsible for subscribing to this channel to access the information to delete the specified primary key record.

msgChannel.chanNamePrefix.proxyTimeTick

- Name prefix of the channel where proxy node publishes timetick message
- Default value: proxyTimeTick
- Detailed descriptions:
  - Proxy Node regularly publishes this module's current latest timetick to this channel.
  - By subscribing to this channel, external service can learn to what time does the system time of proxy node has progressed.

msgChannel.chanNamePrefix.proxyServiceTimeTick

- Name prefix of the channel where Proxy Service publishes TimeTick Messages
- Default value: proxyServiceTimeTick
- Detailed descriptions:
  - Proxy service regularly publishes this module's current latest timetick message to this channel.
  - By subscribing to this channel, external service can learn to what time does the system time of proxy service has progressed.

msgChannel.chanNamePrefix.queryTimeTick

- Name prefix of the channel where query node publishes timetick message.
- Default value: queryTimeTick
- Detailed descriptions:
  - Querynode regularly publishes this module's current latest timetick message to this channel.
  - By subscribing to this channel, external service can learn to what time does the system time of query node has progressed.

msgChannel.chanNamePrefix.queryNodeStats

- Name prefix of the channel where query node publishes statistics message.
- Default value: queryNodeStats
- Detailed descriptions:
  - Statistical data message refers to the internal status statistics of query node, including CPU occupation, memory usage, health, etc.
  - By subscribing to this channel, external service can access the work status of Query Node.

msgChannel.chanNamePrefix.dataServiceInsertChannel

- Name prefix of the channel where insert message is published.
- Default value: "insert-channel"
- Detailed descriptions:
  - Each collection has its own insert channel, and data service controls to which channel the specified data should be inserted.
  - Proxy node publishes insert data into these channels.
  - Data node subscribes to all the insert channels and is responsible for writing data for insertion to persistent storage.
  - Query node subscribes to the insert channels corresponding to the collection that has been already loaded, and is responsible for organizing this data in memory to facilitate the query.

msgChannel.chanNamePrefix.dataServiceStatistic

- Name prefix of the channel where data node publishes statistics of the module.
- Default value: dataservice-statistics-channel
- Detailed descriptions:
  - The statistics of this module include segment status, CPU occupation, memory usage, and health conditions, etc.
  - External services can access the working status of data node by subscribing to this channel.

msgChannel.chanNamePrefix.dataServiceTimeTick

- Name prefix of the channel where data node publishes timetick message.
- Default value: datadervice-timetick-channel
- Detailed descriptions:
  - Data Node regularly publishes this module's current latest system time to this channel.
  - By subscribing to this channel, the external service can access the current system time of the data node, and learn to which time it has advanced.

msgChannel.chanNamePrefix.dataServiceSegmentInfo

- Name prefix of the channel where data service publishes segment Info messages and data node publishes segment flushed message.
- Default value: segment-info-channel
- Detailed descriptions:
  - Data Service decides when to open a new segment, and when to seal an old segment.
    - After opening a new segment, data service will publish the current segment info message to this channel.
    - After sealing an old segment, data service will notify data node to persistently store all the data of this segment; after Data Node completed the data persistence operation, it will publish segment flushed message to this channel.
  - Master service subscribes to this channel.
    - When master service receives the segment info message, it will update the corresponding collection metadata.
    - When the master service receives the segment flushed message, it will notify index service to create an index in this segment.

msgChannel.subNamePrefix.masterSubNamePrefix

- Subscription Name for master service to subscribe message queue
- Default value: master
- Detailed descriptions:
  - Two parameters need to be set when subscribing to the message queue: channel name and subscription name.
    - If A and B both subscribe to Channel C with subscription names being subA and subB respectively, both A and B will receive the total data from Channel C.
    - If A and B both subscribe to Channel C with the same subscription name, the data sum of A and B received is the total data from Channel C.

msgChannel.subNamePrefix.proxySubNamePrefix

- Subscription Name for proxy node to subscribe message queue.
- Default value: proxy
- Detailed descriptions:
  - Two parameters need to be set when subscribing to the message queue: channel name and subscription name.
    - If A and B both subscribe to Channel C with subscription names being subA and subB respectively, both A and B will receive the total data from Channel C.
    - If A and B both subscribe to Channel C with the same subscription name, the data sum of A and B received is the total data from Channel C.

msgChannel.subNamePrefix.queryNodeSubNamePrefix

- Subscription Name for query node to subscribe message queue.
- Default value: queryNode
- Detailed descriptions:
  - Two parameters need to be set when subscribing to the message queue: channel name and subscription name.
    - If A and B both subscribe to Channel C with subscription names being subA and subB respectively, both A and B will receive the total data from Channel C.
    - If A and B both subscribe to Channel C with the same subscription name, the data sum of A and B received is the total data from Channel C.

msgChannel.subNamePrefix.dataNodeSubNamePrefix

- Subscription Name for data node to subscribe message queue.
- Default value: dataNode
- Detailed descriptions:
  - Two parameters need to be set when subscribing to the message queue: channel name and subscription name.
    - If A and B both subscribe to Channel C with subscription names being subA and subB respectively, both A and B will receive the total data from Channel C.
    - If A and B both subscribe to Channel C with the same subscription name, the data sum of A and B received is the total data from Channel C.

msgChannel.subNamePrefix.dataServiceSubNamePrefix

- Subscription Name for data service to subscribe message queue.
- Default value: dataService
- Detailed descriptions:
  - Two parameters need to be set when subscribing to the message queue: channel name and subscription name.
    - If A and B both subscribe to Channel C with subscription names being subA and subB respectively, both A and B will receive the total data from Channel C.
    - If A and B both subscribe to Channel C with the same subscription name, the data sum of A and B received is the total data from Channel C.

### Datanode-related configuration details

dataNode.dataSync.flowGraph.maxQueueLength

- Maximum queue length of flow graph.
- Default value: 1024
- Detailed description: The maximum number of messages that flow graph can store. The default value can meet most of the situations.

dataNode.flush.insertBufSize

- The maximum number of rows of the insert data buffered in a segment.
- Default value: 32000
- Detailed descriptions:
  - DataNode packs all cache data to a group of binlog files and stores it in minIO/S3 when the data in memory exceeds this value.
  - This parameter is associated with the size of the data. If it is set too small, the system will store a small amount of data too frequently. If it is set too large, the system's demand for memory of the system will increase.
  - The default value applies to most scenarios. For a 128-dimensions floating-point embedding vector, 32000 rows generate approximately a 16 MB binlog file.

dataNode.flush.ddBufSize

- The maximum number of cache requests in memory.
- Default value: 20
- Detailed description:
  - The DDL request itself will be cached. By default, datanode packs every 20 DDL requests in a group of binlog files and stores it on minIO/S3.

### Dataservice-related configuration details

dataService.segment.size

- Maximum size of a segment file.
- Default value: 512
- Unit: MB
- Detailed descriptions:
  - The size of a segment file size will not exceed this value.
  - This parameter and dataService.segment.sizeFactor together determine if a segment can be sealed. Usually, the size of a segment file is between 384 to 512 MB.

dataService.segment.sizeFactor

- The maximum proportion of which the real size of a segment takes up the dataService.segment.size.
- Default value: 0.75
- Detailed description:
  - When the proportion exceeds this parameter, the segment can be sealed.

dataService.segment.IDAssignExpiration

- Time before the expiration of the valid ID.
- Default value: 2000
- Unit: ms
- Detailed descriptions:
  - The dataservice-assigned ID has an expiration time. This configuration indicates that the ID is valid for 2000 ms. The expired ID will not be used again.

dataService.insertChannelNum

- Number of the insert channels.
- Default value: 2
- Detailed description:
  - Each collection in the Milvus system has an individual insert channel. This configuration sets the number of insert channels owned by each collection.

### Master-related configuration details

master.maxPartitionNum

- Maximum number of partitions
- Default value: 4096
- Detailed descriptions:
  - This value specifies the maximum number of partitions that each collection in the Milvus system can have.
  - When this value is 0 or 1, the collection has only one default partition, and users cannot create new partitions.
  - The upper limit of this value is INT64MAX.

master.minSegmentSizeToEnableIndex

- The minimum number of rows of insert log for valid index creation of segment.
- Default value: 1024
- Detailed description:
  - This value specifies the minimum number of insert log rows that a segment allows to create an index.

### Proxynode-related configuration details

proxyNode.timeTickInterval

- The time interval at which the proxy node publishes timetick messages
- Default value: 200
- Unit: ms
- Detailed descriptions:
  - Proxy node will post a timetick message after an interval, indicating that all tasks (excluding query tasks) before this time node have been completed.
  - The proxyservice will subscribe to this message to learn which time node the proxy node is currently in. For the specific behavior after proxy service receives the timetick message, please refer to the [Architecture document](https://raw.githubusercontent.com/milvus-io/milvus/master/docs/developer_guides/figs/time_sync_msg_producer.png).
  - This configuration dynamically balances system throughput and system response delay. When the configuration value increases, the system throughput will increase and the response delay will increase; when the configuration value decreases, the system throughput will decrease and the response delay will decrease.

proxyNode.msgStream.search.bufSize

- The buffer size of the message queue to store search messages.
- Default value: 1024
- Detailed description:
  - The message queue of Milvus has a buffer area. This configuration specifies that the size of the message queue buffer is 1024 messages.

proxyNode.maxNameLength

- Maximum length of various names.
- Default value: 255
- Detailed description:
  - This configuration specifies the longest length of various names that can be created in Milvus system, and it is used as the basis for static checking. The current version includes the collection name, partition name, and field name.

proxyNode.maxFieldNum

- Maximum number of fields in a collection
- Default value: 64
- Detailed description:
  - The maximum number of fields that a collection created by Milvus system can hold.

proxyNode.maxDimension

- The maximum number of dimensions of a vector.
- Default value: 32768
- Detailed description:
  - The maximum number of dimensions of the vector contained in the collection in Milvus system.

### Querynode-related configuration details

queryNode.gracefulTime

- The minimum waiting time before the search is executed when the system times of query node and the search are not synchronized.
- Default value: 5000
- Unit: ms
- Detailed descriptions:
  - When the search message timestamp is ahead the query node system time, this query command is executed directly.
  - When the search message timestamp is behind the query node system time, the search message will wait for the querynode system time to advance until the time difference between them is less than this configuration, and then the query will be executed.

queryNode.stats.publishInterval

- The time interval for querynode to publish its own statistics messages
- Default value: 1000
- Unit: ms
- Detailed descriptions:
  - Query node will periodically publish its own module statistics messages to the channel prefixed by msgChannel.chanNamePrefix.queryNodeStats. The statistics include segment status, cpu usage, memory usage, health status, etc.
  - The default publishing interval is 1000 ms.

queryNode.dataSync.flowGraph.maxQueueLength

- Maximum size of cache of flow graph in query node.
- Default value: 1024
- Unit: MB
- Detailed descriptions:
  - Query node uses the flow graph to subscribe to and organize the data of the message flow, including inserting data, creating a collection, etc.
  - This configuration specifies the maximum size of the internal cache message after flow graph collating the message flow data.

queryNode.msgStream.insert.recvBufSize

- The maximum buffer size for consuming insert channel messages.
- Default value: 1024
- Detailed description:
  - This configuration specifies the size of the buffer used to consume insert channel messages in the query node, and the unit is the number of messages.

queryNode.msgStream.insert.pulsarBufSize

- The maximum size of the consumer message buffer of the underlying engine of the message flow.
- Default value: 1024
- Detailed description:
  - This configuration specifies the buffer size of the consumer message of the bottom engine of the message flow in the query node, and the unit is the number of messages.

queryNode.msgStream.search.recvBufSize

- Maximum buffer size for consuming search channel messages.
- Default value: 512
- Detailed description:
  - This configuration specifies the size of the buffer used to consume insert channel messages in the query node, and the unit is the number of messages.

queryNode.msgStream.search.pulsarBufSize

- The maximum size of the consumer message buffer of the underlying engine of the message flow.
- Default value: 512
- Detailed description:
  - This configuration specifies the buffer size of the consumer message of the bottom engine of the message flow in the query node, and the unit is the number of messages.

queryNode.msgStream.searchResult.recvBufSize

- Maximum buffer size for consuming searchResult channel messages.
- Default value: 512
- Detailed description:
  - This configuration specifies the size of the buffer used to consume insert channel messages in the query node, and the unit is the number of messages.

queryNode.msgStream.stats.recvBufSize

- The maximum buffer size for consuming stats channel messages.
- Default value: 64
- Detailed description:
  - This configuration specifies the size of the buffer used to consume insert channel messages in the query node, and the unit is the number of messages.

queryNode.msgStream.timeTick.recvBufSize

- The maximum buffer size for consuming timeTick channel messages.
- Default value: 64
- Detailed description:
  - This configuration specifies the size of the buffer used to consume insert channel messages in the query node, and the unit is the number of messages.

### Other configuration details

common.defaultPartitionName

- Default partition name
- Default value: _default
- Detailed descriptions:
  - Create a partition with this name by default when creating a collection.
  - If no partition is specified, data will be inserted into this partition by default.
  - The user cannot delete and create the default partition.

common.defaultIndexName

- Default index name
- Default value: _default_idx
- Detailed description:
  - When the index is created without specifying the name of the index, this configuration will be used to name the index.