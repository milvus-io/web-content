# NewRTreeIndexBuilder()

This function creates a builder for constructing an RTree index configuration for spatial data queries on geometry fields.

```go
func NewRTreeIndexBuilder() *RTreeIndexBuilder
```

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Call `Build()` on the returned builder, then pass the result to `CreateIndex()` via the index option.

**BUILDER METHODS:**

- `Build() Index`

    Returns the constructed RTree index.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create index configuration
idx := index.NewRTreeIndexBuilder().Build()

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "geometry_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
