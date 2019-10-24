---
id: troubleshoot
title: Troubleshoot
sidebar_label: Troubleshoot
---

# Troubleshoot

## Overview

If you run into issues with Milvus, there are a few initial steps you can always take:

1. If error occurs in client operations, check the error messages and take actions accordingly.
2. If the error occurs in server operations, check below list of [Server Errors](#server-errors) for a solution.
3. If you cannot resolve the issue easily yourself, you can:
   - [Join our Slack channel](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) and reach out for support from Milvus team.
   - [File an Issue](https://github.com/milvus-io/milvus/issues/new/choose) on GitHub and describe the problem in detail.

## Server Errors

| Message                                                      | Possible Reason                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `ERROR: mode specified in server_config is not one of ['single', 'cluster', 'read_only']` | `server_config.deploy_mode` in `server_config.yaml` is not one of `single`, `cluster`, and `read_only`. |
| `ERROR! Failed to create database root path: xxx`            | `db_config.db_path` is wrong in `server_config.yaml` or not available. |
| `ERROR! Failed to create database slave path: xxx`           | `db_config.slave_path` is wrong in `server_config.yaml` or not available. |
| `ERROR! Failed to open database: xxx`                        | The meta system does not work.                                |
| `ERROR: invalid server IP address: xxx`                      | `server_config.address` is invalid in `server_config.yaml`. |
| `ERROR: port xxx is not a number`                            | `server_config.port` in `server_config.yaml` is invalid. |
| `ERROR: port xxx out of range [1025, 65534]`                 | `server_config.port` in `server_config.yaml` is invalid. The range is [1025, 65534]. |
| `ERROR: db_path is empty`                                    | `db_config.db_path` in `server_config.yaml` is empty. |
| `ERROR: invalid db_backend_url: xxx`                         | `db_config.db_backend_url` is invalid in `server_config.yaml`. The correct format should be like **sqlite://:@:/** or **mysql://root:123456@127.0.0.1:3306/milvus**. |

## Related links
[Milvus Operations](milvus_operation.md)
