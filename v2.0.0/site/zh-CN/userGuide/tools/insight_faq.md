---
id: insight_faq.md
related_key: insight
summary: Milvus Insight, an intuitive GUI for Milvus service management.
---

# Insight FAQ

#### Why is Insight throwing a network error?

A: Check whether you have assigned a correct value to `HOST_URL` in the `docker run` command. Alternatively, you can enter `{HOST_URL}/api/v1/healthy` in the address bar of your browser to check the network status of Insight.

#### Why did Insight fail to connect to Milvus?

A: Ensure that Milvus and Insight are on the same network.

#### How do I use Insight with K8s?

A: You can [install Insight while deploying Milvus with Helm](insight_install-helm.md).