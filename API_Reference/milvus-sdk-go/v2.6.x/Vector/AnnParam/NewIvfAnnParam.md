# NewIvfAnnParam()

This function creates an ANN search parameter set for IVF-family indexes with a configurable nprobe (number of clusters to search).

```go
func NewIvfAnnParam(nprobe int) ivfAnnParam
```

**PARAMETERS:**

- **nprobe** (*int*)

    The number of clusters to search. Higher values improve recall but increase latency.

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
param := index.NewIvfAnnParam(10)

// Use with a search option
option := milvusclient.NewSearchOption("collection_name", limit, vectors).
    WithAnnParam(param)
```
