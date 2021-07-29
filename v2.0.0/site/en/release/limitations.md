---
id: limitations.md
title: Milvus Limitations
---
# Milvus limitations

## Limitations on the length of an identifier

| **Identifier type**      | **Maximum length (number of characters allowed)** |
| ----------- | ----------- |
| Collection      | 255       |
| Field   | 255        |
| Index   | 255        |
| Partition   | 255        |

## Rules on naming identifiers

The name of an identifier can only contain numbers, letters, dollar signs ($), and underscores (_). The first character in an identifier must be a letter or the underscore sign.

## Limitations on the number of collections and connections

| **Identifier type**      | **Maximum number** |
| ----------- | ----------- |
| Collections      | 65536       |
| Connections / proxy   | 65536        |

## Limitations on a single collection

| **Type**      | **Maximum number** |
| ----------- | ----------- |
| Partitions      | 4096       |
| Shards   | 256        |
| Fields   | 256        |
| Indexes   | 65536        |
| Entities   | unlimited        |

## Limitations on strings 
| **Type**      | **Upper limit (characters)** |
| ----------- | ----------- |
| VARCHAR      | 65535       |

<div class="alert note">
VARCHAR will be supported in the 2.0 stable version. More string types will be supported in the future.
</div>


## Limitations on  vector data
| **Property**      | **Maximum number** |
| ----------- | ----------- |
| Dimensions      | 32768       |

## Limitations on  data size per RPC
| **Operation**      | **Data Size (MB)** |
| ----------- | ----------- |
| Insert      | 512       |
| Search   | 512        |
| Query   | 512        |

## Limitations on  search params
| **Params**      | **Maximum number** |
| ----------- | ----------- |
| Top K      | 16384       |
| nq    | 163840       |
