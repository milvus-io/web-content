---
id: limitations.md
title: Milvus Limits
related_key: Limitations
summary: Learn about the limits while using Milvus.
---
# Milvus Limits

Milvus is committed to providing the best vector databases to power AI applications and vector similarity search. However, the team is continuously working to bring in more features and the best utilities to enhance user experience. This page lists out some known limitations that the users may encounter when using Milvus.

## Length of a resource name

| Resource      | Limit  |
| ----------- | ----------- |
| Collection      | 255 characters      |
| Field   | 255 characters        |
| Index   | 255 characters       |
| Partition   | 255  characters      |

## Naming rules

The name of a resource can contain numbers, letters, dollar signs ($), and underscores (\_). A resource name must start with a letter or an underscore (_).

## Number of resources

| Resource      | Limit |
| ----------- | ----------- |
| Collection     | 65,536       |
| Connection / proxy   | 65,536        |

## Number of resources in a collection

| Resource     | Limit|
| ----------- | ----------- |
| Partition      | 4,096       |
| Shard   | 256        |
| Field   | 256        |
| Index   | 1        |
| Entity   | unlimited        |

## Length of a string 
| Data type      | Limit  |
| ----------- | ----------- |
| VARCHAR      | 65,535 characters       |

<div class="alert note">
VARCHAR will be supported in the 2.0 stable version. More string data types will be supported.
</div>


## Dimensions of a vector
| Property      | Limit |
| ----------- | ----------- |
| Dimension      | 32,768       |

## Input and Output per RPC
| Operation      | Limit |
| ----------- | ----------- |
| Insert      | 512 MB    |
| Search   | 512 MB     |
| Query   | 512 MB      |

## Load limits
In current release, data to be load must be under 90% of the total memory resources of all query nodes to reserve memory resources for execution engine.

## Search limits
| Vectors      | Limit |
| ----------- | ----------- |
| topk   | 16,384       |
| target input vectors    | 16,384       |

<div class="alert note">
Due to Pulsar's limits on the log transmission size (100 MB), Milvus does not support 16,384 output vectors per input vector on high-dimensional vector searches in the current version. Milvus 2.0.0-GA will support it.
</div>
