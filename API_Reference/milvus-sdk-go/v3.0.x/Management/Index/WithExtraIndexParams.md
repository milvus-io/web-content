# WithExtraIndexParams()

This function merges additional raw build parameters into an existing index configuration. It is the escape hatch for engine parameters the typed constructors do not expose.

```go
func WithExtraIndexParams(idx Index, extra map[string]string) Index
```

**PARAMETERS:**

- **idx** (*[Index](Index.md)*)

    The index configuration to extend.

- **extra** (*map[string]string*)

    Additional build parameters to merge in. `index_type` and `metric_type` are reserved and silently ignored — use the constructor for the index you actually want. Any other key overrides.

**RETURNS:**

*[Index](Index.md)*

A wrapped index configuration. Parameters are forwarded verbatim; the server validates names and ranges.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create index configuration and extend it with an extra param
base := index.NewHNSWIndex(entity.COSINE, 16, 200)
idx := index.WithExtraIndexParams(base, map[string]string{"ef_search": "64"})

// Use with CreateIndex
createIdxOption := milvusclient.NewCreateIndexOption("collection_name", "vector_field", idx)
task, err := client.CreateIndex(ctx, createIdxOption)
```
