# IndexType

This is an enumeration that provides the following constants.

```python
class IndexType(str, Enum):
    GPU_BRUTE_FORCE = "GPU_BRUTE_FORCE"
    GPU_IVF_FLAT = "GPU_IVF_FLAT"
    GPU_IVF_PQ = "GPU_IVF_PQ"
    GPU_CAGRA = "GPU_CAGRA"
    FLAT = "FLAT"
    IVF_FLAT = "IVF_FLAT"
    IVF_PQ = "IVF_PQ"
    SCANN = "SCANN"
    IVF_SQ8 = "IVF_SQ8"
    IVF_RABITQ = "IVF_RABITQ"
    BIN_FLAT = "BIN_FLAT"
    BIN_IVF_FLAT = "BIN_IVF_FLAT"
    HNSW = "HNSW"
    HNSW_SQ = "HNSW_SQ"
    HNSW_PQ = "HNSW_PQ"
    HNSW_PRQ = "HNSW_PRQ"
    DISKANN = "DISKANN"
    SPARSE_INVERTED_INDEX = "SPARSE_INVERTED_INDEX"
    SPARSE_WAND = "SPARSE_WAND"
    INVERTED = "INVERTED"
    STL_SORT = "STL_SORT"
    TRIE = "TRIE"
    AUTOINDEX = "AUTOINDEX"
```

**Constants:**

- **GPU_BRUTE_FORCE**

    Sets the index type to **GPU_BRUTE_FORCE**. This applies to GPU indexes only.

- **GPU_IVF_FLAT**

    Sets the index type to **GPU_IVF_FLAT**. This applies to GPU indexes only.

- **GPU_IVF_PQ**

    Sets the index type to **GPU_IVF_PQ**. This applies to GPU indexes only.

- **GPU_CAGRA**

    Sets the index type to **GPU_CAGRA**. This applies to GPU indexes only.

- **FLAT**

    Sets the index type to **FLAT**.

- **IVF_FLAT**

    Sets the index type to **IVF_FLAT**.

- **IVF_PQ**

    Sets the index type to **IVF_PQ**.

- **SCANN**

    Sets the index type to **SCANN**.

- **IVF_SQ8**

    Sets the index type to **IVF_SQ8**.

- **IVF_RABITQ**

    Sets the index type to **IVF_RABITQ**.

- **BIN_FLAT**

    Sets the index type to **BIN_FLAT**. This applies to binary vectors only.

- **BIN_IVF_FLAT**

    Sets the index type to **BIN_IVF_FLAT**. This applies to binary vectors only.

- **HNSW**

    Sets the index type to **HNSW**.

- **HNSW_SQ**

    Sets the index type to **HNSW_SQ**.

- **HNSW_PQ**

    Sets the index type to **HNSW_PQ**.

- **HNSW_PRQ**

    Sets the index type to **HNSW_PRQ**.

- **DISKANN**

    Sets the index type to **DISKANN**.

- **SPARSE_INVERTED_INDEX**

    Sets the index type to **SPARSE_INVERTED_INDEX**. This applies to sparse vectors only.

- **SPARSE_WAND**

    Sets the index type to **SPARSE_WAND**. This applies to sparse vectors only.

- **INVERTED**

    Sets the index type to **INVERTED**. This applies to scalar fields only.

- **STL_SORT**

    Sets the index type to **STL_SORT**. This applies to scalar fields only.

- **TRIE**

    Sets the index type to **TRIE**. This applies to VarChar scalar fields only.

- **AUTOINDEX**

    Sets the index type to **AUTOINDEX**.
