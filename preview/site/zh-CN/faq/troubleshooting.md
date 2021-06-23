---
id: troubleshooting.md
title: 故障诊断
---

# 故障诊断问题

<!-- TOC -->

<!-- /TOC -->

本页列举了使用 Milvus 可能会遇到的常见问题及潜在解决方案，主要分为以下几类：

- [服务启动问题](#服务启动问题)
- [服务运行问题](#服务运行问题)
- [API 问题](#API 问题)

#### 服务启动问题

服务启动时发生故障会导致服务无法正常启动。可运行以下命令查看相关错误信息：



```
1$ docker logs <your milvus container id>
```

#### 服务运行问题

服务运行期间发生的故障可能导致服务宕机。如遇到此类故障，请先检查系统版本与所使用的客户端版本是否兼容，然后再查询相关错误信息。

#### API 问题

在 Milvus 服务端和客户端之间调用 API 方法时发生的故障。这类错误信息将以同步或异步的方式返回给客户端。

如有问题无法自行解决，你可以：

- 加入我们的 [Slack 社区](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)，获取 Milvus 团队的帮助。
- 在 GitHub 上 [创建 issue](https://github.com/milvus-io/milvus/issues/new/choose) 并提供相关问题的详细描述。
