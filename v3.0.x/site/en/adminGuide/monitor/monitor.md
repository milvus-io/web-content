---
id: monitor.md
title: Deploy Monitoring Services
related_key: monitor, alert
summary: Learn how to deploy monitoring services for a Milvus cluster using Prometheus.
---

# Deploying Monitoring Services on Kubernetes

This topic describes how to use Prometheus to deploy monitoring services for a Milvus cluster on Kubernetes.

## Monitor metrics with Prometheus
Metrics are indicators providing information about the running status of your system. For example, with metrics, you can understand how much memory or CPU resources are consumed by a data node in Milvus. Being aware of the performance and status of the components in your Milvus cluster makes you well-informed and hence making better decisions and adjusting resource allocation in a more timely manner.

Generally, metrics are stored in a time series database (TSDB), like [Prometheus](https://prometheus.io/), and the metrics are recorded with a timestamp. In the case of monitoring Milvus services, you can use Prometheus to pull data from endpoints set by exporters. Prometheus then exports metrics of each Milvus component at `http://<component-host>:9091/metrics`. 

However, you might have several replicas for one component, which makes manual configuration of Prometheus too complicated. Therefore, you can use [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator), an extension to Kubernetes, for automated and effective management of Prometheus monitoring instances. Using Prometheus Operator saves you the trouble of manually adding metric targets and service providers.

The ServiceMonitor Custom Resource Definition (CRD) enables you to declaratively define how a dynamic set of services are monitored. It also allows selecting which services to monitor with the desired configuration using label selections. With Prometheus Operator, you can introduce conventions specifying how metrics are exposed. New services can be automatically discovered following the convention you set without the need for manual reconfiguration.

The following image illustrates Prometheus workflow.

![Prometheus_architecture](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_architecture.png)

## Prerequisites

This tutorial uses [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) to save you the trouble of installing and manually configuring each monitoring and alerting component.

Kube-prometheus collects Kubernetes manifests, [Grafana](http://grafana.com/) dashboards, and [Prometheus rules](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/) combined with documentation and scripts.

Before deploying monitoring services, you need to create a monitoring stack by using the configuration in the kube-prometheus manifests directory.

The following commands use the `release-0.19` branch of kube-prometheus, which supports Kubernetes 1.35, 1.36, and 1.37. To choose the branch for your Kubernetes version, see the [kube-prometheus compatibility matrix](https://github.com/prometheus-operator/kube-prometheus#compatibility).

```bash
$ git clone --branch release-0.19 https://github.com/prometheus-operator/kube-prometheus.git
$ cd kube-prometheus
$ kubectl apply --server-side -f manifests/setup
$ kubectl wait \
        --for condition=Established \
        --all CustomResourceDefinition \
        --namespace=monitoring
$ kubectl apply -f manifests/
```

<div class="alert note">
The default prometheus-k8s clusterrole can not capture milvus' metrics, need to patch:
</div>

```bash
kubectl patch clusterrole prometheus-k8s --type=json -p='[{"op": "add", "path": "/rules/-", "value": {"apiGroups": [""], "resources": ["pods", "services", "endpoints"], "verbs": ["get", "watch", "list"]}}]'
```

To delete a stack, run `kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup`.

## Deploy monitoring services on Kubernetes

### 1. Access the dashboards

Forward the Prometheus service to port `9090`, and Grafana service to port `3000`.

```bash
$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
$ kubectl --namespace monitoring port-forward svc/grafana 3000
```

### 2. Enable ServiceMonitor

The ServiceMonitor is not enabled for Milvus Helm by default. After installing the Prometheus Operator in the Kubernetes cluster, you can enable it by adding the parameter `metrics.serviceMonitor.enabled=true`.

#### With Helm

You can enable the ServiceMonitor by setting the parameter `metrics.serviceMonitor.enabled=true` as follows if you have installed Milvus Helm chart.

```bash
$ helm upgrade my-release zilliztech/milvus --version <current-chart-version> --reset-then-reuse-values --set metrics.serviceMonitor.enabled=true
```

<div class="alert note">

This command uses `--reset-then-reuse-values`, which requires Helm 3.14 or later. With this option, Helm resets the values to the defaults of the chart version set in `--version`, applies the values of your current release, and then applies the values from `--set`. To find `<current-chart-version>`, run `helm list` and remove the `milvus-` prefix from the value in the `CHART` column. If you run `helm upgrade` with `-f` or `--set` but without `--reset-then-reuse-values` or `--reuse-values`, Helm does not keep the values that you set at install time.

</div>

When the installation completes, use `kubectl` to check the ServiceMonitor resource.

#### With Milvus Operator

If you have installed Milvus using the Milvus Operator, the operator creates a PodMonitor instead of a ServiceMonitor. The PodMonitor has the same name as the Milvus custom resource. The operator creates it only when metrics are not disabled in the custom resource and the PodMonitor CRD exists in the cluster. The kube-prometheus `manifests/setup` directory installs this CRD. To make sure that metrics are enabled, do as follows.

1. Run the following command to edit the MIlvus custom resource. The following command assumes that the custom resource is named `my-release`.

    ```
    $ kubectl edit milvus my-release
    ```

2. Edit the `spec.components.disableMetric` field to `false`.

    ```yaml
    ...
    spec:
      components:
        disableMetric: false # set to true to disable metrics
    ...
    ```

3. Save and exit the editor.

4. Wait for the operator to reconcile the changes. You can check the PodMonitor by running the following command.

    ```bash
    $ kubectl get podmonitor my-release
    ```

### 3. Check the metrics

After enabling the ServiceMonitor or the PodMonitor, you can access the Prometheus dashboard at `http://localhost:9090/`.

Click on the `Status` tab and then `Targets`. You should see the targets of the Milvus components.

![Prometheus_targets](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_targets.png "The Prometheus targets.")

Click on the `Graph` tab and enter the expression `up{app_kubernetes_io_instance="my-release"}` in the expression input box. You should see the metrics of the Milvus components.

![Prometheus_graph](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/prometheus_graph.png "The Prometheus graph.")

### 4. Check the ServiceMonitor

If you have installed Milvus with Helm, run the following command to list the ServiceMonitor. The chart names it `my-release-milvus` for a Milvus cluster and `my-release-milvus-standalone` for a Milvus standalone.

```bash
$ kubectl get servicemonitor
```
```text
NAME                           AGE
my-release-milvus              54s
```

## What's next

- If you have deployed monitoring services for the Milvus cluster, you might also want to learn to:
  - [Visualize Milvus metrics in Grafana](visualize.md)
  - [Create an Alert for Milvus Services](alert.md)
  - Adjust your [resource allocation](allocate.md)
- If you are looking for information about how to scale a Milvus cluster:
  - Learn [scale a Milvus cluster](scaleout.md)
- If you are interested in upgrading the Milvus version,
  - Read the [guide for upgrading Milvus cluster](upgrade_milvus_cluster-operator.md) and [that for upgrade Milvus standalone](upgrade_milvus_standalone-operator.md).
