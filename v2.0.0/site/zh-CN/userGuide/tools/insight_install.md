---
id: insight_install.md
title: 安装 Milvus Insight
---

# 安装 Milvus Insight

## 安装前提
安装 Milvus Insight 前，请先确保你已安装[单机版 Milvus](https://milvus.io/docs/install_standalone-docker.md) 或[分布式版 Milvus](https://milvus.io/docs/install_cluster-docker.md)。

<div class="alert note">
Milvus Insight 仅支持 Milvus 2.0 或以上版本。
</div>

## 启动 Milvus Insight 实例

```Apache
docker run -p 8000:3000 -e HOST_URL=http://{ your machine IP }:8000 -e MILVUS_URL={your machine IP}:19530 milvusdb/milvus-insight:latest
```

启动 Docker 后，打开浏览器并输入地址 <i>http://{ your machine IP }:8000</i> 以访问 Milvus Insight。

![Insight_install](../../../../assets/insight_install.png)

## 贡献代码

欢迎向开源项目 Milvus Insight 贡献代码。贡献代码前，请先阅读[贡献指南](https://github.com/milvus-io/milvus-insight#-building-and-running-milvus-insight-andor-contributing-code)。

请通过创建 [GitHub Issue](https://github.com/milvus-io/milvus-insight/issues/new/choose) 来反馈 bug 或建议新功能。请不要重复创建相同的 issue。
