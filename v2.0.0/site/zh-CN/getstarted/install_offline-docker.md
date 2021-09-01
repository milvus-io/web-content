---
id: install_offline-docker.md
label: 使用 Docker Compose 安装
order: 0
group: offline
---
# 离线安装 Milvus

本篇文档将展示如何在离线环境中部署 Milvus。相关文件可在 [GitHub](https://github.com/milvus-io/milvus/tree/master/deployments/offline) 下载。

<div class="tab-wrapper"><a href="install_offline-docker.md" class='active '>使用 Docker Compose 安装</a><a href="install_offline-helm.md" class=''>使用 Kubernetes 安装</a></div>

## 下载 Docker 镜像

镜像加载错误可能会导致安装 Milvus 失败。离线安装 Milvus 需要拉取保存所有镜像并转移至目标主机手动加载。

1. 下载 Milvus 配置文件 **docker-compose.yml**：

- 单机版 Milvus

```
wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/docker/standalone/docker-compose.yml -O docker-compose.yml
```

- 分布式版 Milvus

```
wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/docker/cluster/docker-compose.yml -O docker-compose.yml
```

2. 拉取并保存 Docker 镜像：

```
pip3 install -r requirements.txt
python3 save_image.py --manifest docker-compose.yml
```

<div class="alert note">
  Docker 镜像文件将存储在 <b>images</b> 路径下。
</div>


3. 加载 Docker 镜像

```
cd images/for image in $(find . -type f -name "*.tar.gz") ; do gunzip -c $image | docker load; done
```

## 安装 Milvus

离线安装 Milvus：

```
docker-compose -f docker-compose.yml up -d
```

## 卸载 Milvus

卸载 Milvus：

```
docker-compose -f docker-compose.yml down
```

