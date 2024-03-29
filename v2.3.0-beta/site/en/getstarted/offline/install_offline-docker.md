---
id: install_offline-docker.md
label: Docker Compose
order: 1
group: install_offline-helm.md
related_key: offline
summary: Learn how to install Milvus with Docker Compose offline.
---

<div class="tab-wrapper"><a href="install_offline-helm.md" class=''>Kubernetes</a><a href="install_offline-docker.md" class='active '>Docker Compose</a></div>

# Install Milvus Offline with Docker Compose

This topic describes how to install Milvus with Docker Compose in an offline environment. 

Installation of Milvus might fail due to image loading errors. You can install Milvus in an offline environment to avoid such problem.

## Download files and images

To install Milvus offline, you need to pull and save all images in an online environment first, and then transfer them to the target host and load them manually.

1. Download an installation file.

- For Milvus standalone:

```
# Without GPU support

$ wget https://github.com/milvus-io/milvus/releases/download/v2.3.0-beta/milvus-standalone-docker-compose.yml -O docker-compose.yml

# With GPU support

$ wget https://github.com/milvus-io/milvus/releases/download/v2.3.0-beta/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml
```

- For Milvus cluster:

```
# Without GPU support

$ wget https://github.com/milvus-io/milvus/releases/download/v2.3.0-beta/milvus-cluster-docker-compose.yml -O docker-compose.yml

# With GPU support

$ wget https://github.com/milvus-io/milvus/releases/download/v2.3.0-beta/milvus-cluster-docker-compose-gpu.yml -O docker-compose.yml
```

<div class="alert note">

To use Milvus with GPU support, ensure that

- Docker Compose version is v1.28.0 or later.
- NVIDIA Tesla driver version is 450.80.02 or later.
- NVIDIA GTX driver version is 510.47.03 or later. 
- NVIDIA Container Toolkit has been installed. For details, refer to [Setting up NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#id2).
- NVIDIA CUDA version is 11.6 or later.

</div>

2. Download requirement and script files.

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt
$ wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py
```

3. Pull and save images.

```bash
pip3 install -r requirements.txt
python3 save_image.py --manifest docker-compose.yml
```

<div class="alert note">
  The images are stored in the <code>/images</code> folder.
  </div>


4. Load the images.

```bash
cd images/; for image in $(find . -type f -name "*.tar.gz") ; do gunzip -c $image | docker load; done
```

## Install Milvus offline

Having transferred the images to the target host, run the following command to install Milvus offline.

```bash
docker-compose -f docker-compose.yml up -d
```

## Uninstall Milvus

To uninstall Milvus, run the following command.

```bash
docker-compose -f docker-compose.yml down
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
