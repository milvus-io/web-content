---
id: mq_kafka.md
title: Kafka
---

# Use Kafka as the Milvus Message Queue

Apache Kafka is one of the message-queue (WAL) backends Milvus supports. In Milvus 3.x, [Woodpecker](woodpecker.md) is the default message queue; Kafka remains fully supported for users who prefer it. Kafka is primarily used with Milvus Distributed (cluster); standalone deployments typically use embedded Woodpecker or [RocksMQ](mq_rocksmq.md).

## Version compatibility

- Milvus supports **Kafka 2.x and 3.x** only.
- Kafka is configured for Milvus Distributed (cluster) via Helm or Milvus Operator.

## Deploy a Milvus cluster with Kafka using Helm

### Install and configure

To use an external Kafka service, disable the bundled Pulsar and enable `externalKafka` in a `values.yaml` override, then install Milvus with it:

```yaml
pulsarv3:
  enabled: false
externalKafka:
  enabled: true
  brokerList: <your_kafka_address>:<your_kafka_port>
  securityProtocol: SASL_SSL
  sasl:
    mechanisms: PLAIN
    username: ""
    password: ""
```

```bash
helm install my-release zilliztech/milvus -f values.yaml
```

For SASL/SSL authentication details, see [Connect to Kafka with SASL/SSL](connect_kafka_ssl.md).

### Uninstall

```bash
helm uninstall my-release
```

## Deploy a Milvus cluster with Kafka using Milvus Operator

With Milvus Operator, set `spec.dependencies.msgStreamType: "kafka"` and configure Kafka under `spec.dependencies.kafka` (cluster only). `kafka` supports `external` and `inCluster`.

### External Kafka

```yaml
apiVersion: milvus.io/v1alpha1
kind: Milvus
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
  dependencies:
    msgStreamType: "kafka"
    kafka:
      external: true
      brokerList:
        - "kafkaBrokerAddr1:9092"
        - "kafkaBrokerAddr2:9092"
```

<div class="alert note">

SASL configurations are supported in Milvus Operator v0.8.5 or later.

</div>

### Internal (in-cluster) Kafka

```yaml
apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    msgStreamType: "kafka"
    kafka:
      inCluster:
        values: {}  # see https://artifacthub.io/packages/helm/bitnami/kafka
  components: {}
  config: {}
```

Apply the configuration (assuming the file is `milvuscluster.yaml`):

```bash
kubectl apply -f milvuscluster.yaml
```

### Uninstall

```bash
kubectl delete milvus my-release
```

## Notes

- **Upgrading from 2.5.x to 2.6.x:** **Message Queue limitations**: When upgrading to Milvus v3.0-beta, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.
 If you run Kafka and want to keep it, do not change the message queue during the upgrade.
- Only **Kafka 2.x and 3.x** are supported.
- For SASL/SSL connectivity, see [Connect to Kafka with SASL/SSL](connect_kafka_ssl.md).

## What's next

- [Woodpecker (default message queue)](woodpecker.md)
- [Switch between Kafka and Woodpecker](switch-kafka-woodpecker.md)
