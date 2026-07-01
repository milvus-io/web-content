---
id: object-storage.md
title: Object Storage
---

# Object Storage

Milvus stores index files and binary logs — the bulk of its data — in object storage. Milvus supports MinIO and a range of S3-compatible and cloud object stores.

## Supported object storage

| Provider / service | Supported as Milvus object storage |
| --- | :---: |
| MinIO | ✔️ (default for self-hosted deployments) |
| AWS S3 | ✔️ |
| Azure Blob Storage | ✔️ |
| Google Cloud Storage (GCS) | ✔️ |
| Aliyun OSS | ✔️ |
| Tencent COS | ✔️ |
| Huawei Cloud OBS | ✔️ |
| Other S3-compatible storage | ✔️ |

For configuration details, see [Configure Object Storage with Docker Compose or Helm](deploy_s3.md) and [Configure Object Storage with Milvus Operator](object_storage_operator.md).

## Additional requirements when using embedded Woodpecker

When you run the default **Woodpecker** message queue with its object-storage backend (`storage.type=minio`), Woodpecker writes its write-ahead log to the same object storage and requires **strict S3 Conditional-Write semantics**. Not every object store qualifies — for example, Huawei Cloud OBS is currently **unsupported** as a Woodpecker backend even though it works as regular Milvus object storage.

See the object storage compatibility matrix on the [Woodpecker](woodpecker.md) page for the exact per-provider requirements.
