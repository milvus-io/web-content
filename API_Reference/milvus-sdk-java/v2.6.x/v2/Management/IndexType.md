# IndexType

This is an enumeration that provides the following constants.

## Constants

- FLAT(1)

    Sets the index type to **FLAT**.

- IVF_FLAT(2)

    Sets the index type to **IVF_FLAT**.

- IVF_SQ8(3)

    Sets the index type to **IVF_SQ8**.

- IVF_PQ(4)

    Sets the index type to **IVF_PQ**.

- HNSW(5)

    Sets the index type to **HNSW**.

- HNSW_SQ(6)

    Sets the index type to **HNSW**.

- HNSW_PQ

    Sets the index type to **HNSW_PQ**.

- HNSW_PRQ

    Sets the index type to **HNSW_PRQ**.

- DISKANN(10)

    Sets the index type to **DISKANN**.

- AUTOINDEX(11)

    Sets the index type to **AUTOINDEX**.

- SCANN(12)

    Sets the index type to **SCANN**.

- GPU_IVF_FLAT(50)

    Sets the index type to **GPU_IVF_FLAT**. This applies to GPU indexes only.

- GPU_IVF_PQ(51)

    Sets the index type to **GPU_IVF_PQ**. This applies to GPU indexes only.

- GPU_BRUTE_FORCE(52)

    Sets the index type to **GPU_BRUTE_FORCE**. This applies to GPU indexes only.

- GPU_CAGRA(53)

    Sets the index type to **GPU_CAGRA**. This applies to GPU indexes only.

- BIN_FLAT(80)

    Sets the index type to **BIN_FLAT**. This applies to binary vectors only.

- BIN_IVF_FLAT(81)

    Sets the index type to **BIN_IVF_FLAT**. This applies to binary vectors only.

- MINHASH_LSH(82)

    Sets the index type to **MINHASH_LSH**. This applies to binary vectors only.

- TRIE("Trie", 100)

    Sets the index type to **TRIE**. This applies to VarChar fields only.

- NGRAM(101)

    Sets the index type to **NGRAM**. This applies to VarChar fields and JSON Path indexes.

- RTREE(120)

    Sets the index type to **RTREE**. This applies to geometry fields only.

- STL_SORT(200)

    Sets the index type to **SLT_SORT**. This applies to fields of numeric types only.

- INVERTED(201)

    Sets the index type to **INVERTED**. This applies to all scalar fields except JSON fields.

- BITMAP(202)

    Sets the index type to **BITMAP**. This applies to all scalar fields except JSON, FLOAT, and DOUBLE fields.

- SPARSE_INVERTED_INDEX

    Sets the index type to **SPARSE_INVERTED_INDEX**. This applies to sparse vectors only.

- SPARSE_WAND

    Sets the index type to **SPARSE_WAND**. This applies to sparse vectors only.

- EMB_LIST_HNSW

    Sets the index type to **EMB_LIST_HNSW**. This applies to an Array of Structs field.

