---
id: tls.md
title: Encryption in Transit
summary: Learn how to enable TLS proxy in Milvus.
---

# Encryption in Transit

TLS (Transport Layer Security) is an encryption protocol to ensure communication security. Milvus proxy uses TLS one-way and two-way authentication.

This topic describes how to enable TLS in Milvus proxy for both gRPC and RESTful traffics.

<div class="alert note">

TLS and user authentication are two distinct security approaches. If you have enabled both user authentication and TLS in your Milvus system, you will need to provide a username, password, and certificate file paths. For information on how to enable user authentication, refer to [Authenticate User Access](authenticate.md).

</div>

## Create your own certificate

### Prerequisites

Make sure OpenSSL is installed. If you have not installed it, [build and install](https://github.com/openssl/openssl/blob/master/INSTALL.md) OpenSSL first.

```shell
openssl version
```

If OpenSSL is not installed. It can be installed with the following command in Ubuntu.

```shell
sudo apt install openssl
```

### Create files

1. Create the `gen.sh` file.

```
mkdir cert && cd cert
touch gen.sh
```

2. Copy the following script into the `gen.sh`. 

It is necessary to configure the `CommonName` in the `gen.sh` file. The `CommonName` refers to the server name that the client should specify while connecting.

<details><summary><code>gen.sh</code></summary>

```shell
#!/usr/bin/env sh
# your variables
Country="US"
State="CA"
Location="Redwood City"
Organization="zilliz"
OrganizationUnit="devops"
CommonName="localhost"
ExpireDays=3650 # 10 years

# generate private key for ca, server and client
openssl genpkey -quiet -algorithm rsa:2048 -out ca.key
openssl genpkey -quiet -algorithm rsa:2048 -out server.key
openssl genpkey -quiet -algorithm rsa:2048 -out client.key

# create a new ca certificate
openssl req -x509 -new -nodes -key ca.key -sha256 -days 36500 -out ca.pem \
  -subj "/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName"

# prepare extension config for signing certificates
echo '[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS = '$CommonName > openssl.cnf

# sign server certificate with ca
openssl req -new -key server.key\
  -subj "/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName"\
  | openssl x509 -req -days $ExpireDays -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req

# sign client certificate with ca
openssl req -new -key client.key\
  -subj "/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName"\
  | openssl x509 -req -days $ExpireDays -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req

```
</details>

The variables in the `gen.sh` file are crucial to the process of creating a certificate signing request file. The first five variables are the basic signing information, including country, state, location, organization, organization unit. Caution is needed when configuring `CommonName` as it will be verified during client-server communication.

### Run `gen.sh` to generate certificate

Run the `gen.sh` file to create certificate.

```
chmod +x gen.sh
./gen.sh
```

The following seven files will be created: `ca.key`, `ca.pem`, `ca.srl`, `server.key`, `server.pem`, `client.key`, `client.pem`.

Be sure to keep the `ca.key`, `ca.pem`, `ca.srl` secure in order to renew your certificates later. The `server.key` and `server.pem` files are used by the server, and the `client.key` and `client.pem` files are used by the client.

### Renew certificates (optional)

If you want to renew the certificates in some cases, for example if they will soon expire. you can use the following script.

You need `ca.key`, `ca.pem`, `ca.srl` in your working directory.

<details><summary><code>renew.sh</code></summary>

```shell
#!/usr/bin/env sh
# your variables
Country="US"
State="CA"
Location="Redwood City"
Organization="zilliz"
OrganizationUnit="devops"
CommonName="localhost"
ExpireDays=3650 # 10 years

# generate private key for ca, server and client
openssl genpkey -quiet -algorithm rsa:2048 -out server.key
openssl genpkey -quiet -algorithm rsa:2048 -out client.key

# prepare extension config for signing certificates
echo '[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS = '$CommonName > openssl.cnf

# sign server certificate with ca
openssl req -new -key server.key\
  -subj "/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName"\
  | openssl x509 -req -days $ExpireDays -out server.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req

# sign client certificate with ca
openssl req -new -key client.key\
  -subj "/C=$Country/ST=$State/L=$Location/O=$Organization/OU=$OrganizationUnit/CN=$CommonName"\
  | openssl x509 -req -days $ExpireDays -out client.pem -CA ca.pem -CAkey ca.key -CAcreateserial \
    -extfile ./openssl.cnf -extensions v3_req
```
</details>

Run the `renew.sh` file to create certificate.

```
chmod +x renew.sh
./renew.sh
```


## Set up a Milvus server with TLS

This section outlines the steps to configure a Milvus server with TLS encryption.

### Setup for Docker Compose

#### 1. Modify the Milvus server configuration

To enable external TLS, add the following configurations in the `milvus.yaml` file:
```yaml
proxy:
  http:
    # for now milvus do not support config restful on same port with grpc
    # so we set to 8080, grpc will still use 19530
    port: 8080 
tls:
  serverPemPath: /milvus/tls/server.pem
  serverKeyPath: /milvus/tls/server.key
  caPemPath: /milvus/tls/ca.pem

common:
  security:
    tlsMode: 1
```

Parameters:

- `serverPemPath`: The path to the server certificate file.
- `serverKeyPath`: The path to the server key file.
- `caPemPath`: The path to the CA certificate file.
- `tlsMode`: The TLS mode for external service. Valid values:
  - `1`: One-way authentication, where only the server requires a certificate and the client verifies it. This mode requires `server.pem` and `server.key` from the server side, and `server.pem` from the client side.
  - `2`: Two-way authentication, where both the server and the client require certificates to establish a secure connection. This mode requires `server.pem`, `server.key`, and `ca.pem` from the server side, and `client.pem`, `client.key`, and `ca.pem` from the client side.


To enable internal TLS, add the following configurations in the `milvus.yaml` file:
```yaml
internaltls:
  serverPemPath: /milvus/tls/server.pem
  serverKeyPath: /milvus/tls/server.key
  caPemPath: /milvus/tls/ca.pem

common:
  security:
    internaltlsEnabled: true 
```

Parameters:

- `serverPemPath`: The path to the server certificate file.
- `serverKeyPath`: The path to the server key file.
- `caPemPath`: The path to the CA certificate file.
- `internaltlsEnabled`: Whether to enable internal TLS. For now only one-way tls is supported.

#### 2. Map certificate files to the container

##### Prepare certificate files

Create a new folder named `tls` in the same directory as your `docker-compose.yaml`. Copy the `server.pem`, `server.key`, and `ca.pem` into the `tls` folder. Place them in a directory structure as follows:

```
├── docker-compose.yml
├── milvus.yaml
└── tls
     ├── server.pem
     ├── server.key
     └── ca.pem
```

#### Update Docker Compose configuration

Edit the `docker-compose.yaml` file to map the certificate file paths inside the container as shown below:

```yaml
  standalone:
    container_name: milvus-standalone
    image: milvusdb/milvus:latest
    command: ["milvus", "run", "standalone"]
    security_opt:
    - seccomp:unconfined
    environment:
      ETCD_ENDPOINTS: etcd:2379
      MINIO_ADDRESS: minio:9000
    volumes:
      - ${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus
      - ${DOCKER_VOLUME_DIRECTORY:-.}/tls:/milvus/tls
      - ${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml
```

##### Deploy Milvus using Docker Compose

Execute the following command to deploy Milvus:

```bash
sudo docker compose up -d
```

### Setup for Milvus Operator
Put the certificate files in your working directory. The directory structure should look like this:
```
├── milvus.yaml (to be created later)
├── server.pem
├── server.key
└── ca.pem
```

Create a secret with the certificate files:
```bash
kubectl create secret generic certs --from-file=server.pem --from-file=server.key --from-file=ca.pem
```

To enable external TLS, add the following configurations in the `milvus.yaml` file:
```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  config:
    proxy:
      http:
        # for now not support config restful on same port with grpc
        # so we set to 8080, grpc will still use 19530
        port: 8080 
    common:
      security:
        tlsMode: 1 # tlsMode for external service 1 for one-way TLS, 2 for Mutual TLS, 0 for disable
    tls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
  components:
    # mount the certs secret to the milvus container
    volumes:
      - name: certs
        secret:
          secretName: certs
    volumeMounts:
      - name: certs
        mountPath: /certs
        readOnly: true
```

To enable internal TLS, add the following configurations in the `milvus.yaml` file:

Remember to replace the `internaltls.sni` field with the CommonName in your certificates.
```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  config:
    proxy:
      http:
        # for now not support config restful on same port with grpc
        # so we set to 8080, grpc will still use 19530
        port: 8080 
    common:
      security:
        internaltlsEnabled: true # whether to enable internal tls
    # Configure tls certificates path for internal service
    internaltls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
      sni: localhost # the CommonName in your certificates
  components:
    # mount the certs secret to the milvus container
    volumes:
      - name: certs
        secret:
          secretName: certs
    volumeMounts:
      - name: certs
        mountPath: /certs
        readOnly: true
```

create the Milvus CR:
```bash
kubectl create -f milvus.yaml
```


### setup for Milvus Helm
Put the certificate files in your working directory. The directory structure should look like this:
```
├── values.yaml (to be created later)
├── server.pem
├── server.key
└── ca.pem
```
Create a secret with the certificate files:
```bash
kubectl create secret generic certs --from-file=server.pem --from-file=server.key --from-file=ca.pem
```

To enable external TLS, add the following configurations in the `values.yaml` file:

```yaml
extraConfigFiles:
  user.yaml: |+
    proxy:
      http:
        # for now not support config restful on same port with grpc
        # so we set to 8080, grpc will still use 19530
        port: 8080 
    common:
      security:
        tlsMode: 1 # tlsMode for external service 1 means set to 2 to enable Mutual TLS
    # Configure tls certificates path for external service
    tls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
# mount the certs secret to the milvus container
volumes:
  - name: certs
    secret:
      secretName: certs
volumeMounts:
  - name: certs
    mountPath: /certs
    readOnly: true
```

To enable internal TLS, add the following configurations in the `values.yaml` file:

Remember to replace the `internaltls.sni` field with the CommonName in your certificates.
```yaml
extraConfigFiles:
  user.yaml: |+
    common:
      security:
        internaltlsEnabled: true # whether to enable internal tls
    # Configure tls certificates path for internal service
    internaltls:
      serverPemPath: /certs/server.pem
      serverKeyPath: /certs/server.key
      caPemPath: /certs/ca.pem
      sni: localhost
# mount the certs secret to the milvus container
volumes:
  - name: certs
    secret:
      secretName: certs
volumeMounts:
  - name: certs
    mountPath: /certs
    readOnly: true
```

Create the milvus release:
```bash
helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update milvus
helm install my-release milvus/milvus -f values.yaml
```

## Verify Internal TLS enabled
It's difficult to verify internal TLS directly. You can check the Milvus log to see if internal TLS is enabled.

In the Milvus log, you should see the following message if internal TLS is enabled:
```
[...date time...] [INFO] [utils/util.go:56] ["Internal TLS Enabled"] [value=true]
```

## Connect to the Milvus server with TLS

For SDK interactions, use the following setups depending on the TLS mode.

### One-way TLS connection

Provide the path to `server.pem` and ensure the `server_name` matches the `CommonName` configured in the certificate.
  
```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="https://localhost:19530",
    secure=True,
    server_pem_path="path_to/server.pem",
    server_name="localhost"
)
```

### Two-way TLS connection

Provide paths to `client.pem`, `client.key`, and `ca.pem`, and ensure the `server_name` matches the `CommonName` configured in the certificate.

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="https://localhost:19530",
    secure=True,
    client_pem_path="path_to/client.pem",
    client_key_path="path_to/client.key",
    ca_pem_path="path_to/ca.pem",
    server_name="localhost"
)
```

See [example_tls1.py](https://github.com/milvus-io/pymilvus/blob/master/examples/cert/example_tls1.py) and [example_tls2.py](https://github.com/milvus-io/pymilvus/blob/master/examples/cert/example_tls2.py) for more information.

## Connect to the Milvus RESTful server with TLS

For RESTful APIs, you can check tls by using the `curl` command.

### One-way TLS connection

```bash
curl --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
```

### Two-way TLS connection

```bash
curl --cert path_to/client.pem --key path_to/client.key --cacert path_to/ca.pem https://localhost:8080/v2/vectordb/collections/list
```
