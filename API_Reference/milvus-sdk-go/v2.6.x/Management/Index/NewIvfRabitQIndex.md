# NewIvfRabitQIndex()

This function creates an IVF_RABITQ index configuration that uses RaBitQ quantization for efficient vector compression.

```go
func NewIvfRabitQIndex(metricType MetricType, nlist int) *ivfRabitQIndex
```

**PARAMETERS:**

- **[metricType](../MetricType.md)** (*[MetricType](../MetricType.md)*)

    The distance metric type for similarity search (e.g., index.COSINE, index.L2, index.IP).

- **nlist** (*int*)

    The number of cluster units (inverted lists). Higher values speed up search but reduce recall. Typical range: 1-65536.

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Pass this to `CreateIndex()` via the index option.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v2/index"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

// Create index configuration
idx := index.NewIvfRabitQIndex(index.COSINE, 128)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
