# NewIvfRabitQIndex()

This function creates an IVF_RABITQ index configuration that uses RaBitQ quantization for efficient vector compression.

```go
func NewIvfRabitQIndex(metricType MetricType, nlist int) *ivfRabitQIndex
```

**PARAMETERS:**

- **[metricType](../MetricType.md)** (*[MetricType](../MetricType.md)*)

    The distance metric type for similarity search (e.g., entity.COSINE, entity.L2, entity.IP).

- **nlist** (*int*)

    The number of cluster units (inverted lists). Higher values speed up search but reduce recall. Typical range: 1-65536.

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Pass this to `CreateIndex()` via the index option.

**BUILDER METHODS:**

- `WithRbqBits(rbqBits int)`

    Sets the number of bits used for RaBitQ quantization.

- `WithRefineType(refineType string)`

    Enables the refine index and sets its precision. Knowhere accepts sq4u / sq6 / sq8 / fp16 / bf16 / fp32 / flat.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create index configuration
idx := index.NewIvfRabitQIndex(entity.COSINE, 128)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
