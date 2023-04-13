# IndexType

The enumeration of all available index types in Milvus.

```Java
package io.milvus.param;
public enum IndexType
```

| Type      | Description                     |
| ------------ | ----------------------------------- |
| INVALID      | For internal usage.                 |
| FLAT         | Only for `FloatVector` type field.  |
| IVF_FLAT     | Only for `FloatVector` type field.  |
| IVF_SQ8      | Only for `FloatVector` type field.  |
| IVF_PQ       | Only for `FloatVector` type field.  |
| HNSW         | Only for `FloatVector` type field.  |
| ANNOY        | Only for `FloatVector` type field.  |
| DISKANN      | Only for `FloatVector` type field.  |
| BIN_FLAT     | Only for `BinaryVector` type field. |
| BIN_IVF_FLAT | Only for `BinaryVector` type field. |
| TRIE         | Only for `VARCHAR` type field.       |

