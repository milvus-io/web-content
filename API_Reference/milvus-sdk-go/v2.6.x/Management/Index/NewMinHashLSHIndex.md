# NewMinHashLSHIndex()

This function creates a MinHash LSH index configuration for set similarity search using locality-sensitive hashing.

```go
func NewMinHashLSHIndex(metricType entity.MetricType, lshBand int) *minhashLSHIndex
```

**PARAMETERS:**

- **metricType** (*[entity.MetricType](../MetricType.md)*)

      The distance metric type for similarity search (e.g., index.COSINE, index.L2, index.IP).

- **lshBand** (*int*)

      The number of LSH bands for MinHash-based similarity search.

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
idx := index.NewMinHashLSHIndex(index.COSINE, 10)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
