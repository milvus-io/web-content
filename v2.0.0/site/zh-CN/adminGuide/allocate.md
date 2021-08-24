---
id: allocate.md
---

# 配置 Kubernetes 集群资源

在生产环境中，通常应当依据机器工作量及机器类型相应为 Milvus 集群配置资源。你可以在集群运行时更新资源配置，但我们建议在部署集群前先设置参数。

<div class="alert note">
运行指令 <code>kubectl describe nodes</code> 查看整个 Kubernetes 集群可为已创建实例分配的资源。
</div>

## 配置内存与 CPU 资源

使用 Helm 为 Milvus 集群组件分配内存与 CPU 资源。

<div class="alert warning">
使用 Helm 升级资源配置时，正在运行的 pod 将执行滚动更新。
</div>


如使用 `--set` 指令更新资源配置，必须配置每一个 Milvus 组件的资源变量。

<div class="filter">
<a href="#standalone">单机版 Milvus</a> <a href="#cluster"> 分布式版 Milvus</a>
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

你也可以通过在 **resources.yaml** 文件中设置 `resources.requests` 及 `resources.limits` 两个参数来分配内存与 CPU 资源：

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

## 在集群中应用新配置

```Shell
helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
```
<div class="alert note">
如未设置 <code>resources.limits</code> 参数，pod 会消耗所有可用 CPU 及内存资源。因此，为避免资源过度配置的状况，请设置好 <cocde>resources.requests</code> 及 <code>resources.limits</code> 参数。
</div>
 
 
