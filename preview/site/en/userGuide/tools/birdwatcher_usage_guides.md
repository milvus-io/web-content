---
id: birdwatcher_usage_guides.md
summary: Learn how to use Birdwatch to debug Milvus.
title: Use Birdwatcher
---

# Use Birdwatcher

This guide walks you through how to use Birdwatcher to check the state of your Milvus and configure it on the fly.

## Start Birdwatcher

Birdwatcher is a command-line tool, you can start it as follows:

```shell
./birdwatcher
```

Then you will be greeted with the following prompt:

```shell
Offline >
```

## Connect to etcd

You need to use Birdwatcher to connect to etcd before any other operations.

- Connect with default settings

    ```shell
    Offline > connect
    Milvus(by-dev) >
    ```

- Connect from Birdwatcher in a pod

    If you choose to run Birdwatcher in a Kubernetes pod, you need first obtain the IP address of etcd as follows:

    ```shell
    kubectl get pod my-release-etcd-0 -o 'jsonpath={.status.podIP}'
    ```

    Then access the shell of the pod.

    ```shell
    kubectl exec --stdin --tty birdwatcher-7f48547ddc-zcbxj -- /bin/sh
    ```

    Finally, use the returned IP address to connect to etcd as follows:

    ```shell
    Offline > connect --etcd ${ETCD_IP_ADDR}:2379
    Milvus(by-dev)
    ```

- Connect with a different root path

    If the root path of your Milvus is different from `by-dev` and you are prompted with an error reporting about an incorrect root path, you can connect to etcd as follows:

    ```shell
    Offline > connect --rootPath my-release
    Milvus(my-release) >
    ```

    If you do not know the root path of your Milvus, connect to etcd as follows:

    ```shell
    Offline > connect --dry
    using dry mode, ignore rootPath and metaPath
    Etcd(127.0.0.1:2379) > find-milvus
    1 candidates found:
    my-release
    Etcd(127.0.0.1:2379) > use my-release
    Milvus(my-release) >
    ```

## Check Milvus status

You can use the `show` commands to check Milvus status.

```shell
Milvus(my-release) > show -h
Usage:
   show [command]

Available Commands:
  alias               list alias meta info
  channel-watch       display channel watching info from data coord meta store
  checkpoint          list checkpoint collection vchannels
  collection-history  display collection change history
  collection-loaded   display information of loaded collection from querycoord
  collections         list current available collection from RootCoord
  config-etcd         list configuations set by etcd source
  configurations      iterate all online components and inspect configuration
  current-version     
  database            display Database info from rootcoord meta
  index               
  partition           list partitions of provided collection
  querycoord-channel  display querynode information from querycoord cluster
  querycoord-cluster  display querynode information from querycoord cluster
  querycoord-task     display task information from querycoord
  replica             list current replica information from QueryCoord
  segment             display segment information from data coord meta store
  segment-index       display segment index information
  segment-loaded      display segment information from querycoordv1 meta
  segment-loaded-grpc list segments loaded information
  session             list online milvus components

Flags:
  -h, --help   help for show

Use " show [command] --help" for more information about a command.
```

### List sessions

You can list all etcd sessions as follows:

```shell
Milvus(by-dev) > show session
Session:datacoord, ServerID: 3, Version: 2.2.11, Address: 10.244.0.8:13333
Session:datanode, ServerID: 6, Version: 2.2.11, Address: 10.244.0.8:21124
Session:indexcoord, ServerID: 4, Version: 2.2.11, Address: 10.244.0.8:31000
Session:indexnode, ServerID: 5, Version: 2.2.11, Address: 10.244.0.8:21121
Session:proxy, ServerID: 8, Version: 2.2.11, Address: 10.244.0.8:19529
Session:querycoord, ServerID: 7, Version: 2.2.11, Address: 10.244.0.8:19531
Session:querynode, ServerID: 2, Version: 2.2.11, Address: 10.244.0.8:21123
Session:rootcoord, ServerID: 1, Version: 2.2.11, Address: 10.244.0.8:53100
```

In the command output, you can find sessions from all Milvus components to etcd.

### Check databases and collections

