---
id: release_notes_admin.md
title: Milvus Admin Release Notes
sidebar_label: Milvus Admin Release Notes
---

# Milvus Admin Release Notes

Milvus Admin is the GUI client of Milvus. You can use Milvus Admin to perform operations to the Milvus server.

## v0.1.0

**Release Date**：2020-3-14

**Compatibility**

| Milvus Version    | Milvus Admin Version  |
| ---------------| -----------------|
| 0.7.0          | 0.1.0           |

**Features**

- Support vector insertion, deletion, query, and read.
- Support the following index types: FLAT, IVFLAT, IVF_SQ8, IVF_SQ8H, IVF_PQ、HNSW.
- Support the following distance metrics: Euclidean distance (L2), inner product (IP), Hamming distance, Tanimoto distance, Jaccard distance.
- Support editing the Milvus server configuration file (`server_config.yaml`) during runtime. Changes to some parameters take effect immediately without restarting Milvus.