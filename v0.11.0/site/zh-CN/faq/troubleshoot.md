---
id: troubleshoot.md
---

# 故障诊断

该页面主要描述使用 Milvus 时会遇到的常见问题。这些问题主要分为以下几类：

## 服务启动问题 {#1}

服务启动时发生的故障，通常会导致服务无法正常启动。你可以通过以下命令来查看相关错误信息：

```shell
$ docker logs <milvus container id>
```

## 服务运行问题 {#2}

服务运行期间发生的故障有可能导致服务瘫痪。遇到此类故障时，请先检查系统版本和所使用的客户端版本是否兼容，然后再查询相关错误信息。服务运行的错误信息将被记录在 **/home/$USER/milvus/logs** 文件中。

## API 问题 {#3}

通过 API 使用 Milvus 时发生的故障。这类错误信息将实时返回给客户端。

对于你无法自己解决的问题，你可以：

- [加入我们的 Slack 社区](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)，提问并与 Milvus 团队及其它社区成员交流讨论。

- 在 GitHub 上 [创建 issue](https://github.com/milvus-io/milvus/issues/new/choose)，详细描述你的问题。
