---
id: ingress.md
title: Configure ingress nginx with Milvus
related_key: ingress nginx
summary: Learn how to configure ingress nginx with Milvus.
---

# Configure ingress nginx with Milvus
This topic introduces how to configure ingress nginx with Milvus. 
For more details, refer to [ingress-nginx](https://learn.microsoft.com/en-us/azure/aks/ingress-tls?tabs=azure-cli).


## Configure ingress nginx

- Set env.
```bash
export DNS_LABEL="milvustest" # Your DNS label must be unique within its Azure location.
export NAMESPACE="ingress-basic"
```

- Install ingress nginx
```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx \
    --create-namespace \
    --namespace $NAMESPACE \
    --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-dns-label-name"=$DNS_LABEL \  
    --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz
```

- Get External IP address.
```bash
kubectl --namespace $NAMESPACE get services -o wide -w ingress-nginx-controller
```

- Configure an FQDN for your ingress controller.
```bash
# Public IP address of your ingress controller
IP="MY_EXTERNAL_IP"

# Get the resource-id of the public IP
PUBLICIPID=$(az network public-ip list --query "[?ipAddress!=null]|[?contains(ipAddress, '$IP')].[id]" --output tsv)

# Update public IP address with DNS name
az network public-ip update --ids $PUBLICIPID --dns-name $DNS_LABEL

# Display the FQDN
az network public-ip show --ids $PUBLICIPID --query "[dnsSettings.fqdn]" --output tsv
# sample output: milvustest.eastus2.cloudapp.azure.com
```


## Install cert-manager

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager \
    --namespace $NAMESPACE \
    --set installCRDs=true
```

## Create a CA cluster issuer

- Create a cluster issuer, such as cluster-issuer.yaml, using the following example manifest. Replace MY_EMAIL_ADDRESS with a valid address from your organization.
```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: MY_EMAIL_ADDRESS
    privateKeySecretRef:
      name: letsencrypt
    solvers:
    - http01:
        ingress:
          class: nginx
```

- Apply the issuer using the kubectl apply command.
```bash
kubectl apply -f cluster-issuer.yaml
```


## Deploy Milvus
refer to [Azure](https://milvus.io/docs/azure.md), notice the config `service.type` value, you need change to `ClusterIP`. 


## Create Milvus ingress route
```bash
kubectl apply -f ingress.yaml
``` 

the ingress.yaml contents:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-release-milvus
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
    nginx.ingress.kubernetes.io/backend-protocol: GRPC
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: 2048m
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - milvustest.eastus2.cloudapp.azure.com # the FQDN
    secretName: tls-secret
  rules:
    - host: milvustest.eastus2.cloudapp.azure.com
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

## Verify
```bash
kubectl get certificate 
NAME         READY   SECRET       AGE
tls-secret   True    tls-secret   8m7s
kubectl get ingress
NAME                CLASS   HOSTS                                   ADDRESS        PORTS     AGE
my-release-milvus   nginx   milvustest.eastus2.cloudapp.azure.com   EXTERNAL-IP   80, 443   8m15s
```

## Hello Milvus
Please refer to [Hello Milvus](https://milvus.io/docs/example_code.md), change uri args, then run the code.
```python
connections.connect("default",uri="https://milvustest.eastus2.cloudapp.azure.com:443") 
```
