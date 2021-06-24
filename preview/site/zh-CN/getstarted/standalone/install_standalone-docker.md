---
id: install_standalone-docker.md
title: 安装单机版 Milvus
label: 使用 Docker 安装
order: 0
group: standalone
---

# 安装 Milvus 单机版
你可以使用 Docker Compose 或 Kubernetes 安装 Milvus 单机版。
<div class="tab-wrapper"><a href="install_standalone-helm.md" class=''>使用 Kubernetes 安装</a><a href="install_standalone-docker.md" class='active '>使用 Docker 安装</a></div>


## 开始之前

请先检查你的 Docker、Docker Compose 及硬件设备是否满足 Milvus 安装要求。

<details><summary>检查 Docker 及 Docker Compose 版本：</summary>

<div class="alert note">
建议使用 Docker Compose 安装 Milvus 单机版。
</div>

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



## 安装 Milvus 单机版


1. 拉取 Milvus 镜像：
```
$ sudo docker pull milvusdb/milvus:2.0.0-d043021-19c36b
```
2. 下载 **docker-compose.standalone.yml** 配置文件并保存为 **docker-compose.yml**：

```
$ mkdir -p /home/$USER/milvus
$ cd home/$USER/milvus
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v2.0.0/deployments/docker/docker-compose.standalone.yml -O docker-compose.yml
```
3. 下载 **.env** 文件并定义变量：
```
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v2.0.0/deployments/docker/.env
```
***.env** 文件包含了在 **docker-compose.yml** 中用到的所有变量定义，详见下表：*

| 变量      | 定义 |
| ----------- | ----------- |
| TARGET_DOCKER_IMAGE         | docker 镜像       |
| ETCD_ADDRESS   | 	etcd 服务地址        |
| MINIO_ADDRESS      | MinIO 服务地址       |
| MASTER_ADDRESS   | Milvus 中 Master 的服务地址       |
| PROXY_SERVICE_ADDRESS      | Milvus 中代理服务的地址    |
| INDEX_SERVICE_ADDRESS   | Milvus 中索引服务的地址      |
| DATA_SERVICE_ADDRESS      | Milvus 中数据服务的地址      |
| QUERY_SERVICE_ADDRESS   | Milvus 中查询服务的地址       |

<br/>

> 请确保将 `TARGET_DOCKER_IMAGE` 变量设置为相应的 Docker 镜像，比如 `TARGET_DOCKER_IMAGE=milvusdb/milvus:2.0.0-d043021-19c36b`。


4. 启动 Docker Compose：
```
$ sudo docker-compose up -d 
```

*如果 Docker Compose 启动正常，可以看到有 3 个 Docker 容器在运行（2 个为基础服务，1 个为 Milvus 服务）：*
```
$ sudo docker ps 
```

> 运行 `$ sudo docker-compose down` 停止 Docker Compose。
