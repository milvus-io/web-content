# IndexType

This is an enumeration that provides the following constants.

## Constants

### FLAT

Sets the index type to FLAT.

### IVF_FLAT

Sets the index type to IVF_FLAT.

### IVF_SQ8

Sets the index type to IVF_SQ8.

### IVF_PQ

Sets the index type to IVF_PQ.

### HNSW

Sets the index type to HNSW.

### HNSW_SQ

Sets the index type to HNSW.

### HNSW_PQ

Sets the index type to HNSW_PQ.

### HNSW_PRQ

Sets the index type to HNSW_PRQ.

### DISKANN

Sets the index type to DISKANN.

### AUTOINDEX

Sets the index type to AUTOINDEX.

### SCANN

Sets the index type to SCANN.

### IVF_RABITQ

Sets the index type to IVF_RABITQ. This applies to dense float vectors.

### AISAQ

Sets the index type to AISAQ. This applies to dense float vectors on GPU.

### GPU_IVF_FLAT

Sets the index type to GPU_IVF_FLAT. This applies to GPU indexes only.

### GPU_IVF_PQ

Sets the index type to GPU_IVF_PQ. This applies to GPU indexes only.

### GPU_BRUTE_FORCE

Sets the index type to GPU_BRUTE_FORCE. This applies to GPU indexes only.

### GPU_CAGRA

Sets the index type to GPU_CAGRA. This applies to GPU indexes only.

### BIN_FLAT

Sets the index type to BIN_FLAT. This applies to binary vectors only.

### BIN_IVF_FLAT

Sets the index type to BIN_IVF_FLAT. This applies to binary vectors only.

### MINHASH_LSH

Sets the index type to MINHASH_LSH. This applies to binary vectors only.

### TRIE("Trie")

Sets the index type to TRIE. This applies to VarChar fields only.

### NGRAM

Sets the index type to NGRAM. This applies to VarChar fields and JSON Path indexes.

### RTREE

Sets the index type to RTREE. This applies to geometry fields only.

### STL_SORT

Sets the index type to SLT_SORT. This applies to fields of numeric types only.

### INVERTED

Sets the index type to INVERTED. This applies to all scalar fields except JSON fields.

### BITMAP

Sets the index type to BITMAP. This applies to all scalar fields except JSON, FLOAT, and DOUBLE fields.

### SPARSE_INVERTED_INDEX

Sets the index type to SPARSE_INVERTED_INDEX. This applies to sparse vectors only.

### SPARSE_WAND

Sets the index type to SPARSE_WAND. This applies to sparse vectors only.

### EMB_LIST_HNSW

Sets the index type to EMB_LIST_HNSW. This applies to an Array of Structs field.