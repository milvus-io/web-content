---
id: insight_faq.md
related_key: insight
summary: Milvus Insight, an intuitive GUI for Milvus service management.
---

# Insight FAQ

#### Insight 为什么报网络错误?

答：请确认在执行 `docker run` 命令时，传入了正确的 `HOST_URL` 值。你也可以在浏览器输入 `{HOST_URL}/api/v1/healthy` 来确认 Insight 的服务状态。

#### 为什么 Insight 连接不上 Milvus？

答：请确保 Milvus 和 Insight 在同一网络。

#### 我该如何在 k8s 中使用 Insight？

答：请参考[使用 Helm Chart 安装 Milvus Insight](https://milvus.io/cn/docs/v2.0.0/insight_install-helm.md)。
