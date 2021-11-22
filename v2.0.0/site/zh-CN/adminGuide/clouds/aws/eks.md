---
id: eks.md
title: Deploy a Milvus Cluster on EKS
related_key: cluster
summary: Learn how to deploy a Milvus cluster on EKS
---

# 在 EKS 部署 Milvus 集群


本文介绍在 [Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html) 上部署 Milvus 集群的操作步骤。

<div class="alert note">
本文假设你对 AWS 访问管理有基本的了解。如果你不熟悉它，请参阅 <a href=https://docs.aws.amazon.com/iam/?id=docs_gateway>AWS Identity and Access Management 文档</a>。</div>

## 先决条件

### 所需软件

- [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- [Helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [AWS CLI 版本 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

### 云安全

- EKS，EC2，和 S3 的访问权限
- 访问密钥
- 秘密访问密钥

## 部署集群

你可以在 [Google 云端硬盘](https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view)下载模板配置文件。

1. 预置 Milvus 集群。更多信息请参见[预置 Milvus 集群](https://milvus.io/docs/v2.0.0/aws.md#provision-a-milvus-cluster)。

2. Milvus 集群预置完成后，使用集群的区域和名称运行以下命令。

   ```shell
   aws eks --region ${aws-region} update-kubeconfig --name ${cluster-name}
   ```

3. 创建 kubectl 文件，运行命令 `kubectl get svc`。如果成功，将在输出中显示一个集群。

   ```shell
   NAME          TYPE      CLUSTER-IP    EXTERNAL-IP                                PORT(S)             AGE
   kubernetes       ClusterIP   172.20.0.1    <none>                                  443/TCP             106m
   ```

4. 运行以下命令启动预置的 Milvus 集群。使用 S3 作为存储时，需要访问密钥和 S3 存储桶。

    ```shell
    helm upgrade --install --set cluster.enabled=true --set externalS3.enabled=true --set externalS3.host='s3.us-east-2.amazonaws.com' --set externalS3.port=80 --set externalS3.accessKey=${access-key} --set externalS3.secretKey=${secret-key} --set externalS3.bucketName=${bucket-name} --set minio.enabled=False --set service.type=LoadBalancer milvus milvus/milvus
    ```

5. 再次运行 `kubectl get svc` 以获取负载平衡器的 IP 地址，将它用作 Milvus 集群的 IP 地址。

<div class="alert note">运行 <code>kubectl get pods</code> 查看集群中正在运行的 Pod。</div>

## 伸缩集群

当前，Milvus 集群仅支持手动伸缩。运行以下命令以修改不同类型的节点实例的数量。

<div class ="alert note">有关数据节点、索引节点、查询节点和代理的更多信息，请参阅<a href="https://milvus.io/docs/v2.0.0/four_layers.md#StorageComputing-Disaggregation">存储/计算分离</a>。</div>


```shell
helm upgrade --install --set cluster.enabled=true --set dataNode.replicas=1 --set indexNode.replicas=1 --set queryNode.replicas=1 --set proxy.replicas=1 --set externalS3.enabled=true --set externalS3.host='s3.us-east-2.amazonaws.com' --set externalS3.port=80 --set externalS3.accessKey=${access-key} --set externalS3.secretKey=${secret-key} --set externalS3.bucketName=${bucket-name} --set minio.enabled=False --set service.type=LoadBalancer milvus milvus/milvus
```

运行以上命令后，运行 `kubectl get pods` 以查看新创建的节点实例。

## 更多内容

如果你想学习如何在其他云上部署 Milvus:
- [在 EC2 部署 Milvus 集群](https://milvus.io/cn/docs/v2.0.0/aws.md)
- [在 GCP 部署 Milvus 集群](https://milvus.io/cn/docs/v2.0.0/gcp.md)
- [在 Azure 部署 Milvus 集群](https://milvus.io/cn/docs/v2.0.0/azure.md)
