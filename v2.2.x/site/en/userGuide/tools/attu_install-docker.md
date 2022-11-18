---
id: attu_install-docker.md
label: Install with Docker Compose
order: 0
group: attu_install-docker.md
related_key: attu
summary: Learn how to install Attu with Docker Compose to manage your Milvus service.
---

# Install Attu

This topic describes how to install Attu, an efficient open-source management tool for Milvus.

<div class="tab-wrapper"><a href="attu_install-docker.md" class='active '>Install with Docker Compose</a><a href="attu_install-helm.md" class=''>Install with Helm Chart</a><a href="attu_install-package.md" class=''>Install with Package</a></div>

## Prerequisites

- Milvus installed on [your local device](install_standalone-docker.md) or [cluster](install_cluster-docker.md).
- Docker 19.03 or later
- Milvus 2.1.0 or later

<div class="alert note">
See <a href="https://milvus.io/docs/v2.0.x/attu_install-docker.md">v2.0.x Attu doc</a> if you are using Milvus 2.0.x.
</div>

## Start an Attu instance

```Apache
docker run -p 8000:3000  -e MILVUS_URL={your machine IP}:19530 zilliz/attu:latest
```

Once you start the docker, visit `http://{ your machine IP }:8000` in your browser, and click **Connect** to enter the Attu service.
And we alsow support TLS connection, username and password.

![Attu_install](../../../../assets/attu/insight_install.png "Connect to the Milvus service.")
![Attu_Login_user_pwd](../../../../assets/attu/insight_install_user_pwd.png "Connect to the Milvus service with username and password.")

## Contribution

Attu is an open-source project. All contributions are welcome. Please read our [Contribute guide](https://github.com/zilliztech/attu) before making contributions.

If you find a bug or want to request a new feature, please create a [GitHub Issue](https://github.com/zilliztech/attu), and make sure that the same issue has not been created by someone else.
