---
id: gcp.md
title: Deploy Milvus Cluster on GCP with Kubernetes
---

# Deploy Milvus Cluster on GCP with Kubernetes

This guide is a set of instructions for deploying Milvus cluster on Google Cloud Platform (GCP). 

## Before you begin
Before getting started, confirm which GCP project you will work under. If you are not sure which project to use, contact your GCP administrators and ask them to [set one up](https://cloud.google.com/resource-manager/docs/creating-managing-projects) for you. A project named **"milvus-testing-nonprod"** is used in this guide. If your project is named differently, you need to reword the commands accordingly.

Next, [install the GCP SDK](https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version) and confirm that you are properly authenticated. Install [kubectl](http://gcloud%20container%20clusters%20get-credentials%20hello-cluster/) and [helm](http://gcloud%20container%20clusters%20get-credentials%20hello-cluster/). Alternatively, you can use the [Google Cloud Shell](https://cloud.google.com/shell) from your browser, which has the GCP SDK, kubectl, and helm pre-installed. 

## Set up the Network

If you have an existing virtual private cloud (VPC) network you would like to make use of, you can directly proceed to [create a firewall rule for Milvus](gcp.md#Create-a-Firewall-Rule-for-Milvus).

If you do not have an existing VPC network or would like to make a new one, create a new VPC network first before creating a firewall rule for Milvus.

### Create a new VPC Network

Open up your CLI and create a new VPC. 

<div class="alert note">
Replace <b>milvus-testing-nonprod</b> with the name of your project.
</div>

```Apache
gcloud compute networks create milvus-network --project=milvus-testing-nonprod --subnet-mode=auto --mtu=1460 --bgp-routing-mode=regional
```

Next, create a set of basic firewall rules to allow traffic such as internal communication, ssh connections, icmp, and rdp.

```Apache
gcloud compute firewall-rules create milvus-network-allow-icmp --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/global/networks/milvus-network --description=Allows\ ICMP\ connections\ from\ any\ source\ to\ any\ instance\ on\ the\ network. --direction=INGRESS --priority=65534 --source-ranges=0.0.0.0/0 --action=ALLOW --rules=icmp

gcloud compute firewall-rules create milvus-network-allow-internal --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/global/networks/milvus-network --description=Allows\ connections\ from\ any\ source\ in\ the\ network\ IP\ range\ to\ any\ instance\ on\ the\ network\ using\ all\ protocols. --direction=INGRESS --priority=65534 --source-ranges=10.128.0.0/9 --action=ALLOW --rules=all

gcloud compute firewall-rules create milvus-network-allow-rdp --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/global/networks/milvus-network --description=Allows\ RDP\ connections\ from\ any\ source\ to\ any\ instance\ on\ the\ network\ using\ port\ 3389. --direction=INGRESS --priority=65534 --source-ranges=0.0.0.0/0 --action=ALLOW --rules=tcp:3389

gcloud compute firewall-rules create milvus-network-allow-ssh --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/global/networks/milvus-network --description=Allows\ TCP\ connections\ from\ any\ source\ to\ any\ instance\ on\ the\ network\ using\ port\ 22. --direction=INGRESS --priority=65534 --source-ranges=0.0.0.0/0 --action=ALLOW --rules=tcp:22
```

### Create a Firewall Rule for Milvus 

Create a firewall rule to allow external ingress on port 19530, which is the port used by Milvus.

```Apache
gcloud compute --project=milvus-testing-nonprod firewall-rules create allow-milvus-in --description="Allow ingress traffic for Milvus on port 19530" --direction=INGRESS --priority=1000 --network=projects/milvus-testing-nonprod/global/networks/milvus-network --action=ALLOW --rules=tcp:19530 --source-ranges=0.0.0.0/0
```

## Provision a Kubernetes Cluster with GKE
We use GKE Standard to provision a Kubernetes cluster. In this guide, we create a cluster with 2 nodes, in zone `us-west1-a`, with machine type `e2-standard-4` running image-type `COS_CONTAINERD`.

<div class="alert note">
You can change the above options to suit your cluster needs.
</div>

### Choice of machine type

In this guide, we use a machine type of `e2-standard-4`, which has 4 vCPU and 16GB memory, for worker nodes. 

<div class="alert note">
You may select different machine types to better suit your work case, but we strongly recommend that worker nodes all have at least 16GB of memory to ensure minimum stable operation.
</div>

```Apache
gcloud beta container --project "milvus-testing-nonprod" clusters create "milvus-cluster-1" --zone "us-west1-a" --no-enable-basic-auth --cluster-version "1.20.8-gke.900" --release-channel "regular" --machine-type "e2-standard-4" --image-type "COS_CONTAINERD" --disk-type "pd-standard" --disk-size "100" --max-pods-per-node "110" --num-nodes "2" --enable-stackdriver-kubernetes --enable-ip-alias --network "projects/milvus-testing-nonprod/global/networks/milvus-network" --subnetwork "projects/milvus-testing-nonprod/regions/us-west1/subnetworks/milvus-network"
```

It may take several minutes for your cluster to spin up. After creating your cluster, get the authentication credentials for the cluster. 

```Apache
gcloud container clusters get-credentials milvus-cluster-1
```

This configures **kubectl** to use the cluster.


## Deploy Milvus with Helm

After setting up the cluster, we can now deploy Milvus. If you have used a different shell in the previous step, get the credentials again.

```Apache
gcloud container clusters get-credentials milvus-cluster-1
```

1. Add the Milvus chart repository.
```Apache
helm repo add milvus https://milvus-io.github.io/milvus-helm/
```

2. Update your Milvus chart.
```Apache
helm repo update
```

3. Run helm to deploy Milvus. 

<div class="alert note">
In this guide, we pick the name <code>my-release</code>, but you can change the name.
</div>

```Thrift
helm install my-release milvus/milvus --set cluster.enabled=true --set service.type=LoadBalancer
```

Allow several minutes for pods to start up, run <code>kubectl get services</code> to check on the services. If the services are successfully booted, you can see a set of services listed out. 


![GCP](../../../../assets/gcp.png)


<div class="alert note">
Note the IP listed under the <code>EXTERNAL-IP</code> column for the load blanacer. This is the IP for connecting to Milvus.
</div>

## Use Google Cloud Storage

### Overview

Google Cloud Storage (GCS) is the Google Cloud Platform equivalent of AWS's S3 storage.
The GCS gateway node is an alternative running method for the MinIO server which behaves the same from the client's perspective, but translates and forwards all connections to GCS with the according GCS connection API.

### How to use

Using the GCS gateway node requires setting a number of variables. Some of the variables have been set to appropriate defaults, but others must be altered by the user.

#### Secrets

The MinIO GCS Gateway node requires a set of valid GCP service account credentials in order to connect to GCS. These credentials must be stored in a Kubernetes secret to be distributed. The Kubernetes secret must contain three types of data:

- `accesskey`: MinIO access key; string literal.
- `secretkey`: MinIO secret key; string literal.
- `gcs_key.json`: GCP service account credentials; json file.

Example secret creation:

```shell
$ kubectl create secret generic mysecret --from-literal=accesskey=minioadmin --from-literal=secretkey=minioadmin --from-file=gcs_key.json=/home/credentials.json
```

<div class="alert note">
If you choose <code>accesskey</code> and <code>secretkey</code> values other than the default <code>minioadmin/minioadmin</code>, you need to update the <code>minio.accessKey</code> and <code>minio.secretKey</code> metadata variables as well.
</div>


#### Metadata 

**Metadata that must be set by user:**

- `minio.gcsgateway.enabled`: Must be set to "true" to enable operation.
  -  Default is false. 
- `minio.gcsgateway.projectId`: ID of the GCP Project corresponding to the service account and bucket.
  - Default is unset.
- `minio.existingSecret`: Name of the previously defined secret. 
  - Default is unset
- `externalGcs.bucketName`: Name of the GCS storage bucket to use. Unlike S3/MinIO buckets, GCS buckets must be **globally** unique. Therefore the default value is unset.
  - Default is unset.

**Metadata that should be left as default:**

- `minio.gcsgateway.replicas`: Number of replica nodes to use for the GCS gateway. We highly recommended you to only use one because MinIO does not have good support for higher numbers. 
  - Default is 1.
- `minio.gcsgateway.gcsKeyJson`: Path to GCS service account access credentials file. You should not change the default value.
  - Default is `/etc/credentials/gcs_key.json`.
- You should also inherit all of the normal MinIO metadata variables.

Example helm install:
```shell
$ helm install my-release milvus/milvus --set cluster.enabled=true --set minio.existingSecret=mysecret --set minio.gcsgateway.enabled=true --set minio.gcsgateway.projectId=milvus-testing-nonprod --set externalGcs.bucketName=milvus-bucket-example
```


