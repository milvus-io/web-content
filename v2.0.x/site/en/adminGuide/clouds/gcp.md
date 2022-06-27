---
id: gcp.md
title: Deploy a Milvus Cluster on GCP
related_key: cluster
summary: Learn how to deploy a Milvus cluster on GCP.
---

# Deploy a Milvus Cluster on GCP

This topic describes how to deploy a Milvus cluster on [Google Cloud Platform](https://console.cloud.google.com/) (GCP).

## Prerequisites
Determine the Google Cloud project that you want to work with. If you are not sure which one to use, ask your GCP administrators to create a new one. See [Creating and managing projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects) for more information. The project used in this topic is named <code>milvus-testing-nonprod</code>. Replace it with your project name in commands.


### Software requirements
- [Cloud SDK](https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/)
  
Alternatively, you can use [Cloud Shell](https://cloud.google.com/shell) which has the GCP SDK, kubectl, and Helm preinstalled.

<div class="alert note">After you install the Cloud SDK, ensure that you are properly authenticated.</div>

## Set up network

Ensure that you create a virtual private cloud (VPC) before creating a firewall rule for Milvus.
<br>
If you already have a VPC that you want to use, proceed to [Create a firewall rule for Milvus ](gcp.md#Create-a-firewall-rule-for-Milvus).


### Create a VPC

Open a terminal and run the following command to create a VPC.

<div class="alert note">
Replace <code>milvus-testing-nonprod</code> with your project name.
</div>

```shell
gcloud compute networks create milvus-network --project=milvus-testing-nonprod --subnet-mode=auto --mtu=1460 --bgp-routing-mode=regional
```

Run the following commands to create firewall rules to allow ICMP, internal, RDP, and SSH traffic.

```shell
gcloud compute firewall-rules create milvus-network-allow-icmp --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/global/networks/milvus-network --description=Allows\ ICMP\ connections\ from\ any\ source\ to\ any\ instance\ on\ the\ network. --direction=INGRESS --priority=65534 --source-ranges=0.0.0.0/0 --action=ALLOW --rules=icmp

gcloud compute firewall-rules create milvus-network-allow-internal --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/global/networks/milvus-network --description=Allows\ connections\ from\ any\ source\ in\ the\ network\ IP\ range\ to\ any\ instance\ on\ the\ network\ using\ all\ protocols. --direction=INGRESS --priority=65534 --source-ranges=10.128.0.0/9 --action=ALLOW --rules=all

gcloud compute firewall-rules create milvus-network-allow-rdp --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/global/networks/milvus-network --description=Allows\ RDP\ connections\ from\ any\ source\ to\ any\ instance\ on\ the\ network\ using\ port\ 3389. --direction=INGRESS --priority=65534 --source-ranges=0.0.0.0/0 --action=ALLOW --rules=tcp:3389

gcloud compute firewall-rules create milvus-network-allow-ssh --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/global/networks/milvus-network --description=Allows\ TCP\ connections\ from\ any\ source\ to\ any\ instance\ on\ the\ network\ using\ port\ 22. --direction=INGRESS --priority=65534 --source-ranges=0.0.0.0/0 --action=ALLOW --rules=tcp:22
```

### Create a firewall rule for Milvus 

Create a firewall rule to allow incoming traffic on the ```19530``` port used by Milvus.

```Apache
gcloud compute --project=milvus-testing-nonprod firewall-rules create allow-milvus-in --description="Allow ingress traffic for Milvus on port 19530" --direction=INGRESS --priority=1000 --network=projects/milvus-testing-nonprod/global/networks/milvus-network --action=ALLOW --rules=tcp:19530 --source-ranges=0.0.0.0/0
```

## Provision a Kubernetes cluster

We use Google Kubernetes Engine (GKE) to provision a K8s cluster. In this topic, we create a cluster that has two nodes. The nodes are in the ```use-west1-a``` zone, are with the ```e2-standard-4``` machine type, and use the ```cos_containerd``` node image.

<div class="alert note">
Modify the preceding options as needed.
</div>

### Select a machine type

In this topic, we use the ```e2-standard-4``` machine type, which has 4 vCPUs and 16 GB of memory.

<div class="alert note">
You can select machine types as you need. However, we recommend that you select machine types that have a minimum of 16 GB of memory to ensure stability.
</div>

```shell
gcloud beta container --project "milvus-testing-nonprod" clusters create "milvus-cluster-1" --zone "us-west1-a" --no-enable-basic-auth --cluster-version "1.20.8-gke.900" --release-channel "regular" --machine-type "e2-standard-4" --image-type "COS_CONTAINERD" --disk-type "pd-standard" --disk-size "100" --max-pods-per-node "110" --num-nodes "2" --enable-stackdriver-kubernetes --enable-ip-alias --network "projects/milvus-testing-nonprod/global/networks/milvus-network" --subnetwork "projects/milvus-testing-nonprod/regions/us-west1/subnetworks/milvus-network"
```

Creating a cluster might take several minutes. After the cluster is created, run the following command to fetch credentials for the cluster.

```shell
gcloud container clusters get-credentials milvus-cluster-1
```

The preceding command points ```kubectl``` at the cluster.

## Deploy Milvus 

After provisioning a cluster, you can deploy Milvus. If you switch to a different terminal, run the following command again to fetch credentials.

```shell
gcloud container clusters get-credentials milvus-cluster-1
```

1. Run the following command to add the Milvus Helm chart repository.
```shell
helm repo add milvus https://milvus-io.github.io/milvus-helm/
```

2. Run the following command to update your Milvus Helm chart.
```Apache
helm repo update
```

3. Run the following command to deploy Milvus. 

<div class="alert note">
This topic uses the <code>my-release</code> release name. Replace it with your release name.
</div>

```shell
helm install my-release milvus/milvus --set service.type=LoadBalancer
```

Starting pods might take several minutes. Run <code>kubectl get services</code> to view services. If successful, a list of services is shown as follows.


![GCP](../../../../assets/gcp.png "Result screenshot.")


<div class="alert note">

<code>34.145.26.89</code> in the the <code>EXTERNAL-IP</code> column is the IP address of the load balancer. The IP address is used to connect to Milvus.
</div>

## Use Google Cloud Storage
Google Cloud Storage (GCS) is Google Cloud's version of AWS Simple Storage Service (S3).

MinIO GCS Gateway allows accessing GCS. Essentially, MinIO GCS Gateway translates and forwards all connections to GCS by using APIs. You can use MinIO GCS Gateway instead of a MinIO server.

### Set variables

Set variables before you use MinIO GCS Gateway. Modify the default values as needed.

#### Secrets

To access GCS resources, MinIO GCS Gateway requires both GCP service account credentials and MinIO credentials. Store the credentials in a K8s secret. The credentials are listed as follows.

- `accesskey`: The MinIO access key.
- `secretkey`: The MinIO secret key.
- `gcs_key.json`: The GCP service account credentials file.


The following example creates a secret named `mysecret` with `accesskey=minioadmin`, `secretkey=minioadmin`, and `gcs_key.json` using the `/home/credentials.json` path.

```shell
$ kubectl create secret generic mysecret --from-literal=accesskey=minioadmin --from-literal=secretkey=minioadmin --from-file=gcs_key.json=/home/credentials.json
```

<div class="alert note">
If you choose <code>accesskey</code> and <code>secretkey</code> values other than the default <code>minioadmin/minioadmin</code>, you need to update the <code>minio.accessKey</code> and <code>minio.secretKey</code> metadata variables as well.
</div>


#### Metadata 


 The following table lists the metadata that you can configure.
|Option|Description|Default|
|:---|:---|:---|
|`minio.mode`|Set the value to ```standalone``` to enable MinIO GCS Gateway.|`distributed`|
|`minio.gcsgateway.enabled`|Set the value to ```true``` to enable MinIO GCS Gateway.|`false`|
|`minio.gcsgateway.projectId`|The ID of the GCP project.|`""`|
|`minio.existingSecret`|The name of the previously defined secret.|`""`|
|`externalGcs.bucketName`|The name of the GCS bucket to use. Unlike an S3/MinIO bucket, a GCS bucket must be globally unique.|`""`|

The following table lists the metadata that you might want to leave as default.
|Option|Description|Default|
|:---|:---|:---|
|`minio.gcsgateway.replicas`|The number of replica nodes to use for the gateway. We recommend that you use one because MinIO does not support well for more than one replica.|`1`|
|`minio.gcsgateway.gcsKeyJson`|The file path to GCS service account access credentials file. Do **not** modify the default value.|`/etc/credentials/gcs_key.json`|

Continue to use all normal MinIO metadata variables.

The following example installs a chart named `my-release`.

```shell
$ helm install my-release milvus/milvus --set minio.existingSecret=mysecret --set minio.gcsgateway.enabled=true --set minio.gcsgateway.projectId=milvus-testing-nonprod --set externalGcs.bucketName=milvus-bucket-example --set minio.mode=standalone
```

## What's next

If you want to learn how to deploy Milvus on other clouds:
- [Deploy a Milvus Cluster on EC2](https://milvus.io/docs/v2.0.0/aws.md)
- [Deploy a Milvus Cluster on EKS](https://milvus.io/docs/v2.0.0/eks.md)
- [Deploy a Milvus Cluster on Azure](https://milvus.io/docs/v2.0.0/azure.md)
