---
id: abs.md
title: Configure Blob Storage Access by Workload Identity
related_key: blob storage, workload identity, iam
summary: Learn how to configure Blob Storage with Workload Identity.
---

# Configure Blob Storage Access by Workload Identity
This topic introduces how to configure Azure Blob Storage access by Workload Identity when you install Milvus with helm. 
For more details, refer to [Workload Identity](https://azure.github.io/azure-workload-identity/docs/introduction.html).


## Configure applications to use Workload Identity

- Set env.
```bash
export RESOURCE_GROUP="<your resource group>"
export AKS_CLUSTER="<your aks cluster name>" 
export SUB_ID="<your Subscription ID>"
export USER_ASSIGNED_IDENTITY_NAME="workload-identity"
export SERVICE_ACCOUNT_NAME="milvus-abs-access-sa"
export STORAGE_ACCOUNT_NAME="milvustesting1"
export CONTAINER_NAME="testmilvus"
export LOCATION="<your location>"
export SERVICE_ACCOUNT_NAMESPACE="default"
```

- Update an AKS cluster with OIDC Issuer and Workload Identity.
```bash
az aks update -g ${RESOURCE_GROUP} -n ${AKS_CLUSTER} --enable-oidc-issuer --enable-workload-identity
```

- Get the OIDC issuer URL.
```bash
export SERVICE_ACCOUNT_ISSUER="$(az aks show --resource-group ${RESOURCE_GROUP} --name ${AKS_CLUSTER} --query 'oidcIssuerProfile.issuerUrl' -otsv)"
```

- Create storage account and container.
```bash
az storage account create -n ${STORAGE_ACCOUNT_NAME} -g ${RESOURCE_GROUP} -l $LOCATION --sku Standard_LRS --min-tls-version TLS1_2
az storage container create -n ${CONTAINER_NAME} --account-name ${STORAGE_ACCOUNT_NAME}

```

- Create a user-assigned managed identity and assign role.
```bash
az identity create --name "${USER_ASSIGNED_IDENTITY_NAME}" --resource-group "${RESOURCE_GROUP}"
export USER_ASSIGNED_IDENTITY_CLIENT_ID="$(az identity show --name "${USER_ASSIGNED_IDENTITY_NAME}" --resource-group "${RESOURCE_GROUP}" --query 'clientId' -otsv)"
export USER_ASSIGNED_IDENTITY_OBJECT_ID="$(az identity show --name "${USER_ASSIGNED_IDENTITY_NAME}" --resource-group "${RESOURCE_GROUP}" --query 'principalId' -otsv)"
az role assignment create --role "Storage Blob Data Contributor" --assignee "${USER_ASSIGNED_IDENTITY_OBJECT_ID}" --scope "/subscriptions/${SUB_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Storage/storageAccounts/${STORAGE_ACCOUNT_NAME}"

```

- Create Service Account.
```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    azure.workload.identity/client-id: ${USER_ASSIGNED_IDENTITY_CLIENT_ID}
  name: ${SERVICE_ACCOUNT_NAME}
EOF
```

- Establish federated identity credential between the identity and the service account issuer & subject.
```bash
az identity federated-credential create \
  --name "kubernetes-federated-credential" \
  --identity-name "${USER_ASSIGNED_IDENTITY_NAME}" \
  --resource-group "${RESOURCE_GROUP}" \
  --issuer "${SERVICE_ACCOUNT_ISSUER}" \
  --subject "system:serviceaccount:${SERVICE_ACCOUNT_NAMESPACE}:${SERVICE_ACCOUNT_NAME}"
```


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

extraConfigFiles:
  user.yaml: |+
    common:
      storageType: remote

minio:
  enabled: false

labels:
  azure.workload.identity/use: "true"

serviceAccount:
  create: false
  name: milvus-abs-access-sa # SERVICE_ACCOUNT_NAME

externalS3:
  enabled: true
  host: core.windows.net
  port: 443
  rootPath: my-release
  bucketName: testmilvus # CONTAINER_NAME
  cloudProvider: azure
  useSSL: true
  useIAM: true
  accessKey: "milvustesting1" # STORAGE_ACCOUNT_NAME
  secretKey: ""
```
