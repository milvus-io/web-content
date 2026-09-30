---
id: data-infra-integration-overview.md
title: Data Infrastructure
summary: Overview of the metadata storage, object storage, and message queues that Milvus uses.
---

# Data Infrastructure

Milvus relies on metadata storage, object storage, and a message queue for its core data infrastructure. This chapter covers the components you can configure:

- **[Metadata](etcd.md)** — Milvus stores metadata (collection schemas, node status, consumption checkpoints) in etcd.
- **[Object Storage](object-storage.md)** — Milvus stores index files and binary logs in MinIO, AWS S3, or other S3-compatible / cloud object storage.
- **[Message Queue](mqtype-overview.md)** — Milvus uses a write-ahead log (WAL): Woodpecker (default), Pulsar, Kafka, or RocksMQ.

By default, a new Milvus 3.x deployment runs with **Woodpecker** as the message queue, **etcd** for metadata, and **MinIO** for object storage — no extra messaging infrastructure required.
