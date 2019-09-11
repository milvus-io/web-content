---
id: troubleshoot
title: Troubleshoot
sidebar_label: Troubleshoot
---

# Troubleshoot

## Overview

If you run into issues with Milvus, there are a few initial steps you can always take:

1. If you come across the error in Milvus operations, go to [Troubleshoot API behaviors].
2. If the error pops out when you start Milvus server, check our list of [server errors] for a solution.
4. If you cannot resolve the issue easily yourself, you can:
   - Reach out for support from Milvus team by support@zilliz.com.
   - [File an Issue] and describe in detail the problem.

## Troubleshoot API Behaviors

| Topic       | Message                                                      |
| ----------- | ------------------------------------------------------------ |
| CreateTable | `Invalid table dimension: xxx`                               |
| CreateTable | `Invalid index file size: xxx`                               |
| CreateTable | `Invalid index metric type: xxx`                             |
| CreateIndex | `Invalid index type: xxx`                                    |
| CreateIndex | `Invalid index nlist: xxx`                                   |
| Insert      | `Row record array is empty`                                  |
| Insert      | `Size of vector ids is not equal to row record array size`   |
| Insert      | `Table vector ids are user defined, please provide id for this batch` |
| Insert      | `Table vector ids are auto generated, no need to provide id for this batch` |
| Insert      | `Row record float array is empty`                            |
| Insert      | `Invalid row record dimension: xxx  vs. table dimension: xxx` |
| Search      | `Invalid topk: xxx`                                          |
| Search      | `Invalid nprobe: xxx`                                        |
| Search      | `Query record float array is empty`                          |
| Search      | `Invalid query record dimension: xxx vs. table dimension: xxx` |

### CreateTable

`Invalid table dimension: xxx`

This message indicates that table dimension is illegal. 

To solve this issue, check that the table dimension is within the range of  1 ~ 16384.

`Invalid index file size: xxx`

This message indicates that index file size is illegal. Index file size refers to the maximum data file size beyond which index will be automatically built. 

To solve this issue, check that the index file size is within the range of  1 ~ 4096.

`Invalid index metric type: xxx`

This message indicates that metric type is illegal. Metric type refers to the method vector distances are compared in Milvus. You can compare vectors either by Euclidean distance (L2) or inner product (IP). 

To solve this issue, check that the metric type is either `MetricType.L2` or `MetricType.IP` .

### CreateIndex

`Invalid index type: xxx`

This message indicates that index type is illegal. Index type refers to the type of indexing method to query the table. 

To solve this issue, check that the index type is one of the following: 

- `FLAT` - Provides 100% accuracy for recalls. However, performance might be downgraded due to huge computation effort.
- `IVFLAT` - K-means based similarity search which is balanced between accuracy and performance
- `IVF_SQ8` - Vector indexing that adopts a scalar quantization strategy that significantly reduces the size of a vector (by about 3/4), thus improving the overall throughput of vector processing.

`Invalid index nlist: xxx`

This message indicates that index nlist is illegal. 

To solve this issue, check that the index nlist is > 0.

### Insert

`Row record array is empty`

This message indicates that empty vectors are inserted into Milvus.

To solve this issue, make sure that you have entered vector records.

`Row record array data is empty`

This message indicates that the inserted vectors have empty values.

To solve this issue, make sure the vector records you entered have values.

`Size of vector ids is not equal to row record array size`

This message indicates that the vector id array size is not equal to vector size.

If you want to use user-defined id for vectors, make sure the number of vector ids are equal to the number of vectors. If you don't want user-defined ids, keep the id array empty and Milvus will generate ids for your vectors.

`Table vector ids are user defined, please provide id for this batch`

This message indicates that if some vectors of this table have user-defined ids, then all the rest vectors must also have user-defined ids.

To solve this issue, provide user-defined ids for all the inserted vectors.

`Table vector ids are auto generated, no need to provide id for this batch`

This message indicates that if some vectors of this table use auto-generated ids, then all the rest vectors must also use auto-generated ids.

To solve this issue, you can either:

- Provide no user-defined id for the inserted vectors
- Provide user-defined ids for all the inserted vectors

`Invalid row record dimension: xxx  vs. table dimension: xxx`

This message indicates that the vector dimension is not equal to table dimension. 

To solve this issue, make sure that the vector dimension you set is equal to the table dimension defined.

### Search

`Invalid topk: xxx`

This message indicates that the search parameter topk is illegal.

To solve this issue, check that the topk is within the range of 1 ~ 2048.

`Invalid nprobe: xxx`

This message indicates that the search parameter nprobe is illegal.

To solve this issue, check that the nprobe is within the range of 1 ~ index nlist.

`Row record array data is empty`

This message indicates that the searched vectors have empty values.

To solve this issue, make sure the vectors you want to search have values.

`Invalid query record dimension: xxx vs. table dimension: xxx`

This message indicates that the vector dimension is not equal to table dimension.

To solve this issue, make sure that the vector dimension you set is equal to the table dimension defined.

## Server Errors

| Message                                                      | Reason                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `ERROR: mode specified in server_config is not one of ['single', 'cluster', 'read_only']` | Wrong values have been set in `server_config.yaml ` or server_config.mode. |
| `ERROR! Failed to create database root path: xxx`            | Wrong values have been set in `server_config.yaml ` or `db_config.db_path`,  or the path is not available. |
| `ERROR! Failed to create database slave path: xxx`           | Wrong values have been set in `server_config.yaml ` , `db_config.slave_path`,  or the path is not available. |
| `ERROR! Failed to open database: xxx`                        | The meta system does not work                                |
| `ERROR: invalid server IP address: xxx`                      | Invalid server address has been set in `server_config.yaml` or `server_config.address`. |
| `ERROR: port xxx is not a number`                            | Invalid server port has been set in `server_config.yaml ` or `server_config.port`. |
| `ERROR: port xxx out of range [1025, 65534]`                 | Invalid server port has been set in `server_config.yaml`  or `server_config.port` . The range is 1025~65534 |
| `ERROR: db_path is empty`                                    | Empty string exists in `server_config.yaml` or `db_config.db_path`. |
| `ERROR: invalid db_backend_url: xxx`                         | Invalid URL has been set in `server_config.yaml` or `db_config.db_backend_url` . The right format is **sqlite://:@:/**  or **mysql://root:123456@127.0.0.1:3306/milvus** |

## Related links
[Milvus Operations](milvus_operation.md)
