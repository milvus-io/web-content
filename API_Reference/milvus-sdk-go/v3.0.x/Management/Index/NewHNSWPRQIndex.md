# NewHNSWPRQIndex()

This function creates an HNSW_PRQ index configuration whose vectors are quantized with a product-residual quantizer to reduce memory usage.

```go
func NewHNSWPRQIndex(metricType MetricType, m int, efConstruction int, pqM int, nrq int, nbits int) *hnswPRQIndex
```

**PARAMETERS:**

- **[metricType](../MetricType.md)** (*[MetricType](../MetricType.md)*)

    The distance metric type for similarity search (e.g., entity.COSINE, entity.L2, entity.IP).

- **m** (*int*)

    The number of bi-directional links for each element. Higher values improve recall but increase memory usage. Typical range: 4-64.

- **efConstruction** (*int*)

    The size of the dynamic candidate list during index construction. Higher values improve index quality but slow down build time. Typical range: 8-512.

- **pqM** (*int*)

    The number of splits (server default 2).

- **nrq** (*int*)

    The number of residual quantizers, in [1, 16] (server default 2).

- **nbits** (*int*)

    The bits per sub-quantizer, in [1, 24] (server default 8).

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Pass this to `CreateIndex()` via the index option.

**BUILDER METHODS:**

- `WithRefineType(refineType string) *hnswPRQIndex`

    Enables the refine index and sets its precision. Knowhere accepts sq4u / sq6 / sq8 / fp16 / bf16 / fp32 / flat. The refine index keeps full-precision vectors alongside the quantized ones and re-ranks with them.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create index configuration
idx := index.NewHNSWPRQIndex(entity.COSINE, 16, 200, 2, 2, 8)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
