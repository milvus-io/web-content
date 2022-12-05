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
docker-compose up
```

<div class="alert note">Configurations only take effect after Milvus starts. See <a href=https://milvus.io/docs/v2.2.x/install_cluster-docker.md#Start-Milvus>Start Milvus</a> for more information.</div>


## Configure Pulsar on K8s

### Configure Pulsar on K8s

For Milvus clusters on K8s, you can configure Pulsar in the same command that starts Milvus. Alternatively, you can configure Pulsar using the <code>values.yml</code> file on the /charts/milvus path in the [milvus-helm](https://github.com/milvus-io/milvus-helm) repository before you start Milvus.

 The following table lists the keys for configuring Pulsar in the YAML file.
| Key             | Description                          | Value                                 |
| --------------------- | ------------------------------------ | ------------------------------------ |
| <code>externalpulsar.enabled</code>    | Enables or disables Pulsar.     | <code>true</code>/<code>false</code> |
| <code>externalpulsar.host</code>       | The endpoint to access Pulsar.    |                                      |
| <code>externalpulsar.port</code>       | The port to access Pulsar.     |                                      |

#### Using the YAML file

1. Configure the <code>pulsar</code> section in the <code>values.yaml</code> file.

```yaml
pulsar:
  enabled: false
```

2. Configure the <code>externalPulsar</code> section using your values in the <code>values.yaml</code> file.

```yaml
externalPulsar:
  enabled: true
  host: <your_pulsar_localhost>
  port: <your_pulsar_port>
```

3. After configuring the preceding sections and saving the <code>values.yaml</code> file, run the following command to install Milvus that uses the Pulsar configurations.

```shell
helm install <your_release_name> milvus/milvus -f values.yaml
```
#### Using a command

To install Milvus and configure Pulsar, run the following command using your values.

```shell
helm install <your_release_name> milvus/milvus --set cluster.enabled=true --set externalPulsar.enabled=true --set externalPulsar.host='<your_pulsar_endpoint>' --set externalPulsar.port=<your_pulsar_port>
```

### Configure Kafka on K8s

For Milvus clusters on K8s, you can configure Kafka in the same command that starts Milvus. Alternatively, you can configure Kafka using the <code>values.yml</code> file on the /charts/milvus path in the [milvus-helm](https://github.com/milvus-io/milvus-helm) repository before you start Milvus.

 The following table lists the keys for configuring Pulsar in the YAML file.
| Key             | Description                          | Value                                 |
| --------------------- | ------------------------------------ | ------------------------------------ |
| <code>externalkafka.enabled</code>    | Enables or disables Kafka.     | <code>true</code>/<code>false</code> |
| <code>externalkafka.brokerlist</code>       | The brokerlist to access Kafka.    |                                      |

The following table lists the mandatory configurations for external Kafka. Set them in Kafka configurations.
| Key             | Description                         | Value                                   |
| --------------------- | ------------------------------------ | ------------------------------------ |
| `max.request.size`    | The maximum size of a request in bytes. | `5242880` |
| `message.max.bytes`   | The largest record batch size allowed by Kafka | `10485760` |
| `auto.create.topics.enable` | Enable auto creation of topic on the server | `true` |
| `num.partitions`      | The default number of log partitions per topic | `1` |

#### Using the YAML file

1. Configure the <code>kafka</code> section in the <code>values.yaml</code> file.

```yaml
kafka:
  enabled: false
  name: kafka
  replicaCount: 3
  image:
    repository: bitnami/kafka
    tag: 3.1.0-debian-10-r52
```

2. Configure the <code>externalKafka</code> section using your values in the <code>values.yaml</code> file.

```yaml
externalKafka:
  enabled: false
  brokerList: <your_kafka_brokerlist>
```

3. After configuring the preceding sections and saving the <code>values.yaml</code> file, run the following command to install Milvus that uses the Kafka configurations.

```shell
helm install <your_release_name> milvus/milvus -f values.yaml
```
#### Using a command

To install Milvus and configure Kafka, run the following command using your values.

```shell
helm install <your_release_name> milvus/milvus --set cluster.enabled=true --set externalKafka.enabled=true --set externalKafka.brokerlist='<your_kafka_brokerlist>'
```

## What's next

Learn how to configure other Milvus dependencies with Docker Compose or Helm:
- [Configure Object Storage with Docker Compose or Helm](deploy_s3.md)
- [Configure Meta Storage with Docker Compose or Helm](deploy_etcd.md)
