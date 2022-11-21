# IndexType

The enumeration of all available index types in Milvus.

```Java
package io.milvus.param;
public enum IndexType
```

| Type     | Code | Description                     |
| ------------ | -------- | ----------------------------------- |
| INVALID      | 0        | For internal usage.                 |
| FLAT         | 1        | Only for `FloatVector` type field.  |
| IVF_FLAT     | 2        | Only for `FloatVector` type field.  |
| IVF_SQ8      | 3        | Only for `FloatVector` type field.  |
| IVF_PQ       | 4        | Only for `FloatVector` type field.  |
| HNSW         | 5        | Only for `FloatVector` type field.  |
| ANNOY        | 6        | Only for `FloatVector` type field.  |
| BIN_FLAT     | 7        | Only for `BinaryVector` type field. |
| BIN_IVF_FLAT | 8        | Only for `BinaryVector` type field. |
| TRIE         | 9        | Only for `VARCHAR` type field.       |

