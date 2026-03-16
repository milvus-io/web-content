# NewSCANNIndex()

This function creates a SCANN (Scalable Nearest Neighbors) index configuration for fast approximate search.

```go
func NewSCANNIndex(metricType MetricType, nlist int, withRawData bool) Index
```

**PARAMETERS:**

- **metricType** (*[MetricType](../MetricType.md)*)

      The distance metric type for similarity search (e.g., index.COSINE, index.L2, index.IP).

- **nlist** (*int*)

      The number of cluster units (inverted lists). Higher values speed up search but reduce recall. Typical range: 1-65536.

- **withRawData** (*bool*)

      Whether to store raw vectors alongside the index for reranking.

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
idx := index.NewSCANNIndex(index.COSINE, 128, true)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
