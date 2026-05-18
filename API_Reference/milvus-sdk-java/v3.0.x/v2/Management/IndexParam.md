# IndexParam

IndexParam defines the parameters for configuring an index on a collection field.

```java
IndexParam.builder()
    .fieldName(String fieldName)
    .indexType(IndexType indexType)
    .metricType(MetricType metricType)
    .extraParams(Map<String, Object> extraParams)
    .build()
```

**BUILDER METHODS:**

- `fieldName(String fieldName)` -

    The name of the field to index.

- `indexType(IndexType indexType)` -

    The type of index to build on the field. For available index types, refer to IndexType.

- `metricType(MetricType metricType)` -

    The metric type for vector similarity measurement. For available metric types, refer to MetricType.

- `extraParams(Map<String, Object> extraParams)` -

    Additional index-specific parameters as key-value pairs. For example, `{"M": 16, "efConstruction": 256}` for HNSW indexes.

**RETURNS:**

*IndexParam*

**EXCEPTIONS:**

*MilvusClientException*

This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.common.IndexParam;

IndexParam indexParam = IndexParam.builder()
    .fieldName("vector")
    .indexType(IndexParam.IndexType.HNSW)
    .metricType(IndexParam.MetricType.COSINE)
    .extraParams(Map.of("M", 16, "efConstruction", 256))
    .build();
```
