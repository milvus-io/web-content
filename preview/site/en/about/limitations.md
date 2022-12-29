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

The name of a resource can contain numbers, letters, and underscores (\_\). A resource name must start with a letter or an underscore (\_\).

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
| Field   | 64        |
| Index   | 1        |
| Entity   | unlimited        |

## Length of a string 
| Data type      | Limit  |
| ----------- | ----------- |
| VARCHAR      | 65,535       |



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
| <code>topk</code> (number of the most similar result to return)   | 16,384       |
| <code>nq</code> (number of the search requests)    | 16,384       |


