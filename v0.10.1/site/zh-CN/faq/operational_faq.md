---
id: operational_faq.md
---

# 部署运维问题

<!-- TOC -->

- [如果在安装 Milvus 时，从 Docker Hub 拉取镜像总是失败怎么办？](#如果在安装-Milvus-时从-Docker-Hub-拉取镜像总是失败怎么办)
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
- [SQLite 和 MySQL 的地址在哪里换？](#SQLite-和-MySQL-的地址在哪里换)
- [可以在 Windows 上安装 Milvus 吗？](#可以在-Windows-上安装-Milvus-吗)
- [在 Windows 安装 pymilvus 报错，如何解决？](#在-Windows-安装-pymilvus-报错如何解决)
- [内网环境，即离线方式，能否部署 Milvus 服务？](#内网环境即离线方式能否部署-Milvus-服务)
- [如果部署两台 Milvus，监控数据对接到一个 Pushgateway，如何区分谁是谁？](#如果部署两台-Milvus监控数据对接到一个-Pushgateway如何区分谁是谁)
- [部署 Milvus 时，使用 SQLite 还是 MySQL 比较好？](#部署-Milvus-时使用-SQLite-还是-MySQL-比较好)
- [如何根据数据量计算需要多大的内存？](#如何根据数据量计算需要多大的内存)
- [Milvus 中如何实现数据迁移？](#Milvus-中如何实现数据迁移)
- [当前 Milvus 的存储可以扩展吗？可以通过扩展某些接口（比如 S3 接口、GlusterFS 接口）来实现吗？](#当前-Milvus-的存储可以扩展吗可以通过扩展某些接口比如-S3-接口GlusterFS-接口来实现吗)
- [Milvus 日志中为什么会出现这个警告 `WARN: increase temp memory to avoid cudaMalloc, or decrease query/add size (alloc 307200000 B, highwater 0 B` ？](#Milvus-日志中为什么会出现这个警告-WARN-increase-temp-memory-to-avoid-cudaMalloc-or-decrease-query/add-size-alloc-307200000-B-highwater-0-B-)
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

#### 为什么 Milvus 返回 `config check error` 的错误？

Milvus 和服务端配置文件的版本不对应。


#### 为什么在导入数据时 Milvus 显示 `no space left on device` 的错误？

可能是没有为导入数据预留足够的磁盘空间。


#### 为什么 Milvus 查询召回率一直不理想？

在调用 SDK 进行向量搜索时，可以增大函数中 `nprobe` 参数的值。值越大，结果越精确，但耗时也越久。详见 [选择向量索引工具](vector_db.md)。

#### 为什么更新过的设置没有生效？

每次更新配置文件之后必须重启 Milvus Docker 才能让改动生效。详见 [服务端配置 > 配置修改](milvus_config.md#配置修改)。

#### 如何得知我的 Milvus 已经成功启动？

使用 `docker logs <container ID>` 命令检查 Milvus 的运行状态。

#### 为什么我的日志文件时间与系统时间不一致？

Docker 镜像内部的日志文件默认使用 UTC 时区。如果宿主机的时区不是 UTC 时区，就会出现日志文件时间与系统时间不一致的情况。建议在宿主机上挂载日志文件，这样可以保证宿主机上的日志文件和系统时间是一致的。

#### 如何确认 Milvus 是否支持我的 CPU？

目前，Milvus 支持的指令集有：SSE4、AVX2、AVX512。你的 CPU 必须支持其中任意一个指令集才能保证 Milvus 正常工作。

#### 为什么 Milvus 在启动时返回 `Illegal instruction`？

如果你的 CPU 不支持 SSE4、AVX2、AVX512 其中任何一个指令集，则 Milvus 无法正常启动。可以通过 `cat /proc/cpuinfo` 查看 CPU 支持的指令集。


#### 如何确认 Milvus 是否支持我的 GPU？

Milvus 支持 Nvidia 6.0 架构以后的显卡。关于 Pascal 及更新架构，详见 [Wikipedia](https://en.wikipedia.org/wiki/CUDA)。

#### Milvus 镜像里面启动 server 的脚本在哪？

启动 server 的脚本在 Milvus 容器内的 **/var/lib/milvus/script/** 路径下。

#### 除了配置文件外，怎样可以判断我确实在使用 GPU 做 search？

可以在查询的时候查看 GPU 资源是否在使用。也可以在日志中查看是否有用到 GPU。

1. 使用 `nvidia-smi` 命令查看 GPU 使用情况。
2. 用 Prometheus 配置，详见 [使用 Grafana 展示监控指标 > 系统运行指标](setup_grafana.md#系统运行指标)。
3. 使用 Milvus 服务器的日志。

#### SQLite 和 MySQL 的地址在哪里换？

在配置文件 **server_config.yaml: db_config.backend_url**。

#### 可以在 Windows 上安装 Milvus 吗？

可以。Windows 上装了 Docker 就行，但只能运行 CPU 版本的 Milvus。

#### 在 Windows 安装 pymilvus 报错，如何解决？

可以尝试在 conda 环境下安装，在 conda 环境下运行安装 pymilvus 是没有问题的。

#### 内网环境，即离线方式，能否部署 Milvus 服务？

Milvus 是以 Docker 镜像形式发行的，是可以离线部署的。在有网的环境中拉取 Milvus 的镜像，使用 `docker save` 命令导出该镜像，拷贝该镜像到无网的环境中，然后用 `docker load` 命令导入该镜像。

关于 Docker 的使用详见 [docs.docker.com](https://docs.docker.com/)。

#### 如果部署两台 Milvus，监控数据对接到一个 Pushgateway，如何区分谁是谁？

在 **prometheus.yaml** 里面加一个 Prometheus 的实例就可以。最后在 Prometheus 或者 Grafana 里面显示监控的时候，会指明数据是来自哪个 Milvus 实例。

#### 部署 Milvus 时，使用 SQLite 还是 MySQL 比较好？

在生产环境中，出于可靠性的考虑，使用 MySQL 比较好。

#### 如何根据数据量计算需要多大的内存？

即使是同样的数据，不同的索引所需内存也不同。可以使用 [Milvus 的 sizing 工具](https://milvus.io/tools/sizing) 去计算查询时所需要的内存。

#### Milvus 中如何实现数据迁移？

把原有的 Milvus 服务的整个 `db` 目录拷贝到新的路径下，启动新的 Milvus 服务时，将该 Milvus 服务的 `db` 目录映射为刚拷贝过来的 `db` 目录。
> 注意：不同版本之间，数据可能会不兼容。目前数据格式兼容到 0.7.0。

#### 当前 Milvus 的存储可以扩展吗？可以通过扩展某些接口（比如 S3 接口、GlusterFS 接口）来实现吗？

目前暂不支持。

#### Milvus 日志中为什么会出现这个警告 `WARN: increase temp memory to avoid cudaMalloc, or decrease query/add size (alloc 307200000 B, highwater 0 B` ？

在 Milvus 中，如果单次申请的显存量大于它预先开辟的一段显存空间，就会报这个警告。不过没有影响，Milvus 中会扩大它使用的显存空间来满足这个显存的申请。这个警告的意思就是要使用更多显存空间了。

#### 出现 `database is locked` 的报错怎么解决？

如果元数据管理用的是 SQLite，在有数据频繁写入的情况下会出现该错误。建议将 SQLite 更换为 MySQL。如何更换请参考文档 [使用 MySQL 管理元数据](data_manage.md)。



#### 仍有问题没有得到解答？

如果仍有其他问题，你可以：

- 在 GitHub 上访问 [Milvus](https://github.com/milvus-io/milvus/issues)，提问、分享、交流，帮助其他用户。
- 加入我们的 [Slack 社区](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)，与其他用户讨论交流。
