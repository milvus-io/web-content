---
id: pymilvus_faq.md
title: Pymilvus FAQ
---

# PyMilvus FAQ

#### gRPC 随机返回 `socket operation on non-socket` 错误，如何解决？

检查环境变量设置是否已设为 `GRPC_ENABLE_FORK_SUPPORT=1`。

#### 在 Windows 安装 PyMilvus 报错，如何解决？

不建议在 Windows 安装 PyMilvus。可以尝试在 Conda 环境下安装。
