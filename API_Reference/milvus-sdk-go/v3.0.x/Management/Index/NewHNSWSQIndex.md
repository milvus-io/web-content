# NewHNSWSQIndex()

This function creates an HNSW_SQ index configuration whose vectors are scalar-quantized to reduce memory usage. `sqType` selects the quantizer.

```go
func NewHNSWSQIndex(metricType MetricType, m int, efConstruction int, sqType string) *hnswSQIndex
```

**PARAMETERS:**

- **[metricType](../MetricType.md)** (*[MetricType](../MetricType.md)*)

    The distance metric type for similarity search (e.g., entity.COSINE, entity.L2, entity.IP).

- **m** (*int*)

    The number of bi-directional links for each element. Higher values improve recall but increase memory usage. Typical range: 4-64.

- **efConstruction** (*int*)

    The size of the dynamic candidate list during index construction. Higher values improve index quality but slow down build time. Typical range: 8-512.

- **sqType** (*string*)

    The scalar quantizer. Knowhere accepts sq4u / sq6 / sq8 / fp16 / bf16; the default is SQ8.

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Pass this to `CreateIndex()` via the index option.

**BUILDER METHODS:**

- `WithRefineType(refineType string) *hnswSQIndex`

    Enables the refine index and sets its precision. Knowhere accepts sq4u / sq6 / sq8 / fp16 / bf16 / fp32 / flat. The refine index keeps full-precision vectors alongside the quantized ones and re-ranks with them.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create index configuration
idx := index.NewHNSWSQIndex(entity.COSINE, 16, 200, "sq8")

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
