---
id: gcs.md
title: Configure GCS Access by Workload Identity
related_key: gcs, storage, workload identity, iam
summary: Learn how to configure gcs with Workload Identity.
---

# Configure GCS Access by Workload Identity
This topic introduces how to configure gcs access by Workload Identity when you install Milvus with helm. 
For more details, refer to [Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity).

## Before you start

Please enable Workload Identity on clusters and node pools using the Google Cloud CLI or the Google Cloud console. Workload Identity must be enabled at the cluster level before you can enable Workload Identity on node pools.

## Configure applications to use Workload Identity

- Create bucket.
```bash
gcloud storage buckets create gs://milvus-testing-nonprod --project=milvus-testing-nonprod --default-storage-class=STANDARD --location=us-west1 --uniform-bucket-level-access
```

- Create a Kubernetes service account for your application to use.
```bash
kubectl create serviceaccount milvus-gcs-access-sa
```

- Create an IAM service account for your application or use an existing IAM service account instead. You can use any IAM service account in any project in your organization. 
```bash
gcloud iam service-accounts create milvus-gcs-access-sa \
    --project=milvus-testing-nonprod
```

- Ensure that your IAM service account has the roles you need. You can grant additional roles using the following command:
```bash
gcloud projects add-iam-policy-binding milvus-testing-nonprod \
    --member "serviceAccount:milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com" \
    --role "roles/storage.admin" \
    --condition='title=milvus-testing-nonprod,expression=resource.service == "storage.googleapis.com" && resource.name.startsWith("projects/_/buckets/milvus-testing-nonprod")'
```

- Allow the Kubernetes service account to impersonate the IAM service account by adding an IAM policy binding between the two service accounts. This binding allows the Kubernetes service account to act as the IAM service account.
```bash
gcloud iam service-accounts add-iam-policy-binding milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com \
    --role "roles/iam.workloadIdentityUser" \
    --member "serviceAccount:milvus-testing-nonprod.svc.id.goog[default/milvus-gcs-access-sa]"
```

- Annotate the Kubernetes service account with the email address of the IAM service account.
```bash
kubectl annotate serviceaccount milvus-gcs-access-sa \
    --namespace default \
    iam.gke.io/gcp-service-account=milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com
```

## Verify the Workload Identity setup

Please refer to  [Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity). Run the following command inside the Pod:
```bash
curl -H "Metadata-Flavor: Google" http://169.254.169.254/computeMetadata/v1/instance/service-accounts/default/email
```
If the result is `milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com`, it's ok.

## Deploy Milvus
```bash
helm install -f values.yaml my-release milvus/milvus
``` 

the values.yaml contents:
```yaml
cluster:
    enabled: true

service:
    type: LoadBalancer

minio:
    enabled: false

serviceAccount:
    create: false
    name: milvus-gcs-access-sa

externalS3:
    enabled: true
    host: storage.googleapis.com
    port: 443
    rootPath: milvus/my-release
    bucketName: milvus-testing-nonprod
    cloudProvider: gcp
    useSSL: true
    useIAM: true
```
