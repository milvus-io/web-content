---
id: install_offline-helm.md
label: 使用 Kubernetes 安装
order: 1
group: offline
---
# Install Milvus Offline

本篇文档将展示如何在离线环境中部署 Milvus。相关文件可在 [GitHub](https://github.com/milvus-io/milvus/tree/master/deployments/offline) 下载。

<div class="tab-wrapper"><a href="install_offline-docker.md" class=''>使用 Docker Compose 安装</a><a href="install_offline-helm.md" class='active '>使用 Kubernetes 安装</a></div>

## 下载 Docker 镜像

镜像加载错误可能会导致安装 Milvus 失败。离线安装 Milvus 需要拉取保存所有镜像并转移至目标主机手动加载。

1. 更新 Helm 库：

```
helm repo add milvus https://milvus-io.github.io/milvus-helm/
helm repo update
```

2. 获取 Milvus 的 Kubernetes manifest：

- 单机版 Milvus：

```
helm template my-release milvus/milvus > milvus_manifest.yaml
```

- 分布式版 Milvus：

```
helm template --set cluster.enabled=true my-release milvus/milvus > milvus_manifest.yaml
```

3. 拉取并保存 Docker 镜像：

```
pip3 install -r requirements.txt
python3 save_image.py --manifest milvus_manifest.yaml
```

<div class="alert note">
Docker 镜像文件将存储在 <b>images</b> 路径下。
</div>


4. 加载 Docker 镜像：

```
cd images/for image in $(find . -type f -name "*.tar.gz") ; do gunzip -c $image | docker load; done
```

## 安装 Milvus

离线安装 Milvus：

```
kubectl apply -f milvus_manifest.yaml
```

## 卸载 Milvus

卸载 Milvus：

```
kubectl delete -f milvus_manifest.yaml
```

