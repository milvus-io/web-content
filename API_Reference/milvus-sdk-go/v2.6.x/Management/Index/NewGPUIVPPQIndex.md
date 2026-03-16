# NewGPUIVPPQIndex()

This function creates a GPU IVF_PQ index configuration for GPU-accelerated search with product quantization.

```go
func NewGPUIVPPQIndex(metricType MetricType) Index
```

**PARAMETERS:**

- **metricType** (*[MetricType](../MetricType.md)*)

    The distance metric type for similarity search (e.g., index.COSINE, index.L2, index.IP).

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
idx := index.NewGPUIVPPQIndex(index.COSINE)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
