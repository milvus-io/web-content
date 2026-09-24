# NewIvfRabitQAnnParam()

This function creates an ANN search parameter set for IVF_RABITQ index with a configurable nprobe value.

```go
func NewIvfRabitQAnnParam(nprobe int) *ivfRabitQAnnParam
```

**PARAMETERS:**

- **nprobe** (*int*)

    The number of clusters to search. Higher values improve recall but increase latency.

**RETURNS:**

*[AnnParam](AnnParam.md)*

An ANN search parameter instance. Pass this to a search option via `WithAnnParam()`.

**BUILDER METHODS:**

- `WithRabitQueryBits(rbqQueryBits int)`

    Sets the number of bits used for the RaBitQ query.

- `WithRefineK(refineK int)`

    Sets how many candidates the refine index re-ranks. Only useful on an index built with `WithRefineType`.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create ANN search parameters
param := index.NewIvfRabitQAnnParam(10)

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
