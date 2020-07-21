---
id: install_admin.md
title: 安装 Milvus Admin
sidebar_label: 安装 Milvus Admin
---

# 安装 Milvus Admin

## 安装步骤

1. 拉取 Milvus Admin 的 Docker 镜像：

    ```shell
    $ docker pull milvusdb/milvus-admin:v0.3.0
    ```

2. 运行 Docker 镜像：

    ```shell
    $ docker run -p 3000:80 milvusdb/milvus-admin:v0.3.0
    ```

    > 注意：你也可以映射 3000 以外的端口，但相应的访问 URL 也需要更新。

3. 打开任意浏览器并访问以下 URL：

    ```text
    http://localhost:3000/
    ```

    如果你能看到 Milvus Admin 的界面，则说明安装成功。

## 下一步你可以

- [连接 Milvus Admin](connect_to_admin.md)