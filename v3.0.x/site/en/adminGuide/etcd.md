---
id: etcd.md
title: etcd
---

# etcd (Metadata)

Milvus uses **etcd** to store metadata such as collection schemas, node status, and message-consumption checkpoints.

## Version

Milvus is validated against **etcd 3.5.x**. When you install Milvus with Helm, the bundled etcd image is `milvusdb/etcd:3.5.25-r1` by default.

## Change the etcd image with Helm

To pin or replace the etcd image version, override `etcd.image.tag` (and, if needed, `etcd.image.repository`) when installing or upgrading with Helm:

```bash
helm install my-release zilliztech/milvus \
  --set etcd.image.repository=milvusdb/etcd \
  --set etcd.image.tag=3.5.25-r1
```

For external etcd, or for detailed Docker Compose / Helm / Milvus Operator configuration, see [Configure Meta Storage with Docker Compose or Helm](deploy_etcd.md) and [Configure Meta Storage with Milvus Operator](meta_storage_operator.md).
