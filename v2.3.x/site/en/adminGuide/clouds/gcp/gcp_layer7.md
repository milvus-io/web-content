---
id: gcp_layer7.md
title: Set up a Layer-7 Load Balancer for Milvus on GCP
related_key: cluster
summary: Learn how to deploy a Milvus cluster behind a Layer-7 load balancer on GCP.
---

# Set up a Layer-7 Load Balancer for Milvus on GCP

When compared to a Layer-4 load balancer, a Layer-7 load balancer offers smart load balancing and caching capabilities and is a great choice for cloud-native services. 

This guide walks you through setting up a layer-7 load balancer for a Milvus cluster already running behind a Layer-4 load balancer.

### Before your start

- A project already exists in your GCP account. 

  To create a project, refer to [Creating and managing projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects). The name of the project used in this guide is **milvus-testing-nonprod**. 

- You have locally installed [gcloud CLI](https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version), [kubectl](https://kubernetes.io/docs/tasks/tools/), and [Helm](https://helm.sh/docs/intro/install/), or decided to use the browser-based [Cloud Shell](https://cloud.google.com/shell) instead.

- You have [initialized the gcloud CLI](https://cloud.google.com/sdk/docs/install-sdk#initializing_the) with your GCP account credentials.

- You have [deployed a Milvus cluster behind a Layer-4 load balancer on GCP](gcp.md).

### Tweak Milvus configurations

This guide assumes that you have already [deployed a Milvus cluster behind a Layer-4 load balancer on GCP](gcp.md). 

Before setting up a Layer-7 load balancer for this Milvus cluster, run the following command to remove the Layer-4 load balancer.

```bash
helm upgrade my-release milvus/milvus --set service.type=ClusterIP
```

As a backend service of the Layer-7 load balancer, Milvus has to meet [certain encryption requirements](https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2) so that it can understand the HTTP/2 requests from the load balancer. Therefore, you need to enable TLS on your Milvus cluster as follows.

```bash
helm upgrade my-release milvus/milvus --set common.security.tlsMode=1
```

### Set up a health check endpoint

To ensure service availability, Layer-7 load balancing on GCP requires probing the health conditions of the backend service. Therefore, we need to set up a BackendConfig to wrap up the health check endpoint and associate the BackendConfig with the Milvus service through annotations.

The following snippet is the BackendConfig settings. Save it as `backendconfig.yaml` for later use.

```yaml
apiVersion: cloud.google.com/v1
kind: BackendConfig
metadata:
  name: my-release-backendconfig
  namespace: default
spec:
  healthCheck:
    port: 9091
    requestPath: /healthz
    type: HTTP
```

Then run the following command to create the health check endpoint.

```bash
kubectl apply -f backendconfig.yaml
```

Finally, update the annotations of the Milvus service to ask the Layer-7 load balancer that we will create later to perform health checks using the endpoint just created.

```bash
kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols='{"milvus":"HTTP2"}' \
    cloud.google.com/backend-config='{"default": "my-release-backendconfig"}' \
    cloud.google.com/neg='{"ingress": true}'
```

<div class="alert note">

- As to the first annotation, 
  
  Milvus is native to gRPC, which is built upon HTTP/2. Therefore, we can use HTTP/2 as the communication protocol between the Layer-7 load balancer and Milvus. 

- As to the second annotation,

  Milvus only offers the health check endpoint over gRPC and HTTP/1. We need to set up a BackendConfig to wrap the health check endpoint and associate it with the Milvus service so that the Layer-7 load balancer probes this endpoint for the health condition of Milvus.

- As to the third annotation,

  It asks for the creation of a network endpoint group (NEG) after an Ingress is created. When NEGs are used with GKE Ingress, the Ingress controller facilitates the creation of all aspects of the load balancer. This includes creating the virtual IP address, forwarding rules, health checks, firewall rules, and more. For details, refer to [Google Cloud docs](https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing).

</div>

### Prepare TLS certificates

TLS requires certificates to work. There are two ways to create certificates, namely self-managed and Google-managed.

This guide uses **my-release.milvus.io** as the domain name to access our Milvus service. 

#### Create self-managed certificates

Run the following commands to create a certificate.

```bash
# Generates a tls.key.
openssl genrsa -out tls.key 2048

# Creates a certificate and signs it with the preceding key.
openssl req -new -key tls.key -out tls.csr \
    -subj "/CN=my-release.milvus.io"

openssl x509 -req -days 99999 -in tls.csr -signkey tls.key \
    -out tls.crt
```

Then create a secret in your GKE cluster with these files for later use.

```bash
kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
```

#### Create Google-managed certificates

The following snippet is a ManagedCertificate setting. Save it as `managed-crt.yaml` for later use.

```yaml
apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
```

Create a managed certificate by applying the setting to your GKE cluster as follows:

```bash
kubectl apply -f ./managed-crt.yaml
```

This could last for a while. You can check the progress by running

```bash
kubectl get -f ./managed-crt.yaml -o yaml -w
```

The output should be similar to the following:

```shell
status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
```

Once **certificateStatus** turns to **Active**, you are ready to set up the load balancer.

### Create an Ingress to generate a Layer-7 Load Balancer

Create a YAML file with one of the following snippets.

- Using self-managed certificates

  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
  name: my-release-milvus
  namespace: default
  spec:
  tls:
  - hosts:
      - my-release.milvus.io
      secretName: my-release-milvus-tls
  rules:
  - host: my-release.milvus.io
      http:
      paths:
      - path: /
          pathType: Prefix
          backend:
          service:
              name: my-release-milvus
              port:
              number: 19530
  ```
- Using Google-managed certificates

  ```yaml
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
  name: my-release-milvus
  namespace: default
  annotations:
      networking.gke.io/managed-certificates: "my-release-milvus-tls"
  spec:
  rules:
  - host: my-release.milvus.io
      http:
      paths:
      - path: /
          pathType: Prefix
          backend:
          service:
              name: my-release-milvus
              port:
              number: 19530
  ```

Then you can create the Ingress by applying the file to your GKE cluster.

```bash
kubectl apply -f ingress.yaml
```

Now, wait for Google to set up the Layer-7 load balancer. You can check the progress by running

```bash
kubectl  -f ./config/samples/ingress.yaml get -w
```

The output should be similar to the following:

```shell
NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   <none>   my-release.milvus.io             80      4s
my-release-milvus   <none>   my-release.milvus.io   34.111.144.65   80, 443   41m
```

Once an IP address is displayed in the **ADDRESS** field, the Layer-7 load balancer is ready to use. Both port 80 and port 443 are displayed in the above output. Remember, you should always use port 443 for your own good.

## Verify the connection through the Layer-7 load balancer

This guide uses PyMilvus to verify the connection to the Milvus service behind the Layer-7 load balancer we have just created. For detailed steps, [read this](example_code).

Notice that connection parameters vary with the way you choose to manage the certificates in [Prepare TLS certificates](#prepare-tls-certificates).

```python
from pymilvus import (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

# For self-managed certificates, you need to include the certificate in the parameters used to set up the connection.
connections.connect("default", host="34.111.144.65", port="443", server_pem_path="tls.crt", secure=True, server_name="my-release.milvus.io")

# For Google-managed certificates, there is not need to do so.
connections.connect("default", host="34.111.144.65", port="443", secure=True, server_name="my-release.milvus.io")
```

<div class="alert note">

- The IP address and port number in **host** and **port** should match those listed at the end of [Create an Ingress to generate a Layer-7 Load Balancer](#create-an-ingress-to-generate-a-layer-7-load-balancer).
- If you have set up a DNS record to map domain name to the host IP address, replace the IP address in **host** with the domain name and omit **server_name**.

</div>
