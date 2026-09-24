# NewRTreeIndexWithParams()

This function creates an RTree index configuration for spatial data queries on geometry fields.

```go
func NewRTreeIndexWithParams() Index
```

**RETURNS:**

*[Index](Index.md)*

An index configuration instance. Pass this to `CreateIndex()` via the index option.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create index configuration
idx := index.NewRTreeIndexWithParams()

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "geometry_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
