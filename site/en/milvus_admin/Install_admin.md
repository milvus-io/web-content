---
id: install_admin.md
title: Install Milvus Admin
sidebar_label: Install Milvus Admin
---

# Install Milvus Admin

1. Pull the Docker image of Milvus Admin:

    ```shell
    $ docker pull milvusdb/milvus-admin:v0.2.0
    ```

2. Run the Docker image:

    ```shell
    $ docker run -p 3000:80 milvusdb/milvus-admin:v0.2.0
    ```

    > Note: You can also map a port other than 3000, but you need to update the URL accordingly/

3. Launch any browser and access the following URL:

    ```text
    http://localhost:3000/
    ```

    If you can see the Milvus Admin interface, then you have successfully installed Milvus Admin.

## What's next

- [Connect to Milvus Admin](connect_to_admin.md)