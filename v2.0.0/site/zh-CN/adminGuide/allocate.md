---
id: allocate.md
title: 在 Kubernetes 上配置 Milvus 集群资源
summary: 了解如何在 Kubernetes 上配置 Milvus 集群资源
---

# 在 Kubernetes 上配置 Milvus 集群资源

本文将介绍如何在 Kubernetes 上配置 Milvus 集群资源。

在生产环境中，通常应当依据机器工作量及机器类型相应为 Milvus 集群配置资源。你可以在集群运行时更新资源配置，但我们建议在[部署集群](install_cluster-helm.md)前先设置参数。 

## 1. 查看可用资源

运行指令 `kubectl describe nodes` 查看整个 Kubernetes 集群可为已创建实例分配的资源。

## 2. 配置资源 

使用 Helm 为 Milvus 集群组件分配内存与 CPU 资源。

<div class="alert note">
使用 Helm 升级资源配置时，正在运行的 pod 将执行滚动更新。
</div>

你可以通过以下两种方式来配置资源：

- [使用命令配置资源](allocate.md#使用命令配置资源)
- [设置 YAML 文件以配置资源](allocate.md#设置-YAML-文件以配置资源 )


### 使用命令配置资源

如使用 `--set` 指令更新资源配置，必须配置每一个 Milvus 组件的资源变量。 

<div class="filter">
<a href="#standalone">单机版 Milvus</a> <a href="#cluster">分布式版 Milvus</a>
</div>

<div class="table-wrapper filter-standalone" markdown="block">

```Shell
helm upgrade my-release milvus/milvus --reuse-values --set standalone.resources.limits.cpu=2 --set standalone.resources.limits.memory=4Gi --set standalone.resources.requests.cpu=0.1 --set standalone.resources.requests.memory=128Mi
```

</div>

<div class="table-wrapper filter-cluster" markdown="block">

```Shell
helm upgrade my-release milvus/milvus --reuse-values --set dataNode.resources.limits.cpu=2 --set dataNode.resources.limits.memory=4Gi --set dataNode.resources.requests.cpu=0.1 --set dataNode.resources.requests.memory=128Mi
```

</div>

### 设置 YAML 文件以配置资源

你还可以通过设置 `resources.yaml` 文件中的参数 `resources.requests` 和 `resources.limits` 来分配 CPU 和内存资源。

```Yaml
dataNode:
  resources:
    limits:
      cpu: "4"
      memory: "16Gi"
    requests:
      cpu: "1"
      memory: "4Gi"
queryNode:
  resources:
    limits:
      cpu: "4"
      memory: "16Gi"
    requests:
      cpu: "1"
      memory: "4Gi"
```

## 3. 应用新配置

运行如下指令以在 Milvus 集群中应用新配置。

```Shell
helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
```
<div class="alert note">
如未设置 <code>resources.limits</code> 参数，pod 会消耗所有可用 CPU 及内存资源。因此，为避免资源过度配置，请设置好 <code>resources.requests</code> 及 <code>resources.limits</code> 参数。
</div>

更多资源管理内容，详见 [Kubernetes 文档](https://kubernetes.io/zh/docs/concepts/configuration/manage-resources-containers/) for more information about managing resources.
 

## 更多内容

- 你可能还想了解如何
  - [对 Milvus 集群进行扩缩容](scaleout.md)
  - [升级 Milvus 2.0](upgrade.md)
- 在云端部署 Milvus 集群：
  - [使用 Terraform 及 Ansible 在 AWS 上部署 Milvus](aws.md)
  - [使用 Terraform 在 Amazon EKS 上部署 Milvus](eks.md)
  - [使用 Kubernetes 在 GCP 上部署 Milvus](gcp.md)
  - [使用 Kubernentes 在 Microsoft Azure 上部署 Milvus](azure.md)
