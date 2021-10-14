---
id: install_offline-helm.md
label: Install on Kubernetes
order: 1
group: offline
related_key: offline
summary: Learn how to install Milvus offline.
---
# Install Milvus Offline

This topic describes how to install Milvus in an offline environment. You can download relevant files at [GitHub](https://github.com/milvus-io/milvus/tree/master/deployments/offline).

<div class="tab-wrapper"><a href="install_offline-docker.md" class=''>Install with Docker Compose</a><a href="install_offline-helm.md" class='active '>Install on Kubernetes</a></div>

## 1. Download images

Installation of Milvus might fail due to image loading errors. To install Milvus offline, pull and save all images, transfer them to the target host, and load them manually.

#### Add a chart repository:

```
helm repo add milvus https://milvus-io.github.io/milvus-helm/
helm repo update
```

#### Get a K8s manifest:

- For Milvus standalone

```
helm template my-release milvus/milvus > milvus_manifest.yaml
```

- For Milvus cluster

```cluster
helm template --set cluster.enabled=true my-release milvus/milvus > milvus_manifest.yaml
```

#### Pull and save images:

```
pip3 install -r requirements.txt
python3 save_image.py --manifest milvus_manifest.yaml
```

<div class="alert note">
The images are stored in the <b>images</b> folder.
</div>

#### Load the images:

```
cd images/for image in $(find . -type f -name "*.tar.gz") ; do gunzip -c $image | docker load; done
```

## 2. Install Milvus

To install Milvus offline, run the following command.

```
kubectl apply -f milvus_manifest.yaml
```

## 3. Uninstall Milvus

To Uninstall Milvus, run the following command.

```
kubectl delete -f milvus_manifest.yaml
```

