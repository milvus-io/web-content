# Index types

There are different types of indexes that can be created for different purposes. The following table lists the types of indexes available in Milvus.

| Index type   |   Description   |   Highlights   |   
|--------------|-----------------|----------------|
| Milvus-KDT         | A KD tree-based index that partitions vector space into k-dimensional subspaces.  | 
| Milvus-NSG   | With Milvus-NSG (Navigation Spreading Graph),                                           | Fast speed on sigle vector search|
| Milvus-IVFPQ | Rather than partitioning the whole vector space, it only searches the regions of interest, that can be fast located by vector clustering.  |  

## KDT
A k-d tree-based (k-dimensional tree) index that divides a high-dimension vector space into multiple subspaces. 
### Highlights

## NSG
Navigation spreading graph advantageous in search accuracy in very high-dimensional data

### Highlights

- Suitable for single vector search.


## IVFPQ
Rather than partitioning the whole vector space, it only searches the regions of interest, that can be fast located by vector clustering. 

### Highlights
