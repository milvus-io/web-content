---
id: insight_install.md
title: Install Milvus Insight
---

# Install Milvus Insight

## Before you begin

Ensure you have Milvus installed on [your server](https://milvus.io/docs/install_standalone-docker.md) or [cluster](https://milvus.io/docs/install_cluster-docker.md).

<div class="alert note">
Milvus Insight only supports Milvus 2.x.
</div>

##  Start a Milvus Insight instance

```Apache
docker run -p 8000:3000 -e HOST_URL=http://{ your machine IP }:8000 -e MILVUS_URL={your machine IP}:19530 milvusdb/milvus-insight:latest
```

Once you start the docker, open the browser and type `http://{ your machine IP }:8000` to access Milvus Insight.

![Insight_install](../../../assets/insight_install.png)

## Contribution
Milvus Insight is an open-source project. All contributions are welcome. Pleae read our [Contribute guide](https://github.com/milvus-io/milvus-insight#-building-and-running-milvus-insight-andor-contributing-code) before making contributions.

If you find a bug or want to request a new feature, please create a [GitHub Issue](https://github.com/milvus-io/milvus-insight/issues/new/choose), and make sure that the same issue has not been created by someone else.

