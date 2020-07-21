---
id: release_notes_admin.md
title: Milvus Admin Release Notes
sidebar_label: Milvus Admin Release Notes
---

# Milvus Admin Release Notes

Milvus Admin is the GUI client of Milvus. You can use Milvus Admin to perform operations to the Milvus server.

## v0.3.0

**Release Date**：2020-5-5

**Compatibility**

| Milvus Version | Milvus Admin Version  |
| ---------------| -----------------|
| 0.9.0          | 0.3.0           |

**Features**

- Makes some UI changes to improve user experience.
- Displays connection information on top of the web page.
- Displays the connected Milvus version on the web page.
- Compatible with the Milvus 0.9.0 APIs
- Supports setting `auto_flush_interval` from `Advanced Setting` > `PERFORMANCE TUNNING` > `Auto Flush Interval`.

## v0.2.0

**Release Date**：2020-4-17

**Compatibility**

| Milvus Version | Milvus Admin Version  |
| ---------------| -----------------|
| 0.8.0          | 0.2.0           |

**Bug fix**

- Fix the count value does not change after inserting vector. #1853.
- Support https connection for milvus restful api, if only you have https proxy in front of milvus.
- Show segments in partition panel.
- Support displaying new index and metrics alone with milvus 0.8.0.

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
