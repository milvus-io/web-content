# NewSparseWANDIndex()

This function creates a SPARSE_WAND index configuration for sparse vector search using the Weak-AND algorithm.

```go
func NewSparseWANDIndex(metricType MetricType, dropRatio float64) Index
```

**PARAMETERS:**

- **metricType** (*[MetricType](../MetricType.md)*)

    The distance metric type for similarity search (e.g., index.COSINE, index.L2, index.IP).

- **dropRatio** (*float64*)

    The ratio of small vector values to drop during indexing. Range: [0, 1).

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
idx := index.NewSparseWANDIndex(index.COSINE, 0.2)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
