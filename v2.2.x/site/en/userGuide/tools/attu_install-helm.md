---
id: attu_install-helm.md
label: Install with Helm Chart
order: 1
group: attu_install-docker.md
related_key: attu
summary: Learn how to install Attu with Helm Chart to manage your Milvus service.
---

# Install Attu

This topic describes how to install Attu, an efficient open-source management tool for Milvus.

<div class="tab-wrapper"><a href="attu_install-docker.md" class=''>Install with Docker Compose</a><a href="attu_install-helm.md" class='active '>Install with Helm Chart</a><a href="attu_install-package.md" class=''>Install with Package</a></div>

## Prerequisites

- Kubernetes 1.16 or later
- Helm 3.0.0 or later

<div class="alert note">
Attu only supports Milvus 2.x.
</div>

## Install Helm Chart for Milvus

Helm is a Kubernetes package manager that can help you deploy Milvus quickly.

1. Add Milvus Helm repository.

```
$ helm repo add milvus https://milvus-io.github.io/milvus-helm/
```

2. Update charts locally.

```
$ helm repo update
```

## Install Attu while installing Milvus

Start Milvus and Attu with Helm by specifying the release name, the chart, and the parameters that indicate the installation of Attu. This topic uses `my-release` as the release name. To use a different release name, replace `my-release` in the command.

Kubernetes provides four service modes: ClusterIp, Ingress, LoadBalancer, and NodePort. The default service mode of Attu is ClusterIp. You can choose the  service mode that suits your application by configuring the parameters `attu.service.type` and `attu.ingress.enable`. 


1. Install Milvus and Attu

```
helm install my-release milvus/milvus --set attu.enabled=true
```

2. Forward the Attu service to local port `3000`.

```
kubectl port-forward service/my-release-milvus-attu 3000
```

3. Visit `http://127.0.0.1:3000/connect` in your browser, and click **Connect** to enter the Attu service.

![Attu_install](../../../../assets/attu/insight_install.png "Connect to the Attu service.")


## Contribution

Attu is an open-source project. All contributions are welcome. Please read our [Contribute guide](https://github.com/zilliztech/attu) before making contributions.

If you find a bug or want to request a new feature, please create a [GitHub Issue](https://github.com/zilliztech/attu), and make sure that the same issue has not been created by someone else.
