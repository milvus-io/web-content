---
id: allocate.md
---

# Allocate resources on Kubernetes

Generally, the resources you allocate to a Milvus cluster in production should be proportionate to the machine workload. You should also consider the machine type when allocating resources. Although you can update the configurations when the cluster is running, we recommend you to set the values before deploying the cluster.

<div class="alert note">
Run <code>kubectl describe nodes</code> to view the available resources on the instances that you have provisioned.
</div>

## Allocate memory and CPU resources

Use Helm to allocate CPU and memory resources to Milvus components.

<div class="alert warning">
Using Helm to upgrade resources will cause the running pods to perform rolling update.
</div>


You need to set the resource variables for each Milvus component if you use `--set` to update the resource configurations. 

<div class="filter">
<a href="#standalone">Milvus standalone</a> <a href="#cluter">Milvus cluster</a>
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

You can also allocate CPU and memory resources by specifying the parameters `resources.requests` and `resources.limits` in the **resources.yaml** file:

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

## Apply the new configuration to the cluster

```Shell
helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
```
<div class="alert note">
If `resources.limits` is not specified, the pods will consume all the CPU and memory resources available. Therefore, please specify `resources.requests` and `resources.limits` to avoid overallocation of resources when there are other tasks on the same instance that require more memory consumption.
</div>
 
 
