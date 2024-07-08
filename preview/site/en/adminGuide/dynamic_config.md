---
id: dynamic_config.md
related_key: configure
summary: Learn about the dynamic configuration of Milvus.
title: Configure Milvus on the Fly
---

# Configure Milvus on the Fly

Milvus allows you to change some of its configurations on the fly.

## Before you start

You need to ensure that：

- You have Birdwatcher installed. For details, refer to [Install Birdwatcher](birdwatcher_install_guides.md),
- You have etcdctl installed. For details, refer to [Interacting with etcd](https://etcd.io/docs/v3.5/dev-guide/interacting_v3/), or
- You have other etcd clients, such as the Python client, installed.

<div class="alert note">

- Examples in this guide change the value of `proxy.minPasswordLength` to `8`. You can replace the key with the applicable ones listed in [Applicable configuration items](dynamic_config.md#Applicable-configuration-items).
- Examples in this guide assume that the root path of your Milvus is `by-dev`. All configurations are listed under the path `by-dev/config`. The Milvus root path varies with the way you install it. For the instances installed using the Helm charts, the root path defaults to `by-dev`. If you do not know the root path, refer to [Connect to etcd](birdwatcher_usage_guides.md#Connect-to-etcd).

</div>

## Change configurations

On Milvus, `proxy.minPasswordLength` is set to `6` by default. To change this value, you can do as follows:

```shell
$ etcdctl put by-dev/config/proxy/minPasswordLength 8
# or
$ birdwatcher -olc "#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,set config-etcd --key by-dev/config/proxy/minPasswordLength --value 8"
```

Then you can check the configurations as follows:

```shell
$ etcdctl get by-dev/config/proxy/minPasswordLength
```

## Roll back configurations

Milvus also allows you to roll back your configurations in case the changed value no longer applies.

```shell
$ etcdctl del by-dev/config/proxy/minPasswordLength 
# or 
$ birdwatcher -olc "#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,remove config-etcd --key by-dev/config/proxy/minPasswordLength"
```

Then you can check the configurations as follows:

```shell
$ etcdctl get by-dev/config/proxy/minPasswordLength
```

## View configurations

Instead of viewing the value of a specific configuration item, you can also list all of them.

```shell
$ etcdctl get --prefix by-dev/config
# or
$ birdwatcher -olc "#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,show config-etcd"
```

To view the configurations of a specific node:

```shell
Offline > connect --etcd ip:port 
Milvus(by-dev) > show session          # List all nodes with their server ID
Milvus(by-dev) > visit querycoord 1    # Visit a node by server ID
QueryCoord-1(ip:port) > configuration  # List the configuration of the node
```

## Applicable configuration items

Currently, you can change the following configuration items on the fly.

 | Configuration item                                                      | Default value       |
 |-------------------------------------------------------------------------|---------------------|
 | pulsar.maxMessageSize                                                   | 5242880             |
 | common.retentionDuration                                                | 86400               |
 | common.entityExpiration                                                 | -1                  |
 | common.gracefulTime                                                     | 5000                |
 | common.gracefulStopTimeout                                              | 30                  |
 | quotaAndLimits.ddl.enabled                                              | FALSE               |
 | quotaAndLimits.indexRate.enabled                                        | FALSE               |
 | quotaAndLimits.flushRate.enabled                                        | FALSE               |
 | quotaAndLimits.compactionRate.enabled                                   | FALSE               |
 | quotaAndLimits.dml.enabled                                              | FALSE               |
 | quotaAndLimits.dql.enabled                                              | FALSE               |
 | quotaAndLimits.limits.collection.maxNum                                 | 64                  |
 | quotaAndLimits.limitWriting.forceDeny                                   | FALSE               |
 | quotaAndLimits.limitWriting.ttProtection.enabled                        | FALSE               |
 | quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay               | 9223372036854775807 |
 | quotaAndLimits.limitWriting.memProtection.enabled                       | TRUE                |
 | quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel   | 0.85                |
 | quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel  | 0.95                |
 | quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel  | 0.85                |
 | quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel | 0.95                |
 | quotaAndLimits.limitWriting.diskProtection.enabled                      | TRUE                |
 | quotaAndLimits.limitWriting.diskProtection.diskQuota                    | +INF                |
 | quotaAndLimits.limitReading.forceDeny                                   | FALSE               |
 | quotaAndLimits.limitReading.queueProtection.enabled                     | FALSE               |
 | quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold          | 9223372036854775807 |
 | quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold       | +INF                |
 | quotaAndLimits.limitReading.resultProtection.enabled                    | FALSE               |
 | quotaAndLimits.limitReading.resultProtection.maxReadResultRate          | +INF                |
 | quotaAndLimits.limitReading.coolOffSpeed                                | 0.9                 |
 | autoIndex.enable                                                        | FALSE               |
 | autoIndex.params.build                                                  | ""                  |
 | autoIndex.params.extra                                                  | ""                  |
 | autoIndex.params.search                                                 | ""                  |
 | proxy.maxNameLength                                                     | 255                 |
 | proxy.maxUsernameLength                                                 | 32                  |
 | proxy.minPasswordLength                                                 | 6                   |
 | proxy.maxPasswordLength                                                 | 256                 |
 | proxy.maxFieldNum                                                       | 64                  |
 | proxy.maxShardNum                                                       | 256                 |
 | proxy.maxDimension                                                      | 32768               |
 | proxy.maxUserNum                                                        | 100                 |
 | proxy.maxRoleNum                                                        | 10                  |
 | queryNode.enableDisk                                                    | TRUE                |
 | dataCoord.segment.diskSegmentMaxSize                                    | 2048                |
 | dataCoord.compaction.enableAutoCompaction                               | TRUE                |


## What's next

- Learn more about [System Configurations](system_configuration.md).
- Learn how to configure Milvus installed using [Milvus Operator](configure_operator.md), [Helm charts](configure-helm.md), and [Docker](configure-docker.md).
