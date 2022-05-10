---
id: troubleshooting.md
---

# 故障诊断问题

<!-- TOC -->

<!-- /TOC -->

本页列举了使用 Milvus 可能会遇到的常见问题及潜在解决方案，主要分为以下几类：

- [服务启动问题](#服务启动问题)
- [服务运行问题](#服务运行问题)
- [API 问题](#API-问题)
- [etcd cluster 部署问题](#etcd-cluster-部署问题)

#### 服务启动问题

服务启动时发生故障会导致服务无法正常启动。可运行以下命令查看相关错误信息：



```
1$ docker logs <your milvus container id>
```

#### 服务运行问题

服务运行期间发生的故障可能导致服务宕机。如遇到此类故障，请先检查系统版本与所使用的客户端版本是否兼容，然后再查询相关错误信息。

#### API 问题

在 Milvus 服务端和客户端之间调用 API 方法时发生的故障。这类错误信息将以同步或异步的方式返回给客户端。

#### etcd cluster 部署问题

**1. etcd pod pending**

Etcd cluster 默认使用 pvc。 需要在 kubernetes 集群配置默认的 storageclass。

**2. 某个 pod crash, 报错 `Error: bad member ID arg (strconv.ParseUint: parsing "": invalid syntax), expecting ID in Hex`**

登录到该 pod，并删除文件 `/bitnami/etcd/data/member_id`。

**3. 多个 pod 一直 crash，且 `etcd-0` 还处于运行状态

运行以下指令：
```
kubectl scale sts <etcd-sts> --replicas=1
# delete the pvc for etcd-1 and etcd-2
kubectl scale sts <etcd-sts> --replicas=3
```

**4. 所有 pod 都 crash**

尝试拷贝 `/bitnami/etcd/data/member/snap/db` 文件。使用 `https://github.com/etcd-io/bbolt` 可以修改db 的数据。

Milvus 的元数据存放在 `key` bucket 中，可以备份这个 bucket 的数据。注意 `by-dev/meta/session` 文件中的 prefix 数据不需要备份。

备份后，运行以下指令：

```
kubectl kubectl scale sts <etcd-sts> --replicas=0
# delete the pvc for etcd-0, etcd-1, etcd-2
kubectl kubectl scale sts <etcd-sts> --replicas=1
# restore the backup data
```


<br/>

如有问题无法自行解决，你可以：

- 加入我们的 [Slack 社区](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)，获取 Milvus 团队的帮助。
- 在 GitHub 上 [创建 issue](https://github.com/milvus-io/milvus/issues/new/choose) 并提供相关问题的详细描述。
