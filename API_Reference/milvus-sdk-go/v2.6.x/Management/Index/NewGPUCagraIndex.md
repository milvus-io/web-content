# NewGPUCagraIndex()

This function creates a GPU CAGRA index configuration for high-performance graph-based GPU search.

```go
func NewGPUCagraIndex(metricType MetricType, intermediateGraphDegree, graphDegree int, ) Index
```

**PARAMETERS:**

- **metricType** (*[MetricType](../MetricType.md)*)

      The distance metric type for similarity search (e.g., index.COSINE, index.L2, index.IP).

- **intermediateGraphDegree** (*int*)

      The degree of the intermediate graph during CAGRA construction.

- **graphDegree** (*int*)

      The degree of the final graph. Lower values use less memory; higher values improve recall.

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
idx := index.NewGPUCagraIndex(index.COSINE, 128, 64)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
