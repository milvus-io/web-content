# NewIvfPQIndex()

This function creates an IVF_PQ index configuration that combines clustering with product quantization for memory-efficient search.

```go
func NewIvfPQIndex(metricType MetricType, nlist int, m int, nbits int) Index
```

**PARAMETERS:**

- **metricType** (*[MetricType](../MetricType.md)*)

      The distance metric type for similarity search (e.g., index.COSINE, index.L2, index.IP).

- **nlist** (*int*)

      The number of cluster units (inverted lists). Higher values speed up search but reduce recall. Typical range: 1-65536.

- **m** (*int*)

      The m.

- **nbits** (*int*)

      The number of bits for product quantization encoding. Typically 8.

**RETURNS:**

*Index*

An index configuration instance. Pass this to `CreateIndex()` via the index option.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v2/index"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

// Create index configuration
idx := index.NewIvfPQIndex(index.COSINE, 128, m, 8)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
