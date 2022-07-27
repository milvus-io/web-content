---
id: deploy_pulsar.md
title: Configure Message Storage with Docker Compose/Helm
related_key: Pulsar, storage
summary: Learn how to configure message storage with Docker Compose/Helm
---

# Configure Message Storage with Docker Compose/Helm

Milvus uses Pulsar or Kafka for managing logs of recent changes, outputting stream logs, and providing log subscriptions. Pulsar is the default message storage system. This topic introduces how to configure message storage with Docker Compose or Helm.

You can set up Pulsar with [Docker Compose](https://docs.docker.com/get-started/overview/) or on K8s. 

## Configure with Docker Compose

### 1. Configure Pulsar

To set up Pulsar with Docker Compose, provide your values for the `pulsar` section in the `milvus.yaml` file on the milvus/configs path.

```
pulsar:
  address: localhost # Address of pulsar
  port: 6650 # Port of pulsar
  maxMessageSize: 5242880 # 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.
```

See [Pulsar-related configurations](system_configuration.md#pulsar) for more information.

### 2. Run Milvus

Run the following command to start Milvus that uses the etcd configurations.

```
docker-compose up
```

<div class="alert note">Configurations only take effect after Milvus starts. See <a herf=https://milvus.io/docs/v2.0.0/install_cluster-docker.md#2-Start-Milvus>Start Milvus</a> for more information.</div>


## Set up on K8s

### Set up Pulsar on K8s

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

### Set up Kafka on K8s

For Milvus clusters on K8s, you can configure Kafka in the same command that starts Milvus. Alternatively, you can configure Kafka using the <code>values.yml</code> file on the /charts/milvus path in the [milvus-helm](https://github.com/milvus-io/milvus-helm) repository before you start Milvus.

 The following table lists the keys for configuring Pulsar in the YAML file.
| Key             | Description                          | Value                                 |
| --------------------- | ------------------------------------ | ------------------------------------ |
| <code>externalkafka.enabled</code>    | Enables or disables Kafka.     | <code>true</code>/<code>false</code> |
| <code>externalpulsar.brokerlist</code>       | The brokerlist to access Pulsar.    |                                      |

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
