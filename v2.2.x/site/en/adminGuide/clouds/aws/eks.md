---
id: eks.md
title: Deploy a Milvus Cluster on EKS
related_key: cluster
summary: Learn how to deploy a Milvus cluster on EKS
---

# Deploy a Milvus Cluster on EKS

This topic describes how to deploy a Milvus cluster on [Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html). 

<div class="alert note">This topic assumes that you have a basic understanding of AWS access management. If you're not familiar with it, see <a href=https://docs.aws.amazon.com/iam/?id=docs_gateway>AWS Identity and Access Management Documentation</a>.</div>

## Prerequisites

### Software requirements

- [Helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [AWS CLI version 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

### Cloud security

- Access to EKS, EC2, and S3
- Access key ID
- Security access key

## Deploy a Milvus cluster

1. Copy the code from below code block, and save it to a file in yaml format, name the file as milvus_cluster.yaml.
```
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: my-eks-cluster
  region: us-west-2
  version: "1.23"

nodeGroups:
  - name: ng-1-workers
    labels: { role: workers }
    instanceType: m5.4xlarge
    desiredCapacity: 2
    volumeSize: 80
    iam:
      withAddonPolicies:
        ebs: true

addons:
- name: aws-ebs-csi-driver
  version: v1.13.0-eksbuild.1 # optional

```
3. Run the following command to create an EKS cluster. The example in this topic uses `my-cluster` as the cluster name. You can replace it with your own value. See [Getting started with Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html) for more information.

```
eksctl create cluster -f milvus_cluster.yaml
```

You will see the following output if the EKS cluster is created.

```
...
[✓]  EKS cluster "my-cluster" in "region-code" region is ready
```

2. After a Milvus cluster is provisioned, run the following command with a region and name for the cluster.

   ```shell
   aws eks --region ${aws-region} update-kubeconfig --name ${cluster-name}
   ```
3. Create a kubeconfig file and run ```kubectl get svc```.  If successful, a cluster appears in the output.

   ```shell
   NAME          TYPE      CLUSTER-IP    EXTERNAL-IP                                PORT(S)             AGE
   kubernetes       ClusterIP   10.100.0.1    <none>                                  443/TCP             106m
   ```
4. Add the Milvus Helm repository.
```
helm repo add milvus https://milvus-io.github.io/milvus-helm/
```

5. Run the following command to start the Milvus cluster that you have provisioned. The access key and an S3 bucket are required to use S3 as storage.

```shell
helm upgrade --install --set cluster.enabled=true --set externalS3.enabled=true --set externalS3.host='s3.us-east-2.amazonaws.com' --set externalS3.port=80 --set externalS3.accessKey=${access-key} --set externalS3.secretKey=${secret-key} --set externalS3.bucketName=${bucket-name} --set minio.enabled=False --set service.type=LoadBalancer milvus milvus/milvus
```

6. Run ```kubectl get svc ``` again to retrieve the IP address of the load balancer and use it as the IP address of the Milvus cluster.

<div class="alert note"> Run <code>kubectl get pods</code> to view the running pods on the cluster.</div>

## Scale the Milvus cluster

Currently, a Milvus cluster can only be scaled manually. Run the following command to modify the numbers of node instances with different types.

<div class ="alert note">See <a href="https://milvus.io/docs/v2.0.0/four_layers.md#StorageComputing-Disaggregation">Storage/Computing Disaggregation</a> for more information about the data node, index node, query node, and proxy.</div>

```shell
helm upgrade --install --set cluster.enabled=true --set dataNode.replicas=1 --set indexNode.replicas=1 --set queryNode.replicas=1 --set proxy.replicas=1 --set externalS3.enabled=true --set externalS3.host='s3.us-east-2.amazonaws.com' --set externalS3.port=80 --set externalS3.accessKey=${access-key} --set externalS3.secretKey=${secret-key} --set externalS3.bucketName=${bucket-name} --set minio.enabled=False --set service.type=LoadBalancer milvus milvus/milvus
```

After running the preceding command, you can run ```kubectl get pods``` to view the newly created node instances.

## What's next

If you want to learn how to deploy Milvus on other clouds:
- [Deploy a Milvus Cluster on EC2](https://milvus.io/docs/v2.0.0/aws.md)
- [Deploy Milvus Cluster on GCP with Kubernetes](https://milvus.io/docs/v2.0.0/gcp.md)
- [Guide to Deploying Milvus on Microsoft Azure With Kubernetes](https://milvus.io/docs/v2.0.0/azure.md)
