---
id: troubleshoot
title: Troubleshoot
sidebar_label: Troubleshoot
---

# 故障诊断

## 概述

如果您在使用 Milvus 时遇到问题，您可以通过以下步骤排查障碍：

- 如果是 Milvus 客户端操作方面的问题，请查看错误信息并采取相应措施。
- 如果是 Milvus 服务端操作方面的问题，请参考 [服务器启动故障](#服务器启动故障)。
- 对于您无法自己解决的问题，您可以：
   - [加入我们的 Slack 社区](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)，提问并与 Milvus 团队及其它社区成员交流讨论。
   - 在 GitHub 上 [创建 issue](https://github.com/milvus-io/milvus/issues/new/choose)，详细描述您的问题。

## 服务器启动故障

| 错误信息                                                     | 可能原因                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `ERROR: mode specified in server_config is not one of ['single', 'cluster', 'read_only']` | `server_config.yaml` 的 `server_config.deploy_mode` 参数不是 `single`, `cluster`, 和 `read_only` 其中的一种。 |
| `ERROR! Failed to create database root path: xxx`            |  `server_config.yaml` 中的 `db_config.db_path` 参数错误或路径不可用。 |
| `ERROR! Failed to create database slave path: xxx`           | `server_config.yaml` 中的 `db_config.slave_path` 参数错误或路径不可用。 |
| `ERROR! Failed to open database: xxx`                        | 元数据系统故障。                               |
| `ERROR: invalid server IP address: xxx`                      | `server_config.yaml` 中的 `server_config.address` 参数无效。 |
| `ERROR: port xxx is not a number`                            | `server_config.yaml` 中的 `server_config.port` 参数无效。 |
| `ERROR: port xxx out of range [1025, 65534]`                 | `server_config.yaml` 中的 `server_config.port` 参数无效. 参数范围应该在 [1025，65534]。|
| `ERROR: db_path is empty`                                    | `server_config.yaml` 中的 `db_config.db_path` 参数值为空。 |
| `ERROR: invalid db_backend_url: xxx`                         | `server_config.yaml` 中的 `db_config.db_backend_url` 参数无效。正确格式应类似 **sqlite://:@:/** 或 **mysql://root:123456@127.0.0.1:3306/milvus**。 |

## 相关阅读
[了解 Milvus 操作](milvus_operation.md)
