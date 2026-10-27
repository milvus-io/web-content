# IndexType

This enumeration provides index types for collection fields.

```java
public enum IndexType
```

**Constants:**

- **None**

    The index type is not set.

- **FLAT**

    A brute-force index that computes exact distances. This applies to float vectors only.

- **IVF_FLAT**

    An inverted-file index that partitions vectors into clusters. This applies to float vectors only.

- **IVF_SQ8**

    An IVF index that stores scalar-quantized vectors. This applies to float vectors only.

- **IVF_PQ**

    An IVF index that stores product-quantized vectors. This applies to float vectors only.

- **HNSW**

    A graph-based index using the Hierarchical Navigable Small World algorithm. This applies to float vectors only.

- **HNSW_SQ**

    An HNSW index that stores scalar-quantized vectors. This applies to float vectors only.

- **HNSW_PQ**

    An HNSW index that stores product-quantized vectors. This applies to float vectors only.

- **HNSW_PRQ**

    An HNSW index with product-quantized routing and raw-data refinement. This applies to float vectors only.

- **DISKANN**

    A disk-based index designed for large-scale data. This applies to float vectors only.

- **AUTOINDEX**

    An index type chosen automatically by Milvus.

- **SCANN**

    A cluster-based index for efficient approximate search. This applies to float vectors only.

- **IVF_RABITQ**

    An IVF index using residual-adaptive bit quantization. This applies to dense float vectors only.

- **AISAQ**

    An approximate inverted index using additive quantization. This applies to dense float vectors only.

- **GPU_IVF_FLAT**

    A GPU-accelerated IVF-FLAT index. This applies to float vectors on GPU indexes only.

- **GPU_IVF_PQ**

    A GPU-accelerated IVF-PQ index. This applies to float vectors on GPU indexes only.

- **GPU_BRUTE_FORCE**

    A GPU-accelerated brute-force index. This applies to float vectors on GPU indexes only.

- **GPU_CAGRA**

    A GPU-accelerated graph index based on CAGRA. This applies to float vectors on GPU indexes only.

- **BIN_FLAT**

    A brute-force index for binary vectors. This applies to binary vectors only.

- **BIN_IVF_FLAT**

    An inverted-file index for binary vectors. This applies to binary vectors only.

- **MINHASH_LSH**

    A MinHash-based LSH index for binary vectors. This applies to binary vectors only.

- **TRIE ("Trie")**

    A trie index for VarChar fields. This applies to VarChar fields only.

- **NGRAM**

    An n-gram index for VarChar fields and `json_path` of JSON fields.

- **RTREE**

    An R-tree index for geometry fields. This applies to geometry fields only.

- **STL_SORT**

    A sort-based index for numeric fields. This applies to numeric scalar fields only.

- **INVERTED**

    An inverted index for scalar fields and `json_path` of JSON fields.

- **BITMAP**

    A bitmap index for scalar fields except `JSON`, `FLOAT`, and `DOUBLE` fields.

- **SPARSE_INVERTED_INDEX**

    An inverted index for sparse vectors. This applies to sparse vectors only.

- **SPARSE_WAND**

    A sparse vector index using the WAND algorithm. Since Milvus 2.5.4, prefer `INVERTED_INDEX_ALGO="DAAT_WAND"` in the inverted index; this value remains available for compatibility.

- **FMINDEX**

    An exact byte-level substring index for VarChar fields. It answers anchored `LIKE` queries with prefix, infix, or suffix matching and no candidate recheck. This applies to VarChar fields only.
