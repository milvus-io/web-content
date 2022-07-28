---
id: message_storage_operator.md
title: Configure Message Storage with Milvus Operator
related_key: minio, s3, storage, etcd, pulsar
summary: Learn how to configure message storage with Milvus Operator.
---

# Configure Message Storage with Milvus Operator

Milvus uses RocksMQ, Pulsar or Kafka for managing logs of recent changes, outputting stream logs, and providing log subscriptions. This topic introduces how to configure message storage dependencies when you install Milvus with Milvus Operator.

This topic assumes that you have deployed Milvus Operator.

<div class="alert note">See <a href="https://milvus.io/docs/v2.0.x/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information. </div>

You need to specify a configuration file for using Milvus Operator to start a Milvus cluster.

```YAML
kubectl apply -f https://raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvuscluster_default.yaml
```

You only need to edit the code template in `milvuscluster_default.yaml` to configure third-party dependencies. The following sections introduce how to configure object storage, etcd, and Pulsar respectively.

## Before you begin
The table below shows whether RocksMQ, Pulsar, and Kafka are supported in Milvus standalone and cluster mode. 

|                 | RocksMQ | Pulsar | Kafka |
|:---------------:|:-------:|:------:|:-----:|
| Standalone mode |    ✔️    |    ✔️   |   ✔️   |
|   Cluster mode  |    ✖️    |    ✔️   |   ✔️   |

There are also other limitations for specifying the message storage:
- Only one message storage for one Milvus instance is supported. However we still have backward compatibility with multiple message storages set for one instance. The priority is as follows:
  - standalone mode:  RocksMQ (default) > Pulsar > Kafka
  - cluster mode: Pulsar (default) > Kafka
- The message storage cannot be changed while the Milvus system is running. 
-  Only Kafka 2.x or 3.x verison is supported.

## Configure RocksMQ
RocksMQ is the default message storage in Milvus standalone. 

<div class="alert note">
Currently, you can only configure RocksMQ as the message storage for Milvus standalone with Milvus Operator. 
</div>

#### Example 

The following example configures a RocksMQ service. You can 

```YAML
apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: milvus
spec:
  dependencies: {}
  config: {}
```


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
      external: true
      brokerList: 
        - "kafkaBrokerAddr1:9092"
        - "kafkaBrokerAddr2:9092"
        # ...
  components: {}
  config: {}
```

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




