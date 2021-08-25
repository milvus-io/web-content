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

```bash
helm repo add milvus https://milvus-io.github.io/milvus-helm/
helm repo update
```

2. Get Kubernetes manifest of Milvus:

<div class="multipleCode">
  <a href="?standalone">Standalone</a>
  <a href="?cluster">Cluster</a>
</div>
		<div class="multipleCode-standalone" markdown="block">
```bash
helm template my-release milvus/milvus > milvus_manifest.yaml
```
		</div>
		<div class="multipleCode-cluster" markdown="block">
```bash
helm template --set cluster.enabled=true my-release milvus/milvus > milvus_manifest.yaml
```
		</div>

3. Pull and save the Docker images:

```bash
pip3 install -r requirements.txt
python3 save_image.py --manifest milvus_manifest.yaml
```

<div class="alert note">
The Docker images will be stored under images directory.
</div>

4. Load the Docker images:

```bash
cd images/for image in $(find . -type f -name "*.tar.gz") ; do gunzip -c $image | docker load; done
```

## Install Milvus

To install Milvus offline, run:

```bash
kubectl apply -f milvus_manifest.yaml
```

## Uninstall Milvus

To Uninstall Milvus, run:

```bash
kubectl delete -f milvus_manifest.yaml
```

