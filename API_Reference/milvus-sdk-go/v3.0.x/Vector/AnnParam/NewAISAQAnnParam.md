# NewAISAQAnnParam()

This function creates an ANN search parameter set for the AISAQ index with a configurable search list size, plus optional beam widths and a read-page cache.

```go
func NewAISAQAnnParam(searchList int) *aisaqAnnParam
```

**PARAMETERS:**

- **searchList** (*int*)

    The size of the search list for AISAQ. Higher values improve recall at the cost of latency.

**RETURNS:**

*[AnnParam](AnnParam.md)*

An ANN search parameter instance. Pass this to a search option via `WithAnnParam()`.

**BUILDER METHODS:**

- `WithBeamwidth(beamwidth int)`

    Sets the maximum number of IO requests issued per search iteration.

- `WithVectorsBeamwidth(beamwidth int)`

    Sets the beam width used for the compressed vectors.

- `WithPQReadPageCacheSize(bytes int)`

    Sets the per-thread read-page cache size in bytes for this search.

## Example

```go
import (
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create ANN search parameters
param := index.NewAISAQAnnParam(10)

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
