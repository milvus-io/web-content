---
id: azure.md
title: Guide to Deploying Milvus on Microsoft Azure With Kubernetes
summary: Learn how to deploy Milvus cluster on Azure.
---

# Guide to Deploying Milvus on Microsoft Azure With Kubernetes

This guide is a set of instructions for deploying Milvus cluster on Microsoft Azure.

## Prerequisites

1. Confirm that your Azure project is set up properly and that you have access to the resources you would like to use. Contact your Azure administrator if you are unsure about your permissions. 
2. Install Azure CLI and confirm that you are properly authenticated. 
3. Install kubectl and helm. You can also use the Azure Cloud Shell from your browser, which offers a choice of Bash or PowerShell. 

<div class="alert note">
Azure Cloud Shell has Azure CLI, kubectl, and helm all pre-installed. 
</div>

## Provision a Kubernetes cluster with Azure Kubernetes Service (AKS)
This guide uses [Azure Portal](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough-portal) to create a cluster and AKS to provision a Kubernetes cluster. You can access the AKS creation interface [here](https://portal.azure.com/#create/microsoft.aks).

1. Select the appropriate options.

**Basics**

- Project Details
  - Subscription: Contact your organization's Azure Administrator to determine which subscription you should use.

  - Resource group: Contact your organization's Azure Administrator to determine which resource group you should use.

- Cluster Details
  - Kubernetes cluster name: A cluster name of your own choice.

  - Region: A region of your own choice. 

  - Availability zones: Pick a number of [availability zones](https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters) based on your needs. For production clusters, we recommend you to use multiple availability zones. But for testing purposes, it is unnecessary to use more than one availability zone.

- Primary Node Pool

  - Node size: We strongly recommend choosing a node type with at least **16 GiB of RAM** available. Depending on your data scale, you can also pick a node type with more resources.
  
    <div class="alert note">    
    You may select different machine types to better suit your work case, but we strongly recommend that worker nodes all have at least 16 GB of memory to ensure minimum stable operation.
    </div>

  - Scale Method: A scaling method of your own choice.

  - Node Count: The number of nodes of your own choice.

**Node Pools**

- Enable Virtual Nodes: Whether to enable virtual nodes is of your own choice.

- Enable Virtual Machine Scale Sets: We recommend choosing `enabled`.

**Networking**

- Network configuration: We recommend choosing `Kubenet`.

- DNS name prefix: A DNS name prefix of your own choice.

- Traffic Routing

  - Load Balancer: `Standard`

  - HTTP application routing: `Not Needed`

2. After selecting the appropriate options, review and create a cluster. Allow several minutes for the cluster to spin up before proceeding to the next step. 

## Deploy Milvus with Helm

After setting up the cluster, we can now deploy Milvus with Helm. 

#### Before you begin

1. Connect your shell to the newly created Kubernetes cluster. 
Navigate to your Kubernetes Cluster under the Azure resources panel. Get the requisite connection info by selecting the "connect button" under the "overview" tab. See screenshot below. 

![Azure](../../../../assets/azure.png)

2. Use the Azure Cloud Shell or Azure CLI to set your subscription and configure your cluster credentials with the information in the "connect" tab.

```
az account set --subscription EXAMPLE-SUBSCRIPTION-ID
```

```
az aks get-credentials --resource-group YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
```

<div class="alert note">
Use the same shell for helm deployment. If you change or close your shell, repeat the above two commands before proceeding to deployment.
</div>

#### Deploy

1. Add the Milvus chart repository.

```
helm repo add milvus https://milvus-io.github.io/milvus-helm/
```

2. Update your Milvus chart.

```
helm repo update
```

3. Run helm to deploy Milvus. 

<div class="alert note">
In this guide, we pick the name <code>my-release</code>, but you can change the name.
</div>

```
helm install my-release milvus/milvus --set cluster.enabled=true --set service.type=LoadBalancer
```

Allow several minutes for the pods to start up. Run `kubectl get services` to check on the services. If the services are successfully booted, you can see a set of services listed out. 

![Results](../../../../assets/azure_results.png)

<div class="alert note">
Note that the IP listed under the EXTERNAL-IP column for the load balancer is the IP for connecting to Milvus. The default Milvus port is 19530. 
</div>

## Use Azure Blob Storage

#### Overview

Azure Blob Storage is one of Microsoft Azure's cloud storage offerings, sharing many features with competitors such as AWS's S3 storage.

The Azure gateway node is an alternative running method for the MinIO server which behaves the same from the client's perspective, but translates and forwards all connections to Azure Blob Storage with the according Azure connection API.

#### How to use

You need to set a number of variables before using the Azure gateway node. Most of the variables are set to appropriate default settings, but you still need to alter some variables.

**Metadata that you must set**

- `minio.azuregateway.enabled`: Must be set to `true` to enable operation.

  -  Default is false. 

- `minio.accessKey`: Name of the Azure storage account to use.

- `minio.secretKey`: Access key for the Azure storage account.

- `externalAzure.bucketName`: Name of the Azure storage bucket to use. Unlike S3/MinIO buckets, Azure buckets must be *globally* unique. Therefore the default value is unset.

  - Default is unset.

**Metadata that should be left as default**

- `minio.azuregateway.replicas`: Number of replica nodes to use for the Azure gateway. We highly recommend using only one replica node because MinIO does not have good support for higher numbers. 

  - Default is 1.

- You should also inherit all of the normal MinIO metadata variables.

Example helm install:

```
helm install my-release ./milvus --set cluster.enabled=true --set service.type=LoadBalancer --set minio.persistence.enabled=false --set externalAzure.bucketName=milvusbuckettwo --set minio.azuregateway.enabled=true --set minio.azuregateway.replicas=1 --set minio.accessKey=milvusstorage --set minio.secretKey=your-azure-key
```

