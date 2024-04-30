# IndexType

The enumeration for available index types.

```java
package io.milvus.param;
public enum IndexType
```

|  **Type**         |  **Code** |  **Description**                                                                            |
| ----------------- | --------- | ------------------------------------------------------------------------------------------- |
|  None             |  0        |  For internal usage.                                                                        |
|  FLAT<br/>     |  1        |  Only for FloatVector type field.                                                           |
|  IVF_FLAT         |  2        |  Only for FloatVector type field.                                                           |
|  IVF_SQ8          |  3        |  Only for FloatVector type field.                                                           |
|  IVF_PQ           |  4        |  Only for FloatVector type field.                                                           |
|  HNSW             |  5        |  Only for FloatVector type field.                                                           |
|  DISKANN<br/>  |  10       |  Only for FloatVector type field.                                                           |
|  AUTOINDEX        |  11       |  Only for FloatVector type field. The auto index parameters are defined in the milvus.yaml. |
|  SCANN            |  12       |  Only for FloatVector type field.                                                           |
|  GPU_IVF_FLAT     |  50       |  Only for FloatVector type field. Only works when server is GPU mode                        |
|  GPU_IVF_PQ       |  51       |  Only for FloatVector type field. Only works when server is GPU mode                        |
|  BIN_FLAT         |  80       |  Only for BinaryVector type field.                                                          |
|  BIN_IVF_FLAT     |  81       |  Only for BinaryVector type field.                                                          |
|  TRIE             |  100      |  Only for VarChar type field                                                                |
|  STL_SORT         |  200      |  Only for scalar type field                                                                 |