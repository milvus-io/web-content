---
id: deploy_pulsar.md
title: Configure Message Storage with Docker Compose or Helm
related_key: Pulsar, storage
summary: Learn how to configure message storage with Docker Compose or Helm.
---

# Configure Message Storage with Docker Compose or Helm

Milvus uses Pulsar or Kafka for managing logs of recent changes, outputting stream logs, and providing log subscriptions. Pulsar is the default message storage system. This topic introduces how to configure message storage with Docker Compose or Helm.

You can configure Pulsar with [Docker Compose](https://docs.docker.com/get-started/overview/) or on K8s and configure Kafka on K8s.

## Configure Pulsar with Docker Compose

### 1. Configure Pulsar

To configure Pulsar with Docker Compose, provide your values for the `pulsar` section in the `milvus.yaml` file on the milvus/configs path.

```
pulsar:
  address: localhost # Address of pulsar
  port: 6650 # Port of pulsar
  maxMessageSize: 5242880 # 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.
```

See [Pulsar-related configurations](configure_pulsar.md) for more information.

### 2. Run Milvus

Run the following command to start Milvus that uses the Pulsar configurations.

```
docker compose up
```

<div class="alert note">Configurations only take effect after Milvus starts. See <a href=https://milvus.io/docs/install_standalone-docker.md#Start-Milvus>Start Milvus</a> for more information.</div>


## Configure Pulsar with Helm

For Milvus clusters on K8s, you can configure Pulsar in the same command that starts Milvus. Alternatively, you can configure Pulsar using the <code>values.yml</code> file on the /charts/milvus path in the [milvus-helm](https://github.com/milvus-io/milvus-helm) repository before you start Milvus. 

For details on how to configure Milvus using Helm, refer to [Configure Milvus with Helm Charts](configure-helm.md). For details on Pulsar-related configuration items, refer to [Pulsar-related configurations](configure_pulsar.md).
                                    |
### Using the YAML file

1. Configure the <code>externalConfigFiles</code> section in the <code>values.yaml</code> file.

```yaml
extraConfigFiles:
  user.yaml: |+
    pulsar:
      address: localhost # Address of pulsar
      port: 6650 # Port of Pulsar
      webport: 80 # Web port of pulsar, if you connect direcly without proxy, should use 8080
      maxMessageSize: 5242880 # 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.
      tenant: public
      namespace: default    
```

2. After configuring the preceding sections and saving the <code>values.yaml</code> file, run the following command to install Milvus which uses the Pulsar configurations.

```shell
helm install <your_release_name> milvus/milvus -f values.yaml
```

## Configure Kafka with Helm

For Milvus clusters on K8s, you can configure Kafka in the same command that starts Milvus. Alternatively, you can configure Kafka using the <code>values.yml</code> file on the /charts/milvus path in the [milvus-helm](https://github.com/milvus-io/milvus-helm) repository before you start Milvus.

For details on how to configure Milvus using Helm, refer to [Configure Milvus with Helm Charts](configure-helm.md). For details on Pulsar-related configuration items, refer to [Kafka-related configurations](configure_kafka.md).

### Using the YAML file

1. Configure the <code>externalConfigFiles</code> section in the <code>values.yaml</code> file if you want to use Kafka as the message storage system.

```yaml
extraConfigFiles:
  user.yaml: |+
    kafka:
      brokerList:
        -  <your_kafka_address>:<your_kafka_port>
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL    
```

2. After configuring the preceding sections and saving the <code>values.yaml</code> file, run the following command to install Milvus that uses the Kafka configurations.

```shell
helm install <your_release_name> milvus/milvus -f values.yaml
```

## Configure RocksMQ with Helm

Milvus standalone uses RocksMQ as the default message storage. For detailed steps on how to configure Milvus with Helm, refer to [Configure Milvus with Helm Charts](configure-helm.md). For details on RocksMQ-related configuration items, refer to [RocksMQ-related configurations](configure_rocksmq.md).

- If you start Milvus with RocksMQ and want to change its settings, you can run `helm upgrade -f ` with the changed settings in the following YAML file. 

- If you have installed Milvus standalone using Helm with a message store other than RocksMQ and want to change it back to RocksMQ, run `helm upgrade -f ` with the following YAML file after you have flushed all collections and stopped Milvus.

```yaml
extraConfigFiles:
  user.yaml: |+
    rocksmq:
      # The path where the message is stored in rocksmq
      # please adjust in embedded Milvus: /tmp/milvus/rdb_data
      path: /var/lib/milvus/rdb_data
      lrucacheratio: 0.06 # rocksdb cache memory ratio
      rocksmqPageSize: 67108864 # 64 MB, 64 * 1024 * 1024 bytes, The size of each page of messages in rocksmq
      retentionTimeInMinutes: 4320 # 3 days, 3 * 24 * 60 minutes, The retention time of the message in rocksmq.
      retentionSizeInMB: 8192 # 8 GB, 8 * 1024 MB, The retention size of the message in rocksmq.
      compactionInterval: 86400 # 1 day, trigger rocksdb compaction every day to remove deleted data
      # compaction compression type, only support use 0,7.
      # 0 means not compress, 7 will use zstd
      # len of types means num of rocksdb level.
      compressionTypes: [0, 0, 7, 7, 7]    
```

<div class="alert warning">

Changing the message store is not recommended. If this is you want to do this, stop all DDL operations, then call the FlushAll API to flush all collections, and finally stop Milvus in the end before you actually change the message store.

</div>

## Configure NATS with Helm

NATS is an experimental message store alternative to RocksMQ. For detailed steps on how to configure Milvus with Helm, refer to [Configure Milvus with Helm Charts](configure-helm.md). For details on RocksMQ-related configuration items, refer to [NATS-related configurations](configure_nats.md).

- If you start Milvus with NATS and want to change its settings, you can run `helm upgrade -f ` with the changed settings in the following YAML file.

- If you have installed Milvus standalone with a message store other than NATS and want to change it to NATS, run `helm upgrade -f ` with the following YAML file after you flushed all collections and stopped Milvus.

```yaml
extraConfigFiles:
  user.yaml: |+
    mq:
      type: natsmq
    natsmq:
      # server side configuration for natsmq.
      server: 
        # 4222 by default, Port for nats server listening.
        port: 4222 
        # /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.
        storeDir: /var/lib/milvus/nats 
        # (B) 16GB by default, Maximum size of the 'file' storage.
        maxFileStore: 17179869184 
        # (B) 8MB by default, Maximum number of bytes in a message payload.
        maxPayload: 8388608 
        # (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.
        maxPending: 67108864 
        # (√ms) 4s by default, waiting for initialization of natsmq finished.
        initializeTimeout: 4000 
        monitor:
          # false by default, If true enable debug log messages.
          debug: false 
          # true by default, If set to false, log without timestamps.
          logTime: true 
          # no log file by default, Log file path relative to.. .
          logFile: 
          # (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.
          logSizeLimit: 0 
        retention:
          # (min) 3 days by default, Maximum age of any message in the P-channel.
          maxAge: 4320 
          # (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.
          maxBytes:
          # None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    
          maxMsgs: 
```

<div class="alert note">

**Choose between RocksMQ and NATS?**

RockMQ uses CGO to interact with RocksDB and manages the memory by itself, while the pure-GO NATS embedded in the Milvus installation delegates its memory management to Go's garbage collector (GC).

In the scenario where the data packet is smaller than 64 kb, RocksDB outperforms in terms of memory usage, CPU usage, and response time. On the other hand, if the data packet is greater than 64 kb, NATS excels in terms of response time with sufficient memory and ideal GC scheduling.

Currently, you are advised to use NATS only for experiments.

</div>

## What's next

Learn how to configure other Milvus dependencies with Docker Compose or Helm:
- [Configure Object Storage with Docker Compose or Helm](deploy_s3.md)
- [Configure Meta Storage with Docker Compose or Helm](deploy_etcd.md)
