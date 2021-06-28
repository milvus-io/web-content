---
id: install_cluster-docker.md
title: 安装 Milvus 分布式版
label: 使用 Docker Compose 安装
order: 0
group: cluster
---
# 安装 Milvus 分布式版
你可以使用 Docker Compose 或 Kubernetes 安装 Milvus 分布式版。

你也可以[从源代码编译 Milvus](https://github.com/milvus-io/milvus/blob/master/INSTALL.md)。

<div class="alert note">
Docker Compose 部署方式只用作测试使用，不能用于生产环境。
</div>

<div class="tab-wrapper"><a href="install_cluster-docker.md" class='active '>使用 Docker Compose 安装</a><a href="install_cluster-helm.md" class=''>使用 Helm 安装</a></div>

## 开始之前

请先检查你的 Docker、Docker Compose 及硬件设备是否满足 Milvus 安装要求。

<details><summary>检查 Docker 及 Docker Compose 版本：</summary>

- 运行 `$ sudo docker info` 确认 Docker 版本。建议使用 19.03 或以上版本。

> 安装 Docker 步骤见 [Docker CE/EE 官方安装说明](https://docs.docker.com/get-docker/)。

- 运行 `$ sudo docker-compose version` 确认 Docker Compose 版本。建议使用 1.25.1 或以上版本。 

> 安装 Docker Compose 步骤见 [Docker Compose 官方安装说明](https://docs.docker.com/compose/install/)。
</details>

<details><summary>检查 CPU 是否支持 SIMD 扩展指令集合：</summary>

Milvus 在构建索引和查询向量时依赖 CPU 对 SIMD (Single Instruction Multiple Data) 扩展指令集合的支持。请确保运行 Milvus 的 CPU 至少支持以下一种 SIMD 指令集合：

- SSE4.2
- AVX
- AVX2
- AVX512

使用 lscpu 命令以检查 CPU 是否支持特定 SIMD 指令集合：
```
$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
```

</details>


## 安装 Milvus 分布式版

1. 下载 Docker Compose 配置文件 **docker-compose.yml**：

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/docker/cluster/docker-compose.yml -O docker-compose.yml
```


2. 启动 Milvus 分布式版：

```
$ sudo docker-compose up -d
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
</div>