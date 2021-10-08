---
id: eks.md
title: Deploy Milvus on Amazon EKS with Terraform
related_key: Deploy Milvus on EKS
summary: Learn how to deploy Milvus on EKS.
---

# Deploy Milvus on Amazon EKS with Terraform

This guide introduces how to run Milvus on an AWS Elastic Kubernetes service (EKS) cluster using Terraform. Before getting started, we recommend you to get familiar with AWS account management. Please ensure you have access to all the required permissions to run EKS, manage networks and security groups, and spin up instances and volumes.  

## Required Software

- [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- [Helm](https://helm.sh/docs/intro/install/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

## AWS Requirements 

- [Access to EKS, EC2, S3](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html)
- [Security Key Pair](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)
- [Access Key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)

## Launch the EKS Cluster

1. Edit the Terraform variables to match your working environment.

The variables that need to be edited are found in the **variables.tf** file and contain information such as the AWS key, your IP address, where to run the cluster, and the cluster parameters.

2. With the parameters setup, you can start creating the resources. 

Begin by running a command line in the Terraform files directory. Run `terraform init` and `terraform apply`. Type yes to the confirmation prompt. 

3. When the cluster is created using Terraform, run the following command in the same command line with `${aws-region}` as the region of the cluster and  `${cluster-name}` as the name assigned to the cluster. 

```
terraform_eks % aws eks --region ${aws-region} update-kubeconfig --name ${cluster-name}
```

4. Create a kubeconfig to allow kubectl to interact with the EKS cluster. To check if this command is working, run `kubectl get svc` and check if there is a cluster in the output. 

```bash
NAME          TYPE      CLUSTER-IP    EXTERNAL-IP                                PORT(S)             AGE
kubernetes       ClusterIP   172.20.0.1    <none>                                  443/TCP             106m
```

5. Deploy the Helm chart. To use S3 for storage, you need an AWS access key and an existing bucket for the data.

```Bash
helm upgrade --install --set cluster.enabled=true --set externalS3.enabled=true --set externalS3.host='s3.us-east-2.amazonaws.com' --set externalS3.port=80 --set externalS3.accessKey=${access-key} --set externalS3.secretKey=${secret-key} --set externalS3.bucketName=${bucket-name} --set minio.enabled=False --set service.type=LoadBalancer milvus milvus/milvus
```


6. Run `kubectl get svc` again to find the external address of the load balancer and use that as the Milvus address. 

<div class="alert note">
To view what pods are currently running in the cluster, run <code>kubectl get pods</code>.
</div>

## Scaling

Milvus Kubernetes pods can only be scaled manually at this time. You can update the counts of each type of worker node by changing the values in this script. 

<div class="alert note">
Data nodes are responsible for the insert process, index nodes for indexing, query nodes for searches or queries, and proxy nodes for client connections. 
</div>

```bash
helm upgrade --install --set cluster.enabled=true --set dataNode.replicas=1 --set indexNode.replicas=1 --set queryNode.replicas=1 --set proxy.replicas=1 --set externalS3.enabled=true --set externalS3.host='s3.us-east-2.amazonaws.com' --set externalS3.port=80 --set externalS3.accessKey=${access-key} --set externalS3.secretKey=${secret-key} --set externalS3.bucketName=${bucket-name} --set minio.enabled=False --set service.type=LoadBalancer milvus milvus/milvus
```

Once the script is run, you can call `kubectl get pods` to view the new nodes.

## Resources


Files for this instruction are available at https://drive.google.com/file/d/1B5VKa5NqnkvBL1ynJySkQtwzM_f1-MwP/view?usp=sharing.

