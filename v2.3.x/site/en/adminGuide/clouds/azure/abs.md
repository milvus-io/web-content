---
id: abs.md
title: Configure ABS Access by Workload Identity
related_key: abs, storage, workload identity, iam
summary: Learn how to configure abs with Workload Identity.
---

## Configure ABS Access by Workload Identity
This topic introduces how to configure Azure Blob Storage access by Workload Identity when you install Milvus with helm. 
For more details, refer to [Workload Identity](https://azure.github.io/azure-workload-identity/docs/introduction.html).


### Configure applications to use Workload Identity

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

- Update an AKS cluster with OIDC Issuer.
```bash
az aks update -g ${RESOURCE_GROUP} -n ${AKS_CLUSTER} --enable-oidc-issuer
```

- Get the OIDC issuer URL.
```bash
export SERVICE_ACCOUNT_ISSUER="$(az aks show --resource-group ${RESOURCE_GROUP} --name ${AKS_CLUSTER} --query 'oidcIssuerProfile.issuerUrl' -otsv)"
```

- Get tenant ID.
```bash
export AZURE_TENANT_ID="$(az account show -s ${SUB_ID} --query tenantId -otsv)"
```

- Install the mutating admission webhook.
```bash
helm repo add azure-workload-identity https://azure.github.io/azure-workload-identity/charts
helm repo update
helm install workload-identity-webhook azure-workload-identity/workload-identity-webhook \
   --namespace azure-workload-identity-system \
   --create-namespace \
   --set azureTenantID="${AZURE_TENANT_ID}"
curl -L https://github.com/a8m/envsubst/releases/download/v1.2.0/envsubst-`uname -s`-`uname -m` -o envsubst
chmod +x envsubst
sudo mv envsubst /usr/local/bin
curl -sL https://github.com/Azure/azure-workload-identity/releases/download/v1.2.0/azure-wi-webhook.yaml | envsubst | kubectl apply -f -
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


### Deploy Milvus
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
