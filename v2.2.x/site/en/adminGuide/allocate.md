---
id: allocate.md
title: Allocate Resources to Milvus on Kubernetes
summary: Learn how to allocate resources to Milvus on Kubernetes.
---

# Allocate Resources on Kubernetes

This topic describes how to allocate resources to a Milvus cluster on Kubernetes.

Generally, the resources you allocate to a Milvus cluster in production should be proportionate to the machine workload. You should also consider the machine type when allocating resources. Although you can update the configurations when the cluster is running, we recommend setting the values before [deploying the cluster](install_cluster-helm.md).

## 1. View available resources

Run `kubectl describe nodes` to view the available resources on the instances that you have provisioned.

## 2. Allocate resources

Use Helm to allocate CPU and memory resources to Milvus components.

<div class="alert note">
Using Helm to upgrade resources will cause the running pods to perform rolling update.
</div>

There are two ways to allocate resources:

- [Use the commands](allocate.md#Allocate-resources-with-commands)
- [Set the parameters in the `YAML` file](allocate.md#Allocate-resources-by-setting-configuration-file )


### Allocate resources with commands

You need to set the resource variables for each Milvus component if you use `--set` to update the resource configurations. 

<div class="filter">
<a href="#standalone">Milvus standalone</a> <a href="#cluster">Milvus cluster</a>
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

### Allocate resources by setting configuration file 

You can also allocate CPU and memory resources by specifying the parameters `resources.requests` and `resources.limits` in the `resources.yaml` file.

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

## 3. Apply configurations

Run the following command to apply the new configurations to your Milvus cluster.

```Shell
helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
```
<div class="alert note">
If <code>resources.limits</code> is not specified, the pods will consume all the CPU and memory resources available. Therefore, ensure to specify <code>resources.requests</code> and <code>resources.limits</code> to avoid overallocation of resources when other running tasks on the same instance require more memory consumption.
</div>

See [Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/) for more information about managing resources.
 

## What's next

- You might also want to learn how to:
  - [Scale a Milvus cluster](scaleout.md)
  - [Upgrade Milvus Cluster](upgrade_milvus_cluster-operator.md)
  - [Upgrade Milvus Standalone](upgrade_milvus_standalone-operator.md)
- If you are ready to deploy your cluster on clouds:
  - Learn how to [Deploy Milvus on AWS with Terraform and Ansible](aws.md)
  - Learn how to [Deploy Milvus on Amazon EKS with Terraform](eks.md)
  - Learn how to [Deploy Milvus Cluster on GCP with Kubernetes](gcp.md)
  - Learn how to [Deploy Milvus on Microsoft Azure With Kubernetes](azure.md)
