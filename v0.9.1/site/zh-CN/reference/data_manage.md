---
id: data_manage.md
title: Data Management
sidebar_label: Data Management
---

# 数据管理

## 使用 MySQL 作为元数据管理服务

Milvus 默认使用 SQLite 作为元数据后台管理服务，SQLite 内嵌于 Milvus 进程中，无需启动额外服务。但是在生产环境中，基于可靠性的考虑，我们强烈建议你使用 MySQL 作为元数据管理服务。

> 注意：Milvus 在 CentOS 系统中不支持 MySQL 8.0 或更高版本。

请参考以下步骤使用 MySQL 作为元数据管理服务：

1. 拉取 MySQL 最新镜像。

    ```shell
    $ docker pull mysql:latest
    ```

2. 启动 MySQL 服务（密码和端口可自行设置）。

    ```shell
    $ docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:latest
    ```

3. 使用 root 账号和 MySQL 服务所在的主机 IP （`<MySQL_server_host IP>`）登录 MySQL，回车后系统提示输入密码。输入上一步设置的密码。

    ```shell
    $ mysql -h<MySQL_server_host IP> -uroot -p
    ```

4. 进入 MySQL 客户端命令行，创建一个 database，名称可自行设定，这里使用 `milvus`。

    ```sql
    create database milvus
    ```

5. 退出 MySQL 客户端, 修改 `server_config.yaml` 文件的 `backend_url` 参数。使用 MySQL 服务所在的主机 IP 作为 IP 地址（`<MySQL_server_host IP>`）。注意密码、IP 地址、端口以及 database 名称要和以上几步的设置一致。

    ```yaml
    backend_url: mysql://root:123456@<MySQL_server_host IP>:3306/milvus
    ```

6. 使用修改过的 `server_config.yaml` 启动 Milvus 服务。

## 数据管理相关博客

从数据导入，数据存储到数据查询和调度，请参阅我们的博客深入了解 Milvus 数据管理方案。

- [数据管理策略](https://www.milvus.io/cn/blogs/2019-11-08-data-management.md)
- [数据文件清理机制的改进](https://www.milvus.io/cn/blogs/2019-12-18-datafile-cleanup.md)
- [查看元数据](https://www.milvus.io/cn/blogs/2019-12-24-view-metadata.md)
- [元数据表的字段](https://www.milvus.io/cn/blogs/2019-12-27-meta-table.md)
- [如何通过元数据管理数据文件](https://www.milvus.io/cn/blogs/2020-01-09-milvus-meta.md)
