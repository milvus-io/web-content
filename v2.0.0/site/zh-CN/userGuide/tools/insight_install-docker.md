---
id: insight_install-docker.md
label: Install with Docker Compose
order: 0
group: insight
related_key: insight
summary: Learn how to install Milvus Insight with Docker Compose to manage your Milvus service.
---

# Install Milvus Insight

This topic describes how to install Insight, an efficient open-source management tool for Milvus.

<div class="tab-wrapper"><a href="insight_install-docker.md" class='active '>Install with Docker Compose</a><a href="insight_install-helm.md" class=''>Install with Helm Chart</a></div>

## Prerequisites
- Milvus installed on [your local device](install_standalone-docker.md) or [cluster](install_cluster-docker.md).
- Docker 19.03 or later

<div class="alert note">
Milvus Insight only supports Milvus 2.x.
</div>

##  Start a Milvus Insight instance

```Apache
docker run -p 8000:3000 -e HOST_URL=http://{ your machine IP }:8000 -e MILVUS_URL={your machine IP}:19530 milvusdb/milvus-insight:latest
```

Once you start the docker, visit `http://{ your machine IP }:8000` in your browser, and click **Connect** to enter the Insight service.

![Insight_install](../../../../assets/insight_install.png)

## Contribution
Milvus Insight is an open-source project. All contributions are welcome. Please read our [Contribute guide](https://github.com/milvus-io/milvus-insight#-building-and-running-milvus-insight-andor-contributing-code) before making contributions.

If you find a bug or want to request a new feature, please create a [GitHub Issue](https://github.com/milvus-io/milvus-insight/issues/new/choose), and make sure that the same issue has not been created by someone else.

## What's next

