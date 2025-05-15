---
id: install_offline-helm.md
label: Install on Kubernetes
order: 0
group: install_offline-helm.md
related_key: offline
summary: Learn how to install Milvus on Kubernetes offline.
---

<div class="tab-wrapper"><a href="install_offline-helm.md" class='active '>Install on Kubernetes</a><a href="install_offline-docker.md" class=''>Install with Docker Compose</a></div>

# Install Milvus Offline with Helm Charts

This topic describes how to install Milvus with Helm Charts in an offline environment. 

Installation of Milvus might fail due to image loading errors. You can install Milvus in an offline environment to avoid such problems.

## Download files and images

To install Milvus offline, you need to pull and save all images in an online environment first, and then transfer them to the target host and load them manually.

1. Add and update Milvus Helm repository locally.

```
helm repo add milvus https://milvus-io.github.io/milvus-helm/
helm repo update
```

2. Get a Kubernetes manifest.

- For Milvus standalone:

```
helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false milvus/milvus > milvus_manifest.yaml
```

- For Milvus cluster:

```cluster
helm template my-release milvus/milvus > milvus_manifest.yaml
```

If you want to change multiple configurations, you can download a [`value.yaml`](https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml) file, specify configurations in it, and generate a manifest based on it.

```bash
wget https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml
helm template -f values.yaml my-release milvus/milvus > milvus_manifest.yaml
```

3. Download requirement and script files.

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt
$ wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py
```

4. Pull and save images.

```
pip3 install -r requirements.txt
python3 save_image.py --manifest milvus_manifest.yaml
```

<div class="alert note">
The images are stored in the <code>/images</code> folder.
</div>

5. Load the images.

```
cd images/for image in $(find . -type f -name "*.tar.gz") ; do gunzip -c $image | docker load; done
```

## Install Milvus offline

Having transferred the images to the target host, run the following command to install Milvus offline.

```
kubectl apply -f milvus_manifest.yaml
```

## Uninstall Milvus

To uninstall Milvus, run the following command.

```
kubectl delete -f milvus_manifest.yaml
```

## What's next

Having installed Milvus, you can:

- Check [Hello Milvus](example_code.md) to run an example code with different SDKs to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Create a collection](create_collection.md)
  - [Create a partition](create_partition.md)
  - [Insert data](insert_data.md)
  - [Conduct a vector search](search.md)

- [Scale your Milvus cluster](scaleout.md).
- Explore [MilvusDM](migrate_overview.md), an open-source tool designed for importing and exporting data in Milvus.
- [Monitor Milvus with Prometheus](monitor.md).
