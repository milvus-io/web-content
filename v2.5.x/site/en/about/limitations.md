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
| Shard   | 16        |
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
| Insert      | 64 MB    |
| Search   | 64 MB     |
| Query   | 64 MB      |

## Load limits
In current release, data to be load must be under 90% of the total memory resources of all query nodes to reserve memory resources for execution engine.

## Search limits
| Vectors      | Limit |
| ----------- | ----------- |
| <code>topk</code> (number of the most similar result to return)   | 16,384       |
| <code>nq</code> (number of the search requests)    | 16,384       |

## Index limits on different search types

The following table provides an overview of the support for various search behaviors across different index types.

|                                      | HNSW | DISKANN | FLAT | IVF_FLAT | IVF_SQ8 | IVF_PQ | SCANN | GPU_IFV_FLAT | GPU_IVF_PQ | GPU_CAGRA | GPU_BRUTE_FORCE | SPARSE_INVERTED_INDEX | SPARSE_WAND         | BIN_FLAT | BIN_IVF_FLAT |
|--------------------------------------|------|---------|------|----------|---------|--------|-------|--------------|------------|-----------|-----------------|-----------------------|---------------------|----------|--------------|
| Basic search                         | Yes  | Yes     | Yes  | Yes      | Yes     | Yes    | Yes   | Yes          | Yes        | Yes       | Yes             | Yes                   | Yes                 | Yes      | Yes          |
| Partition search                     | Yes  | Yes     | Yes  | Yes      | Yes     | Yes    | Yes   | Yes          | Yes        | Yes       | Yes             | Yes                   | Yes                 | Yes      | Yes          |
| Basic search with raw data retrieved | Yes  | Yes     | Yes  | Yes      | Yes     | Yes    | Yes   | Yes          | Yes        | Yes       | Yes             | Yes                   | Yes                 | Yes      | Yes          |
| Basic search with pagination         | Yes  | Yes     | Yes  | Yes      | Yes     | Yes    | Yes   | Yes          | Yes        | Yes       | Yes             | Yes                   | Yes                 | Yes      | Yes          |
| Filtered search                      | Yes  | Yes     | Yes  | Yes      | Yes     | Yes    | Yes   | Yes          | Yes        | Yes       | Yes             | Yes                   | Yes                 | Yes      | Yes          |
| Range search                         | Yes  | Yes     | Yes  | Yes      | Yes     | Yes    | Yes   | No           | No         | No        | No              | No                    | No                  | Yes      | Yes          |
| Grouping search                      | Yes  | No      | Yes  | Yes      | No      | No     | No    | No           | No         | No        | No              | No                    | No                  | No       | No           |
| Search with iterator                 | Yes  | Yes     | Yes  | Yes      | Yes     | Yes    | Yes   | No           | No         | No        | No              | No                    | No                  | No       | No           |
| Hybrid search                        | Yes  | Yes     | Yes  | Yes      | Yes     | Yes    | Yes   | Yes          | Yes        | Yes       | Yes             | Yes(Only RRFRanker)   | Yes(Only RRFRanker) | Yes      | Yes          |
| Query/Get                            | Yes  | Yes     | Yes  | Yes      | Yes     | Yes    | Yes   | Yes          | Yes        | Yes       | Yes             | Yes                   | Yes                 | Yes      | Yes          |
| Query with iterator                  | Yes  | Yes     | Yes  | Yes      | Yes     | Yes    | Yes   | No           | No         | No        | No              | Yes                   | Yes                 | Yes      | Yes          |
