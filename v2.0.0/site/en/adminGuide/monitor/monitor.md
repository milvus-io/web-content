---
id: monitor.md
title: Monitor and Alert
related_key: monitor Milvus with Prometheus
summary: Learn how to monitor Milvus 2.0 with Prometheus.
---

# Monitor Milvus 2.0 with Prometheus Operator on Kubernetes

Prometheus is an open-source toolkit for monitoring Kubernetes implementations. 

## Prometheus endpoint

Prometheus exports metrics of each Milvus 2.0 component at `http://<component-host>:9091/metrics`. Use Prometheus to pull data from endpoints set by exporters.

## Prometheus Operator

[Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator) is an extension to Kubernetes for automated and effective management of  Prometheus monitoring instances. Using Prometheus Operator saves you the trouble of manually adding metric targets and service providers.

**Overall architecture**

The ServiceMonitor Custom Resource Definition (CRD) allows you to declaratively define how a dynamic set of services should be monitored, and select which services to monitor with the desired configuration using label selections. With Prometheus Operator, you can introduce conventions around how metrics are exposed. New services can be automatically discovered following the convention you set without the need for manual reconfiguration.

![Prometheus_architecture](../../../../assets/prometheus_architecture.png)

## Kube-prometheus

[Kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) collects Kubernetes manifests, [Grafana](http://grafana.com/) dashboards, and [Prometheus rules](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/) combined with documentation and scripts to provide easy to operate end-to-end Kubernetes cluster monitoring with [Prometheus](https://prometheus.io/) using the Prometheus Operator.

**Create a monitoring stack using the config in the manifests directory:**

``` 
git clone https://github.com/prometheus-operator/kube-prometheus.git
kubectl create -f manifests/setupuntil kubectl get servicemonitors --all-namespaces ; do date; sleep 1; echo ""; done
kubectl create -f manifests/
```

**Teardown the stack:**

```
kubectl delete --ignore-not-found=true -f manifests/ -f manifests/setup
```

**Access the dashboards:**

```
kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
kubectl --namespace monitoring port-forward svc/grafana 3000
```

Now you can access Prometheus via http://localhost:9090, and Grafana via http://localhost:3000. You can also access Grafana using the default Grafana user:password of `admin:admin`. 

## Enable ServiceMonitor with Milvus Helm Chart

The ServiceMonitor is not enabled for Milvus Helm by default. After installing Prometheus Operator in the Kubernetes cluster, you can enable it by adding `metrics.serviceMonitor.enabled=true` parameter.

```
helm install my-release milvus/milvus --set cluster.enabled=true --set metrics.serviceMonitor.enabled=true
```

When Helm installation completes, use `kubectl` to check the ServiceMonitor resource.

```
kubectl get servicemonitor
NAME                           AGE
my-release-milvus              54s
```