You can list all databases and collections.

- List databases

    In the command output, you can find information about every database.

    ```shell
    Milvus(by-dev) > show database
    =============================
    ID: 1   Name: default
    TenantID:        State: DatabaseCreated
    --- Total Database(s): 1
    ```

- List collections

    In the command output, you can find detailed information about every collection.

    ```shell
    Milvus(by-dev) > show collections
    ================================================================================
    DBID: 1
    Collection ID: 443407225551410746       Collection Name: medium_articles_2020
    Collection State: CollectionCreated     Create Time: 2023-08-08 09:27:08
    Fields:
    - Field ID: 0   Field Name: RowID       Field Type: Int64
    - Field ID: 1   Field Name: Timestamp   Field Type: Int64
    - Field ID: 100         Field Name: id          Field Type: Int64
            - Primary Key: true, AutoID: false
    - Field ID: 101         Field Name: title       Field Type: VarChar
            - Type Param max_length: 512
    - Field ID: 102         Field Name: title_vector        Field Type: FloatVector
            - Type Param dim: 768
    - Field ID: 103         Field Name: link        Field Type: VarChar
            - Type Param max_length: 512
    - Field ID: 104         Field Name: reading_time        Field Type: Int64
    - Field ID: 105         Field Name: publication         Field Type: VarChar
            - Type Param max_length: 512
    - Field ID: 106         Field Name: claps       Field Type: Int64
    - Field ID: 107         Field Name: responses   Field Type: Int64
    Enable Dynamic Schema: false
    Consistency Level: Bounded
    Start position for channel by-dev-rootcoord-dml_0(by-dev-rootcoord-dml_0_443407225551410746v0): [1 0 28 175 133 76 39 6]
    --- Total collections:  1        Matched collections:  1
    --- Total channel: 1     Healthy collections: 1
    ================================================================================
    ```

- View a specific collection

    You can view a specific collection by specifying its ID.

    ```shell
    Milvus(by-dev) > show collection-history --id 443407225551410746
    ================================================================================
    DBID: 1
    Collection ID: 443407225551410746       Collection Name: medium_articles_2020
    Collection State: CollectionCreated     Create Time: 2023-08-08 09:27:08
    Fields:
    - Field ID: 0   Field Name: RowID       Field Type: Int64
    - Field ID: 1   Field Name: Timestamp   Field Type: Int64
    - Field ID: 100         Field Name: id          Field Type: Int64
            - Primary Key: true, AutoID: false
    - Field ID: 101         Field Name: title       Field Type: VarChar
            - Type Param max_length: 512
    - Field ID: 102         Field Name: title_vector        Field Type: FloatVector
            - Type Param dim: 768
    - Field ID: 103         Field Name: link        Field Type: VarChar
            - Type Param max_length: 512
    - Field ID: 104         Field Name: reading_time        Field Type: Int64
    - Field ID: 105         Field Name: publication         Field Type: VarChar
            - Type Param max_length: 512
    - Field ID: 106         Field Name: claps       Field Type: Int64
    - Field ID: 107         Field Name: responses   Field Type: Int64
    Enable Dynamic Schema: false
    Consistency Level: Bounded
    Start position for channel by-dev-rootcoord-dml_0(by-dev-rootcoord-dml_0_443407225551410746v0): [1 0 28 175 133 76 39 6]
    ```

- View all loaded collections

    You can have Birdwatcher filter all loaded collections.

    ```shell
    Milvus(by-dev) > show collection-loaded
    Version: [>= 2.2.0]     CollectionID: 443407225551410746
    ReplicaNumber: 1        LoadStatus: Loaded
    --- Collections Loaded: 1
    ```

- List all channel checkpoints of a collection

    You can have Birdwatcher list all checkpoints of a specific collection.

    ```shell
    Milvus(by-dev) > show checkpoint --collection 443407225551410746
    vchannel by-dev-rootcoord-dml_0_443407225551410746v0 seek to 2023-08-08 09:36:09.54 +0000 UTC, cp channel: by-dev-rootcoord-dml_0_443407225551410746v0, Source: Channel Checkpoint
    ```

### Check index details

