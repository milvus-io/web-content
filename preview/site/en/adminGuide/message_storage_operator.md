---
id: message_storage_operator.md
title: Configure Message Storage with Milvus Operator
related_key: minio, s3, storage, etcd, pulsar
summary: Learn how to configure message storage with Milvus Operator.
---

# Configure Message Storage with Milvus Operator

Milvus uses RocksMQ, Pulsar or Kafka for managing logs of recent changes, outputting stream logs, and providing log subscriptions. This topic introduces how to configure message storage dependencies when you install Milvus with Milvus Operator. For more details, refer to [Configure Message Storage with Milvus Operator](https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md) in the Milvus Operator repository.

This topic assumes that you have deployed Milvus Operator.

<div class="alert note">See <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information. </div>

You need to specify a configuration file for using Milvus Operator to start a Milvus cluster.

```YAML
kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml
```

You only need to edit the code template in `milvus_cluster_default.yaml` to configure third-party dependencies. The following sections introduce how to configure object storage, etcd, and Pulsar respectively.

## Before you begin
The table below shows whether RocksMQ, NATS, Pulsar, and Kafka are supported in Milvus standalone and cluster mode. 

|                 | RocksMQ | NATS   | Pulsar | Kafka |
|:---------------:|:-------:|:------:|:------:|:-----:|
| Standalone mode |    ✔️    |    ✔️   |   ✔️    |   ✔️   |
|   Cluster mode  |    ✖️    |    ✖️   |   ✔️    |   ✔️   |

There are also other limitations for specifying the message storage:
- Only one message storage for one Milvus instance is supported. However we still have backward compatibility with multiple message storages set for one instance. The priority is as follows:
  - standalone mode:  RocksMQ (default) > Pulsar > Kafka
  - cluster mode: Pulsar (default) > Kafka
  - Nats introduced in 2.3 do not participate in these priority rules for backward compatibility.
- The message storage cannot be changed while the Milvus system is running. 
- Only Kafka 2.x or 3.x verison is supported.

## Configure RocksMQ
RocksMQ is the default message storage in Milvus standalone. 

<div class="alert note">

Currently, you can only configure RocksMQ as the message storage for Milvus standalone with Milvus Operator. 

</div>

#### Example 

The following example configures a RocksMQ service. 

```YAML
apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: {}
  components: {}
  config: {}
```

## Configure NATS

NATS is an alternative message storage for NATS.

#### Example

The following example configures a NATS service. 

```YAML
apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: 
    msgStreamType: 'natsmq'
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
  components: {}
  config: {}
```

To migrate the message storage from RocksMQ to NATS, do as follows:

1. Stop all DDL operations.
2. Call the FlushAll API and then stop Milvus once the API call finishes executing.
3. Change `msgStreamType` to `natsmq` and make necessary changes to NATS settings in `spec.dependencies.natsmq`.
4. Start Milvus again and check whether:

    - A log entry that reads `mqType=natsmq` is present in the logs.
    - A directory named `jetstream` is present in the directory specified in `spec.dependencies.natsmq.server.storeDir`.

5. (Optional) Back up and clean up the data files in the RocksMQ storage directory.

<div class="alert note">

**Choose between RocksMQ and NATS?**

RockMQ uses CGO to interact with RocksDB and manages the memory by itself, while the pure-GO NATS embedded in the Milvus installation delegates its memory management to Go's garbage collector (GC).

In the scenario where the data packet is smaller than 64 kb, RocksDB outperforms in terms of memory usage, CPU usage, and response time. On the other hand, if the data packet is greater than 64 kb, NATS excels in terms of response time with sufficient memory and ideal GC scheduling.

Currently, you are advised to use NATS only for experiments.

</div>

## Configure Pulsar

Pulsar manages logs of recent changes, outputs stream logs, and provides log subscriptions. Configuring Pulsar for message storage is supported in both Milvus standalone and Milvus cluster. However, with Milvus Operator, you can only configure Pulsar as message storage for Milvus cluster. Add required fields under `spec.dependencies.pulsar` to configure Pulsar.

`pulsar` supports `external` and `inCluster`.

### External Pulsar

`external` indicates using an external Pulsar service. 
Fields used to configure an external Pulsar service include:

- `external`:  A `true` value indicates that Milvus uses an external Pulsar service.
- `endpoints`: The endpoints of Pulsar.

