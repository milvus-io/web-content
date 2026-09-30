# NewHNSWAnnParam()

This function creates an ANN search parameter set for HNSW index with a configurable ef (search scope) value.

```go
func NewHNSWAnnParam(ef int) hsnwAnnParam
```

**PARAMETERS:**

- **ef** (*int*)

    The size of the dynamic candidate list during search. Higher values improve recall but increase latency. Must be >= topK.

**RETURNS:**

*[AnnParam](AnnParam.md)*

An ANN search parameter instance. Pass this to a search option via `WithAnnParam()`.

**BUILDER METHODS:**

- `WithSeedEf(seedEf int)`

    Sets the ef used to seed an iterator search (knowhere FaissHnswConfig::seed_ef). Server default 40.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create ANN search parameters
param := index.NewHNSWAnnParam(10)

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
