---
id: install_offline-docker.md
label: Install with Docker Compose
order: 0
group: offline
---
# Install Milvus Offline

This page will show you how to install Milvus in offline environment.

<div class="tab-wrapper"><a href="install_offline-docker.md" class='active '>Install with Docker Compose</a><a href="install_offline-helm.md" class=''>Install on Kubernetes</a></div>

## Download Docker Images

Installation of Milvus may fail when images are not properly loaded from public Docker registries. To install Milvus offline, you need to pull all images and save them into a directory that can be moved to the target host and loaded manually.

1. Download Milvus **docker-compose.yml**:

- For Milvus Standalone

```
wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/docker/standalone/docker-compose.yml -O docker-compose.yml
```

- For Milvus Cluster

```
wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/docker/cluster/docker-compose.yml -O docker-compose.yml
```


2. Pull and save the Docker images:

```
pip3 install -r requirements.txt
python3 save_image.py --manifest docker-compose.yml
```

<div class="alert note">
The Docker images will be stored under <b>images</b> directory.
</div>

3. Load the Docker images:

```
cd images/for image in $(find . -type f -name "*.tar.gz") ; do gunzip -c $image | docker load; done
```

## Install Milvus

To install Milvus offline, run:

```
docker-compose -f docker-compose.yml up -d
```

## Uninstall Milvus

To Uninstall Milvus, run:

```
docker-compose -f docker-compose.yml down
```



