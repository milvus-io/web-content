---
id: configure_grafana_loki.md
title: Configure Grafana Loki
summary: This topic describes how to collect logs using Loki and query logs for a Milvus cluster using Grafana.
---

# Configure Grafana Loki

This guide provides instructions on how to configure Loki to collect logs and Grafana to query and display logs for a Milvus cluster.

In this guide, you will learn how to:

- Deploy [Loki](https://grafana.com/docs/loki/latest/get-started/overview/) and [Alloy](https://grafana.com/docs/alloy/latest/) on a Milvus cluster using Helm.
- Configure object storage for Loki.
- Query logs using Grafana.

For reference, [Promtail](https://grafana.com/docs/loki/latest/send-data/promtail/#promtail-agent) will be deprecated.
So we instead introduce Alloy, which has been officially suggested by Grafana Labs as the new agent.

# Introduction

Before diving into how to build a logging system with Milvus, we’d like to first introduce the mechanisms of the logging system being used.
Broadly speaking, there are two main structures you can apply. 
Please note that the mechanism to be introduced can be applied regardless of whether the [log functionality](https://milvus.io/docs/configure_log.md) in Milvus is enabled.

## 1. Using host volumes of kubernetes worker node

kubernetes worker nodes periodically write stream logs generated from pods scheduled on those nodes to a specific path in the node’s file system as files with a `.log` extension, we will leverage this feature.
Next, we will deploy Alloy, which acts as an agent, as a DaemonSet on the worker nodes.
This Alloy will share the path where the log files are stored on the worker nodes via a host volume.
As a result, the log files from the Milvus pods will be visible inside the Alloy pod, and Alloy will read these files and send them to Loki.

![Logging with k8s worker node host volume](../../../../assets/monitoring/logging_HostVolume.png "logging with host volume sharing.")

## 2. Using kubernetes API server

kubernetes API server is one of the control plane components. Alloy doesn't necessarily need to be deployed as a DaemonSet. It works well as a Deployment.
Instead, Alloy must request to kubernetes API server for fetching stream logs of milvus pods and get them.
Finally, Alloy will send the stream logs to Loki.

![Logging with k8s API Server](../../../../assets/monitoring/logging_K8sApi.png "logging with k8s api server.")

## Prerequisites

- You have [installed a Milvus cluster on K8s](install_cluster-helm.md).
- You have installed necessary tools, including [Helm](https://helm.sh/docs/intro/install/) and [Kubectl](https://kubernetes.io/docs/tasks/tools/).

## Deploy Loki

Loki is a log aggregation system inspired by Prometheus. Deploy Loki using Helm to collect logs from your Milvus cluster.

### 1. Add Grafana's Helm Chart Repository

Add Grafana’s chart repository to Helm and update it:

```
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

### 2. Configure Object Storage for Loki

Choose one of the following storage options and create a `loki.yaml` configuration file:

- Option 1: Using MinIO for storage

  ```yaml
  loki:
    commonConfig:
      replication_factor: 1
    auth_enabled: false

  minio:
    enabled: true
  ```

- Option 2: Using AWS S3 for storage

  In the following example, replace `<accessKey>` and `<keyId>` with your own S3 access key and ID, `s3.endpoint` with the S3 endpoint, and `s3.region` with the S3 region.

  ```yaml
  loki:
    commonConfig:
      replication_factor: 1
    auth_enabled: false
    storage:
      bucketNames:
        chunks: loki-chunks
        ruler: loki-ruler
        admin: loki-admin
      type: 's3'
      s3:
        endpoint: s3.us-west-2.amazonaws.com
        region: us-west-2
        secretAccessKey: <accessKey>
        accessKeyId: <keyId>
  ```

### 3. Install Loki

Run the following commands to install Loki:

```shell
kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
```

## Deploy Alloy

You can configure alloy and deploy alloy based on Helm chart. Refer to the official Alloy [documentation](https://grafana.com/docs/alloy/latest/set-up/install/) for more installation options.
We will show you Alloy [configuration](https://grafana.com/docs/alloy/latest/configure/).

### Create Alloy Configuration
#### 1. Using host volumes of kubernetes worker node
`alloy.yaml`:
```yaml
alloy:
  enableReporting: false
  resources: {}
  configMap:
    create: true
    content: |-
      loki.write "remote_loki" {
        endpoint {
          url       = "http://loki-gateway/loki/api/v1/push"
        }
      }
      
      loki.source.file "milvus_logs" {
        targets = local.file_match.milvus_log_files.targets
        forward_to = [loki.write.remote_loki.receiver]
      }
      
      local.file_match "milvus_log_files" {
        path_targets = [
          {"__path__" = "/your/worker/node/var/log/pods/milvus_milvus-*/**/*.log"},
        ]
      }
  # mount to pods with host volume
  mounts:
    extra:
      - name: log-pods
        mountPath: /host/var/log/pods
        readOnly: true
controller:
  type: 'daemonset'
  # make volume that use host volume in worker node
  volumes:
    extra:
      - name: log-pods
        hostPath:
          path: /var/log/pods
```

#### 2. Using kubernetes API server
`alloy.yaml`:
```yaml
alloy:
  enableReporting: false
  resources: {}
  configMap:
    create: true
    content: |-
      loki.write "remote_loki" {
        endpoint {
          url       = "http://loki-gateway/loki/api/v1/push"
        }
      }

      discovery.kubernetes "milvus_pod" {
        role = "pod"
      }

      loki.source.kubernetes "milvus_pod_logs" {
        targets = discovery.kubernetes.milvus_pod.output
        forward_to = [loki.write.remote_loki.receiver]
      }
```

### Install Alloy

```shell
helm install --values alloy.yaml alloy grafana/alloy -n loki
```

## Query Logs with Grafana

Deploy Grafana and configure it to connect to Loki for querying logs.

### 1. Deploy Grafana

Install Grafana using the following commands:

```shell
kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
```

Before you can access Grafana, you need to retrieve the `admin` password:

```shell
kubectl get secret --namespace monitoring my-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```

Then, forward the Grafana port to your local machine:

```shell
export POD_NAME=$(kubectl get pods --namespace monitoring -l "app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana" -o jsonpath="{.items[0].metadata.name}")
kubectl --namespace monitoring port-forward $POD_NAME 3000
```

### 2. Add Loki as a Data Source in Grafana

Once Grafana is running, you need to add Loki as a data source to query logs.

1. Open a web browser and navigate to `127.0.0.1:3000`. Log in using the username `admin` and the password obtained earlier.
2. In the left-side menu, choose __Connections__ > __Add new connection__.
3. On the page that appears, choose __Loki__ as the data source type. You can enter __loki__ in the search bar to find the data source.
4. In the Loki data source settings, specify the __Name__ and __URL__, and then click __Save & test__.

![DataSource](../../../../assets/datasource.jpg "The data source config.")

### 3. Query Milvus Logs

After adding Loki as a data source, query Milvus logs in Grafana:

1. In the left-side menu, click __Explore__.
2. In the upper-left corner of the page, choose the loki data source.
3. Use __Label browser__ to select labels and query logs.

![Query](../../../../assets/milvuslog.jpg "Query Milvus logs in Grafana.")