# NewHNSWPQAnnParam()

This function creates an ANN search parameter set for the HNSW_PQ index with a configurable ef (search scope) value.

```go
func NewHNSWPQAnnParam(ef int) *hnswQuantAnnParam
```

**PARAMETERS:**

- **ef** (*int*)

    The size of the dynamic candidate list during search. Higher values improve recall but increase latency. Must be >= topK.

**RETURNS:**

*[AnnParam](AnnParam.md)*

An ANN search parameter instance. Pass this to a search option via `WithAnnParam()`.

**BUILDER METHODS:**

- `WithRefineK(refineK float64)`

    Sets how many candidates the refine index re-ranks, as a multiple of the requested top-k. Fractional values such as 1.5 are meaningful. Only useful on an index built with `WithRefineType`.

- `WithSeedEf(seedEf int)`

    Sets the ef used to seed an iterator search.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create ANN search parameters
param := index.NewHNSWPQAnnParam(10)

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
