# MetricType

The enumeration of all available metric types in Milvus.

```Java
package io.milvus.param;
public enum MetricType
```

| **Type**       | **Code** | **Description**                                   |
| -------------- | -------- | ------------------------------------------------- |
| INVALID        | 0        | For internal usage.                               |
| L2             | 1        | Euclidean distance. Only for float vectors.       |
| IP             | 2        | Inner product. Only for normalized float vectors. |
| HAMMING        | 3        | Only for binary vectors.                          |
| JACCARD        | 4        | Only for binary vectors.                          |
| TANIMOTO       | 5        | Only for binary vectors.                          |
| SUBSTRUCTURE   | 6        | Only for binary vectors.                          |
| SUPERSTRUCTURE | 7        | Only for binary vectors.                          |
