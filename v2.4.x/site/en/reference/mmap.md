---
id: mmap.md
summary: MMap enables more data in a single node.
---

# MMap-enabled Data Storage

Memory-mapped (MMap) files offer the advantage of accommodating more data on a single node, albeit with a trade-off in performance.

## Overview

MMap files present a mechanism to map a shared memory region to a file. Leveraging MMap files, Milvus efficiently manages memory by loading collections onto the QueryNode's disk instead of directly into memory. When a query is received, relevant data is dynamically loaded into memory, while unnecessary data is released, optimizing memory usage. Importantly, the immutability of data on QueryNodes ensures that removing data from memory doesn't involve any disk write operations, preserving data integrity.

Based on an internal test, the Milvus instance with MMap enabled demonstrates robust performance when the volume of stored data remains constant. However, when the data volume increases to twice the original size, there is a notable 30% performance degradation. Nevertheless, MMap allows efficient storage, enabling up to four times the original data volume to be saved without a significant impact on performance.


## Applicable scenarios

Milvus, designed for storing vector embeddings, typically requires substantial memory capacity. MMap-enabled data storage addresses the challenge of processing larger datasets within constrained memory space. However, as data volume increases, performance gradually degrades. Consequently, MMap-enabled data storage is best suited for scenarios where performance is not a critical factor.

## Enable MMap

To enable MMap on Milvus, you need to change the configuration file as follows:

```yaml
# new-values.yaml
queryNode:
  mmapDirPath: any/valid/path
```

After saving the file, apply the changes with the following command:

```shell
helm upgrade <milvus-release> --reuse-values -f new-values.yaml milvus/milvus
```

<div class="alert notes">

- MMap is activated when the specified path in `queryNode.mmapDirPath` is valid. To disable MMap, remove this setting item or leave it empty.
- QueryNode utilizes its volume, rather than memory, for storing data loaded from collections.
- Each scalar column in a loaded segment is stored in an individual file on the disk.
- The index file of the vector field is consolidated into a single file on the disk.

</div>

## Limits

To enable MMap, you need to install or upgrade your Milvus to `2.3.2`, and set the index type of your collection to `HNSW`.