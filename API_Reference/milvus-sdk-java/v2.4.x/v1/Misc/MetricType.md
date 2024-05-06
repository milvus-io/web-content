# MetricType

The enumeration for available metric types.

```java
package io.milvus.param;
public enum MetricType
```

|  **Type** |  **Description**                                   |
| --------- | -------------------------------------------------- |
|  NONE     |  For internal usage.                               |
|  L2       |  Euclidean distance. Only for float vectors.       |
|  IP       |  Inner product. Only for normalized float vectors. |
|  COSINE   |  Cosine similarity. Only for float vectors         |
|  HAMMING  |  Only for binary vectors.                          |
|  JACCARD  |  Only for binary vectors.                          |