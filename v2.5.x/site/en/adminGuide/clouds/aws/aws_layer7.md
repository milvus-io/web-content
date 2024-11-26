---
id: aws_layer7.md
title: Set up a Layer-7 Load Balancer for Milvus on AWS
related_key: cluster
summary: Learn how to deploy a Milvus cluster behind a Layer-7 load balancer on AWS.
---

# Set up a Layer-7 Load Balancer for Milvus on AWS

When compared to a Layer-4 load balancer, a Layer-7 load balancer offers smart load balancing and caching capabilities and is a great choice for cloud-native services. 

This guide walks you through setting up a layer-7 load balancer for a Milvus cluster already running behind a Layer-4 load balancer.

### Before your start

- You have [deployed a Milvus cluster behind a Layer-4 load balancer on AWS](eks.md).

### Tweak Milvus configurations

This guide assumes that you have already [deployed a Milvus cluster behind a Layer-4 load balancer on AWS](eks.md). 

Before setting up a Layer-7 load balancer for this Milvus cluster, run the following command to remove the Layer-4 load balancer.

```bash
helm upgrade milvus-demo milvus/milvus -n milvus --set service.type=ClusterIP
```

### Prepare TLS certificates

TLS requires certificates to work. We're using [ACM](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html) to manage certificates and need to import an existing certificate into ACM. Refer to [Import Certificate](https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api). The following is an example.

```bash
# If the import-certificate command is successful, it returns the arn of the imported certificate.
aws acm import-certificate --certificate fileb://Certificate.pem \
      --certificate-chain fileb://CertificateChain.pem \
      --private-key fileb://PrivateKey.pem 	
```

### Create an Ingress to generate a Layer-7 Load Balancer
Prepare the ingress file as follows and name it `ingress.yaml`. **Do replace the certificate arn and host with your own.**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: milvus
  name: milvus-demo
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/backend-protocol-version: GRPC
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}]'
    alb.ingress.kubernetes.io/certificate-arn: "arn:aws:acm:region:account-id:certificate/certificate-id"

spec:
  ingressClassName: alb
  rules:
    - host: milvus-demo.milvus.io
      http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: milvus-demo
              port:
                number: 19530
```
Then you can create the Ingress by applying the file to your EKS cluster.

```bash
kubectl apply -f ingress.yaml
```

Now, wait for AWS to set up the Layer-7 load balancer. You can check the progress by running

```bash
kubectl -f ingress.yaml get -w
```

The output should be similar to the following:

```shell
NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
```

Once an address is displayed in the **ADDRESS** field, the Layer-7 load balancer is ready to use.

## Verify the connection through the Layer-7 load balancer

This guide uses PyMilvus to verify the connection to the Milvus service behind the Layer-7 load balancer we have just created. For detailed steps, [read this](https://milvus.io/docs/v2.3.x/example_code.md).

```python
from pymilvus import (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

connections.connect("default", host="k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com", port="443", secure=True, server_name="milvus-demo.milvus.io")
```

<div class="alert note">

- The **host** and **server_name** should replace with your own.
- If you have set up a DNS record to map domain name to the alb, replace the **host** with the domain name and omit **server_name**.

</div>
