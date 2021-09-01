---
id: eks.md
title: Deploy on an EKS cluster with Terraform
---

# 使用 Terraform 在 EKS 上部署 Milvus

## 概述

本文将介绍如何使用 Terraform 在 EKS 集群上部署 Milvus。建议你在开始前先熟悉如何管理 AWS 账户。请确保你已获取运行 EKS、管理安全组和网络、启动实例、添加卷等操作的权限。


## 软件要求

- [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- [Helm](https://helm.sh/docs/intro/install/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

## AWS 相关条件 

- [获取 EKS、EC2、S3访问权限](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html)
- [安全密钥对（security key pair）](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)
- [访问密钥（access key）](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)

## 运行 EKS 集群

1. 根据系统工作环境编辑 Terraform 参数。需要编辑的参数都位于 **variables.tf** 文件中，包括 AWS 密钥、你的 IP 地址、集群运行地、集群参数等。


2. 设置参数后，可开始创建资源。在 Terraform 文件目录中打开命令行工具，并运行指令 `terraform init` 及 `terraform apply`。输入 yes 以接受提示消息。通常需要等待 7-10 分钟来运行 EKS 集群。

3. 创建集群后，在同一命令行运行如下指令。`${aws-region}` 为集群所在地区，`${cluster-name}` 为集群名称。

```
terraform_eks % aws eks --region ${aws-region} update-kubeconfig --name ${cluster-name}
```

4. 创建 kubeconfig 文件，使用 kubectl 与 EKS 集群进行交互。运行指令 `kubectl get svc`，如输出结果中出现集群，则说明 kubeconfig 文件创建成功。

```bash
NAME          TYPE      CLUSTER-IP    EXTERNAL-IP                                PORT(S)             AGE
kubernetes       ClusterIP   172.20.0.1    <none>                                  443/TCP             106m
```

5. 部署 Helm chart。如使用 S3 存储数据，需要 AWS 密钥并指定存储桶。

```Bash
helm upgrade --install --set cluster.enabled=true --set externalS3.enabled=true --set externalS3.host='s3.us-east-2.amazonaws.com' --set externalS3.port=80 --set externalS3.accessKey=${access-key} --set externalS3.secretKey=${secret-key} --set externalS3.bucketName=${bucket-name} --set minio.enabled=False --set service.type=LoadBalancer milvus milvus/milvus
```

6. 再次运行指令 `kubectl get svc`，查找负载均衡器的外部地址，并将其用作 Milvus 集群地址。

<div class="alert note">
输入指令 <code>kubectl get pods</code> 来查看当前正在运行的 pod。
</div>

## 扩容

Milvus Kubernetes pod 目前仅支持手动扩容。你可以通过更新脚本中的参数来调整各类型执行节点（worker node）的数量。

<div class="alert note">
Data node 负责数据插入，index node 负责建立索引，query node 负责搜索与结构化匹配，proxy node 负责连接至客户端。 
</div>

```bash
helm upgrade --install --set cluster.enabled=true --set dataNode.replicas=1 --set indexNode.replicas=1 --set queryNode.replicas=1 --set proxy.replicas=1 --set externalS3.enabled=true --set externalS3.host='s3.us-east-2.amazonaws.com' --set externalS3.port=80 --set externalS3.accessKey=${access-key} --set externalS3.secretKey=${secret-key} --set externalS3.bucketName=${bucket-name} --set minio.enabled=False --set service.type=LoadBalancer milvus milvus/milvus
```

运行脚本后，你可以调用命令 `kubectl get pods` 来查看新节点。

## 资源

所有本指南中提到的文件均可通过以下网址获取。

https://drive.google.com/file/d/1B5VKa5NqnkvBL1ynJySkQtwzM_f1-MwP/view?usp=sharing.
