---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Learn about the system configuration of Milvus.
---

# Milvus System Configurations Checklist

This topic introduces the general sections of the system configurations in Milvus.

Milvus maintains a considerable number of parameters that configure the system. Each configuration has a default value, which can be used directly. You can modify these parameters flexibly so that Milvus can better serve your application. See [Configure Milvus](configure-docker.md) for more information.

<div class="alert note">
In current release, all parameters take effect only after being configured at the startup of Milvus.
</div>

## Sections

For the convenience of maintenance, Milvus classifies its configurations into %s sections based on its components, dependencies, and general usage.

### `etcd`

Related configuration of etcd, used to store Milvus metadata & service discovery.

See [etcd-related Configurations](configure_etcd.md) for detailed description for each parameter under this section.

### `metastore`



See [metastore-related Configurations](configure_metastore.md) for detailed description for each parameter under this section.

### `tikv`

Related configuration of tikv, used to store Milvus metadata.

Notice that when TiKV is enabled for metastore, you still need to have etcd for service discovery.

TiKV is a good option when the metadata size requires better horizontal scalability.

See [tikv-related Configurations](configure_tikv.md) for detailed description for each parameter under this section.

### `localStorage`



See [localStorage-related Configurations](configure_localstorage.md) for detailed description for each parameter under this section.

### `minio`

Related configuration of MinIO/S3/GCS or any other service supports S3 API, which is responsible for data persistence for Milvus.

We refer to the storage service as MinIO/S3 in the following description for simplicity.

See [minio-related Configurations](configure_minio.md) for detailed description for each parameter under this section.

### `mq`

Milvus supports four MQ: rocksmq(based on RockDB), natsmq(embedded nats-server), Pulsar and Kafka.

You can change your mq by setting mq.type field.

If you don't set mq.type field as default, there is a note about enabling priority if we config multiple mq in this file.

1. standalone(local) mode: rocksmq(default) > natsmq > Pulsar > Kafka

2. cluster mode:  Pulsar(default) > Kafka (rocksmq and natsmq is unsupported in cluster mode)

See [mq-related Configurations](configure_mq.md) for detailed description for each parameter under this section.

### `pulsar`

Related configuration of pulsar, used to manage Milvus logs of recent mutation operations, output streaming log, and provide log publish-subscribe services.

See [pulsar-related Configurations](configure_pulsar.md) for detailed description for each parameter under this section.

### `rocksmq`

If you want to enable kafka, needs to comment the pulsar configs

kafka:

  brokerList: localhost:9092

  saslUsername: 

  saslPassword: 

  saslMechanisms: 

  securityProtocol: 

  ssl:

    enabled: false # whether to enable ssl mode

    tlsCert:  # path to client's public key (PEM) used for authentication

    tlsKey:  # path to client's private key (PEM) used for authentication

    tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

    tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any

  readTimeout: 10



See [rocksmq-related Configurations](configure_rocksmq.md) for detailed description for each parameter under this section.

### `natsmq`

natsmq configuration.

more detail: https://docs.nats.io/running-a-nats-service/configuration

See [natsmq-related Configurations](configure_natsmq.md) for detailed description for each parameter under this section.

### `rootCoord`

Related configuration of rootCoord, used to handle data definition language (DDL) and data control language (DCL) requests

See [rootCoord-related Configurations](configure_rootcoord.md) for detailed description for each parameter under this section.

### `proxy`

Related configuration of proxy, used to validate client requests and reduce the returned results.

See [proxy-related Configurations](configure_proxy.md) for detailed description for each parameter under this section.

### `queryCoord`

Related configuration of queryCoord, used to manage topology and load balancing for the query nodes, and handoff from growing segments to sealed segments.

See [queryCoord-related Configurations](configure_querycoord.md) for detailed description for each parameter under this section.

### `queryNode`

Related configuration of queryNode, used to run hybrid search between vector and scalar data.

See [queryNode-related Configurations](configure_querynode.md) for detailed description for each parameter under this section.

### `indexCoord`



See [indexCoord-related Configurations](configure_indexcoord.md) for detailed description for each parameter under this section.

### `indexNode`



See [indexNode-related Configurations](configure_indexnode.md) for detailed description for each parameter under this section.

### `dataCoord`



See [dataCoord-related Configurations](configure_datacoord.md) for detailed description for each parameter under this section.

### `dataNode`



See [dataNode-related Configurations](configure_datanode.md) for detailed description for each parameter under this section.

### `msgChannel`

This topic introduces the message channel-related configurations of Milvus.

See [msgChannel-related Configurations](configure_msgchannel.md) for detailed description for each parameter under this section.

### `log`

Configures the system log output.

See [log-related Configurations](configure_log.md) for detailed description for each parameter under this section.

### `grpc`



See [grpc-related Configurations](configure_grpc.md) for detailed description for each parameter under this section.

### `tls`

Configure external tls.

See [tls-related Configurations](configure_tls.md) for detailed description for each parameter under this section.

### `internaltls`

Configure internal tls.

See [internaltls-related Configurations](configure_internaltls.md) for detailed description for each parameter under this section.

### `common`



See [common-related Configurations](configure_common.md) for detailed description for each parameter under this section.

### `quotaAndLimits`

QuotaConfig, configurations of Milvus quota and limits.

By default, we enable:

  1. TT protection;

  2. Memory protection.

  3. Disk quota protection.

You can enable:

  1. DML throughput limitation;

  2. DDL, DQL qps/rps limitation;

  3. DQL Queue length/latency protection;

  4. DQL result rate protection;

If necessary, you can also manually force to deny RW requests.

See [quotaAndLimits-related Configurations](configure_quotaandlimits.md) for detailed description for each parameter under this section.

### `trace`



See [trace-related Configurations](configure_trace.md) for detailed description for each parameter under this section.

### `gpu`

#when using GPU indexing, Milvus will utilize a memory pool to avoid frequent memory allocation and deallocation.

#here, you can set the size of the memory occupied by the memory pool, with the unit being MB.

#note that there is a possibility of Milvus crashing when the actual memory demand exceeds the value set by maxMemSize.

#if initMemSize and MaxMemSize both set zero,

#milvus will automatically initialize half of the available GPU memory,

#maxMemSize will the whole available GPU memory.

See [gpu-related Configurations](configure_gpu.md) for detailed description for each parameter under this section.

### `streamingNode`

Any configuration related to the streaming node server.

See [streamingNode-related Configurations](configure_streamingnode.md) for detailed description for each parameter under this section.

### `streaming`

Any configuration related to the streaming service.

See [streaming-related Configurations](configure_streaming.md) for detailed description for each parameter under this section.

### `knowhere`

Any configuration related to the knowhere vector search engine

See [knowhere-related Configurations](configure_knowhere.md) for detailed description for each parameter under this section.

