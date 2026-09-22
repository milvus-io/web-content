# NewBinIvfFlatIndex()

This function creates a BIN_IVF_FLAT index configuration for binary vector search with inverted file indexing.

```go
func NewBinIvfFlatIndex(metricType MetricType, nlist int) Index
```

**PARAMETERS:**

- **[metricType](../MetricType.md)** (*[MetricType](../MetricType.md)*)

    The distance metric type for similarity search (e.g., entity.COSINE, entity.L2, entity.IP).

- **nlist** (*int*)

    The number of cluster units (inverted lists). Higher values speed up search but reduce recall. Typical range: 1-65536.

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Pass this to `CreateIndex()` via the index option.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create index configuration
idx := index.NewBinIvfFlatIndex(entity.COSINE, 128)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
