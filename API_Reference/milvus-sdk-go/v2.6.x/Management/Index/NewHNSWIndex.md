# NewHNSWIndex()

This function creates an HNSW (Hierarchical Navigable Small World) index configuration for high-recall vector search.

```go
func NewHNSWIndex(metricType MetricType, m int, efConstruction int) Index
```

**PARAMETERS:**

- **metricType** (*[MetricType](../MetricType.md)*)

      The distance metric type for similarity search (e.g., index.COSINE, index.L2, index.IP).

- **m** (*int*)

      The number of bi-directional links for each element. Higher values improve recall but increase memory usage. Typical range: 4-64.

- **efConstruction** (*int*)

      The size of the dynamic candidate list during index construction. Higher values improve index quality but slow down build time. Typical range: 8-512.

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
idx := index.NewHNSWIndex(index.COSINE, 16, 200)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
