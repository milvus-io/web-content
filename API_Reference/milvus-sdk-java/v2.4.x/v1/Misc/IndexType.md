# IndexType

The enumeration for available index types.

```java
package io.milvus.param;
public enum IndexType
```

|  **Type**              |  **Code** |  **Description**                                                                                                          |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
|  None                  |  0        |  For internal usage.                                                                                                      |
|  FLAT<br/>          |  1        |  Works for FloatVector/Float16Vector/BFloat16Vector type field.                                                           |
|  IVF_FLAT              |  2        |  Works for FloatVector/Float16Vector/BFloat16Vector type field.                                                           |
|  IVF_SQ8               |  3        |  Works for FloatVector/Float16Vector/BFloat16Vector type field.                                                           |
|  IVF_PQ                |  4        |  Works for FloatVector/Float16Vector/BFloat16Vector type field.                                                           |
|  HNSW                  |  5        |  Works for FloatVector/Float16Vector/BFloat16Vector type field.                                                           |
|  DISKANN<br/>       |  10       |  Works for FloatVector/Float16Vector/BFloat16Vector type field.                                                           |
|  AUTOINDEX             |  11       |  Works for FloatVector/Float16Vector/BFloat16Vector type field. The auto index parameters are defined in the milvus.yaml. |
|  SCANN                 |  12       |  Works for FloatVector/Float16Vector/BFloat16Vector type field.                                                           |
|  GPU_IVF_FLAT          |  50       |  Only for FloatVector type field. Only works when the server is GPU mode.                                                 |
|  GPU_IVF_PQ            |  51       |  Only for FloatVector type field. Only works when the server is GPU mode.                                                 |
|  GPU_BRUTE_FORCE       |  52       |  Only for FloatVector type field. Only works when the server is GPU mode.                                                 |
|  GPU_CAGRA             |  53       |  Only for FloatVector type field. Only works when the server is GPU mode.                                                 |
|  BIN_FLAT              |  80       |  Only for BinaryVector type field.                                                                                        |
|  BIN_IVF_FLAT          |  81       |  Only for BinaryVector type field.                                                                                        |
|  TRIE                  |  100      |  Only for VarChar type field.                                                                                             |
|  STL_SORT              |  200      |  Only for numeric type field.                                                                                             |
|  INVERTED              |  201      |  Works for all scalar fields except JSON type field.                                                                      |
|  SPARSE_INVERTED_INDEX |  300      |  Only for SparseFloatVector type field.<br/>                                                                           |
|  SPARSE_WAND           |  301      |  Only for SparseFloatVector type field.                                                                                   |