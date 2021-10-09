---
id: limitations.md
title: Milvus Limits
related_key: Limitations
summary: Learn about the limits while using Milvus.
---
# Milvus Limits

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
| Index   | 65,536        |
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

## Input per remote procedure call (RPC)
| Operation      | Limit |
| ----------- | ----------- |
| Insert      | 512 MB    |
| Search   | 512 MB     |
| Query   | 512 MB      |

## Search limits
| Vectors      | Limit |
| ----------- | ----------- |
| Output per input    | 16,384       |
| Input    | 16,384       |

<div class="alert note">
Due to Pulsar's limits on the log transmission size (100 MB), Milvus does not support 16,384 output vectors per input vector on high-dimensional vector searches in the current version. Milvus 2.0.0-GA will support it.
</div>
