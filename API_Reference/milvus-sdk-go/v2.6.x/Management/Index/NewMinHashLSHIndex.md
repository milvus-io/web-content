# NewMinHashLSHIndex()

This function creates a MinHash LSH index configuration for set similarity search using locality-sensitive hashing.

```go
func NewMinHashLSHIndex(metricType entity.MetricType, lshBand int) *minhashLSHIndex
```

**PARAMETERS:**

- **[metricType](../MetricType.md)** (*[entity.MetricType](../MetricType.md)*)

    The distance metric type for similarity search (e.g., index.COSINE, index.L2, index.IP).

- **lshBand** (*int*)

    The number of LSH bands for MinHash-based similarity search.

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Pass this to `CreateIndex()` via the index option.

**BUILDER METHODS:**

- `WithElementBitWidth(elementBitWidth int)`

    Sets the bit width of the hash elements.

- `WithLSHCodeInMem(lshCodeInMem int)`

    Sets how many LSH codes are kept in memory.

- `WithRawData(withRawData bool)`

    Sets whether raw data is stored for refine re-ranking.

- `WithBloomFilterFalsePositiveProb(fpProb float64)`

    Sets the target false-positive probability of the bloom filter.

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