Run the following command to list all index files in detail.

```shell
Milvus(by-dev) > show index
*************2.1.x***************
*************2.2.x***************
==================================================================
Index ID: 443407225551410801    Index Name: _default_idx_102    CollectionID:443407225551410746
Create Time: 2023-08-08 09:27:19.139 +0000      Deleted: false
Index Type: HNSW        Metric Type: L2
Index Params: 
==================================================================
```

### List partitions

Run the following command to list all partitions in a specific collection.

```shell
Milvus(by-dev) > show partition --collection 443407225551410746
Parition ID: 443407225551410747 Name: _default  State: PartitionCreated
--- Total Database(s): 1
```

### Check channel status

Run the following command to view channel status

```shell
Milvus(by-dev) > show channel-watch
=============================
key: by-dev/meta/channelwatch/6/by-dev-rootcoord-dml_0_443407225551410746v0
Channel Name:by-dev-rootcoord-dml_0_443407225551410746v0         WatchState: WatchSuccess
Channel Watch start from: 2023-08-08 09:27:09 +0000, timeout at: 1970-01-01 00:00:00 +0000
Start Position ID: [1 0 28 175 133 76 39 6], time: 1970-01-01 00:00:00 +0000
Unflushed segments: []
Flushed segments: []
Dropped segments: []
--- Total Channels: 1
```

### List all replicas and segments

- List all replicas

    Run the following command to list all replicas and their corresponding collections.

    ```shell
    Milvus(by-dev) > show replica
    ================================================================================
    ReplicaID: 443407225685278721 CollectionID: 443407225551410746 version:>=2.2.0
    All Nodes:[2]
    ```

- List all segments

    Run the following command to list all segments and their status

    ```shell
    SegmentID: 443407225551610865 State: Flushed, Row Count:5979
    --- Growing: 0, Sealed: 0, Flushed: 1
    --- Total Segments: 1, row count: 5979
    ```

    Run the following command to list all loaded segments in detail. For Milvus 2.1.x, use `show segment-loaded` instead.

    ```shell
    Milvus(by-dev) > show segment-loaded-grpc
    ===========
    ServerID 2
    Channel by-dev-rootcoord-dml_0_443407225551410746v0, collection: 443407225551410746, version 1691486840680656937
    Leader view for channel: by-dev-rootcoord-dml_0_443407225551410746v0
    Growing segments number: 0 , ids: []
    SegmentID: 443407225551610865 CollectionID: 443407225551410746 Channel: by-dev-rootcoord-dml_0_443407225551410746v0
    Sealed segments number: 1    
    ```

### List configurations

You can have Birdwatcher list the current configurations of each Milvus component.

```shell
Milvus(by-dev) > show configurations
client nil Session:proxy, ServerID: 8, Version: 2.2.11, Address: 10.244.0.8:19529
Component rootcoord-1
rootcoord.importtaskexpiration: 900
rootcoord.enableactivestandby: false
rootcoord.importtaskretention: 86400
rootcoord.maxpartitionnum: 4096
rootcoord.dmlchannelnum: 16
rootcoord.minsegmentsizetoenableindex: 1024
rootcoord.port: 53100
rootcoord.address: localhost
rootcoord.maxdatabasenum: 64
Component datacoord-3
...
querynode.gracefulstoptimeout: 30
querynode.cache.enabled: true
querynode.cache.memorylimit: 2147483648
querynode.scheduler.maxreadconcurrentratio: 2
```

As an alternative, you can visit each Milvus component to find its configuration. The following demonstrates how to list the configuration of the QueryCoord with ID 7.

