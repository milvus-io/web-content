---
id: install_offline-helm.md
label: Install on Kubernetes
order: 1
group: offline
---
# Install Milvus Offline

This page will show you how to install Milvus in offline environment.

<div class="tab-wrapper"><a href="install_offline-docker.md" class=''>Install with Docker Compose</a><a href="install_offline-helm.md" class='active '>Install on Kubernetes</a></div>

## Download Docker Images

Installation of Milvus may fail when images are not properly loaded from public Docker registries. To install Milvus offline, you need to pull all images and save them into a directory that can be moved to the target host and loaded manually.

1. Update Helm Repository:

```
helm repo add milvus https://milvus-io.github.io/milvus-helm/
helm repo update
```

2. Get Kubernetes manifest of Milvus:

- For Milvus Standalone

```
helm template my-release milvus/milvus > milvus_manifest.yaml
```

- For Milvus Cluster

```cluster
helm template --set cluster.enabled=true my-release milvus/milvus > milvus_manifest.yaml
```

3. Pull and save the Docker images:

```
pip3 install -r requirements.txt
python3 save_image.py --manifest milvus_manifest.yaml
```

<div class="alert note">
The Docker images will be stored under <b>images</b> directory.
</div>

4. Load the Docker images:

```
cd images/for image in $(find . -type f -name "*.tar.gz") ; do gunzip -c $image | docker load; done
```

## Install Milvus

To install Milvus offline, run:

```
kubectl apply -f milvus_manifest.yaml
```

## Uninstall Milvus

To Uninstall Milvus, run:

```
kubectl delete -f milvus_manifest.yaml
```

