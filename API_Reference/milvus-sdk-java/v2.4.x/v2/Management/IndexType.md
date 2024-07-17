# IndexType

This is an enumeration that provides the following constants.

## Constants

- INVALID

    Sets the index type to **INVALID**.

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

- SPARSE_INVERTED_INDEX

    Sets the index type to **SPARSE_INVERTED_INDEX**. This applies to sparse vectors only.

- SPARSE_WAND

    Sets the index type to **SPARSE_WAND**. This applies to sparse vectors only.

- TRIE("Trie", 100)

    Sets the index type to **TRIE**. This applies to VarChar scalar fields only.

- STL_SORT(200)

    Sets the index type to **STL_SORT**. This applies to scalar fields only.

- INVERTED(201)

     Sets the index type to **INVERTED**. This applies to all scalar fields except JSON type fields.

