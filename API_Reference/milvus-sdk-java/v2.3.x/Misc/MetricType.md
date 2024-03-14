# MetricType

The enumeration of all available metric types in Milvus.

```Java
package io.milvus.param;
public enum MetricType
```

| Type       | Description                                   |
| -------------- | ------------------------------------------------- |
| INVALID        | For internal usage.                               |
| L2             | Euclidean distance. Only for float vectors.       |
| IP             | Inner product. Only for normalized float vectors. |
| COSINE         | Cosine Similarity. Only for normalized float vectors. |
| HAMMING        | Only for binary vectors.                          |
| JACCARD        | Only for binary vectors.                          |
| TANIMOTO       | Only for binary vectors.                          |
