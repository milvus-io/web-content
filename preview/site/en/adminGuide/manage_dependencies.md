---
id: manage_dependencies.md
title: Manage Dependencies
deprecate: true
---

# Manage Dependencies

Milvus leverages third-party dependencies for object, meta, and message storage. There are two major ways to configure third-party dependencies.

- Object storage: Milvus supports using either MinIO or S3 for object storage.
  - [Configure object storage with Docker Compose/Helm](deploy_s3.md)
  - [Configure object storage with Milvus Operator](object_storage_operator.md)
- Meta storage: Milvus uses etcd for meta storage.
  - [Configure meta storage with Docker Compose/Helm](deploy_etcd.md)
  - [Configure meta storage with Milvus Operator](meta_storage_operator.md)
- Message storage: Milvus supports using Pulsar, Kafka, or RocksMQ for meta storage.
  - [Configure message storage with Docker Compose/Helm](deploy_pulsar.md)
  - [Configure message storage with Milvus Operator](message_storage_operator.md)