####  Example

The following example configures an external Pulsar service.

```YAML
apiVersion: milvus.io/v1alpha1
kind: MilvusCluster
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: # Optional
    pulsar: # Optional
      # Whether (=true) to use an existed external pulsar as specified in the field endpoints or 
      # (=false) create a new pulsar inside the same kubernetes cluster for milvus.
      external: true # Optional default=false
      # The external pulsar endpoints if external=true
      endpoints:
      - 192.168.1.1:6650
  components: {}
  config: {}           
```

### Internal Pulsar

`inCluster` indicates when a Milvus cluster starts, a Pulsar service starts automatically in the cluster.

#### Example 

The following example configures an internal Pulsar service.

```YAML
apiVersion: milvus.io/v1alpha1
kind: MilvusCluster
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    pulsar:
      inCluster:
        values:
          components:
            autorecovery: false
          zookeeper:
            replicaCount: 1
          bookkeeper:
            replicaCount: 1
            resoureces:
              limit:
                cpu: '4'
              memory: 8Gi
            requests:
              cpu: 200m
              memory: 512Mi
          broker:
            replicaCount: 1
            configData:
              ## Enable `autoSkipNonRecoverableData` since bookkeeper is running
              ## without persistence
              autoSkipNonRecoverableData: "true"
              managedLedgerDefaultEnsembleSize: "1"
              managedLedgerDefaultWriteQuorum: "1"
              managedLedgerDefaultAckQuorum: "1"
          proxy:
            replicaCount: 1
  components: {}
  config: {}            
```

<div class="alert note">This example specifies the numbers of replicas of each component of Pulsar, the compute resources of Pulsar BookKeeper, and other configurations.</div>

<div class="alert note">Find the complete configuration items to configure an internal Pulsar service in <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml</a>. Add configuration items as needed under <code>pulsar.inCluster.values</code> as shown in the preceding example.</div>

Assuming that the configuration file is named `milvuscluster.yaml`, run the following command to apply the configuration.

```Shell
kubectl apply -f milvuscluster.yaml
```

## Configure Kafka

Pulsar is the default message storage in a Milvus cluster. If you want to use Kafka, add the optional field `msgStreamType` to configure Kafka.

`kafka` supports `external` and `inCluster`.

### External Kafka

`external` indicates using an external Kafka service. 

Fields used to configure an external Kafka service include:

- `external`: A `true` value indicates that Milvus uses an external Kafka service.
- `brokerList`: The list of brokers to send the messages to.

#### Example

The following example configures an external Kafka service.

```yaml
apiVersion: milvus.io/v1alpha1
kind: MilvusCluster
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  config:
    kafka:
      # securityProtocol supports: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL 
      securityProtocol: PLAINTEXT
      # saslMechanisms supports: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512
      saslMechanisms: PLAIN
      saslUsername: ""
      saslPassword: ""
  # Omit other fields ...
  dependencies:
    # Omit other fields ...
    msgStreamType: "kafka"
    kafka:
      external: true
      brokerList: 
        - "kafkaBrokerAddr1:9092"
        - "kafkaBrokerAddr2:9092"
        # ...
```
> SASL configurations are supported in operator v0.8.5 or higher version.

### Internal Kafka

`inCluster` indicates when a Milvus cluster starts, a Kafka service starts automatically in the cluster.

#### Example

The following example configures an internal Kafka service.

```
apiVersion: milvus.io/v1alpha1
kind: MilvusCluster
metadata:
  name: my-release
  labels:
    app: milvus
spec: 
  dependencies:
    msgStreamType: "kafka"
    kafka:
      inCluster: 
        values: {} # values can be found in https://artifacthub.io/packages/helm/bitnami/kafka
  components: {}
  config: {}
```

Find the complete configuration items to configure an internal Kafka service [here](https://artifacthub.io/packages/helm/bitnami/kafka). Add configuration items as needed under `kafka.inCluster.values`.

Assuming that the configuration file is named `milvuscluster.yaml`, run the following command to apply the configuration.

```
kubectl apply -f milvuscluster.yaml
```

## What's next

Learn how to configure other Milvus dependencies with Milvus Operator:
- [Configure Object Storage with Milvus Operator](object_storage_operator.md)
- [Configure Meta Storage with Milvus Operator](meta_storage_operator.md)



