# NewAISAQIndex()

This function creates an AISAQ index configuration, a DiskANN variant that keeps product-quantized codes inline with the graph to cut the number of random reads per hop.

```go
func NewAISAQIndex(metricType MetricType) *aisaqIndex
```

**PARAMETERS:**

- **[metricType](../MetricType.md)** (*[MetricType](../MetricType.md)*)

    The distance metric type for similarity search (e.g., entity.COSINE, entity.L2, entity.IP).

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Pass this to `CreateIndex()` via the index option. Every build parameter has a server-side default, so the rest are opt-in via the `With*` methods.

**BUILDER METHODS:**

- `WithInlinePQ(inlinePQ int) *aisaqIndex`

    Sets how many compressed vectors are stored inline in a node. Capped by the graph's max degree; range [0, 2048].

- `WithPQCacheSize(bytes int) *aisaqIndex`

    Sets the compressed-vector cache size in bytes.

- `WithRearrange(rearrange bool) *aisaqIndex`

    Enables the compressed-vector reordering search optimization.

- `WithPQReadIOEngine(engine string) *aisaqIndex`

    Selects the IO engine used to read PQ vectors, either "aio" (server default) or "uring".

- `WithNumEntryPoints(numEntryPoints int) *aisaqIndex`

    Sets how many entry points are generated and stored when the graph is built. This is a build param, not a per-search knob.

- `WithPQReadPageCacheSize(bytes int) *aisaqIndex`

    Sets the per-thread read-page cache size in bytes. Honored at both build and search time.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create index configuration
idx := index.NewAISAQIndex(entity.COSINE)

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
