# NewHNSWAnnParam()

This function creates an ANN search parameter set for HNSW index with a configurable ef (search scope) value.

```go
func NewHNSWAnnParam(ef int) hsnwAnnParam
```

**PARAMETERS:**

- **ef** (*int*)

      The size of the dynamic candidate list during search. Higher values improve recall but increase latency. Must be >= topK.

**RETURNS:**

*AnnParam*

An ANN search parameter instance. Pass this to a search option via `WithAnnParam()`.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v2/index"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

// Create ANN search parameters
param := index.NewHNSWAnnParam(10)

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
