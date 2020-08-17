---
id: data_manage.md
---

# 使用 MySQL 管理元数据

Milvus 默认使用 SQLite 作为元数据后台管理服务，SQLite 内嵌于 Milvus 进程中，无需启动额外服务。但是在生产环境中，基于可靠性的考虑，我们强烈建议你使用 MySQL 作为元数据管理服务。

<div class="alert warning">
Milvus 在 CentOS 系统中不支持 MySQL 8.0 或更高版本。
</div>

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

6. 使用修改过的 **server_config.yaml** 启动 Milvus 服务。

