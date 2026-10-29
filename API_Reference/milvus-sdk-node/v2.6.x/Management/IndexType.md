# IndexType

Defines the supported index types for vector and scalar fields.

```typescript
export enum IndexType {
  // vector
  FLAT = 'FLAT',
  IVF_FLAT = 'IVF_FLAT',
  IVF_SQ8 = 'IVF_SQ8',
  IVF_PQ = 'IVF_PQ',
  HNSW = 'HNSW',
  BIN_FLAT = 'BIN_FLAT',
  BIN_IVF_FLAT = 'BIN_IVF_FLAT',
  DISKANN = 'DISKANN',
  AUTOINDEX = 'AUTOINDEX',
  ANNOY = 'ANNOY',
  SPARSE_INVERTED_INDEX = 'SPARSE_INVERTED_INDEX',
  SPARSE_WAND = 'SPARSE_WAND',
  // 2.3
  GPU_FLAT = 'GPU_FLAT',
  GPU_IVF_FLAT = 'GPU_IVF_FLAT',
  GPU_IVF_PQ = 'GPU_IVF_PQ',
  GPU_IVF_SQ8 = 'GPU_IVF_SQ8',
  GPU_BRUTE_FORCE = 'GPU_BRUTE_FORCE',
  GPU_CAGRA = 'GPU_CAGRA',
  RAFT_IVF_FLAT = 'RAFT_IVF_FLAT',
  RAFT_IVF_PQ = 'RAFT_IVF_PQ',
  ScaNN = 'SCANN',
  // scalar
  STL_SORT = 'STL_SORT',
  TRIE = 'Trie',
  INVERTED = 'INVERTED',
  // 2.5
  BITMAP = 'BITMAP',
  // 2.6
  IVF_RABITQ = 'IVF_RABITQ',
  MINHASH_LSH = 'MINHASH_LSH',
  RTREE = 'RTREE',
}
```

**Constants:**

- **FLAT** ('FLAT')

    Sets the index type to **FLAT**.

- **IVF_FLAT** ('IVF_FLAT')

    Sets the index type to **IVF_FLAT**.

- **IVF_SQ8** ('IVF_SQ8')

    Sets the index type to **IVF_SQ8**.

- **IVF_PQ** ('IVF_PQ')

    Sets the index type to **IVF_PQ**.

- **HNSW** ('HNSW')

    Sets the index type to **HNSW**.

- **BIN_FLAT** ('BIN_FLAT')

    Sets the index type to **BIN_FLAT**.

- **BIN_IVF_FLAT** ('BIN_IVF_FLAT')

    Sets the index type to **BIN_IVF_FLAT**.

- **DISKANN** ('DISKANN')

    Sets the index type to **DISKANN**.

- **AUTOINDEX** ('AUTOINDEX')

    Sets the index type to **AUTOINDEX**.

- **ANNOY** ('ANNOY')

    Sets the index type to **ANNOY**.

- **SPARSE_INVERTED_INDEX** ('SPARSE_INVERTED_INDEX')

    Sets the index type to **SPARSE_INVERTED_INDEX**.

- **SPARSE_WAND** ('SPARSE_WAND')

    Sets the index type to **SPARSE_WAND**.

- **GPU_FLAT** ('GPU_FLAT')

    Sets the index type to **GPU_FLAT**.

- **GPU_IVF_FLAT** ('GPU_IVF_FLAT')

    Sets the index type to **GPU_IVF_FLAT**.

- **GPU_IVF_PQ** ('GPU_IVF_PQ')

    Sets the index type to **GPU_IVF_PQ**.

- **GPU_IVF_SQ8** ('GPU_IVF_SQ8')

    Sets the index type to **GPU_IVF_SQ8**.

- **GPU_BRUTE_FORCE** ('GPU_BRUTE_FORCE')

    Sets the index type to **GPU_BRUTE_FORCE**.

- **GPU_CAGRA** ('GPU_CAGRA')

    Sets the index type to **GPU_CAGRA**.

- **RAFT_IVF_FLAT** ('RAFT_IVF_FLAT')

    Sets the index type to **RAFT_IVF_FLAT**.

- **RAFT_IVF_PQ** ('RAFT_IVF_PQ')

    Sets the index type to **RAFT_IVF_PQ**.

- **ScaNN** ('SCANN')

    Sets the index type to **ScaNN**.

- **STL_SORT** ('STL_SORT')

    Sets the index type to **STL_SORT**.

- **TRIE** ('Trie')

    Sets the index type to **TRIE**.

- **INVERTED** ('INVERTED')

    Sets the index type to **INVERTED**.

- **BITMAP** ('BITMAP')

    Sets the index type to **BITMAP**.

- **IVF_RABITQ** ('IVF_RABITQ')

    Sets the index type to **IVF_RABITQ**.

- **MINHASH_LSH** ('MINHASH_LSH')

    Sets the index type to **MINHASH_LSH**.

- **RTREE** ('RTREE')

    Sets the index type to **RTREE**.
