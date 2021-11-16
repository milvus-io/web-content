---
id: azure.md
title: Deploying Milvus on Microsoft Azure With Kubernetes
related_key: cluster
summary: Learn how to deploy a Milvus cluster on Azure.
---

#  在 Azure 部署 Milvus 集群

本文介绍使用 [Azure Kubernetes 服务](https://azure.microsoft.com/en-us/services/kubernetes-service/#overview) (AKS) 和 [Azure 门户](https://portal.azure.com)预置和创建集群。

## 先决条件

确保你的 Azure 项目已经正确设置，并且你可以访问你想要使用的资源。如果你不确定你的访问权限，请与你的管理员联系。

### 所需软件
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli#install)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/)

或者，你可以使用 [Cloud Shell](https://shell.azure.com.)，它预装了 Azure CLI 、kubectl 和 Helm。

<div class="alert note">在安装 Azure CLI 之后，请确保你经过了正确的身份验证。</div>

## 预置 AKS 群集

1. 登录 Azure 门户。
2. 在 Azure 门户菜单上或在“主页”中，选择“创建资源”。
3. 选择“容器” > “Kubernetes 服务”。
4. 在“基本信息”页面上，配置以下选项：

- **项目详细信息：**
  - **订阅：** 联系你组织的 Azure 管理员，以确定你应该使用哪个订阅。
  - **资源组：** 联系你组织的 Azure 管理员，以确定应该使用哪个资源组。
  
- **群集详细信息：**
  - **Kubernetes 集群名称：** 输入集群名称。

  - **区域：** 选择区域。

  - **可用性区域：** 根据需要选择[可用性区域](https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters)。对于生产集群，建议选择多个可用性区域。

- **主节点池：**
  - **节点大小：** 我们建议你选择内存至少为 16GB 的虚拟机，但是你可以根据需要选择虚拟机大小。
  
  - **缩放方法：** 选择缩放方法。
  
  - **节点数范围：** 选择节点数范围。
  
- **节点池**:
  - **启用虚拟节点：** 选中复选框启用虚拟节点。
  
  - **启动虚拟机规模集：** 我们建议你选择“启用”。
  
- **网络：**
  - **网络配置：** 我们建议你选择 `Kubenet`。
  
  - **DNS 前缀：** 输入 DNS 名称前缀。
  
  - **流量路由：**
    - **负载平衡器：** `Standard`
    - **HTTP 应用程序路由：** 不需要。


5. 验证完成后，依次单击“查看 + 创建”、“创建”。创建 AKS 群集需要几分钟时间。

## 使用 Helm 部署 Milvus

集群创建完成后，使用 Helm 将 Milvus 安装到集群中。


### 连接集群

1. 导航到你在 Kubernetes 服务中创建的集群，并单击它。
2. 在左侧导航窗格中，单击“概述”。
3. 在弹出的“概述”页面中，单击“连接”，查看资源组和订阅。
![Azure](../../../../assets/azure.png)

### 设置订阅和凭据

<div class="alert note">你可以使用 Azure Cloud Shell 执行以下步骤。</div>

1. 运行以下命令设置订阅。

```shell
az account set --subscription EXAMPLE-SUBSCRIPTION-ID
```
2. 运行以下命令下载凭据并配置 Kubernetes CLI 以使用它们。
   
```shell
az aks get-credentials --resource-group YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
```

<div class="alert note">
对下列过程使用相同的 shell。如果切换到其他 shell，请重新执行上述命令。
</div>


### 部署 Milvus

1. 运行以下命令添加 Milvus 的 Helm chart 仓库。

```shell
helm repo add milvus https://milvus-io.github.io/milvus-helm/
```

2. 执行以下命令更新你的 Milvus 的 Helm chart。

```shell
helm repo update
```

3. 运行如下命令安装 Milvus。

<div class="alert note">
本文档以 <code>my-release</code> 作为发布版本名称。将其替换为你的发布版本名称。
</div>


```shell
helm install my-release milvus/milvus --set service.type=LoadBalancer
```

启动 Pod 可能需要几分钟。执行 `kubectl get services` 命令查看服务。如果成功，服务列表如下所示。

![Results](../../../../assets/azure_results.png)

<div class="alert note">
 <code>EXTERNAL-IP</code> 下的<code>20.81.111.155</code>的为负载均衡器的IP地址。默认 Milvus 端口为<code>19530</code>。
</div>


## 使用 Azure Blob 存储

Azure Blob 存储是 Azure 版本的 Amazon S3。

MinIO Azure 网关允许访问 Azure。本质上，MinIO Azure 网关通过使用 API 转换和转发所有到 Azure 的连接。你可以使用 MinIO Azure 网关代替 MinIO 服务器。

### 设置变量

在使用 MinIO Azure Gateway 之前设置变量。根据需要修改默认值。

#### 元数据

下表列出了可以配置的元数据。

|选项|描述|默认值|
|:---|:---|:---|
|`minio.azuregateway.enabled`|设置值为 `true` 启用MinIO Azure网关。|`false`|
|`minio.accessKey`| MinIO 访问密钥。|`""`|
|`minio.secretKey`| MinIO 秘密访问密钥。|`""`|
|`externalAzure.bucketName`|要使用的 Azure 存储桶的名称。与 S3/MinIO 存储桶不同，Azure 存储桶必须是全局唯一的。|`""`|

下表列出了你可能希望保留为默认值的元数据。

|选项|描述|默认值|
|:---|:---|:---|
|`minio.azuregateway.replicas`|用于网关的复制节点的数量。我们建议你使用一个，因为 MinIO 不能很好地支持多个副本。|`1`|

继续使用所有预定义的 MinIO 元数据变量。

下面的例子安装了一个名为 `my-release` 的图表。

```shell
helm install my-release ./milvus --set service.type=LoadBalancer --set minio.persistence.enabled=false --set externalAzure.bucketName=milvusbuckettwo --set minio.azuregateway.enabled=true --set minio.azuregateway.replicas=1 --set minio.accessKey=milvusstorage --set minio.secretKey=your-azure-key
```
## 更多内容

如果你想学习如何在其他云上部署 Milvus: 
- [在 EC2 上部署 Milvus 集群](https://milvus.io/docs/v2.0.0/aws.md)
- [在 EKS 上部署 Milvus 集群](https://milvus.io/docs/v2.0.0/eks.md)
- [在 GCP 上部署 Milvus 集群](https://milvus.io/docs/v2.0.0/gcp.md)