```shell
Milvus(by-dev) > show session
Session:datacoord, ServerID: 3, Version: 2.2.11, Address: 10.244.0.8:13333
Session:datanode, ServerID: 6, Version: 2.2.11, Address: 10.244.0.8:21124
Session:indexcoord, ServerID: 4, Version: 2.2.11, Address: 10.244.0.8:31000
Session:indexnode, ServerID: 5, Version: 2.2.11, Address: 10.244.0.8:21121
Session:proxy, ServerID: 8, Version: 2.2.11, Address: 10.244.0.8:19529
Session:querycoord, ServerID: 7, Version: 2.2.11, Address: 10.244.0.8:19531
Session:querynode, ServerID: 2, Version: 2.2.11, Address: 10.244.0.8:21123
Session:rootcoord, ServerID: 1, Version: 2.2.11, Address: 10.244.0.8:53100

Milvus(by-dev) > visit querycoord 7
QueryCoord-7(10.244.0.8:19531) > configuration
Key: querycoord.enableactivestandby, Value: false
Key: querycoord.channeltasktimeout, Value: 60000
Key: querycoord.overloadedmemorythresholdpercentage, Value: 90
Key: querycoord.distpullinterval, Value: 500
Key: querycoord.checkinterval, Value: 10000
Key: querycoord.checkhandoffinterval, Value: 5000
Key: querycoord.taskexecutioncap, Value: 256
Key: querycoord.taskmergecap, Value: 8
Key: querycoord.autohandoff, Value: true
Key: querycoord.address, Value: localhost
Key: querycoord.port, Value: 19531
Key: querycoord.memoryusagemaxdifferencepercentage, Value: 30
Key: querycoord.refreshtargetsintervalseconds, Value: 300
Key: querycoord.balanceintervalseconds, Value: 60
Key: querycoord.loadtimeoutseconds, Value: 1800
Key: querycoord.globalrowcountfactor, Value: 0.1
Key: querycoord.scoreunbalancetolerationfactor, Value: 0.05
Key: querycoord.reverseunbalancetolerationfactor, Value: 1.3
Key: querycoord.balancer, Value: ScoreBasedBalancer
Key: querycoord.autobalance, Value: true
Key: querycoord.segmenttasktimeout, Value: 120000
```

## Backup metrics

You can have Birdwatcher back up metrics of all components

```shell
Milvus(my-release) > backup
Backing up ... 100%(2452/2451)
backup etcd for prefix  done
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
backup for prefix done, stored in file: bw_etcd_ALL.230810-075211.bak.gz
```

Then you can check the file in the directory where you start Birdwatcher.

## Probe collections

You can have Birdwatcher probe the status of loaded collections with specified primary keys or mock queries.

### Probe collection with known primary key

In the `probe` command, you should specify the primary key using the `pk` flag, and the collection ID using the `collection` flag.

```shell
Milvus(by-dev) > probe pk --pk 110 --collection 442844725212299747
PK 110 found on segment 442844725212299830
Field id, value: &{long_data:<data:110 > }
Field title, value: &{string_data:<data:"Human Resources Datafication" > }
Field title_vector, value: &{dim:768 float_vector:<data:0.022454707 data:0.007861045 data:0.0063843643 data:0.024065714 data:0.013782166 data:0.018483251 data:-0.026526336 ... data:-0.06579628 data:0.00033906146 data:0.030992996 data:-0.028134001 data:-0.01311325 data:0.012471594 > }
Field article_meta, value: &{json_data:<data:"{\"link\":\"https:\\/\\/towardsdatascience.com\\/human-resources-datafication-d44c8f7cb365\",\"reading_time\":6,\"publication\":\"Towards Data Science\",\"claps\":256,\"responses\":0}" > }
```

### Probe all collections with mock queries

You can also have Birdwatcher probe all collections with mock queries.

```shell
Milvus(by-dev) > probe query
probing collection 442682158191982314
Found vector field vector(103) with dim[384], indexID: 442682158191990455
failed to generated mock request probing index type IVF_FLAT not supported yet
probing collection 442844725212086932
Found vector field title_vector(102) with dim[768], indexID: 442844725212086936
Shard my-release-rootcoord-dml_1_442844725212086932v0 leader[298] probe with search success.
probing collection 442844725212299747
Found vector field title_vector(102) with dim[768], indexID: 442844725212299751
Shard my-release-rootcoord-dml_4_442844725212299747v0 leader[298] probe with search success.
probing collection 443294505839900248
Found vector field vector(101) with dim[256], indexID: 443294505839900251
Shard my-release-rootcoord-dml_5_443294505839900248v0 leader[298] probe with search success.
```



