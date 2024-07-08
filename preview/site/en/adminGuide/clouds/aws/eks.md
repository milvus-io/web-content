---
id: eks.md
title: Deploy a Milvus Cluster on EKS
related_key: cluster
summary: Learn how to deploy a Milvus cluster on EKS
---

# Deploy a Milvus Cluster on EKS

This topic describes how to deploy a Milvus cluster on [Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html). 

## Prerequisites

- You have AWS CLI installed on your local PC or an Amazon EC2, which will serve as your endpoint to do the operations covered in this document. For an Amazon Linux 2 or Amazon Linux 2023, the AWS CLI tools are already installed. To install AWS CLi on your local PC. Refer to [How to install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
- You have installed Kubernetes and EKS tools installed on the preferred endpoint device, including:
  - [`kubectl`](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html)
  - [`helm`](https://helm.sh/docs/intro/install/)
  - [`eksctl`](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html)
- AWS IAM permissions have been granted properly. The IAM security principal you are using must have permission to use Amazon EKS IAM roles, service-related roles, AWS CloudFormation, VPCs, and other related resources. You can follow either of the following ways to grant your principal proper permissions.
  - (Not recommended) Simply set the association policy of the user/role that you used to AWS managed policy `AdministratorAccess`.
  - (Strongly recommended) To implement the principle of least privilege, do as follows:
    - To set up permission for `eksctl`, refer to [Minimum permission for `eksctl`](https://eksctl.io/usage/minimum-iam-policies/).
    - To set up permission for creating/deleting AWS S3 buckets, refer to the following permission settings:

      ```json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "S3BucketManagement",
            "Effect": "Allow",
            "Action": [
              "s3:CreateBucket",
              "s3:PutBucketAcl",
              "s3:PutBucketOwnershipControls",
              "s3:DeleteBucket"
            ],
            "Resource": [
              "arn:aws:s3:::milvus-bucket-*"
            ]
          }
        ]
      }
      ```

    - To set up permissions for creating/deleting IAM policies, refer to the following permission settings. Do replace `YOUR_ACCOUNT_ID` with your own.

      ```json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "IAMPolicyManagement",
            "Effect": "Allow",
            "Action": [
              "iam:CreatePolicy",
              "iam:DeletePolicy"
            ],
            "Resource": "arn:aws:iam::YOUR_ACCOUNT_ID:policy/MilvusS3ReadWrite"
          }
        ]
      }    
      ``` 

## Set up AWS Resources

You can set up the required AWS resources, including an AWS S3 bucket and an EKS cluster, using either AWS Management Console, AWS CLI, or IaC tools, such as Terraform. In this document, the AWS CLI is preferred to demonstrate how to set up the AWS resources.

### Create an Amazon S3 Bucket

1. Create an AWS S3 bucket. 

    Read [Bucket Naming Rules](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html) and observe the naming rules when naming your AWS S3 bucket.

    ```shell
    milvus_bucket_name="milvus-bucket-$(openssl rand -hex 12)"

    aws s3api create-bucket --bucket "$milvus_bucket_name" --region 'us-east-2' --acl private  --object-ownership ObjectWriter --create-bucket-configuration LocationConstraint='us-east-2'


    # Output
    #
    # "Location": "http://milvus-bucket-039dd013c0712f085d60e21f.s3.amazonaws.com/"
    ```

2. Creat an IAM policy for reading and writing objects within the bucket created above. Do replace the bucket name with your own.

    ```shell
    echo '{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "s3:GetObject",
            "s3:PutObject",
            "s3:ListBucket",
            "s3:DeleteObject"
          ],
          "Resource": [
            "arn:aws:s3:::your-milvus-bucket-name",
            "arn:aws:s3:::your-milvus-bucket-name/*"
          ]
        }
      ]
    }' > milvus-s3-policy.json

    aws iam create-policy --policy-name MilvusS3ReadWrite --policy-document file://milvus-s3-policy.json


    # Get the ARN from the command output as follows:
    # {
    #     "Policy": {
    #         "PolicyName": "MilvusS3ReadWrite",
    #         "PolicyId": "AN5QQVVPM1BVTFlBNkdZT",
    #         "Arn": "arn:aws:iam::12345678901:policy/MilvusS3ReadWrite",
    #         "Path": "/",
    #         "DefaultVersionId": "v1",
    #         "AttachmentCount": 0,
    #         "PermissionsBoundaryUsageCount": 0,
    #         "IsAttachable": true,
    #         "CreateDate": "2023-11-16T06:00:01+00:00",
    #        "UpdateDate": "2023-11-16T06:00:01+00:00"
    #     }
    # }    
    ```

3. (Optional) Attach the policy to your AWS User/Role if you want to accesskey instead of IAM AssumeRole.
  
      ```shell
      aws iam attach-user-policy --user-name <your-user-name> --policy-arn "arn:aws:iam::<your-iam-account-id>:policy/MilvusS3ReadWrite"
      ```

### Create an Amazon EKS Cluster

1. Prepare a cluster configuration file as follows and name it `eks_cluster.yaml`. Do replace `MilvusS3ReadWrite_Policy_ARN` with the one listed in the command output above.

    ```yaml
    apiVersion: eksctl.io/v1alpha5
    kind: ClusterConfig

    metadata:
      name: 'milvus-eks-cluster'
      region: 'us-east-2'
      version: "1.27"

    iam:
      withOIDC: true

      serviceAccounts:
      - metadata:
          name: aws-load-balancer-controller
          namespace: kube-system
        wellKnownPolicies:
          awsLoadBalancerController: true
      - metadata:
          name: milvus-s3-access-sa
          namespace: milvus
          labels: {aws-usage: "milvus"}
        attachPolicyARNs:
        - "MilvusS3ReadWrite_Policy_ARN" # arn:aws:iam::12345678901:policy/MilvusS3ReadWrite

    managedNodeGroups:
      - name: milvus-node-group
        labels: { role: milvus }
        instanceType: m6i.4xlarge
        desiredCapacity: 3
        privateNetworking: true
        
    addons:
    - name: vpc-cni
      version: latest
      attachPolicyARNs:
        - arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy
    - name: coredns
      version: latest
    - name: kube-proxy
      version: latest
    - name: aws-ebs-csi-driver
      version: latest
      wellKnownPolicies:
        ebsCSIController: true
    ```
2. Run the following command to create an EKS cluster.

    ```bash
    eksctl create cluster -f eks_cluster.yaml
    ```

3. Get the kubeconfig file.

    ```bash
    aws eks update-kubeconfig --region 'us-east-2' --name 'milvus-eks-cluster'
    ```

4. Verify the EKS cluster.

    ```bash
    kubectl cluster-info

    kubectl get nodes -A -o wide
    ```

## Create a StorageClass

Milvus uses `etcd` as meta storage and needs to rely on the `gp3` StorageClass to create and manage PVC.

```yaml
cat <<EOF | kubectl apply -f -
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ebs-gp3-sc
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: ebs.csi.aws.com
volumeBindingMode: WaitForFirstConsumer
parameters:
  type: gp3
EOF
```

Set the original gp2 StorageClass to non-default.

```shell
kubectl patch storageclass gp2 -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
```

### Install AWS LoadBalancer Controller

1. Add Helm chars repo.

    ```shell
    helm repo add eks https://aws.github.io/eks-charts
    helm repo update
    ```

2. Install the AWS Load Balancer Controller.

    ```shell
    helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
      -n kube-system \
      --set clusterName='milvus-eks-cluster' \
      --set serviceAccount.create=false \
      --set serviceAccount.name=aws-load-balancer-controller 
    ```

3. Verify the installation

    ```shell
    kubectl get deployment -n kube-system aws-load-balancer-controller
    ```

## Deploy Milvus

In this guide, we will use Milvus Helm Charts to deploy a Milvus cluster. You can find the charts [here](https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus).

1. Add Milvus Helm Chart repo.

    ```bash
    helm repo add milvus https://zilliztech.github.io/milvus-helm/
    helm repo update
    ```

2. Prepare the Milvus configuration file `milvus.yaml`, and replace `<bucket-name>` with the name of the bucket created above.

    <div class="alert note">
    
    - To configure HA for your Milvus, refer to [this calculator](https://milvus.io/tools/sizing/) for more information. You can download the related configurations directly from the calculator, and you should remove MinIO-related configurations.
    - To implement multi-replica deployments of coordinators, set `xxCoordinator.activeStandby.enabled` to `true`.

    </div>

    ```yaml
    cluster:
      enabled: true

    service:
      type: LoadBalancer
      port: 19530
      annotations: 
        service.beta.kubernetes.io/aws-load-balancer-type: external
        service.beta.kubernetes.io/aws-load-balancer-name: milvus-service
        service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
        service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip

    serviceAccount:
      create: false
      name: milvus-s3-access-sa

    minio:
      enabled: false

    # Use the milvus-s3-access-sa to access milvus buckets instead of using ak/sk.  
    # Details see https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html
    externalS3:
      enabled: true
      host: "s3.us-east-2.amazonaws.com"
      port: "443"
      useSSL: true
      bucketName: "<bucket-name>"
      useIAM: true
      cloudProvider: "aws"
      iamEndpoint: ""

    # HA Configurations
    rootCoordinator:
      replicas: 2
      activeStandby:
        enabled: true
      resources: 
        limits:
          cpu: 1
          memory: 2Gi

    indexCoordinator:
      replicas: 2
      activeStandby:
        enabled: true
      resources: 
        limits:
          cpu: "0.5"
          memory: 0.5Gi

    queryCoordinator:
      replicas: 2
      activeStandby:
        enabled: true
      resources: 
        limits:
          cpu: "0.5"
          memory: 0.5Gi

    dataCoordinator:
      replicas: 2
      activeStandby:
        enabled: true
      resources: 
        limits:
          cpu: "0.5"
          memory: 0.5Gi

    proxy:
      replicas: 2
      resources: 
        limits:
          cpu: 1
          memory: 2Gi  
    ```

3. Install Milvus.

    ```shell
    helm install milvus-demo milvus/milvus -n milvus -f milvus.yaml
    ```

4. Wait until all pods are `Running`.

    ```shell
    kubectl get pods -n milvus
    ```

    <div class="alert note">

    Helm does not support scheduling the order of service creation. It is normal that business pods to restart for one or two times before `etcd` and `pulsar` are up in the early stage.

    </div>

5. Get Milvus service address.

    ```shell
    kubectl get svc -n milvus
    ```

## Verify the installation

You can follow the simple guide below to verify the installation. For more details, refer to [this example](https://milvus.io/docs/example_code.md).

1. Download the example code.

    ```shell
    wget https://raw.githubusercontent.com/milvus-io/pymilvus/master/examples/hello_milvus.py
    ```

2. Change the `host` argument in the example code to the Milvus service address above.


    ```python
    ...
    connections.connect("default", host="milvus-service-06b515b1ce9ad10.elb.us-east-2.amazonaws.com", port="19530")
    ...
    ```

3. Run the example code.

    ```shell
    python3 hello_milvus.py
    ```

    The output should be similar to the following:

    ```shell
    === start connecting to Milvus     ===

    Does collection hello_milvus exist in Milvus: False

    === Create collection `hello_milvus` ===


    === Start inserting entities       ===

    Number of entities in Milvus: 3000

    === Start Creating index IVF_FLAT  ===


    === Start loading                  ===


    === Start searching based on vector similarity ===

    hit: id: 2998, distance: 0.0, entity: {'random': 0.9728033590489911}, random field: 0.9728033590489911
    hit: id: 1262, distance: 0.08883658051490784, entity: {'random': 0.2978858685751561}, random field: 0.2978858685751561
    hit: id: 1265, distance: 0.09590047597885132, entity: {'random': 0.3042039939240304}, random field: 0.3042039939240304
    hit: id: 2999, distance: 0.0, entity: {'random': 0.02316334456872482}, random field: 0.02316334456872482
    hit: id: 1580, distance: 0.05628091096878052, entity: {'random': 0.3855988746044062}, random field: 0.3855988746044062
    hit: id: 2377, distance: 0.08096685260534286, entity: {'random': 0.8745922204004368}, random field: 0.8745922204004368
    search latency = 0.4693s

    === Start querying with `random > 0.5` ===

    query result:
    -{'embeddings': [0.20963514, 0.39746657, 0.12019053, 0.6947492, 0.9535575, 0.5454552, 0.82360446, 0.21096309], 'pk': '0', 'random': 0.6378742006852851}
    search latency = 0.9407s
    query pagination(limit=4):
            [{'random': 0.6378742006852851, 'pk': '0'}, {'random': 0.5763523024650556, 'pk': '100'}, {'random': 0.9425935891639464, 'pk': '1000'}, {'random': 0.7893211256191387, 'pk': '1001'}]
    query pagination(offset=1, limit=3):
            [{'random': 0.5763523024650556, 'pk': '100'}, {'random': 0.9425935891639464, 'pk': '1000'}, {'random': 0.7893211256191387, 'pk': '1001'}]

    === Start hybrid searching with `random > 0.5` ===

    hit: id: 2998, distance: 0.0, entity: {'random': 0.9728033590489911}, random field: 0.9728033590489911
    hit: id: 747, distance: 0.14606499671936035, entity: {'random': 0.5648774800635661}, random field: 0.5648774800635661
    hit: id: 2527, distance: 0.1530652642250061, entity: {'random': 0.8928974315571507}, random field: 0.8928974315571507
    hit: id: 2377, distance: 0.08096685260534286, entity: {'random': 0.8745922204004368}, random field: 0.8745922204004368
    hit: id: 2034, distance: 0.20354536175727844, entity: {'random': 0.5526117606328499}, random field: 0.5526117606328499
    hit: id: 958, distance: 0.21908017992973328, entity: {'random': 0.6647383716417955}, random field: 0.6647383716417955
    search latency = 0.4652s

    === Start deleting with expr `pk in ["0" , "1"]` ===

    query before delete by expr=`pk in ["0" , "1"]` -> result:
    -{'random': 0.6378742006852851, 'embeddings': [0.20963514, 0.39746657, 0.12019053, 0.6947492, 0.9535575, 0.5454552, 0.82360446, 0.21096309], 'pk': '0'}
    -{'random': 0.43925103574669633, 'embeddings': [0.52323616, 0.8035404, 0.77824664, 0.80369574, 0.4914803, 0.8265614, 0.6145269, 0.80234545], 'pk': '1'}

    query after delete by expr=`pk in ["0" , "1"]` -> result: []


    === Drop collection `hello_milvus` ===
    ```

## Clean-up works

In case you need to restore the environment by uninstalling Milvus, destroying the EKS cluster, and deleting the AWS S3 buckets and related IAM policies.

1. Uninstall Milvus.

    ```shell
    helm uninstall milvus-demo -n milvus
    ```

2. Destroy the EKS cluster.

    ```shell
    eksctl delete cluster --name milvus-eks-cluster --region us-east-2
    ```

3. Delete the AWS S3 bucket and related IAM policies.

    You should replace the bucket name and policy ARN with your own.

    ```shell
    aws s3 rm s3://milvus-bucket-039dd013c0712f085d60e21f --recursive

    aws s3api delete-bucket --bucket milvus-bucket-039dd013c0712f085d60e21f --region us-east-2

    aws iam delete-policy --policy-arn 'arn:aws:iam::12345678901:policy/MilvusS3ReadWrite'
    ```

## What's next

If you want to learn how to deploy Milvus on other clouds:
- [Deploy a Milvus Cluster on EC2](aws.md)
- [Deploy Milvus Cluster on GCP with Kubernetes](gcp.md)
- [Guide to Deploying Milvus on Microsoft Azure With Kubernetes](azure.md)
