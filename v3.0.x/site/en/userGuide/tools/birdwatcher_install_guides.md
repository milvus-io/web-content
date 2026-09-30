---
id: birdwatcher_install_guides.md
summary: Learn how to install Birdwatch to debug Milvus.
title: Install Birdwatcher
---

# Install Birdwatcher

This page demonstrates how to install Birdwatcher.

## Local install

If you have installed Milvus Standalone [using docker](install_standalone-docker.md), you'd better download and install the built binary, install Birdwatcher as a common Go module, or build Birdwatcher from the source.

- Install it as a common Go module.

    ```shell
    git clone https://github.com/milvus-io/birdwatcher.git
    cd birdwatcher
    go install github.com/milvus-io/birdwatcher
    ```

    Then you can run Birdwatcher as follows:

    ```shell
    go run main.go
    ```

- Build it from the source.

    ```shell
    git clone https://github.com/milvus-io/birdwatcher.git
    cd birdwatcher
    go build -o birdwatcher main.go
    ```

    Then you can run Birdwatcher as follows:

    ```shell
    ./birdwatcher
    ```

- Download the already-built binary

    First, open the [latest release page](https://github.com/milvus-io/birdwatcher/releases/latest), and find the prepared binaries.

    ```shell
    wget -O birdwatcher.tar.gz \
    https://github.com/milvus-io/birdwatcher/releases/download/latest/birdwatcher_<os>_<arch>.tar.gz
    ```

    Then you can decompress the tarball and use Birdwatcher as follows:

    ```shell
    tar -xvzf birdwatcher.tar.gz
    ./birdwatcher
    ```

## Install as a Kubernetes pod

If you have installed either Milvus Standalone [using the Helm charts](install_standalone-helm.md) or [the Milvus Operator](install_standalone-operator.md) or Milvus Cluster [using the Helm charts](install_cluster-helm.md) or [the Milvus Operator](install_cluster-milvusoperator.md), you are advised to install Birdwatcher as a Kubernetes pod.

### Prepare deployment.yml

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: birdwatcher
spec:
  selector:
    matchLabels:
      app: birdwatcher
  template:
    metadata:
      labels:
        app: birdwatcher
    spec:
      containers:
      - name: birdwatcher
        image: milvusdb/birdwatcher
        resources:
          limits:
            memory: "128Mi"
            cpu: "500m"
```

<div class="alert note">

If the image available on DockerHub is not the latest, you can build an image of Birdwatcher using the Dockerfile provided with the source code as follows:

```shell
git clone https://github.com/milvus-io/birdwatcher.git
cd birdwatcher
docker build -t milvusdb/birdwatcher .
```

To deploy a locally built image, you need to add `imagePullPolicy` to the above specs and set it to `Never`.

```yaml
...
      - name: birdwatcher
        image: milvusdb/birdwatcher
        imagePullPolicy: Never
...
```

</div>

### Apply deployment.yml

Save the above YAML in a file and name it `deployment.yml`, and run the following command

```shell
kubectl apply -f deployment.yml
```
