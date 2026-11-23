---
id: config_jaeger_tracing.md
title: Configure Trace
related_key: Jaeger, Milvus, Trace
summary: This guide provides instructions on how to configure Jaeger to collect traces for Milvus.
---

# Configure Trace

This guide provides instructions on how to configure Jaeger to collect traces for Milvus.

## Prerequisites

- You have installed necessary tools, including [Helm](https://helm.sh/docs/intro/install/) and [Kubectl](https://kubernetes.io/docs/tasks/tools/).

## Deploy Jaeger

Jaeger is a distributed tracing platform released as open source by [Uber Technologies](http://uber.github.io/).

This guide deploys Jaeger v2 with the [Jaeger Helm chart](https://github.com/jaegertracing/helm-charts). By default, the chart deploys Jaeger with the all-in-one model and in-memory storage, which is suitable for testing. For other ways to run Jaeger on Kubernetes, see [Deploying on Kubernetes](https://www.jaegertracing.io/docs/2.23/deployment/kubernetes/).

### 1. Install Jaeger

Install Jaeger in the namespace where you install Milvus. The Milvus settings in the next section refer to the Jaeger service by its short name, `jaeger`, and Kubernetes resolves a service name without a namespace only within the namespace of the pod that makes the query.

```shell
$ helm repo add jaegertracing https://jaegertracing.github.io/helm-charts
$ helm repo update
$ helm install jaeger jaegertracing/jaeger --version 4.19.0
```

The chart README marks the chart as experimental and says that breaking changes may occur in minor versions, so the command pins the chart version. Chart version 4.19.0 deploys Jaeger 2.23.0.

### 2. Check the Jaeger pod

To check that the Jaeger pod is running, run the following command:

```shell
$ kubectl get pods -l app.kubernetes.io/instance=jaeger,app.kubernetes.io/component=all-in-one
```

The chart creates a service named `jaeger`. The service exposes the OTLP gRPC receiver on port `4317` and the Jaeger UI on port `16686`.

## Install Milvus with Helm Chart

To send traces from Milvus to Jaeger over OTLP, save the following settings in a file named `values.yaml`:

```yaml
extraConfigFiles:
  user.yaml: |+
    trace:
      exporter: otlp
      sampleFraction: 1
      otlp:
        endpoint: "jaeger:4317"
        method: grpc
        secure: false
```

With these settings, Milvus samples every request (`sampleFraction: 1`) and exports the traces over OTLP gRPC without TLS (`secure: false`) to port `4317` of the `jaeger` service.

To apply the above settings to a new Milvus deployment, run the following commands:

```shell
$ helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
$ helm repo update
$ helm upgrade --install my-release zilliztech/milvus --version 5.0.22 -f values.yaml
```

To apply the above settings to an existing Milvus deployment, run the following command:

```shell
$ helm upgrade my-release zilliztech/milvus --version <current-chart-version> --reset-then-reuse-values -f values.yaml
```

<div class="alert note">

This command uses `--reset-then-reuse-values`, which requires Helm 3.14 or later. With this option, Helm resets the values to the defaults of the chart version set in `--version`, applies the values of your current release, and then applies the values from `-f`. Every value in `values.yaml` therefore overrides the value of your current release, and the `user.yaml` entry under `extraConfigFiles` is replaced as a whole. To find `<current-chart-version>`, run `helm list` and remove the `milvus-` prefix from the value in the `CHART` column. If you run `helm upgrade` with `-f` or `--set` but without `--reset-then-reuse-values` or `--reuse-values`, Helm does not keep the values that you set at install time.

</div>

## View Traces

The `jaeger` service is of type `ClusterIP`, and the chart does not create an ingress by default. To open the Jaeger UI from your local machine, forward the UI port:

```shell
$ kubectl port-forward svc/jaeger 16686:16686
```

Then open `http://localhost:16686` in a browser.

The following screenshot shows the Jaeger UI with the traces of Milvus during a search operation and a load-collection operation:

![Trace Search Request](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-search.PNG)

![Trace Load Collection Request](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-load.png)

