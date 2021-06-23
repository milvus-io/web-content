---
id: operational_faq.md
---

# 部署运维问题

<!-- TOC -->

- [如果在安装 Milvus 时，从 Docker Hub 拉取镜像总是失败怎么办？](#如果在安装-Milvus-时从-Docker-Hub-拉取镜像总是失败怎么办)
- [Milvus 只能使用 Docker 部署吗？](#Milvus-只能使用-Docker-部署吗)
- [为什么 Milvus 返回 `config check error` 的错误？](#为什么-Milvus-返回-config-check-error-的错误)
- [为什么在导入数据时 Milvus 显示 `no space left on device` 的错误？](#为什么在导入数据时-Milvus-显示-no-space-left-on-device-的错误)
- [为什么 Milvus 查询召回率一直不理想？](#为什么-Milvus-查询召回率一直不理想)
- [为什么更新过的设置没有生效？](#为什么更新过的设置没有生效)
- [如何得知我的 Milvus 已经成功启动？](#如何得知我的-Milvus-已经成功启动)
- [为什么我的日志文件时间与系统时间不一致？](#为什么我的日志文件时间与系统时间不一致)
- [如何确认 Milvus 是否支持我的 CPU？](#如何确认-Milvus-是否支持我的-CPU)
- [为什么 Milvus 在启动时返回 `Illegal instruction`？](#为什么-Milvus-在启动时返回-Illegal-instruction)
- [如何确认 Milvus 是否支持我的 GPU？](#如何确认-Milvus-是否支持我的-GPU)
- [Milvus 镜像里面启动 server 的脚本在哪？](#Milvus-镜像里面启动-server-的脚本在哪)
- [除了配置文件外，怎样可以判断我确实在使用 GPU 做 search？](#除了配置文件外怎样可以判断我确实在使用-GPU-做-search)
- [可以在 Windows 上安装 Milvus 吗？](#可以在-Windows-上安装-Milvus-吗)
- [在 Windows 安装 pymilvus 报错，如何解决？](#在-Windows-安装-pymilvus-报错如何解决)
- [内网环境，即离线方式，能否部署 Milvus 服务？](#内网环境即离线方式能否部署-Milvus-服务)
- [在多个 Milvus 节点接入 Pushgateway 的情况下如何进行区分数据来源？](#在多个-Milvus-节点接入-Pushgateway-的情况下如何进行区分数据来源)
- [我应该使用 SQLite 还是 MySQL 进行元数据管理？](#我应该使用-SQLite-还是-MySQL-进行元数据管理)
- [如何根据数据量计算需要多大的内存？](#如何根据数据量计算需要多大的内存)
- [Milvus 中如何实现数据迁移？](#Milvus-中如何实现数据迁移)
- [Milvus 可以通过扩展某些接口 (如 S3 接口或 GlusterFS 接口) 来扩展存储吗？](#Milvus-可以通过扩展某些接口-如-S3-接口或-GlusterFS-接口-来扩展存储吗)
- [Milvus 日志中为什么会出现这个警告 `WARN: increase temp memory to avoid cudaMalloc, or decrease query/add size (alloc 307200000 B, highwater 0 B)`？](#Milvus-日志中为什么会出现这个警告-WARN-increase-temp-memory-to-avoid-cudaMalloc-or-decrease-queryadd-size-alloc-307200000-B-highwater-0-B)
- [出现 `database is locked` 的报错怎么解决？](#出现-database-is-locked-的报错怎么解决)
- [仍有问题没有得到解答？](#仍有问题没有得到解答)

<!-- /TOC -->

#### 如果在安装 Milvus 时，从 Docker Hub 拉取镜像总是失败怎么办？

某些地区的用户可能无法快速访问 Docker Hub。如果拉取镜像失败，可以从其它的镜像源拉取镜像。比如中国镜像源的网址为 [registry.docker-cn.com](https://registry.docker-cn.com)。可以在 **/etc/docker/daemon.json** 文件的 `registry-mirrors` 组添加 `"https://registry.docker-cn.com"` 命令，这样就可以默认从中国镜像源拉取镜像了。

```json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

#### Milvus 只能使用 Docker 部署吗？

Milvus 还支持源码编译，该方法仅支持 Linux 系统。详见 [从源代码编译 Milvus](https://github.com/milvus-io/milvus/blob/master/INSTALL.md)。


#### 为什么 Milvus 返回 `config check error` 的错误？

Milvus 和服务端配置文件的版本不对应。


#### 为什么在导入数据时 Milvus 显示 `no space left on device` 的错误？

可能是没有为导入数据预留足够的磁盘空间。


#### 为什么 Milvus 查询召回率一直不理想？

在调用 SDK 进行向量搜索时，可以增大函数中 `nprobe` 参数的值。值越大，结果越精确，但耗时也越久。详见 [如何设置 Milvus 客户端参数](https://www.milvus.io/cn/blogs/2020-2-16-api-setting.md)。

#### 为什么更新过的设置没有生效？

每次更新配置文件之后必须重启 Milvus Docker 才能让改动生效。详见 [服务端配置 > 配置修改](milvus_config.md#配置修改)。

#### 如何得知我的 Milvus 已经成功启动？

使用 `sudo docker logs <container ID>` 命令检查 Milvus 的运行状态。

#### 为什么我的日志文件时间与系统时间不一致？

Docker 镜像内部的日志文件默认使用 UTC 时间。如果宿主机未使用 UTC 时间，就会出现日志文件时间与系统时间不一致的情况。建议在宿主机上挂载日志文件，这样可以保证宿主机上的日志文件和系统时间是一致的。

#### 如何确认 Milvus 是否支持我的 CPU？

目前，Milvus 支持的指令集有：SSE42、AVX、AVX2、AVX512。你的 CPU 必须支持其中任意一个指令集才能保证 Milvus 正常工作。

#### 为什么 Milvus 在启动时返回 `Illegal instruction`？

如果你的 CPU 对于 SSE42、AVX、AVX2、AVX512 这四种指令集都不支持，则 Milvus 在启动时会返回上述报错信息。可以通过 `cat /proc/cpuinfo` 查看 CPU 支持的指令集。


#### 如何确认 Milvus 是否支持我的 GPU？

Milvus 支持 CUDA 6.0 架构以后的显卡。关于 Milvus 支持的架构，详见 [Wikipedia](https://en.wikipedia.org/wiki/CUDA)。

#### Milvus 镜像里面启动 server 的脚本在哪？

启动 server 的脚本在 Milvus 容器内的 **/var/lib/milvus/script/** 路径下。

#### 除了配置文件外，怎样可以判断我确实在使用 GPU 做 search？

有以下三种方式：

- 使用 `nvidia-smi` 命令查看 GPU 使用情况。
- 用 Prometheus 配置，详见 [使用 Grafana 展示监控指标 > 系统运行指标](setup_grafana.md#系统运行指标)。
- 使用 Milvus 服务端的日志。

#### 可以在 Windows 上安装 Milvus 吗？

理论上只要能够支持 Docker 的操作系统都可以运行 Milvus。

#### 在 Windows 安装 pymilvus 报错，如何解决？

可以尝试在 Conda 环境下安装。

#### 内网环境，即离线方式，能否部署 Milvus 服务？

Milvus 是以 Docker 镜像形式发行的，是可以离线部署的：

1. 在有网的环境中拉取最新的 Milvus 镜像；
2. 使用 `docker save` 将镜像保存为 TAR 文件；
3. 拷贝该镜像到无网的环境中；
4. 用 `docker load` 命令导入该镜像。

关于 Docker 的使用详见 [docs.docker.com](https://docs.docker.com)。

#### 在多个 Milvus 节点接入 Pushgateway 的情况下如何进行区分数据来源？

在 **prometheus.yaml** 里面加一个 Prometheus 的实例就可以。最后在 Prometheus 或者 Grafana 里面显示监控的时候，会指明数据是来自哪个 Milvus 实例。

#### 我应该使用 SQLite 还是 MySQL 进行元数据管理？

生产环境下，推荐使用 MySQL 。

#### 如何根据数据量计算需要多大的内存？

不同的索引所需内存不同。可以使用 [Milvus 的 sizing 工具](https://zilliz.com/sizing-tool) 去计算查询时所需要的内存。

#### Milvus 中如何实现数据迁移？

把原有的 Milvus 服务的整个 **db** 目录拷贝到新的路径下，启动新的 Milvus 服务时，将该 Milvus 服务的 **db** 目录映射为刚拷贝过来的 **db** 目录。
> 注意：不同版本之间，数据可能会不兼容。目前数据格式兼容到 0.7.0。

#### Milvus 可以通过扩展某些接口 (如 S3 接口或 GlusterFS 接口) 来扩展存储吗？

目前暂不支持。

#### Milvus 日志中为什么会出现这个警告 `WARN: increase temp memory to avoid cudaMalloc, or decrease query/add size (alloc 307200000 B, highwater 0 B)`？

在 Milvus 中，如果单次申请的显存量大于它预先开辟的一段显存空间，就会报这个警告。不过没有影响，Milvus 中会扩大它使用的显存空间来满足这个显存的申请。这个警告的意思就是要使用更多显存空间了。

#### 出现 `database is locked` 的报错怎么解决？

如果元数据管理用的是 SQLite，在有数据频繁写入的情况下会出现该错误。建议将 SQLite 更换为 MySQL。如何更换请参考文档 [使用 MySQL 管理元数据](data_manage.md)。

#### PyMilvus 返回 `Segmentation Fault` 错误，如何解决？

PyMilvus v1.1.0 允许下载最新版本的 grpcio library，而 Milvus v1.x 的服务端则基于早期的定制版本 gRPC 搭建，该版本 gRPC 与最新版本 grpcio library 不兼容。解决此问题需将 PyMilvus 升级至 v1.1.1 或将 grpcio library 回滚至 1.37.0:

```
pip install grpcio==1.37.0
pip install grpcio-tools==1.37.0
```



#### 仍有问题没有得到解答？

如果仍有其他问题，你可以：

- 在 GitHub 上访问 [Milvus](https://github.com/milvus-io/milvus/issues)，提问、分享、交流，帮助其他用户。
- 加入我们的 [Slack 社区](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)，与其他用户讨论交流。
