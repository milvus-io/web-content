# MetricType

This enumeration provides metric types for vector similarity measurement.

```java
public enum MetricType
```

**Constants:**

- **INVALID**

    An invalid metric type.

- **L2**

    Euclidean distance. This applies to float vectors only.

- **IP**

    Inner product. This applies to float vectors only.

- **COSINE**

    Cosine similarity. This applies to float vectors only.

- **HAMMING**

    Hamming distance. This applies to binary vectors only.

- **JACCARD**

    Jaccard distance. This applies to binary vectors only.

- **MHJACCARD**

    Modified Hamming-Jaccard distance. This applies to binary vectors only.

- **BM25**

    BM25 score for sparse vectors. This applies to sparse vector fields derived from BM25 functions.

- **MAX_SIM**

    Maximum similarity, equal to `MAX_SIM_COSINE`. This applies only to vectors in Struct elements.

- **MAX_SIM_COSINE**

    Maximum cosine similarity for vectors inside a Struct field.

- **MAX_SIM_IP**

    Maximum inner-product similarity for vectors inside a Struct field.

- **MAX_SIM_L2**

    Maximum Euclidean-distance similarity for vectors inside a Struct field.

- **MAX_SIM_JACCARD**

    Maximum Jaccard similarity for binary vectors inside a Struct field.

- **MAX_SIM_HAMMING**

    Maximum Hamming similarity for binary vectors inside a Struct field.
