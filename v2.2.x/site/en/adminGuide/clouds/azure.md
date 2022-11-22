---
id: azure.md
title: Deploying Milvus on Microsoft Azure With Kubernetes
related_key: cluster
summary: Learn how to deploy a Milvus cluster on Azure.
---

#  Deploy Milvus on Azure with AKS

 This topic describes how to provision and create a cluster with [Azure Kubernetes Service](https://azure.microsoft.com/en-us/services/kubernetes-service/#overview) (AKS) and the [Azure portal](https://portal.azure.com).

## Prerequisites

Ensure that your Azure project has been set up properly and you have access to the resources that you want to use. Contact your administrators if you are not sure about your access permission. 
   
### Software requirements
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli#install)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/)

Alternatively, you can use the [Cloud Shell](https://learn.microsoft.com/en-us/azure/cloud-shell/overview) which has the Azure CLI, kubectl, and Helm preinstalled.

<div class="alert note">After you install the Azure CLI, ensure that you are properly authenticated. </div>

## Provision a Kubernetes cluster

1. Log on to the Azure portal.
2. On the Azure portal menu or from the **Home** page, select **Create a resource**.
3. Select **Containers** > **Kubernetes Service**.
4. On the **Basics** page, configure the following options:

- **Project details**:
  - **Subscription**: Contact your organization's Azure Administrator to determine which subscription you should use.

    - **Resource group**: Contact your organization's Azure Administrator to determine which resource group you should use.

- **Cluster details**:
  - **Kubernetes cluster name**: Enter a cluster name.

  - **Region**: Select a region.

  - **Availability zones**: Select [availability zones](https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters) as you need. For production clusters, we recommend that you select multiple availability zones.

- **Primary node pool**:

  - **Node size**: We recommend that you choose VMs with a minimum of 16 GB of RAM, but you can select virtual machine sizes as you need.

  - **Scale method**: Choose a scale method.

  - **Node count range**: Select a range for the number of nodes.

- **Node pools**:

  - **Enable virtual nodes**: Select the checkbox to enable virtual nodes.

  - **Enable virtual machine scale sets**: We recommend that you choose `enabled`.

- **Networking**:

  - **Network configuration**: We recommend that you choose `Kubenet`.

  - **DNS name prefix**: Enter a DNS name prefix.

  - **Traffic Routing**:

    - **Load balancer**: `Standard`.

    - **HTTP application routing**: Not required.


5. After configuring the options, click **Review + create** and then **Create** when validation completes. It takes a few minutes to create the cluster. 


## Deploy Milvus with Helm

After the cluster is created, install Milvus on the cluster with Helm.


### Connect to the cluster

1. Navigate to the cluster that you have created in Kubernetes services and click it.
2. On the left-side navigation pane, click `Overview`.
3. On the **Overview** page that appears, click **Connect** to view the resource group and subscription.
![Azure](../../../../assets/azure.png "The Azure overview page.")

### Set a subscription and credentials

<div class="alert note">You can use Azure Cloud Shell to perform the following procedures.</div>

1. Run the following command to set your subscription.

```shell
az account set --subscription EXAMPLE-SUBSCRIPTION-ID
```
2. Run the following command to download credentials and configure the Kubernetes CLI to use them.
   
```shell
az aks get-credentials --resource-group YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
```

<div class="alert note">
Use the same shell for the following procedures. If you switch to another shell, run the preceding commands again.
</div>

### Deploy Milvus

1. Run the following command to add the Milvus Helm chart repository.

```shell
helm repo add milvus https://milvus-io.github.io/milvus-helm/
```

2. Run the following command to update your Milvus Helm chart.

```shell
helm repo update
```

3. Run the following command to install Milvus.

<div class="alert note">
This topic uses <code>my-release</code> as the release name. Replace it with your release name.
</div>

```shell
helm install my-release milvus/milvus --set service.type=LoadBalancer
```

Starting pods might take several minutes. Run `kubectl get services` to view services. If successful, a list of services is shown as follows.

![Results](../../../../assets/azure_results.png "Result screenshot.")

<div class="alert note">
<code>20.81.111.155</code> in the the <code>EXTERNAL-IP</code> column is the IP address of the load balancer. The default Milvus port is <code>19530</code>.
</div>

## Using Azure Blob Storage

Azure Blob Storage is Azure's version of AWS Simple Storage Service (S3).

[MinIO Azure Gateway](https://blog.min.io/deprecation-of-the-minio-gateway/) allows accessing Azure. Essentially, MinIO Azure Gateway translates and forwards all connections to Azure by using APIs. You can use MinIO Azure Gateway instead of a MinIO server.

### Set variables

Set variables before you use MinIO Azure Gateway. Modify the default values as needed.

#### Metadata

The following table lists the metadata that you can configure.

|Option|Description|Default|
|:---|:---|:---|
|`minio.azuregateway.enabled`|Set the value to ```true``` to enable MinIO Azure Gateway.|`false`|
|`minio.accessKey`|The MinIO access key.|`""`|
|`minio.secretKey`|The MinIO secret key.|`""`|
|`externalAzure.bucketName`|The name of the Azure bucket to use. Unlike an S3/MinIO bucket, an Azure bucket must be globally unique.|`""`|

The following table lists the metadata that you might want to leave as default.

|Option|Description|Default|
|:---|:---|:---|
|`minio.azuregateway.replicas`|The number of replica nodes to use for the gateway. We recommend that you use one because MinIO does not support well for more than one replica.|`1`|

Continue to use all predefined MinIO metadata variables.

The following example installs a chart named `my-release`.

```shell
helm install my-release ./milvus --set service.type=LoadBalancer --set minio.persistence.enabled=false --set externalAzure.bucketName=milvusbuckettwo --set minio.azuregateway.enabled=true --set minio.azuregateway.replicas=1 --set minio.accessKey=milvusstorage --set minio.secretKey=your-azure-key
```
## What's next

If you want to learn how to deploy Milvus on other clouds:
- [Deploy a Milvus Cluster on EC2](https://milvus.io/docs/v2.0.0/aws.md)
- [Deploy a Milvus Cluster on EKS](https://milvus.io/docs/v2.0.0/eks.md)
- [Deploy a Milvus Cluster on GCP](https://milvus.io/docs/v2.0.0/gcp.md)
