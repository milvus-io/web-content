---
id: install_offline-docker.md
label: Install with Docker Compose
order: 0
group: offline
related_key: offline
summary: Learn how to install Milvus offline.
---
# Install Milvus Offline

This topic describes how to install Milvus in an offline environment. You can download relevant files at [GitHub](https://github.com/milvus-io/milvus/tree/master/deployments/offline).

<div class="tab-wrapper"><a href="install_offline-docker.md" class='active '>Install with Docker Compose</a><a href="install_offline-helm.md" class=''>Install on Kubernetes</a></div>

## 1. Download images

Installation of Milvus might fail due to image loading errors. To install Milvus offline, pull and save all images, transfer them to the target host, and load them manually.

Download an installation file:

- For Milvus standalone

```
wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/docker/standalone/docker-compose.yml -O docker-compose.yml
```

- For Milvus cluster

```
wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/docker/cluster/docker-compose.yml -O docker-compose.yml
```


Pull and save images:

```
pip3 install -r requirements.txt
python3 save_image.py --manifest docker-compose.yml
```

<div class="alert note">

The images are stored in the <b>images</b> folder.

</div>

Load the images:

```
cd images/for image in $(find . -type f -name "*.tar.gz") ; do gunzip -c $image | docker load; done
```

## 2. Install Milvus

To install Milvus offline, run the following command.

```
docker-compose -f docker-compose.yml up -d
```

## 3. Uninstall Milvus

To Uninstall Milvus, run the following command.
```
docker-compose -f docker-compose.yml down
```



