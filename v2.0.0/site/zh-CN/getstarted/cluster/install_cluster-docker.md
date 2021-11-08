---
id: install_cluster-docker.md
label: Docker Compose
order: 0
group: cluster
---
# 安装 Milvus 分布式版

你可以使用 Docker Compose 或 Kubernetes 安装 Milvus 分布式版。安装前，请先阅读[安装前提](prerequisite-docker.md)。

你也可以[从源代码编译 Milvus](https://github.com/milvus-io/milvus#to-start-developing-milvus)。


<div class="tab-wrapper"><a href="install_cluster-docker.md" class='active '>Docker Compose</a><a href="install_cluster-helm.md" class=''>Helm</a><a href="install_cluster-milvusoperator.md" class=''>Milvus Operator</a></div>

## 安装 Milvus 分布式版

1. 下载 Docker Compose 配置文件 **docker-compose.yml**：

```
$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc8/milvus-cluster-docker-compose.yml  -O docker-compose.yml
```
> 你可以在 GitHub 直接 [下载](https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc8/milvus-cluster-docker-compose.yml) **docker-compose.yml**。

<div class="alert note">
如果你使用原始 <b>docker-compose.yml</b> 文件安装 Milvus, 数据将会被存储在 <b>./volume</b> 路径下。如需修改映射路径，你可以直接修改 <b>docker-compose.yml</b> 文件，或运行 <code>$ export DOCKER_VOLUME_DIRECTORY=</code>。
</div>

2. 启动 Milvus 分布式版：

```Shell
$ docker-compose up -d
```

```Text
Docker Compose is now in the Docker CLI, try `docker compose up`
Creating milvus-etcd   ... done
Creating milvus-minio  ... done
Creating milvus-pulsar ... done
Creating milvus-proxy      ... done
Creating milvus-rootcoord  ... done
Creating milvus-indexcoord ... done
Creating milvus-querycoord ... done
Creating milvus-datacoord  ... done
Creating milvus-querynode  ... done
Creating milvus-indexnode  ... done
Creating milvus-datanode   ... done
```

*如果 Milvus 分布式版启动正常，可以看到有 11 个 docker 容器在运行（3 个为基础服务，8 个为 Milvus 服务）*

```
$ sudo docker ps
      Name                     Command                  State                          Ports
----------------------------------------------------------------------------------------------------------------
milvus-datacoord    /tini -- milvus run datacoord    Up
milvus-datanode     /tini -- milvus run datanode     Up
milvus-etcd         etcd -listen-peer-urls=htt ...   Up (healthy)   2379/tcp, 2380/tcp
milvus-indexcoord   /tini -- milvus run indexcoord   Up
milvus-indexnode    /tini -- milvus run indexnode    Up
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-proxy        /tini -- milvus run proxy        Up             0.0.0.0:19530->19530/tcp,:::19530->19530/tcp
milvus-pulsar       bin/pulsar standalone            Up
milvus-querycoord   /tini -- milvus run querycoord   Up
milvus-querynode    /tini -- milvus run querynode    Up
milvus-rootcoord    /tini -- milvus run rootcoord    Up
```
<div class="alert note">
运行 <code>$ sudo docker-compose down</code> 停止 Milvus 分布式版。

如果你想在停止Milvus后清理数据，运行 <code>$ sudo rm -rf  volume</code>。
</div>

<div class="alert note">
阅读 <a href="upgrade.md">升级指南 2.0</a> 了解如何升级 Milvus 2.0 版本。
</div>
